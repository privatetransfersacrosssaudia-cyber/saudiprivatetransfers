"use client";

import * as React from "react";
import { ArrowRightIcon, ClockIcon } from "lucide-react";

import { cn } from "cn";
import type { Locale } from "@/lib/i18n/config";
import {
  TZ_CITIES,
  dayNumber,
  formatIn,
  instantFromWallClock,
  offsetLabel,
} from "@/lib/timezone";

/**
 * A local-time converter for travellers arranging a Saudi airport transfer.
 *
 * **Why it exists.** Someone in Sydney knows their flight leaves at 21:40
 * their time and lands "the next afternoon"; what the enquiry form needs is
 * a Saudi date and time. That conversion is where people slip, and a wrong
 * date on an airport pickup is the most expensive mistake on this site.
 *
 * **What it is not.** It converts a clock time between two places. It knows
 * no flight's schedule and makes no claim about when an aircraft actually
 * lands — the page says exactly that beside it.
 *
 * All the arithmetic lives in `lib/timezone.ts`, which is pure and tested
 * directly against daylight-saving and date-boundary cases. This file is
 * only the interface.
 */
export type ConverterCopy = {
  fromLabel: string;
  toLabel: string;
  dateLabel: string;
  timeLabel: string;
  resultLabel: string;
  emptyState: string;
  sameDay: string;
  nextDay: string;
  previousDay: string;
};

export function TimezoneConverter({
  locale,
  copy,
}: {
  locale: Locale;
  copy: ConverterCopy;
}) {
  const [from, setFrom] = React.useState("Australia/Sydney");
  const [to, setTo] = React.useState("Asia/Riyadh");
  // The date starts empty on purpose. Defaulting it to "today" would have
  // meant setting state after mount — today differs between the build
  // machine and the reader, so it cannot be rendered on the server — and a
  // prefilled today is the wrong answer anyway: nobody converting a flight
  // time is asking about this afternoon. The time carries a static default
  // because a constant is safe to render on both sides.
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("14:00");

  const result = React.useMemo(() => {
    if (!date || !time) return null;
    const [y, mo, d] = date.split("-").map(Number);
    const [h, mi] = time.split(":").map(Number);
    if ([y, mo, d, h, mi].some((n) => !Number.isFinite(n))) return null;

    const instant = instantFromWallClock(y, mo, d, h, mi, from);
    return {
      source: formatIn(instant, from, locale),
      target: formatIn(instant, to, locale),
      sourceOffset: offsetLabel(instant, from),
      targetOffset: offsetLabel(instant, to),
      shift: dayNumber(instant, to) - dayNumber(instant, from),
    };
  }, [date, time, from, to, locale]);

  const cityName = (zone: string) =>
    TZ_CITIES.find((city) => city.zone === zone)?.[locale] ?? zone;

  const shiftNote =
    result === null
      ? null
      : result.shift > 0
        ? copy.nextDay
        : result.shift < 0
          ? copy.previousDay
          : copy.sameDay;

  const fieldClass =
    "h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-ink focus:border-palm focus:ring-2 focus:ring-palm/30 focus:outline-none";

  return (
    <div className="rounded-2xl bg-card p-6 ring-1 ring-ink/8 sm:p-7">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="tz-from"
            className="mb-1.5 block text-sm font-semibold text-ink"
          >
            {copy.fromLabel}
          </label>
          <select
            id="tz-from"
            value={from}
            onChange={(event) => setFrom(event.target.value)}
            className={fieldClass}
          >
            {TZ_CITIES.map((city) => (
              <option key={city.zone} value={city.zone}>
                {city[locale]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="tz-to"
            className="mb-1.5 block text-sm font-semibold text-ink"
          >
            {copy.toLabel}
          </label>
          <select
            id="tz-to"
            value={to}
            onChange={(event) => setTo(event.target.value)}
            className={fieldClass}
          >
            {TZ_CITIES.map((city) => (
              <option key={city.zone} value={city.zone}>
                {city[locale]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="tz-date"
            className="mb-1.5 block text-sm font-semibold text-ink"
          >
            {copy.dateLabel}
          </label>
          <input
            id="tz-date"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            dir="ltr"
            className={fieldClass}
          />
        </div>

        <div>
          <label
            htmlFor="tz-time"
            className="mb-1.5 block text-sm font-semibold text-ink"
          >
            {copy.timeLabel}
          </label>
          <input
            id="tz-time"
            type="time"
            value={time}
            onChange={(event) => setTime(event.target.value)}
            dir="ltr"
            className={fieldClass}
          />
        </div>
      </div>

      {/* A live region, so a screen reader hears the answer change rather
          than it silently re-rendering beneath the form. */}
      <div
        aria-live="polite"
        className="mt-6 rounded-xl border border-brass/35 bg-brass/8 p-5"
      >
        <p className="text-eyebrow text-brass-deep">{copy.resultLabel}</p>

        {result === null ? (
          <p className="mt-3 text-sm text-ink/70">{copy.emptyState}</p>
        ) : (
          <>
            <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
              <div>
                <p className="text-sm font-semibold text-ink">{cityName(from)}</p>
                <p className="numeric mt-1 text-2xl font-semibold text-ink">
                  {result.source.time}
                </p>
                <p className="mt-1 text-sm text-ink/70">{result.source.date}</p>
                <p className="numeric mt-0.5 text-xs text-ink/50">
                  {result.sourceOffset}
                </p>
              </div>

              <ArrowRightIcon
                aria-hidden
                className="hidden size-5 shrink-0 text-brass-deep sm:block rtl:-scale-x-100"
              />

              <div>
                <p className="text-sm font-semibold text-ink">{cityName(to)}</p>
                <p className="numeric mt-1 text-2xl font-semibold text-brass-deep">
                  {result.target.time}
                </p>
                <p className="mt-1 text-sm text-ink/70">{result.target.date}</p>
                <p className="numeric mt-0.5 text-xs text-ink/50">
                  {result.targetOffset}
                </p>
              </div>
            </div>

            {shiftNote ? (
              <p
                className={cn(
                  "mt-4 flex items-center gap-2 text-sm",
                  result.shift === 0 ? "text-ink/60" : "font-semibold text-ink"
                )}
              >
                <ClockIcon aria-hidden className="size-4 shrink-0" />
                {shiftNote}
              </p>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
