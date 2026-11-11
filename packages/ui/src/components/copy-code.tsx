"use client";

import { useEffect, useRef, useState, type ComponentPropsWithRef } from "react";
import { Button } from "./button";
import { cn } from "../lib/cn";

type CopyState = "idle" | "copying" | "success" | "error";

export type CopyCodeProps = Omit<ComponentPropsWithRef<"div">, "children"> & {
  code: string;
  copyLabel?: string;
  errorMessage?: string;
  language?: string;
  onCopyError?: (error: unknown) => void;
  onCopySuccess?: () => void;
  resetAfter?: number;
  successMessage?: string;
};

export function CopyCode({
  className,
  code,
  copyLabel = "Copy code",
  errorMessage = "Could not copy. Select the code and copy it manually.",
  language,
  onCopyError,
  onCopySuccess,
  resetAfter = 2400,
  successMessage = "Copied to clipboard.",
  ...props
}: CopyCodeProps) {
  const [state, setState] = useState<CopyState>("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  async function copy() {
    clearTimeout(resetTimer.current);
    setState("copying");

    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard API is unavailable");
      }
      await navigator.clipboard.writeText(code);
      setState("success");
      onCopySuccess?.();
    } catch (error) {
      setState("error");
      onCopyError?.(error);
    }

    if (resetAfter > 0) {
      resetTimer.current = setTimeout(() => setState("idle"), resetAfter);
    }
  }

  const message =
    state === "success"
      ? successMessage
      : state === "error"
        ? errorMessage
        : "";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-mar-border bg-mar-card font-mar-sans text-mar-text",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-between gap-3 border-b border-mar-border px-3 py-2">
        <span className="text-xs font-semibold text-mar-muted">
          {language ?? "Code"}
        </span>
        <Button
          aria-label={copyLabel}
          loading={state === "copying"}
          onClick={copy}
          size="small"
          type="button"
          variant="secondary"
        >
          {state === "success" ? "Copied" : "Copy"}
        </Button>
      </div>
      <pre className="max-w-full overflow-auto p-4 text-sm" tabIndex={0}>
        <code>{code}</code>
      </pre>
      <p
        aria-atomic="true"
        className={cn(
          "min-h-6 px-4 pb-3 text-sm",
          state === "error" ? "text-mar-danger" : "text-mar-success",
        )}
        role={state === "error" ? "alert" : "status"}
      >
        {message}
      </p>
    </div>
  );
}
