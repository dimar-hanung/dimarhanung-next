<template>
  <div class="pt-32">
    <h2 class="text-3xl font-bold uppercase text-center">Apa Kata Orang?</h2>
    <div
      class="relative flex h-[900px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background"
    >
      <Marquee
        pause-on-hover
        class="[--duration:20s] -rotate-2 border-b-2 border-muted-400"
      >
        <ReviewCard
          v-for="review in firstRow"
          :img="review.img"
          :name="review.name"
          :username="review.username"
          :body="review.body"
          :title="review.title"
        />
      </Marquee>
      <Marquee
        reverse
        pause-on-hover
        class="[--duration:20s] -rotate-2 border-b-2 border-muted-400"
      >
        <ReviewCard
          v-for="review in secondRow"
          :img="review.img"
          :name="review.name"
          :username="review.username"
          :body="review.body"
          :title="review.title"
        />
      </Marquee>
      <Marquee pause-on-hover class="[--duration:30s] -rotate-2">
        <ReviewCard
          v-for="review in firstRow"
          :img="review.img"
          :name="review.name"
          :username="review.username"
          :body="review.body"
          :title="review.title"
        />
      </Marquee>
      <!-- Left Gradient -->
      <div
        class="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-muted-200 dark:from-muted-900"
      ></div>
      <!-- Right Gradient -->
      <div
        class="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-muted-200 dark:from-muted-900"
      ></div>
    </div>

    <TButton class="block max-w-max mx-auto font-bold text-lg px-8"
      >Berikan Feedback mu</TButton
    >
  </div>
</template>

<script setup lang="ts">
// Reviews data
const reviews = [
  {
    name: "Nisa Agustina",
    title: "Full-Stack Developer at PT. Vision Media Creative ",
    body: "Dimar hanung merupakan teman yang sudah lama saya kenal. Dia merupakan pribadi yang ulet, tekun, selalu penasaran dan mempunyai motivasi tinggi. Skill dan loyalitasnya ga main-main. Terlebih yang saya ketahui dia menggeluti bidang frontend dan karirnya cukup sukses sampai sekarang, maka dari itu saya sangat merekomendasikan Dimar sebagai Frontend Developer yang handal.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: null,
    username: null,
    body: null,
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: null,
    username: null,
    body: null,
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: null,
    username: null,
    body: null,
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: null,
    username: null,
    body: null,
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: null,
    username: null,
    body: null,
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: null,
    username: null,
    body: null,
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: null,
    username: null,
    body: null,
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: null,
    username: null,
    body: null,
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: null,
    username: null,
    body: null,
    img: "https://avatar.vercel.sh/jack",
  },
];

// Split reviews into two rows
const firstRow = ref(reviews.slice(0, reviews.length / 2));
const secondRow = ref(reviews.slice(reviews.length / 2));
</script>
