# 13 — T-013: Secure npm release preparation

**Status:** OWNER-APPROVED for delegated, local-agent-led security preparation, private release tooling and publish-ready candidate creation **against the reviewed PR #3 branch or merged `main`**. The agent may initiate the final CLI publish **only after a distinct explicit owner approval identifying the version and exact SHA-256 artifact**. No publication has yet been authorized.
**Repository:** `darizae/marisma` · **Publication target:** `@darizae/marisma` · **Chosen method:** *agent-operated* local npm CLI using the owner's **existing authenticated session**, with owner responding personally to 2FA/OS/browser prompts. No new npm tokens, remote publishing workflow or remote CI. **Verification:** local-first.
**Dependencies:** Implemented 48-candidate component catalog, existing local T-011/T-012 qualification evidence, current package metadata and owner's approved decisions.

## Objective and threat boundaries

Prepare a **secure, auditable first npm release** of the existing React 19 / Tailwind CSS 4 UI package without adding features, a backend, or another package. A published npm dependency executes code inside consumers' applications: protect (1) publish identity and credentials, (2) source/dependencies/build process, (3) published tarball contents, and (4) untrusted data in public component APIs. This reduces risk; it cannot guarantee a package is immune to every malicious attack.

The GitHub repository is **public**. The package remains **`private: true` at `0.0.0`**, and no npm release has occurred. The current `docs/release/T-011_RELEASE_CANDIDATE.md` records local passes and omissions. New security checks are **NOT RUN** until there is actual command evidence.

## Read set and edit boundary

**Initial read set:** `AGENTS.md` → `docs/planning/APPROVED_DECISIONS.md` → the release/security sections of `docs/planning/ENGINEERING_CONTRACT.md` → this file → `docs/agent/ROUTING.md` → `.agents/skills/engineering-quality/SKILL.md` → `docs/planning/VERIFICATION_AND_RELEASE.md` and `docs/release/T-011_RELEASE_CANDIDATE.md` → `packages/ui/package.json`, `packages/ui/src/index.ts`, `pnpm-workspace.yaml`, `pnpm-lock.yaml`, `packages/ui/package-contract.test.mjs`, `.gitignore`, local consumer tests.

**Allowed for this approved preparation assignment:** narrowly necessary package/manifest/lockfile corrections (including a *proposed* version bump), security-sensitive component fixes and focused tests, maintainers' package/release documentation, and a **complete reusable owner-private local release toolkit** under ignored `priv/release/`. Check the actual local CLI execution context before starting; if the agent runs on a remote sandbox rather than the owner's authenticated laptop, perform all noncredential work there but do not assume the owner's npm login is available.

**Not yet authorized:** registry writes (`npm publish`, `npm stage`, dist-tags, deprecation, access/owner settings), automated release/CI workflows, merge to main, Git release/tag or deployment. Publishing becomes allowed **only after** an explicit, separate owner instruction specifying package version and artifact SHA-256. Do not ask for or log any password, OTP, npm token, recovery code or `.npmrc` contents. Focus source vulnerabilities in narrow reviewed changes; do not hide changes inside an opaque release commit.

## Checkpoint A — Supply-chain and application security

1. **Account/registry ownership:** The owner reports account registration, 2FA and local CLI login **already completed**. The agent must *verify*, not re-request setup: on the owner's machine run `npm whoami`, `npm config get registry`, and safe read-only `npm view @darizae/marisma name version --json` or current supported query. Require actual npm identity `darizae` (or STOP and escalate the mismatch), official registry `https://registry.npmjs.org/` and a matching scope. A registry E404 does not prove ownership. Read only the nonsecret command output; do **not** inspect `~/.npmrc`, tokens or authentication environment. If npm requires fresh browser authentication or security-key/OTP action, surface that prompt to the owner and resume afterward. If the local runner has no authorized user session, report exactly that access gap.
2. **Publishing access:** Verify the owner's account is configured for interactive 2FA by its account-reported state where a safe command is available; do not reconfigure it. Prefer no new automation tokens. After the owner-authorized publish, attempt supported CLI/API controls to require package 2FA and disallow tokens, with **separate owner approval for the registry setting change**. If the stricter disallow-token option is website-only, provide the exact page/setting and ask the owner to complete that browser-only step. Review GitHub collaborators/rules and recommend Dependabot/secret scanning/push protection; enable account/repo settings only with separate owner approval, not silently.
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

