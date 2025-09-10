<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8"
  >
    <div class="max-w-6xl mx-auto">
      <h1 class="text-4xl font-bold text-white mb-8 text-center">
        Interactive Moving Line Graph
      </h1>

      <div class="flex items-center justify-center gap-8">
        <ClientOnly>
          <!-- Vertical Slider -->
          <div class="flex flex-col items-center">
            <label class="text-white text-sm mb-4 rotate-0">Amplitude</label>
            <div class="relative h-80">
              <input
                v-model="amplitude"
                type="range"
                min="10"
                max="100"
                step="5"
                class="slider-vertical h-full"
                @input="updateAmplitude"
              />
              <div
                class="absolute -right-12 top-0 h-full flex flex-col justify-between text-white text-xs"
              >
                <span>100</span>
                <span>75</span>
                <span>50</span>
                <span>25</span>
                <span>10</span>
              </div>
            </div>
            <span class="text-white text-sm mt-4">{{ amplitude }}</span>
          </div>

          <!-- Graph Container -->
          <div
            class="bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30"
          >
            <div
              class="relative w-96 h-80 border border-gray-600 rounded-lg overflow-hidden bg-gray-900/50"
            >
              <!-- Grid Lines -->
              <svg class="absolute inset-0 w-full h-full">
                <!-- Horizontal grid lines -->
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
                      stroke="#374151"
                      stroke-width="0.5"
                      opacity="0.3"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />

                <!-- Center line -->
                <line
                  x1="0"
                  y1="50%"
                  x2="100%"
                  y2="50%"
                  stroke="#6b7280"
                  stroke-width="1"
                  opacity="0.5"
                />
              </svg>

              <!-- Moving Line Graph -->
              <svg class="absolute inset-0 w-full h-full">
                <path
                  :d="pathData"
                  fill="none"
                  stroke="url(#gradient)"
                  stroke-width="3"
                  class="transition-all duration-75 ease-linear"
                />

                <!-- Gradient definition -->
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop
                      offset="0%"
                      style="stop-color: #8b5cf6; stop-opacity: 1"
                    />
                    <stop
                      offset="50%"
                      style="stop-color: #06b6d4; stop-opacity: 1"
                    />
                    <stop
                      offset="100%"
                      style="stop-color: #10b981; stop-opacity: 1"
                    />
                  </linearGradient>
                </defs>
              </svg>

              <!-- Data points -->
              <div class="absolute inset-0">
                <div
                  v-for="(point, index) in visibleDataPoints"
                  :key="index"
                  class="absolute w-2 h-2 bg-cyan-400 rounded-full shadow-lg transition-all duration-75"
                  :style="{
                    left: `${(index / (visibleDataPoints.length - 1)) * 100}%`,
                    top: `${50 - point / 2}%`,
                    transform: 'translate(-50%, -50%)',
                  }"
                />
              </div>
            </div>

            <!-- Graph Controls -->
            <div
              class="mt-4 flex justify-between items-center text-white text-sm"
            >
              <div class="flex gap-4">
                <button
                  @click="toggleAnimation"
                  class="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                >
                  {{ isAnimating ? "Pause" : "Play" }}
                </button>
                <button
                  @click="resetGraph"
                  class="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Reset
                </button>
              </div>
              <div class="text-right">
                <div>Speed: {{ speed }}ms</div>
                <input
                  v-model="speed"
                  type="range"
                  min="50"
                  max="500"
                  step="50"
                  class="w-24 h-2 bg-gray-600 rounded-lg"
                />
              </div>
            </div>
          </div>

          <!-- Stats Panel -->
          <div
            class="bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30 text-white"
          >
            <h3 class="text-lg font-semibold mb-4">Statistics</h3>
            <div class="space-y-3 text-sm">
              <div class="flex justify-between">
                <span>Current Value:</span>
                <span class="text-cyan-400">{{ currentValue.toFixed(1) }}</span>
              </div>
              <div class="flex justify-between">
                <span>Max Value:</span>
                <span class="text-green-400">{{ maxValue.toFixed(1) }}</span>
              </div>
              <div class="flex justify-between">
                <span>Min Value:</span>
                <span class="text-red-400">{{ minValue.toFixed(1) }}</span>
              </div>
              <div class="flex justify-between">
                <span>Average:</span>
                <span class="text-yellow-400">{{
                  averageValue.toFixed(1)
                }}</span>
              </div>
              <div class="flex justify-between">
                <span>Data Points:</span>
                <span class="text-purple-400">{{ dataPoints.length }}</span>
              </div>
            </div>
          </div>
        </ClientOnly>
      </div>

      <!-- Historical/Recorded Graph Section -->
      <ClientOnly>
        <div class="mt-12">
          <h2 class="text-2xl font-bold text-white mb-6 text-center">
            Timeline Recording (Full Width)
          </h2>

          <div
            class="bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30"
          >
            <!-- Historical Graph Container - Full Width -->
            <div
              class="relative w-full h-64 border border-gray-600 rounded-lg overflow-hidden bg-gray-900/50 mb-4"
            >
              <!-- Grid Lines for Historical -->
              <svg class="absolute inset-0 w-full h-full">
                <defs>
                  <pattern
                    id="historyGrid"
                    width="40"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 40 0 L 0 0 0 20"
                      fill="none"
                      stroke="#374151"
                      stroke-width="0.5"
                      opacity="0.2"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#historyGrid)" />

                <!-- Center line -->
                <line
                  x1="0"
                  y1="50%"
                  x2="100%"
                  y2="50%"
                  stroke="#6b7280"
                  stroke-width="1"
                  opacity="0.3"
                />

                <!-- Time markers every minute (dynamic) -->
                <g>
                  <template v-for="i in windowMinutes" :key="`tickset-${i}`">
                    <line
                      :x1="`${(i / windowMinutes) * 100}%`"
                      y1="0%"
                      :x2="`${(i / windowMinutes) * 100}%`"
                      y2="100%"
                      stroke="#6b7280"
                      stroke-width="1"
                      opacity="0.4"
                    />
                    <text
                      :x="`${(i / windowMinutes) * 100}%`"
                      y="15"
                      fill="#9ca3af"
                      font-size="10"
                      text-anchor="middle"
                    >
                      {{ i }}min
                    </text>
                  </template>
                </g>
              </svg>

              <!-- Historical Line Graph -->
              <svg
                class="absolute inset-0 w-full h-full"
                viewBox="0 0 1400 256"
                preserveAspectRatio="none"
              >
                <path
                  :d="historicalPathData"
                  fill="none"
                  stroke="url(#historicalGradient)"
                  stroke-width="2"
                />

                <!-- Historical Gradient definition -->
                <defs>
                  <linearGradient
                    id="historicalGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop
                      offset="0%"
                      style="stop-color: #dc2626; stop-opacity: 0.8"
                    />
                    <stop
                      offset="25%"
                      style="stop-color: #ea580c; stop-opacity: 0.8"
                    />
                    <stop
                      offset="50%"
                      style="stop-color: #ca8a04; stop-opacity: 0.8"
                    />
                    <stop
                      offset="75%"
                      style="stop-color: #16a34a; stop-opacity: 0.8"
                    />
                    <stop
                      offset="100%"
                      style="stop-color: #2563eb; stop-opacity: 0.8"
                    />
                  </linearGradient>
                </defs>
              </svg>

              <!-- Area fill under the line -->
              <svg
                class="absolute inset-0 w-full h-full"
                viewBox="0 0 1400 256"
                preserveAspectRatio="none"
              >
                <path
                  :d="historicalAreaPath"
                  fill="url(#areaGradient)"
                  opacity="0.3"
                />

                <defs>
                  <linearGradient
                    id="areaGradient"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      style="stop-color: #8b5cf6; stop-opacity: 0.4"
                    />
                    <stop
                      offset="100%"
                      style="stop-color: #8b5cf6; stop-opacity: 0.1"
                    />
                  </linearGradient>
                </defs>
              </svg>

              <!-- Data point markers at intervals -->
              <div class="absolute inset-0">
                <div
                  v-for="(point, index) in historicalMarkers"
                  :key="index"
                  class="absolute w-1.5 h-1.5 bg-yellow-400 rounded-full shadow-lg opacity-70"
                  :style="{
                    left: `${point.x}%`,
                    top: `${point.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }"
                />
              </div>

              <!-- Current position indicator (based on filled fraction) -->
              <div
                v-if="filledCount > 0"
                class="absolute w-0.5 h-full bg-cyan-400 shadow-lg"
                :style="{
                  left: `${
                    (Math.max(0, filledCount - 1) /
                      Math.max(1, capacityPoints - 1)) *
                    100
                  }%`,
                  transform: 'translateX(-50%)',
                }"
              >
                <div
                  class="absolute -top-2 left-1/2 transform -translate-x-1/2 text-cyan-400 text-xs font-bold"
                >
                  NOW
                </div>
              </div>
            </div>

            <!-- Historical Controls and Info -->
            <div class="flex justify-between items-center text-white text-sm">
              <div class="flex gap-4 items-center">
                <button
                  @click="clearHistory"
                  class="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                  Clear History
                </button>
                <button
                  @click="exportData"
                  class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  Export Timeline Data
                </button>
                <div class="flex items-center gap-2">
                  <button
                    @click="zoomOut"
                    class="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600"
                  >
                    -
                  </button>
                  <span class="text-xs text-gray-300 w-28 text-center"
                    >Window: {{ windowMinutes }} min</span
                  >
                  <button
                    @click="zoomIn"
                    class="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600"
                  >
                    +
                  </button>
                </div>
                <div class="text-xs text-gray-300">Updates: Real-time</div>
              </div>

              <div class="text-right space-y-1">
                <div class="text-xs text-gray-300">
                  Recording: {{ recordingDuration }}
                </div>
                <div class="text-xs text-gray-300">
                  Points: {{ filledCount }} / {{ capacityPoints }}
                </div>
                <div class="text-xs text-gray-300">
                  Range: {{ overallRange.min.toFixed(1) }} to
                  {{ overallRange.max.toFixed(1) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
// Reactive state
const amplitude = ref(50);
const speed = ref(100);
const isAnimating = ref(true);
const dataPoints = ref<number[]>([]);
const timeOffset = ref(0);
const isClient = ref(false);
const startTime = ref<Date | null>(null);
// Zoomable timeline window (default 5 minutes)
const timelineWindowMs = ref(5 * 60 * 1000); // 5 minutes
const minWindowMs = 60 * 1000; // 1 minute
const maxWindowMs = 30 * 60 * 1000; // 30 minutes
const windowMinutes = computed(() =>
  Math.round(timelineWindowMs.value / 60000)
);
// Summary (historical) fixed-capacity buffer (5 minutes, fill left-to-right, no scrolling)
const capacityPoints = computed(() =>
  Math.max(10, Math.floor(timelineWindowMs.value / speed.value))
); // window / speed
const historicalBuffer = ref<Array<number | null>>([]);
const writeIndex = ref(0);
const filledCount = ref(0);
const sessionStartTime = ref<Date | null>(null);

// Animation frame ID for cleanup
let animationFrame: number | null = null;
let intervalId: any = null;

// Generate initial data points
const generateDataPoints = () => {
  const points = [];
  for (let i = 0; i < 50; i++) {
    const value =
      Math.sin((i * Math.PI) / 10 + timeOffset.value) * amplitude.value;
    points.push(value);
  }
  return points;
};

// Initialize data
onMounted(() => {
  isClient.value = true;
  startTime.value = new Date();
  sessionStartTime.value = new Date();
  // Initialize historical buffer with nulls so it renders empty left-to-right
  historicalBuffer.value = Array(capacityPoints.value).fill(null);
  writeIndex.value = 0;
  filledCount.value = 0;
  dataPoints.value = generateDataPoints();
  nextTick(() => {
    startAnimation();
  });
});

// Cleanup on unmount
onUnmounted(() => {
  if (isClient.value) {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }
    if (intervalId) {
      clearInterval(intervalId);
    }
  }
});

// Computed properties
const visibleDataPoints = computed(() => {
  return dataPoints.value.slice(-20); // Show last 20 points
});

const currentValue = computed(() => {
  return dataPoints.value[dataPoints.value.length - 1] || 0;
});

const maxValue = computed(() => {
  return Math.max(...dataPoints.value.slice(-50));
});

const minValue = computed(() => {
  return Math.min(...dataPoints.value.slice(-50));
});

const averageValue = computed(() => {
  const recent = dataPoints.value.slice(-20);
  return (
    recent.reduce((sum: number, val: number) => sum + val, 0) / recent.length
  );
});

// Historical graph computed properties (fixed-capacity, no scrolling)
const historicalPathData = computed(() => {
  const count = filledCount.value;
  if (count < 2) return "";

  const containerWidth = 1400;
  const containerHeight = 256;
  const cap = capacityPoints.value;

  // Find first valid point (nulls mean not yet filled)
  let firstIdx = 0;
  while (firstIdx < cap && historicalBuffer.value[firstIdx] == null) firstIdx++;
  if (firstIdx >= cap) return "";

  // Start path
  const firstVal = historicalBuffer.value[firstIdx] as number;
  let path = `M 0 ${containerHeight / 2 - firstVal * 2}`;

  for (let i = firstIdx + 1; i < cap; i++) {
    const v = historicalBuffer.value[i];
    if (v == null) break;
    const x = (i / (cap - 1)) * containerWidth;
    const y = containerHeight / 2 - v * 2;
    path += ` L ${x} ${y}`;
  }
  return path;
});

const historicalAreaPath = computed(() => {
  const count = filledCount.value;
  if (count < 2) return "";

  const containerWidth = 1400;
  const containerHeight = 256;
  const centerY = containerHeight / 2;
  const cap = capacityPoints.value;

  // Find first valid point
  let firstIdx = 0;
  while (firstIdx < cap && historicalBuffer.value[firstIdx] == null) firstIdx++;
  if (firstIdx >= cap) return "";

  let path = `M 0 ${centerY}`;
  path += ` L 0 ${centerY - (historicalBuffer.value[firstIdx] as number) * 2}`;

  for (let i = firstIdx + 1; i < cap; i++) {
    const v = historicalBuffer.value[i];
    if (v == null) break;
    const x = (i / (cap - 1)) * containerWidth;
    const y = centerY - v * 2;
    path += ` L ${x} ${y}`;
  }

  // Close back to center at the last filled x
  const lastX = (Math.max(firstIdx, count - 1) / (cap - 1)) * containerWidth;
  path += ` L ${lastX} ${centerY} L 0 ${centerY} Z`;
  return path;
});

const historicalMarkers = computed(() => {
  const cap = capacityPoints.value;
  const markers: Array<{ x: number; y: number }> = [];
  if (filledCount.value < 1) return markers;

  // Mark every 30s slot across capacity
  const step = Math.max(
    1,
    Math.floor(
      300000 / speed.value / Math.max(1, Math.floor(30000 / speed.value))
    )
  );
  for (let i = 0; i < cap; i += step) {
    const v = historicalBuffer.value[i];
    if (v == null) break;
    markers.push({
      x: (i / (cap - 1)) * 100,
      y: 50 - v / 2.5,
    });
  }
  return markers;
});

const recordingDuration = computed(() => {
  if (!startTime.value) return "00:00";

  const now = new Date();
  const diff = now.getTime() - startTime.value.getTime();
  const minutes = Math.floor(diff / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
});

const overallRange = computed(() => {
  const vals: number[] = [];
  for (const v of historicalBuffer.value) if (v != null) vals.push(v);
  if (vals.length === 0) return { min: 0, max: 0 };
  return { min: Math.min(...vals), max: Math.max(...vals) };
});

// Generate SVG path data for the line
const pathData = computed(() => {
  if (visibleDataPoints.value.length < 2) return "";

  const width = 384; // Graph width
  const height = 320; // Graph height
  const points = visibleDataPoints.value;

  let path = `M 0 ${height / 2 - points[0] / 2}`;

  for (let i = 1; i < points.length; i++) {
    const x = (i / (points.length - 1)) * width;
    const y = height / 2 - points[i] / 2;
    path += ` L ${x} ${y}`;
  }

  return path;
});

// Animation functions
const startAnimation = () => {
  if (!isClient.value) return;

  if (intervalId) clearInterval(intervalId);

  intervalId = setInterval(() => {
    if (isAnimating.value) {
      updateGraph();
    }
  }, speed.value);
};

const updateGraph = () => {
  timeOffset.value += 0.1;

  // Generate new data point
  const newValue =
    Math.sin(timeOffset.value) * amplitude.value +
    Math.sin(timeOffset.value * 2.3) * (amplitude.value * 0.3) +
    Math.sin(timeOffset.value * 0.7) * (amplitude.value * 0.2);

  dataPoints.value.push(newValue);
  // Write into fixed-capacity summary buffer (no scrolling)
  if (historicalBuffer.value.length !== capacityPoints.value) {
    // Rebuild buffer if speed changed capacity
    const old = historicalBuffer.value;
    historicalBuffer.value = Array(capacityPoints.value).fill(null);
    // Attempt to copy existing values starting from left
    const copyCount = Math.min(old.length, historicalBuffer.value.length);
    for (let i = 0; i < copyCount; i++) {
      historicalBuffer.value[i] = old[i] ?? null;
    }
    writeIndex.value = Math.min(writeIndex.value, capacityPoints.value - 1);
    filledCount.value = Math.min(filledCount.value, capacityPoints.value);
  }
  historicalBuffer.value[writeIndex.value] = newValue;
  writeIndex.value = Math.min(writeIndex.value + 1, capacityPoints.value); // stop at end; do not wrap for non-moving
  filledCount.value = Math.min(filledCount.value + 1, capacityPoints.value);
};

// Event handlers
const updateAmplitude = () => {
  // Amplitude change affects future points
};

const toggleAnimation = () => {
  isAnimating.value = !isAnimating.value;
};

const resetGraph = () => {
  dataPoints.value = [];
  timeOffset.value = 0;
  startTime.value = new Date();
  sessionStartTime.value = new Date();
  historicalBuffer.value = Array(capacityPoints.value).fill(null);
  writeIndex.value = 0;
  filledCount.value = 0;
  dataPoints.value = generateDataPoints();
};

// Historical graph functions
const clearHistory = () => {
  dataPoints.value = [];
  timeOffset.value = 0;
  startTime.value = new Date();
  sessionStartTime.value = new Date();
  historicalBuffer.value = Array(capacityPoints.value).fill(null);
  writeIndex.value = 0;
  filledCount.value = 0;
};

const exportData = () => {
  if (!isClient.value) return;

  const exportData = {
    timestamp: new Date().toISOString(),
    duration: recordingDuration.value,
    timeWindowMs: timelineWindowMs.value,
    totalPoints: dataPoints.value.length,
    fiveMinutePoints: filledCount.value,
    amplitude: amplitude.value,
    speed: speed.value,
    capacityPoints: capacityPoints.value,
    fiveMinuteData: historicalBuffer.value,
    allData: dataPoints.value,
    statistics: {
      min: overallRange.value.min,
      max: overallRange.value.max,
      average: averageValue.value,
      current: currentValue.value,
    },
  };

  const blob = new Blob([JSON.stringify(exportData, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `5min-graph-data-${new Date()
    .toISOString()
    .slice(0, 19)
    .replace(/:/g, "-")}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Watch speed changes to restart animation with new interval
