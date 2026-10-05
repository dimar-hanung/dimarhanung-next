## When to Use

Building or changing public project case-study pages under `pages/project/*` (SRS, MyUT, and later product stories). Not for the generic `/project` index listing, and not for `pages/project/detail`.

## Key locations

- `pages/project/srs/` — SRS5G staff record case study (teal/copper serif, dark mode via `:global(.dark .srs-page)` variables). Reference layout for the static-story direction: hero with facts row + one framed visual → What I did (Problem → What I built → Outcome) → key features as alternating screen rows + module card grid → static lifecycle timeline → tech stack → footer band
- `pages/project/srs/data.ts` — every SRS fact, feature, module, stage, stack item, screen slot and illustration slot (`illustration` on problem/built/outcome, `lifecycleIllustration`, `footerIllustration`, `illustrationCredit`); edit content here, not in the layout
- `pages/project/srs/components/SrsIllustration.vue` — lazy `<img>` for an illustration slot (fixed width/height, empty `alt` ⇒ `aria-hidden`); backdrops and dark-mode dimming live with each placement in `index.vue` (`.srs-illo-panel`)
- `pages/project/srs/components/SrsScreen.vue` — CSS browser frame; shows `screen.image` when set, otherwise a stylised CSS mock (`dashboard` / `registration` / `record` / `report`) with obviously dummy data
- `pages/project/myut/` — MyUT Mahasiswa student portal case study (kraft/navy/vermillion)
- `pages/project/admisi-ut/` — SIA Admisi UT new-student onboarding (separate product from MyUT), redone in the SRS static-story layout. Theme: admission lobby — campus green `#0d7a4d` on mint paper with LED amber `#ffb547`, Space Grotesk + Instrument Sans + Space Mono, dark mode via `:global(.dark .admisi-page)`. Facts sit on a static queue ticket in the hero; `data.ts` holds every fact, feature, counter, applicant path, stack item, screen slot and illustration slot; `AdmisiScreen.vue` is its browser frame with CSS mocks (`overview` / `register` / `billing` / `forms` / `documents`); `CounterBoard.vue` shows the six admission counters under a static LED board. Motion lives under `.admisi-motion`
- `components/home/project.vue` — listing cards; set `detailPath` when a case study exists
- `public/project/<slug>/` — login-screen banners and real screenshots (dummy data only), plus each page's illustrations. SRS uses five SVGs from Andinur Studio's IconScout "Education" pack (`iconscout.com/illustration-pack/education-2496`), recoloured to the SRS palette; Admisi UT uses five SVGs from Roundsquid's IconScout "University" pack (`iconscout.com/illustration-pack/university-79`), recoloured with one map to green/mint/amber (skin tones kept) and shown on a mint panel that is dimmed in dark mode; MyUT still holds older mixed IconScout illustrations

## References

- (none)

## Learned user preferences

- Each product gets its own theme. Do not reuse `pages/project/detail/index.vue` or copy another case study's palette or type.
- Copy stays general and public-safe: no deep business rules, no internal workflows, no production data.
- Favour static storytelling over interactives: visitors come to see what Dimar built, so lead with role, problem, what I built and outcome, and show features with screens that need no clicks. No tabs, carousels, demos or forms that hide content; keep hover states and at most a CSS fade-in behind `prefers-reduced-motion: no-preference`. (MyUT still carries older interactives — postmarks/e-KTM — until it is redone. Admisi UT's queue hall and applicant tabs became the static counter board and applicant cards.)
- One consistent icon set: `mdi:*` line icons for UI and features, `logos:*` for tech-stack logos.
- Illustrations are allowed when the whole page uses ONE set: same IconScout pack (same contributor and art style), compared by preview thumbnails before choosing. Recolour the SVG fills to the page palette (map the pack's few flat colours once and apply the same map to every file), crop the viewBox to the art, `svgo` them (aim < 60 KB), and keep 3–5 placements that add meaning (e.g. Problem / What I built / Outcome cards, lifecycle head, footer CTA). Never replace product mock screens with illustrations. Handle dark mode explicitly (SRS: dimmed warm-sand panel behind ink-on-cream art). Credit the contributor with a link to the pack in the footer credit line; drop the art and the credit together if the page is redone without it.
- Never invent facts (numbers, years, team size, user counts). Use only what the repo already states; phrase unknowns qualitatively or leave the item out.
- Keep facts and screenshot slots data-driven (one typed data file per page, e.g. `facts`, `outcomeMetrics`, `screen.image`) so the PM can drop in real values and images later. Empty `outcomeMetrics` hides its row; a screen without `image` falls back to the CSS mock captioned "Illustrative mock with sample data".
- Case-study body copy is English to match the portfolio `html lang`.

## Learned Workspace Facts

- `pages:extend` drops colocated `components/` folders from the route table, so helpers can live next to the page.
- MyUT is the student portal (`myut.ut.ac.id`). SIA Admisi is a separate product (`admisi-sia.ut.ac.id`) and should not share this page.
- MyUT public story: distance students register, pay, track mailed modules, join tutorials, sit exams, hold an e-KTM, and can ask MYRA. Split from older SIA 5G.
- MyUT stack on this site: Vue 2.7, Vuex, Tailwind, Azure MSAL / campus SSO. Do not paste APIs or other-repo trees into this skill.
- `fe-myut` — student frontend. `be-myut-agents` hosts MYRA. Mention those project names only.
- `fe-sia` is the Admisi UT applicant frontend (Vue 2.7, Vuex, Tailwind, PWA). Mention the project name only; keep admission business rules off the page.

## External projects

- `fe-myut` — student academic portal this case study describes
- `be-myut-agents` — MYRA assistant backend used inside MyUT
- `fe-sia` — admission portal frontend the Admisi UT case study describes
