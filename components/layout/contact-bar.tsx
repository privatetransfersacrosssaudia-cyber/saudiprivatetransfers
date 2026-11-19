import { MailIcon } from "lucide-react";

import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { ui } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";
import { site } from "@/lib/site";

/**
 * The utility strip above the header: published email addresses at the
 * reading-start edge, the language switcher at the far edge.
 *
 * Deliberately a sibling of `SiteHeader` rather than a row inside it. The
 * header is `sticky top-0` and ten pages pull a dark hero up underneath it
 * with `-mt-16 md:-mt-18`, matched by `HeroSentinel`'s own height; making the
 * header taller would put every one of those offsets out by this bar's
 * height. Sitting above it in normal flow, this bar changes nothing about
 * that relationship — the hero still overlaps the header exactly as before,
 * and the header still sticks once the bar has scrolled away.
 *
 * The language switcher moved here from the header row, which is where a
 * utility of that kind belongs and which leaves the header to the logo, the
 * navigation and the one call to action. Nothing is lost on small screens:
 * the switcher is hidden here below `sm` and `MobileNav` carries its own,
 * exactly as it did when the header held this copy.
 *
 * Both addresses are shown in full rather than behind a word like "contact",
 * because the point is to be read and copied. They wrap onto a second line on
 * a narrow screen instead of being truncated or dropped.
 *
 * `dir="ltr"` on each address is the treatment the footer gives its own: an
 * email is a Latin string and must not be reordered on the Arabic pages, even
 * though the label beside it is Arabic. The flex row itself still mirrors, so
 * the addresses sit at the right-hand edge in Arabic and the switcher at the
 * left, which is the correct reading order rather than a layout accident.
 *
 * Server component — it reads static config and holds no state of its own.
 */
export function ContactBar({ locale }: { locale: Locale }) {
  const entries = [
    { label: ui.contactBarGeneral[locale], address: site.contact.email },
    { label: ui.contactBarBookings[locale], address: site.contact.bookingEmail },
  ].filter(
    (entry): entry is { label: string; address: string } =>
      Boolean(entry.address)
  );

  return (
    <div className="border-b border-white/10 bg-ink text-white">
      <div className="site-container flex min-h-10 flex-wrap items-center justify-center gap-x-6 gap-y-1 py-2 sm:justify-between sm:gap-x-8">
        {/* Addresses: first in the source, so they lead in both directions. */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
          {entries.map((entry) => (
            <span
              key={entry.address}
              className="flex items-center gap-2 text-xs leading-relaxed"
            >
              <MailIcon aria-hidden className="size-3.5 shrink-0 text-brass" />
              <span className="text-white/65">{entry.label}</span>
              <a
                href={`mailto:${entry.address}`}
                dir="ltr"
                className="numeric text-white/85 underline-offset-4 transition-colors hover:text-brass hover:underline"
              >
                {entry.address}
              </a>
            </span>
          ))}
        </div>

        <LanguageSwitcher
          locale={locale}
          // The switcher owns its icon colour and size, which are tuned for
          // the light header it used to sit in. Overriding them here keeps
          // that shared component untouched for every other caller.
          className="hidden h-7 border-white/25 px-2.5 text-xs text-white hover:bg-white/10 sm:inline-flex [&>svg]:size-3.5 [&>svg]:text-white/70"
        />
      </div>
    </div>
  );
}
