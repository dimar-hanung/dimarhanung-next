<template>
  <section
    ref="wrapper"
    class="text-white mt-8 w-full relative z-[1] perspective-[1200px]"
    aria-label="Tech stack"
  >
    <div class="stack-window relative overflow-hidden py-[48rem]">
    <div
      class="stack-sky pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div
        class="absolute inset-0 bg-gradient-to-b from-black via-[#01040f] to-primary-950"
      />
      <div
        ref="galaxyFar"
        class="stack-layer pointer-events-none absolute left-[-22%] top-[14%] h-[52%] w-[150%]"
      >
        <div class="stack-galaxy stack-galaxy-far" />
      </div>
      <div
        ref="galaxy"
        class="stack-layer pointer-events-none absolute left-[-18%] top-[24%] h-[42%] w-[140%]"
      >
        <div class="stack-galaxy" />
      </div>
      <div
        ref="hazeFar"
        class="stack-layer pointer-events-none absolute left-[6%] top-[18%] h-[46%] w-[62%]"
      >
        <div class="stack-haze stack-haze-far" />
      </div>
      <div
        ref="hazeNear"
        class="stack-layer pointer-events-none absolute right-[4%] bottom-[22%] h-[32%] w-[38%]"
      >
        <div class="stack-haze stack-haze-near" />
      </div>
      <canvas
        class="pointer-events-none absolute inset-0 h-full w-full"
        ref="canvas"
      ></canvas>
      <div class="stack-well pointer-events-none absolute inset-0" />
    </div>
    <div
      class="tech-stack-group text-slate-300 hover:text-white dark:hover:text-gray-50 gap-4 z-10 relative mx-auto max-w-7xl px-5"
      style="--group-depth: 1"
    >
      <div class="stack-icons flex flex-wrap justify-center gap-4">
        <Tooltip>
          <div v-motion-pop-visible>
            <Icon
              name="logos:vue"
              class="tech-stack-item"
              size="50"
            ></Icon>
          </div>
          <template #tooltip>VueJs</template>
        </Tooltip>

        <Tooltip>
          <div v-motion-pop-visible :delay="50">
            <Icon
              name="logos:nuxt-icon"
              class="tech-stack-item"
              size="50"
            ></Icon>
          </div>
          <template #tooltip>NuxtJs</template>
        </Tooltip>

        <Tooltip>
          <div v-motion-pop-visible :delay="100">
            <Icon
              name="logos:tailwindcss-icon"
              class="tech-stack-item block"
              size="50"
            ></Icon>
          </div>
          <template #tooltip>TailwindCss</template>
        </Tooltip>

        <Tooltip>
          <div v-motion-pop-visible :delay="150">
            <Icon
              name="logos:nestjs"
              class="tech-stack-item block"
              size="50"
            ></Icon>
          </div>
          <template #tooltip>NestJs</template>
        </Tooltip>

        <Tooltip>
          <div v-motion-pop-visible :delay="200">
            <Icon
              name="logos:postgresql"
              class="tech-stack-item block"
              size="50"
            ></Icon>
          </div>
          <template #tooltip>PostgreSQL</template>
        </Tooltip>

        <Tooltip>
          <div v-motion-pop-visible :delay="250">
            <Icon
              name="logos:typescript-icon"
              class="tech-stack-item block"
              size="50"
            ></Icon>
          </div>
          <template #tooltip>TypeScript</template>
        </Tooltip>

        <Tooltip>
          <div v-motion-pop-visible :delay="300">
            <Icon
              name="logos:git-icon"
              class="tech-stack-item block"
              size="50"
            ></Icon>
          </div>
          <template #tooltip>Git</template>
        </Tooltip>

        <Tooltip>
          <div v-motion-pop-visible :delay="350">
            <Icon
              name="logos:azure-icon"
              class="tech-stack-item"
              size="50"
            ></Icon>
          </div>
          <template #tooltip>Azure</template>
        </Tooltip>
      </div>
    </div>
    <div
      class="tech-stack-group text-slate-300 hover:text-white gap-4 mt-8 z-10 relative mx-auto max-w-7xl px-5"
      style="--group-depth: 0.58"
    >
      <div class="stack-icons flex flex-wrap justify-center gap-4">
        <Tooltip>
          <div v-motion-pop-visible>
            <Icon
              name="logos:react"
              class="tech-stack-item block"
              size="50"
            ></Icon>
          </div>
          <template #tooltip>ReactJS</template>
        </Tooltip>

        <Tooltip>
          <div v-motion-pop-visible :delay="50">
            <Icon
              name="logos:mongodb-icon"
              class="rounded-full tech-stack-item"
              size="50"
            ></Icon>
          </div>
          <template #tooltip>MongoDB</template>
        </Tooltip>

        <Tooltip>
          <div v-motion-pop-visible :delay="100">
            <Icon
              name="logos:flutter"
              class="tech-stack-item block"
              size="50"
            ></Icon>
          </div>
          <template #tooltip>Flutter</template>
        </Tooltip>

        <Tooltip>
          <div v-motion-pop-visible :delay="150">
            <Icon
              name="logos:python"
              class="tech-stack-item block"
              size="50"
            ></Icon>
          </div>
          <template #tooltip>Python</template>
        </Tooltip>
      </div>
    </div>
    <div
      class="tech-stack-group text-slate-300 hover:text-white dark:hover:text-gray-50 gap-4 mt-8 z-10 relative mx-auto max-w-7xl px-5"
      style="--group-depth: 0.32"
    >
      <div class="stack-icons flex flex-wrap justify-center gap-4">
        <Tooltip>
          <div v-motion-pop-visible>
            <Icon
              name="logos:cursor-icon"
              class="tech-stack-item tech-stack-item-on-dark block"
              size="50"
            ></Icon>
          </div>
          <template #tooltip>Cursor</template>
        </Tooltip>

        <Tooltip>
          <div v-motion-pop-visible :delay="50">
            <Icon
              name="material-icon-theme:opencode"
              class="tech-stack-item block"
              size="50"
            ></Icon>
          </div>
          <template #tooltip>OpenCode</template>
        </Tooltip>

        <Tooltip>
          <div v-motion-pop-visible :delay="100">
            <Icon
              name="selfhst:github-copilot-light"
              class="tech-stack-item block"
              size="50"
            ></Icon>
          </div>
          <template #tooltip>GitHub Copilot</template>
        </Tooltip>

        <Tooltip>
          <div v-motion-pop-visible :delay="150">
            <Icon
              name="logos:openai-icon"
              class="bg-white p-2 rounded-full tech-stack-item"
              size="50"
            ></Icon>
          </div>
          <template #tooltip>OpenAI</template>
        </Tooltip>

        <Tooltip>
          <div v-motion-pop-visible :delay="50">
            <Icon
              name="logos:claude-icon"
              class="rounded-full p-2 tech-stack-item"
              size="50"
            ></Icon>
          </div>
          <template #tooltip>Claude</template>
        </Tooltip>

        <Tooltip>
          <div v-motion-pop-visible :delay="100">
            <Icon
              name="logos:hugging-face-icon"
              class="tech-stack-item block"
              size="50"
            ></Icon>
          </div>
          <template #tooltip>Hugging Face</template>
        </Tooltip>

        <Tooltip>
          <div v-motion-pop-visible :delay="150">
            <Icon
              name="logos:bun"
              class="tech-stack-item block"
              size="50"
            ></Icon>
          </div>
          <template #tooltip>Bun</template>
        </Tooltip>
        <Tooltip>
          <div v-motion-pop-visible :delay="200">
            <Icon
              name="logos:firebase"
              class="tech-stack-item block"
              size="50"
            ></Icon>
          </div>

          <template #tooltip> Firebase</template>
        </Tooltip>
      </div>
    </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const canvas = ref<HTMLCanvasElement | null>(null);
