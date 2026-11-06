import { getT } from "@/lib/t";
import type { Metadata } from "@/lib/seo";
import { notFound } from "@/lib/not-found";
import { Footer } from "@/sections/footer";
import { Cta } from "@/sections/cta";
import { SectionHeader } from "@/components/section-header";
import { BlogCard } from "@/components/blog-card";
import { posts } from "@/lib/posts";

export function generateMetadata(): Metadata {
  const t = getT("seo.blog");
  const path = "/blog";

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: path,
      siteName: "Rizon",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      creator: "@rizon_agency",
    },
  };
}

export default function BlogPage() {
  const t = getT("blogPage");
  return (
    <>
      <main>
        <section className="container cntr pt-32 md:pt-40 ">
          {/* TODO: confirm H1 wording — this page had no <h1> before; reusing the existing blogPage.title copy as the page's H1 */}
          <SectionHeader as="h1" label={t("eyebrow")} title={t("title")} />
        </section>

        <section className="container cntr mt-16 ">
          <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-12">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>

        <Cta />
      </main>

      <Footer />
    </>
  );
}
