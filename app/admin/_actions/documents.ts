"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { authorize } from "@/lib/crm/auth";
import { emailConfig, isEmailConfigured } from "@/lib/crm/config";
import {
  bookingConfirmation,
  invoiceReady,
  quotationDecisionForTeam,
  quotationReady,
  send,
} from "@/lib/crm/email";
import {
  createInvoice,
  createQuotation,
  deleteInvoice,
  deleteQuotation,
  getInvoice,
  getQuotation,
  readLineItems,
  recordQuotationDecision,
  setInvoicePaymentStatus,
  setQuotationStatus,
  updateInvoice,
  updateQuotation,
  type InvoiceInput,
  type QuotationInput,
} from "@/lib/crm/documents";
import { getLead, recordEvent } from "@/lib/crm/leads";
import { assertSameOrigin, clientKey, rateLimit } from "@/lib/crm/request";
import { isLeadStatus, isPaymentStatus, isQuoteStatus } from "@/lib/crm/types";
import { isLocale, defaultLocale } from "@/lib/i18n/config";
import { absoluteUrl } from "@/lib/site";

import type { ActionState } from "@/lib/crm/action-state";

async function guard(permission: Parameters<typeof authorize>[0]) {
  const origin = await assertSameOrigin();
  if (!origin.ok) return { ok: false as const, message: origin.error };
  const auth = await authorize(permission);
  if (!auth.ok) return { ok: false as const, message: auth.error };
  return { ok: true as const, user: auth.user };
}

function text(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Reads the repeating line-item rows out of the form.
 *
 * The editor posts `item-description-0`, `item-amount-0`, `item-description-1`
 * and so on, because a plain HTML form has no nested structure. Rows without a
 * description are dropped by `readLineItems`, so an empty spare row at the
 * bottom of the editor costs nothing.
 */
function readItems(formData: FormData) {
  const rows: Record<string, unknown>[] = [];
  for (let index = 0; index < 40; index += 1) {
    const description = formData.get(`item-description-${index}`);
    if (description === null) continue;
    rows.push({
      description,
      amount: formData.get(`item-amount-${index}`),
      vehicleType: formData.get(`item-vehicle-${index}`),
      passengers: formData.get(`item-passengers-${index}`),
      luggage: formData.get(`item-luggage-${index}`),
    });
  }
  return readLineItems(rows);
}

function commonFields(formData: FormData) {
  const locale = text(formData, "locale");
  return {
    leadId: text(formData, "leadId") || null,
    clientName: text(formData, "clientName"),
    clientEmail: text(formData, "clientEmail"),
    clientPhone: text(formData, "clientPhone"),
    locale: isLocale(locale) ? locale : defaultLocale,
    serviceType: text(formData, "serviceType"),
    pickupLocation: text(formData, "pickupLocation"),
    dropoffLocation: text(formData, "dropoffLocation"),
    date: text(formData, "date"),
    time: text(formData, "time"),
    currency: text(formData, "currency") || "SAR",
    notes: text(formData, "notes"),
  };
}

// --- Quotations --------------------------------------------------------------

export async function saveQuotation(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const gate = await guard("documents:write");
  if (!gate.ok) return { ok: false, message: gate.message };

  const id = text(formData, "quotationId");
  const items = readItems(formData);
  if (items.length === 0) {
    return { ok: false, message: "Add at least one line with a description." };
  }

  const input: QuotationInput = {
    ...commonFields(formData),
    flightNumber: text(formData, "flightNumber"),
    passengers: text(formData, "passengers"),
    luggage: text(formData, "luggage"),
    vehicleType: text(formData, "vehicleType"),
    specialRequests: text(formData, "specialRequests"),
    paymentTerms: text(formData, "paymentTerms"),
    cancellationPolicy: text(formData, "cancellationPolicy"),
    validUntil: text(formData, "validUntil"),
    lineItems: items,
  };

  let quotationId = id;
  try {
    if (id) {
      await updateQuotation(id, input);
    } else {
      const created = await createQuotation(input, gate.user);
      quotationId = created.id;
    }
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Could not save the quotation.",
    };
  }

  revalidatePath("/admin/quotations/");
  if (id) {
    revalidatePath(`/admin/quotations/${id}/`);
    return { ok: true, message: "Saved." };
  }
  redirect(`/admin/quotations/${quotationId}/?created=1`);
}

