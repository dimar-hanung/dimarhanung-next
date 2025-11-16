<template>
  <div class="min-h-screen grid place-items-center overflow-hidden bg-gray-950">
    <!-- Input wrapper container with relative positioning -->
    <div class="relative inline-block">
      <!-- Particle canvas for sparkles and effects -->
      <canvas
        ref="particleCanvasRef"
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[3]"
        :width="800"
        :height="800"
      ></canvas>

      <!-- Animated gradient border canvas (shown on focus) -->
      <canvas
        ref="canvasRef"
        class="absolute top-0 left-0 pointer-events-none blur-[0.5px] transition-opacity duration-300 z-[1]"
        :style="{ opacity: canvasOpacity }"
      ></canvas>

      <!-- Static border (shown when not focused) -->
      <div
        :class="[
          'absolute inset-0 rounded-full pointer-events-none z-0 border-2 transition-all duration-300',
          isFocused ? 'border-transparent' : 'border-gray-400',
        ]"
      ></div>

      <!-- Success pulse overlay -->
      <div
        :class="[
          'absolute inset-0 rounded-full pointer-events-none z-[2] transition-all duration-500',
          isSuccessPulse
            ? 'bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-purple-500/30 scale-105'
            : 'bg-transparent scale-100',
        ]"
      ></div>

      <!-- Main input field -->
      <input
        ref="inputRef"
        v-model="inputValue"
        type="text"
        class="relative w-[400px] px-8 py-[18px] text-lg bg-transparent rounded-full outline-none z-[2] placeholder:text-gray-600 text-white"
        placeholder="Type something magical... ✨"
        @focus="onFocus"
        @blur="onBlur"
        @keydown.enter="onEnter"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const inputRef = ref<HTMLInputElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const particleCanvasRef = ref<HTMLCanvasElement | null>(null);

const isFocused = ref(false);
const canvasOpacity = ref(0);
const inputValue = ref("");
const isSuccessPulse = ref(false);

// Configuration 🎨
const borderWidth = 2;
const rotationSpeed = 0.02;
const glowIntensity = 20;

let rotation = 0;
let animationFrameId: number | null = null;
let particleAnimationId: number | null = null;

// Particle system! ✨
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  type: "sparkle" | "ambient";
}

const particles: Particle[] = [];

// Vibrant gradient colors for focused state! 🌈
const focusedColors = [
  { pos: 0, color: "#FF0080" },
  { pos: 0.2, color: "#FF8C00" },
  { pos: 0.4, color: "#40E0D0" },
  { pos: 0.6, color: "#9D00FF" },
  { pos: 0.8, color: "#FF1493" },
  { pos: 1, color: "#FF0080" },
];

const sparkleColors = [
  "#FF0080",
  "#FF8C00",
  "#40E0D0",
  "#9D00FF",
  "#FF1493",
  "#FFD700",
  "#00FFFF",
];

function onFocus() {
  isFocused.value = true;
  canvasOpacity.value = 1;
}

function onBlur() {
  isFocused.value = false;
  canvasOpacity.value = 0;
}

function onEnter(event: KeyboardEvent) {
  event.preventDefault();

  if (!inputValue.value.trim()) return;

  // Trigger success pulse! 🎉
  isSuccessPulse.value = true;
  setTimeout(() => {
    isSuccessPulse.value = false;
  }, 500);

  // Create sparkle explosion! 💥
  createSparkleExplosion();

  // Optional: Clear input or do something with the value
  console.log("Submitted:", inputValue.value);
  inputValue.value = "";
}

function createSparkleExplosion() {
  if (!inputRef.value) return;

  const rect = inputRef.value.getBoundingClientRect();
  const centerX = 400; // Canvas center
  const centerY = 400; // Canvas center

  // Create 30-50 particles! ✨
  const particleCount = 30 + Math.floor(Math.random() * 20);

  for (let i = 0; i < particleCount; i++) {
    const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5;
    const speed = 2 + Math.random() * 4;

    particles.push({
      x: centerX,
      y: centerY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      maxLife: 0.5 + Math.random() * 0.5,
      size: 2 + Math.random() * 3,
      color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
      type: "sparkle",
    });
  }
}

