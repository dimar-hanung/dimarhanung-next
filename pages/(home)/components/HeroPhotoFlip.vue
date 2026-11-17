<template>
  <button
    ref="buttonEl"
    type="button"
    :aria-label="t.hero.photoToggle"
    :aria-pressed="revealed"
    :class="[
      'photo-flip relative block shrink-0 cursor-pointer select-none',
      'focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-muted-100 focus-visible:outline-none dark:focus-visible:ring-offset-muted-900',
      variant === 'portrait' ? 'is-portrait aspect-[4/5] w-full rounded-[20px]' : 'is-avatar h-16 w-16 rounded-full',
    ]"
    @click="toggle"
    @pointerenter="onPointerEnter"
    @focus="onFocus"
  >
    <span
      ref="cardEl"
      :class="[
        'photo-flip-card',
        variant === 'avatar' && 'shadow-[0_12px_28px_-12px_rgb(15_23_42/0.55)]',
      ]"
      :style="{ transform: revealed ? 'rotateY(180deg)' : 'rotateY(0deg)' }"
    >
      <span :class="['photo-flip-face', faceClass]">
        <img
          :src="KYOUMA_IMAGE"
          alt=""
          draggable="false"
          :class="['h-full w-full object-cover', imagePosition]"
        />
        <!-- Teaser: two slices of the real photo leak through for a moment -->
        <span v-if="glitchKey" :key="glitchKey" class="photo-flip-glitch" aria-hidden="true">
          <img :src="photoSrc" alt="" draggable="false" :class="['slice-a', imagePosition]" />
          <img :src="photoSrc" alt="" draggable="false" :class="['slice-b', imagePosition]" />
        </span>
      </span>
      <span :class="['photo-flip-face is-back', faceClass, revealed && 'is-shown']">
        <img
          :src="photoSrc"
          alt=""
          draggable="false"
          :class="['h-full w-full object-cover', imagePosition]"
        />
      </span>
    </span>

    <!-- Electric arcs and sparks, redrawn for every teaser or flip -->
    <svg
      v-if="effect"
      :key="effect.key"
      class="photo-flip-arcs"
      :viewBox="arcViewBox"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <g v-for="bolt in effect.bolts" :key="bolt.id" class="bolt" :style="{ animationDelay: `${bolt.delay}ms` }">
        <path :d="bolt.d" class="bolt-glow" vector-effect="non-scaling-stroke" />
        <path :d="bolt.d" class="bolt-core" vector-effect="non-scaling-stroke" />
      </g>
      <line
        v-for="spark in effect.sparks"
        :key="spark.id"
        class="spark"
        :x1="spark.x"
        :y1="spark.y"
        :x2="spark.x + spark.tx"
        :y2="spark.y + spark.ty"
        vector-effect="non-scaling-stroke"
        :style="{
          animationDelay: `${spark.delay}ms`,
          '--spark-dx': `${spark.dx}px`,
          '--spark-dy': `${spark.dy}px`,
        }"
      />
    </svg>
    <span
      v-if="effect"
      :key="`flash-${effect.key}`"
      class="photo-flip-flash"
      :style="{ animationDelay: `${effect.flashDelay}ms`, '--flash-peak': effect.flashPeak }"
      aria-hidden="true"
    />

    <!-- Divergence meter: a short nod to the source, portrait only -->
    <span v-if="meterText" :class="['photo-flip-meter', meterFading && 'is-fading']" aria-hidden="true">
      {{ meterText }}
    </span>
  </button>
</template>

<script setup lang="ts">
// Swap this one path to change the "before" image.
// Source: https://it.wikipedia.org/wiki/File:Rintaro_Okabe.png (Steins;Gate anime screenshot, cropped to 4:5).
const KYOUMA_IMAGE = "/profile/hououin-kyouma.webp";
const PROFILE_PHOTO = "/profile/profile.jpeg";

