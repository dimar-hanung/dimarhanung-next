<template>
  <div class="min-h-screen vintage-ui">
    <!-- Header -->
    <header class="px-4 pt-6 md:pt-8 vintage-header">
      <div class="mx-auto flex max-w-6xl items-center justify-between gap-3">
        <h1
          class="text-xl font-semibold tracking-tight sm:text-2xl"
          id="page-title"
        >
          Urge Surfing - 5-Minute Wave
        </h1>
        <!-- Optional help tooltip -->
        <button
          class="inline-flex items-center gap-2 rounded-md border border-transparent px-3 py-1.5 text-sm text-gray-700 underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 focus-visible:ring-offset-2 vintage-ghost"
          :title="'Notice → Breathe → Surf the wave → Let it pass.'"
          aria-label="Show urge surfing tip"
        >
          <Icon name="mdi:information-outline" aria-hidden="true" />
          <span>What's this?</span>
        </button>
      </div>
    </header>
    <!-- Main content -->
    <main class="px-2 py-4 md:px-4 md:pt-6">
      <div class="mx-auto flex max-w-6xl flex-col gap-4 md:gap-6 md:flex-row">
        <!-- Chart area -->
        <section class="flex-1 min-w-0 space-y-3 md:space-y-4">
          <LiveWave ref="liveWave"></LiveWave>
          <!-- Main 5-Minute Chart (moved to Wave.vue) -->
          <Wave />
        </section>
        <!-- Circle input panel -->
        <aside class="w-full md:w-80">
          <div
            class="flex h-full flex-col items-center gap-6 md:gap-8 rounded-lg border border-amber-800/30 p-4 md:p-6 shadow-sm vintage-card bg-[#fff7ed]"
          >
            <div class="text-center">
              <h2 class="text-base font-semibold text-amber-950 mb-2">
                Emotion Input
              </h2>
              <p class="text-xs text-amber-800/80 leading-relaxed">
                Click on the circle to set craving (X) and mood (Y). Press F for
                follow-mouse mode.
              </p>
            </div>
            <!-- Circle input area -->
            <EmotionInput />

            <!-- Current values display -->
            <div class="flex w-full gap-3">
              <div
                class="flex flex-1 items-center justify-between rounded-lg border border-amber-800/40 px-3 py-2 shadow-sm vintage-card bg-gradient-to-b from-amber-50 to-amber-100"
              >
                <span
                  aria-live="polite"
                  aria-atomic="true"
                  class="text-lg font-bold tabular-nums text-amber-950"
                  >{{ cravingValue }}</span
                >
                <div class="text-left">
                  <div class="text-xs font-medium text-amber-800">Craving</div>
                  <div class="text-xs text-amber-700">X-Axis</div>
                </div>
              </div>
              <div
                class="flex flex-1 items-center justify-between rounded-lg border border-amber-800/40 px-3 py-2 shadow-sm vintage-card bg-gradient-to-b from-amber-50 to-amber-100"
              >
                <span
                  aria-live="polite"
                  aria-atomic="true"
                  class="text-lg font-bold tabular-nums text-amber-950"
                  >{{ moodValue }}</span
                >
                <div class="text-left">
                  <div class="text-xs font-medium text-amber-800">Mood</div>
                  <div class="text-xs text-amber-700">Y-Axis</div>
                </div>
              </div>
            </div>

            <!-- Session Timer -->
            <div class="w-full border-t border-amber-800/30 pt-6">
              <div class="text-center mb-4">
                <div
                  class="inline-flex items-center gap-2 rounded-lg border border-amber-800/40 px-4 py-3 text-lg font-mono font-semibold tabular-nums vintage-card bg-gradient-to-b from-amber-50 to-amber-100"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <Icon name="mdi:timer-outline" class="text-amber-700" />
                  {{ mmss(elapsedSeconds) }} / 05:00
                </div>
                <p class="text-sm text-amber-800 mt-3" aria-live="polite">
                  {{ footerStatus }}
                </p>
              </div>
            </div>

            <!-- Primary Controls -->
            <div class="w-full grid grid-cols-2 gap-2">
              <button
                class="rounded-md bg-gradient-to-b from-emerald-500 to-emerald-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:from-emerald-600 hover:to-emerald-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:from-gray-400 disabled:to-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-1 transition-all duration-200 friendly-btn"
                :disabled="!canStart"
                @click="onStart"
              >
                <Icon name="mdi:play" class="inline text-sm mr-1" />
                Start
              </button>
              <button
                class="rounded-md bg-gradient-to-b from-amber-500 to-amber-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:from-amber-600 hover:to-amber-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:from-gray-400 disabled:to-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-1 transition-all duration-200 friendly-btn"
                :disabled="!canPause && !canResume"
                @click="onTogglePause"
              >
                <Icon
                  :name="paused ? 'mdi:play' : 'mdi:pause'"
                  class="inline text-sm mr-1"
                />
                {{ paused ? "Resume" : "Pause" }}
              </button>
              <button
                class="rounded-md bg-gradient-to-b from-rose-500 to-rose-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:from-rose-600 hover:to-rose-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:from-gray-400 disabled:to-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-1 transition-all duration-200 friendly-btn"
                :disabled="!canMarkPeak"
                @click="onMarkPeak"
              >
                <Icon name="mdi:flag" class="inline text-sm mr-1" />
                Peak
              </button>
              <button
                class="rounded-md bg-gradient-to-b from-gray-500 to-gray-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:from-gray-600 hover:to-gray-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:from-gray-400 disabled:to-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-1 transition-all duration-200 friendly-btn"
                :disabled="!canReset"
                @click="onReset"
              >
                <Icon name="mdi:refresh" class="inline text-sm mr-1" />
                Reset
              </button>
            </div>

            <!-- Breathing Effect Controls -->
            <div class="w-full border-t border-amber-800/30 pt-4">
              <div class="flex items-center gap-3">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    v-model="breathingEnabled"
                    class="rounded border-amber-800/40 text-amber-600 focus:ring-amber-500 focus:ring-offset-1"
                  />
                  <span class="text-sm font-medium text-amber-800">
                    4-4-4 Breathing Effect
                  </span>
                </label>
              </div>
              <p class="text-xs text-amber-700 mt-1">
                Enable vintage breathing overlay (4s in, 4s hold, 4s out)
              </p>
            </div>

            <!-- Export Controls -->
            <ExportChart />
          </div>
        </aside>
      </div>
    </main>
    <!-- Vintage overlays -->
    <div
      aria-hidden="true"
      class="vintage-overlay vintage-grade"
      :class="{ hidden: !breathingEnabled }"
    ></div>
    <div
      aria-hidden="true"
      class="vintage-overlay vintage-grain"
      :class="{ hidden: !breathingEnabled }"
    ></div>
    <div
      aria-hidden="true"
      class="vintage-overlay vintage-dust"
      :class="{ hidden: !breathingEnabled }"
    ></div>
    <div
      aria-hidden="true"
      class="vintage-overlay vintage-scanlines"
      :class="{ hidden: !breathingEnabled }"
    ></div>
    <div
      aria-hidden="true"
      class="vintage-overlay vintage-vignette"
      :class="{ hidden: !breathingEnabled }"
    ></div>
    <div
      aria-hidden="true"
      class="vintage-overlay vintage-nostalgia"
      :class="{
        'breathing-active': breathingEnabled,
        hidden: !breathingEnabled,
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
// Use Nuxt auto-imports path for TypeScript friendliness
import { onBeforeUnmount, onMounted, ref, watch, computed } from "#imports";
import ExportChart from "./components/export-chart.vue";
import LiveWave from "./components/live-wave.vue";
import Wave from "./components/wave.vue";
import EmotionInput from "./components/emotion-input.vue";
import { clamp01, clamp100, createNoisePattern, mmss } from "./utils";

