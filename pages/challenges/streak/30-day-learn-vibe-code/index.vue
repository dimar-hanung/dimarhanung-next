<template>
  <div class="vibe-streak min-h-full text-[var(--vc-ink)]">
    <div class="vibe-streak__grid" aria-hidden="true" />

    <div class="sticky top-0 z-20 border-b border-[var(--vc-line)] bg-[color-mix(in_srgb,var(--vc-bg)_88%,transparent)] backdrop-blur-md">
      <div class="mx-auto flex max-w-5xl flex-wrap items-center gap-4 px-4 py-3 sm:px-6">
        <div class="min-w-0 flex-1">
          <div class="mb-1 flex items-center justify-between gap-3">
            <span class="vc-body text-base text-[var(--vc-muted)]">
              Selesai
            </span>
            <span class="vc-body tabular-nums text-base text-[var(--vc-accent)]">
              {{ completedDayCount }}/30 hari
            </span>
          </div>
          <div
            class="h-2 overflow-hidden rounded-full bg-[var(--vc-track)]"
            role="progressbar"
            :aria-valuenow="progressPercent"
            aria-valuemin="0"
            aria-valuemax="100"
            :aria-label="`${progressPercent} persen selesai`"
          >
            <div
              class="h-full rounded-full bg-[var(--vc-accent)] transition-[width] duration-300 ease-out"
              :style="{ width: `${progressPercent}%` }"
            />
          </div>
        </div>
        <div class="flex items-center gap-3">
          <div
            class="rounded-[var(--vc-radius-md)] border border-[var(--vc-line)] bg-[var(--vc-panel)] px-3 py-2"
            title="Hari beruntun dari hari 1"
          >
            <p class="vc-body text-base text-[var(--vc-muted)]">Streak</p>
            <p class="vc-display text-xl tracking-tight text-[var(--vc-ink)]">
              {{ streakCount }}
              <span class="text-base text-[var(--vc-muted)]">hari</span>
            </p>
          </div>
          <button
            type="button"
            class="rounded-[var(--vc-radius-md)] border border-[var(--vc-line)] bg-[var(--vc-panel)] px-3 py-2 text-base text-[var(--vc-muted)] transition-[color,border-color,background-color] duration-150 ease-out hover:border-[var(--vc-accent)]/40 hover:text-[var(--vc-ink)]"
            @click="requestReset"
          >
            Mulai ulang
          </button>
        </div>
      </div>
    </div>

    <div class="relative mx-auto max-w-5xl px-4 pb-20 pt-10 sm:px-6">
      <header class="relative mb-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div>
          <p class="mb-3 vc-display text-2xl tracking-tight text-[var(--vc-accent)] sm:text-3xl">
            Syarat ikut: sudah bisa baca error, git, dan jelaskan code
          </p>
          <h1 class="vc-display text-4xl leading-[1.05] tracking-tight text-[var(--vc-ink)] sm:text-5xl lg:text-6xl">
            30 hari vibe coding
            <span class="block text-[var(--vc-accent)]">sampai expert</span>
          </h1>
          <p class="mt-5 max-w-xl vc-body text-lg leading-relaxed text-[var(--vc-muted)]">
            Bukan kelas fundamental. Target hari 30: kamu lead, Agent eksekusi, diff dibaca, skill dan rules ikut rapi.
          </p>
          <div class="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              class="rounded-[var(--vc-radius-md)] bg-[var(--vc-accent)] px-5 py-3 vc-body text-base font-semibold text-[var(--vc-bg)] transition-[transform,opacity] duration-150 ease-out hover:opacity-90 active:scale-[0.97]"
              @click="jumpToToday"
            >
              Lanjut hari {{ focusDay }}
            </button>
            <a
              href="#calendar"
              class="rounded-[var(--vc-radius-md)] border border-[var(--vc-line)] bg-[var(--vc-panel)] px-5 py-3 vc-body text-base text-[var(--vc-ink)] transition-[border-color] duration-150 ease-out hover:border-[var(--vc-accent)]/50"
            >
              Buka kalender
            </a>
          </div>
        </div>

        <aside
          class="overflow-hidden rounded-[var(--vc-radius-lg)] border border-[var(--vc-line)] bg-[var(--vc-panel)]"
          aria-label="Contoh prompt di editor"
        >
          <div class="flex items-center gap-2 border-b border-[var(--vc-line)] px-4 py-2.5">
            <span class="h-2.5 w-2.5 rounded-full bg-[#F87171]" aria-hidden="true" />
            <span class="h-2.5 w-2.5 rounded-full bg-[#FBBF24]" aria-hidden="true" />
            <span class="h-2.5 w-2.5 rounded-full bg-[var(--vc-accent)]" aria-hidden="true" />
            <span class="ml-2 vc-mono text-base text-[var(--vc-muted)]">agent · plan</span>
          </div>
          <div class="space-y-3 px-4 py-4 vc-mono text-base leading-relaxed">
            <p class="text-[var(--vc-muted)]">kamu</p>
            <p class="text-[var(--vc-ink)]">
              Lihat @pages/login.vue. Tambah validasi email.
              <span
                class="vc-caret inline-block h-4 w-2 translate-y-0.5 bg-[var(--vc-accent)] align-middle"
                :class="{ 'opacity-0': !caretOn }"
                aria-hidden="true"
              />
            </p>
            <p class="text-[var(--vc-muted)]">diff</p>
            <p class="text-[#F87171]">- if (email) submit()</p>
            <p class="text-[var(--vc-accent)]">+ if (!isEmail(email)) return error</p>
          </div>
          <p class="border-t border-[var(--vc-line)] px-4 py-3 vc-body text-base text-[var(--vc-muted)]">
            Prompt spesifik. Diff dibaca. Baru accept.
          </p>
        </aside>
      </header>

      <section class="mb-12" aria-labelledby="prinsip-heading">
        <h2
          id="prinsip-heading"
          class="mb-4 vc-display text-2xl tracking-tight text-[var(--vc-ink)]"
        >
          Urutan belajar
        </h2>
        <ul class="divide-y divide-[var(--vc-line)] rounded-[var(--vc-radius-lg)] border border-[var(--vc-line)] bg-[var(--vc-panel)]">
          <li
            v-for="(principle, i) in principles"
            :key="i"
            class="flex gap-3 px-4 py-3 vc-body text-base text-[var(--vc-muted)]"
          >
            <span class="tabular-nums text-[var(--vc-accent)]">{{ i + 1 }}.</span>
            <span>{{ principle }}</span>
          </li>
        </ul>
      </section>

      <section id="calendar" class="mb-10 scroll-mt-28" aria-labelledby="calendar-heading">
        <div class="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2
              id="calendar-heading"
              class="vc-display text-2xl tracking-tight text-[var(--vc-ink)]"
            >
              Kalender 30 hari
            </h2>
            <p class="mt-1 vc-body text-base text-[var(--vc-muted)]">
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
                  ? 'border-[var(--vc-accent)] bg-[var(--vc-accent)]/15 text-[var(--vc-accent)]'
                  : 'border-[var(--vc-line)] text-[var(--vc-muted)] hover:text-[var(--vc-ink)]'
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
                  ? 'border-[var(--vc-accent)] bg-[var(--vc-accent)]/15 text-[var(--vc-accent)]'
                  : 'border-[var(--vc-line)] text-[var(--vc-muted)] hover:text-[var(--vc-ink)]'
              "
              @click="phaseFilter = phase"
            >
              {{ VIBE_PHASE_META[phase].short }}
            </button>
          </div>
        </div>

        <div class="grid grid-cols-5 gap-2 sm:grid-cols-6 md:grid-cols-10">
          <button
            v-for="day in filteredDays"
            :key="day.day"
            type="button"
            class="group relative aspect-square rounded-[var(--vc-radius-md)] border text-left transition-[transform,border-color,background-color] duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--vc-accent)] active:scale-[0.97]"
            :class="dayButtonClass(day.day)"
            :aria-current="activeDay === day.day ? 'true' : undefined"
            :aria-label="`Hari ${day.day}, ${day.title}${isDayComplete(day.day) ? ', selesai' : ''}`"
            @click="selectDay(day.day)"
          >
            <span class="absolute left-1.5 top-1.5 vc-body text-base tabular-nums opacity-80">
              {{ day.day }}
            </span>
            <span
              class="absolute bottom-1.5 left-1.5 right-1.5 truncate vc-body text-base leading-tight"
              :style="{ color: VIBE_PHASE_META[day.phase].color }"
            >
              {{ VIBE_PHASE_META[day.phase].short }}
            </span>
            <span
              v-if="isDayComplete(day.day)"
              class="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-[var(--vc-accent)]"
              aria-hidden="true"
            />
          </button>
        </div>
      </section>

      <section
        id="day-detail"
        class="mb-12 scroll-mt-28 overflow-hidden rounded-[var(--vc-radius-lg)] border border-[var(--vc-line)] bg-[var(--vc-panel)]"
        aria-labelledby="day-detail-heading"
      >
        <div class="border-b border-[var(--vc-line)] px-4 py-5 sm:px-6">
          <div class="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p class="vc-body text-base text-[var(--vc-muted)]">
                {{ VIBE_PHASE_META[selected.phase].label }} ·
                {{ selected.minutes }} menit
              </p>
              <h2
                id="day-detail-heading"
                class="mt-1 vc-display text-3xl tracking-tight text-[var(--vc-ink)]"
              >
                Hari {{ selected.day }}: {{ selected.title }}
              </h2>
              <p class="mt-2 vc-body text-base text-[var(--vc-muted)]">
                {{ selected.focus }}
              </p>
            </div>
            <div class="flex gap-2">
              <button
                type="button"
                class="rounded-[var(--vc-radius-md)] border border-[var(--vc-line)] px-3 py-2 text-base text-[var(--vc-muted)] transition-colors duration-150 ease-out hover:text-[var(--vc-ink)] disabled:opacity-40"
                :disabled="activeDay <= 1"
                @click="selectDay(activeDay - 1)"
              >
                Sebelumnya
              </button>
              <button
                type="button"
                class="rounded-[var(--vc-radius-md)] border border-[var(--vc-line)] px-3 py-2 text-base text-[var(--vc-muted)] transition-colors duration-150 ease-out hover:text-[var(--vc-ink)] disabled:opacity-40"
                :disabled="activeDay >= 30"
                @click="selectDay(activeDay + 1)"
              >
                Berikutnya
              </button>
            </div>
          </div>
        </div>

        <div class="border-b border-[var(--vc-line)] bg-[var(--vc-bg)]/40 px-4 py-4 sm:px-6">
          <p class="vc-body text-base text-[var(--vc-ink)]">
            <span class="text-[var(--vc-accent)]">Catatan.</span>
            {{ selected.tip }}
          </p>
        </div>

        <fieldset class="px-4 py-2 sm:px-6">
          <legend class="sr-only">Tugas hari {{ selected.day }}</legend>
          <ul class="divide-y divide-[var(--vc-line)]">
            <li v-for="(task, index) in selected.tasks" :key="vibeTaskKey(selected.day, index)">
              <label
                class="flex cursor-pointer items-start gap-3 py-4 transition-colors duration-150 ease-out hover:bg-white/[0.02]"
              >
                <input
                  type="checkbox"
                  class="vc-check mt-1"
                  :checked="!!stored.tasks?.[vibeTaskKey(selected.day, index)]"
                  :aria-checked="!!stored.tasks?.[vibeTaskKey(selected.day, index)]"
                  @change="toggleTask(selected.day, index)"
                />
                <span
                  class="vc-body text-base leading-relaxed"
                  :class="
                    stored.tasks?.[vibeTaskKey(selected.day, index)]
                      ? 'text-[var(--vc-muted)] line-through decoration-[var(--vc-line)]'
                      : 'text-[var(--vc-ink)]'
                  "
                >
                  {{ task }}
                </span>
              </label>
            </li>
          </ul>
        </fieldset>

        <fieldset class="border-t border-[var(--vc-line)] px-4 py-2 sm:px-6">
          <legend class="mb-1 block px-0 py-3 vc-body text-base font-semibold text-[var(--vc-ink)]">
            Ujian mandiri hari ini
          </legend>
          <p class="mb-2 vc-body text-base text-[var(--vc-muted)]">
            Centang kalau sudah bisa tanpa buka tutorial.
          </p>
          <ul class="divide-y divide-[var(--vc-line)]">
            <li
              v-for="(check, index) in selected.selfCheck"
              :key="vibeSelfCheckKey(selected.day, index)"
            >
              <label
                class="flex cursor-pointer items-start gap-3 py-4 transition-colors duration-150 ease-out hover:bg-white/[0.02]"
              >
                <input
                  type="checkbox"
                  class="vc-check mt-1"
                  :checked="!!stored.selfCheck?.[vibeSelfCheckKey(selected.day, index)]"
                  @change="toggleSelfCheck(selected.day, index)"
                />
                <span
                  class="vc-body text-base leading-relaxed"
                  :class="
                    stored.selfCheck?.[vibeSelfCheckKey(selected.day, index)]
                      ? 'text-[var(--vc-muted)] line-through decoration-[var(--vc-line)]'
                      : 'text-[var(--vc-ink)]'
                  "
                >
                  {{ check }}
                </span>
              </label>
            </li>
          </ul>
        </fieldset>

        <div class="border-t border-[var(--vc-line)] px-4 py-5 sm:px-6">
          <div class="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <p class="vc-body text-base font-semibold text-[var(--vc-ink)]">
                {{ selected.promptTemplate.label }}
              </p>
              <p class="mt-1 vc-body text-base text-[var(--vc-muted)]">
                Bandingkan yang kabur vs yang enak disalin ke Cursor.
              </p>
            </div>
            <button
              type="button"
              class="rounded-[var(--vc-radius-md)] border border-[var(--vc-line)] px-3 py-2 text-base text-[var(--vc-muted)] transition-[color,border-color] duration-150 ease-out hover:border-[var(--vc-accent)]/40 hover:text-[var(--vc-ink)]"
              @click="copyGoodPrompt"
            >
              {{ promptCopied ? 'Tersalin' : 'Salin yang enak' }}
            </button>
          </div>

          <div class="divide-y divide-[var(--vc-line)] border-t border-[var(--vc-line)]">
            <div class="py-4">
              <p class="vc-body text-base text-[#F87171]">Jangan</p>
              <p class="mt-2 vc-mono text-base leading-relaxed text-[var(--vc-muted)]">
                {{ selected.promptTemplate.bad }}
              </p>
            </div>
            <div class="py-4">
              <p class="vc-body text-base text-[var(--vc-accent)]">Pakai</p>
              <p class="mt-2 vc-mono text-base leading-relaxed text-[var(--vc-ink)]">
                {{ selected.promptTemplate.good }}
              </p>
            </div>
            <div v-if="selected.promptTemplate.notes?.length" class="py-4">
              <p class="vc-body text-base text-[var(--vc-muted)]">Ingat</p>
              <ul class="mt-2 space-y-2">
                <li
                  v-for="(note, index) in selected.promptTemplate.notes"
                  :key="index"
                  class="vc-body text-base leading-relaxed text-[var(--vc-ink)]"
                >
                  {{ note }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div
          v-if="selected.refs.length"
          class="border-t border-[var(--vc-line)] px-4 py-4 sm:px-6"
        >
          <p class="mb-2 vc-body text-base text-[var(--vc-muted)]">
            Materi hari ini
          </p>
          <ul class="flex flex-col gap-2">
            <li v-for="ref in selected.refs" :key="ref.href">
              <a
                :href="ref.href"
                target="_blank"
                rel="noopener noreferrer"
                class="vc-body text-base text-[var(--vc-accent)] underline-offset-4 hover:underline"
              >
                {{ ref.label }}
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section
        v-if="activeDay === 30"
        id="kompetensi"
        class="mb-12 overflow-hidden rounded-[var(--vc-radius-lg)] border border-[var(--vc-line)] bg-[var(--vc-panel)]"
        aria-labelledby="kompetensi-heading"
      >
        <div class="border-b border-[var(--vc-line)] px-4 py-5 sm:px-6">
          <h2
            id="kompetensi-heading"
            class="vc-display text-2xl tracking-tight text-[var(--vc-ink)]"
          >
            Ujian mandiri akhir (hari 30)
          </h2>
          <p class="mt-2 vc-body text-base text-[var(--vc-muted)]">
            Centang yang sudah bisa tanpa terima buta.
            {{ competencyDoneCount }}/{{ VIBE_COMPETENCY_ITEMS.length }} siap.
          </p>
        </div>
        <fieldset class="px-4 py-2 sm:px-6">
          <legend class="sr-only">Ujian mandiri vibe coding</legend>
          <ul class="divide-y divide-[var(--vc-line)]">
            <li v-for="item in VIBE_COMPETENCY_ITEMS" :key="item.id">
              <label
                class="flex cursor-pointer items-start gap-3 py-4 transition-colors duration-150 ease-out hover:bg-white/[0.02]"
              >
                <input
                  type="checkbox"
                  class="vc-check mt-1"
                  :checked="!!stored.competency?.[item.id]"
                  @change="toggleCompetency(item.id)"
                />
                <span
                  class="vc-body text-base leading-relaxed"
                  :class="
                    stored.competency?.[item.id]
                      ? 'text-[var(--vc-muted)] line-through decoration-[var(--vc-line)]'
                      : 'text-[var(--vc-ink)]'
                  "
                >
                  {{ item.label }}
                </span>
              </label>
            </li>
          </ul>
        </fieldset>
      </section>

      <section class="mb-8" aria-labelledby="cheat-heading">
        <h2
          id="cheat-heading"
          class="mb-4 vc-display text-2xl tracking-tight text-[var(--vc-ink)]"
        >
          Kapan pakai apa
        </h2>
        <div class="overflow-x-auto rounded-[var(--vc-radius-lg)] border border-[var(--vc-line)] bg-[var(--vc-panel)]">
          <table class="w-full text-left">
            <caption class="sr-only">
              Pintu Cursor dan kapan memakainya
            </caption>
            <thead>
              <tr class="border-b border-[var(--vc-line)]">
                <th scope="col" class="px-4 py-3 vc-body text-base font-semibold text-[var(--vc-muted)]">
                  Pintu
                </th>
                <th scope="col" class="px-4 py-3 vc-body text-base font-semibold text-[var(--vc-muted)]">
                  Dipakai untuk
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in cheatRows"
                :key="row.label"
                class="border-b border-[var(--vc-line)] last:border-b-0"
              >
                <th
                  scope="row"
                  class="whitespace-nowrap px-4 py-3 vc-mono text-base font-medium text-[var(--vc-accent)]"
                >
                  {{ row.label }}
                </th>
                <td class="px-4 py-3 vc-body text-base text-[var(--vc-ink)]">
                  {{ row.value }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section
        id="laboratorium"
        class="mb-8 overflow-hidden rounded-[var(--vc-radius-lg)] border border-[var(--vc-line)] bg-[var(--vc-panel)]"
        aria-labelledby="lab-heading"
      >
        <div class="border-b border-[var(--vc-line)] px-4 py-5 sm:px-6">
          <h2
            id="lab-heading"
            class="vc-display text-2xl tracking-tight text-[var(--vc-ink)]"
          >
            Laboratorium
          </h2>
          <p class="mt-2 vc-body text-base leading-relaxed text-[var(--vc-muted)]">
            Bukan hari ke-31. Ini meja latihan di halaman yang sama:
            <strong class="font-semibold text-[var(--vc-ink)]">gambar, video, audio, form, dan tabel</strong>
            supaya elemen HTML yang biasa diajar di kelas web ikut kelihatan.
            <em class="text-[var(--vc-ink)]">Catatan tersimpan di browser ini</em>, terpisah dari streak 30 hari.
          </p>
        </div>

        <figure class="border-b border-[var(--vc-line)] px-4 py-5 sm:px-6">
          <img
            class="w-full max-h-80 rounded-[var(--vc-radius-md)] object-cover object-center"
            src="/challenges/streak/vibe-code/programming.jpg"
            width="960"
            height="640"
            alt="Cuplikan kode JavaScript di layar monitor"
          />
          <figcaption class="mt-3 vc-body text-base text-[var(--vc-muted)]">
            Kode di layar. Foto
            <a
              href="https://commons.wikimedia.org/wiki/File:Programming.jpg"
              target="_blank"
              rel="noopener noreferrer"
              class="text-[var(--vc-accent)] underline-offset-4 hover:underline"
            >
              Lorenzo Cafaro / Pixabay (CC0)
            </a>.
          </figcaption>
        </figure>

        <div class="border-b border-[var(--vc-line)] px-4 py-5 sm:px-6">
          <p class="mb-3 vc-body text-base font-semibold text-[var(--vc-ink)]">
            Video: unggah file di alat kolaborasi
          </p>
          <video
            class="w-full rounded-[var(--vc-radius-md)] bg-[var(--vc-bg)]"
            controls
            preload="metadata"
            width="1920"
            height="1080"
          >
            <source src="/challenges/streak/vibe-code/uploading-files.webm" type="video/webm" />
            Browser tidak memutar video ini. Buka berkas WebM di folder media.
          </video>
          <p class="mt-3 vc-body text-base text-[var(--vc-muted)]">
            Tutorial singkat unggah file.
            <a
              href="https://commons.wikimedia.org/wiki/File:Uploading_files.webm"
              target="_blank"
              rel="noopener noreferrer"
              class="text-[var(--vc-accent)] underline-offset-4 hover:underline"
            >
              Robinverhoef, Wikimedia Commons
            </a>.
          </p>
        </div>

        <div class="border-b border-[var(--vc-line)] px-4 py-5 sm:px-6">
          <p id="lab-audio-label" class="mb-3 vc-body text-base font-semibold text-[var(--vc-ink)]">
            Audio: bunyi papan ketik
          </p>
          <audio
            class="w-full"
            controls
            preload="metadata"
            aria-labelledby="lab-audio-label"
          >
            <source src="/challenges/streak/vibe-code/keyboard.mp3" type="audio/mpeg" />
            Browser tidak memutar audio ini.
          </audio>
          <p class="mt-3 vc-body text-base text-[var(--vc-muted)]">
            Rekaman papan ketik komputer.
            <a
              href="https://commons.wikimedia.org/wiki/File:Computer_keyboard.ogg"
              target="_blank"
              rel="noopener noreferrer"
              class="text-[var(--vc-accent)] underline-offset-4 hover:underline"
            >
              Wikimedia Commons
            </a>.
          </p>
        </div>

        <form
          class="border-b border-[var(--vc-line)] px-4 py-5 sm:px-6"
          novalidate
          @submit.prevent="submitLabNote"
        >
          <h3 class="vc-display text-xl tracking-tight text-[var(--vc-ink)]">
            Catat sesi latihan
          </h3>
          <p class="mt-1 vc-body text-base text-[var(--vc-muted)]">
            Isi form, lalu lihat baris baru di tabel bawah. JavaScript yang menyimpan datanya.
          </p>

          <p
            v-if="labFormErrorSummary"
            id="lab-error-summary"
            class="mt-4 vc-body text-base text-[#FECACA]"
            role="alert"
          >
            {{ labFormErrorSummary }}
          </p>
          <p
            v-else-if="labStatus"
            class="mt-4 vc-body text-base text-[var(--vc-accent)]"
            role="status"
          >
            {{ labStatus }}
          </p>

          <div class="mt-4 grid gap-4">
            <div>
              <label for="lab-title" class="mb-2 block vc-body text-base text-[var(--vc-ink)]">
                Judul sesi
              </label>
              <input
                id="lab-title"
                v-model="labForm.title"
                type="text"
                name="title"
                autocomplete="off"
                maxlength="80"
                class="vc-field"
                :class="{ 'vc-field--error': !!labErrors.title }"
                :aria-invalid="labErrors.title ? 'true' : 'false'"
                :aria-describedby="labErrors.title ? 'lab-title-error' : undefined"
              />
              <p
                v-if="labErrors.title"
                id="lab-title-error"
                class="mt-2 vc-body text-base text-[#FECACA]"
              >
                {{ labErrors.title }}
              </p>
            </div>

            <div>
              <label for="lab-day" class="mb-2 block vc-body text-base text-[var(--vc-ink)]">
                Terhubung ke hari
              </label>
              <select
                id="lab-day"
                v-model.number="labForm.day"
                name="day"
                class="vc-field"
              >
                <option v-for="day in VIBE_DAYS" :key="day.day" :value="day.day">
                  Hari {{ day.day }}: {{ day.title }}
                </option>
              </select>
              <p class="mt-2 vc-body text-base text-[var(--vc-muted)]">
                {{ labDayHint }}
              </p>
            </div>

            <div>
              <label for="lab-body" class="mb-2 block vc-body text-base text-[var(--vc-ink)]">
                Catatan
              </label>
              <textarea
                id="lab-body"
                v-model="labForm.body"
                name="body"
                rows="4"
                maxlength="400"
                class="vc-field min-h-28 resize-y"
                :class="{ 'vc-field--error': !!labErrors.body }"
                :aria-invalid="labErrors.body ? 'true' : 'false'"
                :aria-describedby="labErrors.body ? 'lab-body-error lab-body-count' : 'lab-body-count'"
              />
              <p
                v-if="labErrors.body"
                id="lab-body-error"
                class="mt-2 vc-body text-base text-[#FECACA]"
              >
                {{ labErrors.body }}
              </p>
              <p id="lab-body-count" class="mt-2 vc-body text-base text-[var(--vc-muted)]">
                {{ labForm.body.length }}/400 karakter
              </p>
            </div>
          </div>

          <button
            type="submit"
            class="mt-4 rounded-[var(--vc-radius-md)] bg-[var(--vc-accent)] px-5 py-3 vc-body text-base font-semibold text-[var(--vc-bg)] transition-[transform,opacity] duration-150 ease-out hover:opacity-90 active:scale-[0.97]"
          >
            {{ labSaving ? 'Menyimpan…' : 'Simpan catatan' }}
          </button>
        </form>

        <div class="px-4 py-5 sm:px-6">
          <h3 class="vc-display text-xl tracking-tight text-[var(--vc-ink)]">
            Daftar catatan
          </h3>
          <p class="mt-1 vc-body text-base text-[var(--vc-muted)]">
            {{ labNotes.length }} catatan tersimpan.
          </p>

          <div
            v-if="labNotes.length"
            class="mt-4 overflow-x-auto"
          >
            <table class="w-full text-left">
              <caption class="sr-only">
                Catatan laboratorium yang tersimpan di browser
              </caption>
              <thead>
                <tr class="border-b border-[var(--vc-line)] bg-[var(--vc-bg)]">
                  <th scope="col" class="px-4 py-3 vc-body text-base font-semibold text-[var(--vc-muted)]">
                    Hari
                  </th>
                  <th scope="col" class="px-4 py-3 vc-body text-base font-semibold text-[var(--vc-muted)]">
                    Judul
                  </th>
                  <th scope="col" class="px-4 py-3 vc-body text-base font-semibold text-[var(--vc-muted)]">
                    Waktu
                  </th>
                  <th scope="col" class="px-4 py-3 vc-body text-base font-semibold text-[var(--vc-muted)]">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="note in labNotes"
                  :key="note.id"
                  class="border-b border-[var(--vc-line)] last:border-b-0"
                >
                  <td class="px-4 py-3 tabular-nums vc-body text-base text-[var(--vc-ink)]">
                    {{ note.day }}
                  </td>
                  <td class="px-4 py-3 vc-body text-base text-[var(--vc-ink)]">
                    {{ note.title }}
                  </td>
                  <td class="px-4 py-3 vc-body text-base text-[var(--vc-muted)]">
                    {{ formatLabTime(note.createdAt) }}
                  </td>
                  <td class="px-4 py-3">
                    <button
                      type="button"
                      class="vc-body text-base text-[#FECACA] underline-offset-4 hover:underline"
                      :aria-label="`Hapus catatan ${note.title}`"
                      @click="deleteLabNote(note.id)"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p
            v-else
            class="mt-4 vc-body text-base text-[var(--vc-muted)]"
          >
            Belum ada catatan. Isi form di atas, lalu simpan.
          </p>
        </div>
      </section>

      <p class="vc-body text-base text-[var(--vc-muted)]">
        Progress streak tersimpan di browser ini. Hapus lewat Mulai ulang.
        <a href="#laboratorium" class="text-[var(--vc-accent)] underline-offset-4 hover:underline">Laboratorium</a>
        (gambar, video, audio, form, tabel) terpisah dari path 30 hari.
      </p>
    </div>

    <div
      v-if="showResetDialog"
      class="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reset-title"
      @click.self="showResetDialog = false"
    >
      <div
        class="w-full max-w-md rounded-[var(--vc-radius-lg)] border border-[var(--vc-line)] bg-[var(--vc-panel)] p-5 shadow-2xl"
      >
        <h3
          id="reset-title"
          class="vc-display text-2xl text-[var(--vc-ink)]"
        >
          Hapus progress vibe coding 30 hari?
        </h3>
        <p class="mt-2 vc-body text-base text-[var(--vc-muted)]">
          Semua centang harian dan ujian mandiri hilang dari browser ini. Tidak bisa dikembalikan.
        </p>
        <div class="mt-5 flex flex-wrap justify-end gap-2">
          <button
            type="button"
            class="rounded-[var(--vc-radius-md)] border border-[var(--vc-line)] px-4 py-2 text-base text-[var(--vc-ink)]"
            @click="showResetDialog = false"
          >
            Batal
          </button>
          <button
            type="button"
            class="rounded-[var(--vc-radius-md)] bg-[#DC2626] px-4 py-2 text-base font-semibold text-white"
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
  VIBE_COMPETENCY_ITEMS,
  VIBE_DAYS,
  VIBE_PHASE_META,
  vibeDaySelfCheckKeys,
  vibeDayTaskKeys,
  vibeSelfCheckKey,
  vibeTaskKey,
  type VibePhase,
} from '~/utils/vibe-code-30day'

definePageMeta({
  key: (route) => route.fullPath,
})

useSeoMeta({
  title: '30 hari vibe coding sampai expert | Challenges',
  description:
    'Roadmap 30 hari ke expert: Cursor, prompt, .agents, /loop, hooks, subagent, review diff. Syarat ikut: sudah paham fundamental code.',
})

useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;600&family=IBM+Plex+Serif:wght@600;700&display=swap',
    },
  ],
})

