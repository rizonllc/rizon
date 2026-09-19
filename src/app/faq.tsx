"use client";

import { getT } from "@/lib/t";
import { useState } from "react";
import { Plus } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";

const faqKeys = [
  "timeline",
  "involvement",
  "integrations",
  "afterLaunch",
  "scale",
  "mobile",
  "ownership",
] as const;

export const Faq = () => {
  const t = getT("homeFaq");
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="container mt-32 md:mt-40 cntr">
      <div className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <Reveal>
              <SectionHeader
                label={t("label")}
                title={
                  <>
                    {t("titlePrefix")}{" "}
                    <span className="text-primary italic">
                      {t("titleHighlight")}
                    </span>
                  </>
                }
                description={t("description")}
              />
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7">
          <RevealGroup
            stagger={0.08}
            className="surface divide-y divide-border overflow-hidden"
          >
            {faqKeys.map((key, index) => {
              const isOpen = index === open;
              return (
                <RevealItem key={key} className="px-6 md:px-8">
                  <dt>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${index}`}
                      id={`faq-trigger-${index}`}
                      onClick={() => setOpen(isOpen ? null : index)}
                      className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                    >
                      <span
                        className={`text-lg md:text-xl tracking-tight transition-colors ${
                          isOpen
                            ? "text-foreground"
                            : "text-foreground/80 group-hover:text-foreground"
                        }`}
                      >
                        {t(`items.${key}.question`)}
                      </span>
                      <Plus
                        size={22}
                        strokeWidth={1.5}
                        aria-hidden
                        className={`mt-0.5 shrink-0 text-muted-foreground transition-all duration-300 ease-out group-hover:text-foreground ${
                          isOpen ? "rotate-45 text-primary" : "rotate-0"
                        }`}
                      />
                    </button>
                  </dt>
                  <dd
                    id={`faq-panel-${index}`}
                    role="region"
                    aria-labelledby={`faq-trigger-${index}`}
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-xl pb-6 text-[15px] leading-relaxed text-muted-foreground">
                        {t(`items.${key}.answer`)}
                      </p>
                    </div>
                  </dd>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
};
