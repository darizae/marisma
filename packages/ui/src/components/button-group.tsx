import type { ComponentPropsWithRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export const buttonGroupVariants = cva(
  "inline-flex max-w-full [&>*]:relative [&>*:focus-visible]:z-10",
  {
    variants: {
      attached: {
        true: "gap-0 [&>*:not(:first-child)]:-ml-px [&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none",
        false: "gap-2",
      },
      orientation: {
        horizontal: "flex-row",
        vertical:
          "flex-col [&>*:not(:first-child)]:ml-0 [&>*:not(:first-child)]:-mt-px [&>*:not(:first-child)]:rounded-l-lg [&>*:not(:first-child)]:rounded-t-none [&>*:not(:last-child)]:rounded-r-lg [&>*:not(:last-child)]:rounded-b-none",
      },
    },
    defaultVariants: { attached: true, orientation: "horizontal" },
  },
);

export type ButtonGroupProps = ComponentPropsWithRef<"div"> &
  VariantProps<typeof buttonGroupVariants>;

export function ButtonGroup({
  attached,
  className,
  orientation = "horizontal",
  role = "group",
  ...props
}: ButtonGroupProps) {
  const resolvedOrientation = orientation ?? "horizontal";

  return (
    <div
      className={cn(
        buttonGroupVariants({ attached, orientation: resolvedOrientation }),
        className,
      )}
      data-orientation={resolvedOrientation}
      role={role}
      {...props}
    />
  );
}
