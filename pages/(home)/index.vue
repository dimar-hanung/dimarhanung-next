<template>
  <div
    class="portofolio-container bg-muted-200 dark:bg-muted-900 pb-4 min-h-screen transition-all dark:text-white"
  >
    <t-nav class="relative z-50"></t-nav>

    <div class="py-28 border-y border-gray-200 bg-white relative">
      <div
        class="absolute inset-0 h-full w-full bg-muted-100 dark:bg-muted-900 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]"
      ></div>
      <header class="flex flex-wrap container mx-auto">
        <div class="w-1/2 flex-grow p-2 min-w-[230px]">
          <section>
            <grid-background class="h-96 py-12">
              <div>
                <h1
                  class="mt-4 block text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-900 dark:from-indigo-500 to-red-500 dark:to-red-500 max-w-max"
                >
                  About Dimar
                </h1>
                <ul class="text-lg mt-4">
                  <t-list>🏢 Software Engineer at Universitas Terbuka</t-list>
                  <t-list>🏡 Lives in Tangerang Selatan, Indonesia</t-list>
                  <t-list>
                    ⚡ I like to
                    <t-kbd>> code .</t-kbd>
                  </t-list>
                </ul>
              </div>
            </grid-background>
          </section>
        </div>
        <CardParallax class="w-1/2 flex-grow p-2 min-w-[230px]"></CardParallax>
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
              <div class="flex flex-wrap gap-2">
                <t-card
                  class="w-1/3 flex-grow min-w-[230px] cursor-pointer dark:hover:bg-muted-700"
                >
                  <NuxtLink to="/certificates">
                    <div>Certificate</div>
                    <div class="flex w-full justify-between place-items-end">
                      <div class="text-2xl font-bold">12+</div>
                      <div>
                        <Icon class="text-3xl" name="mdi:arrow-right" />
                      </div>
                    </div>
                  </NuxtLink>
                </t-card>
                <t-card
                  class="w-1/3 flex-grow min-w-[230px] dark:hover:bg-muted-700"
                >
                  <div>Project</div>
                  <div class="flex w-full justify-between place-items-end">
                    <div class="text-2xl font-bold">15+</div>
                  </div>
                </t-card>
                <t-card
                  class="w-1/3 flex-grow min-w-[230px] cursor-pointer dark:hover:bg-muted-700"
                >
                  <NuxtLink to="/challenges/frontend-mentor">
                    <div>Front-End Mentor</div>
                    <div class="flex w-full justify-between place-items-end">
                      <div class="text-2xl font-bold">10+</div>
                      <div>
                        <Icon class="text-3xl" name="mdi:arrow-right" />
                      </div>
                    </div>
                  </NuxtLink>
                </t-card>
                <t-card
                  class="w-1/3 flex-grow min-w-[230px] dark:hover:bg-muted-700"
                >
                  <div>Fun Stuff & Experiment</div>
                  <div class="flex w-full justify-between place-items-end">
                    <div class="text-2xl font-bold">10+</div>
                  </div>
                </t-card>
              </div>
            </div>
            <div>
              <h2 class="text-xl font-bold mb-4">Find Me</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                <a
                  href="https://www.linkedin.com/in/dimar-hanung/"
                  target="_blank"
                >
                  <t-card class="dark:hover:bg-muted-700 cursor-pointer">
                    <div>Become my relation</div>
                    <div class="flex w-full justify-between place-items-center">
                      <div class="flex gap-2 place-items-center">
                        <Icon
                          name="uil:linkedin"
                          class="text-4xl text-blue-600"
                        />
                        Linekdin
                      </div>
                      <Icon class="text-3xl" name="mdi:external-link" />
                    </div>
                  </t-card>
                </a>
                <a href="https://www.instagram.com/dmr_hanung/" target="_blank">
                  <t-card class="dark:hover:bg-muted-700 cursor-pointer">
                    <div>Story</div>
                    <div class="flex w-full justify-between place-items-center">
                      <div class="flex gap-2 place-items-center">
                        <Icon
                          name="uil:instagram"
                          class="text-4xl text-red-400"
                        />
                        Instagram
                      </div>
                      <Icon class="text-3xl" name="mdi:external-link" />
                    </div>
                  </t-card>
                </a>
                <a href="https://twitter.com/dimarhanung" target="_blank">
                  <t-card class="dark:hover:bg-muted-700 cursor-pointer">
                    <div>Just my daily note</div>
                    <div class="flex w-full justify-between place-items-center">
                      <div class="flex gap-2 place-items-center">
                        <Icon
                          name="uil:twitter"
                          class="text-4xl text-blue-400"
                        />
                        Twitter
                      </div>
                      <Icon class="text-3xl" name="mdi:external-link" />
                    </div>
                  </t-card>
                </a>
                <a
                  href="https://api.whatsapp.com/send?phone=6287837092992&text=%20"
                  target="_blank"
                >
                  <t-card class="dark:hover:bg-muted-700 cursor-pointer">
                    <div>Be my friend / Collab</div>
                    <div class="flex w-full justify-between place-items-center">
                      <div class="flex gap-2 place-items-center">
                        <Icon
                          name="uil:whatsapp"
                          class="text-4xl text-green-400"
                        />
                        WhatsApp
                      </div>
                      <Icon class="text-3xl" name="mdi:external-link" />
                    </div>
                  </t-card>
                </a>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
    <SectionStack />
    <!-- <SectionApaKataOrang /> -->

    <div class="mt-28">
      <SectionProject />
    </div>
    <SectionMotivasi />
  </div>
</template>

<script setup lang="ts">
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

const SectionProject = defineAsyncComponent(
  () => import("./components/SectionProject.vue")
);

const SectionMotivasi = defineAsyncComponent(
  () => import("./components/SectionMotivasi.vue")
);
const SectionApaKataOrang = defineAsyncComponent(
  () => import("./components/SectionApaKataOrang.vue")
);

useSeoMeta({
  title: "Dimar Hanung",
  description:
    "Dimar Hanung is a Frontend Developer with 2 years of experience. He is a self-taught developer who loves to learn new things and share his knowledge with others.",
  ogDescription:
    "Dimar Hanung is a Frontend Developer with 2 years of experience. He is a self-taught developer who loves to learn new things and share his knowledge with others.",
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
</style>
