"use client";

import {
  useId,
  useState,
  type ComponentPropsWithRef,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "../lib/cn";

export type RadioGroupProps = Omit<
  ComponentPropsWithRef<typeof RadioGroupPrimitive.Root>,
  "defaultValue" | "onValueChange" | "value"
> & {
  label: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  fieldClassName?: string;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  readOnly?: boolean;
};

export function RadioGroup({
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  "aria-labelledby": ariaLabelledBy,
  children,
  className,
  defaultValue = "",
  description,
  error,
  fieldClassName,
  id,
  label,
  onKeyDown,
  onKeyDownCapture,
  onValueChange,
  readOnly = false,
  ref,
  value,
  ...props
}: RadioGroupProps) {
  const generatedId = useId();
  const groupId = id ?? `marisma-radio-group-${generatedId}`;
  const labelId = `${groupId}-label`;
  const descriptionId = `${groupId}-description`;
  const errorId = `${groupId}-error`;
  const hasDescription = description !== undefined && description !== null;
  const hasError = error !== undefined && error !== null;
  const describedBy = [
    ariaDescribedBy,
    hasDescription ? descriptionId : undefined,
    hasError ? errorId : undefined,
  ]
    .filter(Boolean)
    .join(" ");
  const [internalValue, setInternalValue] = useState(defaultValue);
  const resolvedValue = value ?? internalValue;

  const commitValue = (nextValue: string) => {
    if (readOnly || nextValue === resolvedValue) return;
    if (value === undefined) setInternalValue(nextValue);
    onValueChange?.(nextValue);
  };

  const handleKeyDownCapture = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDownCapture?.(event);
    if (event.defaultPrevented || readOnly) return;
    const direction =
      event.key === "ArrowLeft" || event.key === "ArrowUp"
        ? -1
        : event.key === "ArrowRight" || event.key === "ArrowDown"
          ? 1
          : 0;
    if (!direction) return;
    const items = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(
        '[role="radio"]:not([data-disabled])',
      ),
    );
    const currentIndex = items.indexOf(event.target as HTMLElement);
    if (currentIndex < 0 || items.length === 0) return;
    const nextIndex = (currentIndex + direction + items.length) % items.length;
    const nextValue = items[nextIndex]?.getAttribute("value");
    if (nextValue) commitValue(nextValue);
  };

  return (
    <div
      className={cn("grid gap-2 font-mar-sans text-mar-text", fieldClassName)}
    >
      <span className="font-semibold" id={labelId}>
        {label}
      </span>
      <RadioGroupPrimitive.Root
        aria-describedby={describedBy || undefined}
        aria-invalid={ariaInvalid ?? (hasError || undefined)}
        aria-labelledby={[ariaLabelledBy, labelId].filter(Boolean).join(" ")}
        aria-readonly={readOnly || undefined}
        className={cn(
          "grid gap-2 data-[orientation=horizontal]:grid-flow-col data-[orientation=horizontal]:justify-start",
          className,
        )}
        id={groupId}
        onKeyDown={onKeyDown}
        onKeyDownCapture={handleKeyDownCapture}
        onValueChange={(nextValue) => {
          commitValue(nextValue);
        }}
        ref={ref}
        value={resolvedValue || null}
        {...props}
      >
        {children}
      </RadioGroupPrimitive.Root>
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

export type RadioGroupItemProps = ComponentPropsWithRef<
  typeof RadioGroupPrimitive.Item
> & {
  label: ReactNode;
  description?: ReactNode;
  itemClassName?: string;
};

export function RadioGroupItem({
  className,
  description,
  disabled,
  id,
  itemClassName,
  label,
  ref,
  ...props
}: RadioGroupItemProps) {
  const generatedId = useId();
  const itemId = id ?? `marisma-radio-${generatedId}`;
  const descriptionId = `${itemId}-description`;

  return (
    <div className={cn("flex min-h-11 items-start gap-3", itemClassName)}>
      <RadioGroupPrimitive.Item
        aria-describedby={description ? descriptionId : undefined}
        className={cn(
          "mt-2 inline-flex size-6 shrink-0 items-center justify-center rounded-full border border-mar-border bg-mar-card data-[state=checked]:border-mar-primary disabled:cursor-not-allowed disabled:opacity-60",
          className,
        )}
        disabled={disabled}
        id={itemId}
        ref={ref}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="size-3 rounded-full bg-mar-primary" />
      </RadioGroupPrimitive.Item>
      <span className="grid gap-0.5">
        <label className="font-medium leading-6" htmlFor={itemId}>
          {label}
        </label>
        {description ? (
          <span className="text-sm text-mar-muted" id={descriptionId}>
            {description}
          </span>
        ) : null}
      </span>
    </div>
  );
}
