<template>
  <div class="min-h-screen bg-muted-50 dark:bg-muted-950 py-10 px-4 sm:px-6">
    <!-- Header -->
    <div class="max-w-3xl mx-auto mb-10">
      <div class="flex items-center gap-3 mb-2">
        <div
          class="w-10 h-10 rounded-xl bg-primary-500/10 dark:bg-primary-400/10 flex items-center justify-center"
        >
          <Icon name="mdi:chart-timeline-variant" class="text-xl text-primary-500" />
        </div>
        <h1
          class="text-2xl sm:text-3xl font-bold text-muted-900 dark:text-muted-50 tracking-tight"
        >
          Daily Progress Calculator
        </h1>
      </div>
      <p class="text-muted-500 dark:text-muted-400 text-sm ml-[52px]">
        Hitung berapa persen progress yang harus dicapai setiap hari untuk mencapai target.
      </p>
    </div>

    <div class="max-w-3xl mx-auto space-y-6">
      <!-- Inputs -->
      <div
        class="bg-white dark:bg-muted-900 border border-muted-200 dark:border-muted-800 rounded-2xl p-6"
      >
        <div class="flex items-center gap-2 mb-5">
          <Icon name="mdi:tune-variant" class="text-lg text-muted-500" />
          <h2 class="text-sm font-semibold text-muted-700 dark:text-muted-300 uppercase tracking-wider">
            Input
          </h2>
        </div>

        <div class="space-y-6">
          <!-- Current Progress -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <label class="text-xs font-medium text-muted-600 dark:text-muted-400">
                Progress saat ini
              </label>
              <span class="text-sm font-semibold text-primary-600 dark:text-primary-400">
                {{ currentProgress }}%
              </span>
            </div>
            <input
              v-model.number="currentProgress"
              type="range"
              min="0"
              max="100"
              step="1"
              class="w-full accent-primary-500"
            />
            <input
              v-model.number="currentProgress"
              type="number"
              min="0"
              max="100"
              step="0.1"
              class="w-full px-3 py-2 text-sm bg-muted-50 dark:bg-muted-950 border border-muted-200 dark:border-muted-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all text-muted-700 dark:text-muted-300"
            />
          </div>

          <!-- Remaining Days -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <label class="text-xs font-medium text-muted-600 dark:text-muted-400">
                Sisa hari
              </label>
              <span class="text-sm font-semibold text-primary-600 dark:text-primary-400">
                {{ remainingDays }} hari
              </span>
            </div>
            <input
              v-model.number="remainingDays"
              type="range"
              min="1"
              max="100"
              step="1"
              class="w-full accent-primary-500"
            />
            <input
              v-model.number="remainingDays"
              type="number"
              min="1"
              step="1"
              class="w-full px-3 py-2 text-sm bg-muted-50 dark:bg-muted-950 border border-muted-200 dark:border-muted-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all text-muted-700 dark:text-muted-300"
            />
          </div>

          <!-- Target Progress -->
          <div class="space-y-1.5">
            <label class="text-xs font-medium text-muted-600 dark:text-muted-400">
              Target progress
            </label>
            <input
              v-model.number="targetProgress"
              type="number"
              min="0"
              max="100"
              step="0.1"
              class="w-full px-3 py-2 text-sm bg-muted-50 dark:bg-muted-950 border border-muted-200 dark:border-muted-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all text-muted-700 dark:text-muted-300"
            />
          </div>
        </div>
      </div>

      <!-- Result -->
      <div
        v-if="isValid"
        class="bg-white dark:bg-muted-900 border border-muted-200 dark:border-muted-800 rounded-2xl p-6"
      >
        <div class="flex items-center gap-2 mb-5">
          <Icon name="mdi:lightning-bolt" class="text-lg text-amber-500" />
          <h2 class="text-sm font-semibold text-muted-700 dark:text-muted-300 uppercase tracking-wider">
            Hasil
          </h2>
        </div>

        <div class="text-center py-4">
          <p class="text-sm text-muted-500 dark:text-muted-400 mb-1">
            Progress per hari yang dibutuhkan
          </p>
          <p class="text-5xl font-bold text-primary-600 dark:text-primary-400 tracking-tight">
            {{ formattedDailyRate }}%
          </p>
          <p class="text-sm text-muted-500 dark:text-muted-400 mt-3">
            {{ remainingGap }}% tersisa ÷ {{ remainingDays }} hari
          </p>
        </div>

        <!-- Progress bar -->
        <div class="mt-6 space-y-2">
          <div class="flex justify-between text-xs text-muted-500 dark:text-muted-400">
            <span>{{ currentProgress }}%</span>
            <span>{{ targetProgress }}%</span>
          </div>
          <div class="h-3 bg-muted-100 dark:bg-muted-800 rounded-full overflow-hidden">
            <div
              class="h-full bg-primary-500 rounded-full transition-all duration-300"
              :style="{ width: `${Math.min(currentProgress, 100)}%` }"
            />
          </div>
        </div>
      </div>

      <!-- Error -->
      <div
        v-else
        class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-5 flex items-start gap-3"
      >
        <Icon name="mdi:alert-circle-outline" class="text-xl text-amber-500 shrink-0 mt-0.5" />
        <p class="text-sm text-amber-700 dark:text-amber-300">
          {{ errorMessage }}
        </p>
      </div>

      <!-- Daily breakdown -->
      <div
        v-if="isValid && schedule.length > 0"
        class="bg-white dark:bg-muted-900 border border-muted-200 dark:border-muted-800 rounded-2xl p-6"
      >
        <div class="flex items-center gap-2 mb-5">
          <Icon name="mdi:calendar-range" class="text-lg text-muted-500" />
          <h2 class="text-sm font-semibold text-muted-700 dark:text-muted-300 uppercase tracking-wider">
            Proyeksi Harian
          </h2>
        </div>

        <div class="divide-y divide-muted-100 dark:divide-muted-800 border border-muted-200 dark:border-muted-800 rounded-xl overflow-hidden">
          <div
            v-for="day in schedule"
            :key="day.day"
            class="flex items-center justify-between px-4 py-3 text-sm"
            :class="day.day === schedule.length ? 'bg-primary-50 dark:bg-primary-900/20' : ''"
          >
            <span class="text-muted-600 dark:text-muted-400">
              Hari ke-{{ day.day }}
            </span>
            <span
              class="font-medium"
              :class="day.day === schedule.length ? 'text-primary-600 dark:text-primary-400' : 'text-muted-800 dark:text-muted-200'"
            >
              {{ day.progress }}%
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const currentProgress = ref(10);
const remainingDays = ref(10);
const targetProgress = ref(100);

