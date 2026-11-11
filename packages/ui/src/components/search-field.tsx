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

export type SearchFieldProps = {
  label: ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onSearch: (query: string) => void;
  onClear?: () => void;
  allowEmpty?: boolean;
  trimQuery?: boolean;
  clearLabel?: string;
  submitLabel?: string;
  description?: ReactNode;
  error?: ReactNode;
  placeholder?: string;
  name?: string;
  id?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
};

export function SearchField({
  allowEmpty = false,
  className,
  clearLabel = "Clear search",
  defaultValue = "",
  description,
  disabled = false,
  error,
  id,
  label,
  name,
  onClear,
  onSearch,
  onValueChange,
  placeholder = "Search",
  required = false,
  submitLabel = "Search",
  trimQuery = true,
  value,
}: SearchFieldProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const resolvedValue = value ?? internalValue;
  const normalizedQuery = trimQuery ? resolvedValue.trim() : resolvedValue;
  const canSearch = allowEmpty || normalizedQuery.length > 0;

  useEffect(() => {
    const form = containerRef.current?.closest("form");
    if (!form) return;
    const reset = () => {
      if (value === undefined) setInternalValue(defaultValue);
      onValueChange?.(defaultValue);
    };
    form.addEventListener("reset", reset);
    return () => form.removeEventListener("reset", reset);
  }, [defaultValue, onValueChange, value]);

  const changeValue = (nextValue: string) => {
    if (value === undefined) setInternalValue(nextValue);
    onValueChange?.(nextValue);
  };

  const submit = () => {
    if (disabled || !canSearch) return;
    onSearch(normalizedQuery);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.nativeEvent.isComposing) {
      event.preventDefault();
      submit();
    }
  };

  return (
    <div
      className={cn("grid gap-2", className)}
      ref={containerRef}
      role="search"
    >
      <Input
        description={description}
        disabled={disabled}
        error={error}
        id={id}
        label={label}
        name={name}
        onChange={(event) => changeValue(event.currentTarget.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        ref={inputRef}
        required={required}
        type="search"
        value={resolvedValue}
      />
      <div className="flex flex-wrap justify-end gap-2">
        <Button
          disabled={disabled || resolvedValue.length === 0}
          onClick={() => {
            changeValue("");
            onClear?.();
            inputRef.current?.focus();
          }}
          size="small"
          type="button"
          variant="secondary"
        >
          {clearLabel}
        </Button>
        <Button
          disabled={disabled || !canSearch}
          onClick={submit}
          size="small"
          type="button"
        >
          {submitLabel}
        </Button>
      </div>
    </div>
  );
}
