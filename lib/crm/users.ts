import "server-only";

import { db } from "./supabase";
import { isRole, type CrmUser, type Role, type SessionUser } from "./types";

/**
 * CRM accounts.
 *
 * Passwords never pass through this module in either direction except on their
 * way into a database function. Hashing and comparison happen inside Postgres
 * (bcrypt via pgcrypto, in `SECURITY DEFINER` functions), so no hash is ever
 * loaded into the application and there is no way for code here to compare one
 * incorrectly. Every select below names its columns explicitly rather than
 * using `*`, so `password_hash` cannot be picked up by accident.
 */

const COLUMNS = "id, email, name, role, is_active, last_login_at, created_at";

type UserRow = {
  id: string;
  email: string;
  name: string | null;
  role: string;
  is_active: boolean;
  last_login_at: string | null;
  created_at: string;
};

function rowToUser(row: UserRow): CrmUser {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    role: isRole(row.role) ? row.role : "agent",
    isActive: row.is_active,
    lastLoginAt: row.last_login_at,
    createdAt: row.created_at,
  };
}

/** The minimum length a new password may have, enforced here and in Postgres. */
export const MIN_PASSWORD_LENGTH = 12;

/**
 * Checks an email and password against the database.
 *
 * Returns the account on success and null on any failure, without saying which
 * — an unknown address and a wrong password are indistinguishable to the
 * caller, so this cannot be used to enumerate who has an account. Inactive
 * accounts never match, which is enforced inside the SQL function rather than
 * here.
 */
export async function verifyCredentials(
  email: string,
  password: string
): Promise<SessionUser | null> {
  if (!email.trim() || !password) return null;

  const { data, error } = await db().rpc("crm_verify_user", {
    p_email: email,
    p_password: password,
  });

  if (error) throw new Error(error.message);

  const row = Array.isArray(data) ? data[0] : data;
  if (!row || typeof row !== "object") return null;

  const candidate = row as { id?: string; email?: string; name?: string | null; role?: string };
  if (!candidate.id || !candidate.email || !isRole(candidate.role)) return null;

  return {
    id: candidate.id,
    email: candidate.email,
    name: candidate.name ?? null,
    role: candidate.role,
  };
}

/** Re-reads an account by id. Used on every request to re-check the session. */
export async function getUserById(id: string): Promise<CrmUser | null> {
  const { data, error } = await db()
    .from("crm_users")
    .select(COLUMNS)
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data ? rowToUser(data as UserRow) : null;
}

export async function listUsers(): Promise<CrmUser[]> {
  const { data, error } = await db()
    .from("crm_users")
    .select(COLUMNS)
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return (data as UserRow[]).map(rowToUser);
}

export async function recordLogin(id: string): Promise<void> {
  const { error } = await db()
    .from("crm_users")
    .update({ last_login_at: new Date().toISOString() })
    .eq("id", id);
  // A failed timestamp write must not fail a successful sign-in.
  if (error) console.error("[crm] could not record sign-in time");
}

/**
 * Creates an account, or updates an existing one's name, role or password.
 *
 * `password: null` leaves an existing password alone, so changing someone's
 * role never involves resetting their credentials. The database rejects a new
 * account without a password, and rejects demoting or deactivating the last
 * active owner, so the CRM cannot be locked out by an account edit.
 */
export async function upsertUser(input: {
  email: string;
  password: string | null;
  name: string | null;
  role: Role;
}): Promise<string> {
  const { data, error } = await db().rpc("crm_upsert_user", {
    p_email: input.email,
    p_password: input.password,
    p_name: input.name,
    p_role: input.role,
  });

  if (error) throw new Error(error.message);
  return data as string;
}

export async function setUserActive(id: string, isActive: boolean): Promise<void> {
  const { error } = await db()
    .from("crm_users")
    .update({ is_active: isActive })
    .eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteUser(id: string): Promise<void> {
  const { error } = await db().from("crm_users").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

/** True when no account exists yet, so the CRM can offer first-run setup. */
export async function countUsers(): Promise<number> {
  const { count, error } = await db()
    .from("crm_users")
    .select("id", { count: "exact", head: true });
  if (error) throw new Error(error.message);
  return count ?? 0;
}
