import { getT } from "@/lib/t";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  breadcrumbJsonLd,
  type Crumb,
} from "@/components/breadcrumb";
import { alternatives, getAlternativeBySlug } from "@/lib/alternatives";
import { getAlternativePage } from "@/lib/alternative-pages";
import {
  AlternativePage as AlternativeLanding,
  alternativeMetadata,
} from "@/components/alternative-page";
import { posts } from "@/lib/posts";
import { getServiceBySlug } from "@/lib/services";
import { StatBlock } from "@/components/stat-block";
import { Eyebrow } from "@/components/eyebrow";
import { Footer } from "../../footer";

import { AnalyticsEvent } from "@/lib/analytics";

const BASE_URL = "https://rizon.agency";

export function generateStaticParams() {
  return alternatives.map((alternative) => ({ slug: alternative.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const landing = getAlternativePage(slug);
  if (landing) return alternativeMetadata(landing);
  const alternative = getAlternativeBySlug(slug);

  if (!alternative) return { title: "Alternative not found — Rizon" };

  const path = `/alternatives/${slug}`;
  const metaTitle = alternative.metaTitle;
  const metaDescription = alternative.metaDescription;
  return {
    title: metaTitle,
    description: metaDescription,
    keywords: alternative.keywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: path,
      siteName: "Rizon",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: `${BASE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: alternative.heroHeadline,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      creator: "@rizon_agency",
    },
  };
}

export default async function AlternativePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const landing = getAlternativePage(slug);
  if (landing) return <AlternativeLanding a={landing} />;
  const t = getT("alternativeDetail");
  const alternative = getAlternativeBySlug(slug);
  if (!alternative) notFound();
  const intro = alternative.intro;
  const faqs = alternative.faqs.map((faq) => ({
    question: faq.question,
    answer: faq.answer,
  }));

  const url = `${BASE_URL}/alternatives/${slug}`;
  const crumbs: Crumb[] = [
    { name: t("breadcrumbs.home"), href: "/" },
    { name: t("breadcrumbs.alternatives"), href: "/alternatives" },
    { name: alternative.competitor, href: `/alternatives/${slug}` },
  ];
  const relatedPosts = posts.filter((post) =>
    alternative.relatedPostSlugs?.includes(post.slug),
  );
  const relatedService = alternative.relatedServiceSlug
    ? getServiceBySlug(alternative.relatedServiceSlug)
    : undefined;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: alternative.metaTitle,
        description: alternative.metaDescription,
        about: {
          "@type": "Thing",
          name: `${alternative.competitor} alternative comparison`,
          description: `A comparison of a custom LMS build and ${alternative.competitor}.`,
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
      breadcrumbJsonLd(crumbs),
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: "Custom LMS development",
        serviceType: "Custom LMS development",
        provider: { "@id": `${BASE_URL}/#org` },
        areaServed: "Worldwide",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <section className="container cntr pt-24 md:pt-28">
          <Breadcrumb items={crumbs} />
          <div className="mt-10 max-w-4xl">
            <Eyebrow>{alternative.category}</Eyebrow>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight leading-[1.02] text-balance md:text-6xl">
              {alternative.heroHeadline}
            </h1>
            <p className="mt-7 max-w-3xl text-xl leading-relaxed text-muted-foreground text-pretty">
              {alternative.heroSub}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button
                size="lg"
                nativeButton={false}
                render={
                  <Link
                    href="https://cal.com/rizon.agency-cvbkll/30min"
                    target="_blank"
                    rel="noreferrer"
                    data-umami-event={AnalyticsEvent.BookCall}
                    data-umami-event-location="alternative-hero"
                  />
                }
              >
                {t("heroBookCall")} <ArrowRight size={16} aria-hidden />
              </Button>
              <Button
                size="lg"
                variant="outline"
                nativeButton={false}
                render={<Link href="#comparison" />}
              >
                {t("heroSeeComparison")}
              </Button>
            </div>
          </div>
        </section>

        <section className="container cntr mt-24 md:mt-32">
          <div className="grid grid-cols-1 gap-12 border-t border-border pt-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3.5 py-1.5 text-sm font-medium text-primary">
                {t("intro.label")}
              </span>
            </div>
            <div className="space-y-5 text-lg leading-relaxed text-muted-foreground lg:col-span-7 lg:col-start-6">
              {intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p className="border-l-2 border-primary pl-5 text-foreground">
                <strong>{t("intro.whoThisIsFor")}</strong>{" "}
                {alternative.whoThisIsFor}
              </p>
            </div>
          </div>
        </section>

        {alternative.stat && (
          <section className="container cntr mt-16">
            <StatBlock
              stat={{
                ...alternative.stat,
                label: alternative.stat.label,
              }}
            />
          </section>
        )}

        <section className="container cntr mt-24 md:mt-32">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3.5 py-1.5 text-sm font-medium text-primary">
              {t("whyLeave.label")}
            </span>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight text-balance md:text-5xl">
              {t("whyLeave.titleTemplate", {
                competitor: alternative.competitor,
              })}
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            {alternative.whyLeave.map((item, index) => (
              <article
                key={item.title}
                className="surface surface-hover p-7 md:p-8"
              >
                <span className="font-mono text-sm font-medium text-primary">
                  0{index + 1}
                </span>
                <h3 className="mt-5 text-2xl font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="comparison"
          className="container cntr mt-24 scroll-mt-24 md:mt-32"
        >
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3.5 py-1.5 text-sm font-medium text-primary">
              {t("comparison.label")}
            </span>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight text-balance md:text-5xl">
              {t("comparison.titleTemplate", {
                competitor: alternative.competitor,
              })}
            </h2>
          </div>
          <div className="surface mt-12 overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-[15px]">
              <thead className="bg-muted/50">
                <tr>
                  <th scope="col" className="w-1/4 px-5 py-4 font-medium">
                    {t("comparison.dimension")}
                  </th>
                  <th
                    scope="col"
                    className="w-[37.5%] border-l border-border px-5 py-4 font-medium"
                  >
                    {t("comparison.rizon")}
                  </th>
                  <th
                    scope="col"
                    className="w-[37.5%] border-l border-border px-5 py-4 font-medium"
                  >
                    {alternative.competitor}
                  </th>
                </tr>
              </thead>
              <tbody>
                {alternative.comparison.map((row) => (
                  <tr
                    key={row.dimension}
                    className="border-t border-border align-top"
                  >
                    <th scope="row" className="px-5 py-5 font-medium">
                      {row.dimension}
                    </th>
                    <td className="border-l border-border px-5 py-5 leading-relaxed text-muted-foreground">
                      {row.rizon}
                    </td>
                    <td className="border-l border-border px-5 py-5 leading-relaxed text-muted-foreground">
                      {row.them}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="container cntr mt-24 md:mt-32">
          <div className="grid grid-cols-1 gap-12 border-t border-border pt-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3.5 py-1.5 text-sm font-medium text-primary">
                {t("whereTheyWin.label")}
              </span>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight">
                {t("whereTheyWin.titleTemplate", {
                  competitor: alternative.competitor,
                })}
              </h2>
            </div>
            <div className="space-y-7 lg:col-span-7 lg:col-start-6">
              {alternative.whereTheyWin.map((item) => (
                <article key={item.title}>
                  <h3 className="text-xl font-medium tracking-tight">
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

        <section className="container cntr mt-24 md:mt-32">
          <div className="rounded-2xl bg-tint px-6 py-10 md:px-10 md:py-14">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3.5 py-1.5 text-sm font-medium text-primary">
              {t("migration.label")}
            </span>
            <h2 className="mt-5 max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
              {t("migration.title")}
            </h2>
            <p className="mt-6 max-w-3xl leading-relaxed text-muted-foreground">
              {alternative.migration}
            </p>
            {relatedPosts.length > 0 && (
              <div className="mt-7 flex flex-wrap gap-3">
                {relatedPosts.map((post) => (
                  <Button
                    key={post.slug}
                    variant="outline"
                    nativeButton={false}
                    render={<Link href={`/blog/${post.slug}`} />}
                  >
                    {t("migration.readPrefix")}: {post.title}
                    <ArrowRight size={15} aria-hidden />
                  </Button>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="container cntr mt-24 md:mt-32">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3.5 py-1.5 text-sm font-medium text-primary">
              {t("faq.label")}
            </span>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
              {t("faq.title")}
            </h2>
          </div>
          <div className="surface mt-12 divide-y divide-border overflow-hidden">
            {faqs.map((faq) => (
              <article
                key={faq.question}
                className="grid grid-cols-1 gap-5 px-6 py-7 md:grid-cols-12 md:gap-10 md:px-8"
              >
                <h3 className="text-lg font-medium tracking-tight md:col-span-5">
                  {faq.question}
                </h3>
                <p className="leading-relaxed text-muted-foreground md:col-span-7">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="container cntr mt-24 md:mt-32">
          <div className="rounded-3xl bg-primary px-6 py-14 text-primary-foreground md:px-12 md:py-20">
            <div className="max-w-3xl">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3.5 py-1.5 text-sm font-medium text-primary-foreground/70">
                {t("bottomCta.eyebrow")}
              </span>
              <h2 className="mt-5 text-4xl font-semibold tracking-tight text-balance md:text-5xl">
                {t("bottomCta.title")}
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-primary-foreground/80">
                {t("bottomCta.description")}
              </p>
              <Button
                size="lg"
                className="mt-8 bg-background text-foreground hover:bg-background/90"
                nativeButton={false}
                render={
                  <Link
                    href="https://cal.com/rizon.agency-cvbkll/30min"
                    target="_blank"
                    rel="noreferrer"
                    data-umami-event={AnalyticsEvent.BookCall}
                    data-umami-event-location="alternative-bottom"
                  />
                }
              >
                {t("bottomCta.button")} <ArrowRight size={16} aria-hidden />
              </Button>
            </div>
          </div>
        </section>

        <section className="container cntr mt-20">
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <Link
              href="/alternatives"
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              {t("footerLinks.browseAll")}{" "}
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
            {relatedService && (
              <Link
                href={`/services/${relatedService.slug}`}
                className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                {t("footerLinks.exploreServicePrefix")}{" "}
                {relatedService.title}{" "}
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
