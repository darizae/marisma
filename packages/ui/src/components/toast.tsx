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
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
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

type ToastRecord = ToastOptions & { id: string; leaving?: boolean };
type ToastContextValue = {
  dismiss: (id: string) => void;
  toast: (options: ToastOptions) => string;
};

const ToastContext = createContext<ToastContextValue | null>(null);
const EXIT_DURATION = 180;
const STACK_GAP = 12;
const STACK_PEEK = 12;
const HEIGHT_FALLBACK = 84;

const iconVariants = cva(
  "grid size-7 shrink-0 place-items-center rounded-full text-sm font-bold",
  {
    variants: {
      variant: {
        info: "bg-mar-info-surface text-mar-info",
        success: "bg-mar-success-surface text-mar-success",
        warning: "bg-mar-warning-surface text-mar-warning",
        danger: "bg-mar-danger-surface text-mar-danger",
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

/**
 * An app-scoped, softly stacked notification viewport. Existing useToast API
 * is retained; newer notifications sit in front, and hover/focus expands the
 * stack. No Sonner dependency, DOM portals, global events, or network calls.
 */
export function ToastProvider({
  children,
  duration = 5000,
  label = "Notifications",
  limit = 3,
  viewportClassName,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [documentHidden, setDocumentHidden] = useState(false);
  const [heights, setHeights] = useState<Record<string, number>>({});
  const generatedId = useId();
  const nextId = useRef(0);
  const exitTimers = useRef(new Map<string, ReturnType<typeof setTimeout>>());
  const viewportRef = useRef<HTMLElement>(null);
  const safeLimit = Math.max(1, Math.floor(limit));

  useEffect(() => {
    const onVisibility = () => setDocumentHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    const pending = exitTimers.current;
    return () => {
      for (const timer of pending.values()) clearTimeout(timer);
      pending.clear();
    };
  }, []);

  const dismiss = useCallback((id: string) => {
    if (exitTimers.current.has(id)) return;
    setToasts((current) =>
      current.map((item) =>
        item.id === id ? { ...item, leaving: true } : item,
      ),
    );
    const timer = setTimeout(() => {
      setToasts((current) => current.filter((item) => item.id !== id));
      setHeights((current) => {
        const remaining = { ...current };
        delete remaining[id];
        return remaining;
      });
      exitTimers.current.delete(id);
    }, EXIT_DURATION);
    exitTimers.current.set(id, timer);
  }, []);

  const toast = useCallback(
    (options: ToastOptions) => {
      const id =
        options.id ??
        `marisma-toast-${generatedId}-${String(nextId.current++)}`;
      const pendingExit = exitTimers.current.get(id);
      if (pendingExit) {
        clearTimeout(pendingExit);
        exitTimers.current.delete(id);
      }
      const record = { ...options, id };
      setToasts((current) =>
        [...current.filter((item) => item.id !== id), record].slice(-safeLimit),
      );
      return id;
    },
    [generatedId, safeLimit],
  );

  const onHeight = useCallback((id: string, height: number) => {
    if (!height) return;
    setHeights((current) =>
      current[id] === height ? current : { ...current, [id]: height },
    );
  }, []);

  const value = useMemo(() => ({ dismiss, toast }), [dismiss, toast]);
  const newestFirst = [...toasts].reverse();
  const measuredHeights = newestFirst.map(
    (item) => heights[item.id] ?? HEIGHT_FALLBACK,
  );
  const expandedHeight =
    measuredHeights.reduce((total, height) => total + height, 0) +
    Math.max(newestFirst.length - 1, 0) * STACK_GAP;
  const collapsedHeight =
    (measuredHeights[0] ?? 0) +
    Math.max(newestFirst.length - 1, 0) * STACK_PEEK;
  let offset = 0;

  return (
    <ToastContext value={value}>
      {children}
      <section
        aria-label={label}
        className={cn(
          "marisma-toast-viewport pointer-events-none fixed bottom-4 right-4 z-[60] w-[min(24rem,calc(100vw-2rem))] font-mar-sans",
          viewportClassName,
        )}
        data-expanded={expanded}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node)) {
            setExpanded(false);
          }
        }}
        onFocusCapture={() => setExpanded(true)}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => {
          if (!viewportRef.current?.contains(document.activeElement))
            setExpanded(false);
        }}
        ref={viewportRef}
        role="region"
      >
        <ol
          className="marisma-toast-stack relative m-0 list-none p-0"
          style={{ height: expanded ? expandedHeight : collapsedHeight }}
        >
          {newestFirst.map((item, index) => {
            const currentOffset = offset;
            offset += (measuredHeights[index] ?? HEIGHT_FALLBACK) + STACK_GAP;
            return (
              <ToastItem
                defaultDuration={duration}
                documentHidden={documentHidden}
                expanded={expanded}
                index={index}
                item={item}
                key={item.id}
                offset={currentOffset}
                onDismiss={dismiss}
                onHeight={onHeight}
              />
            );
          })}
        </ol>
      </section>
    </ToastContext>
  );
}

