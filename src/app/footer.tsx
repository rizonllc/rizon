import { getT } from "@/lib/t";
import Link from "next/link";
import { LogoWithText } from "@/components/logo";
import { alternatives } from "@/lib/alternatives";
import { productLabs } from "@/lib/product-labs";
import { AnalyticsEvent } from "@/lib/analytics";
import { caseStudiesIndex } from "@/lib/case-studies-index";
import { isCaseVisible } from "@/lib/case-study-links";

const navLinkDefs = [
  { key: "home", href: "/#home" },
  { key: "whyUsShort", href: "/#why-us" },
  { key: "howWeWork", href: "/#how-we-work" },
  { key: "services", href: "/services" },
  { key: "about", href: "/about" },
  { key: "blog", href: "/blog" },
  { key: "getInTouch", href: "/contact" },
] as const;

const serviceLinks = [
  { key: "moodlePlugin", slug: "moodle-plugin-development" },
  { key: "canvasPlugin", slug: "canvas-plugin-development" },
  { key: "ltiMigration", slug: "lti-1-1-to-1-3-migration" },
  { key: "woocommerceMoodle", slug: "woocommerce-to-moodle" },
] as const;

// First four listed case studies, in hub order.
const footerCases = caseStudiesIndex.sections
  .flatMap((sec) => sec.cards)
  .filter((card) => isCaseVisible(card.study.slug))
  .slice(0, 4);

const socials = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/choaib-mouhrach",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
];

export const Footer = async () => {
  const tNav = getT("nav");
  const tFooter = getT("footer");
  return (
    <footer className="mt-32 md:mt-40">
      <div className="container cntr">
        <div className="py-16 md:py-20">
          <div className="flex flex-col gap-8 pb-12 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div>
              <Link href="/" className="inline-block text-primary">
                <LogoWithText size={120} />
              </Link>

              <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground text-pretty">
                {tFooter("tagline")}
              </p>
            </div>

            <div className="shrink-0">
              <div className="flex items-center gap-2">
                {socials.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    data-umami-event={AnalyticsEvent.OutboundSocial}
                    data-umami-event-network={social.name.toLowerCase()}
                    className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden
                      className="size-4"
                    >
                      <path d={social.path} />
                    </svg>
                  </Link>
                ))}
              </div>
              <a
                href="mailto:contact@rizon.agency"
                data-umami-event={AnalyticsEvent.EmailClick}
                className="mt-5 inline-block text-[15px] text-muted-foreground transition-colors hover:text-foreground"
              >
                contact@rizon.agency
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-12 pt-12 sm:grid-cols-3 lg:grid-cols-5">
            <nav aria-label={tFooter("explore")}>
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {tFooter("explore")}
              </h2>
              <ul className="mt-5 space-y-3">
                {navLinkDefs.map((link) => (
                  <li key={link.key}>
                    <Link
                      href={link.href}
                      className="text-[15px] text-muted-foreground transition-colors hover:text-foreground"
                      {...(link.key === "getInTouch"
                        ? {
                            "data-umami-event": AnalyticsEvent.ContactCta,
                            "data-umami-event-location": "footer",
                          }
                        : {})}
                    >
                      {link.key === "getInTouch" ||
                      link.key === "howWeWork" ||
                      link.key === "whyUsShort"
                        ? tFooter(link.key)
                        : tNav(link.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label={tFooter("services")}>
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {tFooter("services")}
              </h2>
              <ul className="mt-5 space-y-3">
                {serviceLinks.map((link) => (
                  <li key={link.key}>
                    <Link
                      href={`/services/${link.slug}`}
                      className="text-[15px] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {tFooter(`serviceLinks.${link.key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label={tFooter("caseStudies")}>
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {tFooter("caseStudies")}
              </h2>
              <ul className="mt-5 space-y-3">
                <li>
                  <Link
                    href="/case-studies"
                    className="text-[15px] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {tFooter("allCaseStudies")}
                  </Link>
                </li>
                {footerCases.map((card) => (
                  <li key={card.study.slug}>
                    <Link
                      href={`/case-studies/${card.study.slug}`}
                      className="text-[15px] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {card.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label={tFooter("compare")}>
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {tFooter("compare")}
              </h2>
              <ul className="mt-5 space-y-3">
                {alternatives.slice(0, 4).map((alternative) => (
                  <li key={alternative.slug}>
                    <Link
                      href={`/alternatives/${alternative.slug}`}
                      className="text-[15px] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {alternative.competitor}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/lms-alternatives"
                    className="text-[15px] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {tFooter("allAlternatives")}
                  </Link>
                </li>
              </ul>
            </nav>

            <nav aria-label={tFooter("products")}>
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {tFooter("products")}
              </h2>
              <ul className="mt-5 space-y-3">
                {productLabs.map((product) => (
                  <li key={product.slug}>
                    <Link
                      href={`/products/${product.slug}`}
                      className="text-[15px] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {product.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-border py-6 sm:flex-row sm:items-center">
          <p className="text-sm text-muted-foreground">
            {tFooter("copyright", { year: new Date().getFullYear() })}
          </p>
          <Link
            href="/legal"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {tFooter("terms")}
          </Link>
        </div>
      </div>
    </footer>
  );
};
