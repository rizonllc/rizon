"use client";

import { getT } from "@/lib/t";
import { useCallback, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LogoWithText } from "@/components/logo";
import { AnalyticsEvent } from "@/lib/analytics";

const linkDefs = [
  { key: "home", href: "/#home", id: "home", isPage: false },
  { key: "whyUs", href: "/#why-us", id: "why-us", isPage: false },
  { key: "process", href: "/#how-we-work", id: "how-we-work", isPage: false },
  { key: "services", href: "/services", id: "services", isPage: true },
  { key: "about", href: "/about", id: "about", isPage: true },
  { key: "caseStudies", href: "/case-studies", id: "case-studies", isPage: true },
  { key: "blog", href: "/blog", id: "blog", isPage: true },
] as const;

type LinkDef = (typeof linkDefs)[number];

type Props = { activeId: string; overHero?: boolean };

export const MobileNav = ({ activeId, overHero }: Props) => {
  const t = getT("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (link: LinkDef) =>
    link.isPage
      ? pathname.startsWith(link.href)
      : pathname === "/" && activeId === link.id;

  const handleClick = useCallback(
    (
      e: React.MouseEvent<HTMLAnchorElement>,
      link: { id: string; isPage: boolean },
    ) => {
      setOpen(false);
      if (!link.isPage && pathname === "/") {
        e.preventDefault();
        document
          .getElementById(link.id)
          ?.scrollIntoView({ behavior: "instant" });
        window.history.replaceState(null, "", `/#${link.id}`);
      }
    },
    [pathname],
  );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        type="button"
        aria-label={t("openMenu")}
        className={`flex size-9 items-center justify-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 md:hidden ${
          overHero
            ? "border-white/40 text-white hover:bg-white/10"
            : "border-border text-foreground hover:bg-muted"
        }`}
      >
        <Menu size={18} />
      </SheetTrigger>

      <SheetContent side="left" className="flex flex-col px-0">
        <SheetHeader className="border-b border-border px-6 pb-4">
          <SheetTitle
            render={
              <Link
                href="/#home"
                onClick={(e) => handleClick(e, linkDefs[0])}
              />
            }
          >
            <LogoWithText size={80} className="text-primary" />
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col px-6 py-4" aria-label={t("mobile")}>
          {linkDefs.map((link) => {
            const active = isActive(link);
            return (
              <Link
                key={link.id}
                href={link.href}
                onClick={(e) => handleClick(e, link)}
                aria-current={active ? "page" : undefined}
                className="group flex items-center justify-between border-b border-border py-4 text-[15px] font-medium transition-colors last:border-b-0"
              >
                <span
                  className={
                    active
                      ? "text-foreground"
                      : "text-muted-foreground group-hover:text-foreground"
                  }
                >
                  {t(link.key)}
                </span>
                <span
                  aria-hidden
                  className={`h-1.5 w-1.5 rounded-full bg-primary transition-opacity ${active ? "opacity-100" : "opacity-0"}`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto flex items-center gap-3 border-t border-border px-6 pt-4 pb-6">
          <Button
            className="flex-1"
            nativeButton={false}
            render={
              <Link
                href="/#contact"
                onClick={(e) =>
                  handleClick(e, { id: "contact", isPage: false })
                }
                data-umami-event={AnalyticsEvent.ContactCta}
                data-umami-event-location="mobile-nav"
              />
            }
          >
            {t("bookACall")}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
