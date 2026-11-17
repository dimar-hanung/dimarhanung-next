<template>
  <!-- Broadsheet nameplate: ears, the name in blackletter, and the folio line
       with today's date. Decorative: the name and place are in the hero too. -->
  <div class="np-masthead" aria-hidden="true">
    <div class="np-nameplate-row">
      <p class="np-ear np-ear-left">{{ copy.edition }}</p>
      <p class="np-nameplate">Dimar Hanung</p>
      <p class="np-ear np-ear-right">{{ copy.motto }}</p>
    </div>
    <div class="np-folio">
      <span>{{ copy.volume }}</span>
      <span>{{ today }}</span>
      <span class="np-folio-place">{{ copy.place }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
// Styles live in public/home/themes/newspaper.css.
const { t } = useHomeI18n();

const copy = computed(() => t.value.themes.extras.newspaper);

// Fixed to WIB so the server and the browser print the same date.
const today = computed(() =>
  new Intl.DateTimeFormat(copy.value.dateLocale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(new Date()),
);
</script>
