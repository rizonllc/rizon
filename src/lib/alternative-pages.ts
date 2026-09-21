// Alternatives landing pages that follow the fixed 7-section template
// (hero, why people leave, alternatives, custom option, how to choose, FAQ, CTA).
// A slug listed here renders with AlternativePage; other slugs still use the older layout.
type Link_ = { text: string; href: string };

export type AlternativeLanding = {
  slug: string;
  name: string; // "Teachable"
  metaTitle: string; // "[N] Best [Platform] Alternatives [year] | Rizon"; keep N in sync with options
  metaDescription: string;
  h1: string;
  subhead: string;
  why: { h2: string; body: string }; // body may hold several paragraphs split by a blank line
  // Optional comparison table (deep pages); rendered before the detail section.
  table?: {
    h2: string;
    columns: string[];
    rows: string[][];
    note: string;
  };
  options: {
    h2: string;
    items: { name: string; body: string; href?: string }[]; // href links the name
  };
  custom: { h2: string; body: string; links?: Link_[] };
  choose: { h2: string; body: string; links?: Link_[] };
  faqH2: string;
  faqs: { question: string; answer: string; link?: Link_ }[];
  cta: { h2: string; line: string };
};

const teachable: AlternativeLanding = {
  slug: "teachable",
  name: "Teachable",
  // 5 listed options + the custom-built one = 6.
  metaTitle:
    "6 Best Teachable Alternatives 2026 (Cheaper + Custom-Built) | Rizon",
  metaDescription:
    "The best Teachable alternatives compared on price, transaction fees, and control, including a custom-built platform you own outright with no fees. Honest 2026 comparison.",
  h1: "The Best Teachable Alternatives",
  subhead:
    "Teachable is a solid course platform, but its transaction fees on the entry plan, rising renewal prices, and limited control push many creators to look around. Here's an honest, detailed comparison of the best Teachable alternatives, from cheaper platforms to a custom-built site you own outright.",
  why: {
    h2: "Why creators look for a Teachable alternative",
    body: "The most common trigger is the transaction fee. Teachable's cheapest paid plan (Starter, around $39/month) charges a 7.5% cut on every sale, so the more you sell, the more you pay on top of your subscription, and the \"cheap\" plan quietly becomes expensive. To remove the fee you have to jump to Builder (around $89/month) or higher.\n\nThere are other reasons too: creators report meaningful price increases at renewal since the platform changed ownership; the course structure and checkout can't be fully customized; and, like any hosted platform, your courses, students, and data live inside a system you don't own. Once your courses are real income, those limits start costing money and flexibility.",
  },
  table: {
    h2: "Teachable alternatives compared",
    columns: [
      "Platform",
      "Best for",
      "Starting price (2026)",
      "Transaction fees",
      "Key limitation",
    ],
    rows: [
      ["Thinkific", "The closest swap, with a free start", "Free / ~$49/mo", "0% on paid plans", "Fewer marketing tools"],
      ["Kajabi", "All-in-one marketing + courses", "~$179/mo", "0%", "Premium price, no free plan"],
      ["Podia", "Budget all-in-one", "~$39/mo", "Low / 0% on paid", "Simpler, less depth"],
      ["Gumroad", "Selling simple digital products", "Free", "~10% + fees", "Not a real course platform"],
      ["Moodle", "Structured education, open-source", "Free (self-hosted)", "None", "Needs setup + maintenance"],
      ["Custom-built (Rizon)", "Established creators who want to own it", "One-time build", "None, ever", "Upfront cost; not for beginners"],
    ],
    note: "Prices are indicative as of 2026 and change often, so check each provider for current pricing. Payment processing (e.g. Stripe ~2.9% + $0.30) applies separately on all hosted platforms.",
  },
  options: {
    h2: "The best Teachable alternatives, in detail",
    items: [
      {
        name: "Thinkific",
        href: "/alternatives/thinkific",
        body: "The closest like-for-like alternative, and often the first stop for creators leaving Teachable. It has a genuinely usable free plan, charges no transaction fees on paid plans, and delivers a clean course experience. It's weaker than Kajabi on marketing and email, but for pure course delivery it matches Teachable at a comparable or lower price without the entry-plan fee.",
      },
      {
        name: "Kajabi",
        href: "/alternatives/kajabi",
        body: "The premium all-in-one: courses, email, funnels, and marketing in one place, with no transaction fees. It's considerably more expensive than Teachable and has no free plan, so it only makes sense if you'll actually use the full marketing suite. If you just need courses, you'd be overpaying.",
      },
      {
        name: "Podia",
        body: "A budget all-in-one that bundles courses, digital products, and email cheaply. Good if you liked Teachable's simplicity but want lower costs and fewer fees. You trade away depth, since it's simpler across the board, but for many creators that's a fair trade.",
      },
      {
        name: "Gumroad",
        body: "Not really a course platform. It's the simplest way to sell a digital product or a lightweight course, with no monthly fee but a high per-sale cut. Good for testing an idea or selling one-off products; poor for running a real course business with structure and student management.",
      },
      {
        name: "Moodle",
        href: "/services/moodle-development",
        body: "The open-source route. Free to license and endlessly flexible for structured education, but it needs technical setup and ongoing maintenance. A poor fit for a solo creator without help, a strong one if you have technical support and real curriculum.",
      },
    ],
  },
  custom: {
    h2: "The alternative none of them offer: a platform you own outright",
    body: "Every option above is still a rented platform with someone else's fees, limits, and roadmap. There's another path most comparison pages skip: a custom-built course site designed around exactly how you sell and teach, that you own completely. No transaction fees, no plan tiers capping your students or products, no feature you can't have because it's not on a vendor's list. Your branding, your checkout, your data, your code.\n\nThe math is the part people miss. Between subscription and transaction fees, a growing creator can pay Teachable well over a hundred dollars a month, every month, forever. A few years of that approaches the one-time cost of building a platform you own and never pay fees on again, one that fits you exactly. It's not for someone still testing their first course. But for an established creator with real sales, ownership often wins on both cost and control.",
    links: [
      {
        text: "custom-built course site",
        href: "/services/custom-lms-development",
      },
    ],
  },
  choose: {
    h2: "How to choose the right Teachable alternative",
    body: "If you want the closest swap with no entry-plan fee, Thinkific. If you'll use a full marketing suite, Kajabi. If you want cheap and simple, Podia or Gumroad. If you have technical support and real curriculum, Moodle. And if your courses are a serious business and you're tired of fees eating your margin, a custom-built platform you own outright removes the fees and the ceiling for good. The more your income depends on the platform, the more ownership matters.",
  },
  faqH2: "Teachable alternatives, answered",
  faqs: [
    {
      question: "What is the best Teachable alternative?",
      answer:
        "Thinkific is the closest like-for-like, with a free plan and no transaction fees on paid tiers. Kajabi is the premium all-in-one; Podia is the budget option; Moodle is free but technical. If you want to stop paying fees and own your platform outright, a custom-built course site is the strongest long-term alternative.",
    },
    {
      question: "Does Teachable charge transaction fees?",
      answer:
        "Yes, on its cheapest paid plan. Teachable's Starter plan (around $39/month) charges a 7.5% fee on every sale; the fee is removed on Builder (around $89/month) and above. Separately, payment processing (Stripe/PayPal, roughly 2.9% + $0.30) applies on all plans, as it does on every hosted platform.",
    },
    {
      question: "Is there a free Teachable alternative?",
      answer:
        "Thinkific has a genuinely usable free plan, and Moodle is free to self-host (though it requires setup and maintenance). Gumroad has no monthly fee but takes a high per-sale cut. A custom-built platform isn't free to build, but it eliminates ongoing fees, which is often cheaper over time for higher-volume creators.",
    },
    {
      question: "Which Teachable alternative has the lowest fees?",
      answer:
        "For hosted platforms, Thinkific charges 0% transaction fees on its paid plans, as do Teachable's own Builder tier and up. The only option with no platform fees and no subscription at all is a platform you own outright, a custom build, though it carries an upfront cost instead.",
    },
    {
      question: "Can I move my courses off Teachable?",
      answer:
        "Yes. We build custom course platforms and migrate your existing courses, content, and students across, so you can leave the fees and limits behind without losing what you've built.",
      link: {
        text: "custom course platforms",
        href: "/services/custom-lms-development",
      },
    },
    {
      question: "Is a custom platform cheaper than Teachable?",
      answer:
        "Not upfront, since there's a build cost. But between subscriptions and transaction fees, an active creator pays Teachable continuously, forever. Over a few years those fees can equal the one-time cost of a platform you own and never pay fees on again. It depends on your sales volume and how long you'll be in business.",
    },
  ],
  cta: {
    h2: "Want a platform you own instead of rent?",
    line: "Tell us how you sell and teach. In 30 minutes, we'll tell you honestly whether a custom platform makes sense for you. No pitch, no obligation.",
  },
};

