import { advancedMath } from "./advanced-math";
import { aiLiteracy } from "./ai-literacy";
import { centerForNeurodivergence } from "./center-for-neurodivergence";
import { choiceLearning } from "./choice-learning";
import { cloudSds } from "./cloud-sds";
import { kaiserMath } from "./kaiser-math";
import { rizonLms } from "./rizon-lms";
import type { StaticImageData } from "next/image";
import choiceLogo from "@/assets/companies/choice-learning.webp";
import cloudSdsLogo from "@/assets/companies/cloudsds.webp";
import { getProjectBySlug } from "./projects";
import { servicesFor } from "./case-study-links";
import type { CaseStudyCardProps } from "@/components/case-study-card";
import type { CaseStudy } from "@/components/case-study-page";

export type IndexCard = {
  study: CaseStudy;
  title: string;
  summary: string;
  result?: string; // shown only for named client work
  // Thumbnail. Screenshots crop to fill; logos (`contain`) sit centered on a tint.
  // No image at all falls back to a title placeholder, so swapping one in needs no layout change.
  image?: string | StaticImageData;
  contain?: boolean;
};

const preview = (slug: string) => getProjectBySlug(slug)?.preview;

// Copy for the /case-studies hub. Order within a section = strength.
export const caseStudiesIndex = {
  metaTitle: "Case Studies: LMS & LTI Projects We've Shipped | Rizon",
  metaDescription:
    "Real LMS, LTI, and Moodle projects Rizon has built: custom learning platforms, LTI integrations, and migrations for education and training providers.",
  h1: "Case Studies",
  intro:
    "Real platforms we've built and shipped: custom LMS builds, LTI integrations, Moodle work, and migrations for education and training providers. Each one started with a problem and ended with something in production.",
  cta: {
    h2: "Want to be the next one?",
    line: "Tell us what you're working on. In 30 minutes, we'll tell you how we'd approach it. No pitch, no obligation.",
  },
  sections: [
    {
      h2: "Client work",
      cards: [
        {
          study: choiceLearning,
          title: "Choice Learning (EdEHR)",
          summary:
            "We took over a stalled EdEHR platform, finished it, and modernized its LMS integration.",
          result: "1,200 students served per quarter.",
          image: choiceLogo,
          contain: true,
        },
        {
          study: aiLiteracy,
          title: "AI Literacy LXP",
          summary:
            "A multi-tenant B2B platform teaching AI fundamentals, prompt engineering, and practical AI adoption.",
          result: "Multi-tenant training platform serving multiple companies.",
          image: preview("ai-literacy-lxp"),
        },
        {
          study: cloudSds,
          title: "Cloud SDS",
          summary:
            "An LTI-based Zoom integration bringing live sessions directly into the learning platform.",
          result: "Live video, native to the platform.",
          image: cloudSdsLogo,
          contain: true,
        },
        {
          study: centerForNeurodivergence,
          title: "The Center for Neurodivergence",
          summary:
            "A custom e-learning platform for parents of neurodivergent children, with clinical oversight from therapists.",
          result: "Custom multi-role platform, built and deployed.",
          image:
            "/thecenterforneurodivergence/thecenterforneurodivergence.com.png",
        },
      ],
    },
    {
      h2: "Selected work",
      cards: [
        {
          study: advancedMath,
          title: "Advanced Math Learning Platform",
          summary:
            "A full LMS with live webinars, interactive coursework, and real-time collaboration.",
          image: preview("advanced-math-learning-platform"),
        },
        {
          study: kaiserMath,
          title: "Kaiser Math Platform",
          summary:
            "A gamified math learning platform with structured courses, quizzes, points, and leaderboards.",
          image: preview("kaiser-math-platform"),
        },
        {
          study: rizonLms,
          title: "Rizon LMS",
          summary:
            "A full-featured LMS for universities and training institutions: multi-course, auto-grading, and analytics.",
          image: preview("rizon-lms"),
        },
      ] satisfies IndexCard[],
    },
  ] as { h2: string; cards: IndexCard[] }[],
};

/** Card copy by case study slug, for service Proof sections. */
export const caseCardBySlug: Record<string, IndexCard> = Object.fromEntries(
  caseStudiesIndex.sections
    .flatMap((sec) => sec.cards)
    .map((card) => [card.study.slug, card]),
);

/** Props for the shared CaseStudyCard, by case study slug. */
export const caseCardProps = (slug: string): CaseStudyCardProps | null => {
  const card = caseCardBySlug[slug];
  if (!card) return null;
  return {
    slug,
    title: card.title,
    summary: card.summary,
    result: card.result,
    image: card.image,
    contain: card.contain,
    services: servicesFor(slug),
  };
};
