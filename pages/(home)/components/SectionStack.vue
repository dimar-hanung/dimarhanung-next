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
      <div class="stack-well absolute inset-0" />
      <canvas
        ref="skyCanvas"
        class="stack-shader absolute inset-0 h-full w-full"
        :class="shaderReady ? 'opacity-100' : 'opacity-0'"
      ></canvas>
      <canvas ref="starCanvas" class="absolute inset-0 h-full w-full"></canvas>
    </div>
    <div
      class="tech-stack-group text-slate-300 hover:text-white dark:hover:text-gray-50 gap-4 z-10 relative mx-auto max-w-7xl px-5"
      style="--row-depth: 1"
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
      style="--row-depth: 1.12"
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
              name="logos:flutter-icon"
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
      style="--row-depth: 1.26"
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
              name="logos:firebase-icon"
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
import {
  COMPOSITE_FRAGMENT,
  NEBULA_FRAGMENT,
  SKY_VERTEX,
} from "./stack-sky-shader";

const starCanvas = ref<HTMLCanvasElement | null>(null);
const skyCanvas = ref<HTMLCanvasElement | null>(null);
const wrapper = ref<HTMLElement | null>(null);
const shaderReady = ref(false);

let ctx: CanvasRenderingContext2D | null = null;
let gl: WebGLRenderingContext | null = null;
let glowSprites: (HTMLCanvasElement | null)[] = [];
let flareSprite: HTMLCanvasElement | null = null;
let animationFrameId = 0;
let resizeObserver: ResizeObserver | null = null;
let themeObserver: MutationObserver | null = null;
let reduceMotion = false;
let width = 0;
let height = 0;
let bandWidth = 0;
let clock = 0;
let lastFrame = 0;
let viewTop = 0;
let viewBottom = 0;
let skyBottom: [number, number, number] = [8 / 255, 47 / 255, 73 / 255];

// Depth: 1 = first icon row, larger = farther. Icon rows sit at 1–1.26 and the
// nearest star at 1.4, so parallax never contradicts the icons covering stars.
const STAR_COUNT = 520;
const NEAR_DEPTH = 1.4;
const FAR_DEPTH = 10;
// Offsets at depth 1; every layer divides them by its depth.
const PARALLAX_X = 44;
const PARALLAX_Y = 26;
const DRIFT_X = 150;
const DRIFT_Y = 80;
const DRIFT_SPEED = (Math.PI * 2) / 100;
// Share of the section's scroll offset that far layers hold back.
const SCROLL_PARALLAX = 0.35;
const WRAP_MARGIN = 48;
const BAND_ANGLE = -0.29;
const BAND_DIR = { x: Math.cos(BAND_ANGLE), y: Math.sin(BAND_ANGLE) };
const GLOW_SPRITE_SIZE = 64;
const FLARE_SPRITE_SIZE = 128;
// Rough stellar colors, hot to cool, with how common each is among the stars
// drawn here: blue-white, white, yellow-white, orange.
const STAR_TINTS = [
  { rgb: [170, 196, 255], weight: 0.22 },
  { rgb: [236, 240, 255], weight: 0.43 },
  { rgb: [255, 240, 214], weight: 0.25 },
  { rgb: [255, 206, 158], weight: 0.1 },
] as const;
// Star dust renders at device resolution (capped); the soft nebula underneath
// renders at half resolution or less and is upsampled by the composite pass.
const SKY_MAX_DPR = 2;
const SKY_PIXEL_BUDGET = 8_000_000;
const NEBULA_MAX_SCALE = 0.5;
const NEBULA_PIXEL_BUDGET = 400_000;
// While animating, redraw only the rows in view plus this share of the viewport
// above and below; the rest keeps its last frame until it scrolls in.
const VISIBLE_PAD = 0.25;
const NEBULA_UNIFORMS = [
  "uResolution",
  "uSize",
  "uTime",
  "uCamera",
  "uScroll",
  "uBandDir",
  "uBandWidth",
  "uBottom",
] as const;
const COMPOSITE_UNIFORMS = [
  "uResolution",
  "uSize",
  "uTime",
  "uCamera",
  "uScroll",
  "uNebula",
] as const;

interface Star {
  x: number;
  y: number;
  depth: number;
  near: number;
  brightness: number;
  phase: number;
  flare: boolean;
  tint: number;
  color: string;
}

