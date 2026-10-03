<template>
  <div class="pointer-events-none absolute inset-0 bg-muted-100 dark:bg-muted-900">
    <!-- First paint only; the canvas draws the same lines once it is ready. -->
    <div
      v-if="!canvasReady"
      class="absolute inset-0 bg-[linear-gradient(to_right,#80808029_1px,transparent_1px),linear-gradient(to_bottom,#80808029_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff1f_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1f_1px,transparent_1px)] bg-[size:24px_24px]"
    ></div>
    <canvas ref="canvas" class="absolute inset-0 h-full w-full"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

// Must match bg-[size:24px_24px] above so the canvas lines sit where the
// CSS lines were.
const CELL = 24;
// A lit cell stays fully on for a random time in this range, then switches
// off at once, so the trail breaks up at random instead of in order.
const LIT_MIN_MS = 200;
const LIT_MAX_MS = 1200;

// Click ripple (fires on release): a wave that bends the grid lines as it
// passes (a crest at the front, then decaying swells behind it) and lights the
// cells on its front, followed by a weaker echo.
const RIPPLE_MS = 1900;
const RIPPLE_RADIUS = 44 * CELL;
const RIPPLE_WIDTH = 1.2 * CELL;
// Lit wake behind the front: fades out over this distance toward the center.
const RIPPLE_WAKE = 16 * CELL;
// Bend: peak line swing (px) and swell wavelength. Keep
// RIPPLE_PUSH * 2π / RIPPLE_WAVELENGTH under ~1 or neighboring lines cross.
const RIPPLE_PUSH = 14;
const RIPPLE_WAVELENGTH = 7 * CELL;
const ECHO_DELAY_MS = 180;
const ECHO_STRENGTH = 0.45;
// Hold: the grid is pulled toward the pointer like a gravity well, charging
// over HOLD_CHARGE_MS. Release snaps it back and fires a ripple up to
// 1 + HOLD_BOOST times stronger. HOLD_PULL < 1 or the center folds over.
const HOLD_CHARGE_MS = 1000;
const HOLD_RELEASE_MS = 220;
const HOLD_RADIUS = 5 * CELL;
const HOLD_PULL = 0.45;
const HOLD_BOOST = 0.8;
// Line sample spacing while a wave bends the grid.
const BEND_STEP = 6;
// No grid under [data-grid-hole] elements: every cell touching the element's
// box (grown by HOLE_PAD) switches off at once. Cells a moving element leaves
// stay off for TRAIL_MS ± TRAIL_JITTER (random per cell), then blink a few
// hard on/off steps before staying on. No fades: it should read as a retro
// display redrawing itself.
const HOLE_PAD = 8;
// Wait 0–260ms, then BLINK_STEPS × BLINK_STEP_MS (240ms) of blinking: every
// cell is back within 500ms of being uncovered.
const TRAIL_MS = 130;
const TRAIL_JITTER = 1;
const BLINK_STEP_MS = 60;
const BLINK_STEPS = 4;

type Wave = { x: number; y: number; start: number; strength: number };
type WaveFrame = { x: number; y: number; radius: number; push: number; glow: number };

const canvas = ref<HTMLCanvasElement | null>(null);
const canvasReady = ref(false);

// key "col,row" -> time the lit cell switches off
const cells = new Map<string, number>();
const waves: Wave[] = [];
// Waves resolved for the frame being drawn.
let frameWaves: WaveFrame[] = [];
let ctx: CanvasRenderingContext2D | null = null;
let host: HTMLElement | null = null;
let resizeObserver: ResizeObserver | null = null;
let themeObserver: MutationObserver | null = null;
let rafId: number | null = null;
let lastTime = 0;
let lastCell: { col: number; row: number } | null = null;
// Pointer position while held (canvas px); holdStart is null when not held.
let holdStart: number | null = null;
let holdX = 0;
let holdY = 0;
// Current well strength, 0..1. Rises while held, drops fast after release.
let holdCharge = 0;
// HeroDraggable fires `hero-grid-wake` while a block moves; keep redrawing
// until shortly after the last one so the holes follow it.
let holesMovingUntil = 0;
// Cells switched off this frame: under a hole, or in its trail.
let offCells = new Set<number>();
// Cells hidden by a hole on the previous update, to spot the ones it left.
let lastHidden = new Set<number>();
// Of those, the ones under a block springing home: they come back with no
// trail, so the trail ends within 500ms of letting go.
let lastSpringHidden = new Set<number>();
// Cells a hole left: key -> time they start blinking back on.
const cellReturnAt = new Map<number, number>();
// Trail cells on during a blink step; drawn in the accent until they settle.
let blinkingCells = new Set<number>();
// True while trail cells are waiting or blinking, so the loop keeps running.
let visibilityChanging = false;

