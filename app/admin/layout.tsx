import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import { site } from "@/lib/site";

import "../globals.css";

/**
 * The CRM's root layout.
 *
 * This is a second root layout, which is legal precisely because this project
 * has no `app/layout.tsx` — the framework's layout reference states that
 * "omitting `app/layout.js` so layouts in subdirectories … each become root
 * layouts". The public site's root layout lives at `app/[locale]/layout.tsx`
 * and renders the site header, footer and language switcher, none of which
 * belong around a staff tool, so the CRM owns its own `<html>` instead of
 * nesting inside it. A static `admin` segment also takes routing precedence
 * over the sibling `[locale]` dynamic segment, so `/admin/` is never mistaken
 * for a locale.
 *
 * The cost of a second root layout is that moving between the CRM and the
 * public site is a full page load rather than a client-side navigation. For a
 * staff tool nobody browses into from a city page, that is the right trade.
 *
 * It uses the site's own design tokens from `globals.css` — the same `palm`,
 * `brass`, `sand` and `ink` palette, the same radii, the same body font — so
 * the CRM is recognisably the same product rather than a second visual
 * identity. Only the English interface font is loaded here: the CRM's own
 * interface is English, while customer-facing output it generates (emails and
 * documents) carries Arabic where the customer wrote in Arabic.
 */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: `CRM | ${site.brand}`, template: `%s | ${site.brand} CRM` },
  /**
   * Applies to every screen below, sign-in included. A staff tool has no
   * business in a search index, and `nocache` keeps it out of caches that
   * honour it. `app/robots.ts` disallows the path as well, so this holds even
   * for a crawler that arrives at a deep link directly.
   */
  robots: { index: false, follow: false, nocache: true, noarchive: true },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#1d4034",
};

export default function CrmRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" className={`${jakarta.variable} h-full`}>
      <body className="min-h-full bg-sand font-sans text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
