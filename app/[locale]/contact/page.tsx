import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  ClipboardListIcon,
  MailIcon,
  MessageCircleIcon,
} from "lucide-react";

import { BookingSteps } from "@/components/border/conversion";
import { BookingForm } from "@/components/home/booking-form";
import { HeroSentinel } from "@/components/layout/site-header";
import { contact } from "@/lib/content/contact";
import { altText } from "@/lib/images";
import { href } from "@/lib/i18n/routes";
import { isLocale, locales } from "@/lib/i18n/config";
import { ui } from "@/lib/i18n/dictionary";
import { image } from "@/lib/site-images";
import { pageMetadata } from "@/lib/seo";
import { site, whatsappUrl } from "@/lib/site";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * Contact.
 *
 * The quote form is the page, not an afterthought at the bottom: a filled form
 * carries the journey details we need to answer with a price, where an email
 * asking "how much to Jeddah?" starts a round of questions. Email and WhatsApp
 * sit above it for people who want to ask something first.
 *
 * It embeds the site's existing `BookingForm` — the same component, the same
 * Server Action, the same CRM path — with `serviceType` set so a lead from
 * here is identifiable in the desk. No second form exists anywhere.
 *
 * Nothing invented, per the same rule as the About page: no address, no
 * office, no landline, no registration, and deliberately no response-time
 * promise. The page says so out loud rather than quietly omitting it.
 */
export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  return pageMetadata({
    locale,
    routeKey: "contact",
    title: contact.metaTitle[locale],
    description: contact.metaDescription[locale],
    imageKey: contact.heroImageKey,
  });
}

export default async function ContactPage({
  params,
}: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const photo = image(contact.heroImageKey);
  const whatsapp = whatsappUrl(contact.whatsappMessage[locale]);

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

        <div className="site-container pt-32 pb-16 md:pt-34 lg:pt-40 lg:pb-22">
          <div className="max-w-3xl">
            <p className="text-eyebrow text-brass">{contact.eyebrow[locale]}</p>
            <h1 className="text-h1 mt-4 text-balance text-white">
              {contact.heroTitle[locale]}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/85">
              {contact.heroStandfirst[locale]}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#quote-form"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-brass px-6 text-sm font-semibold text-ink transition-colors hover:bg-brass-deep"
              >
                {contact.heroPrimaryCta[locale]}
                <ArrowRightIcon
                  aria-hidden
                  className="size-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100"
                />
              </a>
              {whatsapp ? (
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/25 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <MessageCircleIcon aria-hidden className="size-4" />
                  {ui.footerWhatsappLabel[locale]}
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* Channels */}
      <section className="section-y">
        <div className="site-container">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-h3 text-balance text-ink">
              {contact.channelsHeading[locale]}
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/80">
              {contact.channelsIntro[locale]}
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {/* The form, marked as the default route */}
              <div className="flex flex-col rounded-xl border border-palm/30 bg-palm-soft/50 p-5">
                <ClipboardListIcon
                  aria-hidden
                  className="size-5 text-palm-deep"
                />
                <h3 className="mt-3 font-semibold text-ink">
                  {contact.channelForm.title[locale]}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/75">
                  {contact.channelForm.body[locale]}
                </p>
                <a
                  href="#quote-form"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-palm hover:text-palm-deep"
                >
                  {contact.channelForm.action[locale]}
                  <ArrowRightIcon
                    aria-hidden
                    className="size-3.5 rtl:-scale-x-100"
                  />
                </a>
              </div>

              {/* Email */}
              <div className="flex flex-col rounded-xl border border-border bg-card p-5">
                <MailIcon aria-hidden className="size-5 text-brass-deep" />
                <h3 className="mt-3 font-semibold text-ink">
                  {contact.channelEmail.title[locale]}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/75">
                  {contact.channelEmail.body[locale]}
                </p>
                {site.contact.email ? (
                  <a
                    href={`mailto:${site.contact.email}`}
                    /* `dir="ltr"` so the address does not reorder on the
                       Arabic page, where it would otherwise read backwards. */
                    dir="ltr"
                    className="numeric mt-4 inline-block text-sm font-medium break-all text-palm underline-offset-4 hover:underline"
                  >
                    {site.contact.email}
                  </a>
                ) : null}
              </div>

              {/* WhatsApp */}
              <div className="flex flex-col rounded-xl border border-border bg-card p-5">
                <MessageCircleIcon
                  aria-hidden
                  className="size-5 text-brass-deep"
                />
                <h3 className="mt-3 font-semibold text-ink">
                  {contact.channelWhatsapp.title[locale]}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/75">
                  {contact.channelWhatsapp.body[locale]}
                </p>
                {whatsapp ? (
                  <a
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-palm hover:text-palm-deep"
                  >
                    {contact.channelWhatsapp.action[locale]}
                    <ArrowRightIcon
                      aria-hidden
                      className="size-3.5 rtl:-scale-x-100"
                    />
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The quote form — the site's own component, same action, same CRM */}
      <section
        id="quote-form"
        className="section-y scroll-mt-24 border-t border-border bg-sand"
      >
        <div className="site-container">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-h3 text-balance text-ink">
              {contact.formHeading[locale]}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink/80">
              {contact.formIntro[locale]}
            </p>

            <div className="mt-8">
              <BookingForm
                locale={locale}
                showIntro={false}
                /* Lead context, so an enquiry from here is identifiable in
                   the CRM alongside ones from the quote page. */
                serviceType="Contact page"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What to tell us */}
      <section className="section-y border-t border-border">
        <div className="site-container">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-h3 text-balance text-ink">
              {contact.includeHeading[locale]}
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/80">
              {contact.includeIntro[locale]}
            </p>

            <dl className="mt-8 grid gap-x-10 gap-y-7 sm:grid-cols-2">
              {contact.includePoints.map((point) => (
                <div
                  key={point.title.en}
                  className="border-s-2 border-palm/30 ps-5"
                >
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

      {/* What happens next */}
      <section className="section-y border-t border-border bg-sand">
        <div className="site-container">
          <div className="mx-auto max-w-4xl">
            <BookingSteps
              locale={locale}
              heading={contact.nextHeading}
              intro={contact.nextIntro}
              steps={[...contact.nextSteps]}
            />
            {/*
              The absence of a response-time promise, stated rather than left
              as a gap. A customer who knows we do not publish one is better
              served than one who assumes an unwritten standard.
            */}
            <p className="mt-6 max-w-2xl rounded-xl border border-brass/35 bg-brass/8 p-4 text-sm leading-relaxed text-ink/80">
              {contact.nextNote[locale]}
            </p>
          </div>
        </div>
      </section>

      {/* Before you write */}
      <section className="section-y border-t border-border">
        <div className="site-container">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-h3 text-balance text-ink">
              {contact.linksHeading[locale]}
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/80">
              {contact.linksIntro[locale]}
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {contact.links.map((item) => (
                <li key={item.routeKey}>
                  <Link
                    href={href(locale, item.routeKey)}
                    className="group flex h-full flex-col gap-1.5 rounded-xl border border-border bg-card p-5 transition-colors hover:border-palm/40 hover:bg-palm-soft/40"
                  >
                    <span className="flex items-center gap-2 font-semibold text-ink group-hover:text-palm">
                      {item.label[locale]}
                      <ArrowRightIcon
                        aria-hidden
                        className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100"
                      />
                    </span>
                    <span className="text-sm leading-relaxed text-ink/70">
                      {item.body[locale]}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