function cellKey(col: number, row: number) {
  return row * 100000 + col;
}

function isOn(col: number, row: number) {
  return !offCells.has(cellKey(col, row));
}

// Switch off the cells under each hole and, after a random trail delay, blink
// the ones it left back on. `instant` skips the trail (first draw, resize,
// theme). Returns true while trail cells are still waiting or blinking.
function updateVisibility(instant = false) {
  const hidden = new Set<number>();
  const springHidden = new Set<number>();
  if (host && canvas.value) {
    const origin = canvas.value.getBoundingClientRect();
    for (const hole of host.querySelectorAll<HTMLElement>("[data-grid-hole]")) {
      const rect = hole.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;
      const springing = hole.closest("[data-springing]") != null;
      const firstCol = Math.floor((rect.left - origin.left - HOLE_PAD) / CELL);
      const lastCol = Math.floor((rect.right - origin.left + HOLE_PAD) / CELL);
      const firstRow = Math.floor((rect.top - origin.top - HOLE_PAD) / CELL);
      const lastRow = Math.floor((rect.bottom - origin.top + HOLE_PAD) / CELL);
      for (let row = firstRow; row <= lastRow; row++) {
        for (let col = firstCol; col <= lastCol; col++) {
          hidden.add(cellKey(col, row));
          if (springing) springHidden.add(cellKey(col, row));
        }
      }
    }
  }

  const now = performance.now();
  if (instant) {
    cellReturnAt.clear();
  } else {
    for (const key of lastHidden) {
      if (hidden.has(key) || lastSpringHidden.has(key)) continue;
      const jitter = 1 + TRAIL_JITTER * (Math.random() * 2 - 1);
      cellReturnAt.set(key, now + TRAIL_MS * jitter);
    }
  }
  lastHidden = hidden;
  lastSpringHidden = springHidden;

  offCells = new Set(hidden);
  blinkingCells = new Set();
  for (const [key, returnAt] of cellReturnAt) {
    if (hidden.has(key)) {
      cellReturnAt.delete(key);
      continue;
    }
    const step = Math.floor((now - returnAt) / BLINK_STEP_MS);
    if (step >= BLINK_STEPS) {
      cellReturnAt.delete(key);
      continue;
    }
    // Off until its time, then on / random / random / … before staying on.
    if (step >= 0 && blinkOn(key, step)) blinkingCells.add(key);
    else offCells.add(key);
  }
  return cellReturnAt.size > 0;
}

// Cheap stable coin flip per cell and blink step; step 0 is always on so a
// cell pops in before it flickers.
function blinkOn(key: number, step: number) {
  if (step === 0) return true;
  const hash = Math.imul(key ^ Math.imul(step, 0x9e3779b1), 0x85ebca6b) >>> 0;
  return hash % 2 === 0;
}
let width = 0;
let height = 0;
let accent = "rgb(14 165 233)";
let lineColor = "rgba(128, 128, 128, 0.16)";
let reducedMotion = false;

function readTheme() {
  const root = document.documentElement;
  // The theme switcher rewrites --app-primary-* at runtime.
  const value = getComputedStyle(root).getPropertyValue("--app-primary-500").trim();
  if (value) accent = value;
  // Same colors as the CSS lines: #80808029 light, #ffffff1f dark.
  lineColor = root.classList.contains("dark")
    ? "rgba(255, 255, 255, 0.12)"
    : "rgba(128, 128, 128, 0.16)";
}