const hazeFar = ref<HTMLElement | null>(null);
const hazeNear = ref<HTMLElement | null>(null);
const galaxy = ref<HTMLElement | null>(null);
const galaxyFar = ref<HTMLElement | null>(null);
const wrapper = ref<HTMLElement | null>(null);

let ctx: CanvasRenderingContext2D | null = null;
let glowSprite: HTMLCanvasElement | null = null;
let cloudSprite: HTMLCanvasElement | null = null;
let animationFrameId = 0;
let resizeObserver: ResizeObserver | null = null;
let reduceMotion = false;
let width = 0;
let height = 0;
let clock = 0;
let lastFrame = 0;

const STAR_COUNT = 460;
const CLOUD_COUNT = 6;
const PARALLAX_X = 76;
const PARALLAX_Y = 46;
const SCROLL_DEPTH = 170;
const GLOW_SPRITE_SIZE = 64;
const CLOUD_SPRITE_SIZE = 256;

interface Star {
  x: number;
  y: number;
  z: number;
  r: number;
  phase: number;
  spike: boolean;
  tint: number;
}

interface Cloud {
  x: number;
  y: number;
  rx: number;
  ry: number;
  z: number;
  rot: number;
}

const stars: Star[] = [];
const clouds: Cloud[] = [];
const pointer = { x: 0, y: 0 };
const pointerTarget = { x: 0, y: 0 };
let scrollShift = 0;
let scrollShiftTarget = 0;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function buildGlowSprite() {
  const sprite = document.createElement("canvas");
  sprite.width = GLOW_SPRITE_SIZE;
  sprite.height = GLOW_SPRITE_SIZE;
  const sctx = sprite.getContext("2d");
  if (!sctx) return null;

  const half = GLOW_SPRITE_SIZE / 2;
  const glow = sctx.createRadialGradient(half, half, 0, half, half, half);
  glow.addColorStop(0, "rgba(255, 255, 255, 0.9)");
  glow.addColorStop(0.25, "rgba(230, 240, 255, 0.35)");
  glow.addColorStop(0.6, "rgba(200, 220, 255, 0.08)");
  glow.addColorStop(1, "rgba(200, 220, 255, 0)");
  sctx.fillStyle = glow;
  sctx.fillRect(0, 0, GLOW_SPRITE_SIZE, GLOW_SPRITE_SIZE);
  return sprite;
}

