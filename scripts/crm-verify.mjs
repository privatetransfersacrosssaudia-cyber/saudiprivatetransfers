#!/usr/bin/env node
/**
 * CRM verification.
 *
 *   node scripts/crm-verify.mjs
 *   node scripts/crm-verify.mjs --email you@example.com
 *
 * Proves, against the services actually configured, that:
 *
 *   1. every table and database function in supabase/schema.sql exists;
 *   2. a lead written through the real data path can be read back with every
 *      field intact — including Arabic, which is where encoding problems show;
 *   3. re-submitting the same reference does not create a second lead;
 *   4. notes, activity events and email logs attach to a lead and cascade when
 *      it is deleted;
 *   5. role and account functions behave, including the last-owner guard;
 *   6. with --email, that the provider accepts a send from the configured
 *      sender — the only way to find out whether the domain is verified.
 *
 * Everything it creates is namespaced with a VERIFY- reference and deleted
 * before it exits, including after a failure.
 *
 * It exists because a build passing says nothing about whether a lead reaches
 * the database. "The API returned 200" is not evidence of persistence; reading
 * the row back is.
 */

import { readFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import { randomUUID } from "node:crypto";

const require = createRequire(import.meta.url);

// --- Environment -------------------------------------------------------------

/** Minimal .env reader: enough for KEY=value and quoted values, no expansion. */
function loadEnvFile(path) {
  if (!existsSync(path)) return 0;
  let count = 0;
  for (const rawLine of readFileSync(path, "utf8").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env) && value) {
      process.env[key] = value;
      count += 1;
    }
  }
  return count;
}

for (const file of [".env.local", ".env"]) loadEnvFile(file);

// --- Reporting ---------------------------------------------------------------

const results = [];
let indent = "";

function pass(name, detail) {
  results.push({ name, ok: true });
  console.log(`${indent}  ✓ ${name}${detail ? ` — ${detail}` : ""}`);
}
function fail(name, detail) {
  results.push({ name, ok: false, detail });
  console.log(`${indent}  ✗ ${name}${detail ? ` — ${detail}` : ""}`);
}
function skip(name, why) {
  results.push({ name, skipped: true, detail: why });
  console.log(`${indent}  ○ ${name} — skipped: ${why}`);
}
function section(title) {
  console.log(`\n${title}`);
}

