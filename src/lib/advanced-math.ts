import type { CaseStudy } from "@/components/case-study-page";

// Copy for /case-studies/advanced-math-learning-platform (overrides the generic [slug] template).
export const advancedMath: CaseStudy = {
  slug: "advanced-math-learning-platform",
  // TODO: metaTitle is 63 chars (>60) — shorten, e.g.: "Advanced Math Learning Platform: Custom LMS | Rizon"
  metaTitle: "Advanced Math Learning Platform: Custom LMS Development | Rizon",
  metaDescription:
    "A custom LMS for advanced mathematics education with live webinars, interactive coursework, and real-time collaboration. Custom LMS development by Rizon.",
  name: "Advanced Math Learning Platform",
  h1: "Advanced Math Learning Platform",
  summary:
    "A full LMS for advanced mathematics education: live webinars, interactive coursework, and real-time collaboration.",
  meta: [
    { label: "Year", value: "2024" },
    { label: "Discipline", value: "Custom LMS Development" },
    { label: "Stack", value: "Next.js, TypeScript, Tailwind, Prisma, PostgreSQL" },
  ],
  challenge: {
    h2: "The problem",
    body: "A mathematics education provider needed a modern platform to deliver advanced courses online. Their existing solution couldn't handle live webinars or interactive features, and had no way to track student progress or foster collaboration between learners.",
  },
  approach: {
    h2: "Our solution",
    body: "We built a full learning management system with live webinar integration featuring chat and whiteboard functionality. The platform includes interactive homework submission and grading, student performance analytics with rankings, an achievement system with badges, and real-time collaboration tools for group learning.",
  },
  built: {
    h2: "What we built",
    items: [
      { text: "Live webinars with in-session chat and a shared whiteboard" },
      { text: "Interactive coursework and homework submission with grading" },
      { text: "Student performance analytics and rankings" },
      { text: "Achievement badges to drive engagement" },
      { text: "Real-time collaboration tools for group learning" },
    ],
  },
  services: { h2: "Services used on this project" },
  cta: {
    h2: "Building something similar?",
    line: "Tell us what you're working on. In 30 minutes, we'll tell you how we'd approach it. No pitch, no obligation.",
  },
};
