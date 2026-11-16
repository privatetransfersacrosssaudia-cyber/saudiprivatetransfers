"use client";

import { useActionState } from "react";
import { AlertTriangleIcon, CheckIcon, Loader2Icon, UserPlusIcon } from "lucide-react";

import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  removeUser,
  saveUser,
  toggleUserActive,
} from "@/app/admin/_actions/users";
import { idleAction, type ActionState } from "@/lib/crm/action-state";
import { ROLES, roleDescriptions, roleLabels, type CrmUser, type Role } from "@/lib/crm/types";

function Result({ state }: { state: ActionState }) {
  if (!state.message) return null;
  return (
    <p
      role="status"
      className={cn(
        "flex items-start gap-1.5 text-sm",
        state.ok ? "text-palm" : "text-destructive"
      )}
    >
      {state.ok ? (
        <CheckIcon aria-hidden className="mt-0.5 size-3.5 shrink-0" />
      ) : (
        <AlertTriangleIcon aria-hidden className="mt-0.5 size-3.5 shrink-0" />
      )}
      <span>{state.message}</span>
    </p>
  );
}

const selectClass =
  "h-9 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm text-ink outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

/**
 * Add or update an account.
 *
 * One form for both: entering an address that already exists updates that
 * account rather than failing on a duplicate, which is how a password reset
 * and a role change are done. Leaving the password empty keeps the current
 * one.
 */
export function UserForm({ existing }: { existing?: CrmUser }) {
  const [state, formAction, pending] = useActionState(saveUser, idleAction);

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="user-email"
            className="mb-1 block text-xs font-medium tracking-wide text-muted-foreground uppercase"
          >
            Email address
          </label>
          <Input
            id="user-email"
            name="email"
            type="email"
            required
            autoComplete="off"
            defaultValue={existing?.email ?? ""}
            className="h-9"
          />
        </div>

        <div>
          <label
            htmlFor="user-name"
            className="mb-1 block text-xs font-medium tracking-wide text-muted-foreground uppercase"
          >
            Name
          </label>
          <Input
            id="user-name"
            name="name"
            autoComplete="off"
            defaultValue={existing?.name ?? ""}
            className="h-9"
          />
        </div>

        <div>
          <label
            htmlFor="user-role"
            className="mb-1 block text-xs font-medium tracking-wide text-muted-foreground uppercase"
          >
            Role
          </label>
          <select
            id="user-role"
            name="role"
            defaultValue={existing?.role ?? "agent"}
            className={selectClass}
          >
            {ROLES.map((role: Role) => (
              <option key={role} value={role}>
                {roleLabels[role]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="user-password"
            className="mb-1 block text-xs font-medium tracking-wide text-muted-foreground uppercase"
          >
            Password
          </label>
          <Input
            id="user-password"
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={12}
            placeholder="Leave empty to keep the current one"
            className="h-9"
          />
        </div>
      </div>

      <ul className="space-y-1 text-xs text-muted-foreground">
        {ROLES.map((role: Role) => (
          <li key={role}>
            <span className="font-semibold text-ink">{roleLabels[role]}</span> —{" "}
            {roleDescriptions[role]}
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between gap-3">
        <Result state={state} />
        <Button type="submit" disabled={pending} className="ms-auto shrink-0">
          {pending ? (
            <Loader2Icon aria-hidden className="size-3.5 animate-spin" />
          ) : (
            <UserPlusIcon aria-hidden className="size-3.5" />
          )}
          Save account
        </Button>
      </div>
    </form>
  );
}

export function UserRowControls({
  user,
  isSelf,
}: {
  user: CrmUser;
  isSelf: boolean;
}) {
  const [toggleState, toggleAction, toggling] = useActionState(
    toggleUserActive,
    idleAction
  );
  const [deleteState, deleteAction, deleting] = useActionState(
    removeUser,
    idleAction
  );

  const message = deleteState.message ?? toggleState.message;
  const ok = deleteState.message ? deleteState.ok : toggleState.ok;

  return (
    <div className="flex flex-col items-end gap-1.5">
      <div className="flex items-center gap-2">
        <form action={toggleAction}>
          <input type="hidden" name="userId" value={user.id} />
          <input type="hidden" name="active" value={String(!user.isActive)} />
          <Button
            type="submit"
            size="xs"
            variant="outline"
            disabled={toggling || isSelf}
            title={
              isSelf
                ? "You cannot disable your own account"
                : user.isActive
                  ? "Disable this account"
                  : "Re-enable this account"
            }
          >
            {toggling ? (
              <Loader2Icon aria-hidden className="size-3 animate-spin" />
            ) : null}
            {user.isActive ? "Disable" : "Enable"}
          </Button>
        </form>

        <form
          action={deleteAction}
          onSubmit={(event) => {
            if (!window.confirm(`Delete the account ${user.email}? This cannot be undone.`)) {
              event.preventDefault();
            }
          }}
        >
          <input type="hidden" name="userId" value={user.id} />
          <Button
            type="submit"
            size="xs"
            variant="destructive"
            disabled={deleting || isSelf}
            title={isSelf ? "You cannot delete your own account" : "Delete this account"}
          >
            {deleting ? (
              <Loader2Icon aria-hidden className="size-3 animate-spin" />
            ) : null}
            Delete
          </Button>
        </form>
      </div>
      {message ? <Result state={{ ok, message }} /> : null}
    </div>
  );
}
