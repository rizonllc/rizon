"use client";

import { getT } from "@/lib/t";
import { useState } from "react";
import Link from "next/link";
import { Calendar, Check, Copy, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/section-header";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { AnalyticsEvent } from "@/lib/analytics";

const CAL_LINK = "https://cal.com/rizon.agency-cvbkll/30min";
const EMAIL = "contact@rizon.agency";
const MAILTO = `mailto:${EMAIL}?subject=Question about a custom platform`;

export const Contact = () => {
  const t = getT("contact");
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (e.g. insecure context) — the mailto link still works.
    }
  };

  return (
    <section id="contact" className="container mt-32 md:mt-40 cntr">
      <Reveal>
        <SectionHeader
          label={t("label")}
          title={
            <>
              {t("titlePrefix")}{" "}
              <span className="text-primary italic">{t("titleHighlight")}</span>
            </>
          }
          description={t("description")}
        />
      </Reveal>

      <RevealGroup
        stagger={0.12}
        className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        <RevealItem as="article" className="surface flex flex-col p-7 md:p-8">
          <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Calendar size={20} strokeWidth={1.75} aria-hidden />
          </span>
          <h3 className="mt-6 text-xl font-semibold tracking-tight">
            {t("bookCard.title")}
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            {t("bookCard.description")}
          </p>
          <div className="mt-7">
            <Button
              nativeButton={false}
              render={
                <Link
                  href={CAL_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-umami-event={AnalyticsEvent.BookCall}
                  data-umami-event-location="contact-section"
                />
              }
            >
              {t("bookCard.button")}
            </Button>
          </div>
        </RevealItem>

        <RevealItem as="article" className="surface flex flex-col p-7 md:p-8">
          <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Mail size={20} strokeWidth={1.75} aria-hidden />
          </span>
          <h3 className="mt-6 text-xl font-semibold tracking-tight">
            {t("emailCard.title")}
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            {t("emailCard.description")}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button
              nativeButton={false}
              render={
                <Link
                  href={MAILTO}
                  data-umami-event={AnalyticsEvent.EmailClick}
                />
              }
            >
              {t("emailCard.button")}
            </Button>
            <div className="inline-flex items-center gap-2 rounded-full border border-border py-1 pl-3.5 pr-1">
              <span className="select-all font-mono text-sm text-muted-foreground">
                {EMAIL}
              </span>
              <button
                type="button"
                onClick={copyEmail}
                data-umami-event={AnalyticsEvent.CopyEmail}
                aria-label={
                  copied ? t("emailCard.copiedLabel") : t("emailCard.copyLabel")
                }
                className="flex size-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
              >
                {copied ? (
                  <Check
                    size={15}
                    strokeWidth={2}
                    className="text-primary"
                    aria-hidden
                  />
                ) : (
                  <Copy size={15} strokeWidth={1.75} aria-hidden />
                )}
              </button>
            </div>
            <span className="sr-only" role="status" aria-live="polite">
              {copied ? t("emailCard.copiedStatus") : ""}
            </span>
          </div>
        </RevealItem>
      </RevealGroup>
    </section>
  );
};
