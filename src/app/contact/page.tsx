import type { Metadata } from "next";
import {
  Breadcrumb,
  breadcrumbJsonLd,
  type Crumb,
} from "@/components/breadcrumb";
import { ContactCards } from "@/components/contact-cards";
import { contact as c } from "@/lib/contact";
import { Footer } from "../footer";

const BASE_URL = "https://rizon.agency";
const path = "/contact";

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
    type: "website",
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
  { name: "Contact", href: path },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    breadcrumbJsonLd(crumbs),
    {
      "@type": "ContactPage",
      "@id": `${BASE_URL}${path}#page`,
      url: `${BASE_URL}${path}`,
      name: c.metaTitle,
      description: c.metaDescription,
      about: { "@id": `${BASE_URL}/#org` },
    },
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#org`,
      name: "Rizon",
      url: BASE_URL,
      email: c.email.address,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: c.email.address,
      },
    },
  ],
};

export default function ContactPage() {
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
            {c.subhead}
          </p>
        </section>

        <section className="container cntr mt-12 md:mt-16">
          <ContactCards location="contact-page" heading="h2" />
        </section>
      </main>
      <Footer />
    </>
  );
}
