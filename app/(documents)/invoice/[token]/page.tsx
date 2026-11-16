import { notFound } from "next/navigation";

import { DocumentView } from "@/components/crm/document-view";
import { formatDate } from "@/components/crm/primitives";
import { isDatabaseConfigured } from "@/lib/crm/config";
import { getInvoiceByToken } from "@/lib/crm/documents";

/**
 * A customer's own copy of their invoice. Same token addressing and same
 * 404-for-everything-unknown behaviour as the quotation page; see that file
 * for the reasoning.
 *
 * There is nothing to act on here — an invoice is a statement, not a request
 * for a decision — so it carries no form.
 */
export const instant = false;

export async function generateMetadata({
  params,
}: PageProps<"/invoice/[token]">) {
  const { token } = await params;
  if (!isDatabaseConfigured()) return { title: "Invoice" };
  const invoice = await getInvoiceByToken(token).catch(() => null);
  return { title: invoice ? `Invoice ${invoice.invoiceNumber}` : "Invoice" };
}

export default async function PublicInvoicePage({
  params,
}: PageProps<"/invoice/[token]">) {
  const { token } = await params;

  if (!isDatabaseConfigured()) notFound();

  const invoice = await getInvoiceByToken(token).catch(() => null);
  if (!invoice) notFound();

  const statusLabel =
    invoice.locale === "ar"
      ? { Unpaid: "غير مدفوعة", "Partially Paid": "مدفوعة جزئيًا", Paid: "مدفوعة" }[
          invoice.paymentStatus
        ]
      : invoice.paymentStatus;

  return (
    <main>
      <DocumentView
        kind="invoice"
        number={invoice.invoiceNumber}
        locale={invoice.locale}
        issuedOn={formatDate(invoice.invoiceDate)}
        statusLabel={statusLabel}
        client={{
          name: invoice.clientName,
          email: invoice.clientEmail,
          phone: invoice.clientPhone,
        }}
        journey={{
          serviceType: invoice.serviceType,
          pickupLocation: invoice.pickupLocation,
          dropoffLocation: invoice.dropoffLocation,
          date: invoice.date,
          time: invoice.time,
        }}
        lineItems={invoice.lineItems}
        currency={invoice.currency}
        totalAmount={invoice.totalAmount}
        notes={invoice.notes}
      />
    </main>
  );
}
