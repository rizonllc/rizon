import type { Alternative } from "@/types";

// Alternatives live at /alternatives/[slug]. A namespaced route prevents collisions with
// current and planned root pages while keeping every comparison URL short and descriptive.
const commonRows = (
  them: string,
  hosting: string,
  support: string,
) => [
  {
    dimension: "Ownership of code",
    rizon: "You receive the application code and deployment handover.",
    them,
  },
  {
    dimension: "Hosting & maintenance",
    rizon: "Agreed hosting and support plan, with direct access to the stack.",
    them: hosting,
  },
  {
    dimension: "Learner experience",
    rizon: "Designed around your courses, learners, and brand.",
    them: "Uses the product's established interface and configuration options.",
  },
  {
    dimension: "Customization depth",
    rizon: "Features are scoped and built for your workflow.",
    them: "Bounded by product settings, extensions, or vendor roadmap.",
  },
  {
    dimension: "Integrations",
    rizon: "Connect the systems your operation already uses, including SSO, payments, and LTI where required.",
    them: "Available integrations depend on the plan, marketplace, and product support.",
  },
  {
    dimension: "Support model",
    rizon: "Work directly with the team responsible for the build.",
    them: support,
  },
];

const moodleFaqs: Alternative["faqs"] = [
  {
    question: "Is a custom platform more expensive than running Moodle?",
    answer: "Up front, yes. Moodle's code is free; a build is not. The fair comparison is against what Moodle already costs you: hosting, someone who understands the install, plugin upkeep, and the upgrade you keep postponing because you're not sure what it will break. Put real numbers on those and a platform you own can win over a few years.",
  },
  {
    question: "Can you migrate our Moodle courses and user data?",
    answer: "Usually a good part of it. Course content, files, users, and enrolments tend to export cleanly. SCORM packages, gradebook history, and anything a plugin owns each need their own mapping and a test import before I promise a thing.",
  },
  {
    question: "Do we keep SCORM and LTI support?",
    answer: "If you actually use them, yes. I pin the exact versions you depend on and rebuild those launches on purpose, instead of assuming every legacy behavior should carry over.",
  },
  {
    question: "How long does moving off Moodle take?",
    answer: "A focused first release is usually 8 to 12 weeks. A large course library, custom reporting, or several integrations stretches it. You see working software every week rather than waiting months for a reveal.",
  },
  {
    question: "Who hosts it once we leave Moodle?",
    answer: "Your call. I can run and maintain the hosting, or hand you documented infrastructure so your own team or provider takes it. You are not stuck with me to keep the lights on.",
  },
];

const teachableFaqs: Alternative["faqs"] = [
  { question: "Isn't a custom platform far more expensive than Teachable?", answer: "The subscription is cheaper than a build, always. What Teachable doesn't put on the invoice is the sale you lose to a checkout you can't change and the support hours spent explaining a flow the platform won't bend. When your courses are real revenue, that gap is the number that matters." },
  { question: "Do I keep my payment processor and revenue?", answer: "Yes. A custom platform connects to the payment provider you choose, and the money lands in your account without a platform cut on top of the processor fee. Owning the checkout is usually the main reason creators leave." },
  { question: "Can you move my existing courses and students over?", answer: "We export what Teachable makes available, course content, media, and customer records, then rebuild the learning and purchase flows that matter. Before anyone switches, we test buying, enrolment, access, and refunds with real-looking data." },
  { question: "How long until I can sell on the new platform?", answer: "A focused first release usually takes 8 to 12 weeks, built in weekly slices so you can sell as soon as the purchase and delivery paths are proven, not after every feature is polished." },
];

const thinkificFaqs: Alternative["faqs"] = [
  { question: "Is leaving Thinkific worth the cost of a build?", answer: "Only when the platform is costing you sales or hours. If a cohort launch, partner access, or a returning-learner flow keeps turning into a spreadsheet, that spreadsheet is the recurring cost a build is meant to remove. A single self-paced catalogue rarely justifies it." },
  { question: "Will I still control pricing, bundles, and payments?", answer: "More than before. The commerce is built around your pricing rules and your payment provider, so a bundle or a partner deal is a product decision rather than a plan limitation." },
  { question: "Can you migrate courses, learners, and purchase history?", answer: "We inventory courses, media, learners, and purchases first, migrate a sample programme, then test the access rules that make your offer different before asking real learners to move." },
  { question: "How long does the switch take?", answer: "A focused first release is usually 8 to 12 weeks. You review a live build every week, so a bad assumption gets caught while it is still cheap to change." },
];

