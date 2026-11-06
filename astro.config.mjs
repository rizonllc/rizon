import { defineConfig, fontProviders } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import { unified } from "@astrojs/markdown-remark";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { rehypeHeadingAnchors } from "./src/plugins/rehype-heading-anchors.mjs";

export default defineConfig({
  site: "https://rizon.agency",
  output: "static",
  trailingSlash: "never",
  build: { format: "file" },
  adapter: cloudflare({
    // Pages are prerendered with Node so build-time libraries (shiki, resvg) work.
    prerenderEnvironment: "node",
    imageService: "compile",
  }),
  session: false,
  integrations: [
    react(),
    mdx({ syntaxHighlight: false }),
  ],
  markdown: {
    syntaxHighlight: false,
    processor: unified({
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        [
          rehypePrettyCode,
          {
            theme: "github-light",
            keepBackground: false,
            defaultLang: { block: "text", inline: "text" },
          },
        ],
        rehypeHeadingAnchors,
      ],
      syntaxHighlight: false,
      smartypants: false,
    }),
  },
  fonts: [
    { name: "Inter", cssVariable: "--font-sans", provider: fontProviders.fontsource(), weights: ["100 900"], styles: ["normal"], subsets: ["latin"], fallbacks: ["sans-serif"] },
    { name: "Bricolage Grotesque", cssVariable: "--font-bricolage", provider: fontProviders.fontsource(), weights: ["200 800"], styles: ["normal"], subsets: ["latin"], fallbacks: ["sans-serif"] },
    { name: "Geist", cssVariable: "--font-geist-sans", provider: fontProviders.fontsource(), weights: ["100 900"], styles: ["normal"], subsets: ["latin"], fallbacks: ["sans-serif"] },
    { name: "Geist Mono", cssVariable: "--font-geist-mono", provider: fontProviders.fontsource(), weights: ["100 900"], styles: ["normal"], subsets: ["latin"], fallbacks: ["monospace"] },
  ],
  vite: {
    plugins: [tailwindcss()],
    css: {
      transformer: "lightningcss",
      lightningcss: {
        // Match the old Next.js build, which compiled oklch() colours down to sRGB hex
        // (Next's default browser targets). Keeps colour mixing and rendering identical.
        targets: { chrome: 64 << 16, edge: 79 << 16, firefox: 67 << 16, safari: 12 << 16 },
      },
    },
    // Native binding used only by build-time OG image endpoints; never bundle it.
    optimizeDeps: { exclude: ["@resvg/resvg-js"] },
    ssr: { external: ["@resvg/resvg-js"] },
  },
});
