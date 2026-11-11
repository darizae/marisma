import type { ComponentPropsWithRef } from "react";
import { cn } from "../lib/cn";

export type SeparatorProps = ComponentPropsWithRef<"div"> & {
  decorative?: boolean;
  orientation?: "horizontal" | "vertical";
};

export function Separator({
  className,
  decorative = true,
  orientation = "horizontal",
  ...props
}: SeparatorProps) {
  return (
    <div
      aria-hidden={decorative || undefined}
      aria-orientation={decorative ? undefined : orientation}
      className={cn(
        "shrink-0 bg-mar-border",
        orientation === "horizontal" ? "h-px w-full" : "h-full min-h-6 w-px",
        className,
      )}
      role={decorative ? "presentation" : "separator"}
      {...props}
    />
  );
}
