<template>
  <div class="flex w-full items-center justify-center">
    <div class="relative">
      <ClientOnly>
        <svg
          ref="circleInputSvg"
          width="200"
          height="200"
          class="cursor-crosshair border border-amber-800/40 rounded-lg bg-gradient-to-br from-amber-50 to-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 emotion-circle-input w-full max-w-[200px] h-auto"
          viewBox="0 0 200 200"
          role="slider"
          :aria-label="`Emotion input control. Current craving level: ${cravingVal}% , mood level: ${moodVal}%. Use arrow keys or click and drag to adjust values.`"
          :aria-valuemin="0"
          :aria-valuemax="100"
          :aria-valuenow="cravingVal"
          :aria-valuetext="`Craving ${cravingVal}%, Mood ${moodVal}%`"
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
          @keyup="onKeyUp"
          @focus="onFocus"
          @blur="onBlur"
        >
          <desc>
            Interactive emotion tracking grid. Horizontal axis represents
            craving intensity from Calm (left) to Unstable (right). Vertical
            axis represents mood from Calm (bottom) to Unstable (top). Current
            position indicates your emotional state.
          </desc>
          <!-- Grid background -->
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
          <text x="190" y="105" fill="#b45309" font-size="10" text-anchor="end">
            Unstable Craving
          </text>
          <text
            x="10"
            y="105"
            fill="#b45309"
            font-size="10"
            text-anchor="start"
          >
            Calm Craving
          </text>
          <text
            x="105"
            y="15"
            fill="#b45309"
            font-size="10"
            text-anchor="middle"
          >
            Unstable Mood
          </text>
          <text
            x="105"
            y="195"
            fill="#b45309"
            font-size="10"
            text-anchor="middle"
          >
            Calm Mood
          </text>

          <!-- Current position indicator -->
          <circle
            :cx="(cravingVal / 100) * 180 + 10"
            :cy="((100 - moodVal) / 100) * 180 + 10"
            r="8"
            fill="#f59e0b"
            stroke="#fff7ed"
            stroke-width="2"
            class="drop-shadow-sm"
          />

          <!-- Focus ring for accessibility -->
          <circle
            v-if="isFocused"
            :cx="(cravingVal / 100) * 180 + 10"
            :cy="((100 - moodVal) / 100) * 180 + 10"
            r="12"
            fill="none"
            stroke="#3b82f6"
            stroke-width="2"
            stroke-dasharray="3,2"
            opacity="0.8"
            class="animate-pulse"
          />

          <!-- Follow mouse mode indicator -->
          <circle
            v-if="isFollowMouseMode"
            :cx="(cravingVal / 100) * 180 + 10"
            :cy="((100 - moodVal) / 100) * 180 + 10"
            r="15"
            fill="none"
            stroke="#10b981"
            stroke-width="2"
            stroke-dasharray="5,3"
            opacity="0.9"
            class="animate-pulse"
          />

          <!-- Follow mouse mode label -->
          <text
            v-if="isFollowMouseMode"
            x="10"
            y="25"
            fill="#10b981"
            font-size="12"
            font-weight="bold"
            text-anchor="start"
          >
            Follow Mouse (F)
          </text>
        </svg>
        <template #fallback>
          <div
            class="w-full max-w-[200px] h-auto aspect-square border border-amber-800/40 rounded-lg bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center"
          >
            <span class="text-amber-800 text-sm">Loading...</span>
          </div>
        </template>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref, ComputedRef } from "vue";
// Inject shared reactive state from parent instead of using props/emits
const cravingValue = inject<Ref<number>>("cravingValue")!;
const moodValue = inject<Ref<number>>("moodValue")!;
const canMarkPeak = inject<ComputedRef<boolean>>("canMarkPeak")!;
const onMarkPeak = inject<() => void>("onMarkPeak")!;

// Computed primitives for template binding (helps TS template inference)
const cravingVal = computed(() => cravingValue.value);
const moodVal = computed(() => moodValue.value);

// Local state for interaction
const circleInputSvg = ref<SVGElement | null>(null);
const isFocused = ref(false);
const isFollowMouseMode = ref(false);
let isDragging = false;

// Keyboard state tracking for diagonal movement support
const pressedKeys = ref(new Set<string>());
let keyboardUpdateTimer: number | null = null;

// Helpers
function clamp100(n: number) {
  return Math.min(100, Math.max(0, Math.round(n)));
}

function getCircleCoordinatesFromMouse(event: MouseEvent): {
  x: number;
  y: number;
} {
  const svg = circleInputSvg.value;
  if (!svg) return { x: cravingValue.value, y: moodValue.value };
  const rect = svg.getBoundingClientRect();
  const svgX = event.clientX - rect.left;
  const svgY = event.clientY - rect.top;
  const x = clamp100(((svgX - 10) / 180) * 100);
  const y = clamp100(100 - ((svgY - 10) / 180) * 100);
  return { x, y };
}

