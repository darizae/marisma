import React, { useState } from "react";
import { createRoot } from "react-dom/client";
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
  SearchField,
  Select,
} from "@darizae/marisma";
import "./styles.css";

const themes = [
  { accent: "reedwater", mode: "light", label: "Reedwater light" },
  { accent: "reedwater", mode: "dark", label: "Reedwater dark" },
  { accent: "tidal-blue", mode: "light", label: "Tidal Blue light" },
  { accent: "tidal-blue", mode: "dark", label: "Tidal Blue dark" },
] as const;

type Theme = (typeof themes)[number];

function ConsumerScaffold() {
  const [theme, setTheme] = useState<Theme>(themes[0]);
  const [searchStatus, setSearchStatus] = useState("No search submitted");
  const nestedAccent =
    theme.accent === "reedwater" ? "tidal-blue" : "reedwater";
  const nestedMode = theme.mode === "light" ? "dark" : "light";

  return (
    <main className="min-h-screen bg-mar-surface p-6 font-mar-sans text-mar-text sm:p-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-2xl font-semibold">Marisma theme fixture</h1>
        <p className="mt-2 max-w-2xl text-mar-muted">
          Switch the live scope to review semantic tokens. The nested card
          intentionally uses the opposite accent and mode to verify local theme
          isolation.
        </p>

        <div
          aria-label="Theme"
          className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          role="group"
        >
          {themes.map((option) => {
            const selected =
              option.accent === theme.accent && option.mode === theme.mode;

            return (
              <button
                aria-pressed={selected}
                className="min-h-10 rounded-lg border border-mar-border bg-mar-card px-4 py-2 text-mar-text hover:bg-mar-surface"
                key={option.label}
                onClick={() => setTheme(option)}
                type="button"
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <section
          className="mt-8 rounded-2xl border border-mar-border bg-mar-surface p-6 text-mar-text transition-colors duration-[var(--marisma-duration-slow)] sm:p-8"
          data-marisma-accent={theme.accent}
          data-marisma-mode={theme.mode}
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-mar-muted">
            Live scope
          </p>
          <h2 className="mt-3 text-2xl font-semibold">{theme.label}</h2>
          <p className="mt-3 max-w-xl text-mar-muted">
            Body and muted text, card boundaries, primary actions, and keyboard
            focus all resolve from semantic Marisma tokens.
          </p>
          <div className="mt-6 grid max-w-md gap-4">
            <Input
              defaultValue="Marisma"
              description="A native uncontrolled input from the public package."
              label="Library name"
            />
            <Checkbox defaultChecked label="Include archived records" />
            <Select
              defaultValue="reedwater"
              label="Consumer accent"
              options={[
                { label: "Reedwater", value: "reedwater" },
                { label: "Tidal Blue", value: "tidal-blue" },
              ]}
            />
            <DateField
              defaultValue="2026-11-11"
              label="Consumer date"
              locale="en-GB"
              timeZone="Europe/Madrid"
              weekStartsOn={1}
            />
            <SearchField
              label="Consumer search"
              onSearch={(query) => setSearchStatus(`Searching for ${query}`)}
            />
            <p aria-live="polite" className="text-sm text-mar-muted">
              {searchStatus}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button type="button">Focus this action</Button>
              <Dialog>
                <DialogTrigger variant="secondary">Open details</DialogTrigger>
                <DialogContent>
                  <DialogTitle>Vite component fixture</DialogTitle>
                  <DialogDescription>
                    The dialog is rendered from the package public API.
                  </DialogDescription>
                  <DialogClose>Done</DialogClose>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <aside
            className="mt-8 rounded-xl border border-mar-border bg-mar-card p-5 text-mar-text"
            data-marisma-accent={nestedAccent}
            data-marisma-mode={nestedMode}
          >
            <p className="font-semibold">
              Nested {nestedAccent === "reedwater" ? "Reedwater" : "Tidal Blue"}{" "}
              scope
            </p>
            <p className="mt-2 text-sm text-mar-muted">
              This card keeps its own {nestedMode} tokens when the parent theme
              changes.
            </p>
          </aside>
        </section>
      </div>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConsumerScaffold />
  </React.StrictMode>,
);
