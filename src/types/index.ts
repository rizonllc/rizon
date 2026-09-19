import type { StaticImageData } from "next/image";

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  coverImage?: StaticImageData;
  relatedServiceSlug?: string;
  relatedAlternativeSlugs?: string[];
  relatedPostSlugs?: string[];
  authorSlug?: string;
};

export type Project = {
  slug: string;
  title: string;
  link?: string;
  description: string;
  problem: string;
  solution: string;
  year: string;
  preview: string;
  tech: string[];
  images: GalleryImage[];
};

export type GalleryImage = {
  src: string;
  width: number;
  height: number;
};

export type ComparisonRow = {
  dimension: string;
  rizon: string;
  them: string;
};

export type Faq = {
  question: string;
  answer: string;
};

// A quotable, extractable figure with a primary-source citation (GEO / AI-search).
export type CitedStat = {
  value: string; // the headline figure or term, e.g. "SCORM 1.2" or "IMSCC"
  label: string; // what it means, in one sentence
  source: string; // the primary source's name
  sourceUrl: string; // outbound link to that primary source
};

export type Alternative = {
  slug: string;
  competitor: string;
  category: string;
  metaTitle: string;
  metaDescription: string;
  heroHeadline: string;
  heroSub: string;
  intro: string[];
  whoThisIsFor: string;
  whyLeave: { title: string; body: string }[];
  whereTheyWin: { title: string; body: string }[];
  comparison: ComparisonRow[];
  migration: string;
  faqs: Faq[];
  stat?: CitedStat;
  keywords: string[];
  relatedServiceSlug?: string;
  relatedPostSlugs?: string[];
};

export type ServiceSection = {
  heading: string;
  body: string;
};

export type ServicePage = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  heroSub: string;
  targetKeyword: string;
  whoWeWorkWith: { audience: string; description: string }[];
  problemsWeSolve: { problem: string; solution: string }[];
  whatWeBuild: ServiceSection[];
  process: { step: string; detail: string }[];
  included: string[];
  costBand: string;
  outcomes: string;
  faqs: Faq[];
  stat?: CitedStat;
  relatedAlternativeSlugs?: string[];
  relatedPostSlugs?: string[];
  keywords: string[];
};
