<template>
  <figure class="screen" :class="assemble && `screen--assemble-${assemble}`">
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
          <div class="mock__top" aria-hidden="true">
            <p class="mock__logo">Admisi <b>UT</b></p>
            <span class="mock__nav">Beranda</span>
            <span class="mock__nav">Informasi</span>
            <span class="mock__nav">Bantuan</span>
            <span class="mock__user">
              <Icon name="mdi:bell-outline" class="mock__bell" />
              <span class="mock-initials">CM</span>
            </span>
          </div>

          <div v-if="mock === 'register'" class="mock__body mock-reg" aria-hidden="true">
            <div class="mock-card mock-reg__form" style="--i: 0">
              <p class="mock-title">Daftar Mahasiswa Baru</p>
              <p class="mock-muted">Buat akun untuk memulai pendaftaran</p>
              <div
                v-for="(field, index) in signUpFields"
                :key="field.label"
                class="mock-field"
                :style="{ '--i': index }"
              >
                <span class="mock-label">{{ field.label }}</span>
                <span class="mock-input">{{ field.value }}</span>
              </div>
              <span class="mock-button">Buat akun</span>
            </div>
            <div class="mock-card mock-reg__mail" style="--i: 1">
              <span class="mock-reg__icon">
                <Icon name="mdi:email-fast-outline" class="mock-reg__glyph" />
              </span>
              <p class="mock-title">Cek email Anda</p>
              <p class="mock-muted">
                Tautan aktivasi telah dikirim ke <b>contoh@example.com</b>
              </p>
              <span class="mock-chip mock-chip--amber">Menunggu verifikasi</span>
              <span class="mock-button mock-button--ghost">Kirim ulang tautan</span>
            </div>
          </div>

          <div v-else class="mock__body mock-app" aria-hidden="true">
            <div class="mock-rail">
              <p class="mock-label">Langkah pendaftaran</p>
              <span
                v-for="(step, index) in railSteps"
                :key="step"
                class="mock-rail__step"
                :class="{
                  'mock-rail__step--done': index < activeStep[mock],
                  'mock-rail__step--active': index === activeStep[mock],
                }"
                :style="{ '--i': index }"
              >
                <span class="mock-rail__dot">{{ index < activeStep[mock] ? "✓" : index + 1 }}</span>
                {{ step }}
              </span>
            </div>

            <div v-if="mock === 'overview'" class="mock-main">
              <div class="mock-card mock-hello" style="--i: 0">
                <span class="mock-initials mock-initials--lg">CM</span>
                <span class="mock-hello__copy">
                  <b class="mock-title">Halo, Calon Mahasiswa Contoh</b>
                  <span class="mock-muted">No. pendaftaran 000000000</span>
                </span>
                <span class="mock-progress">
                  <span class="mock-progress__label">3 dari 6 langkah</span>
                  <span class="mock-progress__track"><span style="width: 50%" /></span>
                </span>
              </div>
              <div class="mock-tiles">
                <div
                  v-for="(tile, index) in tiles"
                  :key="tile.label"
                  class="mock-card mock-tile"
                  :style="{ '--i': index + 1 }"
                >
                  <Icon :name="tile.icon" class="mock-tile__icon" />
                  <span class="mock-label">{{ tile.label }}</span>
                  <span class="mock-chip" :class="`mock-chip--${tile.tone}`">{{ tile.status }}</span>
                </div>
              </div>
              <div class="mock-card mock-next" style="--i: 4">
                <span>
                  <span class="mock-label">Langkah berikutnya</span>
                  <b class="mock-title">Pilih program studi</b>
                </span>
                <span class="mock-button">
                  Lanjutkan
                  <Icon name="mdi:arrow-right" class="mock-button__icon" />
                </span>
              </div>
            </div>

            <div v-else-if="mock === 'billing'" class="mock-main">
              <div class="mock-card mock-invoice" style="--i: 0">
                <div class="mock-invoice__head">
                  <span>
                    <b class="mock-title">Tagihan Admisi</b>
                    <span class="mock-muted">No. INV-0000-000000</span>
                  </span>
                  <span class="mock-chip mock-chip--amber">Menunggu pembayaran</span>
                </div>
                <div
                  v-for="(line, index) in invoiceLines"
                  :key="line.label"
                  class="mock-line"
                  :class="{ 'mock-line--total': line.total }"
                  :style="{ '--i': index }"
                >
                  <span>{{ line.label }}</span>
                  <b>{{ line.amount }}</b>
                </div>
              </div>
              <div class="mock-card" style="--i: 1">
                <p class="mock-label">Status pembayaran</p>
                <ol class="mock-track">
                  <li
                    v-for="(stage, index) in paymentStages"
                    :key="stage"
                    :class="{ 'mock-track__done': index === 0, 'mock-track__now': index === 1 }"
                  >
                    <span class="mock-track__dot">{{ index === 0 ? "✓" : "" }}</span>
                    {{ stage }}
                  </li>
                </ol>
                <span class="mock-button mock-button--ghost">Lihat cara bayar</span>
              </div>
            </div>

            <div v-else-if="mock === 'forms'" class="mock-main">
              <div
                v-for="(section, index) in doneSections"
                :key="section"
                class="mock-card mock-done"
                :style="{ '--i': index }"
              >
                <span class="mock-check">✓</span>
                <b>{{ section }}</b>
                <span class="mock-muted mock-done__edit">Ubah</span>
              </div>
              <div class="mock-card mock-form" style="--i: 2">
                <b class="mock-title">Program studi</b>
                <div class="mock-form__grid">
                  <div
                    v-for="(field, index) in programFields"
                    :key="field.label"
                    class="mock-field"
                    :style="{ '--i': index }"
                  >
                    <span class="mock-label">{{ field.label }}</span>
                    <span class="mock-input mock-input--select">
                      {{ field.value }}
                      <Icon name="mdi:chevron-down" class="mock-input__chevron" />
                    </span>
                  </div>
                </div>
                <span class="mock-button">Simpan dan lanjut</span>
              </div>
            </div>

            <div v-else class="mock-main">
              <div class="mock-card mock-drop" style="--i: 0">
                <Icon name="mdi:tray-arrow-up" class="mock-drop__icon" />
                <span><b>Seret berkas ke sini</b> atau pilih dari perangkat</span>
              </div>
              <div class="mock-card" style="--i: 1">
                <div
                  v-for="(file, index) in files"
                  :key="file.label"
                  class="mock-file"
                  :style="{ '--i': index }"
                >
                  <Icon :name="file.icon" class="mock-file__icon" />
                  <span class="mock-file__copy">
                    <b>{{ file.label }}</b>
                    <span class="mock-muted">{{ file.name }}</span>
                  </span>
                  <span class="mock-chip" :class="`mock-chip--${file.tone}`">{{ file.status }}</span>
                </div>
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
import type { AdmisiMock, AdmisiScreen } from "../data";

