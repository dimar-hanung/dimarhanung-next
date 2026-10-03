<template>
  <div
    ref="el"
    data-hero-drag
    class="relative cursor-grab"
    :class="{ 'cursor-grabbing': dragging }"
    @pointerdown="onPointerDown"
    @dragstart.prevent
    @click.capture="onClickCapture"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

// Mouse drag with a spring back home. Throw velocity carries into the spring,
// and the block swings a little around the grab point while it moves.
// Every moving frame fires `hero-grid-wake` so HeroGrid redraws the hole
// it cuts under [data-grid-hole] elements. While springing home the element
// carries `data-springing`, so HeroGrid leaves no trail behind that part.

// Movement before a press becomes a drag, so link clicks still work.
const DRAG_THRESHOLD = 4;
// Spring (mass 1): damping ratio ≈ 0.6, one soft overshoot.
const STIFFNESS = 170;
const DAMPING = 16;
// Swing: degrees per px/s of horizontal speed, and its cap.
const SWING_PER_SPEED = 0.012;
const SWING_MAX = 8;

const el = ref<HTMLElement | null>(null);
const dragging = ref(false);

let pressed = false;
let startX = 0;
let startY = 0;
// Pointer-to-offset gap at grab time, so the block doesn't jump to the cursor.
let grabX = 0;
let grabY = 0;
let x = 0;
let y = 0;
let vx = 0;
let vy = 0;
let angle = 0;
let lastMoveTime = 0;
let lastFrame = 0;
let rafId: number | null = null;
let suppressClick = false;
let resizeObserver: ResizeObserver | null = null;
let reducedMotion = false;

function wakeGrid() {
  el.value?.dispatchEvent(new Event("hero-grid-wake", { bubbles: true }));
}

function apply() {
  if (!el.value) return;
  el.value.style.transform =
    x === 0 && y === 0 && angle === 0
      ? ""
      : `translate3d(${x}px, ${y}px, 0) rotate(${angle}deg)`;
  // Keep a moving block above its neighbor.
  el.value.style.zIndex = x === 0 && y === 0 ? "" : "20";
  wakeGrid();
}

function tick(time: number) {
  const dt = lastFrame ? Math.min((time - lastFrame) / 1000, 1 / 30) : 1 / 60;
  lastFrame = time;

  if (!dragging.value) {
    // Semi-implicit Euler, stable at these rates.
    vx += (-STIFFNESS * x - DAMPING * vx) * dt;
    vy += (-STIFFNESS * y - DAMPING * vy) * dt;
    x += vx * dt;
    y += vy * dt;
  }

  const swing = Math.max(-SWING_MAX, Math.min(SWING_MAX, vx * SWING_PER_SPEED));
  angle += (swing - angle) * (1 - Math.exp(-dt * 12));

  const resting =
    !dragging.value &&
    Math.abs(x) < 0.3 &&
    Math.abs(y) < 0.3 &&
    Math.hypot(vx, vy) < 5 &&
    Math.abs(angle) < 0.05;

  if (resting) {
    delete el.value?.dataset.springing;
    x = 0;
    y = 0;
    vx = 0;
    vy = 0;
    angle = 0;
    apply();
    rafId = null;
    lastFrame = 0;
    return;
  }

  apply();
  rafId = requestAnimationFrame(tick);
}

function ensureTicking() {
  if (rafId != null) return;
  rafId = requestAnimationFrame(tick);
}

function onPointerDown(event: PointerEvent) {
  if (event.pointerType !== "mouse" || event.button !== 0 || !el.value) return;
  pressed = true;
  // A drag released outside the block never clicked it; don't eat this click.
  suppressClick = false;
  startX = event.clientX;
  startY = event.clientY;
  // Grabbing mid-spring picks the block up where it is.
  grabX = event.clientX - x;
  grabY = event.clientY - y;
  lastMoveTime = performance.now();

  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", onPointerUp);
}

function onPointerMove(event: PointerEvent) {
  if (!pressed || !el.value) return;

  if (!dragging.value) {
    if (Math.hypot(event.clientX - startX, event.clientY - startY) < DRAG_THRESHOLD) return;
    dragging.value = true;
    delete el.value.dataset.springing;
    suppressClick = true;
    // Swing around the grab point, like holding a card by that spot.
    const rect = el.value.getBoundingClientRect();
    el.value.style.transformOrigin = `${startX - rect.left + x}px ${startY - rect.top + y}px`;
    document.documentElement.style.userSelect = "none";
    window.getSelection()?.removeAllRanges();
  }

  const now = performance.now();
  const dt = Math.max((now - lastMoveTime) / 1000, 1 / 240);
  const nextX = event.clientX - grabX;
  const nextY = event.clientY - grabY;
  // Smoothed pointer velocity, handed to the spring on release.
  vx = vx * 0.6 + ((nextX - x) / dt) * 0.4;
  vy = vy * 0.6 + ((nextY - y) / dt) * 0.4;
  x = nextX;
  y = nextY;
  lastMoveTime = now;
  ensureTicking();
}

function onPointerUp() {
  pressed = false;
  window.removeEventListener("pointermove", onPointerMove);
  window.removeEventListener("pointerup", onPointerUp);
  if (!dragging.value) return;

  dragging.value = false;
  document.documentElement.style.userSelect = "";
  // Held still before letting go: no throw.
  if (performance.now() - lastMoveTime > 80) {
    vx = 0;
    vy = 0;
  }
  if (reducedMotion) {
    x = 0;
    y = 0;
    vx = 0;
    vy = 0;
    angle = 0;
    apply();
    return;
  }
  if (el.value) el.value.dataset.springing = "";
  ensureTicking();
}

// A drag that started on a link or button must not also click it.
function onClickCapture(event: MouseEvent) {
  if (!suppressClick) return;
  suppressClick = false;
  event.preventDefault();
  event.stopPropagation();
}

onMounted(() => {
  if (!el.value) return;
  reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // Content can size late (async components, fonts); let the grid re-cut.
  resizeObserver = new ResizeObserver(wakeGrid);
  resizeObserver.observe(el.value);
});

onUnmounted(() => {
  if (rafId != null) cancelAnimationFrame(rafId);
  resizeObserver?.disconnect();
  window.removeEventListener("pointermove", onPointerMove);
  window.removeEventListener("pointerup", onPointerUp);
  if (dragging.value) document.documentElement.style.userSelect = "";
});
</script>
