<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- SVG Filters -->
    <svg class="absolute w-0 h-0" aria-hidden="true">
      <defs>
        <filter id="bg-metal-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise"/>
          <feColorMatrix type="saturate" values="0"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.15"/>
          </feComponentTransfer>
        </filter>
      </defs>
    </svg>

    <!-- Metal background - Cool silver/gunmetal tones -->
    <div
      class="fixed inset-0 -z-10 transition-all duration-500"
      :style="{
        background: isDark
          ? 'linear-gradient(135deg, #1a1d20 0%, #25282b 25%, #2a2d30 50%, #202326 75%, #1a1d20 100%)'
          : 'linear-gradient(135deg, #d8dce0 0%, #e0e4e8 25%, #e8ecef 50%, #d5d9dd 75%, #d8dce0 100%)'
      }"
    >
      <!-- Brushed horizontal lines -->
      <div
        class="absolute inset-0 opacity-30"
        :style="{
          background: isDark
            ? `repeating-linear-gradient(
                0deg,
                transparent 0px,
                transparent 3px,
                rgba(255,255,255,0.05) 3px,
                rgba(255,255,255,0.05) 4px,
                transparent 4px,
                transparent 8px
              )`
            : `repeating-linear-gradient(
                0deg,
                transparent 0px,
                transparent 3px,
                rgba(255,255,255,0.5) 3px,
                rgba(255,255,255,0.5) 4px,
                transparent 4px,
                transparent 8px
              )`
        }"
      />
      
      <!-- Secondary fine texture -->
      <div
        class="absolute inset-0 opacity-20"
        :style="{
          background: isDark
            ? `repeating-linear-gradient(
                90deg,
                transparent 0px,
                transparent 1px,
                rgba(255,255,255,0.03) 1px,
                rgba(255,255,255,0.03) 2px
              )`
            : `repeating-linear-gradient(
                90deg,
                transparent 0px,
                transparent 1px,
                rgba(0,0,0,0.03) 1px,
                rgba(0,0,0,0.03) 2px
              )`
        }"
      />

      <!-- Top shine -->
      <div
        class="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        :style="{
          background: isDark
            ? 'linear-gradient(180deg, rgba(100,110,120,0.15) 0%, transparent 100%)'
            : 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 100%)'
        }"
      />

      <!-- Bottom shadow -->
      <div
        class="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        :style="{
          background: isDark
            ? 'linear-gradient(0deg, rgba(0,0,0,0.4) 0%, transparent 100%)'
            : 'linear-gradient(0deg, rgba(0,0,0,0.1) 0%, transparent 100%)'
        }"
      />
    </div>

    <!-- Dark Mode Toggle Button -->
    <button
      @click="toggleDarkMode"
      class="fixed top-6 right-6 z-50 w-14 h-14 rounded-full cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95"
      :style="{
        background: isDark
          ? 'linear-gradient(145deg, #3a3d40 0%, #4a4d50 50%, #3a3d40 100%)'
          : 'linear-gradient(145deg, #e0e4e8 0%, #f0f2f4 50%, #d8dce0 100%)',
        boxShadow: isDark
          ? '0 4px 20px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1), 0 0 0 1px rgba(255,255,255,0.05)'
          : '0 4px 20px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.8), 0 0 0 1px rgba(0,0,0,0.05)',
      }"
    >
      <!-- Button inner bevel -->
      <div
        class="absolute inset-1 rounded-full pointer-events-none"
        :style="{
          boxShadow: isDark
            ? 'inset 0 1px 2px rgba(255,255,255,0.1), inset 0 -1px 2px rgba(0,0,0,0.3)'
            : 'inset 0 1px 2px rgba(255,255,255,0.9), inset 0 -1px 2px rgba(0,0,0,0.1)',
        }"
      />
      
      <!-- Icon -->
      <div class="relative w-full h-full flex items-center justify-center">
        <Icon
          v-if="!isDark"
          name="uil:moon"
          class="text-2xl transition-all duration-300"
          :style="{
            color: '#505560',
            filter: 'drop-shadow(0 1px 1px rgba(255,255,255,0.5))'
          }"
        />
        <Icon
          v-else
          name="uil:sun"
          class="text-2xl transition-all duration-300"
          :style="{
            color: '#d4a853',
            filter: 'drop-shadow(0 0 8px rgba(212,168,83,0.5))'
          }"
        />
      </div>
    </button>

    <div class="max-w-7xl mx-auto px-6 py-16 md:py-24">
      <!-- Header -->
      <header class="text-center mb-16 md:mb-20">
        <h1 class="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          <span 
            class="bg-clip-text text-transparent transition-all duration-500"
            :style="{
              backgroundImage: isDark
                ? 'linear-gradient(180deg, #c0c5cc 0%, #a0a5ac 50%, #80858c 100%)'
                : 'linear-gradient(180deg, #505050 0%, #404040 50%, #202020 100%)',
              filter: isDark 
                ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' 
                : 'drop-shadow(0 1px 2px rgba(255,255,255,0.5))'
            }"
          >
            Sertifikat Profesional
          </span>
        </h1>
        <p
          class="text-lg max-w-2xl mx-auto leading-relaxed transition-colors duration-500"
          :style="{ 
            color: isDark ? '#9095a0' : '#505050',
            textShadow: isDark ? '0 1px 2px rgba(0,0,0,0.5)' : '0 1px 0 rgba(255,255,255,0.5)'
          }"
        >
          Dokumentasi sertifikasi dan pencapaian dalam perjalanan karir di
          bidang teknologi dan pengembangan software.
        </p>
      </header>

      <!-- Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ClientOnly>
          <Certificate3DCard
            v-for="(item, index) in certificates"
            :key="index"
            :image-url="item.imageUrl"
            :title="item.title"
            :desc="item.desc"
            :date="item.date"
            :cradential="item.cradential"
          />

          <template #fallback>
            <div
              v-for="n in 6"
              :key="n"
              class="rounded-xl overflow-hidden shadow-xl"
              :style="{
                background: isDark
                  ? 'linear-gradient(170deg, #3a3d40 0%, #2a2d30 50%, #35383b 100%)'
                  : 'linear-gradient(170deg, #e0e4e8 0%, #d0d4d8 50%, #e0e4e8 100%)',
                boxShadow: isDark
                  ? '0 10px 30px -10px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)'
                  : '0 10px 30px -10px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.05)'
              }"
            >
              <div
                class="aspect-[4/3] animate-pulse"
                :class="isDark ? 'bg-slate-700/50' : 'bg-slate-300/50'"
              />
              <div class="p-6 space-y-3">
                <div
                  class="h-3 rounded animate-pulse w-1/3"
                  :class="isDark ? 'bg-slate-600' : 'bg-slate-400'"
                />
                <div
                  class="h-5 rounded animate-pulse"
                  :class="isDark ? 'bg-slate-600' : 'bg-slate-400'"
                />
                <div
                  class="h-4 rounded animate-pulse"
                  :class="isDark ? 'bg-slate-600' : 'bg-slate-400'"
                />
              </div>
            </div>
          </template>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import certicatesData from "./certificates.json";
import Certificate3DCard from "./components/Certificate3DCard.vue";

const certificates = reactive(certicatesData);
const isDark = ref(false);
const colorMode = useColorMode();

onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark');
  const observer = new MutationObserver(() => {
    isDark.value = document.documentElement.classList.contains('dark');
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
});

const toggleDarkMode = () => {
  if (colorMode.value === 'light') {
    colorMode.value = 'dark';
    colorMode.preference = 'dark';
  } else {
    colorMode.value = 'light';
    colorMode.preference = 'light';
  }
};
</script>