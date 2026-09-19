import { getT } from "@/lib/t";
import type { Metadata } from "next";
import { BlogPreview } from "./blog-preview";
import { Contact } from "./contact";
import { Cta } from "./cta";
import { Faq } from "./faq";
import { Features } from "./features";
import { Footer } from "./footer";
import { Hero } from "./hero";
import { Logos } from "./logos";
import { HowWeWork } from "./how-we-work";
import { Services } from "./services";
import { WhyUs } from "./why-us";
import { Work } from "./work";
import { AlternativesPreview } from "./alternatives-preview";
import { Trust } from "./trust";

const BASE_URL = "https://rizon.agency";

export async function generateMetadata(): Promise<Metadata> {
  const t = getT("seo.home");
  const path = "/";
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
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("twitterTitle"),
      description: t("twitterDescription"),
      creator: "@rizon_agency",
    },
  };
}

const faqKeys = [
  "timeline",
  "involvement",
  "integrations",
  "afterLaunch",
  "scale",
  "mobile",
  "ownership",
] as const;

export default async function Page() {
  const tFaq = getT("homeFaq");
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#org`,
        name: "Rizon",
        url: BASE_URL,
        logo: `${BASE_URL}/android-chrome-512x512.png`,
        email: "contact@rizon.agency",
        sameAs: [
          "https://www.linkedin.com/in/choaib-mouhrach",
          "https://x.com/rizon_agency",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: "contact@rizon.agency",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: "Rizon",
        publisher: { "@id": `${BASE_URL}/#org` },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${BASE_URL}/#service`,
        name: "Rizon",
        url: BASE_URL,
        description:
          "Custom e-learning platform development for course creators, schools, and companies. No vendor lock-in, no monthly fees, 100% code ownership.",
        serviceType: "Custom Software Development",
        areaServed: "Worldwide",
        parentOrganization: { "@id": `${BASE_URL}/#org` },
        knowsAbout: [
          "Custom LMS Development",
          "E-Learning Platform Development",
          "Learning Management Systems",
          "Corporate Training Platforms",
          "School Portal Development",
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${BASE_URL}/#faq`,
        mainEntity: faqKeys.map((key) => ({
          "@type": "Question",
          name: tFaq(`items.${key}.question`),
          acceptedAnswer: {
            "@type": "Answer",
            text: tFaq(`items.${key}.answer`),
          },
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
      <div>
        <Hero />
        <Logos />
        <WhyUs />
        <HowWeWork />
        <Services />
        <Features />
        <AlternativesPreview />
        <Work />
        <Trust />
        <BlogPreview />
        <Cta />
        <Faq />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
