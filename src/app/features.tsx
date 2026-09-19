"use client";

import { getT } from "@/lib/t";
import {
  BarChart3,
  BookOpen,
  MonitorSmartphone,
  ShieldCheck,
  Sparkles,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";

type CategoryKey =
  | "ai"
  | "engagement"
  | "content"
  | "tracking"
  | "usability"
  | "security";
type ItemIndex = "0" | "1" | "2" | "3" | "4" | "5";

const categoryDefs: {
  key: CategoryKey;
  icon: LucideIcon;
  itemIndexes: ItemIndex[];
}[] = [
  { key: "ai", icon: Sparkles, itemIndexes: ["0", "1", "2", "3", "4"] },
  { key: "engagement", icon: Trophy, itemIndexes: ["0", "1", "2", "3", "4"] },
  {
    key: "content",
    icon: BookOpen,
    itemIndexes: ["0", "1", "2", "3", "4", "5"],
  },
  { key: "tracking", icon: BarChart3, itemIndexes: ["0", "1", "2", "3", "4"] },
  {
    key: "usability",
    icon: MonitorSmartphone,
    itemIndexes: ["0", "1", "2", "3", "4"],
  },
  {
    key: "security",
    icon: ShieldCheck,
    itemIndexes: ["0", "1", "2", "3", "4"],
  },
];

export const Features = () => {
  const t = getT("features");
  return (
    <section
      id="features"
      className="bg-primary text-primary-foreground mt-32 md:mt-40"
    >
      <div className="container py-20 md:py-28 cntr">
        <Reveal>
          <SectionHeader
            variant="primary"
            label={t("label")}
            title={
              <>
                {t("titlePrefix")}{" "}
                <span className="italic">{t("titleHighlight")}</span>
              </>
            }
            description={t("description")}
          />
        </Reveal>

        <RevealGroup
          stagger={0.1}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {categoryDefs.map(({ key, icon: Icon, itemIndexes }) => (
            <RevealItem
              key={key}
              as="article"
              className="rounded-2xl bg-primary-foreground/10 p-7 ring-1 ring-inset ring-primary-foreground/15 md:p-8"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary-foreground/15 text-primary-foreground">
                <Icon size={20} strokeWidth={1.75} aria-hidden />
              </span>
              <h3 className="mt-6 text-xl font-semibold tracking-tight">
                {t(`categories.${key}.title`)}
              </h3>
              <ul className="mt-5 space-y-2.5">
                {itemIndexes.map((idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2.5 text-[15px] text-primary-foreground/80"
                  >
                    <span
                      className="size-1 shrink-0 rounded-full bg-primary-foreground/50"
                      aria-hidden
                    />
                    {t(
                      // Each category's items array has its own length; the
                      // typed key union makes cross-category paths unsafe.
                      `categories.${key}.items.${idx}` as Parameters<
                        typeof t
                      >[0],
                    )}
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
};
