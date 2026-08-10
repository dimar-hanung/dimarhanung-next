<template>
  <div class="min-h-full bg-[#0c0a09] px-6 py-16 text-stone-100">
    <div class="mx-auto max-w-xl">
      <h1 class="text-3xl font-bold tracking-tight">Streak</h1>
      <p class="mt-2 text-base text-stone-400">
        Latihan harian. Centang tugas; progress tersimpan di browser.
      </p>
      <ul class="mt-8 divide-y divide-stone-700 border border-stone-700">
        <li>
          <NuxtLink
            to="/challenges/streak/30-day-learn-capcut-tiktok"
            class="flex items-center justify-between gap-3 px-4 py-4 text-base transition-colors duration-150 ease-out hover:bg-white/5"
          >
            <span>30 hari CapCut untuk TikTok</span>
            <span class="text-amber-400">Buka</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  key: (route) => route.fullPath,
})

useSeoMeta({
  title: 'Streak Challenges',
})
</script>
