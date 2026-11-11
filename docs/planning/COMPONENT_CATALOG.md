# Marisma component scope — first non-chart release

Status: APPROVED first-release scope. Button, Input, Dialog, and the 11 T-007
foundation/feedback candidates plus the 13 T-008 interaction/date candidates
have locally verified implementation source, not a public release; the
remaining candidates are scheduled into T-009–T-010 and qualified in T-011.

This inventory identifies **48 source-level candidates**, not 48 guaranteed distinct
npm exports. Adaptation may combine related components or make certain high-level
patterns documented compositions rather than separate primitives. Every candidate
must receive an explicit disposition and a verified behavior contract before release.
Charts, plotting controls, and brand-specific logos are excluded from this release.

## 30 general UI candidates

| Candidate | Public direction | Notes / observable behavior |
| --- | --- | --- |
| Alert | Styled component | Semantic role, variants, optional action |
| Avatar | Styled component | Image loading failure and fallback |
| Badge | Styled component | Semantic variants, not color alone |
| Button | Styled component | Native button semantics, loading/disabled, ref |
| Button Group | Composition | Focus and grouping behavior |
| Calendar | Interactive widget | Date semantics, locale and keyboard scope |
| Card | Styled composition | Header/content/footer slots |
| Checkbox | Radix-backed | Checked/indeterminate, labels, keyboard |
| Collapsible | Radix-backed | Controlled/uncontrolled, focus |
| Copy Code | Utility | Clipboard permission/failure feedback |
| Dialog | Radix-backed | Modal/nonmodal contracts and focus restoration |
| Dropdown Menu | Radix-backed | Submenus, keyboard, dismissal |
| Dropzone | Interactive utility | Accepted/rejected files, cleanup, keyboard |
| Form | Pattern/adapter | Native usability; optional form-library integration |
| Input | Native control | Controlled/uncontrolled, validation, ref |
| Label | Semantic component | Programmatic association |
| Popover | Radix-backed | Dismissal and focus handling |
| Radio Group | Radix-backed | Arrow keys and selected state |
| Scroll Area | Radix-backed | Native fallback and overflow visibility |
| Select | Radix-backed | Selection, keyboard, disabled options |
| Separator | Semantic/presentational | Accessible orientation when meaningful |
| Sidebar | Composition | Router-agnostic links and responsive behavior |
| Toast | Feedback | Announcements, stacking and dismissal; inspect Sonner integration |
| Spinner | Status indicator | Accessible name when meaningful |
| Switch | Radix-backed | Immediate setting semantics, keyboard |
| Table | Presentational table | Semantic rows/headers; not promised as a full grid |
| Tabs | Radix-backed | Arrow keys, selected/tabpanel relationship |
| Textarea | Native control | Resize, controlled/uncontrolled, errors |
| Toggle Group | Radix-backed | Single/multiple mode, keyboard |
| Tooltip | Radix-backed | Hover/focus, dismissal, content limitations |

## 9 composed-field candidates

| Candidate | Generalized direction |
| --- | --- |
| Field Callout | Callout |
| Confirmation field dialog | ConfirmationDialog |
| Date selection field | DateField |
| Field Group | FieldGroup |
| Inline change control | InlineEdit |
| Page title field | PageHeading |
| Search field | SearchField |
| User menu | UserMenu; no auth dependency |
| Vertical field separator | FieldDivider |

## 9 application-composition candidates

| Candidate | Generalized direction |
| --- | --- |
| Error page view | ErrorView with caller-owned retry/navigation |
| Application navbar | AppNavbar with router-agnostic links |
| Record list view | RecordList with caller-owned data |
| Application shell | AppShell with composable regions |
| Card grid | CardGrid with responsive layout |
| Footer | PageFooter |
| Navigation progress | StepProgress |
| Raw-data view | DataPreview with safe rendering and size handling |
| Page section | PageSection |

## Disposition rule

