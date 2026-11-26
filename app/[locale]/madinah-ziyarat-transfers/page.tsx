import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  CarFrontIcon,
  FootprintsIcon,
  InfoIcon,
  MessageCircleIcon,
  UsersIcon,
} from "lucide-react";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ClusterFaqList } from "@/components/cluster/cluster-faq";
import { RelatedLinks } from "@/components/cluster/related-links";
import { HeroSentinel } from "@/components/layout/site-header";
import { MadinahPlanner } from "@/components/ziyarat/madinah-planner";
import { madinahZiyarat as content } from "@/lib/content/madinah-ziyarat";
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
}: PageProps<"/[locale]/madinah-ziyarat-transfers">): Promise<Metadata> {
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

/** Three levels: this sits under the national Ziyarat service page. */
const crumbs = (locale: Locale): Crumb[] => [
  { name: ui.home[locale], routeKey: "home" },
  {
    name: { en: "Ziyarat transfers", ar: "النقل للزيارة" }[locale],
    routeKey: "ziyaratTransfers",
  },
  { name: content.crumbLabel[locale], routeKey: content.routeKey },
];

/**
 * Madinah Ziyarat transfers.
 *
 * Design concept — **three directions, and one you can walk to**. Makkah's
 * Ziyarat sites differ by effort: two of them end in a long climb, so that
 * page is a route sheet annotated with what each visit asks of you. Madinah's
 * are nothing like that — mostly level, mostly drive-up — and what actually
 * varies is *where they are*. Quba south, Uhud north, Qiblatain and the Seven
 * Mosques west. Two stops in one direction is a short outing; one from each
 * is a different day.
 *
 * So the planner is a **three-column compass**, not a list and not a route
 * sheet, and the summary **counts directions rather than hours**. That is the
 * honest proxy for the size of the day: we cannot know how long a party will
 * linger at each place, so we describe how far the journey reaches across the
 * city instead of printing a duration we would be inventing.
 *
 * The honest moment is **Jannat al-Baqi**, and it is a stop we decline to
 * sell. It sits immediately beside the Prophet's Mosque and nearly everyone
 * walks there, so it is kept out of the selectable list and given its own
 * note saying a car is usually unnecessary. Telling a reader they do not need
 * the service is worth more than padding the list with it.
 *
 * **Madinah's access rule is not Makkah's and is not borrowed from it.**
 * Visit Saudi's wording — Madinah welcomes visitors from around the world,
 * access to certain sacred areas including Al Masjid an Nabawi is restricted
 * to Muslims — is used as the Madinah hub already uses it, and the page says
 * explicitly that this differs from Makkah's city-entry restriction.
 *
 * Masjid al-Ghamama is deliberately absent: research returned nothing
 * reliable on its current visitor arrangements, so it is an owner question
 * rather than a tick-box.
 */
export default async function MadinahZiyaratTransfersPage({
  params,
}: PageProps<"/[locale]/madinah-ziyarat-transfers">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const photo = image(content.imageKey);
  const quotePath = href(locale, "getQuote");
  const quoteHref = `${quotePath}?pickup=${encodeURIComponent(
    locale === "ar" ? "فندق في المدينة المنورة" : "Hotel in Madinah"
  )}`;
  const whatsapp = whatsappUrl(content.whatsappMessage[locale]);

  const vehicles = content.vehicles.slugs
    .map((slug) => vehicleClasses.find((v) => v.slug === slug))
    .filter((v): v is (typeof vehicleClasses)[number] => Boolean(v));

  const pc = content.planner.copy;

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
            <Link
              href={quoteHref}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/25 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {content.secondaryCta[locale]}
            </Link>
          </div>

          <p className="mt-5 text-xs text-white/50">{altText(photo, locale)}</p>
        </div>
      </section>

      {/* ---- Signature: the compass planner -------------------------------- */}
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

          <div className="mt-9">
            <MadinahPlanner
              locale={locale}
              quotePath={quotePath}
              directions={content.planner.directions.map((direction) => ({
                id: direction.id,
                heading: direction.heading[locale],
                bearing: direction.bearing[locale],
                stops: direction.stops.map((stop) => ({
                  id: stop.id,
                  name: stop[locale],
                  note: stop.note[locale],
                })),
              }))}
              copy={{
                pickupLabel: pc.pickupLabel[locale],
                pickupPlaceholder: pc.pickupPlaceholder[locale],
                passengersLabel: pc.passengersLabel[locale],
                passengersAny: pc.passengersAny[locale],
                summaryLabel: pc.summaryLabel[locale],
                emptyState: pc.emptyState[locale],
                oneDirection: pc.oneDirection[locale],
                twoDirections: pc.twoDirections[locale],
                threeDirections: pc.threeDirections[locale],
                carryOver: pc.carryOver[locale],
                cta: pc.cta[locale],
              }}
            />
          </div>

          {/* The stop we decline to sell. */}
          <div className="mt-8 max-w-3xl rounded-2xl border border-palm/35 bg-palm/8 p-6 sm:p-7">
            <h3 className="flex items-center gap-2.5 text-h4 text-balance text-ink">
              <FootprintsIcon
                aria-hidden
                className="size-5 shrink-0 text-palm-deep"
              />
              {content.planner.walkable.heading[locale]}
            </h3>
            <p className="mt-3 leading-relaxed text-ink/80">
              {content.planner.walkable.body[locale]}
            </p>
          </div>
        </div>
      </section>

      {/* ---- Access -------------------------------------------------------- */}
      <section className="section-y border-t border-border">
        <div className="site-container">
          <div className="max-w-3xl rounded-2xl border border-brass/35 bg-brass/8 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <InfoIcon aria-hidden className="size-5 shrink-0 text-brass-deep" />
              <h2 className="text-h3 text-balance text-ink">
                {content.access.heading[locale]}
              </h2>
            </div>
            <p className="mt-4 leading-relaxed text-ink/80">
              {content.access.body[locale]}
            </p>
            <p className="mt-4 leading-relaxed text-ink/80">
              {content.access.limit[locale]}
            </p>
            <p className="mt-4 border-s-2 border-brass/45 ps-4 text-sm leading-relaxed text-ink/70">
              {content.access.noGuide[locale]}
            </p>
          </div>
        </div>
      </section>

      {/* ---- Shapes --------------------------------------------------------- */}
      <section className="section-y border-t border-border bg-ink">
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-h2 text-balance text-white">
              {content.shapes.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/80">
              {content.shapes.lead[locale]}
            </p>
          </div>

          <dl className="mt-10 overflow-hidden rounded-2xl ring-1 ring-white/12">
            {content.shapes.rows.map((row, index) => (
              <div
                key={row.name.en}
                className={cnRow(index)}
              >
                <dt className="lg:col-span-3">
                  <span className="block font-semibold text-white">
                    {row.name[locale]}
                  </span>
                  <span className="mt-1 block text-sm text-white/55">
                    {row.who[locale]}
                  </span>
                </dt>
                <dd className="leading-relaxed text-white/80 lg:col-span-5">
                  {row.detail[locale]}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---- Pickup and return ------------------------------------------------ */}
      <section className="section-y border-t border-border">
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-h2 text-balance text-ink">
              {content.pickup.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              {content.pickup.lead[locale]}
            </p>
          </div>

          <ol className="mt-10 grid gap-x-10 gap-y-7 md:grid-cols-2">
            {content.pickup.items.map((item, index) => (
              <li key={item.title.en} className="border-s-2 border-palm/30 ps-5">
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

      {/* ---- Vehicles ---------------------------------------------------------- */}
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

      {/* ---- Process -------------------------------------------------------------- */}
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

      {/* ---- FAQ ------------------------------------------------------------------- */}
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

      {/* ---- CTA -------------------------------------------------------------------- */}
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

      {/* ---- Related ------------------------------------------------------------------ */}
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

/** Row chrome for the shapes table: alternating ground, no border on the last. */
function cnRow(index: number) {
  return [
    "grid gap-2 p-6 lg:grid-cols-8 lg:items-baseline lg:gap-8",
    index % 2 === 0 ? "bg-white/6" : "bg-white/3",
    index > 0 ? "border-t border-white/10" : "",
  ]
    .filter(Boolean)
    .join(" ");
}
