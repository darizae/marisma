import type { ComponentPropsWithRef, ReactNode } from "react";
import { cn } from "../lib/cn";

export type AppShellProps = ComponentPropsWithRef<"div"> & {
  header?: ReactNode;
  sidebar?: ReactNode;
  footer?: ReactNode;
  mainId?: string;
  mainClassName?: string;
  mainProps?: Omit<
    ComponentPropsWithRef<"main">,
    "children" | "className" | "id"
  >;
  skipLinkLabel?: string;
};

export function AppShell({
  children,
  className,
  footer,
  header,
  mainClassName,
  mainId = "marisma-main-content",
  mainProps,
  sidebar,
  skipLinkLabel = "Skip to content",
  ...props
}: AppShellProps) {
  const hasSidebar = sidebar !== undefined && sidebar !== null;

  return (
    <div
      className={cn(
        "min-h-screen bg-mar-surface font-mar-sans text-mar-text",
        className,
      )}
      {...props}
    >
      <a
        className="sr-only z-[60] rounded-lg bg-mar-primary px-4 py-2 font-semibold text-mar-on-primary focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        href={`#${mainId}`}
      >
        {skipLinkLabel}
      </a>
      {sidebar}
      <div
        className={cn("flex min-h-screen flex-col", hasSidebar && "lg:pl-72")}
      >
        {header}
        <main
          className={cn("min-w-0 flex-1", mainClassName)}
          id={mainId}
          tabIndex={-1}
          {...mainProps}
        >
          {children}
        </main>
        {footer}
      </div>
    </div>
  );
}
