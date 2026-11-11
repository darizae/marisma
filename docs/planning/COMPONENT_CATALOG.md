# Marisma component scope — first release

Status: SHIPPED in `@darizae/marisma@0.1.0`. All 48 source-level candidates have implementation source, stories and recorded local verification evidence. The separate release report preserves post-implementation hardening checks.

This inventory identifies **48 source-level candidates**, not 48 guaranteed distinct
npm exports. Adaptation may combine related components or make certain high-level
patterns documented compositions rather than separate primitives. Every candidate
must receive an explicit disposition and a verified behavior contract before release.
The Marisma brand logo is used for project documentation and is not an exported component.

## 30 general UI candidates

| Candidate     | Public direction        | Notes / observable behavior                                       |
| ------------- | ----------------------- | ----------------------------------------------------------------- |
| Alert         | Styled component        | Semantic role, variants, optional action                          |
| Avatar        | Styled component        | Image loading failure and fallback                                |
| Badge         | Styled component        | Semantic variants, not color alone                                |
| Button        | Styled component        | Native button semantics, loading/disabled, ref                    |
| Button Group  | Composition             | Focus and grouping behavior                                       |
| Calendar      | Interactive widget      | Date semantics, locale and keyboard scope                         |
| Card          | Styled composition      | Header/content/footer slots                                       |
| Checkbox      | Radix-backed            | Checked/indeterminate, labels, keyboard                           |
| Collapsible   | Radix-backed            | Controlled/uncontrolled, focus                                    |
| Copy Code     | Utility                 | Clipboard permission/failure feedback                             |
| Dialog        | Radix-backed            | Modal/nonmodal contracts and focus restoration                    |
| Dropdown Menu | Radix-backed            | Submenus, keyboard, dismissal                                     |
| Dropzone      | Interactive utility     | Accepted/rejected files, cleanup, keyboard                        |
| Form          | Pattern/adapter         | Native usability; optional form-library integration               |
| Input         | Native control          | Controlled/uncontrolled, validation, ref                          |
| Label         | Semantic component      | Programmatic association                                          |
| Popover       | Radix-backed            | Dismissal and focus handling                                      |
| Radio Group   | Radix-backed            | Arrow keys and selected state                                     |
| Scroll Area   | Radix-backed            | Native fallback and overflow visibility                           |
| Select        | Radix-backed            | Selection, keyboard, disabled options                             |
| Separator     | Semantic/presentational | Accessible orientation when meaningful                            |
| Sidebar       | Composition             | Router-agnostic links and responsive behavior                     |
| Toast         | Feedback                | Announcements, stacking and dismissal; inspect Sonner integration |
| Spinner       | Status indicator        | Accessible name when meaningful                                   |
| Switch        | Radix-backed            | Immediate setting semantics, keyboard                             |
| Table         | Presentational table    | Semantic rows/headers; not promised as a full grid                |
| Tabs          | Radix-backed            | Arrow keys, selected/tabpanel relationship                        |
| Textarea      | Native control          | Resize, controlled/uncontrolled, errors                           |
| Toggle Group  | Radix-backed            | Single/multiple mode, keyboard                                    |
| Tooltip       | Radix-backed            | Hover/focus, dismissal, content limitations                       |

## 9 composed-field candidates

| Candidate                 | Generalized direction        |
| ------------------------- | ---------------------------- |
| Field Callout             | Callout                      |
| Confirmation field dialog | ConfirmationDialog           |
| Date selection field      | DateField                    |
| Field Group               | FieldGroup                   |
| Inline change control     | InlineEdit                   |
| Page title field          | PageHeading                  |
| Search field              | SearchField                  |
| User menu                 | UserMenu; no auth dependency |
| Vertical field separator  | FieldDivider                 |

## 9 application-composition candidates

| Candidate           | Generalized direction                             |
| ------------------- | ------------------------------------------------- |
| Error page view     | ErrorView with caller-owned retry/navigation      |
| Application navbar  | AppNavbar with router-agnostic links              |
| Record list view    | RecordList with caller-owned data                 |
| Application shell   | AppShell with composable regions                  |
| Card grid           | CardGrid with responsive layout                   |
| Footer              | PageFooter                                        |
| Navigation progress | StepProgress                                      |
| Raw-data view       | DataPreview with safe rendering and size handling |
| Page section        | PageSection                                       |

## Disposition rule

For each row assign PRESERVE, ADAPT, MERGE, or EXCLUDE with a technical reason and
owner approval for exclusions. Evidence required before marking SHIPPED: exported
TypeScript contract, working Storybook example, focused tests, accessibility review,
packaged consumer usage, and relevant responsive/theme checks. The first-release candidates met that gate and shipped in `0.1.0`.