// The teaser runs once after load and on hover/focus, at most this many
// times in total, and never again once the real photo has been shown.
const MAX_TEASES = 3;
const AUTO_TEASE_DELAY_MS = 1200;
const TEASE_MS = 950;
const FLIP_MS = 1000;
const EFFECT_CLEAR_MS = 1300;
const DIVERGENCE = "1.048596";

const props = defineProps<{ variant: "portrait" | "avatar" }>();
const revealed = defineModel<boolean>("revealed", { default: false });

const { t } = useHomeI18n();
const motionPreference = usePreferredReducedMotion();
const reducedMotion = computed(() => motionPreference.value === "reduce");

const img = useImage();
const photoSrc = computed(() =>
  props.variant === "portrait"
    ? img(PROFILE_PHOTO, { width: 800, height: 1000, fit: "cover", format: "webp" })
    : img(PROFILE_PHOTO, { width: 128, height: 128, fit: "cover", format: "webp" }),
);

const faceClass = computed(() =>
  props.variant === "portrait"
    ? "bg-muted-200 dark:bg-muted-700"
    : "border-[3px] border-white bg-muted-200 dark:border-muted-700",
);
const imagePosition = computed(() =>
  props.variant === "portrait" ? "object-[50%_35%]" : "object-[50%_30%]",
);

const buttonEl = ref<HTMLButtonElement | null>(null);
const cardEl = ref<HTMLElement | null>(null);

let teases = 0;
let everRevealed = revealed.value;
let teaseAnim: Animation | null = null;
let flipAnim: Animation | null = null;
const timers = new Set<ReturnType<typeof setTimeout>>();

function later(fn: () => void, ms: number) {
  const id = setTimeout(() => {
    timers.delete(id);
    fn();
  }, ms);
  timers.add(id);
}

watch(revealed, (value) => {
  if (value) everRevealed = true;
});

onMounted(() => {
  later(tease, AUTO_TEASE_DELAY_MS);
});

onBeforeUnmount(() => {
  for (const id of timers) clearTimeout(id);
  timers.clear();
  if (meterInterval) clearInterval(meterInterval);
  teaseAnim?.cancel();
  flipAnim?.cancel();
});

function onPointerEnter(event: PointerEvent) {
  // On touch, a tap fires pointerenter right before click; skip the teaser.
  if (event.pointerType !== "mouse") return;
  tease();
}

function onFocus() {
  if (!buttonEl.value?.matches(":focus-visible")) return;
  tease();
}

// ---------- Teaser: a partial flip with a small spark ----------

