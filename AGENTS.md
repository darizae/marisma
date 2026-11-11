# Marisma — repository agent instructions

The owner's durable approved-decision ledger is `docs/planning/APPROVED_DECISIONS.md`; the implementation contract is `docs/planning/ENGINEERING_CONTRACT.md` and scope is `docs/planning/COMPONENT_CATALOG.md`. Reconcile them before exporting/implementing new clusters; do not repeat settled interview questions or infer unapproved changes. T-007, the explicitly authorized T-008, T-009, and T-010 have locally verified implementation awaiting owner review; the **proposed** remaining release cluster is `docs/tasks/11_*.md` and needs owner review before execution. Earlier tasks 01–06 are historical S1 records, not active assignments. **Execute only the explicitly assigned approved checkpoint of one cluster.**

## Read sequence

1. This AGENTS.md.
2. The approved-decision register and relevant sections of the shared engineering contract.
3. Exactly the assigned task file.
4. The matching row of `docs/agent/ROUTING.md`.
5. `.agents/skills/engineering-quality/SKILL.md`.
6. Only the assigned initial read set and relevant cases in `docs/planning/VERIFICATION_AND_RELEASE.md`.

Do not sweep future tasks, archived tasks or all Markdown. If paths are missing or requirements conflict, report the narrow blocker rather than invent a solution.

## Binding technical decisions

React 19, TypeScript, **Tailwind CSS 4 exclusively**, semantic Tailwind tokens and CVA where useful; Radix for appropriate complex interaction primitives. Reedwater and Tidal Blue, each in light and dark modes, with calm estuary-inspired application usability, readable typography, keyboard and focus support. The complete generalized non-chart catalog is the first-release goal; plotting remains deferred. No alternative CSS system, app backend, required router, auth service or application data logic inside the library.

## Tests, Git and reporting

Work within the assigned paths and internal checkpoints; prefer targeted unit/type checks during editing and real browser/package checks **locally** at named gates. **GitHub Actions is not required and must not be reintroduced without owner approval.** Never call unrun checks PASS: report actual commands/platform/results and PASS, FAIL, NOT RUN or BLOCKED. Do not substitute mocks or regex assertions for a required real integration.

Use short-lived task branches and reviewable PRs when authorized. Never merge, force-push, publish to npm, deploy, tag, access secrets or incur costs without explicit approval. Keep `priv/` untracked. After each milestone or meaningful contract/file move, reconcile stale Markdown: update AGENTS, active/historical task status, README, routing, catalog and links; do not leave scaffold-era claims. Public docs should describe real capabilities, not promised features. Task **bodies** remain model-neutral; each numbered Markdown filename carries the owner's requested _recommended_ coding model and reasoning-effort suffix (`__Codex-Model_Verbosity.md`). The suffix is a routing hint, not a guarantee of model availability. Keep comparative model assessments, costs, fallbacks and private reasoning outside this repository.
