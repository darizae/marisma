# Marisma — active task routing

Read `AGENTS.md`, `docs/planning/APPROVED_DECISIONS.md`, the relevant engineering contract, **one assigned task**, this task's matching row, and the installed quality skill. Numbered ordering does not authorize running ahead.

## Historical foundation sprint

Files `docs/tasks/01_*.md` through `06_*.md` describe the earlier S1 work: workspace, lockfile, Tailwind theme, package build, Button/Input/Dialog, Storybook and consumer harnesses. Source commits are present, but complete local acceptance evidence is not established by this planning change. Those files are historical.

Historical exact paths (reference only, not runnable assignments):

- `docs/tasks/01_T-001_identity-and-lockfile__Codex-Luna-5.6_High.md`
- `docs/tasks/02_T-002_tailwind-theme-tokens__Codex-Sol-5.6_High.md`
- `docs/tasks/03_T-003_package-api-build__Codex-Sol-5.6_Extra-High.md`
- `docs/tasks/04_T-004_button-input-dialog__Codex-Sol-5.6_High.md`
- `docs/tasks/05_T-005_tailwind-consumer-integration__Codex-Sol-5.6_Extra-High.md`
- `docs/tasks/06_T-006_storybook-and-release-readiness__Codex-Luna-5.6_High.md`

## First-release clusters

| Order | Status | Exact technical task | Source / verification focus |
| --- | --- | --- | --- |
| 07 | Locally verified; owner review pending | `docs/tasks/07_T-007_foundations-feedback__Codex-Sol-5.6_High.md` | Basic presentation/feedback primitives, local foundation fixes, tokens and theme scope |
| 08 | Locally verified; owner review required | `docs/tasks/08_T-008_interaction-widgets__Codex-Sol-5.6_Extra-High.md` | Accessible selection, overlay, date controls and keyboard behavior |
| 09 | Proposed; not authorized | `docs/tasks/09_T-009_forms-composed-fields__Codex-Sol-5.6_High.md` | Native forms, composed fields, Dropzone, error/cancel behavior |
| 10 | Proposed; not authorized | `docs/tasks/10_T-010_application-compositions__Codex-Sol-5.6_Extra-High.md` | Table, Sidebar, data display, router-agnostic page layouts |
| 11 | Proposed; not authorized | `docs/tasks/11_T-011_documentation-release__Codex-Luna-5.6_High.md` | Complete Storybook, landing, local browser/tarball qualification and release candidate |

Each cluster includes bounded **internal checkpoints** and must be reviewed before advancing. Don't create a new spec for every simple component. The authoritative 48-candidate mapping is `docs/planning/COMPONENT_CATALOG.md`.

Shared local verification policy: `docs/planning/VERIFICATION_AND_RELEASE.md`. Shared skill: `.agents/skills/engineering-quality/SKILL.md`. The model and reasoning effort shown by each task filename are owner-requested **recommendations only**; verify availability before assigning. Technical task bodies remain model-neutral. GitHub Actions is optional and not a gate. npm publication requires separate owner approval.
