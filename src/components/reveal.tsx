import type { CSSProperties, ReactNode } from "react";

// Scroll-reveal without client-side React: markup carries data attributes and
// src/scripts/reveal.ts fades elements in with an IntersectionObserver.
// Without JS (no `js` class on <html>) everything stays visible.

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Transition length in seconds. */
  duration?: number;
  /** Delay in seconds. */
  delay?: number;
  /** Starting vertical offset in px. */
  y?: number;
};

export function Reveal({ children, className, duration = 1, delay = 0, y = 48 }: RevealProps) {
  return (
    <div
      data-reveal
      className={className}
      style={{ "--reveal-y": `${y}px`, "--reveal-duration": `${duration}s`, "--reveal-delay": `${delay}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  /** Delay between children in seconds. */
  stagger?: number;
  as?: "div" | "ol" | "ul";
};

export function RevealGroup({ children, className, stagger = 0.15, as: Tag = "div" }: RevealGroupProps) {
  return (
    <Tag data-reveal-group data-stagger={stagger} className={className}>
      {children}
    </Tag>
  );
}

type RevealItemProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  duration?: number;
  y?: number;
  as?: "div" | "li" | "article";
};

export function RevealItem({ children, className, style, duration = 0.9, y = 40, as: Tag = "div" }: RevealItemProps) {
  return (
    <Tag
      data-reveal-item
      className={className}
      style={{ ...style, "--reveal-y": `${y}px`, "--reveal-duration": `${duration}s` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
