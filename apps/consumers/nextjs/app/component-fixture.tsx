"use client";

import { useState } from "react";
import {
  Button,
  Checkbox,
  DateField,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  Input,
  Select,
} from "@darizae/marisma";

export function ComponentFixture() {
  const [name, setName] = useState("Marisma");
  const [status, setStatus] = useState("Waiting for interaction");

  return (
    <section className="grid gap-5 rounded-xl border border-mar-border bg-mar-card p-6">
      <Input
        description="This controlled value is hydrated by the Next.js client."
        label="Library name"
        onChange={(event) => setName(event.currentTarget.value)}
        value={name}
      />
      <Button onClick={() => setStatus(`Hydrated ${name}`)}>
        Confirm hydration
      </Button>
      <Checkbox defaultChecked label="Hydrated checkbox" />
      <Select
        defaultValue="reedwater"
        label="Hydrated select"
        options={[
          { label: "Reedwater", value: "reedwater" },
          { label: "Tidal Blue", value: "tidal-blue" },
        ]}
      />
      <DateField
        defaultValue="2026-11-11"
        label="Hydrated date"
        locale="en-GB"
        timeZone="Europe/Madrid"
        weekStartsOn={1}
      />
      <p aria-live="polite" className="text-sm text-mar-muted">
        {status}
      </p>
      <Dialog>
        <DialogTrigger variant="secondary">Open details</DialogTrigger>
        <DialogContent>
          <DialogTitle>Hydrated dialog</DialogTitle>
          <DialogDescription>
            This modal is rendered by the packaged interactive component.
          </DialogDescription>
          <DialogClose>Done</DialogClose>
        </DialogContent>
      </Dialog>
    </section>
  );
}
