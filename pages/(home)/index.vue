<template>
  <div
    class="portofolio-container bg-muted-200 dark:bg-muted-900 pb-4 min-h-screen transition-all dark:text-white"
  >
    <t-nav overlay class="relative z-50"></t-nav>

    <div class="py-28 border-b border-gray-200 bg-white relative overflow-hidden">
      <HeroGrid />

      <header class="flex flex-wrap container mx-auto relative z-10">
        <div class="w-1/2 grow p-2 min-w-[230px]">
          <section>
            <grid-background class="h-96 py-12 flex items-center">
              <HeroDraggable data-grid-hole class="w-fit">
                <p class="mb-2 text-base font-medium text-indigo-600 dark:text-indigo-400">
                  Software Engineer · 6+ years
                </p>
                <h1 class="mt-4 text-5xl font-bold text-gray-900 dark:text-white">
                  Dimar <span class="text-indigo-600 dark:text-indigo-400">Hanung</span>
                </h1>
                <p class="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-md">
                  I build fast with AI, and it holds up. Speed comes from vibe coding; stability comes from 6+ years of shipping software professionally.
                </p>
                <div class="mt-6 flex flex-wrap gap-3">
                  <a href="https://github.com/dimar-hanung" target="_blank" class="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
                    <Icon name="uil:github" class="text-xl" />
                    GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/dimar-hanung/" target="_blank" class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    <Icon name="uil:linkedin" class="text-xl" />
                    LinkedIn
                  </a>
                  <a href="mailto:dimarhanung@gmail.com" class="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:border-indigo-500 hover:text-indigo-600 dark:hover:border-indigo-400 dark:hover:text-indigo-400 transition-colors">
                    <Icon name="uil:envelope" class="text-xl" />
                    Email
                  </a>
                </div>
                <div class="mt-6 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span class="flex items-center gap-1">
                    <Icon name="uil:map-marker" class="text-lg" />
                    Tangerang Selatan, Indonesia
                  </span>
                  <span class="flex items-center gap-1">
                    <Icon name="uil:briefcase" class="text-lg" />
                    Universitas Terbuka
                  </span>
                </div>
              </HeroDraggable>
            </grid-background>
          </section>
        </div>
        <HeroDraggable class="w-1/2 grow p-2 md:p-0 min-w-[230px]">
          <CardParallax />
        </HeroDraggable>
      </header>
    </div>

    <div class="container mx-auto pb-8">
      <div>
        <main class="mt-28">
          <section class="p-2">
            <h2 class="text-xl font-bold mb-4">Challenge Me</h2>

            <div class="gap-2 grid grid-cols-1 lg:grid-cols-3">
              <CardChallenge
                logo="/home/icon/sololearn.png"
                title="Solo Learn"
                description="Solo Learn is an online platform to learn to code and challenge your friends."
                :badges="['🏆 Level 11']"
                url="https://www.sololearn.com/profile/12709774"
              />
              <CardChallenge
                logo="/home/icon/codewars.svg"
                title="Code Wars"
                description="Code Wars is a community where developers can improve their skills by training with others on real code challenges."
                :badges="['🏆 3 Kyu', '⭐ 1400+ Honor']"
                url="https://www.codewars.com/users/dimar-hanung"
              />
              <CardChallenge
                logo="/home/icon/github.png"
                title="Github"
                description="GitHub is where people build software. More than 56 million people use GitHub to discover, fork, and contribute to over 200 million projects."
                :badges="['🏆 30+ Repository']"
                url="https://github.com/dimar-hanung"
              />
            </div>
          </section>
          <section
            class="grid grid-cols-1 lg:grid-cols-2 gap-4 py-12 px-2 min-w-[230px]"
          >
            <div>
              <h2 class="text-xl font-bold mb-4">Portofolio</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                <NuxtLink to="/certificates/gallery" class="portfolio-link">
                  <t-card-cool class="h-full cursor-pointer">
                    <div class="flex items-center gap-1 text-sm text-muted-500 dark:text-muted-400">
                      <Icon name="mdi:certificate-outline" class="text-base" />
                      Achievements
                    </div>
                    <div class="flex w-full justify-between place-items-center mt-2">
                      <div class="flex gap-2 place-items-center font-semibold">
                        Certificate
                      </div>
                      <div class="flex place-items-center gap-2">
                        <span class="text-2xl font-bold">12+</span>
                        <Icon class="text-2xl portfolio-icon transition-transform" name="mdi:arrow-right" />
                      </div>
                    </div>
                  </t-card-cool>
                </NuxtLink>
                <NuxtLink to="/project" class="portfolio-link">
                  <t-card-cool class="h-full cursor-pointer">
                    <div class="flex items-center gap-1 text-sm text-muted-500 dark:text-muted-400">
                      <Icon name="mdi:briefcase-outline" class="text-base" />
                      Work & Personal
                    </div>
                    <div class="flex w-full justify-between place-items-center mt-2">
                      <div class="flex gap-2 place-items-center font-semibold">
                        Project
                      </div>
                      <div class="flex place-items-center gap-2">
                        <span class="text-2xl font-bold">15+</span>
                        <Icon class="text-2xl portfolio-icon transition-transform" name="mdi:arrow-right" />
                      </div>
                    </div>
                  </t-card-cool>
                </NuxtLink>
                <NuxtLink to="/challenges/ui-general" class="portfolio-link">
                  <t-card-cool class="h-full cursor-pointer">
                    <div class="flex items-center gap-1 text-sm text-muted-500 dark:text-muted-400">
                      <Icon name="mdi:target" class="text-base" />
                      Challenges
                    </div>
                    <div class="flex w-full justify-between place-items-center mt-2">
                      <div class="flex gap-2 place-items-center font-semibold">
                        UI Challenges
                      </div>
                      <div class="flex place-items-center gap-2">
                        <span class="text-2xl font-bold">10+</span>
                        <Icon class="text-2xl portfolio-icon transition-transform" name="mdi:arrow-right" />
                      </div>
                    </div>
                  </t-card-cool>
                </NuxtLink>
                <t-card-cool class="h-full">
                  <div class="flex items-center gap-1 text-sm text-muted-500 dark:text-muted-400">
                    <Icon name="mdi:flask-outline" class="text-base" />
                    Experiments
                  </div>
                  <div class="flex w-full justify-between place-items-center mt-2">
                    <div class="flex gap-2 place-items-center font-semibold">
                      Fun Stuff
                    </div>
                    <span class="text-2xl font-bold">10+</span>
                  </div>
                </t-card-cool>
              </div>
            </div>
            <div>
              <h2 class="text-xl font-bold mb-4">Find Me</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                <a
                  href="https://www.linkedin.com/in/dimar-hanung/"
                  target="_blank"
                  class="find-me-link"
                >
                  <t-card-cool class="h-full cursor-pointer">
                    <div class="text-sm text-muted-500 dark:text-muted-400">Become my relation</div>
                    <div class="flex w-full justify-between place-items-center mt-2">
                      <div class="flex gap-2 place-items-center font-semibold">
                        <Icon
                          name="uil:linkedin"
                          class="text-3xl text-blue-600"
                        />
                        LinkedIn
                      </div>
                      <Icon class="text-2xl find-me-icon transition-transform" name="mdi:arrow-top-right" />
                    </div>
                  </t-card-cool>
                </a>
                <a href="https://www.instagram.com/dmr_hanung/" target="_blank" class="find-me-link">
                  <t-card-cool class="h-full cursor-pointer">
                    <div class="text-sm text-muted-500 dark:text-muted-400">Story</div>
                    <div class="flex w-full justify-between place-items-center mt-2">
                      <div class="flex gap-2 place-items-center font-semibold">
                        <Icon
                          name="uil:instagram"
                          class="text-3xl text-pink-500"
                        />
                        Instagram
                      </div>
                      <Icon class="text-2xl find-me-icon transition-transform" name="mdi:arrow-top-right" />
                    </div>
                  </t-card-cool>
                </a>
                <a href="https://twitter.com/dimarhanung" target="_blank" class="find-me-link">
                  <t-card-cool class="h-full cursor-pointer">
                    <div class="text-sm text-muted-500 dark:text-muted-400">Just my daily note</div>
                    <div class="flex w-full justify-between place-items-center mt-2">
                      <div class="flex gap-2 place-items-center font-semibold">
                        <Icon
                          name="uil:twitter"
                          class="text-3xl text-blue-400"
                        />
                        Twitter
                      </div>
                      <Icon class="text-2xl find-me-icon transition-transform" name="mdi:arrow-top-right" />
                    </div>
                  </t-card-cool>
                </a>
                <a
                  href="https://api.whatsapp.com/send?phone=6287837092992&text=%20"
                  target="_blank"
                  class="find-me-link"
                >
                  <t-card-cool class="h-full cursor-pointer">
                    <div class="text-sm text-muted-500 dark:text-muted-400">Be my friend / Collab</div>
                    <div class="flex w-full justify-between place-items-center mt-2">
                      <div class="flex gap-2 place-items-center font-semibold">
                        <Icon
                          name="uil:whatsapp"
                          class="text-3xl text-green-500"
                        />
                        WhatsApp
                      </div>
                      <Icon class="text-2xl find-me-icon transition-transform" name="mdi:arrow-top-right" />
                    </div>
                  </t-card-cool>
                </a>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
    <!-- <SectionApaKataOrang /> -->

    <SectionHowIWork class="mt-16" />

    <div class="mt-28">
      <SectionProject />
    </div>
    <SectionMotivasi />
    <SectionStack class="mt-16" />
    <SectionFooter class="mt-24" />
  </div>