export type Sample = {
  s: number; // seconds since start
  iso: string;
  label: string; // mm:ss
  craving: number; // 0-100 (x-axis)
  mood: number; // 0-100 (y-axis)
  valuesChanged?: boolean;
};

const liveWave = ref<InstanceType<typeof LiveWave> | null>(null);

// Constants
const DURATION = 300; // seconds (5 minutes)
const SAMPLE_MS = 500; // Update every 250ms for faster responsiveness

// Refs & state

const cravingValue = ref<number>(50); // x-axis (0-100)
const moodValue = ref<number>(50); // y-axis (0-100)
provide("cravingValue", cravingValue);
provide("moodValue", moodValue);

// Breathing effect control
const breathingEnabled = ref<boolean>(false); // Breathing disabled by default

const running = ref(false);
provide("running", running);

const paused = ref(false);
provide("paused", paused);

const elapsedSeconds = ref(0);
provide("elapsedSeconds", elapsedSeconds);

let intervalId: number | null = null;

const samples = ref<Sample[]>([]);
provide("samples", samples);

const peakMarkers = ref<number[]>([]); // seconds since start
provide("peakMarkers", peakMarkers);
let valuesChangedSinceLastSample = false;

// Cache chart dimensions to prevent width changes during session
let cachedChartWidth: number | null = null;
let cachedChartHeight: number | null = null;

