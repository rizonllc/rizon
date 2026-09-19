"use client";

import {
  Cpu,
  MonitorPlay,
  Radio,
  Scissors,
  MessageSquare,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/section-header";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";

type ReasonKey = "tech" | "demos" | "live" | "lean" | "feedback";

const reasonIcons: Record<ReasonKey, LucideIcon> = {
  tech: Cpu,
  demos: MonitorPlay,
  live: Radio,
  lean: Scissors,
  feedback: MessageSquare,
};

const reasonKeys: ReasonKey[] = ["tech", "demos", "live", "lean", "feedback"];

export const WhyUs = () => {
  const t = useTranslations("home.whyUs");
  return (
    <section id="why-us" className="container mt-32 md:mt-40 cntr">
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
        stagger={0.1}
        className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2"
      >
        {reasonKeys.map((key, index) => {
          const Icon = reasonIcons[key];
          return (
            <RevealItem
              key={key}
              as="article"
              className={`bg-primary/5 rounded-lg flex flex-col p-7 md:p-8${
                index === reasonKeys.length - 1 ? " md:col-span-2" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon size={20} strokeWidth={1.75} aria-hidden />
                </span>
                <span className="font-mono text-sm tabular-nums text-muted-foreground/50">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold tracking-tight text-primary">
                {t(`reasons.${key}.title`)}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                {t(`reasons.${key}.description`)}
              </p>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </section>
  );
};
