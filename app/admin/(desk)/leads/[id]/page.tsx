import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, FileSignatureIcon, ReceiptIcon } from "lucide-react";

import {
  DeleteLeadButton,
  DeleteNoteButton,
  EditLeadForm,
  EmailForm,
  NoteForm,
  AssigneeControl,
  StatusControl,
} from "@/components/crm/lead-controls";
import {
  EmptyState,
  Field,
  LeadStatusBadge,
  LocaleBadge,
  Notice,
  Panel,
  formatDateTime,
} from "@/components/crm/primitives";
import { requirePermission } from "@/lib/crm/auth";
import { isDatabaseConfigured, isEmailConfigured } from "@/lib/crm/config";
import {
  getLead,
  listEmailLog,
  listEvents,
  listNotes,
} from "@/lib/crm/leads";
import { listUsers } from "@/lib/crm/users";
import {
  ATTRIBUTION_KEYS,
  attributionLabels,
  can,
  hasAttribution,
} from "@/lib/crm/types";

export const instant = false;

export default async function LeadDetailPage({
  params,
}: PageProps<"/admin/leads/[id]">) {
  const { id } = await params;
  const user = await requirePermission("leads:read", `/admin/leads/${id}/`);

  if (!isDatabaseConfigured()) {
    return (
      <Notice tone="warning" title="The database is not configured">
        <p>
          Set <code>SUPABASE_URL</code> and <code>SUPABASE_SERVICE_ROLE_KEY</code>.
        </p>
      </Notice>
    );
  }

  const lead = await getLead(id).catch(() => null);
  if (!lead) notFound();

  // Loaded together: four round trips that do not depend on each other.
  const [notes, events, emails, users] = await Promise.all([
    listNotes(lead.id).catch(() => []),
    listEvents(lead.id).catch(() => []),
    listEmailLog(lead.id).catch(() => []),
    can(user.role, "leads:assign") ? listUsers().catch(() => []) : Promise.resolve([]),
  ]);

  const mayAssign = can(user.role, "leads:assign");
  const mayUpdate = can(user.role, "leads:update");
  const mayDelete = can(user.role, "leads:delete");
  const mayEmail = can(user.role, "leads:email");
  const mayWriteDocuments = can(user.role, "documents:write");

  return (
    <div className="space-y-6">
      <Link
        href="/admin/leads/"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-palm"
      >
        <ArrowLeftIcon aria-hidden className="size-4 rtl:-scale-x-100" />
        Back to enquiries
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs font-semibold tracking-wider text-brass-deep">
            {lead.reference}
          </p>
          <h1 className="mt-1 flex flex-wrap items-center gap-3 font-heading text-2xl text-ink">
            {lead.fullName || "Unnamed enquiry"}
            <LocaleBadge locale={lead.locale} />
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Received {formatDateTime(lead.createdAt)}
            {lead.updatedAt !== lead.createdAt
              ? ` · last changed ${formatDateTime(lead.updatedAt)}`
              : ""}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <LeadStatusBadge status={lead.status} />
          <StatusControl
            leadId={lead.id}
            status={lead.status}
            disabled={!mayUpdate}
          />
          {mayWriteDocuments ? (
            <div className="mt-1 flex flex-wrap gap-2">
              <Link
                href={`/admin/quotations/new/?leadId=${lead.id}`}
                className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-card px-3 text-sm font-medium text-ink hover:bg-muted"
              >
                <FileSignatureIcon aria-hidden className="size-3.5" />
                Quotation
              </Link>
              <Link
                href={`/admin/invoices/new/?leadId=${lead.id}`}
                className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-card px-3 text-sm font-medium text-ink hover:bg-muted"
              >
                <ReceiptIcon aria-hidden className="size-3.5" />
                Invoice
              </Link>
            </div>
          ) : null}
        </div>
      </div>

      {lead.locale === "ar" ? (
        <Notice title="This enquiry was made in Arabic">
          <p>Reply in Arabic. The email template lays out right-to-left automatically.</p>
        </Notice>
      ) : null}

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Customer">
          <dl className="grid grid-cols-2 gap-4">
            <Field label="Full name" value={lead.fullName} />
            <Field label="Phone / WhatsApp" value={lead.phone} />
            <Field label="Email" value={lead.email} />
            <Field label="Service" value={lead.serviceType} />
          </dl>
        </Panel>

        <Panel title="Journey">
          <dl className="grid grid-cols-2 gap-4">
            <Field label="Pick-up" value={lead.pickupLocation} />
            <Field label="Destination" value={lead.dropoffLocation} />
            <Field label="Date" value={lead.date} />
            <Field label="Time" value={lead.time} />
          </dl>
        </Panel>

        <Panel title="Vehicle and party">
          <dl className="grid grid-cols-2 gap-4">
            <Field label="Passengers" value={lead.passengers} />
            <Field label="Luggage" value={lead.luggage} />
            <Field label="Vehicle" value={lead.vehicleType} />
            <Field label="Flight number" value={lead.flightNumber} />
          </dl>
        </Panel>

        <Panel title="Ownership">
          <dl className="grid grid-cols-2 gap-4">
            <Field
              label="Assigned to"
              value={lead.assignedToName || lead.assignedToEmail}
            />
            <Field label="Source" value={lead.source} />
          </dl>
          {mayAssign ? (
            <div className="mt-4 border-t border-border pt-4">
              <AssigneeControl
                leadId={lead.id}
                assignedTo={lead.assignedTo}
                users={users}
              />
            </div>
          ) : (
            <p className="mt-4 border-t border-border pt-4 text-sm text-muted-foreground">
              Your role cannot change who an enquiry is assigned to.
            </p>
          )}
        </Panel>
      </div>

      <Panel title="What the customer wrote">
        {lead.message ? (
          <p
            // Rendered in the enquiry's own direction so Arabic reads
            // correctly rather than as reversed fragments.
            dir={lead.locale === "ar" ? "rtl" : "ltr"}
            className="text-sm leading-relaxed whitespace-pre-wrap text-ink"
          >
            {lead.message}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            No message was left with this enquiry.
          </p>
        )}
      </Panel>

      <Panel
        title="Internal notes"
        description="Only staff see these. They are deleted with the enquiry."
      >
        <NoteForm leadId={lead.id} />
        {notes.length > 0 ? (
          <ul className="mt-5 space-y-3 border-t border-border pt-5">
            {notes.map((note) => (
              <li key={note.id} className="rounded-lg bg-muted/60 p-3">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-xs text-muted-foreground">
                    {note.authorEmail ?? "a removed account"} ·{" "}
                    {formatDateTime(note.createdAt)}
                  </p>
                  {mayDelete ? (
                    <DeleteNoteButton noteId={note.id} leadId={lead.id} />
                  ) : null}
                </div>
                <p className="mt-1.5 text-sm whitespace-pre-wrap text-ink">
                  {note.body}
                </p>
              </li>
            ))}
          </ul>
        ) : null}
      </Panel>

      {mayEmail ? (
        <Panel
          title="Email the customer"
          description="Sent from the configured address, in the brand template."
        >
          <EmailForm
            leadId={lead.id}
            to={lead.email}
            reference={lead.reference}
            emailConfigured={isEmailConfigured()}
          />
        </Panel>
      ) : null}

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel
          title="Email history"
          description="Every send attempt, including the ones that failed."
        >
          {emails.length === 0 ? (
            <EmptyState title="Nothing sent yet">
              The acknowledgement and team notification appear here once the
              email provider is configured.
            </EmptyState>
          ) : (
            <ul className="divide-y divide-border">
              {emails.map((entry) => (
                <li key={entry.id} className="py-3 first:pt-0 last:pb-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={
                        entry.status === "sent"
                          ? "text-xs font-semibold text-palm"
                          : "text-xs font-semibold text-destructive"
                      }
                    >
                      {entry.status.toUpperCase()}
                    </span>
                    <span className="text-sm text-ink">{entry.subject}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    to {entry.sentTo} · {formatDateTime(entry.createdAt)}
                  </p>
                  {entry.error ? (
                    <p className="mt-1 text-xs text-destructive">{entry.error}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel title="Activity" description="Who changed what, and when.">
          {events.length === 0 ? (
            <EmptyState title="No activity recorded" />
          ) : (
            <ol className="relative space-y-4 border-s border-border ps-5">
              {events.map((event) => (
                <li key={event.id} className="relative">
                  <span
                    aria-hidden
                    className="absolute top-1.5 -start-[1.52rem] size-2 rounded-full bg-brass ring-3 ring-card"
                  />
                  <p className="text-sm text-ink">{event.summary}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {event.actorEmail ?? "automatic"} ·{" "}
                    {formatDateTime(event.createdAt)}
                  </p>
                </li>
              ))}
            </ol>
          )}
        </Panel>
      </div>

      <Panel
        title="Where this enquiry came from"
        description="Internal attribution. Never shown to the customer."
      >
        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Page submitted from" value={lead.sourcePage} />
          {hasAttribution(lead.attribution)
            ? ATTRIBUTION_KEYS.filter((key) => lead.attribution[key]).map((key) => (
                <Field
                  key={key}
                  label={attributionLabels[key]}
                  value={lead.attribution[key]}
                />
              ))
            : null}
        </dl>
        {!hasAttribution(lead.attribution) ? (
          <p className="mt-4 text-sm text-muted-foreground">
            No campaign or referrer data was captured for this visit — usually a
            direct visit, or a browser that blocked the first-touch storage.
          </p>
        ) : null}
      </Panel>

      {mayUpdate ? (
        <Panel
          title="Correct the details"
          description="Changes are recorded in the activity trail above."
        >
          <EditLeadForm lead={lead} />
        </Panel>
      ) : null}

      {mayDelete ? (
        <div className="flex justify-end">
          <DeleteLeadButton leadId={lead.id} reference={lead.reference} />
        </div>
      ) : null}
    </div>
  );
}
