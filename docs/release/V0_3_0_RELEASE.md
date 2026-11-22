# Marisma 0.3.0 official release evidence

**Status: PREPARING (not yet published)** — owner authorized all steps on 2026-11-22.

## Release scope

- Merged motion and visual-interaction vocabulary from PR #8; existing public React component APIs and all four theme combinations remain intact.
- Animated text fields, selection feedback, overlay motion, chevron/arrow/pulse/loading behavior; reduced-motion and forced-colors fallbacks.
- Compact theme-aware, accessible Sonner-inspired toast stacking with hover/focus pause, action and swipe dismissal. No dependency on Sonner.
- Six-page navigable showcase, accessible mobile sidebar, 48-family explorer, forms/filters/calendar/motion demos, canonical SVG favicon and 13 React screenshots.
- Flowstead icon animation remains only a separately committed design plan in Flowstead. **Do not change Flowstead's dependency or UI as part of Marisma publication.**

## Exact-artifact gate

To complete after local qualification: preserve final release source SHA, candidate package file list, SHA-256 digest, npm owner identity and 2FA status, independent Vite/Next consumers from that exact tarball, npm registry evidence, Git tag and GitHub release URLs. A generated artifact is not a release until registry and archive checks match.

## Manual accessibility residuals

Manual VoiceOver, native Safari and physical touch-device evaluation are not part of the automated Chromium verification suite and must not be represented as passed.

## Publication boundary

Tracked `packages/ui/package.json` remains `private: true`; only allowlisted staged archive can be publicly published by the owner-private toolkit. No npm tokens, browser sessions or other credentials are committed.
