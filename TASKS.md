# Rizon SEO — Master Task List

> **Goal:** Take rizon.agency from ~232 impressions / 3 months to a domain with real
> topical authority in the custom-LMS / e-learning-platform space — ranking for
> high-intent commercial keywords and getting cited by AI answer engines.

---

## ⛔ READ BEFORE YOU TOUCH ANY TASK (every agent, every session)

1. **`AGENTS.md` / `CLAUDE.md`** — this is a *modified* Next.js (v16). Read the relevant
   guide in `node_modules/next/dist/docs/` before writing any route/metadata/schema code.
   APIs may differ from your training data. Heed deprecation notices.

2. **`human-writing.skill`** (repo root) — **mandatory for every task that writes prose**
   (alternatives pages, service pages, blog posts, About page, FAQ copy, meta descriptions).
   It's a zip. Extract and read both files first:
   ```
   unzip -o human-writing.skill -d /tmp/hw
   #   /tmp/hw/human-blog-writing/SKILL.md
   #   /tmp/hw/human-blog-writing/references/ai-tells.md
   ```
   Non-negotiable rules pulled from it — apply to ALL copy on this site:
   - **Persona + reader first.** Every page is written *as one specific person* (default:
     Choaib Mouhrach, founder/engineer who builds these platforms) *to one specific reader*
     (a named buyer persona — defined per task below). No "encyclopedia voice."
   - **One concrete, only-you-could-know detail per section** — a real number, a real
     scenario, a thing a client actually said. Not "systems fail" → "the LMS falls over the
     night 400 students log in for finals week."
   - **Vary sentence length hard** (burstiness). Short punch. Then a longer one that earns it.
   - **Kill the AI tells** in `references/ai-tells.md`: no *delve, leverage, seamless,
     robust, in today's fast-paced world, moreover, furthermore, it's worth noting,* no
     "not just X, but Y," no autopilot rule-of-three, no em-dash symmetry, no motivational-
     poster positivity. Have a real opinion; admit real tradeoffs.
   - **Don't reflexively bulletize prose** — lists only when it's genuinely a list.
   > Marketing/landing copy still follows these rules; being scannable ≠ being generic.

3. **When done with a task, check its box here and note the date.** Sessions are separate —
   this file is the shared memory. Don't redo checked work.

---

## Current state (as of 2026-07-19) — what already exists, DO NOT REDO

- Per-page `metadata`, canonical URLs, OpenGraph + Twitter cards (`layout.tsx`, each page)
- Dynamic OG images (`opengraph-image.tsx` on root + `blog/[slug]`)
- `src/app/sitemap.ts`, `src/app/robots.ts`
- JSON-LD: `ProfessionalService` (home), `Article` (blog slug), `CreativeWork` (work slug)
- 3 blog posts (MDX) in `src/content/blog/`; data in `src/lib/posts.ts`
- Work/case-study system: `src/lib/projects.ts` → `/work/[slug]`
- **Baseline metrics:** 29 clicks / 232 impressions / 12.5% CTR / avg position 6 (3 mo).

**The real problem:** almost nothing to index — one scrolling homepage + 3 posts. Google
ranks *domains* by topical competence now. Fix = high-intent landing pages + content volume
+ E-E-A-T + off-site authority.

**Priority order (why):** (0) fix breakage + free rich-result wins → (1) alternatives pages
(hottest buyers, least competition) → (2) service pillars → (3) content clusters (the slow
compounder) → (4) E-E-A-T → (5) GEO/AI-search → (6) off-site → (7) measurement.

---

# PHASE 0 — Technical fixes & free rich-result wins
*Hours of work, high certainty, and several are prerequisites for later schema. Do first.*

### [x] 0.1 — Fix the missing web manifest (real 404 bug) — done 2026-07-19
- **Problem:** `src/app/layout.tsx` icons array references `/manifest.json`, which does not
  exist → 404 every page load; kills installability/PWA signals.
- **Steps:**
  1. Create `src/app/manifest.ts` returning `MetadataRoute.Manifest`:
     `name: "Rizon"`, `short_name: "Rizon"`, `description` (reuse homepage
     description), `start_url: "/"`, `display: "standalone"`, `background_color` +
     `theme_color` (pull the real brand hex from `globals.css`), `icons` → existing
     `/public/android-chrome-192x192.png` (192, `any maskable`) and
     `/public/android-chrome-512x512.png` (512).
  2. Remove the manual `{ rel: "manifest", url: "/manifest.json" }` line from `layout.tsx`
     (Next auto-serves `/manifest.webmanifest` from `manifest.ts`).
