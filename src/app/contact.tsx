"use client";

import { getT } from "@/lib/t";
import { ContactCards } from "@/components/contact-cards";
import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/reveal";

export const Contact = () => {
  const t = getT("contact");
  return (
    <section id="contact" className="container mt-32 md:mt-40 cntr">
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
      <div className="mt-14">
        <ContactCards location="contact-section" />
      </div>
    </section>
  );
};