interface SkyPass<Name extends string> {
  program: WebGLProgram;
  uniforms: Record<Name, WebGLUniformLocation | null>;
}

let nebulaPass: SkyPass<(typeof NEBULA_UNIFORMS)[number]> | null = null;
let compositePass: SkyPass<(typeof COMPOSITE_UNIFORMS)[number]> | null = null;
let nebulaTarget: {
  texture: WebGLTexture;
  framebuffer: WebGLFramebuffer;
  width: number;
  height: number;
} | null = null;

const stars: Star[] = [];
const pointer = { x: 0, y: 0 };
const pointerTarget = { x: 0, y: 0 };
const drift = { x: 0, y: 0 };
let scrollShift = 0;
let scrollShiftTarget = 0;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function buildGlowSprite(r: number, g: number, b: number) {
  const sprite = document.createElement("canvas");
  sprite.width = GLOW_SPRITE_SIZE;
  sprite.height = GLOW_SPRITE_SIZE;
  const sctx = sprite.getContext("2d");
  if (!sctx) return null;

  const half = GLOW_SPRITE_SIZE / 2;
  const glow = sctx.createRadialGradient(half, half, 0, half, half, half);
  glow.addColorStop(0, "rgba(255, 255, 255, 0.95)");
  glow.addColorStop(0.12, `rgba(${r}, ${g}, ${b}, 0.55)`);
  glow.addColorStop(0.35, `rgba(${r}, ${g}, ${b}, 0.14)`);
  glow.addColorStop(0.65, `rgba(${r}, ${g}, ${b}, 0.035)`);
  glow.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
  sctx.fillStyle = glow;
  sctx.fillRect(0, 0, GLOW_SPRITE_SIZE, GLOW_SPRITE_SIZE);
  return sprite;
}

// Diffraction flare for the brightest stars: tapered spikes that fade from the
// center, drawn once at high resolution so they stay crisp when scaled.
function buildFlareSprite() {
  const sprite = document.createElement("canvas");
  sprite.width = FLARE_SPRITE_SIZE;
  sprite.height = FLARE_SPRITE_SIZE;
  const sctx = sprite.getContext("2d");
  if (!sctx) return null;

  const half = FLARE_SPRITE_SIZE / 2;
  sctx.globalCompositeOperation = "lighter";

  for (const { length, angle } of [
    { length: half, angle: 0 },
    { length: half * 0.72, angle: Math.PI / 2 },
  ]) {
    const spike = sctx.createLinearGradient(-length, 0, length, 0);
    spike.addColorStop(0, "rgba(255, 255, 255, 0)");
    spike.addColorStop(0.38, "rgba(235, 242, 255, 0.12)");
    spike.addColorStop(0.5, "rgba(255, 255, 255, 0.9)");
    spike.addColorStop(0.62, "rgba(235, 242, 255, 0.12)");
    spike.addColorStop(1, "rgba(255, 255, 255, 0)");
    sctx.save();
    sctx.translate(half, half);
    sctx.rotate(angle);
    sctx.fillStyle = spike;
    sctx.beginPath();
    sctx.moveTo(-length, 0);
    sctx.lineTo(0, -1.3);
    sctx.lineTo(length, 0);
    sctx.lineTo(0, 1.3);
    sctx.closePath();
    sctx.fill();
    sctx.restore();
  }

  const core = sctx.createRadialGradient(half, half, 0, half, half, half * 0.32);
  core.addColorStop(0, "rgba(255, 255, 255, 0.7)");
  core.addColorStop(0.3, "rgba(225, 236, 255, 0.18)");
  core.addColorStop(1, "rgba(225, 236, 255, 0)");
  sctx.fillStyle = core;
  sctx.fillRect(0, 0, FLARE_SPRITE_SIZE, FLARE_SPRITE_SIZE);
  return sprite;
}

function compileShader(
  context: WebGLRenderingContext,
  type: number,
  source: string
) {
  const shader = context.createShader(type);
  if (!shader) return null;

  context.shaderSource(shader, source);
  context.compileShader(shader);
  if (context.getShaderParameter(shader, context.COMPILE_STATUS)) return shader;

  console.warn(context.getShaderInfoLog(shader));
  context.deleteShader(shader);
  return null;
}

