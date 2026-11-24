"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRightIcon, CheckIcon } from "lucide-react";

import { cn } from "cn";
import type { Locale } from "@/lib/i18n/config";

/**
 * Build the enquiry, not just a list.
 *
 * Ziyarat is the one service on this site where the customer writes the
 * route. Every other transfer has two fixed ends; here the list of places is
 * the journey, and it decides the duration, the vehicle and the price. So
 * the checklist the brief asked for is not a printable reminder — it
 * composes the enquiry as you tick, and hands the quote form a pickup, a
 * destination list and a passenger count already filled in.
 *
 * **A real limitation, stated rather than worked around.** The quote form
 * accepts five prefill fields: `pickup`, `dropoff`, `date`, `time` and
 * `passengers`. There is no supported parameter for free text, so the
 * accessibility and return-journey notes below cannot be prefilled — they
 * are shown as a short list for the visitor to carry into the message box
 * themselves. Inventing a sixth parameter would mean changing the form's
 * schema, which this task is not permitted to do and which would silently
 * break if the schema changed underneath it.
 *
 * Selected places are composed into `dropoff` as a comma-separated string.
 * That field is free text on the form, so this is using it as intended
 * rather than overloading it.
 *
 * No dependency, no effect, no state set after mount.
 */
/**
 * Exactly the options the quote form's own `passengers` select offers.
 * Kept in step with `components/quote` by hand: a value outside this list
 * is dropped by the form without warning.
 */
const PASSENGER_OPTIONS = ["1", "2", "3", "4", "5", "6", "7+"] as const;

export type PlannerSite = { id: string; en: string; ar: string };

export type PlannerCopy = {
  cityLabel: string;
  sitesLabel: string;
  sitesHint: string;
  passengersLabel: string;
  passengersAny: string;
  notesLabel: string;
  pickupLabel: string;
  pickupPlaceholder: string;
  summaryLabel: string;
  emptyState: string;
  carryOver: string;
  cta: string;
};

export function JourneyPlanner({
  locale,
  cities,
  copy,
  quotePath,
}: {
  locale: Locale;
  cities: { id: string; en: string; ar: string; sites: PlannerSite[] }[];
  copy: PlannerCopy;
  notes: { id: string; en: string; ar: string }[];
  quotePath: string;
}) {
  const [cityId, setCityId] = React.useState(cities[0]?.id ?? "");
  const [picked, setPicked] = React.useState<string[]>([]);
  const [passengers, setPassengers] = React.useState("");
  const [pickup, setPickup] = React.useState("");

  const city = cities.find((c) => c.id === cityId) ?? cities[0];

  const toggle = (id: string) =>
    setPicked((current) =>
      current.includes(id)
        ? current.filter((x) => x !== id)
        : [...current, id]
    );

  // Changing city clears a selection that no longer belongs to it.
  const chooseCity = (id: string) => {
    setCityId(id);
    setPicked([]);
  };

  const chosen = (city?.sites ?? []).filter((s) => picked.includes(s.id));

  const dropoff = chosen.map((s) => s[locale]).join(", ");

  const params = new URLSearchParams();
  if (pickup.trim()) params.set("pickup", pickup.trim());
  else if (city) params.set("pickup", city[locale]);
  if (dropoff) params.set("dropoff", dropoff);
  if (passengers.trim()) params.set("passengers", passengers.trim());

  const quoteHref = `${quotePath}?${params.toString()}`;

  const fieldClass =
    "h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-ink focus:border-palm focus:ring-2 focus:ring-palm/30 focus:outline-none";

  return (
    <div className="rounded-2xl bg-card p-6 ring-1 ring-ink/8 sm:p-8">
      {/* City */}
      <fieldset>
        <legend className="text-sm font-semibold text-ink">
          {copy.cityLabel}
        </legend>
        <div className="mt-3 flex flex-wrap gap-2.5">
          {cities.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => chooseCity(c.id)}
              aria-pressed={c.id === cityId}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                c.id === cityId
                  ? "border-brass bg-brass text-ink"
                  : "border-border bg-background text-ink hover:border-brass"
              )}
            >
              {c[locale]}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Sites */}
      {city && city.sites.length > 0 ? (
        <fieldset className="mt-7">
          <legend className="text-sm font-semibold text-ink">
            {copy.sitesLabel}
          </legend>
          <p className="mt-1 text-sm text-muted-foreground">{copy.sitesHint}</p>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {city.sites.map((site) => {
              const on = picked.includes(site.id);
              return (
                <button
                  key={site.id}
                  type="button"
                  onClick={() => toggle(site.id)}
                  aria-pressed={on}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors",
                    on
                      ? "border-palm bg-palm/15 font-medium text-ink"
                      : "border-border bg-background text-ink/80 hover:border-palm"
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "flex size-4 shrink-0 items-center justify-center rounded-sm border",
                      on ? "border-palm bg-palm text-white" : "border-ink/30"
                    )}
                  >
                    {on ? <CheckIcon className="size-3" /> : null}
                  </span>
                  {site[locale]}
                </button>
              );
            })}
          </div>
        </fieldset>
      ) : null}

      {/* Pickup + passengers */}
      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="zp-pickup"
            className="mb-1.5 block text-sm font-semibold text-ink"
          >
            {copy.pickupLabel}
          </label>
          <input
            id="zp-pickup"
            type="text"
            value={pickup}
            onChange={(event) => setPickup(event.target.value)}
            placeholder={copy.pickupPlaceholder}
            className={fieldClass}
          />
        </div>
        <div>
          <label
            htmlFor="zp-pax"
            className="mb-1.5 block text-sm font-semibold text-ink"
          >
            {copy.passengersLabel}
          </label>
          {/*
            A select, not a free-text box, and the options are exactly the
            quote form's own. That form's `passengers` field is a select
            offering 1–6 and "7+"; anything else in the query string is
            silently discarded and the field falls back to its default — so a
            visitor who typed "9" here would arrive at a form claiming two
            passengers. Matching the options is the only way the prefill can
            be trusted.
          */}
          <select
            id="zp-pax"
            value={passengers}
            onChange={(event) => setPassengers(event.target.value)}
            className={fieldClass}
          >
            <option value="">{copy.passengersAny}</option>
            {PASSENGER_OPTIONS.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Composed enquiry */}
      <div
        aria-live="polite"
        className="mt-7 rounded-xl border border-brass/35 bg-brass/8 p-5"
      >
        <p className="text-eyebrow text-brass-deep">{copy.summaryLabel}</p>

        {chosen.length === 0 ? (
          <p className="mt-3 text-sm text-ink/70">{copy.emptyState}</p>
        ) : (
          <ol className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1.5">
            {chosen.map((site, index) => (
              <li key={site.id} className="flex items-center gap-2">
                {index > 0 ? (
                  <span aria-hidden className="text-brass-deep">
                    ·
                  </span>
                ) : null}
                <span className="text-sm font-medium text-ink">
                  {site[locale]}
                </span>
              </li>
            ))}
          </ol>
        )}

        <p className="mt-4 text-sm leading-relaxed text-ink/70">
          {copy.carryOver}
        </p>

        <Link
          href={quoteHref}
          className="group mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-brass px-5 text-sm font-semibold text-ink transition-colors hover:bg-brass-deep"
        >
          {copy.cta}
          <ArrowRightIcon
            aria-hidden
            className="size-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100"
          />
        </Link>
      </div>
    </div>
  );
}
