"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { AnalyticsEvent } from "@/lib/analytics";

export const Cta = () => {
  const t = useTranslations("cta");
  return (
    <section className="container mt-32 md:mt-40 cntr">
      <Reveal duration={0.7}>
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-primary-foreground sm:px-10 md:px-16 md:py-24">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-highlight/25 blur-3xl"
          />
          <div className="relative grid grid-cols-1 items-end gap-x-12 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-3.5 py-1.5 text-sm font-medium text-primary-foreground">
                <span
                  className="size-1.5 rounded-full bg-primary-foreground"
                  aria-hidden
                />
                {t("eyebrow")}
              </span>
              <h2 className="mt-6 text-4xl font-semibold tracking-tight leading-[1.05] text-balance md:text-5xl lg:text-6xl">
                {t("titlePrefix")}{" "}
                <span className="italic">{t("titleHighlight")}</span>
              </h2>
            </div>

            <div className="lg:col-span-5">
              <p className="text-lg leading-relaxed text-primary-foreground/80 text-pretty">
                {t("description")}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button
                  size="lg"
                  className="bg-background text-foreground hover:bg-background/90"
                  nativeButton={false}
                  render={
                    <Link
                      href="/#contact"
                      data-umami-event={AnalyticsEvent.ContactCta}
                      data-umami-event-location="cta-section"
                    />
                  }
                >
                  {t("button")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
};
