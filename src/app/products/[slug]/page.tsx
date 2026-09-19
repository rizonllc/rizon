import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  breadcrumbJsonLd,
  type Crumb,
} from "@/components/breadcrumb";
import { Footer } from "../../footer";
import { getProductLabBySlug, productLabs } from "@/lib/product-labs";

const BASE_URL = "https://rizon.agency";

const pageCopy = {
  home: "Home",
  products: "Products",
  visitProduct: "Visit {name}",
  discuss: "Discuss vertical SaaS",
  whyEyebrow: "Why this exists",
  whyTitle: "A narrow market is the point.",
  researchEyebrow: "Research focus",
  researchTitle: "The questions to validate before writing too much product.",
  seoEyebrow: "SEO role",
  seoTitle: "Why mention {name} on Rizon at all?",
};

export function generateStaticParams() {
  return productLabs.map((product) => ({ slug: product.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductLabBySlug(slug);

  if (!product) {
    return { title: "Product not found — Rizon" };
  }

  const path = `/products/${slug}`;
  const title = product.metaTitle;
  const description = product.metaDescription;

  return {
    title,
    description,
    keywords: product.keywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "Rizon",
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@rizon_agency",
    },
  };
}

export default async function ProductLabPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductLabBySlug(slug);

  if (!product) notFound();

  const path = `/products/${slug}`;
  const title = product.metaTitle;
  const description = product.metaDescription;
  const crumbs: Crumb[] = [
    { name: pageCopy.home, href: "/" },
    { name: pageCopy.products, href: path },
    { name: product.name, href: path },
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${BASE_URL}${path}#webpage`,
        url: path,
        name: title,
        description,
        isPartOf: { "@id": `${BASE_URL}/#website` },
        publisher: { "@id": `${BASE_URL}/#org` },
        about: { "@id": `${BASE_URL}${path}#software` },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${BASE_URL}${path}#software`,
        name: product.name,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: product.liveUrl,
        sameAs: product.liveUrl,
        description: product.heroSub,
        publisher: { "@id": `${BASE_URL}/#org` },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(crumbs)),
        }}
      />
      <main className="pb-24 md:pb-32">
        <section className="container cntr pt-28 md:pt-36">
          <Breadcrumb items={crumbs} />
          <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1.5 text-sm font-medium text-primary">
                <span
                  className="size-1.5 rounded-full bg-primary"
                  aria-hidden
                />
                {product.status}
              </span>
              <h1 className="mt-6 text-[2.8rem] font-semibold leading-[1.02] tracking-tight text-balance sm:text-6xl md:text-[4.4rem]">
                {product.heroHeadline}
              </h1>
            </div>
            <div className="lg:col-span-4">
              <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
                {product.heroSub}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button
                  nativeButton={false}
                  render={
                    <a
                      href={product.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                >
                  {pageCopy.visitProduct.replace(
                    "{name}",
                    product.name,
                  )}
                  <ArrowUpRight
                    data-icon="inline-end"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </Button>
                <Button
                  variant="outline"
                  nativeButton={false}
                  render={
                    <a
                      href="https://cal.com/rizon.agency-cvbkll/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                >
                  {pageCopy.discuss}
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="container cntr mt-20 md:mt-28">
          <div className="surface grid grid-cols-1 overflow-hidden lg:grid-cols-12">
            <div className="bg-primary p-8 text-primary-foreground md:p-10 lg:col-span-4">
              <p className="font-mono text-sm uppercase tracking-[0.2em] opacity-75">
                {pageCopy.whyEyebrow}
              </p>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
                {pageCopy.whyTitle}
              </h2>
            </div>
            <div className="flex flex-col gap-5 p-8 md:p-10 lg:col-span-8">
              {product.why.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-lg leading-relaxed text-foreground/80"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="container cntr mt-24 md:mt-32">
          <div className="max-w-3xl">
            <span className="font-mono text-sm uppercase tracking-[0.2em] text-primary">
              {pageCopy.researchEyebrow}
            </span>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight text-balance md:text-5xl">
              {pageCopy.researchTitle}
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            {product.researchFocus.map((item) => (
              <article
                key={item.title}
                className="surface p-7 md:p-8"
              >
                <h3 className="text-2xl font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="container cntr mt-24 md:mt-32">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="font-mono text-sm uppercase tracking-[0.2em] text-primary">
                {pageCopy.seoEyebrow}
              </span>
              <h2 className="mt-5 text-4xl font-semibold tracking-tight text-balance">
                {pageCopy.seoTitle.replace(
                  "{name}",
                  product.name,
                )}
              </h2>
            </div>
            <div className="grid gap-5 lg:col-span-8">
              {product.publicSiteRole.map((item) => (
                <article
                  key={item.title}
                  className="border-t border-border pt-6"
                >
                  <h3 className="text-xl font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
