"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { Button } from "./button";
import { Input } from "./input";
import { cn } from "../lib/cn";

export type InlineEditProps = {
  label: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onSave?: (value: string) => void | Promise<void>;
  onSaveError?: (error: unknown) => void;
  onCancel?: () => void;
  pending?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  name?: string;
  description?: ReactNode;
  error?: ReactNode;
  placeholder?: string;
  editLabel?: string;
  saveLabel?: string;
  cancelLabel?: string;
  className?: string;
};

export function InlineEdit({
  cancelLabel = "Cancel",
  className,
  defaultValue = "",
  description,
  disabled = false,
  editLabel,
  error,
  label,
  name,
  onCancel,
  onSave,
  onSaveError,
  onValueChange,
  pending = false,
  placeholder,
  readOnly = false,
  required = false,
  saveLabel = "Save",
  value,
}: InlineEditProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [draft, setDraft] = useState(value ?? defaultValue);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<ReactNode>();
  const inputRef = useRef<HTMLInputElement>(null);
  const editRef = useRef<HTMLButtonElement>(null);
  const hasMounted = useRef(false);
  const resolvedValue = value ?? internalValue;
  const busy = pending || saving;

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    if (editing) inputRef.current?.focus();
    else editRef.current?.focus();
  }, [editing]);

  const beginEditing = () => {
    setDraft(resolvedValue);
    setSaveError(undefined);
    setEditing(true);
  };

  const cancel = () => {
    if (busy) return;
    setDraft(resolvedValue);
    setEditing(false);
    onCancel?.();
  };

  const save = async () => {
    if (busy || (required && draft.trim() === "")) return;
    setSaveError(undefined);
    setSaving(true);
    try {
      await onSave?.(draft);
      if (value === undefined) setInternalValue(draft);
      onValueChange?.(draft);
      setEditing(false);
    } catch (error) {
      setSaveError("Unable to save changes. Please try again.");
      onSaveError?.(error);
    } finally {
      setSaving(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      cancel();
    } else if (event.key === "Enter" && !event.nativeEvent.isComposing) {
      event.preventDefault();
      void save();
    }
  };

  return (
    <div className={cn("grid gap-2 font-mar-sans text-mar-text", className)}>
      {editing ? (
        <>
          <Input
            description={description}
            disabled={disabled}
            error={saveError ?? error}
            label={label}
            onChange={(event) => setDraft(event.currentTarget.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            readOnly={readOnly}
            ref={inputRef}
            required={required}
            value={draft}
          />
          <div className="flex flex-wrap justify-end gap-2">
            <Button
              disabled={busy}
              onClick={cancel}
              size="small"
              type="button"
              variant="secondary"
            >
              {cancelLabel}
            </Button>
            <Button
              disabled={required && draft.trim() === ""}
              loading={busy}
              onClick={() => void save()}
              size="small"
              type="button"
            >
              {saveLabel}
            </Button>
          </div>
        </>
      ) : (
        <div className="flex min-h-11 items-center justify-between gap-3 rounded-lg border border-mar-border bg-mar-card px-3 py-2">
          <div className="min-w-0">
            <p className="text-sm font-semibold">{label}</p>
            <p className="truncate text-base">
              {resolvedValue || placeholder || "—"}
            </p>
          </div>
          {readOnly ? null : (
            <Button
              disabled={disabled}
              onClick={beginEditing}
              ref={editRef}
              size="small"
              type="button"
              variant="secondary"
            >
              {editLabel ?? `Edit ${label}`}
            </Button>
          )}
        </div>
      )}
      {name ? <input name={name} type="hidden" value={resolvedValue} /> : null}
    </div>
  );
}