const liveStatus = ref("Ready. Press Start to begin.");
const footerStatus = computed(() => {
  if (!running.value) {
    if (elapsedSeconds.value >= DURATION) return "Session complete";
    return paused.value && samples.value.length > 0 ? "Paused" : "Ready";
  }
  const remaining = Math.max(0, DURATION - elapsedSeconds.value);
  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  return `${mins} minute${mins !== 1 ? "s" : ""} ${secs
    .toString()
    .padStart(2, "0")}s remaining`;
});

// Button enablement
const canStart = computed(
  () => !running.value && elapsedSeconds.value < DURATION
);
const canPause = computed(() => running.value && !paused.value);
const canResume = computed(() => running.value && paused.value);
const canReset = computed(() => !running.value && samples.value.length > 0);
const canMarkPeak = computed(() => running.value && !paused.value);
provide("canMarkPeak", canMarkPeak);

function onStart() {
  if (running.value) return;

  liveWave.value?.onStart();

  running.value = true;
  paused.value = false;
  liveStatus.value = "Session started";
  // Create interval if not exists
  if (intervalId == null) {
    intervalId = window.setInterval(tick, SAMPLE_MS);
  }
}

function onTogglePause() {
  if (!running.value) return;
  paused.value = !paused.value;
  liveStatus.value = paused.value ? "Paused" : "Resumed";
}

function onReset() {
  running.value = false;
  paused.value = false;
  elapsedSeconds.value = 0;
  samples.value = [];
  peakMarkers.value = [];
  valuesChangedSinceLastSample = false;

  // Reset cached dimensions to allow recalculation
  cachedChartWidth = null;
  cachedChartHeight = null;

  liveStatus.value = "Reset complete";
  liveWave.value?.onReset();
}

function onMarkPeak() {
  if (!running.value || paused.value) return;
  peakMarkers.value.push(elapsedSeconds.value);
  liveStatus.value = "Peak noted";
}
provide("onMarkPeak", onMarkPeak);

// Emotion input updates from child component
function onCravingUpdate(v: number) {
  cravingValue.value = clamp100(v);
  valuesChangedSinceLastSample = true;
}
function onMoodUpdate(v: number) {
  moodValue.value = clamp100(v);
  valuesChangedSinceLastSample = true;
}

// circle input logic moved into EmotionInput component

// Sampling engine (4 Hz - updates every 250ms)
function tick() {
  if (!running.value || paused.value) return;

  const next = elapsedSeconds.value + SAMPLE_MS / 1000; // Increment by actual time interval
  if (next > DURATION) {
    // Auto-stop at 05:00
    running.value = false;
    paused.value = false;
    liveStatus.value = "Session complete";
    liveWave.value?.drawLiveChart();
    return;
  }

  elapsedSeconds.value = next;

  // Get current values from circle input
  const craving = clamp100(cravingValue.value);
  const mood = clamp100(moodValue.value);

  const now = new Date();
  const iso = now.toISOString();

  samples.value.push({
    s: next,
    iso,
    label: mmss(Math.floor(next)), // Use floor for display
    craving: craving, // Use circle input craving value
    mood: mood, // Use circle input mood value
    valuesChanged: valuesChangedSinceLastSample,
  });

  valuesChangedSinceLastSample = false;

  liveWave.value?.drawLiveChart();
}

// Canvas drawing
// ...draw logic removed (now handled in Wave.vue)

// Resize handling
// ...handleResize removed (now handled in Wave.vue)

onMounted(() => {
  // Add small delay to prevent animation flicker on initial load
  nextTick(() => {
    liveWave.value?.drawLiveChart(); // Initial live chart draw
  });
});

onBeforeUnmount(() => {
  if (intervalId != null) window.clearInterval(intervalId);
  intervalId = null;
});

// Redraw liveWave when data changes
watch(samples, () => {
  liveWave.value?.drawLiveChart();
});

