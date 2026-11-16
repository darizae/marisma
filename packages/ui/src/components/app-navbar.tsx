import type { ComponentPropsWithRef, ReactNode } from "react";
import {
  NavigationLinkBase,
  type NavigationLinkBaseProps,
} from "./navigation-link";
import { cn } from "../lib/cn";

export type AppNavbarProps = ComponentPropsWithRef<"header"> & {
  brand?: ReactNode;
  start?: ReactNode;
  actions?: ReactNode;
  navigationLabel?: string;
  sticky?: boolean;
};

export function AppNavbar({
  actions,
  brand,
  children,
  className,
  navigationLabel = "Primary",
  start,
  sticky = true,
  ...props
}: AppNavbarProps) {
  return (
    <header
      className={cn(
        "z-30 mx-2 mt-2 rounded-mar-navbar border border-mar-surface-border bg-mar-card shadow-mar-navbar sm:mx-4 sm:mt-3 font-mar-sans text-mar-text",
        sticky && "sticky top-2",
        className,
      )}
      {...props}
    >
      <div className="flex min-h-16 flex-wrap items-center gap-3 px-4 py-2 sm:flex-nowrap sm:px-6 sm:py-0">
        {start !== undefined && start !== null ? (
          <div className="shrink-0">{start}</div>
        ) : null}
        {brand !== undefined && brand !== null ? (
          <div className="min-w-0 shrink-0 font-semibold">{brand}</div>
        ) : null}
        {children !== undefined && children !== null ? (
          <nav
            aria-label={navigationLabel}
            className="order-3 min-w-0 basis-full overflow-x-auto sm:order-none sm:flex-1 sm:basis-auto"
          >
            <div className="flex min-w-max items-center gap-1">{children}</div>
          </nav>
        ) : (
          <div className="flex-1" />
        )}
        {actions !== undefined && actions !== null ? (
          <div className="flex shrink-0 items-center gap-2">{actions}</div>
        ) : null}
      </div>
    </header>
  );
}

export type AppNavbarLinkProps = Omit<NavigationLinkBaseProps, "currentValue">;

export function AppNavbarLink({ className, ...props }: AppNavbarLinkProps) {
  return (
    <NavigationLinkBase
      className={cn(
        "inline-flex min-h-10 items-center rounded-mar-control px-3 py-2 text-sm font-medium text-mar-muted transition-colors duration-[var(--marisma-duration-fast)] hover:bg-mar-hover hover:text-mar-text aria-[current=page]:bg-mar-selection aria-[current=page]:text-mar-selection-text",
        className,
      )}
      currentValue="page"
      {...props}
    />
  );
}
