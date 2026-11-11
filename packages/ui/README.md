# Marisma UI package

`@darizae/marisma` is a private prerelease package for React 19 and Tailwind CSS 4. It currently exports Button, Input, Dialog, 11 foundation/feedback families,
13 interaction/date families, eight form/composed-field families, and the
`@darizae/marisma/theme.css` theme entry.
It is not published to npm, and the broader non-chart catalog is still in
development.

## Local package evaluation

From a checkout of this repository, build and pack the exact artifact:

```bash
pnpm --filter @darizae/marisma build
pnpm --dir packages/ui pack --pack-destination ../../priv/tarballs
```

Install the resulting `.tgz` into a local consumer. React, React DOM, and
Tailwind CSS remain peer dependencies and are not bundled.

## Tailwind CSS 4 setup

In the consumer's global stylesheet, import Tailwind once, import the Marisma
theme, and scan the installed package's compiled JavaScript. Resolve `@source`
relative to that stylesheet.

```css
@import "tailwindcss";
@import "@darizae/marisma/theme.css";
@source "../node_modules/@darizae/marisma/dist";
```

Apply both attributes to a shared component scope:

```html
<div data-marisma-accent="reedwater" data-marisma-mode="light"></div>
```

The supported accent values are `reedwater` and `tidal-blue`; supported modes
are `light` and `dark`. Consumers own switching and persistence.

## Button, Input, and Dialog example

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

Button is a native button. Input supports controlled and uncontrolled values.
Dialog follows the Radix modal interaction model: Escape dismisses it, focus is
contained while open, focus returns to the trigger after dismissal, and the
nearest Marisma subtree theme is bridged into its portal.

## Foundation and feedback exports

- `Alert`, `Avatar`, `Badge`, `ButtonGroup`, `Card` and its slots, `Label`,
  `Separator`, and `Spinner` provide the presentation foundation.
- `CopyCode` reports clipboard success or failure while keeping its text
  selectable.
- `ScrollArea` deliberately uses focusable native overflow for browser, touch,
  wheel, and keyboard behavior instead of adding a runtime scroll dependency.
- `ToastProvider`, `ToastAction`, and `useToast` provide bounded, dismissible,
  timed notifications. This small provider was chosen over Radix Toast or
  Sonner to avoid a new runtime dependency; place it inside the active Marisma
  theme scope.

## Interaction and date exports

- `Checkbox`, `Switch`, `RadioGroup`, `ToggleGroup`, and `Collapsible` use
  Radix interaction primitives. `Textarea` preserves native text editing and
  resize behavior. Controlled and uncontrolled ownership is supported; field
  wrappers expose description/error relationships and distinguish read-only
  from disabled where that distinction is meaningful.
- `Popover`, `Tooltip`, and `DropdownMenu` portal their content while carrying
  the nearest Marisma accent/mode attributes. `DropdownMenu` includes grouped,
  checkable, radio, nested, and explicitly destructive items. `Tabs` supports
  Radix automatic/manual activation and horizontal/vertical orientation.
- `Select` is intentionally single-value and non-searchable. It supports option
  groups, disabled options, required/invalid states, empty options, and
  controlled, uncontrolled, disabled, or read-only ownership.
- `Calendar` and `DateField` accept strict Gregorian `YYYY-MM-DD` civil-date
  strings. These values are not instants and never shift between time zones.
  `locale` controls visible/announced formatting, `weekStartsOn` controls the
  grid, and `timeZone` determines only what date counts as today. `min`, `max`,
  and `disabledDate` constrain selection. `DateField` formats for display and
  submits the ISO value; it does not parse localized free-form text. Calendar
  range/multiple selection and broad localization/RTL guarantees are not part
  of this prerelease contract.

## Form and composed-field exports

- `Form` preserves native HTML submission, reset, validation, and keyboard
  order while optionally rendering a caller-provided linked error summary.
  `FieldGroup` uses native `fieldset`/`legend` semantics and disabled grouping;
  `FieldDivider` and `FieldCallout` adapt the existing separator and alert
  contracts without duplicating them.
- `ConfirmationDialog` makes confirm, cancel, Escape, pending, repeated-click,
  and focus-return behavior explicit. `InlineEdit` keeps a cancellable draft
  and leaves controlled optimistic updates and persistence to the caller.
  `SearchField` provides clear/search actions, Enter submission, query trimming,
  and an explicit empty-query policy.
- `Dropzone` combines a keyboard-accessible native file input with drag and
  drop. It can reject declared MIME/extension, size, count, and duplicate
  failures and supports clearing, reselection, and form reset. These are local
  metadata checks only: Dropzone does not upload, parse, execute, persist, or
  malware-scan files.

## Release status

The package remains `private: true` at version `0.0.0`. A successful local
tarball check is evidence for owner review, not permission to publish or a
stable compatibility guarantee.

MIT licensed. The package archive includes its LICENSE file and does not bundle
fonts.
