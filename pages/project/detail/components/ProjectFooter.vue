<template>
  <footer class="border-t border-gray-200 dark:border-gray-600 pt-8 mt-8">
    <div class="flex justify-between items-center">
      <p class="text-sm text-gray-600 dark:text-gray-300">
        © {{ new Date().getFullYear() }} {{ projectName }}. All rights reserved.
      </p>
      <div class="flex space-x-4">
        <a
          v-for="social in socialLinks"
          :key="social.name"
          :href="social.url"
          :title="social.name"
          class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon :name="social.icon" class="w-5 h-5" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
interface SocialLink {
  name: string;
  icon: string;
  url: string;
}

interface Props {
  projectName?: string;
  socialLinks?: SocialLink[];
}

const props = withDefaults(defineProps<Props>(), {
  projectName: "Colorful Interactive Project",
  socialLinks: () => [
    {
      name: "Twitter",
      icon: "mdi:twitter",
      url: "#",
    },
    {
      name: "LinkedIn",
      icon: "mdi:linkedin",
      url: "#",
    },
    {
      name: "GitHub",
      icon: "mdi:github",
      url: "#",
    },
  ],
});
</script>