const moodle: AlternativeLanding = {
  slug: "moodle",
  name: "Moodle",
  // 5 listed options + the custom-built one = 6.
  metaTitle:
    "6 Best Moodle Alternatives 2026 (Plus When to Just Fix Moodle) | Rizon",
  metaDescription:
    "The best Moodle alternatives compared on UX, maintenance, and cost, including a custom-built platform that keeps Moodle's ownership without the upkeep. Honest 2026 guide.",
  h1: "The Best Moodle Alternatives",
  subhead:
    "Moodle is powerful and free to license, but the dated interface, the plugin upkeep, and the real cost of running it wear teams down. Here's an honest, detailed comparison of the best Moodle alternatives, including the option that keeps Moodle's ownership without its headaches, and when you're better off just fixing the Moodle you have.",
  why: {
    h2: "Why teams look for a Moodle alternative",
    body: "Moodle costs nothing to license, but \"free\" is misleading. Self-hosting a real Moodle instance runs roughly $5,000 to $20,000+ a year once you count hosting and the sysadmin time to keep it patched, secure, and upgraded, and Moodle Workplace, the enterprise edition, is quote-based at tens of thousands a year. So cost isn't usually why people leave.\n\nThe real reasons are experience and effort: the interface feels dated and confuses learners, every upgrade risks breaking plugins, staying secure eats staff time, and bending Moodle to fit your program means fighting the platform. The ownership and flexibility are genuinely good; the UX and the maintenance tax are what push teams to look elsewhere.",
  },
  table: {
    h2: "Moodle alternatives compared",
    columns: [
      "Platform",
      "Best for",
      "Cost model (2026)",
      "Ownership",
      "Key limitation",
    ],
    rows: [
      ["Canvas", "Modern hosted LMS for education", "Institutional (often five figures/yr)", "Vendor-hosted", "Pay for polish, lose control"],
      ["Open edX", "MOOC-scale open source", "Free license; ~$500+/mo hosting", "You own it", "As heavy to run as Moodle, or heavier"],
      ["TalentLMS / Docebo", "Corporate training, hosted", "Per-seat subscription", "Vendor-hosted", "Per-seat cost + lock-in"],
      ["Google Classroom", "Simple K-12 teaching", "Free with Workspace for Education", "Vendor-hosted", "Far less capable for structured programs"],
      ["Managed Moodle hosting", "Keeping Moodle, less upkeep", "~$400 to $3,500+/mo", "You own it", "Same dated UX, still Moodle"],
      ["Custom-built (Rizon)", "Ownership without the upkeep", "One-time build", "You own it fully", "Upfront cost"],
    ],
    note: "Costs are indicative as of 2026 and vary widely by scale. Treat them as ranges, not quotes.",
  },
  options: {
    h2: "The best Moodle alternatives, in detail",
    items: [
      {
        name: "Canvas",
        href: "/services/canvas-development",
        body: "The most common modern alternative in education: a cleaner interface than Moodle, less day-to-day maintenance, and strong adoption in US higher ed. The trade-off is fundamental: it's a hosted commercial platform with opaque, often five-figure institutional pricing, and you give up the ownership and deep customization that made Moodle appealing. You're paying for polish and someone else running it.",
      },
      {
        name: "Open edX",
        body: "The other big open-source option, built for MOOC-scale course catalogs and strong at auto-graded STEM content. It keeps ownership, but it's harder to deploy and run than Moodle. Hosting alone starts around $500/month and it expects real DevOps. You solve Moodle's UX complaints but inherit as much or more operational overhead.",
      },
      {
        name: "TalentLMS / Docebo",
        href: "/alternatives/docebo",
        body: "Hosted corporate LMS platforms, much easier to run than Moodle and well suited to company training. But they're per-seat and subscription-based, so costs scale with your headcount and you're back to renting on a vendor's roadmap.",
      },
      {
        name: "Google Classroom",
        body: "Free with Google Workspace for Education and dead simple for basic teaching, but far less capable than Moodle for structured programs, assessments, certification, and reporting. Fine for a classroom, not for a serious training operation.",
      },
      {
        name: "Managed Moodle hosting",
        body: "The \"stay but suffer less\" option: keep Moodle, but pay a partner ($400 to $3,500+/month depending on size) to host and maintain it. It removes much of the upkeep burden, but you keep the dated interface and you still don't get a platform shaped to you. A reasonable middle ground if your only real problem is maintenance.",
      },
    ],
  },
  custom: {
    h2: "The alternative none of them offer: Moodle's freedom, without Moodle's headaches",
    body: "Here's the trap in most of these options: the reason you chose Moodle in the first place was ownership and control, and the easy alternatives (Canvas, Docebo, TalentLMS) take exactly that away. You'd be trading your biggest advantage just to escape the interface and the upkeep.\n\nThere's a better-fitting path: a custom-built platform that keeps everything you liked about Moodle (you own it, you control it, no per-seat fees, your data is yours) while fixing what you didn't: a clean interface your learners actually understand, no plugin-upgrade roulette, and a system built to match your program instead of one you fight. You don't have to surrender ownership to escape the maintenance. For teams already spending five figures a year running Moodle, a platform built to fit can be the better home for that budget.",
    links: [
      {
        text: "custom-built platform",
        href: "/services/custom-lms-development",
      },
    ],
  },
  choose: {
    h2: "How to choose, and when to just fix the Moodle you have",
    body: "Be honest about what's actually wrong. If your only problem is maintenance, managed Moodle hosting solves it cheaply: you keep Moodle, someone else runs it. If it's the interface, a broken theme, a bad upgrade, or a missing feature, that's fixable, and you don't need to leave Moodle at all. We do Moodle development, theming, and upgrades, so we can fix the Moodle you have. If you want a modern hosted platform and don't mind paying and giving up ownership, Canvas (education) or Docebo/TalentLMS (corporate) fit. If you want to stay open-source at MOOC scale, Open edX. And if what you really want is Moodle's ownership without its interface and upkeep, a custom-built platform is the only option that gives you both.\n\nThe honest first question isn't \"what replaces Moodle\", it's \"does Moodle actually need replacing, or just fixing?\" We'll tell you straight.",
    links: [
      {
        text: "fix the Moodle you have",
        href: "/services/moodle-development",
      },
    ],
  },
  faqH2: "Moodle alternatives, answered",
  faqs: [
    {
      question: "What is the best alternative to Moodle?",
      answer:
        "It depends on what's pushing you away. Canvas is the best modern hosted alternative for education; Docebo and TalentLMS suit corporate training; Open edX stays open-source at scale. If you want Moodle's ownership and control without the dated interface and maintenance burden, a custom-built platform is the strongest fit.",
    },
    {
      question: "Is Moodle really free?",
      answer:
        "The software is free to license, but running it isn't. Self-hosting a real instance costs roughly $5,000 to $20,000+ a year once you include hosting and the staff time to maintain, secure, and upgrade it. Moodle Workplace, the enterprise edition, is quote-based and runs into tens of thousands a year. \"Free\" refers to the license, not the total cost.",
    },
    {
      question: "Is there a better free alternative to Moodle?",
      answer:
        "Open edX and Google Classroom are free to license, but Open edX is as demanding to run as Moodle (or more), and Google Classroom is far less capable for structured programs. Every \"free\" LMS carries a real cost in hosting and staff time, which is often the actual reason teams leave Moodle.",
    },
    {
      question: "Do I have to leave Moodle to fix its problems?",
      answer:
        "Often no. If your issues are a dated theme, broken plugins, a rough upgrade, or a missing feature, those are fixable. We do Moodle development, customization, and upgrades. Replacing Moodle makes sense when you want a fundamentally different experience while keeping ownership. We'll tell you honestly which one you need.",
      link: {
        text: "Moodle development",
        href: "/services/moodle-development",
      },
    },
    {
      question: "Can I migrate my Moodle courses to a new platform?",
      answer:
        "Yes. We migrate courses, users, and data from Moodle to a custom-built platform, or onto a cleaner, better-run Moodle setup, so you keep everything you've built while leaving the problems behind.",
    },
  ],
  cta: {
    h2: "Fix it or replace it? We'll tell you straight.",
    line: "Tell us what's frustrating you about Moodle. In 30 minutes, we'll give you an honest read on whether to fix your Moodle or move to something you own outright. No pitch, no obligation.",
  },
};

