import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import { DocumentForm } from "@/components/crm/document-form";
import { Notice, Panel } from "@/components/crm/primitives";
import { requirePermission } from "@/lib/crm/auth";
import { isDatabaseConfigured } from "@/lib/crm/config";
import { getLead } from "@/lib/crm/leads";

export const instant = false;

export const metadata = { title: "New quotation" };

export default async function NewQuotationPage({
  searchParams,
}: PageProps<"/admin/quotations/new">) {
  await requirePermission("documents:write", "/admin/quotations/new/");

  if (!isDatabaseConfigured()) {
    return (
      <Notice tone="warning" title="The database is not configured">
        <p>Quotations cannot be created until the database is set up.</p>
      </Notice>
    );
  }

  const params = await searchParams;
  const leadId = typeof params?.leadId === "string" ? params.leadId : null;

  // Pre-fill from the enquiry when one was named, so the operator is checking
  // details rather than retyping them. The values are snapshotted into the
  // quotation on save — it does not stay linked to the enquiry's fields.
  const lead = leadId ? await getLead(leadId).catch(() => null) : null;

  return (
    <div className="space-y-6">
      <Link
        href={lead ? `/admin/leads/${lead.id}/` : "/admin/quotations/"}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-palm"
      >
        <ArrowLeftIcon aria-hidden className="size-4 rtl:-scale-x-100" />
        {lead ? `Back to ${lead.reference}` : "Back to quotations"}
      </Link>

      <div>
        <h1 className="font-heading text-2xl text-ink">New quotation</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {lead
            ? `Pre-filled from enquiry ${lead.reference}. Check every line before sending.`
            : "A standalone quotation, not linked to any enquiry."}
        </p>
      </div>

      {leadId && !lead ? (
        <Notice tone="warning" title="That enquiry could not be found">
          <p>The quotation below is empty; fill it in by hand.</p>
        </Notice>
      ) : null}

      <Panel>
        <DocumentForm
          kind="quotation"
          leadDefaults={
            lead
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
              : undefined
          }
        />
      </Panel>
    </div>
  );
}
