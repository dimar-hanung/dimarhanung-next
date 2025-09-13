<template>
  <!-- Live Moving Chart - Last 1 Minute -->
  <div
    ref="liveChartContainer"
    class="relative w-full overflow-hidden rounded-lg border border-amber-800/30 p-4 shadow-sm vintage-card bg-[#fff7ed]"
  >
    <!-- Live Chart Title -->
    <div class="mb-2 flex items-center justify-between">
      <h2 class="text-sm font-medium text-amber-900/90">
        Live Wave - Last 60 Seconds
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
        ref="liveCanvasEl"
        :aria-label="'Live scrolling chart of urge intensity, last 60 seconds'"
        role="img"
        class="block h-[140px] w-full sm:h-[180px] vintage-canvas"
      ></canvas>
      <template #fallback>
        <div
          class="h-[140px] w-full sm:h-[180px] vintage-canvas bg-[#f3e0c0] border border-amber-800/30 rounded flex items-center justify-center"
        >
          <span class="text-amber-800 text-sm">Loading live chart...</span>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import type { Sample } from "../index.vue";
import { mmss } from "../utils";

const liveCanvasEl = ref<HTMLCanvasElement | null>(null);
const liveChartContainer = ref<HTMLElement | null>(null);
let cachedLiveChartWidth: number | null = null;
let cachedLiveChartHeight: number | null = null;

const running = inject("running") as Ref<boolean>;
const paused = inject("paused") as Ref<boolean>;
const elapsedSeconds = inject("elapsedSeconds") as Ref<number>;
const samples = inject("samples") as Ref<Sample[]>;
const ensureNoisePattern = inject("ensureNoisePattern") as (
  ctx: CanvasRenderingContext2D
) => CanvasPattern | null;
const peakMarkers = inject("peakMarkers") as Ref<number[]>;

