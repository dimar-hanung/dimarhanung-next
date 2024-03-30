<template>
  <div
    class="portofolio-container bg-muted-200 dark:bg-muted-900 pb-4 min-h-screen transition-all dark:text-white"
  >
    <t-nav class="relative z-50"></t-nav>

    <div class="container mx-auto pb-8">
      <div class="mt-4">
        <header>
          <div
            class="p-4 rounded-lg border border-primary-500 max-w-max flex shadow-lg place-items-center gap-4 bg-white dark:bg-transparent"
          >
            <!-- avatar -->
            <div class="w-24 h-24 rounded-full overflow-hidden">
              <img
                src="/public/profile/profile.jpeg"
                alt="Dimar Hanung"
                class="w-full object-center mx-auto"
              />
            </div>
            <div>
              <h3 class="text-2xl font-bold px-2 flex place-items-center gap-2">
                Hello, I'm Dimar Hanung!
                <Icon class="text-3xl" name="fluent-emoji-flat:waving-hand" />
              </h3>
              <div class="px-2 mt-2">
                <p>Front-End Developer with 3 years of experience.</p>
              </div>
            </div>
          </div>
          <a
            href="https://api.whatsapp.com/send?phone=6287837092992&text=%20"
            target="_blank"
            class="mt-4 block text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-900 dark:from-indigo-500 to-red-500 dark:to-red-500 max-w-max"
          >
            Open to Collaboration
          </a>
        </header>
        <hr class="my-4 border-0" />
        <main class="flex flex-wrap">
          <div class="w-1/2 flex-grow p-2 min-w-[230px]">
            <section>
              <h3 class="text-xl font-bold mb-4">About Dimar</h3>

              <ul class="text-lg">
                <t-list>🏢 Front-End Developer at Universitas Terbuka</t-list>
                <t-list>🎓 Studies for TKJ at SMK Telkom Purwokerto</t-list>
                <t-list
                  >🎓 Studies for Information System at Universitas Terbuka
                </t-list>
                <t-list
                  >🏡 Lives in Tangerang Selatan
                  <img
                    src="https://flagpedia.net/data/flags/emoji/twitter/256x256/id.png"
                    alt=""
                    class="w-5 inline-block"
                  />
                  Indonesia</t-list
                >
                <t-list>
                  ⚡ I like to
                  <t-kbd>> code .</t-kbd>
                </t-list>
              </ul>
            </section>
            <section class="mt-6">
              <h3 class="text-xl font-bold mb-4">Challenge Me</h3>

              <home-t-card-challenge
                logo="/home/icon/sololearn.png"
                title="Solo Learn"
                description="Solo Learn is an online platform to learn to code and challenge your friends."
                :badges="['🏆 Level 11']"
                url="https://www.sololearn.com/profile/12709774"
              />

              <home-t-card-challenge
                logo="/home/icon/codewars.svg"
                title="Code Wars"
                description="Code Wars is a community where developers can improve their skills by training with others on real code challenges."
                :badges="['🏆 3 Kyu', '⭐ 1400+ Honor']"
                url="https://www.codewars.com/users/dimar-hanung"
              />

              <home-t-card-challenge
                logo="/home/icon/github.png"
                title="Github"
                description="GitHub is where people build software. More than 56 million people use GitHub to discover, fork, and contribute to over 200 million projects."
                :badges="['🏆 30+ Repository']"
                url="https://github.com/dimar-hanung"
              />
            </section>
          </div>

          <section class="w-1/2 flex-grow p-2 min-w-[230px]">
            <h3 class="text-xl font-bold mb-4">Portofolio</h3>

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
            <h3 class="text-xl font-bold mt-8 mb-4">Find Me</h3>

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
                  <div>Stalking me</div>
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
                      <Icon name="uil:twitter" class="text-4xl text-blue-400" />

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
          </section>
        </main>
        <!-- <hr class="my-8" /> -->
        <home-s-stack />
        <home-s-motive />
      </div>
    </div>
    <!-- <home-t-card-hover class="pb-32" /> -->
  </div>
</template>

<script setup lang="ts">
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
