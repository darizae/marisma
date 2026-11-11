# T-011 release-candidate report

**Status:** Local release candidate; owner review pending
**Qualified:** 2026-11-11 · Darwin arm64 · Node 26.13.0 · pnpm 11.9.0
**Package:** `@darizee/marisma@0.0.0` · `private: true` · MIT · unpublished

This report is the evidence handoff for T-011. It covers the complete approved
non-chart catalog, public documentation, Storybook and landing assets, package
consumption, and the local release checklist. It does not authorize publication,
tagging, deployment, or removal of `private: true`.

## Feature completeness

All 48 approved candidates are represented by a typed public export or an
explicit documented composition. Every row is `ADAPT`; there are no exclusions
and no new feature family was introduced by T-011. The package remains
unpublished, so these rows are release-candidate evidence rather than
`SHIPPED` claims.

| Candidate                 | Disposition and public destination                 | Story                                                                                     | Primary local evidence                                                                                              |
| ------------------------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Alert                     | ADAPT → `Alert`                                    | [Alert.stories.tsx](../../apps/storybook/src/Alert.stories.tsx)                           | [foundation.test.tsx](../../packages/ui/src/components/foundation.test.tsx), browser suite                          |
| Avatar                    | ADAPT → `Avatar`                                   | [Avatar.stories.tsx](../../apps/storybook/src/Avatar.stories.tsx)                         | [foundation.test.tsx](../../packages/ui/src/components/foundation.test.tsx), browser suite                          |
| Badge                     | ADAPT → `Badge`                                    | [Badge.stories.tsx](../../apps/storybook/src/Badge.stories.tsx)                           | [foundation.test.tsx](../../packages/ui/src/components/foundation.test.tsx), browser suite                          |
| Button                    | ADAPT → `Button`                                   | [Button.stories.tsx](../../apps/storybook/src/Button.stories.tsx)                         | [button.test.tsx](../../packages/ui/src/components/button.test.tsx), browser suite                                  |
| Button Group              | ADAPT → `ButtonGroup`                              | [ButtonGroup.stories.tsx](../../apps/storybook/src/ButtonGroup.stories.tsx)               | [foundation.test.tsx](../../packages/ui/src/components/foundation.test.tsx), browser suite                          |
| Calendar                  | ADAPT → `Calendar`                                 | [Calendar.stories.tsx](../../apps/storybook/src/Calendar.stories.tsx)                     | [date.test.tsx](../../packages/ui/src/components/date.test.tsx), A11Y-WIDGETS browser coverage                      |
| Card                      | ADAPT → `Card` slots                               | [Card.stories.tsx](../../apps/storybook/src/Card.stories.tsx)                             | [foundation.test.tsx](../../packages/ui/src/components/foundation.test.tsx), browser suite                          |
| Checkbox                  | ADAPT → `Checkbox`                                 | [Checkbox.stories.tsx](../../apps/storybook/src/Checkbox.stories.tsx)                     | [selection.test.tsx](../../packages/ui/src/components/selection.test.tsx), A11Y-WIDGETS browser coverage            |
| Collapsible               | ADAPT → `Collapsible` composition                  | [Collapsible.stories.tsx](../../apps/storybook/src/Collapsible.stories.tsx)               | [selection.test.tsx](../../packages/ui/src/components/selection.test.tsx), A11Y-WIDGETS browser coverage            |
| Copy Code                 | ADAPT → `CopyCode`                                 | [CopyCode.stories.tsx](../../apps/storybook/src/CopyCode.stories.tsx)                     | [feedback.test.tsx](../../packages/ui/src/components/feedback.test.tsx), clipboard browser check                    |
| Dialog                    | ADAPT → Radix dialog composition                   | [Dialog.stories.tsx](../../apps/storybook/src/Dialog.stories.tsx)                         | [dialog.test.tsx](../../packages/ui/src/components/dialog.test.tsx), focus browser check                            |
| Dropdown Menu             | ADAPT → `DropdownMenu` composition                 | [DropdownMenu.stories.tsx](../../apps/storybook/src/DropdownMenu.stories.tsx)             | [overlays.test.tsx](../../packages/ui/src/components/overlays.test.tsx), A11Y-WIDGETS browser coverage              |
| Dropzone                  | ADAPT → `Dropzone`                                 | [Dropzone.stories.tsx](../../apps/storybook/src/Dropzone.stories.tsx)                     | [dropzone.test.tsx](../../packages/ui/src/components/dropzone.test.tsx), IT-FORMS-01 browser coverage               |
| Form                      | ADAPT → `Form`                                     | [Form.stories.tsx](../../apps/storybook/src/Form.stories.tsx)                             | [forms.test.tsx](../../packages/ui/src/components/forms.test.tsx), IT-FORMS-01 browser coverage                     |
| Input                     | ADAPT → `Input`                                    | [Input.stories.tsx](../../apps/storybook/src/Input.stories.tsx)                           | [input.test.tsx](../../packages/ui/src/components/input.test.tsx), A11Y-INPUT-01 browser coverage                   |
| Label                     | ADAPT → `Label`                                    | [Label.stories.tsx](../../apps/storybook/src/Label.stories.tsx)                           | [foundation.test.tsx](../../packages/ui/src/components/foundation.test.tsx), browser suite                          |
| Popover                   | ADAPT → `Popover` composition                      | [Popover.stories.tsx](../../apps/storybook/src/Popover.stories.tsx)                       | [overlays.test.tsx](../../packages/ui/src/components/overlays.test.tsx), A11Y-WIDGETS browser coverage              |
| Radio Group               | ADAPT → `RadioGroup` composition                   | [RadioGroup.stories.tsx](../../apps/storybook/src/RadioGroup.stories.tsx)                 | [selection.test.tsx](../../packages/ui/src/components/selection.test.tsx), A11Y-WIDGETS browser coverage            |
| Scroll Area               | ADAPT → native `ScrollArea`                        | [ScrollArea.stories.tsx](../../apps/storybook/src/ScrollArea.stories.tsx)                 | [foundation.test.tsx](../../packages/ui/src/components/foundation.test.tsx), keyboard browser check                 |
| Separator                 | ADAPT → `Separator`                                | [Separator.stories.tsx](../../apps/storybook/src/Separator.stories.tsx)                   | [foundation.test.tsx](../../packages/ui/src/components/foundation.test.tsx), browser suite                          |
| Select                    | ADAPT → `Select`                                   | [Select.stories.tsx](../../apps/storybook/src/Select.stories.tsx)                         | [selection.test.tsx](../../packages/ui/src/components/selection.test.tsx), A11Y-WIDGETS browser coverage            |
| Sidebar                   | ADAPT → `Sidebar` composition                      | [Sidebar.stories.tsx](../../apps/storybook/src/Sidebar.stories.tsx)                       | [compositions.test.tsx](../../packages/ui/src/components/compositions.test.tsx), IT-COMPOSITION-01 browser coverage |
| Spinner                   | ADAPT → `Spinner`                                  | [Spinner.stories.tsx](../../apps/storybook/src/Spinner.stories.tsx)                       | [foundation.test.tsx](../../packages/ui/src/components/foundation.test.tsx), reduced-motion browser check           |
| Switch                    | ADAPT → `Switch`                                   | [Switch.stories.tsx](../../apps/storybook/src/Switch.stories.tsx)                         | [selection.test.tsx](../../packages/ui/src/components/selection.test.tsx), A11Y-WIDGETS browser coverage            |
| Table                     | ADAPT → semantic `Table` composition               | [Table.stories.tsx](../../apps/storybook/src/Table.stories.tsx)                           | [compositions.test.tsx](../../packages/ui/src/components/compositions.test.tsx), IT-COMPOSITION-01 browser coverage |
| Tabs                      | ADAPT → `Tabs` composition                         | [Tabs.stories.tsx](../../apps/storybook/src/Tabs.stories.tsx)                             | [overlays.test.tsx](../../packages/ui/src/components/overlays.test.tsx), A11Y-WIDGETS browser coverage              |
| Textarea                  | ADAPT → `Textarea`                                 | [Textarea.stories.tsx](../../apps/storybook/src/Textarea.stories.tsx)                     | [selection.test.tsx](../../packages/ui/src/components/selection.test.tsx), A11Y-WIDGETS browser coverage            |
| Toggle Group              | ADAPT → `ToggleGroup` composition                  | [ToggleGroup.stories.tsx](../../apps/storybook/src/ToggleGroup.stories.tsx)               | [selection.test.tsx](../../packages/ui/src/components/selection.test.tsx), A11Y-WIDGETS browser coverage            |
| Toast                     | ADAPT → `ToastProvider`, `ToastAction`, `useToast` | [Toast.stories.tsx](../../apps/storybook/src/Toast.stories.tsx)                           | [feedback.test.tsx](../../packages/ui/src/components/feedback.test.tsx), browser suite                              |
| Tooltip                   | ADAPT → `Tooltip` composition                      | [Tooltip.stories.tsx](../../apps/storybook/src/Tooltip.stories.tsx)                       | [overlays.test.tsx](../../packages/ui/src/components/overlays.test.tsx), A11Y-WIDGETS browser coverage              |
| Field Callout             | ADAPT → `FieldCallout`                             | [Form.stories.tsx](../../apps/storybook/src/Form.stories.tsx)                             | [forms.test.tsx](../../packages/ui/src/components/forms.test.tsx), IT-FORMS-01 browser coverage                     |
| Confirmation field dialog | ADAPT → `ConfirmationDialog`                       | [ConfirmationDialog.stories.tsx](../../apps/storybook/src/ConfirmationDialog.stories.tsx) | [forms.test.tsx](../../packages/ui/src/components/forms.test.tsx), IT-FORMS-01 browser coverage                     |
| Date selection field      | ADAPT → `DateField`                                | [DateField.stories.tsx](../../apps/storybook/src/DateField.stories.tsx)                   | [date.test.tsx](../../packages/ui/src/components/date.test.tsx), A11Y-WIDGETS browser coverage                      |
| Field Group               | ADAPT → `FieldGroup`                               | [Form.stories.tsx](../../apps/storybook/src/Form.stories.tsx)                             | [forms.test.tsx](../../packages/ui/src/components/forms.test.tsx), IT-FORMS-01 browser coverage                     |
| Inline change control     | ADAPT → `InlineEdit`                               | [InlineEdit.stories.tsx](../../apps/storybook/src/InlineEdit.stories.tsx)                 | [forms.test.tsx](../../packages/ui/src/components/forms.test.tsx), IT-FORMS-01 browser coverage                     |
| Page title field          | ADAPT → `PageHeading`                              | [PageHeading.stories.tsx](../../apps/storybook/src/PageHeading.stories.tsx)               | [compositions.test.tsx](../../packages/ui/src/components/compositions.test.tsx), IT-COMPOSITION-01 browser coverage |
| Search field              | ADAPT → `SearchField`                              | [SearchField.stories.tsx](../../apps/storybook/src/SearchField.stories.tsx)               | [forms.test.tsx](../../packages/ui/src/components/forms.test.tsx), IT-FORMS-01 browser coverage                     |
| User menu                 | ADAPT → `UserMenu`                                 | [UserMenu.stories.tsx](../../apps/storybook/src/UserMenu.stories.tsx)                     | [compositions.test.tsx](../../packages/ui/src/components/compositions.test.tsx), packed consumers                   |
| Vertical field separator  | ADAPT → `FieldDivider`                             | [Form.stories.tsx](../../apps/storybook/src/Form.stories.tsx)                             | [forms.test.tsx](../../packages/ui/src/components/forms.test.tsx), IT-FORMS-01 browser coverage                     |
| Error page view           | ADAPT → `ErrorView`                                | [ErrorView.stories.tsx](../../apps/storybook/src/ErrorView.stories.tsx)                   | [compositions.test.tsx](../../packages/ui/src/components/compositions.test.tsx), IT-COMPOSITION-01 browser coverage |
| Application navbar        | ADAPT → `AppNavbar`, `AppNavbarLink`               | [AppNavbar.stories.tsx](../../apps/storybook/src/AppNavbar.stories.tsx)                   | [compositions.test.tsx](../../packages/ui/src/components/compositions.test.tsx), packed consumers                   |
| Record list view          | ADAPT → `RecordList`, `RecordListItem`             | [RecordList.stories.tsx](../../apps/storybook/src/RecordList.stories.tsx)                 | [compositions.test.tsx](../../packages/ui/src/components/compositions.test.tsx), IT-COMPOSITION-01 browser coverage |
| Application shell         | ADAPT → `AppShell`                                 | [AppShell.stories.tsx](../../apps/storybook/src/AppShell.stories.tsx)                     | [compositions.test.tsx](../../packages/ui/src/components/compositions.test.tsx), IT-COMPOSITION-01 browser coverage |
| Card grid                 | ADAPT → `CardGrid`, `CardGridItem`                 | [CardGrid.stories.tsx](../../apps/storybook/src/CardGrid.stories.tsx)                     | [compositions.test.tsx](../../packages/ui/src/components/compositions.test.tsx), responsive browser coverage        |
| Footer                    | ADAPT → `PageFooter`                               | [PageFooter.stories.tsx](../../apps/storybook/src/PageFooter.stories.tsx)                 | [compositions.test.tsx](../../packages/ui/src/components/compositions.test.tsx), IT-COMPOSITION-01 browser coverage |
| Navigation progress       | ADAPT → `StepProgress` composition                 | [StepProgress.stories.tsx](../../apps/storybook/src/StepProgress.stories.tsx)             | [compositions.test.tsx](../../packages/ui/src/components/compositions.test.tsx), IT-COMPOSITION-01 browser coverage |
| Raw-data view             | ADAPT → `DataPreview`                              | [DataPreview.stories.tsx](../../apps/storybook/src/DataPreview.stories.tsx)               | [compositions.test.tsx](../../packages/ui/src/components/compositions.test.tsx), packed consumers                   |
| Page section              | ADAPT → `PageSection`                              | [PageSection.stories.tsx](../../apps/storybook/src/PageSection.stories.tsx)               | [compositions.test.tsx](../../packages/ui/src/components/compositions.test.tsx), packed consumers                   |