/**
 * Emails the quotation to the customer and marks it Sent.
 *
 * The status only moves when the provider accepted the message. Marking a
 * quotation Sent after a failed send would put a lie in the pipeline — the
 * desk would be waiting on a customer who was never written to.
 */
export async function sendQuotation(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const gate = await guard("documents:send");
  if (!gate.ok) return { ok: false, message: gate.message };

  const id = text(formData, "quotationId");
  if (!id) return { ok: false, message: "Missing quotation." };
  if (!isEmailConfigured()) {
    return {
      ok: false,
      message:
        "Email is not configured. Set RESEND_API_KEY and CRM_EMAIL_FROM, and " +
        "verify the sending domain with the provider.",
    };
  }

  const quotation = await getQuotation(id);
  if (!quotation) return { ok: false, message: "That quotation no longer exists." };
  if (!quotation.clientEmail) {
    return { ok: false, message: "This quotation has no customer email address." };
  }

  const viewUrl = absoluteUrl(`/quote/${quotation.publicToken}/`);
  const { subject, html } = quotationReady(quotation, viewUrl);

  const outcome = await send({
    to: quotation.clientEmail,
    subject,
    html,
    template: "quotation_ready",
    leadId: quotation.leadId,
  });

  if (outcome.status !== "sent") {
    const reason = outcome.status === "failed" ? outcome.error : outcome.reason;
    if (quotation.leadId) {
      await recordEvent({
        leadId: quotation.leadId,
        type: "email_failed",
        summary: `Quotation ${quotation.quoteNumber} could not be emailed.`,
        detail: { reason },
        actor: gate.user,
      });
    }
    return { ok: false, message: `Not sent: ${reason}` };
  }

  await setQuotationStatus(id, "Sent");

  if (quotation.leadId) {
    await recordEvent({
      leadId: quotation.leadId,
      type: "email_sent",
      summary: `Quotation ${quotation.quoteNumber} emailed to ${quotation.clientEmail}.`,
      detail: { quoteNumber: quotation.quoteNumber },
      actor: gate.user,
    });
    // Move the enquiry along with it, but never backwards past a decision.
    const lead = await getLead(quotation.leadId);
    if (lead && isLeadStatus(lead.status) && ["New", "Contacted"].includes(lead.status)) {
      const { updateLeadStatus } = await import("@/lib/crm/leads");
      await updateLeadStatus(quotation.leadId, "Quoted", gate.user).catch(() => {});
    }
  }

  revalidatePath(`/admin/quotations/${id}/`);
  revalidatePath("/admin/quotations/");
  return { ok: true, message: `Sent to ${quotation.clientEmail}.` };
}

/**
 * Sends the booking confirmation.
 *
 * Deliberately a manual action and never an automatic consequence of a
 * customer accepting: this is the only message that tells someone their
 * transfer is confirmed, and it should go out when a vehicle has actually been
 * arranged, not when a button was clicked. It states only what has been
 * entered — no invented driver, vehicle or meeting point.
 */
