---
name: develop-module-home
description: Building or changing the home page (`pages/(home)/`), especially the tech-stack starfield section (`SectionStack.vue`) and its canvas/parallax/edge-fade behavior.
---

## When to Use

Changing anything under `pages/(home)/` — hero, "Find Me", the project cards, the quote, the tech-stack starfield (`SectionStack`), or the footer.

Page order: hero → Challenge Me / Portofolio / Find Me → `SectionProject` → `SectionMotivasi` → `SectionStack` → `SectionFooter` (`mt-24` gap below the sky window).

## Key locations

- `pages/(home)/index.vue` — home page composition; page bg is `bg-muted-200 dark:bg-muted-900`
- `components/home/project.vue` — home project listing; "see more" uses `gradient-button.vue` (name leftover; it is a flat primary CTA)
- `components/ui/gradient-button.vue` — home "Lihat N proyek lain" control. Flat `bg-primary-600`, no pink/purple/blue gradient, no pulse, no hover-scale.
- `pages/(home)/components/SectionStack.vue` — tech-stack "space" section: WebGL sky canvas (Milky Way + star dust) + 2D canvas for resolved stars, depth camera, parallax icon rows
- `pages/(home)/components/stack-sky-shader.ts` — GLSL: `NEBULA_FRAGMENT` (half-res Milky Way into a texture) and `COMPOSITE_FRAGMENT` (device-res upsample, star dust, well, dither)
- `pages/(home)/components/CardParallax.vue` — pointer-parallax card pattern reused for reference
- `pages/(home)/components/SectionFooter.vue` — home footer, last on the page after `SectionStack`: display-size email CTA + copy button, live WIB time (`ClientOnly`), "On this site" / "Elsewhere" link lists, bottom bar with source link and back-to-top. Sits on the page bg with a `border-primary-500/25` top hairline; no cards, no social icon circles, all text ≥16px.
- `components/ui/tooltip.vue` — custom tooltip used for icon names (mouseenter/leave, show 60ms / hide 80ms, `pointer-events: none`)

## References

- (none)

## Learned user preferences

- Icons always in brand color; no grayscale-until-hover.
- No visible headings inside the tech-stack section; names come only from tooltips. Section carries `aria-label="Tech stack"`.
- Motion must feel smooth: transform/opacity only, ease-out curves, pointer/scroll parallax lerped, no 3D `rotateX/Y` on icon rows (caused hover jitter).
- Space look: an HD Milky Way — cool blue-white band with a warm cream core (bulge, upper right, kept off the icon block), soft dust rift, dense fine star grain, tapered flares on a few near stars. No purple/pink nebula.
- Clouds must look photographic and blended, not like noise shapes. Rejected: smoothstep-thresholded fbm (smoke/marble), band-stretched ridged dust (silk folds). Current model: 3 depth slices, log-normal star clouds `exp(k * fbm)`, dust as Beer-Lambert extinction `exp(-tau * vec3(0.85, 1, 1.18))` (blue dims first, so reddening is automatic), soft `1 - exp(-x)` shoulder. No thresholds.
- Logos on the sky are icon-only (no wordmarks): wordmark text had poor contrast. Flutter: `logos:flutter-icon`, Firebase: `logos:firebase-icon`.
- "Smooth" also means no banding in the dark gradients: the shader dithers its output every frame.
- Starfield sits in a sharp window pane (`.stack-window`): overflow clip, 1.25rem radius (0.75rem on ≤640px), 1px primary-tinted hairline, inset glass lip. No long top/bottom feather. Height lives as `py-[48rem]` on the pane. Width is full (`w-full`, no side gutter).

## Learned Workspace Facts

- Resolved stars (~520) stay on a 2D canvas: depth `d`, DPR capped at 2, RAF loop only while in view; `prefers-reduced-motion` draws one static frame. Glow uses cached radial sprites per stellar tint (`buildGlowSprite(r,g,b)`, 4 tints hot→cool) and a pre-rendered tapered `buildFlareSprite` for the brightest; never `ctx.shadowBlur` or stroked `+` lines.
- Sky is one WebGL canvas, two passes. Pass 1 renders the Milky Way at ≤0.5× CSS px into an RGBA texture (rgb = light, alpha = star density, already dimmed by dust). Pass 2 runs at device px (DPR ≤2, `SKY_PIXEL_BUDGET`), upsamples it, adds procedural star dust (one star per cell anywhere in the cell, 2×2 neighbor lookup — small jitter made a visible lattice), applies the edge well and dithers. While animating, both passes are scissored to the visible rows ± `VISIBLE_PAD`; `preserveDrawingBuffer: true` keeps the rest. The bottom sky color comes from `--app-primary-950`, resolved to sRGB with a 1px canvas and re-read by a `MutationObserver` when the theme switcher rewrites `<html style>`. The CSS gradient + `.stack-well` stay underneath as the no-WebGL fallback and fade-in backdrop.
- One depth camera for everything: depth `d` (1 = first icon row). Drift + pointer shift by `offset / d`; scroll shifts by `scroll * (1 - 1/d)` so far layers hold back and read as farther. Stars live at d 1.4–10, icon rows at `--row-depth` 1 / 1.12 / 1.26, so stars are always behind the icons they pass under. Shader layers: far haze 9, band geometry 6, cloud/dust slices 7 / 5.5 / 4, star dust 7.5 / 4.8.
- The old scroll parallax was inverted (near layers lagged more than far), which flattened depth. Keep far = more hold-back.
- Drift is a slow Lissajous on the camera (no star wrapping jumps); `clock` advances only while the RAF loop runs.
- Pointer and scroll parallax targets are eased in `tick` with `1 - exp(-dt * k)` so damping is frame-rate independent.
- Parallax fan-out: JS sets `--stack-px/--stack-py/--stack-sy` in px on the section; `.stack-icons` applies the same `1/d` and `1 - 1/d` rule from `--row-depth`.
- Headless Playwright defaults to SwiftShader (CPU) WebGL, useless for fps. This machine has an NVIDIA L40S: launch Chromium with `--enable-gpu --use-angle=vulkan --enable-features=Vulkan --disable-vulkan-surface --ignore-gpu-blocklist` to get real GPU numbers (the current sky holds 60 fps there).
- `v-motion-pop-visible` starts at `scale: 0` and resets to it whenever the observer says "not intersecting"; in some headless runs a few icons (often the `:delay="150"` ones) stayed at opacity 0. Intermittent; two runs of the pre-shader version did not show it, root cause unconfirmed. `v-motion-pop-visible-once` is the likely fix if it shows up for real.
- Do not bring back the 24–32rem feather + page-color overlays. The window clip is the edge. Do not add an outer drop shadow (that turns the pane into a card). Do not add side `px-*` gutters on the section.
- Dark logos on the sky: no white `rounded-full` discs (those look like hard stickers). Cursor: `logos:cursor-icon` + `.tech-stack-item-on-dark` (`brightness(0) invert(1)` combined with the drop-shadow; Tailwind `invert` loses to the scoped `filter`). OpenCode: `material-icon-theme:opencode`. Copilot: `selfhst:github-copilot-light`. OpenAI still uses a white disc because the mark is black.
- Dev server for this repo runs on port 8089. Hydration warning `class="system"` vs `class="light"` is a pre-existing color-mode mismatch, not from `SectionStack`.
