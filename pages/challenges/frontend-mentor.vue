<template>
  <div class="flex h-screen overflow-hidden bg-[#0f172a]">
    <div
      v-if="$route.query.preview !== 'full'"
      class="bg-[#0B1120] border-r border-white/5 text-slate-400 w-full max-w-[300px] hidden xl:flex flex-col h-full"
    >
      <!-- Header -->
      <div
        class="p-5 flex items-center justify-between border-b border-white/5 shrink-0"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-500"
          >
            <font-awesome-icon :icon="['fa', 'cloud']" />
          </div>
          <h3 class="font-bold text-slate-100 tracking-wide">Challenges</h3>
        </div>
        <ClientOnly>
          <div class="flex gap-1">
            <NuxtLink
              to="/"
              class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 hover:text-white transition-colors"
              title="Back to Home"
            >
              <font-awesome-icon :icon="['fa', 'home']" class="text-sm" />
            </NuxtLink>
            <NuxtLink
              :to="{ query: { preview: 'full' } }"
              class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 hover:text-white transition-colors"
              title="Close Sidebar"
            >
              <font-awesome-icon :icon="['fa', 'times']" class="text-sm" />
            </NuxtLink>
          </div>
        </ClientOnly>
      </div>

      <!-- List -->
      <div class="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
        <NuxtLink
          v-for="(challenge, i) in challenges"
          :key="challenge.path"
          class="sidebar--link group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 hover:bg-white/5 hover:text-slate-100"
          :to="challenge.path"
        >
          <span
            class="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-yellow-500 transition-colors shrink-0"
          ></span>
          <span class="text-sm font-medium truncate">{{
            challenge.title
          }}</span>
        </NuxtLink>
      </div>
    </div>
    <div class="w-full h-full overflow-auto bg-[#0f172a]">
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

<style scoped>
/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* Active Link Styles */
a.sidebar--link.router-link-exact-active {
  background-color: rgba(255, 255, 255, 0.08);
  color: #fff;
}

a.sidebar--link.router-link-exact-active span:first-child {
  background-color: #eab308;
  box-shadow: 0 0 8px rgba(234, 179, 8, 0.5);
}
</style>
