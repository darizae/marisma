# Agent routing — sequenced active work

Start at root `AGENTS.md`, read `docs/planning/ENGINEERING_CONTRACT.md`, and load
**only the assigned task** from the following table. The task file supplies an exact
initial read set, allowed paths, prerequisites and verification cases. This table
is navigation, not a second source of requirements.

| Order | Task | Exact technical specification | Owner/concern |
| --- | --- | --- | --- |
| 01 | `T-001` | `docs/tasks/01_T-001_identity-and-lockfile.md` | Workspace identity + lockfile |
| 02 | `T-002` | `docs/tasks/02_T-002_tailwind-theme-tokens.md` | Tailwind theme tokens |
| 03 | `T-003` | `docs/tasks/03_T-003_package-api-build.md` | Package API + build |
| 04 | `T-004` | `docs/tasks/04_T-004_button-input-dialog.md` | Button/Input/Dialog |
| 05 | `T-005` | `docs/tasks/05_T-005_tailwind-consumer-integration.md` | Installed Tailwind consumers |
| 06 | `T-006` | `docs/tasks/06_T-006_storybook-and-release-readiness.md` | Documentation + qualification |

Shared technical checks: `docs/planning/VERIFICATION_AND_RELEASE.md`.
Shared project skill: `.agents/skills/engineering-quality/SKILL.md`.
Component scope authority: `docs/planning/COMPONENT_CATALOG.md`.

A task may start only after its named prerequisites are accepted. The numbered order
was chosen so package output and the representative components exist **before** the
installed Tailwind consumer test requires their generated classes. Do not run the
whole queue in one assignment. The next task requires explicit owner review and
assignment.

For source/test ownership, consult the named file's `Initial read set`; never sweep
all documentation. Files described as future tests or workflows must be created by
the assigned task rather than assumed to exist.
