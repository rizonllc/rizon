"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnalyticsEvent } from "@/lib/analytics";
import { questions, recommend } from "@/lib/lms-selector";

const BOOK_URL = "https://cal.com/rizon.agency-cvbkll/30min";
const CTA_LABEL = "Book a free 30-min discovery call";

export const LmsSelector = () => {
  const [picked, setPicked] = useState<string[]>([]);
  const step = picked.length;
  const done = step === questions.length;

  if (done) {
    const answers = Object.fromEntries(questions.map((q, i) => [q.id, picked[i]]));
    const r = recommend(answers);
    return (
      <div aria-live="polite" className="rounded-3xl bg-primary/5 p-7 md:p-10">
        <p className="text-sm font-medium text-primary">Our honest recommendation</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance md:text-4xl">
          {r.headline}
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          {r.body}
        </p>
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          {r.links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="inline-flex items-center gap-1.5 font-medium text-primary underline underline-offset-4"
              >
                {l.text} <ArrowRight size={15} aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-muted-foreground">{r.ctaLine}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Button
            size="lg"
            variant={r.buildIntent ? "default" : "outline"}
            nativeButton={false}
            render={
              <Link
                href={BOOK_URL}
                target="_blank"
                rel="noreferrer"
                data-umami-event={AnalyticsEvent.BookCall}
                data-umami-event-location={`lms-selector-${r.id}`}
              />
            }
          >
            {CTA_LABEL} <ArrowRight size={16} aria-hidden />
          </Button>
          <button
            type="button"
            onClick={() => setPicked([])}
            className="text-sm font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground"
          >
            Retake the quiz
          </button>
        </div>
      </div>
    );
  }

  const q = questions[step];
  return (
    <div className="rounded-3xl bg-primary/5 p-7 md:p-10">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Question {step + 1} of {questions.length}
        </span>
        <button
          type="button"
          onClick={() => setPicked(picked.slice(0, -1))}
          disabled={step === 0}
          className="inline-flex items-center gap-1.5 hover:text-foreground disabled:invisible"
        >
          <ArrowLeft size={15} aria-hidden /> Back
        </button>
      </div>
      <div
        role="progressbar"
        aria-label="Quiz progress"
        aria-valuemin={0}
        aria-valuemax={questions.length}
        aria-valuenow={step}
        className="mt-3 h-1.5 overflow-hidden rounded-full bg-primary/10"
      >
        <div
          className="h-full bg-primary motion-safe:transition-[width]"
          style={{ width: `${(step / questions.length) * 100}%` }}
        />
      </div>
      {/* Fixed min-height (4 options) so the card never shifts between questions. */}
      <div
        role="group"
        aria-labelledby={`${q.id}-prompt`}
        className="mt-6 min-h-[23rem]"
      >
        <p id={`${q.id}-prompt`} className="text-2xl font-semibold tracking-tight text-balance">
          {q.prompt}
        </p>
        <ul className="mt-5 grid gap-3">
          {q.options.map((o) => (
            <li key={o.id}>
              <button
                type="button"
                onClick={() => setPicked([...picked, o.id])}
                className="w-full rounded-xl border border-border bg-background px-5 py-4 text-left font-medium hover:border-primary focus-visible:border-primary focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 motion-safe:transition-colors"
              >
                {o.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