// Provide canvas noise pattern creator to children that need it (e.g., LiveWave)
let cachedPattern: CanvasPattern | null = null;
function ensureNoisePattern(
  ctx: CanvasRenderingContext2D
): CanvasPattern | null {
  if (!cachedPattern) cachedPattern = createNoisePattern(ctx);
  return cachedPattern;
}
provide("ensureNoisePattern", ensureNoisePattern);
</script>

<style>
/* Friendly button styles */
.friendly-btn {
  transform: translateY(0);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
}

.friendly-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1);
}

.friendly-btn:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
}

.friendly-btn-outline {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03);
}

.friendly-btn-outline:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
}

.friendly-btn-outline:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

/* Vintage look & feel */

.vintage-ui {
  background-color: #f3e0c0; /* darker warm paper */
  /* Tunable breathing intensity */
  --nostalgia-min: 0;
  --nostalgia-max: 0.95;
}

.vintage-card {
  background-color: #f0d9b3; /* deeper base warm */
  background-image: linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.02),
    rgba(0, 0, 0, 0.02)
  );
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06),
    inset 0 0 0 1px rgba(180, 83, 9, 0.08);
}

.vintage-canvas {
  /* Slight film tone */
  filter: contrast(1.08) saturate(0.85) sepia(0.24) hue-rotate(-8deg);
}

.vintage-btn {
  position: relative;
  isolation: isolate;
}
.vintage-btn::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
  mix-blend-mode: soft-light;
}

.vintage-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
}

.vintage-grade {
  /* warm color grade */
  z-index: 45;
  background: radial-gradient(
      120% 120% at 50% 10%,
      rgba(210, 160, 80, 0.18),
      rgba(0, 0, 0, 0) 55%
    ),
    linear-gradient(0deg, rgba(190, 120, 50, 0.08), rgba(210, 170, 90, 0.08));
  mix-blend-mode: soft-light;
}

.vintage-grain {
  /* film grain */
  z-index: 49;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="64" height="64" filter="url(%23n)" opacity="0.14"/></svg>');
  background-size: 192px 192px;
  mix-blend-mode: multiply;
}

.vintage-scanlines {
  z-index: 50;
  background: repeating-linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.18) 0px,
    rgba(0, 0, 0, 0.18) 1px,
    transparent 1px,
    transparent 3px
  );
  opacity: 0.26;
  mix-blend-mode: multiply;
}

.vintage-vignette {
  z-index: 51;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(0, 0, 0, 0) 55%,
    rgba(0, 0, 0, 0.35) 100%
  );
  mix-blend-mode: multiply;
  opacity: 0.7;
}

.vintage-nostalgia {
  z-index: 52;
  /* Black vintage gradient overlay for breathing effect */
  background: radial-gradient(
      circle at 50% 42%,
      rgba(0, 0, 0, 0.1),
      rgba(0, 0, 0, 0.8) 70%
    ),
    #000;
  /* Hidden by default when breathing is disabled */
  opacity: 0;
  will-change: opacity, filter;
  transition: opacity 0.4s ease;
}

/* Active breathing animation using 4-4-4 method */
.vintage-nostalgia.breathing-active {
  opacity: var(--nostalgia-min);
  /* Use per-segment timing in keyframes; keep animation itself neutral */
  animation: breathing-444 12s infinite both;
}

/* Dust specks overlay */
.vintage-dust {
  z-index: 48;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><defs><filter id="f"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="1"/><feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 8 -6"/></filter></defs><rect width="128" height="128" filter="url(%23f)" fill="white" opacity="0.7"/></svg>');
  background-size: 256px 256px;
  background-position: 0 0;
  mix-blend-mode: screen; /* bright dust on darker base */
  opacity: 0.12;
  animation: dust-drift 60s linear infinite;
}

/* Primary breathing animation using CSS variables for easy tuning */
@keyframes nostalgic-breathing {
  0%,
  100% {
    opacity: var(--nostalgia-min);
  }
  50% {
    opacity: var(--nostalgia-max);
  }
}

