import type { ReactNode } from "react";

type SectionHeaderProps = {
  label: string;
  title: ReactNode;
  description?: string;
  className?: string;
  variant?: "default" | "primary";
  as?: "h1" | "h2";
};

export const SectionHeader = ({
  label,
  title,
  description,
  className = "",
  variant = "default",
  as: Heading = "h2",
}: SectionHeaderProps) => {
  const isPrimary = variant === "primary";

  return (
    <div className={className}>
      <span
        className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium ${
          isPrimary
            ? "bg-primary-foreground/15 text-primary-foreground"
            : "bg-primary/10 text-primary"
        }`}
      >
        <span
          className={`size-1.5 rounded-full ${
            isPrimary ? "bg-primary-foreground" : "bg-primary"
          }`}
          aria-hidden
        />
        {label}
      </span>
      <Heading className="mt-6 text-4xl font-semibold tracking-tight leading-[1.05] text-balance md:text-5xl lg:text-6xl">
        {title}
      </Heading>
      {description && (
        <p
          className={`mt-5 max-w-xl text-base leading-relaxed text-pretty md:text-lg ${
            isPrimary ? "text-primary-foreground/80" : "text-muted-foreground"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
};
