import type { Post } from "@/types";
import type { MDXContent } from "mdx/types";
import cheatingExamsCover from "@/assets/blog/cheating-online-exams-what-actually-works.png";
import canvasBreachCover from "@/assets/blog/canvas-breach-student-data-security.png";
import ltiMigrationBreachCover from "@/assets/blog/migrating-from-lti-1-1-to-lti-1-3-a-practical-guide-for-tool-builders.png";
import customLmsCostCover from "@/assets/blog/custom-lms-cost-2026.svg";
import buildVsBuyCover from "@/assets/blog/build-vs-buy-lms.svg";
import revenueShareCover from "@/assets/blog/revenue-share-course-platforms.svg";
import threeYearTcoCover from "@/assets/blog/lms-three-year-tco.svg";
import buildCostDriversCover from "@/assets/blog/elearning-build-cost-drivers.svg";
import migrateOffMoodleCover from "@/assets/blog/migrate-off-moodle.svg";
import canvasImsccCover from "@/assets/blog/canvas-imscc-export.svg";
import leavingTeachableCover from "@/assets/blog/leaving-teachable.svg";
import scormVsXapiCover from "@/assets/blog/scorm-vs-xapi.svg";
import smoothMigrationCover from "@/assets/blog/smooth-lms-migration.svg";
import lti13AdvantageCover from "@/assets/blog/lti-13-advantage.svg";
import studentDataSecurityCover from "@/assets/blog/student-data-security-checklist.svg";
import ssoLearningPlatformsCover from "@/assets/blog/sso-learning-platforms.svg";
import assessmentsCheatingCover from "@/assets/blog/assessments-resist-cheating.svg";
import whatsImsccCover from "@/assets/blog/whats-an-imscc-file.png";
import wcagAccessibilityCover from "@/assets/blog/wcag-accessibility-learning-platforms.svg";
import multiTenantLmsCover from "@/assets/blog/multi-tenant-lms.svg";
import ferpaEdtechCover from "@/assets/blog/ferpa-edtech-compliance.svg";

