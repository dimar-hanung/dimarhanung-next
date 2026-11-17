import {
  HOME_LANG_COOKIE,
  HOME_LANG_COOKIE_MAX_AGE,
} from "~/composables/useHomeI18n";

// Runs on the home page only, and only acts on "/":
// - a saved choice (EN/ID switch or an earlier visit) wins;
// - a first-time visitor gets their browser's language, which is then saved.
// "/id" is never redirected, so links to it always work.
export default defineNuxtRouteMiddleware((to) => {
  if (to.path !== "/") return;

  const saved = useCookie<string | null>(HOME_LANG_COOKIE, {
    maxAge: HOME_LANG_COOKIE_MAX_AGE,
    sameSite: "lax",
    path: "/",
  });

  if (saved.value === "en") return;
  if (saved.value === "id") return navigateTo("/id");

  const preferred = browserPrefersIndonesian() ? "id" : "en";
  saved.value = preferred;
  if (preferred === "id") return navigateTo("/id");
});

function browserPrefersIndonesian() {
  if (import.meta.server) {
    const header = useRequestHeaders(["accept-language"])["accept-language"] ?? "";
    const first = header.split(",")[0] ?? "";
    return first.trim().toLowerCase().startsWith("id");
  }
  const first = navigator.languages?.[0] ?? navigator.language ?? "";
  return first.toLowerCase().startsWith("id");
}
