import {
  DEFAULT_HOME_THEME,
  HOME_THEMES,
  isHomeThemeId,
  type HomeTheme,
  type HomeThemeId,
} from "~/data/home-themes";
import { preloadThemeSlots } from "~/pages/(home)/components/themes/slots";

// The home page theme. Saved in a cookie so the server renders the chosen
// theme (no flash of modern); `?theme=<id>` in a link opens that theme and
// saves it too. Only the active theme's stylesheet and fonts are requested.

export const HOME_THEME_COOKIE = "dh_theme";
const HOME_THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

// Give up waiting for a slow stylesheet or font and switch anyway.
const ASSET_TIMEOUT_MS = 4000;
const FONT_TIMEOUT_MS = 2000;

export function useHomeTheme() {
  const route = useRoute();
  const cookie = useCookie<string | null>(HOME_THEME_COOKIE, {
    maxAge: HOME_THEME_COOKIE_MAX_AGE,
    sameSite: "lax",
    path: "/",
  });

  const themeId = useState<HomeThemeId>("home-theme", () => {
    const fromLink = route.query.theme;
    if (isHomeThemeId(fromLink)) {
      cookie.value = fromLink;
      return fromLink;
    }
    if (isHomeThemeId(cookie.value)) return cookie.value;
    return DEFAULT_HOME_THEME;
  });
  const theme = computed(() => HOME_THEMES[themeId.value]);

  const buildId = useRuntimeConfig().app.buildId;

  // Stylesheets for a theme: fonts first, then its own CSS (versioned per
  // build, since files in public/ have no hash).
  function stylesheetsOf(target: HomeTheme) {
    const sheets = [...target.fonts];
    if (target.css) sheets.push(`${target.css}?v=${buildId}`);
    return sheets;
  }

  let switching = false;

  // Load the theme's CSS, fonts and slot components first, then swap in one
  // step: a short cross-fade (View Transitions) or, under reduced motion, an
  // instant swap. `anchor` stays at the same spot on screen, so a theme with
  // a taller or shorter hero does not make the page jump.
  async function setTheme(id: HomeThemeId, anchor?: HTMLElement | null) {
    if (id === themeId.value || switching) return;
    switching = true;
    try {
      const next = HOME_THEMES[id];
      await Promise.all([
        ...stylesheetsOf(next).map(loadStylesheet),
        preloadThemeSlots(id),
      ]);
      await withTimeout(Promise.all(next.fontFaces.map((face) => document.fonts.load(face))), FONT_TIMEOUT_MS);

      const apply = async () => {
        const before = anchor?.getBoundingClientRect().top;
        themeId.value = id;
        cookie.value = id;
        syncUrl(id);
        await nextTick();
        if (anchor && before !== undefined) {
          window.scrollBy(0, anchor.getBoundingClientRect().top - before);
        }
      };

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion || !document.startViewTransition) {
        await apply();
        return;
      }
      await document.startViewTransition(apply).updateCallbackDone;
    } finally {
      switching = false;
    }
  }

  return { themeId, theme, setTheme, stylesheetsOf };
}

// Adds <link rel="stylesheet"> once and waits for it. The head entry in
// index.vue adds the same URL right after the swap; the browser reuses the
// loaded file. Theme CSS is scoped to its data-theme, so a stylesheet left
// loaded after switching away does nothing.
function loadStylesheet(href: string) {
  const absolute = new URL(href, window.location.href).href;
  for (const link of document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]')) {
    if (link.href === absolute && link.sheet) return Promise.resolve();
  }
  return withTimeout(
    new Promise<void>((resolve) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      link.dataset.homeThemeAsset = "";
      link.onload = () => resolve();
      link.onerror = () => resolve();
      document.head.appendChild(link);
    }),
    ASSET_TIMEOUT_MS,
  );
}

function withTimeout(promise: Promise<unknown>, ms: number) {
  return Promise.race([promise.then(() => undefined), new Promise<void>((resolve) => setTimeout(resolve, ms))]);
}

// Keep the address bar shareable: ?theme=<id> for any theme but the default.
function syncUrl(id: HomeThemeId) {
  const url = new URL(window.location.href);
  if (id === DEFAULT_HOME_THEME) url.searchParams.delete("theme");
  else url.searchParams.set("theme", id);
  window.history.replaceState(window.history.state, "", url);
}
