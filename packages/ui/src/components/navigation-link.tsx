import type { ComponentPropsWithRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../lib/cn";

export type NavigationLinkBaseProps = Omit<
  ComponentPropsWithRef<"a">,
  "aria-current"
> & {
  asChild?: boolean;
  current?: boolean;
  currentValue?: "page" | "step" | "location";
};

function safeNavigationHref(href: string | undefined) {
  if (!href) return href;
  const normalized = href.replace(/[\u0000-\u0020]/g, "").toLowerCase();
  if (/^(?:javascript|data|vbscript):/.test(normalized)) return undefined;
  return href;
}

export function NavigationLinkBase({
  asChild = false,
  className,
  current = false,
  currentValue = "page",
  href,
  ...props
}: NavigationLinkBaseProps) {
  const Component = asChild ? Slot : "a";

  return (
    <Component
      aria-current={current ? currentValue : undefined}
      className={cn(className)}
      href={safeNavigationHref(href)}
      {...props}
    />
  );
}
