"use client";

import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { cn } from "@/lib/utils";
import type { TocHeading } from "@/lib/toc";

// A heading counts as "current" once its top passes this line (px from viewport top).
const ACTIVE_OFFSET = 128;
// Matches the subsection expand transition (duration-300).
const EXPAND_DURATION = 300;
// Room kept around the highlighted link when auto-scrolling the list (px).
const SCROLL_MARGIN = 48;

type Section = { heading: TocHeading; children: TocHeading[] };

// Group `###` headings under the `##` that precedes them.
function toSections(headings: TocHeading[]): Section[] {
  const sections: Section[] = [];
  for (const heading of headings) {
    if (heading.level === 2 || sections.length === 0) sections.push({ heading, children: [] });
    else sections[sections.length - 1].children.push(heading);
  }
  return sections;
}

function scrollToHeading(event: MouseEvent<HTMLAnchorElement>, id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
}

export function TableOfContents({ headings, title }: { headings: TocHeading[]; title: string }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const sections = useMemo(() => toSections(headings), [headings]);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) {
        setActiveId(elements[elements.length - 1].id);
        return;
      }
      let current: string | null = null;
      for (const el of elements) {
        if (el.getBoundingClientRect().top - ACTIVE_OFFSET <= 0) current = el.id;
        else break;
      }
      setActiveId(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [headings]);

  // Keep the highlighted link visible when the list is taller than its scroll area.
  // Measured after the subsection expand transition so the link has its final position.
  useEffect(() => {
    const timeout = setTimeout(() => {
      const nav = navRef.current;
      const viewport = nav?.closest<HTMLElement>("[data-slot=scroll-area-viewport]");
      const link = nav?.querySelector<HTMLElement>('[aria-current="location"]');
      if (!viewport || !link) return;
      const view = viewport.getBoundingClientRect();
      const rect = link.getBoundingClientRect();
      if (rect.top < view.top + SCROLL_MARGIN) {
        viewport.scrollBy({ top: rect.top - view.top - SCROLL_MARGIN, behavior: "smooth" });
      } else if (rect.bottom > view.bottom - SCROLL_MARGIN) {
        viewport.scrollBy({ top: rect.bottom - view.bottom + SCROLL_MARGIN, behavior: "smooth" });
      }
    }, EXPAND_DURATION);
    return () => clearTimeout(timeout);
  }, [activeId]);

  if (headings.length === 0) return null;

  const activeSection = sections.find(
    (s) => s.heading.id === activeId || s.children.some((c) => c.id === activeId),
  );

  return (
    <nav ref={navRef} aria-label={title}>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground/60">{title}</p>
      <ol className="mt-5 space-y-1">
        {sections.map((section) => {
          const isOpen = section === activeSection;
          const isCurrent = section.heading.id === activeId;
          return (
            <li key={section.heading.id}>
              <a
                href={`#${section.heading.id}`}
                aria-current={isCurrent ? "location" : undefined}
                onClick={(event) => scrollToHeading(event, section.heading.id)}
                className={cn(
                  "block py-1.5 text-sm leading-snug transition-colors duration-200",
                  isOpen ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {section.heading.text}
              </a>

              {section.children.length > 0 && (
                <div
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="min-h-0 overflow-hidden" inert={!isOpen}>
                    <ol className="mt-1 mb-2 border-l border-border">
                      {section.children.map((child) => {
                        const isActive = child.id === activeId;
                        return (
                          <li key={child.id}>
                            <a
                              href={`#${child.id}`}
                              aria-current={isActive ? "location" : undefined}
                              onClick={(event) => scrollToHeading(event, child.id)}
                              className={cn(
                                "-ml-px block border-l py-1 pl-4 text-[0.8125rem] leading-snug transition-colors duration-200",
                                isActive
                                  ? "border-primary text-foreground"
                                  : "border-transparent text-muted-foreground hover:border-foreground/30 hover:text-foreground",
                              )}
                            >
                              {child.text}
                            </a>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
