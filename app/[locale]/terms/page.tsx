import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon, MailIcon } from "lucide-react";

import { terms } from "@/lib/content/terms";
import { href } from "@/lib/i18n/routes";
import { isLocale, locales } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * Terms and conditions.
 *
 * Shares the privacy policy's layout on purpose: no photographic hero, a
 * reading measure, a contents list because people arrive looking for one
 * clause rather than to read it through. A marketing hero above a legal page
 * makes the page look like a sales pitch, which is the opposite of what a
 * reader checking a cancellation term needs.
 *
 * The content comes from `lib/content/terms.ts`, which was written from the
 * implementation — see the note at the top of that file for what each clause
 * traces to, and for the list of things it deliberately does not claim.
 */
export async function generateMetadata({
  params,
}: PageProps<"/[locale]/terms">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  return pageMetadata({
    locale,
    routeKey: "terms",
    title: terms.metaTitle[locale],
    description: terms.metaDescription[locale],
  });
}

export default async function TermsPage({
  params,
}: PageProps<"/[locale]/terms">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <section className="section-y bg-sand">
      <div className="site-container">
        <div className="mx-auto max-w-3xl">
          <Link
            href={href(locale, "home")}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-palm transition-colors hover:text-palm-deep"
          >
            <ArrowLeftIcon aria-hidden className="size-4 rtl:-scale-x-100" />
            {locale === "ar" ? "العودة إلى الرئيسية" : "Back to home"}
          </Link>

          <header className="mt-8 border-b border-border pb-8">
            <p className="text-eyebrow text-brass-deep">
              {terms.eyebrow[locale]}
            </p>
            <h1 className="text-h1 mt-3 text-balance text-ink">
              {terms.title[locale]}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              {terms.standfirst[locale]}
            </p>
            <p className="numeric mt-5 text-sm text-muted-foreground">
              {terms.lastUpdatedLabel[locale]}:{" "}
              <time dateTime={terms.lastUpdated} className="text-ink">
                {terms.lastUpdated}
              </time>
            </p>
          </header>

          {/* Contents — people arrive for one clause, not to read it through */}
          <nav
            aria-label={terms.contentsHeading[locale]}
            className="mt-8 rounded-2xl border border-border bg-card p-5 sm:p-6"
          >
            <h2 className="text-eyebrow text-brass-deep">
              {terms.contentsHeading[locale]}
            </h2>
            <ol className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
              {terms.sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-ink underline-offset-4 transition-colors hover:text-palm hover:underline"
                  >
                    {section.heading[locale]}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-12 flex flex-col gap-12">
            {terms.sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <h2 className="text-h3 text-balance text-ink">
                  {section.heading[locale]}
                </h2>

                {section.body?.map((paragraph) => (
                  <p
                    key={paragraph.en}
                    className="mt-4 leading-relaxed text-ink/80"
                  >
                    {paragraph[locale]}
                  </p>
                ))}

                {section.bullets ? (
                  <ul className="mt-5 flex flex-col gap-3">
                    {section.bullets.map((bullet) => (
                      <li
                        key={bullet.en}
                        className="border-s-2 border-palm/30 ps-4 leading-relaxed text-ink/80"
                      >
                        {bullet[locale]}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          {/* Contact */}
          <section
            id="contact"
            className="mt-12 scroll-mt-24 rounded-2xl border border-border bg-card p-6 sm:p-7"
          >
            <h2 className="text-h4 text-ink">{terms.contactHeading[locale]}</h2>
            <p className="mt-3 leading-relaxed text-ink/80">
              {terms.contactBody[locale]}
            </p>

            {site.contact.email ? (
              <a
                href={`mailto:${site.contact.email}`}
                /* `dir="ltr"` so the address does not reorder in Arabic. */
                dir="ltr"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-palm px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-palm-deep"
              >
                <MailIcon aria-hidden className="size-4" />
                {site.contact.email}
              </a>
            ) : null}

            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              {locale === "ar"
                ? "وتوضح سياسة الخصوصية ما يحدث للبيانات التي ترسلها، وتسرد صفحة الاعتمادات رخص الصور."
                : "The privacy policy covers what happens to the details you send, and the credits page lists the photograph licences."}{" "}
              <Link
                href={href(locale, "privacy")}
                className="text-palm underline-offset-4 hover:underline"
              >
                {locale === "ar" ? "سياسة الخصوصية" : "Privacy policy"}
              </Link>
              {" · "}
              <Link
                href={href(locale, "credits")}
                className="text-palm underline-offset-4 hover:underline"
              >
                {locale === "ar" ? "اعتمادات الصور" : "Photo credits"}
              </Link>
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
