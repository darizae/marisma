import type { ComponentPropsWithRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-mar-control px-4 py-2 text-sm font-semibold marisma-motion-control disabled:cursor-not-allowed disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-mar-primary text-mar-on-primary hover:bg-mar-primary-hover",
        secondary:
          "border border-mar-input-border bg-mar-card text-mar-text hover:bg-mar-hover",
        ghost: "text-mar-text hover:bg-mar-hover",
      },
      size: {
        small: "min-h-10 px-3 py-1.5",
        default: "min-h-11 px-4 py-2",
        large: "min-h-12 px-5 py-2.5 text-base",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      fullWidth: false,
    },
  },
);

export type ButtonProps = ComponentPropsWithRef<"button"> &
  VariantProps<typeof buttonVariants> & {
    /** Disables activation while preserving the button's accessible name. */
    loading?: boolean;
  };

export function Button({
  "aria-busy": ariaBusy,
  children,
  className,
  disabled,
  fullWidth,
  loading = false,
  ref,
  size,
  variant,
  ...props
}: ButtonProps) {
  return (
    <button
      aria-busy={loading ? true : ariaBusy}
      className={cn(buttonVariants({ fullWidth, size, variant }), className)}
      data-loading={loading || undefined}
      disabled={disabled || loading}
      ref={ref}
      {...props}
    >
      {loading ? (
        <span
          aria-hidden="true"
          className="size-4 shrink-0 marisma-motion-busy rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none"
        />
      ) : null}
      {children}
    </button>
  );
}
