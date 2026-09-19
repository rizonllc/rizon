import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  breadcrumbJsonLd,
  type Crumb,
} from "@/components/breadcrumb";
import { Hero } from "@/components/hero";
import { getProjectBySlug } from "@/lib/projects";
import { l } from "@/lib/l10n";
import { localizedUrl } from "@/i18n/hreflang";
import { AnalyticsEvent } from "@/lib/analytics";
import type { Locale } from "@/i18n/routing";
import type { ServiceLanding as Content } from "@/lib/blank-services";
import {
  CaseStudyCards,
  CostAEO,
  CTABand,
  FAQAccordion,
  ProblemAgitateSolution,
  ProcessSteps,
} from "@/components/service-sections";
import { Logos } from "@/app/[locale]/logos";
import heroImage from "@/assets/hero.jpg";

const BASE_URL = "https://rizon.agency";
const BOOK_URL = "https://cal.com/rizon.agency-cvbkll/30min";

// Empty copy renders as a visible [placeholder] so the structure is reviewable.
const ph = (value: string, label: string) => value || `[${label}]`;

export const ServiceLanding = async ({
  content,
  locale,
}: {
  content: Content;
  locale: Locale;
}) => {
  const t = await getTranslations({ locale, namespace: "serviceLanding" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tDetail = await getTranslations({ locale, namespace: "serviceDetail" });
  const local = (v: Parameters<typeof l<string>>[0]) => l(v, locale);
  const title = tNav(`serviceItems.${content.key}.title`);
  const path = `/services/${content.slug}`;
  const url = localizedUrl(path, locale);

  const crumbs: Crumb[] = [
    { name: tDetail("breadcrumbs.home"), href: "/" },
    { name: tDetail("breadcrumbs.services"), href: "/services" },
    { name: title, href: path },
  ];
  const faqs = content.faqs.map((f) => ({
    question: local(f.question),
    answer: local(f.answer),
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: title,
        description: local(content.metaDescription) || undefined,
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
          headline={ph(local(content.h1), "H1: the service, under 11 words")}
          // Short H1s get the Hero's full-size default; long ones scale down.
          headlineClassName={
            local(content.h1).split(" ").length > 5
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
            label: local(st.label),
          }))}
          sub={ph(
            local(content.subhead),
            "Subhead: one sentence, ownership first",
          )}
          image={heroImage}
          imageAlt={local(content.heroAlt)}
          tags={content.heroTags}
          note={local(content.trustLine) || undefined}
          actions={
            <>
              {cta("service-hero")}
              <Button
                size="lg"
                variant="outline"
                nativeButton={false}
                render={<Link href="/#work" />}
              >
                {t("ctaSecondary")}
              </Button>
            </>
          }
        />
        <Logos />
        <ProblemAgitateSolution
          problem={{
            h2: ph(local(content.problem.h2), "Problem H2"),
            body: ph(local(content.problem.body), "Problem paragraph"),
          }}
          agitate={{
            h2: ph(local(content.agitate.h2), "Agitate H2"),
            body: ph(local(content.agitate.body), "Agitate paragraph"),
          }}
          solution={{
            h2: ph(local(content.solution.h2), "Solution H2"),
            body: ph(local(content.solution.body), "Solution paragraph"),
            features: content.solution.features.map((f, i) => ({
              feature: ph(local(f.feature), `Feature ${i + 1}`),
              benefit: ph(local(f.benefit), `Benefit ${i + 1}`),
              icon: f.icon,
              link: f.link,
            })),
          }}
        />
        <ProcessSteps
          h2={ph(local(content.howWeWork.h2), "How we [build/migrate/etc.]")}
          steps={content.howWeWork.steps.map((s) => ({
            ...s,
            title: local(s.title),
            body: local(s.body),
          }))}
        />
        <CostAEO
          h2={ph(local(content.cost.h2), "How much does [service] cost?")}
          answer={ph(local(content.cost.answer), "Answer-first, 40 to 60 words")}
          support={ph(local(content.cost.support), "What moves the price")}
        />
        <CaseStudyCards
          h2={ph(local(content.proof.h2), "Platforms we've built")}
          allHref="/case-studies"
          allLabel={t("seeAllCases")}
          cases={content.proof.cases.flatMap((c) => {
            const p = getProjectBySlug(c.slug);
            if (!p) return [];
            const title = l(p.title, locale);
            return {
              href: c.href,
              title,
              description: l(p.description, locale),
              image: p.preview,
              alt: `${title} screenshot`,
            };
          })}
        />
        <FAQAccordion h2={ph(local(content.faqH2), "FAQ H2")} faqs={faqs} />
        <CTABand
          h2={ph(local(content.finalCta.h2), "Reassurance headline")}
          line={ph(local(content.finalCta.line), "No pitch, no obligation")}
          action={cta("service-final-cta")}
        />
      </main>
    </>
  );
};
