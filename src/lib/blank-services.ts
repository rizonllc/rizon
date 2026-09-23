import { BadgeCheck, Blocks, Code, Palette, RefreshCw, Wrench, ClipboardList, Database, GraduationCap, Link2, LogIn, ShieldCheck, KeyRound, Phone, Plug, Rocket, Repeat, TrendingUp, Workflow, type LucideIcon } from "lucide-react";

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
  title?: string; // breadcrumb + serviceType; falls back to nav.serviceItems title
  metaTitle: string; // [Service] Company | Rizon
  metaDescription: string; // benefit + "Book a free 30-min call"
  h1: string; // < 11 words
  subhead: string; // one sentence, ownership/benefit first
  trustLine: string; // "Trusted by ... , X, Y, and more."
  heroAlt: string;
  heroTags?: string[]; // pills under the trust line
  heroStats?: {
    before?: string;
    highlight: string;
    after?: string;
    label: string;
  }[]; // cards over the hero image
  problem: { h2: string; body: string };
  agitate: { h2: string; body: string };
  solution: {
    h2: string;
    body: string;
    features: {
      feature: string;
      benefit: string;
      icon?: LucideIcon;
      titleHref?: string; // makes the feature title a link
      links?: { text: string; href: string }[]; // texts must appear in benefit, in order
    }[]; // 5
  };
  howWeWork: {
    h2: string; // "How we [build/migrate/etc.]"
    steps: { title: string; body: string; icon: LucideIcon }[];
  };
  cost: {
    h2: string; // "How much does [service] cost?"
    answer: string; // 40-60 words
    support: string;
  };
  proof: { h2: string }; // cards come from lib/case-study-links by service slug
  faqs: {
    question: string;
    answer: string;
    link?: { text: string; href: string }; // text must appear in answer
  }[]; // 4-6
  faqH2: string;
  finalCta: { h2: string; line: string };
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
  proof: { h2: "" },
  faqs: [],
  faqH2: "",
  finalCta: { h2: "", line: "" },
});

