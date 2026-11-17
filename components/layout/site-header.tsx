"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { cn } from "cn";
import { DesktopNav } from "@/components/layout/desktop-nav";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SiteLogo } from "@/components/layout/site-logo";
import { quoteCta } from "@/lib/content/navigation";
import type { Locale } from "@/lib/i18n/config";

/**
 * The single global header. Sections must never render their own navigation
 * bar — everything site-wide lives here.
 *
 * It has two appearances. Over a dark hero it is transparent, so the
 * photograph runs to the top of the screen; everywhere else, and as soon as
 * the hero scrolls away, it is the light blurred bar.
 *
 * The switch is opt-in, and that matters: only 10 of this site's pages open on
 * a dark section. The rest start on sand or white, where white nav links would
 * be invisible. So a page asks for the transparent treatment by rendering
 * `<HeroSentinel />` at the top of its dark hero; this header watches for that
 * element and stays solid when there isn't one. A page can never accidentally
 * get an unreadable header by changing its own background.
 *
 * An IntersectionObserver rather than a scroll handler: it reports only when
 * the sentinel actually crosses the boundary, instead of running work on every
 * scroll frame.
 */
export const HERO_SENTINEL_ID = "site-hero-sentinel";

export function SiteHeader({ locale }: { locale: Locale }) {
  const cta = quoteCta(locale);

  // Starts solid. A page with a dark hero flips it on mount, which is the
  // right way round: a momentary solid header is readable, a momentary
  // transparent one over light content is not.
  const [overHero, setOverHero] = React.useState(false);

  React.useEffect(() => {
    const sentinel = document.getElementById(HERO_SENTINEL_ID);
    // No sentinel means this page did not ask for the transparent treatment,
    // and the initial `false` is already correct — nothing to set.
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      // The only place the state is written. An observer fires once as soon as
      // it starts observing, so this also establishes the initial value
      // without the effect setting state itself.
      ([entry]) => setOverHero(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(sentinel);

    return () => observer.disconnect();
  }, []);

  return (
    <header
      data-over-hero={overHero ? "true" : "false"}
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        overHero
          ? // No border either: a hairline across the photograph reads as a
            // seam. The header sits over the hero, not on top of it.
            "border-b border-transparent bg-transparent text-white"
          : "border-b border-border/70 bg-background/85 text-ink backdrop-blur-md supports-backdrop-filter:bg-background/70"
      )}
    >
      <div className="site-container flex h-16 items-center justify-between gap-4 md:h-18">
        <SiteLogo locale={locale} tone={overHero ? "invert" : "default"} />

        {/* The nav triggers set no colour of their own, so they inherit the
            header's — white over the hero, ink once it is solid. */}
        <DesktopNav locale={locale} />

        <div className="flex items-center gap-2">
          <LanguageSwitcher
            locale={locale}
            className={cn(
              "hidden sm:inline-flex",
              overHero && "border-white/30 text-white hover:bg-white/10"
            )}
          />

          <Link
            href={cta.href}
            className={cn(
              "group hidden h-10 items-center gap-2 rounded-lg px-4 text-sm font-semibold transition-colors md:inline-flex",
              overHero
                ? // Brass on the dark hero: the palm green button loses too
                  // much separation against the dimmed photograph.
                  "bg-brass text-ink hover:bg-brass-deep"
                : "bg-palm text-white hover:bg-palm-deep"
            )}
          >
            {cta.label}
            <ArrowRightIcon
              className="size-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100"
              aria-hidden
            />
          </Link>

          <MobileNav
            locale={locale}
            className={cn(
              overHero && "border-white/30 bg-white/10 text-white hover:bg-white/20"
            )}
          />
        </div>
      </div>
    </header>
  );
}

/**
 * Marks the top of a dark hero. A page renders this inside its first section
 * to ask the header for its transparent treatment; while this element is on
 * screen, the header is transparent.
 *
 * Its height is the header's own, so the handover happens exactly as the hero
 * passes under the bar.
 */
export function HeroSentinel() {
  return (
    <div
      id={HERO_SENTINEL_ID}
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-16 md:h-18"
    />
  );
}
