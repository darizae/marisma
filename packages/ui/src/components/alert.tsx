import type { ComponentPropsWithRef, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export const alertVariants = cva(
  "grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 rounded-xl border p-4 font-mar-sans text-sm",
  {
    variants: {
      variant: {
        info: "border-mar-info bg-mar-info-surface text-mar-info",
        success: "border-mar-success bg-mar-success-surface text-mar-success",
        warning: "border-mar-warning bg-mar-warning-surface text-mar-warning",
        danger: "border-mar-danger bg-mar-danger-surface text-mar-danger",
      },
    },
    defaultVariants: { variant: "info" },
  },
);

export type AlertProps = ComponentPropsWithRef<"div"> &
  VariantProps<typeof alertVariants> & {
    action?: ReactNode;
    icon?: ReactNode;
    title?: ReactNode;
  };

export function Alert({
  action,
  children,
  className,
  icon,
  role,
  title,
  variant = "info",
  ...props
}: AlertProps) {
  const liveRole = role ?? (variant === "danger" ? "alert" : "status");

  return (
    <div
      className={cn(alertVariants({ variant }), className)}
      role={liveRole}
      {...props}
    >
      {icon ? (
        <span aria-hidden="true" className="row-span-2 pt-0.5">
          {icon}
        </span>
      ) : null}
      <div className="min-w-0">
        {title ? <p className="font-semibold text-current">{title}</p> : null}
        <div className={cn("text-current", title && "mt-1")}>{children}</div>
      </div>
      {action ? <div className="col-start-2 mt-2">{action}</div> : null}
    </div>
  );
}