## Local evidence

Commands below were run from the repository root on 2026-11-11. PASS means the
command actually completed successfully on the stated platform; it is not an
inference from an existing test file.

| Gate                             | Command                                                              | Platform/runtime                                                         | Result                                                                  |
| -------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| UI unit suite                    | `pnpm --filter @darizee/marisma test`                                | Darwin arm64, Node 26.13.0                                               | PASS                                                                    |
| UI typecheck                     | `pnpm --filter @darizee/marisma typecheck`                           | Darwin arm64, Node 26.13.0                                               | PASS                                                                    |
| Workspace build                  | `pnpm build`                                                         | Darwin arm64, Node 26.13.0                                               | PASS                                                                    |
| Workspace typecheck              | `pnpm typecheck`                                                     | Darwin arm64, Node 26.13.0                                               | PASS                                                                    |
| Package contract                 | `pnpm test:package-contract`                                         | Darwin arm64, Node 26.13.0                                               | PASS                                                                    |
| Frozen install                   | `pnpm install --frozen-lockfile`                                     | Darwin arm64, pnpm 11.9.0                                                | PASS                                                                    |
| Landing typecheck/build          | `pnpm --filter @marisma/landing build`                               | Darwin arm64, Node 26.13.0                                               | PASS                                                                    |
| Storybook typecheck              | `pnpm --filter @marisma/storybook typecheck`                         | Darwin arm64, Node 26.13.0                                               | PASS                                                                    |
| Documentation examples           | `pnpm --filter @marisma/storybook test:docs`                         | Darwin arm64, Node 26.13.0                                               | PASS                                                                    |
| Storybook production build       | `pnpm --filter @marisma/storybook build`                             | Darwin arm64, Node 26.13.0                                               | PASS                                                                    |
| Storybook interaction/a11y suite | `pnpm --filter @marisma/storybook test:browser`                      | Playwright Chromium 1.65.0                                               | PASS                                                                    |
| Storybook representative visuals | `pnpm --filter @marisma/storybook test:visual`                       | Playwright Chromium 1.65.0                                               | PASS                                                                    |
| Landing brand/base-path contract | `pnpm --filter @marisma/storybook test:brand`                        | Playwright Chromium 1.65.0, built `/marisma/` app                        | PASS                                                                    |
| Packed Vite consumer             | `pnpm --filter @marisma/storybook test:consumers`                    | Playwright Chromium 1.65.0, tarball install                              | PASS                                                                    |
| Packed Next.js consumer/SSR      | `pnpm --filter @marisma/storybook test:next`                         | Playwright Chromium 1.65.0, tarball install                              | PASS                                                                    |
| Explicit package archive         | `pnpm --dir packages/ui pack --pack-destination ../../priv/tarballs` | Darwin arm64, Node 26.13.0                                               | PASS; `priv/tarballs/` artifact, ignored                                |
| Firefox browser sweep            | Playwright Firefox project                                           | Firefox binary unavailable in local cache                                | NOT RUN                                                                 |
| WebKit browser sweep             | Playwright WebKit project                                            | WebKit binary unavailable in local cache; not identical to native Safari | NOT RUN                                                                 |
| npm identity/availability        | `npm view @darizee/marisma name version --json`                      | npm registry, unauthenticated                                            | BLOCKED; registry returned E404, which does not prove namespace control |

