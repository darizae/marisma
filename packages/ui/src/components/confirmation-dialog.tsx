"use client";

import { useState, type ReactNode } from "react";
import { Button } from "./button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

export type ConfirmationCancelReason = "cancel" | "escape";

export type ConfirmationDialogProps = {
  trigger: ReactNode;
  title: ReactNode;
  description: ReactNode;
  confirmLabel?: ReactNode;
  cancelLabel?: ReactNode;
  pendingLabel?: ReactNode;
  pending?: boolean;
  /** Close after a synchronous confirm. Set false when the caller keeps it open for pending work. */
  closeOnConfirm?: boolean;
  disabled?: boolean;
  destructive?: boolean;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onConfirm: () => void;
  onCancel?: (reason: ConfirmationCancelReason) => void;
};

export function ConfirmationDialog({
  cancelLabel = "Cancel",
  closeOnConfirm = true,
  confirmLabel = "Confirm",
  defaultOpen = false,
  description,
  destructive = false,
  disabled = false,
  onCancel,
  onConfirm,
  onOpenChange,
  open,
  pending = false,
  pendingLabel = "Working…",
  title,
  trigger,
}: ConfirmationDialogProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const resolvedOpen = open ?? internalOpen;

  const setOpen = (nextOpen: boolean) => {
    if (!nextOpen && pending) return;
    if (open === undefined) setInternalOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  const cancel = (reason: ConfirmationCancelReason) => {
    if (pending) return;
    onCancel?.(reason);
    setOpen(false);
  };

  return (
    <Dialog onOpenChange={setOpen} open={resolvedOpen}>
      <DialogTrigger disabled={disabled}>{trigger}</DialogTrigger>
      <DialogContent
        aria-busy={pending || undefined}
        onEscapeKeyDown={(event) => {
          if (pending) {
            event.preventDefault();
            return;
          }
          onCancel?.("escape");
        }}
        onInteractOutside={(event) => event.preventDefault()}
        showCloseButton={false}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
        <div className="flex flex-wrap justify-end gap-3 pt-2">
          <Button
            disabled={pending}
            onClick={() => cancel("cancel")}
            type="button"
            variant="secondary"
          >
            {cancelLabel}
          </Button>
          <Button
            className={
              destructive
                ? "border border-mar-danger bg-mar-danger-surface text-mar-danger hover:bg-mar-danger-surface"
                : undefined
            }
            loading={pending}
            onClick={() => {
              onConfirm();
              if (closeOnConfirm) setOpen(false);
            }}
            type="button"
          >
            {pending ? pendingLabel : confirmLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
