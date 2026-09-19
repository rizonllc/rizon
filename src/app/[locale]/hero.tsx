"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { AnalyticsEvent } from "@/lib/analytics";
import heroImage from "@/assets/hero.jpg";
import { Layers2Icon, PhoneIcon } from "lucide-react";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export const Hero = () => {
  const t = useTranslations("home.hero");
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
    <section id="home" className="pt-16">
      {/* Two-column hero: copy left, image right. */}
      <div className="grid min-h-[calc(100dvh-4rem)] lg:grid-cols-[2fr_3fr]">
        <div className="flex flex-col justify-center px-6 py-10 text-left sm:px-10 lg:px-16">
          <motion.h1
            {...fade(0.25)}
            className="font-sans text-[clamp(2.25rem,4.5vw,5rem)] font-semibold leading-[1.05] tracking-tight text-balance"
          >
            {t("headline")}
          </motion.h1>

          <motion.p
            {...fade(0.5)}
            className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground"
          >
            {t("sub")}
          </motion.p>

          <motion.div
            {...fade(0.62)}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href="/#work" />}
            >
              {t("ctaWork")}

              <Layers2Icon />
            </Button>

            <Button
              size="lg"
              nativeButton={false}
              render={
                <Link
                  href="/#contact"
                  data-umami-event={AnalyticsEvent.ContactCta}
                  data-umami-event-location="hero"
                />
              }
            >
              {t("ctaContact")}
              <PhoneIcon />
            </Button>
          </motion.div>
        </div>

        <motion.div
          {...fade(0.4)}
          className="relative m-3 mt-0 mr-6 min-h-80 overflow-hidden rounded-2xl sm:m-4 sm:mt-0 sm:mr-10 sm:rounded-3xl lg:mr-16 lg:ml-0"
        >
          <Image
            src={heroImage}
            alt=""
            fill
            priority
            placeholder="blur"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <motion.div
            {...fade(0.7)}
            className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4"
          >
            <dl className="grid grid-cols-3 gap-2 sm:gap-3">
              {[
                {
                  value: (
                    <>
                      <span className="text-primary">0</span>%
                    </>
                  ),
                  label: t("statFees"),
                },
                {
                  value: (
                    <>
                      <span className="text-primary">100</span>%
                    </>
                  ),
                  label: t("statOwnership"),
                },
                {
                  value: (
                    <>
                      {t("statLiveDay")} <span className="text-primary">1</span>
                    </>
                  ),
                  label: t("statLiveLabel"),
                },
              ].map((stat, i) => (
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
        </motion.div>
      </div>
    </section>
  );
};
