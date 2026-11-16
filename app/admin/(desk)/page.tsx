import Link from "next/link";
import {
  CalendarClockIcon,
  CircleCheckIcon,
  InboxIcon,
  SparklesIcon,
  UserMinusIcon,
} from "lucide-react";

import {
  EmptyState,
  LeadStatusBadge,
  LocaleBadge,
  Notice,
  Panel,
  formatDateTime,
} from "@/components/crm/primitives";
import { requirePermission } from "@/lib/crm/auth";
import { isDatabaseConfigured } from "@/lib/crm/config";
import { getLeadStats, listLeads, type LeadStats } from "@/lib/crm/leads";
import { LEAD_STATUSES, type Lead } from "@/lib/crm/types";

export const instant = false;

export const metadata = { title: "Dashboard" };

const EMPTY_STATS: LeadStats = {
  total: 0,
  today: 0,
  open: 0,
  unassigned: 0,
  byStatus: Object.fromEntries(
    LEAD_STATUSES.map((status) => [status, 0])
  ) as LeadStats["byStatus"],
};

export default async function DashboardPage() {
  await requirePermission("leads:read", "/admin/");

  if (!isDatabaseConfigured()) {
    return (
      <div className="space-y-6">
        <Header />
        <Notice tone="warning" title="The database is not configured">
          <p>
            Set <code>SUPABASE_URL</code> and <code>SUPABASE_SERVICE_ROLE_KEY</code>,
            then run <code>supabase/schema.sql</code> in that project. Until
            then no enquiry can be stored or shown.
          </p>
        </Notice>
      </div>
    );
  }

  let stats = EMPTY_STATS;
  let recent: Lead[] = [];
  let error: string | null = null;

  try {
    const [loadedStats, page] = await Promise.all([
      getLeadStats(),
      listLeads({ page: 1, pageSize: 8 }),
    ]);
    stats = loadedStats;
    recent = page.rows;
  } catch (caught) {
    error = caught instanceof Error ? caught.message : "Could not load enquiries.";
  }

  const tiles = [
    { label: "Total enquiries", value: stats.total, icon: InboxIcon },
    { label: "New", value: stats.byStatus.New, icon: SparklesIcon },
    { label: "Open", value: stats.open, icon: CircleCheckIcon },
    { label: "Unassigned", value: stats.unassigned, icon: UserMinusIcon },
    { label: "Today", value: stats.today, icon: CalendarClockIcon },
  ];

  return (
    <div className="space-y-6">
      <Header />

      {error ? (
        <Notice tone="warning" title="Could not load enquiries">
          <p>{error}</p>
        </Notice>
      ) : null}

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
        {tiles.map((tile) => {
          const Icon = tile.icon;
          return (
            <div
              key={tile.label}
              className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs text-muted-foreground sm:text-sm">
                  {tile.label}
                </span>
                <Icon aria-hidden className="size-4 shrink-0 text-brass-deep" />
              </div>
              <p className="mt-2 font-heading text-3xl text-ink tabular-nums">
                {tile.value}
              </p>
            </div>
          );
        })}
      </div>

      <Panel
        title="Latest enquiries"
        action={
          <Link
            href="/admin/leads/"
            className="text-sm font-semibold text-palm hover:text-palm-deep"
          >
            View all →
          </Link>
        }
        className="overflow-hidden"
      >
        {recent.length === 0 ? (
          <EmptyState title="No enquiries yet">
            They will appear here as soon as the quote form is used.
          </EmptyState>
        ) : (
          <ul className="divide-y divide-border">
            {recent.map((lead) => (
              <li key={lead.id} className="py-3 first:pt-0 last:pb-0">
                <Link
                  href={`/admin/leads/${lead.id}/`}
                  className="group flex flex-wrap items-start justify-between gap-x-4 gap-y-2 rounded-lg px-1 hover:bg-muted/60"
                >
                  <div className="min-w-0">
                    <p className="flex flex-wrap items-center gap-2 font-medium text-ink group-hover:text-palm">
                      {lead.fullName || "Unnamed enquiry"}
                      <LocaleBadge locale={lead.locale} />
                    </p>
                    <p className="mt-0.5 truncate text-sm text-muted-foreground">
                      {lead.pickupLocation || "—"} → {lead.dropoffLocation || "—"}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <LeadStatusBadge status={lead.status} />
                    <span className="text-xs whitespace-nowrap text-muted-foreground tabular-nums">
                      {formatDateTime(lead.createdAt)}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}

function Header() {
  return (
    <div>
      <h1 className="font-heading text-2xl text-ink">Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Enquiries from the website, newest first.
      </p>
    </div>
  );
}
