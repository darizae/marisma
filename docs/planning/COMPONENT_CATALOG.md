# Marisma component scope — first non-chart release

Status: APPROVED first-release scope. Button, Input and Dialog have implementation source, not a public release; the remaining candidates are scheduled into T-007–T-010 and qualified in T-011.

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
| T-007 foundation/feedback | Alert, Avatar, Badge, Button Group, Card, Copy Code, Label, Scroll Area, Separator, Spinner, Toast (11) | — | — |
| T-008 accessible interactions/dates | Calendar, Checkbox, Collapsible, Dropdown Menu, Popover, Radio Group, Select, Switch, Tabs, Textarea, Toggle Group, Tooltip (12) | Date selection field / DateField (1) | — |
| T-009 native forms/composed fields | Dropzone, Form (2) | Field Callout, Confirmation field dialog, Field Group, Inline change control, Search field, Vertical field separator (6) | — |
| T-010 data and application composition | Sidebar, Table (2) | Page title field, User menu (2) | Error page view, Application navbar, Record list view, Application shell, Card grid, Footer, Navigation progress, Raw-data view, Page section (9) |
| T-011 release gate | No new planned family | Documentation and verification | Documentation and verification |
| **Accounted for** | **30/30** | **9/9** | **9/9** |

For every row, maintain PRESERVE/ADAPT/MERGE/EXCLUDE status, export or documented composition destination, related Storybook/test file, and actual PASS/FAIL/NOT RUN evidence. EXCLUDE requires explicit owner approval. A code file or story does not alone mean SHIPPED.
