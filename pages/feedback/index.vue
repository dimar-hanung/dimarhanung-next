<template>
  <div
    class="feedback min-h-screen p-1 md:px-4 py-12 bg-slate-300 text-slate-800"
  >
    <main class="container mx-auto bg-opacity-25 p-1 md:p-4 min-h-screen">
      <h3 class="font-bold text-3xl">
        Beri Feedback Kepada
        <a
          href="https://www.linkedin.com/in/dimar-hanung/"
          target="_blank"
          class="text-blue-800 underline"
          >Dimar Hanung</a
        >
        🌠
      </h3>
      <textarea
        class="w-full rounded-lg mt-8 p-4 h-36 outline-none focus:shadow-lg transition-all"
        name="feedback-input"
        id="feedback-input"
        placeholder="Ketikkan Feedback dan keluhan keluhan mu untuk Dimar Disini"
        v-model="feedback"
      ></textarea>
      <button
        @click="submitFeedback"
        class="text-white rounded-lg px-4 py-2 mt-4 hover:bg-opacity-75 transition-colors text-lg"
        :class="[
          isLoadingSubmit || !feedback
            ? 'cursor-not-allowed bg-gray-600'
            : 'cursor-pointer bg-blue-700',
        ]"
      >
        {{ isLoadingSubmit ? "Tunggu sebentar hehe" : "Submit Feedback" }}
      </button>

      <p v-if="isLoadingSubmit" class="text-sm text-slate-600 mt-2">
        Bisa memakan waktu 1 - 2 menit.
      </p>

      <div
        v-if="isSubmitting"
        class="bg-green-100 text-green-700 rounded-lg p-4 mt-4"
      >
        <p class="font-bold">Terima kasih sudah memberikan feedback!</p>
        <p class="mt-2">
          Feedback kamu akan membantu Dimar untuk menjadi lebih baik lagi
        </p>
      </div>

      <div
        v-if="isSubmitting"
        class="bg-green-100 text-green-700 rounded-lg p-4 mt-4"
      >
        <p class="font-bold">Asisten Dimar</p>
        <p class="mt-2">
          {{ aiReply }}
        </p>
      </div>

      <hr class="my-12 border-slate-600" />

      <div class="mt-12 flex flex-wrap md:flex-nowrap gap-4">
        <section class="w-full md:w-1/2">
          <h3 class="font-bold text-2xl">Feedback Negatif 😭😭</h3>

          <div
            v-if="!negativeFeedbacks?.length"
            class="p-4 rounded bg-blue-100 mt-4"
          >
            Belum ada feedback negatif nih, ayo jadi yang pertama hehe
          </div>

          <div v-for="item in negativeFeedbacks" class="mt-4">
            <div class="p-4 bg-red-100 text-red-700 rounded-t-lg">
              <h4 class="font-bold">Feedback Kamu</h4>
              <p class="mt-2">
                {{ item.feedback ?? "-" }}
              </p>
            </div>
            <div class="p-4 bg-white text-slate-700 rounded-b-lg">
              <h4 class="font-bold">Asisten Dimar</h4>
              <p class="mt-2">
                {{ item.aiReply }}
              </p>
            </div>
          </div>
        </section>

        <section class="w-full md:w-1/2">
          <h3 class="font-bold text-2xl">Feedback Positif 🥹</h3>

          <div
            v-if="!positiveFeedbacks?.length"
            class="p-4 rounded bg-blue-100 mt-4"
          >
            Belum ada feedback positif nih, yuk jadi yang pertama!
          </div>

          <div v-for="item in positiveFeedbacks" class="mt-4">
            <div class="p-4 bg-green-100 text-green-700 rounded-t-lg">
              <h4 class="font-bold">Feedback Kamu</h4>
              <p class="mt-2">
                {{ item.feedback ?? "-" }}
              </p>
            </div>
            <div class="p-4 bg-white text-slate-700 rounded-b-lg">
              <h4 class="font-bold">Asisten Dimar</h4>
              <p class="mt-2">
                {{ item.aiReply }}
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const feedback = ref("");
const isLoadingSubmit = ref(false);
const isSubmitting = ref(false);
const aiReply = ref("");

const feedbacks = useFetch<{ data?: Array<Record<string, any>> }>(
  "https://api-gpt.dev.ut.web.id/general-gpt/feedbacks",
  {
    immediate: true,
    method: "GET",
  }
);

const positiveFeedbacks = computed(() => {
  return feedbacks.data.value?.data?.filter((item) => item.isPositiveFeedback);
});

const negativeFeedbacks = computed(() => {
  return feedbacks.data.value?.data?.filter((item) => !item.isPositiveFeedback);
});

const submitFeedback = async () => {
  if (isLoadingSubmit.value || !feedback.value) return;

  isLoadingSubmit.value = true;
  const data = await useFetch<Record<string, any>>(
    "https://api-gpt.dev.ut.web.id/general-gpt/feedback",
    {
      method: "POST",

      body: {
        feedback: feedback.value,
      },
    }
  );

  aiReply.value = data?.data?.replyToUser ?? "Maaf, ada kesalahan";
  isLoadingSubmit.value = false;
  feedbacks.execute();
  isSubmitting.value = true;

  setTimeout(() => {
    isSubmitting.value = false;
  }, 20000);
};
</script>

<style scoped>
.feedback {
  /* background: linear-gradient(101deg, #000 4.89%, #006759 100.78%); */
}
</style>
