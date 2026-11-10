# 05 — T-005: Tailwind 4 installed-package consumer integration

**Status:** HISTORICAL S1 ASSIGNMENT — source commit exists; acceptance not established by this status update · **Date:** 2026-11-10

> **Historical only.** The six S1 implementation stages have corresponding source commits. This file is not an active task assignment; the remaining non-chart release is covered by proposed T-007–T-011. Local tests remain required at gates, but GitHub Actions is not. Do not call unverified checks PASS.

## Task boundary

- **Repository:** `darizae/marisma` (personal owner); use the actual checked-out Git baseline, do not invent a commit SHA.
- **Owning area:** Package theme import/export, Tailwind registration and production consumer CSS integration.
- **Prerequisites:** T-001 through T-004 accepted. A real compiled Button/Input/Dialog now exists for testing generated utility classes.
- **Allowed paths:** `packages/ui/package.json`, `packages/ui/src/styles/theme.css`, `apps/storybook/.storybook/preview.css`, `apps/landing/src/styles.css`, `apps/consumers/vite-react/src/styles.css`, `apps/consumers/nextjs/app/globals.css`, relevant Vite/PostCSS/Tailwind configs, and focused integration tests.
- **Forbidden scope:** No CSS Modules, styled-components, Emotion, standalone non-Tailwind distribution, production publish, or unrelated component additions.

## Initial read set (in this order)

1. `AGENTS.md`.
2. `docs/planning/ENGINEERING_CONTRACT.md` (approved product, architecture and shared constraints).
3. This **single task file** (`docs/tasks/05_T-005_tailwind-consumer-integration.md`).
4. Matching `T-005` row in `docs/agent/ROUTING.md`.
5. `.agents/skills/engineering-quality/SKILL.md`.
6. This task's owning source files: `packages/ui/package.json`; `packages/ui/src/styles/theme.css`; `apps/consumers/vite-react/src/styles.css`; `apps/consumers/vite-react/vite.config.ts`; `apps/consumers/nextjs/app/globals.css`; `apps/consumers/nextjs/postcss.config.mjs`; `apps/storybook/.storybook/preview.css`.
7. Only the relevant case IDs in `docs/planning/VERIFICATION_AND_RELEASE.md`.

Do not read subsequent task files, historical plans, or unrelated modules unless a narrowly evidenced dependency requires it. If a named path is missing, report the blocker rather than inventing it.

## Required outcomes

1. Verify the documented consumer setup imports Tailwind exactly once, imports the Marisma theme once and registers installed compiled JS through an appropriate `@source` path.
2. Test production-built Vite and Next.js consumers against a tarball-installed package, not only workspace symlinks. Account for pnpm layout and stylesheet-relative `@source` resolution.
3. Prove a unique variant utility used only by a compiled Marisma component survives production CSS generation in both consumers.
4. Check duplicate preflight resets, CSS import order, theme scoping, unrelated native elements and missing utility variants; do not introduce an alternate styling pipeline.

## Acceptance cases

| Case | Observable pass/fail condition | Evidence |
| --- | --- | --- |
| `IT-CSS-01` | Unrelated application-native elements are not unintentionally restyled by the Marisma theme. | Required at the assigned checkpoint; if not executed, report NOT RUN. |
| `IT-TW-SOURCE-01` | Unique utility class used by an installed compiled component appears in production CSS. | Required at the assigned checkpoint; if not executed, report NOT RUN. |
| `E2E-VITE-01` | Independent Vite app consumes the packed component with generated Tailwind styling. | Required at the assigned checkpoint; if not executed, report NOT RUN. |
| `E2E-NEXT-01` | Independent Next.js app consumes the packed interactive component and hydrates correctly. | Required at the assigned checkpoint; if not executed, report NOT RUN. |

Choose the smallest meaningful test or deterministic fixture before implementing a behavior change, ideally observing an intended failure first. The test file does not exist merely because this specification lists it.

## Verification checkpoints

- **Fast edit loop:** Inspect emitted production CSS for a targeted unique selector and run focused consumer build/type assertions.
- **Task acceptance:** Clean packed-install Vite and Next.js builds and browser smoke checks; verify actual computed styling and hydration. T-006 owns broader documented usage and final milestone sweep.
- **Deferred milestone/release checks:** Execute only when specifically required by this task and the verification index; never label deferred checks PASS.

## Git, reporting and stop rule

- Before edits, report the actual branch, `git status`, baseline SHA and any pre-existing changes; do not overwrite owner work.
- Use an authorized short-lived task branch, focused commits and PR checks. No autonomous merge, protected-branch rewrite, tag, publication, remote creation, paid action or secret access.
- Default to at most two focused correction attempts and two relevant verification cycles per unchanged hypothesis; escalate persistent failures.
- Report changed paths; exact commands and results; PASS / FAIL / NOT RUN / BLOCKED per case; unexpected dependencies; and whether the task is ready for owner review.
- **Stop condition:** Both installed consumers render real styled components correctly; if source detection fails, report the exact CSS output, package layout and reproduction.
- **Do not begin task T-006 without an explicit assignment after owner acceptance.**