function tease() {
  const card = cardEl.value;
  if (!card || reducedMotion.value) return;
  if (everRevealed || revealed.value || teases >= MAX_TEASES) return;
  if (teaseAnim?.playState === "running" || flipAnim?.playState === "running") return;
  // The phone avatar and the desktop portrait are both mounted; only tease
  // the one that is on screen.
  if (!buttonEl.value || buttonEl.value.offsetParent === null) return;

  teases++;
  teaseAnim = card.animate(
    [
      { transform: "rotateY(0deg)", easing: "cubic-bezier(0.3, 0, 0.2, 1)" },
      { transform: "rotateY(-10deg)", offset: 0.18, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" },
      { transform: "rotateY(64deg)", offset: 0.5, easing: "cubic-bezier(0.5, 0, 0.3, 1)" },
      { transform: "rotateY(-5deg)", offset: 0.8, easing: "ease-out" },
      { transform: "rotateY(0deg)" },
    ],
    { duration: TEASE_MS },
  );
  glitchKey.value++;
  playEffect("tease");
}

// ---------- Click: full flip with a bigger burst ----------

function toggle() {
  const next = !revealed.value;
  const card = cardEl.value;
  if (reducedMotion.value || !card) {
    revealed.value = next;
    return;
  }

  // Start from wherever a running teaser or flip has the card right now.
  let from = currentAngle(card);
  if (from < -90) from += 360;
  teaseAnim?.cancel();
  flipAnim?.cancel();
  glitchKey.value = 0;

  const to = next ? 180 : 0;
  const direction = to > from ? 1 : -1;
  const middle = from + (to - from) * 0.5;
  revealed.value = next;

  flipAnim = card.animate(
    [
      { transform: `rotateY(${from}deg) scale(1)`, easing: "cubic-bezier(0.45, 0, 0.2, 1)" },
      { transform: `rotateY(${middle}deg) scale(1.05)`, offset: 0.45, easing: "cubic-bezier(0.2, 0.7, 0.2, 1)" },
      { transform: `rotateY(${to + 7 * direction}deg) scale(1)`, offset: 0.8, easing: "ease-in-out" },
      { transform: `rotateY(${to}deg) scale(1)` },
    ],
    { duration: FLIP_MS },
  );
  playEffect(next ? "reveal" : "back");
  if (next && props.variant === "portrait") runMeter();
}

function currentAngle(element: HTMLElement) {
  const transform = getComputedStyle(element).transform;
  if (!transform || transform === "none") return 0;
  const matrix = new DOMMatrixReadOnly(transform);
  return (Math.atan2(-matrix.m13, matrix.m11) * 180) / Math.PI;
}

// ---------- Electric arcs ----------

interface Bolt {
  id: number;
  d: string;
  delay: number;
}
interface Spark {
  id: number;
  x: number;
  y: number;
  tx: number;
  ty: number;
  dx: number;
  dy: number;
  delay: number;
}
interface Effect {
  key: number;
  bolts: Bolt[];
  sparks: Spark[];
  flashDelay: number;
  flashPeak: number;
}

const effect = shallowRef<Effect | null>(null);
const glitchKey = ref(0);
let effectKey = 0;

// Arcs are drawn in a 100-wide box with the frame's aspect ratio, padded so
// they can jump a little past the edge.
const BOX_W = 100;
const boxH = computed(() => (props.variant === "portrait" ? 125 : 100));
const PAD = 0.12;
const arcViewBox = computed(
  () => `${-BOX_W * PAD} ${-boxH.value * PAD} ${BOX_W * (1 + 2 * PAD)} ${boxH.value * (1 + 2 * PAD)}`,
);

function random(min: number, max: number) {
  return min + Math.random() * (max - min);
}

// A point on the frame edge at t (0..1, clockwise from the top-left) plus the
// outward normal there.
function edgePoint(t: number) {
  const h = boxH.value;
  const wrapped = ((t % 1) + 1) % 1;
  if (props.variant === "avatar") {
    const angle = wrapped * Math.PI * 2 - Math.PI / 2;
    const nx = Math.cos(angle);
    const ny = Math.sin(angle);
    return { x: 50 + nx * 50, y: 50 + ny * 50, nx, ny };
  }
  const perimeter = 2 * (BOX_W + h);
  let s = wrapped * perimeter;
  if (s < BOX_W) return { x: s, y: 0, nx: 0, ny: -1 };
  s -= BOX_W;
  if (s < h) return { x: BOX_W, y: s, nx: 1, ny: 0 };
  s -= h;
  if (s < BOX_W) return { x: BOX_W - s, y: h, nx: 0, ny: 1 };
  s -= BOX_W;
  return { x: 0, y: h - s, nx: -1, ny: 0 };
}

// An arc that crawls along the frame edge, jittering in and out.
function edgeBolt(length: number) {
  const start = Math.random();
  const steps = 10;
  const points: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const p = edgePoint(start + (length * i) / steps);
    const jitter = i === 0 || i === steps ? 0 : random(-2.5, 4.5);
    points.push(`${(p.x + p.nx * jitter).toFixed(1)} ${(p.y + p.ny * jitter).toFixed(1)}`);
  }
  return `M${points.join(" L")}`;
}

