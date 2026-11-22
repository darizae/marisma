"use client";

import {
  type ComponentPropsWithoutRef,
  type ComponentPropsWithRef,
} from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "./button";
import { cn } from "../lib/cn";
import { usePortalTheme } from "../lib/portal-theme";

export const Popover = PopoverPrimitive.Root;
export type PopoverProps = ComponentPropsWithRef<typeof PopoverPrimitive.Root>;
export const PopoverAnchor = PopoverPrimitive.Anchor;

export type PopoverTriggerProps = ComponentPropsWithRef<
  typeof PopoverPrimitive.Trigger
> &
  VariantProps<typeof buttonVariants>;

export function PopoverTrigger({
  className,
  fullWidth,
  ref,
  size,
  variant = "secondary",
  ...props
}: PopoverTriggerProps) {
  return (
    <PopoverPrimitive.Trigger
      className={cn(buttonVariants({ fullWidth, size, variant }), "marisma-motion-control", className)}
      ref={ref}
      {...props}
    />
  );
}

export type PopoverPortalProps = ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Portal
>;

export function PopoverPortal({ children, ...props }: PopoverPortalProps) {
  const { anchorRef, theme } = usePortalTheme();

  return (
    <>
      <span aria-hidden="true" className="hidden" ref={anchorRef} />
      <PopoverPrimitive.Portal {...props}>
        <div
          className="contents"
          data-marisma-accent={theme.accent}
          data-marisma-mode={theme.mode}
          data-marisma-portal="popover"
        >
          {children}
        </div>
      </PopoverPrimitive.Portal>
    </>
  );
}

export type PopoverContentProps = ComponentPropsWithRef<
  typeof PopoverPrimitive.Content
> & {
  portalProps?: Omit<PopoverPortalProps, "children">;
};

export function PopoverContent({
  align = "start",
  className,
  collisionPadding = 12,
  portalProps,
  ref,
  sideOffset = 8,
  ...props
}: PopoverContentProps) {
  return (
    <PopoverPortal {...portalProps}>
      <PopoverPrimitive.Content
        align={align}
        className={cn(
          "z-50 max-h-[var(--radix-popover-content-available-height)] w-[min(22rem,var(--radix-popover-content-available-width))] overflow-y-auto rounded-mar-card border border-mar-surface-border bg-mar-card p-4 font-mar-sans text-mar-text shadow-mar-overlay",
          "marisma-motion-overlay",
          className,
        )}
        collisionPadding={collisionPadding}
        ref={ref}
        sideOffset={sideOffset}
        {...props}
      />
    </PopoverPortal>
  );
}

export function PopoverClose({
  className,
  ref,
  ...props
}: ComponentPropsWithRef<typeof PopoverPrimitive.Close>) {
  return (
    <PopoverPrimitive.Close
      className={cn(buttonVariants({ variant: "secondary" }), className)}
      ref={ref}
      {...props}
    />
  );
}

export function PopoverArrow({
  className,
  ref,
  ...props
}: ComponentPropsWithRef<typeof PopoverPrimitive.Arrow>) {
  return (
    <PopoverPrimitive.Arrow
      className={cn("fill-mar-card stroke-mar-separator", className)}
      ref={ref}
      {...props}
    />
  );
}