/* 4-4-4 Breathing Method: 4s in, 4s hold, 4s out (12s total cycle) */
@keyframes breathing-444 {
  /* 4 seconds inhale (0% to 33.33%) */
  0% {
    opacity: var(--nostalgia-min);
  }
  33.33% {
    opacity: var(--nostalgia-max);
  }
  /* 4 seconds hold (33.33% to 66.66%) */
  33.34% {
    /* lock value immediately after reaching max to avoid easing overshoot */
    opacity: var(--nostalgia-max);
    animation-timing-function: steps(1, end);
  }
  66.66% {
    opacity: var(--nostalgia-max);
  }
  /* 4 seconds exhale (66.66% to 100%) */
  66.67% {
    /* resume smooth easing on exhale */
    animation-timing-function: ease-in-out;
  }
  100% {
    opacity: var(--nostalgia-min);
  }
}

/* Secondary slow glow (subtle luminance & hue drift) */
@keyframes nostalgic-glow {
  0%,
  100% {
    filter: brightness(1) sepia(0.35) saturate(0.85) hue-rotate(-6deg);
  }
  50% {
    filter: brightness(1.12) sepia(0.45) saturate(0.75) hue-rotate(-14deg);
  }
}

@keyframes dust-drift {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 256px 512px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .vintage-scanlines {
    opacity: 0.12;
  }
  .vintage-grain {
    opacity: 0.06;
  }
  .vintage-dust {
    animation: none !important;
    opacity: 0.08;
  }
  /* Respect toggle: never force animation in reduced motion */
  .vintage-nostalgia {
    animation: none !important;
  }
  .vintage-nostalgia.breathing-active {
    animation: breathing-444 12s ease-in-out infinite !important;
  }
}

/* Header accents */
.vintage-header h1 {
  letter-spacing: 0.02em;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.2);
}

/* Dark mode removed for this page */

/* Inputs & subtle ghost button */
.vintage-input {
  background-color: #f3e6c8;
  border-color: #d97706;
  color: #1f2937;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
}
.vintage-input:focus {
  outline: none;
  border-color: #b45309;
  box-shadow: 0 0 0 2px rgba(180, 83, 9, 0.25);
}

.vintage-ghost {
  position: relative;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.6),
    rgba(255, 255, 255, 0.2)
  );
  border-color: rgba(180, 83, 9, 0.12);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5),
    0 1px 2px rgba(0, 0, 0, 0.04);
}

.vintage-segmented {
  background: #fff7ed;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4),
    0 1px 2px rgba(0, 0, 0, 0.04);
}
.vintage-segmented .vintage-btn {
  transition: background-color 0.15s ease, color 0.15s ease;
}
.vintage-segmented .vintage-btn:not(.bg-amber-700):hover {
  background-color: #fff1dc;
}

/* Enhanced accessibility and mobile support styles */
.emotion-circle-input {
  /* Improve touch targets for mobile */
  touch-action: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
}

.emotion-circle-input:focus {
  /* Enhanced focus styles for keyboard users */
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

.emotion-circle-input:focus-visible {
  /* Only show focus ring for keyboard users */
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .emotion-circle-input {
    border-width: 2px;
  }

  .emotion-circle-input:focus {
    outline-width: 3px;
    outline-color: HighlightText;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .emotion-circle-input circle {
    animation: none !important;
  }

  .animate-pulse {
    animation: none !important;
  }
}

/* Mobile-specific improvements */
@media (max-width: 768px) {
  .emotion-circle-input {
    /* Larger touch target on mobile */
    padding: 8px;
  }

  /* Reduce margins and padding on mobile for charts */
  .vintage-card {
    padding: 0.75rem; /* Reduce from 1rem (p-4) to 0.75rem */
  }

  /* Ensure charts don't overflow on small screens */
  .vintage-canvas {
    min-width: 0;
    width: 100% !important;
  }

  /* Improve chart container responsiveness */
  section.flex-1 {
    min-width: 0;
    overflow-x: hidden;
  }
}

/* Extra small screens (phones in portrait) */
@media (max-width: 480px) {
  .vintage-card {
    padding: 0.5rem; /* Further reduce padding on very small screens */
  }

  /* Reduce font sizes for better mobile experience */
  .vintage-card h2 {
    font-size: 0.875rem; /* text-sm */
  }

  .vintage-card .text-xs {
    font-size: 0.75rem; /* Keep text-xs but ensure it's applied */
  }

  /* Ensure SVG input scales properly */
  .emotion-circle-input {
    max-width: 180px;
  }

  /* Improve header spacing on small screens */
  header.vintage-header {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

  /* Reduce main container padding */
  main {
    padding-left: 0.5rem !important;
    padding-right: 0.5rem !important;
  }
}
</style>