// An arc across the photo, from one edge to the opposite side.
function crossBolt() {
  const start = Math.random();
  const a = edgePoint(start);
  const b = edgePoint(start + random(0.4, 0.6));
  let points = [
    { x: a.x, y: a.y },
    { x: b.x, y: b.y },
  ];
  let spread = 9;
  for (let round = 0; round < 4; round++) {
    const next = [points[0]!];
    for (let i = 1; i < points.length; i++) {
      const p = points[i - 1]!;
      const q = points[i]!;
      const dx = q.x - p.x;
      const dy = q.y - p.y;
      const length = Math.hypot(dx, dy) || 1;
      const offset = random(-spread, spread);
      next.push({ x: (p.x + q.x) / 2 - (dy / length) * offset, y: (p.y + q.y) / 2 + (dx / length) * offset });
      next.push(q);
    }
    points = next;
    spread /= 2;
  }
  return `M${points.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" L")}`;
}

function makeSparks(count: number, at: number, reach: number, startId: number) {
  const sparks: Spark[] = [];
  for (let i = 0; i < count; i++) {
    const p = edgePoint(Math.random());
    const angle = Math.atan2(p.ny, p.nx) + random(-0.9, 0.9);
    const ux = Math.cos(angle);
    const uy = Math.sin(angle);
    const distance = random(reach * 0.5, reach);
    sparks.push({
      id: startId + i,
      x: p.x,
      y: p.y,
      tx: ux * 2.5,
      ty: uy * 2.5,
      dx: ux * distance,
      dy: uy * distance,
      delay: at + random(0, 120),
    });
  }
  return sparks;
}

function playEffect(kind: "tease" | "reveal" | "back") {
  const small = props.variant === "avatar";
  const bolts: Bolt[] = [];
  let id = 0;

  if (kind === "tease") {
    // Two short arcs as the card turns away, one at the peak.
    for (let i = 0; i < 3; i++) {
      bolts.push({ id: id++, d: edgeBolt(random(0.08, 0.16)), delay: 300 + i * 90 });
    }
    effect.value = {
      key: ++effectKey,
      bolts,
      sparks: makeSparks(small ? 3 : 5, 380, small ? 8 : 10, 100),
      flashDelay: 420,
      flashPeak: 0.25,
    };
  } else {
    const big = kind === "reveal";
    const edgeCount = big ? (small ? 5 : 8) : small ? 3 : 4;
    for (let i = 0; i < edgeCount; i++) {
      bolts.push({ id: id++, d: edgeBolt(random(0.12, 0.26)), delay: random(0, 380) });
    }
    // Arcs across the face land when the card is edge-on.
    const crossCount = big ? 2 : 1;
    for (let i = 0; i < crossCount; i++) {
      bolts.push({ id: id++, d: crossBolt(), delay: 360 + i * 70 });
    }
    effect.value = {
      key: ++effectKey,
      bolts,
      sparks: makeSparks(big ? (small ? 8 : 16) : small ? 4 : 7, 380, big ? 16 : 10, 100),
      flashDelay: 400,
      flashPeak: big ? 0.8 : 0.5,
    };
  }

  const key = effectKey;
  later(() => {
    if (effect.value?.key === key) effect.value = null;
    if (kind === "tease") glitchKey.value = 0;
  }, EFFECT_CLEAR_MS);
}

// ---------- Divergence meter ----------

const meterText = ref("");
const meterFading = ref(false);
let meterInterval: ReturnType<typeof setInterval> | null = null;

function runMeter() {
  if (meterInterval) clearInterval(meterInterval);
  meterFading.value = false;
  let ticks = 0;
  meterInterval = setInterval(() => {
    ticks++;
    if (ticks < 12) {
      const digits = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join("");
      meterText.value = `${Math.floor(Math.random() * 2)}.${digits}`;
      return;
    }
    meterText.value = DIVERGENCE;
    if (meterInterval) clearInterval(meterInterval);
    meterInterval = null;
    later(() => (meterFading.value = true), 650);
    later(() => {
      meterText.value = "";
      meterFading.value = false;
    }, 950);
  }, 45);
}
</script>

<style scoped>
.photo-flip {
  perspective: 1100px;
  -webkit-tap-highlight-color: transparent;
}
.photo-flip.is-avatar {
  perspective: 320px;
}

.photo-flip-card {
  position: absolute;
  inset: 0;
  display: block;
  border-radius: inherit;
  transform-style: preserve-3d;
}

