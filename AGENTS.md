# Marisma repository agent instructions

The approved product and architecture contract is in
`docs/planning/ENGINEERING_CONTRACT.md`. The active verification contracts are in
`docs/planning/VERIFICATION_AND_RELEASE.md`. Work is split into six separately
numbered `docs/tasks/` files. **Implement only the single explicitly assigned task.**
The numerical task prefix is the execution order, not permission to run ahead.

## Mandatory read sequence

1. This `AGENTS.md`.
2. `docs/planning/ENGINEERING_CONTRACT.md`.
3. **Only** the assigned `docs/tasks/NN_T-NNN_*.md` file.
4. The matching task row in `docs/agent/ROUTING.md`.
5. `.agents/skills/engineering-quality/SKILL.md`.
6. Only that task's named sources/tests and relevant cases in
   `docs/planning/VERIFICATION_AND_RELEASE.md`.

Do not crawl all Markdown files, future tasks or past plans. When a missing path or
conflicting contract affects your work, stop and report the narrow blocker.

## Binding technical constraints

Marisma targets React 19 and **Tailwind CSS 4 exclusively**. Keep utility styling,
semantic Tailwind tokens, established Radix interaction primitives where appropriate,
and accessible typed component contracts. Never add CSS Modules, CSS-in-JS, another
styling system, unrelated project content or charting in the first release.
Consumers own routes, network requests, application data and persisted settings.

Work only in this repository and within the assigned allowed paths; preserve other
work. Use targeted test-first checks and report exact results. No fake PASS for an
unrun browser, license, install, or package test. Treat `priv/` as ignored local-only
storage. Use short-lived Git branches and focused commits only with owner approval;
no force-push, branch deletion before confirmed merge, merging, production publication,
remote repository creation, secret use or paid actions without explicit permission.

User-facing README, landing and Storybook text must serve adopting developers:
working examples, accurate installation steps and actual shipped capabilities only.
Do not place private planning context in product or repository instructions.
