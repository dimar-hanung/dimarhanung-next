<template>
  <div class="capcut-streak min-h-full text-[var(--cs-ink)]">
    <div class="capcut-streak__glow" aria-hidden="true" />

    <!-- Sticky progress -->
    <div class="sticky top-0 z-20 border-b border-[var(--cs-line)] bg-[color-mix(in_srgb,var(--cs-bg)_88%,transparent)] backdrop-blur-md">
      <div class="mx-auto flex max-w-5xl flex-wrap items-center gap-4 px-4 py-3 sm:px-6">
        <div class="min-w-0 flex-1">
          <div class="mb-1 flex items-center justify-between gap-3">
            <span class="cs-body text-base text-[var(--cs-muted)]">
              Selesai
            </span>
            <span class="cs-body tabular-nums text-base text-[var(--cs-accent)]">
              {{ completedDayCount }}/30 hari
            </span>
          </div>
          <div
            class="h-2 overflow-hidden rounded-full bg-[var(--cs-track)]"
            role="progressbar"
            :aria-valuenow="progressPercent"
            aria-valuemin="0"
            aria-valuemax="100"
            :aria-label="`${progressPercent} persen selesai`"
          >
            <div
              class="h-full rounded-full bg-[var(--cs-accent)] transition-[width] duration-300 ease-out"
              :style="{ width: `${progressPercent}%` }"
            />
          </div>
        </div>
        <div class="flex items-center gap-3">
          <div
            class="rounded-[var(--cs-radius-md)] border border-[var(--cs-line)] bg-[var(--cs-panel)] px-3 py-2"
            title="Hari beruntun dari hari 1"
          >
            <p class="cs-body text-base text-[var(--cs-muted)]">Streak</p>
            <p class="cs-display text-xl tracking-tight text-[var(--cs-ink)]">
              {{ streakCount }}
              <span class="text-base text-[var(--cs-muted)]">hari</span>
            </p>
          </div>
          <button
            type="button"
            class="rounded-[var(--cs-radius-md)] border border-[var(--cs-line)] bg-[var(--cs-panel)] px-3 py-2 text-base text-[var(--cs-muted)] transition-[color,border-color,background-color] duration-150 ease-out hover:border-[var(--cs-accent)]/40 hover:text-[var(--cs-ink)]"
            @click="requestReset"
          >
            Mulai ulang
          </button>
        </div>
      </div>
    </div>

    <div class="relative mx-auto max-w-5xl px-4 pb-20 pt-10 sm:px-6">
      <!-- Hero -->
      <header class="relative mb-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <p class="mb-3 cs-display text-2xl tracking-tight text-[var(--cs-accent)] sm:text-3xl">
            CapCut × TikTok
          </p>
          <h1 class="cs-display text-4xl leading-[1.05] tracking-tight text-[var(--cs-ink)] sm:text-5xl lg:text-6xl">
            30 hari edit
            <span class="block text-[var(--cs-accent)]">AI assist, skill lanjutan</span>
          </h1>
          <p class="mt-5 max-w-xl cs-body text-lg leading-relaxed text-[var(--cs-muted)]">
            AI untuk first pass. Kamu fokus hook, pacing, proofread, dan motion. Tiap hari ada ujian mandiri dan script video.
          </p>
          <div class="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              class="rounded-[var(--cs-radius-md)] bg-[var(--cs-accent)] px-5 py-3 cs-body text-base font-semibold text-[var(--cs-bg)] transition-[transform,opacity] duration-150 ease-out hover:opacity-90 active:scale-[0.97]"
              @click="jumpToToday"
            >
              Lanjut hari {{ focusDay }}
            </button>
            <a
              href="#calendar"
              class="rounded-[var(--cs-radius-md)] border border-[var(--cs-line)] bg-[var(--cs-panel)] px-5 py-3 cs-body text-base text-[var(--cs-ink)] transition-[border-color] duration-150 ease-out hover:border-[var(--cs-accent)]/50"
            >
              Buka kalender
            </a>
          </div>
        </div>

        <aside
          class="relative overflow-hidden rounded-[var(--cs-radius-lg)] border border-[var(--cs-line)] bg-[var(--cs-panel)] p-5"
          aria-label="Contoh frame vertikal TikTok"
        >
          <div class="pointer-events-none absolute inset-0 opacity-40" aria-hidden="true">
            <div class="absolute -right-8 -top-10 h-40 w-40 rounded-full bg-[var(--cs-accent)]/20 blur-3xl" />
            <div class="absolute -bottom-10 left-0 h-32 w-32 rounded-full bg-[#F97316]/15 blur-3xl" />
          </div>
          <div class="relative mx-auto aspect-[9/16] max-h-72 w-full max-w-[180px] overflow-hidden rounded-[1.25rem] border border-[var(--cs-line)] bg-[var(--cs-bg)] shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
            <div class="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-black/50 to-transparent" />
            <div class="absolute inset-x-3 top-10 space-y-2">
              <div class="h-2 w-2/3 rounded-full bg-[var(--cs-accent)]" />
              <div class="h-2 w-1/2 rounded-full bg-white/20" />
            </div>
            <div class="absolute inset-x-0 bottom-10 px-3">
              <p class="cs-display text-lg leading-tight text-white">
                Hook 3 detik
              </p>
              <p class="mt-1 cs-body text-base text-white/70">
                9:16 · 1080×1920
              </p>
            </div>
            <div class="absolute inset-x-0 bottom-0 flex h-8 items-end gap-0.5 px-2 pb-2">
              <span
                v-for="n in 18"
                :key="n"
                class="flex-1 rounded-sm bg-[var(--cs-accent)]/70"
                :style="{ height: `${10 + ((n * 37) % 18)}px`, opacity: n === playheadIndex ? 1 : 0.35 }"
              />
            </div>
          </div>
          <p class="relative mt-4 text-center cs-body text-base text-[var(--cs-muted)]">
            Target: video 15-60 detik, rapi di HP
          </p>
        </aside>
      </header>

      <!-- Principles -->
      <section class="mb-12" aria-labelledby="prinsip-heading">
        <h2
          id="prinsip-heading"
          class="mb-4 cs-display text-2xl tracking-tight text-[var(--cs-ink)]"
        >
          Urutan belajar
        </h2>
        <ul class="divide-y divide-[var(--cs-line)] rounded-[var(--cs-radius-lg)] border border-[var(--cs-line)] bg-[var(--cs-panel)]">
          <li
            v-for="(principle, i) in principles"
            :key="i"
            class="flex gap-3 px-4 py-3 cs-body text-base text-[var(--cs-muted)]"
          >
            <span class="tabular-nums text-[var(--cs-accent)]">{{ i + 1 }}.</span>
            <span>{{ principle }}</span>
          </li>
        </ul>
      </section>

      <!-- Calendar -->
      <section id="calendar" class="mb-10 scroll-mt-28" aria-labelledby="calendar-heading">
        <div class="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2
              id="calendar-heading"
              class="cs-display text-2xl tracking-tight text-[var(--cs-ink)]"
            >
              Kalender 30 hari
            </h2>
            <p class="mt-1 cs-body text-base text-[var(--cs-muted)]">
              Ketuk hari untuk buka checklist.
            </p>
          </div>
          <div class="flex flex-wrap gap-2" role="tablist" aria-label="Saring fase">
            <button
              type="button"
              role="tab"
              :aria-selected="phaseFilter === 'all'"
              class="rounded-full border px-3 py-1.5 text-base transition-[color,border-color,background-color] duration-150 ease-out"
              :class="
                phaseFilter === 'all'
                  ? 'border-[var(--cs-accent)] bg-[var(--cs-accent)]/15 text-[var(--cs-accent)]'
                  : 'border-[var(--cs-line)] text-[var(--cs-muted)] hover:text-[var(--cs-ink)]'
              "
              @click="phaseFilter = 'all'"
            >
              Semua
            </button>
            <button
              v-for="phase in phaseKeys"
              :key="phase"
              type="button"
              role="tab"
              :aria-selected="phaseFilter === phase"
              class="rounded-full border px-3 py-1.5 text-base transition-[color,border-color,background-color] duration-150 ease-out"
              :class="
                phaseFilter === phase
                  ? 'border-[var(--cs-accent)] bg-[var(--cs-accent)]/15 text-[var(--cs-accent)]'
                  : 'border-[var(--cs-line)] text-[var(--cs-muted)] hover:text-[var(--cs-ink)]'
              "
              @click="phaseFilter = phase"
            >
              {{ PHASE_META[phase].short }}
            </button>
          </div>
        </div>

        <div class="grid grid-cols-5 gap-2 sm:grid-cols-6 md:grid-cols-10">
          <button
            v-for="day in filteredDays"
            :key="day.day"
            type="button"
            class="group relative aspect-square rounded-[var(--cs-radius-md)] border text-left transition-[transform,border-color,background-color] duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--cs-accent)] active:scale-[0.97]"
            :class="dayButtonClass(day.day)"
            :aria-current="activeDay === day.day ? 'true' : undefined"
            :aria-label="`Hari ${day.day}, ${day.title}${isDayComplete(day.day) ? ', selesai' : ''}`"
            @click="selectDay(day.day)"
          >
            <span class="absolute left-1.5 top-1.5 cs-body text-base tabular-nums opacity-80">
              {{ day.day }}
            </span>
            <span
              class="absolute bottom-1.5 left-1.5 right-1.5 truncate cs-body text-base leading-tight"
              :style="{ color: PHASE_META[day.phase].color }"
            >
              {{ PHASE_META[day.phase].short }}
            </span>
            <span
              v-if="isDayComplete(day.day)"
              class="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-[var(--cs-accent)]"
              aria-hidden="true"
            />
          </button>
        </div>
      </section>

      <!-- Day detail -->
      <section
        id="day-detail"
        class="mb-12 scroll-mt-28 overflow-hidden rounded-[var(--cs-radius-lg)] border border-[var(--cs-line)] bg-[var(--cs-panel)]"
        aria-labelledby="day-detail-heading"
      >
        <div class="border-b border-[var(--cs-line)] px-4 py-5 sm:px-6">
          <div class="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p class="cs-body text-base text-[var(--cs-muted)]">
                Fase {{ selected.phase }} · {{ PHASE_META[selected.phase].label }} ·
                {{ selected.minutes }} menit
              </p>
              <h2
                id="day-detail-heading"
                class="mt-1 cs-display text-3xl tracking-tight text-[var(--cs-ink)]"
              >
                Hari {{ selected.day }}: {{ selected.title }}
              </h2>
              <p class="mt-2 cs-body text-base text-[var(--cs-muted)]">
                {{ selected.focus }}
              </p>
            </div>
            <div class="flex gap-2">
              <button
                type="button"
                class="rounded-[var(--cs-radius-md)] border border-[var(--cs-line)] px-3 py-2 text-base text-[var(--cs-muted)] transition-colors duration-150 ease-out hover:text-[var(--cs-ink)] disabled:opacity-40"
                :disabled="activeDay <= 1"
                @click="selectDay(activeDay - 1)"
              >
                Sebelumnya
              </button>
              <button
                type="button"
                class="rounded-[var(--cs-radius-md)] border border-[var(--cs-line)] px-3 py-2 text-base text-[var(--cs-muted)] transition-colors duration-150 ease-out hover:text-[var(--cs-ink)] disabled:opacity-40"
                :disabled="activeDay >= 30"
                @click="selectDay(activeDay + 1)"
              >
                Berikutnya
              </button>
            </div>
          </div>
        </div>

        <div class="border-b border-[var(--cs-line)] bg-[var(--cs-bg)]/40 px-4 py-4 sm:px-6">
          <p class="cs-body text-base text-[var(--cs-ink)]">
            <span class="text-[var(--cs-accent)]">Catatan.</span>
            {{ selected.tip }}
          </p>
        </div>

        <fieldset class="px-4 py-2 sm:px-6">
          <legend class="sr-only">Tugas hari {{ selected.day }}</legend>
          <ul class="divide-y divide-[var(--cs-line)]">
            <li v-for="(task, index) in selected.tasks" :key="taskKey(selected.day, index)">
              <label
                class="flex cursor-pointer items-start gap-3 py-4 transition-colors duration-150 ease-out hover:bg-white/[0.02]"
              >
                <input
                  type="checkbox"
                  class="cs-check mt-1"
                  :checked="!!stored.tasks?.[taskKey(selected.day, index)]"
                  :aria-checked="!!stored.tasks?.[taskKey(selected.day, index)]"
                  @change="toggleTask(selected.day, index)"
                />
                <span
                  class="cs-body text-base leading-relaxed"
                  :class="
                    stored.tasks?.[taskKey(selected.day, index)]
                      ? 'text-[var(--cs-muted)] line-through decoration-[var(--cs-line)]'
                      : 'text-[var(--cs-ink)]'
                  "
                >
                  {{ task }}
                </span>
              </label>
            </li>
          </ul>
        </fieldset>

        <!-- Daily self-check -->
        <fieldset class="border-t border-[var(--cs-line)] px-4 py-2 sm:px-6">
          <legend class="mb-1 block px-0 py-3 cs-body text-base font-semibold text-[var(--cs-ink)]">
            Ujian mandiri hari ini
          </legend>
          <p class="mb-2 cs-body text-base text-[var(--cs-muted)]">
            Centang kalau sudah bisa tanpa buka tutorial.
          </p>
          <ul class="divide-y divide-[var(--cs-line)]">
            <li
              v-for="(check, index) in selected.selfCheck"
              :key="selfCheckKey(selected.day, index)"
            >
              <label
                class="flex cursor-pointer items-start gap-3 py-4 transition-colors duration-150 ease-out hover:bg-white/[0.02]"
              >
                <input
                  type="checkbox"
                  class="cs-check mt-1"
                  :checked="!!stored.selfCheck?.[selfCheckKey(selected.day, index)]"
                  @change="toggleSelfCheck(selected.day, index)"
                />
                <span
                  class="cs-body text-base leading-relaxed"
                  :class="
                    stored.selfCheck?.[selfCheckKey(selected.day, index)]
                      ? 'text-[var(--cs-muted)] line-through decoration-[var(--cs-line)]'
                      : 'text-[var(--cs-ink)]'
                  "
                >
                  {{ check }}
                </span>
              </label>
            </li>
          </ul>
        </fieldset>

        <!-- Daily video script -->
        <div class="border-t border-[var(--cs-line)] px-4 py-5 sm:px-6">
          <div class="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <p class="cs-body text-base font-semibold text-[var(--cs-ink)]">
                Script video harian
              </p>
              <p class="mt-1 cs-body text-base text-[var(--cs-muted)]">
                Rekam apa yang dipelajari hari ini. Target 25-45 detik.
              </p>
            </div>
            <button
              type="button"
              class="rounded-[var(--cs-radius-md)] border border-[var(--cs-line)] px-3 py-2 text-base text-[var(--cs-muted)] transition-[color,border-color] duration-150 ease-out hover:border-[var(--cs-accent)]/40 hover:text-[var(--cs-ink)]"
              @click="copyVideoScript"
            >
              {{ scriptCopied ? 'Tersalin' : 'Salin script' }}
            </button>
          </div>

          <div class="space-y-4 rounded-[var(--cs-radius-md)] border border-[var(--cs-line)] bg-[var(--cs-bg)]/50 p-4">
            <div>
              <p class="cs-body text-base text-[var(--cs-accent)]">Hook (0-3 dtk)</p>
              <p class="mt-1 cs-body text-base leading-relaxed text-[var(--cs-ink)]">
                {{ selected.videoScript.hook }}
              </p>
            </div>
            <div>
              <p class="cs-body text-base text-[var(--cs-muted)]">Isi</p>
              <ul class="mt-2 space-y-2">
                <li
                  v-for="(line, index) in selected.videoScript.body"
                  :key="index"
                  class="cs-body text-base leading-relaxed text-[var(--cs-ink)]"
                >
                  {{ line }}
                </li>
              </ul>
            </div>
            <div>
              <p class="cs-body text-base text-[var(--cs-muted)]">Penutup</p>
              <p class="mt-1 cs-body text-base leading-relaxed text-[var(--cs-ink)]">
                {{ selected.videoScript.cta }}
              </p>
            </div>
            <div v-if="selected.videoScript.onScreen?.length">
              <p class="cs-body text-base text-[var(--cs-muted)]">Tampilkan di layar</p>
              <ul class="mt-2 space-y-1">
                <li
                  v-for="(cue, index) in selected.videoScript.onScreen"
                  :key="index"
                  class="cs-body text-base text-[var(--cs-muted)]"
                >
                  · {{ cue }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div
          v-if="selected.refs.length"
          class="border-t border-[var(--cs-line)] px-4 py-4 sm:px-6"
        >
          <p class="mb-2 cs-body text-base text-[var(--cs-muted)]">
            Materi hari ini
          </p>
          <ul class="flex flex-col gap-2">
            <li v-for="ref in selected.refs" :key="ref.href">
              <a
                :href="ref.href"
                target="_blank"
                rel="noopener noreferrer"
                class="cs-body text-base text-[var(--cs-accent)] underline-offset-4 hover:underline"
              >
                {{ ref.label }}
              </a>
            </li>
          </ul>
        </div>
      </section>

      <!-- Competency -->
      <section
        id="kompetensi"
        class="mb-12 overflow-hidden rounded-[var(--cs-radius-lg)] border border-[var(--cs-line)] bg-[var(--cs-panel)]"
        aria-labelledby="kompetensi-heading"
      >
        <div class="border-b border-[var(--cs-line)] px-4 py-5 sm:px-6">
          <h2
            id="kompetensi-heading"
            class="cs-display text-2xl tracking-tight text-[var(--cs-ink)]"
          >
            Ujian mandiri akhir (hari 30)
          </h2>
          <p class="mt-2 cs-body text-base text-[var(--cs-muted)]">
            Centang yang sudah bisa dengan AI assist + proofread manual.
            {{ competencyDoneCount }}/{{ COMPETENCY_ITEMS.length }} siap.
          </p>
        </div>
        <fieldset class="px-4 py-2 sm:px-6">
          <legend class="sr-only">Ujian mandiri CapCut TikTok</legend>
          <ul class="divide-y divide-[var(--cs-line)]">
            <li v-for="item in COMPETENCY_ITEMS" :key="item.id">
              <label
                class="flex cursor-pointer items-start gap-3 py-4 transition-colors duration-150 ease-out hover:bg-white/[0.02]"
              >
                <input
                  type="checkbox"
                  class="cs-check mt-1"
                  :checked="!!stored.competency?.[item.id]"
                  @change="toggleCompetency(item.id)"
                />
                <span
                  class="cs-body text-base leading-relaxed"
                  :class="
                    stored.competency?.[item.id]
                      ? 'text-[var(--cs-muted)] line-through decoration-[var(--cs-line)]'
                      : 'text-[var(--cs-ink)]'
                  "
                >
                  {{ item.label }}
                </span>
              </label>
            </li>
          </ul>
        </fieldset>
      </section>

      <!-- Export cheat sheet -->
      <section class="mb-8" aria-labelledby="export-heading">
        <h2
          id="export-heading"
          class="mb-4 cs-display text-2xl tracking-tight text-[var(--cs-ink)]"
        >
          Setting export ke TikTok
        </h2>
        <dl class="divide-y divide-[var(--cs-line)] rounded-[var(--cs-radius-lg)] border border-[var(--cs-line)] bg-[var(--cs-panel)]">
          <div
            v-for="row in exportRows"
            :key="row.label"
            class="grid grid-cols-[8rem_1fr] gap-3 px-4 py-3 sm:grid-cols-[10rem_1fr]"
          >
            <dt class="cs-body text-base text-[var(--cs-muted)]">
              {{ row.label }}
            </dt>
            <dd class="cs-body text-base text-[var(--cs-ink)]">
              {{ row.value }}
            </dd>
          </div>
        </dl>
      </section>

      <p class="cs-body text-base text-[var(--cs-muted)]">
        Progress tersimpan di browser ini. Hapus lewat Mulai ulang, atau hapus data situs di pengaturan browser.
      </p>
    </div>

    <!-- Reset dialog -->
    <div
      v-if="showResetDialog"
      class="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reset-title"
      @click.self="showResetDialog = false"
    >
      <div
        class="w-full max-w-md rounded-[var(--cs-radius-lg)] border border-[var(--cs-line)] bg-[var(--cs-panel)] p-5 shadow-2xl"
      >
        <h3
          id="reset-title"
          class="cs-display text-2xl text-[var(--cs-ink)]"
        >
          Hapus progress CapCut 30 hari?
        </h3>
        <p class="mt-2 cs-body text-base text-[var(--cs-muted)]">
          Semua centang harian dan ujian mandiri hilang dari browser ini. Tidak bisa dikembalikan.
        </p>
        <div class="mt-5 flex flex-wrap justify-end gap-2">
          <button
            type="button"
            class="rounded-[var(--cs-radius-md)] border border-[var(--cs-line)] px-4 py-2 text-base text-[var(--cs-ink)]"
            @click="showResetDialog = false"
          >
            Batal
          </button>
          <button
            type="button"
            class="rounded-[var(--cs-radius-md)] bg-[#DC2626] px-4 py-2 text-base font-semibold text-white"
            @click="confirmReset"
          >
            Hapus progress
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import {
  CAPCUT_DAYS,
  COMPETENCY_ITEMS,
  PHASE_META,
  daySelfCheckKeys,
  dayTaskKeys,
  selfCheckKey,
  taskKey,
  type CapcutPhase,
} from '~/utils/capcut-tiktok-30day'

definePageMeta({
  key: (route) => route.fullPath,
})

useSeoMeta({
  title: '30 hari CapCut AI untuk TikTok | Challenges',
  description:
    'Roadmap CapCut 30 hari dengan AI assist: Auto Cut, caption, remove BG, keyframe, batch workflow.',
})

useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Figtree:wght@400;600;700&family=Syne:wght@600;700;800&display=swap',
    },
  ],
})

