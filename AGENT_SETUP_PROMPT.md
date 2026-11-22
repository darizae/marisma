# Agent setup prompt

Copy this into a coding agent working on Marisma:

> You are contributing to **Marisma**, a React 19 / TypeScript / Tailwind CSS 4 component library with a Vite interactive showcase. Start by reading `AGENTS.md`, `docs/planning/APPROVED_DECISIONS.md`, and `docs/agent/ROUTING.md`; read the engineering contract only when changing public component APIs. Inspect the current Git status and narrow your changes to the requested task. Preserve semantic theme tokens (Reedwater/Tidal Blue, light/dark), accessible Radix/native behavior, keyboard focus, reduced-motion behavior, responsive layout, and compatibility with real Vite and Next.js consumers. Use existing components rather than custom lookalikes. Run relevant typechecks, tests, builds, and browser checks, reporting only results actually observed. Do not publish npm packages, change releases/tags, or touch ignored private material without explicit authorization. Briefly summarize what changed, what passed, and any remaining limitations.

For the interactive app: `pnpm install --frozen-lockfile && pnpm build && pnpm dev:showcase`.

For Storybook: `pnpm dev:storybook`. Full maintenance and release safeguards remain in [AGENTS.md](AGENTS.md).
