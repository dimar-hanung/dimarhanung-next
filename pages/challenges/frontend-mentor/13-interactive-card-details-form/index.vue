<template>
  <div
    class="container-intercative-card-details-form grid place-items-center h-full min-h-screen bg-gray-400"
  >
    <div
      class="relative h-full max-h-[900px] max-w-[1440px] w-full mx-auto bg-white rounded-xl overflow-hidden"
    >
      <!-- #region 👉 Card 1 - Depan -->
      <section
        class="absolute scale-75 lg:scale-100 z-10 lg:z-auto top-28 lg:top-48 right-20 lg:left-[1%] xl:left-[10%] w-[447px] h-[245px] shadow-2xl transition-all"
      >
        <card1 class="absolute left-0 top-0" />
        <card1Decor class="absolute left-5 top-5" />
        <div class="absolute w-full text-white font-bold bottom-6 block px-8">
          <div class="text-2xl">{{ formattedCardNumber }}</div>
          <div class="flex justify-between mt-4">
            <div class="uppercase">{{ form.name }}</div>
            <div>{{ form.mm }}/{{ form.yy }}</div>
          </div>
        </div>
      </section>
      <!-- #endregion -->
      <!-- #region 👉 Card 2 - Belakang -->
      <section
        class="absolute scale-75 lg:scale-100 top-0 lg:top-56 right-10 lg:translate-y-full lg:left-[6%] xl:left-[20%] w-[447px] h-[245px] shadow-2xl transition-all"
      >
        <card2 class="absolute left-0 top-0" />
        <div class="absolute right-0 px-14 top-24 translate-y-3 text-white">
          {{ form.cvc || "00" }}
        </div>
      </section>
      <!-- #endregion -->

      <form class="lg:flex lg:place-items-center">
        <sidebarBg class="h-[280px] w-full lg:h-full lg:min-w-[483px]" />
        <div class="w-full py-32 lg:py-8">
          <div class="mx-auto max-w-[380px]">
            <InputText
              class="w-full"
              :id="'cardHolderName'"
              label="Cardholder Name"
              :placeholder="'e.g. Jane Appleseed'"
              v-model="form.name"
              :required="true"
            />
            <InputText
              class="w-full mt-8"
              :id="'cardNumber'"
              label="Card Number"
              :placeholder="'e.g. 1234 5678 9123 0000'"
              v-model="form.cardNumber"
              :is-valid="isValidCardNumber"
              :formatter="
                (str, target, start) => formatCardNumber(str, target, start)
              "
              :required="true"
              :max-length="19"
            />
            <div class="flex gap-2 mt-8">
              <div>
                <label class="block">Exp. Date (MM/YY)</label>
                <div class="flex gap-2">
                  <InputText
                    class="w-20"
                    :id="'cardMonth'"
                    :placeholder="'MM'"
                    v-model="form.mm"
                    @update:model-value="changeMmFocus"
                    :max-length="2"
                    :required="true"
                  />
                  <InputText
                    class="w-20"
                    ref="cardYear"
                    :id="'cardYear'"
                    :placeholder="'YY'"
                    v-model="form.yy"
                    @update:model-value="changeYyFocus"
                    :max-length="2"
                    :required="true"
                  />
                </div>
              </div>
              <InputText
                ref="cvc"
                class="flex-grow"
                :id="'cvc'"
                label="CVC"
                :placeholder="'e.g. 123'"
                v-model="form.cvc"
                :max-length="3"
                :required="true"
              />
            </div>

            <button class="bg-[#21092F] w-full text-white mt-4 p-3 rounded-md">
              Confirm
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import sidebarBg from "./components/sidebar-bg.vue";
import card1 from "./components/card-1.vue";
import card1Decor from "./components/card-1-decor.vue";

import card2 from "./components/card-2.vue";

import InputText from "./components/input-text.vue";

useSeoMeta({
  title: "Interactive Card Details Form",
});

const form = reactive({
  name: "",
  cardNumber: "9591648963891011",
  mm: "",
  yy: "",
  cvc: "",
});

const cardYear = ref<null | HTMLInputElement>(null);
const cvc = ref<null | HTMLInputElement>(null);
const isValidCardNumber = computed(() => {
  return /^\d+$/.test(form.cardNumber?.split(" ")?.join(""));
});
const changeMmFocus = (v) => {
  console.log(cardYear.value);
  if (v.length >= 2) {
    cardYear.value?.focus();
  }
};

const changeYyFocus = (v: string) => {
  if (v.length >= 2) {
    cvc.value?.focus();
  }
};

const formatCardNumber = (
  value: string,
  target?: HTMLInputElement,
  start?: number
) => {
  let cleanedInput = value.replace(/\s/g, ""); // hapus semua spasi
  let output = "";

  for (let i = 0; i < cleanedInput.length; i++) {
    output += cleanedInput[i];

    if ((i + 1) % 4 === 0 && i !== cleanedInput.length - 1) {
      output += " ";
    }
  }

  return {
    value: output,
    selectionRange:
      ((start || 0) % 5 == 0
        ? (start || 0) + (value.length % 5 == 0 ? 1 : 0)
        : start) || 0,
  };
};

const formattedCardNumber = computed(() => {
  return form.cardNumber;
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500&display=swap");
.container-intercative-card-details-form {
  font-family: "Space Grotesk", sans-serif;
  font-weight: 500;
}
</style>