type ToastItemProps = {
  defaultDuration: number;
  documentHidden: boolean;
  expanded: boolean;
  index: number;
  item: ToastRecord;
  offset: number;
  onDismiss: (id: string) => void;
  onHeight: (id: string, height: number) => void;
};

function ToastItem({
  defaultDuration,
  documentHidden,
  expanded,
  index,
  item,
  offset,
  onDismiss,
  onHeight,
}: ToastItemProps) {
  const duration = item.duration ?? defaultDuration;
  const remaining = useRef(duration);
  const nodeRef = useRef<HTMLLIElement>(null);
  const pointerStart = useRef<{ id: number; x: number; y: number } | null>(
    null,
  );
  const [drag, setDrag] = useState(0);
  const dragRef = useRef(0);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    remaining.current = duration;
  }, [duration, item]);

  useEffect(() => {
    if (
      expanded ||
      documentHidden ||
      item.leaving ||
      duration <= 0 ||
      !Number.isFinite(duration)
    )
      return;
    const start = Date.now();
    const timer = setTimeout(() => onDismiss(item.id), remaining.current);
    return () => {
      remaining.current = Math.max(0, remaining.current - (Date.now() - start));
      clearTimeout(timer);
    };
  }, [
    expanded,
    documentHidden,
    duration,
    item,
    item.id,
    item.leaving,
    onDismiss,
  ]);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    const measure = () => onHeight(item.id, node.offsetHeight);
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [item.id, onHeight]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLLIElement>) => {
    if (
      event.button !== 0 ||
      (event.target instanceof Element &&
        event.target.closest("button, a, input, select, textarea"))
    )
      return;
    pointerStart.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLLIElement>) => {
    const start = pointerStart.current;
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
      setDragging(true);
      dragRef.current = dx;
      setDrag(dx);
    }
  };

  const handlePointerEnd = (event: ReactPointerEvent<HTMLLIElement>) => {
    const start = pointerStart.current;
    if (!start || start.id !== event.pointerId) return;
    pointerStart.current = null;
    if (Math.abs(dragRef.current) >= 65) onDismiss(item.id);
    dragRef.current = 0;
    setDrag(0);
    setDragging(false);
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const variant = item.variant ?? "info";
  const isBehind = index > 0 && !expanded;
  const hidden = isBehind || Boolean(item.leaving);

  return (
    <li
      aria-atomic="true"
      aria-hidden={hidden || undefined}
      className="marisma-toast-item pointer-events-auto absolute bottom-0 right-0 w-full"
      data-dragging={dragging}
      data-leaving={item.leaving || undefined}
      data-variant={variant}
      inert={hidden}
      onPointerCancel={handlePointerEnd}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      ref={nodeRef}
      role={variant === "danger" ? "alert" : "status"}
      style={
        {
          "--marisma-toast-index": index,
          "--marisma-toast-offset": `${offset}px`,
        } as CSSProperties
      }
    >
      <div
        className="marisma-toast-swipe"
        style={{
          transform: `translate3d(${drag}px, 0, 0)`,
          opacity: dragging ? Math.max(0.45, 1 - Math.abs(drag) / 300) : 1,
          transition: dragging ? "none" : undefined,
        }}
      >
        <div className="marisma-toast-surface flex min-h-18 items-start gap-3 rounded-mar-control border border-mar-surface-border bg-mar-card p-3 text-mar-text shadow-mar-overlay forced-colors:border-current">
          <span aria-hidden="true" className={iconVariants({ variant })}>
            {variant === "success"
              ? "✓"
              : variant === "warning"
                ? "!"
                : variant === "danger"
                  ? "×"
                  : "i"}
          </span>
          <div className="min-w-0 flex-1 pt-0.5">
            <p className="text-sm font-semibold leading-5">{item.title}</p>
            {item.description ? (
              <div className="mt-1 text-sm leading-5 text-mar-muted">
                {item.description}
              </div>
            ) : null}
            {item.action ? <div className="mt-3">{item.action}</div> : null}
          </div>
          <button
            aria-label="Dismiss notification"
            className="marisma-motion-control -mr-1 -mt-1 inline-flex size-8 shrink-0 items-center justify-center rounded-mar-control text-lg text-mar-muted hover:bg-mar-hover hover:text-mar-text"
            onClick={() => onDismiss(item.id)}
            type="button"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
      </div>
    </li>
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
        "marisma-motion-control inline-flex min-h-9 items-center justify-center rounded-mar-control border border-mar-input-border bg-mar-card px-3 py-1.5 text-xs font-semibold text-mar-text hover:bg-mar-hover",
        className,
      )}
      type={type}
      {...props}
    />
  );
}
