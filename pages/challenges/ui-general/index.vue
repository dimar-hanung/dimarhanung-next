<template>
  <div class="min-h-full px-4 py-16 text-slate-100 sm:px-6">
    <div class="mx-auto max-w-xl">
      <h1 class="text-3xl font-bold tracking-tight">UI General Challenges</h1>
      <p class="mt-2 text-base text-slate-400">
        Open-ended UI experiments. First up: my tech stack floating in a
        WebGL Milky Way. Move the pointer and scroll to feel the depth.
      </p>
    </div>

    <UiGeneralMilkyWayStack class="mt-12" />
  </div>
</template>

<script setup lang="ts">
const UiGeneralMilkyWayStack = defineAsyncComponent(
  () => import("./components/UiGeneralMilkyWayStack.vue")
);

useSeoMeta({
  title: "UI General Challenges",
  description:
    "Open-ended UI experiments by Dimar Hanung, starting with a tech stack floating in a WebGL Milky Way.",
});
</script>
