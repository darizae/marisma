# Marisma — repository agent instructions

The technical authority is `docs/planning/ENGINEERING_CONTRACT.md`; approved scope is `docs/planning/COMPONENT_CATALOG.md`. The five **proposed** remaining release clusters are `docs/tasks/07_*.md` through `11_*.md`; they need owner review before execution. Earlier tasks 01–06 are historical S1 records, not active assignments. **Execute only the explicitly assigned approved checkpoint of one cluster.**

## Read sequence

1. This AGENTS.md.
2. The relevant sections of the shared engineering contract.
3. Exactly the assigned task file.
4. The matching row of `docs/agent/ROUTING.md`.
5. `.agents/skills/engineering-quality/SKILL.md`.
6. Only the assigned initial read set and relevant cases in `docs/planning/VERIFICATION_AND_RELEASE.md`.

Do not sweep future tasks, archived tasks or all Markdown. If paths are missing or requirements conflict, report the narrow blocker rather than invent a solution.

## Binding technical decisions

React 19, TypeScript, **Tailwind CSS 4 exclusively**, semantic Tailwind tokens and CVA where useful; Radix for appropriate complex interaction primitives. Reedwater and Tidal Blue, each in light and dark modes, with calm estuary-inspired application usability, readable typography, keyboard and focus support. The complete generalized non-chart catalog is the first-release goal; plotting remains deferred. No alternative CSS system, app backend, required router, auth service or application data logic inside the library.

## Tests, Git and reporting

Work within the assigned paths and internal checkpoints; prefer targeted unit/type checks during editing and real browser/package checks **locally** at named gates. **GitHub Actions is not required and must not be reintroduced without owner approval.** Never call unrun checks PASS: report actual commands/platform/results and PASS, FAIL, NOT RUN or BLOCKED. Do not substitute mocks or regex assertions for a required real integration.

Use short-lived task branches and reviewable PRs when authorized. Never merge, force-push, publish to npm, deploy, tag, access secrets or incur costs without explicit approval. Keep `priv/` untracked. Public docs should describe real capabilities, not promised features. Worker-facing technical tasks remain model-neutral; owner-private model and reasoning-effort allocation does not belong in this repository.
