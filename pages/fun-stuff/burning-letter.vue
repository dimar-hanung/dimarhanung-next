<template>
  <div class="burning-letter-page">
    <canvas
      ref="canvasRef"
      class="burning-letter-canvas"
      aria-label="Animated burning handwritten letter on a wooden desk"
    />
    <div class="burning-letter-controls">
      <button type="button" class="burning-letter-btn" @click="restart">
        Burn again
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from "vue";

const canvasRef = ref<HTMLCanvasElement | null>(null);

const BURN_DURATION_MS = 15000;
const IGNITE_DELAY_MS = 2000;
const CELL = 3;

interface FlameParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  layer: 0 | 1 | 2;
  size: number;
}

interface EmberParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

interface SmokeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  rot: number;
}

interface AshFragment {
  x: number;
  y: number;
  glow: number;
  size: number;
}

let ctx: CanvasRenderingContext2D | null = null;
let animId = 0;
let lastTime = 0;
let elapsed = 0;
let ignited = false;
let burnComplete = false;

let paperW = 0;
let paperH = 0;
let paperX = 0;
let paperY = 0;
let gridW = 0;
let gridH = 0;

let burnGrid: Float32Array | null = null;
let paperCanvas: HTMLCanvasElement | null = null;
let paperCtx: CanvasRenderingContext2D | null = null;
let paperLayerCanvas: HTMLCanvasElement | null = null;
let paperLayerCtx: CanvasRenderingContext2D | null = null;

const flames: FlameParticle[] = [];
const embers: EmberParticle[] = [];
const smoke: SmokeParticle[] = [];
const ash: AshFragment[] = [];

let fireGlow = 0;
let displayW = 0;
let displayH = 0;
let dpr = 1;
let resizeObserver: ResizeObserver | null = null;

function noise2d(x: number, y: number, t: number): number {
  const n =
    Math.sin(x * 0.09 + t * 2.1) * Math.cos(y * 0.11 - t * 1.7) * 0.5 +
    Math.sin(x * 0.17 - t * 1.3 + y * 0.05) * 0.3 +
    Math.cos(x * 0.23 + y * 0.19 + t * 0.9) * 0.2;
  return n * 0.5 + 0.5;
}

function noise3d(x: number, y: number, z: number): number {
  return (
    Math.sin(x * 0.13 + z * 1.1) * Math.cos(y * 0.15 - z * 0.8) * 0.5 +
    Math.sin(x * 0.21 + y * 0.09 + z * 1.4) * 0.35 +
    0.5
  );
}

function gridIndex(gx: number, gy: number): number {
  return gy * gridW + gx;
}

function burnAt(gx: number, gy: number): number {
  if (!burnGrid || gx < 0 || gy < 0 || gx >= gridW || gy >= gridH) return 0;
  return burnGrid[gridIndex(gx, gy)];
}

function resize() {
  const canvas = canvasRef.value;
  if (!canvas) return;

  dpr = Math.min(window.devicePixelRatio || 1, 2);
  const rect = canvas.getBoundingClientRect();
  const w = rect.width > 0 ? rect.width : window.innerWidth;
  const h = rect.height > 0 ? rect.height : window.innerHeight;
  displayW = w;
  displayH = h;

  canvas.width = Math.floor(w * dpr);
  canvas.height = Math.floor(h * dpr);
  canvas.style.width = `${w}px`;
  canvas.style.height = `${h}px`;

  ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  paperW = Math.min(w * 0.42, 420);
  paperH = paperW * 1.28;
  paperX = (w - paperW) / 2;
  paperY = (h - paperH) / 2 + h * 0.02;

  gridW = Math.ceil(paperW / CELL);
  gridH = Math.ceil(paperH / CELL);

  paperCanvas = document.createElement("canvas");
  paperCanvas.width = paperW;
  paperCanvas.height = paperH;
  paperCtx = paperCanvas.getContext("2d");

  paperLayerCanvas = document.createElement("canvas");
  paperLayerCanvas.width = paperW;
  paperLayerCanvas.height = paperH;
  paperLayerCtx = paperLayerCanvas.getContext("2d");

  drawPaperContent();
  resetSimulation();
}

function resetSimulation() {
  elapsed = 0;
  ignited = false;
  burnComplete = false;
  fireGlow = 0;
  flames.length = 0;
  embers.length = 0;
  smoke.length = 0;
  ash.length = 0;
  burnGrid = new Float32Array(gridW * gridH);
}

