# 13 — T-013: Secure npm release preparation

**Status:** OWNER-APPROVED for release-security preparation/checkpoints A and B and the non-executing proposal in C, **after PR #3 is merged**. **Actual publication is separately blocked.**
**Repository:** `darizae/marisma` · **Publication target:** `@darizae/marisma` · **Chosen method:** owner-operated manual local 2FA publication, no publishing token or release CI · **Verification:** local-first.
**Dependencies:** Implemented 48-candidate component catalog, existing local T-011/T-012 qualification evidence, current package metadata and owner's approved decisions.

## Objective and threat boundaries

Prepare a **secure, auditable first npm release** of the existing React 19 / Tailwind CSS 4 UI package without adding features, a backend, or another package. A published npm dependency executes code inside consumers' applications: protect (1) publish identity and credentials, (2) source/dependencies/build process, (3) published tarball contents, and (4) untrusted data in public component APIs. This reduces risk; it cannot guarantee a package is immune to every malicious attack.

The GitHub repository is **public**. The package remains **`private: true` at `0.0.0`**, and no npm release has occurred. The current `docs/release/T-011_RELEASE_CANDIDATE.md` records local passes and omissions. New security checks are **NOT RUN** until there is actual command evidence.

## Read set and edit boundary

**Initial read set:** `AGENTS.md` → `docs/planning/APPROVED_DECISIONS.md` → the release/security sections of `docs/planning/ENGINEERING_CONTRACT.md` → this file → `docs/agent/ROUTING.md` → `.agents/skills/engineering-quality/SKILL.md` → `docs/planning/VERIFICATION_AND_RELEASE.md` and `docs/release/T-011_RELEASE_CANDIDATE.md` → `packages/ui/package.json`, `packages/ui/src/index.ts`, `pnpm-workspace.yaml`, `pnpm-lock.yaml`, `packages/ui/package-contract.test.mjs`, `.gitignore`, local consumer tests.

**Allowed for this approved preparation assignment:** narrowly necessary package/manifest/lockfile corrections, security-sensitive component fixes and focused tests, maintainers' package/release documentation, and *local* release test scripts where actually needed. No new remote CI, deployment, network service, new component family, npm credential, registry modification, tag, visibility change or public publish. Split any real component vulnerability fix into a focused reviewed change; do not conceal it inside a broad release commit.

## Checkpoint A — Supply-chain and application security

1. **Account/registry ownership (owner-executed, no credentials shared with workers):** verify the actual npm identity, `npm config get registry`, `npm whoami`, ownership of the `@darizae` npm scope and exact package availability. An unauthenticated registry 404 is *not* ownership proof. Confirm the public GitHub repository URL and npm metadata match. Keep passwords, tokens, OTPs, recovery codes and `.npmrc` auth out of source, chat logs, PRs and build artifacts.
2. **Publishing access:** prefer an **interactive local first release with strong npm account 2FA/security key** and no long-lived automation token. After separately authorized publication, the **owner** sets package publishing access to **require 2FA and disallow tokens**. Review any collaborator write permissions and protect `main` against accidental force-push/deletion without forcing slow remote checks. Turn on available GitHub Dependabot alerts, secret scanning and push protection without adding a CI workflow.
3. **Dependencies:** review direct and high-risk transitive runtime dependencies, lockfile changes, package provenance and licenses; execute local `pnpm audit --prod` and a full `pnpm audit`. Record advisory IDs, reachability, fix/mitigation or explicit unresolved risk. Treat a registry/audit network failure as BLOCKED, never clean. Review installation lifecycle scripts; the current reviewed `allowBuilds` entry is limited to esbuild—any extension must be justified by version, source and behavior, not a wildcard. Do not run `audit --fix`, `--force`, or a mass upgrade automatically.
4. **Code trust boundaries:** inspect package runtime imports and public components for unsafe HTML injection, URLs passed as javascript schemes, DOM/effect cleanup, dynamic style/attribute abuse, untrusted text/code/data output, clipboard error behavior, file metadata handling (Dropzone does not upload or malware-scan), excessive serialization and uncontrolled resource use. Test genuine negative inputs and SSR/hydration, not only happy paths. Review the packed JS/CSS for unintended `eval`, remote network calls, embedded secrets, install-time hooks and extra runtime code.
5. **Owner review gate A:** provide a concise threat register `Risk | Surface | Mitigation | Evidence | Residual risk | Decision`. Blocking: unexplained high/critical vulnerabilities affecting published runtime, secrets in artifact, unreviewed install scripts, or unidentified npm publishing owner. Do not claim full security certification.

## Checkpoint B — Reproducible local release qualification

Execute on the owner's machine (or explicitly documented trusted local environment), recording date, OS, Node/pnpm versions, commit SHA, exact command and PASS/FAIL/NOT RUN/BLOCKED:

