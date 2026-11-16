/**
 * CRM domain types and the permission model.
 *
 * Importable from client components — it holds no secrets and touches no
 * database. Permission helpers are pure functions of a role, used both to hide
 * controls in the UI and, authoritatively, to authorize on the server. Hiding
 * a button is a courtesy; the server check is the actual rule.
 */

import type { Locale } from "@/lib/i18n/config";

// --- Roles and permissions --------------------------------------------------

export const ROLES = ["owner", "manager", "agent"] as const;
export type Role = (typeof ROLES)[number];

export const roleLabels: Record<Role, string> = {
  owner: "Owner",
  manager: "Manager",
  agent: "Agent",
};

export const roleDescriptions: Record<Role, string> = {
  owner: "Full access, including managing who can sign in.",
  manager: "Everything to do with enquiries and documents, including deleting them.",
  agent: "Read enquiries, add notes, change status and email customers.",
};

/** Every distinct thing the CRM can be asked to do. */
export type Permission =
  | "leads:read"
  | "leads:update"
  | "leads:assign"
  | "leads:delete"
  | "leads:email"
  | "notes:create"
  | "documents:read"
  | "documents:write"
  | "documents:send"
  | "users:manage"
  | "settings:read";

const AGENT: Permission[] = [
  "leads:read",
  "leads:update",
  "leads:email",
  "notes:create",
  "documents:read",
  "settings:read",
];

const MANAGER: Permission[] = [
  ...AGENT,
  "leads:assign",
  "leads:delete",
  "documents:write",
  "documents:send",
];

const OWNER: Permission[] = [...MANAGER, "users:manage"];

const permissionsByRole: Record<Role, readonly Permission[]> = {
  agent: AGENT,
  manager: MANAGER,
  owner: OWNER,
};

export function can(role: Role, permission: Permission): boolean {
  return permissionsByRole[role].includes(permission);
}

export function isRole(value: unknown): value is Role {
  return typeof value === "string" && (ROLES as readonly string[]).includes(value);
}

// --- Accounts ---------------------------------------------------------------

export interface CrmUser {
  id: string;
  email: string;
  name: string | null;
  role: Role;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
}

/** What a signed-in request carries. Deliberately narrow — no hash, no secrets. */
export interface SessionUser {
  id: string;
  email: string;
  name: string | null;
  role: Role;
}

// --- Leads ------------------------------------------------------------------

