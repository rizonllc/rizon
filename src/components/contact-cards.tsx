"use client";

import { getT } from "@/lib/t";
import { useState } from "react";
import Link from "next/link";
import { Calendar, Check, Copy, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RevealGroup, RevealItem } from "@/components/reveal";
import { AnalyticsEvent } from "@/lib/analytics";
import { contact } from "@/lib/contact";

const CAL_LINK = "https://cal.com/rizon.agency-cvbkll/30min";
const MAILTO = `mailto:${contact.email.address}?subject=Question about a custom platform`;

// The book-a-call and email cards, shared by the home page and /contact.
export const ContactCards = ({
  location,
  heading: Heading = "h3",
}: {
  location: string; // analytics location for the book button
  heading?: "h2" | "h3";
}) => {
  const t = getT("contact");
  const [copied, setCopied] = useState(false);
  const email = contact.email.address;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (e.g. insecure context); the mailto link still works.
    }
  };

  return (
    <RevealGroup
      stagger={0.12}
      className="grid grid-cols-1 gap-6 md:grid-cols-2"
    >
      <RevealItem as="article" className="surface flex flex-col p-7 md:p-8">
        <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Calendar size={20} strokeWidth={1.75} aria-hidden />
        </span>
        <Heading className="mt-6 text-xl font-semibold tracking-tight">
          {contact.book.h2}
        </Heading>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
          {contact.book.body}
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
                data-umami-event-location={location}
              />
            }
          >
            {contact.book.cta}
          </Button>
        </div>
      </RevealItem>

      <RevealItem as="article" className="surface flex flex-col p-7 md:p-8">
        <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Mail size={20} strokeWidth={1.75} aria-hidden />
        </span>
        <Heading className="mt-6 text-xl font-semibold tracking-tight">
          {contact.email.h2}
        </Heading>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
          {contact.email.body}
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
              {email}
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
  );
};
