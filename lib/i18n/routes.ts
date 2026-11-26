/**
 * The URL inventory.
 *
 * Every page in the site is registered here once, locale-independent. The
 * sitemap, the hreflang tags, the breadcrumbs and every internal link read
 * from this, so a slug can never drift between the page that owns it and the
 * pages that link to it.
 *
 * Mirrored in docs/riyadh-url-inventory.md.
 */

import { type Locale, localePath } from "@/lib/i18n/config";

export const route = {
  home: "",
  getQuote: "get-quote",
  riyadh: "riyadh",
  riyadhToJeddah: "riyadh-to-jeddah",
  riyadhToDammam: "riyadh-to-dammam",
  riyadhToAlKhobar: "riyadh-to-al-khobar",
  riyadhToBuraydah: "riyadh-to-buraydah",
  riyadhToTaif: "riyadh-to-taif",
  riyadhToHail: "riyadh-to-hail",
  riyadhToAlUla: "riyadh-to-alula",
  riyadhToMakkah: "riyadh-to-makkah",
  riyadhToMadinah: "riyadh-to-madinah",
  riyadhAirport: "riyadh-airport-transfers",
  riyadhRailway: "riyadh-railway-station-transfers",
  riyadhHotel: "riyadh-hotel-transfers",
  jeddah: "jeddah",
  jeddahAirport: "jeddah-airport-transfers",
  jeddahHotel: "jeddah-hotel-transfers",
  jeddahStation: "jeddah-haramain-station-transfers",
  jeddahToMakkah: "jeddah-to-makkah",
  jeddahToMadinah: "jeddah-to-madinah",
  makkahToMadinah: "makkah-to-madinah",
  umrahTransfers: "umrah-transfers",
  airportTransfers: "airport-transfers",
  cityToCity: "city-to-city-transfers",
  hotelTransfers: "hotel-transfers",
  ziyaratTransfers: "ziyarat-transfers",
  makkahZiyarat: "makkah-ziyarat-transfers",
  madinahZiyarat: "madinah-ziyarat-transfers",
  privateDayTrips: "private-day-trips",
  madinahAirport: "madinah-airport-transfers",
  alKharj: "al-kharj",
  diriyah: "diriyah",
  shaqra: "shaqra",
  makkah: "makkah",
  taif: "taif",
  rabigh: "rabigh",
  madinah: "madinah",
  alula: "alula",
  yanbu: "yanbu",
  dammam: "dammam",
  dammamAirport: "dammam-airport-transfers",
  jubail: "jubail",
  alAhsa: "al-ahsa",
  abha: "abha",
  jazan: "jazan",
  najran: "najran",
  tabuk: "tabuk",
  buraydah: "buraydah",
  unaizah: "unaizah",
  credits: "credits",
  saudiToBahrain: "saudi-to-bahrain",
  about: "about",
  contact: "contact",
  privacy: "privacy",
  terms: "terms",
} as const;

export type RouteKey = keyof typeof route;

