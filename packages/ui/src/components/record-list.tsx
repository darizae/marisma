import type { ComponentPropsWithRef, Key, ReactNode } from "react";
import { cn } from "../lib/cn";

export type RecordListProps<RecordType> = Omit<
  ComponentPropsWithRef<"section">,
  "children"
> & {
  /** Records stay caller-owned; this component does not fetch, filter, or sort. */
  records: readonly RecordType[];
  getKey: (record: RecordType, index: number) => Key;
  renderRecord: (record: RecordType, index: number) => ReactNode;
  label: string;
  loading?: boolean;
  loadingState?: ReactNode;
  error?: ReactNode;
  emptyState?: ReactNode;
  listClassName?: string;
};

export function RecordList<RecordType>({
  className,
  emptyState = "No records to show",
  error,
  getKey,
  label,
  listClassName,
  loading = false,
  loadingState = "Loading records…",
  records,
  renderRecord,
  ...props
}: RecordListProps<RecordType>) {
  let content: ReactNode;

  if (loading) {
    content = (
      <div
        className="rounded-xl border border-mar-border bg-mar-card p-6 text-mar-muted"
        role="status"
      >
        {loadingState}
      </div>
    );
  } else if (error !== undefined && error !== null) {
    content = (
      <div
        className="rounded-xl border border-mar-danger bg-mar-danger-surface p-6 text-mar-danger"
        role="alert"
      >
        {error}
      </div>
    );
  } else if (records.length === 0) {
    content = (
      <div
        className="rounded-xl border border-dashed border-mar-border bg-mar-card p-8 text-center text-mar-muted"
        role="status"
      >
        {emptyState}
      </div>
    );
  } else {
    content = (
      <ul className={cn("grid gap-3", listClassName)}>
        {records.map((record, index) => (
          <li
            className="[contain-intrinsic-size:auto_5rem] [content-visibility:auto]"
            key={getKey(record, index)}
          >
            {renderRecord(record, index)}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section
      aria-busy={loading || undefined}
      aria-label={label}
      className={cn("font-mar-sans text-mar-text", className)}
      {...props}
    >
      {content}
    </section>
  );
}

export type RecordListItemProps = ComponentPropsWithRef<"article"> & {
  title: ReactNode;
  description?: ReactNode;
  meta?: ReactNode;
  actions?: ReactNode;
};

export function RecordListItem({
  actions,
  children,
  className,
  description,
  meta,
  title,
  ...props
}: RecordListItemProps) {
  return (
    <article
      className={cn(
        "grid gap-3 rounded-xl border border-mar-border bg-mar-card p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center",
        className,
      )}
      {...props}
    >
      <div className="min-w-0">
        <h3 className="truncate font-semibold">{title}</h3>
        {description !== undefined && description !== null ? (
          <p className="mt-1 line-clamp-2 text-sm text-mar-muted">
            {description}
          </p>
        ) : null}
        {children !== undefined && children !== null ? (
          <div className="mt-2 min-w-0 text-sm">{children}</div>
        ) : null}
        {meta !== undefined && meta !== null ? (
          <div className="mt-2 text-xs text-mar-muted">{meta}</div>
        ) : null}
      </div>
      {actions !== undefined && actions !== null ? (
        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          {actions}
        </div>
      ) : null}
    </article>
  );
}
