import Image from "next/image";
import Link from "next/link";

import { cn } from "cn";
import { href } from "@/lib/i18n/routes";
import { site } from "@/lib/site";
import { ui } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";

import logo from "@/public/images/logo.webp";

/**
 * The brand lockup.
 *
 * One supplied artwork, used in both languages: the mark reads as the brand
 * rather than as a translated phrase, so swapping it per locale would make the
 * site look like two businesses. It is imported rather than referenced by path
 * so the bundler carries its real dimensions — that fixes the aspect ratio at
 * build time and leaves no layout shift as it loads.
 *
 * The artwork was supplied as a 652 KB PNG with a wide transparent margin.
 * `public/images/logo.webp` is the same artwork trimmed to its ink and encoded
 * as WebP (39 KB), which is what ships; the original PNG is kept in the
 * repository as the source file.
 */
export function SiteLogo({
  locale,
  className,
  tone = "default",
}: {
  locale: Locale;
  className?: string;
  /** "invert" is for placement on dark surfaces — the footer, dark photography. */
  tone?: "default" | "invert";
}) {
  const dark = tone === "invert";

  return (
    <Link
      href={href(locale, "home")}
      /*
       * The lockup carries the brand name as artwork, so the accessible name
       * is set here and the image itself is marked decorative. Without that,
       * a screen reader announces the brand twice.
       */
      aria-label={`${site.name} — ${ui.home[locale]}`}
      className={cn(
        "inline-flex shrink-0 items-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4",
        /*
         * The wordmark is deep green on transparent, which disappears against
         * a dark surface. Rather than guess at a recoloured version of someone
         * else's artwork — the mark's white emblem and silver vehicle would
         * dissolve into any flat repaint — it sits on a light plate, so the
         * brand is reproduced exactly as drawn and the contrast is guaranteed.
         * A dedicated reverse lockup, if one is ever supplied, would replace
         * this with a straight swap of the `src`.
         */
        dark && "bg-white/95 px-2.5 py-1.5 shadow-sm",
        className
      )}
    >
      <Image
        src={logo}
        alt=""
        priority
        sizes="(max-width: 768px) 132px, 150px"
        className={cn("h-9 w-auto md:h-10", dark && "h-8 md:h-9")}
      />
    </Link>
  );
}
