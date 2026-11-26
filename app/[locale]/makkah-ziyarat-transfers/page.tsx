import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  CarFrontIcon,
  InfoIcon,
  MessageCircleIcon,
  UsersIcon,
  XIcon,
} from "lucide-react";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ClusterFaqList } from "@/components/cluster/cluster-faq";
import { RelatedLinks } from "@/components/cluster/related-links";
import { HeroSentinel } from "@/components/layout/site-header";
import { MakkahPlanner } from "@/components/ziyarat/makkah-planner";
import { makkahZiyarat as content } from "@/lib/content/makkah-ziyarat";
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
}: PageProps<"/[locale]/makkah-ziyarat-transfers">): Promise<Metadata> {
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
 * Makkah Ziyarat transfers.
 *
 * Design concept — **the drive and the visit are two different things**.
 * Every competitor page lists the same places and lets you assume the car
 * delivers you to all of them equally. It does not: Jabal Thawr ends in a
 * climb that published guidance puts well over an hour, Jabal al-Nour is the
 * same again, and Masjid al-Jinn is a doorway you walk through. The
 * transport is identical; the visits are nothing alike. For anyone
 * travelling with a grandparent that is the single most useful thing this
 * page can tell them, and it has to be said before they book.
 *
 * So the planner is a **route sheet** rather than the national page's chip
 * picker: each stop is a full-width row carrying that straight line about
 * what the place asks of you, and ticking it appends to a numbered
 * itinerary. The honest note sits on the control the visitor is actually
 * reading rather than in prose further down.
 *
 * **Mashaer destinations are absent by construction.** Mina, Arafat,
 * Muzdalifah and Jabal Rahmah appear nowhere — not in the planner, not in a
 * card, not in a prefill, not in an example. The page states the exclusion
 * outright rather than leaving it to inference, and the same two stops were
 * removed from `lib/content/ziyarat.ts` in this change, before that page had
 * shipped.
 *
 * Eight stops, all verified outside the Mashaer. The Kiswah complex and
 * Al-Hudaybiyyah were held back on the first pass and added once the owner
 * confirmed both are served, with the pickup and the arrangement confirmed
 * at quotation and booking. Neither claims we obtain an appointment: the
 * Kiswah complex grants its own entry and its published hours contradict
 * each other, so the page promises the journey rather than the door.
 */
export default async function MakkahZiyaratTransfersPage({
  params,
}: PageProps<"/[locale]/makkah-ziyarat-transfers">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const photo = image(content.imageKey);
  const quotePath = href(locale, "getQuote");
  const quoteHref = `${quotePath}?pickup=${encodeURIComponent(
    locale === "ar" ? "فندق في مكة المكرمة" : "Hotel in Makkah"
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
              {content.cta.button[locale]}
            </Link>
          </div>

          <p className="mt-5 text-xs text-white/50">{altText(photo, locale)}</p>
        </div>
      </section>

      {/* ---- Entry rules, before anything else ---------------------------- */}
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
              {content.access.seasonal[locale]}
            </p>

            <div className="mt-6 border-t border-brass/25 pt-5">
              <h3 className="flex items-center gap-2 font-semibold text-ink">
                <XIcon aria-hidden className="size-4 shrink-0 text-ink/50" />
                {content.access.excluded.heading[locale]}
              </h3>
              <p className="mt-2 leading-relaxed text-ink/75">
                {content.access.excluded.body[locale]}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Signature: the route sheet ----------------------------------- */}
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

          <div className="mt-9 max-w-3xl">
            <MakkahPlanner
              locale={locale}
              quotePath={quotePath}
              stops={content.planner.stops.map((stop) => ({
                id: stop.id,
                name: stop[locale],
                tag: stop.tag[locale],
                effort: stop.effort[locale],
              }))}
              copy={{
                pickupLabel: pc.pickupLabel[locale],
                pickupPlaceholder: pc.pickupPlaceholder[locale],
                passengersLabel: pc.passengersLabel[locale],
                passengersAny: pc.passengersAny[locale],
                stopsLabel: pc.stopsLabel[locale],
                summaryLabel: pc.summaryLabel[locale],
                emptyState: pc.emptyState[locale],
                orderNote: pc.orderNote[locale],
                carryOver: pc.carryOver[locale],
                cta: pc.cta[locale],
              }}
            />
          </div>
        </div>
      </section>

      {/* ---- Three decisions ----------------------------------------------- */}
      <section className="section-y border-t border-border">
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-h2 text-balance text-ink">
              {content.comparisons.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              {content.comparisons.lead[locale]}
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {content.comparisons.blocks.map((block) => (
              <div
                key={block.title.en}
                className="rounded-2xl bg-card p-6 ring-1 ring-ink/8"
              >
                <h3 className="text-h4 text-balance text-ink">
                  {block.title[locale]}
                </h3>
                <dl className="mt-5 flex flex-col divide-y divide-border">
                  {block.rows.map((row) => (
                    <div key={row.name.en} className="py-3.5 first:pt-0 last:pb-0">
                      <dt className="text-sm font-semibold text-ink">
                        {row.name[locale]}
                      </dt>
                      <dd className="mt-1 text-sm leading-relaxed text-ink/70">
                        {row.detail[locale]}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
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

      {/* ---- Process ----------------------------------------------------------- */}
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

      {/* ---- FAQ ----------------------------------------------------------------- */}
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

      {/* ---- CTA ------------------------------------------------------------------ */}
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

      {/* ---- Related ---------------------------------------------------------------- */}
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
