<template>
  <figure class="screen">
    <div class="screen__window">
      <div class="screen__bar" aria-hidden="true">
        <span class="screen__dots">
          <span />
          <span />
          <span />
        </span>
        <span class="screen__url">
          <Icon name="mdi:lock-outline" class="screen__lock" />
          {{ screen.url }}
        </span>
      </div>

      <div class="screen__viewport">
        <img
          v-if="screen.image"
          :src="screen.image"
          :alt="screen.alt"
          class="screen__img"
          :loading="eager ? 'eager' : 'lazy'"
          decoding="async"
        />

        <div v-else class="mock" role="img" :aria-label="screen.alt">
          <div class="mock__side" aria-hidden="true">
            <p class="mock__logo">SRS<b>5G</b></p>
            <span
              v-for="item in nav"
              :key="item.label"
              class="mock__nav"
              :class="{ 'mock__nav--active': item.mock === mock }"
            >
              <Icon :name="item.icon" class="mock__nav-icon" />
              {{ item.label }}
            </span>
          </div>

          <div class="mock__main" aria-hidden="true">
            <div class="mock__top">
              <p class="mock__title">{{ titles[mock] }}</p>
              <span class="mock__search">
                <Icon name="mdi:magnify" />
                Cari mahasiswa
              </span>
              <span class="mock__avatar">ST</span>
            </div>

            <div v-if="mock === 'dashboard'" class="mock__body mock-dash">
              <div class="mock-dash__stats">
                <div v-for="stat in stats" :key="stat.label" class="mock-card">
                  <p class="mock-label">{{ stat.label }}</p>
                  <div class="mock-bars">
                    <span
                      v-for="(height, index) in stat.bars"
                      :key="index"
                      :style="{ height: `${height}%` }"
                    />
                  </div>
                </div>
              </div>
              <div class="mock-dash__split">
                <div class="mock-card">
                  <p class="mock-heading">Registrasi terbaru</p>
                  <div v-for="row in students" :key="row.name" class="mock-row">
                    <span class="mock-initials">MC</span>
                    <span class="mock-row__main">
                      <b>{{ row.name }}</b>
                      <span>{{ row.program }}</span>
                    </span>
                    <span class="mock-chip" :class="`mock-chip--${row.tone}`">
                      {{ row.status }}
                    </span>
                  </div>
                </div>
                <div class="mock-card mock-dash__donut-card">
                  <p class="mock-heading">Tahapan studi</p>
                  <span class="mock-donut" />
                  <ul class="mock-legend">
                    <li><i class="mock-dot mock-dot--teal" />Registrasi</li>
                    <li><i class="mock-dot mock-dot--copper" />Studi</li>
                    <li><i class="mock-dot mock-dot--sand" />Wisuda</li>
                  </ul>
                </div>
              </div>
            </div>

            <div v-else-if="mock === 'registration'" class="mock__body mock-reg">
              <ol class="mock-steps">
                <li
                  v-for="(step, index) in steps"
                  :key="step"
                  :class="{
                    'mock-steps__done': index < 2,
                    'mock-steps__active': index === 2,
                  }"
                >
                  <span>{{ index < 2 ? "✓" : index + 1 }}</span>
                  {{ step }}
                </li>
              </ol>
              <div class="mock-card mock-reg__student">
                <span class="mock-initials">MC</span>
                <span class="mock-row__main">
                  <b>Mahasiswa Contoh</b>
                  <span>NIM 000000000 · S1 Sistem Informasi</span>
                </span>
                <span class="mock-chip mock-chip--teal">Semester 3</span>
              </div>
              <div class="mock-card">
                <p class="mock-heading">Mata kuliah semester ini</p>
                <div v-for="course in courses" :key="course.code" class="mock-row">
                  <span
                    class="mock-check"
                    :class="{ 'mock-check--on': course.picked }"
                  >{{ course.picked ? "✓" : "" }}</span>
                  <span class="mock-row__main">
                    <b>{{ course.name }}</b>
                    <span>{{ course.code }}</span>
                  </span>
                  <span class="mock-muted">{{ course.credits }}</span>
                </div>
                <span class="mock-button">Simpan registrasi</span>
              </div>
            </div>

            <div v-else-if="mock === 'record'" class="mock__body mock-rec">
              <div class="mock-card mock-rec__head">
                <span class="mock-initials mock-initials--lg">MC</span>
                <span class="mock-row__main">
                  <b class="mock-rec__name">Mahasiswa Contoh</b>
                  <span>NIM 000000000 · S1 Sistem Informasi</span>
                </span>
                <span class="mock-chip mock-chip--teal">Aktif</span>
              </div>
              <div class="mock-tabs">
                <span class="mock-tabs__active">Profil</span>
                <span>Akademik</span>
                <span>Dokumen</span>
                <span>Riwayat</span>
              </div>
              <div class="mock-card mock-rec__grid">
                <div v-for="field in fields" :key="field.key" class="mock-field">
                  <span class="mock-label">{{ field.key }}</span>
                  <b>{{ field.value }}</b>
                </div>
              </div>
              <div class="mock-card">
                <p class="mock-heading">Perjalanan studi</p>
                <div class="mock-terms">
                  <span
                    v-for="term in 8"
                    :key="term"
                    :class="{
                      'mock-terms__done': term < 3,
                      'mock-terms__now': term === 3,
                    }"
                  />
                </div>
              </div>
            </div>

            <div v-else class="mock__body mock-rep">
              <div class="mock-paper">
                <p class="mock-paper__title">Transkrip Akademik</p>
                <p class="mock-muted">Contoh · bukan data asli</p>
                <div v-for="grade in grades" :key="grade.course" class="mock-paper__row">
                  <span>{{ grade.course }}</span>
                  <b>{{ grade.grade }}</b>
                </div>
                <span class="mock-skeleton" />
                <span class="mock-skeleton mock-skeleton--short" />
              </div>
              <div class="mock-rep__side">
                <div class="mock-card">
                  <p class="mock-heading">Kesiapan wisuda</p>
                  <div v-for="check in checks" :key="check.label" class="mock-row">
                    <span
                      class="mock-check"
                      :class="{ 'mock-check--on': check.done }"
                    >{{ check.done ? "✓" : "" }}</span>
                    <span class="mock-row__main"><b>{{ check.label }}</b></span>
                  </div>
                </div>
                <span class="mock-button">
                  <Icon name="mdi:file-download-outline" />
                  Unduh PDF
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <figcaption v-if="!screen.image" class="screen__caption">
      Illustrative mock with sample data
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
import type { SrsMock, SrsScreen } from "../data";