function buildCloudSprite() {
  const sprite = document.createElement("canvas");
  sprite.width = CLOUD_SPRITE_SIZE;
  sprite.height = CLOUD_SPRITE_SIZE;
  const sctx = sprite.getContext("2d");
  if (!sctx) return null;

  const half = CLOUD_SPRITE_SIZE / 2;
  const glow = sctx.createRadialGradient(half, half, 0, half, half, half);
  glow.addColorStop(0, "rgba(186, 210, 255, 0.14)");
  glow.addColorStop(0.16, "rgba(150, 190, 240, 0.09)");
  glow.addColorStop(0.32, "rgba(118, 170, 228, 0.055)");
  glow.addColorStop(0.5, "rgba(90, 148, 214, 0.03)");
  glow.addColorStop(0.68, "rgba(70, 128, 200, 0.014)");
  glow.addColorStop(0.84, "rgba(55, 110, 185, 0.004)");
  glow.addColorStop(1, "rgba(55, 110, 185, 0)");
  sctx.fillStyle = glow;
  sctx.fillRect(0, 0, CLOUD_SPRITE_SIZE, CLOUD_SPRITE_SIZE);
  return sprite;
}

function createStar(): Star {
  const z = Math.pow(Math.random(), 1.9) * 0.9 + 0.06;
  const alongBand = Math.random() < 0.56;
  let x = Math.random() * width;
  let y = Math.random() * height;

  if (alongBand) {
    const t = Math.random();
    const scatter = (Math.random() - 0.5) * height * 0.24;
    x = t * width;
    y = height * 0.26 + t * height * 0.4 + scatter;
  }

  return {
    x,
    y,
    z,
    r: 0.14 + z * 2.05,
    phase: Math.random() * Math.PI * 2,
    spike: z > 0.84 && Math.random() < 0.4,
    tint: Math.random(),
  };
}

function createCloud(): Cloud {
  const t = Math.random();
  const scatter = (Math.random() - 0.5) * height * 0.16;

  return {
    x: t * width,
    y: height * 0.28 + t * height * 0.38 + scatter,
    rx: 160 + Math.random() * 220,
    ry: 70 + Math.random() * 90,
    z: 0.08 + Math.random() * 0.22,
    rot: -0.42 + Math.random() * 0.18,
  };
}

function sizeCanvas() {
  const el = canvas.value;
  if (!el) return;

  const nextWidth = el.offsetWidth;
  const nextHeight = el.offsetHeight;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  width = nextWidth;
  height = nextHeight;
  el.width = Math.floor(nextWidth * dpr);
  el.height = Math.floor(nextHeight * dpr);
  ctx = el.getContext("2d");
  ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
  if (ctx) ctx.imageSmoothingEnabled = true;
}

