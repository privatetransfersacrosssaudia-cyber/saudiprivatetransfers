import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRightIcon, CheckIcon, InfoIcon } from "lucide-react";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ClusterFaqList } from "@/components/cluster/cluster-faq";
import { RelatedLinks } from "@/components/cluster/related-links";
import { HeroSentinel } from "@/components/layout/site-header";
import { riyadhToMakkah as content } from "@/lib/content/riyadh/makkah";
import { riyadhHub } from "@/lib/content/riyadh/hub";
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
}: PageProps<"/[locale]/riyadh-to-makkah">): Promise<Metadata> {
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
  { name: riyadhHub.crumbLabel[locale], routeKey: "riyadh" },
  { name: content.crumbLabel[locale], routeKey: content.routeKey },
];

const relatedHeading = { en: "Related journeys", ar: "رحلات ذات صلة" };

/**
 * Riyadh to Makkah.
 *
 * Design concept — "the roll-call". This is the longest journey the cluster
 * quotes and the one where the honest answer is most often "fly", so the page
 * is ordered as a decision rather than as a description: who the drive suits,
 * then the length of it, then the practicalities.
 *
 * The signature element is the roll-call itself — the nine settlements the
 * Ministry of Transport names along Highway 40 between the two cities, set as
 * a tall numbered column with the two cities as bookends and **no distances
 * anywhere on it**. The absence is the point and the page says so: the
 * ministry description's own segment lengths contradict each other, so a
 * kilometre figure per town would be invented precision. What the column does
 * instead is take up the height of the screen, which is the argument.
 *
 * Deliberately not the Makkah–Madinah corridor's design. That page is a route
 * plate and a horizontal milepost strip carrying distances, because there the
 * two directions differ and the figures are solid. Here direction changes
 * nothing and the figures are not solid, so the geometry is vertical, the
 * numbers are absent, and the comparison block — drive against fly — carries
 * the weight the milepost strip carries there.
 *
 * The entry restriction sits in the hero, not in small print, matching the
 * Makkah hub. The Riyadh–Madinah page states something different in the same
 * slot because the rule genuinely differs between the two cities; the pages
 * must not read as mirror images.
 *
 * The photograph is `route-highway40-west`, verified by eye: a divided
 * highway cut through a layered limestone escarpment in open desert, freight
 * on it. It is the Tuwaiq escarpment in the first hour of this drive, and it
 * was unused in the project before this page.
 */
