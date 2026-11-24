"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRightIcon, CompassIcon } from "lucide-react";

import { cn } from "cn";
import type { Locale } from "@/lib/i18n/config";

/**
 * The Madinah itinerary builder, grouped by compass heading.
 *
 * Neither of the other two Ziyarat planners. The national one is a flat chip
 * picker across three cities; the Makkah one is a route sheet annotated with
 * how hard each visit is, because two of Makkah's sites end in a climb.
 * Madinah's are mostly level and mostly drive-up, so effort is the wrong
 * axis. What varies here is **direction** — Quba south, Uhud north,
 * Qiblatain and the Seven Mosques west — and that is what decides the shape
 * of the day.
 *
 * So the control groups by heading, and the summary **counts directions
 * rather than hours**. That is the honest proxy: we cannot know how long a
 * party will linger at each place, so we describe the journey by how far it
 * reaches across the city instead of printing a duration we would be
 * guessing at.
 *
 * ## Prefill
 *
 * Only the form's own parameters: `pickup`, `dropoff`, `passengers`. There
 * is no free-text parameter, so date, luggage, mobility needs and the return
 * pickup cannot cross — the summary says so and points at the message box.
 *
 * `passengers` is a select carrying exactly the form's options (1–6, "7+").
 * The form silently discards anything else and falls back to its default, so
 * a free-text box would turn a party of nine into an enquiry for two. That
 * was found by testing the live form; it is prevented structurally here.
 */

/** Exactly the options the quote form's own `passengers` select offers. */
const PASSENGER_OPTIONS = ["1", "2", "3", "4", "5", "6", "7+"] as const;

export type PlannerDirection = {
  id: string;
  heading: string;
  bearing: string;
  stops: { id: string; name: string; note: string }[];
};

export type MadinahPlannerCopy = {
  pickupLabel: string;
  pickupPlaceholder: string;
  passengersLabel: string;
  passengersAny: string;
  summaryLabel: string;
  emptyState: string;
  oneDirection: string;
  twoDirections: string;
  threeDirections: string;
  carryOver: string;
  cta: string;
};

export function MadinahPlanner({
  directions,
  copy,
  quotePath,
  locale,
}: {
  directions: PlannerDirection[];
  copy: MadinahPlannerCopy;
  quotePath: string;
  locale: Locale;
}) {
  const [picked, setPicked] = React.useState<string[]>([]);
  const [pickup, setPickup] = React.useState("");
  const [passengers, setPassengers] = React.useState("");

  const toggle = (id: string) =>
    setPicked((current) =>
      current.includes(id)
        ? current.filter((x) => x !== id)
        : [...current, id]
    );

  const allStops = directions.flatMap((d) =>
    d.stops.map((s) => ({ ...s, directionId: d.id, heading: d.heading }))
  );
  const chosen = picked
    .map((id) => allStops.find((s) => s.id === id))
    .filter((s): s is (typeof allStops)[number] => Boolean(s));

  const reached = new Set(chosen.map((s) => s.directionId)).size;
  const reachNote =
    reached === 1
      ? copy.oneDirection
      : reached === 2
        ? copy.twoDirections
        : reached >= 3
          ? copy.threeDirections
          : null;

  const params = new URLSearchParams();
  params.set(
    "pickup",
    pickup.trim() ||
      (locale === "ar" ? "فندق في المدينة المنورة" : "Hotel in Madinah")
  );
  if (chosen.length > 0) {
    params.set("dropoff", chosen.map((s) => s.name).join(", "));
  }
  if (passengers) params.set("passengers", passengers);

  const fieldClass =
    "h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-ink focus:border-palm focus:ring-2 focus:ring-palm/30 focus:outline-none";

  return (
    <div className="overflow-hidden rounded-2xl bg-card ring-1 ring-ink/8">
      <div className="grid gap-px bg-border md:grid-cols-3">
        {directions.map((direction) => (
          <fieldset key={direction.id} className="bg-card p-6">
            <legend className="sr-only">{direction.heading}</legend>

            <p className="flex items-center gap-2 text-eyebrow text-brass-deep">
              <CompassIcon aria-hidden className="size-3.5 shrink-0" />
              {direction.heading}
            </p>
            <p className="numeric mt-1.5 text-xs leading-relaxed text-muted-foreground">
              {direction.bearing}
            </p>

            <ul className="mt-4 flex flex-col gap-2.5">
              {direction.stops.map((stop) => {
                const on = picked.includes(stop.id);
                return (
                  <li key={stop.id}>
                    <button
                      type="button"
                      onClick={() => toggle(stop.id)}
                      aria-pressed={on}
                      className={cn(
                        "w-full rounded-xl border p-3.5 text-start transition-colors",
                        on
                          ? "border-palm bg-palm/10"
                          : "border-border bg-background hover:border-palm/60"
                      )}
                    >
                      <span className="flex items-start gap-2.5">
                        <span
                          aria-hidden
                          className={cn(
                            "mt-0.5 size-4 shrink-0 rounded-sm border transition-colors",
                            on ? "border-palm bg-palm" : "border-ink/30"
                          )}
                        />
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold text-ink">
                            {stop.name}
                          </span>
                          <span className="mt-1 block text-xs leading-relaxed text-ink/70">
                            {stop.note}
                          </span>
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </fieldset>
        ))}
      </div>

      {/* Pickup + passengers */}
      <div className="grid gap-4 border-t border-border bg-sand/60 p-6 sm:grid-cols-2 sm:p-8">
        <div>
          <label
            htmlFor="mdz-pickup"
            className="mb-1.5 block text-sm font-semibold text-ink"
          >
            {copy.pickupLabel}
          </label>
          <input
            id="mdz-pickup"
            type="text"
            value={pickup}
            onChange={(event) => setPickup(event.target.value)}
            placeholder={copy.pickupPlaceholder}
            className={fieldClass}
          />
        </div>
        <div>
          <label
            htmlFor="mdz-pax"
            className="mb-1.5 block text-sm font-semibold text-ink"
          >
            {copy.passengersLabel}
          </label>
          <select
            id="mdz-pax"
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
            <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-1.5">
              {chosen.map((stop, index) => (
                <li key={stop.id} className="flex items-center gap-2">
                  {index > 0 ? (
                    <span aria-hidden className="text-brass-deep">
                      ·
                    </span>
                  ) : null}
                  <span className="text-sm font-medium text-ink">
                    {stop.name}
                  </span>
                </li>
              ))}
            </ul>
            {reachNote ? (
              <p className="mt-3 text-sm font-semibold text-ink">{reachNote}</p>
            ) : null}
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
