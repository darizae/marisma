# Marisma UI package

`@darizae/marisma` is a private prerelease package for React 19 and Tailwind CSS
4. It currently exports Button, Input, Dialog, 11 foundation/feedback component
families, and the `@darizae/marisma/theme.css` theme entry. It is not published
to npm, and the broader non-chart catalog is still in development.

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

## Release status

The package remains `private: true` at version `0.0.0`. A successful local
tarball check is evidence for owner review, not permission to publish or a
stable compatibility guarantee.

MIT licensed. The package archive includes its LICENSE file and does not bundle
fonts.
