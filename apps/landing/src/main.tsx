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
      <div className="mx-auto grid max-w-6xl gap-12 py-10 lg:gap-16 lg:py-16">
        <header className="flex flex-wrap items-center justify-between gap-5">
          <a
            aria-label="Marisma home"
            className="flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mar-focus"
            href="https://github.com/darizae/marisma"
          >
            <img
              alt="Marisma leaf brand mark"
              className="size-11 shrink-0"
              src={`${import.meta.env.BASE_URL}marisma-leaf.svg`}
            />
            <span>
              <span className="block text-sm font-semibold uppercase tracking-widest">
                Marisma
              </span>
              <span className="block text-xs text-mar-muted">
                React component library
              </span>
            </span>
          </a>
          <nav
            aria-label="Documentation"
            className="flex flex-wrap gap-4 text-sm"
          >
            <a
              className="rounded-md px-2 py-1 text-mar-muted underline-offset-4 hover:text-mar-text hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mar-focus"
              href="https://github.com/darizae/marisma#available-components"
            >
              Component catalog
            </a>
            <a
              className="rounded-md px-2 py-1 text-mar-muted underline-offset-4 hover:text-mar-text hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mar-focus"
              href="https://github.com/darizae/marisma/tree/main/apps/storybook"
            >
              Storybook source
            </a>
          </nav>
        </header>

        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <section>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mar-muted">
              Reedwater · Tidal Blue · light and dark
            </p>
            <h1 className="mt-5 text-5xl font-semibold tracking-tight sm:text-6xl">
              Components for calm, capable interfaces.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-mar-muted">
              A styled, themeable React component library for professional web
              applications. Version 0.1.0 covers all 48 approved,
              non-chart component families with native and Radix-backed
              interactions.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-mar-muted">
              Built for React 19 and Tailwind CSS 4, with router-agnostic
              layouts, readable defaults, and consumer-owned data and state. The
              package is published publicly on npm with local release evidence
              retained in the repository.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-mar-primary px-5 py-2 font-medium text-mar-on-primary shadow-sm transition-colors hover:bg-mar-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mar-focus"
                href="https://github.com/darizae/marisma#development-checkout"
              >
                Read installation docs
              </a>
              <a
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-mar-border bg-mar-card px-5 py-2 font-medium text-mar-text transition-colors hover:bg-mar-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mar-focus"
                href="https://github.com/darizae/marisma/tree/main/apps/storybook"
              >
                Explore Storybook source
              </a>
            </div>
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
                    Foundation, interaction, form, data, navigation, and
                    application-composition families are implemented and
                    published in version 0.1.0.
                  </DialogDescription>
                  <DialogClose>Done</DialogClose>
                </DialogContent>
              </Dialog>
            </div>
          </section>
        </div>

        <section
          aria-label="Release candidate capabilities"
          className="grid gap-4 sm:grid-cols-3"
        >
          {[
            [
              "Foundation",
              "Inputs, buttons, feedback, cards, labels, separators, and status primitives.",
            ],
            [
              "Interaction",
              "Accessible selection, overlays, dates, forms, validation, and keyboard flows.",
            ],
            [
              "Application layouts",
              "Tables, lists, navigation, shells, responsive compositions, and page patterns.",
            ],
          ].map(([title, description]) => (
            <article
              className="rounded-xl border border-mar-border bg-mar-card/70 p-5"
              key={title}
            >
              <h2 className="font-semibold">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-mar-muted">
                {description}
              </p>
            </article>
          ))}
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