interface StoredProgress {
  tasks: Record<string, boolean>
  selfCheck: Record<string, boolean>
  competency: Record<string, boolean>
  activeDay: number
}

const STORAGE_KEY = 'vibe-code-30day-v2'

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

const phaseFilter = ref<'all' | VibePhase>('all')
const showResetDialog = ref(false)
const promptCopied = ref(false)
const caretOn = ref(true)

interface LabNote {
  id: string
  day: number
  title: string
  body: string
  createdAt: string
}

const labNotes = useStorage<LabNote[]>('vibe-code-lab-notes-v1', [])
const labForm = reactive({
  title: '',
  day: 1,
  body: '',
})
const labErrors = ref<{ title?: string; body?: string }>({})
const labStatus = ref('')
const labSaving = ref(false)

const labDayHint = computed(() => {
  const day = VIBE_DAYS.find((item) => item.day === labForm.day)
  if (!day) return ''
  return `Fokus hari itu: ${day.focus}.`
})

const labFormErrorSummary = computed(() => {
  const parts = [labErrors.value.title, labErrors.value.body].filter(Boolean)
  if (!parts.length) return ''
  return `Form belum lengkap. ${parts.join(' ')}`
})

function submitLabNote() {
  labStatus.value = ''
  const nextErrors: { title?: string; body?: string } = {}
  if (!labForm.title.trim()) {
    nextErrors.title = 'Isi judul sesi.'
  }
  if (!labForm.body.trim()) {
    nextErrors.body = 'Tulis catatan, minimal satu kalimat.'
  }
  labErrors.value = nextErrors
  if (nextErrors.title || nextErrors.body) {
    const firstId = nextErrors.title ? 'lab-title' : 'lab-body'
    document.getElementById(firstId)?.focus()
    return
  }

  labSaving.value = true
  const note: LabNote = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    day: labForm.day,
    title: labForm.title.trim(),
    body: labForm.body.trim(),
    createdAt: new Date().toISOString(),
  }
  labNotes.value = [note, ...(labNotes.value ?? [])]
  labForm.title = ''
  labForm.body = ''
  labStatus.value = `Catatan "${note.title}" tersimpan.`
  window.setTimeout(() => {
    labSaving.value = false
  }, 200)
}

