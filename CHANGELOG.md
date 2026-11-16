# Changelog

All notable changes to Marisma are documented here.

## [Unreleased]

## [0.2.0] — 2026-11-16

- Adopted owner-approved **Soft Elevation (Concept 03)** as the default appearance across Marisma's semantic Tailwind 4 component styling, without a separate style switch.
- Added separate card, control and navbar radius tokens; surface-border, separator, input-border, hover and selection tokens; and card, popup and navbar elevation tokens. Retained the stronger original border token for accessibility and consumer compatibility.
- Refined cards, data containers, form controls, selection widgets, overlays, feedback, tables, navigation and application layouts for reduced chrome and clearer surface hierarchy.
- Tuned Reedwater/Tidal Blue light and dark appearances independently. Kept semantic feedback colors, keyboard focus, forced-colors and reduced-motion behavior.
- Updated Storybook application stories, developer example, landing page and Vite/Next.js consumer fixtures to reflect the design direction.
- No intended public React component API changes. Visual migration: custom consumer layouts using `border-mar-border` may opt for `border-mar-separator`, `border-mar-input-border` or `shadow-mar-card` as appropriate; the stronger `border-mar-border` remains available.
- **Release:** qualified on source `fc3dc39d66bdd2d11027b87927d5b2bade148611` and published from the reviewed staged artifact (SHA-256 `8f4b9318f77c7e998cecdf266e87799b1e7cd50be1c0420a3d9edd0abce80852`); registry and tarball-installed consumer verification in `priv/release/postpublish.sh` evidence.

## [0.1.0] — 2026-11-11

- Completed the first-release component catalog documentation and local
  release-candidate qualification for the package.
- Documented React 19, Tailwind CSS 4, installed-package `@source`, Vite, and
  Next.js consumer setup.
- Added local evidence for Storybook, landing, browser, packaged-consumer,
  licensing, and artifact checks.
- Added local npm identity, dependency, artifact, and release-toolkit security
  gates for exact reviewed release candidates.
- Published `@darizae/marisma@0.1.0` from the approved SHA-256 artifact and
  created the `v0.1.0` GitHub release.
- Updated the local Next.js consumer and forced Storybook's advisory-affected
  docgen `glob` range to a patched release, with local compatibility checks.
- Narrowed the Node.js engine floor to the directly verified `>=22.18.0` after
  the current test and build toolchain proved incompatible with earlier 22.x.

## [0.0.0] — Unpublished prerelease

- Initial private development release. Publication remains a separate owner
  approval gate.
