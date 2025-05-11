<template>
  <div
    class="container-certificates h-screen overflow-hidden text-white relative"
    @mousewheel="scrollCertificate"
    ref="certificateScreen"
  >
    <div
      class="vignate pointer-events-none h-screen w-screen fixed bg-red-50 z-10"
    ></div>

    <div class="text-white fixed top-10 left-10 z-50 text-4xl">
      <NuxtLink to="/" class="cursor-pointer hover:text-yellow-500">
        <font-awesome-icon :icon="['fa', 'home-alt']" />
      </NuxtLink>
    </div>
    <div class="desc absolute left-0 z-10 h-full">
      <Transition name="slide-fade" mode="out-in">
        <div
          :key="certificates?.[realIndex]?.title"
          class="top-1/2 -translate-y-1/2 left-11 relative"
        >
          <div class="text-5xl">
            {{ certificates?.[realIndex]?.title }}
          </div>
          <hr class="my-4" />
          <div class="max-w-xs">
            {{ certificates?.[realIndex]?.desc }}
          </div>
          <a :href="certificates?.[realIndex]?.cradential" target="_blank">
            <t-button class="top-5 float-right relative"
              >Lihat Sertifikat</t-button
            >
          </a>
        </div>
      </Transition>
    </div>

    <div class="absolute right-0 z-10 h-full">
      <!-- <input type="range" max="10" min="1" step="1" class="w-32" /> -->
      <!-- <t-button @click="() => index++">Tambah</t-button> -->
      <div class="px-4 py-24 h-full">
        <t-range
          :max="certificates.length - 8"
          :min="0"
          @input="changeIndex"
          :value="index"
          :label="
            new Date(certificates?.[realIndex]?.date).toLocaleDateString(
              'id-ID',
              {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }
            )
          "
        ></t-range>
      </div>
    </div>

    <div
      class="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
      v-for="(item, i) in getX(
        index,
        certificates.slice(index, index + 5).reverse()
      )"
      :key="i"
    >
      <div
        class="animate py-4 certificate max-w-xl shadow-lg rounded-lg"
        :key="i + 'certificate'"
        :style="getStyle(i)"
      >
        <img class="rounded-lg mx-auto h-full" :src="item.imageUrl" alt="" />
        <!-- <div class="text-2xl" style="font-size: 8rem">{{ item.id - 2 }}</div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import certificatesData from "./certificates.json";
const scale = ref(1);
const index = ref(0);
const timer = ref(0);
const isScroll = ref(false);
const certificateScreen = ref();

const realIndex = computed(() => {
  return index.value + 2;
});

const data = Array(1000)
  .fill()
  .map((v, i) => {
    return {
      id: i,
      imageUrl: `https://picsum.photos/id/${i}/800/800`,
      // imageUrl:
      //   i % 2 == 0
      //     ? "https://www.sololearn.com/Certificate/CT-9YMKIUZA/jpg"
      //     : "/assets/certificates/test-dome-js.jpg",
      title: "CSS",
    };
  });

const certificates = reactive(certificatesData)
  .map((item, i) => ({ ...item, id: i }))
  .concat(
    // dummy data certificates 5
    Array(5)
      .fill(null)
      .map((v, i) => {
        return {
          id: i,
          imageUrl: `/certificates/placeholder.png`,
          title: "Future",
          date: "1900-01-01",
        };
      })
  );

// sort certificates by date
certificates.sort((a, b) => {
  if (a.date > b.date) return -1;
  if (a.date < b.date) return 1;
  return 0;
});

function getX(n, x = [-2, -1, 0, 1, 2]) {
  let result = [];
  for (let i = 0; i < x.length; i++) {
    result.push(x[(i + n) % x.length]);
  }
  return result;
}

const getStyle = (i) => {
  const state = [
    {
      transform: `translateY(${600 * 1.5}px) scale(${0.5})`,
    },
    {
      transform: `translateY(${300 * 1.5}px) scale(${0.5})`,
    },
    {
      transform: `translateY(${0 * 1.5}px) scale(${1})`,
    },
    {
      transform: `translateY(-${300 * 1.5}px) scale(${0.5})`,
    },
    {
      transform: `translateY(-${600 * 1.5}px) scale(${0.5})`,
    },
  ];

  return getX(index.value, state)[i];
};

const scrollCertificate = (e) => {
  if (timer.value !== null) {
    clearTimeout(timer.value);
  }
  if (!isScroll.value) {
    e.wheelDeltaY < 0 ? index.value++ : index.value--;
  }
  isScroll.value = true;

  timer.value = setTimeout(function () {
    isScroll.value = false;
  }, 100);
};

const changeIndex = (e) => {
  console.log(e);
  if (timer.value !== null) {
    index.value = parseInt(e);
    // clearTimeout(timer.value);
    // timer.value = setTimeout(function () {
    // }, 100);
  }

  if (!isScroll.value) {
  }
  isScroll.value = true;
};

const setArrow = (e) => {
  if (e.key === "ArrowUp") {
    if (index.value < certificates.length - 8) index.value++;
  } else if (e.key === "ArrowDown") {
    if (index.value > 0) index.value--;
  }
};

// arrow up arrow down listener
onMounted(() => {
  document.addEventListener("keydown", setArrow);
});

// destroy listener
onUnmounted(() => {
  document.removeEventListener("keydown", setArrow);
});
</script>

<style>
.container-certificates {
  background: radial-gradient(#262424, #000000f5);
}
.vignate {
  background: radial-gradient(#26242400, #000000f5 70%);
}
.animate {
  transition: all ease 0.3s;
  /* animation-duration: 0.5s;
  animation-name: animate-fade;
  animation-delay: 0.5s;
  animation-fill-mode: backwards; */
}

@keyframes animate-fade {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-40px);
  opacity: 0;
}
</style>
