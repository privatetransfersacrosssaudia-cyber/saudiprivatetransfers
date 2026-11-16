import "server-only";

import { SignJWT, jwtVerify } from "jose";

import {
  SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  sessionSecret,
} from "./config";
import { isRole, type SessionUser } from "./types";

/**
 * Session tokens: an HS256 JWT in an httpOnly cookie.
 *
 * The token carries only an id, email, name and role — enough to render the
 * CRM and authorize an action, with nothing sensitive to leak if a cookie is
 * ever captured. It is signed, not encrypted: treat the payload as readable by
 * whoever holds the cookie, and never put anything in it you would not show
 * that person.
 *
 * There is no refresh token and no server-side session store. A role change
 * therefore does not take effect until the next sign-in, so `loadUser()` in
 * auth.ts re-reads the account from the database on every request and treats
 * the token as a claim to be checked rather than a fact.
 */

function secretKey(): Uint8Array {
  const secret = sessionSecret();
  if (!secret) {
    throw new Error(
      "CRM_SESSION_SECRET is not set, or is shorter than 32 characters. " +
        "Sessions are disabled until it is configured."
    );
  }
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(user: SessionUser): Promise<string> {
  return new SignJWT({
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer("pts-crm")
    .setAudience("pts-crm")
    .setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`)
    .sign(secretKey());
}

/**
 * Verifies a token and returns its claims, or null.
 *
 * Pure and dependency-free beyond `jose`, so the proxy can call it without
 * pulling in `next/headers` or the database. Every failure mode — missing,
 * malformed, wrong signature, expired, wrong issuer, unknown role — returns
 * null rather than throwing, because every one of them means the same thing to
 * the caller: not signed in.
 */
export async function readSessionToken(
  token: string | undefined | null
): Promise<SessionUser | null> {
  if (!token) return null;
  if (!sessionSecret()) return null;

  try {
    const { payload } = await jwtVerify(token, secretKey(), {
      issuer: "pts-crm",
      audience: "pts-crm",
    });

    const { sub, email, name, role } = payload;
    if (typeof sub !== "string" || !sub) return null;
    if (typeof email !== "string" || !email) return null;
    if (!isRole(role)) return null;

    return {
      id: sub,
      email,
      name: typeof name === "string" ? name : null,
      role,
    };
  } catch {
    return null;
  }
}

/**
 * Cookie attributes for the session.
 *
 * `secure` is on except in development, where the dev server speaks plain
 * HTTP and a secure cookie would never be stored. `sameSite: "lax"` keeps the
 * cookie off cross-site POSTs, which — together with the same-origin check in
 * lib/crm/request.ts — is what stands in for a CSRF token here.
 */
export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: SESSION_MAX_AGE_SECONDS,
};

export { SESSION_COOKIE };
