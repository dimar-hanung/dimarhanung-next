<template>
  <div
    ref="quoteWrapper"
    class="text-5xl text-center mt-24 h-screen grid place-items-center relative rounded-3xl"
  >
    <div>
      <p ref="quoteContent" class="py-24 relative w-full">
        Sekecil apapun progress, itu adalah progress.
      </p>
      <div class="flex gap-2 justify-center place-items-center">
        <div class="rounded-full h-2 w-12 bg-red-500"></div>
        <div class="rounded-full h-2 w-12 bg-green-500"></div>
        <div class="rounded-full h-2 w-12 bg-blue-500"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