// "load": the mock assembles on first paint (hero). "reveal": it assembles when
// the page's reveal observer adds `is-revealed` to this figure.
const props = defineProps<{
  screen: AdmisiScreen;
  eager?: boolean;
  assemble?: "load" | "reveal";
}>();

const mock = computed<AdmisiMock>(() => props.screen.mock ?? "overview");

// Everything below is sample content for the CSS mock, not real Admisi data.
const railSteps = ["Akun", "Tagihan admisi", "Data diri", "Program studi", "Dokumen", "NIM"];

// Which rail step is current on each signed-in mock.
const activeStep: Record<Exclude<AdmisiMock, "register">, number> = {
  overview: 3,
  billing: 1,
  forms: 3,
  documents: 4,
};

const signUpFields = [
  { label: "Nama lengkap", value: "Calon Mahasiswa Contoh" },
  { label: "Email", value: "contoh@example.com" },
  { label: "Nomor HP", value: "0800-0000-0000" },
  { label: "Kata sandi", value: "••••••••" },
];

const tiles = [
  { label: "Tagihan admisi", status: "Lunas", tone: "green", icon: "mdi:receipt-text-outline" },
  { label: "Program studi", status: "Belum dipilih", tone: "amber", icon: "mdi:school-outline" },
  { label: "Dokumen", status: "0 dari 4", tone: "grey", icon: "mdi:file-document-outline" },
];

