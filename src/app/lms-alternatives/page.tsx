import { getT } from "@/lib/t";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { alternatives } from "@/lib/alternatives";
import { Eyebrow } from "@/components/eyebrow";
import { Footer } from "../footer";
import { AnalyticsEvent } from "@/lib/analytics";

const BASE_URL = "https://rizon.agency";

export async function generateMetadata(): Promise<Metadata> {
  const t = getT("seo.lmsAlternatives");
  const path = "/lms-alternatives";
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: path,
      siteName: "Rizon",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: `${BASE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: t("ogAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("ogDescription"),
      creator: "@rizon_agency",
    },
  };
}

const faqKeys = ["worthIt", "replaceWorking", "stages"] as const;

export default async function LmsAlternativesPage() {
  const t = getT("lmsAlternativesPage");
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${BASE_URL}/lms-alternatives#webpage`,
        url: `${BASE_URL}/lms-alternatives`,
        name: "LMS Alternatives",
        mainEntity: {
          "@type": "ItemList",
          itemListElement: alternatives.map((alternative, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${BASE_URL}/alternatives/${alternative.slug}`,
            name: `${alternative.competitor} ${t("alternativeSuffix")}`,
          })),
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqKeys.map((key) => ({
          "@type": "Question",
          name: t(`faq.items.${key}.question`),
          acceptedAnswer: {
            "@type": "Answer",
            text: t(`faq.items.${key}.answer`),
          },
        })),
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
        <section className="container cntr pt-32 md:pt-40">
          <div className="max-w-4xl">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight leading-[1.02] text-balance md:text-6xl">
              {t("h1")}
            </h1>
            <p className="mt-7 max-w-3xl text-xl leading-relaxed text-muted-foreground">
              {t("sub")}
            </p>
          </div>
        </section>
        <section className="container cntr mt-16 md:mt-20">
          <div className="surface overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-[15px]">
              <thead className="bg-muted/50">
                <tr>
                  <th scope="col" className="px-5 py-4">
                    {t("table.platform")}
                  </th>
                  <th scope="col" className="border-l border-border px-5 py-4">
                    {t("table.bestFit")}
                  </th>
                  <th scope="col" className="border-l border-border px-5 py-4">
                    {t("table.whyCustom")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {alternatives.map((alternative) => (
                  <tr key={alternative.slug} className="border-t border-border">
                    <th scope="row" className="px-5 py-5 font-medium">
                      <Link
                        href={`/alternatives/${alternative.slug}`}
                        className="underline underline-offset-4 hover:text-primary"
                      >
                        {alternative.competitor}
                      </Link>
                    </th>
                    <td className="border-l border-border px-5 py-5 text-muted-foreground">
                      {alternative.category}
                    </td>
                    <td className="border-l border-border px-5 py-5 text-muted-foreground">
                      {alternative.whyLeave[0].title}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="container cntr mt-24 md:mt-32">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {alternatives.map((alternative) => (
              <article
                key={alternative.slug}
                className="surface surface-hover flex flex-col p-7 md:p-8"
              >
                <span className="inline-flex w-fit items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                  {alternative.category}
                </span>
                <h2 className="mt-5 text-2xl font-semibold tracking-tight">
                  {alternative.competitor} {t("alternativeSuffix")}
                </h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {alternative.heroSub}
                </p>
                <Link
                  href={`/alternatives/${alternative.slug}`}
                  className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary"
                >
                  {t("readComparison")}{" "}
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </Link>
              </article>
            ))}
          </div>
        </section>
        <section className="container cntr mt-24 md:mt-32">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3.5 py-1.5 text-sm font-medium text-primary">
              {t("faq.eyebrow")}
            </span>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
              {t("faq.title")}
            </h2>
          </div>
          <div className="surface mt-12 divide-y divide-border overflow-hidden">
            {faqKeys.map((key) => (
              <article
                key={key}
                className="grid grid-cols-1 gap-5 px-6 py-7 md:grid-cols-12 md:px-8"
              >
                <h3 className="text-lg font-medium md:col-span-5">
                  {t(`faq.items.${key}.question`)}
                </h3>
                <p className="leading-relaxed text-muted-foreground md:col-span-7">
                  {t(`faq.items.${key}.answer`)}
                </p>
              </article>
            ))}
          </div>
        </section>
        <section className="container cntr mt-24 md:mt-32">
          <div className="rounded-3xl bg-primary px-6 py-14 text-primary-foreground md:px-12 md:py-20">
            <h2 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
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
                  data-umami-event-location="lms-alternatives"
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
