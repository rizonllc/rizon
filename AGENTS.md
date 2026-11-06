# Stack

Astro 7 (static output) deployed to Cloudflare Workers via `@astrojs/cloudflare`.
Pages live in `src/pages` (`.astro`); page bodies are React views in `src/views`,
sections in `src/sections`, and interactive pieces are hydrated React islands.
Check the Astro docs (https://docs.astro.build) before changing routing, content
collections or the Cloudflare adapter config.

# Commits

Always create git commits through the `commit` skill (`/commit`). Do not
hand-write commits with `git commit` directly. The skill enforces the
Conventional Commits format and the repo's commit conventions.
