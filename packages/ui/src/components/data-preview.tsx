"use client";

import { useMemo, useState, type ComponentPropsWithRef } from "react";
import { Button } from "./button";
import { cn } from "../lib/cn";

const MAX_PREVIEW_CHARACTERS = 100_000;

export type DataPreviewProps = Omit<
  ComponentPropsWithRef<"section">,
  "children"
> & {
  data: unknown;
  label?: string;
  /** Hard cap applied before any expanded view is rendered. */
  maxCharacters?: number;
  collapsedCharacters?: number;
  defaultExpanded?: boolean;
};

function serializeData(data: unknown) {
  if (typeof data === "string") return data;

  try {
    const seen = new WeakSet<object>();
    const serialized = JSON.stringify(
      data,
      (_key, value: unknown) => {
        if (typeof value === "bigint") return `${String(value)}n`;
        if (typeof value === "object" && value !== null) {
          if (seen.has(value)) return "[Circular]";
          seen.add(value);
        }
        return value;
      },
      2,
    );
    return serialized ?? String(data);
  } catch (error) {
    return `[Unable to serialize data: ${error instanceof Error ? error.message : "unknown error"}]`;
  }
}

export function DataPreview({
  className,
  collapsedCharacters = 1_500,
  data,
  defaultExpanded = false,
  label = "Data preview",
  maxCharacters = 20_000,
  ...props
}: DataPreviewProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const serialized = useMemo(() => serializeData(data), [data]);
  const resolvedMax = Math.min(
    MAX_PREVIEW_CHARACTERS,
    Math.max(
      1,
      Number.isFinite(maxCharacters) ? Math.floor(maxCharacters) : 20_000,
    ),
  );
  const resolvedCollapsed = Math.min(
    resolvedMax,
    Math.max(
      1,
      Number.isFinite(collapsedCharacters)
        ? Math.floor(collapsedCharacters)
        : 1_500,
    ),
  );
  const capped = serialized.slice(0, resolvedMax);
  const limited = serialized.length > capped.length;
  const collapsible = capped.length > resolvedCollapsed;
  const visible = expanded ? capped : capped.slice(0, resolvedCollapsed);

  return (
    <section
      aria-label={label}
      className={cn(
        "overflow-hidden rounded-xl border border-mar-border bg-mar-card font-mar-sans text-mar-text",
        className,
      )}
      {...props}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-mar-border px-4 py-3">
        <p className="font-semibold">{label}</p>
        {collapsible ? (
          <Button
            aria-expanded={expanded}
            onClick={() => setExpanded((current) => !current)}
            size="small"
            type="button"
            variant="secondary"
          >
            {expanded ? "Show less" : "Show more"}
          </Button>
        ) : null}
      </div>
      <pre
        className="max-h-96 overflow-auto whitespace-pre-wrap break-words p-4 text-sm"
        tabIndex={0}
      >
        <code>
          {visible}
          {!expanded && collapsible ? "…" : ""}
        </code>
      </pre>
      {limited ? (
        <p className="border-t border-mar-border px-4 py-3 text-sm text-mar-muted">
          Previewing {capped.length.toLocaleString()} of{" "}
          {serialized.length.toLocaleString()} characters.
        </p>
      ) : null}
    </section>
  );
}
