<template>
  <!-- Full Session Chart - 5 Minutes (match live chart container style) -->
  <div
    ref="chartContainer"
    class="relative w-full overflow-hidden rounded-lg border border-amber-800/30 p-4 shadow-xs vintage-card bg-[#fff7ed]"
  >
    <div class="mb-2 flex items-center justify-between">
      <h2 class="text-sm font-medium text-amber-900/90">
        Full Session - 5 Minutes
      </h2>
      <div class="text-xs text-amber-800/70" aria-hidden="true">
        <span
          class="inline-block h-2 w-2 rounded-full bg-red-600 align-middle"
        ></span>
        <span class="ml-1 mr-3 align-middle">Craving</span>
        <span
          class="inline-block h-2 w-2 rounded-full bg-emerald-600 align-middle"
        ></span>
        <span class="ml-1 align-middle">Mood</span>
      </div>
    </div>
    <ClientOnly>
      <canvas
        ref="canvasEl"
        :aria-label="'Line chart of urge intensity over time, last five minutes'"
        role="img"
        class="block h-[140px] w-full sm:h-[180px] vintage-canvas"
      ></canvas>
      <template #fallback>
        <div
          class="h-[140px] w-full sm:h-[180px] vintage-canvas bg-[#f3e0c0] border border-amber-800/30 rounded-sm flex items-center justify-center"
        >
          <span class="text-amber-800 text-sm">Loading chart...</span>
        </div>
      </template>
    </ClientOnly>
    <p class="sr-only" aria-live="polite">{{ liveStatus }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from "#imports";
import { mmss, createNoisePattern } from "../utils";

// Use injected reactive state instead of props
type Sample = {
  s: number;
  iso: string;
  label: string;
  craving: number;
  mood: number;
  valuesChanged?: boolean;
};
const samples = inject<Ref<Sample[]>>("samples")!;
const peakMarkers = inject<Ref<number[]>>("peakMarkers")!;
const elapsedSeconds = inject<Ref<number>>("elapsedSeconds")!;
const running = inject<Ref<boolean>>("running")!;

const canvasEl = ref<HTMLCanvasElement | null>(null);
const chartContainer = ref<HTMLElement | null>(null);
const liveStatus = ref("");

let cachedChartWidth: number | null = null;
let cachedChartHeight: number | null = null;

function draw() {
  const canvas = canvasEl.value;
  const container = chartContainer.value;
  if (!canvas || !container) return;

  const dpr = Math.max(1, Math.floor((window as any).devicePixelRatio || 1));

  let cssWidth: number;
  let cssHeight: number;
  if (running.value && cachedChartWidth && cachedChartHeight) {
    cssWidth = cachedChartWidth;
    cssHeight = cachedChartHeight;
  } else {
    cssWidth = container.clientWidth - 32;
    cssHeight = window.innerWidth < 640 ? 140 : 180;
  }

  canvas.width = Math.floor(cssWidth * dpr);
  canvas.height = Math.floor(cssHeight * dpr);
  canvas.style.width = cssWidth + "px";
  canvas.style.height = cssHeight + "px";

  const ctx = canvas.getContext("2d")!;
  (ctx as any).reset?.();
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  // Styles
  const bg = "#f3e0c0";
  const grid = "rgba(0,0,0,0.18)";
  const subText = "#4b5563";
  const cravingColor = "#dc2626";
  const moodColor = "#059669";
  const markerColor = "#e11d48";

  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, cssWidth, cssHeight);

  const margin = { top: 24, right: 32, bottom: 32, left: 44 };
  const plotX = margin.left;
  const plotY = margin.top;
  const plotW = cssWidth - margin.left - margin.right;
  const plotH = cssHeight - margin.top - margin.bottom;

  // Axes & grid
  ctx.save();
  ctx.strokeStyle = grid;
  ctx.lineWidth = 1;
  ctx.font =
    "12px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue";
  ctx.fillStyle = subText;
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  for (let v = 0; v <= 100; v += 25) {
    const y = plotY + plotH * (1 - v / 100);
    ctx.beginPath();
    ctx.moveTo(plotX, Math.round(y) + 0.5);
    ctx.lineTo(plotX + plotW, Math.round(y) + 0.5);
    ctx.stroke();
    ctx.fillText(String(v), plotX - 6, y);
  }
  const cur = elapsedSeconds.value;
  const windowStart = cur <= 300 ? 0 : cur - 300;
  const windowStop = windowStart + 300;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  for (let t = Math.ceil(windowStart / 60) * 60; t <= windowStop; t += 60) {
    const x = plotX + plotW * ((t - windowStart) / 300);
    ctx.beginPath();
    ctx.moveTo(Math.round(x) + 0.5, plotY);
    ctx.lineTo(Math.round(x) + 0.5, plotY + plotH);
    ctx.stroke();
    ctx.fillText(mmss(t), x, plotY + plotH + 6);
  }
  ctx.restore();

  const xForS = (s: number) => plotX + plotW * ((s - windowStart) / 300);
  const yForV = (v: number) => plotY + plotH * (1 - v / 100);
  const points = samples.value.filter(
    (p: Sample) => p.s >= windowStart && p.s <= windowStop
  );

  // Craving line
  if (points.length > 0) {
    ctx.save();
    ctx.lineWidth = 2;
    ctx.strokeStyle = cravingColor;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.beginPath();
    for (let i = 0; i < points.length; i++) {
      const p = points[i] as Sample;
      const x = xForS(p.s);
      const y = yForV(p.craving);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.restore();
  }
  // Mood line
  if (points.length > 0) {
    ctx.save();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = moodColor;
    ctx.globalAlpha = 0.95;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.beginPath();
    for (let i = 0; i < points.length; i++) {
      const p = points[i] as Sample;
      const x = xForS(p.s);
      const y = yForV(p.mood);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.fillStyle = moodColor;
    ctx.globalAlpha = 0.35;
    for (const p of points) {
      const sample = p as Sample;
      if (sample.valuesChanged) {
        const x = xForS(sample.s);
        const y = yForV(sample.mood);
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  }
  // Peak markers
  if (peakMarkers.value.length > 0) {
    ctx.save();
    ctx.strokeStyle = markerColor;
    ctx.fillStyle = markerColor;
    ctx.lineWidth = 1;
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    ctx.font =
      "12px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue";
    for (const s of peakMarkers.value) {
      const sec = s as number;
      if (sec < windowStart || sec > windowStop) continue;
      const x = xForS(sec);
      ctx.beginPath();
      ctx.moveTo(Math.round(x) + 0.5, plotY);
      ctx.lineTo(Math.round(x) + 0.5, plotY + plotH);
      ctx.stroke();
      ctx.fillText("Peak noted", x, plotY - 2);
    }
    ctx.restore();
  }
  // Subtle canvas noise overlay
  const pat = ensureNoisePattern(ctx);
  if (pat) {
    ctx.save();
    ctx.globalAlpha = 0.12;
    ctx.fillStyle = pat as any;
    ctx.fillRect(0, 0, cssWidth, cssHeight);
    ctx.restore();
  }
}

function handleResize() {
  draw();
}

onMounted(() => {
  nextTick(() => {
    draw();
  });
  window.addEventListener("resize", handleResize);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});

watch([samples, peakMarkers, elapsedSeconds, running], draw, { deep: true });

// Lightweight noise pattern for canvas overlay (cached)
let noisePattern: CanvasPattern | null = null;
function ensureNoisePattern(
  ctx: CanvasRenderingContext2D
): CanvasPattern | null {
  if (noisePattern) return noisePattern;
  noisePattern = createNoisePattern(ctx);
  return noisePattern;
}
</script>
