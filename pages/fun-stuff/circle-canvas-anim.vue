<template>
  <div>
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const canvasRef = ref<HTMLCanvasElement | null>(null);

interface Circle {
  x: number;
  y: number;
  radius: number;
  color: string;
  blurRadius: number;
  speed: number;
}

const circles: Circle[] = [];

const createCircle = (): Circle => {
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;
  const radius = Math.random() * 20 + 10;
  const color = `hsla(${Math.random() * 360}, 100%, 50%,1)`;
  const blurRadius = Math.random() * 50 + 10;
  const speed = Math.random() * 2 + 0.5;
  return { x, y, radius, color, blurRadius, speed };
};

const animate = () => {
  if (!canvasRef.value) return;

  const ctx = canvasRef.value.getContext("2d");
  if (!ctx) return;

  // ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);

  circles.forEach((circle) => {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);

    const gradient = ctx.createRadialGradient(
      circle.x,
      circle.y,
      0,
      circle.x,
      circle.y,
      circle.radius * 0.9
    );
    // const blurRadius = 1;
    gradient.addColorStop(0, circle.color);
    // gradient.addColorStop(blurRadius, "rgba(255, 255, 255, 0)");

    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

    ctx.fillStyle = circle.color;
    ctx.shadowColor = circle.color;
    ctx.shadowBlur = circle.blurRadius;
    ctx.strokeStyle = "black";

    ctx.fill();
    circle.radius += circle.speed;
    circle.blurRadius += circle.speed * 2;
    if (circle.radius > 500) {
      const index = circles.indexOf(circle);
      circles.splice(index, 1);
    }
  });

  if (circles.length < 10) {
    circles.push(createCircle());
  }

  requestAnimationFrame(animate);
};

onMounted(() => {
  if (canvasRef.value) {
    canvasRef.value.width = window.innerWidth;
    canvasRef.value.height = window.innerHeight;
    animate();
  }
});
</script>

<style scoped>
canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
