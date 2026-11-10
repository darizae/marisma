# Marisma UI package

This package is a **prerelease engineering scaffold**. The component exports have not
been implemented or qualified. Do not publish it or describe it as installable yet.

Its public styling contract is Tailwind CSS 4 utilities with native `@theme`-driven
semantic tokens. Consumers configure Tailwind and register Marisma's package source
with `@source`. The draft theme entry is `@darizae/marisma/theme.css`; package naming
and npm scope control must be verified before a public release.

The approved technical contract is in
`../../docs/planning/ENGINEERING_CONTRACT.md`; each approved, sequenced work unit
is a separate Markdown file under `../../docs/tasks/`. Acceptance cases and release
gates are in `../../docs/planning/VERIFICATION_AND_RELEASE.md`.
