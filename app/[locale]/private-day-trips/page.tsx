import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowRightIcon,
  CheckIcon,
  MessageCircleIcon,
  RouteIcon,
  TriangleAlertIcon,
} from "lucide-react";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ClusterFaqList } from "@/components/cluster/cluster-faq";
import { RelatedLinks } from "@/components/cluster/related-links";
import { HeroSentinel } from "@/components/layout/site-header";
import { DayPlanner } from "@/components/day-trips/day-planner";
import { dayTrips as content } from "@/lib/content/day-trips";
import { vehicleClasses } from "@/lib/content/vehicles";
import { href } from "@/lib/i18n/routes";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { ui } from "@/lib/i18n/dictionary";
import { altText } from "@/lib/images";
import { image } from "@/lib/site-images";
import { pageMetadata } from "@/lib/seo";
import { whatsappUrl } from "@/lib/site";
import { clusterPageJsonLd, jsonLdScript, type Crumb } from "@/lib/structured-data";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/private-day-trips">): Promise<Metadata> {
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

/** Two levels: a service page sitting directly under the home page. */
const crumbs = (locale: Locale): Crumb[] => [
  { name: ui.home[locale], routeKey: "home" },
  { name: content.crumbLabel[locale], routeKey: content.routeKey },
];

/** Lookbook tiling: the sizes are chosen so each row fills twelve columns. */
const cardSpan = {
  wide: "lg:col-span-8",
  tall: "lg:col-span-4",
  small: "lg:col-span-4",
} as const;

const cardAspect = {
  wide: "aspect-16/9",
  tall: "aspect-3/4",
  small: "aspect-4/3",
} as const;

/**
 * These are not the cards' CSS widths, and deliberately so.
 *
 * `sizes` picks the file by width, but `object-cover` scales to the *larger*
 * of the two ratios. The sources here are landscape (about 3:2), so a card
 * taller than its source crops the sides and upscales to fill the height: the
 * 3:4 "tall" card needs roughly 516 × 1.5 ≈ 774px of image to stay sharp in a
 * 387px-wide box. Sizing these by column span alone served a 403px file into
 * that box and visibly softened it.
 */
const cardSizes = {
  wide: "(min-width: 1024px) 56vw, (min-width: 640px) 50vw, 100vw",
  tall: "(min-width: 1024px) 72vw, (min-width: 640px) 70vw, 135vw",
  small: "(min-width: 1024px) 50vw, (min-width: 640px) 60vw, 120vw",
} as const;

/**
 * Private day trips across Saudi Arabia.
 *
 * ## Design concept — **the day is a loop**
 *
 * Every other service page here answers "where are you going?". A day trip
 * is the one service where that question misleads, because the customer is
 * not going anywhere: they are coming back. The drive out and the drive home
 * are spent from the same daylight as the time at the destination, so the
 * thing that actually decides whether a day works is **how far out the
 * furthest place sits** — not how many places are on the list.
 *
 * That idea runs the whole page. The planner stratifies destinations by
 * reach from the starting city and reads the *furthest band touched*; the
 * concept section states the trade-off before the planner puts it to work;
 * the planning section ends on the one failure mode worth naming, which is
 * a list with one place too many on it.
 *
 * It is also what keeps this page honest. We publish no journey times and
 * cannot know how long a party lingers anywhere, so any duration would be
 * invented. "The furthest thing on your list decides the shape of the day"
 * needs no figure and is true everywhere.
 *
 * ## Why it does not look like the Ziyarat pages
 *
 * Those are destination pickers; this is a shape-of-day instrument. The
 * lookbook is a deliberately uneven editorial grid rather than a row of
 * matching cards, the six kinds of outing are prose in two columns rather
 * than an icon grid, and the concept section is a dark full-bleed band with
 * a three-rung distance ramp that nothing else in the project uses.
 *
 * ## What is withheld
 *
 * No hours, prices, waiting allowance, tickets, guides, opening times or
 * guarantees of access. The driver staying through an agreed outing is the
 * single confirmed operational fact, and the page builds nothing on top of
 * it. Places with no honest photograph in this project — the Red Sands,
 * Half Moon Bay, Tarout, the Qiddiya attractions — appear in prose and in
 * the planner but are given no card, and the lookbook says why.
 */
