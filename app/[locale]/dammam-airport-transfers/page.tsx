import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  CarFrontIcon,
  CheckIcon,
  PlaneLandingIcon,
  PlaneTakeoffIcon,
  UsersIcon,
} from "lucide-react";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ClusterFaqList } from "@/components/cluster/cluster-faq";
import { RelatedLinks } from "@/components/cluster/related-links";
import { HeroSentinel } from "@/components/layout/site-header";
import { dammamAirport as content } from "@/lib/content/eastern-province/airport";
import { vehicleClasses } from "@/lib/content/vehicles";
import { href } from "@/lib/i18n/routes";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { ui } from "@/lib/i18n/dictionary";
import { altText } from "@/lib/images";
import { image } from "@/lib/site-images";
import { pageMetadata } from "@/lib/seo";
import { clusterPageJsonLd, jsonLdScript, type Crumb } from "@/lib/structured-data";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/dammam-airport-transfers">): Promise<Metadata> {
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

/** Three levels: the airport is a child of the Dammam hub. */
const crumbs = (locale: Locale): Crumb[] => [
  { name: ui.home[locale], routeKey: "home" },
  {
    name: { en: "Dammam", ar: "الدمام" }[locale],
    routeKey: "dammam",
  },
  { name: content.crumbLabel[locale], routeKey: content.routeKey },
];

/** The ladder's longest rung, used to scale the others. */
const MAX_KM = Math.max(...content.cities.list.map((city) => city.km));

/**
 * Dammam — King Fahd International.
 *
 * Design concept — "two numbers, and only one of them is yours". This airport
 * is famous for a statistic that is useless to a passenger: it is the largest
 * in the world by land area, about 780 km², most of it undeveloped. The number
 * that actually governs your day is how far it sits from the city you are
 * going to — and uniquely among the airports on this site, that answer differs
 * sharply by destination: roughly 36 km to Dammam, 47 to Dhahran, 58 to Al
 * Khobar.
 *
 * So the hero is a **two-number opposition**: the famous figure and the useful
 * one, set side by side with a rule between them, the second given the warmer
 * accent. And the page's central object is a **distance ladder** — three rungs
 * whose bar lengths are proportional to the real kilometres, so the spread
 * between the three cities is visible rather than merely listed.
 *
 * Deliberately not reused from the other four pages in this batch: no route
 * plate, no direction plates, no milepost strip, no verdict chips (Makkah ↔
 * Madinah); no approach plate, no two-answer block, no input ledger (Madinah
 * airport); no narrative acts or sequence strip (Jeddah hotels); no segmented
 * handover bars (Jeddah → Madinah). The ladder measures one quantity across
 * three destinations, which none of those objects does.
 *
 * The ladder bars are decorative — every distance they encode is printed
 * beside them as text, so nothing is lost when they collapse on a narrow
 * screen. They scale with `flex-basis` percentages against `MAX_KM`, so the
 * ladder reverses correctly in Arabic with no second geometry.
 *
 * The page carries one boundary statement the other airport pages do not need:
 * people fly in here to cross the King Fahd Causeway, and our service stops at
 * the Saudi side. That is stated in its own block, with a link to the border
 * guide, rather than left for a customer to find out at the border.
 */
