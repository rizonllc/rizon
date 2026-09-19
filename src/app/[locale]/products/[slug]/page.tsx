import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  breadcrumbJsonLd,
  type Crumb,
} from "@/components/breadcrumb";
import { Footer } from "../../footer";
import { languagesFor, localizedUrl, OG_LOCALE } from "@/i18n/hreflang";
import { routing, type Locale } from "@/i18n/routing";
import { l } from "@/lib/l10n";
import { getProductLabBySlug, productLabs } from "@/lib/product-labs";

const BASE_URL = "https://rizon.agency";

const pageCopy = {
  home: { en: "Home", fr: "Accueil", es: "Inicio", de: "Startseite" },
  products: { en: "Products", fr: "Produits", es: "Productos", de: "Produkte" },
  visitProduct: {
    en: "Visit {name}",
    fr: "Visiter {name}",
    es: "Visitar {name}",
    de: "{name} besuchen",
  },
  discuss: {
    en: "Discuss vertical SaaS",
    fr: "Discuter SaaS métier",
    es: "Hablar de SaaS vertical",
    de: "Vertical SaaS besprechen",
  },
  whyEyebrow: {
    en: "Why this exists",
    fr: "Pourquoi ce produit",
    es: "Por qué existe",
    de: "Warum es das gibt",
  },
  whyTitle: {
    en: "A narrow market is the point.",
    fr: "Le marché étroit est le sujet.",
    es: "El mercado estrecho es el punto.",
    de: "Der enge Markt ist der Punkt.",
  },
  researchEyebrow: {
    en: "Research focus",
    fr: "Axes de recherche",
    es: "Foco de investigación",
    de: "Forschungsschwerpunkt",
  },
  researchTitle: {
    en: "The questions to validate before writing too much product.",
    fr: "Les questions à valider avant d'écrire trop de produit.",
    es: "Las preguntas que validar antes de construir demasiado producto.",
    de: "Die Fragen, die vor zu viel Produktarbeit validiert werden müssen.",
  },
  seoEyebrow: {
    en: "SEO role",
    fr: "Rôle SEO",
    es: "Rol SEO",
    de: "SEO-Rolle",
  },
  seoTitle: {
    en: "Why mention {name} on Rizon at all?",
    fr: "Pourquoi mentionner {name} sur Rizon ?",
    es: "¿Por qué mencionar {name} en Rizon?",
    de: "Warum {name} überhaupt auf Rizon erwähnen?",
  },
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    productLabs.map((product) => ({ locale, slug: product.slug })),
  );
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const product = getProductLabBySlug(slug);

  if (!product) {
    return { title: "Product not found — Rizon" };
  }

  const path = `/products/${slug}`;
  const title = l(product.metaTitle, locale as Locale);
  const description = l(product.metaDescription, locale as Locale);

  return {
    title,
    description,
    keywords: product.keywords,
    alternates: {
      canonical: localizedUrl(path, locale),
      languages: languagesFor(path),
    },
    openGraph: {
      title,
      description,
      url: localizedUrl(path, locale),
      siteName: "Rizon",
      locale: OG_LOCALE[locale as Locale],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@rizon_agency",
    },
  };
}

export default async function ProductLabPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const product = getProductLabBySlug(slug);

  if (!product) notFound();

  const typedLocale = locale as Locale;
  const path = `/products/${slug}`;
  const title = l(product.metaTitle, typedLocale);
  const description = l(product.metaDescription, typedLocale);
  const crumbs: Crumb[] = [
    { name: l(pageCopy.home, typedLocale), href: "/" },
    { name: l(pageCopy.products, typedLocale), href: path },
    { name: product.name, href: path },
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${BASE_URL}${path}#webpage`,
        url: localizedUrl(path, locale),
        name: title,
        description,
        isPartOf: { "@id": `${BASE_URL}/#website` },
        publisher: { "@id": `${BASE_URL}/#org` },
        about: { "@id": `${BASE_URL}${path}#software` },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${BASE_URL}${path}#software`,
        name: product.name,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: product.liveUrl,
        sameAs: product.liveUrl,
        description: l(product.heroSub, typedLocale),
        publisher: { "@id": `${BASE_URL}/#org` },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(crumbs)),
        }}
      />
      <main className="pb-24 md:pb-32">
        <section className="container cntr pt-28 md:pt-36">
          <Breadcrumb items={crumbs} />
          <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1.5 text-sm font-medium text-primary">
                <span
                  className="size-1.5 rounded-full bg-primary"
                  aria-hidden
                />
                {l(product.status, typedLocale)}
              </span>
              <h1 className="mt-6 text-[2.8rem] font-semibold leading-[1.02] tracking-tight text-balance sm:text-6xl md:text-[4.4rem]">
                {l(product.heroHeadline, typedLocale)}
              </h1>
            </div>
            <div className="lg:col-span-4">
              <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
                {l(product.heroSub, typedLocale)}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button
                  nativeButton={false}
                  render={
                    <a
                      href={product.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                >
                  {l(pageCopy.visitProduct, typedLocale).replace(
                    "{name}",
                    product.name,
                  )}
                  <ArrowUpRight
                    data-icon="inline-end"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </Button>
                <Button
                  variant="outline"
                  nativeButton={false}
                  render={
                    <a
                      href="https://cal.com/rizon.agency-cvbkll/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                >
                  {l(pageCopy.discuss, typedLocale)}
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="container cntr mt-20 md:mt-28">
          <div className="surface grid grid-cols-1 overflow-hidden lg:grid-cols-12">
            <div className="bg-primary p-8 text-primary-foreground md:p-10 lg:col-span-4">
              <p className="font-mono text-sm uppercase tracking-[0.2em] opacity-75">
                {l(pageCopy.whyEyebrow, typedLocale)}
              </p>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
                {l(pageCopy.whyTitle, typedLocale)}
              </h2>
            </div>
            <div className="flex flex-col gap-5 p-8 md:p-10 lg:col-span-8">
              {l(product.why, typedLocale).map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-lg leading-relaxed text-foreground/80"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="container cntr mt-24 md:mt-32">
          <div className="max-w-3xl">
            <span className="font-mono text-sm uppercase tracking-[0.2em] text-primary">
              {l(pageCopy.researchEyebrow, typedLocale)}
            </span>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight text-balance md:text-5xl">
              {l(pageCopy.researchTitle, typedLocale)}
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            {product.researchFocus.map((item) => (
              <article
                key={l(item.title, typedLocale)}
                className="surface p-7 md:p-8"
              >
                <h3 className="text-2xl font-semibold tracking-tight">
                  {l(item.title, typedLocale)}
                </h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {l(item.body, typedLocale)}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="container cntr mt-24 md:mt-32">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="font-mono text-sm uppercase tracking-[0.2em] text-primary">
                {l(pageCopy.seoEyebrow, typedLocale)}
              </span>
              <h2 className="mt-5 text-4xl font-semibold tracking-tight text-balance">
                {l(pageCopy.seoTitle, typedLocale).replace(
                  "{name}",
                  product.name,
                )}
              </h2>
            </div>
            <div className="grid gap-5 lg:col-span-8">
              {product.publicSiteRole.map((item) => (
                <article
                  key={l(item.title, typedLocale)}
                  className="border-t border-border pt-6"
                >
                  <h3 className="text-xl font-semibold tracking-tight">
                    {l(item.title, typedLocale)}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {l(item.body, typedLocale)}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