const invoiceLines = [
  { label: "Biaya admisi (contoh)", amount: "Rp 000.000" },
  { label: "Biaya layanan (contoh)", amount: "Rp 0.000" },
  { label: "Total", amount: "Rp 000.000", total: true },
];

const paymentStages = ["Diterbitkan", "Dibayar", "Terverifikasi"];

const doneSections = ["Data diri", "Alamat & kontak"];

const programFields = [
  { label: "Jenjang", value: "S1" },
  { label: "Fakultas", value: "Fakultas Contoh" },
  { label: "Program studi", value: "Program Studi Contoh" },
  { label: "Lokasi ujian", value: "Kota Contoh" },
];

const files = [
  { label: "Ijazah", name: "ijazah-contoh.pdf", status: "Terunggah", tone: "green", icon: "mdi:file-pdf-box" },
  { label: "Pas foto", name: "foto-contoh.jpg", status: "Diperiksa", tone: "amber", icon: "mdi:image-outline" },
  { label: "Kartu identitas", name: "identitas-contoh.pdf", status: "Terunggah", tone: "green", icon: "mdi:file-pdf-box" },
  { label: "Transkrip alih kredit", name: "Belum ada berkas", status: "Belum diunggah", tone: "grey", icon: "mdi:file-document-outline" },
];
</script>

<style scoped>
.screen {
  margin: 0;
  min-width: 0;
}

.screen__window {
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
  border: 1px solid var(--admisi-line);
  background: var(--admisi-panel);
  box-shadow:
    0 1px 2px color-mix(in srgb, var(--admisi-shadow) 6%, transparent),
    0 24px 48px -12px color-mix(in srgb, var(--admisi-shadow) 24%, transparent);
}

.screen__bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  height: 2.5rem;
  padding-inline: 0.9rem;
  border-bottom: 1px solid var(--admisi-line);
  background: var(--admisi-chrome);
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
  background: color-mix(in srgb, var(--admisi-muted) 35%, transparent);
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
  background: var(--admisi-page);
  color: var(--admisi-muted);
  font-family: var(--admisi-font-mono);
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
  background: #f4f7f5;
}

.screen__img {
  display: block;
  width: 100%;
  height: auto;
}

.screen__caption {
  margin-top: 0.75rem;
  font-family: var(--admisi-font-body);
  font-size: 0.9375rem;
  font-style: italic;
  color: var(--admisi-muted);
  text-align: center;
}

/* CSS mock. Everything is sized in em off a container-relative base, so the
   mock scales like a screenshot. It keeps light product colours in both
   colour modes, like a real screenshot would. */
.mock {
  --m-green: #0d7a4d;
  --m-green-deep: #0a5a39;
  --m-mint: #e3f1e9;
  --m-amber: #f3a43a;
  --m-amber-soft: #fff1da;
  --m-ink: #14261d;
  --m-muted: #6d8076;
  --m-line: #e1e9e4;

  display: flex;
  flex-direction: column;
  font-family: var(--admisi-font-body);
  font-size: clamp(8.5px, 1.6cqw, 14px);
  line-height: 1.35;
  color: var(--m-ink);
  user-select: none;
}

.mock b {
  font-weight: 600;
}

.mock__top {
  display: flex;
  align-items: center;
  gap: 2em;
  padding: 1em 2em;
  background: var(--m-green);
  color: #d9eee2;
}

.mock__logo {
  margin-right: 1em;
  font-family: var(--admisi-font-display);
  font-size: 1.45em;
  font-weight: 700;
  color: #fff;
}

