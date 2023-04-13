<template>
  <div
    v-if="$route.query.preview !== 'full'"
    class="p-4 bg-slate-800 text-white flex justify-between"
  >
    <div class="flex">
      <ClientOnly>
        <NuxtLink to="/"
          ><font-awesome-icon
            class="text-xl text-yellow-500 cursor-pointer"
            :icon="['fa', 'home']"
        /></NuxtLink>
      </ClientOnly>
      <NuxtLink
        class="ml-8 px-3 hover:text-yellow-500"
        to="/chellanges/frontend-mentor/qrcode"
        ><div>1</div></NuxtLink
      >

      <NuxtLink
        class="px-3 hover:text-yellow-500"
        to="/chellanges/frontend-mentor/order-summary"
        ><div>2</div></NuxtLink
      >

      <NuxtLink
        class="px-3 hover:text-yellow-500"
        to="/chellanges/frontend-mentor/3-single-page-developer-portofolio"
        ><div>3</div></NuxtLink
      >
    </div>
    <ClientOnly
      ><NuxtLink :to="{ query: { preview: 'full' } }">
        <font-awesome-icon :icon="['fa', 'times']" /> </NuxtLink
    ></ClientOnly>
  </div>
  <NuxtPage />
</template>

<script setup lang="ts">
definePageMeta({
  key: (route) => route.fullPath,
});

useSeoMeta({
  title: "FrontEnd Mentor (●'◡'●)",
});
</script>
