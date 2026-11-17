import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  CarFrontIcon,
  CheckIcon,
  InfoIcon,
  UsersIcon,
} from "lucide-react";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ClusterFaqList } from "@/components/cluster/cluster-faq";
import { RelatedLinks } from "@/components/cluster/related-links";
import { HeroSentinel } from "@/components/layout/site-header";
import { jeddahHotel as content } from "@/lib/content/jeddah/hotel";
import { vehicleClasses } from "@/lib/content/vehicles";
import { href } from "@/lib/i18n/routes";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { ui } from "@/lib/i18n/dictionary";
import { altText } from "@/lib/images";
import { image } from "@/lib/site-images";
import { pageMetadata } from "@/lib/seo";
import { clusterPageJsonLd, jsonLdScript, type Crumb } from "@/lib/structured-data";
import { cn } from "cn";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/jeddah-hotel-transfers">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  return pageMetadata({
    locale,
    routeKey: content.routeKey,
    title: content.seo.title[locale],
    description: content.seo.description[locale],
    imageKey: content.imageKey,
  });
}

/** Three levels: hotel transfers are a child of the Jeddah hub. */
const crumbs = (locale: Locale): Crumb[] => [
  { name: ui.home[locale], routeKey: "home" },
  { name: { en: "Jeddah", ar: "جدة" }[locale], routeKey: "jeddah" },
  { name: content.crumbLabel[locale], routeKey: content.routeKey },
];

/**
 * Jeddah hotel transfers.
 *
 * Design concept — "the pause between two journeys". Riyadh's hotel page is
 * the quietest in the project by deliberate decision: one column, no
 * photograph, no stat band, because there the hotel run is a small sub-intent
 * of the airport page. Jeddah's is not the same page in a different city. Here
 * a hotel sits in the middle of a sequence — you arrive from the airport, you
 * move around a city that runs for kilometres, and then you leave for Makkah
 * or Madinah — and that sequence is the layout.
 *
 * So the page is built as **three numbered acts**, alternating ground, each
 * opening on a large act number and its own kicker. Nothing else in the
 * project is structured as a narrative sequence; the corridor page is split by
 * direction, the two airport pages by arrival and departure, and Riyadh's
 * hotel page is a single undifferentiated column.
 *
 * Other things that belong to this page alone:
 *
 * - **A three-beat sequence strip in the hero** — Arrive, Stay, Move on —
 *   rather than the corridor's two-ended route plate or the Madinah hero's
 *   single large figure.
 * - **No stat band.** The page makes no distance or duration claim it could
 *   date-stamp, and that is the point rather than an omission: see below.
 * - **"The table we are not printing"** — the honest block, and this page's
 *   equivalent of the corridor's train comparison. Competitors publish a grid
 *   of district-to-district drive times; the published figures for Jeddah's
 *   own geography contradict each other badly enough that such a grid would be
 *   confidently wrong, so the block names the contradiction and declines.
 *
 * The photograph is the corniche, not the project's generic hotel image —
 * that one is the Abraj Al Bait towers in Makkah and would be the wrong city.
 * No hotel-branded imagery, here or anywhere, and no claim of a standing
 * arrangement at any property.
 */
