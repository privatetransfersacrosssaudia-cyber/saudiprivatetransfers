// Submits this site's URLs to Bing Webmaster Tools' "Submit URL batch" API, so
// new or changed pages get crawled without waiting for Bing's own sitemap
// re-crawl schedule.
//
//   BING_API_KEY=your-key node scripts/submit-bing-urls.mjs
//   BING_API_KEY=your-key node scripts/submit-bing-urls.mjs --dry-run
//   BING_API_KEY=your-key node scripts/submit-bing-urls.mjs /en/jeddah/ /ar/jeddah/
//
// The key is read from the environment, or from .env / .env.local if it is
// kept there. Node does NOT load .env on its own, so this script loads it the
// same way scripts/crm-verify.mjs does — without that, a key sitting in .env
// is invisible and the script reports it as unset.
//
// .env is covered by .gitignore, so a key kept there stays out of the
// repository. It is never echoed by this script.
//
// With no arguments it submits every URL in the live sitemap. Re-submitting a
// URL Bing already knows is harmless and idempotent — it does not improve
// ranking and it does not penalise.
//
// Before this can work, two things must be true at Bing's end, and this script
// cannot do either for you:
//
//   1. The site must be ADDED AND VERIFIED in Bing Webmaster Tools, for
//      exactly the origin in SITE_URL below. A brand-new domain is not.
//   2. The API key must come from that same Webmaster account
//      (Settings → API access → API Key).
//
// If either is missing the API answers with an ownership or authentication
// error, which this script prints verbatim rather than interpreting.

import { existsSync, readFileSync } from "node:fs";

/**
 * Minimal .env reader: KEY=value, optional quotes, no expansion.
 *
 * Node does not read .env files by itself, so without this a key kept in .env
 * is simply absent. An already-set environment variable always wins, so
 * `BING_API_KEY=... node scripts/submit-bing-urls.mjs` still overrides the file.
 */
function loadEnvFile(path) {
  if (!existsSync(path)) return;
  for (const rawLine of readFileSync(path, "utf8").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env) && value) process.env[key] = value;
  }
}

for (const file of [".env.local", ".env"]) loadEnvFile(file);

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://privatetransfersacrosssaudia.com"
).replace(/\/$/, "");

const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;
const ENDPOINT = "https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlbatch";

/** Bing's documented cap per batch call. */
const CHUNK_SIZE = 500;

function chunk(items, size) {
  const out = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}

async function urlsFromSitemap() {
  const response = await fetch(SITEMAP_URL, { signal: AbortSignal.timeout(30_000) });
  if (!response.ok) {
    throw new Error(`Could not fetch ${SITEMAP_URL}: ${response.status} ${response.statusText}`);
  }
  const xml = await response.text();
  // Only <loc> entries. The sitemap also carries <xhtml:link> hreflang
  // alternates pointing at the same pages; counting those would submit every
  // URL several times over.
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

async function submitBatch(apiKey, urls) {
  const response = await fetch(`${ENDPOINT}?apikey=${encodeURIComponent(apiKey)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ siteUrl: SITE_URL, urlList: urls }),
    signal: AbortSignal.timeout(60_000),
  });

  const body = await response.text();
  if (!response.ok) {
    // Printed as received. Bing's errors name the real cause — an unverified
    // site, a key from the wrong account, or the daily quota — and rewording
    // them would only hide that.
    throw new Error(`Bing responded ${response.status}: ${body || response.statusText}`);
  }
  return body;
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const paths = args.filter((a) => !a.startsWith("--"));

  const apiKey = process.env.BING_API_KEY;
  if (!apiKey && !dryRun) {
    console.error(
      "BING_API_KEY is not set.\n\n" +
        "Put it in .env as BING_API_KEY=your-key, or pass it for one run:\n" +
        "  BING_API_KEY=your-key node scripts/submit-bing-urls.mjs\n\n" +
        "Get it from Bing Webmaster Tools → Settings → API access → API Key."
    );
    process.exit(1);
  }

  let urls;
  if (paths.length > 0) {
    urls = paths.map((p) => (p.startsWith("http") ? p : `${SITE_URL}${p}`));
    console.log(`Submitting ${urls.length} URL(s) given on the command line.`);
  } else {
    urls = await urlsFromSitemap();
    console.log(`Read ${urls.length} URL(s) from ${SITEMAP_URL}.`);
  }

  if (urls.length === 0) {
    console.error("Nothing to submit.");
    process.exit(1);
  }

  console.log(`Site: ${SITE_URL}`);

  if (dryRun) {
    console.log("\n--dry-run: nothing was sent. URLs that would be submitted:\n");
    for (const url of urls) console.log(`  ${url}`);
    console.log(`\n${urls.length} URL(s).`);
    return;
  }

  const batches = chunk(urls, CHUNK_SIZE);
  let submitted = 0;

  for (const [index, batch] of batches.entries()) {
    process.stdout.write(`Batch ${index + 1}/${batches.length} (${batch.length} URLs)... `);
    const result = await submitBatch(apiKey, batch);
    submitted += batch.length;
    console.log(`accepted. ${result}`);
  }

  console.log(`\nSubmitted ${submitted} URL(s) to Bing.`);
  console.log(
    "Bing accepting a submission means it has queued them, not that it has " +
      "crawled or indexed them. Check coverage in Webmaster Tools over the " +
      "next few days."
  );
}

main().catch((error) => {
  console.error(`\n${error instanceof Error ? error.message : error}`);
  process.exit(1);
});
