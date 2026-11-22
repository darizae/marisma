# Soft Elevation 0.2.0 — completed historical handoff

**State: CLOSED.** The T-014–T-016 work completed on 2026-11-16, [PR #6](https://github.com/darizae/marisma/pull/6) merged to `main` as `fc3dc39d66bdd2d11027b87927d5b2bade148611`, and `@darizae/marisma@0.2.0` was separately owner-authorized and published. The exact published archive's SHA-256 was `8f4b9318f77c7e998cecdf266e87799b1e7cd50be1c0420a3d9edd0abce80852`; the private `priv/release/postpublish.sh` verified it. This is provenance, **not an active task queue**.

| Historical task                       | Outcome                                                                                                                                    | Evidence                                                                                  |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| T-014 — Soft Elevation visuals        | PASS. Reviewed four themes, 390px mobile, components/forms, social image, and before/after React screenshots; updated baselines.           | `docs/visuals/soft-elevation/`, `docs/design/UI_UX_PARITY_MATRIX.md`, PR #6               |
| T-015 — local release qualification   | PASS. Build/types/component/Storybook/browser/brand/Next/security and packed Vite/Next consumer tests before owner-authorized publication. | `docs/planning/VERIFICATION_AND_RELEASE.md`, PR #6, local ignored release-toolkit records |
| T-016 — Markdown and routing closeout | PASS. Reconciled documentation, catalog, version and evidence.                                                                             | PR #6, Git history                                                                        |

The original completed task files, including their owner-facing routing suffixes, are preserved in Git history; they were retired from the active working tree in accordance with `AGENTS.md`. Do not dispatch them again.

## Current work, separate from the completed 0.2.0 release

The motion/interactivity and navigable showcase candidate is in [PR #8](https://github.com/darizae/marisma/pull/8). Its authoritative review artifacts are `docs/motion/MOTION_SYSTEM.md`, `docs/motion/VERIFICATION.md` and `apps/showcase/README.md`. Owner review is still required; **no merge, npm publication, tag, production deployment or Flowstead integration is authorized**. Local checks are the acceptance channel; historical 0.2.0 evidence does not qualify any future release.