.mock__logo b {
  color: #ffc56b;
}

.mock__nav {
  font-size: 1em;
}

.mock__user {
  display: inline-flex;
  align-items: center;
  gap: 1em;
  margin-left: auto;
}

.mock__bell {
  width: 1.4em;
  height: 1.4em;
}

.mock-initials {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 2.4em;
  height: 2.4em;
  border-radius: 50%;
  background: #ffc56b;
  color: var(--m-ink);
  font-size: 0.85em;
  font-weight: 700;
}

.mock-initials--lg {
  width: 3.4em;
  height: 3.4em;
  font-size: 1.1em;
  background: var(--m-green);
  color: #fff;
}

.mock__body {
  flex: 1;
  min-height: 0;
  display: grid;
  gap: 1.4em;
  padding: 1.6em 2em;
}

.mock-card {
  display: grid;
  gap: 0.7em;
  align-content: start;
  padding: 1.2em 1.4em;
  border-radius: 0.9em;
  border: 1px solid var(--m-line);
  background: #fff;
}

.mock-title {
  font-family: var(--admisi-font-display);
  font-size: 1.3em;
  font-weight: 700;
  line-height: 1.2;
}

.mock-label {
  font-size: 0.85em;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--m-muted);
}

.mock-muted {
  color: var(--m-muted);
}

.mock-chip {
  justify-self: start;
  padding: 0.25em 0.75em;
  border-radius: 999px;
  font-size: 0.85em;
  font-weight: 600;
  white-space: nowrap;
}

.mock-chip--green {
  background: var(--m-mint);
  color: var(--m-green-deep);
}

.mock-chip--amber {
  background: var(--m-amber-soft);
  color: #9a5a0a;
}

.mock-chip--grey {
  background: #eef1ef;
  color: var(--m-muted);
}

.mock-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4em;
  justify-self: start;
  padding: 0.6em 1.3em;
  border-radius: 0.6em;
  background: var(--m-green);
  color: #fff;
  font-weight: 600;
}

.mock-button--ghost {
  border: 1px solid color-mix(in srgb, var(--m-green) 40%, transparent);
  background: transparent;
  color: var(--m-green);
}

.mock-field {
  display: grid;
  gap: 0.3em;
}

.mock-input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.55em 0.8em;
  border-radius: 0.5em;
  border: 1px solid var(--m-line);
  background: #fafcfb;
}

.mock-input__chevron {
  width: 1.2em;
  height: 1.2em;
  color: var(--m-muted);
}

.mock-check {
  display: grid;
  place-items: center;
  width: 1.6em;
  height: 1.6em;
  border-radius: 50%;
  background: var(--m-green);
  color: #fff;
  font-size: 0.85em;
  font-weight: 700;
}

/* Sign-up */
.mock-reg {
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
  align-items: start;
}

.mock-reg__form {
  gap: 0.8em;
}

