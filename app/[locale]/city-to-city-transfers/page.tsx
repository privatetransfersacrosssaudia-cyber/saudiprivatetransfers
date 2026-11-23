import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  CarFrontIcon,
  CheckIcon,
  UsersIcon,
} from "lucide-react";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ClusterFaqList } from "@/components/cluster/cluster-faq";
import { RelatedLinks } from "@/components/cluster/related-links";
import { HeroSentinel } from "@/components/layout/site-header";
import { JourneyPicker } from "@/components/city-to-city/journey-picker";
import { cityToCity as content } from "@/lib/content/city-to-city";
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
}: PageProps<"/[locale]/city-to-city-transfers">): Promise<Metadata> {
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

/** Two levels: a national service page belongs to no single city. */
const crumbs = (locale: Locale): Crumb[] => [
  { name: ui.home[locale], routeKey: "home" },
  { name: content.crumbLabel[locale], routeKey: content.routeKey },
];

/**
 * City-to-city private transfers.
 *
 * Design concept — **two ends of one line**. An intercity enquiry is two
 * facts: where you start and where you need to be. So the page asks that
 * question first and answers it interactively, then organises everything
 * below by departure city, which is how people actually think — nobody
 * searches for a corridor, they think "I'm in Riyadh and I need Jeddah".
 *
 * Deliberately not the airport page's shape. That one is built as two facing
 * pathways because arrivals and departures are different jobs; here there is
 * one job with two variables, so the page leads on a **picker** rather than a
 * split, and the board beneath it is grouped vertically by origin rather than
 * set as opposing columns. The airport page's dark coordination band has no
 * equivalent here, because there is no flight to coordinate against.
 *
 * Three things keep it from competing with the twelve route pages it feeds:
 *
 * - **No distances and no driving times anywhere on it.** Those are the route
 *   pages' whole value, and repeating them is the fastest way to cannibalise
 *   the pages this one exists to send traffic to. The board carries city
 *   names and nothing numeric.
 * - **The picker surfaces a route page when one exists** and says "we check
 *   this for you" when it does not, which is the honest answer and the one
 *   thing a static grid cannot do.
 * - **The prefill always works**, page or no page, so an unlisted pair is
 *   still a complete enquiry rather than a dead end.
 *
 * Imagery is the open-highway asset and the approach to Riyadh — no vehicles,
 * because the project holds no vehicle photography and a stock car beside a
 * service claim would imply a fleet nobody has confirmed.
 */
export default async function CityToCityTransfersPage({
  params,
}: PageProps<"/[locale]/city-to-city-transfers">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const photo = image(content.imageKey);
  const boardPhoto = image(content.boardImageKey);

  const quotePath = href(locale, "getQuote");
  const quoteHref = `${quotePath}?pickup=${encodeURIComponent(
    locale === "ar" ? "مدينة في السعودية" : "Saudi city"
  )}`;

  const vehicles = content.vehicles.slugs
    .map((slug) => vehicleClasses.find((v) => v.slug === slug))
    .filter((v): v is (typeof vehicleClasses)[number] => Boolean(v));

  const pickerCopy = {
    fromLabel: content.picker.copy.fromLabel[locale],
    toLabel: content.picker.copy.toLabel[locale],
    sameCity: content.picker.copy.sameCity[locale],
    hasPageLabel: content.picker.copy.hasPageLabel[locale],
    hasPageBody: content.picker.copy.hasPageBody[locale],
    noPageLabel: content.picker.copy.noPageLabel[locale],
    noPageBody: content.picker.copy.noPageBody[locale],
    quoteCta: content.picker.copy.quoteCta[locale],
    routeCta: content.picker.copy.routeCta[locale],
  };

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
            <h1 className="text-h1 mt-4 text-balance text-white">
              {content.title[locale]}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/85">
              {content.standfirst[locale]}
            </p>
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
              href="#picker"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/25 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {content.secondaryCta[locale]}
            </a>
          </div>
        </div>
      </section>

      {/* ---- Signature: the journey picker -------------------------------- */}
      <section
        id="picker"
        className="section-y scroll-mt-24 border-t border-border bg-sand"
        aria-labelledby="picker-heading"
      >
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 id="picker-heading" className="text-h2 text-balance text-ink">
              {content.picker.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              {content.picker.lead[locale]}
            </p>
          </div>

          <div className="mt-9 max-w-3xl">
            <JourneyPicker
              locale={locale}
              cities={content.picker.cities}
              pairs={content.picker.pairs}
              copy={pickerCopy}
              quotePath={quotePath}
            />
          </div>
        </div>
      </section>

      {/* ---- The board, grouped by departure city -------------------------- */}
      <section className="section-y border-t border-border">
        <div className="site-container">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-start lg:gap-14">
            <div className="max-w-3xl">
              <h2 className="text-h2 text-balance text-ink">
                {content.board.heading[locale]}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink/80">
                {content.board.lead[locale]}
              </p>
            </div>

            <figure className="overflow-hidden rounded-2xl">
              <Image
                src={boardPhoto.src}
                alt={altText(boardPhoto, locale)}
                width={boardPhoto.width}
                height={boardPhoto.height}
                placeholder="blur"
                blurDataURL={boardPhoto.blurDataURL}
                loading="lazy"
                sizes="(min-width: 1024px) 22rem, 100vw"
                className="aspect-4/3 w-full object-cover"
              />
              <figcaption className="mt-2.5 text-xs text-muted-foreground">
                {altText(boardPhoto, locale)}
              </figcaption>
            </figure>
          </div>

          <div className="mt-12 flex flex-col gap-10">
            {content.board.groups.map((group) => (
              <div
                key={group.city.en}
                className="border-s-2 border-palm/30 ps-6"
              >
                <h3 className="text-h3 text-balance text-ink">
                  {group.city[locale]}
                </h3>
                <p className="mt-2.5 max-w-3xl leading-relaxed text-ink/75">
                  {group.note[locale]}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {group.journeys.map((journey) => (
                    <li key={journey.routeKey}>
                      <Link
                        href={href(locale, journey.routeKey)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-brass hover:text-brass-deep"
                      >
                        {journey.to[locale]}
                        <ArrowRightIcon
                          aria-hidden
                          className="size-3.5 rtl:-scale-x-100"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 max-w-3xl rounded-2xl border border-brass/35 bg-brass/8 p-6 sm:p-7">
            <h3 className="text-h4 text-balance text-ink">
              {content.board.elsewhere.heading[locale]}
            </h3>
            <p className="mt-3 leading-relaxed text-ink/80">
              {content.board.elsewhere.body[locale]}
            </p>
          </div>
        </div>
      </section>

      {/* ---- Journey shapes ------------------------------------------------- */}
      <section className="section-y border-t border-border bg-sand">
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-h2 text-balance text-ink">
              {content.shapes.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              {content.shapes.lead[locale]}
            </p>
          </div>

          <dl className="mt-10 grid gap-x-10 gap-y-7 md:grid-cols-2">
            {content.shapes.items.map((item) => (
              <div key={item.title.en} className="rounded-2xl bg-card p-6 ring-1 ring-ink/8">
                <dt className="font-semibold text-ink">{item.title[locale]}</dt>
                <dd className="mt-2 leading-relaxed text-ink/75">
                  {item.body[locale]}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---- Vehicles -------------------------------------------------------- */}
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

          <p className="mt-8 max-w-3xl leading-relaxed text-ink/80">
            {content.vehicles.groupNote[locale]}
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            {content.vehicles.footnote[locale]}
          </p>
        </div>
      </section>

      {/* ---- What to send + process ------------------------------------------ */}
      <section className="section-y border-t border-border bg-sand">
        <div className="site-container">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-h2 text-balance text-ink">
                {content.sending.heading[locale]}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink/80">
                {content.sending.lead[locale]}
              </p>
              <ul className="mt-7 flex flex-col gap-3">
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

            <div>
              <h2 className="text-h3 text-balance text-ink">
                {content.process.heading[locale]}
              </h2>
              <ol className="mt-6 flex flex-col gap-5">
                {content.process.steps.map((step, index) => (
                  <li key={step.title.en} className="flex gap-4">
                    <span
                      aria-hidden
                      className="numeric flex size-7 shrink-0 items-center justify-center rounded-full bg-palm text-xs font-semibold text-white"
                    >
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold text-ink">
                        {step.title[locale]}
                      </h3>
                      <p className="mt-1 leading-relaxed text-ink/75">
                        {step.body[locale]}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-7 text-sm leading-relaxed text-muted-foreground">
                {content.process.note[locale]}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---- FAQ -------------------------------------------------------------- */}
      <section className="section-y border-t border-border">
        <div className="site-container">
          <ClusterFaqList
            locale={locale}
            heading={content.faqHeading[locale]}
            headingId="faq"
            faqs={[...content.faqs]}
            layout="split"
          />
        </div>
      </section>

      {/* ---- CTA -------------------------------------------------------------- */}
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

      {/* ---- Related ----------------------------------------------------------- */}
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