## Checkpoint C — Build the reusable **private** release toolkit and release-ready PR

The agent **must generate real reusable, runnable, locally tested scripts**, not only commands in documentation. Create the following under **`priv/release/`**, which is already ignored by `.gitignore`. They must be generated in the **owner's persistent local checkout**, not only in an ephemeral cloud sandbox, and **must never be committed, pushed, published or included in the npm tarball**:

| Private path | Required behavior |
| --- | --- |
| `priv/release/README.md` | First-publish, subsequent patch/minor, safety model, supported tooling, recovery and examples |
| `priv/release/lib.sh` | Shared bounded shell helpers: fail-safe flags, repo-root discovery, safe paths, exact version/registry/identity/commit checks, sanitized logging, macOS/Linux-compatible hash utility |
| `priv/release/doctor.sh` | Read-only checks: npm version, `npm whoami`, npm registry, expected scope, git status, local Node/pnpm and owner 2FA prerequisites; no credential reads |
| `priv/release/audit.sh` | Local dependency advisories, build-script allowlist, secrets/artifact inclusion check, report PASS/FAIL/NOT RUN/BLOCKED |
| `priv/release/prepare.sh` | For a reviewed version/commit: build/tests, copy only allowlisted package files into an **ignored clean staging directory**, make a publishable manifest there (strip `private: true` **in staging only**), pack, inspect, hash and record candidate identity; no registry write |
| `priv/release/verify.sh` | Validate exact candidate hash/metadata and run installed-tarball consumer smoke tests; make output reproducible |
| `priv/release/publish.sh` | After *separate explicit owner approval*, agent starts `npm publish <exact-reviewed-tarball> --access public --registry https://registry.npmjs.org/`; require expected name/version/sha256/git SHA and a visible human interactive confirmation; let npm prompt the owner for 2FA; no OTP as CLI argument, env var or stored file |
| `priv/release/postpublish.sh` | Read-only verify `npm view`, registry integrity/metadata, published files and fresh npm-registry Vite/Next.js install; produce outcome report |
| `priv/release/next-patch.sh` | Inspect current published version and local branch; propose next SemVer patch by default (or explicitly requested minor/major), update `packages/ui/package.json` and changelog on a **reviewable branch**, run `prepare.sh`; **do not** auto-merge or publish |
| `priv/release/test-toolkit.sh` | Exercise preflight, version/hash mismatch, wrong registry/whoami, `private: true` staging conversion, no secrets, non-TTY publish refusal, accidental re-publish protection and blocked publication without any actual network write |

Implement using auditable bash/node utilities already present on the owner's machine, not a new paid service or CI stack. Ensure no unsafe `eval`, blind `rm -rf`, uncontrolled glob, `curl | sh`, wildcard dependency-script permissions, secrets in command lines, or unbounded logs. Scripts must tolerate running from an arbitrary working directory and **must fail closed**, not infer success. Existing `priv/` user files must never be deleted or overwritten.

**Persistence:** Because `priv/` is Git-ignored, scripts will **not** survive a fresh clone. After testing, create a separate, clearly labeled **credential-free** private archive in an owner-chosen local backup directory (outside this public repository), or provide instructions for owner-controlled backup. Do not upload owner-private scripts or output to GitHub, public artifacts or a cloud sandbox. If local filesystem access is unavailable, generate an owner-private ready-to-extract archive and clearly report that the scripts have **not** been installed or run on the owner's machine.

