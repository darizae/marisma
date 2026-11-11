# Marisma

<img src="assets/brand/marisma-leaf.svg" alt="Marisma leaf brand mark" width="72" height="72" />

A Tailwind-first React component library for professional web applications.

Marisma is a prerelease library for React 19 and Tailwind CSS 4. The current
package implements all 48 approved non-chart component families with typed
public APIs, accessible native or Radix-based interactions, and Reedwater and
Tidal Blue themes in light and dark modes.

> **Project status:** `@darizae/marisma` is private and is not published to npm.
> Full documentation and release qualification remain in development. Use this
> repository's Storybook and tarball-installed consumer fixtures for evaluation;
> do not treat the package as a stable release.

## Available components

- `Button` — primary, secondary, and ghost variants; three sizes; disabled and
  loading states.
- `Input` — native controlled or uncontrolled input with a visible label,
  supporting description, validation message, and forwarded native props.
- `Dialog` — composable Radix dialog primitives with modal focus containment,
  Escape dismissal, focus restoration, and automatic subtree-theme bridging
  for its portal.
- Presentation — `Alert`, `Avatar`, `Badge`, `ButtonGroup`, `Card` slots,
  `Label`, `Separator`, and `Spinner`.
- Feedback and utilities — `CopyCode` with clipboard failure feedback,
  focusable native `ScrollArea`, and dependency-free `ToastProvider`,
  `ToastAction`, and `useToast` exports.
- Selection and disclosure — `Checkbox`, `Switch`, `RadioGroup`,
  `ToggleGroup`, `Collapsible`, and native `Textarea`, including controlled,
  uncontrolled, disabled, read-only, invalid, and indeterminate states where
  applicable.
- Overlays and navigation — portalled `Popover`, `Tooltip`, and nested
  `DropdownMenu` primitives plus `Tabs`, with Radix keyboard/focus behavior and
  automatic nearest-subtree theme bridging.
- Complex selection and dates — single-value, non-searchable `Select`, a
  keyboard date-grid `Calendar`, and composed `DateField`.
- Forms and composed fields — native `Form`, `FieldGroup`, `FieldDivider`, and
  `FieldCallout`; guarded `ConfirmationDialog`, `InlineEdit`, and `SearchField`
  interactions; and `Dropzone` for validated local file selection.
- Data and content — semantic compound `Table`, caller-keyed `RecordList`,
  responsive `CardGrid`, capped text-only `DataPreview`, and `PageSection`.
- Navigation and application layout — responsive `Sidebar`, `AppNavbar`,
  `AppShell`, `PageFooter`, and `StepProgress`, with native or consumer link
  components and no required router.
- Page patterns — `PageHeading`, caller-owned `UserMenu`, and `ErrorView`.

Storybook includes controls, keyboard notes, interaction coverage, and theme
switching for these components. No charting, routing, data fetching,
authentication, or persisted theme settings are included.

## Development checkout

The monorepo requires Node.js 22.14.0 or newer and pnpm 11.9.0.

```bash
pnpm install --frozen-lockfile
pnpm build
pnpm dev:storybook
```

The package stays private. To exercise the exact packed artifact locally, use
the repository's independent Vite and Next.js acceptance harness:

```bash
pnpm --filter @marisma/storybook test:consumers
```

## Tailwind CSS 4 setup

Import Tailwind once, then the Marisma theme, then register the installed
package's compiled JavaScript as a source. The `@source` path is relative to the
CSS file, so adjust it if your stylesheet lives elsewhere.

```css
@import "tailwindcss";
@import "@darizae/marisma/theme.css";
@source "../node_modules/@darizae/marisma/dist";
```

Set both theme attributes on the scope that owns the components:

```html
<div data-marisma-accent="reedwater" data-marisma-mode="light"></div>
```

Supported values are `reedwater | tidal-blue` and `light | dark`. Marisma does
not store or switch those values for the consumer.

## Button, Input, and Dialog example

This is the same compiled example rendered in Storybook.

<!-- marisma-example:start -->

```tsx
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
```

<!-- marisma-example:end -->

## Repository structure

- `packages/ui/` — the private React component package and Tailwind theme
- `apps/storybook/` — component documentation, interactions, and visual checks
- `apps/landing/` — truthful prerelease introduction and component preview
- `apps/consumers/vite-react/` — independent packed Vite fixture
- `apps/consumers/nextjs/` — independent packed Next.js App Router fixture

## Brand

Marisma's supplied leaf mark is stored once at [`assets/brand/marisma-leaf.svg`](assets/brand/marisma-leaf.svg). The landing page and Storybook serve this canonical file as their logo and SVG favicon. The visual direction is calm, coastal-estuary modernism, expressed through Reedwater and Tidal Blue themes; the brand mark does not impose a consumer font or application theme. Approved product decisions and asset usage are documented in [`docs/planning/APPROVED_DECISIONS.md`](docs/planning/APPROVED_DECISIONS.md).

## Roadmap and local verification

Marisma's foundation/feedback, interaction/date, form/composed-field, and
application-composition clusters now have locally verified source for the full
48-candidate non-chart catalog. The remaining
[grouped implementation specification](docs/agent/ROUTING.md) (T-011) covers
complete documentation and local release qualification.
The [catalog](docs/planning/COMPONENT_CATALOG.md)
accounts for all 48 original non-chart source candidates. Plotting remains
deferred.

**Tests run locally.** GitHub Actions is not a required validation gate. Before accepting an implementation checkpoint, run the relevant tests and record actual results under the [local verification policy](docs/planning/VERIFICATION_AND_RELEASE.md). The reviewed pnpm build permission is limited to esbuild, which is required by the local Vite/Storybook toolchain. The public npm release is separately approval-gated.

## License

MIT. See [LICENSE](LICENSE). Marisma does not bundle fonts.