The Chromium checks cover keyboard focus, dismissal, theme portals, forms,
Dropzone failures, responsive composition behavior, packaged CSS source
detection, and representative screenshots. Automated accessibility checks are
not a blanket WCAG certification. Firefox, WebKit, native Safari, and npm
namespace control remain release evidence omissions.

## Artifact and audit notes

- `packages/ui/package.json` remains private at `0.0.0`, with React, React DOM,
  and Tailwind CSS as peers. The package-contract test inspects ESM, declarations,
  exports, CSS, peer boundaries, package files, and the MIT license.
- The explicit packed artifact is
  `priv/tarballs/darizae-marisma-0.0.0.tgz` (generated on 2026-11-11) under
  ignored `priv/tarballs/`. Workspace symlinks are not used as
  package-consumption evidence.
- The canonical logo is `assets/brand/marisma-leaf.svg`. Storybook static
  branding and the landing build both serve that file; the Chromium brand gate
  verifies the landing logo and favicon at `/marisma/`, while the Storybook
  browser gate verifies its root-served favicon and SVG.
- No charting or scientific-visualization dependency was added. No backend,
  auth, router, persistence, font download, remote CI workflow, or publication
  workflow was added.

## Publication proposal and rollback

Publication is a separate owner approval. Before any release operation, the
owner should review this report, the exact commit, the attached tarball, the
remaining browser/npm omissions, npm account control, and the intended semver.
The proposed first public version is a deliberate owner-selected semver rather
than an automatic promotion of `0.0.0`.

Proposed checklist:

1. Confirm npm account control of `@darizee/marisma` and choose the public
   version/tag; do not infer either from the E404 query above.
2. Re-run the local qualification commands and inspect the exact tarball from
   the reviewed commit.
3. Obtain explicit approval to remove `private: true`, publish manually, and
   create a release tag. No GitHub Actions workflow is required.
4. After publication, verify the registry package, README, exports, theme CSS,
   and Vite/Next.js installation from the published version.

Rollback proposal: stop before publication if any preflight fails. If an
approved publication has already occurred, do not overwrite or force-push the
reviewed tag; immediately deprecate the affected version with an owner-approved
message, retain the tarball and evidence, and prepare a corrected patch release
after the owner confirms the versioning plan. No rollback operation was run for
this task.
