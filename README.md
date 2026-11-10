# Marisma

A Tailwind-first React component library for professional web applications.

Marisma is being developed around accessible interactions, considered component APIs,
readable typography, and calm estuary-inspired themes. The initial library targets
React 19 and Tailwind CSS 4, with Vite and Next.js as its first consumer targets.

> **Project status:** This repository is a planning-approved development scaffold.
> It does not yet contain a released component catalog, working installation
> instructions for npm consumers, or a published package. Do not install it as a
> production dependency.

## What is planned

The first release will provide basic UI controls, accessible interactive components,
composed fields, and reusable application layouts. A plotting/charting module is
planned for a later release and will not be required by the core library.

Marisma's initial theme direction includes **Reedwater** (coastal green/teal) and
**Tidal Blue**, each with light and dark variants. The components use Tailwind CSS
utilities and semantic theme variables; applications consuming Marisma will need to
configure Tailwind CSS 4. No CSS Modules or CSS-in-JS alternative is planned.

## Development checkout

The monorepo requires Node.js 22.14.0 or newer and pnpm 11.9.0. Dependency
resolution and a clean frozen-lockfile install are verified; package build and
browser qualification remain pending.

From the repository root:

```bash
pnpm install --frozen-lockfile
pnpm build
pnpm dev:storybook
```

The frozen-lockfile install is verified. The build and Storybook commands remain
unverified until their implementation and integration checks are complete; consult
the approved engineering contract and assigned numbered task for current scope.

## Repository structure

- `packages/ui/` — the versioned React component package and its Tailwind theme
- `apps/storybook/` — interactive component documentation (initial scaffold)
- `apps/landing/` — public introduction and navigation to documentation (initial scaffold)
- `apps/consumers/vite-react/` — Vite consumption fixture (initial scaffold)
- `apps/consumers/nextjs/` — Next.js App Router consumption fixture (initial scaffold)

## Contribution and status

The approved product and architecture constraints are in
`docs/planning/ENGINEERING_CONTRACT.md`. First-sprint implementation tasks are
sequenced individually under `docs/tasks/`, with a navigation table in
`docs/agent/ROUTING.md`. Verification and release checks are in
`docs/planning/VERIFICATION_AND_RELEASE.md`. No public release or compatibility
guarantee has been established yet.

## License

MIT. See [LICENSE](LICENSE). Third-party software and font licensing will be
verified before the first package release; Marisma does not currently bundle fonts.
