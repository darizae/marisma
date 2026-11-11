"use client";

import type { ComponentPropsWithRef } from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { cn } from "../lib/cn";

export const Collapsible = CollapsiblePrimitive.Root;
export type CollapsibleProps = ComponentPropsWithRef<
  typeof CollapsiblePrimitive.Root
>;

export function CollapsibleTrigger({
  children,
  className,
  ref,
  ...props
}: ComponentPropsWithRef<typeof CollapsiblePrimitive.Trigger>) {
  return (
    <CollapsiblePrimitive.Trigger
      className={cn(
        "group inline-flex min-h-11 items-center justify-between gap-3 rounded-lg border border-mar-border bg-mar-card px-4 py-2 text-left font-mar-sans text-sm font-semibold text-mar-text transition-colors duration-[var(--marisma-duration-fast)] hover:bg-mar-surface disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
      <span
        aria-hidden="true"
        className="transition-transform duration-[var(--marisma-duration-fast)] group-data-[state=open]:rotate-180"
      >
        ⌄
      </span>
    </CollapsiblePrimitive.Trigger>
  );
}

export function CollapsibleContent({
  className,
  ref,
  ...props
}: ComponentPropsWithRef<typeof CollapsiblePrimitive.Content>) {
  return (
    <CollapsiblePrimitive.Content
      className={cn(
        "mt-2 overflow-hidden rounded-lg border border-mar-border bg-mar-card p-4 font-mar-sans text-mar-text data-[state=closed]:hidden",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
}
