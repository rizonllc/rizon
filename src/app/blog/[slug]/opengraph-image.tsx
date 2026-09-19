import { ImageResponse } from "next/og";
import { getPostBySlug, posts } from "@/lib/posts";
import { BlogThumbnail } from "@/components/blog-thumbnail";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return new Response("Not found", { status: 404 });

  return new ImageResponse(
    <BlogThumbnail title={post.title} mode="og" />,
    { ...size },
  );
}
