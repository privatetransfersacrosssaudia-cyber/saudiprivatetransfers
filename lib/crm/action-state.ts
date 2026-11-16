/**
 * The shape a CRM form action reports back, and its initial value.
 *
 * This lives outside the `"use server"` files on purpose. A file marked
 * `"use server"` may only export async functions — every export becomes a
 * callable server endpoint — so exporting a plain object from one throws
 * "A 'use server' file can only export async functions, found object" when the
 * module is first evaluated. The build does not catch it; the first request
 * that touches the module does.
 *
 * Types are erased at compile time and so are safe to export from an action
 * file, but the initial-state constants are real runtime values and belong
 * here, where both the actions and the client components can import them.
 */
export type ActionState = {
  ok: boolean;
  message: string | null;
};

/** Nothing has been submitted yet, so there is nothing to report. */
export const idleAction: ActionState = { ok: true, message: null };

/** The sign-in form reports only an error, so it has its own small shape. */
export type LoginState = { error: string | null };

export const initialLoginState: LoginState = { error: null };
