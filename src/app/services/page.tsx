import { getT } from "@/lib/t";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Footer } from "../footer";
import { Logos } from "../logos";
import { Hero } from "@/components/hero";
import { IconCard } from "@/components/icon-card";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  breadcrumbJsonLd,
  type Crumb,
} from "@/components/breadcrumb";
import {
  CTABand,
  FAQAccordion,
  h2Cls,
  sectionCls,
} from "@/components/service-sections";
import { servicesIndex as c } from "@/lib/services-index";
import { AnalyticsEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import heroImage from "@/assets/hero.jpg";

const BOOK_URL = "https://cal.com/rizon.agency-cvbkll/30min";
const CTA_LABEL = "Book a free 30-min discovery call";

export async function generateMetadata(): Promise<Metadata> {
  const path = "/services";
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: {
      canonical: path,
    },
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
}

export default async function ServicesPage() {
  const tDetail = getT("serviceDetail");
  const crumbs: Crumb[] = [
    { name: tDetail("breadcrumbs.home"), href: "/" },
    { name: tDetail("breadcrumbs.services"), href: "/services" },
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbJsonLd(crumbs),
      {
        "@type": "FAQPage",
        mainEntity: c.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };
  const book = (location: string) => (
    <Link
      href={BOOK_URL}
      target="_blank"
      rel="noreferrer"
      data-umami-event={AnalyticsEvent.BookCall}
      data-umami-event-location={location}
    />
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <Hero
          eyebrow={<Breadcrumb items={crumbs} />}
          headline={c.h1}
          sub={c.intro}
          image={heroImage}
          imageAlt="Learners working at computers in a library"
          actions={
            <Button size="lg" nativeButton={false} render={book("services-hero")}>
              {CTA_LABEL} <ArrowRight size={16} aria-hidden />
            </Button>
          }
        />
        <Logos />
        {c.groups.map((g) => (
          <section key={g.h2} className={sectionCls}>
            <h2 className={h2Cls}>{g.h2}</h2>
            <ul className="mt-10 grid gap-4 md:grid-cols-2">
              {g.items.map(({ slug, icon, title, body }) => (
                <li key={slug}>
                  <Link href={`/services/${slug}`} className="group block h-full">
                    <IconCard
                      icon={icon}
                      title={
                        <span className="inline-flex items-center gap-2">
                          {title}
                          <ArrowRight
                            size={18}
                            aria-hidden
                            className="transition-transform group-hover:translate-x-1"
                          />
                        </span>
                      }
                    >
                      {body}
                    </IconCard>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
        <section className={sectionCls}>
          <div className="rounded-3xl bg-muted/50 px-6 py-12 md:px-10 md:py-16">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3.5 py-1.5 text-sm font-medium text-primary">
              {c.useCases.label}
            </span>
            <h2 className={cn(h2Cls, "mt-5")}>{c.useCases.h2}</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {c.useCases.line}
            </p>
            <ul className="mt-10 grid gap-4 md:grid-cols-3">
              {c.useCases.items.map(({ slug, icon: Icon, title, body }) => (
                <li key={slug}>
                  <Link
                    href={`/services/${slug}`}
                    className="surface surface-hover group flex h-full flex-col p-7"
                  >
                    <Icon size={22} strokeWidth={1.75} className="text-primary" aria-hidden />
                    <h3 className="mt-6 text-xl font-semibold tracking-tight">{title}</h3>
                    <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">
                      {body}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
                      See the solution
                      <ArrowRight
                        size={16}
                        aria-hidden
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <FAQAccordion h2={c.faqH2} faqs={c.faqs} />
        <CTABand
          h2={c.cta.h2}
          line={c.cta.line}
          action={
            <Button
              size="lg"
              variant="secondary"
              nativeButton={false}
              render={book("services-final-cta")}
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