const kajabiFaqs: Alternative["faqs"] = [
  { question: "Kajabi does everything in one place. Why rebuild?", answer: "The all-in-one is the appeal and eventually the constraint. You rebuild when your learning experience is distinct enough that one suite is deciding too much, or when a permanent workaround sits in the middle of selling or delivering the programme. Not because a button is in the wrong place." },
  { question: "Can I still run email, pages, and payments my way?", answer: "Yes, and you pick the specialist tools instead of inheriting them. Payments, CRM, analytics, and email get chosen for the job and connected, rather than coming bundled with one subscription." },
  { question: "What happens to my members and products in a move?", answer: "We map products, offers, members, media, and the automations that earn their keep. The first release covers the critical learner and purchase journeys; low-value automations get reviewed rather than copied by reflex." },
  { question: "How long does a Kajabi replacement take to launch?", answer: "Usually 8 to 12 weeks for a focused first release, shown to you weekly so the member experience is right before cutover." },
];

const talentlmsFaqs: Alternative["faqs"] = [
  { question: "Is a custom LMS overkill compared with TalentLMS?", answer: "For conventional employee training, TalentLMS is the faster, cheaper move and I'll say so. A build earns its cost when your org chart, compliance evidence, or systems no longer fit a generic group-and-course model, and reporting has become a monthly manual chore." },
  { question: "Can you match our roles, teams, and compliance reporting?", answer: "That's usually the point of the project. We design roles and reporting around your actual departments, managers, contractors, and regulated roles, so the completion evidence comes out of the system instead of a Friday-afternoon CSV join." },
  { question: "Will it connect to our SSO and HR systems?", answer: "Yes, where the API or standard supports it. We confirm the identity provider, the systems of record, and the exact SSO flow during discovery rather than assuming an integration is trivial." },
  { question: "How do you handle historic training records?", answer: "Carefully. Some records should migrate into the new platform; others belong in a retained archive with a clear audit path. We decide which is which before cutover, not after someone goes looking for last year's certificate." },
];

const learndashFaqs: Alternative["faqs"] = [
  { question: "Why leave LearnDash if WordPress already works?", answer: "Keep it while it works. The trigger to leave is when every LMS change starts with a plugin-compatibility check, and a small checkout update means testing the theme, membership plugin, cache layer, and four add-ons. A dedicated application shrinks that surface." },
  { question: "Can we keep WordPress for our marketing site?", answer: "Often the best split. Editorial content can stay in WordPress while the operational LMS moves to a product built for its own workload. We draw that boundary deliberately instead of forcing everything into one system." },
  { question: "Will my courses and purchases survive the migration?", answer: "We audit WordPress content, LearnDash courses, users, purchases, and add-ons before touching production. The aim is to keep the learner experience worth keeping and leave the technical debt behind rather than copy it forward." },
  { question: "How long does a LearnDash rebuild take?", answer: "A focused first release is typically 8 to 12 weeks, delivered in weekly builds so you see the learner journey working before launch." },
];

const doceboFaqs: Alternative["faqs"] = [
  { question: "Docebo is enterprise-grade. When is custom actually better?", answer: "When your training is part of the product, not an internal tool. Customer education, partner enablement, or a proprietary certification model that has to join account health, entitlement, or renewal data outgrows a periodic dashboard export. If your needs match an enterprise LMS, keeping Docebo is the cheaper answer." },
  { question: "Can a build join learning data with our core systems?", answer: "Yes, and that integration is usually the reason to build. We treat it as a real system integration, with an owner and a test for identity, entitlement, and the learning signals that feed the rest of the business." },
  { question: "How do you approach migrating an enterprise LMS?", answer: "The same way you'd run a system integration: identity, content, enrolment rules, completion records, integrations, and reporting each get an owner and an acceptance test. The goal is a controlled cutover, not a heroic weekend." },
  { question: "What does an enterprise build cost and take?", answer: "More than a subscription up front, and it needs active product ownership. A first release still targets 8 to 12 weeks for the core; larger scope extends from there, always shown to you in weekly builds." },
];

const blackboardFaqs: Alternative["faqs"] = [
  { question: "Is replacing Blackboard Learn realistic for an institution?", answer: "Only with a precise case and the people who run those workflows on board. Blackboard remains a practical option when you want an established LMS and its services. Custom makes sense when the student portal has to carry admissions, parent, or programme logic an LMS was never meant to hold." },
  { question: "Will a custom portal support SSO, SIS, and LTI?", answer: "Yes, those are first-class in the build. We confirm the identity provider, the student information system, the required LTI version, and the launch flows during discovery, then build and validate the high-volume paths first." },
  { question: "Who owns student data on a custom platform?", answer: "Your institution controls the application environment and the data-access model. We document roles, exports, retention, and operational responsibilities before launch so governance isn't an afterthought." },
  { question: "How do you migrate off Blackboard without losing records?", answer: "We start with a system map, not a content dump: courses, identities, SIS data, tools, roles, and student-service journeys. High-volume paths migrate and get validated first; the long tail is scheduled with the institution's owners." },
];

