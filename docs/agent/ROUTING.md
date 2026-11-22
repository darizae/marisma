# Marisma — current maintainer routing

**Status:** The component catalog and Soft Elevation design are published as
`@darizae/marisma@0.2.0`. Earlier T-013 release/security work is complete. Historical T-001–T-013 work is
preserved in Git commit history; the enduring component evidence is
`docs/release/T-011_RELEASE_CANDIDATE.md`.

Start at `AGENTS.md`, consult `docs/planning/APPROVED_DECISIONS.md` and the relevant contract section, then follow **only the row for the assigned concern**. This document routes to current code, not obsolete work tickets.

| Concern                                                         | Source of truth                             | Initial implementation/tests                                                                                                                           |
| --------------------------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Design tokens, theme-scoped portals, leaf brand                 | `docs/planning/ENGINEERING_CONTRACT.md`     | `packages/ui/src/styles/theme.css`, `packages/ui/src/lib/portal-theme.ts`, `assets/brand/marisma-leaf.svg`, `packages/ui/src/styles/theme.test.mjs`    |
| Foundation, feedback, interaction, calendar                     | `docs/planning/COMPONENT_CATALOG.md`        | `packages/ui/src/components/` and only owning `foundation.test.tsx`, `feedback.test.tsx`, `selection.test.tsx`, `overlays.test.tsx` or `date.test.tsx` |
| Native forms, file controls and compositions                    | `docs/planning/COMPONENT_CATALOG.md`        | `packages/ui/src/components/form.tsx`, `inline-edit.tsx`, `date-field.tsx`, `dropzone.tsx` with relevant `forms.test.tsx` or `dropzone.test.tsx`       |
| Navigation, layout, data display                                | `docs/planning/COMPONENT_CATALOG.md`        | `packages/ui/src/components/` owning layout component and `compositions.test.tsx`                                                                      |
| Public package API and installed consumer behavior              | `packages/ui/README.md`                     | `packages/ui/src/index.ts`, `packages/ui/package.json`, `packages/ui/package-contract.test.mjs`, `apps/consumers/`                                     |
| Storybook, landing, accessibility and branding                  | `README.md`                                 | `apps/storybook/src/`, `apps/storybook/tests/`, `apps/landing/`                                                                                        |
| Motion tokens, Radix entrance/exit and reduced motion           | `docs/motion/MOTION_SYSTEM.md`              | `packages/ui/src/styles/theme.css`, owning components, `apps/storybook/src/Motion.stories.tsx`, `docs/motion/VERIFICATION.md`                          |
| Standalone example, 48-family discovery and browser screenshots | `apps/showcase/README.md`                   | `apps/showcase/src/`, `apps/showcase/tests/`, `docs/visuals/motion-showcase/`                                                                          |
| Flowstead adoption proposals (read-only)                        | `docs/motion/FLOWSTEAD_ADOPTION_REVIEW.md`  | No Flowstead source edits permitted without separate authorization                                                                                     |
| Local testing, release readiness and actual historical evidence | `docs/planning/VERIFICATION_AND_RELEASE.md` | `docs/release/T-011_RELEASE_CANDIDATE.md` and applicable package/Storybook scripts                                                                     |

The five grouped release clusters T-007–T-011, subsequent hardening and the 0.2.0 release are complete; **future publication approvals remain separate**. Do not infer local test results beyond those actually recorded. Avoid adding remote CI requirements: local checks are the owner-approved evidence channel. Future task specs, if needed, use the model/effort filename suffix described in `AGENTS.md`; the task body stays model-neutral.

## Published 0.2.0 gate

Soft Elevation is published as `@darizae/marisma@0.2.0` (2026-11-16; source `fc3dc39d…`, staged artifact SHA-256 `8f4b9318…`). The relevant routes above continue to apply. Use `docs/design/UI_UX_PARITY_MATRIX.md` for the approved view/state comparisons. T-014 visuals and T-015 qualification were executed locally on 2026-11-16 (PR head `1004c6e76e…`); the evidence ledger is on PR #6, merged via `fc3dc39d…`. The `feat/soft-elevation-v0.2.0` branch was merged and deleted; its history remains traceable through Git commit history. Any future version repeats the full `priv/release/` qualification; publication/tagging always require separate owner approval. Do not infer a passed check from test files alone or from the 0.1.0/0.2.0 historical evidence. There is no new remote CI requirement.
