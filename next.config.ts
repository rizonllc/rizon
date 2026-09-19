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
      { source: "/work/wavalid", destination: "/products/wavalid", permanent: true },
      { source: "/work/:slug", destination: "/case-studies/:slug", permanent: true },
      // ponytail: no case-studies index yet; send it to the home work section.
      { source: "/case-studies", destination: "/#work", permanent: false },
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
          theme: {
            light: "github-light",
            dark: "github-dark",
          },
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
