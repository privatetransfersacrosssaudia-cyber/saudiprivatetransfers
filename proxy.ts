import { NextResponse, type NextRequest } from "next/server";

import { CRM_BASE } from "@/lib/crm/config";
import { SESSION_COOKIE, readSessionToken } from "@/lib/crm/session";

/**
 * Turns anonymous visitors away from the CRM before a page renders.
 *
 * This is an optimistic check, not the authorization. The framework's own
 * documentation is explicit that proxy middleware "should not be used as a
 * full session management or authorization solution", and it is not used as
 * one here: it verifies the cookie's signature and nothing else. It does not
 * know whether the account still exists, whether it has been deactivated, or
 * what it is allowed to do.
 *
 * The real check is `lib/crm/auth.ts`, which re-reads the account from the
 * database on every request and is called by every CRM page and every CRM
 * Server Action. Deleting this file would not expose a single record; it saves
 * a signed-out visitor from rendering a page only to be redirected by it.
 *
 * The matcher below keeps this off every other route in the site, so the
 * public pages pay nothing for it.
 */

/** Reachable without a session: the sign-in screen and its own assets. */
function isPublicCrmPath(pathname: string): boolean {
  return (
    pathname === `${CRM_BASE}/login` ||
    pathname === `${CRM_BASE}/login/` ||
    pathname.startsWith(`${CRM_BASE}/login/`)
  );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublicCrmPath(pathname)) return NextResponse.next();

  const session = await readSessionToken(
    request.cookies.get(SESSION_COOKIE)?.value
  );
  if (session) return NextResponse.next();

  // `next` is carried so signing in returns you to the page you asked for.
  // Only the path and query are kept — never a full URL from the request —
  // so this cannot be turned into an open redirect to another site.
  const loginUrl = new URL(`${CRM_BASE}/login/`, request.url);
  const returnTo = `${pathname}${request.nextUrl.search}`;
  if (returnTo && returnTo !== `${CRM_BASE}/`) {
    loginUrl.searchParams.set("next", returnTo);
  }
  return NextResponse.redirect(loginUrl);
}

export const config = {
  /**
   * Only the CRM. Written as two entries because `/admin/:path*` alone does
   * not match the bare `/admin` that the trailing-slash redirect resolves to.
   */
  matcher: ["/admin", "/admin/:path*"],
};
