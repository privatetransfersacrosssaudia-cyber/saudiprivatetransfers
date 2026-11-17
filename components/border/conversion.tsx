import Link from "next/link";
import { ArrowRightIcon, MessageCircleIcon } from "lucide-react";

import { cn } from "cn";
import { ui } from "@/lib/i18n/dictionary";
import { whatsappUrl } from "@/lib/site";
import type { Bilingual, Locale } from "@/lib/i18n/config";

/**
 * The commercial layer of a border guide.
 *
 * This site takes enquiries, and a guide that converts nobody is a guide
 * nobody paid to write. But the thing being sold here is narrower than the
 * thing being read about: the journey *to* the border, never across it. Every
 * component in this file is written so that distinction survives a skim —
 * each call to action names a Saudi city, never the destination country.
 *
 * Deliberately absent: urgency, counts of people viewing, testimonials,
 * ratings, prices. None of it is true, and a travel guide that oversells is a
 * travel guide nobody trusts on the facts either.
 */

/**
 * A contextual enquiry prompt, placed where a reader has just learned
 * something that implies a Saudi-side journey.
 *
 * `href` carries prefill parameters into the existing quote form, so the
 * route the reader was reading about arrives already filled in. It uses the
 * form's own query contract (`pickup`, `dropoff`); nothing new is invented and
 * the CRM path is untouched.
 */
export function GuideQuoteCta({
  locale,
  heading,
  body,
  cta,
  href,
  whatsappMessage,
  tone = "quiet",
  className,
}: {
  locale: Locale;
  heading: Bilingual<string>;
  body: Bilingual<string>;
  cta: Bilingual<string>;
  href: string;
  /** Prefills the WhatsApp thread with the route being read about. */
  whatsappMessage?: Bilingual<string>;
  /** "loud" is for the single closing prompt; everything inline stays quiet. */
  tone?: "quiet" | "loud";
  className?: string;
}) {
  const whatsapp = whatsappMessage
    ? whatsappUrl(whatsappMessage[locale])
    : null;

  const loud = tone === "loud";

  return (
    <aside
      className={cn(
        "rounded-2xl p-5 sm:p-6",
        loud
          ? "bg-palm text-white"
          : "border border-palm/25 bg-palm-soft/60 text-ink",
        className
      )}
    >
      <h3
        className={cn(
          "font-heading text-xl text-balance",
          loud ? "text-white" : "text-ink"
        )}
      >
        {heading[locale]}
      </h3>
      <p
        className={cn(
          "mt-2 leading-relaxed",
          loud ? "text-white/85" : "text-ink/75"
        )}
      >
        {body[locale]}
      </p>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link
          href={href}
          className={cn(
            "group inline-flex h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold transition-colors",
            loud
              ? "bg-brass text-ink hover:bg-brass-deep"
              : "bg-palm text-white hover:bg-palm-deep"
          )}
        >
          {cta[locale]}
          <ArrowRightIcon
            aria-hidden
            className="size-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100"
          />
        </Link>

        {whatsapp ? (
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex h-11 items-center justify-center gap-2 rounded-lg border px-5 text-sm font-semibold transition-colors",
              loud
                ? "border-white/30 text-white hover:bg-white/10"
                : "border-palm/30 text-palm hover:bg-palm/10"
            )}
          >
            <MessageCircleIcon aria-hidden className="size-4" />
            {ui.footerWhatsappLabel[locale]}
          </a>
        ) : null}
      </div>
    </aside>
  );
}

/**
 * The Saudi-side journeys a reader of this guide can actually ask about.
 *
 * Each links to its own existing route page rather than straight to the form,
 * so a reader can read about the journey before enquiring about it — and so
 * this section is useful rather than a wall of buttons.
 */
export function SaudiSideRoutes({
  locale,
  heading,
  intro,
  routes,
  footnote,
  className,
}: {
  locale: Locale;
  heading: Bilingual<string>;
  intro: Bilingual<string>;
  routes: {
    label: Bilingual<string>;
    description: Bilingual<string>;
    href: string;
  }[];
  footnote: Bilingual<string>;
  className?: string;
}) {
  return (
    <div className={className}>
      <h2 className="text-h3 text-balance text-ink">{heading[locale]}</h2>
      <p className="mt-4 text-lg leading-relaxed text-ink/80">
        {intro[locale]}
      </p>

      <ul className="mt-7 grid gap-3 sm:grid-cols-2">
        {routes.map((route) => (
          <li key={route.href}>
            <Link
              href={route.href}
              className="group flex h-full flex-col gap-1.5 rounded-xl border border-border bg-card p-5 transition-colors hover:border-palm/40 hover:bg-palm-soft/40"
            >
              <span className="flex items-center gap-2 font-semibold text-ink group-hover:text-palm">
                {route.label[locale]}
                <ArrowRightIcon
                  aria-hidden
                  className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100"
                />
              </span>
              <span className="text-sm leading-relaxed text-ink/70">
                {route.description[locale]}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
        {footnote[locale]}
      </p>
    </div>
  );
}

/**
 * How an enquiry actually proceeds.
 *
 * Every step here is something the business genuinely does. There is no
 * "instant confirmation" and no "guaranteed availability", because neither is
 * true, and the first time a promise like that fails is the last time the
 * customer believes the guide either.
 */
export function BookingSteps({
  locale,
  heading,
  intro,
  steps,
  className,
}: {
  locale: Locale;
  heading: Bilingual<string>;
  intro: Bilingual<string>;
  steps: { title: Bilingual<string>; body: Bilingual<string> }[];
  className?: string;
}) {
  return (
    <div className={className}>
      <h2 className="text-h3 text-balance text-ink">{heading[locale]}</h2>
      <p className="mt-4 text-lg leading-relaxed text-ink/80">
        {intro[locale]}
      </p>

      <ol className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((step, index) => (
          <li
            key={step.title.en}
            className="rounded-xl border border-border bg-card p-5"
          >
            <span
              aria-hidden
              className="numeric font-heading text-2xl text-brass"
            >
              {index + 1}
            </span>
            <p className="mt-2 font-semibold text-ink">{step.title[locale]}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink/70">
              {step.body[locale]}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
