"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { authorize } from "@/lib/crm/auth";
import { customMessage, send } from "@/lib/crm/email";
import { isEmailConfigured } from "@/lib/crm/config";
import { assertSameOrigin } from "@/lib/crm/request";
import {
  addNote,
  assignLead,
  deleteLead,
  deleteNote,
  getLead,
  recordEvent,
  updateLeadFields,
  updateLeadStatus,
} from "@/lib/crm/leads";
import { isLeadStatus, type LeadEditableFields } from "@/lib/crm/types";

/**
 * Every mutation the enquiry desk can perform.
 *
 * Each one re-authorizes from scratch. A Server Action is a public POST
 * endpoint that happens to be called by a form, so the fact that the button
 * was only rendered for a manager proves nothing about who is calling it.
 *
 * `assertSameOrigin()` sits on top of the framework's own Origin/Host check.
 * That check allows a request carrying no `Origin` header at all, with a
 * warning; these actions refuse it, because a browser always sends `Origin`
 * on a POST and the CRM has no non-browser callers.
 */

import type { ActionState } from "@/lib/crm/action-state";

/** Shared preamble: same origin, signed in, and permitted. */
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

export async function setLeadStatus(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const gate = await guard("leads:update");
  if (!gate.ok) return { ok: false, message: gate.message };

  const id = text(formData, "leadId");
  const status = text(formData, "status");
  if (!id || !isLeadStatus(status)) {
    return { ok: false, message: "Choose a status." };
  }

  try {
    await updateLeadStatus(id, status, gate.user);
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Could not change the status.",
    };
  }

  revalidatePath(`/admin/leads/${id}/`);
  revalidatePath("/admin/leads/");
  revalidatePath("/admin/");
  return { ok: true, message: `Status set to ${status}.` };
}

export async function setLeadAssignee(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const gate = await guard("leads:assign");
  if (!gate.ok) return { ok: false, message: gate.message };

  const id = text(formData, "leadId");
  const assignee = text(formData, "assignee");
  if (!id) return { ok: false, message: "Missing enquiry." };

  try {
    await assignLead(id, assignee || null, gate.user);
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Could not assign the enquiry.",
    };
  }

  revalidatePath(`/admin/leads/${id}/`);
  revalidatePath("/admin/leads/");
  return { ok: true, message: assignee ? "Assigned." : "Assignment cleared." };
}

export async function saveLeadFields(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const gate = await guard("leads:update");
  if (!gate.ok) return { ok: false, message: gate.message };

  const id = text(formData, "leadId");
  if (!id) return { ok: false, message: "Missing enquiry." };

  // Only the fields the edit form actually offers. Anything else posted
  // alongside them is ignored rather than written.
  const editable: (keyof LeadEditableFields)[] = [
    "fullName",
    "email",
    "phone",
    "serviceType",
    "pickupLocation",
    "dropoffLocation",
    "date",
    "time",
    "passengers",
    "luggage",
    "vehicleType",
    "flightNumber",
    "message",
  ];

  const changes: Partial<LeadEditableFields> = {};
  for (const field of editable) {
    if (formData.has(field)) changes[field] = text(formData, field) || null;
  }

  try {
    await updateLeadFields(id, changes, gate.user);
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Could not save the changes.",
    };
  }

  revalidatePath(`/admin/leads/${id}/`);
  revalidatePath("/admin/leads/");
  return { ok: true, message: "Saved." };
}

export async function createNote(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const gate = await guard("notes:create");
  if (!gate.ok) return { ok: false, message: gate.message };

  const id = text(formData, "leadId");
  const body = text(formData, "body");
  if (!id) return { ok: false, message: "Missing enquiry." };
  if (!body) return { ok: false, message: "Write something first." };

  try {
    await addNote(id, body, gate.user);
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Could not save the note.",
    };
  }

  revalidatePath(`/admin/leads/${id}/`);
  return { ok: true, message: "Note added." };
}

export async function removeNote(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  // Deleting a note removes part of the record of what was discussed, so it
  // sits with the other destructive permissions rather than with writing one.
  const gate = await guard("leads:delete");
  if (!gate.ok) return { ok: false, message: gate.message };

  const noteId = text(formData, "noteId");
  const leadId = text(formData, "leadId");
  if (!noteId) return { ok: false, message: "Missing note." };

  try {
    await deleteNote(noteId);
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Could not delete the note.",
    };
  }

  revalidatePath(`/admin/leads/${leadId}/`);
  return { ok: true, message: "Note deleted." };
}

/**
 * Sends a message an operator has written to the customer.
 *
 * Composed and sent in the customer's own language context — the wrapper is
 * laid out right-to-left for an Arabic enquiry — but the words are whatever
 * the operator typed. Nothing is auto-translated: a machine translation sent
 * under the company's name is worse than an English sentence.
 */
export async function emailCustomer(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const gate = await guard("leads:email");
  if (!gate.ok) return { ok: false, message: gate.message };

  const id = text(formData, "leadId");
  const subject = text(formData, "subject");
  const body = text(formData, "body");

  if (!id) return { ok: false, message: "Missing enquiry." };
  if (!subject || !body) {
    return { ok: false, message: "A subject and a message are both required." };
  }
  if (!isEmailConfigured()) {
    return {
      ok: false,
      message:
        "Email is not configured. Set RESEND_API_KEY and CRM_EMAIL_FROM, and " +
        "verify the sending domain with the provider.",
    };
  }

  const lead = await getLead(id);
  if (!lead) return { ok: false, message: "That enquiry no longer exists." };
  if (!lead.email) {
    return { ok: false, message: "This enquiry has no email address." };
  }

  const outcome = await send({
    to: lead.email,
    subject,
    html: customMessage(subject, body, lead.locale, lead.reference),
    template: "custom_message",
    leadId: lead.id,
  });

  // The send is logged either way by `send()`; the activity trail records who
  // pressed the button, which the email log alone does not say.
  await recordEvent({
    leadId: lead.id,
    type: outcome.status === "sent" ? "email_sent" : "email_failed",
    summary:
      outcome.status === "sent"
        ? `Emailed ${lead.email}: “${subject}”.`
        : `Failed to email ${lead.email}: “${subject}”.`,
    detail: { subject, outcome: outcome.status },
    actor: gate.user,
  });

  revalidatePath(`/admin/leads/${id}/`);

  if (outcome.status === "sent") {
    return { ok: true, message: `Sent to ${lead.email}.` };
  }
  if (outcome.status === "skipped") {
    return { ok: false, message: `Not sent: ${outcome.reason}` };
  }
  return { ok: false, message: `Not sent: ${outcome.error}` };
}

/**
 * Deletes an enquiry and everything attached to it.
 *
 * Redirects on success rather than returning state, because the page the form
 * was on no longer exists.
 */
export async function removeLead(formData: FormData): Promise<void> {
  const gate = await guard("leads:delete");
  if (!gate.ok) {
    redirect(`/admin/not-allowed/?need=${encodeURIComponent("leads:delete")}`);
  }

  const id = text(formData, "leadId");
  if (!id) redirect("/admin/leads/");

  await deleteLead(id);

  revalidatePath("/admin/leads/");
  revalidatePath("/admin/");
  redirect("/admin/leads/?deleted=1");
}
