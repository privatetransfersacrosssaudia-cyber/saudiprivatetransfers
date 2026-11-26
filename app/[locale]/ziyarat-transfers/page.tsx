import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  CarFrontIcon,
  CheckIcon,
  MessageCircleIcon,
  UsersIcon,
  XIcon,
} from "lucide-react";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ClusterFaqList } from "@/components/cluster/cluster-faq";
import { RelatedLinks } from "@/components/cluster/related-links";
import { HeroSentinel } from "@/components/layout/site-header";
import { JourneyPlanner } from "@/components/ziyarat/journey-planner";
import { ziyarat as content } from "@/lib/content/ziyarat";
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
}: PageProps<"/[locale]/ziyarat-transfers">): Promise<Metadata> {
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
 * Ziyarat transfers — the national hub of the Ziyarat cluster.
 *
 * Design concept — **the list is the journey**. Every other transfer on this
 * site has two fixed ends; Ziyarat is the one where the customer writes the
 * route, and the list they write decides the hours, the vehicle and the
 * price. Nothing can be quoted until it exists. So the page is built around
 * producing it: the planner is the signature element and the conversion
 * engine at once, composing a real enquiry as the visitor ticks rather than
 * printing a checklist for them to remember.
 *
 * That also keeps it from pre-empting the Makkah and Madinah Ziyarat pages
 * still to be written. Sites are **named so they can be ticked, and
 * otherwise left alone** — no history, no significance, no access rules, no
 * opening hours. Writing that here would make those pages duplicates before
 * they exist.
 *
 * The honest block is `includes.boundaries`: not a guided tour, not a
 * guarantee of access, not a fixed package, not religious guidance. A
 * Ziyarat page is the easiest page on a transport site to over-claim on, so
 * the limits are set out as plainly as the service is.
 *
 * Three photographs, each of the place it is captioned as and each used
 * once: Mount Uhud for the hero, the Great Mosque of Makkah for the Makkah
 * card, Quba Mosque for the Madinah card. No city's photograph is labelled
 * as another's, and the third destination card carries no image because the
 * project holds no honest photograph of "somewhere else".
 */
export default async function ZiyaratTransfersPage({
  params,
}: PageProps<"/[locale]/ziyarat-transfers">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const photo = image(content.imageKey);
  const quotePath = href(locale, "getQuote");
  const quoteHref = `${quotePath}?pickup=${encodeURIComponent(
    locale === "ar" ? "رحلة زيارة" : "Ziyarat journey"
  )}`;
  const whatsapp = whatsappUrl(content.whatsappMessage[locale]);

  const vehicles = content.vehicles.slugs
    .map((slug) => vehicleClasses.find((v) => v.slug === slug))
    .filter((v): v is (typeof vehicleClasses)[number] => Boolean(v));

  const pc = content.planner.copy;
  const plannerCopy = {
    cityLabel: pc.cityLabel[locale],
    sitesLabel: pc.sitesLabel[locale],
    sitesHint: pc.sitesHint[locale],
    passengersLabel: pc.passengersLabel[locale],
    passengersAny: pc.passengersAny[locale],
    notesLabel: pc.notesLabel[locale],
    pickupLabel: pc.pickupLabel[locale],
    pickupPlaceholder: pc.pickupPlaceholder[locale],
    summaryLabel: pc.summaryLabel[locale],
    emptyState: pc.emptyState[locale],
    carryOver: pc.carryOver[locale],
    cta: pc.cta[locale],
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
            <h1 className="text-display mt-4 text-balance text-white">
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
              href="#planner"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/25 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {content.secondaryCta[locale]}
            </a>
          </div>

          <p className="mt-5 text-xs text-white/50">
            {altText(photo, locale)}
          </p>
        </div>
      </section>

      {/* ---- No two days look the same ------------------------------------ */}
      <section className="section-y border-t border-border">
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-h2 text-balance text-ink">
              {content.intro.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              {content.intro.lead[locale]}
            </p>
          </div>

          <dl className="mt-10 grid gap-x-10 gap-y-7 md:grid-cols-2">
            {content.intro.items.map((item) => (
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

      {/* ---- Signature: the planner --------------------------------------- */}
      <section
        id="planner"
        className="section-y scroll-mt-24 border-t border-border bg-sand"
        aria-labelledby="planner-heading"
      >
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 id="planner-heading" className="text-h2 text-balance text-ink">
              {content.planner.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              {content.planner.lead[locale]}
            </p>
          </div>

          <div className="mt-9 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,18rem)] lg:items-start lg:gap-12">
            <JourneyPlanner
              locale={locale}
              cities={content.planner.cities}
              notes={content.planner.notes}
              copy={plannerCopy}
              quotePath={quotePath}
            />

            {/* The things the form cannot carry, listed so they are not lost. */}
            <aside className="rounded-2xl border border-border bg-background p-6">
              <h3 className="text-sm font-semibold text-ink">
                {content.planner.copy.notesLabel[locale]}
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {content.planner.notes.map((note) => (
                  <li key={note.id} className="flex gap-2.5">
                    <CheckIcon
                      aria-hidden
                      className="mt-1 size-3.5 shrink-0 text-palm"
                    />
                    <span className="text-sm leading-relaxed text-ink/75">
                      {note[locale]}
                    </span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* ---- Destination cards --------------------------------------------- */}
      <section className="section-y border-t border-border">
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-h2 text-balance text-ink">
              {content.destinations.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              {content.destinations.lead[locale]}
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {content.destinations.items.map((item) => {
              const shot = item.imageKey ? image(item.imageKey) : null;
              return (
                <article
                  key={item.key}
                  className="flex flex-col overflow-hidden rounded-2xl bg-card ring-1 ring-ink/8"
                >
                  {shot ? (
                    <Image
                      src={shot.src}
                      alt={altText(shot, locale)}
                      width={shot.width}
                      height={shot.height}
                      placeholder="blur"
                      blurDataURL={shot.blurDataURL}
                      loading="lazy"
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="aspect-4/3 w-full object-cover"
                    />
                  ) : (
                    <div
                      aria-hidden
                      className="flex aspect-4/3 w-full items-center justify-center bg-palm/10"
                    >
                      <span className="text-5xl font-semibold text-palm/35">
                        ?
                      </span>
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-h4 text-balance text-ink">
                      {item.name[locale]}
                    </h3>
                    <p className="mt-3 leading-relaxed text-ink/75">
                      {item.covers[locale]}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-ink/70">
                      {item.who[locale]}
                    </p>
                    <p className="mt-4 border-s-2 border-brass/45 ps-4 text-sm leading-relaxed text-ink/70">
                      {item.note[locale]}
                    </p>

                    <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-6">
                      {item.link ? (
                        <Link
                          href={href(locale, item.link.routeKey)}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-palm underline-offset-4 hover:text-palm-deep hover:underline"
                        >
                          {item.link.label[locale]}
                          <ArrowRightIcon
                            aria-hidden
                            className="size-3.5 rtl:-scale-x-100"
                          />
                        </Link>
                      ) : null}
                      <Link
                        href={quoteHref}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-brass-deep underline-offset-4 hover:underline"
                      >
                        {content.primaryCta[locale]}
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---- What it is, and what it is not --------------------------------- */}
      <section className="section-y border-t border-border bg-ink">
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-h2 text-balance text-white">
              {content.includes.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/80">
              {content.includes.lead[locale]}
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl bg-palm/20 p-7 ring-1 ring-palm/40 lg:p-8">
              <ul className="flex flex-col gap-3.5">
                {content.includes.items.map((item) => (
                  <li key={item.en} className="flex gap-3">
                    <CheckIcon
                      aria-hidden
                      className="mt-1 size-4 shrink-0 text-brass"
                    />
                    <span className="leading-relaxed text-white/85">
                      {item[locale]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-white/6 p-7 ring-1 ring-white/12 lg:p-8">
              <h3 className="text-h4 text-white">
                {content.includes.boundaries.heading[locale]}
              </h3>
              <ul className="mt-5 flex flex-col gap-3.5">
                {content.includes.boundaries.items.map((item) => (
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
        </div>
      </section>

      {/* ---- Journey formats -------------------------------------------------- */}
      <section className="section-y border-t border-border bg-sand">
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-h2 text-balance text-ink">
              {content.formats.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              {content.formats.lead[locale]}
            </p>
          </div>

          <dl className="mt-10 max-w-3xl divide-y divide-border rounded-2xl bg-card ring-1 ring-ink/8">
            {content.formats.rows.map((row) => (
              <div
                key={row.name.en}
                className="grid gap-1 p-5 sm:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] sm:gap-6 sm:p-6"
              >
                <dt className="font-semibold text-ink">{row.name[locale]}</dt>
                <dd className="leading-relaxed text-ink/75">
                  {row.detail[locale]}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {content.formats.footnote[locale]}
          </p>
        </div>
      </section>

      {/* ---- Vehicles ---------------------------------------------------------- */}
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

      {/* ---- Planning a comfortable day ------------------------------------------ */}
      <section className="section-y border-t border-border bg-sand">
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-h2 text-balance text-ink">
              {content.planning.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              {content.planning.lead[locale]}
            </p>
          </div>

          <ol className="mt-10 grid gap-x-10 gap-y-7 md:grid-cols-2 lg:grid-cols-3">
            {content.planning.items.map((item, index) => (
              <li key={item.title.en}>
                <span
                  aria-hidden
                  className="numeric text-sm font-semibold text-brass-deep"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1 font-semibold text-ink">
                  {item.title[locale]}
                </h3>
                <p className="mt-2 leading-relaxed text-ink/75">
                  {item.body[locale]}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---- Process --------------------------------------------------------------- */}
      <section className="section-y border-t border-border">
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-h2 text-balance text-ink">
              {content.process.heading[locale]}
            </h2>
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

      {/* ---- FAQ --------------------------------------------------------------------- */}
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

      {/* ---- CTA --------------------------------------------------------------------- */}
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

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
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

      {/* ---- Related -------------------------------------------------------------------- */}
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