export async function sendBookingConfirmation(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const gate = await guard("documents:send");
  if (!gate.ok) return { ok: false, message: gate.message };

  const id = text(formData, "quotationId");
  const meetingInstructions = text(formData, "meetingInstructions");
  if (!id) return { ok: false, message: "Missing quotation." };
  if (!isEmailConfigured()) {
    return { ok: false, message: "Email is not configured." };
  }

  const quotation = await getQuotation(id);
  if (!quotation) return { ok: false, message: "That quotation no longer exists." };
  if (!quotation.clientEmail) {
    return { ok: false, message: "This quotation has no customer email address." };
  }

  const { subject, html } = bookingConfirmation(quotation, { meetingInstructions });

  const outcome = await send({
    to: quotation.clientEmail,
    subject,
    html,
    template: "booking_confirmation",
    leadId: quotation.leadId,
  });

  if (outcome.status !== "sent") {
    const reason = outcome.status === "failed" ? outcome.error : outcome.reason;
    return { ok: false, message: `Not sent: ${reason}` };
  }

  if (quotation.leadId) {
    await recordEvent({
      leadId: quotation.leadId,
      type: "email_sent",
      summary: `Booking confirmation emailed to ${quotation.clientEmail}.`,
      detail: { quoteNumber: quotation.quoteNumber },
      actor: gate.user,
    });
    const { updateLeadStatus } = await import("@/lib/crm/leads");
    await updateLeadStatus(quotation.leadId, "Confirmed", gate.user).catch(() => {});
  }

  revalidatePath(`/admin/quotations/${id}/`);
  return { ok: true, message: `Confirmation sent to ${quotation.clientEmail}.` };
}

export async function changeQuotationStatus(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const gate = await guard("documents:write");
  if (!gate.ok) return { ok: false, message: gate.message };

  const id = text(formData, "quotationId");
  const status = text(formData, "status");
  if (!id || !isQuoteStatus(status)) {
    return { ok: false, message: "Choose a status." };
  }

  try {
    await setQuotationStatus(id, status);
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Could not change the status.",
    };
  }

  revalidatePath(`/admin/quotations/${id}/`);
  revalidatePath("/admin/quotations/");
  return { ok: true, message: `Status set to ${status}.` };
}

export async function removeQuotation(formData: FormData): Promise<void> {
  const gate = await guard("documents:write");
  if (!gate.ok) redirect("/admin/not-allowed/?need=documents%3Awrite");

  const id = text(formData, "quotationId");
  if (id) await deleteQuotation(id);

  revalidatePath("/admin/quotations/");
  redirect("/admin/quotations/");
}

// --- The customer's decision -------------------------------------------------

/**
 * Called from the public quotation page when a customer accepts or declines.
 *
 * The only CRM write reachable without a session, so it is narrow on purpose:
 * it is addressed by an unguessable token, it can only ever set one of two
 * statuses, it only acts on a quotation that is still awaiting a decision, and
 * it is rate limited. It returns the same answer whether the token is unknown
 * or already decided, so the endpoint cannot be used to probe for valid
 * tokens.
 */
export async function decideOnQuotation(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const origin = await assertSameOrigin();
  if (!origin.ok) return { ok: false, message: origin.error };

  const limit = rateLimit(await clientKey("quote-decision"), 10, 60_000);
  if (!limit.allowed) {
    return { ok: false, message: "Too many attempts. Please wait a moment." };
  }

  const token = text(formData, "token");
  const decision = text(formData, "decision");
  if (decision !== "accept" && decision !== "decline") {
    return { ok: false, message: "Choose accept or decline." };
  }

  const status = decision === "accept" ? "Accepted" : "Declined";
  const quotation = await recordQuotationDecision(token, status).catch(() => null);

  if (!quotation) {
    return {
      ok: false,
      message:
        "This quotation is no longer awaiting a response. If you think that is " +
        "wrong, reply to the email and we will check.",
    };
  }

  // Tell the team. A failure here must not change what the customer is told —
  // their decision is already recorded.
  const { notify } = emailConfig();
  if (notify.length > 0) {
    const { subject, html } = quotationDecisionForTeam(quotation, status);
    await send({
      to: notify,
      subject,
      html,
      template: `quotation_${decision}`,
      leadId: quotation.leadId,
      replyTo: quotation.clientEmail ?? undefined,
    });
  }

  if (quotation.leadId) {
    await recordEvent({
      leadId: quotation.leadId,
      type: "status_changed",
      summary: `Customer ${decision}d quotation ${quotation.quoteNumber}.`,
      detail: { quoteNumber: quotation.quoteNumber, decision: status },
    });
    const { updateLeadStatus } = await import("@/lib/crm/leads");
    await updateLeadStatus(
      quotation.leadId,
      status === "Accepted" ? "Confirmed" : "Cancelled",
      { id: "", email: "customer", name: null, role: "agent" }
    ).catch(() => {});
  }

  revalidatePath(`/quote/${token}/`);
  return {
    ok: true,
    message:
      status === "Accepted"
        ? "Thank you — your acceptance has been recorded and our team will be in touch to confirm the details."
        : "Thank you for letting us know. Your quotation has been marked as declined.",
  };
}

