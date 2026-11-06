import type { APIRoute } from "astro";
import { BlogThumbnail } from "@/components/blog-thumbnail";
import { getPostBySlug, posts } from "@/lib/posts";
import { ogImage } from "@/lib/og";

export function getStaticPaths() {
  return posts.map((post) => ({ params: { slug: post.slug } }));
}

export const GET: APIRoute = ({ params }) => {
  const post = getPostBySlug(params.slug!);
  if (!post) return new Response("Not found", { status: 404 });
  return ogImage(BlogThumbnail({ title: post.title, mode: "og" }));
};