function linkPass<Name extends string>(
  context: WebGLRenderingContext,
  fragmentSource: string,
  uniformNames: readonly Name[]
): SkyPass<Name> | null {
  const vertex = compileShader(context, context.VERTEX_SHADER, SKY_VERTEX);
  const fragment = compileShader(context, context.FRAGMENT_SHADER, fragmentSource);
  const program = context.createProgram();
  if (!vertex || !fragment || !program) return null;

  context.attachShader(program, vertex);
  context.attachShader(program, fragment);
  // Both passes read the same triangle buffer from attribute 0.
  context.bindAttribLocation(program, 0, "aPosition");
  context.linkProgram(program);
  if (!context.getProgramParameter(program, context.LINK_STATUS)) {
    console.warn(context.getProgramInfoLog(program));
    return null;
  }

  const uniforms = {} as Record<Name, WebGLUniformLocation | null>;
  for (const name of uniformNames) {
    uniforms[name] = context.getUniformLocation(program, name);
  }
  return { program, uniforms };
}

function initSky() {
  gl = null;
  const el = skyCanvas.value;
  if (!el) return false;

  const context = el.getContext("webgl", {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    // Rows outside the scissor must keep their last frame.
    preserveDrawingBuffer: true,
    powerPreference: "low-power",
  });
  if (!context) return false;

  const nebula = linkPass(context, NEBULA_FRAGMENT, NEBULA_UNIFORMS);
  const composite = linkPass(context, COMPOSITE_FRAGMENT, COMPOSITE_UNIFORMS);
  const texture = context.createTexture();
  const framebuffer = context.createFramebuffer();
  if (!nebula || !composite || !texture || !framebuffer) return false;

  // One oversized triangle covers the whole target.
  context.bindBuffer(context.ARRAY_BUFFER, context.createBuffer());
  context.bufferData(
    context.ARRAY_BUFFER,
    new Float32Array([-1, -1, 3, -1, -1, 3]),
    context.STATIC_DRAW
  );
  context.enableVertexAttribArray(0);
  context.vertexAttribPointer(0, 2, context.FLOAT, false, 0, 0);

  context.bindTexture(context.TEXTURE_2D, texture);
  context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.LINEAR);
  context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MAG_FILTER, context.LINEAR);
  context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_S, context.CLAMP_TO_EDGE);
  context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_T, context.CLAMP_TO_EDGE);
  context.enable(context.SCISSOR_TEST);

  nebulaPass = nebula;
  compositePass = composite;
  nebulaTarget = { texture, framebuffer, width: 0, height: 0 };
  gl = context;
  return true;
}

// Theme presets swap --app-primary-950 at runtime and may use any CSS color
// syntax, so let a 1px canvas resolve it to sRGB.
function readSkyBottom() {
  const probe = document.createElement("canvas");
  probe.width = 1;
  probe.height = 1;
  const pctx = probe.getContext("2d", { willReadFrequently: true });
  if (!pctx) return;

  const value = getComputedStyle(document.documentElement)
    .getPropertyValue("--app-primary-950")
    .trim();
  if (!value) return;

  pctx.fillStyle = value;
  pctx.fillRect(0, 0, 1, 1);
  const [r = 0, g = 0, b = 0] = pctx.getImageData(0, 0, 1, 1).data;
  skyBottom = [r / 255, g / 255, b / 255];
}

function pickTint() {
  let roll = Math.random();
  for (const [index, tint] of STAR_TINTS.entries()) {
    roll -= tint.weight;
    if (roll <= 0) return index;
  }
  return 0;
}

function starColor(near: number, tint: number) {
  // Far stars sink into the blue haze; near stars show their own temperature.
  const [ownR, ownG, ownB] = (STAR_TINTS[tint] ?? STAR_TINTS[1]).rgb;
  const mixNear = Math.pow(near, 0.6);
  const r = Math.round(138 + (ownR - 138) * mixNear);
  const g = Math.round(160 + (ownG - 160) * mixNear);
  const b = Math.round(212 + (ownB - 212) * mixNear);
  return `rgb(${r}, ${g}, ${b})`;
}

