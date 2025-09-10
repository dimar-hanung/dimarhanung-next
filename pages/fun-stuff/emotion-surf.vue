<template>
  <div class="min-h-screen vintage-ui" :class="{ 'page-loaded': isMounted }">
    <!-- Header -->
    <header class="px-4 pt-6 md:pt-8 vintage-header">
      <div class="mx-auto flex max-w-6xl items-center justify-between gap-3">
        <h1
          class="text-xl font-semibold tracking-tight sm:text-2xl"
          id="page-title"
        >
          Urge Surfing – 5-Minute Wave
        </h1>
        <!-- Optional help tooltip -->
        <button
          class="inline-flex items-center gap-2 rounded-md border border-transparent px-3 py-1.5 text-sm text-gray-700 underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 focus-visible:ring-offset-2 vintage-ghost"
          :title="'Notice → Breathe → Surf the wave → Let it pass.'"
          aria-label="Show urge surfing tip"
        >
          <Icon name="mdi:information-outline" aria-hidden="true" />
          <span>What’s this?</span>
        </button>
      </div>
    </header>
    <!-- Main content -->
    <main class="px-4 py-4 md:pt-6">
      <div class="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row">
        <!-- Chart area -->
        <section class="flex-1 min-w-0 space-y-4">
          <!-- Live Moving Chart - Last 1 Minute -->
          <div
            ref="liveChartContainer"
            class="relative w-full min-w-[400px] overflow-hidden rounded-lg border border-amber-800/30 p-4 shadow-sm vintage-card bg-[#fff7ed]"
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
                class="block h-[180px] w-full vintage-canvas"
              ></canvas>
              <template #fallback>
                <div
                  class="h-[180px] w-full vintage-canvas bg-[#f3e0c0] border border-amber-800/30 rounded flex items-center justify-center"
                >
                  <span class="text-amber-800 text-sm"
                    >Loading live chart...</span
                  >
                </div>
              </template>
            </ClientOnly>
          </div>

          <!-- Main 5-Minute Chart -->
          <div
            ref="chartContainer"
            class="relative w-full min-w-[400px] overflow-hidden rounded-lg border border-amber-800/30 p-4 shadow-sm vintage-card bg-[#fff7ed]"
          >
            <!-- Chart Title -->
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
                class="block h-[300px] w-full sm:h-[360px] vintage-canvas"
              ></canvas>
              <template #fallback>
                <div
                  class="h-[300px] w-full sm:h-[360px] vintage-canvas bg-[#f3e0c0] border border-amber-800/30 rounded flex items-center justify-center"
                >
                  <span class="text-amber-800 text-sm">Loading chart...</span>
                </div>
              </template>
            </ClientOnly>
            <!-- Live status for screen readers, visually hidden but available -->
            <p class="sr-only" aria-live="polite">{{ liveStatus }}</p>
          </div>
        </section>
        <!-- Circle input panel -->
        <aside class="w-full md:w-80">
          <div
            class="flex h-full flex-col items-center gap-8 rounded-lg border border-amber-800/30 p-6 shadow-sm vintage-card bg-[#fff7ed]"
          >
            <div class="text-center">
              <h2 class="text-base font-semibold text-amber-950 mb-2">
                Emotion Input
              </h2>
              <p class="text-xs text-amber-800/80 leading-relaxed">
                Click on the circle to set craving (X) and mood (Y)
              </p>
            </div>
            <!-- Circle input area -->
            <div class="flex w-full items-center justify-center">
              <div class="relative">
                <!-- SVG Circle Input -->
                <ClientOnly>
                  <svg
                    ref="circleInputSvg"
                    width="200"
                    height="200"
                    class="cursor-crosshair border border-amber-800/40 rounded-lg bg-gradient-to-br from-amber-50 to-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 emotion-circle-input"
                    role="slider"
                    :aria-label="`Emotion input control. Current craving level: ${cravingValue}%, mood level: ${moodValue}%. Use arrow keys or click and drag to adjust values.`"
                    :aria-valuemin="0"
                    :aria-valuemax="100"
                    :aria-valuenow="cravingValue"
                    :aria-valuetext="`Craving ${cravingValue}%, Mood ${moodValue}%`"
                    tabindex="0"
                    @click="onCircleClick"
                    @mousemove="onCircleMouseMove"
                    @mousedown="startDragging"
                    @mouseup="stopDragging"
                    @mouseleave="stopDragging"
                    @touchstart="startTouchDragging"
                    @touchmove="onTouchMove"
                    @touchend="stopTouchDragging"
                    @keydown="onKeyDown"
                    @focus="onFocus"
                    @blur="onBlur"
                  >
                    <!-- Screen reader description -->
                    <desc>
                      Interactive emotion tracking grid. Horizontal axis
                      represents craving intensity from low (left) to high
                      (right). Vertical axis represents mood from bad (bottom)
                      to good (top). Current position indicates your emotional
                      state.
                    </desc>
                    <!-- Background grid -->
                    <defs>
                      <pattern
                        id="grid"
                        width="20"
                        height="20"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M 20 0 L 0 0 0 20"
                          fill="none"
                          stroke="#d97706"
                          stroke-width="0.5"
                          opacity="0.3"
                        />
                      </pattern>
                    </defs>
                    <rect width="200" height="200" fill="url(#grid)" />
                    <!-- Axis lines -->
                    <line
                      x1="100"
                      y1="0"
                      x2="100"
                      y2="200"
                      stroke="#b45309"
                      stroke-width="1"
                      opacity="0.6"
                    />
                    <line
                      x1="0"
                      y1="100"
                      x2="200"
                      y2="100"
                      stroke="#b45309"
                      stroke-width="1"
                      opacity="0.6"
                    />
                    <!-- Labels -->
                    <text
                      x="190"
                      y="105"
                      fill="#b45309"
                      font-size="10"
                      text-anchor="end"
                    >
                      High Craving
                    </text>
                    <text
                      x="10"
                      y="105"
                      fill="#b45309"
                      font-size="10"
                      text-anchor="start"
                    >
                      Low Craving
                    </text>
                    <text
                      x="105"
                      y="15"
                      fill="#b45309"
                      font-size="10"
                      text-anchor="middle"
                    >
                      Good Mood
                    </text>
                    <text
                      x="105"
                      y="195"
                      fill="#b45309"
                      font-size="10"
                      text-anchor="middle"
                    >
                      Bad Mood
                    </text>
                    <!-- Current position indicator -->
                    <circle
                      :cx="(cravingValue / 100) * 180 + 10"
                      :cy="((100 - moodValue) / 100) * 180 + 10"
                      r="8"
                      fill="#f59e0b"
                      stroke="#fff7ed"
                      stroke-width="2"
                      class="drop-shadow-sm"
                    />
                    <!-- Focus ring for accessibility -->
                    <circle
                      v-if="isFocused"
                      :cx="(cravingValue / 100) * 180 + 10"
                      :cy="((100 - moodValue) / 100) * 180 + 10"
                      r="12"
                      fill="none"
                      stroke="#3b82f6"
                      stroke-width="2"
                      stroke-dasharray="3,2"
                      opacity="0.8"
                      class="animate-pulse"
                    />
                  </svg>
                  <template #fallback>
                    <div
                      class="w-[200px] h-[200px] border border-amber-800/40 rounded-lg bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center"
                    >
                      <span class="text-amber-800 text-sm">Loading...</span>
                    </div>
                  </template>
                </ClientOnly>
              </div>
            </div>

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

            <!-- Export Controls -->
            <div class="w-full border-t border-amber-800/30 pt-6">
              <p class="text-xs text-amber-800 text-center mb-4 font-medium">
                Export Your Session
              </p>
              <div class="flex gap-3">
                <button
                  class="flex-1 rounded-lg border-2 border-amber-800/50 bg-white px-4 py-3 text-sm font-medium text-amber-800 hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:border-gray-300 disabled:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 transition-all duration-200 friendly-btn-outline"
                  :disabled="!canExport"
                  @click="exportCSV"
                >
                  <Icon name="mdi:file-table-outline" class="inline mr-1" />
                  CSV
                </button>
                <button
                  class="flex-1 rounded-lg border-2 border-amber-800/50 bg-white px-4 py-3 text-sm font-medium text-amber-800 hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:border-gray-300 disabled:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 transition-all duration-200 friendly-btn-outline"
                  :disabled="!canExport"
                  @click="exportPNG"
                >
                  <Icon name="mdi:image-outline" class="inline mr-1" />
                  PNG
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
    <!-- Vintage overlays -->
    <div aria-hidden="true" class="vintage-overlay vintage-grade"></div>
    <div aria-hidden="true" class="vintage-overlay vintage-grain"></div>
    <div
      aria-hidden="true"
      class="vintage-overlay vintage-dust"
      :class="{ 'animate-enabled': isMounted }"
    ></div>
    <div
      aria-hidden="true"
      class="vintage-overlay vintage-scanlines"
      :class="{ 'animate-enabled': isMounted }"
    ></div>
    <div aria-hidden="true" class="vintage-overlay vintage-vignette"></div>
    <div
      aria-hidden="true"
      class="vintage-overlay vintage-nostalgia"
      :class="{ 'animate-enabled': isMounted }"
    ></div>
  </div>