function drawPaperContent() {
  const pctx = paperCtx;
  if (!pctx) return;

  pctx.clearRect(0, 0, paperW, paperH);

  const base = pctx.createLinearGradient(0, 0, paperW, paperH);
  base.addColorStop(0, "#f2e6c4");
  base.addColorStop(0.5, "#efe0b8");
  base.addColorStop(1, "#e8d4a0");
  pctx.fillStyle = base;
  pctx.fillRect(0, 0, paperW, paperH);

  for (let i = 0; i < 800; i++) {
    const x = Math.random() * paperW;
    const y = Math.random() * paperH;
    const a = Math.random() * 0.06;
    const r = 1 + Math.random() * 2.5;
    pctx.fillStyle = `rgba(${120 + Math.random() * 40}, ${90 + Math.random() * 30}, ${40 + Math.random() * 20}, ${a})`;
    pctx.beginPath();
    pctx.arc(x, y, r, 0, Math.PI * 2);
    pctx.fill();
  }

  pctx.strokeStyle = "rgba(80, 60, 35, 0.08)";
  pctx.lineWidth = 0.5;
  for (let y = 28; y < paperH - 20; y += 26) {
    pctx.beginPath();
    pctx.moveTo(36, y);
    pctx.lineTo(paperW - 36, y);
    pctx.stroke();
  }

  drawCursiveLetter(pctx);

  pctx.strokeStyle = "rgba(60, 45, 25, 0.12)";
  pctx.lineWidth = 1;
  pctx.strokeRect(0.5, 0.5, paperW - 1, paperH - 1);
}

function drawCursiveLetter(pctx: CanvasRenderingContext2D) {
  const marginL = 44;
  const marginR = paperW - 44;
  const lineH = 30;
  let y = 58;

  const ink = "rgba(35, 28, 48, 0.82)";
  const inkFade = "rgba(35, 28, 48, 0.55)";

  const paragraphs = [
    { lines: 5, startY: y },
    { lines: 4, startY: y + lineH * 6 },
    { lines: 3, startY: y + lineH * 11 },
  ];

  for (const para of paragraphs) {
    let cy = para.startY;
    for (let l = 0; l < para.lines; l++) {
      drawCursiveLine(pctx, marginL, cy, marginR, l === 0 ? ink : inkFade);
      cy += lineH;
    }
  }

  pctx.strokeStyle = ink;
  pctx.lineWidth = 1.6;
  pctx.lineCap = "round";
  pctx.lineJoin = "round";
  pctx.beginPath();
  const sx = marginR - 80;
  const sy = paperH - 72;
  pctx.moveTo(sx, sy + 8);
  for (let i = 0; i < 6; i++) {
    const cx = sx - 20 + i * 14 + Math.sin(i * 1.2) * 6;
    const cy = sy + Math.cos(i * 0.9) * 10 - i * 2;
    pctx.quadraticCurveTo(cx, cy, sx - 60 + i * 12, sy - 4 + Math.sin(i) * 3);
  }
  pctx.stroke();
}

function drawCursiveLine(
  pctx: CanvasRenderingContext2D,
  x0: number,
  y: number,
  x1: number,
  ink: string
) {
  pctx.strokeStyle = ink;
  pctx.lineWidth = 1.3 + Math.random() * 0.4;
  pctx.lineCap = "round";
  pctx.lineJoin = "round";

  const width = x1 - x0;
  const segments = 5 + Math.floor(Math.random() * 4);
  let x = x0 + Math.random() * 12;

  pctx.beginPath();
  pctx.moveTo(x, y + (Math.random() - 0.5) * 4);

  for (let s = 0; s < segments; s++) {
    const segW = width / segments;
    const nx = x + segW * (0.7 + Math.random() * 0.5);
    const midX = (x + nx) / 2;
    const loopH = 6 + Math.random() * 14;
    const dip = (Math.random() - 0.5) * 8;

    pctx.bezierCurveTo(
      midX - segW * 0.2,
      y - loopH + dip,
      midX + segW * 0.15,
      y + loopH * 0.6 + dip,
      nx,
      y + (Math.random() - 0.5) * 5
    );

    if (Math.random() < 0.35) {
      pctx.moveTo(nx + 2, y + 2);
    }
    x = nx;
  }
  pctx.stroke();
}

