<template>
  <nav
    :class="[
      'sticky top-0 dark:text-white transition-all z-50',
      isTop ? 'p-0' : 'p-4',
    ]"
  >
    <div
      :class="[
        'bg-white p-3 flex justify-between border-b dark:border-transparent transition-all mx-auto',
        'dark:bg-muted-950 ',
        isTop ? 'w-full' : 'shadow-xl dark:shadow-2xl rounded-2xl',
      ]"
    >
      <!-- Left section -->
      <div class="flex place-items-center gap-2">
        <NuxtLink to="/" class="block">
          <button
            class="h-7 w-7 grid place-items-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-2xl"
          >
            <Icon name="mdi:home" />
          </button>
        </NuxtLink>

        <!-- Navigation Menu -->
        <div class="hidden md:flex place-items-center gap-4">
          <NuxtLink
            to="/project"
            class="font-bold transition-colors hover:text-primary-500"
            activeClass="text-primary-500"
            >Projects</NuxtLink
          >
          <NuxtLink
            to="/blog"
            class="font-bold transition-colors hover:text-primary-500"
            activeClass="text-primary-500"
            >Blog</NuxtLink
          >
        </div>
      </div>

      <!-- Right section -->
      <div class="flex place-items-center justify-center gap-2">
        <t-switch-color></t-switch-color>
        <t-switch-dark-mode></t-switch-dark-mode>

        <!-- Mobile Menu Button -->
        <button
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <Icon name="mdi:menu" class="text-2xl" />
        </button>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <div
      v-if="isMobileMenuOpen"
      class="fixed inset-0 bg-black/50 z-40"
      @click="isMobileMenuOpen = false"
    ></div>

    <!-- Mobile Menu -->
    <div
      :class="[
        'fixed right-0 top-0 h-full w-64 bg-white dark:bg-muted-950 transform transition-transform duration-300 ease-in-out z-50',
        'border-l dark:border-gray-800 p-4',
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full',
      ]"
    >
      <div class="flex flex-col gap-4">
        <div class="flex justify-end">
          <button
            @click="isMobileMenuOpen = false"
            class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Icon name="mdi:close" class="text-2xl" />
          </button>
        </div>

        <NuxtLink
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          class="p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
          activeClass="bg-primary-500/10 text-primary-500 hover:bg-primary-500/10 dark:hover:bg-primary-500/10"
          @click="isMobileMenuOpen = false"
        >
          {{ link.name }}
        </NuxtLink>

        <div class="flex gap-4 mt-4">
          <a
            href="https://github.com/dimar-hanung"
            target="_blank"
            class="p-2 hover:text-primary-500 transition-colors"
          >
            <Icon name="mdi:github" class="text-xl" />
          </a>
          <a
            href="https://linkedin.com/in/dimar-hanung"
            target="_blank"
            class="p-2 hover:text-primary-500 transition-colors"
          >
            <Icon name="mdi:linkedin" class="text-xl" />
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>
<script setup>
const color = useColorMode();

// listen scroll on top or not
const isTop = ref(true);

const onScroll = () => {
  isTop.value = window.scrollY <= 100;
};

onMounted(() => {
  window.addEventListener("scroll", onScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
});

const isMobileMenuOpen = ref(false);

const navLinks = [
  { name: "Projects", path: "/project" },
  { name: "Blog", path: "/blog" },
];
</script>
