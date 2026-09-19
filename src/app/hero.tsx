"use client";

import { getT } from "@/lib/t";
import { Layers2Icon, PhoneIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Hero as HeroLayout } from "@/components/hero";
import { AnalyticsEvent } from "@/lib/analytics";
import heroImage from "@/assets/hero.jpg";

export const Hero = () => {
  const t = getT("home.hero");

  return (
    <HeroLayout
      id="home"
      headline={t("headline")}
      sub={t("sub")}
      image={heroImage}
      tags={t.raw("tags") as string[]}
      actions={
        <>
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
                href="/contact"
                data-umami-event={AnalyticsEvent.ContactCta}
                data-umami-event-location="hero"
              />
            }
          >
            {t("ctaContact")}
            <PhoneIcon />
          </Button>
        </>
      }
      stats={[
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
      ]}
    />
  );
};