const kajabi: AlternativeLanding = {
  slug: "kajabi",
  name: "Kajabi",
  // 5 listed options + the custom-built one = 6.
  metaTitle: "6 Best Kajabi Alternatives 2026 (Cheaper + Custom-Built) | Rizon",
  metaDescription:
    "The best Kajabi alternatives after the 2026 price hikes, compared on price, features, and control, including a custom-built platform you own with no monthly fees.",
  h1: "The Best Kajabi Alternatives",
  subhead:
    "Kajabi is powerful, but after its 2026 price increases it's more expensive than ever, and there's still no free plan. If the cost no longer matches what you're getting, here's an honest, detailed comparison of the best Kajabi alternatives, from cheaper platforms to a custom-built site you own outright.",
  why: {
    h2: "Why creators look for a Kajabi alternative",
    body: "Kajabi's pricing is the number-one reason, and it got worse recently. In January 2026, Kajabi raised prices 20-25% across all plans (its first increase in about a decade), removed its entry-level Kickstarter tier, and cut the Basic plan's contact limit sharply, without grandfathering existing customers. Paid plans now run from around $179/month (Basic) up to $499/month (Pro) on monthly billing, and there's no free tier.\n\nBeyond price, the frustrations are consistent: you pay for a full all-in-one suite even if you only use the courses; contact and product limits force upgrades as you grow; and your courses, funnels, and audience live inside a platform you don't control and can't fully customize. For many creators the question becomes simple: is the bundle worth the premium?",
  },
  table: {
    h2: "Kajabi alternatives compared",
    columns: [
      "Platform",
      "Best for",
      "Starting price (2026)",
      "Key limitation",
    ],
    rows: [
      [
        "Teachable",
        "Course-focused creators",
        "~$39/mo",
        "Transaction fees on lower tiers; limited customization",
      ],
      [
        "Thinkific",
        "Course creators wanting a free start",
        "Free / ~$49/mo",
        "Fewer marketing tools than Kajabi",
      ],
      [
        "Podia",
        "All-in-one on a budget",
        "~$39/mo",
        "Less powerful than Kajabi's suite",
      ],
      [
        "Systeme.io",
        "Funnels + courses, cheaply",
        "Free / ~$27/mo",
        "Less polished course experience",
      ],
      [
        "Moodle",
        "Structured education, open-source",
        "Free (self-hosted)",
        "Needs setup and maintenance",
      ],
      [
        "Custom-built (Rizon)",
        "Established creators who want to own it",
        "One-time build",
        "Upfront cost; not for absolute beginners",
      ],
    ],
    note: "Prices are indicative as of 2026 and change often. Check each provider for current pricing.",
  },
  options: {
    h2: "The best Kajabi alternatives, in detail",
    items: [
      {
        name: "Teachable",
        href: "/alternatives/teachable",
        body: "The most direct course-focused alternative. It does courses well at a lower entry price than Kajabi, with a large creator community and solid built-in checkout. The trade-offs: lower tiers charge transaction fees, and customization is limited compared to a platform you control. Good if courses are your core and you don't need Kajabi's full marketing suite.",
      },
      {
        name: "Thinkific",
        href: "/alternatives/thinkific",
        body: "Similar to Teachable, and notable for a genuinely usable free plan to start. Strong course delivery, clean student experience, no transaction fees on paid plans. Weaker on the marketing and email side than Kajabi, so you may end up bolting on other tools.",
      },
      {
        name: "Podia",
        body: "The budget all-in-one. It bundles courses, digital products, and email at a much lower price than Kajabi, which makes it attractive if you liked Kajabi's \"everything in one place\" idea but not the bill. You give up depth, since it's simpler across the board. Good for creators who want breadth cheaply.",
      },
      {
        name: "Systeme.io",
        body: "The cheapest way to get funnels plus courses, with a free tier and low paid plans. It's marketing-first, so funnels and automation are its strength; course delivery is functional but less refined. Best for creators who care more about the sales machine than the learning experience.",
      },
      {
        name: "Moodle",
        href: "/services/moodle-development",
        body: "The open-source route. Free to license, endlessly flexible, and strong for structured education rather than marketing funnels, but it needs technical setup and ongoing maintenance, which makes it a poor fit for a solo creator without help. Worth considering if your focus is real curriculum and you have technical support.",
      },
    ],
  },
  custom: {
    h2: "The alternative none of them offer: stop paying monthly, own it instead",
    body: "Every option above is still a subscription: you rent, indefinitely, and the bill grows with your contacts, products, or sales. There's another path most comparison pages skip: a custom-built platform designed around exactly how you sell and teach, that you own completely. No monthly platform fee, no per-contact pricing, no paying for a bundle when you use half of it.\n\nThe math is the part people miss. Kajabi's Pro plan is roughly $6,000/year, every year. A few years of that is comparable to the one-time cost of building a platform you own outright and never pay rent on again, one that fits you exactly, that you can change whenever you want, and whose data and code are yours. It isn't for beginners still testing an idea. But for an established creator with real, recurring revenue, ownership often wins on both cost and control.",
    links: [
      {
        text: "building a platform you own",
        href: "/services/custom-lms-development",
      },
    ],
  },
  choose: {
    h2: "How to choose the right Kajabi alternative",
    body: "Match the tool to where you are. If you're testing an idea, start cheap: Podia, Systeme.io, or Thinkific's free plan. If courses are your core and you want a proven platform, Teachable or Thinkific. If you have technical support and real curriculum, Moodle. And if your business is established, the subscription math has started to sting, and you want to stop renting, a custom-built platform you own outright is the alternative that ends the monthly bill for good. The more your business depends on the platform, the more ownership matters.",
  },
  faqH2: "Kajabi alternatives, answered",
  faqs: [
    {
      question: "Is Kajabi worth the higher price?",
      answer:
        "It depends whether you use the full all-in-one suite. If you rely on Kajabi's courses, email, funnels, and marketing together, the bundle can justify the cost. If you only use part of it (most people only use the courses), you're likely overpaying, and a cheaper platform or a custom-built one you own will serve you better for less.",
    },
    {
      question: "What is the cheapest Kajabi alternative?",
      answer:
        "Among hosted platforms, Systeme.io and Podia are the cheapest all-in-one options, and Thinkific has a free tier. Moodle is free to license but costs time to run. A custom-built platform has an upfront cost but no ongoing monthly fee, which for established creators often works out cheaper than years of Kajabi subscriptions.",
    },
    {
      question: "Does Kajabi have a free plan?",
      answer:
        "No. Kajabi removed its entry-level Kickstarter plan in 2026 and has no free tier, with paid plans starting around $179/month billed monthly. If a free start matters, Thinkific and Systeme.io both have free plans; the trade-off is fewer features.",
    },
    {
      question: "Does Kajabi take a percentage of sales?",
      answer:
        "Kajabi doesn't charge transaction fees on its plans, but you pay its monthly subscription regardless of how much you sell. A custom platform you own has neither a subscription nor a cut of revenue, just the upfront build cost.",
    },
    {
      question: "Can I move my courses and funnels off Kajabi?",
      answer:
        "Yes. We build custom platforms and migrate your existing courses, content, members, and funnels across, so you can leave the monthly fees behind without losing what you've built.",
      link: {
        text: "custom platforms",
        href: "/services/custom-lms-development",
      },
    },
    {
      question: "Is a custom platform really cheaper than Kajabi?",
      answer:
        "Not at first, since there's an upfront build cost. But Kajabi's higher tiers run several thousand dollars a year, every year. For an established creator, a few years of subscriptions can equal the one-time cost of a platform you own outright and never pay monthly for again. It comes down to how long you'll be in business and how much you'd otherwise pay in fees.",
    },
  ],
  cta: {
    h2: "Tired of the monthly bill?",
    line: "Tell us how you sell and teach. In 30 minutes, we'll tell you honestly whether owning your platform makes financial sense for you. No pitch, no obligation.",
  },
};

