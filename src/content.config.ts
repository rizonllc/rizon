import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";

// Post metadata (title, date, related links…) lives in src/lib/posts.ts; the collection
// only supplies the MDX bodies and their heading list for the table of contents.
const blog = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/blog" }),
});

export const collections = { blog };