.mock-reg__mail {
  justify-items: center;
  gap: 0.9em;
  padding-block: 2.2em;
  text-align: center;
  background: linear-gradient(var(--m-mint), #fff 70%);
}

.mock-reg__mail .mock-chip,
.mock-reg__mail .mock-button {
  justify-self: center;
}

.mock-reg__icon {
  display: grid;
  place-items: center;
  width: 4.6em;
  height: 4.6em;
  border-radius: 50%;
  background: #fff;
  color: var(--m-green);
  box-shadow: 0 0.5em 1.5em -0.6em rgb(13 122 77 / 0.45);
}

.mock-reg__glyph {
  width: 2.4em;
  height: 2.4em;
}

/* Signed-in layout: progress rail plus the current step. */
.mock-app {
  grid-template-columns: 15em minmax(0, 1fr);
}

.mock-rail {
  display: grid;
  gap: 0.35em;
  padding: 1.2em 1em;
  border-radius: 0.9em;
  background: #fff;
  border: 1px solid var(--m-line);
}

.mock-rail .mock-label {
  margin-bottom: 0.4em;
  padding-inline: 0.4em;
}

.mock-rail__step {
  display: flex;
  align-items: center;
  gap: 0.7em;
  padding: 0.5em 0.4em;
  border-radius: 0.6em;
  color: var(--m-muted);
}

.mock-rail__dot {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 1.8em;
  height: 1.8em;
  border-radius: 50%;
  border: 1px solid var(--m-line);
  background: #fafcfb;
  font-size: 0.85em;
  font-weight: 700;
}

.mock-rail__step--done {
  color: var(--m-ink);
}

.mock-rail__step--done .mock-rail__dot {
  border-color: var(--m-green);
  background: var(--m-green);
  color: #fff;
}

.mock-rail__step--active {
  background: var(--m-amber-soft);
  color: var(--m-ink);
  font-weight: 600;
}

.mock-rail__step--active .mock-rail__dot {
  border-color: var(--m-amber);
  background: var(--m-amber);
  color: var(--m-ink);
}

.mock-main {
  display: grid;
  gap: 1.1em;
  min-width: 0;
}

/* Overview */
.mock-hello {
  grid-template-columns: auto minmax(0, 1fr) 14em;
  align-items: center;
  gap: 1.2em;
}

.mock-hello__copy {
  display: grid;
  gap: 0.25em;
}

.mock-progress {
  display: grid;
  gap: 0.45em;
  font-size: 0.85em;
  font-weight: 600;
  color: var(--m-muted);
}

.mock-progress__track {
  height: 0.7em;
  border-radius: 999px;
  background: var(--m-mint);
  overflow: hidden;
}

.mock-progress__track span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: var(--m-green);
}

.mock-tiles {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.1em;
}

.mock-tile {
  gap: 0.5em;
}

.mock-tile__icon {
  width: 1.8em;
  height: 1.8em;
  color: var(--m-green);
}

.mock-next {
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  border-color: color-mix(in srgb, var(--m-amber) 55%, transparent);
  background: linear-gradient(90deg, var(--m-amber-soft), #fff);
}

.mock-next > span:first-child {
  display: grid;
  gap: 0.2em;
}

.mock-button__icon {
  width: 1.2em;
  height: 1.2em;
}

/* Billing */
.mock-invoice {
  gap: 0.2em;
}

.mock-invoice__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1em;
  margin-bottom: 0.8em;
}

.mock-invoice__head > span:first-child {
  display: grid;
  gap: 0.2em;
}

.mock-line {
  display: flex;
  justify-content: space-between;
  padding: 0.65em 0;
  border-top: 1px dashed var(--m-line);
}

.mock-line--total {
  border-top: 1px solid var(--m-ink);
  font-size: 1.1em;
}

.mock-track {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin: 0.4em 0 0.6em;
  list-style: none;
}

.mock-track li {
  position: relative;
  display: grid;
  justify-items: center;
  gap: 0.4em;
  font-size: 0.9em;
  color: var(--m-muted);
}

.mock-track li + li::before {
  content: "";
  position: absolute;
  top: 0.9em;
  right: 50%;
  width: 100%;
  height: 2px;
  background: var(--m-line);
  z-index: 0;
}

.mock-track__dot {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 1.9em;
  height: 1.9em;
  border-radius: 50%;
  border: 2px solid var(--m-line);
  background: #fff;
  color: #fff;
  font-weight: 700;
}

.mock-track li.mock-track__done {
  color: var(--m-ink);
}

.mock-track__done .mock-track__dot {
  border-color: var(--m-green);
  background: var(--m-green);
}

.mock-track li.mock-track__now {
  color: var(--m-ink);
  font-weight: 600;
}

.mock-track__now .mock-track__dot {
  border-color: var(--m-amber);
  background: var(--m-amber-soft);
}

/* Forms */
.mock-done {
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 0.8em;
  padding-block: 0.8em;
}

.mock-done__edit {
  font-size: 0.9em;
}

