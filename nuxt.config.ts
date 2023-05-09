export default defineNuxtConfig({
  nitro: {
    // preset: "vercel-edge",
    preset: "vercel-edge",
  },
  sitemap: {
    siteUrl: "https://dimarhanung.dev",
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
  modules: ["@nuxtjs/tailwindcss", "@nuxt/image-edge", "nuxt-simple-sitemap"],

  tailwindcss: {
    configPath: "tailwind.config",
  },
});
