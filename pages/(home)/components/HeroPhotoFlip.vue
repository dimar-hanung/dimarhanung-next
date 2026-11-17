<template>
  <button
    ref="buttonEl"
    type="button"
    :aria-label="t.hero.photoToggle"
    :aria-pressed="revealed"
    data-part="photo"
    :data-variant="variant"
    :class="[
      'photo-flip relative block shrink-0 cursor-pointer select-none',
      variant === 'portrait' ? 'is-portrait aspect-[4/5] w-full' : 'is-avatar h-16 w-16',
    ]"
    @click="toggle"
    @pointerenter="onPointerEnter"
    @focus="onFocus"
  >
    <span
      ref="cardEl"
      data-part="photo-card"
      class="photo-flip-card"
      :style="{ transform: revealed ? 'rotateY(180deg)' : 'rotateY(0deg)' }"
    >
      <span data-part="photo-face" data-face="front" class="photo-flip-face">
        <img
          data-part="photo-image"
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
        <!-- Idle glitch: every few seconds, a short signal from another world line -->
        <span v-if="idle" :key="idle.key" class="photo-flip-idle" aria-hidden="true">
          <img
            :src="KYOUMA_IMAGE"
            alt=""
            draggable="false"
            :class="['idle-ghost', imagePosition]"
            :style="{ filter: `url(#${filterId}-red)`, '--idle-dx': `${idle.split}px` }"
          />
          <img
            :src="KYOUMA_IMAGE"
            alt=""
            draggable="false"
            :class="['idle-ghost', imagePosition]"
            :style="{ filter: `url(#${filterId}-cyan)`, '--idle-dx': `${-idle.split}px` }"
          />
          <img
            v-for="band in idle.slices"
            :key="band.id"
            :src="KYOUMA_IMAGE"
            alt=""
            draggable="false"
            :class="['idle-slice', imagePosition]"
            :style="bandStyle(band)"
          />
          <img
            v-for="band in idle.peeks"
            :key="band.id"
            :src="photoSrc"
            alt=""
            draggable="false"
            :class="['idle-peek', imagePosition]"
            :style="bandStyle(band)"
          />
          <span class="idle-scan" />
          <span class="idle-tear" :style="{ top: `${idle.tearY}%` }" />
        </span>
      </span>
      <span data-part="photo-face" data-face="back" :class="['photo-flip-face is-back', revealed && 'is-shown']">
        <img
          data-part="photo-image"
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

    <!-- Channel filters for the idle glitch's RGB split -->
    <svg class="photo-flip-filters" width="0" height="0" aria-hidden="true" focusable="false">
      <filter :id="`${filterId}-red`" color-interpolation-filters="sRGB">
        <feColorMatrix type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" />
      </filter>
      <filter :id="`${filterId}-cyan`" color-interpolation-filters="sRGB">
        <feColorMatrix type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" />
      </filter>
    </svg>

    <!-- Divergence meter: a short nod to the source, portrait only -->
    <span
      v-if="meterText"
      data-part="photo-meter"
      :class="['photo-flip-meter', meterFading && 'is-fading']"
      aria-hidden="true"
    >
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

// The idle glitch is not capped: it repeats every few seconds while Kyouma
// shows, the photo is on screen and the tab is visible.
const IDLE_MIN_MS = 3000;
const IDLE_MAX_MS = 6000;
const IDLE_MS = 320;
const IDLE_EFFECT_CLEAR_MS = 520;

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

const imagePosition = computed(() =>
  props.variant === "portrait" ? "object-[50%_35%]" : "object-[50%_30%]",
);

const buttonEl = ref<HTMLButtonElement | null>(null);
const cardEl = ref<HTMLElement | null>(null);

const filterId = `photo-flip-${useId()}`;

// How much effect the theme allows (--photo-fx in the theme contract):
// full = teaser, idle glitch and arcs; calm = no idle glitch; off = a plain
// flip with no effects. Read when an effect is about to play, so a theme
// switch takes effect at once.
function fxLevel(): "full" | "calm" | "off" {
  if (!buttonEl.value) return "full";
  const value = getComputedStyle(buttonEl.value).getPropertyValue("--photo-fx").trim();
  return value === "calm" || value === "off" ? value : "full";
}

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
  if (idleTimer) clearTimeout(idleTimer);
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
  if (!card || reducedMotion.value || fxLevel() === "off") return;
  if (everRevealed || revealed.value || teases >= MAX_TEASES) return;
  if (teaseAnim?.playState === "running" || flipAnim?.playState === "running") return;
  // The phone avatar and the desktop portrait are both mounted; only tease
  // the one that is on screen.
  if (!buttonEl.value || buttonEl.value.offsetParent === null) return;

  teases++;
  idle.value = null;
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

// ---------- Idle glitch: a short signal, no hover needed ----------

interface Band {
  id: number;
  top: number;
  height: number;
  dx: number;
  delay: number;
}
interface IdleGlitch {
  key: number;
  split: number;
  slices: Band[];
  peeks: Band[];
  tearY: number;
}

