"use client";

import {
  createContext,
  useContext,
  useState,
  type ComponentPropsWithoutRef,
  type ComponentPropsWithRef,
} from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cva, type VariantProps } from "class-variance-authority";
import { buttonVariants } from "./button";
import { cn } from "../lib/cn";
import { usePortalTheme } from "../lib/portal-theme";

export const DropdownMenu = DropdownMenuPrimitive.Root;
export type DropdownMenuProps = ComponentPropsWithRef<
  typeof DropdownMenuPrimitive.Root
>;
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

type DropdownMenuSubContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const DropdownMenuSubContext =
  createContext<DropdownMenuSubContextValue | null>(null);

export type DropdownMenuSubProps = Omit<
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Sub>,
  "defaultOpen" | "onOpenChange" | "open"
> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function DropdownMenuSub({
  defaultOpen = false,
  onOpenChange,
  open,
  ...props
}: DropdownMenuSubProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const resolvedOpen = open ?? internalOpen;
  const setOpen = (nextOpen: boolean) => {
    if (open === undefined) setInternalOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  return (
    <DropdownMenuSubContext value={{ open: resolvedOpen, setOpen }}>
      <DropdownMenuPrimitive.Sub
        onOpenChange={setOpen}
        open={resolvedOpen}
        {...props}
      />
    </DropdownMenuSubContext>
  );
}

export type DropdownMenuTriggerProps = ComponentPropsWithRef<
  typeof DropdownMenuPrimitive.Trigger
> &
  VariantProps<typeof buttonVariants>;

export function DropdownMenuTrigger({
  className,
  fullWidth,
  ref,
  size,
  variant = "secondary",
  ...props
}: DropdownMenuTriggerProps) {
  return (
    <DropdownMenuPrimitive.Trigger
      className={cn(buttonVariants({ fullWidth, size, variant }), className)}
      ref={ref}
      {...props}
    />
  );
}

export type DropdownMenuPortalProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Portal
>;

export function DropdownMenuPortal({
  children,
  ...props
}: DropdownMenuPortalProps) {
  const { anchorRef, theme } = usePortalTheme();

  return (
    <>
      <span aria-hidden="true" className="hidden" ref={anchorRef} />
      <DropdownMenuPrimitive.Portal {...props}>
        <div
          className="contents"
          data-marisma-accent={theme.accent}
          data-marisma-mode={theme.mode}
          data-marisma-portal="dropdown-menu"
        >
          {children}
        </div>
      </DropdownMenuPrimitive.Portal>
    </>
  );
}

const menuContentClasses =
  "z-50 min-w-52 max-h-[var(--radix-dropdown-menu-content-available-height)] overflow-y-auto rounded-xl border border-mar-border bg-mar-card p-1.5 font-mar-sans text-mar-text shadow-xl transition duration-[var(--marisma-duration-fast)] data-[state=closed]:scale-95 data-[state=closed]:opacity-0 data-[state=open]:scale-100 data-[state=open]:opacity-100";

export type DropdownMenuContentProps = ComponentPropsWithRef<
  typeof DropdownMenuPrimitive.Content
> & {
  portalProps?: Omit<DropdownMenuPortalProps, "children">;
};

export function DropdownMenuContent({
  align = "start",
  className,
  collisionPadding = 8,
  portalProps,
  ref,
  sideOffset = 6,
  ...props
}: DropdownMenuContentProps) {
  return (
    <DropdownMenuPortal {...portalProps}>
      <DropdownMenuPrimitive.Content
        align={align}
        className={cn(menuContentClasses, className)}
        collisionPadding={collisionPadding}
        ref={ref}
        sideOffset={sideOffset}
        {...props}
      />
    </DropdownMenuPortal>
  );
}

export const dropdownMenuItemVariants = cva(
  "relative flex min-h-10 cursor-default select-none items-center rounded-lg px-3 py-2 text-sm outline-none transition-colors duration-[var(--marisma-duration-fast)] focus:bg-mar-surface data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  {
    variants: {
      variant: {
        default: "text-mar-text",
        danger: "text-mar-danger focus:bg-mar-danger-surface",
      },
      inset: { true: "pl-9", false: "" },
    },
    defaultVariants: { inset: false, variant: "default" },
  },
);

