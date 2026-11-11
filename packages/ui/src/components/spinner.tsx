import type { ComponentPropsWithRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export const spinnerVariants = cva(
  "inline-block animate-spin rounded-full border-2 border-current border-t-transparent text-mar-primary motion-reduce:animate-none",
  {
    variants: {
      size: { small: "size-4", default: "size-6", large: "size-8" },
    },
    defaultVariants: { size: "default" },
  },
);

export type SpinnerProps = Omit<ComponentPropsWithRef<"span">, "children"> &
  VariantProps<typeof spinnerVariants> & {
    label?: string;
  };

export function Spinner({ className, label, size, ...props }: SpinnerProps) {
  return (
    <span
      aria-hidden={label ? undefined : true}
      aria-label={label}
      className={cn(spinnerVariants({ size }), className)}
      role={label ? "status" : undefined}
      {...props}
    />
  );
}