- **Accept:** `curl -s localhost:3000/manifest.webmanifest` → valid JSON; no manifest 404
  in the network tab.

### [x] 0.2 — FAQPage schema on the homepage (zero new content) — done 2026-07-19
- **Why:** `src/app/faq.tsx` already renders 7 Q&As as HTML → instantly eligible for FAQ
  rich snippets.
- **Steps:**
  1. Move the `faqs` array out of the client component into `src/lib/faq.ts` (plain data,
     server-importable). Import it back into `faq.tsx`.
  2. In `src/app/page.tsx` add a second `<script type="application/ld+json">` building a
     `FAQPage` (`mainEntity[]` → `{ "@type":"Question", name, acceptedAnswer:{ "@type":
     "Answer", text }}`). **Answer text must match the visible FAQ verbatim** (Google policy).
- **Accept:** valid `FAQPage` JSON-LD; passes Google Rich Results Test; matches visible FAQ.

### [x] 0.3 — Upgrade Organization schema (home) — done 2026-07-19
- **Why:** only `ProfessionalService` exists; missing `logo`, `sameAs`, `contactPoint`.
- **Steps:** In `src/app/page.tsx`, restructure JSON-LD as an `@graph` with `Organization`
  (`@id: "https://rizon.agency/#org"`, `name`, `url`, `logo` = absolute URL to a square
  logo in `/public`, `email: "choaib.m@rizon.agency"`, `sameAs`: [LinkedIn
  `https://www.linkedin.com/in/choaib-mouhrach`, X profile for `@rizon_agency`],
  `contactPoint` with `contactType:"sales"`), plus `WebSite` (`@id .../#website`,
  `publisher: {@id .../#org}`) and keep `ProfessionalService` referencing the org.
- **Accept:** valid Organization with logo + ≥2 `sameAs`; Rich Results Test clean.

