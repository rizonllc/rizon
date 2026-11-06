import { getT } from "@/lib/t";
import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/reveal";

export const ContactHeader = () => {
  const t = getT("contact");
  return (
    <Reveal>
      <SectionHeader
        label={t("label")}
        title={
          <>
            {t("titlePrefix")} <span className="text-primary italic">{t("titleHighlight")}</span>
          </>
        }
        description={t("description")}
      />
    </Reveal>
  );
};
