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
  XIcon,
} from "lucide-react";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ClusterFaqList } from "@/components/cluster/cluster-faq";
import { RelatedLinks } from "@/components/cluster/related-links";
import { hotel as content } from "@/lib/content/hotel";
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
}: PageProps<"/[locale]/hotel-transfers">): Promise<Metadata> {
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
 * Hotel transfers — the service page above the two city hotel pages.
 *
 * Design concept — **which end is the hotel on?** Every hotel enquiry is one
 * of four shapes, and the shape decides what the enquiry needs far more than
 * the city does. So the signature element is a set of four cards, each
 * carrying a small **position diagram**: a two-node line where the hotel node
 * is filled in brass and the other is outlined, and the open-ended shape
 * trails off into a dashed node. Someone recognises their own journey by its
 * picture before they read a word of it.
 *
 * It deliberately collides with neither city page. `riyadh-hotel-transfers`
 * owns the entrance question — which of a large hotel's doors — and
 * `jeddah-hotel-transfers` owns where a stay sits in the sequence of a trip.
 * Both are local. This page takes the one question that is identical at every
 * hotel in the country and hands the local detail back to them by name. It
 * states no distances, no drive times and no city geography.
 *
 * **No photographic hero, and that is a precedent rather than a gap.**
 * `riyadh-hotel-transfers` is already the one page in the project with no
 * hero photograph, for exactly this reason: any hotel photograph would be a
 * property we have no relationship with, and putting one above a page selling
 * hotel transfers implies the relationship. The project's only hotel exterior
 * is the Makkah Royal Clock Tower — a single identifiable branded building,
 * and the wrong city for a national page. So the hero is typographic, and the
 * one photograph on the page is a satellite view of an oasis settlement,
 * placed where it carries the point about reach across the Kingdom.
 *
 * The honest block is `access`: where a car may stop is the property's
 * decision, not ours, and the page says so with a three-item list of what is
 * explicitly not claimed — no partnership, no concierge coordination, no
 * guaranteed entrance.
 */
export default async function HotelTransfersPage({
  params,
}: PageProps<"/[locale]/hotel-transfers">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const photo = image(content.imageKey);
  const quotePath = href(locale, "getQuote");

  const quoteHref = `${quotePath}?pickup=${encodeURIComponent(
    locale === "ar" ? "فندق في السعودية" : "Hotel in Saudi Arabia"
  )}`;

  const shapeHref = (pickup: string, dropoff?: string) =>
    dropoff
      ? `${quotePath}?pickup=${encodeURIComponent(
          pickup
        )}&dropoff=${encodeURIComponent(dropoff)}`
      : `${quotePath}?pickup=${encodeURIComponent(pickup)}`;

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

      {/*
        ---- Hero: typographic, no photograph -----------------------------
        See the note above. A hotel image here would imply a relationship
        with a property we have none with, so the hero carries weight
        through type and ground instead.
      */}
      <section className="border-b border-border bg-ink">
        <div className="site-container pt-24 pb-16 md:pt-28 lg:pt-32 lg:pb-20">
          <Breadcrumbs locale={locale} crumbs={crumbs(locale)} tone="invert" />

          <div className="mt-10 max-w-3xl">
            <p className="text-eyebrow text-brass">{content.eyebrow[locale]}</p>
            <h1 className="text-display mt-5 text-balance text-white">
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
              href="#shapes"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/25 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {content.secondaryCta[locale]}
            </a>
          </div>
        </div>
      </section>

      {/* ---- Signature: the four shapes ----------------------------------- */}
      <section
        id="shapes"
        className="section-y scroll-mt-24 border-t border-border"
        aria-labelledby="shapes-heading"
      >
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 id="shapes-heading" className="text-h2 text-balance text-ink">
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
                className="flex flex-col rounded-2xl bg-card p-7 ring-1 ring-ink/8"
              >
                {/*
                  The position diagram. The row mirrors with the writing
                  direction on its own, so the journey reads left-to-right in
                  English and right-to-left in Arabic with no second markup.
                */}
                <div aria-hidden className="flex items-center gap-2.5">
                  {shape.nodes.map((node, index) => (
                    <span
                      key={`${shape.key}-${index}`}
                      className="flex items-center gap-2.5"
                    >
                      {index > 0 ? (
                        <span className="h-px w-8 bg-brass/45 sm:w-12" />
                      ) : null}
                      <span
                        className={cn(
                          "rounded-full px-3 py-1 text-xs font-semibold",
                          node.hotel
                            ? "bg-brass text-ink"
                            : node.open
                              ? "border border-dashed border-ink/35 text-ink/55"
                              : "border border-ink/25 text-ink/70"
                        )}
                      >
                        {node.label[locale]}
                      </span>
                    </span>
                  ))}
                </div>

                <h3 className="text-h4 mt-5 text-balance text-ink">
                  {shape.name[locale]}
                </h3>
                <p className="mt-3 leading-relaxed text-ink/75">
                  {shape.who[locale]}
                </p>

                <ul className="mt-5 flex flex-col gap-2">
                  {shape.needs.map((need) => (
                    <li key={need.en} className="flex gap-2.5">
                      <CheckIcon
                        aria-hidden
                        className="mt-1 size-3.5 shrink-0 text-palm"
                      />
                      <span className="text-sm leading-relaxed text-ink/80">
                        {need[locale]}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row sm:items-center">
                  <Link
                    href={shapeHref(
                      shape.prefill.pickup[locale],
                      shape.prefill.dropoff?.[locale]
                    )}
                    className="group inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-brass px-5 text-sm font-semibold text-ink transition-colors hover:bg-brass-deep"
                  >
                    {shape.ctaLabel[locale]}
                    <ArrowRightIcon
                      aria-hidden
                      className="size-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100"
                    />
                  </Link>

                  {shape.link ? (
                    <Link
                      href={href(locale, shape.link.routeKey)}
                      className="text-sm font-semibold text-palm underline-offset-4 transition-colors hover:text-palm-deep hover:underline"
                    >
                      {shape.link.label[locale]}
                    </Link>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Where the car can stop ---------------------------------------- */}
      <section className="section-y border-t border-border bg-ink">
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-h2 text-balance text-white">
              {content.access.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/80">
              {content.access.lead[locale]}
            </p>
            {content.access.paragraphs.map((paragraph) => (
              <p
                key={paragraph.en}
                className="mt-4 leading-relaxed text-white/75"
              >
                {paragraph[locale]}
              </p>
            ))}
          </div>

          <div className="mt-10 max-w-3xl rounded-2xl bg-white/6 p-7 ring-1 ring-white/12">
            <h3 className="text-h4 text-white">
              {content.access.limits.heading[locale]}
            </h3>
            <ul className="mt-5 flex flex-col gap-3.5">
              {content.access.limits.items.map((item) => (
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

      {/* ---- Coverage ------------------------------------------------------- */}
      <section className="section-y border-t border-border bg-sand">
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
                <p className="text-eyebrow text-brass-deep">
                  {item.city[locale]}
                </p>
                <p className="mt-3 flex-1 leading-relaxed text-ink/75">
                  {item.note[locale]}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink group-hover:text-brass-deep">
                  {locale === "ar" ? "صفحة المدينة" : "That page"}
                  <ArrowRightIcon
                    aria-hidden
                    className="size-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100"
                  />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:items-start lg:gap-14">
            <div>
              <h3 className="text-h4 text-balance text-ink">
                {content.coverage.hubs.heading[locale]}
              </h3>
              <p className="mt-3 max-w-2xl leading-relaxed text-ink/80">
                {content.coverage.hubs.body[locale]}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {content.coverage.hubs.links.map((link) => (
                  <li key={link.routeKey}>
                    <Link
                      href={href(locale, link.routeKey)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-brass hover:text-brass-deep"
                    >
                      {link.label[locale]}
                      <ArrowRightIcon
                        aria-hidden
                        className="size-3.5 rtl:-scale-x-100"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <figure className="overflow-hidden rounded-2xl">
              <Image
                src={photo.src}
                alt={altText(photo, locale)}
                width={photo.width}
                height={photo.height}
                placeholder="blur"
                blurDataURL={photo.blurDataURL}
                loading="lazy"
                sizes="(min-width: 1024px) 20rem, 100vw"
                className="aspect-4/3 w-full object-cover"
              />
              <figcaption className="mt-2.5 text-xs text-muted-foreground">
                {altText(photo, locale)}
              </figcaption>
            </figure>
          </div>

          <div className="mt-10 max-w-3xl rounded-2xl border border-brass/35 bg-brass/8 p-6 sm:p-7">
            <h3 className="text-h4 text-balance text-ink">
              {content.coverage.elsewhere.heading[locale]}
            </h3>
            <p className="mt-3 leading-relaxed text-ink/80">
              {content.coverage.elsewhere.body[locale]}
            </p>
          </div>
        </div>
      </section>

      {/* ---- Vehicles --------------------------------------------------------- */}
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

      {/* ---- Process ----------------------------------------------------------- */}
      <section className="section-y border-t border-border bg-sand">
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

      {/* ---- FAQ ---------------------------------------------------------------- */}
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

      {/* ---- CTA ---------------------------------------------------------------- */}
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

      {/* ---- Related -------------------------------------------------------------- */}
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
