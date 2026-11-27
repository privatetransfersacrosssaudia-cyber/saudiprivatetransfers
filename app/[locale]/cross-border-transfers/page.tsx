import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowRightIcon,
  FileTextIcon,
  MessageCircleIcon,
  TimerIcon,
  TriangleAlertIcon,
} from "lucide-react";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ClusterFaqList } from "@/components/cluster/cluster-faq";
import { RelatedLinks } from "@/components/cluster/related-links";
import { HeroSentinel } from "@/components/layout/site-header";
import { crossBorder as content } from "@/lib/content/cross-border";
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
}: PageProps<"/[locale]/cross-border-transfers">): Promise<Metadata> {
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

const crumbs = (locale: Locale): Crumb[] => [
  { name: ui.home[locale], routeKey: "home" },
  { name: content.crumbLabel[locale], routeKey: content.routeKey },
];

/**
 * Cross-border transfers from Saudi Arabia.
 *
 * ## Design concept — **the seam**
 *
 * Every other journey on this site is continuous. An international one has a
 * joint in the middle: at the border, the arrangement either carries straight
 * on or changes hands, and that is not the customer's to choose. So the page
 * is built around the seam rather than around a row of countries, and its one
 * piece of diagram work is a rail that runs out of Saudi Arabia, reaches a
 * border, and forks into the two honest outcomes.
 *
 * The rail is CSS rather than SVG so it mirrors correctly in Arabic: an SVG
 * path would need a second drawing for RTL, while logical borders flip for
 * free. It carries no icons and no flags.
 *
 * ## No destination photography, on purpose
 *
 * This project holds no picture of Dubai, Doha, Kuwait City, Muscat or the
 * Bahrain skyline. The one border asset is the King Fahd Causeway, which is
 * genuinely the Saudi–Bahrain crossing and is used only there. So the
 * destination section is typographic — large country names, honest prose —
 * and the page says outright why there are no photographs. A stock skyline
 * captioned with a city's name is a small lie, and it would be the first
 * thing a reader took on trust.
 *
 * ## Bahrain
 *
 * Journeys cross the causeway and continue to addresses inside Bahrain. An
 * earlier version of this page said they stopped at the Saudi side, because
 * every other page on the site said so; the owner has since confirmed the
 * fuller scope and the old wording has been swept out of all eleven files
 * that carried it. See the content file for the history.
 *
 * ## Yemen and Iraq
 *
 * Absent. Iraq is unconfirmed. Jordan was too, until the owner confirmed it;
 * it now has a page like the other five. Yemen is listed by the owner but
 * cannot be represented responsibly without verification of security, legal
 * and operational reality, so it is flagged for decision rather than
 * published as a destination.
 */
export default async function CrossBorderTransfersPage({
  params,
}: PageProps<"/[locale]/cross-border-transfers">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const photo = image(content.imageKey);
  const quotePath = href(locale, "getQuote");
  const quoteHref = `${quotePath}?pickup=${encodeURIComponent(
    locale === "ar" ? "مدينة في السعودية" : "City in Saudi Arabia"
  )}`;
  const whatsapp = whatsappUrl(content.whatsappMessage[locale]);

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
              href="#destinations"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/25 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {content.secondaryCta[locale]}
            </a>
          </div>

          <p className="mt-5 text-xs text-white/50">{altText(photo, locale)}</p>
        </div>
      </section>

      {/* ---- The seam ----------------------------------------------------- */}
      <section className="section-y bg-palm text-white">
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-h2 text-balance text-white">
              {content.seam.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/80">
              {content.seam.lead[locale]}
            </p>
          </div>

          {/* The rail: one leg out of the Kingdom, a border, then two outcomes.
              Built from logical borders so it mirrors in Arabic for free. */}
          <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-0">
            <div className="lg:col-span-4 lg:pe-8">
              <div className="border-s-2 border-white/35 ps-5 lg:border-s-0 lg:border-t-2 lg:ps-0 lg:pt-5">
                <p className="text-eyebrow text-brass">
                  {content.seam.saudiLeg[locale]}
                </p>
                <p className="mt-2.5 text-sm leading-relaxed text-white/70">
                  {content.departures.lead[locale].split(".")[0]}.
                </p>
              </div>
            </div>

            <div className="lg:col-span-1 lg:flex lg:items-start lg:justify-center">
              <div className="flex items-center gap-3 lg:flex-col lg:gap-2 lg:pt-1">
                <span
                  aria-hidden
                  className="h-px w-8 bg-brass lg:h-10 lg:w-px"
                />
                <span className="text-eyebrow whitespace-nowrap text-brass">
                  {content.seam.borderLabel[locale]}
                </span>
                <span
                  aria-hidden
                  className="h-px w-8 bg-brass lg:h-10 lg:w-px"
                />
              </div>
            </div>

            <div className="lg:col-span-7 lg:ps-8">
              <ul className="flex flex-col gap-6">
                {content.seam.models.map((model) => (
                  <li
                    key={model.id}
                    className="border-s-2 border-brass ps-5 lg:border-s-0 lg:border-t-2 lg:ps-0 lg:pt-5"
                  >
                    <p className="numeric text-xs font-semibold tracking-wide text-brass">
                      {model.tag[locale]}
                    </p>
                    <h3 className="mt-1.5 text-lg font-semibold text-white">
                      {model.label[locale]}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/75">
                      {model.body[locale]}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-10 max-w-3xl border-t border-white/15 pt-6 text-sm leading-relaxed text-white/70">
            {content.seam.note[locale]}
          </p>
        </div>
      </section>

      {/* ---- Destinations -------------------------------------------------- */}
      <section
        id="destinations"
        className="section-y scroll-mt-24 bg-background"
      >
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-h2 text-balance text-ink">
              {content.destinations.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              {content.destinations.lead[locale]}
            </p>
          </div>

          <ol className="mt-12">
            {content.destinations.countries.map((country, index) => {
              const shot = country.imageKey ? image(country.imageKey) : null;
              return (
                <li
                  key={country.id}
                  className="grid gap-x-10 gap-y-4 border-t border-ink/12 py-8 lg:grid-cols-12"
                >
                  <div className="lg:col-span-4">
                    <span className="numeric text-xs font-semibold text-brass-deep">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-h3 mt-1 text-balance text-ink">
                      <Link
                        href={href(locale, country.routeKey)}
                        className="group inline-flex items-start gap-2 transition-colors hover:text-palm"
                      >
                        {country.name[locale]}
                        <ArrowRightIcon
                          aria-hidden
                          className="mt-2.5 size-4 shrink-0 text-brass-deep transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100"
                        />
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {locale === "ar"
                        ? "اطّلع على تفاصيل هذه الوجهة"
                        : "See how this crossing works"}
                    </p>
                  </div>

                  <div className="lg:col-span-8">
                    <p className="leading-relaxed text-ink/80">
                      {country.body[locale]}
                    </p>

                    {country.caveat ? (
                      <p className="mt-4 flex items-start gap-3 rounded-xl bg-brass/12 p-5 text-sm leading-relaxed text-ink">
                        <TriangleAlertIcon
                          aria-hidden
                          className="mt-0.5 size-4 shrink-0 text-brass-deep"
                        />
                        {country.caveat[locale]}
                      </p>
                    ) : null}

                    {shot ? (
                      <figure className="mt-5 overflow-hidden rounded-xl">
                        <Image
                          src={shot.src}
                          alt={altText(shot, locale)}
                          width={shot.width}
                          height={shot.height}
                          placeholder="blur"
                          blurDataURL={shot.blurDataURL}
                          loading="lazy"
                          sizes="(min-width: 1024px) 62vw, 100vw"
                          className="aspect-21/9 w-full object-cover"
                        />
                        <figcaption className="mt-2 text-xs text-muted-foreground">
                          {altText(shot, locale)}
                        </figcaption>
                      </figure>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="mt-8 grid max-w-5xl gap-6 border-t border-ink/12 pt-8 md:grid-cols-2">
            <p className="text-sm leading-relaxed text-ink/70">
              {content.destinations.scope[locale]}
            </p>
            <p className="text-sm leading-relaxed text-ink/70">
              {content.destinations.imageGap[locale]}
            </p>
          </div>
        </div>
      </section>

      {/* ---- Where journeys start ------------------------------------------ */}
      <section className="section-y bg-sand/40">
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-h2 text-balance text-ink">
              {content.departures.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              {content.departures.lead[locale]}
            </p>
          </div>

          <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
            {content.departures.groups.map((group) => (
              <div key={group.label.en} className="border-t border-ink/12 pt-5">
                <h3 className="text-base font-semibold text-ink">
                  {group.label[locale]}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/70">
                  {group.note[locale]}
                </p>
                <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-1.5">
                  {group.cities[locale].map((city, i) => (
                    <li key={city} className="flex items-center gap-2">
                      {i > 0 ? (
                        <span aria-hidden className="text-ink/25">
                          ·
                        </span>
                      ) : null}
                      <span className="text-sm text-ink/85">{city}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-9 max-w-3xl text-sm leading-relaxed text-ink/70">
            {content.departures.note[locale]}
          </p>
        </div>
      </section>

      {/* ---- What the quotation needs to know ------------------------------- */}
      <section className="section-y bg-background">
        <div className="site-container">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <h2 className="text-h2 text-balance text-ink">
                {content.planning.heading[locale]}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink/80">
                {content.planning.lead[locale]}
              </p>

              <div className="mt-8 rounded-xl border border-ink/12 p-5">
                <p className="flex items-center gap-2.5 text-sm font-semibold text-ink">
                  <FileTextIcon
                    aria-hidden
                    className="size-4 shrink-0 text-brass-deep"
                  />
                  {content.planning.documents.heading[locale]}
                </p>
                <p className="mt-2.5 text-sm leading-relaxed text-ink/75">
                  {content.planning.documents.body[locale]}
                </p>
              </div>

              <div className="mt-5 rounded-xl border border-ink/12 p-5">
                <p className="flex items-center gap-2.5 text-sm font-semibold text-ink">
                  <TimerIcon
                    aria-hidden
                    className="size-4 shrink-0 text-brass-deep"
                  />
                  {content.planning.crossing.heading[locale]}
                </p>
                <p className="mt-2.5 text-sm leading-relaxed text-ink/75">
                  {content.planning.crossing.body[locale]}
                </p>
              </div>
            </div>

            <dl className="lg:col-span-7">
              {content.planning.items.map((item) => (
                <div
                  key={item.label.en}
                  className="border-b border-ink/10 py-5 first:pt-0"
                >
                  <dt className="text-base font-semibold text-ink">
                    {item.label[locale]}
                  </dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-ink/75">
                    {item.body[locale]}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ---- One way or return ---------------------------------------------- */}
      <section className="section-y bg-sand/40">
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-h2 text-balance text-ink">
              {content.shapes.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              {content.shapes.lead[locale]}
            </p>
          </div>

          <div className="mt-9 grid max-w-4xl gap-6 md:grid-cols-2">
            {content.shapes.items.map((item) => (
              <div
                key={item.label.en}
                className="border-s-2 border-palm ps-5"
              >
                <h3 className="text-base font-semibold text-ink">
                  {item.label[locale]}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/75">
                  {item.body[locale]}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-ink/70">
            {content.shapes.note[locale]}
          </p>
        </div>
      </section>

      {/* ---- Process --------------------------------------------------------- */}
      <section className="section-y bg-background">
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
        </div>
      </section>

      {/* ---- Vehicles --------------------------------------------------------- */}
      <section className="section-y bg-sand/40">
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

      {/* ---- FAQs -------------------------------------------------------------- */}
      <section className="section-y bg-background">
        <div className="site-container">
          <ClusterFaqList
            locale={locale}
            heading={content.faqHeading[locale]}
            headingId="cross-border-faqs"
            faqs={content.faqs}
            layout="split"
          />
        </div>
      </section>

      {/* ---- Closing CTA -------------------------------------------------------- */}
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

      {/* ---- Related ------------------------------------------------------------ */}
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
