// Themes for the home page (/ and /id). The theme section lets a visitor
// restyle the whole page; this file is the list. Names and one-line
// descriptions are copy, so they live in locales/home (`themes.items.<id>`).
//
// How to write a theme: .agents/skills/develop-module-home/SKILL.md, section
// "Home themes". In short:
// - public/home/themes/<id>.css   the theme's stylesheet, every rule scoped
//                                 to `.home-page[data-theme="<id>"]`
// - public/home/themes/<id>.webp  thumbnail (scripts/home-theme-thumbnails.mjs)
// - pages/(home)/components/themes/<id>/<slot>.vue  optional extra markup
// - `fonts` below                 web font stylesheets, loaded only while the
//                                 theme is active

export const HOME_THEME_IDS = [
  "modern",
  "brutalist",
  "cartoon",
  "ancient",
  "terminal",
  "swiss",
  "newspaper",
  "retro-os",
  "pixel",
  "lab",
] as const;

export type HomeThemeId = (typeof HOME_THEME_IDS)[number];

export const DEFAULT_HOME_THEME: HomeThemeId = "modern";

export interface HomeTheme {
  id: HomeThemeId;
  // Stylesheet in public/. null only for modern: its look is the contract
  // defaults in pages/(home)/home-theme.css, which every page view loads.
  css: string | null;
  // Font stylesheets (Google Fonts css2 URLs or a file in public/).
  fonts: string[];
  // CSS font shorthands warmed up before the switch, so the new theme shows
  // in its own fonts instead of a fallback that swaps a moment later.
  // Same syntax as document.fonts.load(), e.g. '700 1em "Archivo"'.
  fontFaces: string[];
  // "auto" follows the dark mode toggle (the theme styles both); "light" and
  // "dark" pin one look and hide the toggle while the theme is active.
  scheme: "auto" | "light" | "dark";
  thumbnail: string;
}

// Modern's fonts. The stubs below reuse them so they look like modern until
// their author gives them their own.
const MODERN_FONTS = ["https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap"];
const MODERN_FONT_FACES = ['400 1em "Outfit"', '700 1em "Outfit"'];

// A theme that is registered but not designed yet: it inherits modern.
function stub(id: HomeThemeId): HomeTheme {
  return {
    id,
    css: `/home/themes/${id}.css`,
    fonts: MODERN_FONTS,
    fontFaces: MODERN_FONT_FACES,
    scheme: "auto",
    thumbnail: `/home/themes/${id}.webp`,
  };
}

export const HOME_THEMES: Record<HomeThemeId, HomeTheme> = {
  modern: {
    id: "modern",
    css: null,
    fonts: MODERN_FONTS,
    fontFaces: MODERN_FONT_FACES,
    scheme: "auto",
    thumbnail: "/home/themes/modern.webp",
  },
  brutalist: {
    id: "brutalist",
    css: "/home/themes/brutalist.css",
    fonts: [
      "https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,500..900&family=IBM+Plex+Mono:wght@400;500;700&display=swap",
    ],
    fontFaces: ['800 1em "Archivo"', '400 1em "IBM Plex Mono"', '700 1em "IBM Plex Mono"'],
    scheme: "light",
    thumbnail: "/home/themes/brutalist.webp",
  },
  // ---- theme: cartoon (edit only inside this block) ----
  cartoon: stub("cartoon"),

  // ---- theme: ancient (edit only inside this block) ----
  ancient: stub("ancient"),

  // ---- theme: terminal (edit only inside this block) ----
  terminal: stub("terminal"),

  // ---- theme: swiss (edit only inside this block) ----
  swiss: stub("swiss"),

  // ---- theme: newspaper (edit only inside this block) ----
  newspaper: stub("newspaper"),

  // ---- theme: retro-os (edit only inside this block) ----
  "retro-os": stub("retro-os"),

  // ---- theme: pixel (edit only inside this block) ----
  pixel: stub("pixel"),

  // ---- theme: lab (edit only inside this block) ----
  lab: stub("lab"),
};

export function isHomeThemeId(value: unknown): value is HomeThemeId {
  return typeof value === "string" && (HOME_THEME_IDS as readonly string[]).includes(value);
}
