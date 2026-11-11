"use client";

import { useId, type ComponentPropsWithRef, type ReactNode } from "react";
import { cn } from "../lib/cn";

export type TextareaProps = ComponentPropsWithRef<"textarea"> & {
  label: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  fieldClassName?: string;
};

export function Textarea({
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
}: TextareaProps) {
  const generatedId = useId();
  const textareaId = id ?? `marisma-textarea-${generatedId}`;
  const descriptionId = `${textareaId}-description`;
  const errorId = `${textareaId}-error`;
  const hasDescription = description !== undefined && description !== null;
  const hasError = error !== undefined && error !== null;
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
      <label className="text-sm font-semibold" htmlFor={textareaId}>
        {label}
      </label>
      <textarea
        aria-describedby={describedBy || undefined}
        aria-invalid={ariaInvalid ?? (hasError || undefined)}
        className={cn(
          "min-h-28 w-full resize-y rounded-lg border border-mar-border bg-mar-card px-3 py-2 text-base text-mar-text placeholder:text-mar-muted read-only:cursor-default read-only:bg-mar-surface disabled:cursor-not-allowed disabled:opacity-60",
          "aria-invalid:border-mar-danger",
          className,
        )}
        id={textareaId}
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
