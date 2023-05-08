export default defineNuxtConfig({
  nitro: {
    preset: "vercel-edge",
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
    "@nuxtjs/i18n",
    "@nuxt/image-edge",
    "nuxt-simple-sitemap",
  ],
  tailwindcss: {
    configPath: "tailwind.config",
  },
  i18n: {
    locales: ["en", "id"],
    defaultLocale: "en",
    vueI18n: {
      messages: {
        en: {
          hello: "Hello, My Name {name}!",
          collab: "Open to collaborate",

          about: {
            title: "About Me",
            year: "{year} year old",
            job: "{job} at {at}",
            study1: "Studies for TKJ at {at}",
            study2: "Studies for Information System at {at}",
            address: "Lives in Tangerang Selatan,  ",
            iLike: "I like to",
          },
        },
        id: {
          hello: "Halo ges, nama ku {name}",
          collab: "Saya sedia join projek :D",
          about: {
            title: "Tentangku",
            year: "Sudah {year} tahun di dunia",
            job: "{job} di {at}",
            study1: "Alumni {at} (TKJ)",
            study2: "Sedang kuliah di {at} (Sistem Informasi)",
            address: "Domisili di Tangerang Selatan,  ",
            iLike: "Aku suka",
          },
        },
      },
    },
  },
});