### [x] 0.4 — BreadcrumbList schema on blog + work detail pages — done 2026-07-19
- **Steps:** In `blog/[slug]/page.tsx` and `work/[slug]/page.tsx` add `BreadcrumbList`
  JSON-LD (Home → Blog/Work → title). Render a matching visible breadcrumb nav above the H1
  (schema should mirror what's on screen).
- **Accept:** valid `BreadcrumbList` on both; visible breadcrumb present.

### [ ] 0.5 — GSC + Bing verification + sitemap submit (ops, no code)
- **Steps:** Confirm `rizon.agency` verified in Google Search Console; submit
  `sitemap.xml`. Verify canonical host: `www` and non-`www` must 301 to ONE host (whatever
  matches `metadataBase`). Add + verify in Bing Webmaster Tools (feeds ChatGPT/Copilot).
- **Accept:** sitemap "Success" in GSC; one canonical host via 301; Bing verified.
- **NOTE (2026-07-19):** left unchecked — ops-only, needs GSC/Bing console + DNS/host access
  (not code). Owner action: verify `rizon.agency` in GSC + submit `sitemap.xml`; confirm
  `www` → non-`www` 301 to `https://rizon.agency` (matches `metadataBase`); add + verify in
  Bing Webmaster Tools. No repo change unless the 301 must live in `next.config`/middleware.

---

# PHASE 1 — "Alternatives" pages (highest ROI)
*Bottom-of-funnel buyers actively shopping to leave an incumbent. Rizon's no-lock-in /
code-ownership pitch is literally why they leave. Build as a data-driven template.*

> **LEGAL GUARDRAIL (applies to every alternatives page):** comparison advertising is legal,
> but every factual claim about a competitor must be **accurate and defensible at time of
> writing** — verify current pricing/features before publishing; things change. The
> "Where [competitor] is genuinely the better choice" section is mandatory: it's honest,
> builds E-E-A-T trust, and Google rewards balanced content over one-sided sales pages.
> No false or disparaging statements. Ever.

### [x] 1.1 — Alternatives data model + type (FOUNDATION — unblocks all of Phase 1) — done 2026-07-19
- **Steps:**
  1. Add to `src/types/index.ts`:
     ```ts
     export type ComparisonRow = { dimension: string; rizon: string; them: string };
     export type Faq = { question: string; answer: string };
     export type Alternative = {
       slug: string;              // "moodle"
       competitor: string;        // "Moodle"
       category: string;          // "Open-source LMS" | "Course platform" | "Corporate LMS"
       metaTitle: string;         // ≤60 chars, keyword-first
       metaDescription: string;   // 150–160 chars, human, includes "alternative"
       heroHeadline: string;      // H1
       heroSub: string;           // 1 sentence, front-loaded answer
       intro: string;             // 2–3 short paras (MDX or string[]); the direct answer up top
       whoThisIsFor: string;      // one specific reader persona sentence
       whyLeave: { title: string; body: string }[];   // 3–5 real pain points
       whereTheyWin: { title: string; body: string }[]; // 2–4 honest points
       comparison: ComparisonRow[];  // 6–9 rows
       migration: string;         // short para: how Rizon handles moving off them
       faqs: Faq[];               // 4–6
       keywords: string[];
       relatedServiceSlug?: string;  // link to Phase-2 service pillar
       relatedPostSlugs?: string[];  // link to Phase-3 cluster posts
     };
     ```
  2. Create `src/lib/alternatives.ts`: `export const alternatives: Alternative[]` +
     `getAlternativeBySlug(slug)`. Mirror `projects.ts`/`posts.ts` conventions.
  3. **URL decision (document at top of the file):** default **`/[slug]-alternative`**
     (`/moodle-alternative`) — keyword in path. If a root catch-all conflicts with existing
     routes, fall back to `/alternatives/[slug]`. Pick one, write down why.
- **Accept:** types compile; file exports ≥ the 2 seed entries from 1.2.

### [x] 1.2 — Write the Moodle & Canvas entries (worked examples — follow the blueprint exactly) — done 2026-07-19

**Persona to write as:** Choaib — engineer who has actually migrated clients off these
platforms. **Reader:** a training lead / course-business owner / school IT director who is
frustrated with their current LMS and pricing it out. Apply `human-writing.skill` in full.

**Section blueprint every entry must fill (this is the page structure):**

1. **Hero** — `heroHeadline` + `heroSub`. Headline pattern (vary it, don't template all
   pages identically): e.g. *"A custom-built Moodle alternative you actually own."*
   Sub = the front-loaded answer: who it's for + the core promise in one line.
2. **Intro (`intro`)** — 2–3 short paragraphs. Open with the direct answer: "If you're
   leaving Moodle, you have three real options — keep patching it, move to a hosted SaaS
   LMS, or have a platform built around how you actually teach. Here's when the third one
   wins." One concrete detail (a real migration scenario, a real number).
3. **"Why teams leave [competitor]" (`whyLeave`, 3–5 items)** — each a titled pain point
   with a 2–3 sentence body. Specific, not generic.
4. **Comparison table (`comparison`, 6–9 rows)** — semantic `<table>` (AI engines + Google
   extract these). Columns: **Dimension | Rizon (custom build) | [Competitor]**.
5. **"Where [competitor] is genuinely the better choice" (`whereTheyWin`, 2–4 items)** —
   mandatory honesty section (see guardrail).
6. **Migration (`migration`)** — how Rizon moves them off (data export, SCORM/content
   portability, timeline). Links to the migration cluster post (Phase 3.3).
7. **FAQ (`faqs`, 4–6)** — real buyer questions, schema-eligible.
8. **CTA** — book a call: `https://cal.com/rizon.agency-cvbkll/30min`.

**MOODLE — seed content spec (verify facts before publishing):**
- `category`: "Open-source LMS"
- `whyLeave` angles: heavy self-hosting/maintenance + dev burden; dated learner UX; plugin
  sprawl and version-upgrade pain; "free" that isn't (hosting, devs, MoodleCloud tiers);
  customization means fighting the codebase.
- `whereTheyWin`: genuinely free to self-host if you have in-house Moodle devs; massive
  existing plugin ecosystem; standards-heavy institutional/academic needs; no vendor at all.
- `comparison` dimensions: Ownership of code, Hosting & maintenance, Cost model, Learner UX,
  Customization depth, Upgrade/version risk, Integrations (LTI/SSO/payments), Support model.
- `faqs`: "Is a custom platform more expensive than Moodle?", "Can you migrate our Moodle
  courses and user data?", "Do we still get SCORM/LTI support?", "How long does a rebuild
  take?", "Who hosts it after launch?"

**CANVAS — seed content spec (verify facts before publishing):**
- `category`: "Cloud LMS (higher-ed/K-12)"
- `whyLeave` angles: per-seat SaaS pricing that scales against you; limited deep
  customization on the hosted product; you're a tenant, not an owner; feature roadmap isn't
  yours; data-portability/lock-in concerns (tie to the Canvas-breach post you already have,
  `canvas-breach-student-data-security`).
- `whereTheyWin`: strong out-of-the-box UX; mature for large institutions; big integration
  marketplace; you want zero engineering involvement.
- `comparison`: same dimension set as Moodle, values tuned to Canvas (hosted SaaS).
- `faqs`: pricing-vs-ownership, migrating Canvas course exports (IMSCC), student-data
  ownership/security, timeline, SSO/LTI parity.
- **Internal link:** `relatedPostSlugs: ["canvas-breach-student-data-security"]`.

- **Accept:** two complete, accurate, non-defamatory entries filling every field, written
  per `human-writing.skill` (persona voice, varied rhythm, no AI tells, honest tradeoffs).

### [x] 1.3 — Build the alternatives route/template component — done 2026-07-19
- **Steps:** Create the route (per 1.1 URL decision) that renders the 8-section blueprint
  from `Alternative` data. Reuse existing section/heading components + styling for brand
  consistency. Include:
  - `generateStaticParams()` from `alternatives`; `export const dynamicParams = false`.
  - `generateMetadata()` per entry: `title`=`metaTitle`, `description`=`metaDescription`,
    `alternates.canonical`, OG (`type:"website"`, siteName, locale, an OG image), Twitter
    `summary_large_image`, `keywords`.
  - Comparison rendered as a real `<table>` with `<thead>/<th>` (extraction-friendly).
  - JSON-LD `@graph`: `WebPage` (`about` = the comparison) + `FAQPage` (from `faqs`) +
    `BreadcrumbList` (Home → Alternatives → competitor) + a `Service` node
    (`serviceType:"Custom LMS development"`, `provider:{@id .../#org}`).
- **Accept:** `/moodle-alternative` + `/canvas-alternative` render, static-generate, pass
  Rich Results Test, look on-brand, and the table is a semantic table.

### [x] 1.4 — Wire alternatives into sitemap + internal links — done 2026-07-19
- **Steps:** Add all alternatives URLs to `src/app/sitemap.ts` (priority 0.8, monthly). Add
  a "Compare" / "Alternatives" column to `src/app/footer.tsx`. Add a homepage section
  (near Work or Services) linking the top 3 alternatives. Cross-link each alternatives page
  to its `relatedServiceSlug` once Phase 2 exists.
- **Accept:** every alternatives URL in sitemap + reachable via internal links (no orphans).

### [x] 1.5 — Expand the competitor set (reuse template, data-only) — done 2026-07-19
- **Add entries** (same blueprint + guardrail, verify facts): **Teachable**, **Thinkific**,
  **Kajabi**, **TalentLMS**, **LearnDash / WordPress LMS**, **Docebo** (corporate),
  **Blackboard** (higher-ed).
- **Plus a roundup pillar** `/lms-alternatives` (or `/best-custom-lms-alternatives`):
  intro + a master comparison table + card links to every individual alternatives page +
  its own FAQ + schema. This is the hub that the individual pages link up to.
- **Accept:** ≥6 more alternatives pages + 1 roundup pillar, all in sitemap, all interlinked
  (each individual page links to the roundup and vice-versa).

---

# PHASE 2 — Service / pillar landing pages
*Turn the keywords already sitting in homepage metadata into standalone rankable pages.
Each is a pillar that Phase-3 clusters link back to.*

### [x] 2.1 — Services data model + `/services/[slug]` route (FOUNDATION for Phase 2) — done 2026-07-19
- **Steps:**
  1. Add `Service` type to `src/types/index.ts`:
     ```ts
     export type ServiceSection = { heading: string; body: string };
     export type ServicePage = {
       slug: string; title: string; metaTitle: string; metaDescription: string;
       h1: string; heroSub: string;
       targetKeyword: string;           // exact-match phrase to hit in H1/URL/first para
       intro: string;                   // front-loaded answer
       forWho: string;                  // the reader persona
       problem: string;                 // the pain this service solves
       whatWeBuild: ServiceSection[];   // 4–6 blocks (features/capabilities)
       process: { step: string; detail: string }[];  // weekly-sprint process
       included: string[];              // deliverables list
       costBand: string;                // ranges + the factors that move price (GEO gold)
       outcomes: string;                // what changes for the client
       faqs: Faq[];                     // 4–6
       relatedAlternativeSlugs?: string[];
       relatedPostSlugs?: string[];
       keywords: string[];
     };
     ```
  2. `src/lib/services.ts` (data + `getServiceBySlug`). Route `/services/[slug]` with
     `generateStaticParams`, `generateMetadata`, and JSON-LD `@graph`: `Service` +
     `FAQPage` + `BreadcrumbList`.
- **Accept:** route renders one seed service, static-generated, schema valid.

### [x] 2.2 — Write the four pillar service pages — done 2026-07-19
*Each ≥1,500 words, written per `human-writing.skill`. Persona: Choaib. Reader named below.*
*Every page must: hit `targetKeyword` in H1 + URL + first paragraph + one H2; front-load
the answer; include the `costBand`; link down to cluster posts and across to alternatives.*

- [x] **2.2a `/services/custom-lms-development`** — primary money page. — done 2026-07-19
  - Target keyword: "custom LMS development". Reader: a founder/ops lead who's outgrown an
    off-the-shelf LMS and wants something built around their model.
  - Sections: what a custom LMS actually is vs off-the-shelf; when it's worth it (and when
    it isn't — honesty); what we build (auth/SSO, course builder, assessments, payments,
    analytics, admin); the weekly-sprint process (mirror the FAQ); cost band + drivers;
    ownership/no-lock-in; FAQ; CTA. Link to Moodle/Canvas alternatives + cost cluster.
