# Marisma — approved product and delivery decisions

**Authority:** owner-approved product and execution decisions, maintained for continuity across planning sessions.
**Recorded:** 2026-11-10 · **Status:** ACTIVE. Changes require an explicit owner decision.
**Scope:** this is a product/engineering decision record, **not** an interview transcript or a private planning archive. It contains no job research, comparative model allocation, personal notes or private interview transcripts. The limited filename-suffix exception is documented below.

## Identity and visual character

| ID   | Approved decision                                                                                                                                                                                        | Practical consequence                                                                                                                                                                |
| ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| D-01 | Product name: **Marisma**. Independent public open-source React UI library.                                                                                                                              | Use Marisma throughout public UI, package, documentation and repository metadata.                                                                                                    |
| D-02 | Visual direction: **cozy, chill estuary / tidal wetlands / coastal architecture**, not mountainous or conventional woodland imagery. Professional application usability comes before decorative styling. | Restrained surfaces, thoughtful spacing, clear hierarchy, warm-but-legible typography and calm motion.                                                                               |
| D-03 | Two color families: **Reedwater** (salt-marsh green/teal) and **Tidal Blue** (coastal blue/slate), each in light/dark mode.                                                                              | One semantic token contract, four initial combinations and contrast verification.                                                                                                    |
| D-04 | Typography should be readable and contemporary, not tiny or heavily monospace. Inter is an initial system preference; consumer typography remains configurable.                                          | 16px baseline body, readable labels and comfortable ~40–44px default controls; no mandatory font download.                                                                           |
| D-05 | The approved leaf mark is the owner-supplied SVG at **`assets/brand/marisma-leaf.svg`**.                                                                                                                 | This single file is the identity source for the repo README, landing logo/favicon and Storybook logo/favicon. Do not redraw it or create inconsistent copies without owner approval. |

## Package and platform contract

| ID   | Approved decision                                                                                                      | Practical consequence                                                                                                                                                                     |
| ---- | ---------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D-06 | **React 19 + TypeScript** first, with verified **Vite and Next.js** consumers.                                         | External React peers; inspect built ESM/types, Next client boundaries, SSR and hydration. React 18 is not part of the first-release promise.                                              |
| D-07 | **Styled and themeable**, not headless-only. **Tailwind CSS 4 is the definitive, exclusive styling technology.**       | Tailwind utility classes, @theme/@theme inline, CSS custom properties within Tailwind, CVA where appropriate; no CSS Modules or CSS-in-JS. Do not reopen a styling-technology comparison. |
| D-08 | Tailwind setup may be required in consuming applications.                                                              | Document Vite/Next installation, single Tailwind import, token import and installed-package `@source` registration.                                                                       |
| D-09 | Use accessible native HTML and appropriate established Radix primitives.                                               | WCAG 2.2 AA as a tested target for supported components, clear controlled/uncontrolled contracts, keyboard/focus/error states; don't claim universal certification.                       |
| D-10 | Public components should be composable and router/data/auth-provider-agnostic.                                         | Application owns links, API calls, records, persistence and async behavior; optional framework adapters must not burden basic consumers.                                                  |
| D-11 | Personal GitHub ownership at `darizae/marisma` and planned public **npm** package `@darizae/marisma`, **MIT** license. | Package remains private until npm identity, full local qualification and distinct publication approval. No organization required.                                                         |
| D-12 | One pnpm workspace, one published UI package, Storybook and landing, independent Vite/Next consumer harnesses.         | No arbitrary extra packages or repositories; build/pack/consume from the public package boundary.                                                                                         |

## Scope and release strategy

| ID   | Approved decision                                                                                                                                                    | Practical consequence                                                                                                                                  |
| ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| D-13 | First public release includes the **complete approved generalized non-chart catalog**, covering foundational controls, interactions, fields and application layouts. | Account for all **48 source-level candidates** (30 general, nine composed fields, nine app patterns); candidates may merge if documented and approved. |
| D-14 | Include generalized **page layouts, navigation, tables, and data-display compositions**, without application-specific business assumptions.                          | Shell/sidebar/navbar/record-list/error patterns serve consuming apps; no built-in backend or required router.                                          |
| D-15 | **Charts, data plots and scientific visualization are deferred** until after the initial component-library release.                                                  | No plotting dependencies in the core package or implementation work under T-007–T-011.                                                                 |
| D-16 | A **polished Storybook catalog plus a public landing page** ships first; a more elaborate dedicated docs website may come later.                                     | Verified examples, states, keyboard notes, theme switching, beginner-friendly install and honest package status.                                       |
| D-17 | Implement release completion through **five grouped specs** T-007–T-011, with internal checkpoints, not dozens of tiny Markdown tasks.                               | Start with foundation/feedback, then interaction widgets, forms, application compositions and full documentation/local qualification.                  |
| D-18 | Final publication is an independent owner approval after complete catalog and release evidence.                                                                      | No automatic merge, public npm publish, tag, deployment or paid action.                                                                                |

## Execution and documentation policy

| ID   | Approved decision                                                                                                                                           | Practical consequence                                                                                                                                                                                                               |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D-19 | **Local-first testing, minimal remote GitHub automation.** Remote CI is optional, not a gating requirement.                                                 | Fast local unit/type checks during development; targeted browser/consumer checks at checkpoints; full local release sweep. Do not add or expand GitHub Actions without approval.                                                    |
| D-20 | **Documentation hygiene is a mandatory closeout responsibility.**                                                                                           | After a milestone or meaningful contract change, reconcile README, AGENTS.md, routing, catalog, active/historical spec status and links. Replace stale claims, not only add new prose.                                              |
| D-21 | Long interviews must not lose consequential product decisions as context grows.                                                                             | Maintain this approved-decision record; reconcile it before plans, new task handoffs and release review. Private interview notes remain outside the public repository.                                                              |
| D-22 | Each sequenced task Markdown filename must include the **recommended coding model and reasoning effort** as a suffix, as explicitly requested by the owner. | The filename carries a recommendation only; worker-facing task bodies remain technically model-neutral. Keep model comparisons, costs, alternatives/fallbacks, career motives and private interview records outside the repository. |

## Current facts versus decisions

As of T-010, the repo contains locally verified implementation source for
Button, Input, Dialog, 11 foundation/feedback candidates, 12 interaction/date
general candidates, DateField, eight form/composed-field candidates, and all
13 data/navigation/application-composition candidates: **48 component
families** total, plus the
workspace/documentation/integration harnesses. This is **not** the completed
release qualification or a published npm package. Tests must be described by
actual local execution evidence, not assumed from files or commits. The
owner-approved release scope and architecture remain unchanged.

## Required handoff reconciliation

Before exporting the next numbered cluster: read **this register**, the shared engineering contract, component catalog and current source/test status; reconcile contradictory or stale paths; preserve the owner's fixed decisions; list exact unresolved implementation facts and separate approvals. Before declaring release readiness: verify every catalog candidate's disposition and actual local evidence. If a new choice contradicts D-01–D-22, obtain owner approval first and amend this record in the same reviewed change.
