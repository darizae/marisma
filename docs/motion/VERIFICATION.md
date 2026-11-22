# Motion showcase verification and release-readiness ledger

**Date:** 2026-11-22. **Host:** macOS arm64, Node 26.13.0, pnpm 11.9.0. **Branch:** `feat/motion-showcase-20261122` based on remote `cb2a990`. All evidence concerns _local feature-branch code_, not npm 0.2.0.

| Gate (repository root unless noted)                 | Result  | Evidence                                                                                                                                                  |
| --------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm install --frozen-lockfile`                    | PASS    | Lockfile refreshed once after new showcase workspace; frozen reinstall works                                                                              |
| `pnpm build`                                        | PASS    | tsdown output, 96 files and 179.05 KB package distribution                                                                                                |
| `pnpm typecheck`                                    | PASS    | Workspace typechecks for package, Storybook and showcase                                                                                                  |
| `pnpm test:package-contract`                        | PASS    | 1 packed ESM/types/CSS export test                                                                                                                        |
| `pnpm --filter @darizae/marisma test`               | PASS    | 54 unit tests, 11 files                                                                                                                                   |
| `node --test packages/ui/src/styles/theme.test.mjs` | PASS    | 10 checks including four theme contrast cases                                                                                                             |
| `pnpm --filter @marisma/showcase build`             | PASS    | Production Vite app generated; 149 modules transformed                                                                                                    |
| `pnpm --filter @marisma/showcase test:browser`      | PASS    | 4 Chromium tests for navigation/catalog, forms/overlays/theme, responsive/reduced-motion, four themes/320px/390px/200% zoom/forced colors and screenshots |
| `pnpm --filter @marisma/storybook build`            | PASS    | Storybook includes interactive Motion story; external Vite use-client bundling warnings, no failure                                                       |
| `pnpm --filter @marisma/storybook test:browser`     | PASS    | 40 existing component/browser cases                                                                                                                       |
| `pnpm --filter @marisma/storybook test:visual`      | PASS    | 4 screenshot comparison cases                                                                                                                             |
| `pnpm --filter @marisma/storybook test:docs`        | PASS    | 1 documentation test                                                                                                                                      |
| `pnpm --filter @marisma/storybook test:brand`       | PASS    | Sequential brand test, no errors                                                                                                                          |
| `pnpm --filter @marisma/storybook test:next`        | PASS    | 1 Next SSR/browser test                                                                                                                                   |
| `pnpm --filter @marisma/storybook test:consumers`   | PASS    | 2 packed local tarball tests with independent Vite and Next.js fixture consumers                                                                          |
| `pnpm audit --audit-level high`                     | PASS    | No known vulnerabilities                                                                                                                                  |
| Storybook docs IDs vs. all 48 explorer links        | PASS    | 48 of 48 IDs found in the compiled Storybook index                                                                                                        |
| Full manual VoiceOver screen-reader audit           | NOT RUN | Automated browser semantics and keyboard checks are not certification                                                                                     |
| Physical touch-device / native Safari visual audit  | NOT RUN | macOS Chromium Playwright tested at mobile viewports; WebKit is not Safari                                                                                |

**Prior environmental failures, resolved:** A concurrent Storybook brand build and packed-consumer test initially contended for build infrastructure; brand passed sequentially. The packed test's offline pnpm installer initially lacked `tailwind-merge@3.7.1`, `vite@8.3.8`, and `postcss@8.5.33`; these registry packages were warmed into the pnpm store, and the official packed-consumer suite subsequently passed. Concurrent `pnpm build` and showcase Vite build also conflicted in a shared distribution directory; separated runs pass. These environment caveats remain important for reproducibility.

## React visual captures

Eight Playwright screenshots in `docs/visuals/motion-showcase/`: four settings/accent/mode pairs, desktop overview (1440×900), 390px and 320px overview, and motion at forced-colors/reduced-motion. These are genuine compiled React renders, not the Shrubi HTML atlas. No screenshots contain user/private Flowstead evidence.

## Scope, risks and authorization

All 48 source-level families remain available through Storybook; the showcase live-demos a useful subset. The existing public package exports and the two accent families / two modes remain unchanged. The new motion CSS utilities are additive, with reduced-motion suppression and Radix overlay behavior maintained.

**Review-ready feature candidate, not release authorized.** Still requires owner visual acceptance and a distinct release decision/version/artifact/2FA workflow. There is no version bump, npm publish, tag, merge, production deployment or Flowstead integration. No remote CI gate was created. Flowstead adoption review is read-only (`docs/motion/FLOWSTEAD_ADOPTION_REVIEW.md`).

Start on the Mac: `pnpm dev:showcase` → `http://127.0.0.1:4178/`. On 2026-11-22, a follow-up live-preview check returned HTTP 200 and a Playwright Chromium browser loaded the `Overview` heading from the URL including `?utm_source=chatgpt.com` with no page errors. Optionally `pnpm dev:storybook` → `http://127.0.0.1:6006/`. Playwright test servers are stopped after their own test runs. A manually launched `pnpm dev:showcase` preview is a separate process and remains available only while that command is running; do not assume a checked-in screenshot or a past browser PASS means port 4178 is live.
