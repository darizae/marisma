# 08 — T-008: Accessible interactive controls, overlays and dates

**Status:** PROPOSED FOR OWNER REVIEW · **Phase:** S2, cluster 2/5 · **Repository:** darizae/marisma
**Dependency:** T-007 accepted, shared tokens/local verification reliable.

## Outcome and exact catalog coverage

Complete these **12 general UI candidates**: Calendar, Checkbox, Collapsible, Dropdown Menu, Popover, Radio Group, Select, Switch, Tabs, Textarea, Toggle Group, Tooltip. Also complete the composed **Date selection field → DateField**. This cluster delivers interaction behavior; it must not introduce a mandatory router, form framework or chart runtime.

## Architecture and API contract

Use existing appropriate Radix primitives instead of rebuilding focus/keyboard machinery. Native HTML semantics take precedence for Textarea. For composite controls support controlled and uncontrolled state when the underlying primitive supports it, forwarding refs/native props where meaningful. Distinguish disabled and read-only; specify keyboard navigation, focus/return, dismissal, error/empty/loading states, accessible names, and DOM ownership. Calendar and DateField require explicit locale, week-start, min/max, disabled-date and time-zone/value semantics; no implicit network locale service. Portalled UI must honor the surrounding Marisma theme even when the scope is not document root.

## Internal delivery checkpoints

**A — Selection and disclosure:** Checkbox (including indeterminate), Switch, Radio Group, Toggle Group, Collapsible and Textarea; handle controlled/uncontrolled transitions, grouped labels, arrow keys where appropriate, errors and disabled behavior. Add unit tests and Storybook interaction states.

**B — Overlays and navigation:** Popover, Tooltip, Dropdown Menu and Tabs. Specify menu nesting and destructive actions; Escape/outside-interaction dismissal; hover/focus affordances; Tab/arrow behavior; content relationships and portalled theme inheritance. Manual local keyboard walkthrough plus browser assertions is required for these patterns.

**C — Complex selection and dates:** Select, Calendar and DateField. Define single/multiple selection only where supported by chosen primitive, required/invalid states, searchability only if implemented, date parsing/formatting boundaries and keyboard date navigation. No claim of comprehensive localization or RTL until verified. Avoid excessive abstractions over a concrete date API.

## Implementation boundary

**First read:** AGENTS.md → ENGINEERING_CONTRACT.md → this file → T-008 routing row → engineering-quality skill → COMPONENT_CATALOG.md → relevant verification cases → existing components and styles, especially Dialog's portal behavior and prior tokens.

**Allowed paths:** packages/ui/src/components/, src/lib/, public exports, directly required runtime dependencies and lockfile after review, matching Storybook stories and targeted tests; minimal consumer fixtures if a real interaction needs cross-boundary checking. No wholesale design rework, extra styling framework, application data fetching or charts.

## Local acceptance evidence

- Each public widget has a typed API, keyboard behavior matrix, readable focus state, accessible name/description, default/uncontrolled and controlled examples where appropriate, four-theme behavior and Storybook usage.
- Test escape, Tab/arrow interaction, focus restoration, portal themes, offscreen/scroll behavior, touch-sized triggers, reduced motion, invalid/disabled states and error paths applicable to each family.
- For dates, test boundary dates, locale override, disabled dates, formatted value and selected-day announcement; document unsupported capabilities honestly.
- During slices run targeted unit/type checks; at cluster gate run relevant local Playwright Chromium keyboard/focus tests and package consumption where browser/SSR behavior warrants it. Other browsers may remain deferred until release qualification but must be marked NOT RUN.
- Update catalog dispositions and public docs based on actual behavior. No acceptance based on existence of a story or an unexecuted test file.

**Stop:** owner reviews evidence and proposed API changes before T-009. No autonomous merge or publication.