const props = defineProps<{
  screen: SrsScreen;
  eager?: boolean;
}>();

const mock = computed<SrsMock>(() => props.screen.mock ?? "dashboard");

// Everything below is sample content for the CSS mock, not real SRS data.
const titles: Record<SrsMock, string> = {
  dashboard: "Beranda",
  registration: "Registrasi mata kuliah",
  record: "Data mahasiswa",
  report: "Laporan & wisuda",
};

const nav: { label: string; icon: string; mock?: SrsMock }[] = [
  { label: "Beranda", icon: "mdi:view-dashboard-outline", mock: "dashboard" },
  { label: "Mahasiswa", icon: "mdi:account-multiple-outline", mock: "record" },
  { label: "Registrasi", icon: "mdi:clipboard-text-outline", mock: "registration" },
  { label: "Nilai", icon: "mdi:chart-line" },
  { label: "Laporan", icon: "mdi:file-chart-outline", mock: "report" },
  { label: "Wisuda", icon: "mdi:school-outline" },
];

const stats = [
  { label: "Mahasiswa aktif", bars: [40, 55, 48, 70, 82] },
  { label: "Registrasi", bars: [30, 62, 90, 75, 58] },
  { label: "Dokumen", bars: [50, 45, 60, 52, 66] },
  { label: "Wisuda", bars: [20, 28, 35, 60, 44] },
];

const students = [
  { name: "Mahasiswa Contoh 01", program: "S1 Sistem Informasi", status: "Aktif", tone: "teal" },
  { name: "Mahasiswa Contoh 02", program: "S1 Manajemen", status: "Registrasi", tone: "copper" },
  { name: "Mahasiswa Contoh 03", program: "S2 Pendidikan", status: "Aktif", tone: "teal" },
  { name: "Mahasiswa Contoh 04", program: "PPG", status: "Verifikasi", tone: "sand" },
];