const idle = shallowRef<IdleGlitch | null>(null);
let idleKey = 0;
let idleTimer: ReturnType<typeof setTimeout> | null = null;

const onScreen = ref(false);
const documentVisibility = useDocumentVisibility();
// The avatar is display:none on desktop and the portrait on phones, so the
// observer also tells which of the two is the one in use.
useIntersectionObserver(buttonEl, ([entry]) => {
  onScreen.value = entry?.isIntersecting ?? false;
});

const idleOn = computed(
  () => onScreen.value && documentVisibility.value === "visible" && !revealed.value && !reducedMotion.value,
);

watch(idleOn, (on) => {
  if (idleTimer) clearTimeout(idleTimer);
  idleTimer = null;
  if (!on) {
    idle.value = null;
    return;
  }
  scheduleIdle();
});

function scheduleIdle() {
  idleTimer = setTimeout(idleGlitch, random(IDLE_MIN_MS, IDLE_MAX_MS));
}

function idleGlitch() {
  idleTimer = null;
  if (!idleOn.value) return;
  scheduleIdle();
  // A hover teaser or a flip is already showing something; wait for the next one.
  if (teaseAnim?.playState === "running" || flipAnim?.playState === "running") return;
  if (fxLevel() !== "full") return;

  const small = props.variant === "avatar";
  const sign = () => (Math.random() < 0.5 ? -1 : 1);
  const band = (id: number, minHeight: number, maxHeight: number, reach: number, delay: number): Band => {
    const height = random(minHeight, maxHeight);
    return { id, top: random(4, 96 - height), height, dx: sign() * random(reach * 0.4, reach), delay };
  };

  const slices: Band[] = [];
  const sliceCount = small ? 2 : 3;
  for (let i = 0; i < sliceCount; i++) {
    slices.push(small ? band(i, 10, 20, 5, random(0, 70)) : band(i, 3, 11, 22, random(0, 90)));
  }
  const peeks: Band[] = [];
  const peekCount = small ? 1 : 2;
  for (let i = 0; i < peekCount; i++) {
    peeks.push(small ? band(10 + i, 14, 26, 3, random(70, 120)) : band(10 + i, 5, 12, 12, random(70, 140)));
  }

  idle.value = {
    key: ++idleKey,
    split: small ? random(1.5, 2.5) : random(4, 7),
    slices,
    peeks,
    tearY: random(15, 85),
  };
  playEffect("idle");

  const key = idleKey;
  later(() => {
    if (idle.value?.key === key) idle.value = null;
  }, IDLE_MS);
}

