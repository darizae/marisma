import type { ComponentPropsWithRef } from "react";
import { cn } from "../lib/cn";

export type TableProps = ComponentPropsWithRef<"table"> & {
  /** Accessible name for the focusable horizontal-overflow region. */
  scrollLabel?: string;
  containerClassName?: string;
};

export function Table({
  className,
  containerClassName,
  ref,
  scrollLabel = "Scrollable table",
  ...props
}: TableProps) {
  return (
    <div
      aria-label={scrollLabel}
      className={cn(
        "w-full overflow-x-auto rounded-xl border border-mar-border bg-mar-card font-mar-sans text-mar-text",
        containerClassName,
      )}
      role="region"
      tabIndex={0}
    >
      <table
        className={cn("w-full min-w-max border-collapse text-left", className)}
        ref={ref}
        {...props}
      />
    </div>
  );
}

export function TableHeader({
  className,
  ...props
}: ComponentPropsWithRef<"thead">) {
  return <thead className={cn("bg-mar-surface", className)} {...props} />;
}

export function TableBody({
  className,
  ...props
}: ComponentPropsWithRef<"tbody">) {
  return (
    <tbody className={cn("divide-y divide-mar-border", className)} {...props} />
  );
}

export function TableFooter({
  className,
  ...props
}: ComponentPropsWithRef<"tfoot">) {
  return (
    <tfoot
      className={cn(
        "border-t border-mar-border bg-mar-surface font-medium",
        className,
      )}
      {...props}
    />
  );
}

export function TableRow({ className, ...props }: ComponentPropsWithRef<"tr">) {
  return (
    <tr
      className={cn(
        "transition-colors duration-[var(--marisma-duration-fast)] hover:bg-mar-surface",
        className,
      )}
      {...props}
    />
  );
}

export function TableHead({
  className,
  scope = "col",
  ...props
}: ComponentPropsWithRef<"th">) {
  return (
    <th
      className={cn(
        "h-11 whitespace-nowrap px-4 py-2 text-sm font-semibold text-mar-text",
        className,
      )}
      scope={scope}
      {...props}
    />
  );
}

export function TableRowHeader({
  className,
  scope = "row",
  ...props
}: ComponentPropsWithRef<"th">) {
  return (
    <th
      className={cn("max-w-80 px-4 py-3 font-medium", className)}
      scope={scope}
      {...props}
    />
  );
}

export function TableCell({
  className,
  ...props
}: ComponentPropsWithRef<"td">) {
  return (
    <td
      className={cn("max-w-96 px-4 py-3 align-middle", className)}
      {...props}
    />
  );
}

export function TableCaption({
  className,
  ...props
}: ComponentPropsWithRef<"caption">) {
  return (
    <caption
      className={cn("p-4 text-left text-sm text-mar-muted", className)}
      {...props}
    />
  );
}
