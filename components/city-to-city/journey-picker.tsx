"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRightIcon, MapPinIcon } from "lucide-react";

import { cn } from "cn";
import type { Locale } from "@/lib/i18n/config";
import { href, type RouteKey } from "@/lib/i18n/routes";

/**
 * Pick two cities, get the right next step.
 *
 * The one interactive element on the page, and it earns its place by doing
 * the thing a visitor actually came to do: name their two endpoints. Whatever
 * they choose, the quotation link underneath is prefilled with both — so the
 * form opens already knowing the journey instead of asking for it twice.
 *
 * Where the pair has a published route page, that page is surfaced as well:
 * it carries the distance, the driving time and the road, none of which this
 * page restates. Where it does not, the panel says plainly that the journey
 * has to be checked rather than implying it is already available. That
 * distinction is the whole reason the component exists rather than a static
 * grid — a grid can only show what we already have a page for.
 *
 * Pairs are matched irrespective of direction: a page written Riyadh → Jeddah
 * is the right page for someone travelling Jeddah → Riyadh, and the prefill
 * still carries their actual direction.
 *
 * No dependency, no effect, no state set after mount. Both selects start on a
 * real pair so the panel has something useful in it on first paint.
 */
export type PickerCity = { id: string; en: string; ar: string };

export type PickerPair = {
  /** The two city ids, in any order. */
  cities: [string, string];
  routeKey: RouteKey;
};

export type PickerCopy = {
  fromLabel: string;
  toLabel: string;
  sameCity: string;
  hasPageLabel: string;
  hasPageBody: string;
  noPageLabel: string;
  noPageBody: string;
  quoteCta: string;
  routeCta: string;
};

export function JourneyPicker({
  locale,
  cities,
  pairs,
  copy,
  quotePath,
}: {
  locale: Locale;
  cities: PickerCity[];
  pairs: PickerPair[];
  copy: PickerCopy;
  /** Locale-aware path to the quote form, resolved on the server. */
  quotePath: string;
}) {
  const [from, setFrom] = React.useState("riyadh");
  const [to, setTo] = React.useState("jeddah");

  const name = (id: string) => cities.find((c) => c.id === id)?.[locale] ?? id;

  const match = React.useMemo(() => {
    if (from === to) return null;
    return (
      pairs.find(
        (pair) =>
          (pair.cities[0] === from && pair.cities[1] === to) ||
          (pair.cities[0] === to && pair.cities[1] === from)
      ) ?? null
    );
  }, [from, to, pairs]);

  const quoteHref =
    from === to
      ? quotePath
      : `${quotePath}?pickup=${encodeURIComponent(
          name(from)
        )}&dropoff=${encodeURIComponent(name(to))}`;

  const fieldClass =
    "h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-ink focus:border-palm focus:ring-2 focus:ring-palm/30 focus:outline-none";

  return (
    <div className="rounded-2xl bg-card p-6 ring-1 ring-ink/8 sm:p-7">
      <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
        <div>
          <label
            htmlFor="jp-from"
            className="mb-1.5 block text-sm font-semibold text-ink"
          >
            {copy.fromLabel}
          </label>
          <select
            id="jp-from"
            value={from}
            onChange={(event) => setFrom(event.target.value)}
            className={fieldClass}
          >
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city[locale]}
              </option>
            ))}
          </select>
        </div>

        <ArrowRightIcon
          aria-hidden
          className="mb-3 hidden size-5 shrink-0 text-brass-deep sm:block rtl:-scale-x-100"
        />

        <div>
          <label
            htmlFor="jp-to"
            className="mb-1.5 block text-sm font-semibold text-ink"
          >
            {copy.toLabel}
          </label>
          <select
            id="jp-to"
            value={to}
            onChange={(event) => setTo(event.target.value)}
            className={fieldClass}
          >
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city[locale]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div
        aria-live="polite"
        className={cn(
          "mt-6 rounded-xl border p-5",
          from === to
            ? "border-border bg-sand"
            : match
              ? "border-palm/35 bg-palm/8"
              : "border-brass/35 bg-brass/8"
        )}
      >
        {from === to ? (
          <p className="text-sm text-ink/70">{copy.sameCity}</p>
        ) : (
          <>
            <p className="flex items-center gap-2 text-eyebrow text-brass-deep">
              <MapPinIcon aria-hidden className="size-3.5 shrink-0" />
              {match ? copy.hasPageLabel : copy.noPageLabel}
            </p>

            <p className="mt-2 text-lg font-semibold text-balance text-ink">
              {name(from)} <span className="text-brass-deep">→</span> {name(to)}
            </p>

            <p className="mt-2 leading-relaxed text-ink/75">
              {match ? copy.hasPageBody : copy.noPageBody}
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={quoteHref}
                className="group inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-brass px-5 text-sm font-semibold text-ink transition-colors hover:bg-brass-deep"
              >
                {copy.quoteCta}
                <ArrowRightIcon
                  aria-hidden
                  className="size-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100"
                />
              </Link>

              {match ? (
                <Link
                  href={href(locale, match.routeKey)}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-palm px-5 text-sm font-semibold text-palm-deep transition-colors hover:bg-palm/10"
                >
                  {copy.routeCta}
                </Link>
              ) : null}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
