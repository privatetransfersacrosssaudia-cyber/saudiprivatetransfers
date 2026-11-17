import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { quoteCta } from "@/lib/content/navigation";
import { ui } from "@/lib/i18n/dictionary";
import { site, whatsappUrl } from "@/lib/site";
import type { Locale } from "@/lib/i18n/config";

/**
 * The two controls that follow the visitor down every page: WhatsApp, and —
 * on small screens only — a standing link to the quote form.
 *
 * Both are plain links, so this stays a Server Component and ships no
 * JavaScript. They sit at the end of the layout, after the footer, so a
 * keyboard or screen-reader user reaches the page's own content first rather
 * than meeting two floating controls before the navigation.
 *
 * The quote bar is hidden from `lg` upwards, where the header's own "get a
 * quote" button is always visible and a second one would be noise. Layout.tsx
 * pads the page bottom by the same height so the bar never covers the last
 * line of the footer.
 */
export function FloatingActions({ locale }: { locale: Locale }) {
  const cta = quoteCta(locale);
  const whatsapp = whatsappUrl(ui.whatsappPrefill[locale]);

  return (
    <>
      {whatsapp ? (
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ui.whatsappAria[locale]}
          /*
            Offsets add the safe-area insets so the button clears a phone's
            home indicator and any side system bar. The bottom offset also
            clears the mobile quote bar, which is why it changes at `lg`.
          */
          className="fixed end-[max(1rem,env(safe-area-inset-right,0px))] bottom-[calc(5.25rem+env(safe-area-inset-bottom,0px))] z-40 inline-flex size-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg ring-1 ring-black/5 transition-transform hover:scale-105 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none lg:bottom-[max(1.5rem,env(safe-area-inset-bottom,0px))]"
        >
          {/*
            WhatsApp's own glyph. Drawn rather than loaded from an icon set:
            lucide has no brand marks, and a recognisable logo is the point of
            this control.
          */}
          <svg
            viewBox="0 0 24 24"
            aria-hidden
            focusable="false"
            className="size-7"
            fill="currentColor"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
          </svg>
        </a>
      ) : null}

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-md lg:hidden print:hidden">
        <div className="flex items-center gap-3 px-[max(1rem,env(safe-area-inset-left,0px))] pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-ink">
              {site.shortName}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {ui.quoteBarHint[locale]}
            </p>
          </div>
          <Link
            href={cta.href}
            className="group inline-flex h-11 shrink-0 items-center gap-2 rounded-lg bg-palm px-5 text-sm font-semibold text-white transition-colors hover:bg-palm-deep"
          >
            {cta.label}
            <ArrowRightIcon
              aria-hidden
              className="size-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100"
            />
          </Link>
        </div>
      </div>
    </>
  );
}