</template>

<script setup lang="ts">
import HeroGrid from "./components/HeroGrid.vue";
import HeroDraggable from "./components/HeroDraggable.vue";

const CardChallenge = defineAsyncComponent(
  () => import("./components/CardChallenge.vue")
);
const CardHover = defineAsyncComponent(
  () => import("./components/CardHover.vue")
);
const CardParallax = defineAsyncComponent(
  () => import("./components/CardParallax.vue")
);
const SectionStack = defineAsyncComponent(
  () => import("./components/SectionStack.vue")
);

const SectionHowIWork = defineAsyncComponent(
  () => import("./components/SectionHowIWork.vue")
);

const SectionProject = defineAsyncComponent(
  () => import("./components/SectionProject.vue")
);

const SectionMotivasi = defineAsyncComponent(
  () => import("./components/SectionMotivasi.vue")
);
const SectionFooter = defineAsyncComponent(
  () => import("./components/SectionFooter.vue")
);
const SectionApaKataOrang = defineAsyncComponent(
  () => import("./components/SectionApaKataOrang.vue")
);

useSeoMeta({
  title: "Dimar Hanung | Software Engineer",
  description:
    "Dimar Hanung is a Software Engineer at Universitas Terbuka with 6+ years of professional experience, building fast with AI while keeping the result stable.",
  ogDescription:
    "Dimar Hanung is a Software Engineer at Universitas Terbuka with 6+ years of professional experience, building fast with AI while keeping the result stable.",
  author: "Dimar Hanung",
  ogImage: "https://i.ibb.co/SfVpQCz/IMG20211117182339.jpg",
  ogImageAlt: "Dimar Hanung",
  twitterImage: "https://i.ibb.co/SfVpQCz/IMG20211117182339.jpg",
  twitterImageAlt: "Dimar Hanung",
});
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&display=swap");
.portofolio-container {
  font-family: "Outfit", sans-serif;
}

.find-me-link:hover .find-me-icon {
  transform: translate(2px, -2px);
}

.portfolio-link:hover .portfolio-icon {
  transform: translateX(4px);
}
</style>