function resize() {
  if (!canvas.value || !ctx) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const rect = canvas.value.getBoundingClientRect();
  // Hidden or detached (page change, hot reload): nothing to draw.
  if (rect.width === 0 || rect.height === 0) return;
  width = rect.width;
  height = rect.height;
  canvas.value.width = Math.round(width * dpr);
  canvas.value.height = Math.round(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  updateVisibility(true);
  draw(performance.now());
  canvasReady.value = true;
}

function resolveWaves(now: number) {
  frameWaves = [];
  for (const wave of waves) {
    const t = (now - wave.start) / RIPPLE_MS;
    if (t < 0 || t >= 1) continue;
    const fade = 1 - t;
    frameWaves.push({
      x: wave.x,
      y: wave.y,
      // ease-out: the front starts fast and slows down, like water
      radius: RIPPLE_RADIUS * (1 - fade * fade),
      // 1 - t²: the bend holds its strength most of the way out, then fades.
      push: RIPPLE_PUSH * wave.strength * (1 - t * t),
      glow: wave.strength * fade,
    });
  }
}

// Where a grid point ends up while waves pass through it: moved along the
// line from each wave's center, out on a crest and back in on a trough.
// The swells die out fast ahead of the front and slowly behind it.
// While held, points are also pulled toward the pointer.
function bend(x: number, y: number): [number, number] {
  let bx = x;
  let by = y;

  if (holdCharge > 0) {
    const vx = x - holdX;
    const vy = y - holdY;
    const u2 = (vx * vx + vy * vy) / (HOLD_RADIUS * HOLD_RADIUS);
    if (u2 < 9) {
      // Pull is a fraction of the distance, so no point passes the center.
      const k = HOLD_PULL * holdCharge * Math.exp(-u2);
      bx -= vx * k;
      by -= vy * k;
    }
  }

  for (const wave of frameWaves) {
    const vx = x - wave.x;
    const vy = y - wave.y;
    const distance = Math.hypot(vx, vy);
    if (distance < 0.001) continue;
    const ahead = distance - wave.radius;
    const reach = ahead > 0 ? 0.35 * RIPPLE_WAVELENGTH : 1.2 * RIPPLE_WAVELENGTH;
    if (Math.abs(ahead) > reach * 3) continue;
    const envelope = Math.exp(-((ahead / reach) ** 2));
    const swing = wave.push * envelope * Math.cos((2 * Math.PI * ahead) / RIPPLE_WAVELENGTH);
    const k = swing / distance;
    bx += vx * k;
    by += vy * k;
  }
  return [bx, by];
}

function drawGrid() {
  if (!ctx) return;
  const cols = Math.ceil(width / CELL);
  const rows = Math.ceil(height / CELL);
  // Straight segments when nothing bends them; sampled polylines otherwise.
  const bending = frameWaves.length > 0 || holdCharge > 0;
  const samples = bending ? CELL / BEND_STEP : 1;

  // Drawn per cell edge so an edge can switch off with the cells on both
  // sides. An edge stays while either neighbor is on, which keeps the hole's
  // border line.
  ctx.globalAlpha = 1;
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = 1;
  ctx.beginPath();

  const addEdge = (x0: number, y0: number, x1: number, y1: number) => {
    for (let i = 0; i <= samples; i++) {
      const [bx, by] = bend(x0 + ((x1 - x0) * i) / samples, y0 + ((y1 - y0) * i) / samples);
      if (i === 0) ctx!.moveTo(bx + 0.5, by + 0.5);
      else ctx!.lineTo(bx + 0.5, by + 0.5);
    }
  };

  for (let row = 0; row <= rows; row++) {
    for (let col = 0; col <= cols; col++) {
      const x = col * CELL;
      const y = row * CELL;
      // Left edge, between (col - 1, row) and (col, row).
      if (isOn(col - 1, row) || isOn(col, row)) addEdge(x, y, x, y + CELL);
      // Top edge, between (col, row - 1) and (col, row).
      if (isOn(col, row - 1) || isOn(col, row)) addEdge(x, y, x + CELL, y);
    }
  }
  ctx.stroke();
}

function drawCell(col: number, row: number, alpha: number) {
  if (!ctx) return;
  // Lit cells switch off with the grid under a hole.
  if (!isOn(col, row)) return;
  const x = col * CELL;
  const y = row * CELL;
  const corners = [
    bend(x, y),
    bend(x + CELL, y),
    bend(x + CELL, y + CELL),
    bend(x, y + CELL),
  ];

  ctx.beginPath();
  for (const [cx, cy] of corners) ctx.lineTo(cx + 0.5, cy + 0.5);
  ctx.closePath();

  ctx.globalAlpha = Math.min(alpha, 1) * 0.12;
  ctx.fill();
  // The cell's four grid lines in the accent.
  ctx.globalAlpha = Math.min(alpha, 1) * 0.55;
  ctx.stroke();
}

function draw(now: number) {
  if (!canvas.value || !ctx) return;
  resolveWaves(now);
  ctx.clearRect(0, 0, width, height);
  drawGrid();

  ctx.fillStyle = accent;
  ctx.strokeStyle = accent;

  for (const key of cells.keys()) {
    const [col, row] = key.split(",").map(Number);
    drawCell(col, row, 1);
  }

  // Block trail cells blink back in the accent, then settle to plain grid.
  for (const key of blinkingCells) {
    const row = Math.round(key / 100000);
    drawCell(key - row * 100000, row, 1);
  }

  // Light the cells on each wave front; where fronts overlap, keep the brightest.
  const front = new Map<string, number>();
  for (const wave of frameWaves) {
    const reach = Math.ceil((wave.radius + RIPPLE_WIDTH * 2) / CELL);
    const centerCol = Math.floor(wave.x / CELL);
    const centerRow = Math.floor(wave.y / CELL);

    // Only the cells on screen; the ring outgrows the hero.
    const firstRow = Math.max(centerRow - reach, 0);
    const lastRow = Math.min(centerRow + reach, Math.ceil(height / CELL));
    const firstCol = Math.max(centerCol - reach, 0);
    const lastCol = Math.min(centerCol + reach, Math.ceil(width / CELL));

    for (let row = firstRow; row <= lastRow; row++) {
      for (let col = firstCol; col <= lastCol; col++) {
        const distance = Math.hypot((col + 0.5) * CELL - wave.x, (row + 0.5) * CELL - wave.y);
        // Sharp leading edge, long tapered wake behind it.
        const ahead = distance - wave.radius;
        const shape =
          ahead >= 0
            ? Math.exp(-((ahead / RIPPLE_WIDTH) ** 2))
            : Math.max(Math.exp(-((ahead / RIPPLE_WIDTH) ** 2)), Math.exp((3 * ahead) / RIPPLE_WAKE));
        const glow = wave.glow * shape;
        if (glow < 0.03) continue;
        const key = `${col},${row}`;
        front.set(key, Math.max(front.get(key) ?? 0, glow));
      }
    }
  }

  // Faint glow over the well while charging.
  if (holdCharge > 0) {
    const reach = Math.ceil((HOLD_RADIUS * 2) / CELL);
    const centerCol = Math.floor(holdX / CELL);
    const centerRow = Math.floor(holdY / CELL);
    for (let row = centerRow - reach; row <= centerRow + reach; row++) {
      for (let col = centerCol - reach; col <= centerCol + reach; col++) {
        const dx = (col + 0.5) * CELL - holdX;
        const dy = (row + 0.5) * CELL - holdY;
        const glow = 0.5 * holdCharge * Math.exp(-(dx * dx + dy * dy) / (HOLD_RADIUS * HOLD_RADIUS));
        if (glow < 0.03) continue;
        const key = `${col},${row}`;
        front.set(key, Math.max(front.get(key) ?? 0, glow));
      }
    }
  }

  for (const [key, glow] of front) {
    const [col, row] = key.split(",").map(Number);
    drawCell(col, row, glow * 1.4);
  }

  ctx.globalAlpha = 1;
}

function tick(time: number) {
  const dt = lastTime ? time - lastTime : 16;
  lastTime = time;

  // Every lit cell goes out, including the one under a resting pointer, so
  // the grid goes back to plain lines when the pointer is idle.
  for (const [key, offAt] of cells) {
    if (time >= offAt) cells.delete(key);
  }

  for (let i = waves.length - 1; i >= 0; i--) {
    if (time - waves[i].start >= RIPPLE_MS) waves.splice(i, 1);
  }

  if (holdStart != null) {
    const t = Math.min((time - holdStart) / HOLD_CHARGE_MS, 1);
    // ease-out: pulls in fast, then settles at full charge
    holdCharge = 1 - (1 - t) * (1 - t);
  } else if (holdCharge > 0) {
    holdCharge = Math.max(holdCharge - dt / HOLD_RELEASE_MS, 0);
  }

  visibilityChanging = updateVisibility();
  draw(time);

  const idle =
    cells.size === 0 &&
    waves.length === 0 &&
    holdStart == null &&
    holdCharge === 0 &&
    time >= holesMovingUntil &&
    !visibilityChanging;
  if (idle) {
    rafId = null;
    lastTime = 0;
    return;
  }
  rafId = requestAnimationFrame(tick);
}

function ensureTicking() {
  if (rafId != null) return;
  rafId = requestAnimationFrame(tick);
}

function light(col: number, row: number) {
  const litFor = LIT_MIN_MS + Math.random() * (LIT_MAX_MS - LIT_MIN_MS);
  cells.set(`${col},${row}`, performance.now() + litFor);
}

function onPointerMove(event: PointerEvent) {
  if (!canvas.value) return;
  const rect = canvas.value.getBoundingClientRect();
  if (holdStart != null) {
    holdX = event.clientX - rect.left;
    holdY = event.clientY - rect.top;
  }
  // Over (or dragging) a block: its cells are hidden, and lighting them would
  // flash blue once the block moves away.
  if ((event.target as Element | null)?.closest("[data-hero-drag]")) {
    lastCell = null;
    return;
  }
  const col = Math.floor((event.clientX - rect.left) / CELL);
  const row = Math.floor((event.clientY - rect.top) / CELL);

  // Reduced motion: only the current cell, no trail behind it.
  if (reducedMotion) cells.clear();

  // Fill the cells between the last and current position so a fast
  // swipe leaves a continuous trail instead of scattered squares.
  if (lastCell && !reducedMotion) {
    const steps = Math.max(Math.abs(col - lastCell.col), Math.abs(row - lastCell.row));
    for (let i = 1; i < steps; i++) {
      light(
        Math.round(lastCell.col + ((col - lastCell.col) * i) / steps),
        Math.round(lastCell.row + ((row - lastCell.row) * i) / steps),
      );
    }
  }

  light(col, row);
  lastCell = { col, row };
  ensureTicking();
}

function onPointerDown(event: PointerEvent) {
  if (!canvas.value || reducedMotion || event.button !== 0) return;
  // Pressing a draggable block grabs it; it doesn't charge the grid.
  if ((event.target as Element | null)?.closest("[data-hero-drag]")) return;
  const rect = canvas.value.getBoundingClientRect();
  holdStart = performance.now();
  holdX = event.clientX - rect.left;
  holdY = event.clientY - rect.top;
  ensureTicking();
}

function onPointerUp() {
  if (holdStart == null) return;
  holdStart = null;

  // Fire from the held cell's center so the ring is symmetric on the grid.
  const x = (Math.floor(holdX / CELL) + 0.5) * CELL;
  const y = (Math.floor(holdY / CELL) + 0.5) * CELL;
  const strength = 1 + HOLD_BOOST * holdCharge;
  const now = performance.now();

  waves.push({ x, y, start: now, strength });
  waves.push({ x, y, start: now + ECHO_DELAY_MS, strength: strength * ECHO_STRENGTH });
  ensureTicking();
}

// Touch scroll or a system gesture took the pointer: let go without a ripple.
function onPointerCancel() {
  if (holdStart == null) return;
  holdStart = null;
  ensureTicking();
}

function onWake() {
  holesMovingUntil = performance.now() + 50;
  ensureTicking();
}

function onPointerLeave() {
  lastCell = null;
}

onMounted(() => {
  if (!canvas.value) return;
  ctx = canvas.value.getContext("2d");
  host = canvas.value.parentElement?.parentElement ?? null;
  if (!ctx || !host) return;

  reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  readTheme();

  resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas.value);

  // Dark mode toggles the html class; the theme switcher rewrites its style.
  themeObserver = new MutationObserver(() => {
    readTheme();
    if (rafId != null) return;
    updateVisibility(true);
    draw(performance.now());
  });
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class", "style"],
  });

  host.addEventListener("pointermove", onPointerMove);
  host.addEventListener("pointerdown", onPointerDown);
  host.addEventListener("hero-grid-wake", onWake);
  // On window so releasing outside the hero still fires the ripple.
  window.addEventListener("pointerup", onPointerUp);
  window.addEventListener("pointercancel", onPointerCancel);
  host.addEventListener("pointerleave", onPointerLeave);
});

onUnmounted(() => {
  if (rafId != null) cancelAnimationFrame(rafId);
  resizeObserver?.disconnect();
  themeObserver?.disconnect();
  host?.removeEventListener("pointermove", onPointerMove);
  host?.removeEventListener("pointerdown", onPointerDown);
  host?.removeEventListener("hero-grid-wake", onWake);
  window.removeEventListener("pointerup", onPointerUp);
  window.removeEventListener("pointercancel", onPointerCancel);
  host?.removeEventListener("pointerleave", onPointerLeave);
});
</script>
