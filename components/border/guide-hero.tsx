import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, BookOpenIcon } from "lucide-react";

import { cn } from "cn";
import { HeroSentinel } from "@/components/layout/site-header";
import { altText } from "@/lib/images";
import { image, type SiteImageKey } from "@/lib/site-images";
import type { Bilingual, Locale } from "@/lib/i18n/config";

/**
 * The opening of a border guide.
 *
 * Two jobs, in this order: say what the guide covers, and be honest about what
 * this company does and does not do on the route. The service position is in
 * the hero rather than at the foot of the page, because someone looking for a
 * car to Bahrain should learn in the first screen that we stop at the border,
 * not after reading three thousand words.
 *
 * The primary action is still a quote, because this is a commercial site — but
 * it is a quote for the Saudi-side journey, worded so it cannot be mistaken
 * for an offer to cross.
 */

export interface GuideHeroProps {
  locale: Locale;
  eyebrow: Bilingual<string>;
  title: Bilingual<string>;
  standfirst: Bilingual<string>;
  serviceNotice: Bilingual<string>;
  lastVerified: string;
  imageKey: SiteImageKey;
  primaryCta: { label: Bilingual<string>; href: string };
  secondaryCta: { label: Bilingual<string>; href: string };
}

const copy = {
  verified: { en: "Sources last checked", ar: "آخر فحص للمصادر" },
} as const;

export function BorderGuideHero({
  locale,
  eyebrow,
  title,
  standfirst,
  serviceNotice,
  lastVerified,
  imageKey,
  primaryCta,
  secondaryCta,
}: GuideHeroProps) {
  const photo = image(imageKey);

  return (
    <section className="relative isolate -mt-16 overflow-hidden bg-ink md:-mt-18">
      <HeroSentinel />
      <Image
        src={photo.src}
        alt={altText(photo, locale)}
        width={photo.width}
        height={photo.height}
        placeholder="blur"
        blurDataURL={photo.blurDataURL}
        priority
        sizes="100vw"
        className="absolute inset-0 -z-20 size-full object-cover object-center"
      />
      {/* Dimmed far enough for AA contrast on the body text below. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/92 via-ink/85 to-ink/95"
      />

      <div className="site-container pt-32 pb-16 md:pt-34 lg:pt-42 lg:pb-24">
        <div className="max-w-3xl">
          <p className="text-eyebrow text-brass">{eyebrow[locale]}</p>
          <h1 className="text-display mt-4 text-balance text-white">
            {title[locale]}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/85">
            {standfirst[locale]}
          </p>

          <p className="numeric mt-5 text-sm text-white/55">
            {copy.verified[locale]}:{" "}
            <time dateTime={lastVerified}>{lastVerified}</time>
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={primaryCta.href}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-brass px-6 text-sm font-semibold text-ink transition-colors hover:bg-brass-deep"
            >
              {primaryCta.label[locale]}
              <ArrowRightIcon
                aria-hidden
                className="size-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100"
              />
            </Link>
            <a
              href={secondaryCta.href}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/25 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <BookOpenIcon aria-hidden className="size-4" />
              {secondaryCta.label[locale]}
            </a>
          </div>

          {/*
            The service position, inside the hero. Quiet styling on purpose —
            it is a clarification, not a warning, and a red alert box here
            would read as a problem with the page rather than a fact about the
            route.
          */}
          <p className="mt-10 max-w-2xl border-s-2 border-brass/50 ps-4 text-sm leading-relaxed text-white/70">
            {serviceNotice[locale]}
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Section navigation.
 *
 * Plain anchors to ids already on the page, so it costs no JavaScript and
 * works before hydration. On a guide this long, it is the difference between
 * scanning and scrolling.
 */
export function GuideTableOfContents({
  locale,
  heading,
  entries,
  className,
}: {
  locale: Locale;
  heading: Bilingual<string>;
  entries: { id: string; label: Bilingual<string> }[];
  className?: string;
}) {
  return (
    <nav
      aria-label={heading[locale]}
      className={cn(
        "rounded-2xl border border-border bg-card p-5 sm:p-6",
        className
      )}
    >
      <h2 className="text-eyebrow text-brass-deep">{heading[locale]}</h2>
      <ol className="mt-4 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
        {entries.map((entry, index) => (
          <li key={entry.id} className="flex gap-3">
            <span
              aria-hidden
              className="numeric pt-0.5 text-xs font-semibold text-muted-foreground"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <a
              href={`#${entry.id}`}
              className="text-ink underline-offset-4 transition-colors hover:text-palm hover:underline"
            >
              {entry.label[locale]}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * The route at a glance.
 *
 * Deliberately holds only what is known. There is no "journey time" or
 * "crossing fee" row, because neither could be confirmed, and a dash in a
 * summary table reads as an oversight rather than as honesty.
 */
export function RouteOverview({
  locale,
  heading,
  rows,
  footnote,
  className,
}: {
  locale: Locale;
  heading: Bilingual<string>;
  rows: { label: Bilingual<string>; value: Bilingual<string> }[];
  footnote?: Bilingual<string>;
  className?: string;
}) {
  return (
    <div className={cn("rounded-2xl border border-border bg-card", className)}>
      <h2 className="text-eyebrow border-b border-border px-5 py-4 text-brass-deep sm:px-6">
        {heading[locale]}
      </h2>
      <dl className="divide-y divide-border">
        {rows.map((row) => (
          <div
            key={row.label.en}
            className="flex flex-col gap-1 px-5 py-3.5 sm:flex-row sm:items-baseline sm:gap-6 sm:px-6"
          >
            <dt className="shrink-0 text-sm text-muted-foreground sm:w-44">
              {row.label[locale]}
            </dt>
            <dd className="min-w-0 text-ink">{row.value[locale]}</dd>
          </div>
        ))}
      </dl>
      {footnote ? (
        <p className="border-t border-border px-5 py-3.5 text-sm text-muted-foreground sm:px-6">
          {footnote[locale]}
        </p>
      ) : null}
    </div>
  );
}