.photo-flip-face {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: inherit;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
.photo-flip-face.is-back {
  transform: rotateY(180deg);
}

/* Reduced motion: no turning, the real photo just fades in over Kyouma.
   A media query rather than a class, so it holds from the first paint
   (the server can't know the preference). */
@media (prefers-reduced-motion: reduce) {
  .photo-flip-card {
    transform: none !important;
  }
  .photo-flip-face.is-back {
    transform: none;
    opacity: 0;
    transition: opacity 350ms ease-out;
  }
  .photo-flip-face.is-back.is-shown {
    opacity: 1;
  }
}

.photo-flip-glitch img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  animation: photo-flip-glitch 950ms steps(1, end) both;
}
.photo-flip-glitch .slice-a {
  clip-path: inset(31% 0 60% 0);
  --glitch-x: -5px;
}
.photo-flip-glitch .slice-b {
  clip-path: inset(63% 0 29% 0);
  --glitch-x: 7px;
  animation-delay: 40ms;
}
@keyframes photo-flip-glitch {
  0%,
  36% {
    opacity: 0;
    transform: translateX(0);
  }
  40% {
    opacity: 1;
    transform: translateX(var(--glitch-x));
  }
  46% {
    opacity: 0;
  }
  52% {
    opacity: 1;
    transform: translateX(calc(var(--glitch-x) * -0.6));
  }
  58%,
  100% {
    opacity: 0;
    transform: translateX(0);
  }
}

.photo-flip-arcs {
  position: absolute;
  left: -12%;
  top: -12%;
  width: 124%;
  height: 124%;
  overflow: visible;
  pointer-events: none;
  filter: drop-shadow(0 0 3px rgb(14 165 233 / 0.9));
}
.bolt {
  opacity: 0;
  animation: photo-flip-bolt 300ms linear both;
}
.bolt-glow {
  fill: none;
  stroke: rgb(14 165 233 / 0.85);
  stroke-width: 4px;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.bolt-core {
  fill: none;
  stroke: #fff;
  stroke-width: 1.4px;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.is-avatar .bolt-glow {
  stroke-width: 3px;
}
.is-avatar .bolt-core {
  stroke-width: 1px;
}
@keyframes photo-flip-bolt {
  0% {
    opacity: 0;
  }
  8% {
    opacity: 1;
  }
  28% {
    opacity: 0.2;
  }
  42% {
    opacity: 1;
  }
  70% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
  }
}

.spark {
  stroke: #38bdf8;
  stroke-width: 1.75px;
  stroke-linecap: round;
  opacity: 0;
  animation: photo-flip-spark 420ms cubic-bezier(0.1, 0.7, 0.3, 1) both;
}
@keyframes photo-flip-spark {
  0% {
    opacity: 1;
    transform: translate(0, 0);
  }
  100% {
    opacity: 0;
    transform: translate(var(--spark-dx), var(--spark-dy));
  }
}

.photo-flip-flash {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  background: radial-gradient(
    circle at 50% 45%,
    rgb(255 255 255 / 0.95),
    rgb(186 230 253 / 0.5) 30%,
    rgb(56 189 248 / 0) 62%
  );
  opacity: 0;
  animation: photo-flip-flash 340ms ease-out both;
}
@keyframes photo-flip-flash {
  0% {
    opacity: 0;
  }
  18% {
    opacity: var(--flash-peak);
  }
  100% {
    opacity: 0;
  }
}

.photo-flip-meter {
  position: absolute;
  left: 0.75rem;
  bottom: 0.75rem;
  padding: 0.3rem 0.55rem;
  border-radius: 6px;
  background: rgb(12 10 9 / 0.78);
  color: #ffb05c;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 1.0625rem;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.12em;
  text-shadow:
    0 0 6px rgb(255 140 40 / 0.85),
    0 0 14px rgb(255 120 30 / 0.45);
  pointer-events: none;
  transition: opacity 300ms ease-out;
}
.photo-flip-meter.is-fading {
  opacity: 0;
}
</style>
