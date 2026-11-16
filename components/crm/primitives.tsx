import { AlertTriangleIcon, InboxIcon, InfoIcon } from "lucide-react";
import { cn } from "cn";

import {
  type LeadStatus,
  type PaymentStatus,
  type QuoteStatus,
} from "@/lib/crm/types";

/**
 * The CRM's shared presentational pieces.
 *
 * Built from the site's own design tokens — `palm`, `brass`, `sand`, `ink`,
 * plus the shadcn semantic tokens — rather than a second palette for the staff
 * tool. The source CRM leaned on `midnight` and `hairline`, which do not exist
 * in this project's theme; `palm-deep` and `border` are the equivalents here.
 */

export function Panel({
  title,
  description,
  action,
  className,
  children,
}: {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-border bg-card shadow-sm",
        className
      )}
    >
      {title ? (
        <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border px-5 py-4">
          <div>
            <h2 className="font-heading text-lg leading-tight text-ink">{title}</h2>
            {description ? (
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            ) : null}
          </div>
          {action}
        </header>
      ) : null}
      <div className="p-5">{children}</div>
    </section>
  );
}

/**
 * A short definition pair. Renders an em dash for an empty value rather than
 * collapsing, so a missing field is visibly missing instead of ambiguous.
 */
export function Field({
  label,
  value,
  className,
}: {
  label: string;
  value: string | null | undefined;
  className?: string;
}) {
  const text = value?.trim();
  return (
    <div className={className}>
      <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </dt>
      <dd
        className={cn(
          "mt-1 text-sm break-words",
          text ? "text-ink" : "text-muted-foreground"
        )}
      >
        {text || "—"}
      </dd>
    </div>
  );
}

export function Notice({
  tone = "info",
  title,
  children,
}: {
  tone?: "info" | "warning";
  title: string;
  children?: React.ReactNode;
}) {
  const warning = tone === "warning";
  const Icon = warning ? AlertTriangleIcon : InfoIcon;
  return (
    <div
      role="status"
      className={cn(
        "flex gap-3 rounded-xl border p-4 text-sm",
        warning
          ? "border-destructive/30 bg-destructive/5 text-ink"
          : "border-brass/40 bg-brass/10 text-ink"
      )}
    >
      <Icon
        aria-hidden
        className={cn("mt-0.5 size-4 shrink-0", warning ? "text-destructive" : "text-brass-deep")}
      />
      <div className="min-w-0">
        <p className="font-semibold">{title}</p>
        {children ? (
          <div className="mt-1 text-muted-foreground [&_code]:rounded [&_code]:bg-sand-deep [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-xs [&_code]:text-ink">
            {children}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function EmptyState({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-2 px-6 py-14 text-center">
      <InboxIcon aria-hidden className="size-6 text-muted-foreground" />
      <p className="font-medium text-ink">{title}</p>
      {children ? (
        <p className="max-w-md text-sm text-muted-foreground">{children}</p>
      ) : null}
    </div>
  );
}

// --- Status badges ----------------------------------------------------------

/**
 * Status colours.
 *
 * Each pairing was chosen so the text clears WCAG AA against its own tint
 * rather than only looking distinct: the badge has to be readable, not merely
 * colour-coded. Colour is never the only signal — the status word is always
 * written out.
 */
const leadStatusStyles: Record<LeadStatus, string> = {
  New: "bg-brass/20 text-[color-mix(in_oklch,var(--brass-deep),var(--ink)_35%)] ring-brass/40",
  Contacted: "bg-sky-100 text-sky-900 ring-sky-300",
  Quoted: "bg-violet-100 text-violet-900 ring-violet-300",
  Confirmed: "bg-palm-soft text-palm-deep ring-palm/40",
  Completed: "bg-emerald-100 text-emerald-900 ring-emerald-300",
  Cancelled: "bg-muted text-muted-foreground ring-border",
};

const quoteStatusStyles: Record<QuoteStatus, string> = {
  Draft: "bg-muted text-muted-foreground ring-border",
  Sent: "bg-sky-100 text-sky-900 ring-sky-300",
  Accepted: "bg-emerald-100 text-emerald-900 ring-emerald-300",
  Declined: "bg-destructive/10 text-destructive ring-destructive/30",
  Expired: "bg-amber-100 text-amber-900 ring-amber-300",
};

const paymentStatusStyles: Record<PaymentStatus, string> = {
  Unpaid: "bg-amber-100 text-amber-900 ring-amber-300",
  "Partially Paid": "bg-sky-100 text-sky-900 ring-sky-300",
  Paid: "bg-emerald-100 text-emerald-900 ring-emerald-300",
};

const badgeBase =
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset whitespace-nowrap";

export function LeadStatusBadge({ status }: { status: LeadStatus }) {
  return <span className={cn(badgeBase, leadStatusStyles[status])}>{status}</span>;
}

export function QuoteStatusBadge({ status }: { status: QuoteStatus }) {
  return <span className={cn(badgeBase, quoteStatusStyles[status])}>{status}</span>;
}

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  return <span className={cn(badgeBase, paymentStatusStyles[status])}>{status}</span>;
}

/** Marks which language an enquiry arrived in, so replies go out in it. */
export function LocaleBadge({ locale }: { locale: "en" | "ar" }) {
  return (
    <span
      className={cn(
        badgeBase,
        locale === "ar"
          ? "bg-palm-soft text-palm-deep ring-palm/40"
          : "bg-muted text-muted-foreground ring-border"
      )}
      title={locale === "ar" ? "Arabic enquiry — reply in Arabic" : "English enquiry"}
    >
      {locale === "ar" ? "العربية" : "EN"}
    </span>
  );
}

// --- Formatting -------------------------------------------------------------

/**
 * Dates and times, rendered on the server in a fixed zone.
 *
 * `Asia/Riyadh` and `en-GB` are pinned deliberately: a server in another
 * region would otherwise format timestamps in its own zone, so an enquiry that
 * arrived in the Riyadh evening could read as the previous day. Pinning also
 * means the server and client agree, so there is nothing to mismatch on
 * hydration.
 */
const dateTimeFormat = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Riyadh",
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Riyadh",
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export function formatDateTime(iso: string): string {
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return "—";
  return dateTimeFormat.format(parsed);
}

export function formatDate(iso: string): string {
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return "—";
  return dateFormat.format(parsed);
}

export function formatMoney(amount: number, currency: string): string {
  return `${currency} ${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