function createAmbientParticle() {
  if (!inputRef.value || Math.random() > 0.05) return;

  const centerX = 400;
  const centerY = 400;
  const radius = 200 + Math.random() * 50;
  const angle = Math.random() * Math.PI * 2;

  particles.push({
    x: centerX + Math.cos(angle) * radius,
    y: centerY + Math.sin(angle) * radius,
    vx: (Math.random() - 0.5) * 0.5,
    vy: -0.5 - Math.random() * 0.5,
    life: 1,
    maxLife: 2 + Math.random() * 2,
    size: 1 + Math.random() * 2,
    color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
    type: "ambient",
  });
}

function updateParticles(deltaTime: number) {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];

    p.x += p.vx;
    p.y += p.vy;
    p.life -= deltaTime;

    // Add gravity for sparkles
    if (p.type === "sparkle") {
      p.vy += 0.1;
    }

    // Remove dead particles
    if (p.life <= 0) {
      particles.splice(i, 1);
    }
  }
}

function drawParticles() {
  if (!particleCanvasRef.value) return;

  const canvas = particleCanvasRef.value;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const p of particles) {
    const opacity = Math.max(0, p.life / p.maxLife);

    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.fillStyle = p.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = p.color;

    // Draw sparkle as a star shape! ⭐
    if (p.type === "sparkle") {
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const angle = (Math.PI / 2) * i;
        const x = p.x + Math.cos(angle) * p.size;
        const y = p.y + Math.sin(angle) * p.size;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
    } else {
      // Ambient particles as circles
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }
}

let lastTime = 0;
function animateParticles(currentTime: number) {
  const deltaTime = lastTime ? (currentTime - lastTime) / 1000 : 0;
  lastTime = currentTime;

  createAmbientParticle();
  updateParticles(deltaTime);
  drawParticles();

  particleAnimationId = requestAnimationFrame(animateParticles);
}

function resizeCanvas() {
  if (!canvasRef.value || !inputRef.value) return;

  const canvas = canvasRef.value;
  const input = inputRef.value;
  const rect = input.getBoundingClientRect();
  const padding = 20; // Extra space for glow effect

  canvas.width = rect.width + padding * 2;
  canvas.height = rect.height + padding * 2;
  canvas.style.left = `-${padding}px`;
  canvas.style.top = `-${padding}px`;
}

function drawRotatingBorder() {
  if (!canvasRef.value || !isFocused.value) {
    if (!isFocused.value) {
      animationFrameId = requestAnimationFrame(drawRotatingBorder);
    }
    return;
  }

  const canvas = canvasRef.value;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const padding = 20;

  // Create that buttery smooth gradient 🧈
  const gradient = ctx.createConicGradient(rotation, centerX, centerY);

  // Add vibrant rainbow colors! 🌈
  for (const stop of focusedColors) {
    gradient.addColorStop(stop.pos, stop.color);
  }

  // Draw the border shape
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.roundRect(
    padding - borderWidth,
    padding - borderWidth,
    canvas.width - padding * 2 + borderWidth * 2,
    canvas.height - padding * 2 + borderWidth * 2,
    9999
  );

  // Cut out the inner part (creates border effect!)
  ctx.roundRect(
    padding,
    padding,
    canvas.width - padding * 2,
    canvas.height - padding * 2,
    9999
  );
  ctx.fill("evenodd");

  // Add that FIRE glow effect! 🔥
  ctx.shadowBlur = glowIntensity;
  ctx.shadowColor = "#FF0080";

  // Redraw with glow
  ctx.beginPath();
  ctx.roundRect(
    padding - borderWidth,
    padding - borderWidth,
    canvas.width - padding * 2 + borderWidth * 2,
    canvas.height - padding * 2 + borderWidth * 2,
    9999
  );
  ctx.roundRect(
    padding,
    padding,
    canvas.width - padding * 2,
    canvas.height - padding * 2,
    9999
  );
  ctx.fill("evenodd");

  ctx.restore();

  // Update rotation! 💫
  rotation += rotationSpeed;
  if (rotation > Math.PI * 2) rotation -= Math.PI * 2;

  animationFrameId = requestAnimationFrame(drawRotatingBorder);
}

onMounted(() => {
  resizeCanvas();
  drawRotatingBorder();
  animateParticles(0);
  window.addEventListener("resize", resizeCanvas);
});

onUnmounted(() => {
  window.removeEventListener("resize", resizeCanvas);
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
  }
  if (particleAnimationId !== null) {
    cancelAnimationFrame(particleAnimationId);
  }
});
</script>