export default async function JeddahHotelTransfersPage({
  params,
}: PageProps<"/[locale]/jeddah-hotel-transfers">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const photo = image(content.imageKey);

  const quoteHref = `${href(locale, "getQuote")}?pickup=${encodeURIComponent(
    locale === "ar" ? "فندق في جدة" : "Jeddah hotel"
  )}`;

  const vehicles = content.vehicles.slugs
    .map((slug) => vehicleClasses.find((v) => v.slug === slug))
    .filter((v): v is (typeof vehicleClasses)[number] => Boolean(v));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            clusterPageJsonLd({
              locale,
              routeKey: content.routeKey,
              title: content.seo.title[locale],
              description: content.seo.description[locale],
              imageUrl: photo.src,
              crumbs: crumbs(locale),
              serviceName: content.title[locale],
              serviceDescription: content.seo.description[locale],
              faqEntries: content.faqs.map((faq) => ({
                question: faq.question[locale],
                answer: faq.answer[locale],
              })),
            })
          ),
        }}
      />

      {/* ---- Hero: the sequence strip ------------------------------------- */}
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
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/94 via-ink/88 to-ink/96"
        />

        <div className="site-container pt-28 pb-14 md:pt-30 lg:pt-36 lg:pb-18">
          <Breadcrumbs locale={locale} crumbs={crumbs(locale)} tone="invert" />

          <div className="mt-8 max-w-3xl">
            <p className="text-eyebrow text-brass">{content.eyebrow[locale]}</p>
            <h1 className="text-h1 mt-4 text-balance text-white">
              {content.title[locale]}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/85">
              {content.standfirst[locale]}
            </p>
          </div>

          {/*
            Three beats with rules between them. The page's structure, stated
            once at the top so the acts below are read as a sequence rather
            than as three unrelated sections.
          */}
          <ol className="mt-10 flex max-w-2xl items-center gap-3 sm:gap-5">
            {content.sequence.map((beat, index) => (
              <li
                key={beat.label.en}
                className={cn(
                  "flex items-center gap-3 sm:gap-5",
                  index < content.sequence.length - 1 && "flex-1"
                )}
              >
                <span className="flex shrink-0 items-center gap-2.5">
                  <span
                    aria-hidden
                    className="numeric flex size-7 items-center justify-center rounded-full border border-brass/60 text-xs font-semibold text-brass"
                  >
                    {index + 1}
                  </span>
                  <span className="text-sm font-semibold text-white sm:text-base">
                    {beat.label[locale]}
                  </span>
                </span>
                {index < content.sequence.length - 1 ? (
                  <span aria-hidden className="h-px flex-1 bg-white/20" />
                ) : null}
              </li>
            ))}
          </ol>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={quoteHref}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-brass px-6 text-sm font-semibold text-ink transition-colors hover:bg-brass-deep"
            >
              {content.primaryCta[locale]}
              <ArrowRightIcon
                aria-hidden
                className="size-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100"
              />
            </Link>
            <a
              href="#districts"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/25 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {content.secondaryCta[locale]}
            </a>
          </div>
        </div>
      </section>

      {/* ---- The three acts ----------------------------------------------- */}
      {content.acts.map((act, index) => (
        <section
          key={act.number}
          className={cn(
            "section-y border-t border-border",
            index % 2 === 0 && "bg-sand"
          )}
        >
          <div className="site-container">
            <div className="max-w-3xl">
              <div className="flex items-baseline gap-4">
                <span
                  aria-hidden
                  className="numeric text-4xl font-semibold text-brass/35"
                >
                  {act.number}
                </span>
                <p className="text-eyebrow text-brass-deep">
                  {act.kicker[locale]}
                </p>
              </div>
              <h2 className="text-h2 mt-4 text-balance text-ink">
                {act.heading[locale]}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink/80">
                {act.lead[locale]}
              </p>
            </div>

            <dl className="mt-10 grid gap-x-10 gap-y-7 md:grid-cols-3">
              {act.points.map((point) => (
                <div
                  key={point.title.en}
                  className="border-s-2 border-palm/30 ps-5"
                >
                  <dt className="font-semibold text-ink">
                    {point.title[locale]}
                  </dt>
                  <dd className="mt-1.5 leading-relaxed text-ink/75">
                    {point.body[locale]}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      ))}

      {/* ---- Districts, and the table we will not print ------------------- */}
      <section
        id="districts"
        className="section-y scroll-mt-24 border-t border-border"
      >
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-h2 text-balance text-ink">
              {content.districts.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              {content.districts.lead[locale]}
            </p>
          </div>

          <div className="mt-10 max-w-3xl rounded-2xl border border-brass/35 bg-brass/8 p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <InfoIcon aria-hidden className="size-5 shrink-0 text-brass-deep" />
              <h3 className="text-h4 text-balance text-ink">
                {content.districts.honest.heading[locale]}
              </h3>
            </div>
            {content.districts.honest.body.map((paragraph) => (
              <p
                key={paragraph.en}
                className="mt-4 leading-relaxed text-ink/80"
              >
                {paragraph[locale]}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ---- What to send ------------------------------------------------- */}
      <section className="section-y border-t border-border bg-sand">
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-h2 text-balance text-ink">
              {content.sending.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              {content.sending.lead[locale]}
            </p>

            <ul className="mt-8 flex flex-col gap-3">
              {content.sending.items.map((item) => (
                <li key={item.en} className="flex gap-3">
                  <CheckIcon
                    aria-hidden
                    className="mt-1 size-4 shrink-0 text-palm"
                  />
                  <span className="leading-relaxed text-ink/80">
                    {item[locale]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---- Scope -------------------------------------------------------- */}
      <section className="section-y border-t border-border">
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-h3 text-balance text-ink">
              {content.scope.heading[locale]}
            </h2>
            {content.scope.body.map((paragraph) => (
              <p
                key={paragraph.en}
                className="mt-4 leading-relaxed text-ink/80"
              >
                {paragraph[locale]}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Vehicles ----------------------------------------------------- */}
      <section className="section-y border-t border-border bg-sand">
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-h2 text-balance text-ink">
              {content.vehicles.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              {content.vehicles.lead[locale]}
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.slug}
                className="flex flex-col rounded-xl border border-border bg-card p-5"
              >
                <CarFrontIcon aria-hidden className="size-5 text-brass-deep" />
                <h3 className="mt-3 font-semibold text-ink">
                  {vehicle.name[locale]}
                </h3>
                <dl className="mt-3 flex flex-col gap-1 text-sm">
                  <div className="flex items-center gap-2 text-ink/75">
                    <UsersIcon aria-hidden className="size-3.5 shrink-0" />
                    <dd className="numeric">{vehicle.seats[locale]}</dd>
                  </div>
                  <div className="flex items-center gap-2 text-ink/75">
                    <BriefcaseIcon aria-hidden className="size-3.5 shrink-0" />
                    <dd className="numeric">{vehicle.luggage[locale]}</dd>
                  </div>
                </dl>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/70">
                  {vehicle.summary[locale]}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            {content.vehicles.footnote[locale]}
          </p>
        </div>
      </section>

      {/* ---- Booking ------------------------------------------------------ */}
      <section className="section-y border-t border-border">
        <div className="site-container">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-h3 text-balance text-ink">
              {content.booking.heading[locale]}
            </h2>
            <p className="mt-5 leading-relaxed text-ink/80">
              {content.booking.note[locale]}
            </p>
          </div>
        </div>
      </section>

      {/* ---- FAQ ---------------------------------------------------------- */}
      <section className="section-y border-t border-border bg-sand">
        <div className="site-container">
          <ClusterFaqList
            locale={locale}
            heading={locale === "ar" ? "الأسئلة الشائعة" : "Common questions"}
            headingId="faq"
            faqs={[...content.faqs]}
            layout="split"
          />
        </div>
      </section>

      {/* ---- CTA ---------------------------------------------------------- */}
      <section className="section-y border-t border-border bg-ink">
        <div className="site-container">
          <div className="max-w-3xl">
            <p className="text-eyebrow text-brass">
              {content.cta.eyebrow[locale]}
            </p>
            <h2 className="text-h2 mt-4 text-balance text-white">
              {content.cta.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/80">
              {content.cta.body[locale]}
            </p>
            <Link
              href={quoteHref}
              className="group mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-brass px-6 text-sm font-semibold text-ink transition-colors hover:bg-brass-deep"
            >
              {content.cta.button[locale]}
              <ArrowRightIcon
                aria-hidden
                className="size-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* ---- Related ------------------------------------------------------ */}
      <section className="section-y border-t border-border">
        <div className="site-container">
          <RelatedLinks
            locale={locale}
            heading={content.relatedHeading[locale]}
            links={[...content.related]}
          />
        </div>
      </section>
    </>
  );
}