function getCircleCoordinatesFromTouch(event: TouchEvent): {
  x: number;
  y: number;
} {
  const svg = circleInputSvg.value;
  if (!svg || event.touches.length === 0)
    return { x: cravingValue.value, y: moodValue.value };
  const touch = event.touches[0];
  const rect = svg.getBoundingClientRect();
  const svgX = touch.clientX - rect.left;
  const svgY = touch.clientY - rect.top;
  const x = clamp100(((svgX - 10) / 180) * 100);
  const y = clamp100(100 - ((svgY - 10) / 180) * 100);
  return { x, y };
}

function updateValues(x: number, y: number) {
  // assign directly to injected refs
  cravingValue.value = clamp100(x);
  moodValue.value = clamp100(y);
}

// Mouse handlers
function onCircleClick(event: MouseEvent) {
  const { x, y } = getCircleCoordinatesFromMouse(event);
  updateValues(x, y);
}

function onCircleMouseMove(event: MouseEvent) {
  if (isFollowMouseMode.value || isDragging) {
    const { x, y } = getCircleCoordinatesFromMouse(event);
    updateValues(x, y);
  }
}

function startDragging(event: MouseEvent) {
  isDragging = true;
  const { x, y } = getCircleCoordinatesFromMouse(event);
  updateValues(x, y);
}

function stopDragging() {
  isDragging = false;
}

// Touch handlers
function startTouchDragging(event: TouchEvent) {
  event.preventDefault();
  isDragging = true;
  const { x, y } = getCircleCoordinatesFromTouch(event);
  updateValues(x, y);
}

function onTouchMove(event: TouchEvent) {
  if (!isDragging) return;
  event.preventDefault();
  const { x, y } = getCircleCoordinatesFromTouch(event);
  updateValues(x, y);
}

function stopTouchDragging(event: TouchEvent) {
  event.preventDefault();
  isDragging = false;
}

// Keyboard accessibility
function onKeyDown(event: KeyboardEvent) {
  const stepSize = event.shiftKey ? 25 : 3;
  let handled = false;
  switch (event.key) {
    case "Home":
      updateValues(50, 50);
      handled = true;
      break;
    case "f":
    case "F":
      isFollowMouseMode.value = !isFollowMouseMode.value;
      handled = true;
      break;
    case "Enter":
    case " ":
      if (canMarkPeak.value) {
        onMarkPeak();
        handled = true;
      }
      break;
    case "ArrowUp":
    case "ArrowDown":
    case "ArrowLeft":
    case "ArrowRight":
      pressedKeys.value.add(event.key);
      if (!keyboardUpdateTimer) startKeyboardMovement(stepSize);
      handled = true;
      break;
  }
  if (handled) event.preventDefault();
}

function onKeyUp(event: KeyboardEvent) {
  if (pressedKeys.value.has(event.key)) {
    pressedKeys.value.delete(event.key);
    if (!hasArrowKeys()) stopKeyboardMovement();
  }
}

function hasArrowKeys(): boolean {
  return (
    pressedKeys.value.has("ArrowUp") ||
    pressedKeys.value.has("ArrowDown") ||
    pressedKeys.value.has("ArrowLeft") ||
    pressedKeys.value.has("ArrowRight")
  );
}

function startKeyboardMovement(stepSize: number) {
  if (keyboardUpdateTimer) clearInterval(keyboardUpdateTimer);
  performKeyboardMovement(stepSize);
  keyboardUpdateTimer = window.setInterval(
    () => performKeyboardMovement(stepSize),
    50
  );
}

function stopKeyboardMovement() {
  if (keyboardUpdateTimer) {
    clearInterval(keyboardUpdateTimer);
    keyboardUpdateTimer = null;
  }
}

function performKeyboardMovement(stepSize: number) {
  let cravingDelta = 0;
  let moodDelta = 0;
  let moved = false;
  if (pressedKeys.value.has("ArrowRight")) {
    cravingDelta += stepSize;
    moved = true;
  }
  if (pressedKeys.value.has("ArrowLeft")) {
    cravingDelta -= stepSize;
    moved = true;
  }
  if (pressedKeys.value.has("ArrowUp")) {
    moodDelta += stepSize;
    moved = true;
  }
  if (pressedKeys.value.has("ArrowDown")) {
    moodDelta -= stepSize;
    moved = true;
  }
  if (moved) {
    const isDiagonal = cravingDelta !== 0 && moodDelta !== 0;
    if (isDiagonal) {
      cravingDelta *= 0.707;
      moodDelta *= 0.707;
    }
    updateValues(
      cravingValue.value + cravingDelta,
      moodValue.value + moodDelta
    );
  }
}

function onFocus() {
  isFocused.value = true;
}
function onBlur() {
  isFocused.value = false;
}

// Optionally expose helper for parent
function setValues(craving: number, mood: number) {
  updateValues(craving, mood);
}
defineExpose({ setValues });
</script>
