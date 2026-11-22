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

## Text entry and focus feedback

Native `Input`, `Textarea` and Radix `Select` opt into `marisma-motion-field` while preserving native labels, semantics, validation and their existing focus-visible outline. Hover gently tints a valid, enabled border; keyboard focus adds a restrained semantic-primary halo. Input/textarea labels follow focus via `marisma-field-group`. Invalid controls retain danger indicators, read-only and disabled controls avoid interactive hover treatments, forced colors remove the decorative shadow, and reduced motion disables transitions entirely.

## Toast notifications — compact stack (Sonner-inspired, independently implemented)

The public API remains `<ToastProvider duration={5000} limit={3}>…</ToastProvider>` and `useToast().toast({title, description?, variant?, action?, duration?, id?})`. A notification `id` may be supplied to replace/refresh one entry. Dismiss with `useToast().dismiss(id)`, the visible close control, an action callback, or a horizontal pointer swipe. The existing `info`/`success`/`warning`/`danger` variants retain their spoken status semantics.

The most recent card is frontmost in the bottom-right; older cards peek out behind it. Hovering the stack or focusing a toast control expands the cards to their individually measured heights and pauses their auto-dismiss timers; leaving resumes the remaining duration. The visible status/alert roles persist without making behind-stack controls keyboard-focusable while collapsed. All cards use Marisma's own surface, separator, shadow, icon/status, radius and brand tokens; no hard-coded Sonner colors, runtime dependency, visual assets or source code are imported. Swipe uses pointer events and respects native links/buttons.

The normal entrance and dismissal transitions are 320ms spring-in and 180ms exit; layout shifting is confined to the fixed viewport. `prefers-reduced-motion:reduce` disables decorative animation and transform transitions while preserving stacking layout and timed accessibility semantics. Forced-colors mode keeps visible borders. This is a deliberate Sonner-_style interaction treatment_, **not** a claim of complete API compatibility with the external Sonner library (e.g. promise helpers, arbitrary toaster positions or custom loading states).

### Gallery and favicon

The showcase toolbar's theme label and select are laid out horizontally at the same 40px height/vertical center as the adjacent mode and action buttons; narrow viewports hide the theme selector and preserve an aligned no-wrap mode button. The canonical `assets/brand/marisma-leaf.svg` is imported once by Vite and assigned to the gallery favicon link at runtime, so Vite dev and production asset URLs resolve consistently.
