import { ClipboardList, Database, KeyRound, Phone, Plug, Rocket, Repeat, TrendingUp, Workflow, type LucideIcon } from "lucide-react";
import type { MaybeLocalized } from "./l10n";

// Landing-page structure for the service pages. Every string is empty until the
// copy is written; the template shows a [placeholder] for anything empty.
// `key` matches the nav.serviceItems translation used for the page title.
export type ServiceKey =
  | "customLms"
  | "lti"
  | "moodle"
  | "canvas"
  | "moodlePlugin"
  | "canvasPlugin"
  | "ltiMigration"
  | "woocommerceMoodle";

export type ServiceLanding = {
  slug: string;
  key: ServiceKey;
  metaTitle: MaybeLocalized<string>; // [Service] Company | Rizon
  metaDescription: MaybeLocalized<string>; // benefit + "Book a free 30-min call"
  h1: MaybeLocalized<string>; // < 11 words
  subhead: MaybeLocalized<string>; // one sentence, ownership/benefit first
  trustLine: MaybeLocalized<string>; // "Trusted by ... , X, Y, and more."
  heroAlt: MaybeLocalized<string>;
  heroTags?: string[]; // pills under the trust line
  heroStats?: {
    before?: string;
    highlight: string;
    after?: string;
    label: MaybeLocalized<string>;
  }[]; // cards over the hero image
  problem: { h2: MaybeLocalized<string>; body: MaybeLocalized<string> };
  agitate: { h2: MaybeLocalized<string>; body: MaybeLocalized<string> };
  solution: {
    h2: MaybeLocalized<string>;
    body: MaybeLocalized<string>;
    features: {
      feature: MaybeLocalized<string>;
      benefit: MaybeLocalized<string>;
      icon?: LucideIcon;
      link?: { text: string; href: string }; // text must appear in benefit
    }[]; // 5
  };
  howWeWork: {
    h2: MaybeLocalized<string>; // "How we [build/migrate/etc.]"
    steps: { title: MaybeLocalized<string>; body: MaybeLocalized<string>; icon: LucideIcon }[];
  };
  cost: {
    h2: MaybeLocalized<string>; // "How much does [service] cost?"
    answer: MaybeLocalized<string>; // 40-60 words
    support: MaybeLocalized<string>;
  };
  proof: { h2: MaybeLocalized<string>; cases: { slug: string; href: string }[] };
  faqs: { question: MaybeLocalized<string>; answer: MaybeLocalized<string> }[]; // 4-6
  faqH2: MaybeLocalized<string>;
  finalCta: { h2: MaybeLocalized<string>; line: MaybeLocalized<string> };
};

const landing = (slug: string, key: ServiceKey): ServiceLanding => ({
  slug,
  key,
  metaTitle: "",
  metaDescription: "",
  h1: "",
  subhead: "",
  trustLine: "",
  heroAlt: "",
  problem: { h2: "", body: "" },
  agitate: { h2: "", body: "" },
  solution: {
    h2: "",
    body: "",
    features: Array.from({ length: 5 }, () => ({ feature: "", benefit: "" })),
  },
  howWeWork: { h2: "", steps: [] },
  cost: { h2: "", answer: "", support: "" },
  proof: { h2: "", cases: [] },
  faqs: [],
  faqH2: "",
  finalCta: { h2: "", line: "" },
});

