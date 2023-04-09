<template>
  <div
    class="order-summary min-h-screen w-full bg-indigo-50 grid place-items-center"
  >
    <div
      class="w-full max-w-[1440px] mx-auto bg-[#E0E8FF] h-screen max-h-[900px] shadow relative grid place-items-center p-1"
    >
      <bg-screen class="absolute top-0 left-0" />
      <div class="bg-white rounded-[20px] relative max-w-[450px]">
        <div><bg-header /></div>
        <div class="px-2 xs:px-12 pt-11 pb-12">
          <div class="text-header">Order Summary</div>
          <div class="text-desc mt-4">
            You can now listen to millions of songs, audiobooks, and podcasts on
            any device anywhere you like!
          </div>
          <div
            class="flex flex-wrap place-items-center justify-between mt-5 p-6 bg-[#F7F9FF] rounded-xl"
          >
            <div class="flex flex-wrap place-items-center flex-grow">
              <div
                class="w-12 h-12 bg-[#DFE6FB] rounded-full grid place-items-center mr-5"
              >
                <icon-music />
              </div>
              <div>
                <div class="font-black text-[#1F2E55]">Annual Plan</div>
                <div class="text-[#717FA6]">$59.99 Year</div>
              </div>
            </div>
            <div
              class="text-[#382AE1] font-bold underline mx-auto cursor-pointer"
            >
              Change
            </div>
          </div>

          <button class="button-primary">Proceed to Payment</button>
          <button
            class="mt-8 text-[#717FA6] font-black text-center block mx-auto"
          >
            Cancel Order
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BgScreen from "./components/bg-screen.vue";
import BgHeader from "./components/bg-header.vue";
import IconMusic from "./components/icon-music.vue";
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&family=Red+Hat+Display:wght@500;900&display=swap");

.order-summary {
  font-family: "Red Hat Display";
  font-style: normal;
}

.text-header {
  font-weight: 900;
  font-size: 28px;
  line-height: 37px;
  text-align: center;
  color: #1f2e55;
}

.text-desc {
  font-weight: 500;
  font-size: 16px;
  line-height: 26px;
  text-align: center;
  color: #717fa6;
}

.button-primary {
  @apply w-full py-3 mt-8;
  background: #382ae1;
  box-shadow: 0px 20px 20px rgba(56, 42, 225, 0.190291);
  border-radius: 11px;

  font-weight: 900;
  font-size: 15px;
  line-height: 20px;

  color: #ffffff;
}
</style>
