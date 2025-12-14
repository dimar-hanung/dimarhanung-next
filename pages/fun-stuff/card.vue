<template>
  <div class="min-h-screen grid place-items-center">
    <main
      class="relative w-96 h-60 border border-gray-300 shadow-sm rounded-xl bg-gradient-to-bl bg-slate-400"
    >
      <div
        class="decorator --1 bg-white/25 rounded-full -translate-x-1/2 -translate-y-1/2"
      ></div>
      <div
        class="decorator --2 bg-white/25 rounded-full translate-x-1/2 translate-y-1/2"
      ></div>
    </main>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.card {
  background: linear-gradient(to bottom right, #ffcbad, #a1e1ff);
}
.decorator {
  width: 20rem;
  height: 20rem;

  position: absolute;
}

.decorator.--1 {
  top: 0;
  left: 0;
}

.decorator.--2 {
  bottom: 0;
  right: 0;
}
</style>
