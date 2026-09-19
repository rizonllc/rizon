"use client";

import { getT } from "@/lib/t";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BlogThumbnail } from "@/components/blog-thumbnail";
import type { Post } from "@/types";

const NEW_THRESHOLD_DAYS = 30;

function isNew(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  return diff < NEW_THRESHOLD_DAYS * 24 * 60 * 60 * 1000;
}

type BlogCardProps = {
  post: Post;
};

export const BlogCard = ({ post }: BlogCardProps) => {
  const t = getT("blogPage");
  const formatted = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="surface surface-hover group flex h-full flex-col overflow-hidden"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        <BlogThumbnail
          title={post.title}
          className="transition-transform duration-700 ease-out group-hover:scale-[1.015]"
        />
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-primary">
            {post.category}
          </span>
          {isNew(post.date) && <Badge>{t("new")}</Badge>}
        </div>

        <h2 className="mt-3 text-xl font-semibold tracking-tight leading-snug text-balance">
          {post.title}
        </h2>

        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground text-pretty">
          {post.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          <span className="font-mono text-xs tabular-nums text-muted-foreground/60">
            {formatted} · {post.readTime}
          </span>
          <ArrowUpRight
            size={18}
            strokeWidth={1.5}
            aria-hidden
            className="shrink-0 text-muted-foreground opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
          />
        </div>
      </div>
    </Link>
  );
};
