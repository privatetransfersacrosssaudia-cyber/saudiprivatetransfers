"use client";

import { useActionState } from "react";
import { AlertTriangleIcon, Loader2Icon, LogInIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "@/app/admin/_actions/auth";
import { initialLoginState } from "@/lib/crm/action-state";

export function LoginForm({
  next,
  disabled = false,
}: {
  next?: string;
  disabled?: boolean;
}) {
  const [state, formAction, pending] = useActionState(signIn, initialLoginState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {next ? <input type="hidden" name="next" value={next} /> : null}

      {state.error ? (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          <AlertTriangleIcon aria-hidden className="mt-0.5 size-4 shrink-0" />
          <span>{state.error}</span>
        </p>
      ) : null}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="crm-email" className="text-sm font-medium text-ink">
          Email address
        </label>
        <Input
          id="crm-email"
          name="email"
          type="email"
          autoComplete="username"
          required
          disabled={disabled}
          className="h-10"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="crm-password" className="text-sm font-medium text-ink">
          Password
        </label>
        <Input
          id="crm-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          disabled={disabled}
          className="h-10"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={pending || disabled}
        className="mt-1 h-10 w-full"
      >
        {pending ? (
          <>
            <Loader2Icon aria-hidden className="size-4 animate-spin" />
            Signing in…
          </>
        ) : (
          <>
            <LogInIcon aria-hidden className="size-4" />
            Sign in
          </>
        )}
      </Button>
    </form>
  );
}
