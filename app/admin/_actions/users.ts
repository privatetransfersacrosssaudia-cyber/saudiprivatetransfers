"use server";

import { revalidatePath } from "next/cache";

import { authorize } from "@/lib/crm/auth";
import { assertSameOrigin } from "@/lib/crm/request";
import {
  MIN_PASSWORD_LENGTH,
  deleteUser,
  getUserById,
  listUsers,
  setUserActive,
  upsertUser,
} from "@/lib/crm/users";
import { isRole } from "@/lib/crm/types";

import type { ActionState } from "@/lib/crm/action-state";

async function guard() {
  const origin = await assertSameOrigin();
  if (!origin.ok) return { ok: false as const, message: origin.error };

  const auth = await authorize("users:manage");
  if (!auth.ok) return { ok: false as const, message: auth.error };

  return { ok: true as const, user: auth.user };
}

function text(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Creates an account, or updates an existing one's name, role or password.
 *
 * The password is validated here for a useful error message and again inside
 * Postgres, which is what actually refuses a short one — the database check is
 * the one that cannot be bypassed by calling the action directly.
 */
export async function saveUser(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const gate = await guard();
  if (!gate.ok) return { ok: false, message: gate.message };

  const email = text(formData, "email").toLowerCase();
  const name = text(formData, "name");
  const role = text(formData, "role");
  const password = formData.get("password");
  const passwordText = typeof password === "string" ? password : "";

  if (!EMAIL.test(email)) {
    return { ok: false, message: "Enter a valid email address." };
  }
  if (!isRole(role)) {
    return { ok: false, message: "Choose a role." };
  }
  if (passwordText && passwordText.length < MIN_PASSWORD_LENGTH) {
    return {
      ok: false,
      message: `A password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
    };
  }

  try {
    await upsertUser({
      email,
      // An empty box means "leave the password alone", which is what makes it
      // safe to edit someone's role without resetting their credentials.
      password: passwordText || null,
      name: name || null,
      role,
    });
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Could not save the account.",
    };
  }

  revalidatePath("/admin/settings/");
  return { ok: true, message: `Saved ${email}.` };
}

export async function toggleUserActive(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const gate = await guard();
  if (!gate.ok) return { ok: false, message: gate.message };

  const id = text(formData, "userId");
  const active = text(formData, "active") === "true";
  if (!id) return { ok: false, message: "Missing account." };

  /**
   * Signing yourself out of your own CRM by deactivating your own account is
   * a mistake worth preventing in the interface, not only in the database.
   * The database still guards the last-owner case independently.
   */
  if (id === gate.user.id && !active) {
    return { ok: false, message: "You cannot deactivate your own account." };
  }

  try {
    await setUserActive(id, active);
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Could not update the account.",
    };
  }

  revalidatePath("/admin/settings/");
  return { ok: true, message: active ? "Account re-enabled." : "Account disabled." };
}

export async function removeUser(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const gate = await guard();
  if (!gate.ok) return { ok: false, message: gate.message };

  const id = text(formData, "userId");
  if (!id) return { ok: false, message: "Missing account." };
  if (id === gate.user.id) {
    return { ok: false, message: "You cannot delete your own account." };
  }

  const target = await getUserById(id).catch(() => null);
  if (!target) return { ok: false, message: "That account no longer exists." };

  try {
    await deleteUser(id);
  } catch (error) {
    // The database refuses to delete the last active owner; surface that
    // message rather than a generic failure.
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Could not delete the account.",
    };
  }

  revalidatePath("/admin/settings/");
  return { ok: true, message: `Deleted ${target.email}.` };
}

/** Used by the settings screen; re-authorized rather than trusted from the page. */
export async function loadUsers() {
  const auth = await authorize("users:manage");
  if (!auth.ok) return [];
  return listUsers();
}
