"use client";

import { getT } from "@/lib/t";
import { startTransition, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogoWithText } from "@/components/logo";
import { AnalyticsEvent } from "@/lib/analytics";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { MobileNav } from "./mobile-nav";
import {
  ArrowRightIcon,
  ArrowRightLeftIcon,
  BlocksIcon,
  GraduationCapIcon,
  LayersIcon,
  PhoneIcon,
  PlugIcon,
  PuzzleIcon,
  ShoppingCartIcon,
  ToyBrickIcon,
} from "lucide-react";

const linkDefs = [
  { key: "home", href: "/#home", id: "home", isPage: false },
  { key: "whyUs", href: "/#why-us", id: "why-us", isPage: false },
  { key: "process", href: "/#how-we-work", id: "how-we-work", isPage: false },
  { key: "services", href: "/services", id: "services", isPage: true },
  { key: "about", href: "/about", id: "about", isPage: true },
  { key: "caseStudies", href: "/case-studies", id: "case-studies", isPage: true },
  { key: "blog", href: "/blog", id: "blog", isPage: true },
] as const;

const serviceMenu = [
  { key: "customLms", slug: "custom-lms-development", Icon: GraduationCapIcon },
  { key: "lti", slug: "lti-development", Icon: PuzzleIcon },
  { key: "moodle", slug: "moodle-development", Icon: BlocksIcon },
  { key: "canvas", slug: "canvas-development", Icon: LayersIcon },
  { key: "moodlePlugin", slug: "moodle-plugin-development", Icon: PlugIcon },
  { key: "canvasPlugin", slug: "canvas-plugin-development", Icon: ToyBrickIcon },
  { key: "ltiMigration", slug: "lti-1-1-to-1-3-migration", Icon: ArrowRightLeftIcon },
  { key: "woocommerceMoodle", slug: "woocommerce-to-moodle", Icon: ShoppingCartIcon },
] as const;

const sectionLinkDefs = linkDefs.filter((l) => !l.isPage);

export const Navigation = () => {
  const t = getT("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  // Controlled so a click on any service link can close the popover.
  const [menu, setMenu] = useState<string | null>(null);

  // Start from a deterministic value so server and client hydrate identically;
  // the URL hash is read after mount (below) to avoid a hydration mismatch.
  const [activeId, setActiveId] = useState("home");

  // After mount, seed from the URL hash so a refresh on /#work highlights Work.
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (sectionLinkDefs.some((l) => l.id === hash)) {
      startTransition(() => setActiveId(hash));
    }
  }, []);

  // Single scroll listener: frosted header + scroll-spy in one pass.
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 0);

      // Only run scroll-spy on the home page where sections live.
      if (pathname !== "/") return;

      const mid = window.scrollY + window.innerHeight * 0.4;
      const current = sectionLinkDefs
        .map((l) => ({ id: l.id as string, el: document.getElementById(l.id) }))
        .filter((s): s is { id: string; el: HTMLElement } => s.el !== null)
        .filter((s) => s.el.offsetTop <= mid)
        .pop();

      if (current) setActiveId(current.id);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      if (pathname === "/") {
        e.preventDefault();
        setActiveId(id);
        document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
        window.history.replaceState(null, "", `/#${id}`);
      }
    },
    [pathname],
  );

  // Blog uses pathname; section links use scroll-spy (only meaningful on "/").
  const isActive = (link: (typeof linkDefs)[number]) =>
    link.isPage
      ? pathname.startsWith(link.href)
      : pathname === "/" && activeId === link.id;

  // Home and services pages open with the same full-bleed image card; the
  // nav floats white over it until scrolled.
  const overHero =
    (pathname === "/" || pathname.startsWith("/services")) && !scrolled;

  const linkClass = (link: (typeof linkDefs)[number]) =>
    `px-4 py-2 text-[13px] font-medium tracking-tight transition-colors duration-200 focus-visible:outline-none ${
      overHero
        ? isActive(link)
          ? "text-white"
          : "text-white/70 hover:text-white focus-visible:text-white"
        : isActive(link)
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground focus-visible:text-foreground"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        overHero
          ? "border-transparent"
          : "border-border bg-background/85 backdrop-blur-md"
      } ${overHero ? "pt-3 sm:pt-5" : ""}`}
    >
      <div className="container cntr">
        <div className="flex h-16 items-center justify-between gap-8">
          <Link
            href="/#home"
            onClick={(e) => handleAnchorClick(e, "home")}
            className="shrink-0 text-xl font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <LogoWithText
              size={70}
              className={overHero ? "text-white" : "text-primary"}
            />
          </Link>

          <NavigationMenu
            align="center"
            className="hidden md:flex"
            aria-label={t("primary")}
            value={menu}
            onValueChange={(v) => setMenu(v as string | null)}
          >
            <NavigationMenuList>
              {linkDefs.map((link) => (
                <NavigationMenuItem
                  key={link.id}
                  value={link.key === "services" ? "services" : undefined}
                >
                  {link.key === "services" ? (
                    <>
                      <NavigationMenuTrigger
                        className={`${linkClass(link)} h-auto rounded-none bg-transparent hover:bg-transparent focus:bg-transparent data-popup-open:bg-transparent`}
                      >
                        {t(link.key)}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div
                          className="grid w-[52rem] max-w-full grid-cols-3 gap-3"
                          onClick={(e) => {
                            if ((e.target as HTMLElement).closest("a")) setMenu(null);
                          }}
                        >
                        <ul className="col-span-2 grid grid-cols-2 gap-1">
                          {serviceMenu.map(({ key, slug, Icon }) => (
                            <li key={key}>
                              <NavigationMenuLink
                                render={<Link href={`/services/${slug}`} />}
                                className="items-start gap-3 hover:bg-primary/5 focus:bg-primary/5"
                              >
                                <Icon
                                  className="mt-0.5 shrink-0 text-primary"
                                  aria-hidden
                                />
                                <span>
                                  <span className="block font-medium text-foreground">
                                    {t(`serviceItems.${key}.title`)}
                                  </span>
                                  <span className="mt-0.5 block text-muted-foreground">
                                    {t(`serviceItems.${key}.description`)}
                                  </span>
                                </span>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                          <div className="flex flex-col rounded-xl bg-primary/5 p-5">
                            <h3 className="text-base font-semibold tracking-tight text-primary">
                              {t("servicesMenu.title")}
                            </h3>
                            <p className="mb-6 mt-2 text-sm leading-relaxed text-muted-foreground">
                              {t("servicesMenu.description")}
                            </p>
                            <Button
                              size="sm"
                              className="mt-auto w-full rounded-md"
                              nativeButton={false}
                              render={<Link href="/services" />}
                            >
                              {t("servicesMenu.cta")}
                              <ArrowRightIcon />
                            </Button>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink
                      render={<Link href={link.href} />}
                      onClick={
                        link.isPage
                          ? undefined
                          : (e) => handleAnchorClick(e, link.id)
                      }
                      active={isActive(link)}
                      className={`${linkClass(link)} rounded-none hover:bg-transparent focus:bg-transparent`}
                    >
                      {t(link.key)}
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="hidden items-center gap-3 md:flex">
            <Button
              size="sm"
              nativeButton={false}
              render={
                <Link
                  href="/contact"
                  data-umami-event={AnalyticsEvent.ContactCta}
                  data-umami-event-location="nav"
                />
              }
            >
              <PhoneIcon size={12} />
              {t("bookACall")}
            </Button>
          </div>

          <MobileNav activeId={activeId} overHero={overHero} />
        </div>
      </div>
    </header>
  );
};