- [x] **2.2b `/services/corporate-training-platform`** — done 2026-07-19
  - Keyword: "corporate training platform development". Reader: L&D / HR lead rolling out
    training to employees. Emphasize SSO, roles/teams, reporting, compliance/SCORM-xAPI,
    scale. Link to Docebo/TalentLMS alternatives.
- [x] **2.2c `/services/course-platform-for-creators`** — done 2026-07-19
  - Keyword: "custom course platform" / "Teachable alternative for creators". Reader: a
    course creator tired of revenue-share SaaS. Emphasize owning payments/revenue, branding,
    no per-sale cut. Link to Teachable/Thinkific/Kajabi alternatives + the cost cluster.
- [x] **2.2d `/services/school-student-portal-development`** — done 2026-07-19
  - Keyword: "school portal development" / "student portal development". Reader: school/
    institution IT director. Emphasize student/parent/teacher roles, gradebook, data
    security (link the Canvas-breach post), LTI. Link to Moodle/Canvas/Blackboard alts.
- **Accept per page:** ≥1,500 words, unique metadata, `Service`+`FAQPage` schema, internal
  links in+out, added to `sitemap.ts`, linked from nav/footer.

### [x] 2.3 — Services index/hub page + nav — done 2026-07-19
- **Steps:** `/services` listing all four pillars with a curiosity-driven blurb each; add to
  main nav (`src/app/navigation.tsx` + `src/app/mobile-nav.tsx`) and footer. Optional
  `CollectionPage`/`ItemList` schema.