function createStar(): Star {
  // Most stars are far and faint; a few come close.
  const near = Math.pow(Math.random(), 2.2);
  const depth = 1 / (1 / FAR_DEPTH + near * (1 / NEAR_DEPTH - 1 / FAR_DEPTH));
  const tint = pickTint();
  let x = Math.random() * width;
  let y = Math.random() * height;

  if (Math.random() < 0.5) {
    const along = ((Math.random() - 0.5) * width) / BAND_DIR.x;
    const across =
      (Math.random() + Math.random() + Math.random() - 1.5) * bandWidth * 0.9;
    x = width / 2 + along * BAND_DIR.x - across * BAND_DIR.y;
    y = height / 2 + along * BAND_DIR.y + across * BAND_DIR.x;
  }

  return {
    x,
    y,
    depth,
    near,
    brightness: 0.55 + Math.random() * 0.45,
    phase: Math.random() * Math.PI * 2,
    flare: near > 0.84 && Math.random() < 0.35,
    tint,
    color: starColor(near, tint),
  };
}

function sizeCanvases() {
  const el = starCanvas.value;
  if (!el) return;

  width = el.offsetWidth;
  height = el.offsetHeight;
  bandWidth = Math.min(Math.max(width * 0.16, 120), 360);

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  el.width = Math.floor(width * dpr);
  el.height = Math.floor(height * dpr);
  ctx = el.getContext("2d");
  ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);

  const sky = skyCanvas.value;
  if (!gl || !sky || !nebulaTarget) return;

  const area = Math.max(1, width * height);
  const skyScale = Math.min(
    Math.min(window.devicePixelRatio || 1, SKY_MAX_DPR),
    Math.sqrt(SKY_PIXEL_BUDGET / area)
  );
  sky.width = Math.max(1, Math.round(width * skyScale));
  sky.height = Math.max(1, Math.round(height * skyScale));

  const nebulaScale = Math.min(
    NEBULA_MAX_SCALE,
    Math.sqrt(NEBULA_PIXEL_BUDGET / area)
  );
  nebulaTarget.width = Math.max(1, Math.round(width * nebulaScale));
  nebulaTarget.height = Math.max(1, Math.round(height * nebulaScale));
  gl.bindTexture(gl.TEXTURE_2D, nebulaTarget.texture);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    nebulaTarget.width,
    nebulaTarget.height,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    null
  );
  gl.bindFramebuffer(gl.FRAMEBUFFER, nebulaTarget.framebuffer);
  gl.framebufferTexture2D(
    gl.FRAMEBUFFER,
    gl.COLOR_ATTACHMENT0,
    gl.TEXTURE_2D,
    nebulaTarget.texture,
    0
  );
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
}

function seedStars() {
  stars.length = 0;
  if (width === 0 || height === 0) return;
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push(createStar());
  }
  // Far first, so near stars paint over them.
  stars.sort((a, b) => b.depth - a.depth);
}

function updateScrollTarget() {
  const section = wrapper.value;
  if (!section) return;

  const rect = section.getBoundingClientRect();
  scrollShiftTarget = window.innerHeight / 2 - (rect.top + rect.height / 2);
  viewTop = -rect.top;
  viewBottom = window.innerHeight - rect.top;
}

function wrap(value: number, size: number) {
  const span = size + WRAP_MARGIN * 2;
  return ((((value + WRAP_MARGIN) % span) + span) % span) - WRAP_MARGIN;
}

// Same falloff as the shader's well, so stars dim with the sky at the edges.
function edgeShade(x: number, y: number) {
  const ex = (x / width - 0.5) / 0.74;
  const ey = (y / height - 0.48) / 0.64;
  return 1 - 0.74 * Math.pow(Math.min(Math.hypot(ex, ey), 1), 1.6);
}