- Clean `pnpm install --frozen-lockfile`; `pnpm --filter @darizae/marisma --fail-if-no-match test`, `typecheck`; `pnpm build`; `pnpm typecheck`; `pnpm test:package-contract`.
- Relevant Storybook docs/build/Chromium interaction and brand checks; local tarball-installed production Vite and Next.js consumers (`test:consumers`, `test:next`). Avoid repeated full-browser runs during ordinary edits; one deliberate final sweep is enough after fixes.
- Test the claimed Node engine lower bound (`>=22.14.0`) locally or explicitly narrow the published claim. Firefox/WebKit can remain NOT RUN if support claims and owner risk acceptance make that transparent; do not invent platform coverage.
- From `packages/ui`, run `npm pack --dry-run --json` on the built package and inspect the complete inclusion list. Pack to an ignored `priv/tarballs/` location, inspect `tar -tzf` and the real archive contents, record SHA-256 hash, build/types/theme exports/peer ranges/license/README, and verify **no source credentials, private planning notes, local environment files, tests, caches, private keys or unrelated docs** are shipped.
- Install **that exact tarball**, not a workspace symlink, into fresh Vite and Next.js test consumers; check production CSS `@source`, themed portals, smoke behavior, SSR/hydration and imports. Treat failures as a release blocker or present explicit scoped risk for owner decision.
- Confirm `@darizae/marisma` is the name in every manifest, test, README and registry check; use strict `--fail-if-no-match` filters.

**Gate B output:** a short release evidence appendix with immutable commit SHA, selected package version (if approved), artifact path/hash, test outcomes, dependency advisory disposition and unresolved browser/platform constraints. Do not rewrite prior evidence as if it were rerun.

## Checkpoint C — Publication proposal (STOP before publish)

1. Request the owner's choice of first public version (suggest `0.1.0` for an explicitly prerelease-stability API, or a separately justified `1.0.0` commitment), supported Node/browser policy, npm scope ownership and security-risk exceptions. Version `0.0.0` is **not** silently promoted.
2. Prepare `CHANGELOG.md`, package instructions and a reviewed `package.json` plan. `private: true` must remain until publication is explicitly authorized. Ensure `publishConfig` and registry target cannot send the package to an unintended registry; no token-bearing config is committed.
3. **Binding release method (owner-selected):** interactive **local, owner-operated manual 2FA publication only**, after a second explicit authorization for the exact package version and tarball SHA-256. The owner will use `npm publish <reviewed-tarball.tgz> --access public` from the correct authenticated npm account/registry and handle the authentication prompt themselves. The worker must **not** request npm credentials, create/use write tokens, run `npm login`, `npm publish`, `npm stage publish`, set registry permissions, change the package's `private: true` publication guard, or introduce a GitHub release/publish workflow. Before that approval, the agent can propose the exact manifest/CHANGELOG patch (including the publication-guard change) in its completion report, but must not execute that patch. The owner-approved publication preparation may use `npm pack --dry-run` and local nonpublishable tarballs. After the owner approves a publishable manifest, **rebuild, repack, inspect, hash and reverify the final artifact** rather than assuming a private rehearsal tarball is identical.

4. After separately authorized publication, verify `npm view @darizae/marisma version`, public scope/access, published files/integrity, and install the exact version from the **registry** in fresh Vite and Next.js consumers. Only then create an approved version tag/release note. Keep original artifacts and release evidence.
5. Incident plan: if a token/account/package is compromised, immediately stop publishing, revoke credentials/sessions, investigate malicious versions and affected users, publish a reviewed patch when safe, and **deprecate** affected versions with owner approval. npm published `name@version` pairs are immutable; never promise overwrite or silent rollback. Document maintainer contact and a responsible security-reporting channel without exposing private contact data.

**Stop conditions:** worker reports reviewed diffs, risks, exact evidence and unverified items; no merging, npm login/OTP, `private: true` toggle, publishing, release tags or registry setting changes without an explicit owner instruction for that specific action. No automatic GitHub Actions pipeline.

## Execution checkpoint

**Working branch prerequisite:** Merge reviewed PR #3 first, then begin from the latest `main` SHA on a new task branch; do not run from a stale historical base or an agent's unreviewed changes. If PR #3 remains open, STOP and report that the spec is not present on `main`. This approval is for preparation only and cannot be interpreted as approval to publish.

## Maintainer references

- npm public scoped publication: https://docs.npmjs.com/creating-and-publishing-scoped-public-packages/
- npm two-factor publishing policy: https://docs.npmjs.com/requiring-2fa-for-package-publishing-and-settings-modification/
- npm trusted publishing and provenance tradeoffs: https://docs.npmjs.com/trusted-publishers/
- npm package dry-run inclusion checks: https://docs.npmjs.com/cli/v11/commands/npm-publish/
- pnpm dependency vulnerability audit: https://github.com/pnpm/pnpm/blob/main/pnpm/docs/cli/audit.md
- GitHub repository security features: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-security-and-analysis-settings-for-your-repository
