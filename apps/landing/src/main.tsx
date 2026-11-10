import React, { useState } from "react";
import { createRoot } from "react-dom/client";
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
import "./styles.css";

function Landing() {
  const [name, setName] = useState("Marisma");

  return (
    <main
      className="min-h-screen bg-mar-surface p-6 font-mar-sans text-mar-text sm:p-10"
      data-marisma-accent="reedwater"
      data-marisma-mode="light"
    >
      <div className="mx-auto grid max-w-5xl gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <section>
          <div className="mb-5 flex items-center gap-3">
            <img
              alt=""
              aria-hidden="true"
              className="size-11 shrink-0"
              src={`${import.meta.env.BASE_URL}marisma-leaf.svg`}
            />
            <p className="text-sm font-semibold uppercase tracking-widest text-mar-muted">
              Marisma
            </p>
          </div>
          <h1 className="text-5xl font-semibold tracking-tight">
            Components for calm, capable interfaces.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-mar-muted">
            The current prerelease implements Button, Input, and Dialog for
            React 19 and Tailwind CSS 4. The package remains private and is not
            published to npm.
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-mar-muted">
            Evaluate the checked-out package through Storybook or the
            tarball-installed Vite and Next.js fixtures in this repository. The
            broader non-chart catalog is still in development.
          </p>
        </section>

        <section className="grid gap-5 rounded-2xl border border-mar-border bg-mar-card p-6 shadow-2xl sm:p-8">
          <Input
            description="A controlled input from the package public API."
            label="Library name"
            onChange={(event) => setName(event.currentTarget.value)}
            value={name}
          />
          <div className="flex flex-wrap gap-3">
            <Button type="button">Review {name}</Button>
            <Dialog>
              <DialogTrigger variant="secondary">Open details</DialogTrigger>
              <DialogContent>
                <DialogTitle>Current component set</DialogTitle>
                <DialogDescription>
                  Button, Input, and Dialog are implemented; additional
                  component families are not yet available.
                </DialogDescription>
                <DialogClose>Done</DialogClose>
              </DialogContent>
            </Dialog>
          </div>
        </section>
      </div>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Landing />
  </React.StrictMode>,
);
