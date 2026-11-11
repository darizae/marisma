# 11 — T-011: Full catalog documentation, local qualification and release preparation

**Status:** LOCALLY VERIFIED; OWNER REVIEW PENDING · **Phase:** S4, cluster 5/5 · **Repository:** darizae/marisma
**Dependency:** T-007 through T-010 accepted with all catalog dispositions resolved. Publication is a separate explicit approval.

## Outcome

Deliver a coherent **complete non-chart Marisma release candidate**: verified component APIs, Storybook catalog, polished estuary-inspired landing page, consumer installation guidance, local acceptance evidence, package/license audit and a reviewable publication proposal. Charts, scientific plots and visualization runtime dependencies remain deferred.

## Internal delivery checkpoints

**A — Documentation and developer experience:** For every approved public export or composition, add a working Storybook story (normal, state variants, errors/empty, disabled, theme and responsive where relevant), precise prop/keyboard notes and verified usage snippet. Update the README and package README for real adopters, not internal planning. Cover installation prerequisites: React 19, Tailwind CSS 4, @source installed dist, Vite and Next.js setup, tokens and both theme families. Landing page shows real capabilities and clear docs links, without implying npm publication or production use while private. Keep the approved owner-supplied leaf brand asset at `assets/brand/marisma-leaf.svg` visible in README, landing, Storybook manager branding and SVG favicons, with only one canonical SVG file. Verify favicon and brand image URLs in both local built apps, including base-path behavior. Review `docs/planning/APPROVED_DECISIONS.md` before final public copy.

**B — Local qualification, not remote CI:** Use small unit/type loops during edits; locally execute the complete relevant unit suite, package build and contract checks, documented-example tests, Storybook interactions/a11y checks, representative Playwright screenshots, keyboard flow checks, and tarball-installed production Vite/Next.js consumers. Run local Chromium, Firefox and WebKit checks where supported/appropriate; note that Playwright WebKit is not identical to native Safari. Inspect bundle weight/peers, unwanted runtime dependencies, React client directives, source detection, theme portal behavior, license notices, and no global styling surprise. Maintain a concise test-evidence table with command, platform, date, result and omissions. GitHub Actions is optional and **not required**.

**C — Release candidate and external publication gate:** Reconcile the approved decision record and all 48 catalog candidates (with 3 existing and remainder covered by T-007–T-010). Each row gets PRESERVE/ADAPT/MERGE or explicit owner-approved EXCLUDE; record public export or documented composition and test evidence. Verify source licensing, complete npm tarball, files/exports, semver/changelog and docs links; confirm that npm identity @darizae/marisma is controlled and name available. Prepare a reviewed version and exact release checklist. Do **not** change private:true, tag, publish, configure paid hosting, or deploy without owner authorization specific to those actions. For release operations, manual local publishing is acceptable; no GitHub Actions publish workflow is required.

## Implementation boundary

**First read:** AGENTS.md → APPROVED_DECISIONS.md → ENGINEERING_CONTRACT.md → this file → T-011 routing row → engineering-quality skill → COMPONENT_CATALOG.md, VERIFICATION_AND_RELEASE.md → README.md, packages/ui/README.md, apps/storybook/, apps/landing/ and the Vite/Next.js consumer harnesses.

**Allowed paths:** approved-decision/brand documentation and linked assets (only if fixing a verified issue), docs, README files, Storybook and landing, browser/consumer fixtures, release checklists and narrowly justified package metadata fixes. Functional regressions discovered here should return to the owning cluster via a focused corrective subtask; do not silently redesign the library.

## Acceptance evidence and stop rule

- All approved non-chart candidates accounted for, with public/stories/test pointers, or an explicit unresolved owner decision. No empty feature row is called finished.
- Local checks required for release candidate either PASS with reproducible logs or BLOCKED/NOT RUN with risk documented. No remote CI requirement and no claims of an accessibility certification from automated checks.
- Documentation accurately reflects published vs private status; install instructions tested from an actual package artifact, not a workspace alias.
- Deliver a release-candidate report with feature completeness, outstanding defects, tested browsers/platforms, exact packed artifact and a publication/rollback proposal.
- **Stop before publication** and request owner review. A merged implementation PR is not publishing permission.
