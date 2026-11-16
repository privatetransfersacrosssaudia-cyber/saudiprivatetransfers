import Link from "next/link";
import { PlusIcon } from "lucide-react";

import {
  EmptyState,
  LocaleBadge,
  Notice,
  PaymentStatusBadge,
  formatDate,
  formatMoney,
} from "@/components/crm/primitives";
import { requirePermission } from "@/lib/crm/auth";
import { isDatabaseConfigured } from "@/lib/crm/config";
import { listInvoices } from "@/lib/crm/documents";
import { can, type Invoice } from "@/lib/crm/types";

export const instant = false;

export const metadata = { title: "Invoices" };

export default async function InvoicesPage() {
  const user = await requirePermission("documents:read", "/admin/invoices/");
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

  let rows: Invoice[] = [];
  let error: string | null = null;
  try {
    rows = await listInvoices();
  } catch (caught) {
    error = caught instanceof Error ? caught.message : "Could not load invoices.";
  }

  const outstanding = rows
    .filter((invoice) => invoice.paymentStatus !== "Paid")
    .reduce((total, invoice) => total + invoice.totalAmount, 0);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl text-ink">Invoices</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {error
              ? "—"
              : `${rows.length} invoice${rows.length === 1 ? "" : "s"}${
                  outstanding > 0
                    ? ` · ${formatMoney(outstanding, rows[0]?.currency ?? "SAR")} not yet paid`
                    : ""
                }`}
          </p>
        </div>
        {mayWrite ? (
          <Link
            href="/admin/invoices/new/"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-palm px-3.5 text-sm font-semibold text-white hover:bg-palm-deep"
          >
            <PlusIcon aria-hidden className="size-4" />
            New invoice
          </Link>
        ) : null}
      </div>

      {error ? (
        <Notice tone="warning" title="Could not load invoices">
          <p>{error}</p>
        </Notice>
      ) : null}

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        {rows.length === 0 && !error ? (
          <EmptyState title="No invoices yet">
            Raise one from an accepted quotation, or create a standalone invoice.
          </EmptyState>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[48rem] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th scope="col" className="px-4 py-3 font-medium">Number</th>
                  <th scope="col" className="px-4 py-3 font-medium">Customer</th>
                  <th scope="col" className="px-4 py-3 font-medium">Journey</th>
                  <th scope="col" className="px-4 py-3 font-medium">Total</th>
                  <th scope="col" className="px-4 py-3 font-medium">Payment</th>
                  <th scope="col" className="px-4 py-3 font-medium">Issued</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className="border-b border-border align-top last:border-0 hover:bg-muted/50"
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/invoices/${invoice.id}/`}
                        className="font-mono text-xs font-semibold text-palm hover:text-palm-deep"
                      >
                        {invoice.invoiceNumber}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-ink">
                          {invoice.clientName || "—"}
                        </span>
                        <LocaleBadge locale={invoice.locale} />
                      </div>
                      <div className="mt-0.5 text-xs text-muted-foreground">
                        {invoice.clientEmail || "no email"}
                      </div>
                    </td>
                    <td className="max-w-[16rem] px-4 py-3 text-muted-foreground">
                      {invoice.pickupLocation || "—"} → {invoice.dropoffLocation || "—"}
                    </td>
                    <td className="px-4 py-3 font-medium whitespace-nowrap text-ink tabular-nums">
                      {formatMoney(invoice.totalAmount, invoice.currency)}
                    </td>
                    <td className="px-4 py-3">
                      <PaymentStatusBadge status={invoice.paymentStatus} />
                    </td>
                    <td className="px-4 py-3 text-xs whitespace-nowrap text-muted-foreground tabular-nums">
                      {formatDate(invoice.createdAt)}
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
