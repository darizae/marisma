# Marisma — local verification and release policy

**Status:** CURRENT planning policy; T-007 and T-008 are locally verified and later clusters require owner review · **Revision:** 5 · **Date:** 2026-11-11

## Owner-selected verification policy

**Tests run locally by default.** No GitHub Actions success is required for task acceptance, review, merge or release preparation. The automatic remote CI workflow is removed in this planning PR. Do not restore it or introduce another remote workflow without explicit owner approval.

Local checks remain required at their appropriate gates. Use focused unit and type checks during editing; perform relevant integration/browser checks before cluster acceptance; execute a deliberate release qualification sweep locally. Report exact command, directory, platform/runtime, result and omissions. An existing test file is not evidence that it passed.

## Current implementation status

S1 has source commits for a lockfile, Tailwind themes, ESM package build,
Button/Input/Dialog, Storybook and Vite/Next.js package consumers. T-007 adds
locally verified source for 11 foundation/feedback candidates; T-008 adds 12
interaction/date candidates and DateField; T-009 adds Form, Dropzone, and six
composed fields with local Chromium and packed consumer evidence. The T-007 dependency review approved only esbuild 0.28.2
after inspecting the package source,
postinstall behavior, binary hash verification, and version check; a clean
frozen install now reports no ignored builds. This does not replace the complete
T-011 release-qualification sweep or create a remote CI requirement. Never
disable dependency-build safeguards globally.

The npm package remains `private: true` at version `0.0.0`, unpublished. All 48 non-chart candidates must be accounted for before release; charts remain deferred.

## Existing acceptance cases retained

| Case                                                        | Observable boundary                                                                     |
| ----------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| IT-ENV-01 / IT-PKG-01 / SEC-DEP-01                          | Clean local frozen install, owned dependency graph and reviewed provenance/licenses     |
| IT-THEME-01 / VIS-THEMES-01 / A11Y-COLOR-01                 | Four working themes, reviewed visual baselines and measurable contrast                  |
| IT-CSS-01 / IT-TW-SOURCE-01                                 | No unintended theme CSS global effects; library-only utility in production consumer CSS |
| UT-API-01 / IT-BUILD-01 / PKG-CHECK-01                      | Public TypeScript API, packed ESM/types/exports and artifact inspection                 |
| UT-STATE-01 / UT-BUTTON-01 / A11Y-INPUT-01 / A11Y-DIALOG-01 | Input/Button/Dialogs' state, native behavior, naming and focus                          |
| IT-NEXT-SSR-01 / E2E-VITE-01 / E2E-NEXT-01                  | Server hydration and independent tarball-installed production consumers                 |
| IT-DOCS-01                                                  | Documentation examples typecheck and behave as described                                |

## Cluster-level acceptance cases

| Case                                | Cluster | Observable outcome                                                                    |
| ----------------------------------- | ------- | ------------------------------------------------------------------------------------- |
| A11Y-FOUNDATION-01 / UT-FEEDBACK-01 | T-007   | Themed subtree/portal/focus correctness and real feedback/clipboard failure behavior  |
| A11Y-WIDGETS-01                     | T-008   | Real keyboard/focus/dismissal and controlled state for overlays, choices and dates    |
| IT-FORMS-01                         | T-009   | Native form integration, accessible composed fields and Dropzone failures/cleanup     |
| IT-COMPOSITION-01                   | T-010   | Router-agnostic navigation, semantic data display and responsive page compositions    |
| DOCS-CATALOG-01                     | T-011   | Every approved candidate has disposition, public use, story and linked local evidence |

These are verification requirements, not claims that tests exist or pass. A browser and keyboard check cannot be replaced with only a static text assertion. Automated accessibility tests do not establish blanket WCAG certification.

## Local commands and checkpoints

| Gate                     | Commands / evidence                                                                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fast edit                | `pnpm --filter @darizae/marisma test`; `pnpm --filter @darizae/marisma typecheck` and owning focused checks                                       |
| Task integration         | `pnpm build`; `pnpm typecheck`; `pnpm test:package-contract`; relevant Storybook interactions                                                     |
| Browser/consumer         | `pnpm --filter @marisma/storybook test:browser`; `test:consumers`; `test:next`; `test:visual`, as appropriate                                     |
| Docs                     | `pnpm --filter @marisma/storybook test:docs`; `pnpm --filter @marisma/storybook build`                                                            |
| Reproducible environment | Reviewed `pnpm install --frozen-lockfile` in a clean local checkout                                                                               |
| Package artifact         | `pnpm --dir packages/ui pack --pack-destination ../../priv/tarballs` (create ignored destination) and inspect tarball with real consumer installs |

Do not run every expensive browser suite on every edit. Browser setup and platform requirements must be recorded, especially that Playwright WebKit is not identical to native Safari. Use ignored `priv/` for local test artifacts. An unavailable check is NOT RUN/BLOCKED, not PASS.

## Publication gate — separate explicit authorization

Before public npm publication: reconcile every candidate, verify local acceptance evidence, all package/peer/type/CSS exports, React client boundaries, installed `@source`, Vite/Next.js production consumers, licenses/fonts, package size, version/changelog, and control of the npm namespace. Confirm exact commit and reviewed tarball. A manual local publish is acceptable; no GitHub Actions publish workflow is required.

Do **not** change `private: true`, create a public tag, publish, deploy or use credentials without explicit owner authorization. Report release-essential NOT RUN/BLOCKED cases and ask the owner to decide.

## Brand and decision-record hygiene checks

At each cluster checkpoint and before release candidate qualification, reconcile the owner-approved decisions in `docs/planning/APPROVED_DECISIONS.md` with the implementation contract, catalog, `AGENTS.md`, task statuses and public docs. Verify that internal/interview-private content is not committed. Check logo and favicon reachability from the canonical `assets/brand/marisma-leaf.svg` in both landing and Storybook local builds, including a non-root base path if hosted there. Mark an unrun check NOT RUN; remote CI is never a substitute or requirement.
