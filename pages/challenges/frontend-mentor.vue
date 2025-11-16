<template>
  <div class="flex">
    <div
      v-if="$route.query.preview !== 'full'"
      class="bg-slate-800 text-white justify-between w-full max-w-[280px] hidden xl:flex"
    >
      <div class="w-full min-h-screen h-screen top-0 sticky overflow-auto">
        <div class="p-2">
          <div class="flex justify-between p-4 bg-slate-700 w-full rounded-lg">
            <ClientOnly>
              <NuxtLink to="/"
                ><font-awesome-icon
                  class="text-xl cursor-pointer"
                  :icon="['fa', 'home']"
              /></NuxtLink>
              <NuxtLink :to="{ query: { preview: 'full' } }">
                <font-awesome-icon class="text-xl" :icon="['fa', 'times']" />
              </NuxtLink>
            </ClientOnly>
          </div>
        </div>
        <div class="mt-4 px-2">
          <h3 class="px-3 block p-4 text-slate-300 mt-4 font-bold text-lg">
            <font-awesome-icon class="mr-1" :icon="['fa', 'cloud']" />
            Challenges
          </h3>
          <NuxtLink
            v-for="(challenge, i) in challenges"
            class="sidebar--link px-3 block hover:text-white hover:bg-white hover:bg-opacity-25 p-4 text-slate-300 rounded-lg transition-all"
            :to="challenge.path"
            ><div class="flex place-items-center border-l border-l-slate-500">
              <div class="mr-2"></div>
              <div>{{ challenge.title }}</div>
            </div></NuxtLink
          >
        </div>
      </div>
    </div>
    <div class="w-full">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  key: (route) => route.fullPath,
});

useSeoMeta({
  title: "FrontEnd Mentor (●'◡'●)",
});

const route = useRoute();
const router = useRouter();

const challenges = [
  {
    title: "QR Code",
    path: "/challenges/frontend-mentor/qrcode",
    icon: ["fa", "qrcode"],
  },
  {
    title: "Order Summary",
    path: "/challenges/frontend-mentor/order-summary",
    icon: ["fa", "credit-card"],
  },
  {
    title: "Single Page Developer Portofolio",
    path: "/challenges/frontend-mentor/3-single-page-developer-portofolio",
    icon: ["fa", "photo-video"],
  },
  {
    title: "Result Summary Component",
    path: "/challenges/frontend-mentor/4-result-summary-component",
    icon: ["fa", "pencil-square"],
  },
  {
    title: "Password Generator App",
    path: "/challenges/frontend-mentor/5-password-generator-app",
  },
  {
    title: "Product Preview Card Component",
    path: "/challenges/frontend-mentor/6-product-preview-card-component",
  },
  {
    title: "NFT Preview Card Component",
    path: "/challenges/frontend-mentor/7-nft-preview-card-component",
  },
  {
    title: "Tic Tac Toe Game",
    path: "/challenges/frontend-mentor/8-tic-tac-toe-game",
  },
  {
    title: "Stats Preview Card Component",
    path: "/challenges/frontend-mentor/9-stats-preview-card-component",
  },
  {
    title: "FAQ Accordion Card",
    path: "/challenges/frontend-mentor/10-faq-accordion-card",
  },
  {
    title: "Fylo Data Storage Component",
    path: "/challenges/frontend-mentor/11-fylo-data-storage-component",
  },
  {
    title: "3 Column Preview Card Component",
    path: "/challenges/frontend-mentor/12-3-column-preview-card-component",
  },
  {
    title: "Interactive card details form",
    path: "/challenges/frontend-mentor/13-interactive-card-details-form",
  },
];

// event listener when press "f" key
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "f") {
    const fullScreen = route.query.preview === "full";
    router.push({
      query: {
        ...route.query,
        preview: fullScreen ? undefined : "full",
      },
    });
  }

  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "arrowup") {
    const index = challenges.findIndex((challenge) => {
      return challenge.path === route.path;
    });
    if (index > 0) {
      router.push({
        path: challenges[index - 1].path,
        query: { ...route.query },
      });
    }
  }
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "arrowdown") {
    const index = challenges.findIndex((challenge) => {
      return challenge.path === route.path;
    });
    if (index < challenges.length - 1) {
      router.push({
        path: challenges[index + 1].path,
        query: { ...route.query },
      });
    }
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
  // find index of current route
  const index = challenges.findIndex((challenge) => {
    return challenge.path === route.path;
  });
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});
</script>

<style>
a.sidebar--link.router-link-exact-active {
  color: #facc15;
  background-color: #0f172a;
}
</style>
