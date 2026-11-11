import type { ComponentPropsWithRef, ReactNode } from "react";
import { cn } from "../lib/cn";

export type ErrorViewProps = ComponentPropsWithRef<"section"> & {
  title: ReactNode;
  description?: ReactNode;
  code?: ReactNode;
  actions?: ReactNode;
  visual?: ReactNode;
  details?: ReactNode;
};

export function ErrorView({
  actions,
  "aria-label": ariaLabel,
  children,
  className,
  code,
  description,
  details,
  title,
  visual,
  ...props
}: ErrorViewProps) {
  return (
    <section
      aria-label={ariaLabel ?? (typeof title === "string" ? title : undefined)}
      className={cn(
        "mx-auto grid w-full max-w-2xl justify-items-center gap-5 rounded-2xl border border-mar-border bg-mar-card p-6 text-center font-mar-sans text-mar-text sm:p-10",
        className,
      )}
      {...props}
    >
      {visual !== undefined && visual !== null ? (
        <div aria-hidden="true" className="text-mar-primary">
          {visual}
        </div>
      ) : null}
      <div className="grid gap-3">
        {code !== undefined && code !== null ? (
          <p className="text-sm font-semibold uppercase tracking-widest text-mar-muted">
            {code}
          </p>
        ) : null}
        <h1 className="text-2xl font-semibold sm:text-3xl">{title}</h1>
        {description !== undefined && description !== null ? (
          <p className="text-mar-muted">{description}</p>
        ) : null}
      </div>
      {children}
      {actions !== undefined && actions !== null ? (
        <div className="flex flex-wrap justify-center gap-3">{actions}</div>
      ) : null}
      {details !== undefined && details !== null ? (
        <div className="w-full border-t border-mar-border pt-4 text-left text-sm text-mar-muted">
          {details}
        </div>
      ) : null}
    </section>
  );
}
