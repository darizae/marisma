"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ComponentPropsWithRef,
  type ReactNode,
} from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "./button";
import {
  NavigationLinkBase,
  type NavigationLinkBaseProps,
} from "./navigation-link";
import { cn } from "../lib/cn";
import { usePortalTheme } from "../lib/portal-theme";

const SidebarStateContext = createContext<() => void>(() => undefined);

export type SidebarProps = Omit<
  ComponentPropsWithRef<typeof DialogPrimitive.Root>,
  "modal" | "onOpenChange" | "open"
> & {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function Sidebar({
  defaultOpen = false,
  onOpenChange,
  open,
  ...props
}: SidebarProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const resolvedOpen = open ?? internalOpen;
  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (open === undefined) setInternalOpen(nextOpen);
      onOpenChange?.(nextOpen);
    },
    [onOpenChange, open],
  );
  const closeForDesktop = useCallback(() => {
    if (resolvedOpen) setOpen(false);
  }, [resolvedOpen, setOpen]);

  return (
    <SidebarStateContext value={closeForDesktop}>
      <DialogPrimitive.Root
        modal
        onOpenChange={setOpen}
        open={resolvedOpen}
        {...props}
      />
    </SidebarStateContext>
  );
}

export type SidebarTriggerProps = ComponentPropsWithRef<
  typeof DialogPrimitive.Trigger
> &
  VariantProps<typeof buttonVariants>;

export function SidebarTrigger({
  asChild,
  className,
  fullWidth,
  size,
  variant = "secondary",
  ...props
}: SidebarTriggerProps) {
  return (
    <DialogPrimitive.Trigger
      asChild={asChild}
      className={cn(
        !asChild && buttonVariants({ fullWidth, size, variant }),
        "lg:hidden",
        className,
      )}
      {...props}
    />
  );
}

export type SidebarContentProps = Omit<
  ComponentPropsWithRef<typeof DialogPrimitive.Content>,
  "title"
> & {
  title: ReactNode;
  closeLabel?: string;
  header?: ReactNode;
  footer?: ReactNode;
};

export function SidebarContent({
  children,
  className,
  closeLabel = "Close navigation",
  footer,
  header,
  title,
  ...props
}: SidebarContentProps) {
  const { anchorRef, theme } = usePortalTheme();
  const closeForDesktop = useContext(SidebarStateContext);
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia?.("(min-width: 1024px)");
    if (!media) return;
    const update = (event: MediaQueryListEvent | MediaQueryList) => {
      setDesktop(event.matches);
      if (event.matches) closeForDesktop();
    };
    update(media);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [closeForDesktop]);

  const panel = (
    <aside className="flex h-full flex-col border-r border-mar-border bg-mar-card font-mar-sans text-mar-text shadow-2xl lg:fixed lg:inset-y-0 lg:left-0 lg:z-20 lg:w-72 lg:shadow-none">
      <div className="flex min-h-16 items-center justify-between gap-3 border-b border-mar-border px-4">
        {desktop ? (
          <h2 className="min-w-0 truncate font-semibold">{title}</h2>
        ) : (
          <DialogPrimitive.Title className="min-w-0 truncate font-semibold">
            {title}
          </DialogPrimitive.Title>
        )}
        {!desktop ? (
          <DialogPrimitive.Close
            aria-label={closeLabel}
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg text-xl text-mar-muted hover:bg-mar-surface hover:text-mar-text"
          >
            <span aria-hidden="true">×</span>
          </DialogPrimitive.Close>
        ) : null}
      </div>
      {header !== undefined && header !== null ? (
        <div className="border-b border-mar-border p-4">{header}</div>
      ) : null}
      <div className="min-h-0 flex-1 overflow-y-auto p-3">{children}</div>
      {footer !== undefined && footer !== null ? (
        <div className="border-t border-mar-border p-4">{footer}</div>
      ) : null}
    </aside>
  );

  if (desktop) return panel;

  return (
    <>
      <span aria-hidden="true" className="hidden" ref={anchorRef} />
      <DialogPrimitive.Portal>
        <div
          className="contents"
          data-marisma-accent={theme.accent}
          data-marisma-mode={theme.mode}
          data-marisma-portal="sidebar"
        >
          <DialogPrimitive.Overlay className="fixed inset-0 z-40 bg-black/55 transition-opacity duration-[var(--marisma-duration-fast)] data-[state=closed]:pointer-events-none data-[state=closed]:opacity-0 lg:hidden" />
          <DialogPrimitive.Content
            className={cn(
              "fixed inset-y-0 left-0 z-50 w-[min(18rem,calc(100vw-3rem))] transition duration-[var(--marisma-duration-fast)] data-[state=closed]:-translate-x-full",
              className,
            )}
            {...props}
          >
            {panel}
          </DialogPrimitive.Content>
        </div>
      </DialogPrimitive.Portal>
    </>
  );
}

export type SidebarNavProps = Omit<
  ComponentPropsWithRef<"nav">,
  "aria-label"
> & {
  label?: string;
};

export function SidebarNav({
  children,
  className,
  label = "Sidebar",
  ...props
}: SidebarNavProps) {
  return (
    <nav aria-label={label} className={className} {...props}>
      <div className="grid gap-1">{children}</div>
    </nav>
  );
}

export type SidebarLinkProps = Omit<NavigationLinkBaseProps, "currentValue">;

export function SidebarLink({ className, ...props }: SidebarLinkProps) {
  return (
    <NavigationLinkBase
      className={cn(
        "flex min-h-11 min-w-0 items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-mar-muted transition-colors duration-[var(--marisma-duration-fast)] hover:bg-mar-surface hover:text-mar-text aria-[current=page]:bg-mar-primary aria-[current=page]:text-mar-on-primary",
        className,
      )}
      currentValue="page"
      {...props}
    />
  );
}
