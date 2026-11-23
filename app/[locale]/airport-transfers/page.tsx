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
  XIcon,
} from "lucide-react";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ClusterFaqList } from "@/components/cluster/cluster-faq";
import { RelatedLinks } from "@/components/cluster/related-links";
import { HeroSentinel } from "@/components/layout/site-header";
import { TimezoneConverter } from "@/components/airport/timezone-converter";
import { airport as content } from "@/lib/content/airport";
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
}: PageProps<"/[locale]/airport-transfers">): Promise<Metadata> {
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
 * Airport transfers — the service page above the four airport pages.
 *
 * Design concept — **the handover**. Everything here is about one narrow
 * window: you walk out with your bags and either a car is there or it is
 * not. The page is built as two facing pathways rather than a feature list,
 * because an arrival and a departure are genuinely different jobs — one is
 * timed off an aircraft we are waiting for, the other off a desk that
 * closes — and they ask different things of the traveller.
 *
 * Three things make it a service page rather than a fifth airport page:
 *
 * - **It states no distances and no terminal detail.** Those belong to the
 *   four airport pages and are linked, not restated, so this page cannot
 *   cannibalise the pages it exists to feed.
 * - **The flight-coordination band is honest about being manual.** There is
 *   no flight-data integration in this repository — `flight` is a free-text
 *   field that reaches a person. The band says so, and a second column says
 *   plainly what the service is *not*: no live tracking, no unlimited
 *   waiting, no guarantee that any delay is absorbed, no control over where
 *   the airport lets a car wait.
 * - **The time-zone converter** is the one genuinely useful tool a traveller
 *   from Sydney or London needs before they can fill in the form at all,
 *   and it is the only interactive element on the page. Its arithmetic lives
 *   in `lib/timezone.ts` and is tested against daylight-saving and
 *   date-boundary cases; it adds no dependency.
 *
 * Imagery is restricted to the genuine Saudi airport photography the project
 * already holds — Jeddah's King Abdulaziz terminal, King Khalid's concourse,
 * King Khalid's domestic departures hall — each used once and captioned as
 * the airport it actually shows. The project holds no photographs of
 * vehicles, drivers or travellers, so none appear: a stock car beside a
 * service claim would imply a fleet we have not confirmed.
 */
export default async function AirportTransfersPage({
  params,
}: PageProps<"/[locale]/airport-transfers">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const photo = image(content.imageKey);

  const quoteHref = `${href(locale, "getQuote")}?pickup=${encodeURIComponent(
    locale === "ar" ? "مطار في السعودية" : "Saudi airport"
  )}`;

  const pathHref = (pickup: string, dropoff: string) =>
    `${href(locale, "getQuote")}?pickup=${encodeURIComponent(
      pickup
    )}&dropoff=${encodeURIComponent(dropoff)}`;

  const vehicles = content.vehicles.slugs
    .map((slug) => vehicleClasses.find((v) => v.slug === slug))
    .filter((v): v is (typeof vehicleClasses)[number] => Boolean(v));

  const tz = content.timezone;
  const converterCopy = {
    fromLabel: tz.copy.fromLabel[locale],
    toLabel: tz.copy.toLabel[locale],
    dateLabel: tz.copy.dateLabel[locale],
    timeLabel: tz.copy.timeLabel[locale],
    resultLabel: tz.copy.resultLabel[locale],
    emptyState: tz.copy.emptyState[locale],
    sameDay: tz.copy.sameDay[locale],
    nextDay: tz.copy.nextDay[locale],
    previousDay: tz.copy.previousDay[locale],
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
          className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/93 via-ink/89 to-ink/97"
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
              href="#pathways"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/25 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {content.secondaryCta[locale]}
            </a>
          </div>

          <div className="mt-10 border-t border-white/15 pt-6">
            <p className="text-eyebrow text-white/50">
              {content.heroAirports.label[locale]}
            </p>
            <ul className="mt-3 flex flex-wrap gap-2.5">
              {content.heroAirports.items.map((item) => (
                <li key={item.routeKey}>
                  <Link
                    href={href(locale, item.routeKey)}
                    className="numeric inline-flex rounded-full border border-white/25 px-3.5 py-1.5 text-sm text-white/85 transition-colors hover:border-brass hover:text-brass"
                  >
                    {item.name[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---- Signature: the two pathways ---------------------------------- */}
      <section
        id="pathways"
        className="scroll-mt-24 border-t border-border"
        aria-labelledby="pathways-heading"
      >
        <div className="site-container section-y">
          <div className="max-w-3xl">
            <h2 id="pathways-heading" className="text-h2 text-balance text-ink">
              {content.pathways.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              {content.pathways.lead[locale]}
            </p>
          </div>
        </div>

        {content.pathways.items.map((path, index) => {
          const shot = image(path.imageKey);
          const isArrival = path.key === "arrivals";

          return (
            <div
              key={path.key}
              className={cn(
                "border-t border-border",
                isArrival ? "bg-sand" : "bg-background"
              )}
            >
              <div className="site-container section-y">
                <div
                  className={cn(
                    "grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14",
                    // The photograph leads on one side and trails on the
                    // other, so the two bands do not read as one template
                    // repeated twice.
                    index % 2 === 1 && "lg:[&>figure]:order-last"
                  )}
                >
                  <figure className="overflow-hidden rounded-2xl">
                    <Image
                      src={shot.src}
                      alt={altText(shot, locale)}
                      width={shot.width}
                      height={shot.height}
                      placeholder="blur"
                      blurDataURL={shot.blurDataURL}
                      loading="lazy"
                      sizes="(min-width: 1024px) 45vw, 100vw"
                      className="aspect-4/3 w-full object-cover"
                    />
                    <figcaption className="mt-2.5 text-xs text-muted-foreground">
                      {altText(shot, locale)}
                    </figcaption>
                  </figure>

                  <div>
                    <p className="flex items-center gap-2.5 text-eyebrow text-brass-deep">
                      {isArrival ? (
                        <PlaneLandingIcon aria-hidden className="size-4" />
                      ) : (
                        <PlaneTakeoffIcon aria-hidden className="size-4" />
                      )}
                      {path.eyebrow[locale]}
                    </p>
                    <h3 className="text-h3 mt-3 text-balance text-ink">
                      {path.heading[locale]}
                    </h3>
                    <p className="mt-4 text-lg leading-relaxed text-ink/80">
                      {path.lead[locale]}
                    </p>

                    <ul className="mt-6 flex flex-col gap-2.5">
                      {path.requests.map((request) => (
                        <li key={request.en} className="flex gap-3">
                          <CheckIcon
                            aria-hidden
                            className="mt-1 size-4 shrink-0 text-palm"
                          />
                          <span className="leading-relaxed text-ink/80">
                            {request[locale]}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={pathHref(
                        path.prefill.pickup[locale],
                        path.prefill.dropoff[locale]
                      )}
                      className="group mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-palm px-5 text-sm font-semibold text-white transition-colors hover:bg-palm-deep"
                    >
                      {path.ctaLabel[locale]}
                      <ArrowRightIcon
                        aria-hidden
                        className="size-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100"
                      />
                    </Link>
                  </div>
                </div>

                {/* What the enquiry needs, in this direction. */}
                <dl className="mt-12 grid gap-x-10 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
                  {path.needs.map((need) => (
                    <div
                      key={need.label.en}
                      className="border-s-2 border-palm/30 ps-5"
                    >
                      <dt className="font-semibold text-ink">
                        {need.label[locale]}
                      </dt>
                      <dd className="mt-1.5 leading-relaxed text-ink/75">
                        {need.detail[locale]}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-10 max-w-3xl rounded-2xl border border-brass/35 bg-brass/8 p-6">
                  <h4 className="text-h4 text-balance text-ink">
                    {path.pivot.heading[locale]}
                  </h4>
                  <p className="mt-3 leading-relaxed text-ink/80">
                    {path.pivot.body[locale]}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* ---- Flight coordination ------------------------------------------ */}
      <section className="section-y border-t border-border bg-ink">
        <div className="site-container">
          <div className="max-w-3xl">
            <p className="text-eyebrow text-brass">
              {content.coordination.eyebrow[locale]}
            </p>
            <h2 className="text-h2 mt-4 text-balance text-white">
              {content.coordination.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/80">
              {content.coordination.lead[locale]}
            </p>
          </div>

          <ol className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
            {content.coordination.steps.map((step, index) => (
              <li key={step.title.en}>
                <span
                  aria-hidden
                  className="numeric flex size-8 items-center justify-center rounded-full bg-brass text-sm font-semibold text-ink"
                >
                  {index + 1}
                </span>
                <h3 className="mt-3 font-semibold text-white">
                  {step.title[locale]}
                </h3>
                <p className="mt-1.5 leading-relaxed text-white/75">
                  {step.body[locale]}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-12 max-w-3xl rounded-2xl bg-white/6 p-7 ring-1 ring-white/12">
            <h3 className="text-h4 text-white">
              {content.coordination.limits.heading[locale]}
            </h3>
            <ul className="mt-5 flex flex-col gap-3.5">
              {content.coordination.limits.items.map((item) => (
                <li key={item.en} className="flex gap-3">
                  <XIcon
                    aria-hidden
                    className="mt-1 size-4 shrink-0 text-white/45"
                  />
                  <span className="leading-relaxed text-white/80">
                    {item[locale]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---- Time-zone converter ------------------------------------------- */}
      <section className="section-y border-t border-border bg-sand">
        <div className="site-container">
          <div className="max-w-3xl">
            <p className="text-eyebrow text-brass-deep">{tz.eyebrow[locale]}</p>
            <h2 className="text-h2 mt-4 text-balance text-ink">
              {tz.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              {tz.lead[locale]}
            </p>
          </div>

          <div className="mt-9 max-w-3xl">
            <TimezoneConverter locale={locale} copy={converterCopy} />
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              {tz.disclaimer[locale]}
            </p>
          </div>
        </div>
      </section>

      {/* ---- Airport coverage ----------------------------------------------- */}
      <section className="section-y border-t border-border">
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-h2 text-balance text-ink">
              {content.coverage.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              {content.coverage.lead[locale]}
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {content.coverage.items.map((item) => (
              <Link
                key={item.routeKey}
                href={href(locale, item.routeKey)}
                className="group flex flex-col rounded-2xl bg-card p-7 ring-1 ring-ink/8 transition-shadow hover:ring-2 hover:ring-brass/50"
              >
                <p className="numeric text-eyebrow text-brass-deep">
                  {item.city[locale]}
                </p>
                <h3 className="text-h4 mt-2 text-balance text-ink">
                  {item.name[locale]}
                </h3>
                <p className="mt-3 flex-1 leading-relaxed text-ink/75">
                  {item.note[locale]}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink group-hover:text-brass-deep">
                  {locale === "ar" ? "صفحة المطار" : "The airport page"}
                  <ArrowRightIcon
                    aria-hidden
                    className="size-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100"
                  />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-8 max-w-3xl rounded-2xl border border-palm/30 bg-palm/8 p-6 sm:p-7">
            <h3 className="text-h4 text-balance text-ink">
              {content.coverage.elsewhere.heading[locale]}
            </h3>
            <p className="mt-3 leading-relaxed text-ink/80">
              {content.coverage.elsewhere.body[locale]}
            </p>
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

          <p className="mt-8 max-w-3xl leading-relaxed text-ink/80">
            {content.vehicles.groupNote[locale]}
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            {content.vehicles.footnote[locale]}
          </p>
        </div>
      </section>

      {/* ---- After you enquire ------------------------------------------------ */}
      <section className="section-y border-t border-border">
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

      {/* ---- FAQ --------------------------------------------------------------- */}
      <section className="section-y border-t border-border bg-sand">
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

      {/* ---- CTA --------------------------------------------------------------- */}
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

      {/* ---- Related ------------------------------------------------------------ */}
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
