"use client";

import {
  useId,
  useState,
  type ComponentPropsWithRef,
  type ReactNode,
} from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "../lib/cn";

export type SwitchProps = Omit<
  ComponentPropsWithRef<typeof SwitchPrimitive.Root>,
  "checked" | "defaultChecked" | "onCheckedChange"
> & {
  label: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  fieldClassName?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  readOnly?: boolean;
};

export function Switch({
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  checked,
  className,
  defaultChecked = false,
  description,
  disabled,
  error,
  fieldClassName,
  id,
  label,
  onCheckedChange,
  readOnly = false,
  ref,
  ...props
}: SwitchProps) {
  const generatedId = useId();
  const switchId = id ?? `marisma-switch-${generatedId}`;
  const descriptionId = `${switchId}-description`;
  const errorId = `${switchId}-error`;
  const hasDescription = description !== undefined && description !== null;
  const hasError = error !== undefined && error !== null;
  const describedBy = [
    ariaDescribedBy,
    hasDescription ? descriptionId : undefined,
    hasError ? errorId : undefined,
  ]
    .filter(Boolean)
    .join(" ");
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const resolvedChecked = checked ?? internalChecked;

  return (
    <div
      className={cn("grid gap-1.5 font-mar-sans text-mar-text", fieldClassName)}
    >
      <div className="flex min-h-11 items-center gap-3">
        <SwitchPrimitive.Root
          aria-describedby={describedBy || undefined}
          aria-invalid={ariaInvalid ?? (hasError || undefined)}
          aria-readonly={readOnly || undefined}
          checked={resolvedChecked}
          className={cn(
            "relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border border-mar-border bg-mar-border p-0.5 transition-colors duration-[var(--marisma-duration-fast)] data-[state=checked]:border-mar-primary data-[state=checked]:bg-mar-primary disabled:cursor-not-allowed disabled:opacity-60",
            "aria-invalid:border-mar-danger data-[readonly]:cursor-default",
            className,
          )}
          data-readonly={readOnly || undefined}
          disabled={disabled}
          id={switchId}
          onCheckedChange={(nextChecked) => {
            if (readOnly) return;
            if (checked === undefined) setInternalChecked(nextChecked);
            onCheckedChange?.(nextChecked);
          }}
          ref={ref}
          {...props}
        >
          <SwitchPrimitive.Thumb className="block size-5 rounded-full bg-mar-card shadow transition-transform duration-[var(--marisma-duration-fast)] data-[state=checked]:translate-x-5" />
        </SwitchPrimitive.Root>
        <label className="font-medium leading-6" htmlFor={switchId}>
          {label}
        </label>
      </div>
      {hasDescription ? (
        <p className="ml-[3.75rem] text-sm text-mar-muted" id={descriptionId}>
          {description}
        </p>
      ) : null}
      {hasError ? (
        <p
          className="ml-[3.75rem] text-sm font-medium text-mar-danger"
          id={errorId}
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
