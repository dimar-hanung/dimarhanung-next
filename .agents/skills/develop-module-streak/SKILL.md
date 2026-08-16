## When to Use

Building or changing streak challenge pages under `/challenges/streak/*` — multi-day roadmaps with localStorage progress checklists.

## Key locations

- `pages/challenges/streak/` — streak challenge routes
- `pages/challenges/streak/30-day-learn-capcut-tiktok/index.vue` — CapCut × TikTok 30-day UI
- `pages/challenges/streak/30-day-learn-vibe-code/index.vue` — vibe coding 30-day UI (editor look, mint accent)
- `utils/capcut-tiktok-30day.ts` — CapCut day tasks, phases, competency items
- `utils/capcut-tiktok-30day-daily.ts` — CapCut per-day `selfCheck` + `videoScript`
- `utils/vibe-code-30day.ts` — vibe-code day tasks, phases, competency (expert track)
- `utils/vibe-code-30day-daily.ts` — vibe-code per-day `selfCheck` + `promptTemplate` (bad vs good)
- `composables/useChallenges.ts` — sidebar group `streak` + challenge links
- `plugins/fontAwesome.ts` — register icons used in sidebar (e.g. `faFire`, `faTerminal`)

## References

- (none)

## Learned user preferences

- Streak pages should feel product-specific (not generic SaaS challenge UI) and keep checklist progress in localStorage.
- Final competency exam ("Ujian mandiri akhir") shows only when the selected day is 30, on both CapCut and vibe-code tracks. Daily `selfCheck` still shows every day.
- CapCut TikTok learning order: AI rough pass first (Auto Cut, caption), then manual hook/pacing/proofread; motion from week 2.
- UI copy: Bahasa Indonesia, light-casual / omit pronouns, verb-first buttons, keep CapCut/TikTok loanwords; no em dash.
- Vibe-code track: Cursor as home; also cover ChatGPT/Claude (plan), Copilot Tab, Claude Code. Joining requirement (fundamentals) is a one-line hero note, not a checklist section or calendar phase. 30 days must reach expert: prompt, `.agents`/`SKILL.md`, `/loop`, hooks, subagent, review, context engineering. Keep Cursor/prompt/agent/skill/loop as loanwords.
- College web-tech requirements (heading, paragraph, formatting, image, link, list, table, form, video, audio, CSS, JavaScript) live in page markup, not as extra calendar days. Lab notes use `vibe-code-lab-notes-v1`. Media files sit in `public/challenges/streak/vibe-code/` (Wikimedia/Pixabay CC0 or Commons attribution).

## Learned Workspace Facts

- Challenge routes live under `pages/challenges/` and are listed via `useChallenges` groups in `pages/challenges.vue`.
- Progress key for CapCut streak: `capcut-tiktok-30day-ai-v1` (`tasks`, `selfCheck`, `competency`, `activeDay`). Older `capcut-tiktok-30day-v1` is obsolete after AI-track update.
- Progress key for vibe-code streak: `vibe-code-30day-v2` (`tasks`, `selfCheck`, `competency`, `activeDay`). `vibe-code-30day-v1` is obsolete after expert-track rewrite (no prereq checklist).
- Each CapCut day has `selfCheck` (daily exam) and `videoScript` (hook/body/cta/onScreen) for daily TikTok content about that day's learning.
- Each vibe-code day has `selfCheck` and `promptTemplate` (label/bad/good/notes) instead of a video script.
- AI-assisted CapCut track: Auto Cut/caption week 1, motion week 2, batch + masking week 3-4.
- Vibe-code phases: Cursor (1-5), prompt (6-10), ajari agent (11-16), operasi (17-22), mutu (23-26), studio expert (27-30).
- Day content lives in `utils/capcut-tiktok-30day.ts` or `utils/vibe-code-30day.ts`; shared refs in `CORE_REFS` in the same file.
- Prefix vibe-code helpers (`vibeTaskKey`, `VIBE_PHASE_META`) so they do not collide with CapCut util exports under Nuxt auto-import.
- Competency checklist IDs may change between roadmap versions; old localStorage keys become orphaned.
- On Windows, `nuxt.config` uses `ignoreOptions.allowRelativePaths: true` and `pages:extend` (not `ignore: pages/**/components`) so Vite virtual ids do not crash `ignore`.
- Import `useStorage` from `@vueuse/core` explicitly in streak pages (do not rely on auto-import alone).
