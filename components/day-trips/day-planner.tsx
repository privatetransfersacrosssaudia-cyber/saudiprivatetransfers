"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRightIcon, MapPinIcon } from "lucide-react";

import { cn } from "cn";

/**
 * The day-trip planner.
 *
 * ## Why it is built this way
 *
 * The three Ziyarat planners each answer "which places?" — a flat chip
 * picker, a route sheet annotated by effort, a compass grid. This one
 * answers a different question, because a day trip is a **loop**: the drive
 * out and the drive back are spent from the same day as the time at the
 * destination. So the places are stratified by **reach** from the starting
 * city, and the summary reads the *furthest band touched* rather than
 * counting anything.
 *
 * That gives an honest reading with no invented figures. We publish no
 * journey times and cannot know how long a party lingers anywhere, so a
 * duration would be a fiction. "The furthest thing on your list decides the
 * shape of the day" is simply true, and it is the single most useful thing
 * to tell someone before they send a list that is one place too long.
 *
 * The second signal is **spread**: picking across more than one band is the
 * usual reason a day over-runs, so it earns its own line rather than being
 * left for the customer to discover on the road.
 *
 * ## Prefill
 *
 * Only `pickup`, `dropoff` and `passengers` — the quote form's own fields.
 * There is no free-text parameter, so the date, the hours wanted, luggage,
 * accessibility needs and where the day should end cannot cross; the summary
 * says so plainly and points at the message box.
 *
 * `passengers` is a select carrying exactly the form's options (1–6, "7+").
 * Anything else is silently discarded by the form and falls back to its
 * default, which would turn a party of nine into an enquiry for two. That
 * was found by testing the live form; it is prevented structurally here.
 */

/** Exactly the options the quote form's own `passengers` select offers. */
const PASSENGER_OPTIONS = ["1", "2", "3", "4", "5", "6", "7+"] as const;

const BAND_ORDER = ["near", "out", "far"] as const;
export type Band = (typeof BAND_ORDER)[number];

export type PlannerStop = { id: string; name: string; note: string; band: Band };

export type PlannerCity = {
  id: string;
  name: string;
  pickupSeed: string;
  blurb: string;
  stops: PlannerStop[];
};

export type DayPlannerCopy = {
  cityLabel: string;
  pickupLabel: string;
  pickupPlaceholder: string;
  passengersLabel: string;
  passengersAny: string;
  bandLabels: Record<Band, string>;
  summaryLabel: string;
  emptyState: string;
  shapes: Record<Band, string>;
  spread: string;
  carryOver: string;
  cta: string;
};

export function DayPlanner({
  cities,
  copy,
  quotePath,
}: {
  cities: PlannerCity[];
  copy: DayPlannerCopy;
  quotePath: string;
}) {
  const [cityId, setCityId] = React.useState(cities[0].id);
  const [picked, setPicked] = React.useState<string[]>([]);
  const [pickup, setPickup] = React.useState("");
  const [passengers, setPassengers] = React.useState("");

  const city = cities.find((c) => c.id === cityId) ?? cities[0];

  // Changing city starts a new day; keeping ticks from another city would
  // silently build an itinerary spanning two ends of the country.
  const chooseCity = (id: string) => {
    setCityId(id);
    setPicked([]);
  };

  const toggle = (id: string) =>
    setPicked((current) =>
      current.includes(id) ? current.filter((x) => x !== id) : [...current, id]
    );

  const chosen = picked
    .map((id) => city.stops.find((s) => s.id === id))
    .filter((s): s is PlannerStop => Boolean(s));

  // The furthest band reached is what decides the shape of the day.
  const reached = BAND_ORDER.filter((b) => chosen.some((s) => s.band === b));
  const furthest = reached.length ? reached[reached.length - 1] : null;
  const spread = reached.length > 1;

  const params = new URLSearchParams();
  params.set("pickup", pickup.trim() || city.pickupSeed);
  if (chosen.length > 0) {
    params.set("dropoff", chosen.map((s) => s.name).join(", "));
  }
  if (passengers) params.set("passengers", passengers);

  const fieldClass =
    "h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-ink focus:border-palm focus:ring-2 focus:ring-palm/30 focus:outline-none";

  return (
    <div className="overflow-hidden rounded-2xl bg-card ring-1 ring-ink/8">
      {/* Starting city */}
      <div className="border-b border-border p-6 sm:p-8">
        <p className="text-eyebrow text-brass-deep">{copy.cityLabel}</p>
        <div className="mt-3 flex flex-wrap gap-2.5">
          {cities.map((c) => {
            const on = c.id === city.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => chooseCity(c.id)}
                aria-pressed={on}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                  on
                    ? "border-palm bg-palm text-white"
                    : "border-border bg-background text-ink hover:border-palm/60"
                )}
              >
                {c.name}
              </button>
            );
          })}
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink/70">
          {city.blurb}
        </p>
      </div>

      {/* Destinations, stratified by reach */}
      <div>
        {BAND_ORDER.map((band) => {
          const stops = city.stops.filter((s) => s.band === band);
          if (stops.length === 0) return null;
          return (
            <fieldset key={band} className="border-b border-border p-6 sm:p-8">
              <legend className="sr-only">{copy.bandLabels[band]}</legend>

              <div className="flex items-center gap-3">
                {/* A three-step ramp: one rung filled at "near", three at "far". */}
                <span aria-hidden className="flex items-end gap-0.5">
                  {BAND_ORDER.map((b, i) => (
                    <span
                      key={b}
                      className={cn(
                        "w-1 rounded-full transition-colors",
                        i <= BAND_ORDER.indexOf(band)
                          ? "bg-brass"
                          : "bg-ink/15"
                      )}
                      style={{ height: `${6 + i * 4}px` }}
                    />
                  ))}
                </span>
                <p className="text-eyebrow text-brass-deep">
                  {copy.bandLabels[band]}
                </p>
              </div>

              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {stops.map((stop) => {
                  const on = picked.includes(stop.id);
                  return (
                    <li key={stop.id}>
                      <button
                        type="button"
                        onClick={() => toggle(stop.id)}
                        aria-pressed={on}
                        className={cn(
                          "h-full w-full rounded-xl border p-3.5 text-start transition-colors",
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
          );
        })}
      </div>

      {/* Pickup + passengers */}
      <div className="grid gap-4 border-b border-border bg-sand/60 p-6 sm:grid-cols-2 sm:p-8">
        <div>
          <label
            htmlFor="dt-pickup"
            className="mb-1.5 block text-sm font-semibold text-ink"
          >
            {copy.pickupLabel}
          </label>
          <input
            id="dt-pickup"
            type="text"
            value={pickup}
            onChange={(event) => setPickup(event.target.value)}
            placeholder={copy.pickupPlaceholder}
            className={fieldClass}
          />
        </div>
        <div>
          <label
            htmlFor="dt-pax"
            className="mb-1.5 block text-sm font-semibold text-ink"
          >
            {copy.passengersLabel}
          </label>
          <select
            id="dt-pax"
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
      <div aria-live="polite" className="bg-brass/8 p-6 sm:p-8">
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
            {furthest ? (
              <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed font-semibold text-ink">
                <MapPinIcon aria-hidden className="mt-0.5 size-4 shrink-0" />
                {copy.shapes[furthest]}
              </p>
            ) : null}
            {spread ? (
              <p className="mt-2.5 text-sm leading-relaxed text-ink/75">
                {copy.spread}
              </p>
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
