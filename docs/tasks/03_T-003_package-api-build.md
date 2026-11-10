# 03 — T-003: Public ESM, types and package build contract

**Status:** APPROVED, contingent on prerequisites · **Sprint:** S1 · **Date:** 2026-11-10

## Task boundary

- **Repository:** `darizae/marisma` (personal owner); use the actual checked-out Git baseline, do not invent a commit SHA.
- **Owning area:** `packages/ui/`, root build scripts and narrowly scoped PR CI metadata.
- **Prerequisites:** T-001 and T-002 accepted. Use the accepted lockfile and token entry contract; this task establishes the build baseline before real components.
- **Allowed paths:** `packages/ui/src/index.ts`, `packages/ui/tsdown.config.ts`, `packages/ui/package.json`, `packages/ui/tsconfig.json`, `package.json`, relevant package-contract tests, `.github/workflows/ci.yml` (create; non-publishing only), and changes required by build output inspection.
- **Forbidden scope:** No new UI components, no new published package, no release tags, no npm publish job, no alternative styling technology.

## Initial read set (in this order)

1. `AGENTS.md`.
2. `docs/planning/ENGINEERING_CONTRACT.md` (approved product, architecture and shared constraints).
3. This **single task file** (`docs/tasks/03_T-003_package-api-build.md`).
4. Matching `T-003` row in `docs/agent/ROUTING.md`.
5. `.agents/skills/engineering-quality/SKILL.md`.
6. This task's owning source files: `packages/ui/package.json`; `packages/ui/src/index.ts`; `packages/ui/tsdown.config.ts`; `packages/ui/tsconfig.json`; `tsconfig.base.json`; `apps/consumers/nextjs/next.config.mjs`.
7. Only the relevant case IDs in `docs/planning/VERIFICATION_AND_RELEASE.md`.

Do not read subsequent task files, historical plans, or unrelated modules unless a narrowly evidenced dependency requires it. If a named path is missing, report the blocker rather than inventing it.

## Required outcomes

1. Emit ESM and valid TypeScript declarations using the approved build tool, and ensure public exports resolve through the package manifest rather than source aliases.
2. Externalize React/React DOM as peers, preserve required client directives when interactive components are added, and retain Tailwind CSS 4 as the sole styling approach.
3. Inspect actual built file names, `exports`, `files`, `sideEffects`, CSS export, and pack metadata. Do not mark a component API validated before a component exists.
4. Add non-publishing build/type/manifest CI checks after T-001 lockfile verification; do not add a publish workflow.

## Acceptance cases

| Case | Observable pass/fail condition | Evidence |
| --- | --- | --- |
| `UT-API-01` | Independent consumer TypeScript code resolves public props/refs without source aliases. | Required at the assigned checkpoint; if not executed, report NOT RUN. |
| `IT-BUILD-01` | Packed ESM, declarations, CSS/exports and manifest load as intended. | Required at the assigned checkpoint; if not executed, report NOT RUN. |

Choose the smallest meaningful test or deterministic fixture before implementing a behavior change, ideally observing an intended failure first. The test file does not exist merely because this specification lists it.

## Verification checkpoints

- **Fast edit loop:** Build package, run targeted TypeScript checks, inspect output paths/types/exports and pack dry-run against the scaffold API.
- **Task acceptance:** Create or exercise an isolated tarball import/type fixture. Full interactive hydration verification is deferred to T-004/T-006, once components exist; explicitly mark that gate NOT RUN here.
- **Deferred milestone/release checks:** Execute only when specifically required by this task and the verification index; never label deferred checks PASS.

## Git, reporting and stop rule

- Before edits, report the actual branch, `git status`, baseline SHA and any pre-existing changes; do not overwrite owner work.
- Use an authorized short-lived task branch, focused commits and PR checks. No autonomous merge, protected-branch rewrite, tag, publication, remote creation, paid action or secret access.
- Default to at most two focused correction attempts and two relevant verification cycles per unchanged hypothesis; escalate persistent failures.
- Report changed paths; exact commands and results; PASS / FAIL / NOT RUN / BLOCKED per case; unexpected dependencies; and whether the task is ready for owner review.
- **Stop condition:** ESM/declarations/manifest paths and tarball imports work for the package baseline; mark feature-specific checks deferred rather than claiming they passed.
- **Do not begin task T-004 without an explicit assignment after owner acceptance.**
