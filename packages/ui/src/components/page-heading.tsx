import type { ComponentPropsWithRef, ReactNode } from "react";
import { cn } from "../lib/cn";

export type PageHeadingProps = ComponentPropsWithRef<"header"> & {
  title: ReactNode;
  description?: ReactNode;
  eyebrow?: ReactNode;
  breadcrumbs?: ReactNode;
  actions?: ReactNode;
  metadata?: ReactNode;
};

export function PageHeading({
  actions,
  breadcrumbs,
  children,
  className,
  description,
  eyebrow,
  metadata,
  title,
  ...props
}: PageHeadingProps) {
  return (
    <header
      className={cn(
        "grid gap-4 border-b border-mar-border pb-6 font-mar-sans text-mar-text",
        className,
      )}
      {...props}
    >
      {breadcrumbs !== undefined && breadcrumbs !== null ? (
        <nav aria-label="Breadcrumb" className="text-sm text-mar-muted">
          {breadcrumbs}
        </nav>
      ) : null}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 max-w-3xl">
          {eyebrow !== undefined && eyebrow !== null ? (
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-mar-muted">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="break-words text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h1>
          {description !== undefined && description !== null ? (
            <p className="mt-3 text-base text-mar-muted">{description}</p>
          ) : null}
          {metadata !== undefined && metadata !== null ? (
            <div className="mt-3 flex flex-wrap gap-3 text-sm text-mar-muted">
              {metadata}
            </div>
          ) : null}
        </div>
        {actions !== undefined && actions !== null ? (
          <div className="flex flex-wrap items-center gap-2">{actions}</div>
        ) : null}
      </div>
      {children}
    </header>
  );
}