export const LEAD_STATUSES = [
  "New",
  "Contacted",
  "Quoted",
  "Confirmed",
  "Completed",
  "Cancelled",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export function isLeadStatus(value: unknown): value is LeadStatus {
  return (
    typeof value === "string" && (LEAD_STATUSES as readonly string[]).includes(value)
  );
}

/** Statuses that mean the enquiry is still live, for the dashboard's counts. */
export const OPEN_STATUSES: readonly LeadStatus[] = [
  "New",
  "Contacted",
  "Quoted",
];

/**
 * The attribution fields, in the order they are shown.
 *
 * Keyed by the same names the quote form's hidden inputs use, so there is one
 * vocabulary from the form, through the payload, to the database column and
 * back out onto the screen.
 */
export const ATTRIBUTION_KEYS = [
  "firstLandingPage",
  "firstReferrer",
  "firstUtmSource",
  "firstUtmMedium",
  "firstUtmCampaign",
  "landingPage",
  "referrer",
  "utmSource",
  "utmMedium",
  "utmCampaign",
  "gclid",
  "searchSource",
] as const;

export type AttributionKey = (typeof ATTRIBUTION_KEYS)[number];

export type LeadAttribution = Record<AttributionKey, string | null>;

export const attributionLabels: Record<AttributionKey, string> = {
  firstLandingPage: "First landing page",
  firstReferrer: "First referrer",
  firstUtmSource: "First UTM source",
  firstUtmMedium: "First UTM medium",
  firstUtmCampaign: "First UTM campaign",
  landingPage: "Session landing page",
  referrer: "Session referrer",
  utmSource: "UTM source",
  utmMedium: "UTM medium",
  utmCampaign: "UTM campaign",
  gclid: "Google click id",
  searchSource: "Search source",
};

/** True when nothing was captured, so the panel can say so rather than show 12 dashes. */
export function hasAttribution(attribution: LeadAttribution): boolean {
  return ATTRIBUTION_KEYS.some((key) => Boolean(attribution[key]));
}

export interface Lead {
  id: string;
  reference: string;
  fullName: string | null;
  email: string | null;
  phone: string | null;
  serviceType: string | null;
  pickupLocation: string | null;
  dropoffLocation: string | null;
  date: string | null;
  time: string | null;
  passengers: string | null;
  luggage: string | null;
  vehicleType: string | null;
  flightNumber: string | null;
  message: string | null;
  locale: Locale;
  source: string;
  sourcePage: string | null;
  /**
   * Multi-touch attribution from the quote form's hidden inputs. Internal
   * only — shown on the lead screen and in the team notification, never in a
   * customer-facing email or document.
   */
  attribution: LeadAttribution;
  status: LeadStatus;
  assignedTo: string | null;
  /** Joined from crm_users for display; null when unassigned or removed. */
  assignedToEmail: string | null;
  assignedToName: string | null;
  createdAt: string;
  updatedAt: string;
}

/** The fields an operator may edit by hand on the lead screen. */
export interface LeadEditableFields {
  fullName: string | null;
  email: string | null;
  phone: string | null;
  serviceType: string | null;
  pickupLocation: string | null;
  dropoffLocation: string | null;
  date: string | null;
  time: string | null;
  passengers: string | null;
  luggage: string | null;
  vehicleType: string | null;
  flightNumber: string | null;
  message: string | null;
}

export interface LeadNote {
  id: string;
  leadId: string;
  authorId: string | null;
  authorEmail: string | null;
  body: string;
  createdAt: string;
}

export const LEAD_EVENT_TYPES = [
  "created",
  "status_changed",
  "assigned",
  "note_added",
  "email_sent",
  "email_failed",
  "updated",
] as const;

export type LeadEventType = (typeof LEAD_EVENT_TYPES)[number];

export interface LeadEvent {
  id: string;
  leadId: string;
  type: LeadEventType;
  summary: string;
  detail: Record<string, unknown>;
  actorId: string | null;
  actorEmail: string | null;
  createdAt: string;
}

export interface EmailLogEntry {
  id: string;
  leadId: string | null;
  template: string;
  subject: string;
  sentTo: string;
  status: "sent" | "failed" | "skipped";
  error: string | null;
  createdAt: string;
}

// --- Listing ----------------------------------------------------------------

export const LEAD_SORTS = [
  "created_desc",
  "created_asc",
  "updated_desc",
  "name_asc",
  "status_asc",
  "travel_asc",
] as const;

export type LeadSort = (typeof LEAD_SORTS)[number];

export const leadSortLabels: Record<LeadSort, string> = {
  created_desc: "Newest first",
  created_asc: "Oldest first",
  updated_desc: "Recently updated",
  name_asc: "Customer name (A–Z)",
  status_asc: "Status",
  travel_asc: "Travel date",
};

export function isLeadSort(value: unknown): value is LeadSort {
  return typeof value === "string" && (LEAD_SORTS as readonly string[]).includes(value);
}

export const PAGE_SIZE = 25;

export interface LeadQuery {
  search?: string;
  status?: LeadStatus;
  locale?: Locale;
  assignedTo?: string;
  /** "unassigned" is a distinct filter, not the absence of one. */
  unassigned?: boolean;
  sort?: LeadSort;
  page?: number;
  pageSize?: number;
}

export interface Page<T> {
  rows: T[];
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
}

// --- Documents --------------------------------------------------------------

export const QUOTE_STATUSES = [
  "Draft",
  "Sent",
  "Accepted",
  "Declined",
  "Expired",
] as const;
export type QuoteStatus = (typeof QUOTE_STATUSES)[number];

export const PAYMENT_STATUSES = ["Unpaid", "Partially Paid", "Paid"] as const;
export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];

export interface LineItem {
  description: string;
  vehicleType: string | null;
  passengers: string | null;
  luggage: string | null;
  amount: number;
}

export interface Quotation {
  id: string;
  quoteNumber: string;
  publicToken: string;
  leadId: string | null;
  clientName: string | null;
  clientEmail: string | null;
  clientPhone: string | null;
  locale: Locale;
  serviceType: string | null;
  pickupLocation: string | null;
  dropoffLocation: string | null;
  date: string | null;
  time: string | null;
  flightNumber: string | null;
  passengers: string | null;
  luggage: string | null;
  vehicleType: string | null;
  specialRequests: string | null;
  lineItems: LineItem[];
  currency: string;
  totalAmount: number;
  paymentTerms: string | null;
  cancellationPolicy: string | null;
  notes: string | null;
  status: QuoteStatus;
  quoteDate: string;
  validUntil: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  publicToken: string;
  leadId: string | null;
  quotationId: string | null;
  clientName: string | null;
  clientEmail: string | null;
  clientPhone: string | null;
  locale: Locale;
  serviceType: string | null;
  pickupLocation: string | null;
  dropoffLocation: string | null;
  date: string | null;
  time: string | null;
  lineItems: LineItem[];
  currency: string;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  notes: string | null;
  invoiceDate: string;
  createdAt: string;
  updatedAt: string;
}

export function isQuoteStatus(value: unknown): value is QuoteStatus {
  return typeof value === "string" && (QUOTE_STATUSES as readonly string[]).includes(value);
}

export function isPaymentStatus(value: unknown): value is PaymentStatus {
  return (
    typeof value === "string" && (PAYMENT_STATUSES as readonly string[]).includes(value)
  );
}

/** Sum of the line items, rounded to two decimals, as the stored total. */
export function lineItemsTotal(items: LineItem[]): number {
  const sum = items.reduce((total, item) => total + (Number(item.amount) || 0), 0);
  return Math.round(sum * 100) / 100;
}
