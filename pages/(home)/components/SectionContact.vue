<template>
  <section id="contact" aria-labelledby="contact-heading" class="scroll-mt-16 pb-[72px] md:pb-[100px]">
    <div class="mx-auto max-w-7xl px-5 sm:px-6">
      <div
        class="-mx-5 grid grid-cols-1 gap-11 bg-muted-900 px-5 pt-12 pb-9 text-white sm:mx-0 sm:rounded-[28px] sm:px-[30px] sm:py-10 md:p-[60px] lg:grid-cols-[1fr_1.05fr] lg:gap-[60px] dark:border dark:border-muted-800 dark:bg-muted-950"
      >
        <div>
          <h2 id="contact-heading" class="section-title">{{ t.contact.title }}</h2>
          <p class="mt-4 max-w-[470px] text-[1.0625rem] leading-relaxed text-muted-300">
            {{ t.contact.lead }}
          </p>

          <p class="mt-8 text-[1.375rem] font-bold tracking-tight [overflow-wrap:anywhere] sm:text-[1.875rem]">
            <span class="sr-only">{{ t.contact.emailLabel }}: </span>{{ EMAIL }}
          </p>

          <div class="mt-5 flex flex-wrap gap-2.5">
            <button type="button" class="btn-dark" @click="copyEmail">
              <Icon :name="copied ? 'mdi:check' : 'mdi:content-copy'" class="text-lg" aria-hidden="true" />
              <span aria-live="polite">{{ copied ? t.contact.copied : t.contact.copyEmail }}</span>
            </button>
            <a :href="`https://wa.me/${WHATSAPP_NUMBER}`" target="_blank" rel="noopener noreferrer" class="btn-dark">
              <Icon name="mdi:whatsapp" class="text-lg" aria-hidden="true" />
              WhatsApp
            </a>
            <a href="https://www.linkedin.com/in/dimar-hanung/" target="_blank" rel="noopener noreferrer" class="btn-dark">
              <Icon name="mdi:linkedin" class="text-lg" aria-hidden="true" />
              LinkedIn
            </a>
          </div>

          <ul class="mt-8 flex flex-col gap-3 text-[0.9375rem] text-muted-400">
            <li class="inline-flex items-center gap-2">
              <Icon name="mdi:clock-outline" class="shrink-0 text-lg text-primary-400" aria-hidden="true" />
              <ClientOnly :fallback="t.contact.localTimeFallback">
                {{ t.contact.localTime(localTime) }}
              </ClientOnly>
            </li>
            <li class="inline-flex items-center gap-2">
              <Icon name="mdi:check" class="shrink-0 text-lg text-primary-400" aria-hidden="true" />
              {{ t.contact.introCall }}
            </li>
            <li class="inline-flex items-center gap-2">
              <Icon name="mdi:check" class="shrink-0 text-lg text-primary-400" aria-hidden="true" />
              {{ t.contact.nda }}
            </li>
          </ul>
        </div>

        <div
          class="self-start rounded-[20px] bg-white p-[22px] text-muted-900 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)] sm:p-[30px] dark:bg-muted-800 dark:text-white"
        >
          <form v-if="!sent" class="flex flex-col gap-[18px]" novalidate @submit.prevent="submit">
            <div>
              <h3 class="text-[1.3125rem] font-bold">{{ t.form.title }}</h3>
              <p class="mt-1 text-sm text-muted-500 dark:text-muted-400">{{ t.form.subtitle }}</p>
            </div>

            <div class="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              <div>
                <label for="inquiry-name" class="field-label">{{ t.form.name }}</label>
                <input
                  id="inquiry-name"
                  ref="nameInput"
                  v-model="name"
                  autocomplete="name"
                  :placeholder="t.form.namePlaceholder"
                  :aria-invalid="errors.name"
                  :aria-describedby="errors.name ? 'inquiry-name-error' : undefined"
                  :class="['field-input', { 'field-input-error': errors.name }]"
                />
                <p v-if="errors.name" id="inquiry-name-error" class="field-error">{{ t.form.nameError }}</p>
              </div>
              <div>
                <label for="inquiry-email" class="field-label">{{ t.form.email }}</label>
                <input
                  id="inquiry-email"
                  ref="emailInput"
                  v-model="email"
                  type="email"
                  autocomplete="email"
                  :placeholder="t.form.emailPlaceholder"
                  :aria-invalid="errors.email"
                  :aria-describedby="errors.email ? 'inquiry-email-error' : undefined"
                  :class="['field-input', { 'field-input-error': errors.email }]"
                />
                <p v-if="errors.email" id="inquiry-email-error" class="field-error">{{ t.form.emailError }}</p>
              </div>
            </div>

            <fieldset ref="needGroup" :aria-describedby="errors.need ? 'inquiry-need-error' : undefined">
              <legend class="field-label">{{ t.form.need }}</legend>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="key in NEED_KEYS"
                  :key="key"
                  type="button"
                  :aria-pressed="need === key"
                  :class="['option', { 'option-on': need === key, 'option-flash': flashing === key }]"
                  @click="need = key"
                >
                  {{ t.form.needs[key] }}
                </button>
              </div>
              <p v-if="errors.need" id="inquiry-need-error" class="field-error">{{ t.form.needError }}</p>
            </fieldset>

            <fieldset>
              <legend class="field-label">
                {{ t.form.budget }}
                <span class="font-normal text-muted-500">{{ t.form.optional }}</span>
              </legend>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="(label, index) in t.form.budgets"
                  :key="index"
                  type="button"
                  :aria-pressed="budgetIndex === index"
                  :class="['option', { 'option-on': budgetIndex === index }]"
                  @click="budgetIndex = budgetIndex === index ? null : index"
                >
                  {{ label }}
                </button>
              </div>
            </fieldset>

            <div>
              <label for="inquiry-message" class="field-label">{{ t.form.message }}</label>
              <textarea
                id="inquiry-message"
                ref="messageInput"
                v-model="message"
                :placeholder="t.form.messagePlaceholder"
                :aria-invalid="errors.message"
                :aria-describedby="errors.message ? 'inquiry-message-error' : undefined"
                :class="['field-input min-h-[104px] resize-y', { 'field-input-error': errors.message }]"
              ></textarea>
              <p v-if="errors.message" id="inquiry-message-error" class="field-error">{{ t.form.messageError }}</p>
            </div>

            <button
              type="submit"
              class="btn-primary inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-[10px] px-6 font-semibold"
            >
              <Icon name="mdi:whatsapp" class="text-xl" aria-hidden="true" />
              {{ t.form.submit }}
            </button>
            <p class="text-center text-[0.8125rem] text-muted-500 dark:text-muted-400">{{ t.form.note }}</p>
          </form>

          <div v-else class="flex flex-col items-center gap-3 px-2 py-7 text-center" aria-live="polite">
            <span
              class="success-icon grid h-[68px] w-[68px] place-items-center rounded-full bg-green-600/12 text-green-600"
            >
              <Icon name="mdi:check" class="text-[34px]" aria-hidden="true" />
            </span>
            <h3 class="text-2xl font-bold">{{ t.form.thanks(sent.firstName) }}</h3>
            <p class="text-muted-500 dark:text-muted-400">{{ t.form.sent }}</p>

            <dl
              class="mt-1.5 flex w-full flex-col gap-2 rounded-xl bg-muted-50 p-4 text-left text-sm dark:bg-muted-900"
            >
              <div class="flex justify-between gap-3">
                <dt class="text-muted-500">{{ t.form.summaryNeed }}</dt>
                <dd class="text-right font-semibold">{{ need ? t.form.needs[need] : "" }}</dd>
              </div>
              <div class="flex justify-between gap-3">
                <dt class="text-muted-500">{{ t.form.summaryBudget }}</dt>
                <dd class="text-right font-semibold">
                  {{ budgetIndex === null ? t.form.summaryNone : t.form.budgets[budgetIndex] }}
                </dd>
              </div>
              <div class="flex justify-between gap-3">
                <dt class="text-muted-500">{{ t.form.summaryReply }}</dt>
                <dd class="text-right font-semibold [overflow-wrap:anywhere]">{{ email.trim() }}</dd>
              </div>
            </dl>

            <a :href="sent.whatsappUrl" target="_blank" rel="noopener noreferrer" class="text-link mt-1 text-sm font-medium">
              {{ t.form.openAgain }}
            </a>
            <button type="button" class="text-link font-medium" @click="reset">{{ t.form.again }}</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { NeedKey } from "~/locales/home/en";