const thinkific: AlternativeLanding = {
  slug: "thinkific",
  name: "Thinkific",
  // 5 listed options + the custom-built one = 6.
  metaTitle:
    "6 Best Thinkific Alternatives 2026 (Cheaper + Custom-Built) | Rizon",
  metaDescription:
    "The best Thinkific alternatives compared on price, fees, and control, including a custom-built platform you own outright with no monthly fees. Honest 2026 comparison.",
  h1: "The Best Thinkific Alternatives",
  subhead:
    "Thinkific used to win on a free plan and zero fees, but both have quietly weakened in 2026. If it no longer fits, here's an honest, detailed comparison of the best Thinkific alternatives, from cheaper platforms to a custom-built site you own outright.",
  why: {
    h2: "Why creators look for a Thinkific alternative",
    body: "Thinkific built its reputation on two things: a genuinely free plan and 0% transaction fees. In 2026, both got murkier. The long-standing free-forever plan appears to have been replaced with a time-limited trial, so the \"$0 to start indefinitely\" pitch may no longer hold. And the \"0% fees\" only applies if you use Thinkific's own payment system. Bring your own Stripe on the entry plan and there's a surcharge (reported around 5% on Basic) that can cost more than the subscription itself.\n\nOn top of that, paid plans start around $49/month and climb, key features like assignments, memberships, and communities are gated to higher tiers, and, like any hosted platform, your courses, students, and data live inside a system you don't own. The reasons people liked Thinkific are exactly the ones eroding.",
  },
  table: {
    h2: "Thinkific alternatives compared",
    columns: [
      "Platform",
      "Best for",
      "Starting price (2026)",
      "Transaction fees",
      "Key limitation",
    ],
    rows: [
      ["Teachable", "The closest swap", "~$39/mo", "7.5% on Starter, 0% above", "Fee on the cheap plan"],
      ["Kajabi", "All-in-one marketing + courses", "~$179/mo", "0%", "Premium price, no free plan"],
      ["Podia", "Budget all-in-one", "~$39/mo", "Low / 0% on paid", "Simpler, less depth"],
      ["LearnWorlds", "Interactive, polished courses", "~$29/mo+", "Fee on entry plan", "Add-ons raise real cost"],
      ["Moodle", "Structured education, open-source", "Free (self-hosted)", "None", "Needs setup + maintenance"],
      ["Custom-built (Rizon)", "Established creators who want to own it", "One-time build", "None, ever", "Upfront cost; not for beginners"],
    ],
    note: "Prices are indicative as of 2026 and change often, so check each provider for current pricing. Payment processing (e.g. Stripe ~2.9% + $0.30) applies separately on all hosted platforms.",
  },
  options: {
    h2: "The best Thinkific alternatives, in detail",
    items: [
      {
        name: "Teachable",
        href: "/alternatives/teachable",
        body: "The most direct swap: a near-identical course-creator platform with a comparable price and feature set. The catch mirrors Thinkific's: Teachable's cheapest plan charges a 7.5% transaction fee, removed only when you move up a tier. Choose between them on the specific features and pricing tiers you need, but understand you're getting the same fundamental model and limits.",
      },
      {
        name: "Kajabi",
        href: "/alternatives/kajabi",
        body: "The premium all-in-one: courses plus email, funnels, and marketing, with no transaction fees. Much pricier than Thinkific and no free plan, so it's only worth it if you'll use the full marketing suite. If you just need to deliver courses, it's overkill.",
      },
      {
        name: "Podia",
        body: "A cheaper all-in-one that bundles courses, digital products, and email. Good if you want breadth at a lower price than Thinkific's higher tiers. Simpler across the board, so you trade depth for cost and ease.",
      },
      {
        name: "LearnWorlds",
        body: "Strong on interactive, polished course experiences (interactive video, assessments, a branded look). Capable, but the entry plan carries a transaction fee and the real cost climbs once you add the features that make it shine. Good for creators who prioritize a premium learning experience.",
      },
      {
        name: "Moodle",
        href: "/services/moodle-development",
        body: "The open-source route: free to license, deeply flexible for structured education, but requiring technical setup and maintenance. A poor fit for a solo creator without help; a strong one if you have technical support and real curriculum.",
      },
    ],
  },
  custom: {
    h2: "The alternative none of them offer: a platform you own outright",
    body: "Every option above is still a rented platform: a subscription, often a transaction fee, and someone else's limits and roadmap. There's another path most comparison pages skip: a custom-built course site designed around exactly how you sell and teach, that you own completely. No transaction fees under any condition, no plan tiers gating the features you need, no surcharge for using your own Stripe. Your branding, checkout, data, and code.\n\nThe math is the part people miss. Thinkific's mid and upper tiers, plus any payment surcharges, add up to a bill you pay forever. A few years of it approaches the one-time cost of building a platform you own and never pay fees on again, one that fits you exactly. It's not for someone testing a first course, but for an established creator it often wins on both cost and control.",
    links: [
      {
        text: "custom-built course site",
        href: "/services/custom-lms-development",
      },
    ],
  },
  choose: {
    h2: "How to choose the right Thinkific alternative",
    body: "If you want the closest swap, Teachable (mind the entry-plan fee). For a full marketing suite, Kajabi. For budget breadth, Podia. For a premium interactive experience, LearnWorlds. For open-source with technical help, Moodle. And if you're tired of subscriptions, surcharges, and feature gates, and your courses are a real business, a custom-built platform you own outright removes all of it. The more your income depends on the platform, the more ownership matters.",
  },
  faqH2: "Thinkific alternatives, answered",
  faqs: [
    {
      question: "What is the best Thinkific alternative?",
      answer:
        "Teachable is the closest like-for-like; Kajabi is the premium all-in-one; Podia is the budget option; LearnWorlds is best for interactive courses; Moodle is free but technical. If you want to stop paying subscriptions and fees and own your platform outright, a custom-built site is the strongest long-term alternative.",
    },
    {
      question: "Does Thinkific still have a free plan?",
      answer:
        "Thinkific was long known for a free-forever plan, but as of 2026 reports indicate it was replaced with a time-limited free trial, so the indefinite free option may no longer be available. Check Thinkific's current pricing directly. If a genuinely free start matters, Teachable and Podia have free or low-cost entry options, and Moodle is free to self-host.",
    },
    {
      question: "Does Thinkific really charge 0% transaction fees?",
      answer:
        "Only if you use Thinkific's own payment system. If you connect your own Stripe on the entry (Basic) plan, Thinkific applies a surcharge, reported around 5%, which can cost more than the subscription at real sales volume. A custom-built platform you own has no platform fees or surcharges under any setup.",
    },
    {
      question: "Is there a cheaper Thinkific alternative?",
      answer:
        "Podia and Teachable's entry tiers are comparably priced or cheaper, and Moodle is free to self-host (with maintenance costs). A custom-built platform has an upfront cost but no ongoing subscription or fees, which becomes cheaper over time for higher-volume creators.",
    },
    {
      question: "Can I move my courses off Thinkific?",
      answer:
        "Yes. We build custom course platforms and migrate your existing courses, content, and students across, so you can leave the fees and feature gates behind without losing what you've built.",
      link: {
        text: "custom course platforms",
        href: "/services/custom-lms-development",
      },
    },
  ],
  cta: {
    h2: "Want a platform you own instead of rent?",
    line: "Tell us how you sell and teach. In 30 minutes, we'll tell you honestly whether a custom platform makes sense for you. No pitch, no obligation.",
  },
};