export default async function PrivateDayTripsPage({
  params,
}: PageProps<"/[locale]/private-day-trips">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const photo = image(content.imageKey);
  const quotePath = href(locale, "getQuote");
  const quoteHref = `${quotePath}?pickup=${encodeURIComponent(
    locale === "ar" ? "فندق في السعودية" : "Hotel in Saudi Arabia"
  )}`;
  const whatsapp = whatsappUrl(content.whatsappMessage[locale]);
  const p = content.planner;

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
              serviceName: content.crumbLabel[locale],
              serviceDescription: content.seo.description[locale],
              faqEntries: content.faqs.map((faq) => ({
                question: faq.question[locale],
                answer: faq.answer[locale],
              })),
            })
          ),
        }}
      />

      {/* ---- Hero --------------------------------------------------------- */}
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
          className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/92 via-ink/88 to-ink/97"
        />

        <div className="site-container pt-28 pb-14 md:pt-30 lg:pt-36 lg:pb-18">
          <Breadcrumbs locale={locale} crumbs={crumbs(locale)} tone="invert" />

          <div className="mt-8 max-w-3xl">
            <p className="text-eyebrow text-brass">{content.eyebrow[locale]}</p>
            <h1 className="text-display mt-4 text-balance text-white">
              {content.title[locale]}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/85">
              {content.standfirst[locale]}
            </p>
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#planner"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-brass px-6 text-sm font-semibold text-ink transition-colors hover:bg-brass-deep"
            >
              {content.primaryCta[locale]}
              <ArrowRightIcon
                aria-hidden
                className="size-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100"
              />
            </a>
            <a
              href="#how"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/25 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {content.secondaryCta[locale]}
            </a>
          </div>

          <p className="mt-5 text-xs text-white/50">{altText(photo, locale)}</p>
        </div>
      </section>

      {/* ---- Transfer vs day trip ----------------------------------------- */}
      <section className="section-y bg-background">
        <div className="site-container">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <h2 className="text-h2 text-balance text-ink">
                {content.difference.heading[locale]}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink/80">
                {content.difference.lead[locale]}
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="border-s-2 border-ink/12 ps-6">
                <p className="text-eyebrow text-ink/50">
                  {content.difference.transfer.label[locale]}
                </p>
                <p className="mt-2.5 leading-relaxed text-ink/75">
                  {content.difference.transfer.body[locale]}
                </p>
              </div>
              <div className="mt-8 border-s-2 border-brass ps-6">
                <p className="text-eyebrow text-brass-deep">
                  {content.difference.dayTrip.label[locale]}
                </p>
                <p className="mt-2.5 leading-relaxed text-ink">
                  {content.difference.dayTrip.body[locale]}
                </p>
              </div>
              <p className="mt-8 text-sm leading-relaxed text-ink/70">
                {content.difference.note[locale]}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---- The loop: the idea the planner runs on ------------------------ */}
      <section className="section-y bg-palm text-white">
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-h2 text-balance text-white">
              {content.loop.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/80">
              {content.loop.lead[locale]}
            </p>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-white/15 md:grid-cols-3">
            {content.loop.bands.map((band, index) => (
              <div key={band.id} className="bg-palm p-7">
                {/* The same three-rung ramp the planner uses. */}
                <span aria-hidden className="flex items-end gap-1">
                  {[0, 1, 2].map((rung) => (
                    <span
                      key={rung}
                      className={
                        rung <= index
                          ? "w-1.5 rounded-full bg-brass"
                          : "w-1.5 rounded-full bg-white/25"
                      }
                      style={{ height: `${10 + rung * 7}px` }}
                    />
                  ))}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  {band.label[locale]}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-white/75">
                  {band.body[locale]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Planner ------------------------------------------------------- */}
      <section id="planner" className="section-y scroll-mt-24 bg-sand/40">
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-h2 text-balance text-ink">
              {p.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              {p.lead[locale]}
            </p>
          </div>

          <div className="mt-10">
            <DayPlanner
              quotePath={quotePath}
              cities={content.cities.map((city) => ({
                id: city.id,
                name: city.name[locale],
                pickupSeed: city.pickupSeed[locale],
                blurb: city.blurb[locale],
                stops: city.stops.map((stop) => ({
                  id: stop.id,
                  name: stop.name[locale],
                  note: stop.note[locale],
                  band: stop.band,
                })),
              }))}
              copy={{
                cityLabel: p.cityLabel[locale],
                pickupLabel: p.pickupLabel[locale],
                pickupPlaceholder: p.pickupPlaceholder[locale],
                passengersLabel: p.passengersLabel[locale],
                passengersAny: p.passengersAny[locale],
                bandLabels: {
                  near: p.bandLabels.near[locale],
                  out: p.bandLabels.out[locale],
                  far: p.bandLabels.far[locale],
                },
                summaryLabel: p.summaryLabel[locale],
                emptyState: p.emptyState[locale],
                shapes: {
                  near: p.shapes.near[locale],
                  out: p.shapes.out[locale],
                  far: p.shapes.far[locale],
                },
                spread: p.spread[locale],
                carryOver: p.carryOver[locale],
                cta: p.cta[locale],
              }}
            />
          </div>
        </div>
      </section>

      {/* ---- Lookbook ------------------------------------------------------ */}
      <section className="section-y bg-background">
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-h2 text-balance text-ink">
              {content.lookbook.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              {content.lookbook.lead[locale]}
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-12">
            {content.lookbook.cards.map((card) => {
              const shot = image(card.imageKey);
              return (
                <figure
                  key={`${card.imageKey}-${card.place.en}`}
                  className={`${cardSpan[card.size]} group relative overflow-hidden rounded-2xl bg-ink`}
                >
                  <Image
                    src={shot.src}
                    alt={altText(shot, locale)}
                    width={shot.width}
                    height={shot.height}
                    placeholder="blur"
                    blurDataURL={shot.blurDataURL}
                    loading="lazy"
                    sizes={cardSizes[card.size]}
                    className={`${cardAspect[card.size]} w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]`}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-eyebrow text-brass">
                      {card.from[locale]}
                    </p>
                    <p className="mt-1.5 text-lg font-semibold text-white">
                      {card.place[locale]}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/80">
                      {card.line[locale]}
                    </p>
                  </figcaption>
                </figure>
              );
            })}
          </div>

          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-ink/70">
            {content.lookbook.gap[locale]}
          </p>
        </div>
      </section>

      {/* ---- Six kinds of day out ------------------------------------------ */}
      <section className="section-y bg-sand/40">
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-h2 text-balance text-ink">
              {content.kinds.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              {content.kinds.lead[locale]}
            </p>
          </div>

          <dl className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2">
            {content.kinds.items.map((item) => (
              <div
                key={item.label.en}
                className="border-t border-ink/12 pt-5"
              >
                <dt className="text-base font-semibold text-ink">
                  {item.label[locale]}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink/75">
                  {item.body[locale]}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---- How the day gets arranged -------------------------------------- */}
      <section id="how" className="section-y scroll-mt-24 bg-background">
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-h2 text-balance text-ink">
              {content.process.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              {content.process.lead[locale]}
            </p>
          </div>

          <ol className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {content.process.steps.map((step, index) => (
              <li key={step.label.en} className="border-t-2 border-brass pt-5">
                <span className="numeric text-sm font-semibold text-brass-deep">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-base font-semibold text-ink">
                  {step.label[locale]}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/75">
                  {step.body[locale]}
                </p>
              </li>
            ))}
          </ol>

          <p className="mt-10 flex max-w-3xl items-start gap-3 rounded-xl bg-sand/70 p-5 text-sm leading-relaxed text-ink/80">
            <RouteIcon aria-hidden className="mt-0.5 size-4 shrink-0 text-brass-deep" />
            {content.process.driverNote[locale]}
          </p>
        </div>
      </section>

      {/* ---- Planning a realistic day --------------------------------------- */}
      <section className="section-y bg-sand/40">
        <div className="site-container">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <h2 className="text-h2 text-balance text-ink">
                {content.planning.heading[locale]}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink/80">
                {content.planning.lead[locale]}
              </p>
              <p className="mt-8 flex items-start gap-3 rounded-xl bg-brass/12 p-5 text-sm leading-relaxed text-ink">
                <TriangleAlertIcon
                  aria-hidden
                  className="mt-0.5 size-4 shrink-0 text-brass-deep"
                />
                {content.planning.caution[locale]}
              </p>
            </div>

            <dl className="lg:col-span-7">
              {content.planning.factors.map((factor) => (
                <div
                  key={factor.label.en}
                  className="border-b border-ink/10 py-5 first:pt-0"
                >
                  <dt className="text-base font-semibold text-ink">
                    {factor.label[locale]}
                  </dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-ink/75">
                    {factor.body[locale]}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ---- Vehicles -------------------------------------------------------- */}
      <section className="section-y bg-background">
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-h2 text-balance text-ink">
              {content.vehicles.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              {content.vehicles.lead[locale]}
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {vehicleClasses.map((vehicle) => (
              <div
                key={vehicle.slug}
                className="rounded-2xl bg-card p-6 ring-1 ring-ink/8"
              >
                <h3 className="text-base font-semibold text-ink">
                  {vehicle.name[locale]}
                </h3>
                <p className="numeric mt-2 text-xs text-muted-foreground">
                  {vehicle.seats[locale]} · {vehicle.luggage[locale]}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink/75">
                  {vehicle.summary[locale]}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-ink/70">
            {content.vehicles.note[locale]}
          </p>
        </div>
      </section>

      {/* ---- Settled before you confirm -------------------------------------- */}
      <section className="section-y bg-sand/40">
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-h2 text-balance text-ink">
              {content.agreed.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              {content.agreed.lead[locale]}
            </p>
          </div>

          <ul className="mt-9 grid max-w-4xl gap-x-10 gap-y-4 md:grid-cols-2">
            {content.agreed.items.map((item) => (
              <li key={item.en} className="flex items-start gap-3">
                <CheckIcon
                  aria-hidden
                  className="mt-0.5 size-4 shrink-0 text-palm"
                />
                <span className="text-sm leading-relaxed text-ink/80">
                  {item[locale]}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- FAQs ------------------------------------------------------------ */}
      <section className="section-y bg-background">
        <div className="site-container">
          <ClusterFaqList
            locale={locale}
            heading={content.faqHeading[locale]}
            headingId="day-trip-faqs"
            faqs={content.faqs}
            layout="split"
          />
        </div>
      </section>

      {/* ---- Closing CTA ----------------------------------------------------- */}
      <section className="section-y bg-ink text-white">
        <div className="site-container">
          <div className="max-w-2xl">
            <p className="text-eyebrow text-brass">
              {content.cta.eyebrow[locale]}
            </p>
            <h2 className="text-h2 mt-4 text-balance text-white">
              {content.cta.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/80">
              {content.cta.body[locale]}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={quoteHref}
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-brass px-6 text-sm font-semibold text-ink transition-colors hover:bg-brass-deep"
              >
                {content.cta.button[locale]}
                <ArrowRightIcon
                  aria-hidden
                  className="size-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100"
                />
              </Link>
              {whatsapp ? (
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/25 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <MessageCircleIcon aria-hidden className="size-4" />
                  {content.whatsappCta[locale]}
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* ---- Related --------------------------------------------------------- */}
      <section className="section-y bg-background">
        <div className="site-container">
          <RelatedLinks
            locale={locale}
            heading={content.relatedHeading[locale]}
            links={content.related}
          />
        </div>
      </section>
    </>
  );
}
