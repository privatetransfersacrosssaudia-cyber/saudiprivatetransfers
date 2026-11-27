import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { CountryPageBody } from "@/components/cross-border/country-page";
import { bahrain as content } from "@/lib/content/cross-border/countries";
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
}: PageProps<"/[locale]/saudi-arabia-to-bahrain">): Promise<Metadata> {
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
 * Saudi Arabia to Bahrain.
 *
 * The shortest international journey in the cluster, and the one where the
 * approach matters more than the crossing: the causeway is about 25 km, but
 * reaching it from Al Khobar, from Riyadh and from Jeddah are three entirely
 * different days. So the page leans on the pickup address rather than the
 * destination.
 *
 * It deliberately does not duplicate the existing King Fahd Causeway guide.
 * That page is travel information — documents, insurance, fees, verified
 * against official sources and marked where it could not be. This one is the
 * commercial page for arranging the car, and each links to the other with its
 * role stated, so the two do not compete for the same intent.
 */
export default async function SaudiToBahrainPage({
  params,
}: PageProps<"/[locale]/saudi-arabia-to-bahrain">) {
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
