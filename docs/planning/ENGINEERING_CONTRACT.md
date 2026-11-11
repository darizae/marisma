# Marisma — shared engineering contract

**Decisions authority:** `docs/planning/APPROVED_DECISIONS.md` is the canonical approved product/brand/execution register. This contract defines their technical implementation. Do not reverse settled owner decisions or dilute the Tailwind-only and local-first policies.

**Status:** APPROVED technical contract; execution follows numbered task files · **Revision:** 3 · **Date:** 2026-11-10

## Product contract

Marisma is an open-source, styled, themeable React 19 + TypeScript component library
for developers of professional web applications. It uses **Tailwind CSS 4 exclusively**.
Its first release covers the generalized non-chart catalog in
`docs/planning/COMPONENT_CATALOG.md`: foundational controls, complex accessible
interactions, composed fields and reusable application layouts. Scientific plots and
chart controls are excluded from the first release. No backend, authentication service,
application data store, router dependency or consumer-side state service is included.

The canonical Marisma leaf logo is `assets/brand/marisma-leaf.svg` (owner-supplied SVG). Landing and Storybook must both display it and link it as their favicon from the single canonical asset file; no redraws or app-specific copies. Brand direction is relaxed coastal estuary, not mountains or woodland.

The design system emphasizes readable 16px-default body typography, 40–44px baseline
controls (adjustable by explicit density variants), calm spacing, understated surfaces,
and two semantic accent families: Reedwater (coastal green/teal) and Tidal Blue
(blue/slate), each in light and dark modes. The default font stack prefers Inter but
does not require a bundled font or network download. These values and colors must be
checked for focus and text contrast before they are treated as production defaults.

Success means documented public APIs, predictable controlled/uncontrolled behavior
where appropriate, observable mouse/keyboard/focus behavior, verified WCAG 2.2 AA
requirements for supported examples, workable package consumption in Vite and Next.js,
and production-stable Tailwind utilities across both theme families. Generic error,
empty, loading, disabled and responsive states belong in component contracts where
relevant. No blanket accessibility certification is promised.

## Decided architecture

- **Repository:** single personal-account repository `darizae/marisma` (the repository exists; visibility remains private pending owner approval for public release). One pnpm workspace. No other repositories without separate authorization.
- **Published unit:** `packages/ui/`, named `@darizae/marisma`. npm scope control is not yet verified and publication remains BLOCKED. Package stays `private: true`.
- **Consumers:** `apps/storybook/`, `apps/landing/`, `apps/consumers/vite-react/`, `apps/consumers/nextjs/` all depend on `packages/ui`; never reverse that direction.
- **Runtime:** React 19 with React and React DOM peers, never bundled. Next.js, Vite, Storybook, router and form-framework tooling are consumer/dev dependencies rather than mandatory runtime dependencies for a basic Button.
- **Styling:** Tailwind CSS 4 ONLY. Utility classes, native `@theme`/`@theme inline` token definitions, semantic CSS variables, CVA variants as needed, complete statically scannable classes. No CSS Modules, CSS-in-JS or alternative styling implementation. Tailwind is a documented peer/consumer requirement.
- **Themes:** an attribute on the same root (`data-marisma-accent="reedwater|tidal-blue"`, `data-marisma-mode="light|dark"`) selects tokens; no implicit storage. The public theme entry is `@darizae/marisma/theme.css` and is imported once after the consumer's Tailwind import. Audit selectors, specificity and scope before acceptance.
- **Package source detection:** Tailwind 4 ignores node_modules automatically. Consumers MUST register the installed library's compiled JS with a CSS `@source` directive. Local workspace source registration is NOT a substitute for packaged consumer verification.
- **Accessibility:** semantic HTML plus established Radix primitives for dialog/menu/popover/select/tabs and other complex patterns as appropriate. Maintain keyboard, focus, name/description and controlled/uncontrolled guarantees. Follow WCAG 2.2 AA and WAI-ARIA APG relevant patterns.
- **Build:** tsdown ESM + `.d.ts` for JavaScript, preserve required React client boundaries, package CSS source as an explicit export. No unapproved CSS bundler or alternate styling stack. Validate emitted entry names, exports, package files and client directives on the built artifact.
- **Documentation:** public landing page plus Storybook; real, tested examples only. Storybook is the interaction source of truth. Vite and Next.js fixture apps exercise built-package behavior.
- **State/data ownership:** components own only presentation state when uncontrolled; consumers own application data, async work, routes and persistence. No global app state, remote calls or auth assumptions.
- **Localization:** English documentation initially. Component labels/messages should be overridable; date locale support evaluated at the calendar task. No unverified RTL or broad internationalization claims.
- **Security:** treat user text as text, never implicit HTML; file-drop controls never upload/read data without explicit consumer action. No application credentials. Dependency and license auditing before release.

### Repository, package and dependency contract

The approved repository `darizae/marisma` now exists. Each implementer must recheck the actual base SHA before work. Source, consumers and release preparation remain in this one repository. Do not create other repositories or depend on unapproved unpublished packages.

