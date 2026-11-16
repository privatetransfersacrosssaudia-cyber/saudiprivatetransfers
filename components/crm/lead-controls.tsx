"use client";

import { useActionState, useEffect, useRef } from "react";
import {
  AlertTriangleIcon,
  CheckIcon,
  Loader2Icon,
  SendIcon,
  Trash2Icon,
} from "lucide-react";

import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  createNote,
  emailCustomer,
  removeLead,
  removeNote,
  saveLeadFields,
  setLeadAssignee,
  setLeadStatus,
} from "@/app/admin/_actions/leads";
import { idleAction, type ActionState } from "@/lib/crm/action-state";
import {
  LEAD_STATUSES,
  type CrmUser,
  type Lead,
  type LeadStatus,
} from "@/lib/crm/types";

/**
 * The interactive parts of the enquiry screen.
 *
 * Each control is a form wrapped around a Server Action, so every one works
 * without JavaScript and every one is authorized on the server. The `disabled`
 * prop reflects the signed-in user's role: it removes a control that would
 * only ever be refused, which is a courtesy, not the enforcement.
 */

function Result({ state }: { state: ActionState }) {
  if (!state.message) return null;
  return (
    <p
      role="status"
      className={cn(
        "mt-2 flex items-start gap-1.5 text-sm",
        state.ok ? "text-palm" : "text-destructive"
      )}
    >
      {state.ok ? (
        <CheckIcon aria-hidden className="mt-0.5 size-3.5 shrink-0" />
      ) : (
        <AlertTriangleIcon aria-hidden className="mt-0.5 size-3.5 shrink-0" />
      )}
      <span>{state.message}</span>
    </p>
  );
}

const selectClass =
  "h-9 rounded-lg border border-input bg-transparent px-2.5 text-sm text-ink outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50";

export function StatusControl({
  leadId,
  status,
  disabled,
}: {
  leadId: string;
  status: LeadStatus;
  disabled?: boolean;
}) {
  const [state, formAction, pending] = useActionState(setLeadStatus, idleAction);

  return (
    <form action={formAction}>
      <input type="hidden" name="leadId" value={leadId} />
      <div className="flex items-center gap-2">
        <label htmlFor={`status-${leadId}`} className="sr-only">
          Status
        </label>
        <select
          id={`status-${leadId}`}
          name="status"
          defaultValue={status}
          disabled={disabled || pending}
          className={selectClass}
        >
          {LEAD_STATUSES.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        <Button type="submit" size="sm" variant="outline" disabled={disabled || pending}>
          {pending ? <Loader2Icon aria-hidden className="size-3.5 animate-spin" /> : null}
          Update
        </Button>
      </div>
      <Result state={state} />
    </form>
  );
}

export function AssigneeControl({
  leadId,
  assignedTo,
  users,
  disabled,
}: {
  leadId: string;
  assignedTo: string | null;
  users: CrmUser[];
  disabled?: boolean;
}) {
  const [state, formAction, pending] = useActionState(setLeadAssignee, idleAction);

  return (
    <form action={formAction}>
      <input type="hidden" name="leadId" value={leadId} />
      <div className="flex items-center gap-2">
        <label htmlFor={`assignee-${leadId}`} className="sr-only">
          Assigned to
        </label>
        <select
          id={`assignee-${leadId}`}
          name="assignee"
          defaultValue={assignedTo ?? ""}
          disabled={disabled || pending}
          className={selectClass}
        >
          <option value="">Unassigned</option>
          {users
            .filter((user) => user.isActive)
            .map((user) => (
              <option key={user.id} value={user.id}>
                {user.name || user.email}
              </option>
            ))}
        </select>
        <Button type="submit" size="sm" variant="outline" disabled={disabled || pending}>
          {pending ? <Loader2Icon aria-hidden className="size-3.5 animate-spin" /> : null}
          Assign
        </Button>
      </div>
      <Result state={state} />
    </form>
  );
}

export function NoteForm({ leadId }: { leadId: string }) {
  const [state, formAction, pending] = useActionState(createNote, idleAction);
  const ref = useRef<HTMLFormElement>(null);

  // Clear the box once the note has been stored, so a second note does not
  // start with the first one's text still in it. In an effect rather than
  // during render: resetting a form is a side effect on the DOM, and React may
  // render a component more than once before committing.
  const stored = state.ok && state.message !== null;
  useEffect(() => {
    if (stored) ref.current?.reset();
  }, [stored]);

  return (
    <form ref={ref} action={formAction} className="space-y-2">
      <input type="hidden" name="leadId" value={leadId} />
      <label htmlFor={`note-${leadId}`} className="sr-only">
        Internal note
      </label>
      <Textarea
        id={`note-${leadId}`}
        name="body"
        rows={3}
        maxLength={4000}
        required
        placeholder="What happened, what was agreed, what to do next. Internal only — the customer never sees this."
      />
      <div className="flex items-center justify-between gap-3">
        <Result state={state} />
        <Button type="submit" size="sm" disabled={pending} className="ms-auto shrink-0">
          {pending ? (
            <Loader2Icon aria-hidden className="size-3.5 animate-spin" />
          ) : null}
          Add note
        </Button>
      </div>
    </form>
  );
}

export function DeleteNoteButton({
  noteId,
  leadId,
}: {
  noteId: string;
  leadId: string;
}) {
  const [state, formAction, pending] = useActionState(removeNote, idleAction);

  return (
    <form action={formAction} className="inline">
      <input type="hidden" name="noteId" value={noteId} />
      <input type="hidden" name="leadId" value={leadId} />
      <button
        type="submit"
        disabled={pending}
        title={state.message ?? "Delete this note"}
        className="rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
      >
        <Trash2Icon aria-hidden className="size-3.5" />
        <span className="sr-only">Delete note</span>
      </button>
    </form>
  );
}

export function EmailForm({
  leadId,
  to,
  reference,
  emailConfigured,
}: {
  leadId: string;
  to: string | null;
  reference: string;
  emailConfigured: boolean;
}) {
  const [state, formAction, pending] = useActionState(emailCustomer, idleAction);

  if (!to) {
    return (
      <p className="text-sm text-muted-foreground">
        This enquiry has no email address, so there is nothing to send to. The
        phone number is the only way to reach this customer.
      </p>
    );
  }

  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="leadId" value={leadId} />

      <p className="text-sm text-muted-foreground">
        To <span className="font-medium text-ink">{to}</span>. The message is
        wrapped in the branded template and carries reference{" "}
        <span className="font-mono text-xs text-ink">{reference}</span>.
      </p>

      <div>
        <label
          htmlFor={`subject-${leadId}`}
          className="mb-1 block text-xs font-medium tracking-wide text-muted-foreground uppercase"
        >
          Subject
        </label>
        <Input
          id={`subject-${leadId}`}
          name="subject"
          required
          maxLength={200}
          className="h-9"
          defaultValue={`Your enquiry ${reference}`}
        />
      </div>

      <div>
        <label
          htmlFor={`body-${leadId}`}
          className="mb-1 block text-xs font-medium tracking-wide text-muted-foreground uppercase"
        >
          Message
        </label>
        <Textarea id={`body-${leadId}`} name="body" rows={6} required maxLength={5000} />
      </div>

      {!emailConfigured ? (
        <p className="text-sm text-destructive">
          Email is not configured, so this will not send. Set RESEND_API_KEY and
          CRM_EMAIL_FROM, and verify the sending domain with the provider.
        </p>
      ) : null}

      <div className="flex items-center justify-between gap-3">
        <Result state={state} />
        <Button type="submit" disabled={pending} className="ms-auto shrink-0">
          {pending ? (
            <Loader2Icon aria-hidden className="size-3.5 animate-spin" />
          ) : (
            <SendIcon aria-hidden className="size-3.5" />
          )}
          Send
        </Button>
      </div>
    </form>
  );
}