function drawDesk(w: number, h: number) {
  if (!ctx) return;

  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, "#1a120c");
  g.addColorStop(0.5, "#120d09");
  g.addColorStop(1, "#0e0a07");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  ctx.save();
  for (let i = 0; i < 90; i++) {
    const y = (i / 90) * h + Math.sin(i * 0.7) * 3;
    const shade = 18 + (i % 7) * 3;
    ctx.strokeStyle = `rgba(${shade + 20}, ${shade + 10}, ${shade}, 0.18)`;
    ctx.lineWidth = 1 + (i % 3) * 0.5;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.bezierCurveTo(w * 0.3, y + 2, w * 0.7, y - 2, w, y + 1);
    ctx.stroke();
  }
  ctx.restore();

  if (fireGlow > 0.01) {
    const fx = paperX + paperW * 0.85;
    const fy = paperY + paperH * 0.9;
    const glow = ctx.createRadialGradient(fx, fy, 0, fx, fy, w * 0.55);
    const intensity = fireGlow * (0.65 + Math.sin(elapsed * 0.012) * 0.15);
    glow.addColorStop(0, `rgba(255, 140, 40, ${0.22 * intensity})`);
    glow.addColorStop(0.35, `rgba(200, 80, 20, ${0.1 * intensity})`);
    glow.addColorStop(1, "rgba(80, 30, 10, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);
  }
}

function ignite() {
  ignited = true;
  const ix = paperX + paperW - 12;
  const iy = paperY + paperH - 12;
  for (let i = 0; i < 24; i++) {
    spawnFlame(ix + (Math.random() - 0.5) * 16, iy + (Math.random() - 0.5) * 16);
    if (i < 8) spawnEmber(ix, iy);
  }
}

function updateBurnField() {
  if (!burnGrid || !ignited) return;

  const progress = (elapsed - IGNITE_DELAY_MS) / BURN_DURATION_MS;
  const t = elapsed * 0.001;
  let totalBurn = 0;
  let activeEdge = 0;

  for (let gy = 0; gy < gridH; gy++) {
    for (let gx = 0; gx < gridW; gx++) {
      const dx = (gridW - 1 - gx) / gridW;
      const dy = (gridH - 1 - gy) / gridH;
      const dist = Math.sqrt(dx * dx + dy * dy) / Math.SQRT2;

      const n1 = noise2d(gx * 0.38, gy * 0.38, t) * 0.34;
      const n2 = noise2d(gx * 0.9 + 40, gy * 0.75, t * 1.6) * 0.16;
      const n3 = noise2d(gx * 1.6, gy * 1.4, t * 2.4) * 0.08;
      const front = progress * 1.48 + n1 + n2 + n3;

      const b = Math.max(0, Math.min(1.15, (front - dist) / 0.11));
      burnGrid[gridIndex(gx, gy)] = b;

      totalBurn += b;
      if (b > 0.1 && b < 0.85) activeEdge++;
    }
  }

  fireGlow = Math.min(1, activeEdge / (gridW * gridH * 0.07));

  const avgBurn = totalBurn / burnGrid.length;
  if (!burnComplete && progress >= 0.98) {
    burnComplete = true;
    spawnAshFragments();
  }
}

function spawnAshFragments() {
  for (let i = 0; i < 14; i++) {
    ash.push({
      x: paperX + paperW * (0.3 + Math.random() * 0.5),
      y: paperY + paperH * (0.4 + Math.random() * 0.45),
      glow: 0.5 + Math.random() * 0.5,
      size: 2 + Math.random() * 4,
    });
  }
}

function collectBurnEdge(): { x: number; y: number }[] {
  const points: { x: number; y: number }[] = [];
  if (!burnGrid) return points;

  for (let gy = 0; gy < gridH; gy++) {
    for (let gx = 0; gx < gridW; gx++) {
      const b = burnAt(gx, gy);
      if (b < 0.12 || b > 0.88) continue;

      let isEdge = false;
      const neighbors = [
        [gx + 1, gy],
        [gx, gy - 1],
        [gx - 1, gy],
        [gx, gy + 1],
      ];
      for (const [nx, ny] of neighbors) {
        if (burnAt(nx, ny) < 0.08) {
          isEdge = true;
          break;
        }
      }
      if (!isEdge) continue;

      if (Math.random() < 0.15) {
        points.push({
          x: paperX + (gx + 0.5) * CELL,
          y: paperY + (gy + 0.5) * CELL,
        });
      }
    }
  }
  return points;
}

function spawnFlame(x: number, y: number) {
  const layer = (Math.floor(Math.random() * 3) as 0 | 1 | 2);
  const maxLife = 0.25 + Math.random() * 0.35;
  flames.push({
    x,
    y,
    vx: (Math.random() - 0.5) * 30,
    vy: -(40 + Math.random() * 80),
    life: maxLife,
    maxLife,
    layer,
    size: layer === 0 ? 2 + Math.random() * 3 : layer === 1 ? 3 + Math.random() * 5 : 4 + Math.random() * 7,
  });
}

