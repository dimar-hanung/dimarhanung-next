<template>
  <figure
    class="relative max-w-xl py-10 px-8 cursor-pointer overflow-hidden border-x border-gray-950/[.1] bg-gray-950/[.01] p-4 hover:bg-gray-950/[.05] dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
    :class="name ? '' : ''"
  >
    <p class="absolute top-3 right-4 text-xs text-muted-400">
      {{ date || "Coming Soon" }}
    </p>

    <div class="flex flex-row items-center gap-2">
      <NuxtImg :src="img" class="rounded-full" width="32" height="32" alt="" />
      <div class="flex flex-col">
        <span
          :class="[
            'dark:text-white',
            name == null ? 'h-2 w-1/2 rounded-full bg-slate-400' : '',
          ]"
        >
          {{ name }}
        </span>
        <p
          :class="[
            'text-sm font-medium dark:text-white/40',
            name == null ? 'mt-2 h-2 w-52 rounded-full bg-slate-400' : '',
          ]"
        >
          {{ title }}
        </p>
      </div>
    </div>
    <p class="p-1 pt-2 text-sm" v-if="name">{{ body }}</p>
    <div v-else class="pt-5">
      <!-- text placeholder 3 -->
      <div class="h-2 w-1-full rounded-full bg-slate-400"></div>
      <div class="mt-2 h-2 w-52 rounded-full bg-slate-400"></div>
      <div class="mt-2 h-2 w-1/2 rounded-full bg-slate-400"></div>
    </div>

    <div class="mt-1">
      <Icon
        v-if="name"
        name="mdi:linkedin"
        class="text-2xl hover:text-blue-600"
      />
    </div>
  </figure>
</template>

<script lang="ts" setup>
interface Props {
  img?: string | null;
  name?: string | null;
  title?: string | null;
  body?: string | null;
  date?: string | null;
}

defineProps<Props>();
</script>
