import "server-only";

import { headers } from "next/headers";

/**
 * Request-level guards shared by the CRM's endpoints.
 */

/**
 * Rejects a cookie-authenticated request that did not come from this site.
 *
 * The session cookie is `sameSite: "lax"`, which already keeps it off
 * cross-site POSTs from a form or fetch. This is the second line: it compares
 * the `Origin` header against the host actually serving the request, so a
 * browser that mishandles `sameSite`, or a request forged through some future
 * relaxation of it, still fails. Browsers send `Origin` on every POST, so a
 * missing one on a mutating request is itself suspicious and is refused.
 *
 * This is the stand-in for a CSRF token. A per-session token would be stronger
 * and is the thing to add if the CRM ever needs to accept a cross-origin
 * caller; while every caller is this same site, an origin assertion carries
 * the same weight with nothing to keep in sync.
 */
export async function assertSameOrigin(): Promise<
  { ok: true } | { ok: false; error: string }
> {
  const headerList = await headers();
  const origin = headerList.get("origin");

  if (!origin) {
    return { ok: false, error: "Missing origin." };
  }

  // `host` is what the browser asked for; behind a proxy, the forwarded host
  // is the public one. Accept either, so this works both locally and behind a
  // load balancer without being told which it is.
  const candidates = [
    headerList.get("x-forwarded-host"),
    headerList.get("host"),
  ].filter((value): value is string => Boolean(value));

  let originHost: string;
  try {
    originHost = new URL(origin).host;
  } catch {
    return { ok: false, error: "Malformed origin." };
  }

  if (!candidates.includes(originHost)) {
    return { ok: false, error: "Cross-origin request refused." };
  }

  return { ok: true };
}

/**
 * A fixed-window rate limiter held in this process's memory.
 *
 * Be clear about what this is and is not. It counts per server instance, so on
 * a platform that runs several instances the effective limit is the configured
 * one multiplied by however many are warm, and a cold start resets it. That
 * makes it a brake on an accidental loop or a crude script, not protection
 * against a determined attacker.
 *
 * Real protection belongs at the edge — the host's or CDN's rate limiting, in
 * front of the application. See docs/crm/environment.md.
 */
const windows = new Map<string, { count: number; resetAt: number }>();

/** Trim expired entries so a long-lived instance cannot grow this unbounded. */
function sweep(now: number): void {
  if (windows.size < 1000) return;
  for (const [key, entry] of windows) {
    if (now > entry.resetAt) windows.delete(key);
  }
}

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  sweep(now);

  const entry = windows.get(key);
  if (!entry || now > entry.resetAt) {
    windows.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  entry.count += 1;
  if (entry.count > limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
    };
  }
  return { allowed: true, retryAfterSeconds: 0 };
}

/**
 * A best-effort client identifier for rate limiting.
 *
 * `x-forwarded-for` is set by whatever proxy sits in front of this and can be
 * spoofed if nothing trustworthy overwrites it, so this is a grouping key, not
 * an identity. Never use it for authorization.
 */
export async function clientKey(prefix: string): Promise<string> {
  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwarded || headerList.get("x-real-ip") || "unknown";
  return `${prefix}:${ip}`;
}
