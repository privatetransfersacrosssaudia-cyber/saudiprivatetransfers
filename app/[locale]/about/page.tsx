import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, CompassIcon } from "lucide-react";

import { BookingSteps, GuideQuoteCta } from "@/components/border/conversion";
import { ClusterFaqList } from "@/components/cluster/cluster-faq";
import { HeroSentinel } from "@/components/layout/site-header";
import { about } from "@/lib/content/about";
import { altText } from "@/lib/images";
import { href } from "@/lib/i18n/routes";
import { isLocale, locales } from "@/lib/i18n/config";
import { image } from "@/lib/site-images";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * The About page.
 *
 * A trust page, so the design carries the same editorial language as the
 * redesigned border guide: photographic hero, generous measure, section rules
 * rather than a card for every paragraph.
 *
 * Everything factual comes from `lib/content/about.ts`, which is written under
 * the rule that nothing may be invented — no founding year, no office, no
 * fleet, no staff count, no testimonials. The page is persuasive by being
 * specific about process, not by making claims nobody can check.
 */
export async function generateMetadata({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  return pageMetadata({
    locale,
    routeKey: "about",
    title: about.metaTitle[locale],
    description: about.metaDescription[locale],
    imageKey: about.heroImageKey,
  });
}

export default async function AboutPage({
  params,
}: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const photo = image(about.heroImageKey);
  const quoteHref = href(locale, "getQuote");

  return (
    <>
      {/* Hero */}
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
          className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/92 via-ink/84 to-ink/95"
        />

        <div className="site-container pt-32 pb-16 md:pt-34 lg:pt-42 lg:pb-24">
          <div className="max-w-3xl">
            <p className="text-eyebrow text-brass">{about.eyebrow[locale]}</p>
            <h1 className="text-display mt-4 text-balance text-white">
              {about.heroTitle[locale]}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/85">
              {about.heroStandfirst[locale]}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={quoteHref}
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-brass px-6 text-sm font-semibold text-ink transition-colors hover:bg-brass-deep"
              >
                {about.heroPrimaryCta[locale]}
                <ArrowRightIcon
                  aria-hidden
                  className="size-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100"
                />
              </Link>
              <a
                href="#coverage"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/25 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <CompassIcon aria-hidden className="size-4" />
                {about.heroSecondaryCta[locale]}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Who we are */}
      <section className="section-y">
        <div className="site-container">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-h3 text-balance text-ink">
              {about.whoHeading[locale]}
            </h2>
            <div className="mt-6 flex flex-col gap-5">
              {about.whoBody.map((paragraph) => (
                <p
                  key={paragraph.en}
                  className="text-lg leading-relaxed text-ink/80"
                >
                  {paragraph[locale]}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What we arrange */}
      <section className="section-y border-t border-border bg-sand">
        <div className="site-container">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-h3 text-balance text-ink">
              {about.servicesHeading[locale]}
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/80">
              {about.servicesIntro[locale]}
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {about.serviceLinks.map((service) => (
                <li key={service.name.en}>
                  <Link
                    href={href(locale, service.routeKey)}
                    className="group flex h-full flex-col gap-2 rounded-xl border border-border bg-card p-5 transition-colors hover:border-palm/40 hover:bg-palm-soft/40"
                  >
                    <span className="flex items-center gap-2 font-semibold text-ink group-hover:text-palm">
                      {service.name[locale]}
                      <ArrowRightIcon
                        aria-hidden
                        className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100"
                      />
                    </span>
                    <span className="text-sm leading-relaxed text-ink/70">
                      {service.body[locale]}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {about.servicesFootnote[locale]}
            </p>
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section id="coverage" className="section-y scroll-mt-24 border-t border-border">
        <div className="site-container">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-h3 text-balance text-ink">
              {about.coverageHeading[locale]}
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/80">
              {about.coverageIntro[locale]}
            </p>

            <div className="mt-8 flex flex-col gap-7">
              {about.coverageGroups.map((group) => (
                <div key={group.region.en}>
                  <h3 className="text-eyebrow text-brass-deep">
                    {group.region[locale]}
                  </h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {group.places.map((place) => (
                      <li key={place.routeKey}>
                        <Link
                          href={href(locale, place.routeKey)}
                          className="inline-flex rounded-lg border border-border bg-card px-3.5 py-2 text-sm font-medium text-ink transition-colors hover:border-palm/40 hover:bg-palm-soft/50 hover:text-palm"
                        >
                          {place.label[locale]}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How booking works */}
      <section className="section-y border-t border-border bg-sand">
        <div className="site-container">
          <div className="mx-auto max-w-4xl">
            <BookingSteps
              locale={locale}
              heading={about.bookingHeading}
              intro={about.bookingIntro}
              steps={[...about.bookingSteps]}
            />
            <p className="mt-6 max-w-2xl rounded-xl border border-brass/35 bg-brass/8 p-4 text-sm leading-relaxed text-ink/80">
              {about.bookingNote[locale]}
            </p>
          </div>
        </div>
      </section>

      {/* What to expect */}
      <section className="section-y border-t border-border">
        <div className="site-container">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-h3 text-balance text-ink">
              {about.whyHeading[locale]}
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/80">
              {about.whyIntro[locale]}
            </p>

            <dl className="mt-8 grid gap-x-10 gap-y-7 sm:grid-cols-2">
              {about.whyPoints.map((point) => (
                <div key={point.title.en} className="border-s-2 border-palm/30 ps-5">
                  <dt className="font-semibold text-ink">
                    {point.title[locale]}
                  </dt>
                  <dd className="mt-1.5 leading-relaxed text-ink/75">
                    {point.body[locale]}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="section-y border-t border-border bg-sand">
        <div className="site-container">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-h3 text-balance text-ink">
              {about.approachHeading[locale]}
            </h2>

            <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {about.approachPoints.map((point, index) => (
                <li
                  key={point.title.en}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <span
                    aria-hidden
                    className="numeric font-heading text-2xl text-brass"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-2 font-semibold text-ink">
                    {point.title[locale]}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/70">
                    {point.body[locale]}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* FAQ — the site's existing accordion, so behaviour matches every other page */}
      <section className="section-y border-t border-border">
        <div className="site-container">
          <div className="mx-auto max-w-3xl">
            <ClusterFaqList
              locale={locale}
              heading={about.faqHeading[locale]}
              headingId="about-faq"
              faqs={[...about.faqs]}
            />
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section-y border-t border-border bg-sand">
        <div className="site-container">
          <div className="mx-auto max-w-3xl">
            <GuideQuoteCta
              locale={locale}
              heading={about.ctaHeading}
              body={about.ctaBody}
              cta={about.ctaPrimary}
              href={quoteHref}
              whatsappMessage={about.whatsappMessage}
              tone="loud"
            />
          </div>
        </div>
      </section>
    </>
  );
}
