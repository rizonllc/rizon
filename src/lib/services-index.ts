import {
  Blocks,
  Code,
  GraduationCap,
  Link2,
  Plug,
  RefreshCw,
  Repeat,
  Wrench,
  type LucideIcon,
} from "lucide-react";

// Copy for the /services overview page.
export const servicesIndex = {
  metaTitle: "LMS Development Services | Rizon",
  metaDescription:
    "Custom LMS development, Moodle and Canvas integration, LTI development, and LMS migrations. Book a free 30-minute discovery call.",
  h1: "LMS Development Services",
  intro:
    "We build and integrate learning platforms end to end: custom LMS development, Moodle and Canvas work, LTI integrations, and platform migrations. Whether you're building from scratch or extending a system you already run, we handle the build, the integration, and the handover. Every project starts with a free 30-minute call to scope the work.",
  groups: [
    {
      h2: "Build",
      items: [
        {
          slug: "custom-lms-development",
          icon: Blocks,
          title: "Custom LMS Development",
          body: "Learning platforms built around how you teach: you own the code and the data, and you set the roadmap.",
        },
        {
          slug: "lti-development",
          icon: Link2,
          title: "LTI Integration & Development",
          body: "Standards-compliant LTI tools and integrations that connect cleanly to any LMS.",
        },
      ],
    },
    {
      h2: "Platforms",
      items: [
        {
          slug: "moodle-development",
          icon: Code,
          title: "Moodle Development",
          body: "Custom Moodle builds, integrations, and fixes from a team that knows the platform deeply.",
        },
        {
          slug: "moodle-plugin-development",
          icon: Plug,
          title: "Custom Moodle Plugin Development",
          body: "Custom plugins that add exactly the functionality your Moodle install is missing.",
        },
        {
          slug: "canvas-development",
          icon: GraduationCap,
          title: "Canvas LMS Development",
          body: "Canvas apps, LTI integrations, and API development for the Canvas ecosystem.",
        },
        {
          slug: "canvas-plugin-development",
          icon: Wrench,
          title: "Canvas Plugin Development",
          body: "Custom Canvas LMS tools and LTI apps that do what a plugin would.",
        },
      ],
    },
    {
      h2: "Migrations",
      items: [
        {
          slug: "lti-1-1-to-1-3-migration",
          icon: Repeat,
          title: "LTI 1.1 to 1.3 Migration",
          body: "Move your integrations to the modern standard without breaking the tools you depend on.",
        },
        {
          slug: "woocommerce-to-moodle",
          icon: RefreshCw,
          title: "WooCommerce to Moodle",
          body: "Turn course purchases into automatic Moodle enrollments, cleanly integrated.",
        },
      ],
    },
  ] satisfies {
    h2: string;
    items: {
      slug: string;
      icon: LucideIcon;
      title: string;
      body: string;
    }[];
  }[],
  cta: {
    h2: "Not sure where your project fits?",
    line: "Tell us what you're working on. In 30 minutes we'll tell you how we'd approach it. No pitch, no pressure.",
  },
  faqH2: "LMS development services, answered",
  faqs: [
    {
      question: "What LMS platforms do you work with?",
      answer:
        "We build custom LMS platforms from scratch and work extensively with Moodle and Canvas. We also handle LTI integrations that connect tools to any standards-compliant LMS.",
    },
    {
      question: "Do you build new platforms or improve existing ones?",
      answer:
        "Both. We build custom learning platforms from the ground up, and we extend, integrate, and migrate systems you already run.",
    },
    {
      question: "How do projects start?",
      answer:
        "Every project begins with a free 30-minute discovery call. We learn what you're building, scope the work, and give you a clear plan with timeline and cost before anything starts.",
    },
  ],
};
