import { getT } from "@/lib/t";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Footer } from "../../footer";
import { Cta } from "../../cta";
import { getPostContent, getPostBySlug, posts } from "@/lib/posts";
import { alternatives } from "@/lib/alternatives";
import { getServiceBySlug } from "@/lib/services";
import { getAuthorBySlug } from "@/lib/authors";
import { Breadcrumb, breadcrumbJsonLd, type Crumb } from "@/components/breadcrumb";
import { BlogThumbnail } from "@/components/blog-thumbnail";
import { TableOfContents } from "@/components/table-of-contents";
import { HeadingAnchor } from "@/components/heading-anchor";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { CodeBlock } from "@/components/code-block";
import { getPostHeadings, slugify, textOf } from "@/lib/toc";
import type { ComponentProps } from "react";

const BASE_URL = "https://rizon.agency";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post not found — Rizon" };
  }

  const path = `/blog/${slug}`;
  const url = `${BASE_URL}${path}`;

  return {
    title: `${post.title} — Rizon`,
    description: post.description,
    authors: [{ name: "Rizon", url: BASE_URL }],
    keywords: [post.category, "e-learning", "LMS development", "online learning platform", "custom LMS"],
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName: "Rizon",
      locale: "en_US",
      type: "article",
      publishedTime: post.date,
      authors: ["Rizon"],
      tags: [post.category, "e-learning", "LMS"],
      images: [{ url: `${url}/opengraph-image`, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      creator: "@rizon_agency",
    },
  };
}

// Give every `##` and `###` an id so the table of contents can link to it,
// plus a hover hash that copies a link to the section,
// and render fenced code through <CodeBlock> for the copy button.
function linkedHeading(Tag: "h2" | "h3") {
  return function LinkedHeading({ children, className, ...props }: ComponentProps<"h2">) {
    const id = slugify(textOf(children));
    return (
      <Tag id={id} className={cn("group relative", className)} {...props}>
        <HeadingAnchor id={id} />
        {children}
      </Tag>
    );
  };
}

const mdxComponents = {
  h2: linkedHeading("h2"),
  h3: linkedHeading("h3"),
  pre: CodeBlock,
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = getT("blogDetail");
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const content = await getPostContent(slug);
  if (!content) notFound();
  const { default: Content } = content;
  const headings = await getPostHeadings(slug);

  const localizedPosts = posts;
  const index = localizedPosts.findIndex((p) => p.slug === slug);
  const next = localizedPosts[(index + 1) % localizedPosts.length];
  const relatedPosts = localizedPosts.filter((item) => post.relatedPostSlugs?.includes(item.slug));
  const relatedAlternatives = alternatives.filter((item) => post.relatedAlternativeSlugs?.includes(item.slug));
  const relatedService = post.relatedServiceSlug ? getServiceBySlug(post.relatedServiceSlug) : undefined;
  const author = getAuthorBySlug(post.authorSlug ?? "choaib-mouhrach");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: author ? { "@type": "Person", name: author.name, url: author.url, sameAs: author.sameAs, jobTitle: author.role } : undefined,
    publisher: {
      "@type": "Organization",
      name: "Rizon",
      url: BASE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${slug}`,
    },
  };

  const crumbs: Crumb[] = [
    { name: t("home"), href: "/" },
    { name: t("blog"), href: "/blog" },
    { name: post.title, href: `/blog/${slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(crumbs)) }}
      />

      <main>
        <div className="container cntr pt-24 md:pt-28 lg:grid lg:grid-cols-[minmax(0,1fr)_14rem] lg:gap-12">
          <article className="min-w-0">
            {/* Header */}
            <section>
              <Breadcrumb items={crumbs} />

              <Link
                href="/blog"
                className="group mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft
                  size={15}
                  strokeWidth={1.75}
                  aria-hidden
                  className="transition-transform duration-300 ease-out group-hover:-translate-x-1"
                />
                {t("allPosts")}
              </Link>

              <div className="mt-6">
                <span className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-primary">
                  <span className="h-px w-8 bg-primary" aria-hidden />
                  {post.category}
                </span>
                <h1 className="mt-6 text-4xl font-semibold tracking-tight leading-[1.05] text-balance md:text-5xl">
                  {post.title}
                </h1>
                <p className="mt-5 font-mono text-sm tabular-nums text-muted-foreground/60">
                  {formatDate(post.date)} · {post.readTime}
                </p>
              </div>

              <div className="mt-4 border-t border-border" />
            </section>

            {/* Cover image */}
            <section className="mt-10">
              <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-border bg-muted">
                <BlogThumbnail title={post.title} />
              </div>
            </section>

            {/* Content */}
            <section className="mt-12">
              <div className="prose max-w-none">
                <Content components={mdxComponents} />
              </div>
            </section>

            {author && <section className="mt-16"><div className="flex gap-5 border-y border-border py-8"><Image src={author.avatar} alt="" width={56} height={56} className="size-14 rounded-full" /><div><p className="text-sm font-medium">{t("writtenBy", { name: author.name })}</p><p className="mt-1 text-sm text-muted-foreground">{author.role}</p><p className="mt-3 leading-relaxed text-muted-foreground">{author.bio}</p></div></div></section>}

            {(relatedService || relatedAlternatives.length > 0 || relatedPosts.length > 0) && (
              <section className="mt-20">
                <div className="border-t border-border pt-10">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{t("keepReading")}</span>
                  <h2 className="mt-4 text-3xl font-semibold tracking-tight">{t("nextLinks")}</h2>
                  <div className="mt-7 divide-y divide-border border-y border-border">
                    {relatedService && <Link href={`/services/${relatedService.slug}`} className="group flex items-center justify-between gap-6 py-5 text-lg font-medium"><span>{relatedService.title}</span><ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden /></Link>}
                    {relatedAlternatives.map((item) => <Link key={item.slug} href={`/alternatives/${item.slug}`} className="group flex items-center justify-between gap-6 py-5 text-lg font-medium"><span>{t("alternative", { name: item.competitor })}</span><ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden /></Link>)}
                    {relatedPosts.map((item) => <Link key={item.slug} href={`/blog/${item.slug}`} className="group flex items-center justify-between gap-6 py-5 text-lg font-medium"><span>{item.title}</span><ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden /></Link>)}
                  </div>
                </div>
              </section>
            )}

            {/* Next post */}
            <section className="mt-20">
              <Link
                href={`/blog/${next.slug}`}
                className="group relative block border-t border-border py-10"
              >
                <span
                  className="absolute left-0 -top-px h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-500 ease-out group-hover:scale-x-100"
                  aria-hidden
                />
                <div className="flex items-center justify-between gap-6">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground/60">
                      {t("nextPost")}
                    </span>
                    <h3 className="mt-3 text-2xl font-medium tracking-tight text-balance md:text-3xl">
                      {next.title}
                    </h3>
                  </div>
                  <ArrowRight
                    size={28}
                    strokeWidth={1.5}
                    aria-hidden
                    className="shrink-0 -translate-x-2 text-muted-foreground transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:text-foreground"
                  />
                </div>
              </Link>
            </section>
          </article>

          {headings.length > 1 && (
            <aside className="hidden lg:block">
              {/* Base UI pins the scroll area to position: relative, so a wrapper does the sticking. */}
              <div className="sticky top-28">
                <ScrollArea className="h-[calc(100vh-8rem)]">
                  <div className="pr-4 pb-4">
                    <TableOfContents headings={headings} title={t("onThisPage")} />
                  </div>
                </ScrollArea>
              </div>
            </aside>
          )}
        </div>

        <Cta />
      </main>

      <Footer />
    </>
  );
}
