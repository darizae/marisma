# Interactive Marisma showcase

A standalone, navigable React 19/Vite application, distinct from Storybook. Uses public `@darizae/marisma` imports with Tailwind CSS 4 and theme.css. It uses fictional local data only, no network backend, auth, persistent settings or telemetry.

## Start

```bash
pnpm install --frozen-lockfile
pnpm build
pnpm dev:showcase
```

Open **http://127.0.0.1:4178/** in a browser **on the same Mac**. A local URL is not a hosted deployment: it works only while `pnpm dev:showcase` is running. Stop the development server with Ctrl+C when finished.

For the explorer's Storybook links, separately run `pnpm dev:storybook` (port 6006). Browser tests: `pnpm --filter @marisma/showcase test:browser`. Production build: `pnpm --filter @marisma/showcase build`. Playwright starts and stops its own test server, so a prior PASS does not mean the gallery is still online.

### If the page does not load

In a Mac terminal, run `curl -I http://127.0.0.1:4178/`: a successful local server replies `HTTP/1.1 200 OK`. If the connection fails, start `pnpm dev:showcase` from the repository root and keep that terminal open. If the server returns 200 but the app is blank, check the browser console and re-run `pnpm build` followed by `pnpm dev:showcase`. `127.0.0.1` on a different device refers to **that device**, not this Mac. The optional `?utm_source=chatgpt.com` query string does not affect showcase navigation.

## Navigation

**Overview** demonstrates metric cards, a record list and quick navigation; **Component explorer** searches all 48 families; **Forms & feedback** supports validated sample submission, toast, dialog, selection and tabs; **Data & calendar** supports region and station filtering, table, calendar, JSON preview, empty/error states; **Motion lab** replays rise, spring, chevron, arrow, spinner, optional bounce, status pulse; **Settings** switches Reedwater/Tidal Blue and light/dark modes with a live nested component display. The mobile sidebar uses the library's own responsive Radix-backed Sidebar.

## Coverage ledger — all 48 source-level candidates

The catalog has 48 entries matching the approved catalog, and every entry has a validated link to a built Storybook docs page. `Interactive or rendered in app` is not a promise that every API state for that family is exposed. `Storybook reference only` means the family is discoverable and documented but not independently demonstrated in the showcase. Source tests and Storybook remain the authoritative API catalog.

| #   | Family                    | Area        | Showcase disposition           |
| --- | ------------------------- | ----------- | ------------------------------ |
| 1   | Alert                     | Feedback    | Interactive or rendered in app |
| 2   | Avatar                    | Foundation  | Storybook reference only       |
| 3   | Badge                     | Foundation  | Interactive or rendered in app |
| 4   | Button                    | Foundation  | Interactive or rendered in app |
| 5   | Button Group              | Foundation  | Storybook reference only       |
| 6   | Calendar                  | Date & time | Interactive or rendered in app |
| 7   | Card                      | Layout      | Interactive or rendered in app |
| 8   | Checkbox                  | Forms       | Interactive or rendered in app |
| 9   | Collapsible               | Interaction | Interactive or rendered in app |
| 10  | Copy Code                 | Utility     | Interactive or rendered in app |
| 11  | Dialog                    | Overlays    | Interactive or rendered in app |
| 12  | Dropdown Menu             | Overlays    | Interactive or rendered in app |
| 13  | Dropzone                  | Forms       | Storybook reference only       |
| 14  | Form                      | Forms       | Interactive or rendered in app |
| 15  | Input                     | Forms       | Interactive or rendered in app |
| 16  | Label                     | Forms       | Interactive or rendered in app |
| 17  | Popover                   | Overlays    | Interactive or rendered in app |
| 18  | Radio Group               | Forms       | Storybook reference only       |
| 19  | Scroll Area               | Layout      | Storybook reference only       |
| 20  | Select                    | Forms       | Interactive or rendered in app |
| 21  | Separator                 | Layout      | Storybook reference only       |
| 22  | Sidebar                   | Navigation  | Interactive or rendered in app |
| 23  | Toast                     | Feedback    | Interactive or rendered in app |
| 24  | Spinner                   | Feedback    | Interactive or rendered in app |
| 25  | Switch                    | Forms       | Interactive or rendered in app |
| 26  | Table                     | Data        | Interactive or rendered in app |
| 27  | Tabs                      | Interaction | Interactive or rendered in app |
| 28  | Textarea                  | Forms       | Interactive or rendered in app |
| 29  | Toggle Group              | Interaction | Storybook reference only       |
| 30  | Tooltip                   | Overlays    | Storybook reference only       |
| 31  | Field Callout             | Forms       | Storybook reference only       |
| 32  | Confirmation field dialog | Overlays    | Storybook reference only       |
| 33  | Date selection field      | Date & time | Interactive or rendered in app |
| 34  | Field Group               | Forms       | Storybook reference only       |
| 35  | Inline change control     | Forms       | Storybook reference only       |
| 36  | Page title field          | Layout      | Interactive or rendered in app |
| 37  | Search field              | Forms       | Interactive or rendered in app |
| 38  | User menu                 | Navigation  | Storybook reference only       |
| 39  | Vertical field separator  | Forms       | Storybook reference only       |
| 40  | Error page view           | Feedback    | Storybook reference only       |
| 41  | Application navbar        | Navigation  | Storybook reference only       |
| 42  | Record list view          | Data        | Interactive or rendered in app |
| 43  | Application shell         | Layout      | Storybook reference only       |
| 44  | Card grid                 | Layout      | Storybook reference only       |
| 45  | Footer                    | Layout      | Interactive or rendered in app |
| 46  | Navigation progress       | Navigation  | Interactive or rendered in app |
| 47  | Raw-data view             | Data        | Interactive or rendered in app |
| 48  | Page section              | Layout      | Interactive or rendered in app |

## Verification and release boundary

This is a review candidate; do not treat source classes as a published API until the owner authorizes a release. Existing Storybook coverage is preserved. The tracked package remains private, and no npm publish, tag, deployment or merge is performed.