function drawStars(cameraX: number, cameraY: number, scroll: number) {
  if (!ctx || width === 0 || height === 0) return;

  ctx.clearRect(0, 0, width, height);

  for (const star of stars) {
    const scale = 1 / star.depth;
    const x = wrap(star.x + cameraX * scale, width);
    const y = wrap(star.y + cameraY * scale + scroll * (1 - scale), height);
    const shade = edgeShade(x, y);
    // Far stars twinkle more; near ones hold steady.
    const twinkle = reduceMotion
      ? 1
      : 1 -
        (0.3 - star.near * 0.22) *
          (0.5 +
            0.5 * Math.sin(clock * (0.5 + (1 - star.near) * 0.9) + star.phase));
    const light = star.brightness * twinkle * shade;

    const glow = glowSprites[star.tint];
    if (star.near > 0.3 && glow) {
      const glowSize = (5 + star.near * 24) * star.brightness;
      ctx.globalAlpha = 0.36 * star.near * twinkle * shade;
      ctx.drawImage(glow, x - glowSize / 2, y - glowSize / 2, glowSize, glowSize);
    }

    ctx.globalAlpha = (0.18 + star.near * 0.8) * light;
    ctx.fillStyle = star.color;
    ctx.beginPath();
    ctx.arc(x, y, 0.32 + star.near * 0.9 * star.brightness, 0, Math.PI * 2);
    ctx.fill();

    if (star.flare && flareSprite) {
      const flareSize = (16 + star.near * 40) * star.brightness;
      ctx.globalAlpha = 0.55 * light;
      ctx.drawImage(
        flareSprite,
        x - flareSize / 2,
        y - flareSize / 2,
        flareSize,
        flareSize
      );
    }
  }

  ctx.globalAlpha = 1;
}

// Scissor to section rows [top, bottom] (CSS px, y down) on a target whose
// buffer is `targetHeight` px tall; GL counts rows from the bottom.
function scissorRows(targetWidth: number, targetHeight: number, top: number, bottom: number) {
  if (!gl) return;

  const scale = targetHeight / height;
  const y = Math.max(0, Math.floor((height - bottom) * scale));
  gl.scissor(0, y, targetWidth, Math.ceil((bottom - top) * scale) + 1);
}

function drawSky(
  cameraX: number,
  cameraY: number,
  scroll: number,
  visibleOnly: boolean
) {
  const sky = skyCanvas.value;
  if (!gl || !sky || !nebulaPass || !compositePass || !nebulaTarget) return;
  if (height === 0) return;

  let top = 0;
  let bottom = height;
  if (visibleOnly) {
    const pad = window.innerHeight * VISIBLE_PAD;
    top = Math.max(0, viewTop - pad);
    bottom = Math.min(height, viewBottom + pad);
    if (bottom <= top) return;
  }

  // Pass 1: soft nebula into the half-resolution texture
  gl.bindFramebuffer(gl.FRAMEBUFFER, nebulaTarget.framebuffer);
  gl.viewport(0, 0, nebulaTarget.width, nebulaTarget.height);
  scissorRows(nebulaTarget.width, nebulaTarget.height, top, bottom);
  gl.useProgram(nebulaPass.program);
  const nebula = nebulaPass.uniforms;
  gl.uniform2f(nebula.uResolution, nebulaTarget.width, nebulaTarget.height);
  gl.uniform2f(nebula.uSize, width, height);
  gl.uniform1f(nebula.uTime, clock);
  gl.uniform2f(nebula.uCamera, cameraX, cameraY);
  gl.uniform1f(nebula.uScroll, scroll);
  gl.uniform2f(nebula.uBandDir, BAND_DIR.x, BAND_DIR.y);
  gl.uniform1f(nebula.uBandWidth, bandWidth);
  gl.uniform3fv(nebula.uBottom, skyBottom);
  gl.drawArrays(gl.TRIANGLES, 0, 3);

  // Pass 2: upsample, star dust, edge well and dither onto the canvas
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  gl.viewport(0, 0, sky.width, sky.height);
  scissorRows(sky.width, sky.height, top, bottom);
  gl.useProgram(compositePass.program);
  const composite = compositePass.uniforms;
  gl.uniform2f(composite.uResolution, sky.width, sky.height);
  gl.uniform2f(composite.uSize, width, height);
  gl.uniform1f(composite.uTime, clock);
  gl.uniform2f(composite.uCamera, cameraX, cameraY);
  gl.uniform1f(composite.uScroll, scroll);
  gl.uniform1i(composite.uNebula, 0);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}

// `visibleOnly` is for animation frames; one-off draws (mount, resize, theme,
// reduced motion) repaint the whole pane.
function drawFrame(visibleOnly = false) {
  const cameraX = drift.x + pointer.x * PARALLAX_X;
  const cameraY = drift.y + pointer.y * PARALLAX_Y;
  const scroll = scrollShift * SCROLL_PARALLAX;

  // Icon rows follow pointer and scroll only; the drift belongs to the sky.
  const section = wrapper.value;
  if (section) {
    section.style.setProperty("--stack-px", (pointer.x * PARALLAX_X).toFixed(2));
    section.style.setProperty("--stack-py", (pointer.y * PARALLAX_Y).toFixed(2));
    section.style.setProperty("--stack-sy", scroll.toFixed(2));
  }

  drawSky(cameraX, cameraY, scroll, visibleOnly);
  drawStars(cameraX, cameraY, scroll);
}

