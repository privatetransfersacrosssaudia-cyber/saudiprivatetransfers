/**
 * Single source of truth for brand and deployment details.
 *
 * Everything here is referenced by the layout, metadata and structured data,
 * so changing a value once updates the whole site. The canonical URL, Open
 * Graph tags and JSON-LD all derive from `url`: NEXT_PUBLIC_SITE_URL overrides
 * it (local QA sets it to localhost), and without it the production domain
 * is used, so a build that forgets the variable still emits correct URLs.
 */

const rawUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://privatetransfersacrosssaudia.com";

export const site = {
  name: "Private Transfers Across Saudi",
  shortName: "Private Transfers Across Saudi",
  /** Used in the SEO title after the main keyword. */
  brand: "Private Transfers Across Saudi",
  url: rawUrl.replace(/\/$/, ""),
  /** Default site description, per locale. Pages override with their own. */
  description: {
    en:
      "Private car and van transfers across Saudi Arabia — airports, hotels, " +
      "city-to-city routes and pilgrimage journeys. Send your journey details " +
      "and receive a quotation.",
    ar:
      "نقل خاص بالسيارات والڤانات في جميع أنحاء السعودية — المطارات والفنادق " +
      "والرحلات بين المدن ورحلات الحج والعمرة. أرسل تفاصيل رحلتك واحصل على عرض سعر.",
  },
  /**
   * Contact routes. The footer, the floating WhatsApp button and the quote
   * flow all read from here, so there is one place to update. A value left as
   * null is hidden in the UI rather than published as a channel that does not
   * work.
   *
   * `whatsapp` is digits only, in international format with no plus sign and
   * no spaces — that is the form wa.me expects in its path.
   */
  contact: {
    /**
     * The general address. Published wherever the site shows a single address
     * — the footer, the contact page, and the privacy and terms pages, where
     * a data or policy enquiry is not a booking.
     */
    email: "info@privatetransfersacrosssaudia.com" as string | null,
    /**
     * Bookings and quotations.
     *
     * This is the address transactional email should come *from* and reply
     * *to*, so a customer answering a quotation reaches the desk that sent
     * it rather than a general inbox. `emailConfig()` in lib/crm/config.ts
     * uses it as the Reply-To fallback; the From itself is set by
     * `CRM_EMAIL_FROM` in the environment and must match this address.
     */
    bookingEmail: "booking@privatetransfersacrosssaudia.com" as string | null,
    phone: "+923148932631" as string | null,
    whatsapp: "923148932631" as string | null,
  },
  /** Areas the service is positioned around, nationwide rather than one city. */
  serviceArea: "Saudi Arabia",
} as const;

export const absoluteUrl = (path = "/") =>
  new URL(path, site.url || "https://privatetransfersacrosssaudia.com").toString();

/**
 * A wa.me link, optionally carrying a first message.
 *
 * Returns null when no WhatsApp number is configured, so every caller has to
 * decide what to render in that case rather than producing a link to
 * `wa.me/null`.
 */
export function whatsappUrl(message?: string): string | null {
  const number = site.contact.whatsapp;
  if (!number) return null;
  const digits = number.replace(/\D/g, "");
  if (!digits) return null;
  return message
    ? `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${digits}`;
}
