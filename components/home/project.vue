<template>
  <div class="container mx-auto">
    <slot name="header"></slot>

    <!-- Filters section -->
    <div v-if="showFilter" class="space-y-4 mb-6 px-3">
      <!-- Tag filters -->

      <!-- Complexity and Contribution filters -->
      <div class="flex flex-col gap-4">
        <div class="space-y-2">
          <p class="text-sm text-neutral-600 dark:text-neutral-300">Tags:</p>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="tag in uniqueTags"
              :key="tag"
              @click="toggleTag(tag)"
              :class="[
                'px-3 py-1.5 rounded-full text-sm transition-colors duration-200',
                selectedTags.includes(tag)
                  ? 'bg-neutral-800 text-white dark:bg-white dark:text-black'
                  : 'bg-gray-200 text-neutral-600 dark:bg-gray-800 dark:text-neutral-300 dark:border-white border hover:bg-neutral-300',
              ]"
            >
              {{ tag }}
            </button>
          </div>
        </div>

        <div class="space-y-2">
          <p class="text-sm text-neutral-600 dark:text-neutral-300">
            Complexity:
          </p>
          <div class="flex gap-2">
            <button
              v-for="level in 5"
              :key="`complexity-${level}`"
              @click="toggleComplexity(level)"
              :class="[
                'px-3 py-1.5 rounded-full text-xs transition-colors duration-200 border',
                selectedComplexity.includes(level)
                  ? getBadgeClass(level)
                  : 'bg-gray-200 text-neutral-600 dark:bg-gray-800 dark:text-neutral-300',
              ]"
            >
              {{ getComplexityLevel(level) }}
            </button>
          </div>
        </div>

        <div class="space-y-2">
          <p class="text-sm text-neutral-600 dark:text-neutral-300">
            Contribution:
          </p>
          <div class="flex gap-2">
            <button
              v-for="level in 5"
              :key="`contribution-${level}`"
              @click="toggleContribution(level)"
              :class="[
                'px-3 py-1.5 rounded-full text-xs transition-colors duration-200 border',
                selectedContribution.includes(level)
                  ? getBadgeClass(level)
                  : 'bg-gray-200 text-neutral-600 dark:bg-gray-800 dark:text-neutral-300',
              ]"
            >
              {{ getContributionLevel(level) }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- No Results Message -->
    <div v-if="filteredProjectsByTags.length === 0" class="text-center py-12">
      <div class="mb-4">
        <svg
          class="w-16 h-16 mx-auto text-neutral-300 dark:text-neutral-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 class="text-lg font-medium text-neutral-600 dark:text-neutral-300">
        No projects found
      </h3>
      <p class="text-neutral-500 dark:text-neutral-400 mt-2">
        Try adjusting your filters
      </p>
      <button
        @click="clearFilters"
        class="mt-4 px-4 py-2 text-sm text-neutral-600 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
      >
        Clear all filters
      </button>
    </div>

    <!-- Projects Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="project in filteredProjectsByTags" :key="project.title">
        <ClientOnly>
          <TransformCardContainer>
            <TransformCardBody
              class="group/card relative size-auto rounded-xl border border-black/[0.1] bg-gray-50 p-6 dark:border-white/[0.2] dark:bg-muted-800 dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]"
            >
              <TransformCardItem
                :translate-z="50"
                class="text-xl font-bold text-neutral-600 dark:text-white"
              >
                {{ project.title }}
              </TransformCardItem>
              <TransformCardItem
                as="p"
                translate-z="60"
                class="mt-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-300"
              >
                {{ project.description }}
              </TransformCardItem>
              <TransformCardItem
                :translate-z="100"
                :rotate-x="20"
                :rotate-z="-10"
                class="mt-4 w-full"
              >
                <NuxtImg
                  :src="project.image"
                  width="512"
                  class="h-60 w-full rounded-xl object-cover group-hover/card:shadow-xl"
                  alt="thumbnail"
                />
                <!-- tags -->
                <div class="flex gap-2 mt-4">
                  <span
                    v-for="tag in project.tags"
                    :key="tag"
                    class="px-2 py-1 bg-gray-200 text-xs rounded-full text-neutral-600 dark:bg-gray-800 dark:text-neutral-300 dark:border-white border"
                  >
                    {{ tag }}
                  </span>
                </div>
              </TransformCardItem>

              <TransformCardItem
                :translate-z="100"
                :rotate-x="20"
                :rotate-z="3"
                class="w-full"
              >
                <!-- contribution and complexity -->
                <div
                  class="mt-8 text-sm text-neutral-500 dark:text-neutral-300 flex justify-between place-items-center"
                >
                  Contribution:
                  <span :class="getBadgeClass(project.contribution)">
                    {{ getContributionLevel(project.contribution) }}
                  </span>
                </div>
                <div
                  class="mt-2 text-sm text-neutral-500 dark:text-neutral-300 flex justify-between place-items-center"
                >
                  Project Complexity:
                  <span :class="getBadgeClass(project.complexity)">
                    {{ getComplexityLevel(project.complexity) }}
                  </span>
                </div>
              </TransformCardItem>

              <div class="mt-20 flex items-center justify-between">
                <TransformCardItem
                  :translate-z="20"
                  :translate-x="-40"
                  as="a"
                  href="https://rahulv.dev"
                  target="__blank"
                  class="rounded-xl px-4 py-2 font-normal dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black cursor-pointer"
                >
                  Visit
                </TransformCardItem>
                <TransformCardItem
                  :translate-z="20"
                  :translate-x="40"
                  as="button"
                  class="rounded-xl bg-black px-4 py-2 text-xs font-bold text-white dark:bg-white dark:text-black"
                >
                  Detail
                </TransformCardItem>
              </div>
            </TransformCardBody>
          </TransformCardContainer>
        </ClientOnly>
      </div>
    </div>
    <div class="w-full mt-24" v-if="!showAll">
      <NuxtLink to="/project">
        <gradient-button class="block mx-auto">
          Lihat {{ projects.length - 3 }} Lainnya
        </gradient-button>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const projects = [
  {
    title: "Student Record System (SRS)",
    description:
      "Adalah sebuah aplikasi berbasis web yang digunakan untuk mengelola data mahasiswa.",
    image: "/home/project/srs.png",
    link: "https://example.com",
    tags: ["Full-Stack", "Vue", "TailwindCSS"],
    contribution: 5,
    complexity: 5,
  },
  {
    title: "Sistem Informasi Akademik (SIA)",
    description:
      "Adalah sebuah aplikasi berbasis web yang digunakan untuk mengelola data akademik.",
    image: "/home/project/sia.png",
    link: "https://example.com",
    tags: ["Full-Stack", "Vue", "Nest.js"],
    contribution: 5,
    complexity: 5,
  },
  {
    title: "My UT",
    description:
      "Adalah sebuah aplikasi berbasis web yang digunakan untuk mengelola data akademik.",
    image: "/home/project/myut.png",
    link: "https://example.com",
    tags: ["Full-Stack", "Vue", "Nest.js"],
    contribution: 5,
    complexity: 5,
  },
  {
    title: "App UT (Portal)",
    description:
      "Adalah sebuah aplikasi berbasis mobile yang digunakan untuk mengelola data karyawan.",
    image: "/home/project/apput.png",
    link: "https://example.com",
    tags: ["Front-End", "Vue"],
    contribution: 5,
    complexity: 2,
  },
  {
    title: "Sistem Survey Pelanggan (Si Supel)",
    description:
      "Adalah sebuah aplikasi berbasis web yang digunakan untuk mengelola data survey pelanggan.",
    image: "/home/project/sisupel.png",
    link: "https://example.com",
    tags: ["Front-End", "Vue", "TailwindCSS"],
    contribution: 5,
    complexity: 4,
  },
  {
    title: "Human Resource Information System (HRIS)",
    description:
      "Adalah sebuah aplikasi berbasis mobile yang digunakan untuk mengelola data karyawan.",
    image: "/home/project/hris.png",
    link: "https://example.com",
    tags: ["Full-Stack", "Vue"],
    contribution: 3,
    complexity: 5,
  },
  {
    title: "AI Tutor E-Learning",
    description:
      "Adalah sebuah aplikasi berbasis mobile yang digunakan untuk mengelola data karyawan.",
    image: "/home/project/aitutor.png",
    link: "https://example.com",
    tags: ["Full-Stack", "Vue"],
    contribution: 5,
    complexity: 5,
  },
];

interface Props {
  showAll: boolean;
  showFilter: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showAll: false,
  showFilter: false,
});

