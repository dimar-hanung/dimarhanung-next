<template>
  <!-- Lab theme: a handwritten sign-off under the footer. -->
  <div class="lab-signoff mx-auto max-w-7xl px-5 sm:px-6">
    <p>{{ t.themes.extras.lab.signoff }}</p>
  </div>
</template>

<script setup lang="ts">
const { t } = useHomeI18n();
</script>

<style scoped>
.lab-signoff {
  padding-bottom: 96px;
  text-align: right;
}

.lab-signoff p {
  color: #ab9d82;
  font-family: "Caveat", "Segoe Script", cursive;
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1;
}

@media (min-width: 640px) {
  .lab-signoff {
    padding-bottom: 28px;
    margin-top: -12px;
  }
}
</style>
