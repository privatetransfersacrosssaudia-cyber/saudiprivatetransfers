import { ChevronDownIcon } from "lucide-react";

import { cn } from "cn";
import type { BorderSection, Claim, Source } from "@/lib/content/border/types";
import type { Locale } from "@/lib/i18n/config";

/**
 * A section of a border guide, rendered as editorial prose.
 *
 * The evidence model behind this page is unchanged — every claim still carries
 * its status, its sources and the date they were checked. What changed is that
 * none of that is shown as a badge. A reader planning a journey wants a travel
 * guide, not a compliance dashboard, and a row of coloured status pills down
 * the page made confident facts and uncertain ones look equally like data
 * rather than equally like writing.
 *
 * So status now decides *where* a claim goes and *how it is worded*:
 *
 * - `verified` claims read as plain statements. Nothing marks them, because
 *   there is nothing to warn about.
 * - `reported` claims are stated with their caveat attached in the same
 *   breath, so the qualification is impossible to read past.
 * - `unverified` claims are lifted out of the prose entirely into one
 *   "before you travel" panel at the end of the section. They are not facts,
 *   so they do not sit among the facts.
 * - `conflicting` claims explain the disagreement in the sentence itself.
 *
 * Sources are collected once per section into a disclosure, instead of a card
 * under every paragraph. Every claim remains traceable; it just stops
 * shouting.
 */

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const copy = {
  confirmHeading: {
    en: "Confirm these before you travel",
    ar: "تأكّد من هذه الأمور قبل السفر",
  },
  confirmLead: {
    en: "We could not confirm the following from publicly accessible official guidance. Check each one directly with the relevant authority before you set off — your own nationality, residency and vehicle all change the answer.",
    ar: "لم نتمكن من تأكيد ما يلي من الإرشادات الرسمية المتاحة للجميع. تحقق من كل بند مباشرة مع الجهة المختصة قبل الانطلاق — فجنسيتك وإقامتك ومركبتك تغيّر الإجابة.",
  },
  sourcesLabel: {
    en: "Sources and further information",
    ar: "المصادر ومعلومات إضافية",
  },
  checked: { en: "checked", ar: "فُحص" },
  published: { en: "published", ar: "نُشر" },
} as const;

/** De-duplicates by URL, keeping official sources first. */
function collectSources(claims: Claim[]): Source[] {
  const byUrl = new Map<string, Source>();
  for (const claim of claims) {
    for (const source of claim.sources) {
      if (!byUrl.has(source.url)) byUrl.set(source.url, source);
    }
  }
  const order = { official: 0, news: 1, secondary: 2 } as const;
  return [...byUrl.values()].sort((a, b) => order[a.kind] - order[b.kind]);
}

/**
 * The sources behind a whole section, folded away.
 *
 * `<details>` rather than a scripted accordion: it keeps the content in the
 * HTML for crawlers and find-in-page, works with no JavaScript, and needs no
 * state. The dates stay — a visa rule without a date is a rumour, and that is
 * as true when the date is one click away as when it is on the surface.
 */
export function SourcesDisclosure({
  sources,
  locale,
  className,
}: {
  sources: Source[];
  locale: Locale;
  className?: string;
}) {
  if (sources.length === 0) return null;

  return (
    <details
      className={cn(
        "group mt-8 rounded-xl border border-border/80 bg-muted/30 [&_summary::-webkit-details-marker]:hidden",
        className
      )}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-medium text-ink/80 transition-colors hover:text-ink">
        {copy.sourcesLabel[locale]}
        <ChevronDownIcon
          aria-hidden
          className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
        />
      </summary>
      <ul className="flex flex-col gap-2.5 border-t border-border/70 px-4 py-3.5 text-sm">
        {sources.map((source) => (
          <li key={source.url}>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-palm underline-offset-4 hover:underline"
            >
              {source.name}
            </a>
            <span className="numeric ms-2 text-xs text-muted-foreground">
              {source.published
                ? `${copy.published[locale]} ${source.published} · `
                : ""}
              {copy.checked[locale]} {source.checked}
            </span>
          </li>
        ))}
      </ul>
    </details>
  );
}

/**
 * One section: prose, then an honest list of what could not be confirmed.
 */
export function GuideSection({
  section,
  locale,
  className,
}: {
  section: BorderSection;
  locale: Locale;
  className?: string;
}) {
  const id = slugify(section.heading.en);

  // Anything that can be stated goes in the prose. Anything that cannot is
  // held back for the panel below, where it is framed as a question rather
  // than an assertion.
  const stated = section.claims.filter((claim) => claim.status !== "unverified");
  const toConfirm = section.claims.filter(
    (claim) => claim.status === "unverified"
  );

  return (
    <section id={id} className={cn("scroll-mt-24", className)}>
      <h2 className="text-h3 text-balance text-ink">
        {section.heading[locale]}
      </h2>

      {section.intro ? (
        <p className="mt-4 text-lg leading-relaxed text-ink/80">
          {section.intro[locale]}
        </p>
      ) : null}

      {stated.length > 0 ? (
        <div className="mt-6 flex flex-col gap-5">
          {stated.map((claim) => (
            <div key={claim.text.en}>
              <p className="leading-relaxed text-ink">{claim.text[locale]}</p>
              {claim.note ? (
                <p
                  className={cn(
                    "mt-2 leading-relaxed",
                    // A reported figure's caveat is part of the claim, so it
                    // reads at full strength rather than as a footnote.
                    claim.status === "reported" || claim.status === "conflicting"
                      ? "text-ink/80"
                      : "text-sm text-muted-foreground"
                  )}
                >
                  {claim.note[locale]}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}

      {toConfirm.length > 0 ? (
        <aside className="mt-8 rounded-2xl border border-brass/35 bg-brass/8 p-5 sm:p-6">
          <h3 className="font-heading text-lg text-ink">
            {copy.confirmHeading[locale]}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink/75">
            {copy.confirmLead[locale]}
          </p>
          <ul className="mt-5 flex flex-col gap-4">
            {toConfirm.map((claim) => (
              <li
                key={claim.text.en}
                className="border-s-2 border-brass/40 ps-4"
              >
                <p className="font-medium text-ink">{claim.text[locale]}</p>
                {claim.note ? (
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/75">
                    {claim.note[locale]}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </aside>
      ) : null}

      <SourcesDisclosure
        sources={collectSources(section.claims)}
        locale={locale}
      />
    </section>
  );
}
