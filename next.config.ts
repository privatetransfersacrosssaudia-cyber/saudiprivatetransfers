import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
    /**
     * Records that this app's Next.js version was raised by the framework's
     * own security upgrade flow (16.4.4 -> 16.4.6), addressing the advisory
     * about information disclosure across root params when a `use cache`
     * function is called through `unstable_cache()`. This project has root
     * params (`[locale]`) and `cacheComponents` enabled, so it is exactly the
     * shape that advisory describes.
     */
    agentUpgrade: "security",
  },
  /**
   * Emits `.next/standalone`, including the `*.nft.json` file traces.
   *
   * Required because `npm run build` bundles for Cloudflare with
   * `opennextjs-cloudflare build --skipNextBuild`. When OpenNext runs the Next
   * build itself it turns standalone output on for us; because we skip that
   * (to avoid recursing back into `npm run build`), we have to ask for it
   * here, or the bundler fails on a missing `middleware.js.nft.json`.
   */
  output: "standalone",
  cacheComponents: true,
  partialPrefetching: true,
  /**
   * Canonical URLs carry a trailing slash: /en/riyadh/, never /en/riyadh.
   * Next.js then answers 308 on the slashless form. The paths the site
   * generates come from `localePath()` in lib/i18n/config.ts, which appends
   * the same slash — change one and the other must follow, or every canonical
   * would point at a redirect.
   */
  trailingSlash: true,
  /**
   * Every page lives under a locale segment, so the bare root has nothing of
   * its own to serve. It is a temporary redirect rather than a permanent one:
   * a 308 would be cached by browsers indefinitely, and the root is where a
   * language-detecting entry point would go if one is added later.
   *
   * Both destinations are written with the trailing slash so each request
   * takes a single hop. Pointing them at the slashless form would make
   * /get-quote a two-hop chain through the trailing-slash redirect.
   */
  async redirects() {
    return [
      { source: "/", destination: "/en/", permanent: false },
      { source: "/get-quote", destination: "/en/get-quote/", permanent: false },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
