<template>
  <div class="container mx-auto pb-32">
    <h2 class="text-2xl font-bold p-4">Project</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="project in projects" :key="project.title">
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
    <!-- Lihat Lainnya -->
    <div class="w-full mt-24">
      <NuxtLink to="/project">
        <gradient-button class="block mx-auto"
          >Lihat 30 Lainnya</gradient-button
        >
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

function getContributionLevel(level: number): string {
  const levels = ["Very Low", "Low", "Medium", "High", "Very High"];
  return levels[level - 1];
}

function getComplexityLevel(level: number): string {
  const levels = ["Very Low", "Low", "Medium", "High", "Very High"];
  return levels[level - 1];
}

function getBadgeClass(level: number): string {
  const classes = [
    "border-red-500 text-red-500",
    "border-yellow-500 text-yellow-500",
    "border-green-500 text-green-500",
    "border-blue-500 text-blue-500",
    "border-purple-500 text-purple-500",
  ];
  return `px-2 py-1 rounded-full border ${classes[level - 1]}`;
}
</script>
