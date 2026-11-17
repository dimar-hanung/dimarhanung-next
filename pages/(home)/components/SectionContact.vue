<template>
  <section id="contact" data-part="contact" aria-labelledby="contact-heading" class="scroll-mt-16 pb-(--section-y)">
    <div class="mx-auto max-w-7xl px-5 sm:px-6">
      <div
        data-part="contact-panel"
        class="-mx-5 grid grid-cols-1 gap-11 px-5 pt-12 pb-9 sm:mx-0 sm:px-[30px] sm:py-10 md:p-[60px] lg:grid-cols-[1fr_1.05fr] lg:gap-[60px]"
      >
        <div data-part="contact-intro">
          <h2 id="contact-heading" data-part="section-title" class="section-title">{{ t.contact.title }}</h2>
          <p data-part="contact-lead" class="mt-4 max-w-[470px] text-[1.0625rem] leading-relaxed">
            {{ t.contact.lead }}
          </p>

          <p
            data-part="contact-email"
            class="mt-8 text-[1.375rem] font-bold tracking-tight [overflow-wrap:anywhere] sm:text-[1.875rem]"
          >
            <span class="sr-only">{{ t.contact.emailLabel }}: </span>{{ EMAIL }}
          </p>

          <div data-part="contact-actions" class="mt-5 flex flex-wrap gap-2.5">
            <button type="button" data-part="contact-button" @click="copyEmail">
              <Icon :name="copied ? 'mdi:check' : 'mdi:content-copy'" class="text-lg" aria-hidden="true" />
              <span aria-live="polite">{{ copied ? t.contact.copied : t.contact.copyEmail }}</span>
            </button>
            <a :href="`https://wa.me/${WHATSAPP_NUMBER}`" target="_blank" rel="noopener noreferrer" data-part="contact-button">
              <Icon name="mdi:whatsapp" class="text-lg" aria-hidden="true" />
              WhatsApp
            </a>
            <a href="https://www.linkedin.com/in/dimar-hanung/" target="_blank" rel="noopener noreferrer" data-part="contact-button">
              <Icon name="mdi:linkedin" class="text-lg" aria-hidden="true" />
              LinkedIn
            </a>
          </div>

          <ul data-part="contact-facts" class="mt-8 flex flex-col gap-3 text-[0.9375rem]">
            <li data-part="contact-fact" class="inline-flex items-center gap-2">
              <Icon name="mdi:clock-outline" data-part="contact-fact-icon" class="shrink-0 text-lg" aria-hidden="true" />
              <ClientOnly :fallback="t.contact.localTimeFallback">
                {{ t.contact.localTime(localTime) }}
              </ClientOnly>
            </li>
            <li data-part="contact-fact" class="inline-flex items-center gap-2">
              <Icon name="mdi:check" data-part="contact-fact-icon" class="shrink-0 text-lg" aria-hidden="true" />
              {{ t.contact.introCall }}
            </li>
            <li data-part="contact-fact" class="inline-flex items-center gap-2">
              <Icon name="mdi:check" data-part="contact-fact-icon" class="shrink-0 text-lg" aria-hidden="true" />
              {{ t.contact.nda }}
            </li>
          </ul>
        </div>

        <div data-part="form-card" class="self-start p-[22px] sm:p-[30px]">
          <form v-if="!sent" data-part="form" class="flex flex-col gap-[18px]" novalidate @submit.prevent="submit">
            <div data-part="form-head">
              <h3 data-part="form-title" class="text-[1.3125rem] font-bold">{{ t.form.title }}</h3>
              <p data-part="form-sub" class="mt-1 text-sm">{{ t.form.subtitle }}</p>
            </div>

            <div class="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              <div>
                <label for="inquiry-name" data-part="field-label">{{ t.form.name }}</label>
                <input
                  id="inquiry-name"
                  ref="nameInput"
                  v-model="name"
                  autocomplete="name"
                  :placeholder="t.form.namePlaceholder"
                  :aria-invalid="errors.name"
                  :aria-describedby="errors.name ? 'inquiry-name-error' : undefined"
                  data-part="field-input"
                />
                <p v-if="errors.name" id="inquiry-name-error" data-part="field-error">{{ t.form.nameError }}</p>
              </div>
              <div>
                <label for="inquiry-email" data-part="field-label">{{ t.form.email }}</label>
                <input
                  id="inquiry-email"
                  ref="emailInput"
                  v-model="email"
                  type="email"
                  autocomplete="email"
                  :placeholder="t.form.emailPlaceholder"
                  :aria-invalid="errors.email"
                  :aria-describedby="errors.email ? 'inquiry-email-error' : undefined"
                  data-part="field-input"
                />
                <p v-if="errors.email" id="inquiry-email-error" data-part="field-error">{{ t.form.emailError }}</p>
              </div>
            </div>

            <fieldset ref="needGroup" :aria-describedby="errors.need ? 'inquiry-need-error' : undefined">
              <legend data-part="field-label">{{ t.form.need }}</legend>
              <div data-part="option-group" class="flex flex-wrap gap-2">
                <button
                  v-for="key in NEED_KEYS"
                  :key="key"
                  type="button"
                  data-part="option"
                  :aria-pressed="need === key"
                  :data-flash="flashing === key || undefined"
                  @click="need = key"
                >
                  {{ t.form.needs[key] }}
                </button>
              </div>
              <p v-if="errors.need" id="inquiry-need-error" data-part="field-error">{{ t.form.needError }}</p>
            </fieldset>

            <fieldset>
              <legend data-part="field-label">
                {{ t.form.budget }}
                <span data-part="field-optional" class="font-normal">{{ t.form.optional }}</span>
              </legend>
              <div data-part="option-group" class="flex flex-wrap gap-2">
                <button
                  v-for="(label, index) in t.form.budgets"
                  :key="index"
                  type="button"
                  data-part="option"
                  :aria-pressed="budgetIndex === index"
                  @click="budgetIndex = budgetIndex === index ? null : index"
                >
                  {{ label }}
                </button>
              </div>
            </fieldset>

            <div>
              <label for="inquiry-message" data-part="field-label">{{ t.form.message }}</label>
              <textarea
                id="inquiry-message"
                ref="messageInput"
                v-model="message"
                :placeholder="t.form.messagePlaceholder"
                :aria-invalid="errors.message"
                :aria-describedby="errors.message ? 'inquiry-message-error' : undefined"
                data-part="field-input"
                class="min-h-[104px] resize-y"
              ></textarea>
              <p v-if="errors.message" id="inquiry-message-error" data-part="field-error">{{ t.form.messageError }}</p>
            </div>

            <button
              type="submit"
              data-part="form-submit"
              class="btn-primary inline-flex h-[52px] w-full items-center justify-center gap-2 px-6 font-semibold"
            >
              <Icon name="mdi:whatsapp" class="text-xl" aria-hidden="true" />
              {{ t.form.submit }}
            </button>
            <p data-part="form-note" class="text-center text-[0.8125rem]">{{ t.form.note }}</p>
          </form>

          <div v-else data-part="form-success" class="flex flex-col items-center gap-3 px-2 py-7 text-center" aria-live="polite">
            <span data-part="success-icon" class="grid h-[68px] w-[68px] place-items-center rounded-full">
              <Icon name="mdi:check" class="text-[34px]" aria-hidden="true" />
            </span>
            <h3 data-part="success-title" class="text-2xl font-bold">{{ t.form.thanks(sent.firstName) }}</h3>
            <p data-part="success-text">{{ t.form.sent }}</p>

            <dl data-part="success-summary" class="mt-1.5 flex w-full flex-col gap-2 p-4 text-left text-sm">
              <div class="flex justify-between gap-3">
                <dt>{{ t.form.summaryNeed }}</dt>
                <dd class="text-right font-semibold">{{ need ? t.form.needs[need] : "" }}</dd>
              </div>
              <div class="flex justify-between gap-3">
                <dt>{{ t.form.summaryBudget }}</dt>
                <dd class="text-right font-semibold">
                  {{ budgetIndex === null ? t.form.summaryNone : t.form.budgets[budgetIndex] }}
                </dd>
              </div>
              <div class="flex justify-between gap-3">
                <dt>{{ t.form.summaryReply }}</dt>
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
