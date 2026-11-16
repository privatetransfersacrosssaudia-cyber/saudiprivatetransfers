import Link from "next/link";
import { SearchIcon } from "lucide-react";

import {
  EmptyState,
  LeadStatusBadge,
  LocaleBadge,
  Notice,
  formatDate,
} from "@/components/crm/primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { requirePermission } from "@/lib/crm/auth";
import { isDatabaseConfigured } from "@/lib/crm/config";
import { listLeads } from "@/lib/crm/leads";
import { listUsers } from "@/lib/crm/users";
import {
  LEAD_STATUSES,
  LEAD_SORTS,
  PAGE_SIZE,
  isLeadSort,
  isLeadStatus,
  leadSortLabels,
  type CrmUser,
  type Lead,
  type LeadQuery,
} from "@/lib/crm/types";
import { isLocale } from "@/lib/i18n/config";

export const instant = false;

export const metadata = { title: "Enquiries" };

/**
 * Reads the query string into a validated `LeadQuery`.
 *
 * Everything in a URL is attacker-controlled, so each value is checked against
 * its known set and anything unrecognised is dropped rather than passed down
 * to the database layer. The page size is fixed here rather than taken from
 * the URL, so nobody can ask for every row at once.
 */
function readQuery(params: Record<string, string | string[] | undefined>): LeadQuery {
  const one = (key: string): string | undefined => {
    const value = params[key];
    return typeof value === "string" && value.trim() ? value.trim() : undefined;
  };

  const status = one("status");
  const locale = one("locale");
  const sort = one("sort");
  const assigned = one("assigned");
  const page = Number(one("page") ?? "1");

  return {
    search: one("q")?.slice(0, 120),
    status: isLeadStatus(status) ? status : undefined,
    locale: locale && isLocale(locale) ? locale : undefined,
    sort: isLeadSort(sort) ? sort : "created_desc",
    unassigned: assigned === "none",
    assignedTo: assigned && assigned !== "none" ? assigned : undefined,
    page: Number.isInteger(page) && page > 0 ? page : 1,
    pageSize: PAGE_SIZE,
  };
}

/** Rebuilds the query string with one value changed, keeping the rest. */
function linkWith(
  params: Record<string, string | string[] | undefined>,
  changes: Record<string, string | undefined>
): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string" && value) search.set(key, value);
  }
  for (const [key, value] of Object.entries(changes)) {
    if (value) search.set(key, value);
    else search.delete(key);
  }
  const qs = search.toString();
  return qs ? `/admin/leads/?${qs}` : "/admin/leads/";
}

