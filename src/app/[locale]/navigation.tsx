"use client";

import { startTransition, useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { LogoWithText } from "@/components/logo";
import { AnalyticsEvent } from "@/lib/analytics";
import { MobileNav } from "./mobile-nav";
import { LocaleSwitcher } from "./locale-switcher";

const linkDefs = [
  { key: "home", href: "/#home", id: "home", isPage: false },
  { key: "whyUs", href: "/#why-us", id: "why-us", isPage: false },
  { key: "process", href: "/#how-we-work", id: "how-we-work", isPage: false },
  { key: "services", href: "/services", id: "services", isPage: true },
  { key: "about", href: "/about", id: "about", isPage: true },
  { key: "work", href: "/#work", id: "work", isPage: false },
  { key: "blog", href: "/blog", id: "blog", isPage: true },
] as const;

const sectionLinkDefs = linkDefs.filter((l) => !l.isPage);

export const Navigation = () => {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

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

  // The hero no longer sits behind the nav, so it never needs the white state.
  const overHero = false;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-background/85 backdrop-blur-md transition-colors duration-300 ${
        scrolled ? "border-border" : "border-transparent"
      }`}
    >
      <div
        className={
          scrolled ? "container cntr" : "px-6 sm:px-10 lg:px-16"
        }
      >
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

          <nav
            className="hidden items-center md:flex"
            aria-label={t("primary")}
          >
            {linkDefs.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                onClick={
                  link.isPage ? undefined : (e) => handleAnchorClick(e, link.id)
                }
                aria-current={isActive(link) ? "page" : undefined}
                className={`px-4 py-2 text-[13px] font-medium tracking-tight transition-colors duration-200 focus-visible:outline-none ${
                  overHero
                    ? isActive(link)
                      ? "text-white"
                      : "text-white/70 hover:text-white focus-visible:text-white"
                    : isActive(link)
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground focus-visible:text-foreground"
                }`}
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <LocaleSwitcher overHero={overHero} />
            <Button
              size="sm"
              nativeButton={false}
              render={
                <Link
                  href="/#contact"
                  onClick={(e) => handleAnchorClick(e, "contact")}
                  data-umami-event={AnalyticsEvent.ContactCta}
                  data-umami-event-location="nav"
                />
              }
            >
              {t("bookACall")}
            </Button>
          </div>

          <MobileNav activeId={activeId} overHero={overHero} />
        </div>
      </div>
    </header>
  );
};
