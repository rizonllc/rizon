import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type CaseStudyCardProps = {
  slug: string;
  title: string;
  summary: string;
  result?: string; // shown only for named client work
  // Screenshots crop to fill; logos (`contain`) sit centered on a tint. No image
  // falls back to a title tile, so swapping one in needs no layout change.
  image?: string | StaticImageData;
  contain?: boolean;
  services: { title: string; href: string }[];
  heading?: "h2" | "h3";
};

// The one case study card, used on the hub and in service Proof sections.
export const CaseStudyCard = ({
  slug,
  title,
  summary,
  result,
  image,
  contain,
  services,
  heading: Heading = "h2",
}: CaseStudyCardProps) => (
  <li className="group relative flex flex-col overflow-hidden rounded-lg bg-primary/5 transition-colors duration-300 hover:bg-primary/10">
    {/* Fixed aspect box: swapping the image never shifts layout. */}
    <div className="relative aspect-video overflow-hidden bg-primary/10">
      {image ? (
        <Image
          src={image}
          alt={`${title} thumbnail`}
          fill
          sizes="(max-width: 768px) 100vw, 45vw"
          className={
            contain
              ? "object-contain p-10 transition-transform duration-700 ease-out group-hover:scale-105"
              : "object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          }
        />
      ) : (
        <span
          aria-hidden
          className="flex size-full items-center justify-center p-8 text-center text-2xl font-semibold tracking-tight text-primary/70"
        >
          {title}
        </span>
      )}
    </div>
    <div className="flex flex-1 flex-col p-7 md:p-8">
      <Heading className="text-2xl font-semibold tracking-tight text-primary">
        {/* Stretched link: the whole card is clickable, tags stay separate links. */}
        <Link
          href={`/case-studies/${slug}`}
          className="after:absolute after:inset-0"
        >
          {title}
        </Link>
      </Heading>
      <p className="mt-3 leading-relaxed text-muted-foreground">{summary}</p>
      {result && (
        <p className="mt-4 font-medium">
          <span className="text-muted-foreground">Result: </span>
          {result}
        </p>
      )}
      <ul className="relative z-10 mt-6 flex flex-wrap gap-2">
        {services.map((s) => (
          <li key={s.href}>
            <Link
              href={s.href}
              className="inline-flex rounded-full border border-border bg-background px-3 py-1 text-sm transition-colors hover:border-primary hover:text-primary"
            >
              {s.title}
            </Link>
          </li>
        ))}
      </ul>
      <span
        aria-hidden
        className="mt-6 inline-flex items-center gap-1.5 font-medium text-primary"
      >
        Read the case study{" "}
        <ArrowRight
          size={16}
          className="transition-transform group-hover:translate-x-1"
        />
      </span>
    </div>
  </li>
);
