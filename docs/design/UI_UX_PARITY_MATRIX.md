# Soft Elevation — UI/UX parity

Approved visual source: owner-supplied `marisma-visual-prototypes.html`, Concept 03 (`data-style="lifted"`), approved 2026-11-16 under D-23. The **actual compiled Marisma React components** and existing public APIs are the implementation source of truth.

Screen captures and visual-baseline reviews must be executed locally against the feature PR. Nothing below is validated merely because source or a capture script exists.

| Screen / state | Approved visual and functional expectation | Viewport / interaction / accessibility | Evidence and current status |
| --- | --- | --- | --- |
| Application overview / Reedwater Light | 18px lifted cards, fine data separators, floating 13px navbar, quiet sidebar; overview metrics, records and table retained | 1440×900; controls, landmarks, focus, horizontal overflow | **NOT RUN** — `application-reedwater-light.jpg` expected |
| Application overview / Reedwater Dark | Dark card surfaces with dark-specific dual shadow, readable navigation and statuses | 1440×900; color contrast, table, keyboard focus | **NOT RUN** — `application-reedwater-dark.jpg` expected |
| Application overview / Tidal Blue Light | Identical semantic hierarchy with blue/slate tokens; no green-specific hardcoded card chrome | 1440×900; borders, actions, statuses | **NOT RUN** — `application-tidal-blue-light.jpg` expected |
| Application overview / Tidal Blue Dark | Distinct dark surfaces/shadows and visible focus/semantic color | 1440×900; focus, hover and status contrast | **NOT RUN** — `application-tidal-blue-dark.jpg` expected |
| Mobile application | Navbar floats without crowding actions, sidebar remains an accessible modal, cards stack without horizontal overflow | 390×844; touch, Escape/focus return, no page overflow | **NOT RUN** — `application-mobile.jpg` expected |
| Component showcase | Card, badge, alert and control styles remain coherent with token roles; all four themes visible | 1200×900; forced colors and reduced motion | **NOT RUN** — `components.jpg` expected |
| Form/inputs | Native labels, input boundaries, disabled and validation messages visible; subdued groups and consistent radius | 1200×900; Tab order, ARIA errors, focus contrast | **NOT RUN** — `forms.jpg`, `inputs.jpg` expected |
| Overlay and popup states | Dialog/select/popover/menu use elevated surfaces, preserve Radix focus and nearest theme scope | Desktop/mobile; Escape, trapping, portal isolation | **NOT RUN** — browser interactions and snapshots needed |
| Landing preview | Canonical leaf unchanged; semantic Soft Elevation card treatment and reader-facing copy | 1200×630; usable links and asset reachability | **NOT RUN** — `social-preview.jpg` expected |
| Original versus candidate | Historical 0.1.0 snapshot stays identifiable, compared with updated rendered React screenshot rather than the standalone HTML lab | Side-by-side at ordinary viewing size | **NOT RUN** — `before-after.jpg` expected |

**Deviation requiring approval:** The prototype's ~30% input outline would not provide 3:1 non-text contrast against a white card. The source candidate deliberately uses a stronger ~90% light outline and the preserved legacy border in dark mode. Review the rendered result before deciding whether another accessible visual treatment is preferable.

Update the final column only with actual filenames/commands, browser observations and any explicit owner-accepted deviations. Preserve historical 0.1.0 snapshots until reviewed.
