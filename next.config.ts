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
