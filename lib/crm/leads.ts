import "server-only";

import type { Locale } from "@/lib/i18n/config";

import { db } from "./supabase";
import {
  ATTRIBUTION_KEYS,
  PAGE_SIZE,
  isLeadStatus,
  type AttributionKey,
  type Lead,
  type LeadAttribution,
  type LeadEditableFields,
  type LeadEvent,
  type LeadEventType,
  type LeadNote,
  type LeadQuery,
  type LeadStatus,
  type Page,
  type SessionUser,
  type EmailLogEntry,
} from "./types";

/**
 * Leads: the CRM's core record, plus its notes, audit trail and email log.
 *
 * Columns are snake_case in Postgres and camelCase in TypeScript, mapped
 * explicitly in both directions below. The mapping is tedious and deliberate:
 * it is the one place a column rename has to be reflected, and it keeps the
 * database's naming out of every component.
 */

const TABLE = "leads";

/**
 * Lead columns plus the assignee's name and email, in one round trip.
 *
 * PostgREST resolves `crm_users!leads_assigned_to_fkey` through the foreign
 * key, so the list screen shows who owns each enquiry without a second query
 * or an N+1 per row. The constraint name comes from the column definition in
 * supabase/schema.sql — if that FK is ever renamed, this string must follow.
 */
const SELECT_WITH_ASSIGNEE = `
  id, reference, full_name, email, phone, service_type, pickup_location,
  dropoff_location, date, time, passengers, luggage, vehicle_type,
  flight_number, message, locale, source, source_page, status, assigned_to,
  first_landing_page, first_referrer, first_utm_source, first_utm_medium,
  first_utm_campaign, landing_page, referrer, utm_source, utm_medium,
  utm_campaign, gclid, search_source,
  created_at, updated_at,
  assignee:crm_users!leads_assigned_to_fkey ( email, name )
`;

type LeadRow = {
  id: string;
  reference: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  service_type: string | null;
  pickup_location: string | null;
  dropoff_location: string | null;
  date: string | null;
  time: string | null;
  passengers: string | null;
  luggage: string | null;
  vehicle_type: string | null;
  flight_number: string | null;
  message: string | null;
  locale: string;
  source: string;
  source_page: string | null;
  status: string;
  assigned_to: string | null;
  first_landing_page: string | null;
  first_referrer: string | null;
  first_utm_source: string | null;
  first_utm_medium: string | null;
  first_utm_campaign: string | null;
  landing_page: string | null;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  gclid: string | null;
  search_source: string | null;
  created_at: string;
  updated_at: string;
  assignee?: { email: string | null; name: string | null } | null;
};

/** The database column behind each attribution key, in one place. */
const ATTRIBUTION_COLUMNS: Record<AttributionKey, keyof LeadRow> = {
  firstLandingPage: "first_landing_page",
  firstReferrer: "first_referrer",
  firstUtmSource: "first_utm_source",
  firstUtmMedium: "first_utm_medium",
  firstUtmCampaign: "first_utm_campaign",
  landingPage: "landing_page",
  referrer: "referrer",
  utmSource: "utm_source",
  utmMedium: "utm_medium",
  utmCampaign: "utm_campaign",
  gclid: "gclid",
  searchSource: "search_source",
};