- **Accept:** `/services` live, in nav + footer + sitemap.

---

# PHASE 3 — Content clusters (topical-authority engine, the slow compounder)
*~10 interlinked posts per pillar, each linking up to its service/alternatives pillar and
sideways to siblings. This is the volume Google needs to read topical competence.*

> **Every post is written per `human-writing.skill`.** Default persona: Choaib, the engineer
> who builds these. Reader: named per cluster. New post = MDX in `src/content/blog/` + entry
> in `src/lib/posts.ts` + cover in `src/assets/blog/`. Add `Article` schema already exists in
> the template. Front-load the answer (GEO). Add ≥1 cited statistic + ≥1 extractable table/list.

### [x] 3.1 — Keyword research + cluster map (deliverable: `content-plan.md`) — done 2026-07-19
- **Do (no code):** For each pillar, map ~10 long-tail target keywords → working title →
  search intent (informational/commercial) → which pillar it links to → primary "only-we-
  know" angle. Prioritize low-difficulty, high-intent. Anchor on the 3 existing posts.
- **Accept:** `content-plan.md` covering ≥3 pillars × ~10 topics, with the human-writing
  persona + reader noted per cluster.

### [x] 3.2 — Cost / decision cluster (highest-converting; reader: a buyer pricing it out) — completed 2026-07-19
Write ≥5 MDX posts, each with a real number or scenario, interlinked, all pointing to
`/services/custom-lms-development` and relevant alternatives pages:
- [x] "How much does a custom LMS cost in 2026?" (ranges + the factors that move price)
- [x] "Build vs buy an LMS: the honest math"
- [x] "The hidden cost of revenue-share course platforms" (ties to creator service)
- [x] "Custom LMS vs off-the-shelf: total cost of ownership over 3 years"
- [x] "What actually drives the price of an e-learning build"
- **Accept:** ≥5 posts, each linked to a pillar + ≥2 siblings.