export default async function LeadsPage({
  searchParams,
}: PageProps<"/admin/leads">) {
  await requirePermission("leads:read", "/admin/leads/");

  const params = (await searchParams) ?? {};
  const query = readQuery(params);

  if (!isDatabaseConfigured()) {
    return (
      <div className="space-y-6">
        <h1 className="font-heading text-2xl text-ink">Enquiries</h1>
        <Notice tone="warning" title="The database is not configured">
          <p>
            Set <code>SUPABASE_URL</code> and <code>SUPABASE_SERVICE_ROLE_KEY</code>,
            then run <code>supabase/schema.sql</code>.
          </p>
        </Notice>
      </div>
    );
  }

  let rows: Lead[] = [];
  let total = 0;
  let pageCount = 1;
  let users: CrmUser[] = [];
  let error: string | null = null;

  try {
    const [page, loadedUsers] = await Promise.all([listLeads(query), listUsers()]);
    rows = page.rows;
    total = page.total;
    pageCount = page.pageCount;
    users = loadedUsers;
  } catch (caught) {
    error = caught instanceof Error ? caught.message : "Could not load enquiries.";
  }

  const current = query.page ?? 1;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-heading text-2xl text-ink">Enquiries</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {error ? "—" : `${total} enquir${total === 1 ? "y" : "ies"}`}
          {query.search ? ` matching “${query.search}”` : ""}
          {query.status ? ` with status ${query.status}` : ""}
        </p>
      </div>

      {/*
        A plain GET form. The whole filter state lives in the URL, so a view
        can be bookmarked, shared with a colleague and reloaded, and the page
        needs no client-side JavaScript to filter at all.
      */}
      <form
        method="get"
        action="/admin/leads/"
        className="flex flex-wrap items-end gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm"
      >
        <div className="min-w-[14rem] flex-1">
          <label
            htmlFor="lead-search"
            className="mb-1 block text-xs font-medium tracking-wide text-muted-foreground uppercase"
          >
            Search
          </label>
          <div className="relative">
            <SearchIcon
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              id="lead-search"
              name="q"
              type="search"
              defaultValue={query.search ?? ""}
              placeholder="Reference, name, phone, email, route…"
              className="h-9 ps-8"
            />
          </div>
        </div>

        <SelectFilter
          id="lead-status"
          name="status"
          label="Status"
          value={query.status ?? ""}
          options={[
            { value: "", label: "Any status" },
            ...LEAD_STATUSES.map((status) => ({ value: status, label: status })),
          ]}
        />

        <SelectFilter
          id="lead-locale"
          name="locale"
          label="Language"
          value={query.locale ?? ""}
          options={[
            { value: "", label: "Any language" },
            { value: "en", label: "English" },
            { value: "ar", label: "Arabic" },
          ]}
        />

        <SelectFilter
          id="lead-assigned"
          name="assigned"
          label="Assigned to"
          value={query.unassigned ? "none" : (query.assignedTo ?? "")}
          options={[
            { value: "", label: "Anyone" },
            { value: "none", label: "Nobody" },
            ...users.map((user) => ({
              value: user.id,
              label: user.name || user.email,
            })),
          ]}
        />

        <SelectFilter
          id="lead-sort"
          name="sort"
          label="Sort"
          value={query.sort ?? "created_desc"}
          options={LEAD_SORTS.map((sort) => ({
            value: sort,
            label: leadSortLabels[sort],
          }))}
        />

        <Button type="submit" size="lg" className="h-9">
          Apply
        </Button>
        {/* A link, not a reset button: clearing means going to the unfiltered
            URL, which `type="reset"` would not do — it would only restore the
            fields to the values the current URL rendered them with. */}
        <Link
          href="/admin/leads/"
          className="inline-flex h-9 items-center rounded-lg px-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-ink"
        >
          Clear
        </Link>
      </form>

      {error ? (
        <Notice tone="warning" title="Could not load enquiries">
          <p>{error}</p>
        </Notice>
      ) : null}

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        {rows.length === 0 && !error ? (
          <EmptyState title="Nothing matches">
            {query.search || query.status || query.locale
              ? "Try widening the filters, or clear them to see everything."
              : "Enquiries will appear here as soon as the quote form is used."}
          </EmptyState>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[60rem] text-sm">
              <caption className="sr-only">
                Enquiries, {total} in total, page {current} of {pageCount}
              </caption>
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th scope="col" className="px-4 py-3 font-medium">Reference</th>
                  <th scope="col" className="px-4 py-3 font-medium">Customer</th>
                  <th scope="col" className="px-4 py-3 font-medium">Journey</th>
                  <th scope="col" className="px-4 py-3 font-medium">Travel</th>
                  <th scope="col" className="px-4 py-3 font-medium">Status</th>
                  <th scope="col" className="px-4 py-3 font-medium">Assigned</th>
                  <th scope="col" className="px-4 py-3 font-medium">Received</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-b border-border align-top last:border-0 hover:bg-muted/50"
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/leads/${lead.id}/`}
                        className="font-mono text-xs font-semibold text-palm hover:text-palm-deep"
                      >
                        {lead.reference}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-ink">
                          {lead.fullName || "—"}
                        </span>
                        <LocaleBadge locale={lead.locale} />
                      </div>
                      <div className="mt-0.5 text-xs text-muted-foreground">
                        {lead.phone || lead.email || "no contact given"}
                      </div>
                    </td>
                    <td className="max-w-[18rem] px-4 py-3 text-muted-foreground">
                      {lead.pickupLocation || "—"} → {lead.dropoffLocation || "—"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-muted-foreground tabular-nums">
                      {lead.date || "—"}
                      {lead.time ? ` · ${lead.time}` : ""}
                    </td>
                    <td className="px-4 py-3">
                      <LeadStatusBadge status={lead.status} />
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {lead.assignedToName || lead.assignedToEmail || "—"}
                    </td>
                    <td className="px-4 py-3 text-xs whitespace-nowrap text-muted-foreground tabular-nums">
                      {formatDate(lead.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {pageCount > 1 ? (
        <nav
          aria-label="Pagination"
          className="flex items-center justify-between gap-4"
        >
          <p className="text-sm text-muted-foreground">
            Page {current} of {pageCount}
          </p>
          <div className="flex gap-2">
            <PageLink
              href={linkWith(params, { page: String(current - 1) })}
              disabled={current <= 1}
            >
              ← Previous
            </PageLink>
            <PageLink
              href={linkWith(params, { page: String(current + 1) })}
              disabled={current >= pageCount}
            >
              Next →
            </PageLink>
          </div>
        </nav>
      ) : null}
    </div>
  );
}

function SelectFilter({
  id,
  name,
  label,
  value,
  options,
}: {
  id: string;
  name: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1 block text-xs font-medium tracking-wide text-muted-foreground uppercase"
      >
        {label}
      </label>
      {/*
        A native select, not the design system's custom one: this form is
        submitted by the browser with no JavaScript, and the custom control
        renders a button rather than a form field.
      */}
      <select
        id={id}
        name={name}
        defaultValue={value}
        className="h-9 rounded-lg border border-input bg-transparent px-2.5 text-sm text-ink outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function PageLink({
  href,
  disabled,
  children,
}: {
  href: string;
  disabled: boolean;
  children: React.ReactNode;
}) {
  if (disabled) {
    return (
      <span
        aria-disabled
        className="inline-flex h-9 items-center rounded-lg border border-border px-3 text-sm text-muted-foreground opacity-50"
      >
        {children}
      </span>
    );
  }
  return (
    <Link
      href={href}
      className="inline-flex h-9 items-center rounded-lg border border-border bg-card px-3 text-sm font-medium text-ink hover:bg-muted"
    >
      {children}
    </Link>
  );
}
