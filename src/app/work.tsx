"use client";

import { getT } from "@/lib/t";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/projects";
import { SectionHeader } from "@/components/section-header";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";

export const Work = () => {
  const t = getT("work");
  return (
    <section id="work" className="container mt-32 md:mt-40 cntr">
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
        {projects.map(({ slug, title, tech, description, preview }, index) => {
          const localTitle = title;
          const localDesc = description;
          return (
            <RevealItem key={slug} duration={0.6} y={20}>
              <Link
                href={`/case-studies/${slug}`}
                className="surface surface-hover group flex h-full flex-col overflow-hidden"
              >
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <Image
                    src={preview}
                    alt={localTitle}
                    fill
                    quality={90}
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm tabular-nums text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <ArrowUpRight
                      size={20}
                      strokeWidth={1.5}
                      aria-hidden
                      className="shrink-0 text-muted-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  </div>

                  <h3 className="mt-4 text-2xl font-semibold tracking-tight text-balance">
                    {localTitle}
                  </h3>

                  <ul className="mt-4 flex flex-wrap gap-2">
                    {tech.map((techName) => (
                      <li
                        key={techName}
                        className="rounded-full bg-secondary px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground"
                      >
                        {techName}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                    {localDesc}
                  </p>
                </div>
              </Link>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </section>
  );
};
