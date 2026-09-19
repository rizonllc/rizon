import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Faded-blue card: icon in a tinted square, blue title, muted body.
export const IconCard = ({
  icon: Icon,
  title,
  children,
  className,
}: {
  icon: LucideIcon;
  title: ReactNode;
  children: ReactNode;
  className?: string;
}) => (
  <div className={cn("flex h-full flex-col rounded-lg bg-primary/5 p-7 md:p-8", className)}>
    <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
      <Icon size={20} strokeWidth={1.75} aria-hidden />
    </span>
    <h3 className="mt-6 text-xl font-semibold tracking-tight text-primary">
      {title}
    </h3>
    <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
      {children}
    </p>
  </div>
);
