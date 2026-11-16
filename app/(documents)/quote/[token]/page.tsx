import { notFound } from "next/navigation";

import { DocumentView } from "@/components/crm/document-view";
import { QuoteDecision } from "@/components/crm/quote-decision";
import { formatDate } from "@/components/crm/primitives";
import { isDatabaseConfigured } from "@/lib/crm/config";
import { getQuotationByToken } from "@/lib/crm/documents";

/**
 * A customer's own copy of their quotation.
 *
 * Public in the sense that it needs no sign-in, but addressed by a 16-byte
 * token rather than an id, so it cannot be found by guessing or by walking a
 * sequence. Anything that is not a well-formed token is a 404 before it ever
 * becomes a database query.
 *
 * An unknown token and a deleted quotation give the same answer, so this page
 * cannot be used to learn which tokens exist.
 */
export const instant = false;

export async function generateMetadata({
  params,
}: PageProps<"/quote/[token]">) {
  const { token } = await params;
  if (!isDatabaseConfigured()) return { title: "Quotation" };
  const quotation = await getQuotationByToken(token).catch(() => null);
  return {
    title: quotation ? `Quotation ${quotation.quoteNumber}` : "Quotation",
  };
}

export default async function PublicQuotationPage({
  params,
}: PageProps<"/quote/[token]">) {
  const { token } = await params;

  if (!isDatabaseConfigured()) notFound();

  const quotation = await getQuotationByToken(token).catch(() => null);
  if (!quotation) notFound();

  const settled =
    quotation.status === "Accepted" || quotation.status === "Declined"
      ? quotation.status
      : null;

  const statusLabel =
    quotation.locale === "ar"
      ? { Draft: "مسودة", Sent: "بانتظار ردك", Accepted: "مقبول", Declined: "مرفوض", Expired: "منتهي" }[
          quotation.status
        ]
      : quotation.status === "Sent"
        ? "Awaiting your response"
        : quotation.status;

  return (
    <main>
      <DocumentView
        kind="quotation"
        number={quotation.quoteNumber}
        locale={quotation.locale}
        issuedOn={formatDate(quotation.quoteDate)}
        validUntil={quotation.validUntil}
        statusLabel={statusLabel}
        client={{
          name: quotation.clientName,
          email: quotation.clientEmail,
          phone: quotation.clientPhone,
        }}
        journey={{
          serviceType: quotation.serviceType,
          pickupLocation: quotation.pickupLocation,
          dropoffLocation: quotation.dropoffLocation,
          date: quotation.date,
          time: quotation.time,
          passengers: quotation.passengers,
          luggage: quotation.luggage,
          vehicleType: quotation.vehicleType,
          flightNumber: quotation.flightNumber,
        }}
        lineItems={quotation.lineItems}
        currency={quotation.currency}
        totalAmount={quotation.totalAmount}
        terms={{
          paymentTerms: quotation.paymentTerms,
          cancellationPolicy: quotation.cancellationPolicy,
          specialRequests: quotation.specialRequests,
        }}
        notes={quotation.notes}
      >
        {quotation.status === "Expired" ? null : (
          <div className="print:hidden">
            <QuoteDecision
              token={quotation.publicToken}
              locale={quotation.locale}
              settled={settled}
            />
          </div>
        )}
      </DocumentView>
    </main>
  );
}
