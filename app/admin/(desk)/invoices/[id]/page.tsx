import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ExternalLinkIcon } from "lucide-react";

import {
  CopyLinkButton,
  DeleteDocumentButton,
  InvoiceStatusControl,
  SendDocumentButton,
} from "@/components/crm/document-controls";
import { DocumentForm } from "@/components/crm/document-form";
import {
  Field,
  LocaleBadge,
  Notice,
  Panel,
  PaymentStatusBadge,
  formatDateTime,
  formatMoney,
} from "@/components/crm/primitives";
import { requirePermission } from "@/lib/crm/auth";
import { isDatabaseConfigured, isEmailConfigured } from "@/lib/crm/config";
import { getInvoice } from "@/lib/crm/documents";
import { can } from "@/lib/crm/types";
import { absoluteUrl } from "@/lib/site";

export const instant = false;

export default async function InvoiceDetailPage({
  params,
}: PageProps<"/admin/invoices/[id]">) {
  const { id } = await params;
  const user = await requirePermission("documents:read", `/admin/invoices/${id}/`);

  if (!isDatabaseConfigured()) {
    return (
      <Notice tone="warning" title="The database is not configured">
        <p>Set the Supabase variables to view invoices.</p>
      </Notice>
    );
  }

  const invoice = await getInvoice(id).catch(() => null);
  if (!invoice) notFound();

  const mayWrite = can(user.role, "documents:write");
  const maySend = can(user.role, "documents:send");
  const publicUrl = absoluteUrl(`/invoice/${invoice.publicToken}/`);

  return (
    <div className="space-y-6">
      <Link
        href="/admin/invoices/"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-palm"
      >
        <ArrowLeftIcon aria-hidden className="size-4 rtl:-scale-x-100" />
        Back to invoices
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs font-semibold tracking-wider text-brass-deep">
            {invoice.invoiceNumber}
          </p>
          <h1 className="mt-1 flex flex-wrap items-center gap-3 font-heading text-2xl text-ink">
            {invoice.clientName || "Invoice"}
            <LocaleBadge locale={invoice.locale} />
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Issued {formatDateTime(invoice.createdAt)} ·{" "}
            {formatMoney(invoice.totalAmount, invoice.currency)}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <PaymentStatusBadge status={invoice.paymentStatus} />
          {mayWrite ? (
            <InvoiceStatusControl
              invoiceId={invoice.id}
              status={invoice.paymentStatus}
            />
          ) : null}
        </div>
      </div>

      <Panel
        title="The customer's link"
        description="An unguessable token, never a sequential id."
      >
        <div className="flex flex-wrap items-center gap-3">
          <code className="min-w-0 flex-1 truncate rounded-lg bg-muted px-3 py-2 text-xs text-ink">
            {publicUrl}
          </code>
          <CopyLinkButton url={publicUrl} />
          <Link
            href={`/invoice/${invoice.publicToken}/`}
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
            <Field label="Name" value={invoice.clientName} />
            <Field label="Email" value={invoice.clientEmail} />
            <Field label="Phone" value={invoice.clientPhone} />
            <Field label="Service" value={invoice.serviceType} />
          </dl>
          {invoice.leadId ? (
            <Link
              href={`/admin/leads/${invoice.leadId}/`}
              className="mt-4 inline-block text-sm font-semibold text-palm hover:text-palm-deep"
            >
              Open the enquiry →
            </Link>
          ) : null}
        </Panel>

        <Panel title="Journey">
          <dl className="grid grid-cols-2 gap-4">
            <Field label="Pick-up" value={invoice.pickupLocation} />
            <Field label="Destination" value={invoice.dropoffLocation} />
            <Field label="Date" value={invoice.date} />
            <Field label="Time" value={invoice.time} />
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
            {invoice.lineItems.map((item, index) => (
              <tr key={index} className="border-b border-border last:border-0">
                <td className="py-2.5 text-ink">{item.description}</td>
                <td className="py-2.5 text-end whitespace-nowrap text-ink tabular-nums">
                  {formatMoney(item.amount, invoice.currency)}
                </td>
              </tr>
            ))}
            <tr>
              <td className="pt-3 font-semibold text-ink">Total</td>
              <td className="pt-3 text-end font-heading text-lg whitespace-nowrap text-palm tabular-nums">
                {formatMoney(invoice.totalAmount, invoice.currency)}
              </td>
            </tr>
          </tbody>
        </table>
      </Panel>

      {maySend ? (
        <Panel title="Send the invoice">
          <SendDocumentButton
            kind="invoice"
            id={invoice.id}
            to={invoice.clientEmail}
            emailConfigured={isEmailConfigured()}
          />
        </Panel>
      ) : null}

      {mayWrite ? (
        <>
          <Panel title="Edit">
            <DocumentForm kind="invoice" existing={invoice} />
          </Panel>
          <div className="flex justify-end">
            <DeleteDocumentButton
              kind="invoice"
              id={invoice.id}
              number={invoice.invoiceNumber}
            />
          </div>
        </>
      ) : null}
    </div>
  );
}
