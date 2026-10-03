<template>
  <!-- overlay: take no layout space so the bar floats over the hero -->
  <nav
    :class="[
      'sticky top-3 z-50 px-3 dark:text-white',
      overlay ? 'h-0' : 'mb-3',
    ]"
  >
    <div
      :class="[
        'container mx-auto flex items-center justify-between gap-2 rounded-2xl border p-2 backdrop-blur-xl',
        'transition-[background-color,border-color,box-shadow] duration-200 ease-out',
        isScrolled
          ? 'border-muted-300/70 bg-white/85 shadow-lg shadow-muted-900/5 dark:border-white/10 dark:bg-muted-950/80 dark:shadow-black/40'
          : 'border-muted-300/50 bg-white/60 dark:border-white/5 dark:bg-muted-950/50',
      ]"
    >
      <!-- Brand -->
      <NuxtLink
        to="/"
        class="flex items-center gap-2.5 rounded-lg py-1 pl-1 pr-3 transition-colors hover:bg-muted-200/60 dark:hover:bg-white/5"
        aria-label="Dimar Hanung, home"
      >
        <span
          class="grid h-8 w-8 place-items-center rounded-lg bg-primary-500 font-bold tracking-tight text-white"
          >DH</span
        >
        <span class="hidden font-semibold tracking-tight sm:inline"
          >Dimar Hanung</span
        >
      </NuxtLink>

      <!-- Desktop links -->
      <div class="hidden items-center gap-1 md:flex">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          class="rounded-lg px-3.5 py-1.5 font-medium text-muted-600 transition-colors hover:bg-muted-200/60 hover:text-muted-900 dark:text-muted-300 dark:hover:bg-white/5 dark:hover:text-white"
          activeClass="!bg-primary-500/10 !text-primary-600 dark:!text-primary-400"
        >
          {{ link.name }}
        </NuxtLink>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-1">
        <t-switch-color></t-switch-color>
        <t-switch-dark-mode></t-switch-dark-mode>

        <span
          class="mx-1 hidden h-5 w-px bg-muted-300 dark:bg-white/10 md:block"
        ></span>

        <a
          href="https://github.com/dimar-hanung"
          target="_blank"
          rel="noopener"
          class="hidden h-9 w-9 place-items-center rounded-lg text-xl text-muted-600 transition-colors hover:bg-muted-200/60 hover:text-muted-900 dark:text-muted-300 dark:hover:bg-white/5 dark:hover:text-white md:grid"
          aria-label="GitHub"
        >
          <Icon name="mdi:github" />
        </a>

        <button
          type="button"
          class="grid h-9 w-9 place-items-center rounded-lg text-2xl transition-colors hover:bg-muted-200/60 dark:hover:bg-white/5 md:hidden"
          aria-label="Open menu"
          :aria-expanded="isMobileMenuOpen"
          @click="isMobileMenuOpen = true"
        >
          <Icon name="mdi:menu" />
        </button>
      </div>
    </div>

    <!-- Mobile overlay -->
    <Transition
      enter-active-class="transition-opacity duration-200 ease-out"
      leave-active-class="transition-opacity duration-150 ease-out"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isMobileMenuOpen"
        class="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
        @click="isMobileMenuOpen = false"
      ></div>
    </Transition>

    <!-- Mobile sheet -->
    <Transition
      enter-active-class="transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-opacity"
      leave-active-class="transition-transform duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-opacity"
      enter-from-class="translate-x-full motion-reduce:translate-x-0 motion-reduce:opacity-0"
      leave-to-class="translate-x-full motion-reduce:translate-x-0 motion-reduce:opacity-0"
    >
      <div
        v-if="isMobileMenuOpen"
        class="fixed inset-y-2 right-2 z-50 flex w-72 max-w-[calc(100vw-1rem)] flex-col rounded-2xl border border-muted-300/70 bg-white p-2 shadow-2xl dark:border-white/10 dark:bg-muted-950 md:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div
          class="flex items-center justify-between border-b border-muted-200 pb-2 dark:border-white/10"
        >
          <span class="pl-2 font-semibold tracking-tight">Menu</span>
          <button
            type="button"
            class="grid h-9 w-9 place-items-center rounded-lg text-2xl transition-colors hover:bg-muted-100 dark:hover:bg-white/5"
            aria-label="Close menu"
            @click="isMobileMenuOpen = false"
          >
            <Icon name="mdi:close" />
          </button>
        </div>

        <div class="flex flex-col gap-1 py-2">
          <NuxtLink
            to="/"
            class="rounded-lg px-3 py-2.5 text-lg font-medium transition-colors hover:bg-muted-100 dark:hover:bg-white/5"
            exactActiveClass="!bg-primary-500/10 text-primary-600 dark:text-primary-400"
            @click="isMobileMenuOpen = false"
          >
            Home
          </NuxtLink>
          <NuxtLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="rounded-lg px-3 py-2.5 text-lg font-medium transition-colors hover:bg-muted-100 dark:hover:bg-white/5"
            activeClass="!bg-primary-500/10 text-primary-600 dark:text-primary-400"
            @click="isMobileMenuOpen = false"
          >
            {{ link.name }}
          </NuxtLink>
        </div>

        <div
          class="mt-auto flex gap-1 border-t border-muted-200 pt-2 dark:border-white/10"
        >
          <a
            href="https://github.com/dimar-hanung"
            target="_blank"
            rel="noopener"
            class="grid h-10 w-10 place-items-center rounded-lg text-2xl transition-colors hover:bg-muted-100 hover:text-primary-500 dark:hover:bg-white/5"
            aria-label="GitHub"
          >
            <Icon name="mdi:github" />
          </a>
          <a
            href="https://linkedin.com/in/dimar-hanung"
            target="_blank"
            rel="noopener"
            class="grid h-10 w-10 place-items-center rounded-lg text-2xl transition-colors hover:bg-muted-100 hover:text-primary-500 dark:hover:bg-white/5"
            aria-label="LinkedIn"
          >
            <Icon name="mdi:linkedin" />
          </a>
        </div>
      </div>
    </Transition>
  </nav>
</template>
<script setup>
defineProps({
  overlay: { type: Boolean, default: false },
});

const { y } = useWindowScroll();
const isScrolled = computed(() => y.value > 8);

const isMobileMenuOpen = ref(false);

// Keep the page from scrolling behind the open mobile sheet.
const isBodyLocked = useScrollLock(import.meta.client ? document.body : null);
watch(isMobileMenuOpen, (open) => {
  isBodyLocked.value = open;
});

onKeyStroke("Escape", () => {
  isMobileMenuOpen.value = false;
});

const navLinks = [
  { name: "Projects", path: "/project" },
  { name: "Blog", path: "/blog" },
  { name: "Tools", path: "/tools" },
];
</script>