const customLms: ServiceLanding = {
  ...landing("custom-lms-development", "customLms"),
  metaTitle: "Custom LMS Development Company | Rizon",
  // TODO: metaDescription is 164 chars (>155) — shorten, e.g.: "Custom LMS development for education and training providers. We build platforms you fully own, with no license fees or limits."
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
      { icon: Workflow, feature: "Built to your workflow", benefit: "Course structure, enrollment, assessments, and reporting are shaped around your program." },
      {
        icon: Plug, feature: "Integrates with your stack",
        benefit: "Payments (Stripe, PayPal), video (Zoom, Meet), SSO, your CRM, and any LTI tool.",
        links: [{ text: "any LTI tool", href: "/services/lti-development" }],
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
  proof: { h2: "Platforms we've built" },
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

const lti: ServiceLanding = {
  ...landing("lti-development", "lti"),
  title: "LTI Integration & Development",
  metaTitle: "LTI Integration & Development Services | Rizon",
  // TODO: metaDescription is 178 chars (>155) — shorten, e.g.: "LTI integration and development for tools and LMS platforms. We build LTI 1.3 integrations that connect cleanly to Canvas and Moodle."
  metaDescription:
    "LTI integration and development for tools and LMS platforms. We build LTI 1.3 integrations that connect cleanly to Canvas, Moodle, and any compliant LMS. Book a free 30-min call.",
  h1: "LTI Integration & Development",
  subhead:
    "We build LTI (Learning Tools Interoperability) integrations that connect your tool to any learning platform and keep working. Standards-compliant LTI 1.3, built to launch inside Canvas, Moodle, Brightspace, or any compliant LMS without the guesswork.",
  trustLine: customLms.trustLine,
  heroAlt: customLms.heroAlt,
  problem: {
    h2: "Your tool has to work inside someone else's LMS.",
    body: "You've built something good: a quiz engine, a content library, a proctoring tool, an analytics dashboard. But your customers live inside Canvas, Moodle, or Brightspace, and they expect your tool to appear right there, log them in automatically, and pass grades back. Get the LTI layer wrong and your tool feels broken, no matter how good the product behind it is.",
  },
  agitate: {
    h2: "A broken integration is the first thing your customer sees.",
    body: "If single sign-on fails or grades don't sync, your buyer never reaches the product you actually built. Every institution runs a slightly different LMS setup, so \"it worked in testing\" isn't enough. And LTI 1.1 is deprecated, so tools still on it are running on borrowed time, one platform update away from breaking. Meanwhile your sales team is stuck answering \"does it integrate?\" instead of closing.",
  },
  solution: {
    h2: "LTI integrations that connect once and keep working.",
    body: "We build the LTI layer so your tool launches cleanly inside any compliant LMS: proper LTI 1.3 with LTI Advantage, deep linking, automatic sign-on, and grade passback that actually syncs. We test against the real platforms your customers use, so it holds up in production.",
    features: [
      { icon: ShieldCheck, feature: "LTI 1.3 + LTI Advantage", benefit: "The current standard, built right: secure launch, names and roles, assignment and grade services." },
      {
        icon: Blocks,
        feature: "Works across platforms",
        benefit: "Tested against Canvas, Moodle, Brightspace, and any IMS-certified LMS.",
        links: [
          { text: "Canvas", href: "/services/canvas-development" },
          { text: "Moodle", href: "/services/moodle-development" },
        ],
      },
      { icon: LogIn, feature: "Single sign-on that just works", benefit: "Learners launch your tool from their LMS with no second login." },
      { icon: GraduationCap, feature: "Grade passback that syncs", benefit: "Scores flow back to the gradebook automatically, correctly, every time." },
      { icon: Link2, feature: "Deep linking", benefit: "Instructors embed specific content from your tool directly into their courses." },
    ],
  },
  howWeWork: {
    h2: "How we build your integration",
    steps: [
      { icon: Phone, title: "Discovery call", body: "A free 30-minute call to understand your tool, your target platforms, and where the integration stands today." },
      { icon: ClipboardList, title: "Scope & plan", body: "A clear plan: what we build, which LMS platforms we test against, the timeline, and the cost. Fixed and upfront." },
      { icon: Repeat, title: "Build & test in sprints", body: "You get working builds to test, validated against the real LMS platforms your customers use." },
      { icon: Rocket, title: "Launch & handover", body: "We ship it, confirm it works in production, and hand over the full integration. We stay available for platform changes." },
    ],
  },
  cost: {
    h2: "How much does an LTI integration cost?",
    answer:
      "An LTI integration typically costs from a few thousand dollars for a standard LTI 1.3 connection to more for multi-platform support, grade passback, and deep linking. The price depends on how many LMS platforms you need to support and which LTI Advantage services you use. At Rizon, we scope it during a free discovery call and give you a fixed price before any work starts.",
    support:
      "What moves the price: the number of target platforms (one LMS versus many), which LTI Advantage services you need (sign-on only, or grades and deep linking too), whether you're building a new tool or fixing an existing integration, and whether you're migrating from LTI 1.1. A single-platform sign-on sits at the low end; full multi-platform LTI Advantage sits higher.",
  },
  proof: { h2: "Integrations we've built" },
  faqH2: "LTI integration, answered",
  faqs: [
    {
      question: "What is an LTI integration?",
      answer:
        "LTI (Learning Tools Interoperability) is a standard that lets an external tool work inside a learning platform. An LTI integration connects your tool to an LMS like Canvas or Moodle, so learners launch it without a second login and grades flow back to the gradebook automatically.",
    },
    {
      question: "What's the difference between LTI 1.1 and LTI 1.3?",
      answer:
        "LTI 1.3 is the current standard; LTI 1.1 is deprecated. 1.3 adds proper security, plus LTI Advantage services like names and roles, grade passback, and deep linking. Tools still on 1.1 should migrate, because they risk breaking as platforms drop support.",
    },
    {
      question: "Which LMS platforms do you integrate with?",
      answer:
        "Any IMS-certified, LTI-compliant LMS, including Canvas, Moodle, Brightspace, and Blackboard. We test against the specific platforms your customers actually use.",
    },
    {
      question: "Can you fix an LTI integration that keeps breaking?",
      answer:
        "Yes. A lot of our LTI work is fixing integrations that fail intermittently: broken sign-on, grades that don't sync, or launches that work on one platform but not another. We find the root cause and make it reliable.",
    },
    {
      question: "Do you handle LTI 1.1 to 1.3 migration?",
      answer:
        "Yes. We migrate tools from deprecated LTI 1.1 to LTI 1.3 without breaking existing connections.",
      link: {
        text: "migrate tools from deprecated LTI 1.1 to LTI 1.3",
        href: "/services/lti-1-1-to-1-3-migration",
      },
    },
  ],
  finalCta: {
    h2: "Let's make your tool work everywhere.",
    line: "Tell us about your tool and where it needs to run. In 30 minutes, we'll tell you how we'd approach the integration. No pitch, no obligation.",
  },
};

const moodle: ServiceLanding = {
  ...landing("moodle-development", "moodle"),
  metaTitle: "Moodle Development Services | Rizon",
  // TODO: metaDescription is 189 chars (>155) — shorten, e.g.: "Moodle development, customization, and integration for training providers and institutions. Custom plugins, themes, and builds."
  metaDescription:
    "Moodle development, customization, and integration for training providers and institutions. Custom plugins, themes, and builds from a team that knows Moodle deeply. Book a free 30-min call.",
  h1: "Moodle Development",
  subhead:
    "We build, customize, and integrate Moodle so it works the way your program actually runs: custom plugins, themes, integrations, and fixes from a team that knows the platform inside out. You keep the open-source freedom, and we make it fit.",
  trustLine: customLms.trustLine,
  heroAlt: customLms.heroAlt,
  problem: {
    h2: "Moodle can do almost anything, which is exactly the problem.",
    body: "Moodle is powerful and free, but out of the box it rarely matches how you actually teach. The feature you need lives in a plugin that's half-maintained, or doesn't exist. The interface confuses your learners. It won't talk to your other tools. And every time you try to change something, you're one wrong setting away from breaking the whole site.",
  },
  agitate: {
    h2: "A half-configured Moodle costs you more than a clean build.",
    body: "Learners drop off when the platform is confusing. Instructors waste hours on workarounds. Unmaintained plugins turn into security holes and break on every upgrade. And the \"free\" platform quietly eats your team's time: someone is always firefighting instead of teaching. The longer it drifts, the harder and more expensive it gets to untangle.",
  },
  solution: {
    h2: "Moodle, shaped around your program and built to last.",
    body: "We make Moodle do what you need: custom plugins, a theme your learners find intuitive, integrations with the tools you already use, and clean upgrades that don't break. You keep everything good about open-source Moodle (no license fees, and full control of your data), without the maintenance headaches and dead-end plugins.",
    features: [
      {
        icon: Code,
        feature: "Custom plugin development",
        titleHref: "/services/moodle-plugin-development",
        benefit: "The exact functionality you need, built and maintained properly.",
      },
      { icon: Palette, feature: "Themes built for your learners", benefit: "An on-brand interface people can actually navigate, on any device." },
      {
        icon: Plug,
        feature: "Integrations with your stack",
        benefit: "Payments, video, SSO, your CRM, and any LTI tool wired into Moodle.",
        links: [{ text: "any LTI tool", href: "/services/lti-development" }],
      },
      { icon: RefreshCw, feature: "Safe upgrades & migrations", benefit: "Move to the current Moodle version without losing courses, users, or data." },
      { icon: Wrench, feature: "Ongoing maintenance", benefit: "Someone who knows your setup, so you're not firefighting alone." },
    ],
  },
  howWeWork: {
    h2: "How we build on Moodle",
    steps: [
      { icon: Phone, title: "Discovery call", body: "A free 30-minute call to understand your Moodle setup, your learners, and what's not working today." },
      { icon: ClipboardList, title: "Scope & plan", body: "A clear plan: what we build or fix, the timeline, and the cost. Fixed and upfront, before any work starts." },
      { icon: Repeat, title: "Build in weekly sprints", body: "You get working changes to click through every week, so you see real progress instead of month-long silences." },
      { icon: Rocket, title: "Launch & handover", body: "We ship to your Moodle, make sure it works, and document what we did. We stay available for what's next." },
    ],
  },
  cost: {
    h2: "How much does Moodle development cost?",
    answer:
      "Moodle itself is free and open-source. What costs money is hosting, customization, and development. A single plugin or theme tweak can cost a few hundred to a few thousand dollars; a fully customized and integrated Moodle build runs higher. At Rizon, we scope your project during a free discovery call and give you a fixed price before any work begins.",
    support:
      "What moves the price: whether you need a one-off plugin or ongoing development, how much custom design the theme involves, the number of integrations (payments, video, SSO, CRM, LTI tools), and whether you're upgrading or migrating an existing site. A focused fix sits at the low end; a full custom build with integrations sits higher.",
  },
  proof: { h2: "Moodle work we've done" },
  faqH2: "Moodle development, answered",
  faqs: [
    {
      question: "Is Moodle free?",
      answer:
        "Moodle is free, open-source software, with no license fee. What costs money is hosting it, customizing it, building plugins or themes, and integrating it with your other tools. You own and control everything, which is the main reason organizations choose Moodle over closed platforms.",
    },
    {
      question: "Can you build a custom Moodle plugin?",
      answer:
        "Yes. We build custom Moodle plugins that add exactly the functionality your site is missing, properly built and maintained so they don't break on the next upgrade. This is safer and more reliable than depending on an unmaintained plugin from the directory.",
    },
    {
      question: "Can you customize how Moodle looks?",
      answer:
        "Yes. We build custom Moodle themes that are on-brand and easy for your learners to navigate on any device, instead of the default interface that often confuses people and drives drop-off.",
    },
    {
      question: "Can you integrate Moodle with our other tools?",
      answer:
        "Yes. We integrate Moodle with payments (Stripe, PayPal), video (Zoom, Google Meet), SSO, your CRM, and any LTI-compliant tool, including turning course purchases into automatic enrollments.",
    },
    {
      question: "Can you upgrade or migrate our existing Moodle site?",
      answer:
        "Yes. We handle Moodle version upgrades and migrations without losing your courses, users, or data, including moves from another platform onto Moodle, or off Moodle onto something else.",
    },
  ],
  finalCta: {
    h2: "Let's make Moodle work for you.",
    line: "Tell us about your Moodle setup and what's not working. In 30 minutes, we'll tell you how we'd approach it. No pitch, no obligation.",
  },
};

const canvas: ServiceLanding = {
  ...landing("canvas-development", "canvas"),
  title: "Canvas LMS Development",
  metaTitle: "Canvas LMS Development & Integration Services | Rizon",
  // TODO: metaDescription is 185 chars (>155) — shorten, e.g.: "Canvas LMS development, LTI integrations, and custom apps built on the Canvas API, for institutions and EdTech companies."
  metaDescription:
    "Canvas LMS development, LTI integrations, and custom apps built on the Canvas API. We build tools that work inside Canvas for institutions and EdTech companies. Book a free 30-min call.",
  h1: "Canvas LMS Development",
  subhead:
    "We build custom apps, LTI integrations, and API tools for Canvas LMS, so your tool works inside Canvas the way instructors and learners expect. Standards-compliant, tested against real Canvas instances, built to keep working through Instructure's updates.",
  trustLine: customLms.trustLine,
  heroAlt: customLms.heroAlt,
  problem: {
    h2: "Building on Canvas is harder than it looks.",
    body: "Canvas is the LMS your customers or campus already use, so your tool has to live inside it: launched from a course, logged in automatically, passing grades back. But the Canvas API is deep, LTI setup is unforgiving, and every institution's Canvas is configured a little differently. What works in one instance quietly fails in another.",
  },
  agitate: {
    h2: "A Canvas integration that half-works reflects on you, not Canvas.",
    body: "When your tool won't launch from a Canvas course, or grades don't post to the gradebook, the instructor blames your product, not their LMS admin. Every failed launch is a support ticket and a shaky renewal. And Canvas ships updates on its own schedule; an integration that isn't built to standard breaks the day Instructure changes something. Guesswork here costs you customers.",
  },
  solution: {
    h2: "Canvas tools built to standard, tested in the real thing.",
    body: "We build on Canvas properly: LTI 1.3 integrations, custom LTI apps, and tools on the Canvas LMS API. We test against real Canvas instances and check what the documentation leaves out. Your tool launches cleanly from a course, signs learners in automatically, and posts grades back reliably, across the different Canvas setups your customers run.",
    features: [
      {
        icon: Link2,
        feature: "LTI 1.3 integrations for Canvas",
        titleHref: "/services/lti-development",
        benefit: "Your tool launches inside any Canvas course, with secure sign-on and grade passback.",
      },
      { icon: Blocks, feature: "Custom Canvas apps", benefit: "Build the exact tool your program needs, embedded where instructors and learners already work." },
      { icon: Code, feature: "Canvas API development", benefit: "Automate enrollments, sync data, and connect Canvas to your other systems through the API." },
      { icon: GraduationCap, feature: "Grade passback that syncs", benefit: "Scores post to the Canvas gradebook automatically, correctly, every time." },
      { icon: BadgeCheck, feature: "Tested across instances", benefit: "Validated against real Canvas configurations, so it holds up in production." },
    ],
  },
  howWeWork: {
    h2: "How we build on Canvas",
    steps: [
      { icon: Phone, title: "Discovery call", body: "A free 30-minute call to understand your tool, your Canvas targets, and where things stand today." },
      { icon: ClipboardList, title: "Scope & plan", body: "A clear plan: what we build, which Canvas setups we test against, the timeline, and the cost. Fixed and upfront." },
      { icon: Repeat, title: "Build & test in sprints", body: "You get working builds to test, validated against real Canvas instances your customers use." },
      { icon: Rocket, title: "Launch & handover", body: "We ship it, confirm it works in production, and hand over the full build. We stay available for Canvas updates." },
    ],
  },
  cost: {
    h2: "How much does Canvas LMS development cost?",
    answer:
      "Canvas development costs vary with what you're building: a single LTI integration starts at a few thousand dollars, while a custom Canvas app or full API integration runs higher. The price depends on the Canvas services you need (sign-on, grade passback, deep linking, API automation) and how many Canvas setups you support. At Rizon, we scope it during a free discovery call and give you a fixed price before any work starts.",
    support:
      "What moves the price: whether you need a standard LTI launch or a full custom app, how much Canvas API work is involved (enrollment automation, data sync), which LTI Advantage services you use, and whether you're fixing an existing integration or building new. A single-instance LTI launch sits at the low end; a multi-instance app with API automation sits higher.",
  },
  proof: { h2: "Canvas work we've done" },
  faqH2: "Canvas LMS development, answered",
  faqs: [
    {
      question: "Can you build an LTI integration for Canvas?",
      answer:
        "Yes. We build LTI 1.3 integrations that let your tool launch inside any Canvas course, sign learners in automatically, and pass grades back to the Canvas gradebook, tested against real Canvas instances.",
    },
    {
      question: "Can you build a custom app for Canvas?",
      answer:
        "Yes. We build custom Canvas apps and LTI tools embedded directly where instructors and learners work, so your functionality lives inside the Canvas courses they already use every day.",
    },
    {
      question: "What can you do with the Canvas LMS API?",
      answer:
        "The Canvas API lets us automate enrollments, sync data between Canvas and your other systems, pull reporting, and connect Canvas into your wider stack. That work isn't possible through the standard interface alone.",
    },
    {
      question: "Will the integration keep working after Canvas updates?",
      answer:
        "Built to the LTI and API standards, yes. Integrations that cut corners break when Instructure ships updates; we build to standard and stay available to handle platform changes so your tool keeps working.",
    },
    {
      question: "Do you work with both Canvas and Moodle?",
      answer:
        "Yes. We build LTI integrations and custom development for Canvas, Moodle, and any compliant LMS. That's useful if your tool needs to run across multiple platforms.",
      link: { text: "Moodle", href: "/services/moodle-development" },
    },
  ],
  finalCta: {
    h2: "Let's make your tool work inside Canvas.",
    line: "Tell us about your tool and how it needs to run in Canvas. In 30 minutes, we'll tell you how we'd approach it. No pitch, no obligation.",
  },
};

const moodlePlugin: ServiceLanding = {
  ...landing("moodle-plugin-development", "moodlePlugin"),
  title: "Custom Moodle Plugin Development",
  metaTitle: "Custom Moodle Plugin Development | Rizon",
  // TODO: metaDescription is 191 chars (>155) — shorten, e.g.: "Custom Moodle plugin development: we build and maintain plugins that add exactly the functionality your Moodle site needs."
  metaDescription:
    "Custom Moodle plugin development: we build and maintain plugins that add exactly the functionality your Moodle site needs, without the risk of unmaintained downloads. Book a free 30-min call.",
  h1: "Custom Moodle Plugin Development",
  subhead:
    "We build custom Moodle plugins that add exactly the functionality your site is missing: properly built, properly maintained, and safe to carry through every upgrade. No more depending on an abandoned download from the directory.",
  trustLine: customLms.trustLine,
  heroAlt: customLms.heroAlt,
  problem: {
    h2: "The plugin you need is either abandoned, half-right, or doesn't exist.",
    body: "Moodle's plugin directory is huge, but when you need one specific thing, you hit a wall: the plugin that does it hasn't been updated in three years, or it does 80% of what you want and can't be changed, or nobody has built it at all. So you either compromise on how you run your program, or you install something risky and hope it holds.",
  },
  agitate: {
    h2: "A bad plugin is a liability bolted to your live site.",
    body: "An unmaintained plugin is a security hole and an upgrade blocker: it breaks the day you update Moodle, and now you're stuck on an old version. A plugin you can't modify forces your workflow to bend around its limits. And when it fails, there's no one to call. \"Free\" turns expensive fast when your whole site depends on code nobody owns.",
  },
  solution: {
    h2: "A plugin built for your site and maintained so it lasts.",
    body: "We build custom Moodle plugins to do exactly what you need, written to Moodle's standards so they install cleanly and survive upgrades. You get the precise functionality your program requires, code that's documented and yours, and someone who actually maintains it, instead of a directory download you're quietly hoping never breaks.",
    features: [
      { icon: Blocks, feature: "Built to your exact requirement", benefit: "The specific feature your program needs, built for you." },
      { icon: ShieldCheck, feature: "Written to Moodle standards", benefit: "Installs cleanly and survives version upgrades, no broken sites." },
      { icon: Code, feature: "Documented and owned by you", benefit: "The code is yours and readable." },
      { icon: Wrench, feature: "Maintained and supported", benefit: "Someone who knows your plugin, so a Moodle update never leaves you stranded." },
      {
        icon: Plug,
        feature: "Integrates with the rest of your stack",
        benefit: "Plugins that work with your payments, SSO, LTI tools, and reporting.",
        links: [{ text: "LTI tools", href: "/services/lti-development" }],
      },
    ],
  },
  howWeWork: {
    h2: "How we build your plugin",
    steps: [
      { icon: Phone, title: "Discovery call", body: "A free 30-minute call to understand what the plugin needs to do and how your Moodle is set up." },
      { icon: ClipboardList, title: "Scope & plan", body: "A clear plan: what the plugin does, the timeline, and the cost. Fixed and upfront, before any work starts." },
      { icon: Repeat, title: "Build & test in sprints", body: "You get a working plugin to test on your setup, refined until it does exactly what you need." },
      { icon: Rocket, title: "Launch & handover", body: "We install it, confirm it works, and hand over documented code. We stay available for upgrades and changes." },
    ],
  },
  cost: {
    h2: "How much does custom Moodle plugin development cost?",
    answer:
      "A custom Moodle plugin typically costs from a few hundred dollars for a small, focused feature to several thousand for a complex plugin with integrations and custom interfaces. The price depends on what the plugin does, how it connects to other systems, and whether it needs ongoing maintenance. At Rizon, we scope it during a free discovery call and give you a fixed price before any work begins.",
    support:
      "What moves the price: the complexity of the feature, whether it integrates with payments, SSO, or external tools, how much custom interface it needs, and whether you want ongoing maintenance and support. A simple single-purpose plugin sits at the low end; a complex integrated one sits higher.",
  },
  proof: { h2: "Moodle work we've done" },
  faqH2: "Custom Moodle plugin development, answered",
  faqs: [
    {
      question: "Should I use an existing Moodle plugin or build a custom one?",
      answer:
        "Use an existing plugin if a well-maintained one does what you need. Build custom when the plugin doesn't exist, hasn't been updated, only does part of the job, or can't be changed to fit your workflow. Custom code is yours, maintained, and safe through upgrades.",
    },
    {
      question: "Will a custom plugin break when I upgrade Moodle?",
      answer:
        "Not if it's built right. We write plugins to Moodle's development standards so they install cleanly and carry through version upgrades, and we stay available to update them when Moodle ships major changes. Unmaintained directory plugins are the ones that break.",
    },
    {
      question: "Do I own the plugin code?",
      answer:
        "Yes. The plugin is built for you and the code is yours: documented and readable. You can host it, change it, or hand it to another developer at any time.",
    },
    {
      question: "Can a custom plugin integrate with our other tools?",
      answer:
        "Yes. We build plugins that connect Moodle to payments, SSO, your CRM, LTI tools, and other systems, so the functionality fits into your wider stack instead of sitting isolated.",
      link: { text: "LTI tools", href: "/services/lti-development" },
    },
    {
      question: "Can you fix or take over an existing plugin?",
      answer:
        "Yes. If you have a plugin that's breaking, unmaintained, or nearly right, we can debug it, update it for a current Moodle version, or extend it to do what you need.",
    },
  ],
  finalCta: {
    h2: "Let's build the plugin you actually need.",
    line: "Tell us what the plugin has to do. In 30 minutes, we'll tell you how we'd approach it. No pitch, no obligation.",
  },
};

const canvasPlugin: ServiceLanding = {
  ...landing("canvas-plugin-development", "canvasPlugin"),
  title: "Canvas Plugin Development",
  // TODO: metaTitle is 65 chars (>60) — shorten, e.g.: "Canvas Plugin Development: Custom Apps & Tools | Rizon"
  metaTitle: "Canvas Plugin Development: Custom Canvas LMS Apps & Tools | Rizon",
  // TODO: metaDescription is 171 chars (>155) — shorten, e.g.: "Canvas doesn't use plugins like Moodle. It extends through LTI apps and the API. We build custom Canvas LMS tools instead."
  metaDescription:
    "Canvas doesn't use plugins like Moodle. It extends through LTI apps and the API. We build custom Canvas LMS tools that do what a \"plugin\" would. Book a free 30-min call.",
  h1: "Canvas Plugin Development",
  subhead:
    "Canvas LMS doesn't use plugins the way Moodle or WordPress do: it extends through LTI apps and the Canvas API. We build the custom tools that do exactly what a \"Canvas plugin\" would: added functionality, embedded right inside Canvas.",
  trustLine: customLms.trustLine,
  heroAlt: customLms.heroAlt,
  problem: {
    h2: "You want to add functionality to Canvas, but there's no plugin for it.",
    body: "You've used platforms where you just install a plugin to add a feature. Canvas doesn't work that way. There's no plugin directory to drop something into, so when you need Canvas to do something it doesn't do out of the box, it's not obvious how to get there, or who can build it.",
  },
  agitate: {
    h2: "Trying to force a \"plugin\" onto Canvas wastes time and breaks later.",
    body: "Because Canvas has no plugin system, people improvise: fragile scripts, browser hacks, or workarounds bolted on the side. They break on the next Canvas update, only work for some users, and can't pass data back to the gradebook. You spend effort on something that was never going to hold, when the platform already has a proper way to be extended.",
  },
  solution: {
    h2: "The right way to extend Canvas: LTI apps and API tools.",
    body: "Canvas is built to be extended through LTI and its API, and that's exactly what we build. Whatever you were hoping a \"plugin\" would do, we deliver it as a proper Canvas LTI app or API integration: added features embedded inside Canvas courses, secure sign-on, grade passback, and data flowing between Canvas and your systems, built to standard so it survives updates.",
    features: [
      {
        icon: Blocks,
        feature: "Custom LTI apps for Canvas",
        titleHref: "/services/lti-development",
        benefit: "The functionality you wanted from a plugin, embedded inside Canvas courses.",
      },
      { icon: Code, feature: "Canvas API integrations", benefit: "Automate enrollments, sync data, and connect Canvas to your other tools." },
      { icon: GraduationCap, feature: "Grade passback", benefit: "Anything that assesses learners posts scores straight to the Canvas gradebook." },
      { icon: ShieldCheck, feature: "Built to standard", benefit: "LTI 1.3 and API work that keeps working through Instructure's updates." },
      {
        icon: BadgeCheck,
        feature: "Full Canvas development",
        titleHref: "/services/canvas-development",
        benefit: "If you need more than a single tool, we do broader Canvas builds too.",
      },
    ],
  },
  howWeWork: {
    h2: "How we build your Canvas tool",
    steps: [
      { icon: Phone, title: "Discovery call", body: "A free 30-minute call to understand what you need Canvas to do and how your Canvas is set up." },
      { icon: ClipboardList, title: "Scope & plan", body: "A clear plan: what we build, how it embeds in Canvas, the timeline, and the cost. Fixed and upfront." },
      { icon: Repeat, title: "Build & test in sprints", body: "You get a working tool to test, validated against real Canvas instances." },
      { icon: Rocket, title: "Launch & handover", body: "We install it, confirm it works in production, and hand over documented code. We stay available for Canvas updates." },
    ],
  },
  cost: {
    h2: "How much does a custom Canvas tool cost?",
    answer:
      "A custom Canvas tool, whether an LTI app or an API integration, typically costs from a few thousand dollars for a focused feature to more for complex functionality with grade passback and data sync. The price depends on what the tool does and how deeply it integrates with Canvas. At Rizon, we scope it during a free discovery call and give you a fixed price before any work begins.",
    support:
      "What moves the price: whether you need a simple embedded tool or a full LTI app with grade passback, how much Canvas API work is involved (enrollment automation, data sync), and how many Canvas setups you support. A single focused tool sits at the low end; a full app with API integration sits higher.",
  },
  proof: { h2: "Canvas work we've done" },
  faqH2: "Canvas plugin development, answered",
  faqs: [
    {
      question: "Does Canvas LMS support plugins?",
      answer:
        "Not in the way Moodle or WordPress do, because Canvas has no plugin directory to install into. Instead, Canvas is extended through LTI apps and the Canvas API. Anything you'd want a \"plugin\" to do is built as an LTI tool or API integration.",
    },
    {
      question: "How do you add custom functionality to Canvas?",
      answer:
        "Through LTI and the Canvas API. An LTI app embeds your functionality inside Canvas courses with sign-on and grade passback; the API lets us automate enrollments, sync data, and connect Canvas to your other systems. Together they cover what a plugin would do elsewhere.",
    },
    {
      question: "What's the difference between a Canvas plugin and a Canvas LTI app?",
      answer:
        "\"Canvas plugin\" is a loose term, since Canvas has no true plugins. The real equivalent is an LTI app: a tool that launches inside Canvas courses, signs users in automatically, and passes grades back. It's the standards-based way to extend Canvas.",
    },
    {
      question: "Can you build a Canvas tool that posts grades to the gradebook?",
      answer:
        "Yes. Any tool we build that assesses learners can post scores straight to the Canvas gradebook through LTI grade passback, automatically and reliably.",
    },
    {
      question: "Do you also do broader Canvas development?",
      answer:
        "Yes. Beyond single tools, we handle full Canvas LMS development: LTI integrations, custom apps, and API work.",
      link: { text: "Canvas LMS development", href: "/services/canvas-development" },
    },
  ],
  finalCta: {
    h2: "Let's build what you need inside Canvas.",
    line: "Tell us what you want Canvas to do. In 30 minutes, we'll tell you how we'd build it. No pitch, no obligation.",
  },
};

const ltiMigration: ServiceLanding = {
  ...landing("lti-1-1-to-1-3-migration", "ltiMigration"),
  title: "LTI 1.1 to 1.3 Migration",
  metaTitle: "LTI 1.1 to 1.3 Migration: Upgrade to LTI Advantage | Rizon",
  // TODO: metaDescription is 181 chars (>155) — shorten, e.g.: "LTI 1.1 is deprecated. We migrate your tool to LTI 1.3 and LTI Advantage: secure launch, grade passback, deep linking."
  metaDescription:
    "LTI 1.1 is deprecated. We migrate your tool to LTI 1.3 and LTI Advantage without breaking existing connections: secure launch, grade passback, deep linking. Book a free 30-min call.",
  h1: "LTI 1.1 to 1.3 Migration",
  subhead:
    "LTI 1.1 is deprecated and platforms are dropping support. We migrate your tool to LTI 1.3 and LTI Advantage (secure launch, grade passback, and deep linking) without breaking the integrations your customers already rely on.",
  trustLine: customLms.trustLine,
  heroAlt: customLms.heroAlt,
  problem: {
    h2: "Your tool still runs on LTI 1.1, and that clock is running out.",
    body: "LTI 1.1 is deprecated. The LMS platforms your customers use, including Canvas, Moodle, and Brightspace, are phasing it out, each on its own schedule. Your integration works today, but it's built on a standard that's being switched off. Migrating to LTI 1.3 now decides whether your tool keeps its connections or goes dark.",
  },
  agitate: {
    h2: "When 1.1 support is dropped, your integration just stops.",
    body: "There's no gentle degradation. The day a platform disables LTI 1.1, launches fail, sign-on breaks, and grades stop syncing, for every customer on that LMS at once. Your support queue floods, renewals wobble, and you're doing an emergency migration under pressure instead of a planned one. Waiting leaves the migration cost where it is and adds the cost of an outage.",
  },
  solution: {
    h2: "A planned migration to LTI 1.3, before anything breaks.",
    body: "We move your tool from LTI 1.1 to LTI 1.3 and LTI Advantage properly: OAuth 2.0 / OIDC security, names and roles, assignment and grade services, and deep linking. We do it without breaking your live connections, testing against the real platforms your customers run, so the switch is invisible to them. The integration just keeps working, on the current standard.",
    features: [
      {
        icon: ShieldCheck,
        feature: "Full LTI 1.3 + LTI Advantage",
        titleHref: "/services/lti-development",
        benefit: "The current standard: secure launch, names and roles, grade services, deep linking.",
      },
      { icon: Link2, feature: "No broken connections", benefit: "We migrate without disrupting the integrations your customers depend on today." },
      {
        icon: BadgeCheck,
        feature: "Tested on real platforms",
        benefit: "Validated against Canvas, Moodle, Brightspace, and any compliant LMS.",
        links: [
          { text: "Canvas", href: "/services/canvas-development" },
          { text: "Moodle", href: "/services/moodle-development" },
        ],
      },
      { icon: ClipboardList, feature: "Planned ahead of the deadline", benefit: "Migrate on your schedule, before a platform drops 1.1, not during an outage." },
      { icon: Wrench, feature: "Handover and support", benefit: "Documented, standards-based code, with us available for platform changes afterward." },
    ],
  },
  howWeWork: {
    h2: "How we migrate your integration",
    steps: [
      { icon: Phone, title: "Discovery call", body: "A free 30-minute call to review your current LTI 1.1 setup and which platforms your customers use." },
      { icon: ClipboardList, title: "Scope & plan", body: "A clear migration plan: what changes, how we avoid downtime, the timeline, and the cost. Fixed and upfront." },
      { icon: Repeat, title: "Migrate & test in sprints", body: "We build the 1.3 integration and test it against real LMS platforms, in parallel with your live 1.1 setup." },
      { icon: Rocket, title: "Cut over & handover", body: "We switch to 1.3 cleanly, confirm every platform works, and hand over documented code. We stay available afterward." },
    ],
  },
  cost: {
    h2: "How much does an LTI 1.1 to 1.3 migration cost?",
    answer:
      "An LTI 1.1 to 1.3 migration typically costs from a few thousand dollars, depending on how many LMS platforms you support and which LTI Advantage services you use. A single-platform sign-on migration sits at the low end; multi-platform with grade passback and deep linking sits higher. At Rizon, we scope it during a free discovery call and give you a fixed price before any work begins.",
    support:
      "What moves the price: how many target platforms you support, which LTI Advantage services you need (sign-on, grade passback, deep linking), the complexity of your existing 1.1 integration, and whether the migration has to happen with zero downtime for live customers.",
  },
  proof: { h2: "LTI work we've done" },
  faqH2: "LTI 1.1 to 1.3 migration, answered",
  faqs: [
    {
      question: "Is LTI 1.1 deprecated?",
      answer:
        "Yes. LTI 1.1 is deprecated, and LMS platforms are phasing out support for it. Tools still on 1.1 will stop working once their customers' platforms disable it. LTI 1.3 is the current standard and the one to migrate to.",
    },
    {
      question: "What's the difference between LTI 1.1 and LTI 1.3?",
      answer:
        "LTI 1.3 replaces LTI 1.1 with modern security (OAuth 2.0 / OIDC) and adds LTI Advantage services: names and roles, assignment and grade services, and deep linking. 1.1 used older, weaker authentication and lacks these capabilities. 1.3 is more secure and more capable.",
    },
    {
      question: "Will migrating to LTI 1.3 break our existing integrations?",
      answer:
        "Not if it's planned. We build and test the 1.3 integration alongside your live 1.1 setup, then cut over cleanly, so customers experience no interruption. The risk of breakage comes from waiting until a platform disables 1.1 and forcing an emergency migration.",
    },
    {
      question: "How long does an LTI 1.3 migration take?",
      answer:
        "It depends on how many platforms you support and how complex your integration is, from a couple of weeks for a single-platform tool to longer for multi-platform setups with grade passback and deep linking. We give you a firm timeline during scoping.",
    },
    {
      question: "Do we have to migrate now?",
      answer:
        "The safe answer is to migrate before your customers' platforms drop LTI 1.1, not after. A planned migration costs less and carries no outage; an emergency one happens under pressure with your integration already down. Migrating early removes the risk entirely.",
    },
  ],
  finalCta: {
    h2: "Migrate before 1.1 gets switched off.",
    line: "Tell us about your current LTI setup and the platforms you support. In 30 minutes, we'll tell you how we'd handle the migration. No pitch, no obligation.",
  },
};

const woocommerceMoodle: ServiceLanding = {
  ...landing("woocommerce-to-moodle", "woocommerceMoodle"),
  title: "WooCommerce to Moodle Integration",
  // TODO: metaTitle is 68 chars (>60) — shorten, e.g.: "WooCommerce to Moodle: Sell Courses, Auto-Enroll | Rizon"
  metaTitle: "WooCommerce to Moodle Integration: Sell Courses, Auto-Enroll | Rizon",
  // TODO: metaDescription is 195 chars (>155) — shorten, e.g.: "Connect WooCommerce to Moodle so a course purchase creates the account and enrolls the buyer automatically, built to fit your setup."
  metaDescription:
    "Connect WooCommerce to Moodle so a course purchase creates the account and enrolls the buyer automatically, built to fit your setup, beyond what off-the-shelf bridges do. Book a free 30-min call.",
  h1: "WooCommerce to Moodle Integration",
  subhead:
    "Sell courses in WooCommerce and enroll buyers in Moodle automatically: no manual account creation, no exported spreadsheets. We build the integration to fit exactly how you sell and how your courses are structured, including the cases off-the-shelf bridges can't handle.",
  trustLine: customLms.trustLine,
  heroAlt: customLms.heroAlt,
  problem: {
    h2: "Selling the course and delivering it live in two different systems.",
    body: "You take payments in WooCommerce. Your courses live in Moodle. Between them is a gap someone has to cross by hand: creating the account, enrolling the buyer, matching the right product to the right course. Every sale becomes a manual task, and every manual task is a delay between a customer paying and actually getting in.",
  },
  agitate: {
    h2: "Manual enrollment doesn't scale, and it costs you at the worst moment.",
    body: "The gap hurts most right when things go well: a launch, a sale, a bulk purchase, and suddenly someone's copying names into Moodle at midnight. Buyers who paid are stuck waiting for access, so the first thing they feel is friction, not value. Refund requests and support tickets climb. Off-the-shelf bridges cover the basics, but the moment your setup is even slightly non-standard (variable products, bundles, group enrollments, cohorts) they hit a wall.",
  },
  solution: {
    h2: "A purchase in WooCommerce, an enrollment in Moodle, automatically.",
    body: "We connect WooCommerce and Moodle so a completed purchase creates the account and enrolls the buyer in the right course instantly, with no one touching it. Where a standard bridge fits, we configure it properly; where your setup goes beyond it (bundles, subscriptions, cohorts, custom rules) we build the integration to handle exactly how you sell.",
    features: [
      { icon: RefreshCw, feature: "Automatic enrollment", benefit: "A completed WooCommerce order creates the Moodle account and enrolls the buyer, instantly." },
      { icon: Link2, feature: "Product-to-course mapping", benefit: "The right purchase unlocks the right course, including bundles and variable products." },
      { icon: Blocks, feature: "Handles non-standard setups", benefit: "Subscriptions, group or cohort enrollments, and custom rules a stock bridge can't." },
      {
        icon: Plug,
        feature: "Built on your existing stack",
        benefit: "Works with your current WooCommerce store and Moodle site, no rebuild.",
        links: [{ text: "Moodle site", href: "/services/moodle-development" }],
      },
      { icon: Wrench, feature: "Reliable and maintained", benefit: "An integration that keeps working through WooCommerce and Moodle updates, with support when you need it." },
    ],
  },
  howWeWork: {
    h2: "How we connect your store to your courses",
    steps: [
      { icon: Phone, title: "Discovery call", body: "A free 30-minute call to understand how you sell in WooCommerce and how your Moodle courses are set up." },
      { icon: ClipboardList, title: "Scope & plan", body: "A clear plan: what connects to what, how enrollment works, the timeline, and the cost. Fixed and upfront." },
      { icon: Repeat, title: "Build & test in sprints", body: "We build the integration and test real purchases end to end, from checkout to course access." },
      { icon: Rocket, title: "Launch & handover", body: "We go live, confirm orders enroll correctly, and hand over documented setup. We stay available for updates." },
    ],
  },
  cost: {
    h2: "How much does a WooCommerce to Moodle integration cost?",
    answer:
      "A WooCommerce to Moodle integration typically costs from a few hundred dollars to configure a standard bridge to several thousand for a custom build handling bundles, subscriptions, or cohort enrollments. The price depends on how your products map to courses and how far your setup goes beyond the basics. At Rizon, we scope it during a free discovery call and give you a fixed price before any work begins.",
    support:
      "What moves the price: whether a standard bridge fits or you need custom logic, how your products map to courses (simple, variable, or bundled), whether you need subscriptions or group enrollments, and how much ongoing maintenance you want. A basic one-product-one-course setup sits at the low end; complex mapping and custom rules sit higher.",
  },
  proof: { h2: "Moodle work we've done" },
  faqH2: "WooCommerce to Moodle, answered",
  faqs: [
    {
      question: "Can you automatically enroll WooCommerce buyers into Moodle?",
      answer:
        "Yes. We connect WooCommerce and Moodle so a completed purchase creates the buyer's Moodle account and enrolls them in the right course automatically, with no manual account creation and no spreadsheets.",
    },
    {
      question: "Do I need Edwiser Bridge to connect WooCommerce and Moodle?",
      answer:
        "Edwiser Bridge is a common off-the-shelf option and works well for standard setups. When your store goes beyond that (variable products, bundles, subscriptions, cohort enrollments, or custom rules) a stock bridge hits its limits, and we build an integration that fits how you actually sell.",
      link: {
        text: "Edwiser Bridge",
        href: "/blog/connect-woocommerce-to-moodle-with-edwiser-bridge",
      },
    },
    {
      question: "Can it handle bundles or subscriptions?",
      answer:
        "Yes. We build integrations that map bundled products to multiple courses and handle subscription-based access, group enrollments, and cohorts, the cases standard bridges typically can't cover.",
    },
    {
      question: "Will it work with my existing store and Moodle site?",
      answer:
        "Yes. We build on your current WooCommerce store and Moodle site, with no rebuild required. We map your existing products to your existing courses and set up enrollment to match how you already work.",
    },
    {
      question: "What happens when WooCommerce or Moodle updates?",
      answer:
        "A properly built integration keeps working through updates, and we stay available to adjust it when either platform ships major changes, so course sales never quietly stop enrolling buyers.",
    },
  ],
  finalCta: {
    h2: "Let's connect your store to your courses.",
    line: "Tell us how you sell and how your Moodle is set up. In 30 minutes, we'll tell you how we'd connect them. No pitch, no obligation.",
  },
};

export const blankServices: ServiceLanding[] = [
  customLms,
  lti,
  moodle,
  canvas,
  moodlePlugin,
  canvasPlugin,
  ltiMigration,
  woocommerceMoodle,
];

export const getBlankService = (slug: string) =>
  blankServices.find((s) => s.slug === slug);
