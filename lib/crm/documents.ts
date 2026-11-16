import "server-only";

import { db } from "./supabase";
import {
  isPaymentStatus,
  isQuoteStatus,
  lineItemsTotal,
  type Invoice,
  type LineItem,
  type PaymentStatus,
  type Quotation,
  type QuoteStatus,
  type SessionUser,
} from "./types";
import type { Locale } from "@/lib/i18n/config";

/**
 * Quotations and invoices.
 *
 * Both follow the same shape, and one rule explains most of it: the client and
 * journey fields are **snapshotted** when the document is created, not joined
 * live from the lead. A quotation that has been sent to a customer must keep
 * saying what it said when it was sent, even if someone later corrects the
 * enquiry it came from or deletes it outright. That is also why `lead_id` is
 * `on delete set null` rather than a cascade — losing the enquiry must not
 * destroy the document that was issued from it.
 *
 * Documents are delivered by `public_token`, 16 random bytes from the
 * database, never by the primary key. A sequential id in a link would let
 * anyone who received one quotation walk the whole table.
 */

// --- Shared ------------------------------------------------------------------

const QUOTE_COLUMNS = `
  id, quote_number, public_token, lead_id, client_name, client_email,
  client_phone, locale, service_type, pickup_location, dropoff_location,
  date, time, flight_number, passengers, luggage, vehicle_type,
  special_requests, line_items, currency, total_amount, payment_terms,
  cancellation_policy, notes, status, quote_date, valid_until,
  created_at, updated_at
`;

const INVOICE_COLUMNS = `
  id, invoice_number, public_token, lead_id, quotation_id, client_name,
  client_email, client_phone, locale, service_type, pickup_location,
  dropoff_location, date, time, line_items, currency, total_amount,
  payment_status, notes, invoice_date, created_at, updated_at
`;

const orNull = (value: string | null | undefined): string | null => {
  if (value === null || value === undefined) return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
};

/**
 * Validates the line items coming out of a form.
 *
 * Anything without a description or with an unusable amount is dropped rather
 * than stored as a blank row, and the amount is forced to two decimals so the
 * stored total always equals the sum of what is displayed.
 */
export function readLineItems(raw: unknown): LineItem[] {
  if (!Array.isArray(raw)) return [];
  const items: LineItem[] = [];
  for (const entry of raw) {
    if (!entry || typeof entry !== "object") continue;
    const candidate = entry as Record<string, unknown>;
    const description = String(candidate.description ?? "").trim();
    if (!description) continue;
    const amount = Number(candidate.amount);
    items.push({
      description: description.slice(0, 300),
      vehicleType: orNull(String(candidate.vehicleType ?? "")),
      passengers: orNull(String(candidate.passengers ?? "")),
      luggage: orNull(String(candidate.luggage ?? "")),
      amount: Number.isFinite(amount) ? Math.round(amount * 100) / 100 : 0,
    });
  }
  return items;
}

type QuoteRow = Record<string, unknown>;

