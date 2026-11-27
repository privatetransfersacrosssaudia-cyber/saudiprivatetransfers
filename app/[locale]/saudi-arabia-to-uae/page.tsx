import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { CountryPageBody } from "@/components/cross-border/country-page";
import { uae as content } from "@/lib/content/cross-border/countries";
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
}: PageProps<"/[locale]/saudi-arabia-to-uae">): Promise<Metadata> {
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
 * Saudi Arabia to the UAE.
 *
 * The page's spine is that Al Batha ↔ Ghuwaifat is the *only* land crossing
 * between the two countries, which is why the Emirates arrive in a sequence
 * once you are through it: Abu Dhabi, then Dubai, then the northern Emirates,
 * with Al Ain on its own inland road. Naming the city rather than the country
 * is therefore the single most useful thing a customer can do, and the page
 * says so rather than implying every destination is equivalent.
 */
export default async function SaudiToUaePage({
  params,
}: PageProps<"/[locale]/saudi-arabia-to-uae">) {
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
