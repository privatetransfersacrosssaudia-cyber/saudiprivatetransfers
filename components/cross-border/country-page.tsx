import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  FileTextIcon,
  MessageCircleIcon,
  RouteIcon,
} from "lucide-react";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ClusterFaqList } from "@/components/cluster/cluster-faq";
import { RelatedLinks } from "@/components/cluster/related-links";
import { HeroSentinel } from "@/components/layout/site-header";
import {
  arrangementNote,
  documentsNote,
  type CountryPage,
} from "@/lib/content/cross-border/countries";
import { vehicleClasses } from "@/lib/content/vehicles";
import { href } from "@/lib/i18n/routes";
import type { Locale } from "@/lib/i18n/config";
import { altText } from "@/lib/images";
import { image } from "@/lib/site-images";
import { whatsappUrl } from "@/lib/site";
import { type Crumb } from "@/lib/structured-data";
import { cn } from "cn";

/**
 * The shared body of the five cross-border country pages.
 *
 * ## Why one component rather than five hand-built pages
 *
 * These five are siblings in one cluster selling one service, so a shared
 * spine is the honest structure: it keeps them consistent with each other,
 * strongly typed, and cheap to correct when an operational fact changes —
 * which, on this cluster, it already has once.
 *
 * What makes them read differently is the data, not a different template.
 * The layout adapts to what each country actually is:
 *
 * - **Crossings** render as one wide panel where a country has a single gate
 *   (UAE, Bahrain, Qatar) and as a two-column comparison where it has a real
 *   choice (Kuwait's coastal and inland posts, Oman's desert road versus the
 *   older route through the Emirates). That is a genuine difference in the
 *   subject, so it is a genuine difference on the page.
 * - **Cities** are numbered, because on four of the five the order is the
 *   order the road reaches them.
 * - Each page carries its own hero photograph, intro of two to four
 *   paragraphs, checklist of four or five items, and its own FAQ set — no
 *   question is repeated between the five.
 *
 * ## What every page refuses to say
 *
 * No durations, prices, waiting times, opening hours or procedures; no claim
 * that a particular vehicle may cross a particular border; no statement about
 * who may enter where. `arrangementNote` and `documentsNote` are shared on
 * purpose — they are the two things that are true identically everywhere, and
 * keeping them in one place stops a later edit from weakening one page's
 * version of them without the others.
 */
