"use client";

import { getT } from "@/lib/t";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { posts } from "@/lib/posts";
import { SectionHeader } from "@/components/section-header";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/blog-card";

export const BlogPreview = () => {
  const t = getT("blogPreview");
  const preview = posts.slice(0, 4);
  return (
    <section id="blog" className="container mt-32 md:mt-40 cntr">
      <Reveal>
        <div className="flex items-end justify-between gap-6">
          <SectionHeader
            label={t("label")}
            title={
              <>
                {t("titlePrefix")}{" "}
                <span className="text-primary italic">
                  {t("titleHighlight")}
                </span>
              </>
            }
          />
          <div className="hidden md:block shrink-0">
            <Button
              variant="outline"
              size="sm"
              nativeButton={false}
              render={<Link href="/blog" />}
            >
              {t("allPosts")}
              <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden />
            </Button>
          </div>
        </div>
      </Reveal>

      <RevealGroup
        stagger={0.12}
        className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        {preview.map((post) => (
          <RevealItem key={post.slug} duration={0.6} y={20}>
            <BlogCard post={post} />
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="mt-8 md:hidden">
        <Button
          variant="outline"
          size="sm"
          nativeButton={false}
          render={<Link href="/blog" />}
        >
          {t("allPosts")}
          <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden />
        </Button>
      </div>
    </section>
  );
};
