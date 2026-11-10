# Marisma — active task routing

Read `AGENTS.md`, `docs/planning/APPROVED_DECISIONS.md`, the relevant engineering contract, **one assigned task**, this task's matching row, and the installed quality skill. Numbered ordering does not authorize running ahead.

## Historical foundation sprint

Files `docs/tasks/01_*.md` through `06_*.md` describe the earlier S1 work: workspace, lockfile, Tailwind theme, package build, Button/Input/Dialog, Storybook and consumer harnesses. Source commits are present, but complete local acceptance evidence is not established by this planning change. Those files are historical.

## Remaining first-release clusters — proposed for owner review

| Order | Exact technical task | Source / verification focus |
| --- | --- | --- |
| 07 | `docs/tasks/07_T-007_foundations-feedback.md` | Basic presentation/feedback primitives, local foundation fixes, tokens and theme scope |
| 08 | `docs/tasks/08_T-008_interaction-widgets.md` | Accessible selection, overlay, date controls and keyboard behavior |
| 09 | `docs/tasks/09_T-009_forms-composed-fields.md` | Native forms, composed fields, Dropzone, error/cancel behavior |
| 10 | `docs/tasks/10_T-010_application-compositions.md` | Table, Sidebar, data display, router-agnostic page layouts |
| 11 | `docs/tasks/11_T-011_documentation-release.md` | Complete Storybook, landing, local browser/tarball qualification and release candidate |

Each cluster includes bounded **internal checkpoints** and must be reviewed before advancing. Don't create a new spec for every simple component. The authoritative 48-candidate mapping is `docs/planning/COMPONENT_CATALOG.md`.

Shared local verification policy: `docs/planning/VERIFICATION_AND_RELEASE.md`. Shared skill: `.agents/skills/engineering-quality/SKILL.md`. All technical assignments are model-neutral. GitHub Actions is optional and not a gate. npm publication requires separate owner approval.
