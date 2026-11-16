import Link from "next/link";
import { ShieldXIcon } from "lucide-react";

import { getCurrentUser } from "@/lib/crm/auth";
import { roleLabels } from "@/lib/crm/types";

export const instant = false;

export const metadata = { title: "Not allowed" };

/**
 * Shown when someone is signed in but their role does not cover what they
 * asked for. Deliberately distinct from the sign-in redirect: telling a signed
 * in person to sign in again is the most confusing answer available.
 */
export default async function NotAllowedPage({
  searchParams,
}: PageProps<"/admin/not-allowed">) {
  const user = await getCurrentUser();
  const params = await searchParams;
  const need = typeof params?.need === "string" ? params.need : null;

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <ShieldXIcon aria-hidden className="mx-auto size-7 text-destructive" />
        <h1 className="mt-4 font-heading text-xl text-ink">
          Your role does not cover this
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {user ? (
            <>
              You are signed in as <span className="text-ink">{user.email}</span>{" "}
              with the {roleLabels[user.role]} role
              {need ? (
                <>
                  , which does not include{" "}
                  <span className="font-mono text-xs text-ink">{need}</span>
                </>
              ) : null}
              . An Owner can change this in Settings.
            </>
          ) : (
            <>Sign in to continue.</>
          )}
        </p>
        <Link
          href="/admin/"
          className="mt-6 inline-flex h-9 items-center rounded-lg bg-palm px-4 text-sm font-semibold text-white hover:bg-palm-deep"
        >
          Back to the dashboard
        </Link>
      </div>
    </main>
  );
}
