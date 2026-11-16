# T-016 — Final documentation, routing and PR closeout hygiene

Status: APPROVED, **NOT EXECUTED**. Repository: `darizae/marisma`, same draft PR #6. Depends on T-014 and T-015 evidence or explicit recorded verification blockers. Does **not** authorize a release or change architecture.

## Initial read set
`AGENTS.md`, `README.md`, `packages/ui/README.md`, `CHANGELOG.md`, `docs/agent/ROUTING.md`, `docs/planning/APPROVED_DECISIONS.md`, `docs/planning/ENGINEERING_CONTRACT.md`, `docs/planning/COMPONENT_CATALOG.md`, `docs/planning/VERIFICATION_AND_RELEASE.md`, `docs/planning/HANDOFF_SEQUENCE.md`, `docs/design/UI_UX_PARITY_MATRIX.md`, package scripts and resulting local evidence. `.agents/skills/engineering-quality/SKILL.md` applies. Do not sweep unrelated historical task files.

## Scope and acceptance
- Confirm the root and package README examples exactly match `apps/storybook/src/DocumentationExample.tsx`; run `pnpm --filter @marisma/storybook test:docs` if the environment is available. Check links to **actual** committed screenshots/thumbnail and to the canonical logo; remove any dead image references, avoid fake screenshots.
- Review root/package version and `pnpm-lock.yaml` consistency; do not bump workspace development versions without a real reason. Distinguish npm-published 0.1.0, source-prepared 0.2.0, actual locally verified 0.2.0 checks, and missing gates.
- Check active routing links, story IDs, screenshot paths, package/style tokens and commands against source/scripts; keep historical 0.1.0 qualification identifiable as historical. Ensure new task index statuses reflect **observed** completion, not file existence.
- Check the 48-family catalog's dispositions remain accurate without rewriting it. Update only genuinely stale links/statuses, preferably remove redundant claims instead of adding another report.
- Update draft PR #6 with the exact SHA, reviewed changes, four-theme coverage, before/after and image links, PASS/FAIL/NOT RUN/BLOCKED command ledger, deviation approvals, requested review checklist and explicit remaining release gates.
- Record the hygiene gate result as PASS / NO CHANGES NEEDED / BLOCKED with concrete link/script checks. Do not call it PASS on a search that could not execute.

Allowed edits: listed Markdown sources, relevant Storybook documentation **only for factual consistency**, and PR description. No runtime API changes, dependency changes, workflows, publication, deployment, tagging or merge. Return consequential discrepancies for owner review.