watchEffect(() => {
  if (isClient.value && isAnimating.value) {
    startAnimation();
  }
});

// Zoom controls
const zoomIn = () => {
  timelineWindowMs.value = Math.max(
    minWindowMs,
    Math.floor(timelineWindowMs.value * 0.5)
  );
};
const zoomOut = () => {
  timelineWindowMs.value = Math.min(
    maxWindowMs,
    Math.floor(timelineWindowMs.value * 1.5)
  );
};

// Rebuild historical buffer when capacity changes (due to zoom or speed)
watch([capacityPoints], () => {
  const newCap = capacityPoints.value;
  const old = historicalBuffer.value;
  const newBuf = Array(newCap).fill(null) as Array<number | null>;
  // Copy as many as possible from the left to preserve fill
  const copyCount = Math.min(filledCount.value, newCap);
  for (let i = 0; i < copyCount; i++) newBuf[i] = old[i] ?? null;
  historicalBuffer.value = newBuf;
  writeIndex.value = Math.min(writeIndex.value, newCap);
  filledCount.value = Math.min(filledCount.value, newCap);
});
</script>

<style scoped>
/* Vertical slider styling */
.slider-vertical {
  writing-mode: bt-lr; /* IE */
  -webkit-appearance: slider-vertical; /* WebKit */
  appearance: slider-vertical; /* Standard */
  width: 20px;
  background: linear-gradient(to top, #8b5cf6, #06b6d4, #10b981);
  outline: none;
  border-radius: 10px;
}

.slider-vertical::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #ffffff;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  border: 2px solid #8b5cf6;
}

.slider-vertical::-moz-range-thumb {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #ffffff;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  border: 2px solid #8b5cf6;
}

/* Smooth transitions */
.transition-all {
  transition: all 0.3s ease;
}

/* Grid animation */
@keyframes pulse {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.6;
  }
}

/* Data point glow effect */
.absolute.w-2.h-2 {
  box-shadow: 0 0 10px rgba(6, 182, 212, 0.6);
}

/* Historical markers glow */
.absolute.w-1\.5.h-1\.5 {
  box-shadow: 0 0 6px rgba(250, 204, 21, 0.8);
}

/* Historical graph animations */
@keyframes pulse-glow {
  0%,
  100% {
    box-shadow: 0 0 6px rgba(250, 204, 21, 0.8);
  }
  50% {
    box-shadow: 0 0 12px rgba(250, 204, 21, 1);
  }
}

.absolute.w-1\.5.h-1\.5:hover {
  animation: pulse-glow 1s ease-in-out infinite;
}

/* Export button special styling */
button:has-text("Export Data") {
  background: linear-gradient(45deg, #2563eb, #3b82f6);
}

/* Clear button warning styling */
button:has-text("Clear History") {
  background: linear-gradient(45deg, #dc2626, #ef4444);
}
</style>
