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

export function NavigationLinkBase({
  asChild = false,
  className,
  current = false,
  currentValue = "page",
  ...props
}: NavigationLinkBaseProps) {
  const Component = asChild ? Slot : "a";

  return (
    <Component
      aria-current={current ? currentValue : undefined}
      className={cn(className)}
      {...props}
    />
  );
}
