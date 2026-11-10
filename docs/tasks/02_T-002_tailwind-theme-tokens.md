# 02 — T-002: Tailwind semantic tokens and four theme variants

**Status:** HISTORICAL S1 ASSIGNMENT — source commit exists; acceptance not established by this status update · **Date:** 2026-11-10

> **Historical only.** The six S1 implementation stages have corresponding source commits. This file is not an active task assignment; the remaining non-chart release is covered by proposed T-007–T-011. Local tests remain required at gates, but GitHub Actions is not. Do not call unverified checks PASS.

## Task boundary

- **Repository:** `darizae/marisma` (personal owner); use the actual checked-out Git baseline, do not invent a commit SHA.
- **Owning area:** `packages/ui/src/styles/` and narrowly scoped theme examples/tests.
- **Prerequisites:** T-001 accepted; install and lockfile verified. Record prior accepted commit SHA before branching.
- **Allowed paths:** `packages/ui/src/styles/theme.css`, scoped theme tests/examples, and narrowly relevant token documentation. App CSS may be read, not changed except where an approved theme test needs a focused fixture.
- **Forbidden scope:** No CSS Modules, CSS-in-JS, new font downloads, chart palettes or theme-preference persistence.

## Initial read set (in this order)

1. `AGENTS.md`.
2. `docs/planning/ENGINEERING_CONTRACT.md` (approved product, architecture and shared constraints).
3. This **single task file** (`docs/tasks/02_T-002_tailwind-theme-tokens.md`).
4. Matching `T-002` row in `docs/agent/ROUTING.md`.
5. `.agents/skills/engineering-quality/SKILL.md`.
6. This task's owning source files: `packages/ui/src/styles/theme.css`; `apps/landing/src/styles.css`; `apps/consumers/vite-react/src/styles.css`.
7. Only the relevant case IDs in `docs/planning/VERIFICATION_AND_RELEASE.md`.

Do not read subsequent task files, historical plans, or unrelated modules unless a narrowly evidenced dependency requires it. If a named path is missing, report the blocker rather than inventing it.

## Required outcomes

1. Implement coherent Reedwater and Tidal Blue semantic token families in light and dark mode, exclusively with Tailwind CSS 4 native `@theme`/`@theme inline` and CSS custom properties.
2. Define the supported root attribute contract (`data-marisma-accent`, `data-marisma-mode`) without automatically persisting settings or fetching fonts.
3. Check local theme scope, predictable default values, typography, focus states, reduced-motion and forced-colors behavior. Measure relevant text and nontext contrast.
4. Do not promise WCAG success based on palette inspection; record real measured failures and the exact reviewed reference states.

## Acceptance cases

| Case | Observable pass/fail condition | Evidence |
| --- | --- | --- |
| `IT-THEME-01` | Switching four modes changes computed tokens and respects scope without persistence. | Required at the assigned checkpoint; if not executed, report NOT RUN. |
| `VIS-THEMES-01` | Representative responsive visual baselines match reviewed reference states. | Required at the assigned checkpoint; if not executed, report NOT RUN. |
| `A11Y-COLOR-01` | Text, focus and nontext indicators meet measured contrast targets for relevant states. | Required at the assigned checkpoint; if not executed, report NOT RUN. |

Choose the smallest meaningful test or deterministic fixture before implementing a behavior change, ideally observing an intended failure first. The test file does not exist merely because this specification lists it.

## Verification checkpoints

- **Fast edit loop:** Create small targeted token/contrast assertions and run them before broad visual review; use real browser checks where computed styles are essential.
- **Task acceptance:** Switch all four themes in a browser at representative viewport widths; test nested theme scopes, focus visibility and contrast. Screenshot baselines require human visual review.
- **Deferred milestone/release checks:** Execute only when specifically required by this task and the verification index; never label deferred checks PASS.

## Git, reporting and stop rule

- Before edits, report the actual branch, `git status`, baseline SHA and any pre-existing changes; do not overwrite owner work.
- Use an authorized short-lived task branch, focused commits and PR checks. No autonomous merge, protected-branch rewrite, tag, publication, remote creation, paid action or secret access.
- Default to at most two focused correction attempts and two relevant verification cycles per unchanged hypothesis; escalate persistent failures.
- Report changed paths; exact commands and results; PASS / FAIL / NOT RUN / BLOCKED per case; unexpected dependencies; and whether the task is ready for owner review.
- **Stop condition:** Four theme variants and documented token contract pass supported checks; any unmeasured contrast or visual coverage must be reported NOT RUN/BLOCKED.
- **Do not begin task T-003 without an explicit assignment after owner acceptance.**
