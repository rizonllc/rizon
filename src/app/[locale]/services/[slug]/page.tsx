import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  breadcrumbJsonLd,
  type Crumb,
} from "@/components/breadcrumb";
import { alternatives } from "@/lib/alternatives";
import { posts } from "@/lib/posts";
import { StatBlock } from "@/components/stat-block";
import { getServiceBySlug, services } from "@/lib/services";
import { ServiceLanding } from "@/components/service-landing";
import { blankServices, getBlankService } from "@/lib/blank-services";
import { Footer } from "../../footer";
import { Logos } from "../../logos";
import { Hero } from "@/components/hero";
import heroImage from "@/assets/hero.jpg";

import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { languagesFor, localizedUrl, OG_LOCALE } from "@/i18n/hreflang";
import { l } from "@/lib/l10n";
import { AnalyticsEvent } from "@/lib/analytics";

const BASE_URL = "https://rizon.agency";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    [
      ...new Set([
        ...services.map((service) => service.slug),
        ...blankServices.map((service) => service.slug),
      ]),
    ].map((slug) => ({ locale, slug })),
  );
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const blank = getBlankService(slug);
  if (blank) {
    const tNav = await getTranslations({
      locale: locale as Locale,
      namespace: "nav",
    });
    const path = `/services/${blank.slug}`;
    const title = l(blank.metaTitle, locale as Locale);
    const description = l(blank.metaDescription, locale as Locale);
    return {
      title: title || `${tNav(`serviceItems.${blank.key}.title`)} | Rizon`,
      description: description || undefined,
      alternates: {
        canonical: localizedUrl(path, locale),
        languages: languagesFor(path),
      },
      // ponytail: noindex until the copy is written; remove then.
      ...(title ? {} : { robots: { index: false, follow: false } }),
    };
  }
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service not found | Rizon" };
  const path = `/services/${service.slug}`;
  const metaTitle = l(service.metaTitle, locale as Locale);
  const metaDescription = l(service.metaDescription, locale as Locale);
  return {
    title: metaTitle,
    description: metaDescription,
    keywords: service.keywords,
    alternates: {
      canonical: localizedUrl(path, locale),
      languages: languagesFor(path),
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: localizedUrl(path, locale),
      siteName: "Rizon",
      locale: OG_LOCALE[locale as keyof typeof OG_LOCALE] ?? "en_US",
      type: "website",
      images: [
        {
          url: `${BASE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: l(service.h1, locale as Locale),
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

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const blank = getBlankService(slug);
  if (blank)
    return (
      <>
        <ServiceLanding content={blank} locale={locale as Locale} />
        <Footer />
      </>
    );
  const t = await getTranslations("serviceDetail");
  const service = getServiceBySlug(slug);
  if (!service) notFound();
  const local = <T,>(field: import("@/lib/l10n").MaybeLocalized<T>) =>
    l(field, locale as Locale);
  const url = localizedUrl(`/services/${service.slug}`, locale);
  const serviceTitle = local(service.title);
  const targetKeyword = local(service.targetKeyword);
  const serviceFaqs = service.faqs.map((faq) => ({
    question: local(faq.question),
    answer: local(faq.answer),
  }));
  const crumbs: Crumb[] = [
    { name: t("breadcrumbs.home"), href: "/" },
    { name: t("breadcrumbs.services"), href: "/services" },
    { name: serviceTitle, href: `/services/${service.slug}` },
  ];
  const relatedAlternatives = alternatives.filter((item) =>
    service.relatedAlternativeSlugs?.includes(item.slug),
  );
  const relatedPosts = posts.filter((item) =>
    service.relatedPostSlugs?.includes(item.slug),
  );
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: serviceTitle,
        serviceType: targetKeyword,
        description: local(service.metaDescription),
        url,
        provider: { "@id": `${BASE_URL}/#org` },
        areaServed: "Worldwide",
      },
      {
        "@type": "FAQPage",
        mainEntity: serviceFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
      breadcrumbJsonLd(crumbs),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <Hero
          eyebrow={<Breadcrumb items={crumbs} />}
          headline={local(service.h1)}
          headlineClassName="text-[clamp(1.875rem,5vw,3.25rem)] leading-[1.1]"
          sub={local(service.heroSub)}
          image={heroImage}
          actions={
            <Button
              size="lg"
              nativeButton={false}
              render={
                <Link
                  href="https://cal.com/rizon.agency-cvbkll/30min"
                  target="_blank"
                  rel="noreferrer"
                  data-umami-event={AnalyticsEvent.BookCall}
                  data-umami-event-location="service-hero"
                />
              }
            >
              {t("heroCta")} <ArrowRight size={16} aria-hidden />
            </Button>
          }
        />
        <Logos />
        <section className="container cntr mt-24 md:mt-32">
          <div className="grid grid-cols-1 gap-12 border-t border-border pt-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3.5 py-1.5 text-sm font-medium text-primary">
                {t("whoWeWorkWith.label")}
              </span>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight">
                {t("whoWeWorkWith.title")}
              </h2>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <ul className="space-y-6">
                {service.whoWeWorkWith.map((item) => (
                  <li
                    key={local(item.audience)}
                    className="border-l-2 border-primary pl-5"
                  >
                    <h3 className="text-lg font-semibold tracking-tight">
                      {local(item.audience)}
                    </h3>
                    <p className="mt-2 leading-relaxed text-muted-foreground">
                      {local(item.description)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <section className="container cntr mt-24 md:mt-32">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3.5 py-1.5 text-sm font-medium text-primary">
              {t("problemsWeSolve.label")}
            </span>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight text-balance md:text-5xl">
              {t("problemsWeSolve.title")}
            </h2>
          </div>
          <div className="surface mt-12 divide-y divide-border overflow-hidden">
            {service.problemsWeSolve.map((item) => (
              <article
                key={local(item.problem)}
                className="grid grid-cols-1 gap-4 px-6 py-7 md:grid-cols-12 md:gap-10 md:px-8"
              >
                <h3 className="text-lg font-medium tracking-tight md:col-span-5">
                  {local(item.problem)}
                </h3>
                <p className="leading-relaxed text-muted-foreground md:col-span-7">
                  {local(item.solution)}
                </p>
              </article>
            ))}
          </div>
        </section>
        <section className="container cntr mt-24 md:mt-32">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3.5 py-1.5 text-sm font-medium text-primary">
              {t("capabilities.label")}
            </span>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight text-balance md:text-5xl">
              {t("capabilities.titleTemplate", { keyword: targetKeyword })}
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            {service.whatWeBuild.map((section, index) => (
              <article
                key={local(section.heading)}
                className="surface surface-hover p-7 md:p-8"
              >
                <span className="font-mono text-sm font-medium text-primary">
                  0{index + 1}
                </span>
                <h3 className="mt-5 text-2xl font-medium tracking-tight">
                  {local(section.heading)}
                </h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {local(section.body)}
                </p>
              </article>
            ))}
          </div>
        </section>
        <section className="container cntr mt-24 md:mt-32">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3.5 py-1.5 text-sm font-medium text-primary">
              {t("process.label")}
            </span>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
              {t("process.title")}
            </h2>
          </div>
          <div className="surface mt-12 divide-y divide-border overflow-hidden">
            {service.process.map((item, index) => (
              <article
                key={local(item.step)}
                className="grid grid-cols-1 gap-5 px-6 py-7 md:grid-cols-12 md:gap-10 md:px-8"
              >
                <span className="font-mono text-sm text-primary md:col-span-1">
                  0{index + 1}
                </span>
                <h3 className="text-xl font-medium tracking-tight md:col-span-4">
                  {local(item.step)}
                </h3>
                <p className="leading-relaxed text-muted-foreground md:col-span-7">
                  {local(item.detail)}
                </p>
              </article>
            ))}
          </div>
        </section>
        <section className="container cntr mt-24 md:mt-32">
          <div className="grid grid-cols-1 gap-12 border-t border-border pt-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3.5 py-1.5 text-sm font-medium text-primary">
                {t("deliverables.label")}
              </span>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight">
                {t("deliverables.title")}
              </h2>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {local(service.included).map((item) => (
                  <li key={item} className="flex gap-3 text-muted-foreground">
                    <Check
                      size={19}
                      className="mt-1 shrink-0 text-primary"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <section className="container cntr mt-24 md:mt-32">
          <div className="surface px-6 py-10 md:px-10 md:py-14">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3.5 py-1.5 text-sm font-medium text-primary">
              {t("budget.label")}
            </span>
            <h2 className="mt-5 max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
              {t("budget.title")}
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              {local(service.costBand)}
            </p>
            <p className="mt-5 max-w-3xl leading-relaxed text-muted-foreground">
              {t("budget.note")}
            </p>
            {service.stat && (
              <div className="mt-10">
                <StatBlock
                  stat={{ ...service.stat, label: local(service.stat.label) }}
                />
              </div>
            )}
          </div>
        </section>
        <section className="container cntr mt-24 md:mt-32">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3.5 py-1.5 text-sm font-medium text-primary">
              {t("afterLaunch.label")}
            </span>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
              {t("afterLaunch.title")}
            </h2>
            <p className="mt-7 text-lg leading-relaxed text-muted-foreground">
              {local(service.outcomes)}
            </p>
          </div>
        </section>
        {(relatedAlternatives.length > 0 || relatedPosts.length > 0) && (
          <section className="container cntr mt-24 md:mt-32">
            <div className="grid grid-cols-1 gap-12 border-t border-border pt-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3.5 py-1.5 text-sm font-medium text-primary">
                  {t("related.label")}
                </span>
                <h2 className="mt-5 text-3xl font-semibold tracking-tight">
                  {t("related.title")}
                </h2>
              </div>
              <div className="space-y-4 lg:col-span-7 lg:col-start-6">
                {relatedAlternatives.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/alternatives/${item.slug}`}
                    className="group flex items-center justify-between border-b border-border pb-4 text-lg font-medium"
                  >
                    <span>
                      {item.competitor} {t("alternativeSuffix")}
                    </span>
                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                      aria-hidden
                    />
                  </Link>
                ))}
                {relatedPosts.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/blog/${item.slug}`}
                    className="group flex items-center justify-between border-b border-border pb-4 text-lg font-medium"
                  >
                    <span>{item.title}</span>
                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                      aria-hidden
                    />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
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
            {serviceFaqs.map((faq) => (
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
            <h2 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance md:text-5xl">
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
                  data-umami-event-location="service-bottom"
                />
              }
            >
              {t("bottomCta.button")} <ArrowRight size={16} aria-hidden />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
