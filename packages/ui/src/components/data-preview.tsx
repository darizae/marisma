"use client";

import { useMemo, useState, type ComponentPropsWithRef } from "react";
import { Button } from "./button";
import { cn } from "../lib/cn";

const MAX_PREVIEW_CHARACTERS = 100_000;
const MAX_SERIALIZATION_DEPTH = 50;

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

function serializeData(data: unknown, maxCharacters: number) {
  let text = "";
  let truncated = false;
  const active = new Set<object>();

  const write = (chunk: string) => {
    const remaining = maxCharacters - text.length;
    if (remaining <= 0) {
      truncated = true;
      return false;
    }
    if (chunk.length > remaining) {
      text += chunk.slice(0, remaining);
      truncated = true;
      return false;
    }
    text += chunk;
    return true;
  };

  const writeValue = (value: unknown, depth: number): void => {
    if (truncated) return;
    const indent = "  ".repeat(depth);

    if (depth > MAX_SERIALIZATION_DEPTH) {
      write("[Max depth]");
      return;
    }
    if (value === null) {
      write("null");
      return;
    }
    switch (typeof value) {
      case "string":
        write(JSON.stringify(value));
        return;
      case "number":
      case "boolean":
        write(String(value));
        return;
      case "bigint":
        write(JSON.stringify(`${String(value)}n`));
        return;
      case "undefined":
        write("undefined");
        return;
      case "symbol":
      case "function":
        write(String(value));
        return;
      default:
        break;
    }

    if (active.has(value)) {
      write("[Circular]");
      return;
    }

    active.add(value);
    try {
      if (Array.isArray(value)) {
        write("[");
        let first = true;
        for (let index = 0; index < value.length && !truncated; index += 1) {
          if (first) write("\n");
          else write(",\n");
          write(`${"  ".repeat(depth + 1)}`);
          writeValue(value[index], depth + 1);
          first = false;
        }
        if (!truncated) {
          if (!first) write(`\n${indent}`);
          write("]");
        }
        return;
      }

      write("{");
      const record = value as Record<string, unknown>;
      let first = true;
      for (const key in record) {
        if (!Object.prototype.hasOwnProperty.call(record, key)) continue;
        if (first) write("\n");
        else write(",\n");
        write(`${"  ".repeat(depth + 1)}${JSON.stringify(key)}: `);
        writeValue(record[key], depth + 1);
        first = false;
        if (truncated) break;
      }
      if (!truncated) {
        if (!first) write(`\n${indent}`);
        write("}");
      }
    } catch (error) {
      write(
        `[Unable to serialize data: ${error instanceof Error ? error.message : "unknown error"}]`,
      );
    } finally {
      active.delete(value);
    }
  };

  if (typeof data === "string") {
    write(data);
  } else {
    writeValue(data, 0);
  }

  return { text, truncated };
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
  const resolvedMax = Math.min(
    MAX_PREVIEW_CHARACTERS,
    Math.max(
      1,
      Number.isFinite(maxCharacters) ? Math.floor(maxCharacters) : 20_000,
    ),
  );
  const serialized = useMemo(
    () => serializeData(data, resolvedMax),
    [data, resolvedMax],
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
  const capped = serialized.text;
  const limited = serialized.truncated;
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
          {capped.length.toLocaleString()}+ characters.
        </p>
      ) : null}
    </section>
  );
}
