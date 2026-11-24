"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRightIcon, CheckIcon } from "lucide-react";

import { cn } from "cn";
import type { Locale } from "@/lib/i18n/config";

/**
 * The Makkah itinerary builder.
 *
 * Deliberately not the generic Ziyarat planner with a city swapped out. That
 * one is a chip-picker across three cities; this one is a **route sheet**:
 * each stop is a full-width row carrying a straight line about what the
 * visit itself asks of you, and ticking it appends to a numbered itinerary
 * underneath. The honest note per stop is the whole reason the page exists,
 * so it has to be on the control the visitor is actually reading, not buried
 * in prose elsewhere.
 *
 * ## The prefill, and what it cannot carry
 *
 * The quote form supports five parameters: `pickup`, `dropoff`, `date`,
 * `time` and `passengers`. There is no free-text parameter, so the travel
 * date, luggage and mobility notes cannot be carried across — the summary
 * says so and tells the visitor to put them in the message box. Inventing a
 * sixth parameter would mean changing the form's schema, which this task
 * forbids and which would break silently if the schema moved.
 *
 * `passengers` is a **select here because it is a select there**, offering
 * exactly 1–6 and "7+". The form discards any other value and falls back to
 * its default, so a free-text box would turn a party of nine into an enquiry
 * for two. That bug was found by testing the live form and is prevented
 * structurally rather than by hoping.
 *
 * Ordering is the tick order, and the summary says plainly that no route is
 * calculated — we do not have routing, so we do not imply it.
 */

/** Exactly the options the quote form's own `passengers` select offers. */
const PASSENGER_OPTIONS = ["1", "2", "3", "4", "5", "6", "7+"] as const;

export type PlannerStop = {
  id: string;
  name: string;
  tag: string;
  effort: string;
};

export type MakkahPlannerCopy = {
  pickupLabel: string;
  pickupPlaceholder: string;
  passengersLabel: string;
  passengersAny: string;
  stopsLabel: string;
  summaryLabel: string;
  emptyState: string;
  orderNote: string;
  carryOver: string;
  cta: string;
};

export function MakkahPlanner({
  stops,
  copy,
  quotePath,
  locale,
}: {
  stops: PlannerStop[];
  copy: MakkahPlannerCopy;
  quotePath: string;
  locale: Locale;
}) {
  const [picked, setPicked] = React.useState<string[]>([]);
  const [pickup, setPickup] = React.useState("");
  const [passengers, setPassengers] = React.useState("");

  // Tick order is kept, because that is the order the summary shows.
  const toggle = (id: string) =>
    setPicked((current) =>
      current.includes(id)
        ? current.filter((x) => x !== id)
        : [...current, id]
    );

  const chosen = picked
    .map((id) => stops.find((s) => s.id === id))
    .filter((s): s is PlannerStop => Boolean(s));

  const params = new URLSearchParams();
  params.set(
    "pickup",
    pickup.trim() || (locale === "ar" ? "فندق في مكة المكرمة" : "Hotel in Makkah")
  );
  if (chosen.length > 0) {
    params.set("dropoff", chosen.map((s) => s.name).join(", "));
  }
  if (passengers) params.set("passengers", passengers);

  const fieldClass =
    "h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-ink focus:border-palm focus:ring-2 focus:ring-palm/30 focus:outline-none";

  return (
    <div className="overflow-hidden rounded-2xl bg-card ring-1 ring-ink/8">
      {/* Stops as a route sheet */}
      <fieldset className="p-6 sm:p-8">
        <legend className="text-sm font-semibold text-ink">
          {copy.stopsLabel}
        </legend>

        <ul className="mt-4 flex flex-col divide-y divide-border">
          {stops.map((stop) => {
            const on = picked.includes(stop.id);
            const order = picked.indexOf(stop.id) + 1;
            return (
              <li key={stop.id}>
                <button
                  type="button"
                  onClick={() => toggle(stop.id)}
                  aria-pressed={on}
                  className={cn(
                    "group flex w-full items-start gap-4 py-4 text-start transition-colors",
                    on && "bg-palm/6"
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "numeric mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md border text-xs font-semibold transition-colors",
                      on
                        ? "border-palm bg-palm text-white"
                        : "border-ink/25 text-transparent group-hover:border-palm"
                    )}
                  >
                    {on ? order : <CheckIcon className="size-3 opacity-0" />}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="font-semibold text-ink">
                        {stop.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {stop.tag}
                      </span>
                    </span>
                    <span className="mt-1.5 block text-sm leading-relaxed text-ink/70">
                      {stop.effort}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </fieldset>

      {/* Pickup + passengers */}
      <div className="grid gap-4 border-t border-border bg-sand/60 p-6 sm:grid-cols-2 sm:p-8">
        <div>
          <label
            htmlFor="mz-pickup"
            className="mb-1.5 block text-sm font-semibold text-ink"
          >
            {copy.pickupLabel}
          </label>
          <input
            id="mz-pickup"
            type="text"
            value={pickup}
            onChange={(event) => setPickup(event.target.value)}
            placeholder={copy.pickupPlaceholder}
            className={fieldClass}
          />
        </div>
        <div>
          <label
            htmlFor="mz-pax"
            className="mb-1.5 block text-sm font-semibold text-ink"
          >
            {copy.passengersLabel}
          </label>
          <select
            id="mz-pax"
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

      {/* Summary */}
      <div
        aria-live="polite"
        className="border-t border-brass/35 bg-brass/8 p-6 sm:p-8"
      >
        <p className="text-eyebrow text-brass-deep">{copy.summaryLabel}</p>

        {chosen.length === 0 ? (
          <p className="mt-3 text-sm text-ink/70">{copy.emptyState}</p>
        ) : (
          <>
            <ol className="mt-3 flex flex-col gap-1.5">
              {chosen.map((stop, index) => (
                <li key={stop.id} className="flex items-baseline gap-2.5">
                  <span
                    aria-hidden
                    className="numeric text-xs font-semibold text-brass-deep"
                  >
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium text-ink">
                    {stop.name}
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-3 text-sm leading-relaxed text-ink/65">
              {copy.orderNote}
            </p>
          </>
        )}

        <p className="mt-4 text-sm leading-relaxed text-ink/70">
          {copy.carryOver}
        </p>

        <Link
          href={`${quotePath}?${params.toString()}`}
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
