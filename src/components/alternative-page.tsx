import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
  Linked,
  sectionCls,
} from "@/components/service-sections";
import { AnalyticsEvent } from "@/lib/analytics";
import type { AlternativeLanding } from "@/lib/alternative-pages";
import { Footer } from "@/app/footer";

const BASE_URL = "https://rizon.agency";
const BOOK_URL = "https://cal.com/rizon.agency-cvbkll/30min";
const CTA_LABEL = "Book a free 30-min discovery call";
const bodyCls = "mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground";

export const alternativeMetadata = (a: AlternativeLanding) => {
  const path = `/alternatives/${a.slug}`;
  return {
    title: a.metaTitle,
    description: a.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: a.metaTitle,
      description: a.metaDescription,
      url: `${BASE_URL}${path}`,
      siteName: "Rizon",
      locale: "en_US",
      type: "website" as const,
    },
    twitter: {
      card: "summary_large_image" as const,
      title: a.metaTitle,
      description: a.metaDescription,
      creator: "@rizon_agency",
    },
  };
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

const Paras = ({
  text,
  links,
}: {
  text: string;
  links?: { text: string; href: string }[];
}) =>
  text.split("\n\n").map((para, i) => (
    <p key={i} className={bodyCls}>
      <Linked text={para} links={links} />
    </p>
  ));

const ComparisonTable = ({
  t,
}: {
  t: NonNullable<AlternativeLanding["table"]>;
}) => (
  <section className={sectionCls}>
    <h2 className={h2Cls}>{t.h2}</h2>
    <div className="mt-10 hidden overflow-hidden rounded-lg border md:block">
      <table className="w-full text-left text-sm">
        <thead className="bg-primary/5">
          <tr>
            {t.columns.map((c) => (
              <th key={c} scope="col" className="p-4 font-semibold">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {t.rows.map(([name, ...rest], r) => (
            <tr
              key={name}
              className={`border-t align-top ${r === t.rows.length - 1 ? "bg-primary/5 shadow-[inset_3px_0_0_var(--color-primary)]" : ""}`}
            >
              <th scope="row" className="p-4 font-semibold text-primary">
                {name}
              </th>
              {rest.map((cell, i) => (
                <td key={i} className="p-4 text-muted-foreground">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <ul className="mt-10 grid gap-4 md:hidden">
      {t.rows.map(([name, ...rest], r) => (
        <li
          key={name}
          className={`rounded-lg bg-primary/5 p-6 ${r === t.rows.length - 1 ? "border-2 border-primary/40" : ""}`}
        >
          <h3 className="text-lg font-semibold text-primary">{name}</h3>
          <dl className="mt-3 space-y-2 text-sm">
            {rest.map((cell, i) => (
              <div key={i}>
                <dt className="font-medium">{t.columns[i + 1]}</dt>
                <dd className="text-muted-foreground">{cell}</dd>
              </div>
            ))}
          </dl>
        </li>
      ))}
    </ul>
    <p className="mt-4 text-sm italic text-muted-foreground">{t.note}</p>
  </section>
);

export const AlternativePage = ({ a }: { a: AlternativeLanding }) => {
  const crumbs: Crumb[] = [
    { name: "Home", href: "/" },
    { name: "Alternatives", href: "/alternatives" },
    { name: a.name, href: `/alternatives/${a.slug}` },
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbJsonLd(crumbs),
      {
        "@type": "FAQPage",
        mainEntity: a.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
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
        <section className="container cntr pt-24 md:pt-28">
          <Breadcrumb items={crumbs} />
          <h1 className="mt-10 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight text-balance md:text-6xl">
            {a.h1}
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-muted-foreground">
            {a.subhead}
          </p>
          <Button
            size="lg"
            className="mt-8"
            nativeButton={false}
            render={book("alternative-hero")}
          >
            {CTA_LABEL} <ArrowRight size={16} aria-hidden />
          </Button>
        </section>

        <section className={sectionCls}>
          <h2 className={h2Cls}>{a.why.h2}</h2>
          <Paras text={a.why.body} />
        </section>

        {a.table && <ComparisonTable t={a.table} />}

        <section className={sectionCls}>
          <h2 className={h2Cls}>{a.options.h2}</h2>
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {a.options.items.map((item, i) => (
              <li
                key={item.name}
                className={
                  i === a.options.items.length - 1 && i % 2 === 0
                    ? "rounded-lg bg-primary/5 p-7 md:col-span-2 md:p-8"
                    : "rounded-lg bg-primary/5 p-7 md:p-8"
                }
              >
                <h3 className="text-xl font-semibold tracking-tight text-primary">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="underline underline-offset-4"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    item.name
                  )}
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className={sectionCls}>
          <div className="rounded-3xl bg-primary/5 p-8 md:p-12">
            <h2 className={h2Cls}>{a.custom.h2}</h2>
            <Paras text={a.custom.body} links={a.custom.links} />
          </div>
        </section>

        <section className={sectionCls}>
          <h2 className={h2Cls}>{a.choose.h2}</h2>
          <p className={bodyCls}>
            <Linked text={a.choose.body} links={a.choose.links} />
          </p>
          <p className={bodyCls}>
            Still unsure?{" "}
            <Link
              href="/alternatives/which-lms-is-right-for-you"
              className="text-primary underline underline-offset-4"
            >
              Take the free 5-question LMS selector
            </Link>{" "}
            for an honest recommendation.
          </p>
        </section>

        <FAQAccordion h2={a.faqH2} faqs={a.faqs} />

        <CTABand
          h2={a.cta.h2}
          line={a.cta.line}
          action={
            <Button
              size="lg"
              variant="secondary"
              nativeButton={false}
              render={book("alternative-final-cta")}
            >
              {CTA_LABEL} <ArrowRight size={16} aria-hidden />
            </Button>
          }
        />
      </main>
      <Footer />
    </>
  );
};
