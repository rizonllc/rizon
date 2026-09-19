"use client";

import { getT } from "@/lib/t";
import { SectionHeader } from "@/components/section-header";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";

type StepKey = "first" | "plan" | "design" | "build" | "demo" | "launch";
type StepNumberKey = "1" | "2" | "3" | "4" | "5" | "6";

const stepKeys: StepKey[] = [
  "first",
  "plan",
  "design",
  "build",
  "demo",
  "launch",
];

const stepNumberKeys: StepNumberKey[] = ["1", "2", "3", "4", "5", "6"];

export const HowWeWork = () => {
  const t = getT("home.howWeWork");
  return (
    <section id="how-we-work" className="container mt-32 md:mt-40 cntr">
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
        stagger={0.08}
        as="ol"
        className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {stepKeys.map((key, index) => {
          const num = String(index + 1);
          const numKey = stepNumberKeys[index];
          return (
            <RevealItem
              key={key}
              as="li"
              className="surface surface-hover flex flex-col p-7 md:p-8"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-lg font-medium tabular-nums text-primary">
                  {num.padStart(2, "0")}
                </span>
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground/60">
                  {t("stepLabel")} {t(`stepNumbers.${numKey}`)}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight md:text-2xl">
                {t(`steps.${key}.title`)}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                {t(`steps.${key}.description`)}
              </p>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </section>
  );
};