export function CountryPageBody({
  content,
  locale,
  crumbs,
}: {
  content: CountryPage;
  locale: Locale;
  crumbs: Crumb[];
}) {
  const photo = image(content.imageKey);
  const quotePath = href(locale, "getQuote");
  const quoteHref = `${quotePath}?dropoff=${encodeURIComponent(
    content.dropoffSeed[locale]
  )}`;
  const whatsapp = whatsappUrl(content.whatsappMessage[locale]);
  const hubPath = href(locale, "crossBorderTransfers");
  const twoWays = content.crossings.items.length > 1;

  return (
    <>
      {/* ---- Hero ------------------------------------------------------- */}
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
          <Breadcrumbs locale={locale} crumbs={crumbs} tone="invert" />

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
            <Link
              href={hubPath}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/25 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {locale === "ar" ? "كل الوجهات" : "All destinations"}
            </Link>
          </div>

          <p className="mt-5 text-xs text-white/50">{altText(photo, locale)}</p>
        </div>
      </section>

      {/* ---- Intro ------------------------------------------------------- */}
      <section className="section-y bg-background">
        <div className="site-container">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <h2 className="text-h2 text-balance text-ink">
                {content.intro.heading[locale]}
              </h2>
            </div>
            <div className="lg:col-span-7">
              {content.intro.body.map((para, i) => (
                <p
                  key={i}
                  className={cn(
                    "leading-relaxed text-ink/80",
                    i === 0 ? "text-lg" : "mt-5"
                  )}
                >
                  {para[locale]}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---- The crossing(s) --------------------------------------------- */}
      <section className="section-y bg-palm text-white">
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-h2 text-balance text-white">
              {content.crossings.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/80">
              {content.crossings.lead[locale]}
            </p>
          </div>

          <div
            className={cn(
              "mt-10 grid gap-px overflow-hidden rounded-2xl bg-white/15",
              twoWays && "md:grid-cols-2"
            )}
          >
            {content.crossings.items.map((item) => (
              <div key={item.saudiSide.en} className="bg-palm p-7">
                <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-eyebrow text-brass">
                  <span>{item.saudiSide[locale]}</span>
                  <ArrowRightIcon
                    aria-hidden
                    className="size-3.5 shrink-0 rtl:-scale-x-100"
                  />
                  <span>{item.otherSide[locale]}</span>
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/80">
                  {item.detail[locale]}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-3xl border-t border-white/15 pt-6 text-sm leading-relaxed text-white/70">
            {content.crossings.note[locale]}
          </p>
        </div>
      </section>

      {/* ---- Destination cities ------------------------------------------ */}
      <section className="section-y bg-background">
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-h2 text-balance text-ink">
              {content.cities.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              {content.cities.lead[locale]}
            </p>
          </div>

          <ol className="mt-10">
            {content.cities.items.map((city, index) => (
              <li
                key={city.name.en}
                className="grid gap-x-10 gap-y-2 border-t border-ink/12 py-6 lg:grid-cols-12"
              >
                <div className="lg:col-span-4">
                  <span className="numeric text-xs font-semibold text-brass-deep">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-h3 mt-1 text-balance text-ink">
                    {city.name[locale]}
                  </h3>
                </div>
                <p className="leading-relaxed text-ink/75 lg:col-span-8">
                  {city.note[locale]}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---- Saudi departures -------------------------------------------- */}
      <section className="section-y bg-sand/40">
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-h2 text-balance text-ink">
              {content.departures.heading[locale]}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              {content.departures.body[locale]}
            </p>
          </div>
        </div>
      </section>

      {/* ---- Checklist ---------------------------------------------------- */}
      <section className="section-y bg-background">
        <div className="site-container">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <h2 className="text-h2 text-balance text-ink">
                {content.checklist.heading[locale]}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink/80">
                {content.checklist.lead[locale]}
              </p>

              <div className="mt-8 rounded-xl border border-ink/12 p-5">
                <p className="flex items-center gap-2.5 text-sm font-semibold text-ink">
                  <RouteIcon
                    aria-hidden
                    className="size-4 shrink-0 text-brass-deep"
                  />
                  {locale === "ar"
                    ? "من يقود بعد الحدود"
                    : "Who drives after the border"}
                </p>
                <p className="mt-2.5 text-sm leading-relaxed text-ink/75">
                  {arrangementNote[locale]}
                </p>
              </div>

              <div className="mt-5 rounded-xl border border-ink/12 p-5">
                <p className="flex items-center gap-2.5 text-sm font-semibold text-ink">
                  <FileTextIcon
                    aria-hidden
                    className="size-4 shrink-0 text-brass-deep"
                  />
                  {locale === "ar"
                    ? "الوثائق والدخول"
                    : "Documents and entry"}
                </p>
                <p className="mt-2.5 text-sm leading-relaxed text-ink/75">
                  {documentsNote[locale]}
                </p>
              </div>
            </div>

            <ol className="lg:col-span-7">
              {content.checklist.items.map((item, index) => (
                <li
                  key={item.label.en}
                  className="flex gap-5 border-b border-ink/10 py-5 first:pt-0"
                >
                  <span className="numeric shrink-0 text-xs font-semibold text-brass-deep">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-base font-semibold text-ink">
                      {item.label[locale]}
                    </span>
                    <span className="mt-1.5 block text-sm leading-relaxed text-ink/75">
                      {item.body[locale]}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ---- Vehicles ----------------------------------------------------- */}
      <section className="section-y bg-sand/40">
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-h2 text-balance text-ink">
              {locale === "ar" ? "المركبات" : "Vehicles"}
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

      {/* ---- FAQs --------------------------------------------------------- */}
      <section className="section-y bg-background">
        <div className="site-container">
          <ClusterFaqList
            locale={locale}
            heading={locale === "ar" ? "أسئلة متكررة" : "Common questions"}
            headingId="country-faqs"
            faqs={content.faqs}
            layout="split"
          />
        </div>
      </section>

      {/* ---- CTA ---------------------------------------------------------- */}
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
                  {locale === "ar" ? "اسأل عبر واتساب" : "Ask on WhatsApp"}
                </a>
              ) : null}
            </div>

            <p className="mt-6 text-sm leading-relaxed text-white/60">
              {locale === "ar"
                ? "إرسال النموذج يبدأ محادثة لا حجزًا. فلا دفع إلكتروني ولا تأكيد توافر فوري — يأتي عرض السعر أولًا، ويُؤكَّد الحجز بعد قبولك له."
                : "Sending the form starts a conversation, not a booking. There is no online payment and no instant availability — the quotation comes first, and the booking is confirmed once you accept it."}
            </p>
          </div>
        </div>
      </section>

      {/* ---- Related ------------------------------------------------------- */}
      <section className="section-y bg-background">
        <div className="site-container">
          <RelatedLinks
            locale={locale}
            heading={locale === "ar" ? "صفحات ذات صلة" : "Related pages"}
            links={content.related}
          />
        </div>
      </section>
    </>
  );
}
