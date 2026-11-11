"use client";

import {
  createContext,
  useContext,
  useState,
  type ComponentPropsWithRef,
} from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cn } from "../lib/cn";

type RadixToggleGroupProps = ComponentPropsWithRef<
  typeof ToggleGroupPrimitive.Root
>;

export type ToggleGroupProps = RadixToggleGroupProps & {
  /** Prevents changes without removing the group from keyboard navigation. */
  readOnly?: boolean;
};

const ToggleGroupReadOnlyContext = createContext(false);

function SingleToggleGroup({
  className,
  defaultValue = "",
  onValueChange,
  readOnly = false,
  type: _type,
  value,
  ...props
}: Extract<ToggleGroupProps, { type: "single" }>) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const resolvedValue = value ?? internalValue;

  return (
    <ToggleGroupReadOnlyContext value={readOnly}>
      <ToggleGroupPrimitive.Root
        aria-readonly={readOnly || undefined}
        className={cn(
          "inline-flex flex-wrap gap-1 rounded-xl border border-mar-border bg-mar-card p-1 font-mar-sans text-mar-text",
          className,
        )}
        onValueChange={(nextValue) => {
          if (readOnly) return;
          if (value === undefined) setInternalValue(nextValue);
          onValueChange?.(nextValue);
        }}
        type="single"
        value={resolvedValue}
        {...props}
      />
    </ToggleGroupReadOnlyContext>
  );
}

function MultipleToggleGroup({
  className,
  defaultValue = [],
  onValueChange,
  readOnly = false,
  type: _type,
  value,
  ...props
}: Extract<ToggleGroupProps, { type: "multiple" }>) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const resolvedValue = value ?? internalValue;

  return (
    <ToggleGroupReadOnlyContext value={readOnly}>
      <ToggleGroupPrimitive.Root
        aria-readonly={readOnly || undefined}
        className={cn(
          "inline-flex flex-wrap gap-1 rounded-xl border border-mar-border bg-mar-card p-1 font-mar-sans text-mar-text",
          className,
        )}
        onValueChange={(nextValue) => {
          if (readOnly) return;
          if (value === undefined) setInternalValue(nextValue);
          onValueChange?.(nextValue);
        }}
        type="multiple"
        value={resolvedValue}
        {...props}
      />
    </ToggleGroupReadOnlyContext>
  );
}

export function ToggleGroup(props: ToggleGroupProps) {
  return props.type === "single" ? (
    <SingleToggleGroup {...props} />
  ) : (
    <MultipleToggleGroup {...props} />
  );
}

export type ToggleGroupItemProps = ComponentPropsWithRef<
  typeof ToggleGroupPrimitive.Item
>;

export function ToggleGroupItem({
  className,
  onClick,
  onKeyDown,
  ref,
  ...props
}: ToggleGroupItemProps) {
  const readOnly = useContext(ToggleGroupReadOnlyContext);

  return (
    <ToggleGroupPrimitive.Item
      className={cn(
        "inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors duration-[var(--marisma-duration-fast)] hover:bg-mar-surface data-[state=on]:bg-mar-primary data-[state=on]:text-mar-on-primary disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      data-readonly={readOnly || undefined}
      onClick={(event) => {
        onClick?.(event);
        if (readOnly) event.preventDefault();
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (readOnly && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
        }
      }}
      ref={ref}
      {...props}
    />
  );
}
