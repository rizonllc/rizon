import type { CaseStudy } from "@/components/case-study-page";

// Copy for /case-studies/ai-literacy-lxp (overrides the generic [slug] template).
// ponytail: no testimonial or outcome numbers yet; add `testimonial` and real outcomes to `result` once confirmed.
export const aiLiteracy: CaseStudy = {
  slug: "ai-literacy-lxp",
  metaTitle: "AI Literacy LXP Case Study | Rizon",
  metaDescription:
    "How Rizon built a multi-tenant B2B training platform for AI Literacy: teaching AI fundamentals, prompt engineering, and practical AI adoption to companies.",
  name: "AI Literacy LXP",
  h1: "AI Literacy LXP",
  summary:
    "A multi-tenant B2B learning experience platform teaching AI fundamentals, prompt engineering, and practical AI adoption to companies and their teams.",
  meta: [
    { label: "Client", value: "AI Literacy" },
    // Year taken from the existing project record in lib/projects.ts.
    { label: "Year", value: "2024" },
    { label: "Industry", value: "Corporate training" },
    { label: "Services", value: "Custom LMS Development" },
    { label: "Stack", value: "React, TypeScript, PostgreSQL, Hono, Redis, BullMQ" },
  ],
  glance: [
    { text: "Multi-tenant platform serving multiple companies from one build" },
    { text: "Video lessons, progress analytics, and completion certificates" },
    { text: "Background job processing (Redis, BullMQ) for scale" },
  ],
  challenge: {
    h2: "Teaching AI skills across many companies at once.",
    body: "AI Literacy needed to deliver AI training (fundamentals, prompt engineering, and practical tool adoption) to multiple client companies, each with its own teams and learners. A single-tenant course tool couldn't keep each company's users, content, and progress separate, and couldn't scale to serve many organizations from one platform.",
  },
  approach: {
    h2: "One platform, many companies, cleanly separated.",
    body: "We built a multi-tenant learning experience platform where each company operates in its own space, with its own users, content access, and reporting, all running on a single codebase. The architecture was built for scale from the start, with background job processing to handle video, analytics, and certificate generation without slowing the experience.",
  },
  built: {
    h2: "What we built",
    items: [
      {
        text: "Multi-tenant architecture serving multiple companies from one platform.",
        links: [
          {
            text: "Multi-tenant architecture",
            href: "/services/custom-lms-development",
          },
        ],
      },
      { text: "Video-based lessons on AI fundamentals, prompt engineering, and practical AI adoption" },
      { text: "Per-learner and per-company progress analytics" },
      { text: "Automated completion certificates" },
      { text: "Background job processing (Redis, BullMQ) for reliable performance at scale" },
    ],
  },
  result: {
    h2: "The result",
    body: "AI Literacy runs a scalable, multi-tenant platform that delivers AI training to companies and their teams, tracks progress per organization, and issues certificates automatically.",
  },
  services: { h2: "Services used on this project" },
  cta: {
    h2: "Training teams across an organization?",
    line: "Tell us what you're working on. In 30 minutes, we'll tell you how we'd approach it. No pitch, no obligation.",
  },
};
