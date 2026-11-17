<template>
  <section id="work" data-part="work" aria-labelledby="work-heading" class="scroll-mt-16 py-(--section-y)">
    <div class="mx-auto max-w-7xl px-5 sm:px-6">
      <div data-part="work-head" class="mb-[26px] flex flex-wrap items-end justify-between gap-6 sm:mb-10">
        <div>
          <h2 id="work-heading" data-part="section-title" class="section-title">{{ t.work.title }}</h2>
          <p data-part="section-sub" class="section-sub">{{ t.work.sub }}</p>
        </div>

        <div data-part="work-filters" role="group" :aria-label="t.work.filterLabel" class="flex flex-wrap gap-[22px]">
          <button
            v-for="filter in filters"
            :key="filter"
            type="button"
            data-part="work-filter"
            :aria-pressed="activeFilter === filter"
            class="h-9 px-0.5 text-[0.9375rem] font-medium"
            @click="activeFilter = filter"
          >
            {{ t.work.filters[filter] }}
          </button>
        </div>
      </div>

      <ul data-part="work-list" class="grid grid-cols-1 gap-(--gap) sm:grid-cols-2 lg:grid-cols-3">
        <li
          v-for="project in visibleProjects"
          :key="project.title"
          data-part="work-card"
          class="flex flex-col overflow-hidden"
        >
          <div data-part="work-media" class="aspect-[16/10] overflow-hidden">
            <NuxtImg
              data-part="work-image"
              :src="project.image"
              width="800"
              format="webp"
              loading="lazy"
              :alt="t.work.screenshotAlt(project.home.title)"
              class="block h-full w-full object-cover object-top"
            />
          </div>

          <div data-part="work-body" class="flex flex-1 flex-col gap-2.5 px-[22px] pt-5 pb-[22px]">
            <h3 data-part="work-card-title" class="text-xl font-bold">{{ project.home.title }}</h3>
            <a
              v-if="project.link && project.home.showLink"
              data-part="work-link"
              :href="project.link"
              target="_blank"
              rel="noopener noreferrer"
              class="-mt-1 inline-flex w-fit items-center gap-1 text-sm"
            >
              {{ domainOf(project.link) }}
              <Icon name="mdi:arrow-top-right" aria-hidden="true" />
            </a>
            <p data-part="work-desc" class="text-[0.9375rem] leading-normal">
              {{ project.home.description[locale] }}
            </p>
            <p data-part="work-role" class="text-[0.84375rem]">
              {{ project.home.role }}
            </p>

            <div v-if="project.detailPath" data-part="work-footer" class="mt-auto pt-3.5 text-sm">
              <NuxtLink
                data-part="work-case-link"
                :to="project.detailPath"
                class="inline-flex items-center gap-1 font-semibold"
              >
                {{ t.work.caseStudy }}
                <span class="sr-only">: {{ project.home.title }}</span>
                <Icon name="mdi:arrow-right" data-part="work-case-arrow" class="text-base" aria-hidden="true" />
              </NuxtLink>
            </div>
          </div>
        </li>
      </ul>

      <div class="mt-9 flex justify-center">
        <NuxtLink to="/project" data-part="work-see-all" class="text-link inline-flex items-center gap-1.5 font-medium">
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
