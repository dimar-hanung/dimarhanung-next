import tailwindcss from "@tailwindcss/vite";

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
    "@nuxt/image",
    "floating-vue/nuxt",
    "@nuxtjs/color-mode",
    "@nuxt/icon",
    "@vueuse/nuxt",
    "@vueuse/motion/nuxt",
    "@nuxtjs/mdc",
  ],

  mdc: {
    highlight: {
      theme: {
        default: "github-light",
        dark: "github-dark",
      },
      langs: [
        "javascript",
        "typescript",
        "vue",
        "html",
        "css",
        "scss",
        "json",
        "markdown",
        "bash",
        "shell",
        "yaml",
        "sql",
        "python",
        "java",
        "c",
        "cpp",
        "csharp",
        "php",
        "go",
        "rust",
        "ruby",
      ],
    },
  },

  css: ["~/assets/css/tailwind.css"],

  vite: {
    plugins: [tailwindcss()],
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

  compatibilityDate: "2024-10-20",
});