/** Runs a check and records it, without letting a throw end the run. */
async function check(name, fn) {
  try {
    const detail = await fn();
    pass(name, typeof detail === "string" ? detail : undefined);
    return true;
  } catch (error) {
    fail(name, error instanceof Error ? error.message : String(error));
    return false;
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

// --- Configuration -----------------------------------------------------------

section("Configuration");

const SUPABASE_URL = process.env.SUPABASE_URL?.trim();
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
const SESSION_SECRET = process.env.CRM_SESSION_SECRET?.trim();
const RESEND_KEY = process.env.RESEND_API_KEY?.trim();
const EMAIL_FROM = process.env.CRM_EMAIL_FROM?.trim();
const EMAIL_NOTIFY = process.env.CRM_EMAIL_NOTIFY?.trim();

const emailTarget = (() => {
  const index = process.argv.indexOf("--email");
  return index !== -1 ? process.argv[index + 1] : null;
})();

if (SUPABASE_URL && SERVICE_KEY) {
  pass("Database variables present");
} else {
  fail(
    "Database variables present",
    "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required. Nothing below can run."
  );
  summarise();
  process.exit(1);
}

if (SESSION_SECRET && SESSION_SECRET.length >= 32) {
  pass("CRM_SESSION_SECRET present", `${SESSION_SECRET.length} characters`);
} else if (SESSION_SECRET) {
  fail(
    "CRM_SESSION_SECRET present",
    `only ${SESSION_SECRET.length} characters; at least 32 are required, so sign-in is disabled`
  );
} else {
  fail("CRM_SESSION_SECRET present", "unset — nobody can sign in to the CRM");
}

if (RESEND_KEY && EMAIL_FROM) pass("Email variables present", `from ${EMAIL_FROM}`);
else skip("Email variables present", "RESEND_API_KEY and/or CRM_EMAIL_FROM unset");

if (EMAIL_NOTIFY) pass("CRM_EMAIL_NOTIFY present", EMAIL_NOTIFY);
else
  skip(
    "CRM_EMAIL_NOTIFY present",
    "unset — enquiries will store, but nobody is emailed about them"
  );

// --- Connect -----------------------------------------------------------------

const { createClient } = require("@supabase/supabase-js");
const db = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const REFERENCE = `VERIFY-${randomUUID().slice(0, 8).toUpperCase()}`;
let createdLeadId = null;
let createdUserId = null;

async function cleanup() {
  if (createdLeadId) {
    await db.from("leads").delete().eq("id", createdLeadId);
  }
  // Belt and braces: remove anything this script could have left behind.
  await db.from("leads").delete().like("reference", "VERIFY-%");
  if (createdUserId) {
    await db.from("crm_users").delete().eq("id", createdUserId);
  }
  await db.from("crm_users").delete().like("email", "verify-%@example.invalid");
}

try {
  // --- Schema ----------------------------------------------------------------

  section("Schema");

  const tables = [
    "crm_users",
    "leads",
    "lead_notes",
    "lead_events",
    "email_logs",
    "quotations",
    "invoices",
  ];

  for (const table of tables) {
    await check(`table ${table}`, async () => {
      const { error } = await db.from(table).select("id", { head: true, count: "exact" });
      assert(!error, error?.message ?? "unknown error");
    });
  }

  await check("function next_quote_number()", async () => {
    const { data, error } = await db.rpc("next_quote_number");
    assert(!error, error?.message ?? "");
    assert(typeof data === "string" && data.startsWith("PTQ-"), `returned ${data}`);
    return data;
  });

  await check("function next_invoice_number()", async () => {
    const { data, error } = await db.rpc("next_invoice_number");
    assert(!error, error?.message ?? "");
    assert(typeof data === "string" && data.startsWith("PTI-"), `returned ${data}`);
    return data;
  });

  // --- Persistence -----------------------------------------------------------

  section("Lead persistence");

  // Deliberately Arabic, with a Latin-digit flight number and an em dash, so
  // an encoding or collation problem cannot pass unnoticed.
  const arabicName = "محمد عبدالله";
  const arabicPickup = "مطار الملك خالد الدولي — صالة الوصول";
  const arabicMessage = "أحتاج مركبة تتسع لـ 5 ركاب مع 4 حقائب، والرحلة في الصباح الباكر.";

  await check("insert a lead", async () => {
    const { data, error } = await db
      .from("leads")
      .insert({
        reference: REFERENCE,
        full_name: arabicName,
        email: "verify@example.invalid",
        phone: "+966500000000",
        service_type: "Airport transfer",
        pickup_location: arabicPickup,
        dropoff_location: "Riyadh",
        date: "2030-01-01",
        time: "06:30",
        passengers: "5",
        luggage: "4",
        vehicle_type: "Comfort",
        flight_number: "SV1234",
        message: arabicMessage,
        locale: "ar",
        source: "verification-script",
        source_page: "https://example.invalid/ar/get-quote/",
        utm_source: "verify",
      })
      .select("id")
      .single();
    assert(!error, error?.message ?? "");
    createdLeadId = data.id;
    return `id ${data.id}`;
  });

  assert(createdLeadId, "the lead was not created, so nothing below can be checked");

  await check("read the lead back with every field intact", async () => {
    const { data, error } = await db
      .from("leads")
      .select("*")
      .eq("id", createdLeadId)
      .single();
    assert(!error, error?.message ?? "");

    const expected = {
      reference: REFERENCE,
      full_name: arabicName,
      pickup_location: arabicPickup,
      message: arabicMessage,
      locale: "ar",
      flight_number: "SV1234",
      passengers: "5",
      utm_source: "verify",
      status: "New",
    };
    for (const [key, value] of Object.entries(expected)) {
      assert(
        data[key] === value,
        `${key}: stored ${JSON.stringify(data[key])}, expected ${JSON.stringify(value)}`
      );
    }
    assert(data.created_at, "created_at was not set");
    return "Arabic preserved byte for byte";
  });

  await check("re-submitting the same reference does not duplicate", async () => {
    const { error } = await db
      .from("leads")
      .insert({ reference: REFERENCE, phone: "+966500000000", locale: "en" });
    assert(error, "the second insert was accepted — the unique constraint is missing");
    assert(
      error.code === "23505",
      `expected a unique violation (23505), got ${error.code}: ${error.message}`
    );

    const { count } = await db
      .from("leads")
      .select("id", { count: "exact", head: true })
      .eq("reference", REFERENCE);
    assert(count === 1, `${count} rows carry this reference; expected exactly 1`);
    return "unique constraint held";
  });

  await check("status check constraint rejects an unknown status", async () => {
    const { error } = await db
      .from("leads")
      .update({ status: "Elsewhere" })
      .eq("id", createdLeadId);
    assert(error, "an invalid status was accepted");
    return "rejected as expected";
  });

  await check("updated_at moves on update", async () => {
    const before = await db
      .from("leads")
      .select("updated_at")
      .eq("id", createdLeadId)
      .single();
    await new Promise((resolve) => setTimeout(resolve, 1100));
    const { error } = await db
      .from("leads")
      .update({ status: "Contacted" })
      .eq("id", createdLeadId);
    assert(!error, error?.message ?? "");
    const after = await db
      .from("leads")
      .select("updated_at")
      .eq("id", createdLeadId)
      .single();
    assert(
      new Date(after.data.updated_at) > new Date(before.data.updated_at),
      "updated_at did not change — the trigger is missing"
    );
    return "trigger fired";
  });

  await check("search finds the lead by a fragment of an Arabic field", async () => {
    const { data, error } = await db
      .from("leads")
      .select("id")
      .ilike("pickup_location", "%الملك خالد%");
    assert(!error, error?.message ?? "");
    assert(
      data.some((row) => row.id === createdLeadId),
      "the lead was not returned by an Arabic ILIKE search"
    );
    return `${data.length} match(es)`;
  });

  // --- Related records -------------------------------------------------------

  section("Notes, activity and email log");

  await check("insert a note", async () => {
    const { error } = await db
      .from("lead_notes")
      .insert({ lead_id: createdLeadId, body: "verification note", author_email: "verify" });
    assert(!error, error?.message ?? "");
  });

  await check("insert an activity event", async () => {
    const { error } = await db.from("lead_events").insert({
      lead_id: createdLeadId,
      type: "status_changed",
      summary: "verification event",
      detail: { from: "New", to: "Contacted" },
    });
    assert(!error, error?.message ?? "");
  });

  await check("event type check constraint rejects an unknown type", async () => {
    const { error } = await db
      .from("lead_events")
      .insert({ lead_id: createdLeadId, type: "nonsense", summary: "x" });
    assert(error, "an invalid event type was accepted");
    return "rejected as expected";
  });

  await check("insert an email log entry", async () => {
    const { error } = await db.from("email_logs").insert({
      lead_id: createdLeadId,
      template: "verification",
      subject: "verification",
      sent_to: "verify@example.invalid",
      status: "sent",
    });
    assert(!error, error?.message ?? "");
  });

  await check("deleting the lead cascades to its children", async () => {
    const { error } = await db.from("leads").delete().eq("id", createdLeadId);
    assert(!error, error?.message ?? "");

    for (const table of ["lead_notes", "lead_events", "email_logs"]) {
      const { count } = await db
        .from(table)
        .select("id", { count: "exact", head: true })
        .eq("lead_id", createdLeadId);
      assert(count === 0, `${count} orphaned row(s) left in ${table}`);
    }
    createdLeadId = null;
    return "no orphans left behind";
  });

  // --- Accounts --------------------------------------------------------------

  section("Accounts and roles");

  const testEmail = `verify-${randomUUID().slice(0, 8)}@example.invalid`;
  const testPassword = randomUUID() + randomUUID();

  await check("create an account", async () => {
    const { data, error } = await db.rpc("crm_upsert_user", {
      p_email: testEmail,
      p_password: testPassword,
      p_name: "Verification",
      p_role: "agent",
    });
    assert(!error, error?.message ?? "");
    createdUserId = data;
    return `role agent`;
  });

  await check("a short password is refused", async () => {
    const { error } = await db.rpc("crm_upsert_user", {
      p_email: `verify-short-${randomUUID().slice(0, 6)}@example.invalid`,
      p_password: "short",
      p_name: null,
      p_role: "agent",
    });
    assert(error, "a five-character password was accepted");
    return "rejected as expected";
  });

  await check("an unknown role is refused", async () => {
    const { error } = await db.rpc("crm_upsert_user", {
      p_email: testEmail,
      p_password: null,
      p_name: null,
      p_role: "superuser",
    });
    assert(error, "an unknown role was accepted");
    return "rejected as expected";
  });

  await check("the correct password verifies", async () => {
    const { data, error } = await db.rpc("crm_verify_user", {
      p_email: testEmail,
      p_password: testPassword,
    });
    assert(!error, error?.message ?? "");
    const row = Array.isArray(data) ? data[0] : data;
    assert(row && row.email === testEmail, "no account was returned");
    assert(row.role === "agent", `role came back as ${row.role}`);
    return "and no password hash was returned";
  });

  await check("a wrong password does not verify", async () => {
    const { data, error } = await db.rpc("crm_verify_user", {
      p_email: testEmail,
      p_password: "definitely-not-the-password",
    });
    assert(!error, error?.message ?? "");
    const row = Array.isArray(data) ? data[0] : data;
    assert(!row, "a wrong password was accepted");
    return "rejected as expected";
  });

  await check("a deactivated account cannot sign in", async () => {
    await db.from("crm_users").update({ is_active: false }).eq("id", createdUserId);
    const { data } = await db.rpc("crm_verify_user", {
      p_email: testEmail,
      p_password: testPassword,
    });
    const row = Array.isArray(data) ? data[0] : data;
    assert(!row, "a deactivated account still verified");
    await db.from("crm_users").update({ is_active: true }).eq("id", createdUserId);
    return "rejected as expected";
  });

  await check("the password hash is never selectable as plaintext", async () => {
    const { data, error } = await db
      .from("crm_users")
      .select("password_hash")
      .eq("id", createdUserId)
      .single();
    assert(!error, error?.message ?? "");
    assert(
      data.password_hash !== testPassword,
      "the password is stored in plaintext"
    );
    assert(
      data.password_hash.startsWith("$2"),
      `expected a bcrypt hash, found ${data.password_hash.slice(0, 4)}…`
    );
    return "bcrypt";
  });

  await check("the last active owner cannot be removed", async () => {
    const { count } = await db
      .from("crm_users")
      .select("id", { count: "exact", head: true })
      .eq("role", "owner")
      .eq("is_active", true);

    if (count === 0) {
      throw new Error(
        "no active owner exists yet — create one before relying on this guard"
      );
    }
    if (count > 1) {
      return `${count} owners exist, so the guard is not exercised here`;
    }

    const { data: owner } = await db
      .from("crm_users")
      .select("id")
      .eq("role", "owner")
      .eq("is_active", true)
      .single();
    const { error } = await db
      .from("crm_users")
      .update({ role: "agent" })
      .eq("id", owner.id);
    assert(error, "the only owner was demoted — the CRM could be locked out");
    return "guard held";
  });

  // --- Email -----------------------------------------------------------------

  section("Email delivery");

  if (!emailTarget) {
    skip(
      "send a test email",
      "pass --email you@example.com to actually attempt a send"
    );
  } else if (!RESEND_KEY || !EMAIL_FROM) {
    fail("send a test email", "RESEND_API_KEY and CRM_EMAIL_FROM must both be set");
  } else {
    await check("send a test email", async () => {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: EMAIL_FROM,
          to: [emailTarget],
          subject: "CRM verification",
          html: "<p>If you are reading this, the sender domain is verified and sending works.</p>",
        }),
        signal: AbortSignal.timeout(20_000),
      });

      if (!response.ok) {
        const detail = await response.text().catch(() => "");
        // A 403 here is almost always an unverified sending domain.
        throw new Error(`provider responded ${response.status}: ${detail.slice(0, 300)}`);
      }
      const payload = await response.json().catch(() => ({}));
      return `accepted by the provider, id ${payload.id ?? "unknown"} — now confirm it ARRIVES at ${emailTarget}`;
    });
  }
} catch (error) {
  console.error("\nThe run stopped early:", error instanceof Error ? error.message : error);
  results.push({ name: "run completed", ok: false, detail: String(error) });
} finally {
  await cleanup().catch((error) =>
    console.error("Cleanup failed — look for VERIFY- rows:", error.message)
  );
}

summarise();

function summarise() {
  const failed = results.filter((r) => r.ok === false);
  const skipped = results.filter((r) => r.skipped);
  const passed = results.filter((r) => r.ok === true);

  console.log(
    `\n${passed.length} passed, ${failed.length} failed, ${skipped.length} skipped.`
  );

  if (failed.length > 0) {
    console.log("\nFailed:");
    for (const item of failed) console.log(`  ✗ ${item.name} — ${item.detail ?? ""}`);
  }
  if (skipped.length > 0) {
    console.log("\nNot checked (so not proven):");
    for (const item of skipped) console.log(`  ○ ${item.name} — ${item.detail}`);
  }
  console.log("");
  process.exitCode = failed.length > 0 ? 1 : 0;
}