### [x] 3.3 — Migration / "switching away" cluster (feeds the alternatives pages) — done 2026-07-19
- [x] "How to migrate off Moodle without losing course data"
- [x] "Exporting your courses from Canvas (IMSCC), step by step"
- [x] "Leaving Teachable: a migration checklist"
- [x] "SCORM vs xAPI: keeping your content portable"
- [x] "What a smooth LMS migration actually looks like (timeline + gotchas)"
- **Accept:** ≥5 posts, each links to its matching alternatives page.

### [x] 3.4 — Technical authority cluster (E-E-A-T + AI citations; extend existing 3 posts) — done 2026-07-19
- [x] "LTI 1.3 Advantage, explained without the spec-speak"
- [x] "A student-data security checklist for edtech teams"
- [x] "SSO options for learning platforms (and which to pick)"
- [x] "Designing assessments that resist cheating" (expand the existing angle)
- **Accept:** cluster reaches ~8–10 posts total (existing + new), interlinked.

### [x] 3.5 — Internal-linking audit — done 2026-07-19 (link map in content-plan.md; all 17 posts + 4 pillars pass, no orphans)
- **Steps:** Every post links UP to a pillar + SIDEWAYS to ≥2 siblings; every pillar links
  DOWN to its cluster. Add a "Related posts" block to `blog/[slug]/page.tsx`. No orphans.
- **Accept:** documented link map; zero orphaned content pages.

---

# PHASE 4 — E-E-A-T (author identity & trust)
*March 2026 core update made this primary; 73% of top pages show real author credentials.*

### [x] 4.1 — About page — done 2026-07-19
- **Steps:** `/about` — real founder/team story, track record, how Rizon works, why-own-it
  stance. Written per `human-writing.skill` (this page especially needs a real voice + a
  concrete origin story, not boilerplate). `AboutPage` + `Person` (founder) schema. Link
  from nav + footer + sitemap.
- **Accept:** `/about` live, in nav/footer/sitemap, `Person` schema for the founder.

### [x] 4.2 — Real author identity on the blog — done 2026-07-19
- **Steps:** Add `src/lib/authors.ts` (`Person`: name, role, bio, avatar, LinkedIn). Add
  `authorSlug` to `Post`. Render a byline + bio block on posts. Update the `Article` JSON-LD
  `author` from `Organization` → `Person` (with `url`, `sameAs`, `jobTitle`). Optional
  `/authors/[slug]` pages.
- **Accept:** posts show a bylined author + bio; `Article` schema uses `Person`.

### [x] 4.3 — Trust signals sitewide — done 2026-07-19
- **Steps:** Add real testimonials (with `Review`/`AggregateRating` schema **only if
  genuine**), named client results/logos, clear business identity in footer, links to
  third-party profiles (Clutch etc. from Phase 6). Written honestly per the skill.
- **Accept:** testimonials + social-proof block live with valid schema.

---

# PHASE 5 — GEO / AI-search optimization
*900M+ weekly ChatGPT users; being cited beats being ranked. Mostly an editorial layer over
Phases 1–4.*

### [x] 5.1 — House style: front-loaded answers + Q&A structure — done 2026-07-19
- **Steps:** Document in `content-plan.md`: every page opens with a 1–2 sentence direct
  answer to its core question; H2s phrased as real questions where natural. Apply to all
  Phase 1–2 pages + new posts.
- **Accept:** style doc written + applied.