</template>

<script setup lang="ts">
// Use Nuxt auto-imports path for TypeScript friendliness
import {
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  computed,
  nextTick,
} from "#imports";

type Sample = {
  s: number; // seconds since start
  iso: string;
  label: string; // mm:ss
  craving: number; // 0-100 (x-axis)
  mood: number; // 0-100 (y-axis)
  valuesChanged?: boolean;
};

// Constants
const DURATION = 300; // seconds (5 minutes)
const SAMPLE_MS = 500; // Update every 250ms for faster responsiveness

// Refs & state
const canvasEl = ref<HTMLCanvasElement | null>(null);
const liveCanvasEl = ref<HTMLCanvasElement | null>(null);
const chartContainer = ref<HTMLElement | null>(null);
const liveChartContainer = ref<HTMLElement | null>(null);
const circleInputSvg = ref<SVGElement | null>(null);

const cravingValue = ref<number>(50); // x-axis (0-100)
const moodValue = ref<number>(50); // y-axis (0-100)

const running = ref(false);
const paused = ref(false);
const elapsedSeconds = ref(0);
let intervalId: number | null = null;

const samples = ref<Sample[]>([]);
const peakMarkers = ref<number[]>([]); // seconds since start
let valuesChangedSinceLastSample = false;
let isDragging = false;

