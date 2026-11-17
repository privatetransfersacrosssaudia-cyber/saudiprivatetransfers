import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { DocumentChecklist } from "@/components/border/document-checklist";
import {
  BorderProcessTimeline,
  GuideFaq,
  OfficialResources,
  TravelCostTable,
} from "@/components/border/guide-extras";
import {
  BorderGuideHero,
  GuideTableOfContents,
  RouteOverview,
} from "@/components/border/guide-hero";
import { GuideSection, slugify } from "@/components/border/guide-section";
import {
  BookingSteps,
  GuideQuoteCta,
  SaudiSideRoutes,
} from "@/components/border/conversion";
import { bahrainGuide } from "@/lib/content/border/bahrain";
import { bahrainPage } from "@/lib/content/border/bahrain-page";
import { href } from "@/lib/i18n/routes";
import { isLocale, locales } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * The Saudi–Bahrain border guide.
 *
 * Reads as a travel guide, not as a research report. The evidence behind it is
 * unchanged — `lib/content/border/bahrain.ts` still carries every claim with
 * its status, its sources and the date each was checked — but none of that is
 * rendered as a badge or a statistic. Status now decides how a claim is
 * worded and where it sits: confirmed things are stated, unconfirmed things
 * are gathered into a "confirm before you travel" panel per section, and the
 * sources fold away into a disclosure at the end of each one.
 *
 * Presentation copy lives in `bahrain-page.ts`, separately from the research,
 * so the design can change again without anyone touching a sourced claim.
 *
 * The commercial layer is deliberately narrow. Every call to action names a
 * Saudi city, because that is the only journey this company runs: the hero
 * says so, the route section says so, and the closing prompt says so again.
 */
export async function generateMetadata({
  params,
}: PageProps<"/[locale]/saudi-to-bahrain">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  return pageMetadata({
    locale,
    routeKey: "saudiToBahrain",
    title: bahrainGuide.metaTitle[locale],
    description: bahrainGuide.metaDescription[locale],
    imageKey: bahrainPage.heroImageKey,
  });
}

