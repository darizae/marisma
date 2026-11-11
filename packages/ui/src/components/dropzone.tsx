"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type DragEvent,
  type ReactNode,
} from "react";
import { Button } from "./button";
import { cn } from "../lib/cn";

export type DropzoneRejectionReason = "count" | "duplicate" | "size" | "type";

export type DropzoneRejection = {
  file: File;
  reason: DropzoneRejectionReason;
  message: string;
};

export type DropzoneProps = Omit<
  ComponentPropsWithoutRef<"input">,
  "children" | "onChange" | "type" | "value"
> & {
  label: ReactNode;
  description?: ReactNode;
  files?: readonly File[];
  defaultFiles?: readonly File[];
  maxFiles?: number;
  maxSize?: number;
  onFilesChange?: (files: File[]) => void;
  onRejectedFiles?: (rejections: DropzoneRejection[]) => void;
  clearLabel?: string;
  idleMessage?: ReactNode;
  activeMessage?: ReactNode;
  className?: string;
};

const EMPTY_FILES: readonly File[] = [];

function fileKey(file: File) {
  return `${file.name}:${file.size}:${file.type}:${file.lastModified}`;
}

function acceptsFile(file: File, accept?: string) {
  if (!accept?.trim()) return true;
  const fileName = file.name.toLowerCase();
  const fileType = file.type.toLowerCase();

  return accept.split(",").some((rawToken) => {
    const token = rawToken.trim().toLowerCase();
    if (!token) return false;
    if (token.startsWith(".")) return fileName.endsWith(token);
    if (token.endsWith("/*")) return fileType.startsWith(token.slice(0, -1));
    return fileType === token;
  });
}

