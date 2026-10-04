<template>
  <article
    ref="cardRef"
    class="group relative h-full"
    style="perspective: 1200px"
    @pointerenter="onPointerEnter"
    @pointerleave="onPointerLeave"
    @pointermove="onPointerMove"
  >
    <div
      class="certificate-card relative flex h-full flex-col overflow-hidden rounded-2xl border border-muted-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.06),0_12px_32px_-16px_rgba(15,23,42,0.18)] transition-[box-shadow,border-color] duration-300 dark:border-white/10 dark:bg-muted-900 dark:shadow-[0_16px_40px_-20px_rgba(0,0,0,0.7)]"
      :class="{ 'certificate-card--active': isHovering }"
      :style="cardStyle"
    >
      <div
        class="pointer-events-none absolute inset-0 z-20 mix-blend-soft-light"
        :style="{ background: specularHighlight, opacity: isHovering ? 1 : 0.35 }"
      />

      <button
        type="button"
        class="relative aspect-[4/3] overflow-hidden bg-muted-100 text-left dark:bg-muted-800"
        :aria-label="`Lihat pratinjau ${title}`"
        @click="emit('preview')"
      >
        <nuxt-img
          :src="imageUrl"
          :alt="title"
          class="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          format="webp"
          quality="85"
          loading="lazy"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-80"
        />
        <div class="absolute left-3 top-3 flex flex-wrap items-center gap-2">
          <span
            class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide backdrop-blur-md"
            :class="issuerTone"
          >
            <Icon :name="issuerIcon" class="h-3.5 w-3.5" />
            {{ issuer }}
          </span>
        </div>
        <div
          class="absolute bottom-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-muted-800 opacity-0 shadow-sm backdrop-blur-md transition-all duration-300 group-hover:opacity-100 dark:bg-muted-950/80 dark:text-muted-100"
        >
          <Icon name="mdi:magnify-plus-outline" class="h-5 w-5" />
        </div>
      </button>

      <div class="relative z-10 flex flex-1 flex-col p-5">
        <time
          class="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-400 dark:text-muted-500"
        >
          {{ formattedDate }}
        </time>
        <h3
          class="mt-2 text-lg font-semibold leading-snug text-muted-900 dark:text-white"
        >
          {{ title }}
        </h3>
        <p
          class="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-500 dark:text-muted-400"
        >
          {{ desc }}
        </p>

        <div class="mt-auto flex items-center justify-between gap-3 pt-5">
          <a
            v-if="cradential"
            :href="cradential"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 rounded-full bg-muted-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary-600 dark:bg-white dark:text-muted-950 dark:hover:bg-primary-400"
            @click.stop
          >
            Lihat Sertifikat
            <Icon name="mdi:open-in-new" class="h-3.5 w-3.5" />
          </a>
          <span
            v-else
            class="inline-flex items-center gap-1.5 text-xs font-medium text-muted-400"
          >
            <Icon name="mdi:clock-outline" class="h-4 w-4" />
            Segera
          </span>
          <button
            type="button"
            class="text-xs font-medium text-muted-400 transition-colors hover:text-primary-600 dark:hover:text-primary-400"
            @click="emit('preview')"
          >
            Pratinjau
          </button>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref } from "vue";

interface Props {
  imageUrl: string;
  title: string;
  desc: string;
  date: string;
  cradential?: string;
  issuer: string;
  issuerIcon: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  preview: [];
}>();

const cardRef = ref<HTMLElement | null>(null);
const rotation = ref({ x: 0, y: 0 });
const isHovering = ref(false);
const pointerTarget = ref({ x: 0, y: 0 });
const pointer = ref({ x: 0, y: 0 });

const MAX_TILT_DEG = 8;
let rafId: number | null = null;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const issuerTone = computed(() => {
  const map: Record<string, string> = {
    HackerRank:
      "bg-emerald-500/90 text-white shadow-sm",
    TestDome: "bg-sky-500/90 text-white shadow-sm",
    Codecademy: "bg-indigo-500/90 text-white shadow-sm",
    "Programming Hub": "bg-violet-500/90 text-white shadow-sm",
    Mendatang: "bg-white/85 text-muted-700 dark:bg-muted-800/90 dark:text-muted-200",
  };
  return map[props.issuer] || "bg-white/85 text-muted-800 dark:bg-muted-800/90 dark:text-muted-100";
});

const formattedDate = computed(() => {
  const parsed = new Date(props.date);
  if (Number.isNaN(parsed.getTime()) || parsed.getFullYear() > 2100) {
    return "Mendatang";
  }
  return parsed.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
});

const cardStyle = computed(() => ({
  transform: `rotateX(${rotation.value.x}deg) rotateY(${rotation.value.y}deg) translateZ(${isHovering.value ? 12 : 0}px)`,
  transformStyle: "preserve-3d",
  transition: isHovering.value
    ? "transform 0.08s ease-out"
    : "transform 0.55s cubic-bezier(0.23, 1, 0.32, 1)",
}));

const specularHighlight = computed(() => {
  const x = 50 + pointer.value.x * 28;
  const y = 42 + pointer.value.y * 24;
  return `radial-gradient(ellipse 70% 55% at ${x}% ${y}%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.08) 36%, transparent 68%)`;
});

const tick = () => {
  const lerp = 0.14;
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
  if (rafId != null || prefersReducedMotion()) return;
  rafId = requestAnimationFrame(tick);
};

const onPointerEnter = () => {
  if (prefersReducedMotion()) return;
  isHovering.value = true;
  ensureTicking();
};

const onPointerLeave = () => {
  isHovering.value = false;
  pointerTarget.value = { x: 0, y: 0 };
  ensureTicking();
};

const onPointerMove = (event: PointerEvent) => {
  if (!cardRef.value || prefersReducedMotion()) return;
  const rect = cardRef.value.getBoundingClientRect();
  const px = (event.clientX - rect.left) / rect.width;
  const py = (event.clientY - rect.top) / rect.height;
  pointerTarget.value = {
    x: clamp(px * 2 - 1, -1, 1),
    y: clamp(py * 2 - 1, -1, 1),
  };
  ensureTicking();
};

onUnmounted(() => {
  if (rafId != null) cancelAnimationFrame(rafId);
});
</script>

<style scoped>
.certificate-card--active {
  box-shadow:
    0 24px 48px -20px rgb(15 23 42 / 0.35),
    0 0 0 1px rgb(14 165 233 / 0.18);
}

:global(.dark) .certificate-card--active {
  box-shadow:
    0 28px 56px -24px rgb(0 0 0 / 0.75),
    0 0 0 1px rgb(14 165 233 / 0.28);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (prefers-reduced-motion: reduce) {
  .certificate-card {
    transform: none !important;
  }
}
</style>
