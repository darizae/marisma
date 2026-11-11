"use client";

import {
  type ComponentPropsWithoutRef,
  type ComponentPropsWithRef,
} from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "./button";
import { cn } from "../lib/cn";
import { usePortalTheme } from "../lib/portal-theme";

export function TooltipProvider({
  delayDuration = 400,
  skipDelayDuration = 300,
  ...props
}: ComponentPropsWithRef<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
      {...props}
    />
  );
}

export const Tooltip = TooltipPrimitive.Root;
export type TooltipProps = ComponentPropsWithRef<typeof TooltipPrimitive.Root>;

export type TooltipTriggerProps = ComponentPropsWithRef<
  typeof TooltipPrimitive.Trigger
> &
  VariantProps<typeof buttonVariants>;

export function TooltipTrigger({
  className,
  fullWidth,
  ref,
  size,
  variant = "secondary",
  ...props
}: TooltipTriggerProps) {
  return (
    <TooltipPrimitive.Trigger
      className={cn(buttonVariants({ fullWidth, size, variant }), className)}
      ref={ref}
      {...props}
    />
  );
}

export type TooltipPortalProps = ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Portal
>;

export function TooltipPortal({ children, ...props }: TooltipPortalProps) {
  const { anchorRef, theme } = usePortalTheme();

  return (
    <>
      <span aria-hidden="true" className="hidden" ref={anchorRef} />
      <TooltipPrimitive.Portal {...props}>
        <div
          className="contents"
          data-marisma-accent={theme.accent}
          data-marisma-mode={theme.mode}
          data-marisma-portal="tooltip"
        >
          {children}
        </div>
      </TooltipPrimitive.Portal>
    </>
  );
}

export type TooltipContentProps = ComponentPropsWithRef<
  typeof TooltipPrimitive.Content
> & {
  portalProps?: Omit<TooltipPortalProps, "children">;
};

export function TooltipContent({
  className,
  collisionPadding = 8,
  portalProps,
  ref,
  sideOffset = 6,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPortal {...portalProps}>
      <TooltipPrimitive.Content
        className={cn(
          "z-50 max-w-64 rounded-lg bg-mar-text px-3 py-2 font-mar-sans text-sm text-mar-surface shadow-lg",
          "transition-opacity duration-[var(--marisma-duration-fast)] data-[state=closed]:opacity-0 data-[state=instant-open]:opacity-100 data-[state=delayed-open]:opacity-100",
          className,
        )}
        collisionPadding={collisionPadding}
        ref={ref}
        sideOffset={sideOffset}
        {...props}
      />
    </TooltipPortal>
  );
}
