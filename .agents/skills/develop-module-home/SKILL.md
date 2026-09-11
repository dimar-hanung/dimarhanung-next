---
name: develop-module-home
description: Building or changing the home page (`pages/(home)/`), especially the tech-stack starfield section (`SectionStack.vue`) and its canvas/parallax/edge-fade behavior.
---

## When to Use

Changing anything under `pages/(home)/` — hero, "Find Me", the tech-stack starfield (`SectionStack`), or the project cards below it.

## Key locations

- `pages/(home)/index.vue` — home page composition; page bg is `bg-muted-200 dark:bg-muted-900`
- `components/home/project.vue` — home project listing; "see more" uses `gradient-button.vue` (name leftover; it is a flat primary CTA)
- `components/ui/gradient-button.vue` — home "Lihat N proyek lain" control. Flat `bg-primary-600`, no pink/purple/blue gradient, no pulse, no hover-scale.
- `pages/(home)/components/SectionStack.vue` — tech-stack "space" section: canvas starfield, haze/galaxy layers, parallax icon rows, edge fade
- `pages/(home)/components/CardParallax.vue` — pointer-parallax card pattern reused for reference
- `components/ui/tooltip.vue` — custom tooltip used for icon names (mouseenter/leave, show 60ms / hide 80ms, `pointer-events: none`)

## References

- (none)

## Learned user preferences

- Icons always in brand color; no grayscale-until-hover.
- No visible headings inside the tech-stack section; names come only from tooltips. Section carries `aria-label="Tech stack"`.
- Motion must feel smooth: transform/opacity only, ease-out curves, pointer/scroll parallax lerped, no 3D `rotateX/Y` on icon rows (caused hover jitter).
- Space look: dark well in the middle, blue/white galaxy bands, dust clouds, spikes on near stars. No purple/pink nebula.
- Galaxy/haze must read as soft light, not as several hard circles. Radial fade + heavy blur; never solid `rounded-full` fills.
- Starfield sits in a sharp window pane (`.stack-window`): overflow clip, 1.25rem radius (0.75rem on ≤640px), 1px primary-tinted hairline, inset glass lip. No long top/bottom feather. Height lives as `py-[48rem]` on the pane. Width is full (`w-full`, no side gutter).

## Learned Workspace Facts

- `SectionStack` starfield is a 2D canvas: stars have `z` (depth), DPR capped at 2, RAF loop only runs while the section is in view; `prefers-reduced-motion` draws one static frame.
- Glow on near stars uses a cached radial sprite (`buildGlowSprite`) drawn with `drawImage`, not `ctx.shadowBlur` (too slow for 400+ stars). Dust clouds use a 256px cached sprite (`buildCloudSprite`) with many radial stops, not per-frame ellipse gradients (those band).
- Haze/galaxy visuals sit on inner nodes (`filter` + radial/linear fade). Parallax `translate3d` lives on `.stack-layer` wrappers. Do not put `filter: blur` and per-frame transform on the same node, and do not fill haze as `rounded-full` + solid `bg-*` (circle silhouette).
- Pointer and scroll parallax targets are eased in `tick` with `1 - exp(-dt * k)` so damping is frame-rate independent.
- Parallax fan-out: JS sets `--stack-px/--stack-py/--stack-sy` on the section; `.stack-icons` reads them multiplied by per-row `--group-depth` (1 / 0.58 / 0.32). Haze/galaxy layers get inline `translate3d` with smaller factors the farther they are.
- Do not bring back the 24–32rem feather + page-color overlays. The window clip is the edge. Do not add an outer drop shadow (that turns the pane into a card). Do not add side `px-*` gutters on the section.
- Dark logos on the sky: no white `rounded-full` discs (those look like hard stickers). Cursor: `logos:cursor-icon` + `.tech-stack-item-on-dark` (`brightness(0) invert(1)` combined with the drop-shadow; Tailwind `invert` loses to the scoped `filter`). OpenCode: `material-icon-theme:opencode`. Copilot: `selfhst:github-copilot-light`. OpenAI still uses a white disc because the mark is black.
- Dev server for this repo runs on port 8089. Hydration warning `class="system"` vs `class="light"` is a pre-existing color-mode mismatch, not from `SectionStack`.