export const alternatives: Alternative[] = [
  {
    slug: "moodle",
    competitor: "Moodle",
    category: "Open-source LMS",
    metaTitle: "Moodle Alternative: A Custom LMS You Own | Rizon",
    metaDescription: "A Moodle alternative for teams tired of plugin upkeep and rigid learner flows. Build a custom LMS around your teaching, data, and roadmap, on your terms.",
    heroHeadline: "A Moodle alternative built around how you teach.",
    heroSub: "For the training lead or school IT director who has outgrown Moodle maintenance, Rizon builds the learning product you actually need and hands it over.",
    intro: ["If you're leaving Moodle, there are three real paths: keep maintaining it, move to a hosted LMS, or build the platform around your own teaching model. The third path makes sense when the workarounds have become part of the job.", "I have seen the moment it tips: a course team needs one reporting flow, an engineer asks which of 14 plugins owns it, and nobody can say with confidence what the next upgrade will change. Moodle is capable software. It is also software you have to operate."],
    whoThisIsFor: "This is for Samira, an operations lead who needs a learning product that feels like her organisation rather than an installation assembled over years.",
    whyLeave: [
      { title: "The maintenance becomes a second product", body: "Self-hosted Moodle needs hosting, updates, backups, and somebody who understands the installation. That can be sensible for an institution with that capability. It is a drag when a small training team only wants to publish and improve courses." },
      { title: "Plugins solve a problem, then add another dependency", body: "Moodle's plugin directory is useful. Each added plugin still has a version, compatibility, and ownership question. Moodle's own documentation advises selecting plugins for the precise Moodle version and testing upgrades outside production." },
      { title: "The learner flow starts with Moodle's shape", body: "Themes and configuration change a lot, yet the underlying course experience still starts with Moodle's data model. When your product needs a different enrolment, cohort, payment, or progress flow, that shape becomes visible." },
      { title: "Free software still needs a budget", body: "The Moodle code is open source. Hosting, technical time, monitoring, custom work, and support are not. A realistic comparison includes those costs, not only the licence line." },
    ],
    whereTheyWin: [
      { title: "You have Moodle engineers on staff", body: "A university with experienced Moodle administrators and a disciplined upgrade process can get a great deal from software it can host itself." },
      { title: "You need its mature academic feature set", body: "Moodle has a large plugin community and long history in formal education. Rebuilding a well-used, standards-heavy installation solely for novelty would be wasteful." },
      { title: "A standard course site is enough", body: "If your requirements fit the core product and a known set of plugins, starting there is usually faster than commissioning a custom platform." },
    ],
    comparison: [
      ...commonRows("Open-source code; your team controls the installation it operates.", "Self-hosted or hosted through a Moodle provider; maintenance remains part of the operating model.", "Community, certified partners, or your internal team."),
      { dimension: "Cost model", rizon: "A scoped build plus the hosting and support you choose.", them: "No software licence for self-hosting; hosting, support, and development still cost money." },
      { dimension: "Upgrade risk", rizon: "Changes are planned against your codebase and release process.", them: "Core and plugin upgrades need compatibility checks and testing." },
    ],
    migration: "We start by cataloguing courses, files, users, enrolments, plugins, and integrations. Then we test exports, move a representative course, and agree which historical records should be retained. SCORM packages and LTI integrations get their own acceptance checks; they are not assumed to survive a copy unchanged.",
    faqs: moodleFaqs,
    stat: {
      value: ".mbz backups",
      label: "Moodle's native backup-and-restore format. Before trusting any migration promise, test a real restore. Moodle's own documentation advises checking every plugin against the exact Moodle version and testing upgrades outside production first.",
      source: "Moodle Docs",
      sourceUrl: "https://docs.moodle.org/en/Upgrading",
    },
    keywords: ["Moodle alternative", "custom Moodle alternative", "Moodle migration", "custom LMS"],
    relatedServiceSlug: "school-student-portal-development",
    relatedPostSlugs: ["how-to-migrate-off-moodle-without-losing-course-data", "migrating-from-lti-1-1-to-lti-1-3-a-practical-guide-for-tool-builders"],
  },
  {
    slug: "canvas",
    competitor: "Canvas",
    category: "Cloud LMS (higher-ed/K-12)",
    metaTitle: "Canvas Alternative for Schools That Need Control | Rizon",
    metaDescription: "A Canvas alternative for institutions that need deeper control of their learning product, data, and roadmap while keeping the standards they rely on today.",
    heroHeadline: "When Canvas is too fixed, build the school platform you need.",
    heroSub: "For the school IT director whose programme no longer fits a vendor roadmap, Rizon builds an owned learning platform with the integrations you choose.",
    intro: ["Canvas is a strong choice when an institution wants a mature, hosted LMS with little engineering involvement. A custom Canvas alternative earns its cost when the learning experience itself has become part of your institution's offer.", "The migration conversation should start with the facts. Canvas course exports are IMSCC packages, but Canvas documents that grades, student interactions, and some external-tool configurations do not travel in that export. That is why we map data before promising a switch."],
    whoThisIsFor: "This is for Idriss, a school IT director who needs learner, parent, and staff workflows that Canvas cannot represent cleanly.",
    whyLeave: [
      { title: "Your programme has outgrown a shared product roadmap", body: "A hosted LMS gives you a maintained product and vendor-led releases. It cannot put every institution's unusual workflow at the top of the queue. The friction becomes obvious around admissions, parent access, bespoke reporting, or a paid programme." },
      { title: "Deep product changes have a ceiling", body: "Themes, apps, and APIs help. They do not turn a multi-tenant SaaS product into software designed around one institution's data model and learner journey." },
      { title: "Exports are a starting point, not a complete migration", body: "Canvas supports IMSCC course exports. Its documentation also excludes interaction and grade backups from that package, and notes that some LTI tool configurations are not retained." },
      { title: "You want direct control of the data model", body: "Tenant administration is different from owning the application and its deployment choices. Some teams need the latter for their reporting, integrations, or governance process." },
    ],
    whereTheyWin: [
      { title: "You want a mature LMS without a product team", body: "Canvas is compelling for institutions that want the vendor to run the core platform and accept the product's operating model." },
      { title: "Your needs match its higher-education workflow", body: "Its established course, grading, and integration model is a practical fit for many schools and universities." },
      { title: "You need an existing marketplace now", body: "A custom build should not be chosen merely to recreate integrations Canvas already provides and your team already uses." },
    ],
    comparison: [
      ...commonRows("Canvas is vendor-operated software; institutions administer their tenant rather than the Canvas product code.", "Hosted and maintained by the vendor under the institution's agreement.", "Vendor support and the institution's Canvas administrators."),
      { dimension: "Cost model", rizon: "A scoped build, then the infrastructure and support arrangement you choose.", them: "Commercial agreement; pricing and terms are set with Instructure." },
      { dimension: "Data portability", rizon: "Exports and APIs are designed around the data you need to retain.", them: "Course exports use IMSCC; some records and tool settings require separate exports or migration work." },
    ],
    migration: "We inventory the Canvas account before building: course exports, CSV grade data where needed, identities, enrolments, files, LTI tools, and reporting. We then run an IMSCC import on a representative course and document every item that needs rebuilding. No one should discover a missing grade history after cutover.",
    faqs: [
      { question: "Can you migrate Canvas courses from IMSCC exports?", answer: "Yes, after a sample import. Canvas packages course exports as IMSCC files, while grades, student interactions, and some external-tool configurations need separate handling." },
      { question: "Will a custom platform support SSO and LTI?", answer: "Yes when specified in the build. We confirm the identity provider, required LTI version, launch flows, and existing tools during discovery." },
      { question: "Who owns student data on a custom platform?", answer: "Your organisation controls the application environment and data-access model. We document roles, exports, retention, and operational responsibilities before launch." },
      { question: "Is a custom platform more expensive than Canvas?", answer: "Canvas is priced per seat, so its cost scales with enrolment whether or not you use more of the product. A build costs more on day one and then stops charging you to grow. The comparison worth running is your three-year Canvas spend against a platform you own." },
      { question: "How long does a move off Canvas take?", answer: "A focused first release is usually 8 to 12 weeks. A full institutional migration with SIS data, several LTI tools, and historic records extends that, and we schedule it path by path rather than in one risky cutover." },
    ],
    stat: {
      value: "IMSCC",
      label: "Canvas exports courses as IMS Common Cartridge, but grades, student submissions, and some external-tool settings are not carried in that package. Plan for those records separately, or you discover a missing grade history the week after cutover.",
      source: "Canvas Instructor Guide",
      sourceUrl:
        "https://community.canvaslms.com/t5/Instructor-Guide/How-do-I-export-a-Canvas-course/ta-p/785",
    },
    keywords: ["Canvas alternative", "custom school LMS", "Canvas migration", "student portal development"],
    relatedServiceSlug: "school-student-portal-development",
    relatedPostSlugs: ["exporting-courses-from-canvas-imscc-step-by-step", "canvas-breach-student-data-security"],
  },
  {
    slug: "teachable",
    competitor: "Teachable",
    category: "Course platform",
    metaTitle: "Teachable Alternative for Course Creators | Rizon",
    metaDescription: "A Teachable alternative for course creators who need their own checkout, learner experience, and product roadmap instead of another subscription template.",
    heroHeadline: "A Teachable alternative for a course business that has its own shape.",
    heroSub: "For the creator whose sales, community, or learning experience no longer fit a course-platform template, Rizon builds the product under your brand.",
    intro: ["Teachable gets a first course to market quickly. A custom platform makes sense later, when the checkout, learner journey, or member experience is carrying real revenue and generic settings are costing you sales.", "The tell is usually a small request that keeps coming back: a bundle rule, a cohort flow, or a learner dashboard your support inbox has to explain every week. That is product work, even when it arrives disguised as support."],
    whoThisIsFor: "This is for Lina, a course creator whose education business has grown past a single catalogue and a standard checkout.",
    whyLeave: [
      { title: "Your offer has moved beyond a standard checkout", body: "Course bundles, memberships, applications, affiliate rules, and regional tax flows can turn a simple catalogue into a set of exceptions." },
      { title: "The brand ends where the product settings begin", body: "A theme can look recognisable. The account, course, and progress flows still follow the platform's product decisions." },
      { title: "You want to choose the revenue architecture", body: "A custom build lets you connect the payment provider and reporting model that fit your business, rather than changing your offer around a plan." },
    ],
    whereTheyWin: [
      { title: "You need to launch a conventional course quickly", body: "Teachable is faster and cheaper for a straightforward course catalogue." },
      { title: "You do not want to own software operations", body: "A hosted platform removes the work of running an application." },
    ],
    comparison: [
      ...commonRows("Vendor-operated platform; you manage your school within it.", "Hosted product with platform-managed operations.", "Platform support under your plan."),
      { dimension: "Commerce", rizon: "Checkout and payments designed around your offer and provider.", them: "Built-in commerce and plan-dependent payment options." },
      { dimension: "Cost model", rizon: "Build cost plus services you choose.", them: "Subscription and payment fees according to the current plan and processor." },
    ],
    migration: "We export course assets and customer records that are available, then rebuild the learning and checkout flows that matter. Before cutover, we test purchase, enrolment, access, refund, and support handoff with real-looking data.",
    faqs: teachableFaqs, stat: { value: "2.9% + 30¢", label: "Stripe's standard US online card fee. On an owned platform you pay processing like this and keep the rest; a revenue-share plan takes a cut of every sale on top of it. The gap compounds with volume.", source: "Stripe", sourceUrl: "https://stripe.com/pricing" }, keywords: ["Teachable alternative", "custom course platform", "course platform development"], relatedServiceSlug: "course-platform-for-creators", relatedPostSlugs: ["leaving-teachable-a-migration-checklist", "hidden-cost-of-revenue-share-course-platforms"],
  },
  {
    slug: "thinkific",
    competitor: "Thinkific",
    category: "Course platform",
    metaTitle: "Thinkific Alternative for Custom Course Products | Rizon",
    metaDescription: "A Thinkific alternative for creators and training teams that need custom learner flows, commerce, and reporting rather than another configurable template.",
    heroHeadline: "Keep the course business. Lose the template ceiling.",
    heroSub: "For the creator who has proved demand on Thinkific and now needs a product designed around their offer, Rizon builds an owned course platform.",
    intro: ["Thinkific is a sensible way to validate a course business. Once your course is part of a broader product, the question changes from 'can this platform do it?' to 'why are we forcing the business through this setting?'", "A cohort launch with a waitlist, partner access, and a different experience for returning learners is where the spreadsheet often appears. That spreadsheet is a useful warning."],
    whoThisIsFor: "This is for Nabil, a creator whose repeat learners and partnerships need more than a standard school setup.",
    whyLeave: [{ title: "Your learner paths need to differ", body: "A single course catalogue is simple. Returning buyers, cohorts, employer-paid learners, and partners introduce rules that deserve product design." }, { title: "Reporting needs to answer your questions", body: "When the decision sits in a dashboard you cannot change, teams export data and rebuild the report elsewhere." }, { title: "The roadmap belongs to somebody else", body: "A hosted platform may ship what you need. It may not. A custom build makes the roadmap a commercial decision you control." }],
    whereTheyWin: [{ title: "Your programme fits a standard course platform", body: "Thinkific can be the right answer when its built-in course, payment, and community features cover the job." }, { title: "You value managed hosting above custom product work", body: "A custom application asks for decisions and ongoing ownership. Hosted software avoids much of that." }],
    comparison: [...commonRows("Vendor-operated platform; your school runs inside it.", "Hosted product with vendor-managed releases.", "Platform support and published help resources."), { dimension: "Commerce", rizon: "Built around your pricing, purchase rules, and payment provider.", them: "Platform commerce features and plan-specific capabilities." }, { dimension: "Product roadmap", rizon: "Your priorities determine what is built next.", them: "Shared product roadmap and available settings." }],
    migration: "We inventory courses, media, learners, purchases, and integrations first. Then we migrate a sample programme and test the access rules that make your offer different before asking learners to switch.", faqs: thinkificFaqs, keywords: ["Thinkific alternative", "custom course platform", "online course platform development"], relatedServiceSlug: "course-platform-for-creators",
  },
  {
    slug: "kajabi",
    competitor: "Kajabi",
    category: "Course platform",
    metaTitle: "Kajabi Alternative for an Owned Course Platform | Rizon",
    metaDescription: "A Kajabi alternative for education businesses that need a dedicated learning product, tailored member flows, and control of their technical roadmap, end to end.",
    heroHeadline: "When your education business needs more than an all-in-one box.",
    heroSub: "For the established creator who needs learning, membership, and commerce to work their own way, Rizon builds a platform you control.",
    intro: ["Kajabi can put products, pages, email, and checkout in one place. That convenience is valuable until your learning experience becomes distinct enough that one system is deciding too much for you.", "I would not replace Kajabi because a button is in the wrong place. I would replace it when your team has a permanent workaround for an important part of selling, delivering, or supporting the programme."],
    whoThisIsFor: "This is for Aya, a course-business owner with a clear offer and a growing list of exceptions she no longer wants to run by hand.",
    whyLeave: [{ title: "One suite becomes one constraint", body: "An all-in-one platform reduces integration work. It can also make it hard to choose a specialist tool or build a distinct member experience." }, { title: "Your product needs its own interface", body: "A custom platform makes the course, account, and community flow part of your product instead of a skin on a general-purpose suite." }, { title: "You want choices in the stack", body: "Payments, CRM, analytics, and email can be selected for the job rather than inherited as part of one subscription." }],
    whereTheyWin: [{ title: "You want a single hosted suite", body: "Kajabi is practical for teams that want products, marketing pages, and email in one managed service." }, { title: "Your offer is still simple", body: "For a small catalogue, replacing a working tool with custom software is often unnecessary." }],
    comparison: [...commonRows("Vendor-operated all-in-one platform.", "Hosted subscription product with vendor-managed updates.", "Platform support and account resources."), { dimension: "Stack choices", rizon: "Pick services around your business requirements.", them: "Uses Kajabi's product suite and supported connections." }, { dimension: "Member experience", rizon: "Designed for your programme and brand.", them: "Configured within Kajabi's existing product patterns." }],
    migration: "We map products, offers, members, media, automations, and third-party connections. The first release covers the critical learner and purchase journeys; lower-value automations are reviewed rather than copied by reflex.", faqs: kajabiFaqs, keywords: ["Kajabi alternative", "custom membership platform", "custom course platform"], relatedServiceSlug: "course-platform-for-creators",
  },
  {
    slug: "talentlms",
    competitor: "TalentLMS",
    category: "Corporate LMS",
    metaTitle: "TalentLMS Alternative for Corporate Training | Rizon",
    metaDescription: "A TalentLMS alternative for L&D teams that need training tied to their own roles, reporting, systems, and employee experience. Built around your team.",
    heroHeadline: "Corporate training that fits the company you actually run.",
    heroSub: "For the L&D lead whose teams and compliance reporting no longer fit a generic LMS, Rizon builds the training platform around your operation.",
    intro: ["TalentLMS is an efficient starting point for internal training. A custom alternative is for the company that needs training to connect deeply to its roles, systems, reporting, and employee experience.", "The trigger is rarely one missing feature. It is the quarterly compliance report that still needs a CSV export, a manual join, and a nervous check at 5pm on Friday."],
    whoThisIsFor: "This is for Hana, an L&D lead who must prove training completion across teams with different access rules and systems.",
    whyLeave: [{ title: "Your organisation chart is more complicated than groups", body: "Departments, franchises, contractors, managers, and regulated roles can need different training rules and evidence." }, { title: "Reporting lives outside the LMS", body: "Exports are useful. Persistent manual reporting is a sign the data model needs to match the business." }, { title: "Employee experience needs to feel internal", body: "A learning tool can be functional and still feel disconnected from the systems employees use every day." }],
    whereTheyWin: [{ title: "You need a standard corporate LMS quickly", body: "TalentLMS is a better first move for conventional employee training with limited custom requirements." }, { title: "You want the vendor to run the product", body: "Hosted software reduces the operational responsibility of owning an application." }],
    comparison: [...commonRows("Rizon delivers the code and deployment handover.", "Hosted corporate LMS run by the vendor.", "Vendor support under the subscribed plan."), { dimension: "Roles & reporting", rizon: "Designed around your teams, managers, and compliance evidence.", them: "Configured within the platform's organisation and reporting model." }, { dimension: "SSO & systems", rizon: "Specified integrations are built into the product plan.", them: "Available integrations and SSO depend on plan and product support." }],
    migration: "We map users, groups, courses, completion records, certificates, and identity-provider rules. Historic records are treated carefully: some should migrate, others belong in a retained archive with a clear audit path.", faqs: talentlmsFaqs, keywords: ["TalentLMS alternative", "corporate training platform", "custom corporate LMS"], relatedServiceSlug: "corporate-training-platform",
  },
  {
    slug: "learndash",
    competitor: "LearnDash / WordPress LMS",
    category: "WordPress LMS",
    metaTitle: "LearnDash Alternative: A Custom LMS Beyond WordPress | Rizon",
    metaDescription: "A LearnDash alternative for teams that have outgrown a WordPress LMS and need a dedicated learning product without plugin dependency chains, for your work.",
    heroHeadline: "A dedicated LMS when WordPress has become the bottleneck.",
    heroSub: "For the course operator who is tired of WordPress plugin interactions deciding what ships, Rizon builds a focused learning product you own.",
    intro: ["LearnDash can be a sensible choice when your site and courses belong together. It gets harder when the LMS becomes a product in its own right and every improvement starts with a plugin compatibility check.", "A checkout update should not require checking the WordPress theme, membership plugin, cache layer, and four add-ons. Yet that is the kind of chain teams inherit over time."],
    whoThisIsFor: "This is for Youssef, a course operator whose WordPress site became a learning platform before anyone planned for it.",
    whyLeave: [{ title: "The plugin chain gets long", body: "A WordPress LMS often relies on themes, commerce, membership, page-builder, and add-on decisions that interact in ways no single vendor owns." }, { title: "Performance work has too many moving parts", body: "A dedicated application narrows the technical surface area around the learner journey." }, { title: "Your learning product needs a clearer boundary", body: "Keeping marketing content in WordPress can still make sense. The operational LMS can live in a product built for its own workload." }],
    whereTheyWin: [{ title: "Your site is already a well-managed WordPress property", body: "A small course catalogue may be best served by improving what you have." }, { title: "You need WordPress publishing first", body: "LearnDash is a practical fit when editorial workflows and courses should remain tightly coupled." }],
    comparison: [...commonRows("Dedicated codebase and deployment owned by you.", "WordPress site plus LearnDash and any selected plugins.", "LearnDash, WordPress, host, and plugin vendors share the support surface."), { dimension: "Release risk", rizon: "One application release process tailored to the platform.", them: "Updates can involve WordPress core, theme, LearnDash, and third-party plugins." }, { dimension: "Commerce", rizon: "Built to your chosen payment and access rules.", them: "Usually connected through WordPress commerce or membership tooling." }],
    migration: "We audit WordPress content, LearnDash courses, users, purchases, and add-ons before touching production. The goal is to preserve the learner experience worth keeping and stop copying technical debt into the new build.", faqs: learndashFaqs, keywords: ["LearnDash alternative", "WordPress LMS alternative", "custom LMS development"], relatedServiceSlug: "custom-lms-development",
  },
  {
    slug: "docebo",
    competitor: "Docebo",
    category: "Corporate LMS",
    metaTitle: "Docebo Alternative for Custom Enterprise Training | Rizon",
    metaDescription: "A Docebo alternative for companies that need a training product built around their operations, data model, and employee or customer experience, and roadmap.",
    heroHeadline: "For training programmes that cannot live inside a vendor template.",
    heroSub: "For the enterprise training owner with specialised workflows and a real product requirement, Rizon builds a custom platform around the work.",
    intro: ["Docebo is built for organisations that want an enterprise LMS without building one. It is a poor trade to replace it unless your operating model needs something the product cannot give you.", "Custom work starts to make sense when training data must join with product usage, partner status, or a proprietary certification model. A dashboard export at the end of the month does not solve that design problem."],
    whoThisIsFor: "This is for Omar, a training-product owner whose customers and partners need a learning experience connected to the company's own systems.",
    whyLeave: [
      { title: "Your training is part of the product", body: "Customer education, partner enablement, and certification can need workflows that look closer to a product than an internal LMS." },
      { title: "The data needs to join your core systems", body: "When learning signals affect account health, entitlement, or renewal work, the integration deserves more than a periodic export." },
      { title: "You want to choose what gets built", body: "A vendor roadmap has to serve many customers. A custom roadmap serves the business case you can justify." },
    ],
    whereTheyWin: [
      { title: "You need established enterprise LMS capability", body: "Docebo is a credible choice for organisations whose requirements match an enterprise LMS and who want vendor-managed delivery." },
      { title: "You do not need a differentiated learner product", body: "A custom build has a higher initial cost and needs active product ownership." },
    ],
    comparison: [...commonRows("Application code and deployment decisions are handed to your organisation.", "Vendor-operated enterprise LMS.", "Vendor support and services under your agreement."), { dimension: "Enterprise workflow", rizon: "Purpose-built around your customers, partners, and internal processes.", them: "Configured within the platform's enterprise LMS capabilities." }, { dimension: "Roadmap", rizon: "Priorities are set by your business case.", them: "Shared vendor roadmap plus available configuration and services." }],
    migration: "We plan the migration with the same care as a system integration: identity, content, enrolment rules, completion records, integrations, and reporting each get an owner and a test. The objective is a controlled cutover, not a heroic weekend.", faqs: doceboFaqs, keywords: ["Docebo alternative", "custom enterprise LMS", "training platform development"], relatedServiceSlug: "corporate-training-platform",
  },
  {
    slug: "blackboard",
    competitor: "Blackboard Learn",
    category: "Higher-education LMS",
    metaTitle: "Blackboard Alternative for a Custom Student Portal | Rizon",
    metaDescription: "A Blackboard alternative for institutions that need a modern, tailored student portal while keeping the standards and workflows their programme requires.",
    heroHeadline: "A Blackboard alternative for the student experience you want to own.",
    heroSub: "For the institution whose student portal has to do more than deliver courses, Rizon builds the workflows, integrations, and experience around your school.",
    intro: ["Blackboard Learn suits institutions that need an established LMS and vendor support. A custom alternative is for the school whose portal must carry its own admissions, parent, services, or programme logic.", "The student notices the seams first. A course sits in one system, a timetable in another, and a support request needs a third login. Fixing those seams can be a better project than replacing an LMS for fashion."],
    whoThisIsFor: "This is for Salma, a university digital-services lead who wants the student portal to feel like one coherent service.",
    whyLeave: [{ title: "The portal has more jobs than the LMS", body: "Student, parent, instructor, and administrative work can need a shared front door that an LMS alone was never intended to provide." }, { title: "Institution-specific flows matter", body: "Programme requirements, services, and data rules are often local. A custom platform can make those first-class rather than peripheral." }, { title: "You need direct design control", body: "A branded theme does not always solve the interaction and information-architecture problems students face." }],
    whereTheyWin: [{ title: "You need a full conventional LMS now", body: "Blackboard Learn remains a practical option for institutions that want an established product and associated services." }, { title: "Your programme depends on its current workflows", body: "Replacement only makes sense with a precise migration case and commitment from the people who run those workflows." }],
    comparison: [...commonRows("Institution-owned application code and deployment handover.", "Vendor-operated LMS configured for the institution.", "Vendor support and institutional administrators."), { dimension: "Student portal scope", rizon: "Can combine learning with the portal workflows your school chooses.", them: "Centres on Blackboard Learn's LMS product model and integrations." }, { dimension: "Integrations", rizon: "Built around required SSO, SIS, LTI, and service connections.", them: "Uses supported integrations and institutional configuration." }],
    migration: "We start with a system map, not a content dump: courses, identities, SIS data, tools, roles, and student-service journeys. We migrate and validate the high-volume paths first, then schedule the long tail with the institution's owners.", faqs: blackboardFaqs, keywords: ["Blackboard alternative", "custom student portal", "school portal development"], relatedServiceSlug: "school-student-portal-development",
  },
];

export function getAlternativeBySlug(slug: string): Alternative | undefined {
  return alternatives.find((alternative) => alternative.slug === slug);
}
