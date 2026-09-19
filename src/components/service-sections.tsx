import type { ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";
import { ArrowRight, Check, Minus, Plus, type LucideIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { IconCard } from "@/components/icon-card";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";

// Presentational sections shared by every service landing page. Copy comes in
// as props; nothing here is service-specific.

export const sectionCls = "container cntr mt-24 md:mt-32";
export const h2Cls =
  "text-3xl font-semibold tracking-tight text-balance md:text-4xl";
const bodyCls = "mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground";

const Copy = ({ h2, children }: { h2: string; children: ReactNode }) => (
  <>
    <h2 className={h2Cls}>{h2}</h2>
    {children}
  </>
);

// Turns each `links[i].text` phrase inside `text` into a link (in text order).
const Linked = ({
  text,
  links = [],
}: {
  text: string;
  links?: { text: string; href: string }[];
}) => {
  const out: ReactNode[] = [];
  let rest = text;
  for (const link of links) {
    const i = rest.indexOf(link.text);
    if (i < 0) continue;
    out.push(rest.slice(0, i));
    out.push(
      <Link
        key={link.href}
        href={link.href}
        className="text-primary underline underline-offset-4"
      >
        {link.text}
      </Link>,
    );
    rest = rest.slice(i + link.text.length);
  }
  return <>{out}{rest}</>;
};

type Block = { h2: string; body: string };
type Feature = {
  feature: string;
  benefit: string;
  icon?: LucideIcon;
  titleHref?: string;
  links?: { text: string; href: string }[];
};

export const ProblemAgitateSolution = ({
  problem,
  agitate,
  solution,
}: {
  problem: Block;
  agitate: Block;
  solution: Block & { features: Feature[] };
}) => (
  <>
    {[problem, agitate].map((b) => (
      <section key={b.h2} className={sectionCls}>
        <Reveal y={24}>
          <Copy h2={b.h2}>
            <p className={bodyCls}>{b.body}</p>
          </Copy>
        </Reveal>
      </section>
    ))}
    <section className={sectionCls}>
      <Reveal y={24}>
        <Copy h2={solution.h2}>
          <p className={bodyCls}>{solution.body}</p>
        </Copy>
      </Reveal>
      {/* Bento: two columns, the last card spans both. */}
      <ul className="mt-10 grid gap-4 md:grid-cols-2">
        {solution.features.map(({ icon, ...f }, i) => (
          <li
            key={f.feature}
            className={
              i === solution.features.length - 1 && i % 2 === 0
                ? "md:col-span-2"
                : undefined
            }
          >
            <IconCard icon={icon ?? Check} title={
                f.titleHref ? (
                  <Link href={f.titleHref} className="underline underline-offset-4">
                    {f.feature}
                  </Link>
                ) : (
                  f.feature
                )
              }
            >
              <Linked text={f.benefit} links={f.links} />
            </IconCard>
          </li>
        ))}
      </ul>
    </section>
  </>
);

export const ProcessSteps = ({
  h2,
  steps,
}: {
  h2: string;
  steps: { title: string; body: string; icon: LucideIcon }[];
}) => (
  <section className={sectionCls}>
    <h2 className={h2Cls}>{h2}</h2>
    <RevealGroup as="ol" className="mt-10 grid gap-4 sm:grid-cols-2">
      {steps.map(({ title, body, icon }) => (
        <RevealItem key={title} as="li">
          <IconCard icon={icon} title={title}>
            {body}
          </IconCard>
        </RevealItem>
      ))}
    </RevealGroup>
  </section>
);

export const CostAEO = ({
  h2,
  answer,
  support,
}: {
  h2: string;
  answer: string;
  support: string;
}) => (
  <section className={sectionCls}>
    <Copy h2={h2}>
      <p className={`${bodyCls} text-foreground`}>{answer}</p>
      <p className={bodyCls}>{support}</p>
    </Copy>
  </section>
);

export type CaseCard = {
  href: string;
  title: string;
  description: string;
  image: string | StaticImageData;
  alt: string;
  contain?: boolean;
};

export const CaseStudyCards = ({
  h2,
  cases,
  allHref,
  allLabel,
}: {
  h2: string;
  cases: CaseCard[];
  allHref: string;
  allLabel: string;
}) => cases.length === 0 ? null : (
  <section className={sectionCls}>
    <h2 className={h2Cls}>{h2}</h2>
    <ul className="mt-10 grid gap-6 md:grid-cols-2">
      {cases.map((c) => (
        <li key={c.href} className="surface surface-hover overflow-hidden">
          <Link href={c.href} className="block">
            {/* Fixed aspect box: swapping the src never shifts layout. */}
            <div className="relative aspect-[16/10] bg-muted">
              <Image
                src={c.image}
                alt={c.alt}
                fill
                loading="lazy"
                sizes="(min-width: 768px) 45vw, 100vw"
                className={c.contain ? "object-contain p-8" : "object-cover object-top"}
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-primary">{c.title}</h3>
              <p className="mt-2 line-clamp-3 text-muted-foreground">
                {c.description}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
    <Link
      href={allHref}
      className="mt-6 inline-flex items-center gap-1.5 font-medium text-primary"
    >
      {allLabel} <ArrowRight size={16} aria-hidden />
    </Link>
  </section>
);

// Native <details>: zero JS, answers stay in the server-rendered HTML.
export const FAQAccordion = ({
  h2,
  faqs,
}: {
  h2: string;
  faqs: {
    question: string;
    answer: string;
    link?: { text: string; href: string };
  }[];
}) => (
  <section className={sectionCls}>
    <h2 className={h2Cls}>{h2}</h2>
    <div className="mt-10 flex flex-col gap-3 md:gap-4">
      {faqs.map((f) => (
        <details key={f.question} className="group bg-muted/30 px-6 md:px-12">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-medium md:py-9 md:text-xl [&::-webkit-details-marker]:hidden">
            <h3>{f.question}</h3>
            <span className="shrink-0 text-muted-foreground" aria-hidden>
              <Plus size={24} className="group-open:hidden" />
              <Minus size={24} className="hidden group-open:block" />
            </span>
          </summary>
          <p className="max-w-3xl pb-8 leading-relaxed text-muted-foreground">
            <Linked text={f.answer} links={f.link && [f.link]} />
          </p>
        </details>
      ))}
    </div>
  </section>
);

export const CTABand = ({
  h2,
  line,
  action,
}: {
  h2: string;
  line: string;
  action: ReactNode;
}) => (
  <section className={sectionCls}>
    <div className="rounded-3xl bg-primary p-10 text-primary-foreground md:p-14">
      <h2 className={h2Cls}>{h2}</h2>
      <p className="mt-4 max-w-2xl text-lg text-primary-foreground/80">{line}</p>
      <div className="mt-8">{action}</div>
    </div>
  </section>
);