export default async function DammamAirportTransfersPage({
  params,
}: PageProps<"/[locale]/dammam-airport-transfers">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const photo = image(content.imageKey);

  const quoteHref = `${href(locale, "getQuote")}?pickup=${encodeURIComponent(
    locale === "ar" ? "مطار الملك فهد الدولي" : "King Fahd International Airport"
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

      {/* ---- Hero: the two numbers ---------------------------------------- */}
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
            The opposition. The famous figure is deliberately the dimmer of the
            two: it is the one the reader already knows and the one that will
            not help them.
          */}
          <div className="mt-10 grid max-w-3xl gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/10 sm:grid-cols-2">
            <div className="bg-ink/80 p-6">
              <p className="numeric text-3xl font-semibold text-white/55">
                {content.contrast.famous.value[locale]}
              </p>
              <p className="mt-2 text-sm font-semibold text-white/70">
                {content.contrast.famous.label[locale]}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-white/50">
                {content.contrast.famous.note[locale]}
              </p>
            </div>
            <div className="bg-ink/80 p-6">
              <p className="numeric text-3xl font-semibold text-brass">
                {content.contrast.useful.value[locale]}
              </p>
              <p className="mt-2 text-sm font-semibold text-white">
                {content.contrast.useful.label[locale]}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-white/70">
                {content.contrast.useful.note[locale]}
              </p>
            </div>
          </div>

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
              href="#cities"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/25 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {content.secondaryCta[locale]}
            </a>
          </div>
        </div>
      </section>

      {/* ---- Stats -------------------------------------------------------- */}
      <section className="border-b border-border bg-sand">
        <div className="site-container">
          <dl className="grid grid-cols-2 divide-border md:grid-cols-4 md:divide-x">
            {content.stats.map((stat) => (
              <div key={stat.label.en} className="px-1 py-6 md:px-6">
                <dt className="text-eyebrow text-brass-deep">
                  {stat.label[locale]}
                </dt>
                <dd className="numeric mt-2 text-xl font-semibold text-ink">
                  {stat.value[locale]}
                </dd>
                {stat.note ? (
                  <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {stat.note[locale]}
                  </dd>
                ) : null}
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---- The distance ladder ------------------------------------------ */}
      <section id="cities" className="section-y scroll-mt-24">
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-h2 text-balance text-ink">
              {content.cities.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              {content.cities.lead[locale]}
            </p>
          </div>

          <ol className="mt-10 flex flex-col gap-6">
            {content.cities.list.map((city) => (
              <li
                key={city.name.en}
                className="rounded-2xl border border-border bg-card p-6 sm:p-7"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="text-h4 text-ink">{city.name[locale]}</h3>
                  <p className="numeric text-lg font-semibold text-brass-deep">
                    {city.distance[locale]}
                  </p>
                </div>

                {/*
                  The rung. Decorative — the figure beside it is the real
                  statement; this only makes the spread between the three
                  visible at a glance.
                */}
                <div
                  aria-hidden
                  className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-secondary"
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-palm to-brass"
                    style={{ width: `${(city.km / MAX_KM) * 100}%` }}
                  />
                </div>

                <p className="mt-4 leading-relaxed text-ink/75">
                  {city.note[locale]}
                </p>
              </li>
            ))}
          </ol>

          <p className="mt-8 max-w-3xl rounded-xl border border-border bg-card p-5 text-sm leading-relaxed text-ink/75">
            {content.cities.footnote[locale]}
          </p>
        </div>
      </section>

      {/* ---- Arrivals ----------------------------------------------------- */}
      <section className="section-y border-t border-border bg-sand">
        <div className="site-container">
          <div className="max-w-3xl">
            <span
              aria-hidden
              className="flex size-10 items-center justify-center rounded-full border border-palm/35 text-palm"
            >
              <PlaneLandingIcon className="size-5" />
            </span>
            <h2 className="text-h2 mt-5 text-balance text-ink">
              {content.arrivals.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              {content.arrivals.lead[locale]}
            </p>
          </div>

          <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {content.arrivals.steps.map((step, index) => (
              <li key={step.title.en}>
                <span
                  aria-hidden
                  className="numeric flex size-8 items-center justify-center rounded-full border border-palm/35 text-xs font-semibold text-palm"
                >
                  {index + 1}
                </span>
                <h3 className="mt-3 font-semibold text-ink">
                  {step.title[locale]}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/75">
                  {step.body[locale]}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---- Departures --------------------------------------------------- */}
      <section className="section-y border-t border-border">
        <div className="site-container">
          <div className="max-w-3xl">
            <span
              aria-hidden
              className="flex size-10 items-center justify-center rounded-full border border-brass/40 text-brass-deep"
            >
              <PlaneTakeoffIcon className="size-5" />
            </span>
            <h2 className="text-h2 mt-5 text-balance text-ink">
              {content.departures.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              {content.departures.lead[locale]}
            </p>
          </div>

          <dl className="mt-10 grid gap-x-10 gap-y-7 md:grid-cols-3">
            {content.departures.points.map((point) => (
              <div
                key={point.title.en}
                className="border-s-2 border-brass/40 ps-5"
              >
                <dt className="font-semibold text-ink">{point.title[locale]}</dt>
                <dd className="mt-1.5 leading-relaxed text-ink/75">
                  {point.body[locale]}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---- The causeway boundary ---------------------------------------- */}
      <section className="section-y border-t border-border bg-sand">
        <div className="site-container">
          <div className="max-w-3xl rounded-2xl border border-brass/35 bg-brass/8 p-6 sm:p-8">
            <p className="text-eyebrow text-brass-deep">
              {content.causeway.eyebrow[locale]}
            </p>
            <h2 className="text-h3 mt-3 text-balance text-ink">
              {content.causeway.heading[locale]}
            </h2>
            {content.causeway.body.map((paragraph) => (
              <p
                key={paragraph.en}
                className="mt-4 leading-relaxed text-ink/80"
              >
                {paragraph[locale]}
              </p>
            ))}
            <Link
              href={href(locale, "saudiToBahrain")}
              className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-palm transition-colors hover:text-palm-deep"
            >
              {content.causeway.linkLabel[locale]}
              <ArrowRightIcon
                aria-hidden
                className="size-3.5 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* ---- Terminal ----------------------------------------------------- */}
      <section className="section-y border-t border-border">
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-h3 text-balance text-ink">
              {content.terminal.heading[locale]}
            </h2>
            {content.terminal.body.map((paragraph) => (
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

      {/* ---- Beyond the three cities -------------------------------------- */}
      <section className="section-y border-t border-border bg-sand">
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-h2 text-balance text-ink">
              {content.beyond.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              {content.beyond.lead[locale]}
            </p>
          </div>

          <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {content.beyond.items.map((item) => {
              const body = (
                <>
                  <h3 className="font-semibold text-ink">{item.label[locale]}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/75">
                    {item.detail[locale]}
                  </p>
                </>
              );

              return (
                <li key={item.label.en}>
                  {"routeKey" in item && item.routeKey ? (
                    <Link
                      href={href(locale, item.routeKey)}
                      className="group flex h-full flex-col rounded-xl border border-palm/30 bg-palm-soft/40 p-5 transition-colors hover:border-palm/50 hover:bg-palm-soft/70"
                    >
                      {body}
                      <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-palm">
                        {locale === "ar" ? "افتح الصفحة" : "Open the page"}
                        <ArrowRightIcon
                          aria-hidden
                          className="size-3.5 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100"
                        />
                      </span>
                    </Link>
                  ) : (
                    <div className="flex h-full flex-col rounded-xl border border-border bg-card p-5">
                      {body}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ---- Vehicles ----------------------------------------------------- */}
      <section className="section-y border-t border-border">
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
