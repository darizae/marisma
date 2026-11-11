# 01 — T-001: Independent identity, manifests and reproducible foundation

**Status:** HISTORICAL S1 ASSIGNMENT — source commit exists; acceptance not established by this status update · **Date:** 2026-11-10

> **Historical only.** The six S1 implementation stages have corresponding source commits. This file is not an active task assignment; the remaining non-chart release is covered by proposed T-007–T-011. Local tests remain required at gates, but GitHub Actions is not. Do not call unverified checks PASS.

## Task boundary

- **Repository:** `darizae/marisma` (personal owner); use the actual checked-out Git baseline, do not invent a commit SHA.
- **Owning area:** `darizae/marisma` repository; root workspace and manifest contracts.
- **Prerequisites:** An initialized local Git repository and a recorded baseline commit SHA. The owner chooses/authorizes the task branch. No remote repository needs to exist.
- **Allowed paths:** `package.json`, `pnpm-workspace.yaml`, `tsconfig.base.json`, `packages/ui/package.json`, `apps/**/package.json`, `.gitignore`, `README.md`, `LICENSE`, `pnpm-lock.yaml` (create), and `docs/planning/COMPONENT_CATALOG.md` only for inventory disposition corrections.
- **Forbidden scope:** No new component implementation, no second styling system, no remote creation, no publish job, no registry publication or credential use.

## Initial read set (in this order)

1. `AGENTS.md`.
2. `docs/planning/ENGINEERING_CONTRACT.md` (approved product, architecture and shared constraints).
3. This **single task file** (`docs/tasks/01_T-001_identity-and-lockfile__Codex-Luna-5.6_High.md`).
4. Matching `T-001` row in `docs/agent/ROUTING.md`.
5. `.agents/skills/engineering-quality/SKILL.md`.
6. This task's owning source files: `package.json`; `pnpm-workspace.yaml`; `packages/ui/package.json`; `docs/planning/COMPONENT_CATALOG.md`; `.gitignore`; `README.md`.
7. Only the relevant case IDs in `docs/planning/VERIFICATION_AND_RELEASE.md`.

Do not read subsequent task files, historical plans, or unrelated modules unless a narrowly evidenced dependency requires it. If a named path is missing, report the blocker rather than inventing it.

## Required outcomes

1. Confirm all manifest names, internal dependency edges and license metadata represent Marisma only; do not import unrelated source repositories or brand assets.
2. Check Node and pnpm runtime compatibility on the actual Mac environment; resolve the currently provisional dependency versions, licensing, required package availability and install behavior.
3. Generate and commit a reviewed `pnpm-lock.yaml`; verify a clean/frozen-lockfile install without private credentials or unexpected install hooks.
4. Preserve the 48 non-chart candidate inventory and its disposition rule; charts remain outside the first release.

## Acceptance cases

| Case | Observable pass/fail condition | Evidence |
| --- | --- | --- |
| `IT-ENV-01` | Clean frozen-lockfile install succeeds without private credentials or unexpected install hooks. | Required at the assigned checkpoint; if not executed, report NOT RUN. |
| `IT-PKG-01` | All workspace dependencies resolve to the intended owned package/version graph. | Required at the assigned checkpoint; if not executed, report NOT RUN. |
| `SEC-DEP-01` | No unauthorized, unlicensed or private required package blocks a public release. | Required at the assigned checkpoint; if not executed, report NOT RUN. |

Choose the smallest meaningful test or deterministic fixture before implementing a behavior change, ideally observing an intended failure first. The test file does not exist merely because this specification lists it.

## Verification checkpoints

- **Fast edit loop:** Validate JSON, workspace graph, package-manager metadata, and perform a lockfile-only resolution before a clean install.
- **Task acceptance:** Clean `pnpm install --frozen-lockfile` from an appropriate fresh workspace state; check manifest/lockfile consistency and installed dependency/license provenance. Record actual command results.
- **Deferred milestone/release checks:** Execute only when specifically required by this task and the verification index; never label deferred checks PASS.

## Git, reporting and stop rule

- Before edits, report the actual branch, `git status`, baseline SHA and any pre-existing changes; do not overwrite owner work.
- Use an authorized short-lived task branch, focused commits and PR checks. No autonomous merge, protected-branch rewrite, tag, publication, remote creation, paid action or secret access.
- Default to at most two focused correction attempts and two relevant verification cycles per unchanged hypothesis; escalate persistent failures.
- Report changed paths; exact commands and results; PASS / FAIL / NOT RUN / BLOCKED per case; unexpected dependencies; and whether the task is ready for owner review.
- After all requested revisions are complete, commit the changes before handoff.
- **Stop condition:** Accept only when dependencies resolve reproducibly, the license/source audit has no unresolved mandatory issue, and all three cases have evidence. Otherwise return BLOCKED with exact conflicts.
- **Do not begin task T-002 without an explicit assignment after owner acceptance.**
