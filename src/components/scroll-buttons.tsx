"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getT } from "@/lib/t";

const t = getT("nav");

// Within this many px of an edge counts as already being there.
const EDGE = 8;

// Floating up/down buttons in the bottom-right corner that jump to the top or end of the page.
export function ScrollButtons() {
  const [atTop, setAtTop] = useState(true);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setAtTop(window.scrollY <= EDGE);
      setAtBottom(window.scrollY >= max - EDGE);
    };
    const onChange = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onChange, { passive: true });
    window.addEventListener("resize", onChange);
    return () => {
      window.removeEventListener("scroll", onChange);
      window.removeEventListener("resize", onChange);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Nothing to scroll: keep the corner clear.
  if (atTop && atBottom) return null;

  const scrollTo = (top: number) => window.scrollTo({ top, behavior: "smooth" });

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col gap-2 sm:right-6 sm:bottom-6">
      <Button
        variant="outline"
        size="icon"
        aria-label={t("scrollToTop")}
        disabled={atTop}
        onClick={() => scrollTo(0)}
        className="bg-background/85 shadow-sm backdrop-blur-md"
      >
        <ArrowUp aria-hidden />
      </Button>
      <Button
        variant="outline"
        size="icon"
        aria-label={t("scrollToBottom")}
        disabled={atBottom}
        onClick={() => scrollTo(document.documentElement.scrollHeight)}
        className="bg-background/85 shadow-sm backdrop-blur-md"
      >
        <ArrowDown aria-hidden />
      </Button>
    </div>
  );
}
