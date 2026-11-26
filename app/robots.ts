import type { MetadataRoute } from "next";

import { CRM_BASE } from "@/lib/crm/config";
import { absoluteUrl } from "@/lib/site";

/**
 * robots.txt.
 *
 * The quote pages are kept out of the index by their own robots meta rather
 * than disallowed here — a disallowed URL cannot be crawled, so the noindex
 * would never be read. Blocking the Next.js image endpoint would stop image
 * results, so it stays crawlable.
 *
 * ## Why the prefilled quote URLs are *not* disallowed
 *
 * This file used to disallow the query-string form, `/<locale>/get-quote/?`,
 * reasoning that a prefilled quote URL is not a page worth crawling. That was
 * a mistake, and Search Console reported the consequence: every prefilled CTA
 * on the site — and there is one on nearly every page — became a "Blocked by
 * robots.txt" entry.
 *
 * The block was also self-defeating. A URL Google cannot fetch is a URL whose
 * `noindex` Google cannot read, and a blocked URL that other pages link to can
 * still be indexed on the strength of those links alone. Blocking was strictly
 * worse than allowing for the one thing it was meant to achieve.
 *
 * Allowed, the two signals the page already carries do the work properly:
 * `/get-quote/` serves `robots: noindex, follow`, and `pageMetadata` gives
 * every prefilled variant a canonical pointing at the clean, parameterless
 * path. So each variant is crawled, consolidated onto one URL, and kept out of
 * the index — which is what was wanted in the first place.
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
        disallow: [`${CRM_BASE}/`],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
