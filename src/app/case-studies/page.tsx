import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Footer } from "../footer";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  breadcrumbJsonLd,
  type Crumb,
} from "@/components/breadcrumb";
import { CTABand } from "@/components/service-sections";
import { caseCardProps, caseStudiesIndex as c } from "@/lib/case-studies-index";
import { isCaseVisible } from "@/lib/case-study-links";
import { CaseStudyCard } from "@/components/case-study-card";
import { AnalyticsEvent } from "@/lib/analytics";

const BOOK_URL = "https://cal.com/rizon.agency-cvbkll/30min";
const CTA_LABEL = "Book a free 30-min discovery call";
const path = "/case-studies";

export const metadata: Metadata = {
  title: c.metaTitle,
  description: c.metaDescription,
  alternates: { canonical: path },
  openGraph: {
    title: c.metaTitle,
    description: c.metaDescription,
    url: path,
    siteName: "Rizon",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: c.metaTitle,
    description: c.metaDescription,
    creator: "@rizon_agency",
  },
};

const crumbs: Crumb[] = [
  { name: "Home", href: "/" },
  { name: "Case Studies", href: path },
];

const book = (location: string) => (
  <Link
    href={BOOK_URL}
    target="_blank"
    rel="noreferrer"
    data-umami-event={AnalyticsEvent.BookCall}
    data-umami-event-location={location}
  />
);

export default function CaseStudiesPage() {
  const cards = c.sections
    .flatMap((sec) => sec.cards)
    .filter((card) => isCaseVisible(card.study.slug));
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(crumbs)),
        }}
      />
      <main>
        <section className="container cntr pt-24 md:pt-28">
          <Breadcrumb items={crumbs} />
          <h1 className="mt-10 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight text-balance md:text-6xl">
            {c.h1}
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-muted-foreground">
            {c.intro}
          </p>
          <Button
            size="lg"
            className="mt-8"
            nativeButton={false}
            render={book("case-studies-hero")}
          >
            {CTA_LABEL} <ArrowRight size={16} aria-hidden />
          </Button>
        </section>
        <section className="container cntr mt-16 md:mt-20">
          <ul className="grid gap-4 md:grid-cols-2">
            {cards.map(({ study }) => {
              const props = caseCardProps(study.slug);
              return props && <CaseStudyCard key={study.slug} {...props} />;
            })}
          </ul>
        </section>
        <CTABand
          h2={c.cta.h2}
          line={c.cta.line}
          action={
            <Button
              size="lg"
              variant="secondary"
              nativeButton={false}
              render={book("case-studies-final-cta")}
            >
              {CTA_LABEL} <ArrowRight size={16} aria-hidden />
            </Button>
          }
        />
      </main>
      <Footer />
    </>
  );
}
