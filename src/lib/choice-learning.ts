import type { CaseStudy } from "@/components/case-study-page";

// Copy for /case-studies/choice-learning.
export const choiceLearning: CaseStudy = {
  slug: "choice-learning",
  metaTitle: "Choice Learning (EdEHR) Case Study | Rizon",
  metaDescription:
    "How Rizon finished a stalled EdEHR platform, upgraded its LTI integration to 1.3, and now serves 1,200 students per quarter. LTI, Moodle, and migration work.",
  name: "Choice Learning",
  h1: "Choice Learning: EdEHR Platform",
  summary:
    "We took over a stalled educational EHR (electronic health record) platform, finished it, and modernized its LMS integration. It now serves 1,200 students per quarter.",
  meta: [
    { label: "Client", value: "Choice Learning" },
    { label: "Industry", value: "Healthcare education" },
    {
      label: "Services",
      value:
        "LTI Development, LTI 1.1 to 1.3 Migration, Moodle Development, WooCommerce to Moodle",
    },
    { label: "Platforms", value: "Moodle, LTI, AWS" },
  ],
  glance: [
    { value: "1,200", text: "students served per quarter" },
    { value: "1.3", text: "LTI integration upgraded from deprecated 1.1" },
    { value: "1", text: "Moodle instance, merged from two, upgraded and moved to AWS" },
    { value: "Auto", text: "enrollment from course sales connected directly to Moodle" },
  ],
  challenge: {
    h2: "A critical platform, stalled mid-build.",
    body: "Choice Learning runs EdEHR, an educational electronic health record system that teaches healthcare students on realistic patient records. The project had stalled partway through, with an LTI integration built on the deprecated LTI 1.1 standard, no learner tracking, and infrastructure that wasn't ready to scale. They needed someone who could pick up an unfinished codebase, understand it, and carry it to production without starting over.",
  },
  approach: {
    h2: "Take ownership, stabilize, then modernize.",
    body: "Rather than rebuild from scratch, we took over the existing project, patched what was broken, and finished it. From there we modernized the parts that mattered most for reliability and growth: the LMS integration, learner tracking, the Moodle setup underneath, and the path from course purchase to enrollment. Each piece shipped in sequence so the platform stayed usable throughout.",
  },
  built: {
    h2: "What we did",
    items: [
      { text: "Finished and patched the stalled EdEHR platform, taking it to production." },
      {
        text: "Built the LTI integration connecting EdEHR to the LMS, and upgraded it from deprecated LTI 1.1 to LTI 1.3.",
        links: [
          {
            text: "upgraded it from deprecated LTI 1.1 to LTI 1.3",
            href: "/services/lti-1-1-to-1-3-migration",
          },
        ],
      },
      { text: "Added learner tracking so student activity and progress are properly recorded." },
      {
        text: "Merged two separate Moodle instances into one and upgraded it to the latest version.",
        links: [
          {
            text: "Merged two separate Moodle instances into one",
            href: "/services/moodle-development",
          },
        ],
      },
      { text: "Redeployed the platform on AWS for reliable, scalable hosting." },
      {
        text: "Connected WooCommerce to Moodle so course purchases enroll students automatically.",
        links: [
          {
            text: "Connected WooCommerce to Moodle",
            href: "/services/woocommerce-to-moodle",
          },
        ],
      },
    ],
  },
  result: {
    h2: "The result",
    body: "The platform now serves 1,200 students per quarter on a modern, standards-based LTI 1.3 integration, a single upgraded Moodle instance, and scalable AWS hosting. Course sales flow straight into enrollment, and learner activity is tracked end to end.",
  },
  services: { h2: "Services used on this project" },
  testimonial: {
    quote:
      "Great to work with. Really knows LTI, Moodle, and Canvas inside out. He figured out issues we'd been stuck on and got everything working smoothly.",
    author: "Laura Keast",
    org: "Choice Learning",
  },
  cta: {
    h2: "Picked up a project that stalled?",
    line: "Tell us where it's stuck. In 30 minutes, we'll tell you how we'd get it moving. No pitch, no obligation.",
  },
};
