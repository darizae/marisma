# Marisma motion system (feature candidate)

Motion belongs to `@darizae/marisma/theme.css`, not a secondary stylesheet. The default semantic theme remains Reedwater/Tidal Blue, in both modes, and all timings live in the existing scoped theme layer. Existing component props/exports are unchanged.

| Treatment                     | Duration  | Easing                       | Application                                                           |
| ----------------------------- | --------- | ---------------------------- | --------------------------------------------------------------------- |
| Control press                 | 120ms     | cubic-bezier(.34,.8,.34,1)   | Button; select/menu/popover triggers                                  |
| Hover/tint                    | 150–180ms | gentle control curve         | Sidebar SVG icon, menu focus, button tint                             |
| Overlay entrance              | 200ms     | cubic-bezier(.2,0,0,1)       | Radix menu/select/popover/dialog; 150ms exit                          |
| Chevron and directional arrow | 250ms     | cubic-bezier(.32,.72,0,1)    | Select and opt-in `marisma-motion-chevron`/`marisma-motion-arrow`     |
| Optional spring               | 320ms     | cubic-bezier(.34,1.56,.64,1) | `data-motion="spring"` on overlay utility                             |
| Entrance                      | 500ms     | cubic-bezier(.38,1.21,.22,1) | Opt-in `marisma-motion-rise`; avoid automatic staggering everywhere   |
| Busy rotation                 | 1000ms    | cubic-bezier(.45,.1,.55,.9)  | Spinner and loading Button                                            |
| Optional bounce               | 620ms     | cubic-bezier(.34,1.56,.64,1) | Opt-in `marisma-motion-bounce`; never default for enterprise elements |
| Meaningful pulse              | 1800ms    | ease-in-out                  | Opt-in status-only `marisma-motion-pulse`                             |

The timing curves and sequence were independently reimplemented from observed Shrubi Style Atlas motion studies; no Shrubi branding, proprietary CSS, mascot, fonts or assets were imported. Color, dimensions, and status pulses are Marisma-specific interpretations.

## Use

Import Tailwind CSS 4 and `@darizae/marisma/theme.css` as usual, and scan the built package. Add `marisma-motion-rise` to a `Card` only where an arrival warrants attention. Place `marisma-motion-chevron` on a _direct child_ of an `aria-expanded` or `data-state` trigger. Put `marisma-motion-arrow` inside a link or button for a directional nudge. Apply `data-motion="spring"` to an explicitly animated overlay for optional overshoot; preserve the existing Radix portal and focus handling.

Reduced-motion media queries suppress decorative/keyframe animation and all transform transitions on motion utilities. The spinner remains a visible static loading indicator; status and accessible names remain. Forced-color environments disable decorative pulses. The showcase supports a local pause switch via `data-marisma-motion="paused"` for repeating studies; it is not a substitute for OS-level reduced motion.

Public API: unchanged. New opt-in CSS utility classes and semantic motion tokens are additive; no new mandatory dependencies, providers, router, backend, persistence, or server state.
