import type { CaseStudy } from "@/components/case-study-page";

// Copy for /case-studies/kaiser-math-platform (overrides the generic [slug] template).
export const kaiserMath: CaseStudy = {
  slug: "kaiser-math-platform",
  metaTitle: "Kaiser Math Platform: Custom LMS Development | Rizon",
  metaDescription:
    "A gamified math learning platform with structured courses, quizzes, points, and leaderboards. Custom LMS development by Rizon.",
  name: "Kaiser Math Platform",
  h1: "Kaiser Math Platform",
  summary:
    "A gamified math learning platform built around structured courses, lessons, and quizzes, with points, ranks, and leaderboards.",
  meta: [
    // Year taken from the existing project record in lib/projects.ts.
    { label: "Year", value: "2025" },
    { label: "Discipline", value: "Custom LMS Development" },
    { label: "Stack", value: "React, TypeScript, PostgreSQL, Hono" },
  ],
  challenge: {
    h2: "The problem",
    body: "A math education provider wanted to make structured learning engaging enough to keep students coming back. A standard course tool could deliver lessons and quizzes, but it couldn't motivate learners to keep going: no progression and no competition, so no reason to return after the first session. They also needed admins to build courses, manage large question banks, and grade attempts without juggling multiple tools.",
  },
  approach: {
    h2: "Our solution",
    body: "We built a gamified learning platform where students work through structured courses, earn points, climb ranks, and compete on leaderboards. Behind it, admins build and manage courses, maintain question banks, and grade attempts from a single dashboard, with everything in one place and no external tools.",
  },
  built: {
    h2: "What we built",
    items: [
      { text: "Structured courses, lessons, and quizzes" },
      { text: "Points, ranks, and competitive leaderboards to drive engagement" },
      { text: "Admin course builder and question-bank management" },
      { text: "Attempt grading from a single dashboard" },
    ],
  },
  services: { h2: "Services used on this project" },
  cta: {
    h2: "Building something similar?",
    line: "Tell us what you're working on. In 30 minutes, we'll tell you how we'd approach it. No pitch, no obligation.",
  },
};