function spawnEmber(x: number, y: number) {
  if (embers.length > 120) return;
  const maxLife = 1.2 + Math.random() * 1.8;
  embers.push({
    x,
    y,
    vx: (Math.random() - 0.5) * 40,
    vy: -(20 + Math.random() * 35),
    life: maxLife,
    maxLife,
    size: 1.5 + Math.random() * 2.5,
  });
}

function spawnSmoke(x: number, y: number) {
  if (smoke.length > 90) return;
  const maxLife = 2 + Math.random() * 2.5;
  smoke.push({
    x,
    y,
    vx: (Math.random() - 0.5) * 15,
    vy: -(25 + Math.random() * 30),
    life: maxLife,
    maxLife,
    size: 8 + Math.random() * 16,
    rot: Math.random() * Math.PI * 2,
  });
}

function spawnParticlesFromEdge(dt: number) {
  const edge = collectBurnEdge();
  const spawnRate = Math.min(edge.length, 40);

  for (let i = 0; i < spawnRate; i++) {
    const p = edge[Math.floor(Math.random() * edge.length)];
    if (!p) continue;
    spawnFlame(p.x, p.y);
    if (Math.random() < 0.08 * dt) spawnEmber(p.x, p.y);
    if (Math.random() < 0.12 * dt) spawnSmoke(p.x, p.y - 4);
  }
}

function updateParticles(dt: number) {
  const t = elapsed * 0.001;

  for (let i = flames.length - 1; i >= 0; i--) {
    const f = flames[i];
    f.life -= dt;
    f.x += f.vx * dt + Math.sin(t * 8 + i) * 12 * dt;
    f.y += f.vy * dt;
    f.vx *= 1 - dt * 0.5;
    if (f.life <= 0) flames.splice(i, 1);
  }

  for (let i = embers.length - 1; i >= 0; i--) {
    const e = embers[i];
    e.life -= dt;
    e.vy -= 18 * dt;
    e.x += e.vx * dt + noise3d(e.x * 0.02, e.y * 0.02, t) * 40 * dt;
    e.y += e.vy * dt;
    e.vx += (Math.random() - 0.5) * 30 * dt;
    if (e.life <= 0) embers.splice(i, 1);
  }

  for (let i = smoke.length - 1; i >= 0; i--) {
    const s = smoke[i];
    s.life -= dt;
    s.vy -= 8 * dt;
    s.x += s.vx * dt + Math.sin(t * 2 + s.rot) * 20 * dt;
    s.y += s.vy * dt;
    s.size += 6 * dt;
    s.rot += dt * 0.5;
    if (s.life <= 0) smoke.splice(i, 1);
  }

  for (const a of ash) {
    a.glow = Math.max(0, a.glow - dt * 0.08);
  }
}

function renderPaperLayer() {
  const plctx = paperLayerCtx;
  const pctx = paperCtx;
  if (!plctx || !pctx || !burnGrid || !paperLayerCanvas) return;

  plctx.clearRect(0, 0, paperW, paperH);
  plctx.drawImage(paperCanvas!, 0, 0);

  const SCORCH_START = 0.04;
  const SCORCH_END = 0.22;
  const CHAR_END = 0.42;

  for (let gy = 0; gy < gridH; gy++) {
    for (let gx = 0; gx < gridW; gx++) {
      const b = burnAt(gx, gy);
      if (b < SCORCH_START) continue;

      const px = gx * CELL;
      const py = gy * CELL;

      if (b >= CHAR_END) {
        plctx.clearRect(px, py, CELL, CELL);
        continue;
      }

      if (b < SCORCH_END) {
        const t = (b - SCORCH_START) / (SCORCH_END - SCORCH_START);
        plctx.fillStyle = `rgba(90, 55, 25, ${t * 0.55})`;
      } else {
        const t = (b - SCORCH_END) / (CHAR_END - SCORCH_END);
        plctx.fillStyle = `rgba(${30 - t * 10}, ${22 - t * 8}, ${18 - t * 6}, ${0.55 + t * 0.4})`;
      }
      plctx.fillRect(px, py, CELL, CELL);
    }
  }

}