For each row assign PRESERVE, ADAPT, MERGE, or EXCLUDE with a technical reason and
owner approval for exclusions. Evidence required before marking SHIPPED: exported
TypeScript contract, working Storybook example, focused tests, accessibility review,
packaged consumer usage, and relevant responsive/theme checks. No candidate is marked SHIPPED while the package remains unpublished.

## Complete first-release delivery coverage

48 **source-level candidates** are included; some can become documented compositions or merged exports, with an explicit disposition. This mapping prevents the initial six-task sprint from being mistaken for the final product. Charts/plots are a separate post-release project.

| Stage | General UI candidates | Composed-field candidates | Application-composition candidates |
| --- | --- | --- | --- |
| S1 source exists; unpublished | Button, Input, Dialog (3) | — | — |
| T-007 foundation/feedback; locally verified source | Alert, Avatar, Badge, Button Group, Card, Copy Code, Label, Scroll Area, Separator, Spinner, Toast (11) | — | — |
| T-008 accessible interactions/dates; locally verified source | Calendar, Checkbox, Collapsible, Dropdown Menu, Popover, Radio Group, Select, Switch, Tabs, Textarea, Toggle Group, Tooltip (12) | Date selection field / DateField (1) | — |
| T-009 native forms/composed fields | Dropzone, Form (2) | Field Callout, Confirmation field dialog, Field Group, Inline change control, Search field, Vertical field separator (6) | — |
| T-010 data and application composition | Sidebar, Table (2) | Page title field, User menu (2) | Error page view, Application navbar, Record list view, Application shell, Card grid, Footer, Navigation progress, Raw-data view, Page section (9) |
| T-011 release gate | No new planned family | Documentation and verification | Documentation and verification |
| **Accounted for** | **30/30** | **9/9** | **9/9** |

## T-007 candidate dispositions

All T-007 candidates are **ADAPT**: each catalog direction is represented by a
typed public export, a Storybook example, focused unit coverage, and the shared
real-browser T-007 acceptance suite. They remain unpublished prerelease source,
not SHIPPED components.

| Candidate | Destination and adaptation | Primary evidence |
| --- | --- | --- |
| Alert | `Alert`; semantic live roles and four status variants | `alert.tsx`, `Alert.stories.tsx`, `foundation.test.tsx` |
| Avatar | `Avatar`; native image failure falls back to accessible text | `avatar.tsx`, `Avatar.stories.tsx`, `foundation.test.tsx` |
| Badge | `Badge`; status text is retained alongside semantic color | `badge.tsx`, `Badge.stories.tsx`, `foundation.test.tsx` |
| Button Group | `ButtonGroup`; labeled native-button composition and ordinary Tab order | `button-group.tsx`, `ButtonGroup.stories.tsx`, `foundation.test.tsx` |
| Card | `Card` plus header/title/description/content/footer slots | `card.tsx`, `Card.stories.tsx`, `foundation.test.tsx` |
| Copy Code | `CopyCode`; safe text, clipboard success/failure announcements, manual fallback | `copy-code.tsx`, `CopyCode.stories.tsx`, `feedback.test.tsx` |
| Label | `Label`; styled native programmatic association | `label.tsx`, `Label.stories.tsx`, `foundation.test.tsx` |
| Scroll Area | `ScrollArea`; focusable native overflow instead of a new Radix runtime dependency | `scroll-area.tsx`, `ScrollArea.stories.tsx`, browser suite |
| Separator | `Separator`; decorative by default, semantic orientation on request | `separator.tsx`, `Separator.stories.tsx`, `foundation.test.tsx` |
| Spinner | `Spinner`; optional status name and reduced-motion fallback | `spinner.tsx`, `Spinner.stories.tsx`, unit/browser suites |
| Toast | `ToastProvider`, `ToastAction`, `useToast`; bounded dependency-free stack with timed/manual dismissal | `toast.tsx`, `Toast.stories.tsx`, `feedback.test.tsx`, browser suite |