// Add mounted state for preventing animation flicker
const isMounted = ref(false);

// Cache chart dimensions to prevent width changes during session
let cachedChartWidth: number | null = null;
let cachedChartHeight: number | null = null;
let cachedLiveChartWidth: number | null = null;
let cachedLiveChartHeight: number | null = null;

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
const canExport = computed(() => samples.value.length > 0);

// Utilities
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const clamp100 = (n: number) => Math.min(100, Math.max(0, Math.round(n)));
const mmss = (s: number) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(
    2,
    "0"
  )}`;

function onStart() {
  if (running.value) return;

  // Cache chart dimensions when starting session
  const container = chartContainer.value;
  const liveContainer = liveChartContainer.value;

  if (container && !cachedChartWidth) {
    cachedChartWidth = container.clientWidth - 32; // account for p-4 padding (16px each side)
    cachedChartHeight = Math.max(
      240,
      Math.min(420, Math.floor(container.clientWidth * 0.45))
    );
  }

  if (liveContainer && !cachedLiveChartWidth) {
    cachedLiveChartWidth = liveContainer.clientWidth - 32; // account for p-4 padding (16px each side)
    cachedLiveChartHeight = 180; // Fixed height for live chart
  }

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
  cachedLiveChartWidth = null;
  cachedLiveChartHeight = null;

  liveStatus.value = "Reset complete";
  draw();
  drawLiveChart();
}

function onMarkPeak() {
  if (!running.value || paused.value) return;
  peakMarkers.value.push(elapsedSeconds.value);
  liveStatus.value = "Peak noted";
  draw();
}

function onCircleInput(x: number, y: number) {
  cravingValue.value = clamp100(x);
  moodValue.value = clamp100(y);
  valuesChangedSinceLastSample = true;
}

// Circle input handlers
function getCircleCoordinates(event: MouseEvent): { x: number; y: number } {
  const svg = circleInputSvg.value;
  if (!svg) return { x: 50, y: 50 };

  const rect = svg.getBoundingClientRect();
  const svgX = event.clientX - rect.left;
  const svgY = event.clientY - rect.top;

  // Convert SVG coordinates to percentage (with padding)
  const x = clamp100(((svgX - 10) / 180) * 100);
  const y = clamp100(100 - ((svgY - 10) / 180) * 100);

  return { x, y };
}

function onCircleClick(event: MouseEvent) {
  const { x, y } = getCircleCoordinates(event);
  onCircleInput(x, y);
}

function onCircleMouseMove(event: MouseEvent) {
  if (!isDragging) return;
  const { x, y } = getCircleCoordinates(event);
  onCircleInput(x, y);
}

function startDragging(event: MouseEvent) {
  isDragging = true;
  const { x, y } = getCircleCoordinates(event);
  onCircleInput(x, y);
}

function stopDragging() {
  isDragging = false;
}

function setCircleValues(craving: number, mood: number) {
  cravingValue.value = clamp100(craving);
  moodValue.value = clamp100(mood);
  valuesChangedSinceLastSample = true;
}

// Touch support for mobile devices
function getTouchCoordinates(event: TouchEvent): { x: number; y: number } {
  const svg = circleInputSvg.value;
  if (!svg || event.touches.length === 0) return { x: 50, y: 50 };

  const touch = event.touches[0];
  const rect = svg.getBoundingClientRect();
  const svgX = touch.clientX - rect.left;
  const svgY = touch.clientY - rect.top;

  // Convert SVG coordinates to percentage (with padding)
  const x = clamp100(((svgX - 10) / 180) * 100);
  const y = clamp100(100 - ((svgY - 10) / 180) * 100);

  return { x, y };
}

function startTouchDragging(event: TouchEvent) {
  event.preventDefault(); // Prevent scrolling
  isDragging = true;
  const { x, y } = getTouchCoordinates(event);
  onCircleInput(x, y);
}

function onTouchMove(event: TouchEvent) {
  if (!isDragging) return;
  event.preventDefault(); // Prevent scrolling
  const { x, y } = getTouchCoordinates(event);
  onCircleInput(x, y);
}

function stopTouchDragging(event: TouchEvent) {
  event.preventDefault();
  isDragging = false;
}

// Keyboard accessibility support
function onKeyDown(event: KeyboardEvent) {
  const stepSize = event.shiftKey ? 10 : 1; // Larger steps when Shift is held
  let handled = false;

  switch (event.key) {
    case "ArrowRight":
      // Increase craving (X-axis)
      cravingValue.value = clamp100(cravingValue.value + stepSize);
      valuesChangedSinceLastSample = true;
      handled = true;
      break;
    case "ArrowLeft":
      // Decrease craving (X-axis)
      cravingValue.value = clamp100(cravingValue.value - stepSize);
      valuesChangedSinceLastSample = true;
      handled = true;
      break;
    case "ArrowUp":
      // Increase mood (Y-axis)
      moodValue.value = clamp100(moodValue.value + stepSize);
      valuesChangedSinceLastSample = true;
      handled = true;
      break;
    case "ArrowDown":
      // Decrease mood (Y-axis)
      moodValue.value = clamp100(moodValue.value - stepSize);
      valuesChangedSinceLastSample = true;
      handled = true;
      break;
    case "Home":
      // Reset to center
      cravingValue.value = 50;
      moodValue.value = 50;
      valuesChangedSinceLastSample = true;
      handled = true;
      break;
    case "Enter":
    case " ":
      // Mark as peak when space or enter is pressed (if session is active)
      if (canMarkPeak.value) {
        onMarkPeak();
        handled = true;
      }
      break;
  }

  if (handled) {
    event.preventDefault();
    // Announce current values to screen readers
    announceCurrentValues();
  }
}

// Focus and blur handlers for accessibility
const isFocused = ref(false);

function onFocus() {
  isFocused.value = true;
  // Announce instructions to screen readers
  announceInstructions();
}

function onBlur() {
  isFocused.value = false;
}

// Screen reader announcements
function announceCurrentValues() {
  const message = `Craving level ${cravingValue.value}%, Mood level ${moodValue.value}%`;
  // Use aria-live region for announcements
  liveStatus.value = message;
}

function announceInstructions() {
  const message =
    "Use arrow keys to adjust craving and mood levels, Home to center, or Shift+arrows for larger steps";
  liveStatus.value = message;
}

// Sampling engine (4 Hz - updates every 250ms)
function tick() {
  if (!running.value || paused.value) return;

  const next = elapsedSeconds.value + SAMPLE_MS / 1000; // Increment by actual time interval
  if (next > DURATION) {
    // Auto-stop at 05:00
    running.value = false;
    paused.value = false;
    liveStatus.value = "Session complete";
    draw();
    drawLiveChart();
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

  draw();
  drawLiveChart();
}

// Canvas drawing
function draw() {
  const canvas = canvasEl.value;
  const container = chartContainer.value;
  if (!canvas || !container) return;

  const dpr = Math.max(1, Math.floor((window as any).devicePixelRatio || 1));

  // Use cached dimensions during session, or calculate fresh dimensions
  let cssWidth: number;
  let cssHeight: number;

  if (running.value && cachedChartWidth && cachedChartHeight) {
    // Use cached dimensions during active session to prevent width changes
    cssWidth = cachedChartWidth;
    cssHeight = cachedChartHeight;
  } else {
    // Calculate fresh dimensions (initial load or after reset)
    cssWidth = container.clientWidth - 32; // account for p-4 padding (16px each side)
    cssHeight = Math.max(
      240,
      Math.min(420, Math.floor(container.clientWidth * 0.45))
    );
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
    ctx.fillText(mmss(t), x, plotY + plotH + 6);
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
    ctx.lineWidth = 2;
    ctx.strokeStyle = cravingColor; // red for craving
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
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = moodColor; // emerald for mood
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
        ctx.arc(x, y, 3, 0, Math.PI * 2);
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
      if (s < windowStart || s > windowStop) continue;
      const x = xForS(s);
      ctx.beginPath();
      ctx.moveTo(Math.round(x) + 0.5, plotY);
      ctx.lineTo(Math.round(x) + 0.5, plotY + plotH);
      ctx.stroke();
      // Label near top
      ctx.fillText("Peak noted", x, plotY - 2);
    }
    ctx.restore();
  }

  // Subtle canvas noise overlay to add texture
  const pat = ensureNoisePattern(ctx);
  if (pat) {
    ctx.save();
    ctx.globalAlpha = 0.12;
    ctx.fillStyle = pat as any;
    ctx.fillRect(0, 0, cssWidth, cssHeight);
    ctx.restore();
  }
}

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
    cssHeight = 180; // Fixed height for live chart
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

// Resize handling
function handleResize() {
  draw();
  drawLiveChart();
}

onMounted(() => {
  // Add small delay to prevent animation flicker on initial load
  nextTick(() => {
    isMounted.value = true;
    draw(); // Initial draw
    drawLiveChart(); // Initial live chart draw
  });
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  if (intervalId != null) window.clearInterval(intervalId);
  intervalId = null;
  window.removeEventListener("resize", handleResize);
});

// Redraw when data changes
watch(samples, () => {
  draw();
  drawLiveChart();
});

// Exporters
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
  const exportCanvas = document.createElement('canvas');
  const exportWidth = 800;
  const exportHeight = 480; // Maintain reasonable aspect ratio
  const dpr = 2; // Use higher DPR for crisp export

  exportCanvas.width = exportWidth * dpr;
  exportCanvas.height = exportHeight * dpr;
  exportCanvas.style.width = exportWidth + 'px';
  exportCanvas.style.height = exportHeight + 'px';

  const ctx = exportCanvas.getContext('2d')!;
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
function renderChartForExport(ctx: CanvasRenderingContext2D, cssWidth: number, cssHeight: number) {
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
  ctx.font = "14px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue";
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
    ctx.font = "14px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue";
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
  ctx.font = "bold 18px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText("Urge Surfing Session - 5 Minutes", cssWidth / 2, 8);

  // Legend
  ctx.font = "14px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue";
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

  // Add subtle noise overlay for vintage feel
  const pat = ensureNoisePattern(ctx);
  if (pat) {
    ctx.save();
    ctx.globalAlpha = 0.08;
    ctx.fillStyle = pat as any;
    ctx.fillRect(0, 0, cssWidth, cssHeight);
    ctx.restore();
  }
}

// Lightweight noise pattern for canvas overlay (cached)
let noisePattern: CanvasPattern | null = null;
function ensureNoisePattern(
  ctx: CanvasRenderingContext2D
): CanvasPattern | null {
  if (noisePattern) return noisePattern;
  try {
    const n = document.createElement("canvas");
    const size = 64;
    n.width = size;
    n.height = size;
    const nc = n.getContext("2d");
    if (!nc) return null;
    const img = nc.createImageData(size, size);
    const data = img.data;
    for (let i = 0; i < data.length; i += 4) {
      const v = Math.floor(Math.random() * 256);
      data[i] = v; // r
      data[i + 1] = v; // g
      data[i + 2] = v; // b
      data[i + 3] = 24; // a (0-255) very subtle
    }
    nc.putImageData(img, 0, 0);
    noisePattern = ctx.createPattern(n, "repeat");
    return noisePattern;
  } catch (_) {
    return null;
  }
}
</script>

<style scoped>
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
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.vintage-ui.page-loaded {
  opacity: 1;
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

.vintage-scanlines.animate-enabled {
  animation: scan-flicker 4.2s linear infinite;
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
  background: #000;
  mix-blend-mode: multiply;
  opacity: 0.05;
}

.vintage-nostalgia.animate-enabled {
  animation: nostalgic-breathing 12s ease-in-out infinite;
}

/* Dust specks overlay */
.vintage-dust {
  z-index: 48;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><defs><filter id="f"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="1"/><feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 8 -6"/></filter></defs><rect width="128" height="128" filter="url(%23f)" fill="white" opacity="0.7"/></svg>');
  background-size: 256px 256px;
  background-position: 0 0;
  mix-blend-mode: screen; /* bright dust on darker base */
  opacity: 0.12;
}

.vintage-dust.animate-enabled {
  animation: dust-drift 60s linear infinite;
}

@keyframes scan-flicker {
  0%,
  100% {
    opacity: 0.16;
  }
  8% {
    opacity: 0.22;
  }
  10% {
    opacity: 0.17;
  }
  35% {
    opacity: 0.2;
  }
  38% {
    opacity: 0.24;
  }
  40% {
    opacity: 0.17;
  }
  60% {
    opacity: 0.21;
  }
  62% {
    opacity: 0.26;
  }
  65% {
    opacity: 0.18;
  }
}

@keyframes nostalgic-breathing {
  0% {
    opacity: 0.05;
  }
  25% {
    opacity: 0.08;
  }
  50% {
    opacity: 0.12;
  }
  75% {
    opacity: 0.08;
  }
  100% {
    opacity: 0.05;
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
    animation: none !important;
    opacity: 0.12;
  }
  .vintage-grain {
    opacity: 0.06;
  }
  .vintage-dust {
    animation: none !important;
    opacity: 0.08;
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
}
</style>

<!--
	Notes:
	- Sampling runs at 1 Hz to model mindful checking-in cadence; auto mode provides a plausible wave for demos.
	- We avoid external libs to keep the page light, fast, and offline-capable.
	- CSV/PNG exports use client-only Blob/toBlob APIs; nothing leaves the page.
-->