const EDITABLE: { name: keyof Lead & string; label: string }[] = [
  { name: "fullName", label: "Full name" },
  { name: "phone", label: "Phone / WhatsApp" },
  { name: "email", label: "Email" },
  { name: "serviceType", label: "Service" },
  { name: "pickupLocation", label: "Pick-up" },
  { name: "dropoffLocation", label: "Destination" },
  { name: "date", label: "Date" },
  { name: "time", label: "Time" },
  { name: "passengers", label: "Passengers" },
  { name: "luggage", label: "Luggage" },
  { name: "vehicleType", label: "Vehicle" },
  { name: "flightNumber", label: "Flight number" },
];

export function EditLeadForm({ lead }: { lead: Lead }) {
  const [state, formAction, pending] = useActionState(saveLeadFields, idleAction);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="leadId" value={lead.id} />

      <div className="grid gap-4 sm:grid-cols-2">
        {EDITABLE.map((field) => (
          <div key={field.name}>
            <label
              htmlFor={`edit-${field.name}`}
              className="mb-1 block text-xs font-medium tracking-wide text-muted-foreground uppercase"
            >
              {field.label}
            </label>
            <Input
              id={`edit-${field.name}`}
              name={field.name}
              defaultValue={(lead[field.name] as string | null) ?? ""}
              className="h-9"
            />
          </div>
        ))}
      </div>

      <div>
        <label
          htmlFor="edit-message"
          className="mb-1 block text-xs font-medium tracking-wide text-muted-foreground uppercase"
        >
          Customer’s message
        </label>
        <Textarea
          id="edit-message"
          name="message"
          rows={4}
          defaultValue={lead.message ?? ""}
        />
      </div>

      <div className="flex items-center justify-between gap-3">
        <Result state={state} />
        <Button type="submit" disabled={pending} className="ms-auto shrink-0">
          {pending ? (
            <Loader2Icon aria-hidden className="size-3.5 animate-spin" />
          ) : null}
          Save changes
        </Button>
      </div>
    </form>
  );
}

/**
 * Deletes the enquiry.
 *
 * The confirmation is a native `confirm()` rather than a dialog component on
 * purpose: this is irreversible, it cascades to the notes, the activity trail
 * and the email log, and a browser-level prompt cannot be dismissed by a
 * stray click the way a custom modal can. Without JavaScript the form still
 * submits — the server is what actually authorizes it.
 */
export function DeleteLeadButton({ leadId, reference }: { leadId: string; reference: string }) {
  return (
    <form
      action={removeLead}
      onSubmit={(event) => {
        const confirmed = window.confirm(
          `Delete enquiry ${reference}?\n\nThis also deletes its notes, its activity history and its email log. It cannot be undone.`
        );
        if (!confirmed) event.preventDefault();
      }}
    >
      <input type="hidden" name="leadId" value={leadId} />
      <Button type="submit" variant="destructive" size="sm">
        <Trash2Icon aria-hidden className="size-3.5" />
        Delete enquiry
      </Button>
    </form>
  );
}
