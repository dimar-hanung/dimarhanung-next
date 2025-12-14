<template>
  <div class="w-full border-t border-amber-800/30 pt-6">
    <p class="text-xs text-amber-800 text-center mb-4 font-medium">
      Export Your Session
    </p>
    <div class="flex gap-3">
      <button
        class="flex-1 rounded-lg border-2 border-amber-800/50 bg-white px-4 py-3 text-sm font-medium text-amber-800 hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:border-gray-300 disabled:text-gray-500 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 transition-all duration-200 friendly-btn-outline"
        :disabled="!canExport"
        @click="exportCSV"
      >
        <Icon name="mdi:file-table-outline" class="inline mr-1" />
        CSV
      </button>
      <button
        class="flex-1 rounded-lg border-2 border-amber-800/50 bg-white px-4 py-3 text-sm font-medium text-amber-800 hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:border-gray-300 disabled:text-gray-500 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 transition-all duration-200 friendly-btn-outline"
        :disabled="!canExport"
        @click="exportPNG"
      >
        <Icon name="mdi:image-outline" class="inline mr-1" />
        PNG
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Sample } from "../index.vue";
import { mmss } from "../utils";

const samples = inject("samples") as Ref<Sample[]>;
const elapsedSeconds = inject("elapsedSeconds") as Ref<number>;
const peakMarkers = inject("peakMarkers") as Ref<number[]>;

const canExport = computed(() => samples.value.length > 0);

function exportCSV() {
  if (samples.value.length === 0) return;
  const header = "timestamp,mm:ss,craving_intensity,mood_level" + "\n";
  const rows = samples.value.map(
    (r: Sample) => `${r.iso},${r.label},${r.craving},${r.mood}`
  );
  const csv = [header, ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "emotion_surfing_session.csv";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// PNG export with fixed 800px width for consistent quality across devices
function exportPNG() {
  // Create a temporary canvas for high-quality export at fixed 800px width
  const exportCanvas = document.createElement("canvas");
  const exportWidth = 1200;
  const exportHeight = 480; // Maintain reasonable aspect ratio
  const dpr = 2; // Use higher DPR for crisp export

  exportCanvas.width = exportWidth * dpr;
  exportCanvas.height = exportHeight * dpr;
  exportCanvas.style.width = exportWidth + "px";
  exportCanvas.style.height = exportHeight + "px";

  const ctx = exportCanvas.getContext("2d")!;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  // Render chart at fixed dimensions for export
  renderChartForExport(ctx, exportWidth, exportHeight);

  exportCanvas.toBlob((blob: Blob | null) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "urge_surfing_chart.png";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });
}

// Separate render function for PNG export with fixed dimensions
function renderChartForExport(
  ctx: CanvasRenderingContext2D,
  cssWidth: number,
  cssHeight: number
) {
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

  const margin = { top: 32, right: 40, bottom: 40, left: 56 }; // Larger margins for export
  const plotX = margin.left;
  const plotY = margin.top;
  const plotW = cssWidth - margin.left - margin.right;
  const plotH = cssHeight - margin.top - margin.bottom;

  // Axes & grid
  ctx.save();
  ctx.strokeStyle = grid;
  ctx.lineWidth = 1;
  ctx.font =
    "14px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue";
  ctx.fillStyle = subText;
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  for (let v = 0; v <= 100; v += 25) {
    const y = plotY + plotH * (1 - v / 100);
    ctx.beginPath();
    ctx.moveTo(plotX, Math.round(y) + 0.5);
    ctx.lineTo(plotX + plotW, Math.round(y) + 0.5);
    ctx.stroke();
    ctx.fillText(String(v), plotX - 8, y);
  }

  // X grid at each minute
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
    ctx.fillText(mmss(t), x, plotY + plotH + 8);
  }
  ctx.restore();

  // Helper mappers
  const xForS = (s: number) => plotX + plotW * ((s - windowStart) / 300);
  const yForV = (v: number) => plotY + plotH * (1 - v / 100);

  // Plot lines
  const points = samples.value.filter(
    (p: Sample) => p.s >= windowStart && p.s <= windowStop
  );

  // Craving line (red)
  if (points.length > 0) {
    ctx.save();
    ctx.lineWidth = 3; // Thicker line for export
    ctx.strokeStyle = cravingColor;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.beginPath();
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      const x = xForS(p.s);
      const y = yForV(p.craving);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.restore();
  }

  // Mood line (emerald)
  if (points.length > 0) {
    ctx.save();
    ctx.lineWidth = 2.5; // Thicker line for export
    ctx.strokeStyle = moodColor;
    ctx.globalAlpha = 0.95;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.beginPath();
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      const x = xForS(p.s);
      const y = yForV(p.mood);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Mark value change points
    ctx.fillStyle = moodColor;
    ctx.globalAlpha = 0.35;
    for (const p of points) {
      if (p.valuesChanged) {
        const x = xForS(p.s);
        const y = yForV(p.mood);
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2); // Larger dots for export
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
    ctx.lineWidth = 2;
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    ctx.font =
      "14px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue";
    for (const s of peakMarkers.value) {
      if (s < windowStart || s > windowStop) continue;
      const x = xForS(s);
      ctx.beginPath();
      ctx.moveTo(Math.round(x) + 0.5, plotY);
      ctx.lineTo(Math.round(x) + 0.5, plotY + plotH);
      ctx.stroke();
      ctx.fillText("Peak noted", x, plotY - 4);
    }
    ctx.restore();
  }

  // Add title and legend for export
  ctx.save();
  ctx.fillStyle = "#1f2937";
  ctx.font =
    "bold 18px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText("Urge Surfing Session - 5 Minutes", cssWidth / 2, 8);

  // Legend
  ctx.font =
    "14px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue";
  ctx.textAlign = "left";

  // Craving legend
  ctx.fillStyle = cravingColor;
  ctx.fillRect(cssWidth - 150, 8, 12, 3);
  ctx.fillStyle = "#1f2937";
  ctx.fillText("Craving", cssWidth - 130, 8);

  // Mood legend
  ctx.fillStyle = moodColor;
  ctx.fillRect(cssWidth - 150, 28, 12, 3);
  ctx.fillStyle = "#1f2937";
  ctx.fillText("Mood", cssWidth - 130, 28);

  ctx.restore();
}
</script>
