"use client";

import type { ComponentPropsWithRef } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "../lib/cn";

export const Tabs = TabsPrimitive.Root;
export type TabsProps = ComponentPropsWithRef<typeof TabsPrimitive.Root>;

export function TabsList({
  className,
  ref,
  ...props
}: ComponentPropsWithRef<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn(
        "inline-flex min-h-11 max-w-full gap-1 overflow-x-auto rounded-xl border border-mar-border bg-mar-card p-1 font-mar-sans text-mar-text",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
}

export function TabsTrigger({
  className,
  ref,
  ...props
}: ComponentPropsWithRef<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "inline-flex min-h-9 shrink-0 items-center justify-center rounded-lg px-3 py-1.5 text-sm font-semibold text-mar-muted transition-colors duration-[var(--marisma-duration-fast)] hover:text-mar-text data-[state=active]:bg-mar-primary data-[state=active]:text-mar-on-primary disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
}

export function TabsContent({
  className,
  ref,
  ...props
}: ComponentPropsWithRef<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      className={cn(
        "mt-3 rounded-xl border border-mar-border bg-mar-card p-4 font-mar-sans text-mar-text",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
}