function deleteLabNote(id: string) {
  const current = labNotes.value ?? []
  const note = current.find((item) => item.id === id)
  labNotes.value = current.filter((item) => item.id !== id)
  labStatus.value = note ? `Catatan "${note.title}" dihapus.` : 'Catatan dihapus.'
}

function formatLabTime(iso: string) {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

const principles = [
  'Rumah Cursor. ChatGPT atau Claude boleh ngerancang. Copilot Tab boleh. Eksekusi di repo tetap di sini.',
  'Prompt: tujuan, konteks, batasan, cara cek selesai. Pecah. Jangan "buat app".',
  'Ajari sekali: rules, AGENTS.md, skill di .agents. Salah berulang = update file, jangan marahin chat.',
  'Operasi expert: /loop, MCP, hooks, subagent. Tool tanpa gerbang = liar.',
  'Mutu: baca diff, test, rahasia, recover. Hari 30 = kamu masih ngerti semua file yang berubah.',
]

const cheatRows = [
  { label: 'Tab', value: 'Lanjut baris yang sudah kamu mulai ngetik' },
  { label: 'Chat', value: 'Tanya, jelaskan, bandingkan. Belum edit file' },
  { label: 'Agent', value: 'Kerjakan tugas dengan batas file dan definisi selesai' },
  { label: 'Plan', value: 'Rencana 1 paragraf dulu. Baru izinkan nulis' },
  { label: 'Rules', value: 'Aturan tetap. Pendek dan konkret, bukan "tulis code bagus"' },
  { label: 'Skill', value: 'Prosedur berulang di .agents/skills atau .cursor/skills' },
  { label: '/loop', value: 'Cek berulang. Jangan pabrik fitur tanpa gerbang' },
  { label: 'Hooks', value: 'Pagar di momen hidup agent. Bukan auto-accept' },
  { label: 'Subagent', value: 'Pecah kerja, batas file jelas. Kamu yang merge' },
  { label: 'Prompt', value: 'Tujuan, konteks, batasan, selesai kalau apa' },
]

const phaseKeys = [0, 1, 2, 3, 4, 5] as VibePhase[]

const activeDay = computed({
  get: () => stored.value.activeDay || 1,
  set: (v: number) => {
    stored.value.activeDay = v
  },
})

const selected = computed(
  () => VIBE_DAYS.find((d) => d.day === activeDay.value) ?? VIBE_DAYS[0],
)

const filteredDays = computed(() => {
  if (phaseFilter.value === 'all') return VIBE_DAYS
  return VIBE_DAYS.filter((d) => d.phase === phaseFilter.value)
})

function isDayComplete(dayNumber: number) {
  const day = VIBE_DAYS.find((d) => d.day === dayNumber)
  if (!day) return false
  const tasksDone = vibeDayTaskKeys(day).every((key) => !!stored.value.tasks?.[key])
  const checksDone = vibeDaySelfCheckKeys(day).every(
    (key) => !!stored.value.selfCheck?.[key],
  )
  return tasksDone && checksDone
}

const completedDayCount = computed(
  () => VIBE_DAYS.filter((d) => isDayComplete(d.day)).length,
)

const progressPercent = computed(() =>
  Math.round((completedDayCount.value / VIBE_DAYS.length) * 100),
)

const streakCount = computed(() => {
  let streak = 0
  for (const day of VIBE_DAYS) {
    if (!isDayComplete(day.day)) break
    streak += 1
  }
  return streak
})

const competencyDoneCount = computed(
  () =>
    VIBE_COMPETENCY_ITEMS.filter((item) => !!stored.value.competency?.[item.id]).length,
)

const focusDay = computed(() => {
  const firstOpen = VIBE_DAYS.find((d) => !isDayComplete(d.day))
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
  const key = vibeTaskKey(day, taskIndex)
  const current = stored.value.tasks ?? {}
  stored.value.tasks = {
    ...current,
    [key]: !current[key],
  }
}

function toggleSelfCheck(day: number, checkIndex: number) {
  const key = vibeSelfCheckKey(day, checkIndex)
  const current = stored.value.selfCheck ?? {}
  stored.value.selfCheck = {
    ...current,
    [key]: !current[key],
  }
}

async function copyGoodPrompt() {
  if (!import.meta.client) return
  try {
    await navigator.clipboard.writeText(selected.value.promptTemplate.good)
    promptCopied.value = true
    window.setTimeout(() => {
      promptCopied.value = false
    }, 2000)
  } catch {
    promptCopied.value = false
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
    return 'border-[var(--vc-accent)] bg-[var(--vc-accent)]/15 text-[var(--vc-ink)]'
  }
  if (complete) {
    return 'border-[var(--vc-line)] bg-[var(--vc-bg)] text-[var(--vc-ink)]'
  }
  return 'border-[var(--vc-line)] bg-[var(--vc-panel)] text-[var(--vc-muted)] hover:border-[var(--vc-accent)]/40 hover:text-[var(--vc-ink)]'
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

let caretTimer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion) return
  caretTimer = setInterval(() => {
    caretOn.value = !caretOn.value
  }, 530)
})

