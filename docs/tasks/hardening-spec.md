Marisma — Post-implementation review
Repository: darizae/marisma · Reviewed branch: main · Commit: 395319d

The repository has changed substantially since the previous review. All five remaining release clusters, T-007 through T-011, now have implementation commits on main. PR #1 was merged, and the original six tasks remain preserved as historical specifications.
11/11
Task stages committed

48
Non-chart candidates covered by the plan

0
GitHub releases recorded

Implementation commits and source files are evidence of delivery, not by themselves proof that every test or release gate passed.
The repository now has implementations for interaction controls, forms, composed fields, data displays and application layouts, together with Storybook examples and a new release-candidate report.

This is no longer just a scaffold or three-component prototype. The remaining question is whether the implementation meets the approved quality and distribution contracts well enough to release. 2. Review findings
The repository's local test results are documented, but I did not independently execute those tests on your Mac. The findings below distinguish reported test evidence from issues confirmed by reading the code.
Priority Finding Recommendation
P0 Incorrect package name in release evidence Correct and rerun affected checks
P1 Async save failures in InlineEdit Handle rejected saves explicitly
P1 DateField required validation semantics Verify native form submission behavior
P2 DataPreview serializes before truncating Bound expensive serialization work
P2 Some planning documents remain stale Reconcile current repository status

P0 — The release report contains misleading test evidence
The actual package is:

@darizae/marisma

But the release-candidate report uses @darizee/marisma in five places, including both UI test commands and the npm namespace availability check.

This matters because pnpm filters select packages by their names. Unless --fail-if-no-match is supplied, a filter matching no project need not cause the command to fail.

pnpm

Consequently, the report's final UI unit-test and package-specific typecheck results are not reliable evidence of those commands running.

The separate workspace-wide typecheck is recorded as passing, so this doesn't invalidate every result in the report.

The correct local commands are:
pnpm --filter @darizae/marisma --fail-if-no-match test
pnpm --filter @darizae/marisma --fail-if-no-match typecheck

The npm namespace check must also use @darizae/marisma.

Release-candidate evidence report
P1 — Two component API concerns
InlineEdit async errors. Its onSave callback explicitly supports a Promise, but if that Promise rejects, the internal save() function resets its saving state without catching the rejection. Because event handlers call void save(), a rejected save can become unhandled instead of producing useful feedback.

That is a realistic failure path for an editing component designed to work with application-owned persistence. The existing tests cover successful saves, not rejected saves.

Inspect InlineEdit

DateField required validation. The visible input is read-only and uses aria-required, while the submitted ISO date comes from a hidden input. The required prop therefore does not appear to enforce native browser form validation.

That may be intentional, but the public API needs a clear contract. I'd add a real browser form-submission test for an empty required date before considering this settled.

Inspect DateField
P2 — DataPreview and documentation hygiene
DataPreview caps the rendered string, but first runs JSON.stringify on the entire supplied value. Very large or deeply nested objects can therefore still cause expensive work before the cap applies. It also uses a global WeakSet, which can label repeated shared objects as circular references even when there is no cycle.

The component is otherwise appropriately using text rendering rather than injecting HTML. This needs a bounded performance fix, not a redesign.

The engineering contract also still describes GitHub as public and references an old planning-PR baseline. The repository is currently private. Its status should be reconciled with the intended public GitHub release before publication. 3. What is already in good shape?
My static review supports the following conclusions.
Area Assessment
Full non-chart catalog All 48 source candidates have destinations, implementation files and documented evidence references
Tailwind CSS 4 Preserved as the sole styling system
React/Next boundaries Public exports, client components and package consumer fixtures are present
Accessibility infrastructure Radix primitives, focused component tests and real-browser keyboard cases
Documentation Substantial Storybook catalog, component READMEs and release report
Branding Canonical leaf SVG, landing and Storybook integration retained
Testing policy Local-first, with no automatic GitHub Actions workflow
Package distribution ESM, TypeScript declarations, peer dependencies and tarball verification
Plotting Correctly remains deferred

The test report records passing local Chromium and installed-package consumer checks. Firefox, WebKit and native Safari are explicitly not verified. That's acceptable as a disclosed qualification limitation, provided Marisma doesn't claim broader verified browser compatibility.

Similarly, the project was tested using Node 26.13.0, while its manifest declares support from Node 22.14.0. Testing the lower bound locally would strengthen that compatibility claim. 4. Recommended next step: one release-hardening pass
I would not create another large development roadmap or restart discovery. You have reached the stage anticipated by the original interview: the complete non-chart library is implemented and needs owner acceptance.

One focused local-only hardening task is enough to resolve the findings.
T-012 — Release hardening
Implemented locally in this working change; owner review pending

One bounded task, no new component families, no GitHub CI.

1. Correct the package identity typo and rerun the affected local checks with strict package matching.
2. Fix and test the rejected-save path in InlineEdit and required-date behavior in DateField.
3. Make DataPreview handling safe for large input, with regression coverage.
4. Reconcile stale Markdown, rerun the relevant local package and consumer checks, and issue a corrected release-candidate report.

After that, the remaining decisions are release-specific: your intended npm version, scope ownership, public repository visibility and whether to qualify additional browsers before publication.

My assessment: Marisma is now a credible full-catalog release candidate, not an incomplete prototype. I would withhold final T-011 acceptance until the test-evidence typo is corrected and the focused API issues are reviewed. No architecture change or remote CI expansion is necessary.
