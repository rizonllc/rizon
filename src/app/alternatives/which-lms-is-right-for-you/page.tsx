import Link from "next/link";
import type { Metadata } from "next";
import { Footer } from "../../footer";
import {
  Breadcrumb,
  breadcrumbJsonLd,
  type Crumb,
} from "@/components/breadcrumb";
import { LmsSelector } from "@/components/lms-selector";
import { h2Cls, sectionCls } from "@/components/service-sections";
import { questions, results } from "@/lib/lms-selector";

const path = "/alternatives/which-lms-is-right-for-you";
const title = "Which LMS Is Right for You? Free LMS Selector | Rizon";
const description =
  "Answer 5 questions and get an honest LMS recommendation: hosted, open-source, or custom-built. Free, no signup.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: {
    title,
    description,
    url: path,
    siteName: "Rizon",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@rizon_agency",
  },
};

const crumbs: Crumb[] = [
  { name: "Home", href: "/" },
  { name: "Alternatives", href: "/alternatives" },
  { name: "Which LMS Is Right for You", href: path },
];

export default function WhichLmsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbJsonLd(crumbs)],
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
            Which LMS Is Right for You?
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-muted-foreground">
            Choosing the best LMS is mostly about fit, not features. Answer 5
            quick questions for an honest recommendation, even if that&apos;s
            not us. It&apos;s free, with no signup.
          </p>
          <div className="mt-10">
            <LmsSelector />
          </div>
        </section>

        <section className={sectionCls}>
          <h2 className={h2Cls}>How to choose an LMS: the 5 questions</h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            An LMS comparison only helps once you know what you are comparing
            for. These are the five things that decide it.
          </p>
          <ol className="mt-10 grid gap-4 md:grid-cols-2">
            {questions.map((q, i) => (
              <li key={q.id} className="rounded-lg bg-primary/5 p-7">
                <p className="font-semibold tracking-tight text-primary">
                  {i + 1}. {q.prompt}
                </p>
                <ul className="mt-3 list-disc pl-5 text-muted-foreground">
                  {q.options.map((o) => (
                    <li key={o.id}>{o.label}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <section className={sectionCls}>
          <h2 className={h2Cls}>The possible answers, and why</h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Some of these point away from custom development on purpose. The
            right LMS is the one that fits, and often that is not a build.
          </p>
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {Object.values(results).map((r) => (
              <li key={r.id} className="rounded-lg bg-primary/5 p-7">
                <h3 className="text-xl font-semibold tracking-tight text-primary">
                  {r.path}
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {r.body}
                </p>
                <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
                  {r.links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="text-primary underline underline-offset-4"
                    >
                      {l.text}
                    </Link>
                  ))}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
