# Marisma — maintainer and agent entry point

**Current state:** The complete approved **48-candidate component catalog** has implementation, Storybook coverage and recorded local release-candidate evidence. The npm package is still **private, version 0.0.0 and unpublished**. The source repository is public. **One release/security preparation specification is approved for execution only after PR #3 is merged; npm publication remains blocked.** Historical task Markdown files were retired from the working tree after completion and remain recoverable through Git history. The current release evidence is `docs/release/T-011_RELEASE_CANDIDATE.md`.

## Read only the context relevant to the assigned work

1. `docs/planning/APPROVED_DECISIONS.md` — the owner's binding product, brand, scope and workflow decisions.
2. `docs/planning/ENGINEERING_CONTRACT.md` — implementation and package interfaces.
3. `docs/agent/ROUTING.md` — map the current issue to a limited set of source and test files.
4. `.agents/skills/engineering-quality/SKILL.md` — shared implementation safeguards.
5. `docs/planning/VERIFICATION_AND_RELEASE.md` and the release evidence report **only** for the applicable verification/release gate.

Do not recursively read all documentation. The proposed release/security plan is `docs/tasks/13_T-013_npm-release-security__Codex-Sol-5.6_Extra-High.md`. Its security preparation and local verification are owner-approved subject to merging PR #3; no npm publication, login, staging, token use or removal of the private publication guard is authorized. Each new approved work unit must specify its exact initial read set, allowed files, acceptance checks and stop conditions. A model label in a future spec filename is an owner-requested nonbinding recommendation; keep the technical task body model-neutral and do not commit model comparisons or private interview transcripts.

## Non-negotiable architecture

React 19 and TypeScript; **Tailwind CSS 4 exclusively** (native `@theme` and semantic tokens); Radix where appropriate for accessible complex interactions. Styled, reusable components without mandatory consumer router, auth backend, data service or form framework. Four theme combinations: Reedwater and Tidal Blue, each light/dark. Canonical brand asset: `assets/brand/marisma-leaf.svg`. Every feature change must preserve keyboard/focus behavior, accessibility, responsive behavior and actual Vite/Next.js packaged-consumer compatibility.

## Git, verification, documentation and publication

- Test **locally**: focused unit/type checks during development; real browser and package-consumer checks at the appropriate change/release gate. Do not impose remote CI or add GitHub Actions workflows without express owner approval. Report PASS/FAIL/NOT RUN/BLOCKED from real commands, never from test-file existence.
- Use scoped changes, reviewable PRs, and approval before merge or publication. Do not force-push, publish to npm, deploy, tag, access secrets or incur paid costs without authorization. Keep `priv/` untracked.
- Keep only current working documentation. At any milestone or path change reconcile the README, AGENTS, routing, catalog, decision register, release notes and links. Retire completed task specs when their requirements have been resolved and their evidence preserved. The repository's Git history retains past specs.
- No public npm release has been approved. Do not toggle `private: true` or claim this package is installed from the npm registry.

## Future task-file naming

For a **newly approved** numbered implementation task, use `docs/tasks/NN_T-XXX_topic__Codex-<recommended-model>_<reasoning-effort>.md` if a task file is needed. The filename is an owner-facing routing hint; it never authorizes extra scope or publication. Do not recreate historical specs merely for reference.
