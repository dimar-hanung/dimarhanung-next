<template>
  <div
    ref="quoteWrapper"
    class="text-3xl text-center mt-24 h-screen grid place-items-center relative rounded-3xl"
  >
    <div>
      <p
        ref="quoteContent"
        class="gradient-text py-24 relative w-full max-w-4xl mx-auto"
      >
        When it feels like you've hit your limit, that's the moment you need to
        push harder!
      </p>
      <div class="flex gap-2 justify-center place-items-center">
        <div class="rounded-full h-2 w-12 bg-red-500"></div>
        <div class="rounded-full h-2 w-12 bg-green-500"></div>
        <div class="rounded-full h-2 w-12 bg-blue-500"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Add any reactive logic here if needed
</script>

<style scoped>
.gradient-text {
  background: linear-gradient(
    270deg,
    /* Changed to 270deg for right-to-left direction */ #3b82f6,
    /* Blue */ #4171ed,
    /* Blue-Purple */ #6934c9,
    /* Purple */ #8828b4,
    /* Pink-Purple */ #ef4444,
    /* Red */ #3b82f6 /* Back to Blue */
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  background-size: 300% 100%;
  animation: gradient 8s linear infinite;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@keyframes gradient {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: -200% 50%; /* Move beyond the left edge */
  }
}

.gradient-text {
  transition: all 0.3s ease-in-out;
}

.gradient-text:hover {
  text-shadow: 0 0 10px rgba(59, 130, 246, 0.2),
    0 0 20px rgba(104, 52, 201, 0.2);
}

@media (max-width: 768px) {
  .gradient-text {
    background-size: 400% 100%;
  }
}
</style>