function rowToLead(row: LeadRow): Lead {
  return {
    id: row.id,
    reference: row.reference,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    serviceType: row.service_type,
    pickupLocation: row.pickup_location,
    dropoffLocation: row.dropoff_location,
    date: row.date,
    time: row.time,
    passengers: row.passengers,
    luggage: row.luggage,
    vehicleType: row.vehicle_type,
    flightNumber: row.flight_number,
    message: row.message,
    locale: row.locale === "ar" ? "ar" : "en",
    source: row.source,
    sourcePage: row.source_page,
    attribution: Object.fromEntries(
      ATTRIBUTION_KEYS.map((key) => [
        key,
        (row[ATTRIBUTION_COLUMNS[key]] as string | null) ?? null,
      ])
    ) as LeadAttribution,
    status: isLeadStatus(row.status) ? row.status : "New",
    assignedTo: row.assigned_to,
    assignedToEmail: row.assignee?.email ?? null,
    assignedToName: row.assignee?.name ?? null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// --- Creating ---------------------------------------------------------------

export interface NewLead {
  /**
   * The customer-facing reference, supplied by the caller.
   *
   * It doubles as the idempotency key, so it must be stable across retries of
   * the same submission — the quote form derives it from its per-render
   * submission id for exactly that reason. Generating one here instead would
   * make every retry a new lead.
   */
  reference: string;
  fullName?: string | null;
  email?: string | null;
  phone?: string | null;
  serviceType?: string | null;
  pickupLocation?: string | null;
  dropoffLocation?: string | null;
  date?: string | null;
  time?: string | null;
  passengers?: string | null;
  luggage?: string | null;
  vehicleType?: string | null;
  flightNumber?: string | null;
  message?: string | null;
  locale: Locale;
  source?: string;
  sourcePage?: string | null;
  attribution?: Partial<LeadAttribution>;
}

export interface CreateLeadResult {
  lead: Lead;
  /**
   * True when this reference had already been stored and the existing row was
   * returned instead of a second one being written. Callers use it to avoid
   * sending the acknowledgement email twice for one submission.
   */
  duplicate: boolean;
}

/** Empty strings become null, so "not given" is one value in the database. */
const orNull = (value: string | null | undefined): string | null => {
  if (value === null || value === undefined) return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
};

/**
 * Inserts a lead and returns the row the database actually stored.
 *
 * The returned value comes from `select()` on the insert, not from the input,
 * so a caller that reports success is reporting what persisted — including the
 * server-assigned id, reference and timestamps. If the insert is rejected,
 * this throws and nothing claims otherwise.
 */
export async function createLead(input: NewLead): Promise<CreateLeadResult> {
  const client = db();

  const attributionColumns: Record<string, string | null> = {};
  for (const key of ATTRIBUTION_KEYS) {
    attributionColumns[ATTRIBUTION_COLUMNS[key]] = orNull(input.attribution?.[key]);
  }

  {
    const { data, error } = await client
      .from(TABLE)
      .insert({
        reference: input.reference,
        full_name: orNull(input.fullName),
        email: orNull(input.email),
        phone: orNull(input.phone),
        service_type: orNull(input.serviceType),
        pickup_location: orNull(input.pickupLocation),
        dropoff_location: orNull(input.dropoffLocation),
        date: orNull(input.date),
        time: orNull(input.time),
        passengers: orNull(input.passengers),
        luggage: orNull(input.luggage),
        vehicle_type: orNull(input.vehicleType),
        flight_number: orNull(input.flightNumber),
        message: orNull(input.message),
        locale: input.locale,
        source: input.source ?? "website",
        source_page: orNull(input.sourcePage),
        ...attributionColumns,
      })
      .select(SELECT_WITH_ASSIGNEE)
      .single();

    if (!error) {
      const lead = rowToLead(data as unknown as LeadRow);
      await recordEvent({
        leadId: lead.id,
        type: "created",
        summary: `Enquiry received from the website (${lead.locale.toUpperCase()}).`,
        detail: { source: lead.source, sourcePage: lead.sourcePage },
      });
      return { lead, duplicate: false };
    }

    /**
     * 23505 is unique_violation. On `reference` that means this exact
     * submission has already been stored — a double-click or a replayed POST —
     * so the stored row is read back and reported as a duplicate rather than
     * written twice or raised as an error. The uniqueness check happens in the
     * database, so two simultaneous requests cannot both pass it.
     *
     * Any other unique violation is a real fault and is raised.
     */
    const isReferenceClash =
      error.code === "23505" && error.message.includes("reference");
    if (!isReferenceClash) throw new Error(error.message);
  }

  const existing = await getLeadByReference(input.reference);
  if (existing) return { lead: existing, duplicate: true };

  // The insert was refused for a duplicate reference and yet no row with that
  // reference can be read. Rather than invent an outcome, say so.
  throw new Error(
    "The enquiry reference is already in use but the stored enquiry could not be read."
  );
}

export async function getLeadByReference(reference: string): Promise<Lead | null> {
  const { data, error } = await db()
    .from(TABLE)
    .select(SELECT_WITH_ASSIGNEE)
    .eq("reference", reference)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data ? rowToLead(data as unknown as LeadRow) : null;
}

// --- Reading ----------------------------------------------------------------

export async function getLead(id: string): Promise<Lead | null> {
  const { data, error } = await db()
    .from(TABLE)
    .select(SELECT_WITH_ASSIGNEE)
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data ? rowToLead(data as unknown as LeadRow) : null;
}

/** Columns the search box looks through. */
const SEARCHABLE = [
  "reference",
  "full_name",
  "email",
  "phone",
  "pickup_location",
  "dropoff_location",
  "message",
  "service_type",
  "flight_number",
] as const;

/**
 * Escapes a search term for a PostgREST `or` filter.
 *
 * Two separate problems. `%` and `_` are ILIKE wildcards, so a customer
 * searching for "50%" must not match everything. Commas and parentheses are
 * how PostgREST delimits the filter expression itself, so leaving them in
 * would let a search term rewrite the query — the injection risk here is in
 * the filter grammar, not in SQL. Both classes are handled, and anything left
 * that could still confuse the parser is dropped.
 */
function escapeSearch(term: string): string {
  return term
    .replace(/[\\%_]/g, (character) => `\\${character}`)
    .replace(/[(),"']/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * A page of leads, with the total count for the pager.
 *
 * Counted and sliced in the database. The source CRM selected every row and
 * rendered all of them, which is fine at a few dozen leads and collapses at a
 * few thousand; this asks for one page and the count, nothing more.
 */
export async function listLeads(query: LeadQuery = {}): Promise<Page<Lead>> {
  const pageSize = Math.min(Math.max(query.pageSize ?? PAGE_SIZE, 1), 100);
  const page = Math.max(query.page ?? 1, 1);

  let request = db()
    .from(TABLE)
    .select(SELECT_WITH_ASSIGNEE, { count: "exact" });

  if (query.status) request = request.eq("status", query.status);
  if (query.locale) request = request.eq("locale", query.locale);
  if (query.unassigned) request = request.is("assigned_to", null);
  else if (query.assignedTo) request = request.eq("assigned_to", query.assignedTo);

  const term = query.search ? escapeSearch(query.search) : "";
  if (term) {
    request = request.or(
      SEARCHABLE.map((column) => `${column}.ilike.%${term}%`).join(",")
    );
  }

  switch (query.sort ?? "created_desc") {
    case "created_asc":
      request = request.order("created_at", { ascending: true });
      break;
    case "updated_desc":
      request = request.order("updated_at", { ascending: false });
      break;
    case "name_asc":
      // Unnamed enquiries sort last rather than leading the list.
      request = request
        .order("full_name", { ascending: true, nullsFirst: false })
        .order("created_at", { ascending: false });
      break;
    case "status_asc":
      request = request
        .order("status", { ascending: true })
        .order("created_at", { ascending: false });
      break;
    case "travel_asc":
      // `date` is text, holding an ISO yyyy-mm-dd from the form, so a string
      // sort is a date sort. Enquiries without a date sort last.
      request = request
        .order("date", { ascending: true, nullsFirst: false })
        .order("time", { ascending: true, nullsFirst: false });
      break;
    default:
      request = request.order("created_at", { ascending: false });
  }

  const from = (page - 1) * pageSize;
  const { data, error, count } = await request.range(from, from + pageSize - 1);

  if (error) throw new Error(error.message);

  const total = count ?? 0;
  return {
    rows: (data as unknown as LeadRow[]).map(rowToLead),
    total,
    page,
    pageSize,
    pageCount: Math.max(1, Math.ceil(total / pageSize)),
  };
}

export interface LeadStats {
  total: number;
  today: number;
  open: number;
  unassigned: number;
  byStatus: Record<LeadStatus, number>;
}

/**
 * Dashboard counters.
 *
 * Six `head: true` counts rather than fetching every lead and tallying in
 * JavaScript: each is a `count(*)` in Postgres that transfers no rows.
 */
export async function getLeadStats(): Promise<LeadStats> {
  const client = db();
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const countWhere = async (
    apply: (
      request: ReturnType<ReturnType<typeof db>["from"]>
    ) => PromiseLike<{ count: number | null; error: { message: string } | null }>
  ) => {
    const { count, error } = await apply(client.from(TABLE));
    if (error) throw new Error(error.message);
    return count ?? 0;
  };

  const statusEntries = await Promise.all(
    (["New", "Contacted", "Quoted", "Confirmed", "Completed", "Cancelled"] as const).map(
      async (status) => {
        const { count, error } = await client
          .from(TABLE)
          .select("id", { count: "exact", head: true })
          .eq("status", status);
        if (error) throw new Error(error.message);
        return [status, count ?? 0] as const;
      }
    )
  );

  const byStatus = Object.fromEntries(statusEntries) as Record<LeadStatus, number>;

  const [total, today, unassigned] = await Promise.all([
    countWhere((request) => request.select("id", { count: "exact", head: true })),
    countWhere((request) =>
      request
        .select("id", { count: "exact", head: true })
        .gte("created_at", startOfToday.toISOString())
    ),
    countWhere((request) =>
      request.select("id", { count: "exact", head: true }).is("assigned_to", null)
    ),
  ]);

  return {
    total,
    today,
    open: byStatus.New + byStatus.Contacted + byStatus.Quoted,
    unassigned,
    byStatus,
  };
}

// --- Updating ---------------------------------------------------------------

export async function updateLeadStatus(
  id: string,
  status: LeadStatus,
  actor: SessionUser
): Promise<Lead> {
  const before = await getLead(id);
  if (!before) throw new Error("That enquiry no longer exists.");
  if (before.status === status) return before;

  const { data, error } = await db()
    .from(TABLE)
    .update({ status })
    .eq("id", id)
    .select(SELECT_WITH_ASSIGNEE)
    .single();

  if (error) throw new Error(error.message);

  await recordEvent({
    leadId: id,
    type: "status_changed",
    summary: `Status changed from ${before.status} to ${status}.`,
    detail: { from: before.status, to: status },
    actor,
  });

  return rowToLead(data as unknown as LeadRow);
}

export async function assignLead(
  id: string,
  assigneeId: string | null,
  actor: SessionUser
): Promise<Lead> {
  const { data, error } = await db()
    .from(TABLE)
    .update({ assigned_to: assigneeId })
    .eq("id", id)
    .select(SELECT_WITH_ASSIGNEE)
    .single();

  if (error) throw new Error(error.message);
  const lead = rowToLead(data as unknown as LeadRow);

  await recordEvent({
    leadId: id,
    type: "assigned",
    summary: lead.assignedToEmail
      ? `Assigned to ${lead.assignedToEmail}.`
      : "Assignment cleared.",
    detail: { assigneeId },
    actor,
  });

  return lead;
}

/**
 * Edits the journey and contact fields by hand.
 *
 * Only the keys present in `changes` are written, so an edit to one field
 * cannot blank another, and the audit trail records exactly which fields moved
 * and from what.
 */
export async function updateLeadFields(
  id: string,
  changes: Partial<LeadEditableFields>,
  actor: SessionUser
): Promise<Lead> {
  const before = await getLead(id);
  if (!before) throw new Error("That enquiry no longer exists.");

  const columnFor: Record<keyof LeadEditableFields, string> = {
    fullName: "full_name",
    email: "email",
    phone: "phone",
    serviceType: "service_type",
    pickupLocation: "pickup_location",
    dropoffLocation: "dropoff_location",
    date: "date",
    time: "time",
    passengers: "passengers",
    luggage: "luggage",
    vehicleType: "vehicle_type",
    flightNumber: "flight_number",
    message: "message",
  };

  const patch: Record<string, string | null> = {};
  const changed: Record<string, { from: string | null; to: string | null }> = {};

  for (const [key, value] of Object.entries(changes) as [
    keyof LeadEditableFields,
    string | null | undefined,
  ][]) {
    if (value === undefined) continue;
    const next = orNull(value);
    if (next === before[key]) continue;
    patch[columnFor[key]] = next;
    changed[key] = { from: before[key], to: next };
  }

  if (Object.keys(patch).length === 0) return before;

  const { data, error } = await db()
    .from(TABLE)
    .update(patch)
    .eq("id", id)
    .select(SELECT_WITH_ASSIGNEE)
    .single();

  if (error) throw new Error(error.message);

  await recordEvent({
    leadId: id,
    type: "updated",
    summary: `Edited ${Object.keys(changed).length} field(s): ${Object.keys(changed).join(", ")}.`,
    detail: { changed },
    actor,
  });

  return rowToLead(data as unknown as LeadRow);
}

/**
 * Deletes a lead and everything hanging off it.
 *
 * Notes, events and email logs cascade in the database. The audit trail for a
 * deleted lead goes with it on purpose: keeping orphaned personal data after
 * the record it belongs to has been deleted would defeat the point of
 * deleting it.
 */
export async function deleteLead(id: string): Promise<void> {
  const { error } = await db().from(TABLE).delete().eq("id", id);
  if (error) throw new Error(error.message);
}

// --- Notes ------------------------------------------------------------------

type NoteRow = {
  id: string;
  lead_id: string;
  author_id: string | null;
  author_email: string | null;
  body: string;
  created_at: string;
};

export async function listNotes(leadId: string): Promise<LeadNote[]> {
  const { data, error } = await db()
    .from("lead_notes")
    .select("id, lead_id, author_id, author_email, body, created_at")
    .eq("lead_id", leadId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data as NoteRow[]).map((row) => ({
    id: row.id,
    leadId: row.lead_id,
    authorId: row.author_id,
    authorEmail: row.author_email,
    body: row.body,
    createdAt: row.created_at,
  }));
}

export async function addNote(
  leadId: string,
  body: string,
  actor: SessionUser
): Promise<LeadNote> {
  const text = body.trim();
  if (!text) throw new Error("A note cannot be empty.");
  if (text.length > 4000) throw new Error("A note cannot exceed 4000 characters.");

  const { data, error } = await db()
    .from("lead_notes")
    .insert({
      lead_id: leadId,
      author_id: actor.id,
      author_email: actor.email,
      body: text,
    })
    .select("id, lead_id, author_id, author_email, body, created_at")
    .single();

  if (error) throw new Error(error.message);

  const row = data as NoteRow;
  await recordEvent({
    leadId,
    type: "note_added",
    // The note's text lives in lead_notes; duplicating it into the event
    // summary would mean two copies to keep in step and two to delete.
    summary: "Internal note added.",
    actor,
  });

  return {
    id: row.id,
    leadId: row.lead_id,
    authorId: row.author_id,
    authorEmail: row.author_email,
    body: row.body,
    createdAt: row.created_at,
  };
}

export async function deleteNote(id: string): Promise<void> {
  const { error } = await db().from("lead_notes").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

// --- Activity trail --------------------------------------------------------

type EventRow = {
  id: string;
  lead_id: string;
  type: string;
  summary: string;
  detail: Record<string, unknown> | null;
  actor_id: string | null;
  actor_email: string | null;
  created_at: string;
};

/**
 * Appends to the audit trail.
 *
 * Never throws. An audit write that failed is worth knowing about, but it must
 * not undo or block the change it was describing — a status update that
 * succeeded should not be reported as failed because its history entry did
 * not save. Omitting `actor` records something the system did on its own, such
 * as an enquiry arriving from the website.
 */
export async function recordEvent(input: {
  leadId: string;
  type: LeadEventType;
  summary: string;
  detail?: Record<string, unknown>;
  actor?: SessionUser;
}): Promise<void> {
  try {
    const { error } = await db()
      .from("lead_events")
      .insert({
        lead_id: input.leadId,
        type: input.type,
        summary: input.summary,
        detail: input.detail ?? {},
        actor_id: input.actor?.id ?? null,
        actor_email: input.actor?.email ?? null,
      });
    if (error) console.error("[crm] could not record a lead event:", error.message);
  } catch (error) {
    console.error(
      "[crm] could not record a lead event:",
      error instanceof Error ? error.message : "unknown error"
    );
  }
}

export async function listEvents(leadId: string): Promise<LeadEvent[]> {
  const { data, error } = await db()
    .from("lead_events")
    .select("id, lead_id, type, summary, detail, actor_id, actor_email, created_at")
    .eq("lead_id", leadId)
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) throw new Error(error.message);
  return (data as EventRow[]).map((row) => ({
    id: row.id,
    leadId: row.lead_id,
    type: (row.type as LeadEventType) ?? "updated",
    summary: row.summary,
    detail: row.detail ?? {},
    actorId: row.actor_id,
    actorEmail: row.actor_email,
    createdAt: row.created_at,
  }));
}

// --- Email log -------------------------------------------------------------

type EmailLogRow = {
  id: string;
  lead_id: string | null;
  template: string;
  subject: string;
  sent_to: string;
  status: string;
  error: string | null;
  created_at: string;
};

export async function listEmailLog(leadId: string): Promise<EmailLogEntry[]> {
  const { data, error } = await db()
    .from("email_logs")
    .select("id, lead_id, template, subject, sent_to, status, error, created_at")
    .eq("lead_id", leadId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data as EmailLogRow[]).map((row) => ({
    id: row.id,
    leadId: row.lead_id,
    template: row.template,
    subject: row.subject,
    sentTo: row.sent_to,
    status:
      row.status === "failed" || row.status === "skipped" ? row.status : "sent",
    error: row.error,
    createdAt: row.created_at,
  }));
}
