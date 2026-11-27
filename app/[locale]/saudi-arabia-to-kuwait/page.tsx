import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { CountryPageBody } from "@/components/cross-border/country-page";
import { kuwait as content } from "@/lib/content/cross-border/countries";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { ui } from "@/lib/i18n/dictionary";
import { image } from "@/lib/site-images";
import { pageMetadata } from "@/lib/seo";
import { clusterPageJsonLd, jsonLdScript, type Crumb } from "@/lib/structured-data";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/saudi-arabia-to-kuwait">): Promise<Metadata> {
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

/** Three levels: this sits under the cross-border hub. */
const crumbs = (locale: Locale): Crumb[] => [
  { name: ui.home[locale], routeKey: "home" },
  {
    name: { en: "Cross-border transfers", ar: "النقل عبر الحدود" }[locale],
    routeKey: "crossBorderTransfers",
  },
  { name: content.crumbLabel[locale], routeKey: content.routeKey },
];

/**
 * Saudi Arabia to Kuwait.
 *
 * The only country in the cluster reached by a genuine choice of gate:
 * Khafji ↔ Nuwaiseeb on the coast, and Ar-Ruqi ↔ Salmi inland by Hafr
 * Al-Batin. Which one suits follows the pickup rather than the destination,
 * so the crossings render as a two-column comparison here and the checklist
 * puts the starting address first. The customer is told they do not need to
 * choose — that is the route planning's job.
 */
export default async function SaudiToKuwaitPage({
  params,
}: PageProps<"/[locale]/saudi-arabia-to-kuwait">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const photo = image(content.imageKey);

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
      <CountryPageBody content={content} locale={locale} crumbs={crumbs(locale)} />
    </>
  );
}
