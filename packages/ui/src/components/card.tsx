import type { ComponentPropsWithRef } from "react";
import { cn } from "../lib/cn";

export function Card({
  className,
  ...props
}: ComponentPropsWithRef<"section">) {
  return (
    <section
      className={cn(
        "rounded-xl border border-mar-border bg-mar-card font-mar-sans text-mar-text shadow-sm",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: ComponentPropsWithRef<"header">) {
  return <header className={cn("grid gap-1 p-5 pb-3", className)} {...props} />;
}

export function CardTitle({
  className,
  ...props
}: ComponentPropsWithRef<"h3">) {
  return <h3 className={cn("text-lg font-semibold", className)} {...props} />;
}

export function CardDescription({
  className,
  ...props
}: ComponentPropsWithRef<"p">) {
  return <p className={cn("text-sm text-mar-muted", className)} {...props} />;
}

export function CardContent({
  className,
  ...props
}: ComponentPropsWithRef<"div">) {
  return <div className={cn("p-5 pt-2", className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: ComponentPropsWithRef<"footer">) {
  return (
    <footer
      className={cn(
        "flex flex-wrap items-center gap-3 border-t border-mar-border p-5",
        className,
      )}
      {...props}
    />
  );
}
