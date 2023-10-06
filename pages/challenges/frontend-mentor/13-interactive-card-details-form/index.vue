<template>
  <div
    class="container-intercative-card-details-form grid place-items-center h-full min-h-screen bg-gray-400"
  >
    <div
      class="relative h-full max-h-[900px] max-w-[1440px] w-full mx-auto bg-white rounded-xl overflow-hidden"
    >
      <div class="absolute top-48 left-40 w-[447px] h-[245px] shadow-2xl">
        <card1 class="absolute left-0 top-0" />
        <card1Decor class="absolute left-5 top-5" />
        <div class="absolute w-full text-white font-bold bottom-6 block px-8">
          <div class="text-2xl">{{ formattedCardNumber }}</div>
          <div class="flex justify-between mt-4">
            <div class="uppercase">JANE APPLESEED</div>
            <div>00/00</div>
          </div>
        </div>
      </div>

      <div
        class="absolute top-56 translate-y-full left-64 w-[447px] h-[245px] shadow-2xl"
      >
        <card2 class="absolute left-0 top-0" />

        <div class="absolute right-0 px-14 top-24 translate-y-3 text-white">
          {{ form.name || "00" }}
        </div>
      </div>

      <div class="flex place-items-center">
        <sidebarBg class="h-full min-w-[483px]" />
        <div class="w-full">
          <div class="mx-auto max-w-[380px]">
            <input-text
              class="w-full"
              :id="'cardHolderName'"
              label="Cardholder Name"
              :placeholder="'e.g. Jane Appleseed'"
              v-model="form.name"
            />
            <input-text
              class="w-full mt-8"
              :id="'cardNumber'"
              label="Card Number"
              :placeholder="'e.g. 1234 5678 9123 0000'"
              v-model="form.cardNumber"
              :formatter="(str) => formatCardNumber(str)"
            />
            <div class="flex gap-2 mt-8">
              <div>
                <label class="block">Exp. Date (MM/YY)</label>
                <div class="flex gap-2">
                  <input-text
                    class="w-20"
                    :id="'cardMonth'"
                    :placeholder="'MM'"
                    v-model="form.name"
                  />
                  <input-text
                    class="w-20"
                    :id="'cardYear'"
                    :placeholder="'YY'"
                    v-model="form.name"
                  />
                </div>
              </div>
              <input-text
                class="flex-grow"
                :id="'cvc'"
                label="CVC"
                :placeholder="'e.g. 123'"
                v-model="form.name"
              />
            </div>

            <button class="bg-[#21092F] w-full text-white mt-4 p-3 rounded-md">
              Confirm
            </button>
          </div>
        </div>
      </div>
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
});

const formatCardNumber = (value: string) => {
  let cleanedInput = value.replace(/\s/g, ""); // hapus semua spasi
  let output = "";

  for (let i = 0; i < cleanedInput.length; i++) {
    output += cleanedInput[i];

    if ((i + 1) % 4 === 0 && i !== cleanedInput.length - 1) {
      output += " ";
    }
  }

  return output;
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
