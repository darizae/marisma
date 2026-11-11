import type { ComponentPropsWithRef } from "react";
import { cn } from "../lib/cn";

export type LabelProps = ComponentPropsWithRef<"label">;

export function Label({ className, ...props }: LabelProps) {
  return (
    <label
      className={cn(
        "font-mar-sans text-sm font-semibold text-mar-text has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-60",
        className,
      )}
      {...props}
    />
  );
}
