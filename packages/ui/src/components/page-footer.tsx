import type { ComponentPropsWithRef, ReactNode } from "react";
import { cn } from "../lib/cn";

export type PageFooterProps = ComponentPropsWithRef<"footer"> & {
  navigation?: ReactNode;
  navigationLabel?: string;
};

export function PageFooter({
  children,
  className,
  navigation,
  navigationLabel = "Footer",
  ...props
}: PageFooterProps) {
  return (
    <footer
      className={cn(
        "border-t border-mar-border bg-mar-card px-4 py-6 font-mar-sans text-sm text-mar-muted sm:px-6",
        className,
      )}
      {...props}
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
        <div>{children}</div>
        {navigation !== undefined && navigation !== null ? (
          <nav aria-label={navigationLabel}>{navigation}</nav>
        ) : null}
      </div>
    </footer>
  );
}
