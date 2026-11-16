import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { supabaseConfig } from "./config";

/**
 * The CRM's only database client, holding the service-role key.
 *
 * `server-only` at the top of this file is load-bearing: the service-role key
 * bypasses Row Level Security entirely, so importing this module from anything
 * that reaches the browser would hand a visitor full read and write access to
 * every table. With the import in place, that mistake fails the build instead
 * of shipping. Nothing in this project uses a browser-side Supabase client,
 * and no anon key is configured.
 */
let cached: SupabaseClient | null = null;

export class DatabaseNotConfiguredError extends Error {
  constructor() {
    super(
      "The CRM database is not configured. Set SUPABASE_URL and " +
        "SUPABASE_SERVICE_ROLE_KEY, then run supabase/schema.sql."
    );
    this.name = "DatabaseNotConfiguredError";
  }
}

export function db(): SupabaseClient {
  const { url, serviceRoleKey, configured } = supabaseConfig();
  if (!configured) throw new DatabaseNotConfiguredError();

  if (!cached) {
    cached = createClient(url!, serviceRoleKey!, {
      auth: { persistSession: false, autoRefreshToken: false },
      // Nothing here is a logged-in Supabase user; every call is the server
      // acting on its own authority, so there is no session to keep.
      global: { headers: { "X-Client-Info": "pts-crm" } },
    });
  }
  return cached;
}

/**
 * Turns a PostgREST error into something safe to show a signed-in operator.
 *
 * Postgres messages can carry column names, constraint names and fragments of
 * the offending row. That is useful to the person running the desk and useless
 * to a visitor, so callers only ever surface this behind the auth gate, and
 * public endpoints return a generic sentence instead.
 */
export function describeDbError(error: unknown): string {
  if (error instanceof DatabaseNotConfiguredError) return error.message;
  if (error && typeof error === "object" && "message" in error) {
    return String((error as { message: unknown }).message);
  }
  return "The database rejected the request.";
}