const docebo: AlternativeLanding = {
  slug: "docebo",
  name: "Docebo",
  // 5 listed options + the custom-built one = 6.
  metaTitle: "6 Best Docebo Alternatives 2026 (Cheaper + Custom-Built) | Rizon",
  metaDescription:
    "The best Docebo alternatives for enterprise training, compared on real cost, per-user pricing, and lock-in, including a custom-built LMS you own with no per-seat fees.",
  h1: "The Best Docebo Alternatives",
  subhead:
    "Docebo is a capable enterprise LMS, but with quote-based pricing that typically starts around $25,000/year, per-user costs, multi-year contracts, and paid add-ons, it doesn't fit every training team. Here's an honest, detailed comparison of the best Docebo alternatives, including a custom-built LMS you own outright with no per-seat bill.",
  why: {
    h2: "Why teams look for a Docebo alternative",
    body: "Cost and commitment are the usual reasons. Docebo doesn't publish pricing. It's quote-based, and industry data puts the typical minimum around $25,000/year, roughly $7 to $10 per active user per month, with enterprise contracts commonly landing at $70,000 and climbing past $200,000. Deals often require 300+ users and multi-year terms, and several capabilities (advanced AI, analytics, connectors) are paid add-ons on top.\n\nThe other frustrations: per-user pricing punishes growth, opaque quotes make budgeting hard, implementation runs two to four months, and you're locked into a vendor's roadmap and renewal cycle. For teams whose needs don't match the enterprise mold, or whose budgets do but whose flexibility needs don't, it's worth looking at what else exists.",
  },
  table: {
    h2: "Docebo alternatives compared",
    columns: ["Platform", "Best for", "Cost model (2026)", "Key limitation"],
    rows: [
      ["TalentLMS", "Small to mid teams wanting simple + affordable", "Free tier; ~$89/mo+", "Less powerful at true enterprise scale"],
      ["Absorb LMS", "Mid-market corporate training", "~$34k to $83k/yr (quote)", "Still per-seat, still a contract"],
      ["Cornerstone / SAP Litmos", "Large-enterprise suites", "Enterprise quote", "Comparable cost + lock-in"],
      ["Moodle Workplace", "Ownership at enterprise scale", "Custom (partner-quoted)", "Setup + maintenance burden"],
      ["360Learning / LearnUpon", "Collaborative mid-market LMS", "Per-seat subscription", "Cheaper than Docebo, still renting"],
      ["Custom-built (Rizon)", "Owning your LMS, no per-seat bill", "One-time build", "Upfront cost"],
    ],
    note: "Enterprise LMS pricing is quote-based and varies widely by user count and add-ons. Treat figures as ranges, not quotes.",
  },
  options: {
    h2: "The best Docebo alternatives, in detail",
    items: [
      {
        name: "TalentLMS",
        href: "/alternatives/talentlms",
        body: "The most common step down from Docebo: much simpler and far cheaper, with a free tier and paid plans from around $89/month. Great for small and mid-sized teams that found Docebo overkill or over-budget. It won't match Docebo's depth at true enterprise scale, but most teams don't need that depth.",
      },
      {
        name: "Absorb LMS",
        body: "A strong mid-market-to-enterprise competitor with a cleaner admin experience than Docebo. Pricing is still quote-based and per-seat (roughly $34k to $83k/year depending on scale), so you're in the same fundamental model, just often at a lower number.",
      },
      {
        name: "Cornerstone / SAP Litmos",
        body: "The other big enterprise suites. Comparable capability to Docebo for large, complex organizations, and comparable enterprise pricing, implementation timelines, and vendor lock-in. Sensible if you specifically need a heavyweight suite; no escape from the contract model.",
      },
      {
        name: "Moodle Workplace",
        href: "/services/moodle-development",
        body: "The enterprise edition of open-source Moodle: multi-tenancy, compliance, HRIS integration, and genuine ownership. Partner-quoted (often tens of thousands a year with hosting), and it carries Moodle's setup and maintenance overhead, but you own it rather than rent it.",
      },
      {
        name: "360Learning / LearnUpon",
        body: "Mid-market hosted platforms focused on collaborative learning, generally cheaper than Docebo. Still per-seat and subscription-based, so costs scale with headcount, but a reasonable middle ground for teams that want more than TalentLMS without Docebo's price tag.",
      },
    ],
  },
  custom: {
    h2: "The alternative none of them offer: an enterprise LMS you own, with no per-seat bill",
    body: "Every hosted option above charges per seat, every year, on a contract, and the more your program succeeds, the more you pay. There's another path most comparison pages skip: a custom-built LMS designed around your exact training program, that you own completely. No per-seat pricing, no annual renewal, no vendor roadmap deciding what you can and can't do, no add-on surcharges for the features you actually need.\n\nThe math is stark at enterprise scale. A Docebo contract at $70,000+ a year is $350,000 over five years, before add-ons and renewals. A custom LMS is a one-time build you own outright: it integrates with your SSO, HRIS, and SCORM/xAPI content, scales to your whole workforce without the bill scaling with it, and the per-seat savings alone can cover the build several times over. It's not the right call for a small team, but for a large or growing one, ownership can be dramatically cheaper than a per-seat contract.",
    links: [
      { text: "custom-built LMS", href: "/services/custom-lms-development" },
    ],
  },
  choose: {
    h2: "How to choose the right Docebo alternative",
    body: "If Docebo was overkill and over-budget, TalentLMS or LearnUpon cost far less. If you need comparable enterprise features, Absorb, Cornerstone, or SAP Litmos are peers (at peer prices). If you want ownership and can handle upkeep, Moodle Workplace keeps you open-source. And if per-seat pricing at scale is the real problem, a custom-built LMS you own removes it entirely: you pay to build it once, not to rent it per employee forever. The larger your workforce, the more the ownership math favors building.",
  },
  faqH2: "Docebo alternatives, answered",
  faqs: [
    {
      question: "How much does Docebo cost, and are alternatives cheaper?",
      answer:
        "Docebo is quote-based, typically starting around $25,000/year and averaging roughly $7 to $10 per active user per month, with enterprise contracts commonly $70,000+. Lighter platforms like TalentLMS cost far less per seat. A custom-built LMS has an upfront build cost but no per-seat fees, so for large or growing teams, it often costs less over a few years than a per-seat contract.",
    },
    {
      question: "What is the best Docebo alternative?",
      answer:
        "It depends on size and needs. TalentLMS and LearnUpon are lighter and cheaper; Absorb, Cornerstone, and SAP Litmos are enterprise peers; Moodle Workplace is the ownable open-source route. If per-seat pricing at scale is the issue, a custom-built LMS you own is the strongest long-term alternative.",
    },
    {
      question:
        "Does a custom LMS integrate with our SSO, HRIS, and SCORM content?",
      answer:
        "Yes. A custom LMS integrates with your existing enterprise systems (single sign-on, HR systems, and SCORM/xAPI content), so it fits your stack instead of forcing you onto a vendor's ecosystem.",
      link: { text: "custom LMS", href: "/services/custom-lms-development" },
    },
    {
      question: "Why is Docebo so expensive?",
      answer:
        "Docebo targets large enterprises, prices per active user, requires sizable minimum commitments (often 300+ users and multi-year terms), and sells advanced AI, analytics, and connector features as paid add-ons. The model is built for big, long deployments, which is exactly why smaller or flexibility-focused teams look elsewhere.",
    },
    {
      question:
        "Can we migrate off Docebo without losing our content and data?",
      answer:
        "Yes. We migrate courses, learner records, and SCORM/xAPI content from Docebo to a custom-built platform, so you keep your training library and history while leaving the per-seat contract behind.",
    },
  ],
  cta: {
    h2: "Done paying per seat?",
    line: "Tell us about your training program and team size. In 30 minutes, we'll tell you honestly whether owning your LMS beats a per-seat contract for you. No pitch, no obligation.",
  },
};

