# Marisma 0.3.0 — official release evidence

**Status: PUBLISHED / INDEPENDENTLY VERIFIED** — 2026-11-22, owner-authorized npm publication and 2FA; no Flowstead UI modification.

## Immutable release identity

| Field                                                         | Verified value                                                                                    |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| npm package                                                   | `@darizae/marisma@0.3.0`                                                                          |
| Public registry                                               | https://www.npmjs.com/package/@darizae/marisma/v/0.3.0                                            |
| Git source commit                                             | `c329b6fdc3f8981b3a03f38fea84c24d723f71d1`                                                        |
| Git tag and GitHub release                                    | [v0.3.0](https://github.com/darizae/marisma/releases/tag/v0.3.0)                                  |
| Exact staged archive                                          | `priv/tarballs/darizae-marisma-0.3.0-c329b6fdc3f8.tgz` (ignored, owner-private)                   |
| SHA-256 — staged **and** independently downloaded npm archive | `a0b590f606c36e9d289371597ce3e163244c2060defbeef5be634d2dbfe95942`                                |
| npm SHA-512 integrity                                         | `sha512-jp+QJ/cswJLX2TG84MA6/K6RN2mbDG2J8DM5rbWMRBx+H/W39VpSY3SBV/MCpz79chMMhKpaXn+8tA7s8CpKWA==` |
| Packed file count                                             | 100                                                                                               |
| Package archive size                                          | 47,556 bytes                                                                                      |
| Tracked source manifest                                       | `private: true`; staged/published archive omits this field                                        |
| Latest dist-tag                                               | `0.3.0`                                                                                           |

## Qualification and security — PASS

1. `priv/release/test-toolkit.sh` PASS: wrong-registry, wrong-identity, archive hash, republish and non-interactive publishing refusal gates.
2. `priv/release/doctor.sh` PASS: npm identity `darizae`, official registry `https://registry.npmjs.org/`, `auth-and-writes` 2FA, clean package source.
3. `priv/release/prepare.sh 0.3.0 c329b6fdc3f8981b3a03f38fea84c24d723f71d1` PASS: reproducible frozen install; 56 component unit tests; package build/types/contract; Storybook docs, 40 Chromium browser interactions, 4 visual cases, brand test, Next browser test, 2 packed Vite/Next.js consumer tests. Production/full dependency audits clean, license/provenance/allowBuilds and archive allowlist/security scans PASS.
4. `node --test packages/ui/src/styles/theme.test.mjs` PASS: 10 theme/contrast tests; `pnpm --filter @marisma/showcase build` and `test:browser` PASS: 9 responsive/browser tests, four themes, field motion, toast interactions, reduced motion, forced colors and favicon.
5. `priv/release/verify.sh` PASS: SHA-256/source binding, archive scan, two freshly installed packed Vite/Next.js consumers.
6. Owner-controlled `priv/release/publish.sh` PASS: exact package, commit and SHA-256 typed confirmation in a real TTY, npm browser 2FA approval, `+ @darizae/marisma@0.3.0`. npm publication initially returned accepted/processing and propagated metadata and tarball asynchronously. No duplicate publish was attempted.
7. `priv/release/postpublish.sh` PASS: npm registry name/version/integrity and independently downloaded package SHA-256 identical to the staged artifact, plus fresh Vite/Next.js consumers.
8. Git annotated tag `v0.3.0` references **the exact artifact source SHA** `c329b6fdc3f8981b3a03f38fea84c24d723f71d1`. Owner-approved GitHub release is public.

## Delivered changes

- PR #8: measured semantic motion in reusable buttons/overlays/menus/selects/chevrons/loading states, native field feedback, accessible reduced-motion/forced-colors fallbacks, and a dependency-free Sonner-inspired toast stack; four Marisma themes retained.
- The six-page React/Vite gallery remains a **repository sample app**, not an additional published npm package. All 48 library families are discoverable through its Storybook-linked explorer.
- PR #10: repaired the release consumer harness so each new version reads the current source manifest rather than assuming `0.2.0`.
- Flowstead's icon-jump feature remains a separately committed **plan only**. Flowstead is not upgraded to 0.3.0 or deployed by this release.

## Explicitly not performed

Manual VoiceOver, native Safari and physical touch-device audits are **NOT RUN** and are not claimed as certification. No npm account settings/2FA changes, new CI, production service deployment or Flowstead app integration.

## Immutable archive README note

The published archive was frozen before npm publication, so its bundled `README.md` still uses prepublication wording such as `release candidate` and calls 0.2.0 the previously verified registry version. The package name/version, API, executable code and archive integrity are correct; this is a documentation-only snapshot limitation. The repository README and release notes were updated after publication. The immutable 0.3.0 archive was **not** changed or republished.

## Private toolkit backup

Release staging files under `priv/release/` and `priv/tarballs/` are intentionally Git-ignored. Back up the credential-free toolkit and candidate/digest record to a private location controlled by the owner; never copy `.npmrc`, auth tokens, npm cache logs or credentials into Git.