export default async function RiyadhToMakkahPage({
  params,
}: PageProps<"/[locale]/riyadh-to-makkah">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const photo = image(content.imageKey);
  const roll = content.wayNames;

  const quoteHref = `${href(locale, "getQuote")}?pickup=${encodeURIComponent(
    locale === "ar" ? "الرياض" : "Riyadh"
  )}&dropoff=${encodeURIComponent(
    locale === "ar" ? "مكة المكرمة" : "Makkah"
  )}`;

  const vehicles = vehicleClasses;

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
              serviceName: content.hero.h1[locale],
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
            <p className="text-eyebrow text-brass">
              {content.hero.eyebrow[locale]}
            </p>
            <h1 className="text-h1 mt-4 text-balance text-white">
              {content.hero.h1[locale]}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/85">
              {content.hero.lead[locale]}
            </p>
          </div>

          {/* The three figures, inline rather than in a card band. */}
          <dl className="mt-10 grid max-w-3xl gap-x-10 gap-y-6 sm:grid-cols-3">
            {content.stats.map((stat) => (
              <div key={stat.label.en} className="border-t border-white/20 pt-4">
                <dt className="text-eyebrow text-white/55">
                  {stat.label[locale]}
                </dt>
                <dd className="numeric mt-1.5 text-2xl font-semibold text-brass">
                  {stat.value[locale]}
                </dd>
                {stat.note ? (
                  <dd className="mt-2 text-sm leading-relaxed text-white/60">
                    {stat.note[locale]}
                  </dd>
                ) : null}
              </div>
            ))}
          </dl>

          <p className="mt-6 text-sm text-white/45">
            {content.statsChecked[locale]}
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
            <a
              href="#roll-call"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/25 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {locale === "ar" ? "ما طول الطريق؟" : "How long is the road?"}
            </a>
          </div>
        </div>
      </section>

      {/* ---- Who actually drives this ------------------------------------- */}
      <section className="section-y border-t border-border">
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-h2 text-balance text-ink">
              {content.overview.heading[locale]}
            </h2>
            {content.overview.paragraphs.map((paragraph, index) => (
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

      {/* ---- Signature: the roll-call ------------------------------------- */}
      {roll ? (
        <section
          id="roll-call"
          className="section-y scroll-mt-24 border-t border-border bg-sand"
          aria-labelledby="roll-call-heading"
        >
          <div className="site-container">
            <div className="max-w-3xl">
              <h2
                id="roll-call-heading"
                className="text-h2 text-balance text-ink"
              >
                {roll.heading[locale]}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink/80">
                {roll.lead[locale]}
              </p>
            </div>

            {/*
              A tall column, deliberately not compressed into a strip. The
              vertical rule runs behind the markers; because it is positioned
              with a logical inset it stays on the reading-side edge in both
              directions.
            */}
            <div className="relative mt-12 max-w-xl">
              <span
                aria-hidden
                className="absolute top-2 bottom-2 w-px bg-palm/25"
                style={{ insetInlineStart: "0.5rem" }}
              />

              <ol className="flex flex-col gap-y-7">
                <li className="relative flex items-center gap-5 ps-8">
                  <span
                    aria-hidden
                    className="absolute size-4 rounded-full bg-palm ring-4 ring-sand"
                    style={{ insetInlineStart: 0 }}
                  />
                  <span className="text-h4 font-semibold text-ink">
                    {roll.from[locale]}
                  </span>
                </li>

                {roll.places.map((place) => (
                  <li
                    key={place.name.en}
                    className="relative flex items-center gap-5 ps-8"
                  >
                    <span
                      aria-hidden
                      className="absolute size-2 rounded-full bg-palm/45 ring-4 ring-sand"
                      style={{ insetInlineStart: "0.25rem" }}
                    />
                    <span className="text-lg text-ink/70">
                      {place.name[locale]}
                    </span>
                  </li>
                ))}

                <li className="relative flex items-center gap-5 ps-8">
                  <span
                    aria-hidden
                    className="absolute size-4 rounded-full bg-brass ring-4 ring-sand"
                    style={{ insetInlineStart: 0 }}
                  />
                  <span className="text-h4 font-semibold text-ink">
                    {roll.to[locale]}
                  </span>
                </li>
              </ol>
            </div>

            <div className="mt-12 max-w-3xl rounded-2xl border border-brass/35 bg-brass/8 p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <InfoIcon
                  aria-hidden
                  className="size-5 shrink-0 text-brass-deep"
                />
                <p className="font-semibold text-ink">
                  {locale === "ar" ? "لماذا بلا أرقام" : "Why there are no numbers on it"}
                </p>
              </div>
              <p className="mt-4 leading-relaxed text-ink/80">
                {roll.footnote[locale]}
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                {roll.source[locale]}
              </p>
            </div>
          </div>
        </section>
      ) : null}

      {/* ---- How the day breaks up ---------------------------------------- */}
      <section className="section-y border-t border-border">
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-h2 text-balance text-ink">
              {content.stages.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              {content.stages.lead[locale]}
            </p>
          </div>

          <ol className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
            {content.stages.items.map((stage, index) => (
              <li key={stage.name.en} className="border-s-2 border-palm/30 ps-5">
                <span
                  aria-hidden
                  className="numeric text-sm font-semibold text-brass-deep"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1 font-semibold text-ink">
                  {stage.name[locale]}
                </h3>
                <p className="mt-2 leading-relaxed text-ink/75">
                  {stage.detail[locale]}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---- Pickup and drop-off ------------------------------------------ */}
      <section className="section-y border-t border-border bg-sand">
        <div className="site-container">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            {[content.pickup, content.dropoff].map((block) => (
              <div key={block.heading.en}>
                <h2 className="text-h3 text-balance text-ink">
                  {block.heading[locale]}
                </h2>
                {block.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.en}
                    className="mt-4 leading-relaxed text-ink/80"
                  >
                    {paragraph[locale]}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Driving against flying --------------------------------------- */}
      {content.comparison ? (
        <section className="section-y border-t border-border bg-ink">
          <div className="site-container">
            <div className="max-w-3xl">
              <h2 className="text-h2 text-balance text-white">
                {content.comparison.heading[locale]}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/80">
                {content.comparison.lead[locale]}
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              {content.comparison.columns.map((column, index) => (
                <div
                  key={column.title.en}
                  className={cn(
                    "rounded-2xl p-7 lg:p-8",
                    index === 0
                      ? "bg-brass/12 ring-1 ring-brass/35"
                      : "bg-white/6 ring-1 ring-white/12"
                  )}
                >
                  <h3 className="text-h4 text-white">{column.title[locale]}</h3>
                  {column.headline ? (
                    <p
                      className={cn(
                        "numeric mt-4 text-3xl font-semibold",
                        index === 0 ? "text-brass" : "text-white/55"
                      )}
                    >
                      {column.headline[locale]}
                    </p>
                  ) : null}
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
              {content.comparison.footnote[locale]}
            </p>
          </div>
        </section>
      ) : null}

      {/* ---- Practical ---------------------------------------------------- */}
      <section className="section-y border-t border-border">
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-h2 text-balance text-ink">
              {content.practical.heading[locale]}
            </h2>
          </div>

          <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-3">
            {content.practical.items.map((item) => (
              <div key={item.heading.en}>
                <h3 className="font-semibold text-ink">
                  {item.heading[locale]}
                </h3>
                {item.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.en}
                    className="mt-2 leading-relaxed text-ink/75"
                  >
                    {paragraph[locale]}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Vehicles ----------------------------------------------------- */}
      <section className="section-y border-t border-border bg-sand">
        <div className="site-container">
          <h2 className="text-h2 text-balance text-ink">
            {locale === "ar" ? "المركبات" : "Vehicles"}
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink/80">
            {locale === "ar"
              ? "تُختار بحسب عددكم وأمتعتكم. وعلى رحلة بهذا الطول تهم المساحة أكثر مما تهم في جولة داخل المدينة."
              : "Chosen on how many of you there are and what you are carrying. On a journey this long, space matters more than it does on a run across a city."}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.slug}
                className="flex flex-col rounded-xl border border-border bg-card p-5"
              >
                <h3 className="font-semibold text-ink">
                  {vehicle.name[locale]}
                </h3>
                <dl className="mt-3 flex flex-col gap-1 text-sm text-ink/75">
                  <dd className="numeric">{vehicle.seats[locale]}</dd>
                  <dd className="numeric">{vehicle.luggage[locale]}</dd>
                </dl>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/70">
                  {vehicle.summary[locale]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Booking ------------------------------------------------------ */}
      <section className="section-y border-t border-border">
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-h3 text-balance text-ink">
              {content.booking.heading[locale]}
            </h2>
            {content.booking.paragraphs.map((paragraph) => (
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

      {/* ---- Onward ------------------------------------------------------- */}
      {content.onward ? (
        <section className="section-y border-t border-border bg-sand">
          <div className="site-container">
            <h2 className="text-h3 text-balance text-ink">
              {content.onward.heading[locale]}
            </h2>
            <div className="mt-8 grid gap-x-10 gap-y-7 md:grid-cols-2">
              {content.onward.items.map((item) => (
                <div
                  key={item.heading.en}
                  className="border-s-2 border-palm/30 ps-5"
                >
                  <h3 className="flex items-center gap-2 font-semibold text-ink">
                    <CheckIcon
                      aria-hidden
                      className="size-4 shrink-0 text-palm"
                    />
                    {item.heading[locale]}
                  </h3>
                  {item.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph.en}
                      className="mt-2 leading-relaxed text-ink/75"
                    >
                      {paragraph[locale]}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ---- FAQ ---------------------------------------------------------- */}
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
            heading={relatedHeading[locale]}
            links={[...content.related]}
          />
        </div>
      </section>
    </>
  );
}
