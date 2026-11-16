import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ExternalLinkIcon, ReceiptIcon } from "lucide-react";

import {
  CopyLinkButton,
  DeleteDocumentButton,
  QuotationStatusControl,
  SendConfirmationForm,
  SendDocumentButton,
} from "@/components/crm/document-controls";
import { DocumentForm } from "@/components/crm/document-form";
import {
  Field,
  LocaleBadge,
  Notice,
  Panel,
  QuoteStatusBadge,
  formatDateTime,
  formatMoney,
} from "@/components/crm/primitives";
import { requirePermission } from "@/lib/crm/auth";
import { isDatabaseConfigured, isEmailConfigured } from "@/lib/crm/config";
import { getQuotation } from "@/lib/crm/documents";
import { can } from "@/lib/crm/types";
import { absoluteUrl } from "@/lib/site";

export const instant = false;

export default async function QuotationDetailPage({
  params,
}: PageProps<"/admin/quotations/[id]">) {
  const { id } = await params;
  const user = await requirePermission("documents:read", `/admin/quotations/${id}/`);

  if (!isDatabaseConfigured()) {
    return (
      <Notice tone="warning" title="The database is not configured">
        <p>Set the Supabase variables to view quotations.</p>
      </Notice>
    );
  }

  const quotation = await getQuotation(id).catch(() => null);
  if (!quotation) notFound();

  const mayWrite = can(user.role, "documents:write");
  const maySend = can(user.role, "documents:send");
  const publicUrl = absoluteUrl(`/quote/${quotation.publicToken}/`);

  return (
    <div className="space-y-6">
      <Link
        href="/admin/quotations/"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-palm"
      >
        <ArrowLeftIcon aria-hidden className="size-4 rtl:-scale-x-100" />
        Back to quotations
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs font-semibold tracking-wider text-brass-deep">
            {quotation.quoteNumber}
          </p>
          <h1 className="mt-1 flex flex-wrap items-center gap-3 font-heading text-2xl text-ink">
            {quotation.clientName || "Quotation"}
            <LocaleBadge locale={quotation.locale} />
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Created {formatDateTime(quotation.createdAt)} ·{" "}
            {formatMoney(quotation.totalAmount, quotation.currency)}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <QuoteStatusBadge status={quotation.status} />
          {mayWrite ? (
            <QuotationStatusControl
              quotationId={quotation.id}
              status={quotation.status}
            />
          ) : null}
        </div>
      </div>

      <Panel
        title="The customer's link"
        description="Addressed by an unguessable token, never by a sequential id. Anyone holding this link can view the quotation and respond to it."
      >
        <div className="flex flex-wrap items-center gap-3">
          <code className="min-w-0 flex-1 truncate rounded-lg bg-muted px-3 py-2 text-xs text-ink">
            {publicUrl}
          </code>
          <CopyLinkButton url={publicUrl} />
          <Link
            href={`/quote/${quotation.publicToken}/`}
            target="_blank"
            className="inline-flex h-7 items-center gap-1.5 rounded-lg border border-border px-2.5 text-xs font-medium text-ink hover:bg-muted"
          >
            <ExternalLinkIcon aria-hidden className="size-3.5" />
            Open
          </Link>
        </div>
      </Panel>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Customer">
          <dl className="grid grid-cols-2 gap-4">
            <Field label="Name" value={quotation.clientName} />
            <Field label="Email" value={quotation.clientEmail} />
            <Field label="Phone" value={quotation.clientPhone} />
            <Field
              label="From enquiry"
              value={quotation.leadId ? "yes" : "standalone"}
            />
          </dl>
          {quotation.leadId ? (
            <Link
              href={`/admin/leads/${quotation.leadId}/`}
              className="mt-4 inline-block text-sm font-semibold text-palm hover:text-palm-deep"
            >
              Open the enquiry →
            </Link>
          ) : null}
        </Panel>

        <Panel title="Journey">
          <dl className="grid grid-cols-2 gap-4">
            <Field label="Pick-up" value={quotation.pickupLocation} />
            <Field label="Destination" value={quotation.dropoffLocation} />
            <Field label="Date" value={quotation.date} />
            <Field label="Time" value={quotation.time} />
            <Field label="Passengers" value={quotation.passengers} />
            <Field label="Vehicle" value={quotation.vehicleType} />
          </dl>
        </Panel>
      </div>

      <Panel title="Lines">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted-foreground">
              <th scope="col" className="py-2 font-medium">Description</th>
              <th scope="col" className="py-2 text-end font-medium">Amount</th>
            </tr>
          </thead>
          <tbody>
            {quotation.lineItems.map((item, index) => (
              <tr key={index} className="border-b border-border last:border-0">
                <td className="py-2.5 text-ink">
                  {item.description}
                  {item.vehicleType ? (
                    <span className="ms-2 text-xs text-muted-foreground">
                      {item.vehicleType}
                    </span>
                  ) : null}
                </td>
                <td className="py-2.5 text-end whitespace-nowrap text-ink tabular-nums">
                  {formatMoney(item.amount, quotation.currency)}
                </td>
              </tr>
            ))}
            <tr>
              <td className="pt-3 font-semibold text-ink">Total</td>
              <td className="pt-3 text-end font-heading text-lg whitespace-nowrap text-palm tabular-nums">
                {formatMoney(quotation.totalAmount, quotation.currency)}
              </td>
            </tr>
          </tbody>
        </table>
      </Panel>

      {maySend ? (
        <>
          <Panel title="Send the quotation">
            <SendDocumentButton
              kind="quotation"
              id={quotation.id}
              to={quotation.clientEmail}
              emailConfigured={isEmailConfigured()}
            />
          </Panel>

          <Panel title="Confirm the booking">
            <SendConfirmationForm
              quotationId={quotation.id}
              to={quotation.clientEmail}
              emailConfigured={isEmailConfigured()}
            />
          </Panel>
        </>
      ) : null}

      {mayWrite ? (
        <>
          <Panel
            title="Edit"
            description="Changing a quotation after it has been sent changes what the customer sees at their link."
          >
            <DocumentForm kind="quotation" existing={quotation} />
          </Panel>

          <div className="flex flex-wrap justify-end gap-3">
            <Link
              href={`/admin/invoices/new/?quotationId=${quotation.id}`}
              className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border px-3 text-sm font-medium text-ink hover:bg-muted"
            >
              <ReceiptIcon aria-hidden className="size-3.5" />
              Raise an invoice from this
            </Link>
            <DeleteDocumentButton
              kind="quotation"
              id={quotation.id}
              number={quotation.quoteNumber}
            />
          </div>
        </>
      ) : null}
    </div>
  );
}