const steps = ["Data diri", "Program", "Mata kuliah", "Konfirmasi"];

const courses = [
  { name: "Mata Kuliah Contoh A", code: "MK-0001", credits: "3 SKS", picked: true },
  { name: "Mata Kuliah Contoh B", code: "MK-0002", credits: "3 SKS", picked: true },
  { name: "Mata Kuliah Contoh C", code: "MK-0003", credits: "2 SKS", picked: false },
  { name: "Mata Kuliah Contoh D", code: "MK-0004", credits: "3 SKS", picked: true },
];

const fields = [
  { key: "Program", value: "S1 Sistem Informasi" },
  { key: "Semester", value: "3" },
  { key: "Status", value: "Aktif" },
  { key: "Wilayah", value: "Kota Contoh" },
  { key: "Email", value: "contoh@example.ac.id" },
  { key: "Masuk", value: "Semester ganjil" },
];

const grades = [
  { course: "Mata Kuliah Contoh A", grade: "A" },
  { course: "Mata Kuliah Contoh B", grade: "B+" },
  { course: "Mata Kuliah Contoh C", grade: "A-" },
  { course: "Mata Kuliah Contoh D", grade: "B" },
];

const checks = [
  { label: "Nilai lengkap", done: true },
  { label: "Dokumen lengkap", done: true },
  { label: "Verifikasi akhir", done: false },
];
</script>

<style scoped>
.screen {
  margin: 0;
  min-width: 0;
}

.screen__window {
  overflow: hidden;
  border-radius: 1rem;
  border: 1px solid var(--srs-line);
  background: var(--srs-panel);
  box-shadow:
    0 1px 2px color-mix(in srgb, var(--srs-ink) 6%, transparent),
    0 24px 48px -12px color-mix(in srgb, var(--srs-ink) 22%, transparent);
}

.screen__bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  height: 2.5rem;
  padding-inline: 0.9rem;
  border-bottom: 1px solid var(--srs-line);
  background: var(--srs-chrome);
}

.screen__dots {
  display: flex;
  gap: 0.35rem;
  flex-shrink: 0;
}

.screen__dots span {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  background: color-mix(in srgb, var(--srs-muted) 35%, transparent);
}

