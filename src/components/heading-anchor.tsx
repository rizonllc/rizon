"use client";

import { useEffect, useState } from "react";
import { Check, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getT } from "@/lib/t";

const t = getT("blogDetail");

// How long the check mark stays before the hash comes back (ms).
const COPIED_DURATION = 1600;

// Hash shown beside a heading on hover; clicking copies a link straight to that section.
export function HeadingAnchor({ id }: { id: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), COPIED_DURATION);
    return () => clearTimeout(timeout);
  }, [copied]);

  // The wrapper inherits the heading's line height, so the button centres on its first line.
  return (
    <span className="not-prose absolute top-0 right-full hidden h-[1lh] items-center pr-2 lg:flex">
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label={copied ? t("linkCopied") : t("copyLink")}
        onClick={async () => {
          const url = `${window.location.origin}${window.location.pathname}#${id}`;
          history.replaceState(null, "", `#${id}`);
          try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
          } catch {
            // Clipboard blocked: the URL bar still holds the section link.
          }
        }}
        className="rounded-lg text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-primary focus-visible:opacity-100"
      >
        {copied ? <Check className="text-primary" aria-hidden /> : <Hash aria-hidden />}
      </Button>
    </span>
  );
}
