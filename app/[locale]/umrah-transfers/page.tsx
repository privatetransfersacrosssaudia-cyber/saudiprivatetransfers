import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  CarFrontIcon,
  CheckIcon,
  ChevronRightIcon,
  InfoIcon,
  UsersIcon,
  XIcon,
} from "lucide-react";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ClusterFaqList } from "@/components/cluster/cluster-faq";
import { RelatedLinks } from "@/components/cluster/related-links";
import { HeroSentinel } from "@/components/layout/site-header";
import { umrah as content } from "@/lib/content/umrah";
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
}: PageProps<"/[locale]/umrah-transfers">): Promise<Metadata> {
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

/**
 * Two levels, not three.
 *
 * Every other leaf page on this site hangs off a city — Home › Jeddah ›
 * Airport transfers. This one does not belong to a city: it spans Jeddah,
 * Makkah and Madinah and is the parent of several route pages rather than a
 * child of any of them. Forcing it under one city would misstate the
 * hierarchy and would have to pick a city arbitrarily.
 */
const crumbs = (locale: Locale): Crumb[] => [
  { name: ui.home[locale], routeKey: "home" },
  { name: content.crumbLabel[locale], routeKey: content.routeKey },
];

/**
 * Umrah private transfers.
 *
 * Design concept — "the shape picker". This is a lead-generation page, and
 * the thing standing between a visitor and an enquiry is not information: it
 * is that an Umrah trip is four to six separate car journeys and they have no
 * single place to ask for all of them at once. Every other page on this site
 * owns one leg. This one owns the chain.
 *
 * So the signature element is four itinerary cards covering almost every
 * Umrah trip — in and out of Jeddah, Jeddah in Madinah out, Madinah in Jeddah
 * out, and overland from Riyadh. Each card draws its legs as a chain of
 * chips, each chip links to the page that already details that leg, and each
 * card carries its own quotation link with that itinerary's pickup and
 * destination prefilled. The reader recognises their own trip and the next
 * click is an enquiry, not more reading.
 *
 * Deliberately **not** the shape of the route pages. Those open on a stat
 * band of distance and duration, because a route page's job is to answer "how
 * far and how long". This page makes no distance claim at all: the figures
 * live on the leg pages and are linked rather than restated, which keeps this
 * page from cannibalising the pages it exists to feed.
 *
 * The two-column "what we are / what we are not" band is the honest moment,
 * and it is load-bearing rather than decorative. The owner has confirmed
 * Nusuk/Masar registration as a transport provider, and the page states it
 * once, plainly, with its boundary in the same block: it is a transport
 * registration, not a Hajj operator licence, it issues nobody a permit, and
 * it does not authorise restricted-area entry. Mina, Arafat and Muzdalifah
 * are refused explicitly rather than left to inference, because that is the
 * single most likely wrong assumption a reader brings to a page with "Umrah"
 * in the title.
 *
 * No prices, no availability guarantees, no fleet specifications, no
 * passenger ceiling and no legal penalties are published here. The seasonal
 * paragraph describes what has happened in recent seasons and then defers to
 * the current official announcement, which is the only thing that can be
 * right for a date we do not know.
 */
export default async function UmrahTransfersPage({
  params,
}: PageProps<"/[locale]/umrah-transfers">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const photo = image(content.imageKey);

  /** Generic entry point, for a reader whose trip is none of the four. */
  const quoteHref = `${href(locale, "getQuote")}?pickup=${encodeURIComponent(
    locale === "ar" ? "رحلة عمرة" : "Umrah trip"
  )}`;

  /** Per-itinerary entry point, with both ends of the trip prefilled. */
  const shapeHref = (pickup: string, dropoff: string) =>
    `${href(locale, "getQuote")}?pickup=${encodeURIComponent(
      pickup
    )}&dropoff=${encodeURIComponent(dropoff)}`;

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
          className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/94 via-ink/90 to-ink/97"
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

          <ul className="mt-9 flex flex-col gap-2.5">
            {content.heroPoints.map((point) => (
              <li key={point.en} className="flex items-start gap-3">
                <CheckIcon
                  aria-hidden
                  className="mt-1 size-4 shrink-0 text-brass"
                />
                <span className="text-white/80">{point[locale]}</span>
              </li>
            ))}
          </ul>

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
              href="#itineraries"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/25 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {content.secondaryCta[locale]}
            </a>
          </div>
        </div>
      </section>

      {/* ---- Signature: the four itinerary shapes ------------------------- */}
      <section
        id="itineraries"
        className="section-y scroll-mt-24 border-t border-border bg-sand"
        aria-labelledby="itineraries-heading"
      >
        <div className="site-container">
          <div className="max-w-3xl">
            <h2
              id="itineraries-heading"
              className="text-h2 text-balance text-ink"
            >
              {content.shapes.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              {content.shapes.lead[locale]}
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {content.shapes.items.map((shape) => (
              <article
                key={shape.key}
                id={`trip-${shape.key}`}
                className={cn(
                  "flex scroll-mt-24 flex-col rounded-2xl bg-card p-6 sm:p-7",
                  shape.common
                    ? "ring-2 ring-brass/55"
                    : "ring-1 ring-ink/8"
                )}
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <h3 className="text-h4 text-balance text-ink">
                    {shape.name[locale]}
                  </h3>
                  {shape.common ? (
                    <span className="rounded-full bg-brass/20 px-2.5 py-0.5 text-xs font-semibold text-brass-deep">
                      {locale === "ar" ? "الأكثر شيوعًا" : "Most common"}
                    </span>
                  ) : null}
                </div>

                <p className="mt-3 leading-relaxed text-ink/75">
                  {shape.who[locale]}
                </p>

                {/*
                  The legs as a chain. The chevron between them mirrors with
                  the writing direction, so the chain reads right-to-left in
                  Arabic without a second markup path.
                */}
                <ol className="mt-5 flex flex-wrap items-center gap-x-1.5 gap-y-2">
                  {shape.legs.map((leg, index) => (
                    <li
                      key={`${leg.from.en}-${leg.to.en}`}
                      className="flex items-center gap-1.5"
                    >
                      {index === 0 ? (
                        <span className="rounded-lg bg-palm/12 px-2.5 py-1 text-sm font-medium text-ink">
                          {leg.from[locale]}
                        </span>
                      ) : null}
                      <ChevronRightIcon
                        aria-hidden
                        className="size-3.5 shrink-0 text-brass-deep rtl:-scale-x-100"
                      />
                      {leg.routeKey ? (
                        <Link
                          href={href(locale, leg.routeKey)}
                          className="rounded-lg bg-palm/12 px-2.5 py-1 text-sm font-medium text-ink underline-offset-4 transition-colors hover:bg-palm/20 hover:underline"
                        >
                          {leg.to[locale]}
                        </Link>
                      ) : (
                        <span className="rounded-lg bg-palm/12 px-2.5 py-1 text-sm font-medium text-ink">
                          {leg.to[locale]}
                        </span>
                      )}
                    </li>
                  ))}
                </ol>

                <Link
                  href={shapeHref(
                    shape.prefill.pickup[locale],
                    shape.prefill.dropoff[locale]
                  )}
                  className={cn(
                    "group mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold transition-colors",
                    shape.common
                      ? "bg-brass text-ink hover:bg-brass-deep"
                      : "border border-brass bg-brass/12 text-ink hover:bg-brass/25"
                  )}
                >
                  {shape.ctaLabel[locale]}
                  <ArrowRightIcon
                    aria-hidden
                    className="size-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100"
                  />
                </Link>
              </article>
            ))}
          </div>

          <p className="mt-7 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {content.shapes.footnote[locale]}
          </p>
        </div>
      </section>

      {/* ---- Why one arrangement ------------------------------------------ */}
      <section className="section-y border-t border-border">
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-h2 text-balance text-ink">
              {content.coordinated.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              {content.coordinated.lead[locale]}
            </p>
          </div>

          <dl className="mt-10 grid gap-x-10 gap-y-7 md:grid-cols-3">
            {content.coordinated.points.map((point) => (
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

      {/* ---- Groups -------------------------------------------------------- */}
      <section className="section-y border-t border-border bg-sand">
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-h2 text-balance text-ink">
              {content.groups.heading[locale]}
            </h2>
            {content.groups.paragraphs.map((paragraph, index) => (
              <p
                key={paragraph.en}
                className={cn(
                  "leading-relaxed text-ink/80",
                  index === 0 ? "mt-5 text-lg" : "mt-4"
                )}
              >
                {paragraph[locale]}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ---- What we are, and what we are not ------------------------------ */}
      <section className="section-y border-t border-border bg-ink">
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-h2 text-balance text-white">
              {content.provider.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/80">
              {content.provider.lead[locale]}
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {[content.provider.are, content.provider.areNot].map(
              (column, index) => (
                <div
                  key={column.heading.en}
                  className={cn(
                    "rounded-2xl p-7 lg:p-8",
                    index === 0
                      ? "bg-palm/20 ring-1 ring-palm/40"
                      : "bg-white/6 ring-1 ring-white/12"
                  )}
                >
                  <h3 className="text-h4 text-white">
                    {column.heading[locale]}
                  </h3>
                  <ul className="mt-6 flex flex-col gap-3.5">
                    {column.items.map((item) => (
                      <li key={item.en} className="flex gap-3">
                        {index === 0 ? (
                          <CheckIcon
                            aria-hidden
                            className="mt-1 size-4 shrink-0 text-brass"
                          />
                        ) : (
                          <XIcon
                            aria-hidden
                            className="mt-1 size-4 shrink-0 text-white/45"
                          />
                        )}
                        <span className="leading-relaxed text-white/80">
                          {item[locale]}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </div>

          <p className="mt-7 max-w-3xl border-s-2 border-brass/50 ps-5 text-sm leading-relaxed text-white/70">
            {content.provider.limits[locale]}
          </p>
        </div>
      </section>

      {/* ---- Entry and season ---------------------------------------------- */}
      <section className="section-y border-t border-border">
        <div className="site-container">
          <div className="max-w-3xl rounded-2xl border border-brass/35 bg-brass/8 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <InfoIcon aria-hidden className="size-5 shrink-0 text-brass-deep" />
              <h2 className="text-h3 text-balance text-ink">
                {content.access.heading[locale]}
              </h2>
            </div>
            {content.access.paragraphs.map((paragraph) => (
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

      {/* ---- How booking works --------------------------------------------- */}
      <section className="section-y border-t border-border bg-sand">
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-h2 text-balance text-ink">
              {content.process.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              {content.process.lead[locale]}
            </p>
          </div>

          <ol className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
            {content.process.steps.map((step, index) => (
              <li key={step.title.en}>
                <span
                  aria-hidden
                  className="numeric flex size-8 items-center justify-center rounded-full bg-palm text-sm font-semibold text-white"
                >
                  {index + 1}
                </span>
                <h3 className="mt-3 font-semibold text-ink">
                  {step.title[locale]}
                </h3>
                <p className="mt-1.5 leading-relaxed text-ink/75">
                  {step.body[locale]}
                </p>
              </li>
            ))}
          </ol>

          <p className="mt-9 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {content.process.note[locale]}
          </p>
        </div>
      </section>

      {/* ---- What to send --------------------------------------------------- */}
      <section className="section-y border-t border-border">
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

            <Link
              href={quoteHref}
              className="group mt-9 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-palm px-6 text-sm font-semibold text-white transition-colors hover:bg-palm-deep"
            >
              {content.primaryCta[locale]}
              <ArrowRightIcon
                aria-hidden
                className="size-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* ---- Vehicles -------------------------------------------------------- */}
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

      {/* ---- FAQ ------------------------------------------------------------- */}
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

      {/* ---- CTA ------------------------------------------------------------- */}
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

      {/* ---- Related ---------------------------------------------------------- */}
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
