import type { ComponentPropsWithRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export const scrollAreaVariants = cva(
  "relative max-w-full overscroll-contain rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mar-focus focus-visible:ring-offset-[var(--marisma-focus-offset)]",
  {
    variants: {
      orientation: {
        both: "overflow-auto",
        horizontal: "overflow-x-auto overflow-y-hidden",
        vertical: "overflow-x-hidden overflow-y-auto",
      },
      scrollbar: {
        auto: "",
        stable: "[scrollbar-gutter:stable]",
      },
    },
    defaultVariants: { orientation: "vertical", scrollbar: "stable" },
  },
);

type ScrollAreaAccessibleName =
  | { "aria-label": string; "aria-labelledby"?: string }
  | { "aria-label"?: string; "aria-labelledby": string };

export type ScrollAreaProps = Omit<
  ComponentPropsWithRef<"div">,
  "aria-label" | "aria-labelledby"
> &
  ScrollAreaAccessibleName &
  VariantProps<typeof scrollAreaVariants>;

export function ScrollArea({
  className,
  orientation,
  role = "region",
  scrollbar,
  tabIndex = 0,
  ...props
}: ScrollAreaProps) {
  return (
    <div
      className={cn(scrollAreaVariants({ orientation, scrollbar }), className)}
      role={role}
      tabIndex={tabIndex}
      {...props}
    />
  );
}