function seedStars() {
  stars.length = 0;
  clouds.length = 0;
  if (width === 0 || height === 0) return;
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push(createStar());
  }
  for (let i = 0; i < CLOUD_COUNT; i++) {
    clouds.push(createCloud());
  }
  stars.sort((a, b) => a.z - b.z);
}

function updateScrollShift() {
  const section = wrapper.value;
  if (!section) {
    scrollShift = 0;
    return;
  }

  const rect = section.getBoundingClientRect();
  const mid = rect.top + rect.height / 2;
  scrollShiftTarget =
    ((window.innerHeight / 2 - mid) / window.innerHeight) * SCROLL_DEPTH;
}

function applyParallax() {
  const section = wrapper.value;

  if (reduceMotion) {
    if (galaxy.value) galaxy.value.style.transform = "none";
    if (galaxyFar.value) galaxyFar.value.style.transform = "none";
    if (hazeFar.value) hazeFar.value.style.transform = "none";
    if (hazeNear.value) hazeNear.value.style.transform = "none";
    if (section) {
      section.style.setProperty("--stack-px", "0");
      section.style.setProperty("--stack-py", "0");
      section.style.setProperty("--stack-sy", "0");
    }
    return;
  }

  const farX = pointer.x * 16;
  const farY = pointer.y * 11 + scrollShift * 0.14;
  const nearX = pointer.x * 38;
  const nearY = pointer.y * 22 + scrollShift * 0.32;
  const galaxyX = pointer.x * 9;
  const galaxyY = pointer.y * 6 + scrollShift * 0.08;
  const galaxyFarX = pointer.x * 4;
  const galaxyFarY = pointer.y * 3 + scrollShift * 0.04;

  if (galaxyFar.value) {
    galaxyFar.value.style.transform = `translate3d(${galaxyFarX}px, ${galaxyFarY}px, 0)`;
  }
  if (galaxy.value) {
    galaxy.value.style.transform = `translate3d(${galaxyX}px, ${galaxyY}px, 0)`;
  }
  if (hazeFar.value) {
    hazeFar.value.style.transform = `translate3d(${farX}px, ${farY}px, 0)`;
  }
  if (hazeNear.value) {
    hazeNear.value.style.transform = `translate3d(${nearX}px, ${nearY}px, 0)`;
  }

  if (!section) return;

  section.style.setProperty("--stack-px", pointer.x.toFixed(4));
  section.style.setProperty("--stack-py", pointer.y.toFixed(4));
  section.style.setProperty("--stack-sy", scrollShift.toFixed(2));
}

function wrapStar(star: Star) {
  const margin = 64;

  if (star.x < -margin) star.x = width + margin;
  if (star.x > width + margin) star.x = -margin;
  if (star.y < -margin) star.y = height + margin;
  if (star.y > height + margin) star.y = -margin;
}

function drawClouds() {
  if (!ctx || !cloudSprite) return;

  for (const cloud of clouds) {
    const x = cloud.x + pointer.x * cloud.z * PARALLAX_X;
    const y = cloud.y + pointer.y * cloud.z * PARALLAX_Y + scrollShift * cloud.z;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(cloud.rot);
    ctx.drawImage(
      cloudSprite,
      -cloud.rx,
      -cloud.ry,
      cloud.rx * 2,
      cloud.ry * 2
    );
    ctx.restore();
  }
}

function drawSpike(x: number, y: number, z: number, twinkle: number) {
  if (!ctx) return;

  const span = (6 + z * 10) * (0.85 + twinkle * 0.15);
  ctx.strokeStyle = `rgba(255, 255, 255, ${(0.14 + z * 0.2) * twinkle})`;
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(x - span, y);
  ctx.lineTo(x + span, y);
  ctx.moveTo(x, y - span * 0.7);
  ctx.lineTo(x, y + span * 0.7);
  ctx.stroke();
}

function starColor(star: Star) {
  // tint 0 = cool blue-white, 1 = warm amber-white; near stars whiter
  const warm = star.tint;
  const r = Math.round(160 + star.z * 80 + warm * 15);
  const g = Math.round(175 + star.z * 70 + warm * 6);
  const b = Math.round(225 + star.z * 30 - warm * 40);
  return { r, g, b };
}

