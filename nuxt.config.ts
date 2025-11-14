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
  components: ["~/components", "~/components/ui"],

  ignore: ["/pages/**/components/**"],
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "floating-vue/nuxt",
    "@nuxtjs/color-mode",
    "@nuxt/icon",
    "@vueuse/nuxt",
    "@vueuse/motion/nuxt",
  ],
  vite: {
    server: {
      watch: {
        ignored: [
          "!**/pages/**/components/**", // Jangan abaikan file dalam folder ini
        ],
      },
    },
  },

  colorMode: {
    classSuffix: "",
  },

  tailwindcss: {
    configPath: "tailwind.config",
  },

  css: ["~/assets/css/colors.css"],
  compatibilityDate: "2024-10-20",
});
