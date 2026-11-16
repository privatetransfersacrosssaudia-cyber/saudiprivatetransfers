import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { CRM_BASE, isDatabaseConfigured, isSessionConfigured } from "./config";
import { SESSION_COOKIE, readSessionToken } from "./session";
import { getUserById } from "./users";
import { can, type Permission, type SessionUser } from "./types";

/**
 * The data access layer.
 *
 * Every CRM page, Server Action and route handler starts here. The proxy in
 * proxy.ts turns anonymous visitors away before they reach a page, but the
 * framework's own documentation is explicit that middleware is not an
 * authorization solution — so the proxy is treated as a courtesy redirect and
 * this module is the rule. Nothing reads a lead, a document or an account
 * without passing through `requireUser()` or `requirePermission()` first.
 *
 * A session read touches `cookies()`, which under `cacheComponents` can never
 * be part of a prerendered shell. Every CRM segment therefore sets
 * `export const instant = false` and blocks on the server, which is the right
 * trade for an internal, per-user, noindex tool.
 */

/**
 * The signed-in user, or null.
 *
 * The cookie's claims are not trusted on their own: the account is re-read
 * from the database on every request, so deactivating someone or changing
 * their role takes effect immediately rather than when their week-old token
 * expires. If the account has been removed or deactivated, the session is
 * treated as absent.
 */
export async function getCurrentUser(): Promise<SessionUser | null> {
  /**
   * The cookie is read before anything else, including the configuration
   * check, and that order matters.
   *
   * Reading `cookies()` is what marks a route as request-dependent. When the
   * configuration check came first, a build with no environment variables set
   * — which is every build on a host that injects them at runtime — returned
   * null without ever touching the request, so the framework concluded these
   * pages had no request-specific input and prerendered them as static HTML.
   * A CRM page served from a static file is a CRM page that never checks who
   * is asking. The build output is the tell: these routes must be listed as
   * dynamic, never as static.
   */
  const store = await cookies();

  if (!isSessionConfigured() || !isDatabaseConfigured()) return null;

  const claims = await readSessionToken(store.get(SESSION_COOKIE)?.value);
  if (!claims) return null;

  try {
    const account = await getUserById(claims.id);
    if (!account || !account.isActive) return null;

    // The database is the authority on identity and role, not the token.
    return {
      id: account.id,
      email: account.email,
      name: account.name,
      role: account.role,
    };
  } catch {
    // A database failure must not be mistaken for a valid session.
    return null;
  }
}

/** The signed-in user, or a redirect to the sign-in screen. */
export async function requireUser(returnTo?: string): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (user) return user;

  const target = returnTo
    ? `${CRM_BASE}/login/?next=${encodeURIComponent(returnTo)}`
    : `${CRM_BASE}/login/`;
  redirect(target);
}

/**
 * The signed-in user, or a redirect — and a 403 screen if they are signed in
 * but not allowed to do this.
 *
 * Being signed in and being permitted are different failures and get different
 * answers: the first sends you to sign in, the second tells you plainly that
 * your role does not cover it.
 */
export async function requirePermission(
  permission: Permission,
  returnTo?: string
): Promise<SessionUser> {
  const user = await requireUser(returnTo);
  if (!can(user.role, permission)) {
    redirect(`${CRM_BASE}/not-allowed/?need=${encodeURIComponent(permission)}`);
  }
  return user;
}

// --- For route handlers and Server Actions ---------------------------------

export type AuthFailure = { ok: false; status: 401 | 403; error: string };
export type AuthSuccess = { ok: true; user: SessionUser };

/**
 * The same checks, shaped for an endpoint rather than a page.
 *
 * A route handler cannot redirect usefully, so this returns a status to send
 * back. Used by every mutating endpoint — the UI having hidden a button is
 * never what stops the request.
 */
export async function authorize(
  permission: Permission
): Promise<AuthSuccess | AuthFailure> {
  const user = await getCurrentUser();
  if (!user) {
    return { ok: false, status: 401, error: "Sign in to continue." };
  }
  if (!can(user.role, permission)) {
    return {
      ok: false,
      status: 403,
      error: "Your role does not allow this action.",
    };
  }
  return { ok: true, user };
}
