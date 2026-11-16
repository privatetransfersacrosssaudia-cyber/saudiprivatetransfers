import type { Metadata, Viewport } from "next";
import {
  IBM_Plex_Sans_Arabic,
  Instrument_Serif,
  Plus_Jakarta_Sans,
} from "next/font/google";

import { site } from "@/lib/site";

import "../globals.css";

/**
 * The root layout for customer-facing documents — a quotation or an invoice
 * opened from the link in an email.
 *
 * A third root layout, which this project's structure allows because there is
 * no `app/layout.tsx`. It is separate from the marketing site's layout on
 * purpose: someone opening their quotation should see the document, not a
 * navigation bar inviting them to browse destinations, and separate from the
 * CRM's because this is seen by customers.
 *
 * `<html lang>` and `dir` cannot be fixed here, because the document itself
 * carries the language it was written in. The page sets them per document
 * through the `lang` and `dir` attributes on its own wrapper instead, and this
 * layout stays neutral.
 */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument",
  display: "swap",
});

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: site.name, template: `%s | ${site.brand}` },
  /**
   * A document is addressed by an unguessable token and contains a named
   * customer's journey and prices. It must never be indexed, archived or
   * cached by an intermediary.
   */
  robots: { index: false, follow: false, nocache: true, noarchive: true },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#1d4034",
};

export default function DocumentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${instrument.variable} ${plexArabic.variable} h-full`}
    >
      <body className="min-h-full bg-sand font-sans text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
