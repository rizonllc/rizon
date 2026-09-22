"use client";

import { useEffect, useRef, useState, type ComponentProps } from "react";
import { Check, Copy } from "lucide-react";
import { getT } from "@/lib/t";
import { cn } from "@/lib/utils";

const t = getT("blogDetail");

// How long the check mark stays before the copy icon comes back (ms).
const COPIED_DURATION = 1600;

// Code block for MDX `pre` elements: light surface, language label, copy button.
export function CodeBlock({ className, children, ...props }: ComponentProps<"pre">) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), COPIED_DURATION);
    return () => clearTimeout(timeout);
  }, [copied]);

  const language = (props as Record<string, unknown>)["data-language"];
  const label = typeof language === "string" && language !== "text" && language !== "plaintext" ? language : null;

  const copy = async () => {
    const pre = preRef.current;
    if (!pre) return;
    // rehype-pretty-code renders one [data-line] span per line.
    const lines = pre.querySelectorAll("[data-line]");
    const text = lines.length
      ? Array.from(lines, (line) => line.textContent ?? "").join("\n")
      : (pre.textContent ?? "");
    try {
      await navigator.clipboard.writeText(text.replace(/\n+$/, ""));
      setCopied(true);
    } catch {
      // Clipboard unavailable (insecure context or denied): leave the icon as is.
    }
  };

  return (
    <div className="code-block overflow-hidden rounded-xl border border-border bg-white">
      <div className="flex h-10 items-center justify-between border-b border-border bg-muted/40 pl-4 pr-1.5">
        <span className="font-mono text-xs lowercase tracking-wide text-muted-foreground">{label}</span>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? t("copied") : t("copyCode")}
          title={copied ? t("copied") : t("copyCode")}
          className="relative grid size-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Copy
            size={14}
            strokeWidth={1.75}
            aria-hidden
            className={cn(
              "col-start-1 row-start-1 transition-all duration-200",
              copied ? "scale-50 opacity-0" : "scale-100 opacity-100",
            )}
          />
          <Check
            size={15}
            strokeWidth={2}
            aria-hidden
            className={cn(
              "col-start-1 row-start-1 text-emerald-600 transition-all duration-200",
              copied ? "scale-100 opacity-100" : "scale-50 opacity-0",
            )}
          />
        </button>
        <span aria-live="polite" className="sr-only">
          {copied ? t("copied") : ""}
        </span>
      </div>
      <pre ref={preRef} className={cn("not-prose", className)} {...props}>
        {children}
      </pre>
    </div>
  );
}
