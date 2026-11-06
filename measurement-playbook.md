# Rizon SEO measurement playbook

Owner: Choaib Mouhrach
Started: 2026-07-19
Review rhythm: first business day of each month

This is the working record for the SEO work already shipped. It exists to stop a familiar failure mode: publishing a page, checking it once, then guessing why it did or did not move.

## Starting point

The Search Console baseline below covers the three months ending 2026-07-19. Record the same window each month before comparing a trend. A single week is too noisy for a small site.

| Metric | Baseline |
| --- | ---: |
| Clicks | 29 |
| Impressions | 232 |
| Click-through rate | 12.5% |
| Average position | 6 |

## Monthly review

On the first business day, Choaib checks Search Console for the previous full calendar month and adds one row here. Compare the result with the prior month and the same period last year once enough history exists.

| Month | Clicks | Impressions | CTR | Average position | Indexed pages | New queries / pages gaining traction | Decision and owner |
| --- | ---: | ---: | ---: | ---: | ---: | --- | --- |
| 2026-07 baseline | 29 | 232 | 12.5% | 6 | — | Baseline only; service and alternatives pages are newly tracked | Start monthly record |
|  |  |  |  |  |  |  |  |

For the alternatives and services work, filter Search Console by these paths rather than judging the whole site:

- `/lms-alternatives` and `/alternatives/`
- `/services/`
- `/blog/`

For each path group, note the query, page, impression trend, click trend, and average position. A new page with impressions but no clicks needs a more honest, sharper search snippet. A page with no impressions after roughly 90 days needs an index, canonical, internal-link, and intent check before more copy gets added.

## What changes after the review

Keep a short decision log. Change one meaningful thing at a time where possible, then give it a full review cycle before declaring it a win.

| Signal | First response | Do not do |
| --- | --- | --- |
| Impressions rise while CTR lags | Rework the title and meta description to state the exact buyer problem and page answer. | Promise a result the page cannot prove. |
| Position improves but stalls on a topic cluster | Add the next planned post, link it to the service/alternative pillar, and answer the missing sub-question. | Inflate an existing page with loosely related keywords. |
| A page earns clicks and has an outdated factual claim | Refresh the claim from a primary source and update the date only if the content materially changed. | Quietly leave old product, pricing, or standards facts in place. |
| A page has no useful search demand after a fair index period | Check technical indexing and links; then merge it into the stronger, overlapping page or retire it. | Keep near-duplicate pages alive to make the sitemap look larger. |

When a post gets published from `content-plan.md`, add its target query and pillar URL to the monthly row. The planned posts are deliberately not treated as completed until they exist and can be measured.

## Schema and rich-result checks

After every schema change:

1. Open the affected production URL and inspect the rendered JSON-LD; verify the URL, canonical, author, publisher, dates, and referenced images are real.
2. Run the production page through Google's Rich Results Test and record any errors or warnings in the decision log.
3. Recheck the page after deployment. A schema object that compiles but is absent from the document does not help search engines.

Use only schema types supported by the page's actual visible content. Do not add ratings, reviews, FAQs, events, or service claims merely because a validator accepts the syntax.

## Core Web Vitals review

Open Search Console's Core Web Vitals report (or CrUX) during the same monthly review and look at field data for LCP, CLS, and INP by route. Record the slowest route, the metric at risk, the device split, and the next action.

| Month | Route | Metric at risk | Device split | Investigation / action | Verified after release? |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

Treat content changes as performance changes when they add a hero image, video, third-party embed, web font, or large client component. Test the changed route before release; then use Speed Insights to see what real visitors experience. Lab checks are useful, but field data gets the deciding vote.

## Quarterly pruning pass

Every quarter, review the content inventory against Search Console and the service offering. Merge overlapping pages, update pages that still answer a live buyer question, and remove pages that are neither useful nor defensible. Preserve redirects whenever a published URL is removed or consolidated.

The goal is a site that gives a prospective buyer a straight answer. More URLs are not the goal.
