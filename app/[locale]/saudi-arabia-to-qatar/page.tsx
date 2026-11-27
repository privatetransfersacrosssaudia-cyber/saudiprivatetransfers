import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { CountryPageBody } from "@/components/cross-border/country-page";
import { qatar as content } from "@/lib/content/cross-border/countries";
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
}: PageProps<"/[locale]/saudi-arabia-to-qatar">): Promise<Metadata> {
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
 * Saudi Arabia to Qatar.
 *
 * Qatar has exactly one land border in the world and it is with Saudi Arabia,
 * so Salwa ↔ Abu Samra carries everything arriving by road. The page is built
 * around the consequence most customers underestimate: Abu Samra sits in the
 * far south-west of the peninsula while Doha is up the eastern coast, so the
 * leg *after* the border is substantial in its own right. That is why the
 * destination address is pressed for as hard as the pickup.
 */
export default async function SaudiToQatarPage({
  params,
}: PageProps<"/[locale]/saudi-arabia-to-qatar">) {
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