### [x] 5.2 — Statistics, citations, quotable data (proven ~40% AI-visibility lift) — done 2026-07-20
- **Steps:** Add concrete stats with cited primary sources (outbound links) and a
  comparison table/stat block to each cornerstone page + post.
- **Accept:** each cornerstone page has ≥1 cited statistic + ≥1 extractable table/list.
- **DONE (2026-07-20):** Added a reusable `CitedStat` type + `<StatBlock>` (`figure`/`figcaption`,
  extractable) rendered on all 4 service pillars (BLS wage, xAPI, Stripe 2.9%+30¢, FERPA) and the
  3 cornerstone alternatives (Moodle `.mbz`/docs, Canvas IMSCC/instructor guide, Teachable/Stripe).
  Each links a **verified** primary source (all URLs curl-checked to resolve; BLS/Moodle are
  canonical but bot-block curl). Added missing citations to the LTI-migration post (1EdTech) and
  Canvas-breach post (FERPA). Comparison tables already satisfy the extractable-list half. No
  fabricated numbers/links. Remaining lower-priority alternatives keep their comparison tables.

### [x] 5.3 — AI-crawler policy + optional `llms.txt` — done 2026-07-19
- **Steps:** Confirm `robots.ts` doesn't block GPTBot / OAI-SearchBot / PerplexityBot /
  Google-Extended (recommend allow, for visibility). Optionally add `public/llms.txt`
  summarizing the site + key pages for LLMs.
- **Accept:** AI crawlers allowed (or a documented deliberate choice); optional `llms.txt`.

### [ ] 5.4 — Track AI visibility (ops)
- **Steps:** Periodically prompt ChatGPT / Perplexity / Google AI Overviews with buyer
  queries ("custom alternative to Moodle", "agency to build a course platform") and log
  whether Rizon is cited.
- **Accept:** a recurring check + a log.

---

# PHASE 6 — Off-site authority (no code — run continuously)
- [ ] **6.1** Create/complete profiles: **Clutch, DesignRush, GoodFirms, G2, Trustpilot** +
  edtech directories. Consistent NAP + backlink.
- [ ] **6.2** Google Business Profile (if a serviceable address exists).
- [ ] **6.3** Guest posts / digital PR on edtech + dev blogs — pitch the no-lock-in angle,
  link to pillar pages.
- [ ] **6.4** Repurpose case studies + posts as LinkedIn content (Choaib's profile) for
  referral links + engagement.
- [ ] **6.5** Monitor brand mentions; request links where unlinked.

---

# PHASE 7 — Measurement & iteration (ongoing)
- [x] **7.1** Baseline recorded (2026-07-19: 29 clicks / 232 impr / 12.5% CTR / pos 6 / 3mo) — done 2026-07-19.
- [ ] **7.2** Monthly GSC review: impressions, clicks, position, indexed pages, keyword
  coverage. Track which alternatives/service pages gain traction.
- [ ] **7.3** Refresh winners, expand moving clusters, prune/merge dead pages; re-run Rich
  Results Test after any schema change.
- [ ] **7.4** Core Web Vitals stay green as content grows (Search Console / CrUX field data): LCP,
  CLS, INP.

---

## Quick reference — where things live
| Concern | File(s) |
|---|---|
| Global metadata / icons | `src/app/layout.tsx` |
| Homepage + JSON-LD | `src/app/page.tsx` |
| FAQ content | `src/app/faq.tsx` → lift to `src/lib/faq.ts` (0.2) |
| Sitemap / Robots | `src/app/sitemap.ts` / `src/app/robots.ts` |
| Manifest | `src/app/manifest.ts` (create in 0.1) |
| Blog data / posts | `src/lib/posts.ts`, `src/content/blog/*.mdx` |
| Work / case studies | `src/lib/projects.ts`, `src/app/work/[slug]/page.tsx` |
| Types | `src/types/index.ts` |
| Alternatives (new) | `src/lib/alternatives.ts` + route (Phase 1) |
| Services (new) | `src/lib/services.ts` + `/services/[slug]` (Phase 2) |
| Authors (new) | `src/lib/authors.ts` (Phase 4) |
| Content plan (new) | `content-plan.md` (Phase 3.1) |

> **Reminder:** modified Next.js 16 — read `node_modules/next/dist/docs/` before route/
> metadata/schema code. And read `human-writing.skill` before writing ANY prose.