.screen__url {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  min-width: 0;
  max-width: 22rem;
  margin-inline: auto;
  padding: 0.2rem 0.85rem;
  border-radius: 999px;
  background: var(--srs-page-solid);
  color: var(--srs-muted);
  font-family: ui-sans-serif, system-ui, sans-serif;
  font-size: 0.8125rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.screen__lock {
  flex-shrink: 0;
  width: 0.85rem;
  height: 0.85rem;
}

.screen__viewport {
  container-type: inline-size;
  background: #f6f7f6;
}

.screen__img {
  display: block;
  width: 100%;
  height: auto;
}

.screen__caption {
  margin-top: 0.75rem;
  font-family: var(--srs-font-body);
  font-size: 0.9375rem;
  font-style: italic;
  color: var(--srs-muted);
  text-align: center;
}

/* CSS mock. Everything is sized in em off a container-relative base, so the
   mock scales like a screenshot. */
.mock {
  --m-teal: #0d5c63;
  --m-copper: #c47b3a;
  --m-sand: #e4c79f;
  --m-ink: #1f2d30;
  --m-muted: #7d8f92;
  --m-line: #e3e7e6;

  display: grid;
  grid-template-columns: 15em minmax(0, 1fr);
  aspect-ratio: 16 / 9;
  font-family: ui-sans-serif, system-ui, sans-serif;
  font-size: 1.3cqw;
  line-height: 1.35;
  color: var(--m-ink);
  user-select: none;
}

.mock b {
  font-weight: 600;
}

.mock__side {
  display: flex;
  flex-direction: column;
  gap: 0.35em;
  padding: 1.6em 1.1em;
  background: var(--m-teal);
  color: #d7e9ea;
}

.mock__logo {
  margin-bottom: 1.4em;
  padding-inline: 0.6em;
  font-family: var(--srs-font-display);
  font-size: 1.6em;
  font-weight: 700;
  color: #fff;
}

.mock__logo b {
  color: var(--m-sand);
}

.mock__nav {
  display: flex;
  align-items: center;
  gap: 0.7em;
  padding: 0.65em 0.75em;
  border-radius: 0.6em;
}

.mock__nav--active {
  background: rgb(255 255 255 / 0.14);
  color: #fff;
  font-weight: 600;
}

.mock__nav-icon {
  width: 1.3em;
  height: 1.3em;
}

.mock__main {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.mock__top {
  display: flex;
  align-items: center;
  gap: 1em;
  padding: 1.1em 1.6em;
  border-bottom: 1px solid var(--m-line);
  background: #fff;
}

.mock__title {
  font-size: 1.35em;
  font-weight: 700;
  white-space: nowrap;
}

.mock__search {
  display: inline-flex;
  align-items: center;
  gap: 0.4em;
  margin-left: auto;
  width: 16em;
  padding: 0.45em 0.8em;
  border-radius: 999px;
  background: #f1f3f2;
  color: var(--m-muted);
}

.mock__avatar,
.mock-initials {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 2.4em;
  height: 2.4em;
  border-radius: 50%;
  background: var(--m-sand);
  color: var(--m-ink);
  font-weight: 700;
  font-size: 0.85em;
}

.mock-initials--lg {
  width: 3.6em;
  height: 3.6em;
  font-size: 1.1em;
  background: var(--m-teal);
  color: #fff;
}

.mock__body {
  flex: 1;
  min-height: 0;
  display: grid;
  gap: 1.1em;
  padding: 1.4em 1.6em;
  align-content: start;
}

.mock-card {
  padding: 1.1em 1.2em;
  border-radius: 0.8em;
  border: 1px solid var(--m-line);
  background: #fff;
}

.mock-label,
.mock-muted {
  color: var(--m-muted);
}

.mock-heading {
  margin-bottom: 0.6em;
  font-weight: 700;
}

.mock-row {
  display: flex;
  align-items: center;
  gap: 0.8em;
  padding-block: 0.55em;
  border-top: 1px solid var(--m-line);
}

.mock-heading + .mock-row {
  border-top: none;
}

.mock-row__main {
  display: grid;
  min-width: 0;
  flex: 1;
}

.mock-row__main span {
  color: var(--m-muted);
}

.mock-chip {
  padding: 0.25em 0.75em;
  border-radius: 999px;
  font-size: 0.9em;
  font-weight: 600;
  white-space: nowrap;
}

.mock-chip--teal {
  background: #dcecec;
  color: var(--m-teal);
}

.mock-chip--copper {
  background: #f6e5d4;
  color: #9a5a22;
}

.mock-chip--sand {
  background: #f3ecdf;
  color: #7a6440;
}

.mock-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4em;
  margin-top: 0.8em;
  padding: 0.6em 1.2em;
  border-radius: 0.6em;
  background: var(--m-teal);
  color: #fff;
  font-weight: 600;
}

.mock-check {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 1.4em;
  height: 1.4em;
  border-radius: 0.35em;
  border: 1.5px solid var(--m-line);
  font-size: 0.85em;
  color: #fff;
}

.mock-check--on {
  border-color: var(--m-teal);
  background: var(--m-teal);
}

/* Dashboard */
.mock-dash {
  grid-template-rows: auto 1fr;
  align-content: stretch;
}

.mock-dash__stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1em;
}

.mock-bars {
  display: flex;
  align-items: flex-end;
  gap: 0.35em;
  height: 3.6em;
  margin-top: 0.7em;
}

.mock-bars span {
  flex: 1;
  border-radius: 0.25em 0.25em 0 0;
  background: color-mix(in srgb, var(--m-teal) 30%, white);
}

.mock-bars span:last-child {
  background: var(--m-copper);
}

.mock-dash__split {
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) minmax(0, 1fr);
  gap: 1em;
}

.mock-dash__donut-card {
  display: grid;
  justify-items: center;
  align-content: start;
}

.mock-dash__donut-card .mock-heading {
  justify-self: start;
}

