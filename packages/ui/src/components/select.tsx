"use client";

import {
  useId,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
  type Ref,
} from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "../lib/cn";
import { usePortalTheme } from "../lib/portal-theme";

export type SelectOption = {
  value: string;
  label: ReactNode;
  disabled?: boolean;
  /** Options with the same non-empty group are announced together. */
  group?: string;
};

type SelectRootProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Root>;

export type SelectProps = Omit<
  SelectRootProps,
  | "children"
  | "defaultOpen"
  | "defaultValue"
  | "onOpenChange"
  | "onValueChange"
  | "open"
  | "value"
> & {
  label: ReactNode;
  options: readonly SelectOption[];
  placeholder?: string;
  description?: ReactNode;
  error?: ReactNode;
  emptyMessage?: ReactNode;
  fieldClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  /** Select is single-value and non-searchable; read-only keeps its value focusable. */
  readOnly?: boolean;
  ref?: Ref<HTMLButtonElement>;
};

type OptionGroup = {
  name?: string;
  options: SelectOption[];
};

function groupOptions(options: readonly SelectOption[]): OptionGroup[] {
  const groups: OptionGroup[] = [];
  const byName = new Map<string, OptionGroup>();

  for (const option of options) {
    const key = option.group ?? "";
    let group = byName.get(key);
    if (!group) {
      group = { name: option.group, options: [] };
      byName.set(key, group);
      groups.push(group);
    }
    group.options.push(option);
  }

  return groups;
}

function SelectPortal({ children }: { children: ReactNode }) {
  const { anchorRef, theme } = usePortalTheme();

  return (
    <>
      <span aria-hidden="true" className="hidden" ref={anchorRef} />
      <SelectPrimitive.Portal>
        <div
          className="contents"
          data-marisma-accent={theme.accent}
          data-marisma-mode={theme.mode}
          data-marisma-portal="select"
        >
          {children}
        </div>
      </SelectPrimitive.Portal>
    </>
  );
}

export function Select({
  defaultOpen = false,
  defaultValue = "",
  description,
  disabled,
  emptyMessage = "No options available.",
  error,
  fieldClassName,
  label,
  onOpenChange,
  onValueChange,
  open,
  options,
  placeholder = "Select an option",
  readOnly = false,
  ref,
  required,
  triggerClassName,
  contentClassName,
  value,
  ...props
}: SelectProps) {
  const generatedId = useId();
  const triggerId = `marisma-select-${generatedId}`;
  const descriptionId = `${triggerId}-description`;
  const errorId = `${triggerId}-error`;
  const hasDescription = description !== undefined && description !== null;
  const hasError = error !== undefined && error !== null;
  const describedBy = [
    hasDescription ? descriptionId : undefined,
    hasError ? errorId : undefined,
  ]
    .filter(Boolean)
    .join(" ");
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const resolvedValue = value ?? internalValue;
  const resolvedOpen = readOnly ? false : (open ?? internalOpen);
  const groups = useMemo(() => groupOptions(options), [options]);

  const preventReadOnlyPointer = (event: PointerEvent<HTMLButtonElement>) => {
    if (readOnly) event.preventDefault();
  };
  const preventReadOnlyKeyboard = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (
      readOnly &&
      ["Enter", " ", "ArrowDown", "ArrowUp"].includes(event.key)
    ) {
      event.preventDefault();
    }
  };

  return (
    <div
      className={cn("grid gap-2 font-mar-sans text-mar-text", fieldClassName)}
    >
      <label className="text-sm font-semibold" htmlFor={triggerId}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      <SelectPrimitive.Root
        disabled={disabled}
        onOpenChange={(nextOpen) => {
          if (readOnly) return;
          if (open === undefined) setInternalOpen(nextOpen);
          onOpenChange?.(nextOpen);
        }}
        onValueChange={(nextValue) => {
          if (readOnly) return;
          if (value === undefined) setInternalValue(nextValue);
          onValueChange?.(nextValue);
        }}
        open={resolvedOpen}
        required={required}
        value={resolvedValue || undefined}
        {...props}
      >
        <SelectPrimitive.Trigger
          aria-describedby={describedBy || undefined}
          aria-invalid={hasError || undefined}
          aria-readonly={readOnly || undefined}
          aria-required={required || undefined}
          className={cn(
            "inline-flex min-h-11 w-full items-center justify-between gap-3 rounded-lg border border-mar-border bg-mar-card px-3 py-2 text-left text-base text-mar-text data-[placeholder]:text-mar-muted disabled:cursor-not-allowed disabled:opacity-60",
            "aria-invalid:border-mar-danger data-[readonly]:cursor-default",
            triggerClassName,
          )}
          data-readonly={readOnly || undefined}
          id={triggerId}
          onKeyDown={preventReadOnlyKeyboard}
          onPointerDown={preventReadOnlyPointer}
          ref={ref}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon aria-hidden="true" className="text-mar-muted">
            ⌄
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPortal>
          <SelectPrimitive.Content
            className={cn(
              "z-50 max-h-[var(--radix-select-content-available-height)] min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-xl border border-mar-border bg-mar-card font-mar-sans text-mar-text shadow-xl",
              "transition duration-[var(--marisma-duration-fast)] data-[state=closed]:scale-95 data-[state=closed]:opacity-0 data-[state=open]:scale-100 data-[state=open]:opacity-100",
              contentClassName,
            )}
            collisionPadding={8}
            position="popper"
            sideOffset={6}
          >
            <SelectPrimitive.ScrollUpButton className="flex h-8 items-center justify-center text-mar-muted">
              <span aria-hidden="true">⌃</span>
            </SelectPrimitive.ScrollUpButton>
            <SelectPrimitive.Viewport className="p-1.5">
              {groups.length === 0 ? (
                <div className="px-3 py-2 text-sm text-mar-muted">
                  {emptyMessage}
                </div>
              ) : (
                groups.map((group) => (
                  <SelectPrimitive.Group key={group.name ?? "ungrouped"}>
                    {group.name ? (
                      <SelectPrimitive.Label className="px-8 py-2 text-xs font-semibold uppercase tracking-wide text-mar-muted">
                        {group.name}
                      </SelectPrimitive.Label>
                    ) : null}
                    {group.options.map((option) => (
                      <SelectPrimitive.Item
                        className="relative flex min-h-10 cursor-default select-none items-center rounded-lg py-2 pl-8 pr-3 text-sm outline-none transition-colors duration-[var(--marisma-duration-fast)] focus:bg-mar-surface data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                        disabled={option.disabled}
                        key={option.value}
                        value={option.value}
                      >
                        <span className="absolute left-2 inline-flex size-4 items-center justify-center">
                          <SelectPrimitive.ItemIndicator>
                            <span aria-hidden="true">✓</span>
                          </SelectPrimitive.ItemIndicator>
                        </span>
                        <SelectPrimitive.ItemText>
                          {option.label}
                        </SelectPrimitive.ItemText>
                      </SelectPrimitive.Item>
                    ))}
                  </SelectPrimitive.Group>
                ))
              )}
            </SelectPrimitive.Viewport>
            <SelectPrimitive.ScrollDownButton className="flex h-8 items-center justify-center text-mar-muted">
              <span aria-hidden="true">⌄</span>
            </SelectPrimitive.ScrollDownButton>
          </SelectPrimitive.Content>
        </SelectPortal>
      </SelectPrimitive.Root>
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
