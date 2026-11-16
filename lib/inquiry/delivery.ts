import "server-only";

import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";
import { emailConfig, isDatabaseConfigured } from "@/lib/crm/config";
import { enquiryAcknowledgement, newEnquiryForTeam, send } from "@/lib/crm/email";
import { createLead } from "@/lib/crm/leads";
import type { LeadAttribution } from "@/lib/crm/types";

import type { LeadFormInput } from "./lead-schema";
import { ATTRIBUTION_FIELDS } from "./schema";

/**
 * ============================================================================
 * Where a validated quote request goes.
 * ============================================================================
 *
 * It goes into this website's own CRM: `public.leads` in this project's own
 * Supabase database, read by the desk at `/admin/`. Nothing is forwarded to
 * another website, and no previous project's API is called.
 *
 * This replaces an earlier arrangement in which the lead was POSTed to
 * `/api/leads/intake` on the previous site, with the schema kept as a verbatim
 * copy so the two stayed in step. That coupling is gone deliberately: it made
 * this site's quote form depend on another deployment staying alive, on a
 * shared bearer token, and on a `leads` table nobody here owns. The field set
 * that arrangement established is kept exactly as it was — see lead-schema.ts
 * — so the form, its validation and its stored shape are unchanged. Only the
 * destination moved.
 *
 * The exported seam is unchanged too: `deliverLead(lead, meta)` and the same
 * `DeliveryResult`, so `app/actions/inquiry.ts` and the form behave exactly as
 * before, including the honest `not_configured` state when the CRM has not
 * been provisioned yet.
 *
 * The order of operations is the point of this file:
 *
 *   1. Store the enquiry. If that fails, say so — nothing is lost silently.
 *   2. Then send email, and never let an email failure report a stored enquiry
 *      as lost. A customer told "we did not receive this" when we did will
 *      send it again or go elsewhere; a customer whose acknowledgement did not
 *      arrive still has an enquiry the team can see.
 *
 * Both email outcomes are recorded against the lead, so a missing
 * acknowledgement shows on the lead's own screen instead of being guessed at.
 */

export type DeliveryResult =
  | { ok: true; reference: string }
  | { ok: false; reason: "not_configured" }
  | { ok: false; reason: "rejected" | "busy" | "failed"; detail: string };

export type DeliveryMeta = {
  /** Shown to the customer, and the idempotency key for the write. */
  reference: string;
  /** The customer's IP. Kept in the signature; not stored against the lead. */
  clientIp: string | null;
};

/**
 * Works out which language the enquiry was made in.
 *
 * `sourcePage` is this site's URL plus the page path, and every page lives
 * under a locale segment, so the path prefix is the answer. Derived rather
 * than added as a form field, which keeps the form contract untouched. If the
 * path is missing or unrecognised the default locale is used, so the customer
 * still gets a readable acknowledgement rather than none.
 */
function localeFromSourcePage(sourcePage: string | undefined): Locale {
  if (!sourcePage) return defaultLocale;
  let path: string;
  try {
    path = new URL(sourcePage).pathname;
  } catch {
    path = sourcePage;
  }
  const segment = path.split("/").filter(Boolean)[0];
  return segment && isLocale(segment) ? segment : defaultLocale;
}

/** Pulls the attribution fields out of the validated lead. */
function attributionFrom(lead: LeadFormInput): Partial<LeadAttribution> {
  const attribution: Partial<LeadAttribution> = {};
  for (const field of ATTRIBUTION_FIELDS) {
    attribution[field] = lead[field] ?? null;
  }
  return attribution;
}

export async function deliverLead(
  lead: LeadFormInput,
  meta: DeliveryMeta
): Promise<DeliveryResult> {
  if (!isDatabaseConfigured()) {
    // Nowhere to put it. The form tells the visitor plainly that their details
    // were not sent, which is the truth and better than a thank-you page over
    // a dropped enquiry. Logged without any of the personal fields.
    console.warn(
      "[inquiry] The CRM database is not configured — the enquiry was NOT stored.",
      { reference: meta.reference }
    );
    return { ok: false, reason: "not_configured" };
  }

  const locale = localeFromSourcePage(lead.sourcePage);

  let stored;
  try {
    stored = await createLead({
      reference: meta.reference,
      fullName: lead.fullName,
      email: lead.email,
      phone: lead.phone,
      serviceType: lead.serviceType,
      pickupLocation: lead.pickupLocation,
      dropoffLocation: lead.dropoffLocation,
      date: lead.date,
      time: lead.time,
      passengers: lead.passengers,
      luggage: lead.luggage,
      vehicleType: lead.vehicleType,
      flightNumber: lead.flightNumber,
      message: lead.message,
      locale,
      source: "website",
      sourcePage: lead.sourcePage,
      attribution: attributionFrom(lead),
    });
  } catch (error) {
    // The message can name a column or a constraint, so it goes to the server
    // log for an operator and never to the visitor.
    console.error(
      "[inquiry] Could not store the enquiry:",
      error instanceof Error ? error.message : "unknown error"
    );
    return {
      ok: false,
      reason: "failed",
      detail: "The enquiry could not be stored.",
    };
  }

  /**
   * Stored. From here nothing may change the answer the visitor gets.
   *
   * A duplicate means this submission was already stored and already
   * acknowledged, so the emails are not sent a second time — the customer is
   * simply shown the same reference again.
   */
  if (!stored.duplicate) {
    await notify(stored.lead);
  }

  return { ok: true, reference: stored.lead.reference };
}

/**
 * Sends the team notification and the customer's acknowledgement.
 *
 * Awaited rather than fired and forgotten: on a serverless host the function
 * can be frozen the moment the response is returned, which would cancel an
 * un-awaited send partway through. `send()` records every outcome and never
 * throws, so awaiting costs a moment and buys a reliable log.
 */
async function notify(lead: Awaited<ReturnType<typeof createLead>>["lead"]): Promise<void> {
  const { notify: teamAddresses } = emailConfig();
  const jobs: Promise<unknown>[] = [];

  if (teamAddresses.length > 0) {
    const { subject, html } = newEnquiryForTeam(lead);
    jobs.push(
      send({
        to: teamAddresses,
        subject,
        html,
        template: "new_enquiry_team",
        leadId: lead.id,
        // So a reply from the team reaches the customer, not the sender robot.
        replyTo: lead.email ?? undefined,
      })
    );
  } else {
    console.warn(
      "[inquiry] CRM_EMAIL_NOTIFY is not set — no team notification was sent."
    );
  }

  if (lead.email) {
    const { subject, html } = enquiryAcknowledgement(lead);
    jobs.push(
      send({
        to: lead.email,
        subject,
        html,
        template: "enquiry_acknowledgement",
        leadId: lead.id,
      })
    );
  }

  await Promise.allSettled(jobs);
}