function bandStyle(band: Band) {
  return {
    clipPath: `inset(${band.top}% 0 ${100 - band.top - band.height}% 0)`,
    animationDelay: `${band.delay}ms`,
    "--idle-dx": `${band.dx}px`,
  };
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
  idle.value = null;

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
  if (fxLevel() === "off") return;
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

function playEffect(kind: "idle" | "tease" | "reveal" | "back") {
  const small = props.variant === "avatar";
  const bolts: Bolt[] = [];
  let id = 0;

  if (kind === "idle") {
    // One short arc on the edge and a faint flicker.
    bolts.push({ id: id++, d: edgeBolt(random(0.05, 0.1)), delay: random(20, 110) });
    effect.value = {
      key: ++effectKey,
      bolts,
      sparks: makeSparks(small ? 1 : 2, 60, small ? 5 : 7, 100),
      flashDelay: 30,
      flashPeak: 0.12,
    };
  } else if (kind === "tease") {
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
  }, kind === "idle" ? IDLE_EFFECT_CLEAR_MS : EFFECT_CLEAR_MS);
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
/* In the `home` layer so a theme file can override any of it. Colors and
   the frame come from the theme contract (--photo-*, --fx-*). */
@layer home {
  .photo-flip {
    perspective: 1100px;
    -webkit-tap-highlight-color: transparent;
  }
  .photo-flip.is-portrait {
    border-radius: var(--photo-radius);
  }
  .photo-flip.is-avatar {
    perspective: 320px;
    border-radius: 999px;
  }
  .photo-flip:focus-visible {
    outline: 2px solid var(--focus);
    outline-offset: 2px;
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
  .is-portrait .photo-flip-face {
    border: var(--photo-border);
    background: var(--photo-bg);
    box-shadow: var(--photo-shadow);
  }
  .is-avatar .photo-flip-card {
    box-shadow: var(--avatar-shadow);
  }
  .is-avatar .photo-flip-face {
    border: var(--avatar-border);
    background: var(--photo-bg);
  }
  .photo-flip-face img {
    filter: var(--photo-filter);
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
    .photo-flip-idle {
      display: none;
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

  .photo-flip-filters {
    position: absolute;
    width: 0;
    height: 0;
    overflow: hidden;
    pointer-events: none;
  }

  /* Idle glitch: hard steps, transform and opacity only. The clip-path and
     filter on each layer are set once when it mounts, not animated. */
  .photo-flip-idle {
    position: absolute;
    inset: 0;
    overflow: hidden;
    border-radius: inherit;
    pointer-events: none;
  }
  .photo-flip-idle img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
  }
  .photo-flip-idle .idle-ghost {
    mix-blend-mode: screen;
    animation: photo-flip-idle-ghost 230ms steps(1, end) both;
  }
  @keyframes photo-flip-idle-ghost {
    0% {
      opacity: 0.75;
      transform: translateX(var(--idle-dx));
    }
    22% {
      opacity: 0.75;
      transform: translateX(calc(var(--idle-dx) * -0.5));
    }
    40% {
      opacity: 0;
    }
    58% {
      opacity: 0.6;
      transform: translateX(calc(var(--idle-dx) * 1.4));
    }
    76%,
    100% {
      opacity: 0;
      transform: translateX(0);
    }
  }
  .photo-flip-idle .idle-slice {
    animation: photo-flip-idle-slice 170ms steps(1, end) both;
  }
  @keyframes photo-flip-idle-slice {
    0% {
      opacity: 1;
      transform: translateX(var(--idle-dx));
    }
    30% {
      opacity: 1;
      transform: translateX(calc(var(--idle-dx) * -0.5));
    }
    55% {
      opacity: 0;
    }
    70% {
      opacity: 1;
      transform: translateX(calc(var(--idle-dx) * 0.3));
    }
    85%,
    100% {
      opacity: 0;
      transform: translateX(0);
    }
  }
  .photo-flip-idle .idle-peek {
    animation: photo-flip-idle-peek 120ms steps(1, end) both;
  }
  @keyframes photo-flip-idle-peek {
    0% {
      opacity: 1;
      transform: translateX(var(--idle-dx));
    }
    45% {
      opacity: 1;
      transform: translateX(calc(var(--idle-dx) * -0.4));
    }
    75%,
    100% {
      opacity: 0;
      transform: translateX(0);
    }
  }
  .idle-scan {
    position: absolute;
    inset: -3px 0;
    background: repeating-linear-gradient(
      to bottom,
      color-mix(in srgb, var(--fx-scan) 32%, transparent) 0 1px,
      transparent 1px 3px
    );
    opacity: 0;
    animation: photo-flip-idle-scan 250ms steps(1, end) both;
  }
  .is-avatar .idle-scan {
    background: repeating-linear-gradient(
      to bottom,
      color-mix(in srgb, var(--fx-scan) 18%, transparent) 0 1px,
      transparent 1px 3px
    );
  }
  @keyframes photo-flip-idle-scan {
    0% {
      opacity: 0.9;
      transform: translateY(0);
    }
    20% {
      opacity: 0.4;
      transform: translateY(1px);
    }
    40% {
      opacity: 0.85;
      transform: translateY(-1px);
    }
    65%,
    100% {
      opacity: 0;
      transform: translateY(0);
    }
  }
  .idle-tear {
    position: absolute;
    left: 0;
    right: 0;
    height: 2px;
    background: color-mix(in srgb, var(--fx-tear) 85%, transparent);
    box-shadow: 0 0 6px color-mix(in srgb, var(--fx-spark) 80%, transparent);
    opacity: 0;
    animation: photo-flip-idle-tear 200ms steps(1, end) 40ms both;
  }
  .is-avatar .idle-tear {
    height: 1px;
    box-shadow: 0 0 3px color-mix(in srgb, var(--fx-spark) 80%, transparent);
  }
  @keyframes photo-flip-idle-tear {
    0% {
      opacity: 1;
      transform: translate(-6%, 0);
    }
    30% {
      opacity: 0;
    }
    50% {
      opacity: 0.8;
      transform: translate(4%, 3px);
    }
    70%,
    100% {
      opacity: 0;
      transform: translate(0, 0);
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
    filter: drop-shadow(0 0 3px color-mix(in srgb, var(--fx-arc) 90%, transparent));
  }
  .bolt {
    opacity: 0;
    animation: photo-flip-bolt 300ms linear both;
  }
  .bolt-glow {
    fill: none;
    stroke: color-mix(in srgb, var(--fx-arc) 85%, transparent);
    stroke-width: 4px;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .bolt-core {
    fill: none;
    stroke: var(--fx-arc-core);
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
    stroke: var(--fx-spark);
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
      color-mix(in srgb, var(--fx-arc-core) 95%, transparent),
      color-mix(in srgb, var(--fx-flash) 50%, transparent) 30%,
      transparent 62%
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
    background: var(--fx-meter-bg);
    color: var(--fx-meter-ink);
    font-family: var(--font-mono);
    font-size: 1.0625rem;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.12em;
    text-shadow:
      0 0 6px color-mix(in srgb, var(--fx-meter-glow) 85%, transparent),
      0 0 14px color-mix(in srgb, var(--fx-meter-glow) 45%, transparent);
    pointer-events: none;
    transition: opacity 300ms ease-out;
  }
  .photo-flip-meter.is-fading {
    opacity: 0;
  }
}
</style>