// --- Invoices ----------------------------------------------------------------

export async function saveInvoice(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const gate = await guard("documents:write");
  if (!gate.ok) return { ok: false, message: gate.message };

  const id = text(formData, "invoiceId");
  const items = readItems(formData);
  if (items.length === 0) {
    return { ok: false, message: "Add at least one line with a description." };
  }

  const paymentStatus = text(formData, "paymentStatus");
  const input: InvoiceInput = {
    ...commonFields(formData),
    quotationId: text(formData, "quotationId") || null,
    paymentStatus: isPaymentStatus(paymentStatus) ? paymentStatus : "Unpaid",
    lineItems: items,
  };

  let invoiceId = id;
  try {
    if (id) {
      await updateInvoice(id, input);
    } else {
      const created = await createInvoice(input, gate.user);
      invoiceId = created.id;
    }
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Could not save the invoice.",
    };
  }

  revalidatePath("/admin/invoices/");
  if (id) {
    revalidatePath(`/admin/invoices/${id}/`);
    return { ok: true, message: "Saved." };
  }
  redirect(`/admin/invoices/${invoiceId}/?created=1`);
}

export async function sendInvoice(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const gate = await guard("documents:send");
  if (!gate.ok) return { ok: false, message: gate.message };

  const id = text(formData, "invoiceId");
  if (!id) return { ok: false, message: "Missing invoice." };
  if (!isEmailConfigured()) {
    return { ok: false, message: "Email is not configured." };
  }

  const invoice = await getInvoice(id);
  if (!invoice) return { ok: false, message: "That invoice no longer exists." };
  if (!invoice.clientEmail) {
    return { ok: false, message: "This invoice has no customer email address." };
  }

  const viewUrl = absoluteUrl(`/invoice/${invoice.publicToken}/`);
  const { subject, html } = invoiceReady(invoice, viewUrl);

  const outcome = await send({
    to: invoice.clientEmail,
    subject,
    html,
    template: "invoice_ready",
    leadId: invoice.leadId,
  });

  if (outcome.status !== "sent") {
    const reason = outcome.status === "failed" ? outcome.error : outcome.reason;
    return { ok: false, message: `Not sent: ${reason}` };
  }

  if (invoice.leadId) {
    await recordEvent({
      leadId: invoice.leadId,
      type: "email_sent",
      summary: `Invoice ${invoice.invoiceNumber} emailed to ${invoice.clientEmail}.`,
      detail: { invoiceNumber: invoice.invoiceNumber },
      actor: gate.user,
    });
  }

  revalidatePath(`/admin/invoices/${id}/`);
  return { ok: true, message: `Sent to ${invoice.clientEmail}.` };
}

export async function changeInvoicePaymentStatus(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const gate = await guard("documents:write");
  if (!gate.ok) return { ok: false, message: gate.message };

  const id = text(formData, "invoiceId");
  const status = text(formData, "paymentStatus");
  if (!id || !isPaymentStatus(status)) {
    return { ok: false, message: "Choose a payment status." };
  }

  try {
    await setInvoicePaymentStatus(id, status);
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Could not update the invoice.",
    };
  }

  revalidatePath(`/admin/invoices/${id}/`);
  revalidatePath("/admin/invoices/");
  return { ok: true, message: `Marked ${status}.` };
}

export async function removeInvoice(formData: FormData): Promise<void> {
  const gate = await guard("documents:write");
  if (!gate.ok) redirect("/admin/not-allowed/?need=documents%3Awrite");

  const id = text(formData, "invoiceId");
  if (id) await deleteInvoice(id);

  revalidatePath("/admin/invoices/");
  redirect("/admin/invoices/");
}
