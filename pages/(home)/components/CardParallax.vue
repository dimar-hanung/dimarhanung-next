<template>
  <div
    class="relative flex items-center justify-center p-10 perspective-1000"
    ref="wrapper"
    @pointerenter="onPointerEnter"
    @pointerleave="onPointerLeave"
    @pointermove="onPointerMove"
  >
    <!-- 3D rotating container -->
    <div
      class="relative w-full max-w-xl transition-transform duration-100 ease-out"
      :style="{
        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transformStyle: 'preserve-3d',
      }"
    >
      <!-- Glass card -->
      <div
        class="relative overflow-hidden bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl shadow-2xl p-8 md:p-10 text-slate-900 dark:text-white transition-all duration-300 ease-out"
        :style="{
          transform: 'translateZ(20px)',
          transformStyle: 'preserve-3d',
        }"
      >
        <!-- Inner light reflection effect -->
        <div
          class="absolute inset-0 pointer-events-none z-50 transition-opacity duration-300"
          :style="{
            background: `radial-gradient(circle at ${lightPosition}, rgba(255,255,255,0.15) 0%, transparent 60%)`,
            opacity: isHovering ? 1 : 0.3,
          }"
        ></div>

        <!-- Inner colored glow (Moved inside) -->
        <div
          class="absolute inset-0 pointer-events-none transition-opacity duration-300"
          :style="{
            background: `radial-gradient(500px circle at ${lightPosition}, rgba(59, 130, 246, 0.15), transparent 80%)`,
            opacity: isHovering ? 1 : 0.5,
          }"
        ></div>

        <!-- Content -->
        <div class="relative z-10" style="transform-style: preserve-3d">
          <div class="flex flex-col md:flex-row items-center gap-8">
            <!-- Profile Image Layer -->
            <div
              class="relative group shrink-0"
              :style="{ transform: layerTransform(50, 18) }"
            >
              <NuxtImg
                width="120"
                height="120"
                class="relative rounded-full border-4 border-white dark:border-slate-800 shadow-lg object-cover"
                src="/profile/profile.jpeg"
                alt="Profile Image"
              />
            </div>

            <!-- Text Layer -->
            <div
              class="text-center md:text-left"
              :style="{ transform: layerTransform(30, 10) }"
            >
              <h1
                class="text-4xl md:text-5xl font-bold mb-3 tracking-tight bg-clip-text text-transparent bg-linear-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400"
              >
                Dimar Hanung
              </h1>
              <p
                class="text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed"
              >
                <span class="text-blue-600 dark:text-blue-400 font-bold"
                  >{{ yearsOfExperience }} years</span
                >
                of professional experience as a full stack engineer.
              </p>
            </div>
          </div>

          <div
            class="mt-8 flex justify-center md:justify-start"
            :style="{ transform: layerTransform(60, 14) }"
          >
            <a
              href="https://api.whatsapp.com/send?phone=6287837092992&text=%20"
              target="_blank"
              class="group relative inline-flex items-center gap-3 px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold text-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20"
            >
              <span>Contact Me</span>
              <Icon
                name="uil:whatsapp"
                class="w-6 h-6 transition-transform group-hover:rotate-12"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from "vue";

type Point = { x: number; y: number };

const rotation = ref({ x: 0, y: 0 });
const isHovering = ref(false);
const wrapper = ref<HTMLElement | null>(null);

const pointerTarget = ref<Point>({ x: 0, y: 0 });
const pointer = ref<Point>({ x: 0, y: 0 });

const MAX_TILT_DEG = 10;
let rafId: number | null = null;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const tick = () => {
  const lerp = 0.12;
  pointer.value = {
    x: pointer.value.x + (pointerTarget.value.x - pointer.value.x) * lerp,
    y: pointer.value.y + (pointerTarget.value.y - pointer.value.y) * lerp,
  };

  rotation.value = {
    x: pointer.value.y * MAX_TILT_DEG,
    y: -pointer.value.x * MAX_TILT_DEG,
  };

  const shouldContinue =
    isHovering.value ||
    Math.abs(pointer.value.x) > 0.001 ||
    Math.abs(pointer.value.y) > 0.001;

  if (shouldContinue) {
    rafId = requestAnimationFrame(tick);
  } else {
    rafId = null;
  }
};

const ensureTicking = () => {
  if (rafId != null) return;
  rafId = requestAnimationFrame(tick);
};

const onPointerEnter = () => {
  isHovering.value = true;
  ensureTicking();
};

const onPointerLeave = () => {
  isHovering.value = false;
  pointerTarget.value = { x: 0, y: 0 };
  ensureTicking();
};

const onPointerMove = (event: PointerEvent) => {
  if (!wrapper.value) return;
  const rect = wrapper.value.getBoundingClientRect();
  const px = (event.clientX - rect.left) / rect.width;
  const py = (event.clientY - rect.top) / rect.height;

  const nx = clamp(px * 2 - 1, -1, 1);
  const ny = clamp(py * 2 - 1, -1, 1);

  pointerTarget.value = { x: nx, y: ny };
  ensureTicking();
};

const layerTransform = (z: number, movePx: number) => {
  const x = pointer.value.x * movePx;
  const y = pointer.value.y * movePx;
  return `translateZ(${z}px) translateX(${x}px) translateY(${y}px)`;
};

const lightPosition = computed(() => {
  const x = 50 + pointer.value.x * 18;
  const y = 50 + pointer.value.y * 18;
  return `${x}% ${y}%`;
});

const yearsOfExperience = computed(() => {
  const start = new Date(2020, 7, 1); // August 1, 2020
  const now = new Date();
  const diffMs = now.getTime() - start.getTime();
  const diffYears = diffMs / (1000 * 60 * 60 * 24 * 365.25);
  return diffYears.toFixed(1).replace(/\.0$/, "");
});

onUnmounted(() => {
  if (rafId != null) cancelAnimationFrame(rafId);
});
</script>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}
</style>