onUnmounted(() => {
  if (caretTimer) clearInterval(caretTimer)
})
</script>

<style scoped>
.vibe-streak {
  --vc-bg: #0e1210;
  --vc-panel: #171c19;
  --vc-track: #1f2622;
  --vc-line: #2a332e;
  --vc-ink: #f3f4f1;
  --vc-muted: #9aa89f;
  --vc-accent: #2ee59d;
  --vc-display: 'IBM Plex Serif', Georgia, serif;
  --vc-body: 'IBM Plex Sans', system-ui, sans-serif;
  --vc-mono: 'IBM Plex Mono', ui-monospace, monospace;
  --vc-radius-md: 0.5rem;
  --vc-radius-lg: 0.75rem;
  background:
    radial-gradient(1100px 480px at 8% -8%, rgba(46, 229, 157, 0.12), transparent 55%),
    radial-gradient(800px 360px at 92% 4%, rgba(94, 234, 212, 0.08), transparent 50%),
    linear-gradient(180deg, #121816 0%, var(--vc-bg) 42%, #0c100e 100%);
  font-family: var(--vc-body);
  min-height: 100%;
}

.vc-display {
  font-family: var(--vc-display);
}

.vc-body {
  font-family: var(--vc-body);
}

.vc-mono {
  font-family: var(--vc-mono);
}

.vibe-streak__grid {
  pointer-events: none;
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: linear-gradient(180deg, black, transparent 68%);
  opacity: 0.45;
}

.vc-check {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
  appearance: none;
  border: 2px solid var(--vc-line);
  border-radius: 0.3rem;
  background: var(--vc-bg);
  cursor: pointer;
  transition:
    background-color 150ms ease-out,
    border-color 150ms ease-out,
    transform 150ms ease-out;
}

.vc-check:checked {
  background: var(--vc-accent);
  border-color: var(--vc-accent);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%230e1210' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3.5 8.5 6.5 11.5 12.5 4.5'/%3E%3C/svg%3E");
  background-size: 0.9rem;
  background-position: center;
  background-repeat: no-repeat;
}

.vc-check:focus-visible {
  outline: 2px solid var(--vc-accent);
  outline-offset: 2px;
}

.vc-field {
  width: 100%;
  border: 1px solid var(--vc-line);
  border-radius: var(--vc-radius-md);
  background: #101512;
  color: var(--vc-ink);
  padding: 0.75rem 0.9rem;
  font-family: var(--vc-body);
  font-size: 1rem;
  line-height: 1.5;
  transition:
    border-color 150ms ease-out,
    background-color 150ms ease-out;
}

.vc-field:focus {
  border-color: var(--vc-accent);
  outline: 2px solid var(--vc-accent);
  outline-offset: 2px;
}

.vc-field--error {
  border-color: #f87171;
}

.vc-field option {
  background: #101512;
  color: var(--vc-ink);
}

@media (prefers-reduced-motion: reduce) {
  .vibe-streak :deep(*) {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
</style>
