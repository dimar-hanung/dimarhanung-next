import { realpathSync } from "node:fs";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";

// In a git worktree node_modules can be a link to the main checkout, outside
// the folders Vite may serve. Then a package stylesheet the page <link>s
// (floating-vue's) got a 403 and a 404 on the first load. Allow the real
// folder too (the same folder when node_modules is not a link).
const realNodeModules = realpathSync(fileURLToPath(new URL("./node_modules", import.meta.url)));

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

  // Windows + Vite virtual ids (\0...) trip `ignore` unless relative paths are allowed.
  ignoreOptions: {
    allowRelativePaths: true,
  },

  // Avoid nuxt `ignore` + Windows virtual Vite ids (null-byte paths break `ignore` package).
  // Drop colocated page helper folders from the route table instead.
  hooks: {
    "pages:extend"(pages) {
      const drop = pages.filter((page) =>
        /[/\\]components[/\\]/.test(page.file || ""),
      );
      for (const page of drop) {
        const index = pages.indexOf(page);
        if (index !== -1) pages.splice(index, 1);
      }

      // Indonesian home page: /id renders pages/(home)/index.vue as its own
      // route (not an alias, so switching EN <-> ID is a real navigation).
      const home = pages.find((page) => page.path === "/");
      if (home && !pages.some((page) => page.path === "/id")) {
        pages.push({ name: "index-id", path: "/id", file: home.file });
      }
    },
  },

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
    optimizeDeps: {
      include: ['mermaid'],
    },
    server: {
      fs: {
        allow: [realNodeModules],
      },
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
