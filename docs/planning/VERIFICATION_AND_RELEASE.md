# Verification and release constraints — Marisma

**Status:** APPROVED test contracts, NOT proof of passing tests · **Revision:** 2 · **Date:** 2026-11-10


Each case is a requirement-to-test contract, not evidence that a test exists or passed.
Implementers create asserting test files alongside the corresponding implementation
and report exact commands/results. Prefer minimal deterministic fixtures.

| Case ID | Observable pass/fail behavior | Owning boundary | Checkpoint |
| --- | --- | --- | --- |
| IT-ENV-01 | Clean frozen-lockfile install succeeds without private credentials/install hooks | Workspace install | Task |
| IT-PKG-01 | Each workspace package resolves to intended owned dependency | Manifest and package tooling | Task |
| SEC-DEP-01 | No known unauthorized, unlicensed or private packages in required release path | Dependency/license audit | T-001 preflight; release recheck |
| IT-THEME-01 | All four theme combinations update component tokens predictably | Browser + CSS | Task |
| VIS-THEMES-01 | Representative responsive visual baselines match reviewed reference | Playwright screenshots | Milestone |
| A11Y-COLOR-01 | Semantic text/focus/nontext indicators meet measured contrast targets | Accessible browser/design test | Task |
| IT-CSS-01 | App's unrelated elements are not unexpectedly restyled by theme import | Consumer browser | Task |
| IT-TW-SOURCE-01 | Unique class from compiled installed component exists in production CSS | Installed consumer build | Task |
| UT-API-01 | Public TS props and refs compile for independent consumer | TypeScript compile | Fast/Task |
| IT-BUILD-01 | Packed ESM/types/exports are loadable without source aliases | Installed tarball | Task |
| IT-NEXT-SSR-01 | Server render/hydration succeeds without browser-global exceptions | Next App Router browser/server | Task |
| UT-STATE-01 | Input controlled/uncontrolled behavior respects ownership and default values | Unit test | Fast |
| UT-BUTTON-01 | Native click, disabled and loading transitions are correct | Component test | Fast |
| A11Y-DIALOG-01 | Escape, focus containment, semantic labeling and focus return function | Real browser keyboard | Task |
| A11Y-INPUT-01 | Label, error, description and keyboard state accessible | DOM + browser | Task |
| E2E-VITE-01 | Standalone Vite app consumes packed component with compiled Tailwind styles | Installed consumer E2E | Milestone |
| E2E-NEXT-01 | Standalone Next.js app consumes packed interactive component with hydration | Installed consumer E2E | Milestone |
| IT-DOCS-01 | Shown code examples typecheck and render as documented | Documentation/component tests | Milestone |
| PKG-CHECK-01 | Packed archive contains exactly intended files, metadata, CSS and licenses | `npm pack --dry-run` + inspection | Release |

**Fast:** focus unit checks, affected TypeScript/lint and CSS assertions; do not run
full browser matrix on every edit. **Task:** real component and consumer boundaries;
fix local regressions. **Milestone:** Chromium/Firefox/WebKit browsers, responsive
viewports, meaningful keyboard flows and screenshot comparisons. **Release:** clean
installation, license audit, exact npm tarball, version/tag consistency, changelog,
security checks and human approval. A deferred or blocked case stays NOT RUN/BLOCKED.
Optimize slow fixtures without weakening actual integration boundaries.

### Publishing gate (not granted)

Public versioning uses SemVer. Before npm publication: verify owner controls the npm
scope, GitHub repo and package name; remove `private: true` only after separate approval,
set a reviewed version and changelog, test actual tarball consumers, and configure npm
trusted publishing with an exact workflow/repository identity. Use OIDC on approved
GitHub-hosted runners and an appropriate Node/npm version. Verify the released artifact
exists and its tag/digest matches the reviewed commit. No tag rewrite, unapproved merge,
automatic publish, or unapproved paid service use.

## Status and integration order

1. Scaffold is structural only. No npm install/build/browser checks have been run.
2. `T-001`: validate the package graph and commit the lockfile.
3. `T-002`: establish semantic tokens and four accessible theme variants.
4. `T-003`: establish the package build, types and export contract.
5. `T-004`: deliver Button, Input and Dialog as the first real component slice.
6. `T-005`: verify Tailwind source detection and real packaged component styling in Vite and Next.js.
7. `T-006`: validate Storybook, landing documentation, consumer E2E and release readiness (no publication).
8. The owner reviews each accepted task. Full non-chart catalog work and publishing are later approval gates.

**Open external blocker:** npm owner identity and package availability are not
verified. This blocks publishing, not local scaffold engineering. The initial Git
base SHA and actual remote repository creation are also not established; no agent may
invent or silently create them.