const EMAIL = "dimarhanung@gmail.com";
const WHATSAPP_NUMBER = "6287837092992";
const NEED_KEYS: NeedKey[] = ["web", "ai", "frontend", "other"];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const { t } = useHomeI18n();

// Email copy button
const { copy, copied, isSupported } = useClipboard({ copiedDuring: 1600 });

function copyEmail() {
  if (!isSupported.value) {
    window.location.href = `mailto:${EMAIL}`;
    return;
  }
  copy(EMAIL);
}

// Local time in Tangerang Selatan, client only (the server clock would mismatch).
const now = useNow({ interval: 30_000 });
const timeFormat = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Asia/Jakarta",
});
const localTime = computed(() => timeFormat.format(now.value));

// Inquiry form
const name = ref("");
const email = ref("");
const need = ref<NeedKey | null>(null);
const budgetIndex = ref<number | null>(null);
const message = ref("");
const errors = reactive({ name: false, email: false, need: false, message: false });
const sent = ref<{ firstName: string; whatsappUrl: string } | null>(null);

const nameInput = ref<HTMLInputElement | null>(null);
const emailInput = ref<HTMLInputElement | null>(null);
const messageInput = ref<HTMLTextAreaElement | null>(null);
const needGroup = ref<HTMLFieldSetElement | null>(null);

watch(name, () => (errors.name = false));
watch(email, () => (errors.email = false));
watch(need, () => (errors.need = false));
watch(message, () => (errors.message = false));