// Live chart drawing function - shows last 60 seconds with right-to-left scrolling
function drawLiveChart() {
  const canvas = liveCanvasEl.value;
  const container = liveChartContainer.value;
  if (!canvas || !container) return;

  const dpr = Math.max(1, Math.floor((window as any).devicePixelRatio || 1));

  // Use cached dimensions during session, or calculate fresh dimensions
  let cssWidth: number;
  let cssHeight: number;

  if (running.value && cachedLiveChartWidth && cachedLiveChartHeight) {
    // Use cached dimensions during active session to prevent width changes
    cssWidth = cachedLiveChartWidth;
    cssHeight = cachedLiveChartHeight;
  } else {
    // Calculate fresh dimensions (initial load or after reset)
    cssWidth = container.clientWidth - 32; // account for p-4 padding (16px each side)
    cssHeight = window.innerWidth < 640 ? 140 : 180; // Responsive height
  }

  // Set canvas size accounting for DPR
  canvas.width = Math.floor(cssWidth * dpr);
  canvas.height = Math.floor(cssHeight * dpr);
  canvas.style.width = cssWidth + "px";
  canvas.style.height = cssHeight + "px";

  const ctx = canvas.getContext("2d")!;
  (ctx as any).reset?.();
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  // Styles: slightly darker, warmer palette for stronger vintage feel
  const bg = "#f3e0c0"; // deeper warm paper
  const grid = "rgba(0,0,0,0.18)";
  const subText = "#4b5563";
  const cravingColor = "#dc2626"; // red-600 for craving
  const moodColor = "#059669"; // emerald-600 for mood
  const markerColor = "#e11d48"; // rose-600

  // Clear background
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, cssWidth, cssHeight);

  const margin = { top: 20, right: 32, bottom: 25, left: 40 };
  const plotX = margin.left;
  const plotY = margin.top;
  const plotW = cssWidth - margin.left - margin.right;
  const plotH = cssHeight - margin.top - margin.bottom;

  // Live chart shows last 60 seconds with right-to-left scrolling
  const currentTime = elapsedSeconds.value;
  const windowDuration = 60; // 60 seconds window
  const windowStart = Math.max(0, currentTime - windowDuration);
  const windowEnd = currentTime;

  // Grid and axes
  ctx.save();
  ctx.strokeStyle = grid;
  ctx.lineWidth = 1;
  ctx.font =
    "11px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue";
  ctx.fillStyle = subText;
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";

  // Y-axis grid (intensity levels)
  for (let v = 0; v <= 100; v += 25) {
    const y = plotY + plotH * (1 - v / 100);
    ctx.beginPath();
    ctx.moveTo(plotX, Math.round(y) + 0.5);
    ctx.lineTo(plotX + plotW, Math.round(y) + 0.5);
    ctx.stroke();
    ctx.fillText(String(v), plotX - 6, y);
  }

  // X-axis grid (time in seconds, every 15 seconds)
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  for (let t = Math.ceil(windowStart / 15) * 15; t <= windowEnd; t += 15) {
    const x = plotX + plotW * ((t - windowStart) / windowDuration);
    if (x >= plotX && x <= plotX + plotW) {
      ctx.beginPath();
      ctx.moveTo(Math.round(x) + 0.5, plotY);
      ctx.lineTo(Math.round(x) + 0.5, plotY + plotH);
      ctx.stroke();
      const timeFromStart = t;
      const displayTime =
        timeFromStart >= 60 ? mmss(timeFromStart) : `${timeFromStart}s`;
      ctx.fillText(displayTime, x, plotY + plotH + 4);
    }
  }
  ctx.restore();

  // Helper mappers for live chart
  const xForS = (s: number) =>
    plotX + plotW * ((s - windowStart) / windowDuration);
  const yForV = (v: number) => plotY + plotH * (1 - v / 100);

  // Filter points for live chart window
  const livePoints = samples.value.filter(
    (p: Sample) => p.s >= windowStart && p.s <= windowEnd
  );

  // Draw craving line (red)
  if (livePoints.length > 0) {
    ctx.save();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = cravingColor;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.beginPath();
    for (let i = 0; i < livePoints.length; i++) {
      const p = livePoints[i];
      const x = xForS(p.s);
      const y = yForV(p.craving);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.restore();
  }

  // Draw mood line (emerald)
  if (livePoints.length > 0) {
    ctx.save();
    ctx.lineWidth = 2;
    ctx.strokeStyle = moodColor;
    ctx.globalAlpha = 0.95;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.beginPath();
    for (let i = 0; i < livePoints.length; i++) {
      const p = livePoints[i];
      const x = xForS(p.s);
      const y = yForV(p.mood);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Mark value change points with subtle indicators
    ctx.fillStyle = moodColor;
    ctx.globalAlpha = 0.4;
    for (const p of livePoints) {
      if (p.valuesChanged) {
        const x = xForS(p.s);
        const y = yForV(p.mood);
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  }

  // Draw peak markers in live view
  if (peakMarkers.value.length > 0) {
    ctx.save();
    ctx.strokeStyle = markerColor;
    ctx.fillStyle = markerColor;
    ctx.lineWidth = 1.5;
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    ctx.font =
      "10px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue";
    for (const s of peakMarkers.value) {
      if (s < windowStart || s > windowEnd) continue;
      const x = xForS(s);
      ctx.beginPath();
      ctx.moveTo(Math.round(x) + 0.5, plotY);
      ctx.lineTo(Math.round(x) + 0.5, plotY + plotH);
      ctx.stroke();
      ctx.fillText("Peak", x, plotY - 2);
    }
    ctx.restore();
  }

  // Current time indicator (vertical line at the right edge)
  if (running.value && !paused.value) {
    ctx.save();
    ctx.strokeStyle = "#f59e0b";
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.8;
    const currentX = xForS(currentTime);
    ctx.beginPath();
    ctx.moveTo(Math.round(currentX) + 0.5, plotY);
    ctx.lineTo(Math.round(currentX) + 0.5, plotY + plotH);
    ctx.stroke();
    ctx.restore();
  }

  // Subtle canvas noise overlay
  const pat = ensureNoisePattern(ctx);
  if (pat) {
    ctx.save();
    ctx.globalAlpha = 0.08;
    ctx.fillStyle = pat as any;
    ctx.fillRect(0, 0, cssWidth, cssHeight);
    ctx.restore();
  }
}

const onStart = () => {
  const liveContainer = liveChartContainer.value;

  if (liveContainer && !cachedLiveChartWidth) {
    cachedLiveChartWidth = liveContainer.clientWidth - 32; // account for p-4 padding (16px each side)
    cachedLiveChartHeight = window.innerWidth < 640 ? 140 : 180; // Responsive height based on screen size
  }
};

const onReset = () => {
  cachedLiveChartWidth = null;
  cachedLiveChartHeight = null;
  drawLiveChart();
};

defineExpose({
  drawLiveChart,
  onStart,
  onReset,
});
</script>
