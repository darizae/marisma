# 07 — T-007: Foundation closure and basic visual/feedback components

**Status:** IMPLEMENTED — LOCAL ACCEPTANCE PASS; OWNER REVIEW PENDING · **Phase:** S2, cluster 1/5 · **Repository:** darizae/marisma
**Dependency:** S1 source on main; resolve local install and local baseline checks before accepting new work. No remote CI requirement.

## Outcome and exact catalog coverage

Finish the reusable design foundation and these **11 general UI candidates**: Alert, Avatar, Badge, Button Group, Card, Copy Code, Label, Scroll Area, Separator, Spinner, Toast. Preserve and recheck the existing Button, Input and Dialog APIs; do not reimplement them gratuitously. This is one grouped specification with three internal acceptance checkpoints, not permission to bypass reviews.

## Required constraints

- React 19, TypeScript, Tailwind CSS 4 *exclusively*, Radix when warranted, semantic Tailwind tokens and complete static class candidates. No CSS Modules, CSS-in-JS, charting or separate package.
- Keep Reedwater/Tidal Blue in light/dark; maintain calm estuary-inspired application usability, 16px baseline text and comfortable controls. Validate real contrast rather than assuming palette values suffice.
- Consumers own routes, network calls, theme persistence and application data. Provide clear props, refs, accessible labels, reasonable controlled/uncontrolled behavior, and neutral visuals.
- Local verification is mandatory at the specified checkpoints; GitHub Actions is **not** a task or release gate. Inspect the existing pnpm 11 install-script block affecting esbuild. If a build-script authorization is needed, verify source/version/script first, then use a narrowly approved allowBuilds rule; never allow every dependency script.

## Ordered checkpoints within this single cluster

**A — Repair the local foundation.** Verify a clean frozen-lockfile install, package build, TypeScript and focused S1 unit/package tests on the actual Mac environment. Record the result of each. Resolve relevant blockers (including pnpm build-script policy). Verify the four palettes and focus/validation semantics; add semantic danger, warning, success and informational tokens if needed without changing styling technology. Audit CSS selector scope and the Dialog portal's theme inheritance when theme attributes are on a subtree; fix only evidenced defects. Avoid changing public APIs without a compatibility note.

**B — Stable presentation primitives.** Deliver Alert, Avatar, Badge, Button Group, Card, Label, Separator and Spinner with semantic DOM, variant behavior, size/density compatibility, responsive states, reduced-motion behavior and focused component tests. Group component exports coherently and keep native HTML idioms.

**C — Feedback and utility components.** Deliver Copy Code (clipboard permission/failure states), Scroll Area (keyboard/native overflow fallback), and Toast (announcement timing, dismiss, stacking limits, safe content, optional adapter choice documented). Reuse Radix/Sonner only after assessing runtime dependencies and integration cost. Add real stories for each public item.

## Implementation boundary

**First read:** AGENTS.md → docs/planning/ENGINEERING_CONTRACT.md → this file → T-007 row in docs/agent/ROUTING.md → .agents/skills/engineering-quality/SKILL.md → docs/planning/COMPONENT_CATALOG.md → relevant verification cases → packages/ui/src/styles/theme.css, src/index.ts, src/components/button.tsx, input.tsx, dialog.tsx and adjacent tests.

**Allowed paths:** packages/ui/src/components/, src/lib/, src/styles/theme.css, src/index.ts, related manifest/lockfile only for a justified dependency or local installation fix; matching stories/tests; narrowly necessary docs. Do not edit other feature clusters, GitHub workflows, publishing configuration or consumer application business logic.

## Local acceptance evidence

- Every candidate has a disposition (PRESERVE/ADAPT/MERGE/EXCLUDE with owner approval for exclusions), exported type contract or explicitly accepted composition, working example and relevant tests.
- Run affected Vitest/TypeScript checks per slice; use real-browser checks locally for focus, keyboard, overflow, announcements, theme subtrees and Dialog portals where required. No static regex test substitutes for browser behavior.
- Verify four themes, disabled/loading/error, empty/failure and responsive states applicable to each item; no unsafe global styling effects.
- At cluster gate: local package build/typecheck, owning unit suite, targeted Storybook/browser cases, and a locally installed tarball smoke if exports/dependencies changed. Attach exact commands, exit codes and evidence; use PASS/FAIL/NOT RUN/BLOCKED.
- Update catalog status per candidate and useful public README/Storybook only for actually verified capabilities. Do not call any unpublished component shipped.

## Implementation evidence — 2026-11-11

Environment: macOS 26.6.2 arm64, Node.js 26.13.0, pnpm 11.9.0. All evidence
below is local; no GitHub Actions run was required or used.

- **PASS** — clean source snapshot `pnpm install --frozen-lockfile`; esbuild
  0.28.2 was the only allowed postinstall, completed successfully, and
  `pnpm ignored-builds` reported `None`.
- **PASS** — `pnpm --filter @darizae/marisma test` and
  `pnpm --filter @darizae/marisma typecheck`; focused S1 and T-007 component
  behavior passed.
- **PASS** — `node --test packages/ui/src/styles/theme.test.mjs`; all four
  palettes met the measured text, status, focus, and non-text contrast targets.
- **PASS** — `pnpm build`, `pnpm typecheck`, and
  `pnpm --filter @marisma/storybook build`; package declarations, workspace
  consumers, and all component stories compiled.
- **PASS** — `pnpm test:package-contract`; the exact tarball was installed into
  an isolated consumer, all T-007 runtime exports loaded, public types compiled,
  and React/Tailwind remained external peers.
- **PASS** — `pnpm --filter @marisma/storybook test:browser`; real Chromium
  covered S1 focus behavior plus T-007 subtree portal theming, clipboard
  rejection, native keyboard overflow, Toast announcement/stack/dismissal,
  reduced motion, responsive layout, and all four themes.
- **PASS** — `pnpm --filter @marisma/storybook test:consumers`, `test:next`,
  `test:visual`, and `test:docs`; the tarball-installed Vite and Next.js
  consumers, SSR/hydration, existing visual baselines, and public examples
  remained valid.

All 11 candidates are **ADAPT** with their destinations and evidence recorded in
`docs/planning/COMPONENT_CATALOG.md`. Scroll Area deliberately uses native
overflow; Toast uses a small package-owned provider. Neither choice adds a
runtime dependency. The package remains private and unpublished.

**Stop:** submit focused commits/PR for owner review; do not merge, publish, deploy or begin T-008 without acceptance. Unknown architecture choices become blockers for the planner, not worker decisions.
