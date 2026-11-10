# Marisma — shared engineering contract

**Status:** APPROVED technical contract; execution follows numbered task files · **Revision:** 3 · **Date:** 2026-11-10

## Product contract

Marisma is an open-source, styled, themeable React 19 + TypeScript component library
for developers of professional web applications. It uses **Tailwind CSS 4 exclusively**.
Its first release covers the generalized non-chart catalog in
`docs/planning/COMPONENT_CATALOG.md`: foundational controls, complex accessible
interactions, composed fields and reusable application layouts. Scientific plots and
chart controls are excluded from the first release. No backend, authentication service,
application data store, router dependency or consumer-side state service is included.

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

- **Repository:** single personal-account repository `darizae/marisma` (public GitHub repository exists; the npm package remains private). One pnpm workspace. No other repositories without separate authorization.
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

The approved repository `darizae/marisma` now exists. This planning PR is based on `main` at `e09681ba6e9d05577c6d6d1735fb02f9e4d7fed2`; each implementer must recheck the actual base SHA before work. Source, consumers and release preparation remain in this one repository. Do not create other repositories or depend on unapproved unpublished packages.

Current manifests and `pnpm-lock.yaml` exist. Full local clean-install and release qualification is **not independently verified** by this planning update. A previous remote run stopped on pnpm's unapproved `esbuild` build script. T-007 must review source/version/script and, if justified, narrowly approve the required dependency build locally; there is **no remote CI gate**. Never assert tests passed without recorded local evidence.

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

The six S1 files `docs/tasks/01_*.md` through `06_*.md` are historical. The remaining non-chart release is mapped to **five proposed cluster files T-007 through T-011**, each with internal checkpoints; they require owner review before execution. Numbered order is dependency order, not blanket authorization.
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

## Current project phase (2026-11-10)

S1 commits now contain the workspace/lockfile, Tailwind themes, package contract, Button/Input/Dialog, Storybook and Vite/Next.js consumer harnesses. This is **three implemented component families**, not the complete library or a verified public release. All 48 non-chart source candidates remain in approved scope and are allocated to T-007–T-010 with T-011 for full documentation and local release qualification; see the catalog coverage matrix. Plotting remains deferred. The package is private at 0.0.0. Github Actions is optional, intentionally not a gate; all actual test evidence comes from local runs. Publication still needs separate authorization.
