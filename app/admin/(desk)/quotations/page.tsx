import Link from "next/link";
import { PlusIcon } from "lucide-react";

import {
  EmptyState,
  LocaleBadge,
  Notice,
  QuoteStatusBadge,
  formatDate,
  formatMoney,
} from "@/components/crm/primitives";
import { requirePermission } from "@/lib/crm/auth";
import { isDatabaseConfigured } from "@/lib/crm/config";
import { listQuotations } from "@/lib/crm/documents";
import { can, type Quotation } from "@/lib/crm/types";

export const instant = false;

export const metadata = { title: "Quotations" };

export default async function QuotationsPage() {
  const user = await requirePermission("documents:read", "/admin/quotations/");
  const mayWrite = can(user.role, "documents:write");

  if (!isDatabaseConfigured()) {
    return (
      <Notice tone="warning" title="The database is not configured">
        <p>
          Set <code>SUPABASE_URL</code> and <code>SUPABASE_SERVICE_ROLE_KEY</code>.
        </p>
      </Notice>
    );
  }

  let rows: Quotation[] = [];
  let error: string | null = null;
  try {
    rows = await listQuotations();
  } catch (caught) {
    error = caught instanceof Error ? caught.message : "Could not load quotations.";
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl text-ink">Quotations</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {error ? "—" : `${rows.length} quotation${rows.length === 1 ? "" : "s"}`}
          </p>
        </div>
        {mayWrite ? (
          <Link
            href="/admin/quotations/new/"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-palm px-3.5 text-sm font-semibold text-white hover:bg-palm-deep"
          >
            <PlusIcon aria-hidden className="size-4" />
            New quotation
          </Link>
        ) : null}
      </div>

      {error ? (
        <Notice tone="warning" title="Could not load quotations">
          <p>{error}</p>
        </Notice>
      ) : null}

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        {rows.length === 0 && !error ? (
          <EmptyState title="No quotations yet">
            Raise one from an enquiry, or create a standalone quotation for a
            booking that came in by phone.
          </EmptyState>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[52rem] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th scope="col" className="px-4 py-3 font-medium">Number</th>
                  <th scope="col" className="px-4 py-3 font-medium">Customer</th>
                  <th scope="col" className="px-4 py-3 font-medium">Journey</th>
                  <th scope="col" className="px-4 py-3 font-medium">Total</th>
                  <th scope="col" className="px-4 py-3 font-medium">Status</th>
                  <th scope="col" className="px-4 py-3 font-medium">Valid until</th>
                  <th scope="col" className="px-4 py-3 font-medium">Created</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((quotation) => (
                  <tr
                    key={quotation.id}
                    className="border-b border-border align-top last:border-0 hover:bg-muted/50"
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/quotations/${quotation.id}/`}
                        className="font-mono text-xs font-semibold text-palm hover:text-palm-deep"
                      >
                        {quotation.quoteNumber}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-ink">
                          {quotation.clientName || "—"}
                        </span>
                        <LocaleBadge locale={quotation.locale} />
                      </div>
                      <div className="mt-0.5 text-xs text-muted-foreground">
                        {quotation.clientEmail || "no email"}
                      </div>
                    </td>
                    <td className="max-w-[16rem] px-4 py-3 text-muted-foreground">
                      {quotation.pickupLocation || "—"} → {quotation.dropoffLocation || "—"}
                    </td>
                    <td className="px-4 py-3 font-medium whitespace-nowrap text-ink tabular-nums">
                      {formatMoney(quotation.totalAmount, quotation.currency)}
                    </td>
                    <td className="px-4 py-3">
                      <QuoteStatusBadge status={quotation.status} />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-muted-foreground tabular-nums">
                      {quotation.validUntil || "—"}
                    </td>
                    <td className="px-4 py-3 text-xs whitespace-nowrap text-muted-foreground tabular-nums">
                      {formatDate(quotation.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
