import { getT } from "@/lib/t";
import { Fragment } from "react";
import Image, { type StaticImageData } from "next/image";
import aiAdoption from "@/assets/companies/ai-adoption.jpg";
import akera from "@/assets/companies/akera.png";
import choiceLearning from "@/assets/companies/choice-learning.webp";
import cloudsds from "@/assets/companies/cloudsds.webp";
import launchlife from "@/assets/companies/launchlife.svg";
import ministereSante from "@/assets/companies/ministere-sante.png";

const companies: { name: string; src: StaticImageData; size?: string }[] = [
  { name: "Ai Adoption", src: aiAdoption },
  { name: "Akera Agency", src: akera },
  { name: "CloudSDS", src: cloudsds },
  { name: "LaunchLife International", src: launchlife, size: "h-14 md:h-16" },
  { name: "Choice EMR Learning", src: choiceLearning, size: "h-16 md:h-20" },
  {
    name: "Ministère de la Santé et de la Protection Sociale",
    src: ministereSante,
    size: "h-16 md:h-20",
  },
];

// The bare logo row, reused wherever a page needs its own heading around it.
export const LogoStrip = () => (
  <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
    {companies.map(({ name, src, size = "h-10 md:h-12" }, i) => (
      <Fragment key={name}>
        {/* Row break: the last two logos sit on their own line. */}
        {i === 4 && <li aria-hidden className="h-0 basis-full" />}
        <li>
          <Image
            src={src}
            alt={name}
            className={`${size} w-auto object-contain`}
          />
        </li>
      </Fragment>
    ))}
  </ul>
);

export const Logos = async () => {
  const t = getT("logos");
  return (
    <section className="container mt-16 cntr md:mt-24">
      <h2 className="text-center text-lg text-muted-foreground">
        {t("title")}
      </h2>
      <div className="mt-10">
        <LogoStrip />
      </div>
    </section>
  );
};
