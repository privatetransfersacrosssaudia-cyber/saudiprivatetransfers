import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  CarFrontIcon,
  CheckIcon,
  MoonStarIcon,
  PlaneLandingIcon,
  PlaneTakeoffIcon,
  UsersIcon,
  XIcon,
} from "lucide-react";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ClusterFaqList } from "@/components/cluster/cluster-faq";
import { RelatedLinks } from "@/components/cluster/related-links";
import { HeroSentinel } from "@/components/layout/site-header";
import { madinahAirport as content } from "@/lib/content/madinah-region/airport";
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
}: PageProps<"/[locale]/madinah-airport-transfers">): Promise<Metadata> {
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

/** Three levels: the airport is a child of the Madinah hub. */
const crumbs = (locale: Locale): Crumb[] => [
  { name: ui.home[locale], routeKey: "home" },
  { name: { en: "Madinah", ar: "المدينة المنورة" }[locale], routeKey: "madinah" },
  { name: content.crumbLabel[locale], routeKey: content.routeKey },
];

/**
 * Madinah airport.
 *
 * Design concept — "one destination, and one question asked first". At Riyadh
 * the question is which direction you are travelling, and that page is built
 * as twin panels. At Jeddah it is where you are going next, and that page
 * opens on the choice. Here it is neither: almost everyone who lands is going
 * to the same district, about 20 km away, so *where* is settled before the
 * page starts. What is not settled is whether this traveller needs us at all,
 * because a large share of this airport's arrivals come in under a scheme that
 * already carries them to their accommodation.
 *
 * So the page asks that question before it asks for anything, and the layout
 * follows:
 *
 * - **An approach plate for a hero** — distance and time set large, with the
 *   three *named* roads beneath as chips. Saudipedia names them; nothing else
 *   in the project renders a set of named roads, and it is the one piece of
 *   specificity this airport genuinely supports.
 * - **A two-answer block, high up.** Not cards and not a comparison table: two
 *   panels headed "then you probably do not need us" and "then this page is
 *   for you", one ticked and one crossed. It is the first thing after the
 *   statistics, deliberately ahead of every call to action.
 * - **An input ledger** instead of a feature list: two ruled columns, what you
 *   send against what it decides. The corridor page used a bordered definition
 *   grid; this is a different object for a different job.
 * - **Arrivals as a numbered sequence, departures as the same arithmetic run
 *   backwards**, each with its own icon and neither given the Riyadh page's
 *   twin-panel treatment.
 * - No route plate, no direction plates, no milepost strip, no verdict chips.
 *   Those belong to the corridor and repeating them here would turn two
 *   researched pages into one template used twice.
 */
export default async function MadinahAirportTransfersPage({
  params,
}: PageProps<"/[locale]/madinah-airport-transfers">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const photo = image(content.imageKey);

  const quoteHref = `${href(locale, "getQuote")}?pickup=${encodeURIComponent(
    locale === "ar" ? "مطار المدينة المنورة" : "Madinah airport"
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

      {/* ---- Hero: the approach plate ------------------------------------- */}
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

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="max-w-2xl">
              <p className="text-eyebrow text-brass">{content.eyebrow[locale]}</p>
              <h1 className="text-display mt-4 text-balance text-white">
                {content.title[locale]}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-white/85">
                {content.standfirst[locale]}
              </p>
            </div>

            {/*
              The approach plate: the distance set large, and the three roads
              the authoritative source actually names. Nothing else in the
              project renders a named road set.
            */}
            <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-6 lg:w-80">
              <p className="numeric text-4xl font-semibold text-white">
                {content.approach.distance[locale]}
              </p>
              <p className="mt-1 text-sm text-white/65">
                {content.approach.toLabel[locale]}
              </p>
              <p className="numeric mt-4 border-t border-white/15 pt-4 text-lg font-semibold text-brass">
                {content.approach.duration[locale]}
              </p>

              <p className="mt-5 text-xs font-medium tracking-wide text-white/50 uppercase">
                {content.approach.roadsLabel[locale]}
              </p>
              <ul className="mt-2.5 flex flex-wrap gap-1.5">
                {content.approach.roads.map((road) => (
                  <li
                    key={road.name.en}
                    className="rounded-full border border-white/20 px-2.5 py-1 text-xs text-white/80"
                  >
                    {road.name[locale]}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
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
              href="#who"
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

      {/* ---- The question asked before any CTA ---------------------------- */}
      <section id="who" className="section-y scroll-mt-24">
        <div className="site-container">
          <div className="max-w-3xl">
            <p className="text-eyebrow text-brass-deep">
              {content.makkahRoute.eyebrow[locale]}
            </p>
            <h2 className="text-h2 mt-3 text-balance text-ink">
              {content.makkahRoute.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              {content.makkahRoute.lead[locale]}
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {content.makkahRoute.columns.map((column, index) => {
              const needsUs = index === 1;
              const Icon = needsUs ? CheckIcon : XIcon;
              return (
                <div
                  key={column.title.en}
                  className={
                    needsUs
                      ? "rounded-2xl border border-palm/35 bg-palm-soft/50 p-6"
                      : "rounded-2xl border border-border bg-card p-6"
                  }
                >
                  <span
                    aria-hidden
                    className={
                      needsUs
                        ? "flex size-8 items-center justify-center rounded-full bg-palm text-white"
                        : "flex size-8 items-center justify-center rounded-full bg-secondary text-muted-foreground"
                    }
                  >
                    <Icon className="size-4" />
                  </span>
                  <h3 className="text-h4 mt-4 text-balance text-ink">
                    {column.title[locale]}
                  </h3>
                  <p className="mt-3 leading-relaxed text-ink/75">
                    {column.body[locale]}
                  </p>
                </div>
              );
            })}
          </div>

          <p className="mt-6 max-w-3xl rounded-xl border border-border bg-card p-5 text-sm leading-relaxed text-ink/75">
            {content.makkahRoute.footnote[locale]}
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

          <p className="mt-10 flex max-w-3xl gap-4 rounded-xl border border-brass/35 bg-brass/8 p-5">
            <MoonStarIcon
              aria-hidden
              className="mt-0.5 size-5 shrink-0 text-brass-deep"
            />
            <span className="leading-relaxed text-ink/80">
              {content.arrivals.lateNote[locale]}
            </span>
          </p>
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
              <div key={point.title.en} className="border-s-2 border-brass/40 ps-5">
                <dt className="font-semibold text-ink">{point.title[locale]}</dt>
                <dd className="mt-1.5 leading-relaxed text-ink/75">
                  {point.body[locale]}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---- The drive, and the terminal we will not chart ---------------- */}
      <section className="section-y border-t border-border bg-sand">
        <div className="site-container">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-h3 text-balance text-ink">
                {content.roads.heading[locale]}
              </h2>
              <p className="mt-4 leading-relaxed text-ink/80">
                {content.roads.lead[locale]}
              </p>
              <ul className="mt-6 flex flex-col gap-2">
                {content.approach.roads.map((road) => (
                  <li
                    key={road.name.en}
                    className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 text-ink"
                  >
                    <span
                      aria-hidden
                      className="size-1.5 shrink-0 rounded-full bg-palm"
                    />
                    {road.name[locale]}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                {content.roads.footnote[locale]}
              </p>
            </div>

            <div>
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
        </div>
      </section>

      {/* ---- Onward ------------------------------------------------------- */}
      <section className="section-y border-t border-border">
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-h2 text-balance text-ink">
              {content.onward.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              {content.onward.lead[locale]}
            </p>
          </div>

          <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {content.onward.items.map((item) => {
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

      {/* ---- The input ledger --------------------------------------------- */}
      <section className="section-y border-t border-border bg-sand">
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-h2 text-balance text-ink">
              {content.inputs.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              {content.inputs.lead[locale]}
            </p>
          </div>

          <dl className="mt-10 overflow-hidden rounded-2xl border border-border">
            {content.inputs.rows.map((row, index) => (
              <div
                key={row.input.en}
                className={
                  index % 2 === 0
                    ? "bg-card sm:flex sm:items-baseline sm:gap-8"
                    : "bg-background sm:flex sm:items-baseline sm:gap-8"
                }
              >
                <dt className="px-5 pt-4 font-semibold text-ink sm:w-72 sm:shrink-0 sm:py-5 sm:ps-6">
                  {row.input[locale]}
                </dt>
                <dd className="px-5 pb-4 leading-relaxed text-ink/75 sm:flex-1 sm:py-5 sm:pe-6 sm:ps-0">
                  {row.decides[locale]}
                </dd>
              </div>
            ))}
          </dl>
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

      {/* ---- Booking ------------------------------------------------------ */}
      <section className="section-y border-t border-border bg-sand">
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
      <section className="section-y border-t border-border">
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