// Get unique tags from all projects
const uniqueTags = computed(() => {
  const tags = new Set<string>();
  projects.forEach((project) => {
    project.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags);
});

// Filter states
const selectedTags = ref<string[]>([]);
const selectedComplexity = ref<number[]>([]);
const selectedContribution = ref<number[]>([]);

// Toggle functions
function toggleTag(tag: string) {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter((t) => t !== tag);
  } else {
    selectedTags.value.push(tag);
  }
}

function toggleComplexity(level: number) {
  if (selectedComplexity.value.includes(level)) {
    selectedComplexity.value = selectedComplexity.value.filter(
      (l) => l !== level
    );
  } else {
    selectedComplexity.value.push(level);
  }
}

function toggleContribution(level: number) {
  if (selectedContribution.value.includes(level)) {
    selectedContribution.value = selectedContribution.value.filter(
      (l) => l !== level
    );
  } else {
    selectedContribution.value.push(level);
  }
}

// Updated filtered projects computation
const filteredProjectsByTags = computed(() => {
  let filtered = projects;

  // Filter by selected tags
  if (selectedTags.value.length > 0) {
    filtered = filtered.filter((project) =>
      project.tags.some((tag) => selectedTags.value.includes(tag))
    );
  }

  // Filter by complexity
  if (selectedComplexity.value.length > 0) {
    filtered = filtered.filter((project) =>
      selectedComplexity.value.includes(project.complexity)
    );
  }

  // Filter by contribution
  if (selectedContribution.value.length > 0) {
    filtered = filtered.filter((project) =>
      selectedContribution.value.includes(project.contribution)
    );
  }

  // Apply showAll filter
  return props.showAll ? filtered : filtered.slice(0, 3);
});

function getContributionLevel(level: number): string {
  const levels = ["Very Low", "Low", "Medium", "High", "Very High"];
  return levels[level - 1];
}

function getComplexityLevel(level: number): string {
  const levels = ["Very Low", "Low", "Medium", "High", "Very High"];
  return levels[level - 1];
}

// Updated badge classes with better colors
function getBadgeClass(level: number): string {
  const classes = [
    "border-red-500 text-red-500 bg-red-50 dark:bg-red-500/10",
    "border-yellow-500 text-yellow-500 bg-yellow-50 dark:bg-yellow-500/10",
    "border-green-500 text-green-500 bg-green-50 dark:bg-green-500/10",
    "border-blue-500 text-blue-500 bg-blue-50 dark:bg-blue-500/10",
    "border-purple-500 text-purple-500 bg-purple-50 dark:bg-purple-500/10",
  ];
  return `px-2 py-1 rounded-full border ${classes[level - 1]}`;
}

// Add clear filters function
function clearFilters() {
  selectedTags.value = [];
  selectedComplexity.value = [];
  selectedContribution.value = [];
}
</script>
