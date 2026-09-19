import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  breadcrumbJsonLd,
  type Crumb,
} from "@/components/breadcrumb";
import {
  CTABand,
  h2Cls,
  Linked,
  sectionCls,
} from "@/components/service-sections";
import { AnalyticsEvent } from "@/lib/analytics";
import { servicesFor } from "@/lib/case-study-links";
import { Footer } from "@/app/footer";

type Link_ = { text: string; href: string };

export type CaseStudy = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  name: string;
  h1: string;
  summary: string;
  meta: { label: string; value: string }[];
  glance?: { value?: string; text: string }[];
  challenge: { h2: string; body: string };
  approach: { h2: string; body: string };
  built: { h2: string; items: { text: string; links?: Link_[] }[] };
  gallery?: {
    h2: string;
    images: { src: string; width: number; height: number; alt: string }[];
  };
  result?: { h2: string; body: string };
  services: { h2: string };
  testimonial?: { quote: string; author?: string; org: string };
  cta: { h2: string; line: string };
};

const BASE_URL = "https://rizon.agency";
const BOOK_URL = "https://cal.com/rizon.agency-cvbkll/30min";

export const caseStudyMetadata = (c: CaseStudy): Metadata => ({
  title: c.metaTitle,
  description: c.metaDescription,
  alternates: { canonical: `/case-studies/${c.slug}` },
  openGraph: {
    title: c.metaTitle,
    description: c.metaDescription,
    url: `${BASE_URL}/case-studies/${c.slug}`,
    siteName: "Rizon",
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: c.metaTitle,
    description: c.metaDescription,
    creator: "@rizon_agency",
  },
});

export const CaseStudyPage = ({ c }: { c: CaseStudy }) => {
  const path = `/case-studies/${c.slug}`;
  const crumbs: Crumb[] = [
    { name: "Home", href: "/" },
    { name: "Case Studies", href: "/case-studies" },
    { name: c.name, href: path },
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbJsonLd(crumbs),
      ...(c.testimonial
        ? [
            {
              "@type": "Review",
              itemReviewed: { "@id": `${BASE_URL}/#org` },
              author: c.testimonial.author
                ? {
                    "@type": "Person",
                    name: c.testimonial.author,
                    worksFor: {
                      "@type": "Organization",
                      name: c.testimonial.org,
                    },
                  }
                : { "@type": "Organization", name: c.testimonial.org },
              reviewBody: c.testimonial.quote,
            },
          ]
        : []),
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
          <h1 className="mt-10 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight text-balance md:text-6xl">
            {c.h1}
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-muted-foreground">
            {c.summary}
          </p>
          <dl className="mt-10 grid gap-x-8 gap-y-5 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {c.meta.map((m) => (
              <div key={m.label}>
                <dt className="text-sm text-muted-foreground">{m.label}</dt>
                <dd className="mt-1 font-medium">{m.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {c.glance && (
          <section className={sectionCls}>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {c.glance.map((g) => (
                <li key={g.text} className="rounded-lg bg-primary/5 p-7">
                  {g.value && (
                    <span className="text-4xl font-light tracking-tight text-primary">
                      {g.value}
                    </span>
                  )}
                  <p
                    className={
                      g.value
                        ? "mt-3 text-[15px] leading-relaxed text-muted-foreground"
                        : "font-medium leading-snug"
                    }
                  >
                    {g.text}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {[c.challenge, c.approach].map((s) => (
          <section key={s.h2} className={sectionCls}>
            <h2 className={h2Cls}>{s.h2}</h2>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              {s.body}
            </p>
          </section>
        ))}

        <section className={sectionCls}>
          <h2 className={h2Cls}>{c.built.h2}</h2>
          <ul className="mt-8 grid max-w-3xl gap-4">
            {c.built.items.map((item) => (
              <li
                key={item.text}
                className="flex gap-3 text-lg text-muted-foreground"
              >
                <Check
                  size={20}
                  className="mt-1 shrink-0 text-primary"
                  aria-hidden
                />
                <span>
                  <Linked text={item.text} links={item.links} />
                </span>
              </li>
            ))}
          </ul>
        </section>

        {c.gallery && (
          <section className={sectionCls}>
            <h2 className={h2Cls}>{c.gallery.h2}</h2>
            <ul className="mt-8 grid gap-6 md:grid-cols-2">
              {c.gallery.images.map((img, i) => (
                <li
                  key={img.src}
                  className={i === 0 ? "md:col-span-2" : undefined}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    loading="lazy"
                    sizes={
                      i === 0
                        ? "(min-width: 1280px) 1200px, 100vw"
                        : "(min-width: 768px) 50vw, 100vw"
                    }
                    className="h-auto w-full rounded-2xl border border-border"
                  />
                </li>
              ))}
            </ul>
          </section>
        )}

        {c.result && (
          <section className={sectionCls}>
            <h2 className={h2Cls}>{c.result.h2}</h2>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              {c.result.body}
            </p>
          </section>
        )}

        <section className={sectionCls}>
          <h2 className={h2Cls}>{c.services.h2}</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {servicesFor(c.slug).map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="group flex items-center justify-between rounded-lg bg-primary/5 p-6 font-semibold text-primary"
                >
                  {s.title}
                  <ArrowRight
                    size={18}
                    aria-hidden
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {c.testimonial && (
          <section className={sectionCls}>
            <figure className="max-w-3xl">
              <blockquote className="text-2xl leading-snug tracking-tight text-balance md:text-3xl">
                &ldquo;{c.testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-muted-foreground">
                {c.testimonial.author ? `${c.testimonial.author}, ` : ""}
                {c.testimonial.org}
              </figcaption>
            </figure>
          </section>
        )}

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
                  href={BOOK_URL}
                  target="_blank"
                  rel="noreferrer"
                  data-umami-event={AnalyticsEvent.BookCall}
                  data-umami-event-location="case-study-cta"
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
};
