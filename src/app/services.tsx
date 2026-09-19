"use client";

import { getT } from "@/lib/t";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/reveal";
import { AnalyticsEvent } from "@/lib/analytics";

type ServiceKey =
  "customLms" | "schoolPortals" | "corporateTraining" | "upgrades";

type FeatureIndexKey = "0" | "1" | "2" | "3" | "4";

const serviceDefs: {
  key: ServiceKey;
  image: string;
  featureIndexes: FeatureIndexKey[];
}[] = [
  {
    key: "customLms",
    image: "/services/custom-e-learning-platforms.png",
    featureIndexes: ["0", "1", "2", "3", "4"],
  },
  {
    key: "schoolPortals",
    image: "/services/school-university-portals.png",
    featureIndexes: ["0", "1", "2", "3", "4"],
  },
  {
    key: "corporateTraining",
    image: "/services/corporate-training-platforms.png",
    featureIndexes: ["0", "1", "2", "3", "4"],
  },
  {
    key: "upgrades",
    image: "/services/platform-upgrades-custom-features.png",
    featureIndexes: ["0", "1", "2", "3", "4"],
  },
];

export const Services = () => {
  const t = getT("homeServices");
  const [active, setActive] = useState(0);
  const current = serviceDefs[active];

  return (
    <section id="services" className="container mt-32 md:mt-40 cntr">
      <div className="grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-12">
        {/* Left — selector */}
        <div className="lg:col-span-5">
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

          <ul className="mt-10 border-t border-border" role="tablist">
            {serviceDefs.map((service, index) => {
              const isActive = index === active;
              return (
                <li key={service.key}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(index)}
                    className="group flex w-full items-center justify-between gap-4 border-b border-border py-5 text-left transition-colors"
                  >
                    <span
                      className={`text-lg md:text-xl tracking-tight transition-colors ${
                        isActive
                          ? "font-medium text-foreground"
                          : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      {t(`items.${service.key}.name`)}
                    </span>
                    <ArrowUpRight
                      size={20}
                      strokeWidth={1.5}
                      aria-hidden
                      className={`shrink-0 transition-all duration-300 ${
                        isActive
                          ? "text-primary opacity-100"
                          : "-translate-x-1 text-muted-foreground opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                      }`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right — detail panel */}
        <div className="lg:col-span-7">
          <div
            key={active}
            className="animate-in fade-in-0 duration-500 ease-out"
          >
            <div className="surface relative aspect-video overflow-hidden">
              <Image
                src={current.image}
                alt={t(`items.${current.key}.name`)}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
                priority={active === 0}
              />
            </div>

            <h3 className="mt-8 text-2xl md:text-3xl font-medium tracking-tight text-balance">
              {t(`items.${current.key}.name`)}
            </h3>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
              {t(`items.${current.key}.description`)}
            </p>

            <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {current.featureIndexes.map((idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-[15px] text-muted-foreground"
                >
                  <Check
                    size={16}
                    strokeWidth={2}
                    aria-hidden
                    className="mt-0.5 shrink-0 text-primary"
                  />
                  {t(`items.${current.key}.features.${idx}`)}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                nativeButton={false}
                render={
                  <Link
                    href="/contact"
                    data-umami-event={AnalyticsEvent.ContactCta}
                    data-umami-event-location="services-section"
                  />
                }
              >
                {t("cta")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