interface StoredProgress {
  tasks: Record<string, boolean>
  selfCheck: Record<string, boolean>
  competency: Record<string, boolean>
  activeDay: number
}

const STORAGE_KEY = 'capcut-tiktok-30day-ai-v1'

const stored = useStorage<StoredProgress>(
  STORAGE_KEY,
  {
    tasks: {},
    selfCheck: {},
    competency: {},
    activeDay: 1,
  },
  undefined,
  { mergeDefaults: true },
)

if (import.meta.client) {
  stored.value = {
    tasks: stored.value.tasks ?? {},
    selfCheck: stored.value.selfCheck ?? {},
    competency: stored.value.competency ?? {},
    activeDay: stored.value.activeDay || 1,
  }
}

const phaseFilter = ref<'all' | CapcutPhase>('all')
const showResetDialog = ref(false)
const playheadIndex = ref(7)
const scriptCopied = ref(false)

const principles = [
  'AI untuk first pass: Auto Cut, caption, remove BG. Kamu yang proofread dan putuskan pacing.',
  'Hook 3 detik dan jump cut manual tetap wajib, walau sudah pakai Auto Cut.',
  'Caption AI = draft. Nama, istilah, dan timing dicek manual.',
  'Motion (keyframe, speed ramp) dimulai minggu 2, karena caption/cut sudah di-handle AI.',
  'Batch 3 video ~60 menit di akhir bulan. Ukur waktu edit vs watch time.',
]

