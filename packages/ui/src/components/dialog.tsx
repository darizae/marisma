"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ComponentPropsWithRef,
  type RefObject,
} from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "./button";
import { cn } from "../lib/cn";

export const Dialog = DialogPrimitive.Root;
export type DialogProps = ComponentPropsWithRef<typeof DialogPrimitive.Root>;

export type DialogTriggerProps = ComponentPropsWithRef<
  typeof DialogPrimitive.Trigger
> &
  VariantProps<typeof buttonVariants>;

export function DialogTrigger({
  className,
  fullWidth,
  ref,
  size,
  variant,
  ...props
}: DialogTriggerProps) {
  return (
    <DialogPrimitive.Trigger
      className={cn(buttonVariants({ fullWidth, size, variant }), className)}
      ref={ref}
      {...props}
    />
  );
}

type PortalTheme = {
  accent?: string;
  mode?: string;
};

function themeAt(anchor: HTMLElement | null): PortalTheme {
  let current = anchor?.parentElement ?? null;
  let accent: string | undefined;
  let mode: string | undefined;

  while (current && (!accent || !mode)) {
    accent ??= current.getAttribute("data-marisma-accent") ?? undefined;
    mode ??= current.getAttribute("data-marisma-mode") ?? undefined;
    current = current.parentElement;
  }

  return { accent, mode };
}

function usePortalTheme(anchor: RefObject<HTMLSpanElement | null>) {
  const [theme, setTheme] = useState<PortalTheme>({});

  useLayoutEffect(() => {
    const update = () => setTheme(themeAt(anchor.current));
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributeFilter: ["data-marisma-accent", "data-marisma-mode"],
      attributes: true,
      subtree: true,
    });
    return () => observer.disconnect();
  }, [anchor]);

  return theme;
}

export type DialogPortalProps = ComponentPropsWithoutRef<
  typeof DialogPrimitive.Portal
>;

export function DialogPortal({ children, ...props }: DialogPortalProps) {
  const anchor = useRef<HTMLSpanElement>(null);
  const theme = usePortalTheme(anchor);

  return (
    <>
      <span aria-hidden="true" className="hidden" ref={anchor} />
      <DialogPrimitive.Portal {...props}>
        <div
          className="contents"
          data-marisma-accent={theme.accent}
          data-marisma-mode={theme.mode}
          data-marisma-portal="dialog"
        >
          {children}
        </div>
      </DialogPrimitive.Portal>
    </>
  );
}

export function DialogOverlay({
  className,
  ref,
  ...props
}: ComponentPropsWithRef<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-black/55 transition-opacity duration-[var(--marisma-duration-fast)] data-[state=closed]:opacity-0 data-[state=open]:opacity-100",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
}

export type DialogContentProps = ComponentPropsWithRef<
  typeof DialogPrimitive.Content
> & {
  closeLabel?: string;
  overlayClassName?: string;
  showCloseButton?: boolean;
};

export function DialogContent({
  children,
  className,
  closeLabel = "Close dialog",
  overlayClassName,
  ref,
  showCloseButton = true,
  ...props
}: DialogContentProps) {
  return (
    <DialogPortal>
      <DialogOverlay className={overlayClassName} />
      <DialogPrimitive.Content
        className={cn(
          "fixed left-1/2 top-1/2 z-50 grid max-h-[calc(100vh-2rem)] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 overflow-y-auto rounded-xl border border-mar-border bg-mar-card p-6 font-mar-sans text-mar-text shadow-2xl",
          "transition duration-[var(--marisma-duration-fast)] data-[state=closed]:scale-95 data-[state=closed]:opacity-0 data-[state=open]:scale-100 data-[state=open]:opacity-100",
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
        {showCloseButton ? (
          <DialogPrimitive.Close
            aria-label={closeLabel}
            className="absolute right-3 top-3 inline-flex size-10 items-center justify-center rounded-lg text-xl leading-none text-mar-muted transition-colors duration-[var(--marisma-duration-fast)] hover:bg-mar-surface hover:text-mar-text"
          >
            <span aria-hidden="true">×</span>
          </DialogPrimitive.Close>
        ) : null}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

export function DialogTitle({
  className,
  ref,
  ...props
}: ComponentPropsWithRef<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={cn("pr-10 text-lg font-semibold", className)}
      ref={ref}
      {...props}
    />
  );
}

export function DialogDescription({
  className,
  ref,
  ...props
}: ComponentPropsWithRef<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      className={cn("text-sm text-mar-muted", className)}
      ref={ref}
      {...props}
    />
  );
}

export function DialogClose({
  className,
  ref,
  ...props
}: ComponentPropsWithRef<typeof DialogPrimitive.Close>) {
  return (
    <DialogPrimitive.Close
      className={cn(buttonVariants({ variant: "secondary" }), className)}
      ref={ref}
      {...props}
    />
  );
}
