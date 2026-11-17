import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  CarFrontIcon,
  MapPinnedIcon,
  ScaleIcon,
  TrainFrontIcon,
  UsersIcon,
} from "lucide-react";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ClusterFaqList } from "@/components/cluster/cluster-faq";
import { RelatedLinks } from "@/components/cluster/related-links";
import { HeroSentinel } from "@/components/layout/site-header";
import { makkahMadinah as content } from "@/lib/content/makkah-region/madinah";
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
}: PageProps<"/[locale]/makkah-to-madinah">): Promise<Metadata> {
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

/** Three levels: the corridor is a child of the Makkah hub. */
const crumbs = (locale: Locale): Crumb[] => [
  { name: ui.home[locale], routeKey: "home" },
  { name: { en: "Makkah", ar: "مكة المكرمة" }[locale], routeKey: "makkah" },
  { name: content.crumbLabel[locale], routeKey: content.routeKey },
];

/**
 * Makkah ↔ Madinah.
 *
 * Design concept — "one road, two journeys". Every other corridor page in the
 * project describes a direction. This one describes a *road* and then admits
 * that the road carries two journeys which are not reflections of each other,
 * and the composition is built to make that asymmetry visible rather than
 * stated.
 *
 * Deliberately unlike every published page:
 *
 * - **A route plate for a hero.** Not a photograph with text over it, not an
 *   arch, not a split: a drawn object — two city names at the ends of a road
 *   rule with the distance sitting on the line — with the photograph dimmed
 *   behind it. The plate is the thing you look at.
 * - **Direction plates** open each half: a wide rule carrying origin, a long
 *   arrow and destination, in the direction's own accent. Brass runs north,
 *   palm runs south, and the accent is carried through that half's content.
 * - **The asymmetry is in the layout, not just the prose.** Southbound holds
 *   two flagged blocks — the Miqat and the checkpoint — that northbound has no
 *   counterpart for, and they are marked with an edge flag rather than padded
 *   out with invented northbound equivalents to make the columns match.
 * - **A milepost strip** for the drive: a single rule with stages positioned
 *   along it by actual kilometre, not four equal cards pretending the journey
 *   is evenly divided.
 * - **Verdict chips** on the train comparison, where the chip is the answer
 *   rather than a decoration — and the speed row is given to the train.
 *
 * RTL: the milepost strip positions by `insetInlineStart`, and the direction
 * arrows mirror with `rtl:-scale-x-100`, so the whole page reverses without a
 * second set of geometry.
 */
export default async function MakkahToMadinahPage({
  params,
}: PageProps<"/[locale]/makkah-to-madinah">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const photo = image(content.imageKey);
  const faqHeadingId = "faq";

  /** Prefilled so the form opens already knowing the journey. */
  const quoteFor = (from: string, to: string) =>
    `${href(locale, "getQuote")}?pickup=${encodeURIComponent(from)}&dropoff=${encodeURIComponent(to)}`;

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

      {/* ---- Hero: the route plate ---------------------------------------- */}
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

          {/*
            The plate. A drawn route marker rather than a caption: two city
            names at the ends of a rule, the distance sitting on the line
            between them. Symmetric, so RTL needs nothing.
          */}
          <div className="mt-10 rounded-2xl border border-white/15 bg-white/[0.04] p-5 sm:p-7">
            <div className="flex items-center gap-4 sm:gap-6">
              <span className="shrink-0 text-base font-semibold text-white sm:text-lg">
                {content.plate.origin[locale]}
              </span>

              <span aria-hidden className="relative flex-1">
                <span className="block h-px w-full bg-white/25" />
                <span className="absolute inset-x-0 -top-2.5 flex justify-center">
                  <span className="numeric rounded-full bg-ink px-3 text-xs font-semibold tracking-wide text-brass">
                    {content.plate.distance[locale]}
                  </span>
                </span>
              </span>

              <span className="shrink-0 text-base font-semibold text-white sm:text-lg">
                {content.plate.destination[locale]}
              </span>
            </div>
            <p className="mt-4 text-center text-xs font-medium tracking-wide text-white/55 uppercase">
              {content.plate.bothWays[locale]}
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={quoteFor(
                content.plate.origin[locale],
                content.plate.destination[locale]
              )}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-brass px-6 text-sm font-semibold text-ink transition-colors hover:bg-brass-deep"
            >
              {content.primaryCta[locale]}
              <ArrowRightIcon
                aria-hidden
                className="size-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100"
              />
            </Link>
            <a
              href="#train"
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

      {/* ---- The thesis --------------------------------------------------- */}
      <section className="section-y">
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-h2 text-balance text-ink">
              {content.asymmetry.heading[locale]}
            </h2>
            {content.asymmetry.paragraphs.map((paragraph) => (
              <p
                key={paragraph.en}
                className="mt-5 text-lg leading-relaxed text-ink/80"
              >
                {paragraph[locale]}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Northbound --------------------------------------------------- */}
      <DirectionBlock
        accent="brass"
        index="01"
        from={content.northbound.from[locale]}
        to={content.northbound.to[locale]}
        heading={content.northbound.heading[locale]}
        lead={content.northbound.lead[locale]}
        points={content.northbound.points.map((p) => ({
          title: p.title[locale],
          body: p.body[locale],
        }))}
        quoteHref={quoteFor(
          content.northbound.from[locale],
          content.northbound.to[locale]
        )}
        quoteLabel={content.primaryCta[locale]}
      />

      {/* ---- Southbound, with the two blocks northbound has no twin for --- */}
      <DirectionBlock
        accent="palm"
        index="02"
        from={content.southbound.from[locale]}
        to={content.southbound.to[locale]}
        heading={content.southbound.heading[locale]}
        lead={content.southbound.lead[locale]}
        points={content.southbound.points.map((p) => ({
          title: p.title[locale],
          body: p.body[locale],
        }))}
        quoteHref={quoteFor(
          content.southbound.from[locale],
          content.southbound.to[locale]
        )}
        quoteLabel={content.primaryCta[locale]}
        tone="sand"
      >
        <div className="mt-10 flex flex-col gap-6">
          <FlaggedBlock
            label={content.southbound.miqat.label[locale]}
            heading={content.southbound.miqat.heading[locale]}
            paragraphs={content.southbound.miqat.body.map((p) => p[locale])}
            footnote={content.southbound.miqat.footnote[locale]}
          />
          <FlaggedBlock
            label={content.southbound.checkpoint.label[locale]}
            heading={content.southbound.checkpoint.heading[locale]}
            paragraphs={content.southbound.checkpoint.body.map((p) => p[locale])}
          />
        </div>
      </DirectionBlock>

      {/* ---- The road: a milepost strip ----------------------------------- */}
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

          {/*
            One rule, with the stages sitting at their real distance along it.
            Decoration only — every label it carries is also in the list below,
            so nothing is lost on a narrow screen where the strip is hidden.
          */}
          <div aria-hidden className="relative mt-12 hidden h-16 md:block">
            <div className="absolute inset-x-0 top-2 h-0.5 rounded-full bg-gradient-to-r from-brass via-border to-palm" />
            {content.road.stages.map((stage) => (
              <div
                key={stage.name.en}
                className="absolute top-0"
                style={{ insetInlineStart: `${((stage.km ?? 0) / 445) * 100}%` }}
              >
                <span className="block size-[18px] -translate-x-1/2 rounded-full border-2 border-palm bg-background rtl:translate-x-1/2" />
                <span className="numeric mt-2 block -translate-x-1/2 text-xs font-semibold whitespace-nowrap text-muted-foreground rtl:translate-x-1/2">
                  {stage.km} km
                </span>
              </div>
            ))}
          </div>

          <ol className="mt-8 grid gap-6 md:mt-6 md:grid-cols-2 lg:grid-cols-4">
            {content.road.stages.map((stage, index) => (
              <li
                key={stage.name.en}
                className="border-s-2 border-palm/30 ps-5"
              >
                <p className="numeric text-xs font-semibold text-brass-deep">
                  {String(index + 1).padStart(2, "0")} · {stage.km} km
                </p>
                <h3 className="mt-2 font-semibold text-ink">
                  {stage.name[locale]}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/75">
                  {stage.detail[locale]}
                </p>
              </li>
            ))}
          </ol>

          <p className="mt-10 max-w-3xl rounded-xl border border-border bg-card p-5 text-sm leading-relaxed text-ink/75">
            {content.road.footnote[locale]}
          </p>
        </div>
      </section>

      {/* ---- Car or train, with the chip as the answer -------------------- */}
      <section id="train" className="section-y scroll-mt-24 border-t border-border bg-sand">
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-h2 text-balance text-ink">
              {content.train.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              {content.train.lead[locale]}
            </p>
          </div>

          <ul className="mt-10 flex flex-col gap-px overflow-hidden rounded-2xl border border-border bg-border">
            {content.train.rows.map((row) => (
              <li
                key={row.question.en}
                className="bg-card p-5 sm:p-6 md:flex md:items-start md:gap-8"
              >
                <div className="md:w-72 md:shrink-0">
                  <div className="flex items-center gap-3">
                    <VerdictChip
                      verdict={row.verdict}
                      label={content.train.verdictLabels[row.verdict][locale]}
                    />
                  </div>
                  <h3 className="mt-3 font-semibold text-balance text-ink">
                    {row.question[locale]}
                  </h3>
                </div>
                <p className="mt-3 leading-relaxed text-ink/75 md:mt-0 md:flex-1">
                  {row.detail[locale]}
                </p>
              </li>
            ))}
          </ul>

          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {content.train.footnote[locale]}
          </p>
        </div>
      </section>

      {/* ---- Vehicles, from the shared category data ---------------------- */}
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

      {/* ---- What a quotation needs --------------------------------------- */}
      <section className="section-y border-t border-border bg-sand">
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-h2 text-balance text-ink">
              {content.quoting.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              {content.quoting.lead[locale]}
            </p>
          </div>

          <dl className="mt-10 grid gap-x-10 gap-y-7 md:grid-cols-2 lg:grid-cols-3">
            {content.quoting.points.map((point) => (
              <div key={point.title.en} className="border-s-2 border-brass/40 ps-5">
                <dt className="font-semibold text-ink">{point.title[locale]}</dt>
                <dd className="mt-1.5 leading-relaxed text-ink/75">
                  {point.body[locale]}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---- Booking ------------------------------------------------------ */}
      <section className="section-y border-t border-border">
        <div className="site-container">
          <div className="max-w-4xl">
            <h2 className="text-h2 text-balance text-ink">
              {content.booking.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              {content.booking.intro[locale]}
            </p>

            <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {content.booking.steps.map((step, index) => (
                <li key={step.title.en}>
                  <span
                    aria-hidden
                    className="numeric flex size-8 items-center justify-center rounded-full border border-palm/35 text-xs font-semibold text-palm"
                  >
                    {index + 1}
                  </span>
                  <h3 className="mt-3 font-semibold text-ink">
                    {step.title[locale]}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/70">
                    {step.body[locale]}
                  </p>
                </li>
              ))}
            </ol>

            <p className="mt-8 rounded-xl border border-brass/35 bg-brass/8 p-5 leading-relaxed text-ink/80">
              {content.booking.note[locale]}
            </p>
          </div>
        </div>
      </section>

      {/* ---- FAQ ---------------------------------------------------------- */}
      <section className="section-y border-t border-border bg-sand">
        <div className="site-container">
          <ClusterFaqList
            locale={locale}
            heading={
              locale === "ar" ? "الأسئلة الشائعة" : "Common questions"
            }
            headingId={faqHeadingId}
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
              href={quoteFor(
                content.plate.origin[locale],
                content.plate.destination[locale]
              )}
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

/* -------------------------------------------------------------------------- */

/**
 * One half of the corridor.
 *
 * The direction plate is the point: a wide rule carrying origin, a long arrow
 * and destination, in that direction's accent. `children` is where the
 * asymmetry lives — southbound passes two extra blocks, northbound passes
 * none, and nothing is padded to make the two halves match.
 */
function DirectionBlock({
  accent,
  index,
  from,
  to,
  heading,
  lead,
  points,
  quoteHref,
  quoteLabel,
  tone = "default",
  children,
}: {
  accent: "brass" | "palm";
  index: string;
  from: string;
  to: string;
  heading: string;
  lead: string;
  points: { title: string; body: string }[];
  quoteHref: string;
  quoteLabel: string;
  tone?: "default" | "sand";
  children?: React.ReactNode;
}) {
  const isBrass = accent === "brass";

  return (
    <section
      className={cn(
        "section-y border-t border-border",
        tone === "sand" && "bg-sand"
      )}
      aria-label={`${from} → ${to}`}
    >
      <div className="site-container">
        {/* The direction plate */}
        <div className="flex items-center gap-4">
          <span
            aria-hidden
            className={cn(
              "numeric shrink-0 text-sm font-semibold",
              isBrass ? "text-brass-deep" : "text-palm"
            )}
          >
            {index}
          </span>
          <span className="shrink-0 text-lg font-semibold text-ink sm:text-xl">
            {from}
          </span>
          <span aria-hidden className="relative flex min-w-10 flex-1 items-center">
            <span
              className={cn(
                "block h-0.5 w-full rounded-full",
                isBrass ? "bg-brass/50" : "bg-palm/40"
              )}
            />
            <ArrowRightIcon
              className={cn(
                "absolute end-0 size-4 rtl:-scale-x-100",
                isBrass ? "text-brass-deep" : "text-palm"
              )}
            />
          </span>
          <span className="shrink-0 text-lg font-semibold text-ink sm:text-xl">
            {to}
          </span>
        </div>

        <div className="mt-8 max-w-3xl">
          <h2 className="text-h2 text-balance text-ink">{heading}</h2>
          <p className="mt-5 text-lg leading-relaxed text-ink/80">{lead}</p>
        </div>

        <dl className="mt-10 grid gap-x-10 gap-y-7 md:grid-cols-2">
          {points.map((point) => (
            <div
              key={point.title}
              className={cn(
                "border-s-2 ps-5",
                isBrass ? "border-brass/40" : "border-palm/30"
              )}
            >
              <dt className="font-semibold text-ink">{point.title}</dt>
              <dd className="mt-1.5 leading-relaxed text-ink/75">
                {point.body}
              </dd>
            </div>
          ))}
        </dl>

        {children}

        <Link
          href={quoteHref}
          className="group mt-10 inline-flex items-center gap-2 text-sm font-semibold text-palm transition-colors hover:text-palm-deep"
        >
          <MapPinnedIcon aria-hidden className="size-4" />
          {quoteLabel}: {from} → {to}
          <ArrowRightIcon
            aria-hidden
            className="size-3.5 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100"
          />
        </Link>
      </div>
    </section>
  );
}

/**
 * A fact that exists in one direction only.
 *
 * The edge flag and the small label are what mark it as asymmetric — it is
 * not a warning box, because neither of these is a problem with the journey.
 */
function FlaggedBlock({
  label,
  heading,
  paragraphs,
  footnote,
}: {
  label: string;
  heading: string;
  paragraphs: string[];
  footnote?: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-7">
      <span
        aria-hidden
        className="absolute inset-y-0 start-0 w-1 bg-gradient-to-b from-palm to-brass"
      />
      <p className="text-eyebrow text-palm">{label}</p>
      <h3 className="text-h4 mt-3 text-balance text-ink">{heading}</h3>
      {paragraphs.map((paragraph) => (
        <p key={paragraph} className="mt-4 leading-relaxed text-ink/80">
          {paragraph}
        </p>
      ))}
      {footnote ? (
        <p className="mt-5 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">
          {footnote}
        </p>
      ) : null}
    </div>
  );
}

/** The answer, as an object rather than as a sentence to be skimmed past. */
function VerdictChip({
  verdict,
  label,
}: {
  verdict: "car" | "train" | "depends";
  label: string;
}) {
  const Icon =
    verdict === "car" ? CarFrontIcon : verdict === "train" ? TrainFrontIcon : ScaleIcon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
        verdict === "car" && "bg-palm-soft text-palm-deep",
        verdict === "train" && "bg-brass/15 text-brass-deep",
        verdict === "depends" && "bg-secondary text-muted-foreground"
      )}
    >
      <Icon aria-hidden className="size-3.5" />
      {label}
    </span>
  );
}
