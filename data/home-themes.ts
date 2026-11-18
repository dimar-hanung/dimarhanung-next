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
  cartoon: {
    id: "cartoon",
    css: "/home/themes/cartoon.css",
    fonts: ["https://fonts.googleapis.com/css2?family=Luckiest+Guy&family=Nunito:wght@500;600;700;800&display=swap"],
    fontFaces: ['400 1em "Luckiest Guy"', '500 1em "Nunito"', '800 1em "Nunito"'],
    scheme: "light",
    thumbnail: "/home/themes/cartoon.webp",
  },

  // ---- theme: ancient (edit only inside this block) ----
  ancient: {
    id: "ancient",
    css: "/home/themes/ancient.css",
    fonts: [
      "https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Grenze+Gotisch:wght@700&family=Uncial+Antiqua&display=swap",
    ],
    fontFaces: ['700 1em "Grenze Gotisch"', '400 1em "EB Garamond"', 'italic 400 1em "EB Garamond"', '400 1em "Uncial Antiqua"'],
    scheme: "light",
    thumbnail: "/home/themes/ancient.webp",
  },

  // ---- theme: terminal (edit only inside this block) ----
  // IBM 3270 is self-hosted (@font-face in terminal.css), so no font sheet.
  terminal: {
    id: "terminal",
    css: "/home/themes/terminal.css",
    fonts: [],
    fontFaces: ['400 1em "IBM 3270"'],
    scheme: "dark",
    thumbnail: "/home/themes/terminal.webp",
  },

  // ---- theme: swiss (edit only inside this block) ----
  swiss: {
    id: "swiss",
    css: "/home/themes/swiss.css",
    // Switzer is self-hosted (public/home/themes/fonts/swiss/), declared in swiss.css.
    fonts: [],
    fontFaces: ['400 1em "Switzer"', '700 1em "Switzer"'],
    scheme: "light",
    thumbnail: "/home/themes/swiss.webp",
  },

  // ---- theme: newspaper (edit only inside this block) ----
  newspaper: {
    id: "newspaper",
    css: "/home/themes/newspaper.css",
    fonts: [
      "https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@400;600;800&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,700;0,6..72,800;1,6..72,400&family=UnifrakturMaguntia&display=swap",
    ],
    fontFaces: ['400 1em "UnifrakturMaguntia"', '800 1em "Newsreader"', '400 1em "Newsreader"', '400 1em "Libre Franklin"'],
    scheme: "light",
    thumbnail: "/home/themes/newspaper.webp",
  },

  // ---- theme: retro-os (edit only inside this block) ----
  // W95FA is self-hosted (@font-face in retro-os.css, files in
  // public/home/themes/fonts/retro-os/).
  "retro-os": {
    id: "retro-os",
    css: "/home/themes/retro-os.css",
    fonts: ["https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@800&display=swap"],
    fontFaces: ['400 1em "W95FA"', '800 1em "Libre Franklin"'],
    scheme: "light",
    thumbnail: "/home/themes/retro-os.webp",
  },

  // ---- theme: pixel (edit only inside this block) ----
  pixel: {
    id: "pixel",
    css: "/home/themes/pixel.css",
    fonts: [
      "https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible+Next:wght@400;700&family=Press+Start+2P&display=swap",
    ],
    fontFaces: ['400 1em "Press Start 2P"', '400 1em "Atkinson Hyperlegible Next"', '700 1em "Atkinson Hyperlegible Next"'],
    scheme: "dark",
    thumbnail: "/home/themes/pixel.webp",
  },

  // ---- theme: lab (edit only inside this block) ----
  lab: {
    id: "lab",
    css: "/home/themes/lab.css",
    fonts: [
      "https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Barlow+Condensed:ital,wght@0,600;1,500&family=Quicksand:wght@300&family=Caveat:wght@500&display=swap",
    ],
    fontFaces: ['600 1em "Barlow Condensed"', 'italic 500 1em "Barlow Condensed"', '400 1em "Barlow"', '300 1em "Quicksand"'],
    scheme: "dark",
    thumbnail: "/home/themes/lab.webp",
  },
};

export function isHomeThemeId(value: unknown): value is HomeThemeId {
  return typeof value === "string" && (HOME_THEME_IDS as readonly string[]).includes(value);
}
