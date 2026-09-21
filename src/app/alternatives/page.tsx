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
import { CTABand, h2Cls, sectionCls } from "@/components/service-sections";
import { AnalyticsEvent } from "@/lib/analytics";

const BOOK_URL = "https://cal.com/rizon.agency-cvbkll/30min";
const CTA_LABEL = "Book a free 30-min discovery call";
const path = "/alternatives";
const title =
  "Best LMS Platforms Compared: Alternatives & Honest Comparisons | Rizon";
const description =
  "Honest comparisons of the best LMS and course platforms (Teachable, Kajabi, Moodle, Docebo, and more), including when a custom-built platform beats them all.";

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

const groups = [
  {
    name: "Course creator platforms",
    cards: [
      ["Teachable", "Own your platform instead of paying per sale."],
      ["Kajabi", "Escape premium monthly pricing."],
      ["Thinkific", "Grow past plan limits and fees."],
    ],
  },
  {
    name: "Corporate & enterprise LMS",
    cards: [
      ["Docebo", "An enterprise LMS without per-seat contracts."],
      ["TalentLMS", "Outgrow the starter LMS ceiling."],
    ],
  },
  {
    name: "Open-source",
    cards: [["Moodle", "Moodle's freedom without the maintenance."]],
  },
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

export default function AlternativesHub() {
  const crumbs: Crumb[] = [
    { name: "Home", href: "/" },
    { name: "Alternatives", href: path },
  ];
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
            LMS &amp; Course Platform Comparisons
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-muted-foreground">
            Choosing or switching platforms? These are honest comparisons of the
            most common LMS and course platforms: what each does well, where it
            falls short, and who it fits. And for each one, we cover the option
            most comparison pages leave out: a custom-built platform you own
            outright, with no per-seat or per-sale fees.
          </p>
          <Button
            size="lg"
            className="mt-8"
            nativeButton={false}
            render={book("alternatives-hub-hero")}
          >
            {CTA_LABEL} <ArrowRight size={16} aria-hidden />
          </Button>
        </section>

        {groups.map((g) => (
          <section key={g.name} className={sectionCls}>
            <h2 className={h2Cls}>{g.name}</h2>
            <ul className="mt-10 grid gap-4 md:grid-cols-2">
              {g.cards.map(([name, line]) => (
                <li key={name}>
                  <Link
                    href={`/alternatives/${name.toLowerCase()}`}
                    className="group block h-full rounded-lg bg-primary/5 p-7 md:p-8"
                  >
                    <h3 className="text-xl font-semibold tracking-tight text-primary">
                      {name} alternatives
                    </h3>
                    <p className="mt-3 leading-relaxed text-muted-foreground">
                      {line}
                    </p>
                    <ArrowRight
                      size={16}
                      className="mt-5 text-primary transition-transform group-hover:translate-x-1"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section className={sectionCls}>
          <Link
            href="/alternatives/which-lms-is-right-for-you"
            className="group block rounded-lg bg-primary/5 p-7 md:p-8"
          >
            <h2 className="text-xl font-semibold tracking-tight text-primary">
              Not sure which LMS fits? Take the 5-question selector
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Free, no signup, and honest: sometimes the answer is a platform
              that isn&apos;t us.
            </p>
            <ArrowRight
              size={16}
              className="mt-5 text-primary transition-transform group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </section>

        <section className={sectionCls}>
          <div className="rounded-3xl bg-primary/5 p-8 md:p-12">
            <h2 className={h2Cls}>
              The option most comparisons skip: owning your platform
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              Every hosted platform on this page is something you rent, per
              seat, per sale, or per month, on someone else&apos;s roadmap. For
              many teams that&apos;s fine. But once your courses or training are
              a real part of your business, renting starts to cost more than it
              should, in money and in flexibility. A custom-built platform is
              the alternative the comparison sites don&apos;t sell you: built
              around exactly how you work, owned outright, with no recurring
              platform fees. It&apos;s not right for everyone, but it&apos;s
              worth knowing it&apos;s an option. Read more about{" "}
              <Link
                href="/services/custom-lms-development"
                className="text-primary underline underline-offset-4"
              >
                custom LMS development
              </Link>
              .
            </p>
          </div>
        </section>

        <CTABand
          h2="Not sure which way to go?"
          line="Tell us what you're using now and what's not working. In 30 minutes, we'll give you an honest take on whether to switch, stay, or build. No pitch, no obligation."
          action={
            <Button
              size="lg"
              variant="secondary"
              nativeButton={false}
              render={book("alternatives-hub-final-cta")}
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
