import type { ComponentPropsWithRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export const cardGridVariants = cva("grid list-none gap-4 p-0", {
  variants: {
    columns: {
      two: "sm:grid-cols-2",
      three: "sm:grid-cols-2 xl:grid-cols-3",
      four: "sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4",
    },
  },
  defaultVariants: { columns: "three" },
});

export type CardGridProps = ComponentPropsWithRef<"ul"> &
  VariantProps<typeof cardGridVariants>;

export function CardGrid({ className, columns, ...props }: CardGridProps) {
  return (
    <ul className={cn(cardGridVariants({ columns }), className)} {...props} />
  );
}

export function CardGridItem({
  className,
  ...props
}: ComponentPropsWithRef<"li">) {
  return <li className={cn("min-w-0", className)} {...props} />;
}
