"use client";

import { useId, type ComponentPropsWithRef, type ReactNode } from "react";
import { cn } from "../lib/cn";

export type InputProps = ComponentPropsWithRef<"input"> & {
  /** Visible label associated with the native input. */
  label: ReactNode;
  /** Supporting text announced with the input. */
  description?: ReactNode;
  /** Validation message announced with the input. */
  error?: ReactNode;
  /** Classes for the complete field rather than the native input. */
  fieldClassName?: string;
};

export function Input({
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  className,
  description,
  error,
  fieldClassName,
  id,
  label,
  ref,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? `marisma-input-${generatedId}`;
  const hasDescription = description !== undefined && description !== null;
  const hasError = error !== undefined && error !== null;
  const descriptionId = `${inputId}-description`;
  const errorId = `${inputId}-error`;
  const describedBy = [
    ariaDescribedBy,
    hasDescription ? descriptionId : undefined,
    hasError ? errorId : undefined,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={cn("grid gap-2 font-mar-sans text-mar-text", fieldClassName)}
    >
      <label className="text-sm font-semibold" htmlFor={inputId}>
        {label}
      </label>
      <input
        aria-describedby={describedBy || undefined}
        aria-invalid={ariaInvalid ?? (hasError || undefined)}
        className={cn(
          "min-h-11 w-full rounded-lg border border-mar-border bg-mar-card px-3 py-2 text-base text-mar-text placeholder:text-mar-muted disabled:cursor-not-allowed disabled:opacity-60",
          "aria-invalid:border-mar-danger",
          className,
        )}
        id={inputId}
        ref={ref}
        {...props}
      />
      {hasDescription ? (
        <p className="text-sm text-mar-muted" id={descriptionId}>
          {description}
        </p>
      ) : null}
      {hasError ? (
        <p
          className="text-sm font-medium text-mar-danger"
          id={errorId}
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
