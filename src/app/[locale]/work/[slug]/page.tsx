import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "../../footer";
import { projects, getProjectBySlug } from "@/lib/projects";
import {
  Breadcrumb,
  breadcrumbJsonLd,
  type Crumb,
} from "@/components/breadcrumb";

import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { languagesFor, localizedUrl, OG_LOCALE } from "@/i18n/hreflang";
import { l } from "@/lib/l10n";
import { AnalyticsEvent } from "@/lib/analytics";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug })),
  );
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found — Rizon" };
  }

  const path = `/work/${slug}`;
  const title = l(project.title, locale as Locale);
  const description = l(project.description, locale as Locale);

  return {
    title: `${title} — Rizon`,
    description,
    alternates: {
      canonical: localizedUrl(path, locale),
      languages: languagesFor(path),
    },
    openGraph: {
      title,
      description,
      url: localizedUrl(path, locale),
      siteName: "Rizon",
      locale: OG_LOCALE[locale as keyof typeof OG_LOCALE] ?? "en_US",
      type: "website",
      images: [{ url: project.preview, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@rizon_agency",
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("workDetail");
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const index = projects.findIndex((p) => p.slug === slug);
  const number = String(index + 1).padStart(2, "0");
  const next = projects[(index + 1) % projects.length];
  const projectTitle = l(project.title, locale as Locale);
  const nextTitle = l(next.title, locale as Locale);
  const projectDescription = l(project.description, locale as Locale);
  const projectProblem = l(project.problem, locale as Locale);
  const projectSolution = l(project.solution, locale as Locale);

  const meta = [
    { label: t("metaYear"), value: project.year },
    { label: t("metaDiscipline"), value: t("metaDisciplineValue") },
    { label: t("metaStack"), value: project.tech.join(", ") },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: projectTitle,
    description: projectDescription,
    dateCreated: project.year,
    creator: {
      "@type": "Organization",
      name: "Rizon",
      url: "https://rizon.agency",
    },
    url: `https://rizon.agency/work/${slug}`,
    ...(project.link ? { sameAs: project.link } : {}),
  };

  const crumbs: Crumb[] = [
    { name: t("breadcrumbs.home"), href: "/" },
    { name: t("breadcrumbs.work"), href: "/#work" },
    { name: projectTitle, href: `/work/${slug}` },
  ];

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

      <main>
        {/* Header */}
        <section className="container pt-24 md:pt-28 cntr">
          <Breadcrumb items={crumbs} />

          <Link
            href="/#work"
            className="group mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft
              size={15}
              strokeWidth={1.75}
              aria-hidden
              className="transition-transform duration-300 ease-out group-hover:-translate-x-1"
            />
            {t("backLink")}
          </Link>

          <div className="mt-6 grid grid-cols-1 items-end gap-x-12 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <span className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-primary">
                <span className="font-mono text-sm not-italic tabular-nums">
                  {number}
                </span>
                <span className="h-px w-8 bg-primary" aria-hidden />
                {t("caseStudy")}
              </span>
              <h1 className="mt-6 text-5xl font-semibold tracking-tight leading-[1.02] text-balance sm:text-6xl">
                {projectTitle}
              </h1>
            </div>

            <div className="lg:col-span-4">
              <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
                {projectDescription}
              </p>
              {project.link ? (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-6"
                  nativeButton={false}
                  render={
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                >
                  {t("visitLive")}
                  <ArrowUpRight size={15} strokeWidth={1.75} aria-hidden />
                </Button>
              ) : null}
            </div>
          </div>

          {/* Meta strip */}
          <dl className="mt-14 grid grid-cols-1 border-t border-border sm:grid-cols-3">
            {meta.map(({ label, value }) => (
              <div
                key={label}
                className="border-b border-border py-5 sm:border-b-0 sm:border-r sm:py-6 sm:pr-6 sm:last:border-r-0 sm:[&:not(:first-child)]:pl-6"
              >
                <dt className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/50">
                  {label}
                </dt>
                <dd className="mt-2 text-[15px] text-foreground text-pretty">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Lead image */}
        <section className="container mt-12 md:mt-16 cntr">
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border bg-muted md:aspect-[21/9]">
            <Image
              src={project.preview}
              alt={`${projectTitle} — overview`}
              fill
              priority
              quality={90}
              sizes="100vw"
              className="object-cover object-top"
            />
          </div>
        </section>

        {/* Problem / Solution */}
        <section className="container mt-32 md:mt-40 cntr">
          <div className="grid grid-cols-1 border-t border-border md:grid-cols-2">
            <article className="border-b border-border py-10 md:border-b-0 md:border-r md:py-12 md:pr-12">
              <span className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/70">
                <span className="font-mono text-sm tabular-nums text-foreground/40">
                  01
                </span>
                {t("problemLabel")}
              </span>
              <p className="mt-7 text-xl leading-relaxed tracking-tight text-foreground text-pretty">
                {projectProblem}
              </p>
            </article>

            <article className="py-10 md:py-12 md:pl-12">
              <span className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-primary">
                <span className="font-mono text-sm tabular-nums">02</span>
                {t("solutionLabel")}
              </span>
              <p className="mt-7 text-xl leading-relaxed tracking-tight text-foreground text-pretty">
                {projectSolution}
              </p>
            </article>
          </div>
        </section>

        {/* Gallery */}
        <section className="container mt-32 md:mt-40 cntr">
          <div className="flex items-end justify-between gap-6 border-b border-border pb-6">
            <span className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-primary">
              <span className="h-px w-8 bg-primary" aria-hidden />
              {t("insideBuild")}
            </span>
            <span className="font-mono text-xs tabular-nums text-muted-foreground/60">
              {String(project.images.length).padStart(2, "0")}{" "}
              {t("framesLabel")}
            </span>
          </div>

          <div className="mt-8 flex flex-col gap-12 md:gap-20">
            {project.images.map((image, i) => (
              <figure key={image.src} className="group">
                <div className="relative overflow-hidden rounded-xl border border-border bg-muted shadow-sm">
                  <Image
                    src={image.src}
                    alt={`${projectTitle} — screen ${i + 1}`}
                    width={image.width}
                    height={image.height}
                    loading={i === 0 ? "eager" : "lazy"}
                    quality={90}
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    className="h-auto w-full"
                  />
                </div>
                <figcaption className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="font-mono tabular-nums text-foreground/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px w-6 bg-border" aria-hidden />
                  {projectTitle} —{" "}
                  {t("viewOf", { n: i + 1, total: project.images.length })}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container mt-32 md:mt-40 cntr">
          <div className="grid grid-cols-1 items-end gap-x-12 gap-y-8 border-t border-border pt-14 lg:grid-cols-12">
            <h2 className="text-3xl font-semibold tracking-tight leading-[1.05] text-balance lg:col-span-8 md:text-4xl">
              {t("ctaTitle")}
            </h2>
            <div className="lg:col-span-4 lg:justify-self-end">
              <Button
                size="lg"
                nativeButton={false}
                render={
                  <a
                    href="https://cal.com/rizon.agency-cvbkll/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-umami-event={AnalyticsEvent.BookCall}
                    data-umami-event-location="case-study"
                  />
                }
              >
                {t("ctaButton")}
                <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden />
              </Button>
            </div>
          </div>
        </section>

        {/* Next project */}
        <section className="container mt-20 cntr">
          <Link
            href={`/work/${next.slug}`}
            className="group relative block border-t border-border py-10"
          >
            <span
              className="absolute left-0 -top-px h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-500 ease-out group-hover:scale-x-100"
              aria-hidden
            />
            <div className="flex items-center justify-between gap-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground/60">
                  {t("nextProject")}
                </span>
                <h3 className="mt-3 text-2xl font-medium tracking-tight text-balance md:text-3xl">
                  {nextTitle}
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
      </main>

      <Footer />
    </>
  );
}
