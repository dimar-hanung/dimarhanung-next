<template>
  <div class="min-h-screen grid place-items-center bg-gray-900">
    <div class="relative">
      <!-- Container with overflow hidden -->
      <div class="w-96 h-20 rounded-2xl overflow-hidden relative p-1">
        <!-- Rotating Box with Static Gradient Background -->
        <div
          class="rotating-box absolute"
          :style="{
            width: '1000px',
            height: '1000px',
            left: '50%',
            top: '50%',
            background: `conic-gradient(from 0deg, 
              ${colors[0]} 0deg, 
              ${colors[0]} 85deg,
              ${colors[1]} 95deg,
              ${colors[1]} 175deg, 
              ${colors[2]} 185deg,
              ${colors[2]} 265deg,
              ${colors[3]} 275deg,
              ${colors[3]} 355deg,
              ${colors[0]} 360deg)`,
          }"
        ></div>
        <div class="bg-white w-full h-full relative rounded-2xl"></div>
      </div>

      <!-- Color Labels -->
      <div class="mt-6 flex justify-center gap-2 flex-wrap max-w-2xl">
        <div
          v-for="(color, index) in colors"
          :key="index"
          class="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full"
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
  "#FF3B3B", // Bright Red
  "#FFD700", // Bright Yellow
  "#3B82F6", // Bright Blue
  "#10B981", // Bright Green
]);
</script>

<style scoped>
.rotating-box {
  animation: rotate 4s linear infinite;
  transform: translate(-50%, -50%) rotate(0deg);
  transform-origin: center center;
}

@keyframes rotate {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