Current manifests and `pnpm-lock.yaml` exist. T-007 reviewed esbuild 0.28.2's
package source, `node install.js` postinstall, platform-binary hash verification,
and version check, then added the narrow `allowBuilds.esbuild: true` permission.
A clean frozen-lockfile install now runs that single script with no ignored
builds. T-011 release qualification is recorded in
`docs/release/T-011_RELEASE_CANDIDATE.md`; there is **no remote CI gate**.
Never assert tests passed without recorded local evidence.

`packages/ui` is deliberately `private: true`, version `0.0.0`. Removing the private
flag, selecting a public version/tag, and npm publishing are **distinct later approval
gates**. Never use source workspace symlinks as sole proof of published compatibility.

## Public writing and documentation

- README audience: React/Tailwind developers evaluating whether Marisma fits their work. Start with purpose, genuine capabilities, verified install/example once available, theming setup, supported React/Tailwind requirements and documentation links.
- Landing audience: potential adopters. Show quality and coherent visual identity, a short value proposition, and routes to real component examples; no invented usage claims.
- Storybook audience: implementing developers. Each public component gets representative states, accessible use, typed props, keyboard notes when relevant, and verified code snippets. Don't represent an unfinished control as production-ready.
- Maintainer/task writing remains in this specification and is not duplicated in public copy.

### Tailwind consumer installation contract (to validate in S1)

A prospective Vite app must use `@tailwindcss/vite`; a Next.js app must use
`@tailwindcss/postcss`. Their global CSS entry imports Tailwind once, then Marisma's
theme, and explicitly scans **the installed package's dist**. Example for a consumer
CSS file located in `src/app.css` under its project root:

```css
@import "tailwindcss";
@import "@darizae/marisma/theme.css";
@source "../node_modules/@darizae/marisma/dist";
```

This snippet describes the intended contract, **not verified installation guidance**.
The `@source` path is relative to the stylesheet; account for actual consumer layout
and pnpm symlinks. Consumer build checks must prove a library component's unique
variant class is emitted into production CSS. No second Tailwind preflight import.

## Task context and routing

The six S1 files `docs/tasks/01_*.md` through `06_*.md` are historical. T-007
through T-011 have locally verified implementation/evidence awaiting owner
review. Numbered order is dependency order, not blanket authorization.
Read root `AGENTS.md`, this shared contract, **one assigned numbered task file**,
the corresponding row in `docs/agent/ROUTING.md`,
`.agents/skills/engineering-quality/SKILL.md`, and only the task's initial source/test paths.
Consult `docs/planning/VERIFICATION_AND_RELEASE.md` only for the case IDs and gates
listed in the assigned task. Do not read subsequent tasks as a general context dump.
Tests marked "create" are not presumed to exist. **GitHub Actions is not a required gate**; local testing remains mandatory at the relevant checkpoint.

## Required implementation skills

Every task: `.agents/skills/engineering-quality/SKILL.md` (bundled in this repo).
External guidance only where relevant: https://tailwindcss.com/docs/detecting-classes-in-source-files,
https://tailwindcss.com/docs/theme/,
https://www.w3.org/WAI/ARIA/apg/,
https://storybook.js.org/docs/get-started/frameworks/react-vite,
https://playwright.dev/docs/test-snapshots,
https://docs.npmjs.com/trusted-publishers/.
These links are authoritative references, **not** additional installed skills.
No unreviewed external skill installation is authorized.

## Current project phase (2026-11-11)

S1 commits contain the workspace/lockfile, Tailwind themes, package contract,
Button/Input/Dialog, Storybook and Vite/Next.js consumer harnesses. T-007
through T-010 add locally verified source for the remaining foundation,
interaction/date, form, data, navigation, and application-composition
candidates, for **48 implemented component families** total. This completes the
approved non-chart source catalog. T-011 adds the complete documentation and
local release-candidate qualification evidence; it is not a public release.
Plotting remains deferred. The package is private at 0.0.0.
GitHub Actions is optional, intentionally not a gate; all actual test evidence
comes from local runs. Publication still needs separate authorization.

## Planning continuity and documentation hygiene

Keep approved product, branding, release, scope and verification choices in `docs/planning/APPROVED_DECISIONS.md`, not only in conversation context. Before generating specs or changing product direction, reconcile that record with the actual component catalog and branch state. Numbered task filenames include the owner's explicit recommended coding model and reasoning-effort suffix; those values are nonbinding routing hints. Do not put model comparisons, pricing, fallback policy, career notes or private interview transcripts into the repository or technical task bodies.

At each cluster completion or significant contract/file move, check README, `AGENTS.md`, routing, task status, brand links and active contract for stale scaffold language, contradictory verification claims and broken paths. Make a bounded hygiene correction in the associated reviewed change. Local tests are authoritative; do not burden GitHub with remote CI unless the owner explicitly changes D-19.

## Sequenced spec filename convention

All numbered `docs/tasks/` Markdown files (historical and future) use `NN_T-XXX_topic__Codex-<recommended-model>_<reasoning-effort>.md`. The suffix is owner-requested and may be updated after private availability assessment; the technical instructions inside remain agent-neutral. Maintain exact filename links in routing, self-references and related documentation when renaming. Do not add model rankings, cost estimates or decision matrices to repository files.
