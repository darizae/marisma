# Marisma

A Tailwind-first React component library for professional web applications.

Marisma is being developed around accessible interactions, considered component APIs,
readable typography, and calm estuary-inspired themes. The initial library targets
React 19 and Tailwind CSS 4, with Vite and Next.js as its first verified consumers.

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

The monorepo is designed for Node.js 24 and pnpm. An initial dependency resolution,
lockfile generation, build, and browser qualification are still pending. The files
in this archive have only received structural checks.

After the foundation task creates and verifies the lockfile, the intended commands are:

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm build
pnpm dev:storybook
```

These commands are **planned and not yet verified** for this scaffold. Until the
first package build and integration checks have passed, consult the approved engineering contract and the assigned numbered task rather
than interpreting this README as installation documentation.

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
