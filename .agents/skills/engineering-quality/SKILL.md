---
name: engineering-quality
description: Shared implementation safeguards for approved Marisma engineering tasks.
---

# Marisma engineering quality

- Build only the assigned behavior and preserve the approved React 19 + Tailwind CSS 4 architecture. No second styling technology.
- Prefer correct semantic HTML, established Radix interaction patterns when relevant, and keyboard/focus behavior verified in a browser.
- Keep components independent from application routing, authentication, data fetching and stored preferences. Use composable TypeScript contracts and documented controlled/uncontrolled behavior.
- Treat Tailwind CSS utility classes and `@theme` tokens as the single styling system. Use complete static class candidates; don't construct arbitrary class names at runtime. Maintain consumer `@source` coverage.
- Implement tests for observable success and failure states before code when practical. Focus on affected tests first; broader compatibility, screenshot and package tests run at the defined gates.
- Validate packaged imports from an actual tarball at the release gate; workspace-only links do not prove npm consumer compatibility.
- Never claim a test passed without the command and its result. Unavailable environments are NOT RUN/BLOCKED, not successes.
- Preserve the public API, dependency direction and scoped ownership. Propose extraction or package-boundary changes to the planner; don't make them autonomously.
- Make documentation immediately useful to developers. Include verified working snippets and realistic defaults, not invented capabilities or decorative audit language.
- Keep `priv/` and all credentials untracked; follow Git and release authorization gates. No automatic remote repository creation, merging, tagging or npm publication.
- Stop when the assigned acceptance criteria are met or return a specific reproducible blocker. For routine tasks, limit unchanged-hypothesis corrections to two focused attempts and verification cycles to two.
