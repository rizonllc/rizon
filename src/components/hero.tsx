"use client";

import type { ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export type HeroStat = { value: ReactNode; label: string };

type HeroProps = {
  id?: string;
  eyebrow?: ReactNode;
  headline: ReactNode;
  headlineClassName?: string;
  sub: ReactNode;
  actions?: ReactNode;
  tags?: string[];
  note?: ReactNode;
  image: StaticImageData;
  imageAlt?: string;
  stats?: HeroStat[];
};

// Full-bleed inset image card, nav floats white over it until scrolled.
export const Hero = ({
  id,
  eyebrow,
  headline,
  headlineClassName,
  sub,
  actions,
  tags,
  note,
  image,
  imageAlt = "",
  stats,
}: HeroProps) => {
  const reduced = useReducedMotion();

  const fade = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 40 } as const,
          animate: { opacity: 1, y: 0 } as const,
          transition: { duration: 1, delay, ease },
        };

  return (
    <section id={id} className="px-3 pt-3 sm:px-4 sm:pt-4 lg:px-4 lg:pt-4">
      <div className="relative isolate flex h-[82vh] max-h-180 min-h-140 flex-col overflow-hidden rounded-2xl bg-background sm:rounded-3xl">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-black/55" />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-linear-to-b from-black/60 via-black/25 to-black/60"
        />

        <div className="container flex flex-1 flex-col items-center justify-center px-6 pt-28 pb-16 text-center sm:px-10 sm:pt-32 lg:px-16 cntr">
          {eyebrow && (
            <motion.div
              {...fade(0.1)}
              className="mb-6 **:text-white/70! **:aria-[current]:text-white!"
            >
              {eyebrow}
            </motion.div>
          )}

          <motion.h1
            {...fade(0.25)}
            className={cn(
              "max-w-3xl text-[2rem] font-semibold leading-[1.08] tracking-tight text-balance text-white sm:max-w-2xl sm:text-5xl sm:leading-[1.05] md:max-w-3xl md:text-6xl lg:max-w-4xl lg:text-7xl lg:leading-[1.02]",
              headlineClassName,
            )}
          >
            {headline}
          </motion.h1>

          <motion.p
            {...fade(0.5)}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-white/75"
          >
            {sub}
          </motion.p>

          {actions && (
            <motion.div
              {...fade(0.62)}
              className="mt-10 flex flex-wrap items-center justify-center gap-3"
            >
              {actions}
            </motion.div>
          )}

          {note && (
            <motion.p
              {...fade(0.74)}
              className="mt-8 max-w-xl text-sm text-white/60"
            >
              {note}
            </motion.p>
          )}

          {tags && tags.length > 0 && (
            <motion.div
              {...fade(0.74)}
              className="mt-8 flex flex-wrap justify-center gap-2"
            >
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="h-auto border-white/25 bg-white/10 px-3 py-1 text-sm text-white/85 backdrop-blur-sm"
                >
                  {tag}
                </Badge>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {stats && stats.length > 0 && (
        <motion.div {...fade(0.7)} className="container mt-10 cntr">
          <dl className="grid grid-cols-1 border-border sm:grid-cols-3">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`py-8 sm:py-10 md:py-12 ${
                  i > 0
                    ? "border-t border-border sm:border-t-0 sm:border-l sm:pl-6 md:pl-8"
                    : "sm:pr-6 md:pr-8"
                } ${i === stats.length - 1 ? "sm:pr-0" : ""}`}
              >
                <dt className="text-4xl font-light tracking-tight sm:text-5xl md:text-7xl">
                  {stat.value}
                </dt>
                <dd className="mt-3 max-w-[18ch] text-[15px] leading-snug text-muted-foreground sm:mt-4">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      )}
    </section>
  );
};