function drawStars(animate: boolean, dt: number) {
  if (!ctx || width === 0 || height === 0) return;

  ctx.clearRect(0, 0, width, height);
  drawClouds();

  const drift = dt * 60;

  for (const star of stars) {
    if (animate) {
      star.x += (0.014 + star.z * 0.06) * drift;
      star.y += (0.008 + star.z * 0.04) * drift;
      wrapStar(star);
    }

    const x = star.x + pointer.x * star.z * PARALLAX_X;
    const y = star.y + pointer.y * star.z * PARALLAX_Y + scrollShift * star.z;
    const twinkle = reduceMotion
      ? 1
      : 0.74 + 0.26 * Math.sin(clock * (0.4 + star.z * 0.5) + star.phase);
    const alpha = (0.07 + star.z * 0.85) * twinkle;
    const { r, g, b } = starColor(star);

    if (star.z > 0.62 && glowSprite) {
      const glowSize = (8 + star.z * 22) * (0.9 + twinkle * 0.1);
      ctx.globalAlpha = 0.22 * star.z * twinkle;
      ctx.drawImage(
        glowSprite,
        x - glowSize / 2,
        y - glowSize / 2,
        glowSize,
        glowSize
      );
      ctx.globalAlpha = 1;
    }

    ctx.beginPath();
    ctx.arc(x, y, star.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
    ctx.fill();

    if (star.spike) {
      drawSpike(x, y, star.z, twinkle);
    }
  }
}

function tick(now: number) {
  const dt = lastFrame ? Math.min((now - lastFrame) / 1000, 0.05) : 1 / 60;
  lastFrame = now;
  clock = now * 0.001;

  // frame-rate independent damping: ~ 0.08/frame at 60fps
  const pointerEase = 1 - Math.exp(-dt * 5.5);
  const scrollEase = 1 - Math.exp(-dt * 7);

  pointer.x += (pointerTarget.x - pointer.x) * pointerEase;
  pointer.y += (pointerTarget.y - pointer.y) * pointerEase;

  updateScrollShift();
  scrollShift += (scrollShiftTarget - scrollShift) * scrollEase;

  applyParallax();
  drawStars(true, dt);
  animationFrameId = requestAnimationFrame(tick);
}

function sectionInView() {
  const section = wrapper.value;
  if (!section) return false;

  const rect = section.getBoundingClientRect();
  return rect.bottom > 0 && rect.top < window.innerHeight;
}

function startAnimation() {
  if (reduceMotion || animationFrameId) return;
  animationFrameId = requestAnimationFrame(tick);
}

function stopAnimation() {
  cancelAnimationFrame(animationFrameId);
  animationFrameId = 0;
  lastFrame = 0;
}

function syncAnimation() {
  if (reduceMotion) {
    stopAnimation();
    updateScrollShift();
    scrollShift = scrollShiftTarget;
    applyParallax();
    drawStars(false, 0);
    return;
  }

  if (sectionInView()) {
    startAnimation();
    return;
  }

  stopAnimation();
}

function updatePointer(event: MouseEvent) {
  const el = canvas.value;
  if (!el) return;

  const rect = el.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return;

  pointerTarget.x = Math.max(
    -1,
    Math.min(1, ((event.clientX - rect.left) / rect.width) * 2 - 1)
  );
  pointerTarget.y = Math.max(
    -1,
    Math.min(1, ((event.clientY - rect.top) / rect.height) * 2 - 1)
  );
}

onMounted(() => {
  reduceMotion = prefersReducedMotion();
  glowSprite = buildGlowSprite();
  cloudSprite = buildCloudSprite();
  sizeCanvas();
  seedStars();
  updateScrollShift();
  scrollShift = scrollShiftTarget;
  applyParallax();
  drawStars(false, 0);
  syncAnimation();

  if (canvas.value) {
    resizeObserver = new ResizeObserver(() => {
      sizeCanvas();
      seedStars();
      drawStars(false, 0);
    });
    resizeObserver.observe(canvas.value);
  }
});

useEventListener("scroll", syncAnimation, { passive: true });
useEventListener("mousemove", updatePointer);
useEventListener("resize", () => {
  sizeCanvas();
  seedStars();
  syncAnimation();
});

onUnmounted(() => {
  stopAnimation();
  resizeObserver?.disconnect();
});
</script>

<style scoped>
.stack-window {
  border-radius: 1.25rem;
  border: 1px solid
    color-mix(in srgb, var(--app-primary-800) 32%, var(--app-muted-300));
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.16),
    inset 0 0 0 1px rgb(255 255 255 / 0.06),
    inset 0 -1px 0 rgb(0 0 0 / 0.42);
}

