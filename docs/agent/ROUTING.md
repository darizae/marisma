# Marisma — current maintainer routing

**Status:** The initial component catalog is implemented as a **private local release candidate**. One proposed release/security task exists, but no new implementation is authorized. Historical T-001–T-012 work is preserved in Git commit history; the enduring release evidence is `docs/release/T-011_RELEASE_CANDIDATE.md`.

Start at `AGENTS.md`, consult `docs/planning/APPROVED_DECISIONS.md` and the relevant contract section, then follow **only the row for the assigned concern**. This document routes to current code, not obsolete work tickets.

| Concern | Source of truth | Initial implementation/tests |
| --- | --- | --- |
| Design tokens, theme-scoped portals, leaf brand | `docs/planning/ENGINEERING_CONTRACT.md` | `packages/ui/src/styles/theme.css`, `packages/ui/src/lib/portal-theme.ts`, `assets/brand/marisma-leaf.svg`, `packages/ui/src/styles/theme.test.mjs` |
| Foundation, feedback, interaction, calendar | `docs/planning/COMPONENT_CATALOG.md` | `packages/ui/src/components/` and only owning `foundation.test.tsx`, `feedback.test.tsx`, `selection.test.tsx`, `overlays.test.tsx` or `date.test.tsx` |
| Native forms, file controls and compositions | `docs/planning/COMPONENT_CATALOG.md` | `packages/ui/src/components/form.tsx`, `inline-edit.tsx`, `date-field.tsx`, `dropzone.tsx` with relevant `forms.test.tsx` or `dropzone.test.tsx` |
| Navigation, layout, data display | `docs/planning/COMPONENT_CATALOG.md` | `packages/ui/src/components/` owning layout component and `compositions.test.tsx` |
| Public package API and installed consumer behavior | `packages/ui/README.md` | `packages/ui/src/index.ts`, `packages/ui/package.json`, `packages/ui/package-contract.test.mjs`, `apps/consumers/` |
| Storybook, landing, accessibility and branding | `README.md` | `apps/storybook/src/`, `apps/storybook/tests/`, `apps/landing/` |
| Local testing, release readiness and actual historical evidence | `docs/planning/VERIFICATION_AND_RELEASE.md` | `docs/release/T-011_RELEASE_CANDIDATE.md` and applicable package/Storybook scripts |

The five grouped release clusters T-007–T-011 and subsequent hardening have been implemented, but **owner publication review remains separate**. Do not infer local test results beyond those actually recorded. Avoid adding remote CI requirements: local checks are the owner-approved evidence channel. Future task specs, if needed, use the model/effort filename suffix described in `AGENTS.md`; the task body stays model-neutral.

## Proposed next task — owner review required

`docs/tasks/13_T-013_npm-release-security__Codex-Sol-5.6_Extra-High.md` defines the local security assessment, exact-artifact preflight and manual npm publication decision gates. Its filename is an owner-requested routing hint, not execution permission. No publication, version change, workflow creation or npm credential action is approved by this plan.
