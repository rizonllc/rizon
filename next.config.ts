import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    // NOTE: Content-Security-Policy is intentionally shipped as
    // "Content-Security-Policy-Report-Only" for now. In this mode the
    // browser evaluates the policy and reports violations to the console
    // (and via `report-uri`/`report-to` if configured) but does NOT block
    // anything. Nothing on the site can break from this header as shipped.
    // TODO: after monitoring the browser console (and ideally wiring up a
    // report endpoint) for false positives across all page types — home,
    // blog/MDX posts, case studies with embedded media, contact form —
    // rename this to `Content-Security-Policy` to start enforcing it.
    const csp = [
      "default-src 'self'",
      // Next.js injects inline bootstrap scripts and hashes them, but
      // 'unsafe-inline' is kept here as a safety net for third-party
      // scripts (Vercel Analytics/Speed Insights, self-hosted Umami) that
      // may inject inline snippets. Tighten to nonces/hashes once verified.
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://analytics.rizon.agency https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: https:",
      "font-src 'self' data: https://fonts.gstatic.com",
      "connect-src 'self' https://vitals.vercel-insights.com https://analytics.rizon.agency https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com",
      // GTM <noscript> fallback iframe.
      "frame-src https://www.googletagmanager.com",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; ");

    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Content-Security-Policy-Report-Only",
            value: csp,
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Locales were removed; send old /fr, /es, /de URLs to the English page.
      { source: "/:locale(fr|es|de)/:path*", destination: "/:path*", permanent: true },
      { source: "/:locale(fr|es|de)", destination: "/", permanent: true },
      // Non-edtech products were removed.
      { source: "/work/wavalid", destination: "/", statusCode: 301 },
      { source: "/products/:slug(rizonvo|wavalid)", destination: "/", statusCode: 301 },
      { source: "/work/:slug", destination: "/case-studies/:slug", permanent: true },
      // Alternatives moved under the /lms-alternatives hub; low-demand ones were dropped.
      {
        source: "/alternatives/:slug(canvas|learndash|blackboard)",
        destination: "/lms-alternatives",
        statusCode: 301,
      },
      {
        source: "/alternatives/:slug(teachable|kajabi|thinkific|moodle|docebo|talentlms)",
        destination: "/lms-alternatives/:slug",
        statusCode: 301,
      },
      { source: "/alternatives", destination: "/lms-alternatives", statusCode: 301 },
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [
      [
        "rehype-pretty-code",
        {
          theme: "github-light",
          keepBackground: false,
          defaultLang: {
            block: "text",
            inline: "text",
          },
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
