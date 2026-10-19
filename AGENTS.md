# AGENTS.md

## Cursor Cloud specific instructions

### Product overview

Single **Nuxt 4** portfolio app (`dimarhanung.dev`). No backend, database, or Docker in this repo. All routes are served by one Nuxt process.

### Services

| Service | Command | Port |
|---------|---------|------|
| Nuxt dev server | `npm run dev` | **8089** (set in `package.json`; README mentions 3000 but the script overrides it) |

Optional external dependency: `/feedback` calls `https://api-gpt.dev.ut.web.id/general-gpt/` — the rest of the site works without it.

### Standard commands

See `package.json` scripts:

- **Dev:** `npm run dev` → http://localhost:8089
- **Build:** `npm run build`
- **Preview production build:** `npm run preview` (run after `npm run build`)
- **Static generate:** `npm run generate`

`postinstall` runs `nuxt prepare` automatically.

### Lint / test

No ESLint, Prettier, Vitest, or Playwright scripts are configured. There is nothing to lint or test via npm scripts.

### Dev server notes

- Use a tmux session for long-running `npm run dev` (e.g. session name `nuxt-dev-server`).
- After `npm install`, `.nuxt` types are generated via `nuxt prepare` (postinstall).
- Node v22+ works with the current lockfile.

### Hello-world verification

1. `curl -s -o /dev/null -w "%{http_code}" http://localhost:8089/` → expect `200`
2. Homepage title: `Dimar Hanung | Software Engineer`
3. Tools catalog: http://localhost:8089/tools
4. Interactive tool demo: http://localhost:8089/tools/base64-file (encode/decode tabs)