const exportRows = [
  { label: 'Rasio', value: '9:16' },
  { label: 'Resolusi', value: '1080 x 1920' },
  { label: 'Codec', value: 'H.264, MP4' },
  { label: 'Frame rate', value: 'Ikut sumber (30 atau 60 fps)' },
  { label: 'Cek akhir', value: 'File export asli di HP, bukan re-upload' },
]

const phaseKeys = [0, 1, 2, 3, 4, 5] as CapcutPhase[]

const activeDay = computed({
  get: () => stored.value.activeDay || 1,
  set: (v: number) => {
    stored.value.activeDay = v
  },
})

const selected = computed(
  () => CAPCUT_DAYS.find((d) => d.day === activeDay.value) ?? CAPCUT_DAYS[0],
)

const filteredDays = computed(() => {
  if (phaseFilter.value === 'all') return CAPCUT_DAYS
  return CAPCUT_DAYS.filter((d) => d.phase === phaseFilter.value)
})

function isDayComplete(dayNumber: number) {
  const day = CAPCUT_DAYS.find((d) => d.day === dayNumber)
  if (!day) return false
  const tasksDone = dayTaskKeys(day).every((key) => !!stored.value.tasks?.[key])
  const checksDone = daySelfCheckKeys(day).every(
    (key) => !!stored.value.selfCheck?.[key],
  )
  return tasksDone && checksDone
}