function rowToQuotation(row: QuoteRow): Quotation {
  const status = row.status;
  return {
    id: String(row.id),
    quoteNumber: String(row.quote_number),
    publicToken: String(row.public_token),
    leadId: (row.lead_id as string) ?? null,
    clientName: (row.client_name as string) ?? null,
    clientEmail: (row.client_email as string) ?? null,
    clientPhone: (row.client_phone as string) ?? null,
    locale: row.locale === "ar" ? "ar" : "en",
    serviceType: (row.service_type as string) ?? null,
    pickupLocation: (row.pickup_location as string) ?? null,
    dropoffLocation: (row.dropoff_location as string) ?? null,
    date: (row.date as string) ?? null,
    time: (row.time as string) ?? null,
    flightNumber: (row.flight_number as string) ?? null,
    passengers: (row.passengers as string) ?? null,
    luggage: (row.luggage as string) ?? null,
    vehicleType: (row.vehicle_type as string) ?? null,
    specialRequests: (row.special_requests as string) ?? null,
    lineItems: (row.line_items as LineItem[]) ?? [],
    currency: String(row.currency ?? "SAR"),
    totalAmount: Number(row.total_amount ?? 0),
    paymentTerms: (row.payment_terms as string) ?? null,
    cancellationPolicy: (row.cancellation_policy as string) ?? null,
    notes: (row.notes as string) ?? null,
    status: isQuoteStatus(status) ? status : "Draft",
    quoteDate: String(row.quote_date),
    validUntil: (row.valid_until as string) ?? null,
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

function rowToInvoice(row: QuoteRow): Invoice {
  const status = row.payment_status;
  return {
    id: String(row.id),
    invoiceNumber: String(row.invoice_number),
    publicToken: String(row.public_token),
    leadId: (row.lead_id as string) ?? null,
    quotationId: (row.quotation_id as string) ?? null,
    clientName: (row.client_name as string) ?? null,
    clientEmail: (row.client_email as string) ?? null,
    clientPhone: (row.client_phone as string) ?? null,
    locale: row.locale === "ar" ? "ar" : "en",
    serviceType: (row.service_type as string) ?? null,
    pickupLocation: (row.pickup_location as string) ?? null,
    dropoffLocation: (row.dropoff_location as string) ?? null,
    date: (row.date as string) ?? null,
    time: (row.time as string) ?? null,
    lineItems: (row.line_items as LineItem[]) ?? [],
    currency: String(row.currency ?? "SAR"),
    totalAmount: Number(row.total_amount ?? 0),
    paymentStatus: isPaymentStatus(status) ? status : "Unpaid",
    notes: (row.notes as string) ?? null,
    invoiceDate: String(row.invoice_date),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

// --- Quotations --------------------------------------------------------------

export interface QuotationInput {
  leadId?: string | null;
  clientName?: string | null;
  clientEmail?: string | null;
  clientPhone?: string | null;
  locale: Locale;
  serviceType?: string | null;
  pickupLocation?: string | null;
  dropoffLocation?: string | null;
  date?: string | null;
  time?: string | null;
  flightNumber?: string | null;
  passengers?: string | null;
  luggage?: string | null;
  vehicleType?: string | null;
  specialRequests?: string | null;
  lineItems: LineItem[];
  currency?: string;
  paymentTerms?: string | null;
  cancellationPolicy?: string | null;
  notes?: string | null;
  validUntil?: string | null;
}

export const DEFAULT_PAYMENT_TERMS =
  "A deposit confirms the booking; the balance is due on the day of travel.";

export const DEFAULT_CANCELLATION_POLICY =
  "Free cancellation up to 24 hours before pick-up. Later cancellations may be charged.";

function quotationColumns(input: QuotationInput) {
  return {
    lead_id: input.leadId ?? null,
    client_name: orNull(input.clientName),
    client_email: orNull(input.clientEmail),
    client_phone: orNull(input.clientPhone),
    locale: input.locale,
    service_type: orNull(input.serviceType),
    pickup_location: orNull(input.pickupLocation),
    dropoff_location: orNull(input.dropoffLocation),
    date: orNull(input.date),
    time: orNull(input.time),
    flight_number: orNull(input.flightNumber),
    passengers: orNull(input.passengers),
    luggage: orNull(input.luggage),
    vehicle_type: orNull(input.vehicleType),
    special_requests: orNull(input.specialRequests),
    line_items: input.lineItems,
    currency: input.currency ?? "SAR",
    // Recomputed from the items on every write, so the stored total can never
    // drift from the lines the customer is looking at.
    total_amount: lineItemsTotal(input.lineItems),
    payment_terms: orNull(input.paymentTerms),
    cancellation_policy: orNull(input.cancellationPolicy),
    notes: orNull(input.notes),
    valid_until: orNull(input.validUntil),
  };
}

export async function createQuotation(
  input: QuotationInput,
  actor: SessionUser
): Promise<Quotation> {
  const client = db();

  // The number comes from a Postgres sequence, so two quotations created in
  // the same second cannot be handed the same one.
  const { data: number, error: numberError } = await client.rpc("next_quote_number");
  if (numberError) throw new Error(numberError.message);

  const { data, error } = await client
    .from("quotations")
    .insert({
      ...quotationColumns(input),
      quote_number: number,
      created_by: actor.id,
    })
    .select(QUOTE_COLUMNS)
    .single();

  if (error) throw new Error(error.message);
  return rowToQuotation(data as QuoteRow);
}

export async function updateQuotation(
  id: string,
  input: QuotationInput
): Promise<Quotation> {
  const { data, error } = await db()
    .from("quotations")
    .update(quotationColumns(input))
    .eq("id", id)
    .select(QUOTE_COLUMNS)
    .single();

  if (error) throw new Error(error.message);
  return rowToQuotation(data as QuoteRow);
}

export async function getQuotation(id: string): Promise<Quotation | null> {
  const { data, error } = await db()
    .from("quotations")
    .select(QUOTE_COLUMNS)
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data ? rowToQuotation(data as QuoteRow) : null;
}

/** Looks a quotation up by its public link token. Used by the customer page. */
export async function getQuotationByToken(token: string): Promise<Quotation | null> {
  // A token is 32 hex characters. Rejecting anything else here means a junk
  // value never becomes a database query.
  if (!/^[a-f0-9]{32}$/.test(token)) return null;

  const { data, error } = await db()
    .from("quotations")
    .select(QUOTE_COLUMNS)
    .eq("public_token", token)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data ? rowToQuotation(data as QuoteRow) : null;
}

export async function listQuotations(): Promise<Quotation[]> {
  const { data, error } = await db()
    .from("quotations")
    .select(QUOTE_COLUMNS)
    .order("created_at", { ascending: false })
    .limit(200);
  if (error) throw new Error(error.message);
  return (data as QuoteRow[]).map(rowToQuotation);
}

export async function setQuotationStatus(
  id: string,
  status: QuoteStatus
): Promise<Quotation> {
  const { data, error } = await db()
    .from("quotations")
    .update({ status })
    .eq("id", id)
    .select(QUOTE_COLUMNS)
    .single();
  if (error) throw new Error(error.message);
  return rowToQuotation(data as QuoteRow);
}

/**
 * Records the customer's decision, by token.
 *
 * Only a quotation that is actually awaiting a decision can be moved. A
 * customer re-opening an old link and pressing a button again must not flip a
 * quotation that has already been accepted, declined or expired, so the status
 * is part of the match rather than checked beforehand — two simultaneous
 * clicks cannot both win.
 */
export async function recordQuotationDecision(
  token: string,
  decision: "Accepted" | "Declined"
): Promise<Quotation | null> {
  if (!/^[a-f0-9]{32}$/.test(token)) return null;

  const { data, error } = await db()
    .from("quotations")
    .update({ status: decision })
    .eq("public_token", token)
    .in("status", ["Sent", "Draft"])
    .select(QUOTE_COLUMNS)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data ? rowToQuotation(data as QuoteRow) : null;
}

export async function deleteQuotation(id: string): Promise<void> {
  const { error } = await db().from("quotations").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

// --- Invoices ----------------------------------------------------------------

export interface InvoiceInput {
  leadId?: string | null;
  quotationId?: string | null;
  clientName?: string | null;
  clientEmail?: string | null;
  clientPhone?: string | null;
  locale: Locale;
  serviceType?: string | null;
  pickupLocation?: string | null;
  dropoffLocation?: string | null;
  date?: string | null;
  time?: string | null;
  lineItems: LineItem[];
  currency?: string;
  paymentStatus?: PaymentStatus;
  notes?: string | null;
}

function invoiceColumns(input: InvoiceInput) {
  return {
    lead_id: input.leadId ?? null,
    quotation_id: input.quotationId ?? null,
    client_name: orNull(input.clientName),
    client_email: orNull(input.clientEmail),
    client_phone: orNull(input.clientPhone),
    locale: input.locale,
    service_type: orNull(input.serviceType),
    pickup_location: orNull(input.pickupLocation),
    dropoff_location: orNull(input.dropoffLocation),
    date: orNull(input.date),
    time: orNull(input.time),
    line_items: input.lineItems,
    currency: input.currency ?? "SAR",
    total_amount: lineItemsTotal(input.lineItems),
    payment_status: input.paymentStatus ?? "Unpaid",
    notes: orNull(input.notes),
  };
}

export async function createInvoice(
  input: InvoiceInput,
  actor: SessionUser
): Promise<Invoice> {
  const client = db();

  const { data: number, error: numberError } = await client.rpc("next_invoice_number");
  if (numberError) throw new Error(numberError.message);

  const { data, error } = await client
    .from("invoices")
    .insert({
      ...invoiceColumns(input),
      invoice_number: number,
      created_by: actor.id,
    })
    .select(INVOICE_COLUMNS)
    .single();

  if (error) throw new Error(error.message);
  return rowToInvoice(data as QuoteRow);
}

export async function updateInvoice(
  id: string,
  input: InvoiceInput
): Promise<Invoice> {
  const { data, error } = await db()
    .from("invoices")
    .update(invoiceColumns(input))
    .eq("id", id)
    .select(INVOICE_COLUMNS)
    .single();
  if (error) throw new Error(error.message);
  return rowToInvoice(data as QuoteRow);
}

export async function getInvoice(id: string): Promise<Invoice | null> {
  const { data, error } = await db()
    .from("invoices")
    .select(INVOICE_COLUMNS)
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data ? rowToInvoice(data as QuoteRow) : null;
}

export async function getInvoiceByToken(token: string): Promise<Invoice | null> {
  if (!/^[a-f0-9]{32}$/.test(token)) return null;
  const { data, error } = await db()
    .from("invoices")
    .select(INVOICE_COLUMNS)
    .eq("public_token", token)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data ? rowToInvoice(data as QuoteRow) : null;
}

export async function listInvoices(): Promise<Invoice[]> {
  const { data, error } = await db()
    .from("invoices")
    .select(INVOICE_COLUMNS)
    .order("created_at", { ascending: false })
    .limit(200);
  if (error) throw new Error(error.message);
  return (data as QuoteRow[]).map(rowToInvoice);
}

export async function setInvoicePaymentStatus(
  id: string,
  status: PaymentStatus
): Promise<Invoice> {
  const { data, error } = await db()
    .from("invoices")
    .update({ payment_status: status })
    .eq("id", id)
    .select(INVOICE_COLUMNS)
    .single();
  if (error) throw new Error(error.message);
  return rowToInvoice(data as QuoteRow);
}

export async function deleteInvoice(id: string): Promise<void> {
  const { error } = await db().from("invoices").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
