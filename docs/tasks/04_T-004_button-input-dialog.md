# 04 — T-004: Representative accessible Button, Input and Dialog

**Status:** HISTORICAL S1 ASSIGNMENT — source commit exists; acceptance not established by this status update · **Date:** 2026-11-10

> **Historical only.** The six S1 implementation stages have corresponding source commits. This file is not an active task assignment; the remaining non-chart release is covered by proposed T-007–T-011. Local tests remain required at gates, but GitHub Actions is not. Do not call unverified checks PASS.

## Task boundary

- **Repository:** `darizae/marisma` (personal owner); use the actual checked-out Git baseline, do not invent a commit SHA.
- **Owning area:** `packages/ui/src/components/` and relevant public exports, tests and three Storybook stories.
- **Prerequisites:** T-001 through T-003 accepted. Use the agreed token, package and export contracts.
- **Allowed paths:** Create or adapt `packages/ui/src/components/button.tsx`, `input.tsx`, `dialog.tsx`, targeted unit/browser tests, `packages/ui/src/index.ts`, strictly necessary shared utilities, and three associated Storybook stories.
- **Forbidden scope:** No charting, no form framework as a mandatory peer, no additional complex components, no app authentication/routing/data ownership.

## Initial read set (in this order)

1. `AGENTS.md`.
2. `docs/planning/ENGINEERING_CONTRACT.md` (approved product, architecture and shared constraints).
3. This **single task file** (`docs/tasks/04_T-004_button-input-dialog.md`).
4. Matching `T-004` row in `docs/agent/ROUTING.md`.
5. `.agents/skills/engineering-quality/SKILL.md`.
6. This task's owning source files: `docs/planning/COMPONENT_CATALOG.md`; `packages/ui/src/index.ts`; `packages/ui/src/styles/theme.css`; `apps/storybook/.storybook/main.ts`; `apps/storybook/src/Status.stories.tsx`.
7. Only the relevant case IDs in `docs/planning/VERIFICATION_AND_RELEASE.md`.

Do not read subsequent task files, historical plans, or unrelated modules unless a narrowly evidenced dependency requires it. If a named path is missing, report the blocker rather than inventing it.

## Required outcomes

1. Build Button, Input and Radix-backed Dialog using Tailwind utilities and CVA only where useful; use semantic HTML and transparent TypeScript props/ref contracts.
2. Make Button activation, disabled and loading behavior predictable. Input supports controlled and uncontrolled usage, accessible label/description/error relationships and normal form behavior.
3. Dialog keyboard and focus behavior must follow WAI-ARIA APG: accessible labeling, Escape dismissal where applicable, modal focus management and focus restoration.
4. Create representative Storybook variants and interaction tests, including negative and failure cases, across approved themes.

## Acceptance cases

| Case | Observable pass/fail condition | Evidence |
| --- | --- | --- |
| `UT-STATE-01` | Input controlled/uncontrolled state ownership and default value behavior are predictable. | Required at the assigned checkpoint; if not executed, report NOT RUN. |
| `UT-BUTTON-01` | Button native activation, disabled/loading states and event contracts behave correctly. | Required at the assigned checkpoint; if not executed, report NOT RUN. |
| `A11Y-DIALOG-01` | Dialog labeling, Escape dismissal, focus containment and restoration work by keyboard. | Required at the assigned checkpoint; if not executed, report NOT RUN. |
| `A11Y-INPUT-01` | Field label, error and description relationships are exposed accessibly. | Required at the assigned checkpoint; if not executed, report NOT RUN. |
| `UT-API-01` | Independent consumer TypeScript code resolves public props/refs without source aliases. | Required at the assigned checkpoint; if not executed, report NOT RUN. |
| `IT-NEXT-SSR-01` | Interactive component server render/hydration completes without browser-global or mismatch failures. | Required at the assigned checkpoint; if not executed, report NOT RUN. |

Choose the smallest meaningful test or deterministic fixture before implementing a behavior change, ideally observing an intended failure first. The test file does not exist merely because this specification lists it.

## Verification checkpoints

- **Fast edit loop:** Write focused behavioral tests first where feasible; run affected unit/component tests and TypeScript checks.
- **Task acceptance:** Real-browser keyboard/focus tests, Storybook interactions, component export/type checks, and initial Vite/Next interactive rendering. Full packed-production Tailwind CSS verification is owned by T-005.
- **Deferred milestone/release checks:** Execute only when specifically required by this task and the verification index; never label deferred checks PASS.

## Git, reporting and stop rule

- Before edits, report the actual branch, `git status`, baseline SHA and any pre-existing changes; do not overwrite owner work.
- Use an authorized short-lived task branch, focused commits and PR checks. No autonomous merge, protected-branch rewrite, tag, publication, remote creation, paid action or secret access.
- Default to at most two focused correction attempts and two relevant verification cycles per unchanged hypothesis; escalate persistent failures.
- Report changed paths; exact commands and results; PASS / FAIL / NOT RUN / BLOCKED per case; unexpected dependencies; and whether the task is ready for owner review.
- **Stop condition:** The three components meet their observable API/accessibility behavior and relevant checks; report browser/device cases not executed.
- **Do not begin task T-005 without an explicit assignment after owner acceptance.**
