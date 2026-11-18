import type { Component } from "vue";
import type { HomeThemeId } from "~/data/home-themes";

// Escape hatch for a theme that needs markup CSS cannot make: put a component
// at pages/(home)/components/themes/<theme id>/<slot>.vue and it renders at
// that slot while the theme is active (and is only downloaded then).
// Slots, in page order:
// - page-start  first thing inside the page root, before the nav
// - hero-start  top of the hero, inside its container
// - hero-end    bottom of the hero, after the proof strip
// - page-end    last thing inside the page root, after the footer
// Copy for a slot goes in locales/home under themes.extras.<theme id>.
export const HOME_THEME_SLOTS = ["page-start", "hero-start", "hero-end", "page-end"] as const;
export type HomeThemeSlot = (typeof HOME_THEME_SLOTS)[number];

const loaders = import.meta.glob<{ default: Component }>("./*/*.vue");

export function themeSlotLoader(id: HomeThemeId, slot: HomeThemeSlot) {
  return loaders[`./${id}/${slot}.vue`] ?? null;
}

// Fetch a theme's slot components before switching to it, so they are there
// in the first frame of the new theme.
export function preloadThemeSlots(id: HomeThemeId) {
  return Promise.all(
    HOME_THEME_SLOTS.map((slot) => themeSlotLoader(id, slot)?.()).filter(Boolean),
  );
}