export function Dropzone({
  accept,
  activeMessage = "Drop files here",
  className,
  clearLabel = "Clear files",
  defaultFiles = EMPTY_FILES,
  description,
  disabled = false,
  files,
  id,
  idleMessage = "Choose files or drag and drop them here.",
  label,
  maxFiles = 1,
  maxSize = Number.POSITIVE_INFINITY,
  multiple = false,
  onFilesChange,
  onRejectedFiles,
  ...props
}: DropzoneProps) {
  const generatedId = useId();
  const inputId = id ?? `marisma-dropzone-${generatedId}`;
  const descriptionId = `${inputId}-description`;
  const feedbackId = `${inputId}-feedback`;
  const inputRef = useRef<HTMLInputElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const dragDepth = useRef(0);
  const [internalFiles, setInternalFiles] = useState<File[]>([...defaultFiles]);
  const [rejections, setRejections] = useState<DropzoneRejection[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const resolvedFiles = files ? [...files] : internalFiles;

  const setFiles = (nextFiles: File[]) => {
    if (files === undefined) setInternalFiles(nextFiles);
    onFilesChange?.(nextFiles);
  };

  const clear = () => {
    setFiles([]);
    setRejections([]);
    if (inputRef.current) inputRef.current.value = "";
  };

  useEffect(() => {
    const form = surfaceRef.current?.closest("form");
    if (!form) return;
    const reset = () => {
      const resetFiles = [...defaultFiles];
      if (files === undefined) setInternalFiles(resetFiles);
      onFilesChange?.(resetFiles);
      setRejections([]);
      if (inputRef.current) inputRef.current.value = "";
    };
    form.addEventListener("reset", reset);
    return () => form.removeEventListener("reset", reset);
  }, [defaultFiles, files, onFilesChange]);

  const processFiles = (incoming: readonly File[]) => {
    if (disabled) return;
    const nextFiles = [...resolvedFiles];
    const seen = new Set(nextFiles.map(fileKey));
    const nextRejections: DropzoneRejection[] = [];

    for (const file of incoming) {
      const key = fileKey(file);
      if (seen.has(key)) {
        nextRejections.push({
          file,
          reason: "duplicate",
          message: `${file.name} is already selected.`,
        });
      } else if (!acceptsFile(file, accept)) {
        nextRejections.push({
          file,
          reason: "type",
          message: `${file.name} is not an accepted file type.`,
        });
      } else if (file.size > maxSize) {
        nextRejections.push({
          file,
          reason: "size",
          message: `${file.name} exceeds the size limit.`,
        });
      } else if (
        nextFiles.length >= maxFiles ||
        (!multiple && nextFiles.length >= 1)
      ) {
        nextRejections.push({
          file,
          reason: "count",
          message: `${file.name} exceeds the file count limit.`,
        });
      } else {
        nextFiles.push(file);
        seen.add(key);
      }
    }

    if (nextFiles.length !== resolvedFiles.length) setFiles(nextFiles);
    setRejections(nextRejections);
    if (nextRejections.length > 0) onRejectedFiles?.(nextRejections);
  };

  const preventFileDrag = (event: DragEvent<HTMLDivElement>) => {
    if (!event.dataTransfer.types.includes("Files")) return false;
    event.preventDefault();
    return true;
  };

  return (
    <div
      className={cn("grid gap-3 font-mar-sans text-mar-text", className)}
      ref={surfaceRef}
    >
      <div
        className={cn(
          "grid min-h-40 place-items-center rounded-xl border-2 border-dashed border-mar-border bg-mar-card p-6 text-center transition-colors duration-[var(--marisma-duration-fast)]",
          dragActive && "border-mar-primary bg-mar-surface",
          disabled && "cursor-not-allowed opacity-60",
        )}
        data-testid="dropzone-surface"
        onDragEnter={(event) => {
          if (!preventFileDrag(event) || disabled) return;
          dragDepth.current += 1;
          setDragActive(true);
        }}
        onDragLeave={(event) => {
          if (!preventFileDrag(event) || disabled) return;
          dragDepth.current = Math.max(0, dragDepth.current - 1);
          if (dragDepth.current === 0) setDragActive(false);
        }}
        onDragOver={(event) => {
          if (preventFileDrag(event) && !disabled)
            event.dataTransfer.dropEffect = "copy";
        }}
        onDrop={(event) => {
          if (!preventFileDrag(event) || disabled) return;
          dragDepth.current = 0;
          setDragActive(false);
          processFiles(Array.from(event.dataTransfer.files));
        }}
      >
        <div className="grid justify-items-center gap-2">
          <label
            className="font-semibold text-mar-primary underline underline-offset-2"
            htmlFor={inputId}
          >
            {label}
          </label>
          <input
            accept={accept}
            aria-describedby={[
              description ? descriptionId : undefined,
              feedbackId,
            ]
              .filter(Boolean)
              .join(" ")}
            className="block max-w-full text-sm text-mar-muted file:mr-3 file:min-h-10 file:rounded-lg file:border file:border-mar-border file:bg-mar-surface file:px-3 file:py-1.5 file:font-semibold file:text-mar-text"
            disabled={disabled}
            id={inputId}
            multiple={multiple}
            onChange={(event) =>
              processFiles(Array.from(event.currentTarget.files ?? []))
            }
            onClick={(event) => {
              event.currentTarget.value = "";
            }}
            ref={inputRef}
            type="file"
            {...props}
          />
          <p className="text-sm text-mar-muted" id={feedbackId}>
            {dragActive ? activeMessage : idleMessage}
          </p>
          {description ? (
            <p className="text-sm text-mar-muted" id={descriptionId}>
              {description}
            </p>
          ) : null}
        </div>
      </div>

      {resolvedFiles.length > 0 ? (
        <div className="grid gap-2">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold">
              {resolvedFiles.length}{" "}
              {resolvedFiles.length === 1 ? "file" : "files"} selected
            </p>
            <Button
              disabled={disabled}
              onClick={clear}
              size="small"
              type="button"
              variant="secondary"
            >
              {clearLabel}
            </Button>
          </div>
          <ul className="grid gap-1 text-sm text-mar-muted">
            {resolvedFiles.map((file) => (
              <li className="truncate" key={fileKey(file)}>
                {file.name}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {rejections.length > 0 ? (
        <div
          className="rounded-lg border border-mar-danger bg-mar-danger-surface p-3 text-sm text-mar-danger"
          role="alert"
        >
          <p className="font-semibold">
            {rejections.length}{" "}
            {rejections.length === 1 ? "file was" : "files were"} rejected.
          </p>
          <ul className="mt-1 list-disc pl-5">
            {rejections.map((rejection) => (
              <li key={`${fileKey(rejection.file)}-${rejection.reason}`}>
                {rejection.message}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