export type DropdownMenuItemProps = ComponentPropsWithRef<
  typeof DropdownMenuPrimitive.Item
> &
  VariantProps<typeof dropdownMenuItemVariants>;

export function DropdownMenuItem({
  className,
  inset,
  ref,
  variant,
  ...props
}: DropdownMenuItemProps) {
  return (
    <DropdownMenuPrimitive.Item
      className={cn(dropdownMenuItemVariants({ inset, variant }), className)}
      ref={ref}
      {...props}
    />
  );
}

const checkItemClasses =
  "relative flex min-h-10 cursor-default select-none items-center rounded-lg py-2 pl-9 pr-3 text-sm text-mar-text outline-none transition-colors duration-[var(--marisma-duration-fast)] focus:bg-mar-surface data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

export function DropdownMenuCheckboxItem({
  children,
  className,
  ref,
  ...props
}: ComponentPropsWithRef<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      className={cn(checkItemClasses, className)}
      ref={ref}
      {...props}
    >
      <span className="absolute left-3 inline-flex size-4 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <span aria-hidden="true">✓</span>
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

export function DropdownMenuRadioItem({
  children,
  className,
  ref,
  ...props
}: ComponentPropsWithRef<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      className={cn(checkItemClasses, className)}
      ref={ref}
      {...props}
    >
      <span className="absolute left-3 inline-flex size-4 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <span aria-hidden="true">●</span>
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}

export function DropdownMenuLabel({
  className,
  inset,
  ref,
  ...props
}: ComponentPropsWithRef<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.Label
      className={cn(
        "px-3 py-2 text-xs font-semibold uppercase tracking-wide text-mar-muted",
        inset && "pl-9",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
}

export function DropdownMenuSeparator({
  className,
  ref,
  ...props
}: ComponentPropsWithRef<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      className={cn("my-1 h-px bg-mar-border", className)}
      ref={ref}
      {...props}
    />
  );
}

export function DropdownMenuSubTrigger({
  children,
  className,
  inset,
  onKeyDownCapture,
  ref,
  ...props
}: ComponentPropsWithRef<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean;
}) {
  const sub = useContext(DropdownMenuSubContext);

  return (
    <DropdownMenuPrimitive.SubTrigger
      className={cn(
        dropdownMenuItemVariants({ inset }),
        "justify-between gap-4 data-[state=open]:bg-mar-surface",
        className,
      )}
      onKeyDownCapture={(event) => {
        onKeyDownCapture?.(event);
        if (event.defaultPrevented) return;
        const openKey =
          getComputedStyle(event.currentTarget).direction === "rtl"
            ? "ArrowLeft"
            : "ArrowRight";
        if (event.key === openKey) {
          event.preventDefault();
          sub?.setOpen(true);
        }
      }}
      ref={ref}
      {...props}
    >
      {children}
      <span aria-hidden="true">›</span>
    </DropdownMenuPrimitive.SubTrigger>
  );
}

export type DropdownMenuSubContentProps = ComponentPropsWithRef<
  typeof DropdownMenuPrimitive.SubContent
> & {
  portalProps?: Omit<DropdownMenuPortalProps, "children">;
};

export function DropdownMenuSubContent({
  className,
  collisionPadding = 8,
  portalProps,
  ref,
  sideOffset = 4,
  ...props
}: DropdownMenuSubContentProps) {
  return (
    <DropdownMenuPortal {...portalProps}>
      <DropdownMenuPrimitive.SubContent
        className={cn(menuContentClasses, className)}
        collisionPadding={collisionPadding}
        ref={ref}
        sideOffset={sideOffset}
        {...props}
      />
    </DropdownMenuPortal>
  );
}
