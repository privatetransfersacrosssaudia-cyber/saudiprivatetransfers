import { redirect } from "next/navigation";

import { LoginForm } from "@/components/crm/login-form";
import { Notice } from "@/components/crm/primitives";
import { getCurrentUser } from "@/lib/crm/auth";
import {
  CRM_BASE,
  isDatabaseConfigured,
  isSessionConfigured,
} from "@/lib/crm/config";
import { site } from "@/lib/site";

/**
 * Reads the session cookie to bounce an already-signed-in visitor straight to
 * the desk, which cannot be prerendered. See lib/crm/auth.ts for why the whole
 * CRM blocks on the server rather than streaming behind a boundary.
 */
export const instant = false;

export const metadata = { title: "Sign in" };

export default async function CrmLoginPage({
  searchParams,
}: PageProps<"/admin/login">) {
  const existing = await getCurrentUser();
  const params = await searchParams;

  const nextParam = params?.next;
  const next = typeof nextParam === "string" ? nextParam : undefined;

  // Already signed in: nothing here to show.
  if (existing) redirect(next && next.startsWith(CRM_BASE) ? next : `${CRM_BASE}/`);

  const ready = isSessionConfigured() && isDatabaseConfigured();

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-sand to-sand-deep px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="font-heading text-2xl leading-tight text-ink">
            {site.name}
          </p>
          <p className="mt-1 text-sm tracking-[0.18em] text-brass-deep uppercase">
            Enquiry desk
          </p>
        </div>

        {ready ? null : (
          <div className="mb-5">
            <Notice tone="warning" title="The CRM is not configured yet">
              <p>
                Set <code>CRM_SESSION_SECRET</code>, <code>SUPABASE_URL</code> and{" "}
                <code>SUPABASE_SERVICE_ROLE_KEY</code>, run{" "}
                <code>supabase/schema.sql</code>, then restart the server.
                Sign-in is unavailable until then.
              </p>
            </Notice>
          </div>
        )}

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <LoginForm next={next} disabled={!ready} />
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          This is a staff tool. Access is logged.
        </p>
      </div>
    </main>
  );
}
