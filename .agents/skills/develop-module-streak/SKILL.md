## When to Use

Building or changing streak challenge pages under `/challenges/streak/*` — multi-day roadmaps with localStorage progress checklists.

## Key locations

- `pages/challenges/streak/` — streak challenge routes
- `pages/challenges/streak/30-day-learn-capcut-tiktok/index.vue` — CapCut × TikTok 30-day UI
- `utils/capcut-tiktok-30day.ts` — day tasks, phases, competency items
- `utils/capcut-tiktok-30day-daily.ts` — per-day `selfCheck` + `videoScript` content
- `composables/useChallenges.ts` — sidebar group `streak` + challenge links
- `plugins/fontAwesome.ts` — register icons used in sidebar (e.g. `faFire`)

## References

- (none)

## Learned user preferences

- Streak pages should feel product-specific (not generic SaaS challenge UI) and keep checklist progress in localStorage.
- CapCut TikTok learning order: AI rough pass first (Auto Cut, caption), then manual hook/pacing/proofread; motion from week 2.
- UI copy: Bahasa Indonesia, light-casual / omit pronouns, verb-first buttons, keep CapCut/TikTok loanwords; no em dash.

## Learned Workspace Facts

- Challenge routes live under `pages/challenges/` and are listed via `useChallenges` groups in `pages/challenges.vue`.
- Progress key for CapCut streak: `capcut-tiktok-30day-ai-v1` (`tasks`, `selfCheck`, `competency`, `activeDay`). Older `capcut-tiktok-30day-v1` is obsolete after AI-track update.
- Each day has `selfCheck` (daily exam) and `videoScript` (hook/body/cta/onScreen) for daily TikTok content about that day's learning.
- AI-assisted track: Auto Cut/caption week 1, motion week 2, batch + masking week 3-4.
- Day content lives in `utils/capcut-tiktok-30day.ts`; shared refs in `CORE_REFS` constant in same file.
- Competency checklist IDs may change between roadmap versions; old localStorage keys become orphaned.
- On Windows, `nuxt.config` uses `ignoreOptions.allowRelativePaths: true` and `pages:extend` (not `ignore: pages/**/components`) so Vite virtual ids do not crash `ignore`.
- Import `useStorage` from `@vueuse/core` explicitly in streak pages (do not rely on auto-import alone).
