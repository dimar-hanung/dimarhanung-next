export default defineNuxtConfig({
  devtools: { enabled: true },

  nitro: {
    // preset: "vercel-edge",
    // preset: "vercel-edge",
  },

  app: {
    head: {
      title: "Dimar Hanung Portfolio",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        {
          name: "description",
          content: "Dimar Hanung Portfolio and Bio",
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/favicon.png",
        },
      ],
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "floating-vue/nuxt",
    "@nuxtjs/color-mode",
    "nuxt-icon",
    "v-wave/nuxt",
    "@vueuse/nuxt",
    "@vueuse/motion/nuxt",
  ],
  colorMode: {
    // preference: "system",
    // fallback: "light",
    classSuffix: "",
  },

  tailwindcss: {
    configPath: "tailwind.config",
  },
  css: ["~/assets/css/colors.css"],
});
