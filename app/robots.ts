import type { MetadataRoute } from "next";

import { CRM_BASE } from "@/lib/crm/config";
import { locales } from "@/lib/i18n/config";
import { href } from "@/lib/i18n/routes";
import { absoluteUrl } from "@/lib/site";

/**
 * robots.txt.
 *
 * The quote pages are kept out of the index by their own robots meta rather
 * than disallowed here — a disallowed URL cannot be crawled, so the noindex
 * would never be read. Blocking the Next.js image endpoint would stop image
 * results, so it stays crawlable.
 *
 * What is disallowed is the query-string form, `/<locale>/get-quote/?`, which
 * is how a prefilled or back-navigated quote URL appears. `href()` supplies
 * the trailing slash, so the pattern matches the URL that actually exists.
 *
 * The CRM at `/admin/` is disallowed outright. The reasoning above does not
 * apply to it: there is nothing there to index under any circumstances, so
 * there is no noindex worth letting a crawler read. Its pages also carry
 * `robots: { index: false }` in their metadata, which covers a crawler that
 * ignores this file, and the proxy redirects anyone without a session before a
 * page renders at all.
 *
 * robots.txt and sitemap.xml themselves keep no trailing slash: Next.js
 * exempts paths with a file extension from `trailingSlash: true`.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          ...locales.map((locale) => `${href(locale, "getQuote")}?`),
          `${CRM_BASE}/`,
        ],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
