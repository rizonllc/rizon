import type { ComponentProps } from "react";

const SITE = "https://rizon.agency";

/** Subset of the old Next.js `Metadata` shape that the pages use. */
export type Metadata = {
  title?: string;
  description?: string;
  keywords?: string | string[];
  alternates?: { canonical?: string };
  robots?: { index?: boolean; follow?: boolean; [key: string]: unknown };
  openGraph?: {
    title?: string;
    description?: string;
    url?: string;
    siteName?: string;
    locale?: string;
    type?: "website" | "article" | "profile";
    publishedTime?: string;
    authors?: string[];
    tags?: string[];
    images?: { url: string; width?: number; height?: number; alt?: string }[];
  };
  twitter?: { card?: string; title?: string; description?: string; creator?: string };
  [key: string]: unknown;
};

export type LayoutSeo = {
  title: string;
  description?: string;
  canonical?: string;
  keywords?: string | string[];
  noindex?: boolean;
  og?: {
    title?: string;
    description?: string;
    url?: string;
    type?: "website" | "article" | "profile";
    image?: string;
    imageAlt?: string;
    publishedTime?: string;
    authors?: string[];
    tags?: string[];
  };
  twitter?: { title?: string; description?: string };
};

/** Maps a page's `metadata` export to props for `layouts/Layout.astro`. */
export function layoutSeo(meta: Metadata, extra: Partial<LayoutSeo> = {}): LayoutSeo {
  const og = meta.openGraph;
  const image = og?.images?.[0];
  return {
    title: meta.title ?? "Rizon",
    description: meta.description,
    canonical: meta.alternates?.canonical,
    keywords: meta.keywords,
    noindex: meta.robots?.index === false,
    og: og && {
      title: og.title,
      description: og.description,
      url: og.url,
      type: og.type,
      image: image?.url,
      imageAlt: image?.alt,
      publishedTime: og.publishedTime,
      authors: og.authors,
      tags: og.tags,
    },
    twitter: meta.twitter && { title: meta.twitter.title, description: meta.twitter.description },
    ...extra,
  };
}

export const absoluteUrl = (path: string) => new URL(path, SITE).toString();
export type { ComponentProps };