## T-008 candidate dispositions

All T-008 candidates are **ADAPT**: each catalog direction is represented by a
typed public export, a Storybook example with keyboard/API notes, focused unit
coverage, and the shared real-Chromium A11Y-WIDGETS-01 suite. Portalled widgets
carry the nearest Marisma theme scope. They remain unpublished prerelease
source, not SHIPPED components.

| Candidate | Destination and adaptation | Primary evidence |
| --- | --- | --- |
| Calendar | `Calendar`; single Gregorian civil-date grid with locale labels, explicit week start/time zone, boundaries, disabled dates, roving focus and selected-day announcement | `calendar.tsx`, `Calendar.stories.tsx`, `date.test.tsx`, browser suite |
| Checkbox | `Checkbox`; labeled Radix checkbox with checked/unchecked/indeterminate, controlled/uncontrolled, invalid, disabled and read-only states | `checkbox.tsx`, `Checkbox.stories.tsx`, `selection.test.tsx`, browser suite |
| Collapsible | `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent`; Radix controlled/uncontrolled disclosure | `collapsible.tsx`, `Collapsible.stories.tsx`, `selection.test.tsx`, browser suite |
| Dropdown Menu | `DropdownMenu` composition; grouped, checkable, radio, nested and danger items with keyboard dismissal/focus return and collision-aware portals | `dropdown-menu.tsx`, `DropdownMenu.stories.tsx`, `overlays.test.tsx`, browser suite |
| Popover | `Popover` composition; controlled/uncontrolled non-modal portal with Escape/outside dismissal and focus handling | `popover.tsx`, `Popover.stories.tsx`, `overlays.test.tsx`, browser suite |
| Radio Group | `RadioGroup`, `RadioGroupItem`; labeled controlled/uncontrolled Radix group with arrow selection, disabled items, invalid and read-only states | `radio-group.tsx`, `RadioGroup.stories.tsx`, `selection.test.tsx`, browser suite |
| Select | `Select`; labeled single-value non-searchable Radix field with option groups, disabled/empty options, required/invalid and read-only states | `select.tsx`, `Select.stories.tsx`, `date.test.tsx`, browser suite |
| Switch | `Switch`; labeled Radix immediate setting with controlled/uncontrolled, invalid, disabled and read-only states | `switch.tsx`, `Switch.stories.tsx`, `selection.test.tsx`, browser suite |
| Tabs | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`; Radix controlled/uncontrolled tabs with automatic/manual activation and panel relationships | `tabs.tsx`, `Tabs.stories.tsx`, `overlays.test.tsx`, browser suite |
| Textarea | `Textarea`; labeled native text area with resize, native props/ref, description/error, disabled and read-only states | `textarea.tsx`, `Textarea.stories.tsx`, `selection.test.tsx`, browser suite |
| Toggle Group | `ToggleGroup`, `ToggleGroupItem`; Radix single/multiple groups with roving focus and controlled/uncontrolled/read-only ownership | `toggle-group.tsx`, `ToggleGroup.stories.tsx`, `selection.test.tsx`, browser suite |
| Tooltip | `TooltipProvider`, `Tooltip`, `TooltipTrigger`, `TooltipContent`; short non-interactive hover/focus help with Escape dismissal | `tooltip.tsx`, `Tooltip.stories.tsx`, `overlays.test.tsx`, browser suite |
| Date selection field | `DateField`; read-only formatted display plus portalled `Calendar`, strict ISO civil-date submission, validation relationships and focus return | `date-field.tsx`, `DateField.stories.tsx`, `date.test.tsx`, packed consumer/browser suites |

For every row, maintain PRESERVE/ADAPT/MERGE/EXCLUDE status, export or documented composition destination, related Storybook/test file, and actual PASS/FAIL/NOT RUN evidence. EXCLUDE requires explicit owner approval. A code file or story does not alone mean SHIPPED.