## Complete first-release delivery coverage

The numbered work-stage names below are *historical provenance labels*, not links to current executable tasks. Completed task specifications are preserved in Git history; the following catalog dispositions and the release report are current.


48 **source-level candidates** are included; some can become documented compositions or merged exports, with an explicit disposition. This mapping prevents the initial six-task sprint from being mistaken for the final product.

| Stage                                                           | General UI candidates                                                                                                            | Composed-field candidates                                                                                                | Application-composition candidates                                                                                                                |
| --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| S1 source foundation                                           | Button, Input, Dialog (3)                                                                                                        | —                                                                                                                        | —                                                                                                                                                 |
| T-007 foundation/feedback; locally verified source              | Alert, Avatar, Badge, Button Group, Card, Copy Code, Label, Scroll Area, Separator, Spinner, Toast (11)                          | —                                                                                                                        | —                                                                                                                                                 |
| T-008 accessible interactions/dates; locally verified source    | Calendar, Checkbox, Collapsible, Dropdown Menu, Popover, Radio Group, Select, Switch, Tabs, Textarea, Toggle Group, Tooltip (12) | Date selection field / DateField (1)                                                                                     | —                                                                                                                                                 |
| T-009 native forms/composed fields; locally verified source     | Dropzone, Form (2)                                                                                                               | Field Callout, Confirmation field dialog, Field Group, Inline change control, Search field, Vertical field separator (6) | —                                                                                                                                                 |
| T-010 data and application composition; locally verified source | Sidebar, Table (2)                                                                                                               | Page title field, User menu (2)                                                                                          | Error page view, Application navbar, Record list view, Application shell, Card grid, Footer, Navigation progress, Raw-data view, Page section (9) |
| T-011 release gate; locally verified                            | No new planned family                                                                                                            | Documentation and verification                                                                                           | Documentation and verification                                                                                                                    |
| **Accounted for**                                               | **30/30**                                                                                                                        | **9/9**                                                                                                                  | **9/9**                                                                                                                                           |

## T-007 candidate dispositions

All T-007 candidates are **ADAPT**: each catalog direction is represented by a
typed public export, a Storybook example, focused unit coverage, and the shared
real-browser T-007 acceptance suite. They shipped in `0.1.0`.

| Candidate    | Destination and adaptation                                                                            | Primary evidence                                                     |
| ------------ | ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Alert        | `Alert`; semantic live roles and four status variants                                                 | `alert.tsx`, `Alert.stories.tsx`, `foundation.test.tsx`              |
| Avatar       | `Avatar`; native image failure falls back to accessible text                                          | `avatar.tsx`, `Avatar.stories.tsx`, `foundation.test.tsx`            |
| Badge        | `Badge`; status text is retained alongside semantic color                                             | `badge.tsx`, `Badge.stories.tsx`, `foundation.test.tsx`              |
| Button Group | `ButtonGroup`; labeled native-button composition and ordinary Tab order                               | `button-group.tsx`, `ButtonGroup.stories.tsx`, `foundation.test.tsx` |
| Card         | `Card` plus header/title/description/content/footer slots                                             | `card.tsx`, `Card.stories.tsx`, `foundation.test.tsx`                |
| Copy Code    | `CopyCode`; safe text, clipboard success/failure announcements, manual fallback                       | `copy-code.tsx`, `CopyCode.stories.tsx`, `feedback.test.tsx`         |
| Label        | `Label`; styled native programmatic association                                                       | `label.tsx`, `Label.stories.tsx`, `foundation.test.tsx`              |
| Scroll Area  | `ScrollArea`; focusable native overflow instead of a new Radix runtime dependency                     | `scroll-area.tsx`, `ScrollArea.stories.tsx`, browser suite           |
| Separator    | `Separator`; decorative by default, semantic orientation on request                                   | `separator.tsx`, `Separator.stories.tsx`, `foundation.test.tsx`      |
| Spinner      | `Spinner`; optional status name and reduced-motion fallback                                           | `spinner.tsx`, `Spinner.stories.tsx`, unit/browser suites            |
| Toast        | `ToastProvider`, `ToastAction`, `useToast`; bounded dependency-free stack with timed/manual dismissal | `toast.tsx`, `Toast.stories.tsx`, `feedback.test.tsx`, browser suite |

## T-008 candidate dispositions

All T-008 candidates are **ADAPT**: each catalog direction is represented by a
typed public export, a Storybook example with keyboard/API notes, focused unit
coverage, and the shared real-Chromium A11Y-WIDGETS-01 suite. Portalled widgets
carry the nearest Marisma theme scope. They shipped in `0.1.0`.

