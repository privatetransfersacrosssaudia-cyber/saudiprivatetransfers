/**
 * Wall-clock conversion between IANA time zones.
 *
 * Pure, dependency-free and deliberately separate from the component that
 * renders it, so the arithmetic can be exercised directly — daylight saving
 * and date boundaries are exactly the cases a UI test would not reach.
 *
 * No date library was added for this. The project ships none, and
 * `Intl.DateTimeFormat` already carries the IANA time-zone database in every
 * runtime that serves this site, which means daylight saving is resolved by
 * the platform's own tz data. Nothing here hardcodes a UTC offset for any
 * city: offsets are derived per instant, so a zone that observes DST gives a
 * different answer in January than in July with no special casing.
 */

/** A city offered in the converter. IANA zone only — never a fixed offset. */
export type TzCity = { zone: string; en: string; ar: string };

export const TZ_CITIES: TzCity[] = [
  { zone: "Asia/Riyadh", en: "Saudi Arabia (Riyadh)", ar: "السعودية (الرياض)" },
  { zone: "Europe/London", en: "London", ar: "لندن" },
  { zone: "Europe/Paris", en: "Paris", ar: "باريس" },
  { zone: "Europe/Istanbul", en: "Istanbul", ar: "إسطنبول" },
  { zone: "Africa/Cairo", en: "Cairo", ar: "القاهرة" },
  { zone: "Africa/Casablanca", en: "Casablanca", ar: "الدار البيضاء" },
  { zone: "Africa/Lagos", en: "Lagos", ar: "لاغوس" },
  { zone: "Asia/Dubai", en: "Dubai", ar: "دبي" },
  { zone: "Asia/Karachi", en: "Karachi", ar: "كراتشي" },
  { zone: "Asia/Kolkata", en: "Delhi / Mumbai", ar: "دلهي / مومباي" },
  { zone: "Asia/Dhaka", en: "Dhaka", ar: "دكا" },
  { zone: "Asia/Jakarta", en: "Jakarta", ar: "جاكرتا" },
  { zone: "Asia/Kuala_Lumpur", en: "Kuala Lumpur", ar: "كوالالمبور" },
  { zone: "Asia/Manila", en: "Manila", ar: "مانيلا" },
  { zone: "Australia/Perth", en: "Perth", ar: "بيرث" },
  { zone: "Australia/Sydney", en: "Sydney", ar: "سيدني" },
  { zone: "Australia/Melbourne", en: "Melbourne", ar: "ملبورن" },
  { zone: "America/New_York", en: "New York", ar: "نيويورك" },
  { zone: "America/Toronto", en: "Toronto", ar: "تورونتو" },
];

/** The offset a zone was at on a given instant, in milliseconds. */
export function offsetMs(instant: number, timeZone: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(new Date(instant));

  const v: Record<string, string> = {};
  for (const part of parts) if (part.type !== "literal") v[part.type] = part.value;

  // Some runtimes report midnight as hour 24.
  const asUtc = Date.UTC(
    Number(v.year),
    Number(v.month) - 1,
    Number(v.day),
    Number(v.hour) % 24,
    Number(v.minute),
    Number(v.second)
  );
  return asUtc - instant;
}

/**
 * A wall-clock time in a named zone → the absolute instant it refers to.
 *
 * There is no native API for this direction, so it iterates: guess the
 * instant, ask the platform what offset the zone had at that guess, correct,
 * repeat. Three passes converge everywhere, including across a DST boundary
 * where the first guess can land on the wrong side of the transition. A time
 * inside a spring-forward gap does not exist; the result settles on the
 * instant the clock jumps to, which is the sane answer for a travel form.
 */
export function instantFromWallClock(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  timeZone: string
): number {
  const naive = Date.UTC(year, month - 1, day, hour, minute);
  let instant = naive;
  for (let pass = 0; pass < 3; pass += 1) {
    instant = naive - offsetMs(instant, timeZone);
  }
  return instant;
}

/** The calendar day in a zone as a sortable number, for the day-shift note. */
export function dayNumber(instant: number, timeZone: string): number {
  const ymd = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(instant));
  return Number(ymd.replaceAll("-", ""));
}

/** `UTC+3`, `UTC−5`, `UTC+5:30`. */
export function offsetLabel(instant: number, timeZone: string): string {
  const minutes = Math.round(offsetMs(instant, timeZone) / 60000);
  const sign = minutes < 0 ? "−" : "+";
  const abs = Math.abs(minutes);
  const hours = Math.floor(abs / 60);
  const rest = abs % 60;
  return `UTC${sign}${hours}${rest ? `:${String(rest).padStart(2, "0")}` : ""}`;
}

/**
 * Date and time as they read in a zone.
 *
 * Arabic forces `ca-gregory`: left alone, `ar-SA` formats in the Islamic
 * calendar, which would be wrong here because airline schedules and the
 * enquiry form are both Gregorian.
 */
export function formatIn(
  instant: number,
  timeZone: string,
  locale: "en" | "ar"
): { date: string; time: string } {
  const tag = locale === "ar" ? "ar-u-ca-gregory" : "en-GB";
  const when = new Date(instant);
  return {
    date: new Intl.DateTimeFormat(tag, {
      timeZone,
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(when),
    time: new Intl.DateTimeFormat(tag, {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(when),
  };
}
