import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon, MailIcon } from "lucide-react";

import { privacy } from "@/lib/content/privacy";
import { href } from "@/lib/i18n/routes";
import { isLocale, locales } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * The privacy policy.
 *
 * Deliberately not given a photographic hero. The other pages open on a
 * picture because they are selling a journey; this one is a legal statement,
 * and a stock photograph above it would make it look like marketing. It gets
 * the same typography and spacing as everything else, set at a reading
 * measure, with a contents list because people arrive here looking for one
 * specific answer rather than to read it through.
 *
 * All content comes from `lib/content/privacy.ts`, which was written from the
 * codebase: the field list is the real schema, the processors are the real
 * ones, and the storage keys are the real keys.
 */
export async function generateMetadata({
  params,
}: PageProps<"/[locale]/privacy">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  return pageMetadata({
    locale,
    routeKey: "privacy",
    title: privacy.metaTitle[locale],
    description: privacy.metaDescription[locale],
  });
}

export default async function PrivacyPage({
  params,
}: PageProps<"/[locale]/privacy">) {
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
              {privacy.eyebrow[locale]}
            </p>
            <h1 className="text-h1 mt-3 text-balance text-ink">
              {privacy.title[locale]}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              {privacy.standfirst[locale]}
            </p>
            <p className="numeric mt-5 text-sm text-muted-foreground">
              {privacy.lastUpdatedLabel[locale]}:{" "}
              <time dateTime={privacy.lastUpdated} className="text-ink">
                {privacy.lastUpdated}
              </time>
            </p>
          </header>

          {/* Contents — people arrive for one answer, not to read it through */}
          <nav
            aria-label={privacy.contentsHeading[locale]}
            className="mt-8 rounded-2xl border border-border bg-card p-5 sm:p-6"
          >
            <h2 className="text-eyebrow text-brass-deep">
              {privacy.contentsHeading[locale]}
            </h2>
            <ol className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
              {privacy.sections.map((section) => (
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
            {privacy.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-24"
              >
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

                {section.list ? (
                  <dl className="mt-6 flex flex-col gap-5">
                    {section.list.map((entry) => (
                      <div key={entry.term.en}>
                        <dt className="font-semibold text-ink">
                          {entry.term[locale]}
                        </dt>
                        <dd className="mt-1.5 leading-relaxed text-ink/75">
                          {entry.detail[locale]}
                        </dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
              </section>
            ))}
          </div>

          {/* Contact */}
          <section
            id="contact"
            className="mt-12 scroll-mt-24 rounded-2xl border border-border bg-card p-6 sm:p-7"
          >
            <h2 className="text-h4 text-ink">
              {privacy.contactHeading[locale]}
            </h2>
            <p className="mt-3 leading-relaxed text-ink/80">
              {privacy.contactBody[locale]}
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
                ? "للأسئلة المتعلقة بالرحلات لا بالبيانات، استخدم صفحة التواصل."
                : "For questions about a journey rather than about data, use the contact page."}{" "}
              <Link
                href={href(locale, "contact")}
                className="text-palm underline-offset-4 hover:underline"
              >
                {locale === "ar" ? "تواصل معنا" : "Contact us"}
              </Link>
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