const completedDayCount = computed(
  () => CAPCUT_DAYS.filter((d) => isDayComplete(d.day)).length,
)

const progressPercent = computed(() =>
  Math.round((completedDayCount.value / CAPCUT_DAYS.length) * 100),
)

const streakCount = computed(() => {
  let streak = 0
  for (const day of CAPCUT_DAYS) {
    if (!isDayComplete(day.day)) break
    streak += 1
  }
  return streak
})

const competencyDoneCount = computed(
  () =>
    COMPETENCY_ITEMS.filter((item) => !!stored.value.competency?.[item.id]).length,
)

const focusDay = computed(() => {
  const firstOpen = CAPCUT_DAYS.find((d) => !isDayComplete(d.day))
  return firstOpen?.day ?? 30
})

function selectDay(day: number) {
  activeDay.value = day
  if (import.meta.client) {
    document.getElementById('day-detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function jumpToToday() {
  selectDay(focusDay.value)
}

function toggleTask(day: number, taskIndex: number) {
  const key = taskKey(day, taskIndex)
  const current = stored.value.tasks ?? {}
  stored.value.tasks = {
    ...current,
    [key]: !current[key],
  }
}

function toggleSelfCheck(day: number, checkIndex: number) {
  const key = selfCheckKey(day, checkIndex)
  const current = stored.value.selfCheck ?? {}
  stored.value.selfCheck = {
    ...current,
    [key]: !current[key],
  }
}

function formatVideoScript(day = selected.value) {
  const lines = [
    `[Hook] ${day.videoScript.hook}`,
    '',
    ...day.videoScript.body.map((line) => line),
    '',
    `[Penutup] ${day.videoScript.cta}`,
  ]
  if (day.videoScript.onScreen?.length) {
    lines.push('', '[Tampilkan di layar]', ...day.videoScript.onScreen.map((c) => `- ${c}`))
  }
  return lines.join('\n')
}

async function copyVideoScript() {
  if (!import.meta.client) return
  try {
    await navigator.clipboard.writeText(formatVideoScript())
    scriptCopied.value = true
    window.setTimeout(() => {
      scriptCopied.value = false
    }, 2000)
  } catch {
    scriptCopied.value = false
  }
}

function toggleCompetency(id: string) {
  const current = stored.value.competency ?? {}
  stored.value.competency = {
    ...current,
    [id]: !current[id],
  }
}

function dayButtonClass(day: number) {
  const complete = isDayComplete(day)
  const active = activeDay.value === day
  if (active) {
    return 'border-[var(--cs-accent)] bg-[var(--cs-accent)]/15 text-[var(--cs-ink)]'
  }
  if (complete) {
    return 'border-[var(--cs-line)] bg-[var(--cs-bg)] text-[var(--cs-ink)]'
  }
  return 'border-[var(--cs-line)] bg-[var(--cs-panel)] text-[var(--cs-muted)] hover:border-[var(--cs-accent)]/40 hover:text-[var(--cs-ink)]'
}

function requestReset() {
  showResetDialog.value = true
}

function confirmReset() {
  stored.value = {
    tasks: {},
    selfCheck: {},
    competency: {},
    activeDay: 1,
  }
  showResetDialog.value = false
  phaseFilter.value = 'all'
}

let playheadTimer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion) return
  playheadTimer = setInterval(() => {
    playheadIndex.value = (playheadIndex.value % 18) + 1
  }, 180)
})

