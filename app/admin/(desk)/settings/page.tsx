import { CheckCircle2Icon, CircleAlertIcon } from "lucide-react";

import { UserForm, UserRowControls } from "@/components/crm/user-controls";
import {
  EmptyState,
  Notice,
  Panel,
  formatDateTime,
} from "@/components/crm/primitives";
import { requirePermission } from "@/lib/crm/auth";
import { emailConfig, isDatabaseConfigured, readiness } from "@/lib/crm/config";
import { listUsers } from "@/lib/crm/users";
import { can, roleLabels, type CrmUser } from "@/lib/crm/types";

export const instant = false;

export const metadata = { title: "Settings" };

export default async function SettingsPage() {
  const user = await requirePermission("settings:read", "/admin/settings/");
  const mayManage = can(user.role, "users:manage");

  const checks = readiness();
  const email = emailConfig();

  let users: CrmUser[] = [];
  let usersError: string | null = null;
  if (mayManage && isDatabaseConfigured()) {
    try {
      users = await listUsers();
    } catch (caught) {
      usersError = caught instanceof Error ? caught.message : "Could not load accounts.";
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl text-ink">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          What is configured, and who can sign in.
        </p>
      </div>

      <Panel title="Your account">
        <dl className="grid gap-4 sm:grid-cols-3">
          <div>
            <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Signed in as
            </dt>
            <dd className="mt-1 text-sm text-ink">{user.email}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Name
            </dt>
            <dd className="mt-1 text-sm text-ink">{user.name || "—"}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Role
            </dt>
            <dd className="mt-1 text-sm text-ink">{roleLabels[user.role]}</dd>
          </div>
        </dl>
      </Panel>

      <Panel
        title="Configuration"
        description="Read from the server environment. Values are never shown here."
      >
        <ul className="divide-y divide-border">
          {checks.map((check) => (
            <li
              key={check.label}
              className="flex flex-wrap items-start justify-between gap-3 py-3 first:pt-0 last:pb-0"
            >
              <div className="min-w-0">
                <p className="flex items-center gap-2 text-sm font-medium text-ink">
                  {check.ok ? (
                    <CheckCircle2Icon aria-hidden className="size-4 text-palm" />
                  ) : (
                    <CircleAlertIcon aria-hidden className="size-4 text-destructive" />
                  )}
                  {check.label}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{check.note}</p>
                <p className="mt-1 font-mono text-[0.7rem] text-muted-foreground">
                  {check.vars.join(" · ")}
                </p>
              </div>
              <span
                className={
                  check.ok
                    ? "shrink-0 rounded-full bg-palm-soft px-2.5 py-0.5 text-xs font-semibold text-palm-deep ring-1 ring-palm/30 ring-inset"
                    : "shrink-0 rounded-full bg-destructive/10 px-2.5 py-0.5 text-xs font-semibold text-destructive ring-1 ring-destructive/30 ring-inset"
                }
              >
                {check.ok ? "Configured" : "Not set"}
              </span>
            </li>
          ))}
        </ul>

        {email.configured ? (
          <p className="mt-4 border-t border-border pt-4 text-sm text-muted-foreground">
            Mail is sent from{" "}
            <span className="font-medium text-ink">{email.from}</span>. That
            address’s domain must be verified with the email provider, or every
            send is rejected — the enquiry is still stored either way.
          </p>
        ) : null}
      </Panel>

      {mayManage ? (
        <>
          <Panel
            title="Add or update an account"
            description="Entering an address that already exists updates it, which is how a role change or password reset is done."
          >
            <UserForm />
          </Panel>

          <Panel title="Accounts">
            {usersError ? (
              <Notice tone="warning" title="Could not load accounts">
                <p>{usersError}</p>
              </Notice>
            ) : users.length === 0 ? (
              <EmptyState title="No accounts yet">
                Create the first one with the form above, or run{" "}
                <code>crm_upsert_user</code> in the SQL editor.
              </EmptyState>
            ) : (
              <ul className="divide-y divide-border">
                {users.map((account) => (
                  <li
                    key={account.id}
                    className="flex flex-wrap items-start justify-between gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <p className="flex flex-wrap items-center gap-2 text-sm font-medium text-ink">
                        {account.name || account.email}
                        <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground">
                          {roleLabels[account.role]}
                        </span>
                        {!account.isActive ? (
                          <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-semibold text-destructive">
                            Disabled
                          </span>
                        ) : null}
                        {account.id === user.id ? (
                          <span className="text-xs text-muted-foreground">(you)</span>
                        ) : null}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {account.email} · last signed in{" "}
                        {account.lastLoginAt
                          ? formatDateTime(account.lastLoginAt)
                          : "never"}
                      </p>
                    </div>
                    <UserRowControls
                      user={account}
                      isSelf={account.id === user.id}
                    />
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </>
      ) : (
        <Panel title="Accounts">
          <p className="text-sm text-muted-foreground">
            Only an Owner can add, change or remove accounts.
          </p>
        </Panel>
      )}
    </div>
  );
}