const customLms: ServiceLanding = {
  ...landing("custom-lms-development", "customLms"),
  metaTitle: "Custom LMS Development Company | Rizon",
  metaDescription:
    "Custom LMS development for education and training providers. We build learning platforms you fully own, with no license fees and no limits. Book a free 30-min call.",
  h1: "Custom LMS Development",
  subhead:
    "We build learning management systems around how you actually teach. You own the code and the data, and you set the roadmap. No license fees, no feature limits, and no vendor holding your platform hostage.",
  trustLine:
    "Trusted by education platforms and training providers, including Choice Learning, Cloud SDS, and LaunchLife.",
  heroAlt: "Learners working at computers in a library",
  heroTags: [
    "Custom e-learning platforms",
    "School & university portals",
    "Corporate training",
    "Platform upgrades",
  ],
  heroStats: [
    { highlight: "0", after: "%", label: "Platform fees. You keep every dollar you earn." },
    { highlight: "100", after: "%", label: "Code ownership. The platform is yours to keep." },
    { before: "Day ", highlight: "1", label: "Your platform goes live and stays live" },
  ],
  problem: {
    h2: "Off-the-shelf LMS platforms make you fit the software.",
    body: "You picked an LMS and now you're working around it. The features you need aren't there; the ones you're paying for, you never touch. Every learner costs more as you scale. Your data lives on someone else's server, under someone else's rules. And when you need one specific thing changed, you file a support ticket and wait.",
  },
  agitate: {
    h2: "Renting your platform has a cost beyond the bill.",
    body: "Per-seat pricing punishes you for growing: the more successful your program, the bigger your bill. You can't ship the feature your learners are asking for, because it's not on the vendor's roadmap. If they raise prices or sunset a feature, your entire program moves at their command. If they shut down, you're stuck.",
  },
  solution: {
    h2: "A learning platform built around your program and owned by you.",
    body: "We design and build your LMS from the ground up, shaped to how you teach and how your learners actually use it. You get exactly the features you need and none of the bloat. When it launches, it's yours: the full codebase and the data, and you decide the roadmap. There are no per-seat fees and you need no permission to change something. It grows as you grow.",
    features: [
      { icon: KeyRound, feature: "You own the entire codebase", benefit: "No license and no monthly platform fee, so nothing locks you in." },
      { icon: Workflow, feature: "Built to your workflow", benefit: "Course structure, enrollment, assessments, and reporting are shaped around your program, not a template." },
      {
        icon: Plug, feature: "Integrates with your stack",
        benefit: "Payments (Stripe, PayPal), video (Zoom, Meet), SSO, your CRM, and any LTI tool.",
        link: { text: "any LTI tool", href: "/services/lti-development" },
      },
      { icon: TrendingUp, feature: "Scales without penalty", benefit: "Add 100 learners or 100,000; your costs don't jump per seat." },
      { icon: Database, feature: "Your data stays yours", benefit: "Hosted where you choose, exportable anytime." },
    ],
  },
  howWeWork: {
    h2: "How we build your platform",
    steps: [
      { icon: Phone, title: "Discovery call", body: "A free 30-minute call to understand your program, your learners, and what's not working today." },
      { icon: ClipboardList, title: "Scope & plan", body: "A clear plan: what we build, the timeline, and the cost. Fixed and upfront, before any work starts." },
      { icon: Repeat, title: "Build in weekly sprints", body: "You get a working build every week to click through, so you see real progress instead of month-long silences." },
      { icon: Rocket, title: "Launch & handover", body: "We ship to production, make sure it works, and hand over the full codebase. We stay available for what's next." },
    ],
  },
  cost: {
    h2: "How much does custom LMS development cost?",
    answer:
      "Custom LMS development typically ranges from a few thousand dollars for a focused build to six figures for a large, feature-rich platform. The cost depends on the features, integrations, and data migration involved. At Rizon, we scope every project during a free discovery call and give you a fixed price before any work begins, so there are no surprises.",
    support:
      "What moves the price: the number of user roles and dashboards, custom assessment types, integrations (payments, video, SSO, CRM), whether you're migrating data from an existing system, and how much custom design you want. A plugin or single integration sits at the low end; a full multi-role platform with analytics and live classes sits higher. You'll know your exact number before you commit.",
  },
  proof: {
    h2: "Platforms we've built",
    cases: [
      { slug: "kaiser-math-platform", href: "/case-studies/kaiser-math-platform" },
      { slug: "ai-literacy-lxp", href: "/case-studies/ai-literacy-lxp" },
    ],
  },
  faqH2: "Custom LMS development, answered",
  faqs: [
    {
      question: "What is custom LMS development?",
      answer:
        "Custom LMS development is building a learning management system from scratch, tailored to your specific programs, workflows, and learners. You don't adapt your teaching to fit an off-the-shelf platform. You own the finished software, including the code and data.",
    },
    {
      question: "How long does it take to build a custom LMS?",
      answer:
        "A focused build can take a few weeks; a full-featured platform runs a few months. Timeline depends on features, integrations, and whether you're migrating existing data. We give you a firm schedule during scoping, before work starts.",
    },
    {
      question: "Do I own the code?",
      answer:
        "Yes. When we finish, the entire codebase is yours, with no license and no ongoing platform fee. You can host it where you want and change anything you like.",
    },
    {
      question: "Can you integrate with tools we already use?",
      answer:
        "Yes. We integrate payments (Stripe, PayPal), video conferencing (Zoom, Google Meet), SSO, your CRM, and any standards-compliant LTI tool.",
    },
    {
      question: "Custom LMS vs. off-the-shelf: which is right for us?",
      answer:
        "Off-the-shelf works if a standard platform fits your program and you don't mind per-seat fees. Custom makes sense when you've outgrown the limits, need specific features, want to stop paying per learner, or need to own your data and platform outright.",
    },
  ],
  finalCta: {
    h2: "Let's build a platform that fits.",
    line: "Tell us what you're working on. In 30 minutes, we'll tell you how we'd approach it. No pitch, no obligation.",
  },
};

export const blankServices: ServiceLanding[] = [
  customLms,
  landing("lti-development", "lti"),
  landing("moodle-development", "moodle"),
  landing("canvas-development", "canvas"),
  landing("moodle-plugin-development", "moodlePlugin"),
  landing("canvas-plugin-development", "canvasPlugin"),
  landing("lti-1-1-to-1-3-migration", "ltiMigration"),
  landing("woocommerce-to-moodle", "woocommerceMoodle"),
];

export const getBlankService = (slug: string) =>
  blankServices.find((s) => s.slug === slug);
