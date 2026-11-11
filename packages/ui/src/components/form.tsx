"use client";

import { useId, type ComponentPropsWithRef, type ReactNode } from "react";
import { Alert, type AlertProps } from "./alert";
import { Separator, type SeparatorProps } from "./separator";
import { cn } from "../lib/cn";

export type FormError = {
  /** The exact id of the invalid control. */
  fieldId: string;
  message: ReactNode;
};

export type FormProps = ComponentPropsWithRef<"form"> & {
  /** Caller-provided validation errors rendered as an accessible linked summary. */
  errors?: readonly FormError[];
  errorSummaryTitle?: ReactNode;
};

export function Form({
  children,
  className,
  errors = [],
  errorSummaryTitle = "Please fix the following",
  ref,
  ...props
}: FormProps) {
  const generatedId = useId();
  const summaryTitleId = `marisma-form-summary-${generatedId}`;

  return (
    <form
      className={cn("grid gap-6 font-mar-sans text-mar-text", className)}
      ref={ref}
      {...props}
    >
      {errors.length > 0 ? (
        <div
          aria-labelledby={summaryTitleId}
          className="rounded-xl border border-mar-danger bg-mar-danger-surface p-4 text-mar-danger"
          role="alert"
          tabIndex={-1}
        >
          <p className="font-semibold" id={summaryTitleId}>
            {errorSummaryTitle}
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
            {errors.map((error, index) => (
              <li key={`${error.fieldId}-${index}`}>
                <a
                  className="underline underline-offset-2 hover:no-underline"
                  href={`#${error.fieldId}`}
                >
                  {error.message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {children}
    </form>
  );
}

export type FieldGroupProps = ComponentPropsWithRef<"fieldset"> & {
  legend: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
};

export function FieldGroup({
  "aria-describedby": ariaDescribedBy,
  children,
  className,
  description,
  error,
  legend,
  ref,
  ...props
}: FieldGroupProps) {
  const generatedId = useId();
  const descriptionId = `marisma-field-group-${generatedId}-description`;
  const errorId = `marisma-field-group-${generatedId}-error`;
  const hasDescription = description !== undefined && description !== null;
  const hasError = error !== undefined && error !== null;

  return (
    <fieldset
      aria-describedby={
        [
          ariaDescribedBy,
          hasDescription ? descriptionId : undefined,
          hasError ? errorId : undefined,
        ]
          .filter(Boolean)
          .join(" ") || undefined
      }
      className={cn(
        "grid min-w-0 gap-4 rounded-xl border border-mar-border p-4 disabled:opacity-60",
        className,
      )}
      ref={ref}
      {...props}
    >
      <legend className="px-1 text-base font-semibold">{legend}</legend>
      {hasDescription ? (
        <p className="text-sm text-mar-muted" id={descriptionId}>
          {description}
        </p>
      ) : null}
      {children}
      {hasError ? (
        <p
          className="text-sm font-medium text-mar-danger"
          id={errorId}
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

export type FieldDividerProps = SeparatorProps;

export function FieldDivider({
  className,
  decorative = true,
  orientation = "vertical",
  ...props
}: FieldDividerProps) {
  return (
    <Separator
      className={cn("self-stretch", className)}
      decorative={decorative}
      orientation={orientation}
      {...props}
    />
  );
}

export type FieldCalloutProps = AlertProps;

export function FieldCallout({
  variant = "info",
  ...props
}: FieldCalloutProps) {
  return <Alert variant={variant} {...props} />;
}
