<template>
  <div
    class="portofolio-container bg-indigo-50 dark:bg-slate-800 pb-4 min-h-screen transition-all dark:text-white"
  >
    <t-nav></t-nav>

    <div class="container mx-auto">
      <div class="mt-4">
        <h3 class="text-2xl font-bold px-2">
          {{ $t("hello", { name: "Dimar Hanung" }) }}

          <img
            class="w-8 inline-block"
            src="https://camo.githubusercontent.com/e8e7b06ecf583bc040eb60e44eb5b8e0ecc5421320a92929ce21522dbc34c891/68747470733a2f2f6d656469612e67697068792e636f6d2f6d656469612f6876524a434c467a6361737252346961377a2f67697068792e676966"
            alt=""
          />
        </h3>
        <div class="px-2 mt-2">
          <div
            class="px-2 rounded dark:bg-indigo-800 bg-indigo-200 shadow max-w-max"
          >
            {{ $t("collab") }}
          </div>
        </div>
        <hr class="my-4 border-0" />
        <main class="flex flex-wrap">
          <section class="w-1/2 flex-grow p-2 min-w-[230px]">
            <section>
              <h3 class="text-xl font-bold">{{ $t("about.title") }}</h3>
              <hr class="my-4" />
              <ul class="text-lg">
                <t-list
                  >🎂
                  {{
                    $t("about.year", { year: new Date().getFullYear() - 2002 })
                  }}
                </t-list>

                <t-list
                  >🏢
                  {{
                    $t("about.job", {
                      job: "Front-End Developer",
                      at: "Universitas Terbuka",
                    })
                  }}</t-list
                >
                <t-list
                  >🎓
                  {{
                    $t("about.study1", { at: "SMK Telkom Purwokerto" })
                  }}</t-list
                >
                <t-list
                  >🎓
                  {{
                    $t("about.study2", { at: "Universitas Terbuka" })
                  }}</t-list
                >
                <t-list
                  >🏡{{ $t("about.address") }}
                  <img
                    src="https://flagpedia.net/data/flags/emoji/twitter/256x256/id.png"
                    alt=""
                    class="w-5 inline-block"
                  />
                  Indonesia</t-list
                >
                <t-list>
                  ⚡ {{ $t("about.iLike") }}
                  <t-kbd>> code .</t-kbd>
                </t-list>
              </ul>
            </section>
            <section class="mt-8">
              <h3 class="text-xl font-bold">Challenge Me</h3>
              <hr class="my-4" />
              <!-- {{ api.data.value?.["userDetails"] }}/ -->
              <div
                class="flex gap-x-2 p-1 rounded place-items-center bg-indigo-100 dark:bg-slate-900"
              >
                <div>
                  <img
                    src="@/assets/icon/sololearn.ico"
                    class="w-5 rounded"
                    alt=""
                  />
                </div>
                <div>Solo Learn</div>
              </div>
              <t-card class="flex gap-x-2">
                <div>
                  <!-- <img
                    class="rounded-full w-20"
                    :src="api.data.value?.['userDetails']?.['avatarUrl']"
                    alt=""
                  /> -->
                </div>
                <div class="flex justify-between w-full px-2">
                  <p>
                    Solo Learn is an online platform to learn to code for free.
                    and challenge your friends.
                  </p>
                  <div>
                    <div>
                      <!-- 🏆 Level {{ api.data.value?.["userDetails"]?.["level"] }} -->
                    </div>
                    <div class="mb-2">
                      <!-- ⭐ {{ api.data.value?.["userDetails"]?.["xp"] }} XP -->
                    </div>
                    <div class="flex gap-2">
                      <!-- <div
                        class="py-1 px-3 border border-indigo-400 uppercase rounded-full text-xs"
                        v-for="(badge, i) in api.data.value?.['userDetails']?.[
                          'badges'
                        ]"
                        :key="i + 'badge'"
                      >
                        {{ badge?.name }}
                      </div> -->
                    </div>
                  </div>
                  <a
                    class="place-self-end"
                    href="https://www.sololearn.com/profile/12709774"
                    aria-label="Visit Dimar Hanung's Solo Learn profile"
                    target="_blank"
                  >
                    <t-button class="h-10"
                      ><ClientOnly>
                        <font-awesome-icon
                          :icon="['fa', 'arrow-right']"
                        /> </ClientOnly
                    ></t-button>
                  </a>
                </div>
              </t-card>
              <div
                class="flex gap-x-2 p-1 rounded place-items-center bg-indigo-100 dark:bg-slate-900 mt-4"
              >
                <div>
                  <img
                    src="@/assets/icon/codewars.svg"
                    class="w-5 rounded"
                    alt=""
                  />
                </div>
                <div>Code Wars</div>
              </div>
              <t-card class="flex gap-x-2">
                <div>
                  <!-- <img
                    class="rounded-full w-20"
                    :src="'https://avatars.githubusercontent.com/u/42312636?s=100'"
                    alt=""
                  /> -->
                </div>
                <div class="flex justify-between w-full px-2">
                  <p>
                    Code Wars is a community where developers can improve their
                    skills by training with others on real code challenges.
                  </p>
                  <div>
                    <!-- <div>@{{ codewars.data.value?.["username"] }}</div> -->
                    <div>
                      <!-- 🏆 -->
                      <!-- {{
                        codewars.data.value?.["ranks"]?.["overall"]?.["name"]
                      }} -->
                    </div>
                    <div class="mb-2">
                      <!-- ⭐ -->
                      <!-- {{
                        codewars.data.value?.["ranks"]?.["overall"]?.["score"]
                      }} -->
                      <!-- Score -->
                    </div>
                  </div>
                  <a
                    class="place-self-end"
                    href="https://www.codewars.com/users/dimar-hanung"
                    target="_blank"
                    aria-label="Visit Dimar Hanung's Code Wars profile"
                  >
                    <t-button class="h-10"
                      ><ClientOnly>
                        <font-awesome-icon
                          :icon="['fa', 'arrow-right']"
                        /> </ClientOnly
                    ></t-button>
                  </a>
                </div>
              </t-card>
            </section>
            <div
              class="flex gap-x-2 p-1 rounded place-items-center bg-indigo-100 dark:bg-slate-900 mt-4"
            >
              <div>
                <img
                  src="https://logoeps.com/wp-content/uploads/2014/05/37318-github-logo-icon-vector-icon-vector-eps.png"
                  class="w-5 rounded bg-white"
                  alt=""
                />
              </div>
              <div>GitHub</div>
            </div>
            <t-card class="flex gap-x-2">
              <div>
                <!-- <img
                  class="rounded-full w-20"
                  :src="'https://avatars.githubusercontent.com/u/42312636?s=400&u=81348ae939bf84bfcdc150a0c382a39d50888c12&v=4'"
                  alt=""
                /> -->
              </div>
              <div class="flex justify-between w-full px-2">
                <!-- <div>@dimar-hanung</div> -->
                <p>
                  GitHub is where people build software. More than 56 million
                  people use GitHub to discover, fork, and contribute to over
                  200 million projects.
                </p>
                <a
                  class="place-self-end"
                  href="https://www.codewars.com/users/dimar-hanung"
                  target="_blank"
                  aria-label="Visit Dimar Hanung's GitHub profile"
                >
                  <t-button class="h-10"
                    ><ClientOnly>
                      <font-awesome-icon
                        :icon="['fa', 'arrow-right']"
                      /> </ClientOnly
                  ></t-button>
                </a>
              </div>
            </t-card>
          </section>

          <section class="w-1/2 flex-grow p-2 min-w-[230px]">
            <h3 class="text-xl font-bold">Portofolio</h3>
            <hr class="my-4" />
            <div class="flex flex-wrap gap-4">
              <t-card
                class="w-1/3 flex-grow min-w-[230px] cursor-pointer dark:hover:bg-slate-700"
              >
                <NuxtLink to="/certificates">
                  <div>Certificate</div>
                  <div class="flex w-full justify-between place-items-end">
                    <div class="text-2xl font-bold">30+</div>
                    <div>
                      <ClientOnly>
                        <font-awesome-icon :icon="['fa', 'arrow-right']" />
                      </ClientOnly>
                    </div>
                  </div>
                </NuxtLink>
              </t-card>
              <t-card
                class="w-1/3 flex-grow min-w-[230px] cursor-pointer dark:hover:bg-slate-700"
              >
                <div>Project</div>
                <div class="flex w-full justify-between place-items-end">
                  <div class="text-2xl font-bold">7+</div>
                  <div>
                    <ClientOnly>
                      <!-- <font-awesome-icon :icon="['fa', 'arrow-right']" /> -->
                    </ClientOnly>
                  </div>
                </div>
              </t-card>
              <t-card
                class="w-1/3 flex-grow min-w-[230px] cursor-pointer dark:hover:bg-slate-700"
              >
                <NuxtLink to="/challenges/frontend-mentor">
                  <div>Front-End Mentor</div>
                  <div class="flex w-full justify-between place-items-end">
                    <div class="text-2xl font-bold">90+</div>
                    <div>
                      <ClientOnly>
                        <font-awesome-icon :icon="['fa', 'arrow-right']" />
                      </ClientOnly>
                    </div>
                  </div>
                </NuxtLink>
              </t-card>
              <t-card
                class="w-1/3 flex-grow min-w-[230px] cursor-pointer dark:hover:bg-slate-700"
              >
                <div>Fun Stuff & Experiment</div>
                <div class="flex w-full justify-between place-items-end">
                  <div class="text-2xl font-bold">32+</div>
                  <div>
                    <ClientOnly>
                      <!-- <font-awesome-icon :icon="['fa', 'arrow-right']" /> -->
                    </ClientOnly>
                  </div>
                </div>
              </t-card>
            </div>
            <h3 class="text-xl font-bold mt-8">Find Me</h3>
            <hr class="my-4" />
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <a
                href="https://www.linkedin.com/in/dimar-hanung/"
                target="_blank"
              >
                <t-card class="dark:hover:bg-slate-700 cursor-pointer">
                  <div>Become my relation</div>
                  <div class="flex w-full justify-between place-items-center">
                    <div class="flex gap-2 place-items-center">
                      <ClientOnly>
                        <font-awesome-icon
                          :icon="['fab', 'linkedin']"
                          class="text-4xl text-blue-600"
                        />
                      </ClientOnly>
                      Linekdin
                    </div>
                    <ClientOnly>
                      <font-awesome-icon :icon="['fa', 'arrow-right']" />
                    </ClientOnly>
                  </div>
                </t-card>
              </a>
              <a href="https://www.instagram.com/dmr_hanung/" target="_blank">
                <t-card class="dark:hover:bg-slate-700 cursor-pointer">
                  <div>Stalking me 😣</div>
                  <div class="flex w-full justify-between place-items-center">
                    <div class="flex gap-2 place-items-center">
                      <ClientOnly>
                        <font-awesome-icon
                          :icon="['fab', 'instagram']"
                          class="text-4xl text-red-400"
                        />
                      </ClientOnly>
                      Instagram
                    </div>
                    <ClientOnly>
                      <font-awesome-icon :icon="['fa', 'arrow-right']" />
                    </ClientOnly>
                  </div>
                </t-card>
              </a>
              <a href="https://twitter.com/dimarhanung" target="_blank">
                <t-card class="dark:hover:bg-slate-700 cursor-pointer">
                  <div>Just my daily note</div>
                  <div class="flex w-full justify-between place-items-center">
                    <div class="flex gap-2 place-items-center">
                      <ClientOnly>
                        <font-awesome-icon
                          :icon="['fab', 'twitter']"
                          class="text-4xl text-blue-400"
                        />
                      </ClientOnly>
                      Twitter
                    </div>
                    <ClientOnly>
                      <font-awesome-icon :icon="['fa', 'arrow-right']" />
                    </ClientOnly>
                  </div>
                </t-card>
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=6287837092992&text=%20"
                target="_blank"
              >
                <t-card class="dark:hover:bg-slate-700 cursor-pointer">
                  <div>Be my friend / Collab</div>
                  <div class="flex w-full justify-between place-items-center">
                    <div class="flex gap-2 place-items-center">
                      <ClientOnly>
                        <font-awesome-icon
                          :icon="['fab', 'whatsapp']"
                          class="text-4xl text-green-400"
                        />
                      </ClientOnly>
                      WhatsApp
                    </div>
                    <ClientOnly>
                      <font-awesome-icon :icon="['fa', 'arrow-right']" />
                    </ClientOnly>
                  </div>
                </t-card>
              </a>
            </div>
          </section>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { getName } from "@/js-challenge/sample";
const darkMode = useDarkMode();
// const api = useFetch("https://api.sololearn.repl.co/profile/12709774", {
//   // initialCache: true,
// });

// const codewars = useFetch("https://www.codewars.com/api/v1/users/dimar-hanung");

// console.log(api.data.value["userDetails"]);

useSeoMeta({
  title: "Dimar Hanung",
  description: "Dimar Hanung - Front-End Developer",
  ogDescription: "Dimar Hanung - Front-End Developer",
  // image: "https://i.ibb.co/0nZ6Z3r/Dimar-Hanung.png",
  // url: "https://dimar-hanung.vercel.app/",
});
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&display=swap");
.portofolio-container {
  font-family: "Outfit", sans-serif;
}
.registration-form_input__rWOsZ {
  border: 0;
  border-radius: 100px;
  height: 56px;
  background: none;
  padding: 0 42px;
  font-size: 14px;
  width: 100%;
  color: red;
  transition: border-color 0.2s ease-in-out;
}
</style>