function tick(now: number) {
  const dt = lastFrame ? Math.min((now - lastFrame) / 1000, 0.05) : 1 / 60;
  lastFrame = now;
  // Advance only while running, so the sky resumes where it stopped.
  clock += dt;

  // Frame-rate independent damping
  const pointerEase = 1 - Math.exp(-dt * 5.5);
  const scrollEase = 1 - Math.exp(-dt * 8);

  pointer.x += (pointerTarget.x - pointer.x) * pointerEase;
  pointer.y += (pointerTarget.y - pointer.y) * pointerEase;

  updateScrollTarget();
  scrollShift += (scrollShiftTarget - scrollShift) * scrollEase;

  drift.x = Math.sin(clock * DRIFT_SPEED) * DRIFT_X;
  drift.y = Math.sin(clock * DRIFT_SPEED * 1.37 + 1.3) * DRIFT_Y;

  drawFrame(true);
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

// Reduced motion keeps the single static frame drawn on mount and resize.
function syncAnimation() {
  if (reduceMotion) return;

  if (sectionInView()) {
    startAnimation();
    return;
  }

  stopAnimation();
}

function updatePointer(event: MouseEvent) {
  const el = starCanvas.value;
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
  glowSprites = STAR_TINTS.map(({ rgb: [r, g, b] }) => buildGlowSprite(r, g, b));
  flareSprite = buildFlareSprite();
  shaderReady.value = initSky();
  readSkyBottom();
  sizeCanvases();
  seedStars();
  if (!reduceMotion) {
    updateScrollTarget();
    scrollShift = scrollShiftTarget;
  }
  drawFrame();
  syncAnimation();

  if (starCanvas.value) {
    resizeObserver = new ResizeObserver(() => {
      sizeCanvases();
      seedStars();
      drawFrame();
    });
    resizeObserver.observe(starCanvas.value);
  }

  themeObserver = new MutationObserver(() => {
    readSkyBottom();
    if (!animationFrameId) drawFrame();
  });
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["style"],
  });
});

useEventListener("scroll", syncAnimation, { passive: true });
useEventListener("resize", syncAnimation);
useEventListener("mousemove", updatePointer);
useEventListener(skyCanvas, "webglcontextlost", (event: Event) => {
  event.preventDefault();
  gl = null;
  shaderReady.value = false;
});
useEventListener(skyCanvas, "webglcontextrestored", () => {
  shaderReady.value = initSky();
  sizeCanvases();
  drawFrame();
});

onUnmounted(() => {
  stopAnimation();
  resizeObserver?.disconnect();
  themeObserver?.disconnect();
  // Browsers cap live WebGL contexts; free this one when leaving the page.
  gl?.getExtension("WEBGL_lose_context")?.loseContext();
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

.stack-shader {
  transition: opacity 700ms cubic-bezier(0.23, 1, 0.32, 1);
}

/* Sits under the opaque shader canvas: seen while it fades in, or when WebGL is unavailable. */
.stack-well {
  background: radial-gradient(
    ellipse 74% 64% at 50% 48%,
    transparent 0%,
    rgb(0 0 0 / 0.14) 40%,
    rgb(0 0 0 / 0.42) 70%,
    rgb(0 0 0 / 0.74) 100%
  );
}

/* Same camera rule as the sky: pointer / depth, scroll * (1 - 1 / depth). */
.stack-icons {
  --row-scale: calc(1 / var(--row-depth, 1));
  will-change: transform;
  backface-visibility: hidden;
  transform: translate3d(
    calc(var(--stack-px, 0) * var(--row-scale) * 1px),
    calc(
      (
          var(--stack-py, 0) * var(--row-scale) + var(--stack-sy, 0) *
            (1 - var(--row-scale))
        ) *
        1px
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
  .stack-icons {
    will-change: auto;
    transform: none;
  }

  .tech-stack-item {
    transition: none;
  }
}
</style>