.mock-form {
  gap: 1em;
  border-color: color-mix(in srgb, var(--m-amber) 55%, transparent);
}

.mock-form__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.9em 1.2em;
}

/* Documents */
.mock-drop {
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  gap: 1em;
  border: 2px dashed color-mix(in srgb, var(--m-green) 35%, transparent);
  background: var(--m-mint);
  color: var(--m-green-deep);
}

.mock-drop__icon {
  width: 2.2em;
  height: 2.2em;
}

.mock-file {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 0.9em;
  padding: 0.55em 0;
}

.mock-file + .mock-file {
  border-top: 1px solid var(--m-line);
}

.mock-file__icon {
  width: 1.9em;
  height: 1.9em;
  color: var(--m-green);
}

.mock-file__copy {
  display: grid;
  gap: 0.1em;
  min-width: 0;
}

.mock-file__copy > * {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* On narrow frames the mock text would be too small to read, so the layout
   simplifies: no top-bar links, a slimmer rail, fewer columns. */
@container (max-width: 560px) {
  .mock {
    font-size: max(9px, 2.5cqw);
  }

  .mock__nav,
  .mock__bell {
    display: none;
  }

  .mock__body {
    padding: 1em;
    gap: 1em;
  }

  .mock-app {
    grid-template-columns: minmax(0, 1fr);
  }

  .mock-rail {
    display: none;
  }

  .mock-reg {
    grid-template-columns: minmax(0, 1fr);
  }

  .mock-hello {
    grid-template-columns: auto minmax(0, 1fr);
  }

  .mock-progress {
    grid-column: 1 / -1;
  }

  .mock-form__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}

/* Assembly motion. Only runs for `assemble` frames, only when the visitor has
   no reduced-motion preference, and only animates opacity and transform.
   `--base` is when the sequence starts. */
@media (prefers-reduced-motion: no-preference) {
  .screen--assemble-load {
    --base: 1000ms;
  }

  .screen--assemble-reveal {
    --base: 350ms;
  }

  :is(.screen--assemble-load, .screen--assemble-reveal.is-revealed) .mock__top {
    animation: mock-fade 600ms var(--admisi-ease) var(--base) both;
  }

  :is(.screen--assemble-load, .screen--assemble-reveal.is-revealed) .mock-rail {
    animation: mock-slide 700ms var(--admisi-ease) calc(var(--base) + 120ms) both;
  }

  :is(.screen--assemble-load, .screen--assemble-reveal.is-revealed) .mock-rail__step {
    animation: mock-slide 500ms var(--admisi-ease) calc(var(--base) + 260ms + var(--i) * 60ms) both;
  }

  :is(.screen--assemble-load, .screen--assemble-reveal.is-revealed) .mock-card[style] {
    animation: mock-rise 650ms var(--admisi-ease) calc(var(--base) + 220ms + var(--i, 0) * 90ms) both;
  }

  :is(.screen--assemble-load, .screen--assemble-reveal.is-revealed) :is(.mock-field, .mock-line, .mock-file)[style] {
    animation: mock-rise 550ms var(--admisi-ease) calc(var(--base) + 520ms + var(--i) * 70ms) both;
  }

  :is(.screen--assemble-load, .screen--assemble-reveal.is-revealed) .mock-progress__track span {
    transform-origin: left;
    animation: mock-grow 900ms var(--admisi-ease) calc(var(--base) + 700ms) both;
  }
}

@media (prefers-reduced-motion: no-preference) and (max-width: 767px) {
  .screen--assemble-load {
    --base: 650ms;
  }
}

@keyframes mock-fade {
  from {
    opacity: 0;
  }
}

@keyframes mock-slide {
  from {
    opacity: 0;
    transform: translateX(-0.8em);
  }
}

@keyframes mock-rise {
  from {
    opacity: 0;
    transform: translateY(1em) scale(0.98);
  }
}

@keyframes mock-grow {
  from {
    transform: scaleX(0);
  }
}
</style>
