<template>
  <div><canvas id="myCanvas" width="500" height="500"></canvas></div>
</template>

<script setup lang="ts">
onMounted(() => {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  // Set the circle properties
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 100;

  // Create a radial gradient
  const gradient = ctx.createRadialGradient(
    centerX,
    centerY,
    0,
    centerX,
    centerY,
    radius
  );
  gradient.addColorStop(0, "rgba(0, 0, 255, 1)"); // Solid blue color at the center
  gradient.addColorStop(1, "rgba(0, 0, 255, 0)"); // Transparent blue color at the edge

  // Draw the circle
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.fillStyle = gradient;
  ctx.fill();
});
</script>
