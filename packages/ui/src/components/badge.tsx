import type { ComponentPropsWithRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export const badgeVariants = cva(
  "inline-flex min-h-6 items-center gap-1 rounded-full border px-2.5 py-0.5 font-mar-sans text-xs font-semibold",
  {
    variants: {
      variant: {
        neutral: "border-mar-border bg-mar-card text-mar-text",
        info: "border-mar-info bg-mar-info-surface text-mar-info",
        success: "border-mar-success bg-mar-success-surface text-mar-success",
        warning: "border-mar-warning bg-mar-warning-surface text-mar-warning",
        danger: "border-mar-danger bg-mar-danger-surface text-mar-danger",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
);

export type BadgeProps = ComponentPropsWithRef<"span"> &
  VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
