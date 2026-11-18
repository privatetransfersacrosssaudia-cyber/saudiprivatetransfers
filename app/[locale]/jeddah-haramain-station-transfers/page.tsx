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
  MapPinIcon,
  PlaneIcon,
  TicketIcon,
  TrainFrontIcon,
  UsersIcon,
} from "lucide-react";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ClusterFaqList } from "@/components/cluster/cluster-faq";
import { RelatedLinks } from "@/components/cluster/related-links";
import { HeroSentinel } from "@/components/layout/site-header";
import { jeddahStation as content } from "@/lib/content/jeddah/station";
import { jeddahHub } from "@/lib/content/jeddah/hub";
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
}: PageProps<"/[locale]/jeddah-haramain-station-transfers">): Promise<Metadata> {
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

/** Three levels: station transfers are a child of the Jeddah hub. */
const crumbs = (locale: Locale): Crumb[] => [
  { name: ui.home[locale], routeKey: "home" },
  { name: jeddahHub.crumbLabel[locale], routeKey: "jeddah" },
  { name: content.crumbLabel[locale], routeKey: content.routeKey },
];

/**
 * Jeddah Haramain railway station transfers.
 *
 * Design concept — "the ticket stub". The Riyadh railway page in this project
 * is a departure board, and it earns that shape: two stations on two lines to
 * two different places, so the destination decides the building and a corridor
 * diagram answers the question. Jeddah is the inverse. Both of its stations
 * are on the same Haramain line serving the same destinations, so no amount of
 * knowing where you are going can tell you which station you want. Only the
 * ticket knows, because the choice was made when it was bought.
 *
 * So the signature element is a **ticket stub in the hero** — a light card on
 * the dark ground, with the date and class greyed out and one field pulled out
 * in brass: the Jeddah station, shown with both of its possible values. A
 * perforated edge and two punched notches separate the stub, which carries the
 * single sentence the page exists to deliver. Nothing else in the project is
 * shaped like a document the reader is being asked to go and look at.
 *
 * The other things that belong to this page alone:
 *
 * - **A dark two-column band comparing a flight anchor with a train anchor.**
 *   It is the one place in the project where two *kinds of pickup* are set
 *   against each other rather than two routes or two directions, and it exists
 *   because one of these stations is inside King Abdulaziz airport — which
 *   makes a railway pickup there physically an airport job and operationally
 *   nothing of the sort.
 * - **"Why you cannot guess"** — this page's honest block. It names the Riyadh
 *   page's logic and says it does not apply here, rather than quietly reusing
 *   a shape that would mislead.
 * - **"What we do not publish"**, stated as a list rather than implied by
 *   absence: times, fares, opening hours, a city-centre distance, and any
 *   description of either station building.
 *
 * Both station blocks carry their own quotation link, each prefilling the
 * pickup field with the station named unambiguously — the airport one says
 * "train, not a flight" in the field itself, because that is the one the lead
 * desk must not read as an airport job.
 *
 * The photograph is the generic Haramain train: a set in SAR livery on open
 * track, with no station and no identifiable city in frame. We hold no
 * photograph of either Jeddah station, and the project's only station
 * photographs are of Riyadh.
 */
export default async function JeddahHaramainStationTransfersPage({
  params,
}: PageProps<"/[locale]/jeddah-haramain-station-transfers">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const photo = image(content.imageKey);

  /** Generic entry point: the reader has not told us the station yet. */
  const quoteHref = `${href(locale, "getQuote")}?pickup=${encodeURIComponent(
    locale === "ar"
      ? "محطة قطار الحرمين، جدة"
      : "Haramain railway station, Jeddah"
  )}`;

  /** Per-station entry points, with the station named in the field itself. */
  const stationQuoteHref = (prefill: string) =>
    `${href(locale, "getQuote")}?pickup=${encodeURIComponent(prefill)}`;

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

      {/* ---- Hero: the ticket stub ---------------------------------------- */}
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
          className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/95 via-ink/90 to-ink/97"
        />

        <div className="site-container pt-28 pb-14 md:pt-30 lg:pt-36 lg:pb-20">
          <Breadcrumbs locale={locale} crumbs={crumbs(locale)} tone="invert" />

          <div className="mt-8 grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-14">
            <div>
              <p className="text-eyebrow text-brass">
                {content.eyebrow[locale]}
              </p>
              <h1 className="text-h1 mt-4 text-balance text-white">
                {content.title[locale]}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85">
                {content.standfirst[locale]}
              </p>

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
                  href="#stations"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/25 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  {content.secondaryCta[locale]}
                </a>
              </div>
            </div>

            {/*
              The signature element. A ticket, with everything that does not
              matter greyed back and the one field that does pulled out in
              brass. The perforation and its two punched notches are drawn
              rather than decorative: the stub below the tear carries the
              sentence the whole page is built to deliver.
            */}
            <figure className="relative rounded-2xl bg-white shadow-2xl ring-1 ring-white/15">
              <div className="p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-eyebrow text-palm">
                      {content.ticket.caption[locale]}
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-ink/50">
                      {content.ticket.subcaption[locale]}
                    </p>
                  </div>
                  <TrainFrontIcon
                    aria-hidden
                    className="size-6 shrink-0 text-brass-deep"
                  />
                </div>

                {/* The fields that are not the point, shown as such. */}
                <dl className="mt-6 grid grid-cols-2 gap-4">
                  {content.ticket.quietFields.map((field) => (
                    <div key={field.label.en}>
                      <dt className="text-eyebrow text-ink/35">
                        {field.label[locale]}
                      </dt>
                      <dd className="mt-1 text-sm text-ink/35">
                        {field.value[locale]}
                      </dd>
                    </div>
                  ))}
                </dl>

                {/* The field that is. */}
                <div className="mt-5 rounded-xl border border-brass/50 bg-brass/10 p-4 sm:p-5">
                  <div className="flex items-center gap-2">
                    <TicketIcon
                      aria-hidden
                      className="size-4 shrink-0 text-brass-deep"
                    />
                    <p className="text-eyebrow text-brass-deep">
                      {content.ticket.fieldLabel[locale]}
                    </p>
                  </div>

                  <ul className="mt-4 flex flex-col gap-2.5">
                    {content.ticket.options.map((option) => (
                      <li
                        key={option.name.en}
                        className="flex items-start gap-2.5 rounded-lg bg-white/70 px-3 py-2.5"
                      >
                        <span
                          aria-hidden
                          className="mt-0.5 size-3.5 shrink-0 rounded-sm border border-brass-deep/50"
                        />
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold leading-snug text-ink">
                            {option.name[locale]}
                          </span>
                          <span className="block text-xs text-ink/55">
                            {option.hint[locale]}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-4 text-xs leading-relaxed text-ink/60">
                    {content.ticket.fieldNote[locale]}
                  </p>
                </div>
              </div>

              {/* The tear: two punched notches and a dashed rule. */}
              <div aria-hidden className="relative h-0">
                <span className="absolute left-0 top-0 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink" />
                <span className="absolute right-0 top-0 size-5 translate-x-1/2 -translate-y-1/2 rounded-full bg-ink" />
                <span className="absolute inset-x-5 top-0 border-t border-dashed border-ink/25" />
              </div>

              <figcaption className="px-6 pt-6 pb-6 sm:px-7">
                <p className="text-sm font-medium leading-relaxed text-ink/75">
                  {content.ticket.stub[locale]}
                </p>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ---- Why you cannot guess ----------------------------------------- */}
      <section className="section-y border-t border-border">
        <div className="site-container">
          <div className="max-w-3xl">
            <p className="text-eyebrow text-brass-deep">
              {content.sameLine.eyebrow[locale]}
            </p>
            <h2 className="text-h2 mt-4 text-balance text-ink">
              {content.sameLine.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              {content.sameLine.lead[locale]}
            </p>

            {content.sameLine.paragraphs.map((paragraph) => (
              <p
                key={paragraph.en}
                className="mt-4 leading-relaxed text-ink/80"
              >
                {paragraph[locale]}
              </p>
            ))}

            <p className="mt-8 border-s-2 border-palm/40 ps-5 text-sm leading-relaxed text-muted-foreground">
              {content.sameLine.footnote[locale]}
            </p>
          </div>
        </div>
      </section>

      {/* ---- The two stations --------------------------------------------- */}
      <section
        id="stations"
        className="section-y scroll-mt-24 border-t border-border bg-sand"
      >
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-h2 text-balance text-ink">
              {content.stations.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              {content.stations.lead[locale]}
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-6">
            {content.stations.items.map((station) => (
              <article
                key={station.key}
                className="rounded-2xl bg-card p-7 ring-1 ring-ink/8 lg:p-9"
              >
                <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,18rem)] lg:gap-12">
                  <div>
                    <p className="text-eyebrow text-brass-deep">
                      {station.kicker[locale]}
                    </p>
                    <h3
                      id={`station-${station.key}`}
                      className="text-h3 mt-3 text-balance text-ink"
                    >
                      {station.name[locale]}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {station.aka[locale]}
                    </p>
                    <p className="mt-5 text-lg leading-relaxed text-ink/80">
                      {station.lead[locale]}
                    </p>

                    {station.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph.en}
                        className="mt-4 leading-relaxed text-ink/75"
                      >
                        {paragraph[locale]}
                      </p>
                    ))}
                  </div>

                  {/* The published facts, and only those. */}
                  <div className="rounded-xl border border-border bg-sand/70 p-5">
                    <dl className="flex flex-col gap-4">
                      {station.facts.map((fact) => (
                        <div key={fact.label.en}>
                          <dt className="text-eyebrow text-ink/45">
                            {fact.label[locale]}
                          </dt>
                          <dd className="mt-1 text-sm leading-relaxed font-medium text-ink">
                            {fact.value[locale]}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <Link
                      href={stationQuoteHref(station.prefill[locale])}
                      className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-brass bg-brass/15 px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-brass/30"
                    >
                      {station.ctaLabel[locale]}
                      <ArrowRightIcon
                        aria-hidden
                        className="size-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100"
                      />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-6 flex items-start gap-2 text-sm text-muted-foreground">
            <MapPinIcon aria-hidden className="mt-0.5 size-4 shrink-0" />
            <span>{content.stations.footnote[locale]}</span>
          </p>
        </div>
      </section>

      {/* ---- Train anchor against flight anchor ---------------------------- */}
      <section className="section-y border-t border-border bg-ink">
        <div className="site-container">
          <div className="max-w-3xl">
            <p className="text-eyebrow text-brass">
              {content.anchor.eyebrow[locale]}
            </p>
            <h2 className="text-h2 mt-4 text-balance text-white">
              {content.anchor.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/80">
              {content.anchor.lead[locale]}
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {content.anchor.columns.map((column, index) => (
              <div
                key={column.title.en}
                className={cn(
                  "rounded-2xl p-7 lg:p-8",
                  index === 0
                    ? "bg-white/6 ring-1 ring-white/12"
                    : "bg-brass/12 ring-1 ring-brass/35"
                )}
              >
                <div className="flex items-center gap-2.5">
                  {index === 0 ? (
                    <PlaneIcon
                      aria-hidden
                      className="size-5 shrink-0 text-white/60"
                    />
                  ) : (
                    <TrainFrontIcon
                      aria-hidden
                      className="size-5 shrink-0 text-brass"
                    />
                  )}
                  <h3 className="text-h4 text-white">
                    {column.title[locale]}
                  </h3>
                </div>

                <p
                  className={cn(
                    "mt-5 text-2xl font-semibold text-balance",
                    index === 0 ? "text-white/55" : "text-brass"
                  )}
                >
                  {column.headline[locale]}
                </p>

                <ul className="mt-6 flex flex-col gap-3.5">
                  {column.points.map((point) => (
                    <li key={point.en} className="flex gap-3">
                      <span
                        aria-hidden
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-white/35"
                      />
                      <span className="leading-relaxed text-white/80">
                        {point[locale]}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-7 max-w-3xl text-sm leading-relaxed text-white/60">
            {content.anchor.footnote[locale]}
          </p>
        </div>
      </section>

      {/* ---- What to send -------------------------------------------------- */}
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
          </div>
        </div>
      </section>

      {/* ---- What we do not publish ---------------------------------------- */}
      <section className="section-y border-t border-border bg-sand">
        <div className="site-container">
          <div className="max-w-3xl rounded-2xl border border-brass/35 bg-brass/8 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <InfoIcon aria-hidden className="size-5 shrink-0 text-brass-deep" />
              <h2 className="text-h3 text-balance text-ink">
                {content.limits.heading[locale]}
              </h2>
            </div>
            <p className="mt-4 leading-relaxed text-ink/80">
              {content.limits.lead[locale]}
            </p>

            <ul className="mt-6 flex flex-col gap-4">
              {content.limits.items.map((item) => (
                <li
                  key={item.en}
                  className="border-s-2 border-brass/40 ps-4 leading-relaxed text-ink/75"
                >
                  {item[locale]}
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              {content.limits.footnote[locale]}
            </p>
          </div>
        </div>
      </section>

      {/* ---- Vehicles ------------------------------------------------------ */}
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

      {/* ---- Booking ------------------------------------------------------- */}
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

      {/* ---- FAQ ----------------------------------------------------------- */}
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

      {/* ---- CTA ----------------------------------------------------------- */}
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

      {/* ---- Related ------------------------------------------------------- */}
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
