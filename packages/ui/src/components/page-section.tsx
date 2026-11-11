import type { ComponentPropsWithRef, ReactNode } from "react";
import { cn } from "../lib/cn";

export type PageSectionProps = ComponentPropsWithRef<"section"> & {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  headingLevel?: 2 | 3 | 4;
};

export function PageSection({
  actions,
  "aria-label": ariaLabel,
  children,
  className,
  description,
  headingLevel = 2,
  title,
  ...props
}: PageSectionProps) {
  const Heading = `h${headingLevel}` as "h2" | "h3" | "h4";

  return (
    <section
      aria-label={ariaLabel ?? (typeof title === "string" ? title : undefined)}
      className={cn("grid gap-5 font-mar-sans text-mar-text", className)}
      {...props}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <Heading className="text-xl font-semibold">{title}</Heading>
          {description !== undefined && description !== null ? (
            <p className="mt-1 max-w-3xl text-sm text-mar-muted">
              {description}
            </p>
          ) : null}
        </div>
        {actions !== undefined && actions !== null ? (
          <div className="flex flex-wrap items-center gap-2">{actions}</div>
        ) : null}
      </div>
      {children}
    </section>
  );
}
