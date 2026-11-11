# 10 — T-010: Data display, navigation and application-scale composition

**Status:** LOCALLY VERIFIED; OWNER REVIEW REQUIRED · **Phase:** S3, cluster 4/5 · **Repository:** darizae/marisma
**Dependency:** T-009 accepted; core controls, overlays and form compositions established.

## Outcome and exact catalog coverage

Complete **2 general UI candidates**: Sidebar, Table. Complete **2 composed-field candidates**: Page title field → PageHeading and User menu → UserMenu. Complete all **9 application-composition candidates**: Error page view → ErrorView; Application navbar → AppNavbar; Record list view → RecordList; Application shell → AppShell; Card grid → CardGrid; Footer → PageFooter; Navigation progress → StepProgress; Raw-data view → DataPreview; Page section → PageSection. This is the full approved layout/data catalog, not permission to copy app-specific assumptions.

## Public responsibility boundaries

All components are _presentational and composable_. Apps supply routes, links, auth/user state, record data, sorting/filtering behavior, async loading/retries, and navigation logic. Public navigation accepts native links or consumer-provided link components without mandatory Next.js or router imports. Table is an accessible semantic table, not an unpromised enterprise data grid. DataPreview safely renders supplied structured/text data, enforces size/collapse limits and never injects untrusted HTML.

## Internal delivery checkpoints

**A — Data and content structures:** Table, RecordList, CardGrid, DataPreview and PageSection. Accessible table headers, row actions, empty/loading/error states, responsive overflow, safe cell composition, stable keys, long-content truncation, selection semantics only when explicitly implemented. Document where caller owns sorting and filtering.

**B — Navigation and shell:** Sidebar, AppNavbar, AppShell, PageFooter and StepProgress. Clear landmarks, skip links, responsive navigation and mobile overlay behavior; focus order and dismissal, current/active states, keyboard navigation, sticky/scroll interactions, narrow viewport and long-label scenarios. Navigation must remain router-agnostic.

**C — Page-level patterns:** PageHeading, UserMenu, ErrorView. UserMenu accepts caller-owned identity/actions; ErrorView exposes consumer-owned retry/links; do not embed session fetching or product-specific copy. Include realistic composed page examples to prove the parts interoperate, with both accent families and dark mode.

## Implementation boundary

**First read:** AGENTS.md → ENGINEERING_CONTRACT.md → this file → T-010 routing row → engineering-quality skill → catalog, relevant verification cases and existing primitives/field compositions.

**Allowed paths:** packages/ui/src/components/, src/lib/, src/index.ts, relevant tests/stories, narrowly needed consumer/showcase fixtures and public docs. No application server/data model/auth backend, no proprietary routing adapter, no plotting, no CSS architecture change.

## Local acceptance evidence

- Every listed candidate gets a disposition and a public tested composition or approved merge; no silent exclusion.
- Realistic local fixtures include empty, loading, error, long text, large record counts where reasonable, narrow/mobile widths and keyboard-only navigation.
- Verify semantic table and layout structure, native/consumer link behavior, mobile disclosure/focus, theme scoping and responsive screenshots in local Playwright. Measure/mitigate avoidable rendering overhead for long lists without inventing virtualized-grid features.
- At cluster gate run owning unit/type/build checks, selected integrated Storybook flows, Vite and Next.js package compatibility for exposed patterns, and record actual PASS/FAIL/NOT RUN evidence.

**Stop:** owner checks full catalog reconciliation and integration evidence before T-011. Do not merge/publish automatically.

## Local completion evidence — 2026-11-11

All checkpoints A, B, and C are implemented. Every listed candidate is an
ADAPT disposition with a typed public export, focused unit coverage, and a
public Storybook story; the catalog records exact destinations and evidence.

- PASS — `pnpm --filter @darizae/marisma test` (Vitest/jsdom unit suite).
- PASS — `pnpm typecheck` (workspace TypeScript checks).
- PASS — `pnpm build` and `pnpm test:package-contract` (ESM/declarations,
  client boundaries, packed exports, and independent type/runtime consumer).
- PASS — `pnpm --filter @marisma/storybook test:browser` (local Chromium,
  including IT-COMPOSITION-01 data states, keyboard overflow, responsive
  sidebar focus/dismissal/theme behavior, landmarks, and composed-page flow).
- PASS — `pnpm --filter @marisma/storybook test:visual` (local Chromium on
  macOS; Reedwater light desktop and Tidal Blue dark mobile baselines).
- PASS — `pnpm --filter @marisma/storybook test:consumers` (tarball-installed
  production Vite and Next.js consumers, including Table and UserMenu).
- PASS — `pnpm --filter @marisma/storybook test:next`; the harness now builds
  the workspace Next.js fixture before starting it so stale output cannot pass
  or hide a changed fixture.
- PASS — `pnpm --filter @marisma/storybook test:docs`,
  `pnpm --filter @marisma/storybook build`, and
  `pnpm --filter @marisma/landing build`.

Clean-checkout frozen installation and the full release qualification sweep are
NOT RUN here; they remain T-011 gates. npm publication, tagging, deployment,
merge, and remote CI are not authorized by this checkpoint.