export const posts: Post[] = [
  {
    slug: "connect-woocommerce-to-moodle-with-edwiser-bridge",
    title: "How to Connect WooCommerce to Moodle With Edwiser Bridge",
    description:
      "Edwiser Bridge links WooCommerce and Moodle so a course purchase creates the account and enrolls the buyer automatically. Here's the setup, the order-to-enrollment flow, and where the pairing runs out of road.",
    date: "2026-09-07",
    readTime: "5 min read",
    category: "Integration",
    relatedServiceSlugs: ["woocommerce-to-moodle", "custom-lms-development"],
    relatedPostSlugs: ["hidden-cost-of-revenue-share-course-platforms", "sso-options-for-learning-platforms"],
    authorSlug: "choaib-mouhrach",
  },
  {
    slug: "moodle-5-0-release-notes-and-upgrade-guide",
    title: "Moodle 5.0 Release Notes and Upgrade Guide",
    description:
      "Moodle 5.0 shipped April 2025 and is already end of life, but its requirement changes carry forward: PHP 8.2, raised database floors, Bootstrap 5, and the permanent removal of Atto, Oracle, Chat, Survey, and MNet.",
    date: "2026-08-11",
    readTime: "10 min read",
    category: "Moodle",
    relatedServiceSlugs: ["moodle-development"],
    relatedPostSlugs: ["ai-in-an-lms-what-actually-helps", "sso-options-for-learning-platforms"],
    authorSlug: "choaib-mouhrach",
  },
  {
    slug: "moodle-router-not-correctly-configured",
    title: "Moodle 5.2 Router Is Not Correctly Configured",
    description:
      "Fix Moodle 5.2 router errors where routed PHP-looking paths return 404 instead of reaching r.php, including Apache PHP-FPM, FallbackResource, Nginx, and shared-hosting rules.",
    date: "2026-08-10",
    readTime: "8 min read",
    category: "Moodle",
    relatedServiceSlugs: ["moodle-development"],
    relatedPostSlugs: ["moodle-5-2-shared-hosting", "moodle-file-picker-stuck-loading"],
    authorSlug: "choaib-mouhrach",
  },
  {
    slug: "moodle-5-2-windows-install",
    title: "How to Install Moodle 5.2 on Windows",
    description:
      "A practical Moodle 5.2 Windows install checklist for IIS, FastCGI, PHP 8.3, database setup, the public directory, routing, file permissions, cron, and common errors.",
    date: "2026-08-10",
    readTime: "9 min read",
    category: "Moodle",
    relatedServiceSlugs: ["moodle-development"],
    relatedPostSlugs: ["moodle-router-not-correctly-configured", "moodle-vendor-directory-not-found"],
    authorSlug: "choaib-mouhrach",
  },
  {
    slug: "moodle-vendor-directory-not-found",
    title: "Moodle Composer Vendor Directory Not Found",
    description:
      "What Moodle's Composer vendor directory error means, how to run the production Composer install command from the Moodle root, and what to do on shared hosting.",
    date: "2026-08-10",
    readTime: "7 min read",
    category: "Moodle",
    relatedServiceSlugs: ["moodle-development"],
    relatedPostSlugs: ["moodle-5-2-shared-hosting", "moodle-router-not-correctly-configured"],
    authorSlug: "choaib-mouhrach",
  },
  {
    slug: "moodle-file-picker-stuck-loading",
    title: "Moodle File Picker Stuck Loading After Upgrade to 5.2",
    description:
      "Troubleshoot Moodle 5.2 file picker and upload boxes that keep loading after an upgrade, from cache purge and browser errors to plugins, routing, cron, and moodledata permissions.",
    date: "2026-08-10",
    readTime: "8 min read",
    category: "Moodle",
    relatedServiceSlugs: ["moodle-development"],
    relatedPostSlugs: ["moodle-router-not-correctly-configured", "what-a-smooth-lms-migration-actually-looks-like"],
    authorSlug: "choaib-mouhrach",
  },
  {
    slug: "moodle-5-2-shared-hosting",
    title: "Can Moodle 5.2 Run on Shared Hosting?",
    description:
      "A realistic guide to Moodle 5.2 on shared hosting, including cPanel, Hostinger, GoDaddy, public directory setup, symlinks, router rules, Composer, cron, and when to use a VPS.",
    date: "2026-08-10",
    readTime: "8 min read",
    category: "Moodle",
    relatedServiceSlugs: ["moodle-development"],
    relatedPostSlugs: ["moodle-router-not-correctly-configured", "moodle-vendor-directory-not-found"],
    authorSlug: "choaib-mouhrach",
  },
  {
    slug: "lms-reporting-and-analytics-what-you-actually-need",
    title: "LMS Reporting and Analytics: What You Actually Need",
    description:
      "Most LMS dashboards count activity without helping anyone act. Here is how to design useful operational, learning, commercial, and outcome reporting, choose honest metrics, and build data people can trust.",
    date: "2026-07-24",
    readTime: "8 min read",
    category: "Analytics",
    relatedServiceSlugs: ["custom-lms-development"],
    relatedAlternativeSlugs: ["moodle"],
    relatedPostSlugs: ["what-gdpr-requires-from-an-elearning-platform", "what-a-multi-tenant-lms-is-and-when-you-need-one", "scorm-vs-xapi-keeping-your-content-portable"],
    authorSlug: "choaib-mouhrach",
  },
  {
    slug: "what-gdpr-requires-from-an-elearning-platform",
    title: "What GDPR Actually Requires From an E-Learning Platform",
    description:
      "GDPR for an LMS is not a cookie banner. It shapes what learner data you collect, who controls it, how rights requests work, which vendors receive it, and when analytics or AI requires a DPIA.",
    date: "2026-07-25",
    readTime: "8 min read",
    category: "Compliance",
    relatedServiceSlugs: ["custom-lms-development"],
    relatedAlternativeSlugs: ["moodle"],
    relatedPostSlugs: ["what-ferpa-actually-requires-of-an-edtech-platform", "student-data-security-checklist-for-edtech-teams", "ai-in-an-lms-what-actually-helps"],
    authorSlug: "choaib-mouhrach",
  },
  {
    slug: "ai-in-an-lms-what-actually-helps",
    title: "AI in an LMS: What Actually Helps",
    description:
      "Every learning platform claims to have AI. Here is what genuinely saves time, what is mostly demo theater, and the questions to ask about student data, grading, bias, and cost before you buy or build it.",
    date: "2026-07-26",
    readTime: "8 min read",
    category: "AI",
    relatedServiceSlugs: ["custom-lms-development"],
    relatedAlternativeSlugs: ["moodle", "docebo"],
    relatedPostSlugs: ["what-ferpa-actually-requires-of-an-edtech-platform", "what-actually-drives-the-price-of-an-e-learning-build", "cheating-online-exams-what-actually-works"],
    authorSlug: "choaib-mouhrach",
  },
  {
    slug: "what-ferpa-actually-requires-of-an-edtech-platform",
    title: "What FERPA Actually Requires of an Edtech Platform",
    description:
      "There is no FERPA certificate. It is a set of obligations that reach you through the contracts schools sign. Here is how a vendor is legally allowed to touch student data, what FERPA asks you to build, and the other privacy laws in the room.",
    date: "2026-07-27",
    readTime: "8 min read",
    category: "Compliance",
    coverImage: ferpaEdtechCover,
    relatedServiceSlugs: ["school-student-portal-development"],
        relatedPostSlugs: ["student-data-security-checklist-for-edtech-teams", "canvas-breach-student-data-security", "what-wcag-2-2-aa-requires-from-a-learning-platform"],
    authorSlug: "choaib-mouhrach",
  },
  {
    slug: "what-a-multi-tenant-lms-is-and-when-you-need-one",
    title: "What a Multi-Tenant LMS Actually Is, and When You Need One",
    description:
      "Multi-tenancy means one platform serving many walled-off client organizations, each with its own users, branding, admins, and reports. Here is the honest test for whether you need it, the three ways it gets built, and the parts teams forget until they hurt.",
    date: "2026-07-28",
    readTime: "8 min read",
    category: "Platform Strategy",
    coverImage: multiTenantLmsCover,
    relatedServiceSlugs: ["corporate-training-platform"],
    relatedAlternativeSlugs: ["moodle", "docebo"],
    relatedPostSlugs: ["build-vs-buy-an-lms-the-honest-math", "custom-lms-vs-off-the-shelf-total-cost-of-ownership-over-three-years", "sso-options-for-learning-platforms"],
    authorSlug: "choaib-mouhrach",
  },
  {
    slug: "what-wcag-2-2-aa-requires-from-a-learning-platform",
    title: "What WCAG 2.2 AA Actually Requires From a Learning Platform",
    description:
      "Accessibility for an LMS is now a legal requirement with deadlines: ADA Title II lands in 2026, and the EU's Accessibility Act is already in force. Here is what WCAG 2.2 AA asks, where learning platforms break, and why it is cheap to build in and costly to bolt on.",
    date: "2026-07-29",
    readTime: "9 min read",
    category: "Accessibility",
    coverImage: wcagAccessibilityCover,
    relatedServiceSlugs: ["custom-lms-development"],
    relatedAlternativeSlugs: ["moodle"],
    relatedPostSlugs: ["student-data-security-checklist-for-edtech-teams", "what-actually-drives-the-price-of-an-e-learning-build", "designing-assessments-that-resist-cheating"],
    authorSlug: "choaib-mouhrach",
  },
  {
    slug: "whats-an-imscc-file",
    title: "What's an IMSCC File?",
    description:
      "An IMSCC file is a course, packaged: pages, assignments, quiz questions, and a manifest that maps the structure. Here is what the Common Cartridge carries, what it deliberately leaves behind, and when you'll run into one.",
    date: "2026-07-22",
    readTime: "5 min read",
    category: "Standards",
    coverImage: whatsImsccCover,
    relatedServiceSlugs: ["custom-lms-development"],
    relatedAlternativeSlugs: ["moodle"],
    relatedPostSlugs: ["exporting-courses-from-canvas-imscc-step-by-step", "scorm-vs-xapi-keeping-your-content-portable", "what-a-smooth-lms-migration-actually-looks-like"],
    authorSlug: "choaib-mouhrach",
  },
  {
    slug: "how-much-does-a-custom-lms-cost-in-2026",
    title: "How Much Does a Custom LMS Cost in 2026?",
    description:
      "Custom LMS pricing moves with the hard parts: distinct learner flows, migration, integrations, and how far reporting has to go. Here is what actually moves the number, what a useful first release includes, and what to ask before you accept a quote.",
    date: "2026-07-19",
    readTime: "6 min read",
    category: "Platform Strategy",
    coverImage: customLmsCostCover,
    relatedServiceSlugs: ["custom-lms-development"],
    relatedAlternativeSlugs: ["moodle"],
    relatedPostSlugs: ["build-vs-buy-an-lms-the-honest-math", "custom-lms-vs-off-the-shelf-total-cost-of-ownership-over-three-years", "what-actually-drives-the-price-of-an-e-learning-build"],
    authorSlug: "choaib-mouhrach",
  },
  {
    slug: "build-vs-buy-an-lms-the-honest-math",
    title: "Build vs. Buy an LMS: The Honest Math",
    description:
      "The right comparison is not a monthly licence against a one-time build. It is three years of subscriptions, staff workarounds, integrations, revenue constraints, and ownership.",
    date: "2026-07-17",
    readTime: "7 min read",
    category: "Platform Strategy",
    coverImage: buildVsBuyCover,
    relatedServiceSlugs: ["custom-lms-development"],
    relatedAlternativeSlugs: ["moodle"],
    relatedPostSlugs: ["how-much-does-a-custom-lms-cost-in-2026", "custom-lms-vs-off-the-shelf-total-cost-of-ownership-over-three-years", "what-actually-drives-the-price-of-an-e-learning-build"],
    authorSlug: "choaib-mouhrach",
  },
  {
    slug: "hidden-cost-of-revenue-share-course-platforms",
    title: "The Hidden Cost of Revenue-Share Course Platforms",
    description:
      "Revenue share can be a sensible way to launch. Follow a $500 sale through platform and processing fees, then add the operational exceptions before deciding whether the model still fits.",
    date: "2026-07-15",
    readTime: "6 min read",
    category: "Creator Economics",
    coverImage: revenueShareCover,
    relatedServiceSlugs: ["custom-lms-development"],
    relatedAlternativeSlugs: ["teachable", "thinkific"],
    relatedPostSlugs: ["build-vs-buy-an-lms-the-honest-math", "custom-lms-vs-off-the-shelf-total-cost-of-ownership-over-three-years", "what-actually-drives-the-price-of-an-e-learning-build"],
    authorSlug: "choaib-mouhrach",
  },
  {
    slug: "custom-lms-vs-off-the-shelf-total-cost-of-ownership-over-three-years",
    title: "Custom LMS vs. Off-the-Shelf: Total Cost of Ownership Over Three Years",
    description:
      "Hosted software usually costs less in year one. This three-year model counts the licence, setup, staff workarounds, integrations, migration, and the rules that affect revenue.",
    date: "2026-07-12",
    readTime: "7 min read",
    category: "Platform Strategy",
    coverImage: threeYearTcoCover,
    relatedServiceSlugs: ["custom-lms-development"],
    relatedAlternativeSlugs: ["moodle"],
    relatedPostSlugs: ["how-much-does-a-custom-lms-cost-in-2026", "build-vs-buy-an-lms-the-honest-math", "what-actually-drives-the-price-of-an-e-learning-build"],
    authorSlug: "choaib-mouhrach",
  },
  {
    slug: "what-actually-drives-the-price-of-an-e-learning-build",
    title: "What Actually Drives the Price of an E-Learning Build",
    description:
      "Roles, migration, integrations, business rules, and launch quality move an e-learning estimate far more than a polished lesson screen. Here is how to scope the first release honestly.",
    date: "2026-07-10",
    readTime: "6 min read",
    category: "Platform Strategy",
    coverImage: buildCostDriversCover,
    relatedServiceSlugs: ["custom-lms-development"],
    relatedAlternativeSlugs: ["moodle"],
    relatedPostSlugs: ["how-much-does-a-custom-lms-cost-in-2026", "build-vs-buy-an-lms-the-honest-math", "custom-lms-vs-off-the-shelf-total-cost-of-ownership-over-three-years"],
    authorSlug: "choaib-mouhrach",
  },
  {
    slug: "how-to-migrate-off-moodle-without-losing-course-data",
    title: "How to Migrate Off Moodle Without Losing Course Data",
    description:
      "You don't lose Moodle data by exporting it wrong. You lose it by exporting before you know which plugins own a business rule. Inventory those first, then move the content.",
    date: "2026-07-18",
    readTime: "6 min read",
    category: "Migration",
    coverImage: migrateOffMoodleCover,
    relatedServiceSlugs: ["custom-lms-development"],
    relatedAlternativeSlugs: ["moodle"],
    relatedPostSlugs: ["scorm-vs-xapi-keeping-your-content-portable", "what-a-smooth-lms-migration-actually-looks-like"],
    authorSlug: "choaib-mouhrach",
  },
  {
    slug: "exporting-courses-from-canvas-imscc-step-by-step",
    title: "Exporting Your Courses From Canvas (IMSCC), Step by Step",
    description:
      "A Canvas IMSCC export moves your course content well. It does not carry grades, student submissions, or every external-tool setting. Here is the step-by-step and the gaps at each step.",
    date: "2026-07-16",
    readTime: "6 min read",
    category: "Migration",
    coverImage: canvasImsccCover,
    relatedServiceSlugs: ["school-student-portal-development"],
        relatedPostSlugs: ["what-a-smooth-lms-migration-actually-looks-like", "scorm-vs-xapi-keeping-your-content-portable", "canvas-breach-student-data-security"],
    authorSlug: "choaib-mouhrach",
  },
  {
    slug: "leaving-teachable-a-migration-checklist",
    title: "Leaving Teachable: A Migration Checklist",
    description:
      "The announcement email is the last step, not the first. Before it goes out, a paying customer should log into the new platform and find everything they own. Here is the checklist that gets you there.",
    date: "2026-07-14",
    readTime: "5 min read",
    category: "Migration",
    coverImage: leavingTeachableCover,
    relatedServiceSlugs: ["course-platform-for-creators"],
    relatedAlternativeSlugs: ["teachable"],
    relatedPostSlugs: ["hidden-cost-of-revenue-share-course-platforms", "what-a-smooth-lms-migration-actually-looks-like"],
    authorSlug: "choaib-mouhrach",
  },
  {
    slug: "scorm-vs-xapi-keeping-your-content-portable",
    title: "SCORM vs xAPI: Keeping Your Content Portable",
    description:
      "SCORM makes your content portable between systems. xAPI makes your records portable, because they live in a store you can own. If you only move the ZIP, you've moved the least valuable half.",
    date: "2026-07-13",
    readTime: "6 min read",
    category: "Standards",
    coverImage: scormVsXapiCover,
    relatedServiceSlugs: ["custom-lms-development"],
    relatedAlternativeSlugs: ["moodle"],
    relatedPostSlugs: ["how-to-migrate-off-moodle-without-losing-course-data", "exporting-courses-from-canvas-imscc-step-by-step"],
    authorSlug: "choaib-mouhrach",
  },
  {
    slug: "what-a-smooth-lms-migration-actually-looks-like",
    title: "What a Smooth LMS Migration Actually Looks Like",
    description:
      "A smooth migration is boring on purpose: staged, risk-first, one real audience before everyone. The war stories come from the single-weekend switch that bet nothing was hiding in the data.",
    date: "2026-07-11",
    readTime: "6 min read",
    category: "Migration",
    coverImage: smoothMigrationCover,
    relatedServiceSlugs: ["custom-lms-development"],
    relatedAlternativeSlugs: ["moodle"],
    relatedPostSlugs: ["how-to-migrate-off-moodle-without-losing-course-data", "leaving-teachable-a-migration-checklist"],
    authorSlug: "choaib-mouhrach",
  },
  {
    slug: "lti-1-3-advantage-explained-without-the-spec-speak",
    title: "LTI 1.3 Advantage, Explained Without the Spec-Speak",
    description:
      "LTI 1.3 lets a tool launch securely from an LMS, then talk back through three services: rosters, grades, and content. Understand it by following one grade from a quiz home to the gradebook.",
    date: "2026-07-09",
    readTime: "6 min read",
    category: "LTI",
    coverImage: lti13AdvantageCover,
    relatedServiceSlugs: ["lti-development"],
    relatedAlternativeSlugs: ["moodle"],
    relatedPostSlugs: ["migrating-from-lti-1-1-to-lti-1-3-a-practical-guide-for-tool-builders", "sso-options-for-learning-platforms"],
    authorSlug: "choaib-mouhrach",
  },
  {
    slug: "student-data-security-checklist-for-edtech-teams",
    title: "A Student-Data Security Checklist for Edtech Teams",
    description:
      "The damage in education data rarely comes from a clever hack. It comes from the wrong person seeing the wrong record. Start your security work with access design, not firewalls.",
    date: "2026-07-08",
    readTime: "6 min read",
    category: "Security",
    coverImage: studentDataSecurityCover,
    relatedServiceSlugs: ["school-student-portal-development"],
        relatedPostSlugs: ["canvas-breach-student-data-security", "sso-options-for-learning-platforms"],
    authorSlug: "choaib-mouhrach",
  },
  {
    slug: "sso-options-for-learning-platforms",
    title: "SSO Options for Learning Platforms (and Which to Pick)",
    description:
      "Most SSO decisions obsess over the login and forget provisioning and clean offboarding, the two moments that cause incidents. SAML, OIDC, and SCIM, compared for how people join and leave.",
    date: "2026-07-07",
    readTime: "6 min read",
    category: "Identity",
    coverImage: ssoLearningPlatformsCover,
    relatedServiceSlugs: ["corporate-training-platform"],
    relatedAlternativeSlugs: ["docebo", "talentlms"],
    relatedPostSlugs: ["student-data-security-checklist-for-edtech-teams", "lti-1-3-advantage-explained-without-the-spec-speak"],
    authorSlug: "choaib-mouhrach",
  },
  {
    slug: "designing-assessments-that-resist-cheating",
    title: "Designing Assessments That Resist Cheating",
    description:
      "The most cheating-resistant assessment isn't the one with the most surveillance. It's the one where copying an answer doesn't help. Redesign the task before you reach for a proctoring tool.",
    date: "2026-07-06",
    readTime: "6 min read",
    category: "Assessment Design",
    coverImage: assessmentsCheatingCover,
    relatedServiceSlugs: ["custom-lms-development"],
    relatedAlternativeSlugs: ["moodle"],
    relatedPostSlugs: ["cheating-online-exams-what-actually-works", "student-data-security-checklist-for-edtech-teams"],
    authorSlug: "choaib-mouhrach",
  },
  {
    slug: "migrating-from-lti-1-1-to-lti-1-3-a-practical-guide-for-tool-builders",
    title:
      "Migrating From LTI 1.1 to LTI 1.3: A Practical Guide for Tool Builders",
    description:
      "If your integration still runs on LTI 1.1, it's now a migration item on a clock. Here is a practical, step-by-step guide to navigating the new security model and LTI Advantage.",
    date: "2026-06-17",
    readTime: "7 min read",
    category: "LTI",
    coverImage: ltiMigrationBreachCover,
    relatedServiceSlugs: ["lti-development", "lti-1-1-to-1-3-migration"],
    relatedAlternativeSlugs: ["moodle"],
    relatedPostSlugs: ["lti-1-3-advantage-explained-without-the-spec-speak", "canvas-breach-student-data-security", "cheating-online-exams-what-actually-works"],
    authorSlug: "choaib-mouhrach",
  },
  {
    slug: "canvas-breach-student-data-security",
    title:
      "The Canvas Breach Should Change How Every Education Company Thinks About Student Data",
    description:
      "The Canvas breach wasn't a sophisticated attack. It was a basic mistake that scaled. Here's the real lesson for anyone building or running a learning platform.",
    date: "2026-06-10",
    readTime: "6 min read",
    category: "Security",
    coverImage: canvasBreachCover,
    relatedServiceSlugs: ["school-student-portal-development"],
        relatedPostSlugs: ["student-data-security-checklist-for-edtech-teams", "migrating-from-lti-1-1-to-lti-1-3-a-practical-guide-for-tool-builders", "cheating-online-exams-what-actually-works"],
    authorSlug: "choaib-mouhrach",
  },
  {
    slug: "cheating-online-exams-what-actually-works",
    title:
      "You Can't Stop Students From Cheating on Online Exams. Here's What Actually Works.",
    description:
      "Surveillance tools feel like control until they get bypassed. The platforms that get assessment right spend their budget on exam design, not monitoring.",
    date: "2026-06-01",
    readTime: "7 min read",
    category: "Assessment Design",
    coverImage: cheatingExamsCover,
    relatedServiceSlugs: ["custom-lms-development"],
    relatedAlternativeSlugs: ["moodle"],
    relatedPostSlugs: ["designing-assessments-that-resist-cheating", "migrating-from-lti-1-1-to-lti-1-3-a-practical-guide-for-tool-builders", "canvas-breach-student-data-security"],
    authorSlug: "choaib-mouhrach",
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export async function getPostContent(slug: string) {
  const contentLoaders: Record<string, () => Promise<{ default: MDXContent }>> = {
    "connect-woocommerce-to-moodle-with-edwiser-bridge": () => import("@/content/blog/connect-woocommerce-to-moodle-with-edwiser-bridge.mdx"),
    "lms-reporting-and-analytics-what-you-actually-need": () => import("@/content/blog/lms-reporting-and-analytics-what-you-actually-need.mdx"),
    "moodle-5-0-release-notes-and-upgrade-guide": () => import("@/content/blog/moodle-5-0-release-notes-and-upgrade-guide.mdx"),
    "moodle-router-not-correctly-configured": () => import("@/content/blog/moodle-router-not-correctly-configured.mdx"),
    "moodle-5-2-windows-install": () => import("@/content/blog/moodle-5-2-windows-install.mdx"),
    "moodle-vendor-directory-not-found": () => import("@/content/blog/moodle-vendor-directory-not-found.mdx"),
    "moodle-file-picker-stuck-loading": () => import("@/content/blog/moodle-file-picker-stuck-loading.mdx"),
    "moodle-5-2-shared-hosting": () => import("@/content/blog/moodle-5-2-shared-hosting.mdx"),
    "what-gdpr-requires-from-an-elearning-platform": () => import("@/content/blog/what-gdpr-requires-from-an-elearning-platform.mdx"),
    "ai-in-an-lms-what-actually-helps": () => import("@/content/blog/ai-in-an-lms-what-actually-helps.mdx"),
    "what-ferpa-actually-requires-of-an-edtech-platform": () => import("@/content/blog/what-ferpa-actually-requires-of-an-edtech-platform.mdx"),
    "what-a-multi-tenant-lms-is-and-when-you-need-one": () => import("@/content/blog/what-a-multi-tenant-lms-is-and-when-you-need-one.mdx"),
    "what-wcag-2-2-aa-requires-from-a-learning-platform": () => import("@/content/blog/what-wcag-2-2-aa-requires-from-a-learning-platform.mdx"),
    "whats-an-imscc-file": () => import("@/content/blog/whats-an-imscc-file.mdx"),
    "how-much-does-a-custom-lms-cost-in-2026": () => import("@/content/blog/how-much-does-a-custom-lms-cost-in-2026.mdx"),
    "build-vs-buy-an-lms-the-honest-math": () => import("@/content/blog/build-vs-buy-an-lms-the-honest-math.mdx"),
    "hidden-cost-of-revenue-share-course-platforms": () => import("@/content/blog/hidden-cost-of-revenue-share-course-platforms.mdx"),
    "custom-lms-vs-off-the-shelf-total-cost-of-ownership-over-three-years": () => import("@/content/blog/custom-lms-vs-off-the-shelf-total-cost-of-ownership-over-three-years.mdx"),
    "what-actually-drives-the-price-of-an-e-learning-build": () => import("@/content/blog/what-actually-drives-the-price-of-an-e-learning-build.mdx"),
    "how-to-migrate-off-moodle-without-losing-course-data": () => import("@/content/blog/how-to-migrate-off-moodle-without-losing-course-data.mdx"),
    "exporting-courses-from-canvas-imscc-step-by-step": () => import("@/content/blog/exporting-courses-from-canvas-imscc-step-by-step.mdx"),
    "leaving-teachable-a-migration-checklist": () => import("@/content/blog/leaving-teachable-a-migration-checklist.mdx"),
    "scorm-vs-xapi-keeping-your-content-portable": () => import("@/content/blog/scorm-vs-xapi-keeping-your-content-portable.mdx"),
    "what-a-smooth-lms-migration-actually-looks-like": () => import("@/content/blog/what-a-smooth-lms-migration-actually-looks-like.mdx"),
    "lti-1-3-advantage-explained-without-the-spec-speak": () => import("@/content/blog/lti-1-3-advantage-explained-without-the-spec-speak.mdx"),
    "student-data-security-checklist-for-edtech-teams": () => import("@/content/blog/student-data-security-checklist-for-edtech-teams.mdx"),
    "sso-options-for-learning-platforms": () => import("@/content/blog/sso-options-for-learning-platforms.mdx"),
    "designing-assessments-that-resist-cheating": () => import("@/content/blog/designing-assessments-that-resist-cheating.mdx"),
    "migrating-from-lti-1-1-to-lti-1-3-a-practical-guide-for-tool-builders": () => import("@/content/blog/migrating-from-lti-1-1-to-lti-1-3-a-practical-guide-for-tool-builders.mdx"),
    "canvas-breach-student-data-security": () => import("@/content/blog/canvas-breach-student-data-security.mdx"),
    "cheating-online-exams-what-actually-works": () => import("@/content/blog/cheating-online-exams-what-actually-works.mdx"),
  };
  return contentLoaders[slug]?.();
}
