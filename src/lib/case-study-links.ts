import { servicesIndex } from "./services-index";

// SINGLE SOURCE for case study <-> service links. Service Proof sections,
// case-study "Services used" blocks, hub tags and the footer all derive from
// this list, so the two directions can't drift apart. Order = display order.
export const caseStudyLinks: { slug: string; services: string[] }[] = [
  {
    slug: "choice-learning",
    services: [
      "lti-development",
      "lti-1-1-to-1-3-migration",
      "moodle-development",
      "woocommerce-to-moodle",
    ],
  },
  { slug: "ai-literacy-lxp", services: ["custom-lms-development"] },
  { slug: "cloud-sds", services: ["lti-development"] },
  { slug: "center-for-neurodivergence", services: ["custom-lms-development"] },
  {
    slug: "advanced-math-learning-platform",
    services: ["custom-lms-development"],
  },
  { slug: "kaiser-math-platform", services: ["custom-lms-development"] },
  { slug: "rizon-lms", services: ["custom-lms-development"] },
];

// Visibility flag: case studies listed here are hidden from the hub, footer and
// service Proof sections (their own pages and links stay live). Delete the slug
// from this set at launch.
export const HIDDEN_CASE_STUDIES = new Set(["center-for-neurodivergence"]);

export const isCaseVisible = (slug: string) => !HIDDEN_CASE_STUDIES.has(slug);

const serviceNames: Record<string, string> = Object.fromEntries(
  servicesIndex.groups.flatMap((g) => g.items.map((i) => [i.slug, i.title])),
);

/** Services used by a case study, as { title, href } links. */
export const servicesFor = (caseSlug: string) =>
  (caseStudyLinks.find((c) => c.slug === caseSlug)?.services ?? []).map(
    (slug) => ({ title: serviceNames[slug], href: `/services/${slug}` }),
  );

/** Visible case study slugs that used a service, in display order. */
export const casesFor = (serviceSlug: string) =>
  caseStudyLinks
    .filter((c) => c.services.includes(serviceSlug) && isCaseVisible(c.slug))
    .map((c) => c.slug);