onUnmounted(() => {
  if (playheadTimer) clearInterval(playheadTimer)
})
</script>

<style scoped>
.capcut-streak {
  --cs-bg: #0c0a09;
  --cs-panel: #1c1917;
  --cs-track: #292524;
  --cs-line: #44403c;
  --cs-ink: #fafaf9;
  --cs-muted: #a8a29e;
  --cs-accent: #fbbf24;
  --cs-display: 'Syne', system-ui, sans-serif;
  --cs-body: 'Figtree', system-ui, sans-serif;
  --cs-radius-md: 0.625rem;
  --cs-radius-lg: 1rem;
  background:
    radial-gradient(1200px 500px at 10% -10%, rgba(251, 191, 36, 0.12), transparent 55%),
    radial-gradient(900px 400px at 90% 0%, rgba(249, 115, 22, 0.1), transparent 50%),
    linear-gradient(180deg, #120f0d 0%, var(--cs-bg) 40%, #0c0a09 100%);
  font-family: var(--cs-body);
  min-height: 100%;
}

.cs-display {
  font-family: var(--cs-display);
}

.cs-body {
  font-family: var(--cs-body);
}

.capcut-streak__glow {
  pointer-events: none;
  position: absolute;
  inset: 0;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.03) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: linear-gradient(180deg, black, transparent 70%);
  opacity: 0.5;
}

.cs-check {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
  appearance: none;
  border: 2px solid var(--cs-line);
  border-radius: 0.35rem;
  background: var(--cs-bg);
  cursor: pointer;
  transition:
    background-color 150ms ease-out,
    border-color 150ms ease-out,
    transform 150ms ease-out;
}

.cs-check:checked {
  background: var(--cs-accent);
  border-color: var(--cs-accent);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%230c0a09' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3.5 8.5 6.5 11.5 12.5 4.5'/%3E%3C/svg%3E");
  background-size: 0.9rem;
  background-position: center;
  background-repeat: no-repeat;
}

.cs-check:focus-visible {
  outline: 2px solid var(--cs-accent);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .capcut-streak :deep(*) {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
</style>
