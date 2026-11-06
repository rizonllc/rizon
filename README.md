# Rizon

Marketing site for rizon.agency, built with [Astro](https://astro.build) 7 and deployed to Cloudflare Workers (static assets).

## Commands

| Command | What it does |
| --- | --- |
| `bun dev` | Optimizes images, then starts the dev server |
| `bun run build` | Optimizes images and builds to `dist/` |
| `bun run preview` | Builds, then serves with Wrangler (workerd) locally |
| `bun run deploy` | Builds and deploys with `wrangler deploy` |
| `bun run check` | Type-check Astro/TS files |

## Notes

- `public/_headers` and `public/_redirects` hold security headers and the legacy redirects.
- `scripts/optimize-images.mjs` generates responsive WebP variants into `public/_opt/` (gitignored).
- Blog posts: body in `src/content/blog/*.mdx`, metadata in `src/lib/posts.ts`.
