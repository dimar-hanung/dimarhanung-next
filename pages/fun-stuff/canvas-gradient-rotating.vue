<template>
  <div class="canvas-container">
    <canvas
      ref="borderCanvas"
      width="400"
      height="300"
      class="rotating-border-canvas"
    ></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const borderCanvas = ref<HTMLCanvasElement | null>(null);
let animationFrameId: number | null = null;

// Configuration - change these to customize! ✨
const borderWidth = 6;
const rotationSpeed = 0.02; // radians per frame
const colors = ["#FF0080", "#FF8C00", "#40E0D0", "#9D00FF", "#FF0080"];

let rotation = 0;

function drawRotatingBorder() {
  if (!borderCanvas.value) return;

  const canvas = borderCanvas.value;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Create gradient that rotates around center
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  // Create conic gradient manually (so cool fr! 🌈)
  const gradient = ctx.createConicGradient(rotation, centerX, centerY);

  // Add color stops
  colors.forEach((color, i) => {
    gradient.addColorStop(i / (colors.length - 1), color);
  });

  // Draw the border (outer rect with gradient)
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Cut out the inner rectangle (creates border effect!)
  ctx.globalCompositeOperation = "destination-out";
  ctx.fillStyle = "#000";
  ctx.fillRect(
    borderWidth,
    borderWidth,
    canvas.width - borderWidth * 2,
    canvas.height - borderWidth * 2
  );

  // Reset composite operation
  ctx.globalCompositeOperation = "source-over";

  // Draw inner content area
  ctx.fillStyle = "#1a1a1a";
  ctx.fillRect(
    borderWidth,
    borderWidth,
    canvas.width - borderWidth * 2,
    canvas.height - borderWidth * 2
  );

  // Optional: Add some text to show it's working
  ctx.fillStyle = "#fff";
  ctx.font = "24px system-ui";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("✨ Smooth Rotation ✨", centerX, centerY);

  // Update rotation
  rotation += rotationSpeed;

  // Keep rotation between 0 and 2π for performance
  if (rotation > Math.PI * 2) rotation -= Math.PI * 2;

  // Loop the animation
  animationFrameId = requestAnimationFrame(drawRotatingBorder);
}

onMounted(() => {
  // Start the animation! 🚀
  drawRotatingBorder();
});

onUnmounted(() => {
  // Clean up animation frame
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
  }
});
</script>

<style scoped>
.canvas-container {
  margin: 0;
  padding: 50px;
  background: #0a0a0a;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.rotating-border-canvas {
  border-radius: 12px;
  box-shadow: 0 0 50px rgba(255, 0, 255, 0.3);
}
</style>
