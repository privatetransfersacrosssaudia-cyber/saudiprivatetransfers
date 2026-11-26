import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRightIcon, CheckIcon, TrainFrontIcon } from "lucide-react";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ClusterFaqList } from "@/components/cluster/cluster-faq";
import { RelatedLinks } from "@/components/cluster/related-links";
import { HeroSentinel } from "@/components/layout/site-header";
import { riyadhToMadinah as content } from "@/lib/content/riyadh/madinah";
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
}: PageProps<"/[locale]/riyadh-to-madinah">): Promise<Metadata> {
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
 * Riyadh to Madinah.
 *
 * Design concept — "the hinge". Riyadh to Makkah is one long road with
 * nothing much on it, and that page is built as a decision followed by a
 * numberless vertical roll-call. This journey is structurally different: it
 * has a city at its middle, so it is built as a **diptych** — two unequal
 * legs set side by side with Qassim as the hinge between them, carrying a
 * medallion that straddles the seam. Nothing else in the project is laid out
 * as two panels joined at a point.
 *
 * The honest moment belongs to this page alone and it is sharper than the
 * usual "no train runs here": the railway gives up *exactly where the diptych
 * hinges*. Riyadh's northern line reaches Qassim on its way to Hail, so rail
 * covers roughly the first half; the Haramain line serves Madinah at the far
 * end; the two networks never meet. The comparison block is therefore not
 * drive-against-fly as it is on the Makkah page, but **what rail can do
 * against what it cannot** — which is why the two pages' dark bands make
 * different arguments despite sharing a shape.
 *
 * The entry paragraph states Madinah's rule, which is *not* Makkah's. The
 * Makkah page states an absolute restriction on entering the city; this one
 * states Visit Saudi's wording about sacred areas. Neither sentence may be
 * copied onto the other page.
 *
 * The photograph is `route-highway65-north`, verified by eye: a dashboard
 * view of an empty expressway running north into dust haze, a mesa on the
 * horizon. It is the Qassim–Riyadh expressway — literally leg one — and it
 * was unused in the project before this page.
 */
export default async function RiyadhToMadinahPage({
  params,
}: PageProps<"/[locale]/riyadh-to-madinah">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const photo = image(content.imageKey);
  const mid = content.midpoint;

  const quoteHref = `${href(locale, "getQuote")}?pickup=${encodeURIComponent(
    locale === "ar" ? "الرياض" : "Riyadh"
  )}&dropoff=${encodeURIComponent(
    locale === "ar" ? "المدينة المنورة" : "Madinah"
  )}`;

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
          className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/93 via-ink/88 to-ink/97"
        />

        <div className="site-container pt-28 pb-14 md:pt-30 lg:pt-36 lg:pb-18">
          <Breadcrumbs locale={locale} crumbs={crumbs(locale)} tone="invert" />

          <div className="mt-8 max-w-3xl">
            <p className="text-eyebrow text-brass">
              {content.hero.eyebrow[locale]}
            </p>
            <h1 className="text-display mt-4 text-balance text-white">
              {content.hero.h1[locale]}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/85">
              {content.hero.lead[locale]}
            </p>
          </div>

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
              href="#legs"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/25 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {locale === "ar" ? "انظر المرحلتين" : "See the two legs"}
            </a>
          </div>
        </div>
      </section>

      {/* ---- A journey with a middle -------------------------------------- */}
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

      {/* ---- Signature: the diptych, hinged on Qassim --------------------- */}
      {mid ? (
        <section
          id="legs"
          className="section-y scroll-mt-24 border-t border-border bg-sand"
          aria-labelledby="legs-heading"
        >
          <div className="site-container">
            <div className="max-w-3xl">
              <h2 id="legs-heading" className="text-h2 text-balance text-ink">
                {mid.heading[locale]}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink/80">
                {mid.lead[locale]}
              </p>
            </div>

            {/*
              Two panels joined at a seam, with the hinge medallion centred on
              it. On small screens the panels stack and the medallion sits
              between them; the grid reverses under `dir="rtl"` on its own, so
              leg one stays on the reading-start side in both languages.
            */}
            <div className="relative mt-12">
              <div className="grid gap-4 lg:grid-cols-2 lg:gap-0">
                {mid.legs.map((leg, index) => (
                  <article
                    key={leg.name.en}
                    className={cn(
                      "bg-card p-7 ring-1 ring-ink/8 lg:p-9",
                      index === 0
                        ? "rounded-2xl lg:rounded-e-none"
                        : "rounded-2xl lg:rounded-s-none lg:border-s lg:border-dashed lg:border-ink/20"
                    )}
                  >
                    <p className="text-eyebrow text-brass-deep">
                      {leg.index[locale]}
                    </p>
                    <h3 className="text-h4 mt-3 text-balance text-ink">
                      {leg.name[locale]}
                    </h3>

                    <div className="mt-5 flex flex-wrap items-baseline gap-x-6 gap-y-2">
                      <span className="numeric text-3xl font-semibold text-ink">
                        {leg.distance[locale]}
                      </span>
                      <span className="numeric text-lg text-ink/60">
                        {leg.duration[locale]}
                      </span>
                    </div>

                    <p className="mt-5 leading-relaxed text-ink/75">
                      {leg.detail[locale]}
                    </p>
                  </article>
                ))}
              </div>

              {/* The hinge. Absolutely centred on the seam at lg and up. */}
              <div className="mt-4 lg:absolute lg:inset-y-0 lg:left-1/2 lg:mt-0 lg:flex lg:-translate-x-1/2 lg:items-center">
                <div className="rounded-2xl border border-brass/45 bg-brass/12 p-5 text-center lg:max-w-56 lg:bg-brass/95 lg:text-start lg:shadow-lg">
                  <p className="text-eyebrow text-brass-deep lg:text-ink/70">
                    {locale === "ar" ? "المفصل" : "The hinge"}
                  </p>
                  <p className="mt-1.5 font-semibold text-ink">
                    {mid.hinge.name[locale]}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink/75">
                    {mid.hinge.note[locale]}
                  </p>
                  {mid.hinge.routeKey ? (
                    <Link
                      href={href(locale, mid.hinge.routeKey)}
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-ink underline underline-offset-4 hover:text-brass-deep lg:hover:text-ink/70"
                    >
                      {locale === "ar" ? "صفحة المرحلة الأولى" : "The first leg's page"}
                      <ArrowRightIcon
                        aria-hidden
                        className="size-3.5 rtl:-scale-x-100"
                      />
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>

            <p className="mt-10 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              {mid.footnote[locale]}
            </p>
          </div>
        </section>
      ) : null}

      {/* ---- What the day feels like -------------------------------------- */}
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

      {/* ---- Where the railway gives up ----------------------------------- */}
      {content.comparison ? (
        <section className="section-y border-t border-border bg-ink">
          <div className="site-container">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <TrainFrontIcon aria-hidden className="size-6 text-brass" />
                <h2 className="text-h2 text-balance text-white">
                  {content.comparison.heading[locale]}
                </h2>
              </div>
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
                      ? "bg-palm/20 ring-1 ring-palm/40"
                      : "bg-white/6 ring-1 ring-white/12"
                  )}
                >
                  <h3 className="text-h4 text-white">{column.title[locale]}</h3>
                  {column.headline ? (
                    <p
                      className={cn(
                        "mt-4 text-3xl font-semibold text-balance",
                        index === 0 ? "text-white" : "text-white/50"
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
              ? "تُختار بحسب عددكم وأمتعتكم. وإن كنت ستقسّم الرحلة عند القصيم فاذكر ذلك، فحقائب ليلة واحدة تغيّر ما تحتاجه."
              : "Chosen on how many of you there are and what you are carrying. If you are splitting the journey at Qassim, say so — an overnight bag each changes what you need."}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {vehicleClasses.map((vehicle) => (
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
