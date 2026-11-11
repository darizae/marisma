"use client";

import {
  createContext,
  useContext,
  type ComponentPropsWithRef,
  type ReactNode,
} from "react";
import {
  NavigationLinkBase,
  type NavigationLinkBaseProps,
} from "./navigation-link";
import { cn } from "../lib/cn";

export type StepProgressProps = Omit<
  ComponentPropsWithRef<"nav">,
  "aria-label"
> & {
  label?: string;
};

export function StepProgress({
  children,
  className,
  label = "Progress",
  ...props
}: StepProgressProps) {
  return (
    <nav
      aria-label={label}
      className={cn("font-mar-sans text-mar-text", className)}
      {...props}
    >
      <ol className="grid gap-3 sm:grid-cols-[repeat(auto-fit,minmax(10rem,1fr))]">
        {children}
      </ol>
    </nav>
  );
}

export type StepProgressStatus = "complete" | "current" | "upcoming";

const StepStatusContext = createContext<StepProgressStatus>("upcoming");

export type StepProgressItemProps = ComponentPropsWithRef<"li"> & {
  status?: StepProgressStatus;
  step: ReactNode;
};

export function StepProgressItem({
  children,
  className,
  status = "upcoming",
  step,
  ...props
}: StepProgressItemProps) {
  return (
    <StepStatusContext value={status}>
      <li
        className={cn(
          "flex min-w-0 items-start gap-3 border-t-2 border-mar-border pt-3",
          status === "current" && "border-mar-primary",
          status === "complete" && "border-mar-success",
          className,
        )}
        data-status={status}
        {...props}
      >
        <span
          aria-hidden="true"
          className={cn(
            "inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-mar-border bg-mar-card text-xs font-semibold",
            status === "current" &&
              "border-mar-primary bg-mar-primary text-mar-on-primary",
            status === "complete" &&
              "border-mar-success bg-mar-success-surface text-mar-success",
          )}
        >
          {status === "complete" ? "✓" : step}
        </span>
        <div className="min-w-0 flex-1">
          <span className="sr-only">
            Step {step}, {status}.{" "}
          </span>
          {children}
        </div>
      </li>
    </StepStatusContext>
  );
}

export type StepProgressLinkProps = Omit<
  NavigationLinkBaseProps,
  "current" | "currentValue"
>;

export function StepProgressLink({
  className,
  ...props
}: StepProgressLinkProps) {
  const status = useContext(StepStatusContext);

  return (
    <NavigationLinkBase
      className={cn(
        "inline-flex min-h-10 items-center rounded-lg px-2 py-1 font-medium text-mar-text underline-offset-4 hover:underline",
        className,
      )}
      current={status === "current"}
      currentValue="step"
      {...props}
    />
  );
}
