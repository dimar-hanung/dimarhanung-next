<script setup lang="ts">
const props = defineProps<{
  code: string;
  language?: string;
  filename?: string;
}>();
</script>

<template>
  <div class="code-block-wrapper">
    <div v-if="filename" class="code-filename">
      {{ filename }}
    </div>
    <MDC :value="`\`\`\`${language || 'text'}\n${code}\n\`\`\``" />
  </div>
</template>

<style scoped>
.code-block-wrapper {
  @apply rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 my-4;
}

.code-filename {
  @apply bg-gray-100 dark:bg-gray-800 px-4 py-2 text-sm font-mono border-b border-gray-200 dark:border-gray-700;
}

:deep(pre) {
  @apply m-0 p-4 overflow-x-auto;
}

:deep(code) {
  @apply font-mono text-sm;
}
</style>
