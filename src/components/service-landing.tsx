import { getT } from "@/lib/t";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  breadcrumbJsonLd,
  type Crumb,
} from "@/components/breadcrumb";
import { Hero } from "@/components/hero";
import { caseCardProps } from "@/lib/case-studies-index";
import { casesFor } from "@/lib/case-study-links";
import { AnalyticsEvent } from "@/lib/analytics";
import type { ServiceLanding as Content } from "@/lib/blank-services";
import {
  CaseStudyCards,
  CostAEO,
  CTABand,
  FAQAccordion,
  ProblemAgitateSolution,
  ProcessSteps,
  RelatedWork,
} from "@/components/service-sections";
import { Logos } from "@/app/logos";
import heroImage from "@/assets/hero.jpg";

const BASE_URL = "https://rizon.agency";
const BOOK_URL = "https://cal.com/rizon.agency-cvbkll/30min";

// Empty copy renders as a visible [placeholder] so the structure is reviewable.
const ph = (value: string, label: string) => value || `[${label}]`;

export const ServiceLanding = async ({ content }: { content: Content }) => {
  const t = getT("serviceLanding");
  const tNav = getT("nav");
  const tDetail = getT("serviceDetail");
  const title = content.title ?? tNav(`serviceItems.${content.key}.title`);
  const path = `/services/${content.slug}`;
  const url = `https://rizon.agency${path}`;

  const crumbs: Crumb[] = [
    { name: tDetail("breadcrumbs.home"), href: "/" },
    { name: tDetail("breadcrumbs.services"), href: "/services" },
    { name: title, href: path },
  ];
  // Proof cards come from the shared case study <-> service mapping.
  const cases = casesFor(content.slug).flatMap(
    (slug) => caseCardProps(slug) ?? [],
  );
  const faqs = content.faqs.map((f) => ({
    question: f.question,
    answer: f.answer,
    link: f.link,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: title,
        serviceType: title,
        description: content.metaDescription || undefined,
        url,
        provider: { "@id": `${BASE_URL}/#org` },
        areaServed: "Worldwide",
      },
      breadcrumbJsonLd(crumbs),
      ...(faqs.length
        ? [
            {
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: { "@type": "Answer", text: f.answer },
              })),
            },
          ]
        : []),
    ],
  };

  const bookCall = (location: string) => (
    <Link
      href={BOOK_URL}
      target="_blank"
      rel="noreferrer"
      data-umami-event={AnalyticsEvent.BookCall}
      data-umami-event-location={location}
    />
  );
  const cta = (location: string) => (
    <Button
      size="lg"
      variant={location === "service-final-cta" ? "secondary" : "default"}
      nativeButton={false}
      render={bookCall(location)}
    >
      {t("ctaPrimary")} <ArrowRight size={16} aria-hidden />
    </Button>
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
          headline={ph(content.h1, "H1: the service, under 11 words")}
          // Short H1s get the Hero's full-size default; long ones scale down.
          headlineClassName={
            content.h1.split(" ").length > 5
              ? "text-[clamp(1.875rem,3vw,3.25rem)] leading-[1.1]"
              : undefined
          }
          stats={content.heroStats?.map((st) => ({
            value: (
              <>
                {st.before}
                <span className="text-primary">{st.highlight}</span>
                {st.after}
              </>
            ),
            label: st.label,
          }))}
          sub={ph(content.subhead, "Subhead: one sentence, ownership first")}
          image={heroImage}
          imageAlt={content.heroAlt}
          tags={content.heroTags}
          actions={
            <>
              {cta("service-hero")}
              <Button
                size="lg"
                variant="outline"
                nativeButton={false}
                render={<Link href="/#work" />}
                className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                {t("ctaSecondary")}
              </Button>
            </>
          }
        />
        <Logos />
        <ProblemAgitateSolution
          problem={{
            h2: ph(content.problem.h2, "Problem H2"),
            body: ph(content.problem.body, "Problem paragraph"),
          }}
          agitate={{
            h2: ph(content.agitate.h2, "Agitate H2"),
            body: ph(content.agitate.body, "Agitate paragraph"),
          }}
          solution={{
            h2: ph(content.solution.h2, "Solution H2"),
            body: ph(content.solution.body, "Solution paragraph"),
            features: content.solution.features.map((f, i) => ({
              feature: ph(f.feature, `Feature ${i + 1}`),
              benefit: ph(f.benefit, `Benefit ${i + 1}`),
              icon: f.icon,
              titleHref: f.titleHref,
              links: f.links,
            })),
          }}
        />
        <ProcessSteps
          h2={ph(content.howWeWork.h2, "How we [build/migrate/etc.]")}
          steps={content.howWeWork.steps.map((s) => ({
            ...s,
            title: s.title,
            body: s.body,
          }))}
        />
        <CostAEO
          h2={ph(content.cost.h2, "How much does [service] cost?")}
          answer={ph(content.cost.answer, "Answer-first, 40 to 60 words")}
          support={ph(content.cost.support, "What moves the price")}
        />
        {cases.length > 0 ? (
          <CaseStudyCards
            h2={ph(content.proof.h2, "Platforms we've built")}
            allHref="/case-studies"
            allLabel={t("seeAllCases")}
            cases={cases}
          />
        ) : (
          <RelatedWork href="/case-studies" label="See related work" />
        )}
        <FAQAccordion h2={ph(content.faqH2, "FAQ H2")} faqs={faqs} />
        <CTABand
          h2={ph(content.finalCta.h2, "Reassurance headline")}
          line={ph(content.finalCta.line, "No pitch, no obligation")}
          action={cta("service-final-cta")}
        />
      </main>
    </>
  );
};
