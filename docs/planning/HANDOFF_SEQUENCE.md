# Soft Elevation 0.2.0 — remaining local work

Owner-approved design prerequisite: D-23 and the attached Soft Elevation prototype. Current branch: `feat/soft-elevation-v0.2.0`, draft PR #6. This is a **remaining-work index**, not evidence that the work has passed.

| Order / single assigned task | Prerequisite | State |
| --- | --- | --- |
| [T-014 — visual parity and screenshots](../tasks/14_T-014_soft-elevation-visuals__Codex-Sol-5-6_high.md) | Source branch and installed local browser/runtime | EXECUTED 2026-11-16 on PR head `1004c6e76e…` (Node v26.13.0, pnpm 11.9.0): 11 reviewed JPEG assets committed, baselines updated after diff review, parity matrix and README links filled — **PASS** |
| [T-015 — build, consumers, security and archive qualification](../tasks/15_T-015_soft-elevation-release-qualification__Codex-Sol-5-6_high.md) | T-014 visuals reviewed; current PR commit recorded | EXECUTED 2026-11-16 on the same SHA: build/types/unit/contract/docs/browser/brand/next all **PASS**, audit clean, registry `latest` still 0.1.0, `darizae-marisma-0.2.0.tgz` packed, inspected and SHA-256 verified (`d2e96394…`), tarball-installed consumers **PASS** — see PR #6 ledger |
| [T-016 — Markdown/routing hygiene and PR evidence](../tasks/16_T-016_soft-elevation-docs-hygiene__Codex-Luna-5-6_high.md) | T-014 and T-015 evidence or explicit recorded blockers | EXECUTED 2026-11-16: README/story links verified against committed files, version and lockfile consistent, routing/handoff statuses reconciled, PR #6 ledger updated — **PASS**; remaining gates are owner merge approval, then separate publication authorization |

Execute one task at a time, respecting existing `AGENTS.md`, `docs/agent/ROUTING.md`, and the current approved decisions. All artifacts join the **same PR**; no remote CI requirement is added. A reviewer must see real visual/browser and packaged-consumer results before marking it merge-ready. Merge, tag, deploy and npm publication require separate owner consent.