function drawFlames() {
  if (!ctx) return;

  for (const f of flames) {
    const lifeT = f.life / f.maxLife;
    const alpha = lifeT * (f.layer === 2 ? 0.45 : 0.85);

    if (f.layer === 0) {
      ctx.fillStyle = `rgba(255, 255, 220, ${alpha})`;
    } else if (f.layer === 1) {
      ctx.fillStyle = `rgba(255, ${140 + lifeT * 60}, 30, ${alpha})`;
    } else {
      ctx.fillStyle = `rgba(220, 50, 20, ${alpha * 0.6})`;
    }

    ctx.beginPath();
    ctx.ellipse(f.x, f.y, f.size * 0.6, f.size * 1.2, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawEmbers() {
  if (!ctx) return;

  for (const e of embers) {
    const lifeT = e.life / e.maxLife;
    const gray = Math.floor((1 - lifeT) * 180);
    const r = 200 - gray * 0.5;
    const g = 80 - gray * 0.3;
    ctx.fillStyle = `rgba(${r}, ${g}, ${gray * 0.3}, ${lifeT * 0.9})`;
    ctx.beginPath();
    ctx.arc(e.x, e.y, e.size * lifeT, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawSmoke() {
  if (!ctx) return;

  ctx.save();
  for (const s of smoke) {
    const lifeT = s.life / s.maxLife;
    const alpha = lifeT * 0.18;
    const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size);
    grad.addColorStop(0, `rgba(180, 175, 170, ${alpha})`);
    grad.addColorStop(0.5, `rgba(120, 115, 110, ${alpha * 0.6})`);
    grad.addColorStop(1, "rgba(80, 75, 70, 0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(s.x, s.y, s.size, s.size * 0.7, s.rot, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawAsh() {
  if (!ctx) return;

  for (const a of ash) {
    if (a.glow <= 0.01) continue;
    const grad = ctx.createRadialGradient(a.x, a.y, 0, a.x, a.y, a.size * 2);
    grad.addColorStop(0, `rgba(255, 160, 60, ${a.glow * 0.5})`);
    grad.addColorStop(0.4, `rgba(80, 75, 70, ${a.glow * 0.4})`);
    grad.addColorStop(1, "rgba(40, 38, 35, 0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(a.x, a.y, a.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function renderFrame(dt: number) {
  const canvas = canvasRef.value;
  if (!canvas || !ctx || !paperLayerCanvas || paperW <= 0) return;

  const w = displayW;
  const h = displayH;

  elapsed += dt * 1000;

  if (!ignited && elapsed >= IGNITE_DELAY_MS) {
    ignite();
  }

  if (ignited) {
    updateBurnField();
    if (!burnComplete) spawnParticlesFromEdge(dt);
  }

  updateParticles(dt);
  drawDesk(w, h);
  renderPaperLayer();

  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.4)";
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 10;
  ctx.drawImage(paperLayerCanvas, paperX, paperY);
  ctx.restore();

  drawSmoke();
  drawFlames();
  drawEmbers();
  drawAsh();
}

function tick(now: number) {
  if (!lastTime) lastTime = now;
  const dt = Math.min((now - lastTime) / 1000, 0.05);
  lastTime = now;

  renderFrame(dt);
  animId = requestAnimationFrame(tick);
}

function start() {
  cancelAnimationFrame(animId);
  lastTime = 0;
  animId = requestAnimationFrame(tick);
}

function restart() {
  resetSimulation();
  lastTime = 0;
}

onMounted(async () => {
  await nextTick();
  resize();

  if (!canvasRef.value || paperW <= 0) {
    requestAnimationFrame(() => {
      resize();
      start();
    });
  } else {
    start();
  }

  resizeObserver = new ResizeObserver(() => {
    resize();
  });
  const page = canvasRef.value?.closest(".burning-letter-page");
  if (page) resizeObserver.observe(page);
});

onUnmounted(() => {
  cancelAnimationFrame(animId);
  resizeObserver?.disconnect();
});
</script>

<style scoped>
.burning-letter-page {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: #0a0705;
  overflow: hidden;
}

.burning-letter-canvas {
  display: block;
  width: 100%;
  height: 100vh;
}

.burning-letter-controls {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 10;
}

.burning-letter-btn {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #f5e6c8;
  background: rgba(30, 20, 12, 0.75);
  border: 1px solid rgba(180, 130, 70, 0.35);
  border-radius: 0.5rem;
  cursor: pointer;
  backdrop-filter: blur(8px);
  transition: background 0.2s, border-color 0.2s;
}

.burning-letter-btn:hover {
  background: rgba(50, 32, 18, 0.9);
  border-color: rgba(220, 160, 80, 0.5);
}

.burning-letter-btn:focus-visible {
  outline: 2px solid rgba(255, 180, 80, 0.7);
  outline-offset: 2px;
}
</style>
