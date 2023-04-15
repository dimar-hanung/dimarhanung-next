<template>
  <div
    class="container-password-generator font-bold bg-[#18171F] min-h-screen grid place-items-center py-8 px-2"
  >
    <main class="mx-auto w-full max-w-[540px] overflow-hidden">
      <h1 class="text-[#817D92] text-center text-2xl">Password Generator</h1>

      <section
        class="bg-[#24232C] rounded h-20 flex justify-between px-2 sm:px-8 place-items-center mt-8"
      >
        <p
          class="text-[#E6E5EA] text-2xl overflow-hidden text-ellipsis whitespace-nowrap w-full"
          :class="[!password ? 'opacity-25 select-none' : '']"
        >
          {{ password || "P4$5W0rD!" }}
        </p>
        <div class="relative">
          <Transition name="fade" :duration="200" mode="in-out">
            <div
              v-if="isCopied"
              class="absolute text-[#A4FFAF] -left-2 -translate-x-full"
            >
              COPIED
            </div>
          </Transition>
          <icon-copy
            v-tooltip="
              password ? 'Copy to clipboard' : 'Generate a password first'
            "
            @click="copyToClipboard"
            class="cursor-pointer fill-[#A4FFAF] hover:fill-white"
          />
        </div>
      </section>

      <section class="mt-6 rounded bg-[#24232C] py-6 px-2 sm:px-8">
        <div class="flex justify-between">
          <h2 class="text-lg text-[#E6E5EA]">Character Length</h2>
          <p class="text-[#A4FFAF] text-2xl">{{ value }}</p>
        </div>

        <input-range class="mt-4" v-model="value" />

        <input-check class="mt-8" v-model:value="options.inludeUpperCase"
          >Include Uppercase Letters</input-check
        >
        <input-check v-model:value="options.inludeLowerCase"
          >Include Lowercase Letters</input-check
        >
        <input-check v-model:value="options.inludeNumbers"
          >Include Numbers</input-check
        >
        <input-check v-model:value="options.inludeSymbols"
          >Include Symbols</input-check
        >

        <div
          class="bg-[#18171F] h-[4.5rem] mt-8 flex place-items-center justify-between px-2 sm:px-8 rounded"
        >
          <div class="text-base sm:text-lg text-[#817D92]">STRENGTH</div>
          <div class="flex place-items-center">
            <div class="text-base sm:text-2xl text-[#E6E5EA] mr-4">
              {{
                getPasswordStrength() == "NO OPTIONS SELECTED"
                  ? ""
                  : getPasswordStrength()
              }}
            </div>
            <div
              v-for="(_, i) in Array(4)"
              :key="i"
              class="h-7 border-2 mr-2 w-[0.625rem] transition-all rounded"
              :class="{
                'bg-[#F64A4A] border-transparent':
                  getPasswordStrength() == 'TOO WEAK!' && i <= 0,
                'bg-[#FB7C58] border-transparent':
                  getPasswordStrength() == 'WEAK' && i <= 1,
                'bg-[#F8CD65] border-transparent':
                  getPasswordStrength() == 'MEDIUM' && i <= 2,
                'bg-[#A4FFAF] border-transparent':
                  getPasswordStrength() == 'STRONG' && i <= 3,
              }"
            ></div>
          </div>
        </div>
        <button
          v-tooltip="
            isOptionSelected ? 'Generate' : 'Select at least one option'
          "
          class="h-[4.5rem] mt-8 block bg-[#A4FFAF] w-full text-center rounded border-2 border-transparent transition-all"
          :class="[
            isOptionSelected
              ? 'hover:border-[#A4FFAF] hover:bg-[transparent] text-[#24232C] hover:text-[#A4FFAF] hover:fill-[#A4FFAF]'
              : 'bg-opacity-50 cursor-not-allowed',
          ]"
          @click="
            password = generatePassword({
              length: value,
              uppercase: options.inludeUpperCase,
              lowercase: options.inludeLowerCase,
              numbers: options.inludeNumbers,
              symbols: options.inludeSymbols,
            })
          "
        >
          <div class="flex place-items-center justify-center">
            <span class="mr-6 text-lg">GENERATE</span>
            <icon-arrow-right />
          </div>
        </button>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import iconCopy from "./components/icon-copy.vue";
import inputRange from "./components/input-range.vue";
import inputCheck from "./components/input-check.vue";
import iconArrowRight from "./components/icon-arrow-right.vue";

const value = ref(10);
const options = reactive({
  inludeUpperCase: false,
  inludeLowerCase: false,
  inludeNumbers: false,
  inludeSymbols: false,
});

const password = ref("");
const isCopied = ref(false);

const isOptionSelected = computed(() => {
  return (
    options.inludeUpperCase ||
    options.inludeLowerCase ||
    options.inludeNumbers ||
    options.inludeSymbols
  );
});

// copy password to clipboard without execCommand because it deprecated
const copyToClipboard = () => {
  if (!password.value) return;
  navigator.clipboard.writeText(password.value);

  isCopied.value = true;
  setTimeout(() => {
    isCopied.value = false;
  }, 1000);
};

// get password strength return (TOO WEAK, WEAK, MEDIUM, STRONG), depends options ref
const getPasswordStrength = () => {
  let strength = 0;
  if (options.inludeUpperCase) strength += 1;
  if (options.inludeLowerCase) strength += 1;
  if (options.inludeNumbers) strength += 1;
  if (options.inludeSymbols) strength += 1;
  if (value.value > 10) strength += 1;
  if (value.value > 50) strength += 1;
  if (value.value > 100) strength += 1;
  if (value.value < 10) strength -= 1;
  if (value.value < 5) strength -= 2;

  if (strength === 1) return "TOO WEAK!";
  if (strength === 2) return "WEAK";
  if (strength === 3) return "MEDIUM";
  if (strength >= 4) return "STRONG";
  return "NO OPTIONS SELECTED";
};

// create random password method with 4 object params (length, uppercase, lowercase, numbers, symbols)
const generatePassword = ({
  length = 10,
  uppercase = false,
  lowercase = false,
  numbers = false,
  symbols = false,
}) => {
  if (!isOptionSelected.value) return "";
  // create a string of all possible characters
  let chars = "";
  if (uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
  if (numbers) chars += "0123456789";
  if (symbols) chars += "!@#$%^&*_-+=";

  // create password variable
  let password = "";

  // loop over the length and create a password
  for (let i = 0; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }

  // return the password

  return password;
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@700&display=swap");

.container-password-generator {
  font-family: "JetBrains Mono", monospace;
}
</style>
