"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  CRM_BASE,
  isDatabaseConfigured,
  isSessionConfigured,
} from "@/lib/crm/config";
import { clientKey, rateLimit } from "@/lib/crm/request";
import {
  SESSION_COOKIE,
  createSessionToken,
  sessionCookieOptions,
} from "@/lib/crm/session";
import { recordLogin, verifyCredentials } from "@/lib/crm/users";

import type { LoginState } from "@/lib/crm/action-state";

/**
 * Five attempts per connection every fifteen minutes.
 *
 * Counted per server instance, so on a multi-instance host the real ceiling is
 * higher — see the note in lib/crm/request.ts. It is enough to make guessing
 * through this form impractical, and it is not the only defence: passwords are
 * bcrypt-hashed at cost 12 inside Postgres, which puts a hard floor under the
 * cost of each attempt regardless of how many get through.
 */
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

/**
 * Keeps `?next=` pointing inside the CRM.
 *
 * Anything that is not a plain CRM path is discarded rather than corrected, so
 * a crafted link cannot send someone who has just signed in to another site
 * with their session freshly established. A protocol-relative `//evil.test`
 * passes a naive "starts with /" check, which is why that case is excluded
 * explicitly.
 */
function safeNext(value: FormDataEntryValue | null): string {
  const fallback = `${CRM_BASE}/`;
  if (typeof value !== "string" || !value) return fallback;
  if (!value.startsWith(`${CRM_BASE}/`) && value !== CRM_BASE) return fallback;
  if (value.startsWith("//")) return fallback;
  if (value.includes("://") || value.includes("\\")) return fallback;
  return value;
}

export async function signIn(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  if (!isSessionConfigured()) {
    return {
      error:
        "Sessions are not configured. Set CRM_SESSION_SECRET to a value of at " +
        "least 32 characters, then restart the server.",
    };
  }
  if (!isDatabaseConfigured()) {
    return {
      error:
        "The database is not configured. Set SUPABASE_URL and " +
        "SUPABASE_SERVICE_ROLE_KEY, then restart the server.",
    };
  }

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Enter your email address and password." };
  }

  const limit = rateLimit(await clientKey("crm-login"), MAX_ATTEMPTS, WINDOW_MS);
  if (!limit.allowed) {
    return {
      error: `Too many sign-in attempts. Try again in about ${Math.ceil(
        limit.retryAfterSeconds / 60
      )} minute(s).`,
    };
  }

  let user;
  try {
    user = await verifyCredentials(email, password);
  } catch {
    // The underlying message can name database internals, so it is not shown.
    return {
      error: "Sign-in is unavailable right now. Please try again shortly.",
    };
  }

  if (!user) {
    // One message for an unknown address, a wrong password and a deactivated
    // account alike, so this form cannot be used to find out who has access.
    return { error: "That email address and password do not match." };
  }

  const token = await createSessionToken(user);
  const store = await cookies();
  store.set(SESSION_COOKIE, token, sessionCookieOptions);

  await recordLogin(user.id);

  // Outside the try/catch above on purpose: `redirect()` works by throwing,
  // and catching it here would swallow the navigation.
  redirect(safeNext(formData.get("next")));
}

export async function signOut(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect(`${CRM_BASE}/login/`);
}
