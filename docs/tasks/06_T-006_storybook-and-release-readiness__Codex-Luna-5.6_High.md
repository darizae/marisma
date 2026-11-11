# 06 — T-006: Storybook, landing, consumer evidence and review report

**Status:** HISTORICAL S1 ASSIGNMENT — source commit exists; acceptance not established by this status update · **Date:** 2026-11-10

> **Historical only.** The six S1 implementation stages have corresponding source commits. This file is not an active task assignment; the remaining non-chart release is covered by proposed T-007–T-011. Local tests remain required at gates, but GitHub Actions is not. Do not call unverified checks PASS.

## Task boundary

- **Repository:** `darizae/marisma` (personal owner); use the actual checked-out Git baseline, do not invent a commit SHA.
- **Owning area:** `apps/storybook/`, `apps/landing/`, consumer verification harness, and verified public README examples.
- **Prerequisites:** T-001 through T-005 accepted, with their mandatory test gates evidenced. Resolve any blockers before claiming a release-ready package.
- **Allowed paths:** `apps/storybook/`, `apps/landing/`, `apps/consumers/`, relevant test harnesses, root/package README corrections and scoped package metadata verification (no publication).
- **Forbidden scope:** No public npm release, no stable 1.0 claims, no new component family, no remote deployment or paid action without approval.

## Initial read set (in this order)

1. `AGENTS.md`.
2. `docs/planning/ENGINEERING_CONTRACT.md` (approved product, architecture and shared constraints).
3. This **single task file** (`docs/tasks/06_T-006_storybook-and-release-readiness__Codex-Luna-5.6_High.md`).
4. Matching `T-006` row in `docs/agent/ROUTING.md`.
5. `.agents/skills/engineering-quality/SKILL.md`.
6. This task's owning source files: `apps/storybook/.storybook/main.ts`; `apps/storybook/.storybook/preview.ts`; `apps/landing/src/main.tsx`; `apps/consumers/vite-react/src/main.tsx`; `apps/consumers/nextjs/app/page.tsx`; `README.md`; `packages/ui/README.md`.
7. Only the relevant case IDs in `docs/planning/VERIFICATION_AND_RELEASE.md`.

Do not read subsequent task files, historical plans, or unrelated modules unless a narrowly evidenced dependency requires it. If a named path is missing, report the blocker rather than inventing it.

## Required outcomes

1. Provide working documented examples for Button, Input and Dialog; ensure story controls, variants, theme switching and keyboard notes match the actual components.
2. Keep landing/README copy truthful: the complete non-chart catalog is not yet implemented, and current package publication/compatibility must not be overstated.
3. Run or report exact omissions for independent tarball-installed Vite and Next.js consumers, server rendering/hydration, accessibility interactions and representative visual snapshots.
4. Inspect package tarball files, source/license notices, package metadata and release blockers; produce a concise evidence-based owner review report without publishing.

## Acceptance cases

| Case | Observable pass/fail condition | Evidence |
| --- | --- | --- |
| `E2E-VITE-01` | Independent Vite app consumes the packed component with generated Tailwind styling. | Required at the assigned checkpoint; if not executed, report NOT RUN. |
| `E2E-NEXT-01` | Independent Next.js app consumes the packed interactive component and hydrates correctly. | Required at the assigned checkpoint; if not executed, report NOT RUN. |
| `IT-DOCS-01` | Documented code examples compile and behave as shown. | Required at the assigned checkpoint; if not executed, report NOT RUN. |
| `PKG-CHECK-01` | Tarball files, manifest metadata, CSS exports and license notices match policy. | Required at the assigned checkpoint; if not executed, report NOT RUN. |
| `IT-NEXT-SSR-01` | Interactive component server render/hydration completes without browser-global or mismatch failures. | Required at the assigned checkpoint; if not executed, report NOT RUN. |
| `VIS-THEMES-01` | Representative responsive visual baselines match reviewed reference states. | Required at the assigned checkpoint; if not executed, report NOT RUN. |

Choose the smallest meaningful test or deterministic fixture before implementing a behavior change, ideally observing an intended failure first. The test file does not exist merely because this specification lists it.

## Verification checkpoints

- **Fast edit loop:** Typecheck examples and run targeted story interactions and docs link/API checks before broad browser runs.
- **Task acceptance:** Installed-package Vite/Next production smoke, keyboard accessibility in browsers, visual snapshots across theme variants, tarball inspection. Report PASS/FAIL/NOT RUN/BLOCKED per case.
- **Deferred milestone/release checks:** Execute only when specifically required by this task and the verification index; never label deferred checks PASS.

## Git, reporting and stop rule

- Before edits, report the actual branch, `git status`, baseline SHA and any pre-existing changes; do not overwrite owner work.
- Use an authorized short-lived task branch, focused commits and PR checks. No autonomous merge, protected-branch rewrite, tag, publication, remote creation, paid action or secret access.
- Default to at most two focused correction attempts and two relevant verification cycles per unchanged hypothesis; escalate persistent failures.
- Report changed paths; exact commands and results; PASS / FAIL / NOT RUN / BLOCKED per case; unexpected dependencies; and whether the task is ready for owner review.
- **Stop condition:** Owner gets a truthful checklist with commands/results, status of each case, remaining gaps and recommended next milestone; there is no automatic release.
- **Do not begin task outside this sprint without an explicit assignment after owner acceptance.**
