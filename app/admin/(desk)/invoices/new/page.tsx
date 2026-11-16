import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import { DocumentForm } from "@/components/crm/document-form";
import { Notice, Panel } from "@/components/crm/primitives";
import { requirePermission } from "@/lib/crm/auth";
import { isDatabaseConfigured } from "@/lib/crm/config";
import { getQuotation } from "@/lib/crm/documents";
import { getLead } from "@/lib/crm/leads";

export const instant = false;

export const metadata = { title: "New invoice" };

export default async function NewInvoicePage({
  searchParams,
}: PageProps<"/admin/invoices/new">) {
  await requirePermission("documents:write", "/admin/invoices/new/");

  if (!isDatabaseConfigured()) {
    return (
      <Notice tone="warning" title="The database is not configured">
        <p>Invoices cannot be created until the database is set up.</p>
      </Notice>
    );
  }

  const params = await searchParams;
  const leadId = typeof params?.leadId === "string" ? params.leadId : null;
  const quotationId =
    typeof params?.quotationId === "string" ? params.quotationId : null;

  // An invoice can be raised from an accepted quotation (the usual route) or
  // straight from an enquiry. Either way the values are copied in, not linked.
  const quotation = quotationId
    ? await getQuotation(quotationId).catch(() => null)
    : null;
  const lead = leadId ? await getLead(leadId).catch(() => null) : null;

  const source = quotation
    ? {
        leadId: quotation.leadId ?? "",
        clientName: quotation.clientName,
        clientEmail: quotation.clientEmail,
        clientPhone: quotation.clientPhone,
        locale: quotation.locale,
        serviceType: quotation.serviceType,
        pickupLocation: quotation.pickupLocation,
        dropoffLocation: quotation.dropoffLocation,
        date: quotation.date,
        time: quotation.time,
        passengers: quotation.passengers,
        luggage: quotation.luggage,
        vehicleType: quotation.vehicleType,
        flightNumber: quotation.flightNumber,
      }
    : lead
      ? {
          leadId: lead.id,
          clientName: lead.fullName,
          clientEmail: lead.email,
          clientPhone: lead.phone,
          locale: lead.locale,
          serviceType: lead.serviceType,
          pickupLocation: lead.pickupLocation,
          dropoffLocation: lead.dropoffLocation,
          date: lead.date,
          time: lead.time,
          passengers: lead.passengers,
          luggage: lead.luggage,
          vehicleType: lead.vehicleType,
          flightNumber: lead.flightNumber,
        }
      : undefined;

  return (
    <div className="space-y-6">
      <Link
        href={quotation ? `/admin/quotations/${quotation.id}/` : "/admin/invoices/"}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-palm"
      >
        <ArrowLeftIcon aria-hidden className="size-4 rtl:-scale-x-100" />
        {quotation ? `Back to ${quotation.quoteNumber}` : "Back to invoices"}
      </Link>

      <div>
        <h1 className="font-heading text-2xl text-ink">New invoice</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {quotation
            ? `Pre-filled from quotation ${quotation.quoteNumber}, including its lines.`
            : lead
              ? `Pre-filled from enquiry ${lead.reference}.`
              : "A standalone invoice."}
        </p>
      </div>

      <Panel>
        {/*
          The quotation's lines and terms are copied in as starting values, and
          its id travels as `quotationId` so the invoice records where it came
          from. The amounts are a snapshot: nothing reads back from the
          quotation after this.
        */}
        <DocumentForm
          kind="invoice"
          leadDefaults={source}
          prefill={
            quotation
              ? {
                  quotationId: quotation.id,
                  lineItems: quotation.lineItems,
                  currency: quotation.currency,
                  notes: quotation.notes,
                }
              : undefined
          }
        />
      </Panel>
    </div>
  );
}
