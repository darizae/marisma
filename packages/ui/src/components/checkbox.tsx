"use client";

import {
  useId,
  useState,
  type ComponentPropsWithRef,
  type ReactNode,
} from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "../lib/cn";

type CheckedState = boolean | "indeterminate";

export type CheckboxProps = Omit<
  ComponentPropsWithRef<typeof CheckboxPrimitive.Root>,
  "checked" | "defaultChecked" | "onCheckedChange"
> & {
  /** Visible label associated with the checkbox. */
  label: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  fieldClassName?: string;
  checked?: CheckedState;
  defaultChecked?: CheckedState;
  onCheckedChange?: (checked: CheckedState) => void;
  /** Keeps the control focusable and submitted while preventing changes. */
  readOnly?: boolean;
};

export function Checkbox({
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
}: CheckboxProps) {
  const generatedId = useId();
  const checkboxId = id ?? `marisma-checkbox-${generatedId}`;
  const descriptionId = `${checkboxId}-description`;
  const errorId = `${checkboxId}-error`;
  const hasDescription = description !== undefined && description !== null;
  const hasError = error !== undefined && error !== null;
  const describedBy = [
    ariaDescribedBy,
    hasDescription ? descriptionId : undefined,
    hasError ? errorId : undefined,
  ]
    .filter(Boolean)
    .join(" ");
  const [internalChecked, setInternalChecked] =
    useState<CheckedState>(defaultChecked);
  const resolvedChecked = checked ?? internalChecked;

  return (
    <div
      className={cn("grid gap-1.5 font-mar-sans text-mar-text", fieldClassName)}
    >
      <div className="flex min-h-11 items-center gap-3">
        <CheckboxPrimitive.Root
          aria-describedby={describedBy || undefined}
          aria-invalid={ariaInvalid ?? (hasError || undefined)}
          aria-readonly={readOnly || undefined}
          checked={resolvedChecked}
          className={cn(
            "inline-flex size-6 shrink-0 items-center justify-center rounded-md border border-mar-border bg-mar-card text-mar-on-primary transition-colors duration-[var(--marisma-duration-fast)] data-[state=checked]:border-mar-primary data-[state=checked]:bg-mar-primary data-[state=indeterminate]:border-mar-primary data-[state=indeterminate]:bg-mar-primary disabled:cursor-not-allowed disabled:opacity-60",
            "aria-invalid:border-mar-danger data-[readonly]:cursor-default",
            className,
          )}
          data-readonly={readOnly || undefined}
          disabled={disabled}
          id={checkboxId}
          onCheckedChange={(nextChecked) => {
            if (readOnly) return;
            if (checked === undefined) setInternalChecked(nextChecked);
            onCheckedChange?.(nextChecked);
          }}
          ref={ref}
          {...props}
        >
          <CheckboxPrimitive.Indicator className="flex items-center justify-center text-sm font-bold">
            <span aria-hidden="true">
              {resolvedChecked === "indeterminate" ? "−" : "✓"}
            </span>
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        <label className="font-medium leading-6" htmlFor={checkboxId}>
          {label}
        </label>
      </div>
      {hasDescription ? (
        <p className="ml-9 text-sm text-mar-muted" id={descriptionId}>
          {description}
        </p>
      ) : null}
      {hasError ? (
        <p
          className="ml-9 text-sm font-medium text-mar-danger"
          id={errorId}
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
