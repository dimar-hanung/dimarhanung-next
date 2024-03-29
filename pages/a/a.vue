<template>
  <canvas class="bg-black" ref="canvas" @mousemove="updateWind"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const canvas = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
let animationFrameId: number;

const numSnowflakes = 100;
const numClouds = 5;
const snowflakes: Snowflake[] = [];
const clouds: Cloud[] = [];
let wind = { x: 0, y: 0 };

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  speed: number;
}

interface Cloud {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
}

function createSnowflake(): Snowflake {
  const spawnFromLeft = Math.random() < 0.5;

  const x = spawnFromLeft
    ? Math.random() * window.innerWidth * -0.2
    : Math.random() * window.innerWidth * 1.2;

  const y = Math.random() * window.innerHeight;

  return {
    x,
    y,
    radius: Math.random() * 3 + 1,
    speed: Math.random() * 1 + 0.5,
  };
}

function createCloud(): Cloud {
  return {
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight * 0.5,
    width: Math.random() * 200 + 100,
    height: Math.random() * 50 + 30,
    speed: Math.random() * 0.5 + 0.2,
  };
}

function updateSnowflakes() {
  ctx!.clearRect(0, 0, window.innerWidth, window.innerHeight);

  // Draw clouds
  clouds.forEach((cloud) => {
    ctx!.beginPath();
    ctx!.ellipse(
      cloud.x,
      cloud.y,
      cloud.width,
      cloud.height,
      0,
      0,
      Math.PI * 2
    );
    ctx!.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx!.fill();
    ctx!.closePath();

    cloud.x += cloud.speed;

    if (cloud.x > window.innerWidth) {
      cloud.x = -cloud.width;
    }
  });

  // Draw snowflakes
  snowflakes.forEach((snowflake) => {
    ctx!.beginPath();
    ctx!.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2);
    ctx!.fillStyle = "white";
    ctx!.fill();
    ctx!.closePath();

    snowflake.x += wind.x;
    snowflake.y += wind.y + snowflake.speed;

    if (
      snowflake.y > window.innerHeight ||
      snowflake.x < 0 ||
      snowflake.x > window.innerWidth
    ) {
      const index = snowflakes.indexOf(snowflake);
      snowflakes.splice(index, 1);
      snowflakes.push(createSnowflake());
    }
  });

  animationFrameId = requestAnimationFrame(updateSnowflakes);
}

function updateWind(event: MouseEvent) {
  const rect = canvas.value!.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  wind.x = (mouseX - window.innerWidth / 2) / 100;
  wind.y = (mouseY - window.innerHeight / 2) / 100;
}

onMounted(() => {
  ctx = canvas.value?.getContext("2d") || null;

  if (ctx) {
    canvas.value!.width = window.innerWidth;
    canvas.value!.height = window.innerHeight;

    for (let i = 0; i < numSnowflakes; i++) {
      snowflakes.push(createSnowflake());
    }

    for (let i = 0; i < numClouds; i++) {
      clouds.push(createCloud());
    }

    animationFrameId = requestAnimationFrame(updateSnowflakes);
  }
});

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId);
});
</script>

<style scoped>
canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
}
</style>