**Version source:** Recommend `0.1.0` for the first release. Propose the tracked `packages/ui/package.json` version bump and changelog in the release-preparation PR, but retain `private: true` **in the tracked repository manifest**. The toolkit must stage a separate **publishable** candidate with the approved version and `private` removed **only from its ignored staged manifest**; validate that the tarball actually reflects it. All later patches update the tracked source version through reviewed commits, rebuild a new artifact and never reuse an old digest.

**Required safety invariants:** (1) npm account must match `darizae` (otherwise blocker); (2) only public npm registry; (3) package identity, SemVer, source commit and SHA-256 must match the approval; (4) no local uncommitted changes to any packaged source; (5) publish refuses a version already present in npm; (6) candidate generated from audited inputs and installed in clean external consumers; (7) **no npm registry-write commands are run during preparation or toolkit testing**; (8) an interactive owner presence/2FA prompt is required at publication; (9) publish is idempotent-safe after interruption (verify registry state instead of blindly retrying); (10) no credential contents are ever read, logged or copied. If npm lacks an interactive terminal/OS permissions block the worker, hand the control to the owner rather than attempting to bypass 2FA.

### Two separate execution approvals

**Approval 1 — now, for preparation:** The agent is authorized to inspect the repository and safe metadata from the **already logged-in** npm CLI, run local checks, implement fixes, create and test private release scripts, stage and verify a publishable **local** tarball, propose version/changelog and open a reviewable PR. The agent may present its exact local release command and be ready to execute it. It must not publish yet.

**Approval 2 — later, for one exact release:** Only after the owner explicitly says to publish **`@darizae/marisma@<version>`** from the final **`<sha256>`** artifact, and after that artifact is regenerated from the reviewed/merged commit, may the agent run `priv/release/publish.sh`. The agent operates the CLI; the owner handles any 2FA/security-key/browser dialog personally. Successful registry publication must be independently verified. Git tags, GitHub releases, package-setting changes and any remedial deprecation remain independently permission-gated; the agent may execute them after approval, rather than asking the owner to perform CLI steps manually.

### Required deliverables and stop conditions

1. A narrowly scoped release-preparation **PR**, security/advisory findings and documented fixes.
2. Local reproducible checks, exact platform versions, PASS/FAIL/NOT RUN/BLOCKED outcomes, candidate tarball file list and SHA-256.
3. A **tested owner-private release toolkit** at `priv/release/` with safe recovery/backup instructions and repeatable first-release, patch and verification commands.
4. Proposed release version, changelog and a **one-paragraph approval request** identifying the exact commit, candidate archive/hash, runtime/browser omissions and blocking risks.
5. A list of only genuinely owner-required interactions (e.g. 2FA prompt, new npm permission UI, review of irreversible release).

**Stop before any npm registry write or unapproved Git merge.** After explicit final approval, run the existing tool-driven command; do not needlessly bounce routine shell operations to the owner. No remote CI or publish workflow.

## Execution checkpoint

**Branch/start rule:** The owner has approved **preparation now**. If PR #3 is still open, fetch its exact head `docs/remove-deferred-scope-and-plan-npm-security`, confirm this T-013 revision exists, and create a **separate, short-lived task branch from that head**. Open a *stacked PR targeting the PR #3 branch*; once PR #3 is merged, refresh against `main` and retarget appropriately without destructive force-push. If PR #3 is already merged, branch from verified current `main`. Report branch/base SHA. Do not merge either PR without review, and do not publish until final release approval.

## Maintainer references

- npm public scoped publication: https://docs.npmjs.com/creating-and-publishing-scoped-public-packages/
- npm two-factor publishing policy: https://docs.npmjs.com/requiring-2fa-for-package-publishing-and-settings-modification/
- npm trusted publishing and provenance tradeoffs: https://docs.npmjs.com/trusted-publishers/
- npm package dry-run inclusion checks: https://docs.npmjs.com/cli/v11/commands/npm-publish/
- pnpm dependency vulnerability audit: https://github.com/pnpm/pnpm/blob/main/pnpm/docs/cli/audit.md
- GitHub repository security features: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-security-and-analysis-settings-for-your-repository