/** Relative sitemap priority and change cadence, by page role. */
const sitemapMeta: Record<RouteKey, { priority: number; changeFrequency: "weekly" | "monthly" }> = {
  home: { priority: 1, changeFrequency: "weekly" },
  getQuote: { priority: 0.3, changeFrequency: "monthly" },
  riyadh: { priority: 0.9, changeFrequency: "weekly" },
  riyadhToJeddah: { priority: 0.8, changeFrequency: "monthly" },
  riyadhToDammam: { priority: 0.8, changeFrequency: "monthly" },
  riyadhToAlKhobar: { priority: 0.8, changeFrequency: "monthly" },
  // Batch 2. A shade below batch 1: the same page type, but serving smaller
  // markets, so they should not outrank the three established routes.
  riyadhToBuraydah: { priority: 0.7, changeFrequency: "monthly" },
  riyadhToTaif: { priority: 0.7, changeFrequency: "monthly" },
  riyadhToHail: { priority: 0.7, changeFrequency: "monthly" },
  riyadhToAlUla: { priority: 0.7, changeFrequency: "monthly" },
  // The two pilgrimage corridors out of the capital. Level with batch 1 rather
  // than batch 2: these are the longest journeys the cluster quotes and the
  // most searched, and each answers a question no other page on the site does
  // — whether to drive at all.
  riyadhToMakkah: { priority: 0.8, changeFrequency: "monthly" },
  riyadhToMadinah: { priority: 0.8, changeFrequency: "monthly" },
  // Level with the batch-1 routes, not the batch-2 ones: airport transfers
  // are the highest-intent journey in the cluster and the hub's busiest branch.
  riyadhAirport: { priority: 0.8, changeFrequency: "monthly" },
  // Rail is a minority choice on these corridors, so this sits with batch 2
  // rather than with the airport page.
  riyadhRailway: { priority: 0.7, changeFrequency: "monthly" },
  // The smallest service intent in the cluster, and largely a sub-intent of
  // the airport page, so it ranks lowest of the published pages.
  riyadhHotel: { priority: 0.6, changeFrequency: "monthly" },
  // A city parent, so level with the Riyadh hub rather than with a leaf page.
  jeddah: { priority: 0.9, changeFrequency: "weekly" },
  // Level with the Riyadh airport page: the highest-intent journey in Jeddah.
  jeddahAirport: { priority: 0.8, changeFrequency: "monthly" },
  // Ranked with its Riyadh counterpart: a hotel page is a smaller intent than
  // an airport page, and ranking it alongside one would misstate that.
  jeddahHotel: { priority: 0.6, changeFrequency: "monthly" },
  // Ranked with its Riyadh counterpart rather than with the airport page: rail
  // is one mode among several on these corridors. It sits above the hotel page
  // because the "wrong station" problem it solves is specific to Jeddah — two
  // stations about 20 km apart, one of them inside the airport.
  jeddahStation: { priority: 0.7, changeFrequency: "monthly" },
  // The dominant Jeddah intent, so level with the airport page.
  jeddahToMakkah: { priority: 0.8, changeFrequency: "monthly" },
  // A corridor page, ranked with the other intercity routes.
  jeddahToMadinah: { priority: 0.8, changeFrequency: "monthly" },
  // The pilgrimage corridor, and the most requested intercity journey on the
  // site — ranked with the established Jeddah route rather than below it.
  makkahToMadinah: { priority: 0.8, changeFrequency: "monthly" },
  // The one page organised around a trip rather than a place or a road, and
  // the entry point for the journey set this cluster exists to serve. Level
  // with the city hubs rather than with a single route page: it is the parent
  // of several of them, and it is the highest commercial intent on the site.
  umrahTransfers: { priority: 0.9, changeFrequency: "monthly" },
  // The service page above the four airport pages. Level with them rather
  // than above: it is the entry point for the highest-intent journey on the
  // site, but the airport pages carry the terminal detail and should keep
  // their own standing for a city-specific search.
  airportTransfers: { priority: 0.9, changeFrequency: "monthly" },
  // The service page above the twelve intercity route pages. Level with the
  // other service pages; the route pages keep their own standing, since a
  // search for one corridor should land on that corridor.
  cityToCity: { priority: 0.9, changeFrequency: "monthly" },
  // The service page above the Riyadh and Jeddah hotel pages. A step below
  // the other service pages: a hotel transfer is usually a leg of something
  // larger rather than the journey someone sets out to buy, which is the
  // same reason the two city hotel pages sit at 0.6.
  hotelTransfers: { priority: 0.8, changeFrequency: "monthly" },
  // The hub of the Ziyarat cluster. Dedicated Makkah and Madinah Ziyarat
  // pages are planned beneath it; this one holds the national intent and
  // deliberately leaves the per-site detail to them.
  ziyaratTransfers: { priority: 0.8, changeFrequency: "monthly" },
  // The first location page under the Ziyarat hub. Level with it: a search
  // naming Makkah should land here rather than on the national page.
  makkahZiyarat: { priority: 0.8, changeFrequency: "monthly" },
  // The second location page under the Ziyarat hub, level with Makkah's.
  madinahZiyarat: { priority: 0.8, changeFrequency: "monthly" },
  // The head of the day-trip cluster, and the only page in it for now. Level
  // with the other service pages it sits beside: the intent it serves (a
  // driver who stays for an agreed outing) is distinct from a transfer, so
  // it should not sit below them.
  privateDayTrips: { priority: 0.9, changeFrequency: "monthly" },
  // An airport service page, ranked with the other two rather than with the
  // destination hubs it sits under.
  madinahAirport: { priority: 0.8, changeFrequency: "monthly" },
  // Riyadh Region destination hubs. Below the city hubs and the main routes:
  // smaller markets, and operational coverage is still to be confirmed.
  alKharj: { priority: 0.7, changeFrequency: "monthly" },
  diriyah: { priority: 0.7, changeFrequency: "monthly" },
  shaqra: { priority: 0.7, changeFrequency: "monthly" },
  // Makkah Region. Makkah and Taif are city hubs, level with Riyadh and
  // Jeddah; Rabigh is a smaller market, level with the Riyadh Region hubs.
  makkah: { priority: 0.9, changeFrequency: "weekly" },
  taif: { priority: 0.9, changeFrequency: "weekly" },
  rabigh: { priority: 0.7, changeFrequency: "monthly" },
  // Madinah Region. Madinah is a city hub, level with Makkah; AlUla and Yanbu
  // are destination hubs a step below.
  madinah: { priority: 0.9, changeFrequency: "weekly" },
  alula: { priority: 0.8, changeFrequency: "monthly" },
  yanbu: { priority: 0.7, changeFrequency: "monthly" },
  // Eastern Province. Dammam is the metropolitan hub for Dammam, Al Khobar
  // and Dhahran, level with the other city hubs; Al Ahsa and Jubail are
  // destination hubs a step below.
  dammam: { priority: 0.9, changeFrequency: "weekly" },
  // The Eastern Province gateway, ranked with the other airport pages.
  dammamAirport: { priority: 0.8, changeFrequency: "monthly" },
  alAhsa: { priority: 0.8, changeFrequency: "monthly" },
  jubail: { priority: 0.7, changeFrequency: "monthly" },
  // Asir Region. One hub for Abha and Khamis Mushait, level with the other
  // city hubs.
  abha: { priority: 0.9, changeFrequency: "weekly" },
  // Jazan and Najran regions. Each is a city hub, level with the other hubs.
  jazan: { priority: 0.9, changeFrequency: "weekly" },
  najran: { priority: 0.9, changeFrequency: "weekly" },
  // Tabuk. City hub with confirmed city and airport transfers, level with
  // the other hubs.
  tabuk: { priority: 0.9, changeFrequency: "weekly" },
  // Qassim. City hubs with owner-confirmed services, level with the other
  // hubs.
  buraydah: { priority: 0.9, changeFrequency: "weekly" },
  unaizah: { priority: 0.9, changeFrequency: "weekly" },
  // A reference page, not a destination. Indexable because the attribution it
  // carries is a licence obligation and should be publicly findable, but it
  // competes for nothing and sits at the bottom of the priority range.
  credits: { priority: 0.1, changeFrequency: "monthly" },
  // A reference guide rather than a service page, but the subject is heavily
  // searched and the page is substantial, so it sits with the city hubs.
  // `changeFrequency` is weekly because border and visa rules move and the
  // guide carries a verification date that should be seen to be current.
  saudiToBahrain: { priority: 0.8, changeFrequency: "weekly" },
  // A trust page rather than a landing page: people reach it to decide whether
  // to enquire, not from a search for a route. Indexable and linked, but it
  // should never outrank a destination.
  about: { priority: 0.5, changeFrequency: "monthly" },
  // Reached deliberately, by someone who has already decided to get in touch.
  // It carries the quote form, so it is indexable, but it competes for nothing.
  contact: { priority: 0.5, changeFrequency: "monthly" },
  // A legal page: it must be indexable and findable, but it should never
  // compete with a destination for attention.
  privacy: { priority: 0.2, changeFrequency: "monthly" },
  terms: { priority: 0.2, changeFrequency: "monthly" },
};

/** Pages deliberately kept out of the index; see each page's robots meta. */
const noindex: ReadonlySet<RouteKey> = new Set<RouteKey>(["getQuote"]);

export const indexableRoutes = (Object.keys(route) as RouteKey[]).filter(
  (key) => !noindex.has(key)
);

export function routeMeta(key: RouteKey) {
  return sitemapMeta[key];
}

/** Locale-prefixed path for a registered page. */
export function href(locale: Locale, key: RouteKey): string {
  return localePath(locale, route[key]);
}