const remainingGap = computed(() => {
  const gap = targetProgress.value - currentProgress.value;
  return Math.round(gap * 100) / 100;
});

const isValid = computed(() => {
  return (
    remainingDays.value > 0 &&
    currentProgress.value >= 0 &&
    targetProgress.value > currentProgress.value
  );
});

const errorMessage = computed(() => {
  if (remainingDays.value <= 0) return 'Sisa hari harus lebih dari 0.';
  if (currentProgress.value < 0) return 'Progress saat ini tidak boleh negatif.';
  if (targetProgress.value <= currentProgress.value) return 'Target harus lebih besar dari progress saat ini.';
  return 'Input tidak valid.';
});

const dailyRate = computed(() => {
  if (!isValid.value) return 0;
  return remainingGap.value / remainingDays.value;
});

const formattedDailyRate = computed(() => {
  return parseFloat(dailyRate.value.toFixed(2)).toString();
});

const schedule = computed(() => {
  if (!isValid.value) return [];

  const days: { day: number; progress: number }[] = [];
  for (let i = 1; i <= remainingDays.value; i++) {
    const progress = currentProgress.value + dailyRate.value * i;
    days.push({
      day: i,
      progress: Math.round(progress * 100) / 100,
    });
  }
  return days;
});

useHead({
  title: 'Daily Progress Calculator | Tools',
});
</script>
