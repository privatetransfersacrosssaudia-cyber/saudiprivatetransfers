import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  CarFrontIcon,
  CheckIcon,
  RepeatIcon,
  TrainFrontIcon,
  UsersIcon,
} from "lucide-react";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ClusterFaqList } from "@/components/cluster/cluster-faq";
import { RelatedLinks } from "@/components/cluster/related-links";
import { HeroSentinel } from "@/components/layout/site-header";
import { jeddahMadinah as content } from "@/lib/content/jeddah/madinah";
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
}: PageProps<"/[locale]/jeddah-to-madinah">): Promise<Metadata> {
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

/** Three levels: the corridor is a child of the Jeddah hub. */
const crumbs = (locale: Locale): Crumb[] => [
  { name: ui.home[locale], routeKey: "home" },
  { name: { en: "Jeddah", ar: "جدة" }[locale], routeKey: "jeddah" },
  { name: content.crumbLabel[locale], routeKey: content.routeKey },
];

/**
 * Jeddah → Madinah.
 *
 * Design concept — "count the handovers, not the hours". The research left no
 * room for a balanced speed comparison: the Haramain train does this corridor
 * in well under half the driving time, and one of its stations is inside
 * Jeddah's airport terminal. A page that staged a fair fight on speed would be
 * lying.
 *
 * So the page concedes speed in the standfirst and argues on the one axis the
 * car genuinely wins — how many times you and your luggage change vehicles —
 * and the central object is a **handover diagram** built for that argument:
 * three stacked bars, segmented into road and rail legs, each captioned with
 * its handover count. Starting at the airport the rail bar has two segments;
 * starting at a hotel it has three; the car bar has one. The shape of the bars
 * makes the point before the prose does.
 *
 * Nothing else in the project uses segmented bars. The Makkah ↔ Madinah
 * corridor positions stages along a single rule by kilometre and awards
 * verdict chips; this measures a different quantity and draws it differently,
 * which is the point — two corridor pages, two arguments, two objects.
 *
 * The bars are decorative: every label, time and handover count they carry is
 * also real text in the same block, so nothing is lost when they collapse on a
 * narrow screen. Segment widths come from `weight` via flex-grow, so the bar
 * reverses correctly in Arabic without a second set of geometry.
 *
 * `imageKey` is the Madinah skyline rather than a highway photograph. The
 * project holds no photograph of this road: `route-highway40-west` is Highway
 * 40 at the Tuwaiq escarpment (the Riyadh–Makkah road) and `svc-intercity` is
 * Highway 60, neither of which is the Jeddah–Madinah route. Showing the
 * destination is true; showing another road as if it were this one is not.
 */
export default async function JeddahToMadinahPage({
  params,
}: PageProps<"/[locale]/jeddah-to-madinah">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const photo = image(content.imageKey);

  const quoteHref = `${href(locale, "getQuote")}?pickup=${encodeURIComponent(
    locale === "ar" ? "جدة" : "Jeddah"
  )}&dropoff=${encodeURIComponent(
    locale === "ar" ? "المدينة المنورة" : "Madinah"
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
              href="#compare"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/25 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <TrainFrontIcon aria-hidden className="size-4" />
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

      {/* ---- The handover diagram ----------------------------------------- */}
      <section id="compare" className="section-y scroll-mt-24">
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-h2 text-balance text-ink">
              {content.compare.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              {content.compare.lead[locale]}
            </p>

            <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span
                  aria-hidden
                  className="h-2.5 w-6 rounded-full bg-palm"
                />
                {content.compare.legend.road[locale]}
              </li>
              <li className="flex items-center gap-2">
                <span
                  aria-hidden
                  className="h-2.5 w-6 rounded-full bg-brass"
                />
                {content.compare.legend.rail[locale]}
              </li>
            </ul>
          </div>

          <div className="mt-10 flex flex-col gap-5">
            {content.compare.options.map((option) => (
              <div
                key={option.key}
                className={cn(
                  "rounded-2xl border p-6 sm:p-7",
                  option.key === "car"
                    ? "border-palm/35 bg-palm-soft/40"
                    : "border-border bg-card"
                )}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                  <h3 className="text-h4 text-balance text-ink">
                    {option.label[locale]}
                  </h3>
                  <p className="numeric text-sm font-semibold text-brass-deep">
                    {option.time[locale]}
                  </p>
                </div>

                {/*
                  The bar. Decorative: every segment label is repeated as text
                  directly beneath it, so the meaning survives on a narrow
                  screen and for anyone who cannot see the colours.
                */}
                <div aria-hidden className="mt-5 flex gap-1">
                  {option.segments.map((segment, index) => (
                    <span
                      key={`${option.key}-${index}`}
                      style={{ flexGrow: segment.weight }}
                      className={cn(
                        "h-3 rounded-full",
                        segment.kind === "rail" ? "bg-brass" : "bg-palm"
                      )}
                    />
                  ))}
                </div>

                <ol className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-sm">
                  {option.segments.map((segment, index) => (
                    <li
                      key={`${option.key}-label-${index}`}
                      className="flex items-center gap-2"
                    >
                      {index > 0 ? (
                        <RepeatIcon
                          aria-hidden
                          className="size-3.5 shrink-0 text-muted-foreground"
                        />
                      ) : null}
                      <span className="text-ink/80">
                        {segment.label[locale]}
                      </span>
                    </li>
                  ))}
                </ol>

                <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-muted-foreground">
                  {option.handoverLabel[locale]}
                </p>

                <p className="mt-4 leading-relaxed text-ink/75">
                  {option.note[locale]}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {content.compare.footnote[locale]}
          </p>
        </div>
      </section>

      {/* ---- When the car is the better answer ---------------------------- */}
      <section className="section-y border-t border-border bg-sand">
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-h2 text-balance text-ink">
              {content.carFor.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              {content.carFor.lead[locale]}
            </p>
          </div>

          <dl className="mt-10 grid gap-x-10 gap-y-7 md:grid-cols-2">
            {content.carFor.cases.map((item) => (
              <div key={item.title.en} className="border-s-2 border-palm/30 ps-5">
                <dt className="font-semibold text-ink">{item.title[locale]}</dt>
                <dd className="mt-1.5 leading-relaxed text-ink/75">
                  {item.body[locale]}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---- The drive ---------------------------------------------------- */}
      <section className="section-y border-t border-border">
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-h2 text-balance text-ink">
              {content.road.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              {content.road.lead[locale]}
            </p>
          </div>

          <dl className="mt-10 grid gap-x-10 gap-y-7 md:grid-cols-2">
            {content.road.points.map((point) => (
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

          <p className="mt-10 max-w-3xl rounded-xl border border-border bg-card p-5 text-sm leading-relaxed text-ink/75">
            {content.road.footnote[locale]}
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
