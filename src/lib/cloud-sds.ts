import type { CaseStudy } from "@/components/case-study-page";

// Copy for /case-studies/cloud-sds.
export const cloudSds: CaseStudy = {
  slug: "cloud-sds",
  metaTitle: "Cloud SDS Case Study | Rizon",
  metaDescription:
    "How Rizon built a Zoom integration for Cloud SDS via LTI, bringing live video sessions directly into their learning platform.",
  name: "Cloud SDS",
  h1: "Cloud SDS: Zoom Integration via LTI",
  summary:
    "We built an LTI-based Zoom integration for Cloud SDS, bringing live video sessions directly into their learning platform, with no separate links and no manual setup.",
  meta: [
    { label: "Client", value: "Cloud SDS" },
    { label: "Services", value: "LTI Development" },
    { label: "Platforms", value: "LTI, Zoom" },
  ],
  glance: [
    { text: "Zoom connected to the learning platform through LTI" },
    { text: "Live sessions launch directly from inside courses" },
    { text: "No separate meeting links or manual scheduling for learners" },
  ],
  challenge: {
    h2: "Live sessions living outside the platform.",
    body: "Cloud SDS needed live video as part of their learning experience, but running Zoom separately from the platform meant scattered meeting links, manual scheduling, and a clunky path for learners trying to get from a course to a live session. They needed Zoom to work as a native part of the platform instead of a tool bolted on beside it.",
  },
  approach: {
    h2: "Bring Zoom in through LTI, the standard way.",
    body: "We connected Zoom through LTI, the standard way to integrate an external tool into a learning platform, and skipped manual links and fragile hacks. That means secure, automatic launches from within the platform and a setup that keeps working through updates.",
  },
  built: {
    h2: "What we built",
    items: [
      {
        text: "An LTI integration connecting Zoom to the Cloud SDS learning platform.",
        links: [{ text: "LTI integration", href: "/services/lti-development" }],
      },
      { text: "Live sessions that launch directly from inside courses, with no separate meeting links to manage." },
      { text: "A standards-based setup built to keep working reliably rather than a one-off workaround." },
    ],
  },
  result: {
    h2: "The result",
    body: "Cloud SDS now runs live Zoom sessions as a native part of their platform. Learners move from course to live session in one place, and the team no longer manages scattered links or manual scheduling.",
  },
  services: { h2: "Services used on this project" },
  testimonial: {
    quote:
      "Choaib and team are a great partner to work with. They are detail-oriented, knowledgeable, and dependable. They are always available to help and go above and beyond to make sure expectations are met.",
    org: "Cloud SDS",
  },
  cta: {
    h2: "Need a tool to work inside your platform?",
    line: "Tell us what you're trying to connect. In 30 minutes, we'll tell you how we'd approach it. No pitch, no obligation.",
  },
};