export default async function SaudiToBahrainPage({
  params,
}: PageProps<"/[locale]/saudi-to-bahrain">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const guide = bahrainGuide;
  const page = bahrainPage;

  /**
   * The quote link, prefilled through the form's existing query contract.
   * `dropoff` is Al Khobar because that is where the Saudi-side journey ends;
   * nothing here implies a crossing.
   */
  const quoteHref = (dropoff: string) =>
    `${href(locale, "getQuote")}?dropoff=${encodeURIComponent(dropoff)}`;

  const alKhobar = locale === "ar" ? "الخبر" : "Al Khobar";

  // Contents: the research sections, then the fixed set pieces below them.
  const contents = [
    ...guide.sections.map((section) => ({
      id: slugify(section.heading.en),
      label: section.heading,
    })),
    { id: "crossing-process", label: page.processHeading },
    { id: "costs", label: page.costsHeading },
    { id: "checklists", label: page.checklistsHeading },
    { id: "faq", label: page.faqHeading },
    { id: "saudi-routes", label: page.routesHeading },
    { id: "official-resources", label: page.resourcesHeading },
  ];

  return (
    <>
      <BorderGuideHero
        locale={locale}
        eyebrow={page.eyebrow}
        title={guide.title}
        standfirst={guide.standfirst}
        serviceNotice={guide.serviceNotice}
        lastVerified={guide.lastVerified}
        imageKey={page.heroImageKey}
        primaryCta={{ label: page.primaryCta, href: quoteHref(alKhobar) }}
        secondaryCta={{ label: page.secondaryCta, href: "#at-a-glance" }}
      />

      {/* At a glance + contents */}
      <section id="at-a-glance" className="section-y scroll-mt-24 bg-sand">
        <div className="site-container">
          <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
            <RouteOverview
              locale={locale}
              heading={page.overviewHeading}
              rows={[...page.overviewRows]}
              footnote={page.overviewFootnote}
            />
            <GuideTableOfContents
              locale={locale}
              heading={page.contents}
              entries={contents}
            />
          </div>

          <div className="mx-auto mt-6 max-w-5xl">
            <GuideQuoteCta
              locale={locale}
              heading={page.ctaAfterOverview.heading}
              body={page.ctaAfterOverview.body}
              cta={page.ctaAfterOverview.cta}
              href={quoteHref(alKhobar)}
              whatsappMessage={page.whatsappMessage}
            />
          </div>
        </div>
      </section>

      {/* The researched sections, as prose */}
      <div className="site-container">
        <div className="mx-auto max-w-3xl">
          {guide.sections.map((section, index) => (
            <GuideSection
              key={section.heading.en}
              section={section}
              locale={locale}
              className={index === 0 ? "pt-16 lg:pt-20" : "mt-16 lg:mt-20"}
            />
          ))}

          <div id="crossing-process" className="scroll-mt-24">
            <BorderProcessTimeline
              locale={locale}
              heading={page.processHeading}
              intro={page.processIntro}
              steps={[...page.processSteps]}
              className="mt-16 lg:mt-20"
            />
          </div>
        </div>
      </div>

      {/* Costs */}
      <section id="costs" className="section-y mt-16 scroll-mt-24 bg-sand lg:mt-20">
        <div className="site-container">
          <div className="mx-auto max-w-3xl">
            <TravelCostTable
              locale={locale}
              heading={page.costsHeading}
              intro={page.costsIntro}
              rows={[...page.costRows]}
            />
          </div>
        </div>
      </section>

      {/* Checklists */}
      <section id="checklists" className="section-y scroll-mt-24">
        <div className="site-container">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-h3 text-balance text-ink">
              {page.checklistsHeading[locale]}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink/80">
              {page.checklistsIntro[locale]}
            </p>

            <div className="mt-8 flex flex-col gap-6">
              {guide.checklists.map((checklist) => (
                <DocumentChecklist
                  key={checklist.id}
                  checklist={checklist}
                  locale={locale}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section-y scroll-mt-24 bg-sand">
        <div className="site-container">
          <div className="mx-auto max-w-3xl">
            <GuideFaq locale={locale} heading={page.faqHeading} faqs={guide.faqs} />
          </div>
        </div>
      </section>

      {/* Saudi-side routes — the part of this journey we actually run */}
      <section id="saudi-routes" className="section-y scroll-mt-24">
        <div className="site-container">
          <div className="mx-auto max-w-3xl">
            <SaudiSideRoutes
              locale={locale}
              heading={page.routesHeading}
              intro={page.routesIntro}
              footnote={page.routesFootnote}
              routes={page.relatedRoutes.map((route) => ({
                label: route.label,
                description: route.description,
                href: href(locale, route.routeKey),
              }))}
            />

            <BookingSteps
              locale={locale}
              heading={page.bookingHeading}
              intro={page.bookingIntro}
              steps={[...page.bookingSteps]}
              className="mt-16 lg:mt-20"
            />
          </div>
        </div>
      </section>

      {/* Official resources */}
      <section id="official-resources" className="section-y scroll-mt-24 bg-sand">
        <div className="site-container">
          <div className="mx-auto max-w-3xl">
            <OfficialResources
              locale={locale}
              heading={page.resourcesHeading}
              intro={page.resourcesIntro}
              authorities={guide.authorities}
            />

            <GuideQuoteCta
              locale={locale}
              heading={page.ctaClosing.heading}
              body={page.ctaClosing.body}
              cta={page.ctaClosing.cta}
              href={quoteHref(alKhobar)}
              whatsappMessage={page.whatsappMessage}
              tone="loud"
              className="mt-12"
            />
          </div>
        </div>
      </section>
    </>
  );
}
