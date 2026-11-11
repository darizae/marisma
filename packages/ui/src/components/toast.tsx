"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ComponentPropsWithRef,
  type ReactNode,
} from "react";
import { cva } from "class-variance-authority";
import { cn } from "../lib/cn";

export type ToastVariant = "info" | "success" | "warning" | "danger";

export type ToastOptions = {
  action?: ReactNode;
  description?: ReactNode;
  duration?: number;
  id?: string;
  title: ReactNode;
  variant?: ToastVariant;
};

type ToastRecord = ToastOptions & { id: string };
type ToastContextValue = {
  dismiss: (id: string) => void;
  toast: (options: ToastOptions) => string;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const toastVariants = cva(
  "pointer-events-auto grid w-full grid-cols-[1fr_auto] gap-x-3 gap-y-1 rounded-xl border p-4 font-mar-sans shadow-lg",
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

export type ToastProviderProps = {
  children: ReactNode;
  duration?: number;
  label?: string;
  limit?: number;
  viewportClassName?: string;
};

export function ToastProvider({
  children,
  duration = 5000,
  label = "Notifications",
  limit = 3,
  viewportClassName,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);
  const generatedId = useId();
  const nextId = useRef(0);
  const safeLimit = Math.max(1, Math.floor(limit));

  const dismiss = useCallback((id: string) => {
    setToasts((current) => current.filter((item) => item.id !== id));
  }, []);

  const toast = useCallback(
    (options: ToastOptions) => {
      const id =
        options.id ??
        `marisma-toast-${generatedId}-${String(nextId.current++)}`;
      const record = { ...options, id };
      setToasts((current) =>
        [...current.filter((item) => item.id !== id), record].slice(-safeLimit),
      );
      return id;
    },
    [generatedId, safeLimit],
  );

  const value = useMemo(() => ({ dismiss, toast }), [dismiss, toast]);

  return (
    <ToastContext value={value}>
      {children}
      <section
        aria-label={label}
        className={cn(
          "pointer-events-none fixed inset-x-4 bottom-4 z-[60] ml-auto grid w-auto max-w-sm gap-3 sm:left-auto sm:w-full",
          viewportClassName,
        )}
      >
        {toasts.map((item) => (
          <ToastItem
            defaultDuration={duration}
            item={item}
            key={item.id}
            onDismiss={dismiss}
          />
        ))}
      </section>
    </ToastContext>
  );
}

type ToastItemProps = {
  defaultDuration: number;
  item: ToastRecord;
  onDismiss: (id: string) => void;
};

function ToastItem({ defaultDuration, item, onDismiss }: ToastItemProps) {
  const duration = item.duration ?? defaultDuration;

  useEffect(() => {
    if (duration <= 0 || !Number.isFinite(duration)) return;
    const timer = setTimeout(() => onDismiss(item.id), duration);
    return () => clearTimeout(timer);
  }, [duration, item.id, onDismiss]);

  const variant = item.variant ?? "info";

  return (
    <div
      aria-atomic="true"
      className={toastVariants({ variant })}
      data-variant={variant}
      role={variant === "danger" ? "alert" : "status"}
    >
      <div className="min-w-0">
        <p className="font-semibold">{item.title}</p>
        {item.description ? (
          <div className="mt-1 text-sm text-current">{item.description}</div>
        ) : null}
        {item.action ? <div className="mt-3">{item.action}</div> : null}
      </div>
      <button
        aria-label="Dismiss notification"
        className="inline-flex size-10 items-center justify-center rounded-lg text-xl leading-none transition-colors duration-[var(--marisma-duration-fast)] hover:bg-black/10"
        onClick={() => onDismiss(item.id)}
        type="button"
      >
        <span aria-hidden="true">×</span>
      </button>
    </div>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export type ToastActionProps = ComponentPropsWithRef<"button">;

export function ToastAction({
  className,
  type = "button",
  ...props
}: ToastActionProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-10 items-center justify-center rounded-lg border border-current px-3 py-1.5 text-sm font-semibold transition-colors duration-[var(--marisma-duration-fast)] hover:bg-black/10",
        className,
      )}
      type={type}
      {...props}
    />
  );
}