const talentlms: AlternativeLanding = {
  slug: "talentlms",
  name: "TalentLMS",
  // 5 listed options + the custom-built one = 6.
  metaTitle: "6 Best TalentLMS Alternatives 2026 (Cheaper + Custom-Built) | Rizon",
  metaDescription:
    "The best TalentLMS alternatives for growing training teams, compared on price, user limits, and control, including a custom-built LMS you own with no per-user ceiling.",
  h1: "The Best TalentLMS Alternatives",
  subhead:
    "TalentLMS is an easy, affordable way to start corporate training, but its per-user tiers and platform limits catch up with growing teams. Here's an honest, detailed comparison of the best TalentLMS alternatives, from other LMS platforms to a custom-built one you own outright, with no per-user ceiling.",
  why: {
    h2: "Why teams look for a TalentLMS alternative",
    body: "TalentLMS earns credit for publishing its prices, a rarity in this market, and for being cheap to start: a free plan (up to 5 users, 10 courses) and paid tiers from around $119/month. But teams outgrow it in two predictable ways.\n\nFirst, the cost jumps as you cross user brackets: Core covers up to 40 users (~$119/mo), Grow up to 70 (~$229/mo), Pro up to 100 (~$449/mo, then +$6 per extra user). Every time your headcount crosses a tier, your bill steps up. Second, the simplicity that makes it easy to start becomes a ceiling: as your training gets more sophisticated, you hit the limits of what the platform can do. And, like any hosted LMS, you're working inside a system you don't own or fully control.",
  },
  table: {
    h2: "TalentLMS alternatives compared",
    columns: ["Platform", "Best for", "Cost model (2026)", "Key limitation"],
    rows: [
      ["Docebo", "Enterprise scale + AI features", "Quote-based, ~$25k/yr+", "Expensive, contract lock-in"],
      ["LearnUpon / 360Learning", "Mid-market, collaborative", "Per-seat subscription", "More than TalentLMS, still renting"],
      ["Moodle", "Ownership, open-source", "Free license + hosting/upkeep", "Setup + maintenance burden"],
      ["Absorb LMS", "Polished mid-market corporate", "Quote-based per-seat", "Same subscription model"],
      ["Google Classroom", "Basic teaching", "Free w/ Workspace", "Weak for corporate training/reporting"],
      ["Custom-built (Rizon)", "Owning your LMS, no user ceiling", "One-time build", "Upfront cost"],
    ],
    note: "Prices are indicative as of 2026 and scale with user count. Treat them as ranges, not quotes.",
  },
  options: {
    h2: "The best TalentLMS alternatives, in detail",
    items: [
      {
        name: "Docebo",
        href: "/alternatives/docebo",
        body: "The most common step up from TalentLMS: a powerful, AI-driven enterprise LMS for large or complex programs. The trade-off is cost and commitment: quote-based pricing starting around $25,000/year, per-seat scaling, and multi-year contracts. Right if you've genuinely outgrown TalentLMS's capabilities and have the budget; overkill if you just crossed a user tier.",
      },
      {
        name: "LearnUpon / 360Learning",
        body: "Mid-market hosted platforms with more depth than TalentLMS and a collaborative-learning focus. Generally pricier than TalentLMS but cheaper than Docebo, a reasonable middle ground. Still per-seat and subscription-based, so the fundamental \"cost scales with headcount\" issue remains.",
      },
      {
        name: "Moodle",
        href: "/services/moodle-development",
        body: "The open-source route: free to license, deeply capable, and genuinely owned by you. It removes per-user pricing entirely, but you take on setup and maintenance. Worth it for teams that want ownership and have (or can hire) technical support.",
      },
      {
        name: "Absorb LMS",
        body: "A polished mid-market-to-enterprise platform with a strong admin experience. Quote-based and per-seat like Docebo, often at a friendlier number, but the same rented, headcount-scaling model applies.",
      },
      {
        name: "Google Classroom",
        body: "Free with Google Workspace and simple, but built for classrooms, not corporate training: weak on compliance, reporting, branches, and the structure a real L&D program needs. Fine as a stopgap, not a serious TalentLMS replacement.",
      },
    ],
  },
  custom: {
    h2: "The alternative none of them offer: an LMS you own, with no per-user ceiling",
    body: "Every hosted alternative here charges per active user and gets more expensive as your team grows, so you're always one hire away from the next tier. There's another path most comparison pages skip: a custom-built LMS shaped around your exact training program, that you own completely. No per-user tiers, no subscription, no platform telling you what it can't do. It's built to the sophistication your program actually needs and integrated with your existing systems (SSO, HRIS, SCORM/xAPI).\n\nThe math turns as you grow. Once you're paying for hundreds of users across stepped tiers, the annual total starts to rival a one-time build you'd own outright and never pay per-user for again. TalentLMS is a great place to start; it's just not always where you want to end up. For a team growing past the point where per-user pricing stings, ownership removes the ceiling for good.",
    links: [
      { text: "custom-built LMS", href: "/services/custom-lms-development" },
    ],
  },
  choose: {
    h2: "How to choose the right TalentLMS alternative",
    body: "If you need serious enterprise power and have the budget, Docebo is the step up. LearnUpon and 360Learning are mid-market middle grounds. Moodle keeps you open-source and ownable if you can handle upkeep. And if per-user pricing and platform limits are exactly what you're trying to escape, a custom-built LMS you own removes both, built to your program, with no per-user bill. The faster you're growing, the more the ownership math favors building over renting.",
  },
  faqH2: "TalentLMS alternatives, answered",
  faqs: [
    {
      question: "What is the best TalentLMS alternative?",
      answer:
        "It depends where you're headed. Docebo is the enterprise step up; LearnUpon and 360Learning are mid-market options; Moodle is the ownable open-source route. If per-user pricing and platform limits are your issue, a custom-built LMS you own outright is the strongest long-term alternative.",
    },
    {
      question: "Is there a cheaper alternative to TalentLMS?",
      answer:
        "Moodle is free to license (though it costs staff time to run), and Google Classroom is free for basic needs. Among hosted platforms, pricing is broadly comparable and all charge per user. A custom-built platform has an upfront cost but no per-user fees, which becomes cheaper than TalentLMS as your team grows past its pricing tiers.",
    },
    {
      question: "Why do teams outgrow TalentLMS?",
      answer:
        "Two reasons. Cost steps up each time your active-user count crosses a tier (40, 70, 100, then per-user beyond), and the platform's simplicity becomes a limit as your training grows more sophisticated. Teams move to something more capable, more cost-effective at scale, or fully owned.",
    },
    {
      question:
        "Does a custom LMS integrate with our SSO, HRIS, and SCORM content?",
      answer:
        "Yes. A custom LMS integrates with your existing enterprise systems (single sign-on, HR systems, and SCORM/xAPI content), so it fits your stack instead of forcing you onto a vendor's ecosystem.",
      link: { text: "custom LMS", href: "/services/custom-lms-development" },
    },
    {
      question: "Can we migrate our courses off TalentLMS?",
      answer:
        "Yes. We migrate courses, learner records, and SCORM/xAPI content from TalentLMS to a custom-built platform, so you keep your training content and history while leaving per-user pricing behind.",
    },
  ],
  cta: {
    h2: "Outgrowing your starter LMS?",
    line: "Tell us about your training program and where TalentLMS is holding you back. In 30 minutes, we'll tell you honestly what fits. No pitch, no obligation.",
  },
};

export const alternativePages: AlternativeLanding[] = [
  teachable,
  moodle,
  kajabi,
  thinkific,
  docebo,
  talentlms,
];

export const getAlternativePage = (slug: string) =>
  alternativePages.find((p) => p.slug === slug);
