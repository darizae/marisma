"use client";

import { useState } from "react";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  Input,
} from "@darizae/marisma";

export function MarismaExample() {
  const [name, setName] = useState("Marisma");
  const [status, setStatus] = useState("No changes saved");

  return (
    <section className="grid w-full max-w-lg gap-5 rounded-xl border border-mar-border bg-mar-card p-6">
      <Input
        description="This value is controlled by your application."
        label="Project name"
        onChange={(event) => setName(event.currentTarget.value)}
        value={name}
      />
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => setStatus(`Saved ${name}`)} type="button">
          Save changes
        </Button>
        <Dialog>
          <DialogTrigger variant="secondary">Open details</DialogTrigger>
          <DialogContent>
            <DialogTitle>Project details</DialogTitle>
            <DialogDescription>
              Dialogs keep focus contained until they close.
            </DialogDescription>
            <DialogClose>Done</DialogClose>
          </DialogContent>
        </Dialog>
      </div>
      <p aria-live="polite" className="text-sm text-mar-muted">
        {status}
      </p>
    </section>
  );
}
