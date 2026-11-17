import en from "~/locales/home/en";
import id from "~/locales/home/id";

// Only the home page is translated: English at /, Indonesian at /id (a route
// alias of pages/(home)/index.vue). The locale comes from the path, so every
// home section reads it the same way.

export type HomeLocale = "en" | "id";

// Set by the EN/ID switch and by the first-visit browser check on /.
export const HOME_LANG_COOKIE = "dh_lang";
export const HOME_LANG_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export const HOME_PATHS: Record<HomeLocale, string> = { en: "/", id: "/id" };

export function useHomeI18n() {
  const route = useRoute();
  const locale = computed<HomeLocale>(() =>
    route.path === "/id" || route.path.startsWith("/id/") ? "id" : "en",
  );
  const t = computed(() => (locale.value === "id" ? id : en));
  return { locale, t };
}
