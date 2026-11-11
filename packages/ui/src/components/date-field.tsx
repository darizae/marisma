"use client";

import {
  useId,
  useRef,
  useState,
  type ComponentPropsWithRef,
  type ReactNode,
  type Ref,
} from "react";
import {
  Calendar,
  formatCalendarDate,
  type CalendarProps,
  type WeekStart,
} from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { cn } from "../lib/cn";

export type DateFieldProps = Omit<
  ComponentPropsWithRef<"div">,
  "defaultValue" | "onChange" | "value"
> & {
  label: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  locale?: string;
  timeZone?: string;
  weekStartsOn?: WeekStart;
  min?: string;
  max?: string;
  disabledDate?: CalendarProps["disabledDate"];
  formatOptions?: Intl.DateTimeFormatOptions;
  calendarLabel?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  name?: string;
  inputClassName?: string;
  ref?: Ref<HTMLInputElement>;
};

export function DateField({
  calendarLabel = "Choose a date",
  className,
  defaultValue = "",
  description,
  disabled = false,
  disabledDate,
  error,
  formatOptions = { dateStyle: "medium" },
  id,
  inputClassName,
  label,
  locale = "en-US",
  max,
  min,
  name,
  onValueChange,
  placeholder = "No date selected",
  readOnly = false,
  ref,
  required = false,
  timeZone = "UTC",
  value,
  weekStartsOn = 0,
  ...props
}: DateFieldProps) {
  const generatedId = useId();
  const fieldId = id ?? `marisma-date-field-${generatedId}`;
  const descriptionId = `${fieldId}-description`;
  const errorId = `${fieldId}-error`;
  const hasDescription = description !== undefined && description !== null;
  const hasError = error !== undefined && error !== null;
  const describedBy = [
    hasDescription ? descriptionId : undefined,
    hasError ? errorId : undefined,
  ]
    .filter(Boolean)
    .join(" ");
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const resolvedValue = value ?? internalValue;
  const calendarRef = useRef<HTMLDivElement>(null);
  const displayValue = resolvedValue
    ? formatCalendarDate(resolvedValue, locale, formatOptions)
    : "";
  const triggerLabel = resolvedValue
    ? `Change date, ${formatCalendarDate(resolvedValue, locale, { dateStyle: "full" })}`
    : calendarLabel;

  return (
    <div
      className={cn("grid gap-2 font-mar-sans text-mar-text", className)}
      {...props}
    >
      <label className="text-sm font-semibold" htmlFor={fieldId}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      <Popover onOpenChange={setOpen} open={open && !disabled && !readOnly}>
        <div className="flex items-stretch gap-2">
          <input
            aria-describedby={describedBy || undefined}
            aria-invalid={hasError || undefined}
            aria-required={required || undefined}
            className={cn(
              "min-h-11 min-w-0 flex-1 rounded-lg border border-mar-border bg-mar-card px-3 py-2 text-base text-mar-text placeholder:text-mar-muted read-only:cursor-default disabled:cursor-not-allowed disabled:opacity-60",
              "aria-invalid:border-mar-danger",
              inputClassName,
            )}
            disabled={disabled}
            id={fieldId}
            placeholder={placeholder}
            readOnly
            ref={ref}
            value={displayValue}
          />
          {readOnly ? null : (
            <PopoverTrigger
              aria-label={triggerLabel}
              disabled={disabled}
              size="default"
              type="button"
            >
              <span aria-hidden="true">▣</span>
              <span className="hidden sm:inline">Calendar</span>
            </PopoverTrigger>
          )}
        </div>
        {readOnly ? null : (
          <PopoverContent
            aria-label={calendarLabel}
            className="w-auto max-w-[calc(100vw-1.5rem)] p-0"
            onOpenAutoFocus={(event) => {
              event.preventDefault();
              queueMicrotask(() => {
                calendarRef.current
                  ?.querySelector<HTMLButtonElement>('[tabindex="0"]')
                  ?.focus();
              });
            }}
          >
            <Calendar
              disabled={disabled}
              disabledDate={disabledDate}
              label={calendarLabel}
              locale={locale}
              max={max}
              min={min}
              onValueChange={(nextValue) => {
                if (value === undefined) setInternalValue(nextValue);
                onValueChange?.(nextValue);
                setOpen(false);
              }}
              ref={calendarRef}
              timeZone={timeZone}
              value={resolvedValue || undefined}
              weekStartsOn={weekStartsOn}
            />
          </PopoverContent>
        )}
      </Popover>
      {name ? (
        <input
          disabled={disabled}
          name={name}
          type="hidden"
          value={resolvedValue}
        />
      ) : null}
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