.mock-donut {
  width: 9em;
  height: 9em;
  margin-block: 0.6em 1em;
  border-radius: 50%;
  background:
    radial-gradient(circle, #fff 52%, transparent 53%),
    conic-gradient(var(--m-teal) 0 46%, var(--m-copper) 46% 78%, var(--m-sand) 78% 100%);
}

.mock-legend {
  display: grid;
  gap: 0.35em;
  justify-self: start;
  color: var(--m-muted);
}

.mock-dot {
  display: inline-block;
  width: 0.7em;
  height: 0.7em;
  margin-right: 0.5em;
  border-radius: 50%;
}

.mock-dot--teal {
  background: var(--m-teal);
}

.mock-dot--copper {
  background: var(--m-copper);
}

.mock-dot--sand {
  background: var(--m-sand);
}

/* Registration */
.mock-steps {
  display: flex;
  gap: 1.6em;
  color: var(--m-muted);
}

.mock-steps li {
  display: flex;
  align-items: center;
  gap: 0.5em;
}

.mock-steps span {
  display: grid;
  place-items: center;
  width: 1.8em;
  height: 1.8em;
  border-radius: 50%;
  border: 1.5px solid var(--m-line);
  background: #fff;
  font-weight: 700;
}

.mock-steps__done span {
  border-color: var(--m-teal);
  background: var(--m-teal);
  color: #fff;
}

.mock-steps__active {
  color: var(--m-ink);
  font-weight: 700;
}

.mock-steps__active span {
  border-color: var(--m-copper);
  color: var(--m-copper);
}

.mock-reg__student {
  display: flex;
  align-items: center;
  gap: 0.8em;
}

.mock-reg .mock-button {
  float: right;
}

/* Student record */
.mock-rec__head {
  display: flex;
  align-items: center;
  gap: 1em;
}

.mock-rec__name {
  font-size: 1.3em;
}

.mock-tabs {
  display: flex;
  gap: 1.8em;
  padding-inline: 0.4em;
  border-bottom: 1px solid var(--m-line);
  color: var(--m-muted);
}

.mock-tabs span {
  padding-bottom: 0.6em;
}

.mock-tabs__active {
  border-bottom: 2px solid var(--m-copper);
  color: var(--m-ink);
  font-weight: 700;
}

.mock-rec__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1em 1.4em;
}

.mock-field {
  display: grid;
  gap: 0.2em;
  min-width: 0;
}

.mock-field b {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mock-terms {
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  gap: 0.5em;
}

.mock-terms span {
  height: 0.9em;
  border-radius: 999px;
  background: var(--m-line);
}

.mock-terms .mock-terms__done {
  background: var(--m-teal);
}

.mock-terms .mock-terms__now {
  background: var(--m-copper);
}

/* Report */
.mock-rep {
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
}

.mock-paper {
  display: grid;
  gap: 0.6em;
  align-content: start;
  padding: 1.6em 1.8em;
  border-radius: 0.4em;
  background: #fff;
  box-shadow: 0 0.6em 1.6em rgb(31 45 48 / 0.12);
}

.mock-paper__title {
  font-family: var(--srs-font-display);
  font-size: 1.45em;
  font-weight: 700;
  color: var(--m-teal);
}

.mock-paper__row {
  display: flex;
  justify-content: space-between;
  padding-block: 0.45em;
  border-bottom: 1px dashed var(--m-line);
}

.mock-skeleton {
  display: block;
  height: 0.7em;
  border-radius: 999px;
  background: #eef1f0;
}

.mock-skeleton--short {
  width: 60%;
}

.mock-rep__side {
  display: grid;
  gap: 1em;
  align-content: start;
}

.mock-rep__side .mock-button {
  margin-top: 0;
}

/* Narrow frames (phones): drop the sidebar and secondary panels so the mock
   stays legible instead of shrinking to unreadable text. */
@container (max-width: 520px) {
  .mock {
    grid-template-columns: minmax(0, 1fr);
    aspect-ratio: auto;
    font-size: 2.6cqw;
  }

  .mock__side,
  .mock__search,
  .mock-dash__donut-card,
  .mock-rec__grid .mock-field:nth-child(n + 5) {
    display: none;
  }

  .mock__body {
    padding: 1em;
  }

  .mock-dash__stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .mock-dash__split,
  .mock-rep {
    grid-template-columns: minmax(0, 1fr);
  }

  .mock-rec__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .mock-steps {
    gap: 0.9em;
  }
}
</style>
