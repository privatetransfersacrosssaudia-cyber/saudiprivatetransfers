import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { CountryPageBody } from "@/components/cross-border/country-page";
import { jordan as content } from "@/lib/content/cross-border/countries";
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
}: PageProps<"/[locale]/saudi-arabia-to-jordan">): Promise<Metadata> {
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
 * Saudi Arabia to Jordan.
 *
 * The sixth and newest country in the cluster, and the one that breaks its
 * pattern twice over. Jordan is reached from the **north-west** rather than
 * the Gulf, so Tabuk and Al-Jouf are the near side and the Eastern Province
 * is the far one — the inverse of every other page here. And it has **three**
 * land ports rather than one or two, which would be a footnote except that
 * they surface at opposite ends of the country: Al-Haditha onto the road to
 * Amman, Ad-Durrah beside Aqaba, Halat Ammar facing Ma'an where Petra sits.
 *
 * So the page's argument is that the destination picks the gate, not the
 * customer — and the checklist leads with "where in Jordan, by name" because
 * "Jordan" on its own genuinely cannot be routed.
 */
export default async function SaudiToJordanPage({
  params,
}: PageProps<"/[locale]/saudi-arabia-to-jordan">) {
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
