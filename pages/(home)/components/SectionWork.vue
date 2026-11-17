<template>
  <section id="work" aria-labelledby="work-heading" class="scroll-mt-16 py-[72px] md:py-[100px]">
    <div class="mx-auto max-w-7xl px-5 sm:px-6">
      <div class="mb-[26px] flex flex-wrap items-end justify-between gap-6 sm:mb-10">
        <div>
          <h2 id="work-heading" class="section-title">{{ t.work.title }}</h2>
          <p class="section-sub">{{ t.work.sub }}</p>
        </div>

        <div role="group" :aria-label="t.work.filterLabel" class="flex flex-wrap gap-[22px]">
          <button
            v-for="filter in filters"
            :key="filter"
            type="button"
            :aria-pressed="activeFilter === filter"
            :class="[
              'h-9 border-b-2 px-0.5 text-[0.9375rem] font-medium transition-colors duration-150',
              activeFilter === filter
                ? 'border-primary-600 text-muted-900 dark:border-primary-400 dark:text-white'
                : 'border-transparent text-muted-500 hover:text-muted-900 dark:text-muted-400 dark:hover:text-white',
            ]"
            @click="activeFilter = filter"
          >
            {{ t.work.filters[filter] }}
          </button>
        </div>
      </div>

      <ul class="grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
        <li
          v-for="project in visibleProjects"
          :key="project.title"
          class="work-card flex flex-col overflow-hidden rounded-[18px] border border-muted-200 bg-white dark:border-muted-700 dark:bg-muted-800"
        >
          <div class="aspect-[16/10] overflow-hidden border-b border-muted-200 bg-muted-200 dark:border-muted-700 dark:bg-muted-700">
            <NuxtImg
              :src="project.image"
              width="800"
              format="webp"
              loading="lazy"
              :alt="t.work.screenshotAlt(project.home.title)"
              class="work-thumb block h-full w-full object-cover object-top"
            />
          </div>

          <div class="flex flex-1 flex-col gap-2.5 px-[22px] pt-5 pb-[22px]">
            <h3 class="text-xl font-bold">{{ project.home.title }}</h3>
            <a
              v-if="project.link && project.home.showLink"
              :href="project.link"
              target="_blank"
              rel="noopener noreferrer"
              class="-mt-1 inline-flex w-fit items-center gap-1 text-sm text-muted-500 transition-colors hover:text-primary-600 dark:text-muted-400 dark:hover:text-primary-400"
            >
              {{ domainOf(project.link) }}
              <Icon name="mdi:arrow-top-right" aria-hidden="true" />
            </a>
            <p class="text-[0.9375rem] leading-normal text-muted-600 dark:text-muted-300">
              {{ project.home.description[locale] }}
            </p>
            <p class="text-[0.84375rem] text-muted-500 dark:text-muted-400">
              {{ project.home.role }}
            </p>

            <div
              v-if="project.detailPath"
              class="mt-auto border-t border-muted-200 pt-3.5 text-sm dark:border-muted-700"
            >
              <NuxtLink
                :to="project.detailPath"
                class="case-link inline-flex items-center gap-1 font-semibold text-primary-600 dark:text-primary-400"
              >
                {{ t.work.caseStudy }}
                <span class="sr-only">: {{ project.home.title }}</span>
                <Icon name="mdi:arrow-right" class="case-arrow text-base" aria-hidden="true" />
              </NuxtLink>
            </div>
          </div>
        </li>
      </ul>

      <div class="mt-9 flex justify-center">
        <NuxtLink to="/project" class="text-link inline-flex items-center gap-1.5 font-medium">
          {{ t.work.seeAll }}
          <Icon name="mdi:arrow-right" class="text-lg" aria-hidden="true" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { projects, type Project, type WorkCategory } from "~/data/projects";

const { locale, t } = useHomeI18n();

type HomeProject = Project & { home: NonNullable<Project["home"]> };
type Filter = "all" | WorkCategory;

const filters: Filter[] = ["all", "fullstack", "frontend", "backend", "ai"];
const activeFilter = ref<Filter>("all");

const homeProjects = projects
  .filter((project): project is HomeProject => project.home != null)
  .sort((a, b) => a.home.order - b.home.order);

const visibleProjects = computed(() => {
  if (activeFilter.value === "all") return homeProjects;
  const filter = activeFilter.value;
  return homeProjects.filter((project) => project.home.categories.includes(filter));
});

function domainOf(url: string) {
  return new URL(url).hostname;
}
</script>

<style scoped>
.work-card {
  transition:
    transform 200ms ease-out,
    box-shadow 200ms ease-out,
    border-color 200ms ease-out;
}

.work-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 22px 40px -24px rgb(15 23 42 / 0.45);
  border-color: var(--app-primary-300);
}

.work-thumb {
  transition: transform 400ms ease-out;
}

.work-card:hover .work-thumb {
  transform: scale(1.03);
}

.case-arrow {
  transition: transform 150ms ease-out;
}

.work-card:hover .case-arrow {
  transform: translateX(3px);
}

@media (prefers-reduced-motion: reduce) {
  .work-card:hover,
  .work-card:hover .work-thumb,
  .work-card:hover .case-arrow {
    transform: none;
  }
}
</style>
