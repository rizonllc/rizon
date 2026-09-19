import { getT } from "@/lib/t";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  CalendarDays,
  MessagesSquare,
  KeyRound,
  Check,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "../footer";
import { notFound } from "next/navigation";
import { AnalyticsEvent } from "@/lib/analytics";

const BASE_URL = "https://rizon.agency";

export async function generateMetadata(): Promise<Metadata> {
  const t = getT("seo.about");
  const path = "/about";
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
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: t("twitterTitle"),
      description: t("twitterDescription"),
      creator: "@rizon_agency",
    },
  };
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1.5 text-sm font-medium text-primary">
      <span className="size-1.5 rounded-full bg-primary" aria-hidden />
      {children}
    </span>
  );
}

type PrincipleKey = "small" | "direct" | "code";

const principleIcons: Record<PrincipleKey, LucideIcon> = {
  small: CalendarDays,
  direct: MessagesSquare,
  code: KeyRound,
};

const principleKeys: PrincipleKey[] = ["small", "direct", "code"];

type ProofKey =
  "focus" | "specialists" | "lti" | "customLms" | "ownership" | "global";
const proofKeys: ProofKey[] = [
  "focus",
  "specialists",
  "lti",
  "customLms",
  "ownership",
  "global",
];

type CapabilityIndex =
  "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11";
const capabilityIndexes: CapabilityIndex[] = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
];

const heroTags = ["Custom LMS", "LTI", "Moodle", "Canvas", "Course platforms"];

export default async function AboutPage() {
  const t = getT("aboutPage");
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        url: `${BASE_URL}/about`,
        name: "About Rizon",
        description:
          "Rizon is a software studio focused exclusively on learning platforms, led by Choaib Mouhrach.",
      },
      {
        "@type": "Person",
        "@id": `${BASE_URL}/about#choaib`,
        name: "Choaib Mouhrach",
        jobTitle: "Founder & Learning Platform Engineer",
        description:
          "Founder of Rizon and a software engineer specializing in learning technology. Custom LMS, Moodle, Canvas, and LTI.",
        url: `${BASE_URL}/about`,
        image: `${BASE_URL}/choaib-mouhrach-pic.png`,
        knowsAbout: [
          "Learning Management Systems",
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
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="pb-24 md:pb-32">
        {/* Hero */}
        <section className="container pt-28 md:pt-36 cntr">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
              <h1 className="mt-6 text-[2.7rem] font-semibold leading-[1.03] tracking-tight text-balance sm:text-6xl md:text-[4.1rem]">
                {t("hero.titlePrefix")}{" "}
                <span className="mark">{t("hero.titleHighlight")}</span>.
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {t("hero.intro1")}
              </p>
              <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
                {t("hero.intro2")}
              </p>
              <div className="mt-8 flex flex-wrap gap-2.5">
                {heroTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5">
              <figure className="surface mx-auto max-w-sm overflow-hidden p-2.5 lg:ml-auto">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.15rem] bg-muted">
                  <Image
                    src="/choaib-mouhrach-pic.png"
                    alt="Choaib Mouhrach"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 400px"
                    className="object-cover"
                  />
                </div>
                <figcaption className="flex items-baseline justify-between gap-3 px-2.5 pt-3.5 pb-1.5">
                  <span className="font-medium">Choaib Mouhrach</span>
                  <span className="text-sm text-muted-foreground">
                    {t("hero.founderRole")}
                  </span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* About Rizon */}
        <section className="mt-24 md:mt-32 cntr">
          <div className="bg-tint py-20 md:py-28">
            <div className="container">
              <div className="max-w-3xl">
                <Eyebrow>{t("aboutRizon.eyebrow")}</Eyebrow>
                <h2 className="mt-6 text-4xl font-semibold tracking-tight text-balance md:text-5xl">
                  {t("aboutRizon.title")}
                </h2>
                <p className="mt-8 text-lg leading-relaxed text-foreground/80">
                  {t("aboutRizon.p1")}
                </p>
                <p className="mt-5 text-lg leading-relaxed text-foreground/80">
                  {t("aboutRizon.p2")}
                </p>
                <p className="mt-5 text-lg leading-relaxed text-foreground/80">
                  {t("aboutRizon.p3")}
                </p>
              </div>

              <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {proofKeys.map((key) => (
                  <li
                    key={key}
                    className="flex items-start gap-3 text-foreground/85"
                  >
                    <Check
                      size={19}
                      className="mt-1 shrink-0 text-primary"
                      aria-hidden
                    />
                    <span className="font-medium">
                      {t(`proofPoints.${key}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* How we build */}
        <section className="container mt-24 md:mt-32 cntr">
          <div className="max-w-2xl">
            <Eyebrow>{t("howWeBuild.eyebrow")}</Eyebrow>
            <h2 className="mt-6 text-4xl font-semibold tracking-tight text-balance md:text-5xl">
              {t("howWeBuild.titlePrefix")}{" "}
              <span className="mark">{t("howWeBuild.titleHighlight")}</span>
            </h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {principleKeys.map((key) => {
              const Icon = principleIcons[key];
              return (
                <div key={key} className="surface p-7 md:p-8">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon size={20} strokeWidth={1.75} aria-hidden />
                  </span>
                  <h3 className="mt-6 text-xl font-semibold tracking-tight">
                    {t(`howWeBuild.principles.${key}.title`)}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {t(`howWeBuild.principles.${key}.body`)}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* What we've built */}
        <section className="container mt-24 md:mt-32 cntr">
          <div className="max-w-2xl">
            <Eyebrow>{t("capabilitiesSection.eyebrow")}</Eyebrow>
            <h2 className="mt-6 text-4xl font-semibold tracking-tight text-balance md:text-5xl">
              {t("capabilitiesSection.title")}
            </h2>
          </div>
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capabilityIndexes.map((idx) => (
              <li key={idx} className="surface flex items-center gap-3 p-5">
                <Check
                  size={19}
                  className="shrink-0 text-primary"
                  aria-hidden
                />
                <span className="font-medium">
                  {t(`capabilitiesSection.items.${idx}`)}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <section className="container mt-24 md:mt-32 cntr">
          <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-primary-foreground md:px-14 md:py-20">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full bg-highlight/25 blur-3xl"
            />
            <div className="relative max-w-2xl">
              <h2 className="text-4xl font-semibold tracking-tight text-balance md:text-5xl">
                {t("cta.title")}
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-primary-foreground/80">
                {t("cta.description")}
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
                    data-umami-event-location="about"
                  />
                }
              >
                {t("cta.button")} <ArrowRight size={16} aria-hidden />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