| Candidate            | Destination and adaptation                                                                                                                                             | Primary evidence                                                                           |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Calendar             | `Calendar`; single Gregorian civil-date grid with locale labels, explicit week start/time zone, boundaries, disabled dates, roving focus and selected-day announcement | `calendar.tsx`, `Calendar.stories.tsx`, `date.test.tsx`, browser suite                     |
| Checkbox             | `Checkbox`; labeled Radix checkbox with checked/unchecked/indeterminate, controlled/uncontrolled, invalid, disabled and read-only states                               | `checkbox.tsx`, `Checkbox.stories.tsx`, `selection.test.tsx`, browser suite                |
| Collapsible          | `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent`; Radix controlled/uncontrolled disclosure                                                                    | `collapsible.tsx`, `Collapsible.stories.tsx`, `selection.test.tsx`, browser suite          |
| Dropdown Menu        | `DropdownMenu` composition; grouped, checkable, radio, nested and danger items with keyboard dismissal/focus return and collision-aware portals                        | `dropdown-menu.tsx`, `DropdownMenu.stories.tsx`, `overlays.test.tsx`, browser suite        |
| Popover              | `Popover` composition; controlled/uncontrolled non-modal portal with Escape/outside dismissal and focus handling                                                       | `popover.tsx`, `Popover.stories.tsx`, `overlays.test.tsx`, browser suite                   |
| Radio Group          | `RadioGroup`, `RadioGroupItem`; labeled controlled/uncontrolled Radix group with arrow selection, disabled items, invalid and read-only states                         | `radio-group.tsx`, `RadioGroup.stories.tsx`, `selection.test.tsx`, browser suite           |
| Select               | `Select`; labeled single-value non-searchable Radix field with option groups, disabled/empty options, required/invalid and read-only states                            | `select.tsx`, `Select.stories.tsx`, `date.test.tsx`, browser suite                         |
| Switch               | `Switch`; labeled Radix immediate setting with controlled/uncontrolled, invalid, disabled and read-only states                                                         | `switch.tsx`, `Switch.stories.tsx`, `selection.test.tsx`, browser suite                    |
| Tabs                 | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`; Radix controlled/uncontrolled tabs with automatic/manual activation and panel relationships                          | `tabs.tsx`, `Tabs.stories.tsx`, `overlays.test.tsx`, browser suite                         |
| Textarea             | `Textarea`; labeled native text area with resize, native props/ref, description/error, disabled and read-only states                                                   | `textarea.tsx`, `Textarea.stories.tsx`, `selection.test.tsx`, browser suite                |
| Toggle Group         | `ToggleGroup`, `ToggleGroupItem`; Radix single/multiple groups with roving focus and controlled/uncontrolled/read-only ownership                                       | `toggle-group.tsx`, `ToggleGroup.stories.tsx`, `selection.test.tsx`, browser suite         |
| Tooltip              | `TooltipProvider`, `Tooltip`, `TooltipTrigger`, `TooltipContent`; short non-interactive hover/focus help with Escape dismissal                                         | `tooltip.tsx`, `Tooltip.stories.tsx`, `overlays.test.tsx`, browser suite                   |
| Date selection field | `DateField`; read-only formatted display plus portalled `Calendar`, strict ISO civil-date submission, validation relationships and focus return                        | `date-field.tsx`, `DateField.stories.tsx`, `date.test.tsx`, packed consumer/browser suites |

## T-009 candidate dispositions

All T-009 candidates are **ADAPT**: each catalog direction is represented by a typed public export, focused unit coverage, a Storybook example, IT-FORMS-01 real-Chromium coverage, and packed-package consumer evidence. Validation and async policy remain caller-owned; Dropzone validates declared file metadata but does not upload, parse, execute, persist, or malware-scan content. They shipped in `0.1.0`.

| Candidate                 | Destination and adaptation                                                                                                   | Primary evidence                                                                             |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Form                      | `Form`; native form props/submission/reset plus caller-provided linked error summary                                         | `form.tsx`, `Form.stories.tsx`, `forms.test.tsx`, browser suite                              |
| Dropzone                  | `Dropzone`; native file input plus drag/drop, accept/size/count/duplicate rejection, reselect, clear and reset cleanup       | `dropzone.tsx`, `Dropzone.stories.tsx`, `dropzone.test.tsx`, browser suite                   |
| Field Callout             | `FieldCallout`; field-oriented adaptation of semantic `Alert`                                                                | `form.tsx`, `Form.stories.tsx`, `forms.test.tsx`                                             |
| Confirmation field dialog | `ConfirmationDialog`; explicit confirm/cancel/Escape, caller-controlled pending state, repeated-click guard and focus return | `confirmation-dialog.tsx`, `ConfirmationDialog.stories.tsx`, `forms.test.tsx`, browser suite |
| Field Group               | `FieldGroup`; native fieldset/legend, description/error relationships and disabled descendants                               | `form.tsx`, `Form.stories.tsx`, `forms.test.tsx`                                             |
| Inline change control     | `InlineEdit`; controlled/uncontrolled committed value, cancellable draft, async save guard and caller-owned optimism         | `inline-edit.tsx`, `InlineEdit.stories.tsx`, `forms.test.tsx`, browser suite                 |
| Search field              | `SearchField`; native search input, explicit clear/search controls, Enter submission and configurable empty-query policy     | `search-field.tsx`, `SearchField.stories.tsx`, `forms.test.tsx`, packed consumers            |
| Vertical field separator  | `FieldDivider`; vertical `Separator` adaptation, decorative by default with opt-in semantic label                            | `form.tsx`, `Form.stories.tsx`, `forms.test.tsx`                                             |

## T-010 candidate dispositions

All T-010 candidates are **ADAPT**: each catalog direction is a typed public
export with focused unit coverage and a public Storybook story. The shared
IT-COMPOSITION-01 Chromium suite covers semantic data structures, caller-owned
states, responsive navigation, focus/dismissal, landmarks and composed-page
interoperation. Packed Vite and Next.js consumers exercise representative
application exports. They shipped in `0.1.0`.

| Candidate           | Destination and adaptation                                                                                                  | Primary evidence                                                                   |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Table               | `Table` compound primitives; semantic native table with scoped headers and focusable responsive overflow, not a data grid   | `table.tsx`, `Table.stories.tsx`, `compositions.test.tsx`, browser/consumer suites |
| Sidebar             | `Sidebar` compound composition; static desktop aside and Radix mobile dialog with caller-provided native or `asChild` links | `sidebar.tsx`, `Sidebar.stories.tsx`, unit/browser suites                          |
| Page title field    | `PageHeading`; page h1, context, metadata and caller-owned action regions                                                   | `page-heading.tsx`, `PageHeading.stories.tsx`, unit/browser suites                 |
| User menu           | `UserMenu`; caller-owned identity and actions over the established dropdown contract, with no auth/session dependency       | `user-menu.tsx`, `UserMenu.stories.tsx`, unit/browser/consumer suites              |
| Error page view     | `ErrorView`; caller-owned error copy, retry controls, links and diagnostics                                                 | `error-view.tsx`, `ErrorView.stories.tsx`, `compositions.test.tsx`                 |
| Application navbar  | `AppNavbar`, `AppNavbarLink`; responsive landmarks with native or consumer links                                            | `app-navbar.tsx`, `AppNavbar.stories.tsx`, unit/browser/consumer suites            |
| Record list view    | Generic `RecordList`, `RecordListItem`; required stable keys plus caller-owned loading, empty, error and record rendering   | `record-list.tsx`, `RecordList.stories.tsx`, unit/browser suites                   |
| Application shell   | `AppShell`; skip link and composable sidebar/header/main/footer landmarks                                                   | `app-shell.tsx`, `AppShell.stories.tsx`, unit/browser suites                       |
| Card grid           | `CardGrid`, `CardGridItem`; responsive semantic list layout for caller-keyed cards                                          | `card-grid.tsx`, `CardGrid.stories.tsx`, unit/browser suites                       |
| Footer              | `PageFooter`; content-info landmark with optional caller navigation                                                         | `page-footer.tsx`, `PageFooter.stories.tsx`, unit/browser suites                   |
| Navigation progress | `StepProgress` compound composition; ordered complete/current/upcoming steps and router-agnostic links                      | `step-progress.tsx`, `StepProgress.stories.tsx`, unit/browser suites               |
| Raw-data view       | `DataPreview`; text-only serialization with circular-data handling and enforced collapse/hard size limits                   | `data-preview.tsx`, `DataPreview.stories.tsx`, unit/browser/consumer suites        |
| Page section        | `PageSection`; named section, configurable heading level and caller-owned content/actions                                   | `page-section.tsx`, `PageSection.stories.tsx`, unit/browser/consumer suites        |

For every row, maintain PRESERVE/ADAPT/MERGE/EXCLUDE status, export or documented composition destination, related Storybook/test file, and actual PASS/FAIL/NOT RUN evidence. EXCLUDE requires explicit owner approval. A code file or story does not alone mean SHIPPED.
