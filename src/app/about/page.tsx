import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  breadcrumbJsonLd,
  type Crumb,
} from "@/components/breadcrumb";
import { IconCard } from "@/components/icon-card";
import { CTABand, h2Cls, sectionCls } from "@/components/service-sections";
import { about as c } from "@/lib/about";
import { AnalyticsEvent } from "@/lib/analytics";
import { Footer } from "../footer";
import { LogoStrip } from "../logos";

const BASE_URL = "https://rizon.agency";
const path = "/about";

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
    type: "profile",
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
  { name: "About", href: path },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    breadcrumbJsonLd(crumbs),
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#org`,
      name: "Rizon",
      legalName: "Rizon LLC",
      url: BASE_URL,
      founder: { "@id": `${BASE_URL}/about#choaib` },
      knowsAbout: [
        "Custom LMS development",
        "LTI integration and development",
        "Moodle development",
        "Canvas LMS development",
        "LTI 1.1 to 1.3 migration",
      ],
    },
    {
      "@type": "Person",
      "@id": `${BASE_URL}/about#choaib`,
      name: "Choaib Mouhrach",
      alternateName: "Choaib",
      jobTitle: "Founder",
      description:
        "Founder of Rizon and a software engineer who builds learning platforms and LMS integrations.",
      url: `${BASE_URL}/about`,
      image: `${BASE_URL}${c.who.photo.src}`,
      knowsAbout: [
        "Learning management systems",
        "Custom LMS development",
        "LTI",
        "Moodle",
        "Canvas",
      ],
      worksFor: { "@id": `${BASE_URL}/#org` },
      sameAs: ["https://www.linkedin.com/in/choaib-mouhrach"],
    },
  ],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <section className="container cntr pt-24 md:pt-28">
          <Breadcrumb items={crumbs} />
          <h1 className="mt-10 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight text-balance md:text-6xl">
            {c.h1}
          </h1>
        </section>

        <section className="container cntr mt-12 md:mt-16">
          <h2 className={h2Cls}>{c.lead.h2}</h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            {c.lead.body}
          </p>
        </section>

        <section className={sectionCls}>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            {/* Photo stacks above the text on mobile, sits left on desktop. */}
            <div className="lg:col-span-5">
              <Image
                src={c.who.photo.src}
                alt={c.who.photo.alt}
                width={c.who.photo.width}
                height={c.who.photo.height}
                loading="lazy"
                sizes="(min-width: 1024px) 420px, 100vw"
                className="h-auto w-full max-w-sm rounded-2xl border border-border"
              />
            </div>
            <div className="lg:col-span-7">
              <h2 className={h2Cls}>{c.who.h2}</h2>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
                {c.who.body}
              </p>
            </div>
          </div>
        </section>

        <section className={sectionCls}>
          <h2 className={h2Cls}>{c.how.h2}</h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            {c.how.intro}
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {c.how.items.map((item) => (
              <li key={item.title}>
                <IconCard icon={item.icon} title={item.title}>
                  {item.body}
                </IconCard>
              </li>
            ))}
          </ul>
        </section>

        <section className={sectionCls}>
          <h2 className={h2Cls}>{c.believe.h2}</h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            {c.believe.body}
          </p>
        </section>

        <section className={sectionCls}>
          <h2 className={h2Cls}>{c.proof.h2}</h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            {c.proof.line}
          </p>
          <div className="mt-10">
            <LogoStrip />
          </div>
          <Link
            href="/case-studies"
            className="mt-10 inline-flex items-center gap-1.5 font-medium text-primary"
          >
            {c.proof.cta} <ArrowRight size={16} aria-hidden />
          </Link>
        </section>

        <CTABand
          h2={c.cta.h2}
          line={c.cta.line}
          action={
            <Button
              size="lg"
              variant="secondary"
              nativeButton={false}
              render={
                <Link
                  href="https://cal.com/rizon.agency-cvbkll/30min"
                  target="_blank"
                  rel="noreferrer"
                  data-umami-event={AnalyticsEvent.BookCall}
                  data-umami-event-location="about"
                />
              }
            >
              Book a free 30-min discovery call{" "}
              <ArrowRight size={16} aria-hidden />
            </Button>
          }
        />
      </main>
      <Footer />
    </>
  );
}
