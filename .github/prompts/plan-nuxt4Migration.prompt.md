# Plan: Migrate Nuxt 3.17.2 → Nuxt 4.2.1

Clean migration with minimal changes - no automated codemod needed since you're already using modern patterns! Just dependency updates, one module swap, and 2 component refactors.

## Steps

1. **Create migration branch** - Create `nuxt4-migration` branch and commit current state for safe rollback

2. **Update dependencies in package.json** - Update to: `nuxt@^4.2.1`, `@nuxt/image@^2.0.0`, `@nuxtjs/color-mode@^4.0.0`, `@nuxtjs/tailwindcss@^6.12.0`, remove `nuxt-icon@^0.6.9` + add `@nuxt/icon@^1.1.0`, update `@vueuse/nuxt@^11.1.0`

3. **Update nuxt.config.ts modules** - Replace `"nuxt-icon"` with `"@nuxt/icon"` in modules array (component usage stays same)

4. **Refactor 2 Options API components** - Convert `pages/certificates/1.vue` and `components/t-range.vue` from `this.$refs`/`this.$emit` to `ref()`/`emit()` with Composition API

5. **Install and test** - Run `npm install`, `npm run postinstall`, `npm run dev`, verify dev server starts and pages load

6. **Build and validate** - Run `npm run build` and `npm run preview`, test all features (icons, color mode, images, animations, data fetching)

## Further Considerations

1. **i18n config unused?** - `i18n.config.ts` exists but no `@nuxtjs/i18n` module. Remove the file or add i18n module?
   Remove it for now

2. **@inspira-ui/plugins@0.0.1** - Very early version. Test immediately after migration - if it breaks, can we update it or replace functionality?
   Yes, update to latest version compatible with Nuxt 4