.dark .stack-window {
  border-color: color-mix(
    in srgb,
    var(--app-primary-300) 16%,
    rgb(255 255 255 / 0.08)
  );
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.1),
    inset 0 0 0 1px rgb(255 255 255 / 0.04),
    inset 0 -1px 0 rgb(0 0 0 / 0.5);
}

.stack-layer {
  will-change: transform;
  backface-visibility: hidden;
}

.stack-haze,
.stack-galaxy {
  position: absolute;
  inset: -20%;
  pointer-events: none;
}

.stack-galaxy {
  inset: -10% -6%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgb(80 130 200 / 0.03) 12%,
    rgb(110 160 220 / 0.07) 28%,
    rgb(210 225 255 / 0.14) 50%,
    rgb(90 155 215 / 0.07) 72%,
    rgb(70 150 210 / 0.03) 86%,
    transparent 100%
  );
  filter: blur(56px);
  transform: rotate(-18deg);
}

.stack-galaxy-far {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgb(40 80 160 / 0.02) 16%,
    rgb(80 130 200 / 0.05) 32%,
    rgb(120 160 230 / 0.08) 50%,
    rgb(70 130 200 / 0.045) 68%,
    rgb(50 110 180 / 0.02) 84%,
    transparent 100%
  );
  filter: blur(80px);
  transform: rotate(-14deg);
}

.stack-haze {
  border-radius: 50%;
  filter: blur(88px);
}

.stack-haze-far {
  background: radial-gradient(
    ellipse at 50% 48%,
    rgb(30 64 175 / 0.28) 0%,
    rgb(30 64 175 / 0.16) 22%,
    rgb(30 64 175 / 0.08) 42%,
    rgb(30 64 175 / 0.03) 62%,
    rgb(30 64 175 / 0.01) 80%,
    transparent 100%
  );
}

.stack-haze-near {
  background: radial-gradient(
    ellipse at 50% 50%,
    rgb(224 242 254 / 0.11) 0%,
    rgb(186 230 253 / 0.06) 26%,
    rgb(186 230 253 / 0.025) 50%,
    rgb(186 230 253 / 0.008) 72%,
    transparent 100%
  );
  filter: blur(72px);
}

.stack-well {
  background: radial-gradient(
    ellipse 74% 64% at 50% 48%,
    transparent 0%,
    rgb(0 0 0 / 0.14) 40%,
    rgb(0 0 0 / 0.42) 70%,
    rgb(0 0 0 / 0.74) 100%
  );
}

.tech-stack-group {
  --group-depth: 1;
}

.stack-icons {
  will-change: transform;
  backface-visibility: hidden;
  transform: translate3d(
    calc(var(--stack-px, 0) * var(--group-depth) * 44px),
    calc(
      var(--stack-py, 0) * var(--group-depth) * 26px + var(--stack-sy, 0) *
        var(--group-depth) * 0.42px
    ),
    0
  );
}

.stack-icons :deep(.tooltip-wrapper) {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
}

.stack-icons :deep(.tooltip-wrapper:hover) {
  z-index: 6;
}

.tech-stack-item {
  display: block;
  filter: drop-shadow(0 10px 18px rgb(0 0 0 / 0.35));
  transform: scale(1);
  transition: transform 180ms cubic-bezier(0.23, 1, 0.32, 1);
}

.tech-stack-item-on-dark {
  filter: brightness(0) invert(1) drop-shadow(0 10px 18px rgb(0 0 0 / 0.35));
}

@media (hover: hover) and (pointer: fine) {
  .stack-icons :deep(.tooltip-wrapper:hover) .tech-stack-item {
    transform: scale(1.16);
  }
}

@media (max-width: 640px) {
  .stack-window {
    border-radius: 0.75rem;
  }
}

.dark .inner-shadow {
  /* inner shadow */
  box-shadow: inset 0px 0px 66px -14px rgba(0, 0, 0, 1);
}

@media (prefers-reduced-motion: reduce) {
  .stack-layer,
  .stack-icons {
    will-change: auto;
    transform: none;
  }

  .stack-galaxy {
    transform: rotate(-18deg);
  }

  .stack-galaxy-far {
    transform: rotate(-14deg);
  }

  .tech-stack-item {
    transition: none;
  }
}
</style>
