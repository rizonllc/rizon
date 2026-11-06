import type { APIRoute } from "astro";
import { projects } from "@/lib/projects";
import { posts } from "@/lib/posts";
import { alternatives } from "@/lib/alternatives";
import { serviceRoutes } from "@/lib/service-routes";

const BASE = "https://rizon.agency";

type ChangeFreq = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

type Route = {
  path: string;
  priority: number;
  changeFrequency: ChangeFreq;
  lastModified?: Date;
};

function buildEntries() {
  const routes: Route[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/case-studies", priority: 0.8, changeFrequency: "monthly" as ChangeFreq },
    { path: "/services", priority: 0.8, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.7, changeFrequency: "yearly" as ChangeFreq },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/lms-alternatives", priority: 0.8, changeFrequency: "monthly" },
    { path: "/legal", priority: 0.3, changeFrequency: "yearly" },
    // Every indexable /services/[slug] route, from the same registry the page renders.
    ...serviceRoutes.filter((s) => s.indexable).map((s) => ({
      path: `/services/${s.slug}`,
      priority: 0.8,
      changeFrequency: "monthly" as ChangeFreq,
    })),
    ...alternatives.map((a) => ({
      path: `/lms-alternatives/${a.slug}`,
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
  ];

  const entries = [
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


const escape = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const GET: APIRoute = () => {
  const body = buildEntries()
    .map(
      (e) =>
        `  <url>\n    <loc>${escape(e.url)}</loc>\n    <lastmod>${e.lastModified.toISOString()}</lastmod>\n    <changefreq>${e.changeFrequency}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
