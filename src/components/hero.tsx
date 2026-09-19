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

// Two-column hero: copy left, image right (with optional stat cards on it).
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
    <section id={id} className="pt-16">
      <div className="grid min-h-[calc(100dvh-4rem)] lg:grid-cols-[2fr_3fr]">
        <div className="flex flex-col justify-center px-6 py-10 text-left sm:px-10 lg:px-16">
          {eyebrow && (
            <motion.div {...fade(0.1)} className="mb-8">
              {eyebrow}
            </motion.div>
          )}

          <motion.h1
            {...fade(0.25)}
            className={cn(
              "font-sans text-[clamp(2.25rem,4.5vw,5rem)] font-semibold leading-[1.05] tracking-tight text-balance",
              headlineClassName,
            )}
          >
            {headline}
          </motion.h1>

          <motion.p
            {...fade(0.5)}
            className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground"
          >
            {sub}
          </motion.p>

          {actions && (
            <motion.div
              {...fade(0.62)}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              {actions}
            </motion.div>
          )}

          {note && (
            <motion.p
              {...fade(0.74)}
              className="mt-8 max-w-xl text-sm text-muted-foreground"
            >
              {note}
            </motion.p>
          )}

          {tags && tags.length > 0 && (
            <motion.ul {...fade(0.74)} className="mt-8 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <li key={tag}>
                  <Badge variant="outline" className="h-auto px-3 py-1 text-sm">
                    {tag}
                  </Badge>
                </li>
              ))}
            </motion.ul>
          )}
        </div>

        <motion.div
          {...fade(0.4)}
          className="relative m-3 mt-0 mr-6 min-h-80 overflow-hidden rounded-2xl sm:m-4 sm:mt-0 sm:mr-10 sm:rounded-3xl lg:mr-16 lg:ml-0"
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            placeholder="blur"
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover"
          />
          {stats && stats.length > 0 && (
            <motion.div
              {...fade(0.7)}
              className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4"
            >
              <dl className="grid grid-cols-3 gap-2 sm:gap-3">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="rounded-xl bg-background/85 p-3 backdrop-blur-md sm:rounded-2xl sm:p-5"
                  >
                    <dt className="text-2xl font-light tracking-tight sm:text-3xl lg:text-4xl">
                      {stat.value}
                    </dt>
                    <dd className="mt-2 text-xs leading-snug text-muted-foreground sm:text-[15px]">
                      {stat.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