function submit() {
  const trimmedName = name.value.trim();
  const trimmedEmail = email.value.trim();
  const trimmedMessage = message.value.trim();

  errors.name = !trimmedName;
  errors.email = !EMAIL_PATTERN.test(trimmedEmail);
  errors.need = !need.value;
  errors.message = trimmedMessage.length < 10;

  // Focus the first field that needs fixing.
  if (errors.name) {
    nameInput.value?.focus();
    return;
  }
  if (errors.email) {
    emailInput.value?.focus();
    return;
  }
  if (errors.need || !need.value) {
    needGroup.value?.querySelector("button")?.focus();
    return;
  }
  if (errors.message) {
    messageInput.value?.focus();
    return;
  }

  const text = t.value.form.whatsappMessage({
    name: trimmedName,
    email: trimmedEmail,
    need: t.value.form.needs[need.value],
    budget: budgetIndex.value === null ? t.value.form.summaryNone : t.value.form.budgets[budgetIndex.value],
    message: trimmedMessage,
  });
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

  // Opened inside the submit handler so the browser treats it as a user action.
  window.open(whatsappUrl, "_blank", "noopener");
  sent.value = { firstName: trimmedName.split(" ")[0], whatsappUrl };
}

function reset() {
  name.value = "";
  email.value = "";
  need.value = null;
  budgetIndex.value = null;
  message.value = "";
  sent.value = null;
  Object.assign(errors, { name: false, email: false, need: false, message: false });
}

// Called by "Ask about this": start a fresh form with that need picked and
// briefly ring the chosen option.
const flashing = ref<NeedKey | null>(null);
let flashTimer: ReturnType<typeof setTimeout> | undefined;

async function selectNeed(key: NeedKey) {
  if (sent.value) reset();
  need.value = key;
  flashing.value = null;
  await nextTick();
  flashing.value = key;
  clearTimeout(flashTimer);
  flashTimer = setTimeout(() => (flashing.value = null), 1700);
}

function focusName() {
  if (sent.value) return;
  nameInput.value?.focus({ preventScroll: true });
}

onBeforeUnmount(() => clearTimeout(flashTimer));

defineExpose({ selectNeed, focusName });
</script>

<style scoped>
.btn-dark {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  height: 38px;
  padding: 0 0.875rem;
  border-radius: 10px;
  border: 1px solid var(--app-muted-700);
  font-size: 0.875rem;
  font-weight: 600;
  color: #fff;
  transition:
    border-color 150ms ease-out,
    color 150ms ease-out;
}

.btn-dark:hover {
  border-color: var(--app-primary-400);
  color: var(--app-primary-300);
}

.field-label {
  display: block;
  margin-bottom: 7px;
  font-size: 0.875rem;
  font-weight: 600;
}

.field-input {
  width: 100%;
  padding: 11px 14px;
  border-radius: 10px;
  border: 1.5px solid var(--app-muted-200);
  background: var(--app-muted-50);
  color: inherit;
  font-size: 0.9375rem;
  outline: none;
  transition:
    border-color 150ms ease-out,
    box-shadow 150ms ease-out;
}

.dark .field-input {
  background: var(--app-muted-900);
  border-color: var(--app-muted-700);
}

.field-input:focus,
.dark .field-input:focus {
  border-color: var(--app-primary-500);
  box-shadow: 0 0 0 4px rgb(244 63 94 / 0.15);
}

.field-input-error,
.dark .field-input-error {
  border-color: #dc2626;
}

.field-error {
  margin-top: 6px;
  font-size: 0.8125rem;
  color: #dc2626;
}

.dark .field-error {
  color: #f87171;
}

.option {
  height: 38px;
  padding: 0 0.875rem;
  border-radius: 10px;
  border: 1.5px solid var(--app-muted-200);
  background: #fff;
  color: var(--app-muted-700);
  font-size: 0.875rem;
  font-weight: 500;
  transition:
    border-color 150ms ease-out,
    background-color 150ms ease-out,
    color 150ms ease-out;
}

.option:hover {
  border-color: var(--app-primary-300);
}

.dark .option {
  background: var(--app-muted-900);
  border-color: var(--app-muted-700);
  color: var(--app-muted-200);
}

.option-on,
.option-on:hover {
  border-color: var(--app-primary-500);
  background: var(--app-primary-50);
  color: var(--app-primary-700);
}

.dark .option-on,
.dark .option-on:hover {
  border-color: var(--app-primary-400);
  background: rgb(136 19 55 / 0.45);
  color: var(--app-primary-200);
}

/* Two rings when "Ask about this" picks the option, then it stops. */
.option-flash {
  animation: option-flash 0.8s ease 2;
}

@keyframes option-flash {
  50% {
    box-shadow: 0 0 0 6px rgb(244 63 94 / 0.25);
  }
}

.success-icon {
  animation: success-pop 0.4s ease-out;
}

@keyframes success-pop {
  from {
    transform: scale(0.5);
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .option-flash,
  .success-icon {
    animation: none;
  }
}
</style>
