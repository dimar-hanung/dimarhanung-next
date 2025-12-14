<template>
  <div class="min-h-screen grid place-items-center bg-gray-900">
    <div class="relative">
      <!-- Radial Gradient Box -->
      <div
        class="w-96 h-96 rounded-3xl"
        :style="{
          background: `radial-gradient(circle at center, 
            ${colors[0]} 0%, 
            ${colors[1]} 25%, 
            ${colors[2]} 50%, 
            ${colors[3]} 75%, 
            ${colors[4]} 100%)`,
        }"
      ></div>

      <!-- Color Labels -->
      <div class="mt-6 flex justify-center gap-2">
        <div
          v-for="(color, index) in colors"
          :key="index"
          class="flex items-center gap-2 bg-white/10 backdrop-blur-xs px-3 py-1.5 rounded-full"
        >
          <div
            class="w-4 h-4 rounded-full border border-white/20"
            :style="{ backgroundColor: color }"
          ></div>
          <span class="text-white text-xs font-mono">{{ color }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const colors = ref([
  "#4285F4", // Google Blue
  "#EA4335", // Google Red
  "#FBBC04", // Google Yellow
  "#34A853", // Google Green
  "#4285F4", // Google Blue (back to start)
]);
</script>
