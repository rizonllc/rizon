import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { posts } from "@/lib/posts";
import { alternatives } from "@/lib/alternatives";
import { services } from "@/lib/services";
import { productLabs } from "@/lib/product-labs";

const BASE = "https://rizon.agency";

type ChangeFreq = MetadataRoute.Sitemap[number]["changeFrequency"];

type Route = {
  path: string;
  priority: number;
  changeFrequency: ChangeFreq;
  lastModified?: Date;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: Route[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/case-studies", priority: 0.8, changeFrequency: "monthly" as ChangeFreq },
    { path: "/services", priority: 0.8, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.7, changeFrequency: "yearly" as ChangeFreq },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/lms-alternatives", priority: 0.8, changeFrequency: "monthly" },
    { path: "/legal", priority: 0.3, changeFrequency: "yearly" },
    ...services.map((s) => ({
      path: `/services/${s.slug}`,
      priority: 0.8,
      changeFrequency: "monthly" as ChangeFreq,
    })),
    ...alternatives.map((a) => ({
      path: `/alternatives/${a.slug}`,
      priority: 0.8,
      changeFrequency: "monthly" as ChangeFreq,
    })),
    ...["choice-learning", "center-for-neurodivergence", "cloud-sds"].map((slug) => ({
      path: `/case-studies/${slug}`,
      priority: 0.7,
      changeFrequency: "monthly" as ChangeFreq,
    })),
    ...projects.map((p) => ({
      path: `/case-studies/${p.slug}`,
      priority: 0.7,
      changeFrequency: "monthly" as ChangeFreq,
    })),
    ...productLabs.map((p) => ({
      path: `/products/${p.slug}`,
      priority: 0.7,
      changeFrequency: "monthly" as ChangeFreq,
    })),
  ];

  const entries: MetadataRoute.Sitemap = [
    ...routes,
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" as ChangeFreq },
    ...posts.map((post) => ({
      path: `/blog/${post.slug}`,
      priority: 0.6,
      changeFrequency: "monthly" as ChangeFreq,
      lastModified: new Date(post.date),
    })),
  ].map(({ path, priority, changeFrequency, ...r }) => ({
    url: `${BASE}${path === "/" ? "" : path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
    ...r,
  }));

  return entries;
}
