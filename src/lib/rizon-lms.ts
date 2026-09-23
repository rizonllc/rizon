import type { CaseStudy } from "@/components/case-study-page";

// Copy for /case-studies/rizon-lms (overrides the generic [slug] template).
export const rizonLms: CaseStudy = {
  slug: "rizon-lms",
  metaTitle: "Rizon LMS: Custom LMS Development | Rizon",
  // TODO: metaDescription is 169 chars (>155) — shorten, e.g.: "A full-featured LMS for universities and training institutions: multi-course, auto-graded quizzes, analytics, and multi-role dashboards."
  metaDescription:
    "A full-featured LMS for universities and training institutions: multi-course, auto-graded quizzes, analytics, and multi-role dashboards. Custom LMS development by Rizon.",
  name: "Rizon LMS",
  h1: "Rizon LMS",
  summary:
    "A full-featured learning management system for universities and training institutions: multi-course, auto-grading, analytics, and multi-role dashboards.",
  meta: [
    // Year taken from the existing project record in lib/projects.ts.
    { label: "Year", value: "2025" },
    { label: "Discipline", value: "Custom LMS Development" },
    { label: "Stack", value: "React, TypeScript, PostgreSQL, Hono" },
  ],
  challenge: {
    h2: "The problem",
    body: "A training institution needed a learning platform that could handle real scale, with many courses, many roles, and proper reporting, without stitching together separate tools for delivery, assessment, and analytics. Off-the-shelf options either didn't fit how they ran their programs or locked essential features behind per-seat pricing.",
  },
  approach: {
    h2: "Our solution",
    body: "We built a full-featured LMS supporting multiple courses and multiple user roles, each with its own dashboard. It includes a quiz builder with automatic grading and progress analytics so administrators can see how learners and courses are performing, all in one owned platform built around how the institution actually operates.",
  },
  built: {
    h2: "What we built",
    items: [
      { text: "Multi-course support at scale" },
      { text: "Quiz builder with automatic grading" },
      { text: "Progress and performance analytics" },
      { text: "Multi-role dashboards (learners, instructors, admins)" },
    ],
  },
  services: { h2: "Services used on this project" },
  cta: {
    h2: "Building something similar?",
    line: "Tell us what you're working on. In 30 minutes, we'll tell you how we'd approach it. No pitch, no obligation.",
  },
};
