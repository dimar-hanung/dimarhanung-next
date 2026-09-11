<template>
  <div class="gallery-page min-h-screen bg-muted-100 text-muted-900 dark:bg-muted-950 dark:text-white">
    <t-nav class="relative z-50" />

    <div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)]"
      />
      <div
        class="absolute -top-24 right-0 h-96 w-96 rounded-full bg-gradient-to-br from-primary-400/25 to-indigo-500/20 blur-3xl"
      />
      <div
        class="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-gradient-to-tr from-amber-400/15 to-primary-500/10 blur-3xl"
      />
    </div>

    <div class="mx-auto max-w-7xl px-6 pb-24 pt-10 md:py-16">
      <header class="mb-12 md:mb-16">
        <p
          class="inline-flex items-center gap-2 rounded-full border border-muted-200 bg-white/80 px-3 py-1 text-xs font-medium text-muted-500 backdrop-blur dark:border-white/10 dark:bg-muted-900/70 dark:text-muted-400"
        >
          <Icon name="mdi:certificate-outline" class="h-4 w-4 text-primary-500" />
          Achievements
        </p>
        <div class="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div class="max-w-2xl">
            <h1 class="text-4xl font-bold tracking-tight md:text-6xl">
              Sertifikat
              <span class="text-primary-600 dark:text-primary-400">Profesional</span>
            </h1>
            <p class="mt-4 text-lg leading-relaxed text-muted-500 dark:text-muted-400">
              Dokumentasi sertifikasi dan pencapaian dalam perjalanan karir di
              bidang teknologi dan pengembangan software.
            </p>
          </div>
          <dl class="flex gap-6">
            <div>
              <dt class="text-xs font-semibold uppercase tracking-[0.16em] text-muted-400">
                Terverifikasi
              </dt>
              <dd class="mt-1 text-3xl font-bold tabular-nums">{{ verifiedCount }}</dd>
            </div>
            <div>
              <dt class="text-xs font-semibold uppercase tracking-[0.16em] text-muted-400">
                Ditampilkan
              </dt>
              <dd class="mt-1 text-3xl font-bold tabular-nums">{{ visibleCertificates.length }}</dd>
            </div>
          </dl>
        </div>
      </header>

      <div class="mb-10 flex flex-wrap items-center gap-2">
        <button
          v-for="filter in filters"
          :key="filter.id"
          type="button"
          class="rounded-full border px-4 py-2 text-sm font-medium transition-colors"
          :class="
            activeFilter === filter.id
              ? 'border-muted-900 bg-muted-900 text-white dark:border-white dark:bg-white dark:text-muted-950'
              : 'border-muted-200 bg-white/80 text-muted-600 hover:border-muted-300 hover:text-muted-900 dark:border-white/10 dark:bg-muted-900/70 dark:text-muted-300 dark:hover:border-white/20 dark:hover:text-white'
          "
          :aria-pressed="activeFilter === filter.id"
          @click="activeFilter = filter.id"
        >
          {{ filter.label }}
          <span
            class="ml-1 tabular-nums"
            :class="
              activeFilter === filter.id
                ? 'text-white/70 dark:text-muted-500'
                : 'text-muted-400 dark:text-muted-500'
            "
          >
            {{ filter.count }}
          </span>
        </button>
      </div>

      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <ClientOnly>
          <Certificate3DCard
            v-for="(item, index) in visibleCertificates"
            :key="itemKey(item, index)"
            class="gallery-card"
            :style="{ animationDelay: `${Math.min(index * 45, 270)}ms` }"
            :image-url="item.imageUrl"
            :title="item.title"
            :desc="item.desc"
            :date="item.date"
            :cradential="item.cradential"
            :issuer="item.issuer"
            :issuer-icon="item.issuerIcon"
            @preview="openPreview(index)"
          />

          <template #fallback>
            <div
              v-for="n in 6"
              :key="n"
              class="overflow-hidden rounded-2xl border border-muted-200 bg-white shadow-sm dark:border-white/10 dark:bg-muted-900"
            >
              <div class="aspect-[4/3] animate-pulse bg-muted-200 dark:bg-muted-800" />
              <div class="space-y-3 p-5">
                <div class="h-3 w-1/3 animate-pulse rounded bg-muted-200 dark:bg-muted-700" />
                <div class="h-5 animate-pulse rounded bg-muted-200 dark:bg-muted-700" />
                <div class="h-4 w-5/6 animate-pulse rounded bg-muted-200 dark:bg-muted-700" />
              </div>
            </div>
          </template>
        </ClientOnly>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="preview"
        class="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="previewTitleId"
      >
        <button
          type="button"
          class="absolute inset-0 bg-muted-950/70 backdrop-blur-sm"
          aria-label="Tutup pratinjau"
          @click="closePreview"
        />
        <div
          class="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl dark:bg-muted-900 md:grid-cols-[1.4fr_1fr]"
        >
          <div class="relative bg-muted-100 dark:bg-muted-800">
            <nuxt-img
              :src="preview.imageUrl"
              :alt="preview.title"
              class="h-full max-h-[70vh] w-full object-contain md:max-h-[80vh]"
              format="webp"
              quality="90"
            />
          </div>
          <div class="flex flex-col p-6 md:p-8">
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-muted-400">
              {{ preview.issuer }} · {{ formatPreviewDate(preview.date) }}
            </p>
            <h2 :id="previewTitleId" class="mt-3 text-2xl font-bold">
              {{ preview.title }}
            </h2>
            <p class="mt-3 text-sm leading-relaxed text-muted-500 dark:text-muted-400">
              {{ preview.desc }}
            </p>
            <div class="mt-auto flex flex-wrap items-center gap-3 pt-8">
              <a
                v-if="preview.cradential"
                :href="preview.cradential"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 rounded-full bg-muted-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-600 dark:bg-white dark:text-muted-950 dark:hover:bg-primary-400"
              >
                Lihat Sertifikat
                <Icon name="mdi:open-in-new" class="h-4 w-4" />
              </a>
              <button
                type="button"
                class="inline-flex items-center gap-2 rounded-full border border-muted-200 px-5 py-2.5 text-sm font-medium text-muted-600 hover:border-muted-400 dark:border-white/15 dark:text-muted-300"
                @click="closePreview"
              >
                Tutup
              </button>
              <div class="ml-auto flex gap-2">
                <button
                  type="button"
                  class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-muted-200 text-muted-600 disabled:opacity-30 dark:border-white/15 dark:text-muted-300"
                  :disabled="previewIndex <= 0"
                  aria-label="Sertifikat sebelumnya"
                  @click="shiftPreview(-1)"
                >
                  <Icon name="mdi:chevron-left" class="h-5 w-5" />
                </button>
                <button
                  type="button"
                  class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-muted-200 text-muted-600 disabled:opacity-30 dark:border-white/15 dark:text-muted-300"
                  :disabled="previewIndex >= visibleCertificates.length - 1"
                  aria-label="Sertifikat berikutnya"
                  @click="shiftPreview(1)"
                >
                  <Icon name="mdi:chevron-right" class="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          <button
            type="button"
            class="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-muted-700 shadow-sm dark:bg-muted-800 dark:text-white"
            aria-label="Tutup"
            @click="closePreview"
          >
            <Icon name="mdi:close" class="h-5 w-5" />
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref, watch } from "vue";
import certicatesData from "./certificates.json";
import Certificate3DCard from "./components/Certificate3DCard.vue";

type CertificateRecord = {
  imageUrl: string;
  title: string;
  desc: string;
  date: string;
  cradential?: string;
};

type GalleryItem = CertificateRecord & {
  issuer: string;
  issuerIcon: string;
};

const certificates = reactive(certicatesData) as CertificateRecord[];
const activeFilter = ref("all");
const preview = ref<GalleryItem | null>(null);
const previewTitleId = "certificate-preview-title";

useSeoMeta({
  title: "Certificates | Dimar Hanung",
  description:
    "Professional certificates and credentials in software development by Dimar Hanung.",
});

function resolveIssuer(item: CertificateRecord) {
  const url = item.cradential || "";
  if (url.includes("hackerrank.com")) {
    return { issuer: "HackerRank", issuerIcon: "mdi:code-braces" };
  }
  if (url.includes("testdome.com")) {
    return { issuer: "TestDome", issuerIcon: "mdi:domain" };
  }
  if (url.includes("codecademy.com")) {
    return { issuer: "Codecademy", issuerIcon: "mdi:school-outline" };
  }
  if (url.includes("programminghub") || url.includes("googleapis.com")) {
    return { issuer: "Programming Hub", issuerIcon: "mdi:language-javascript" };
  }
  return { issuer: "Mendatang", issuerIcon: "mdi:clock-outline" };
}

const galleryItems = computed<GalleryItem[]>(() => {
  return certificates
    .map((item) => ({ ...item, ...resolveIssuer(item) }))
    .sort((a, b) => {
      const aUpcoming = !a.cradential ? 1 : 0;
      const bUpcoming = !b.cradential ? 1 : 0;
      if (aUpcoming !== bUpcoming) return aUpcoming - bUpcoming;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
});

const verifiedCount = computed(
  () => galleryItems.value.filter((item) => Boolean(item.cradential)).length,
);

const filters = computed(() => {
  const counts = new Map<string, number>();
  for (const item of galleryItems.value) {
    counts.set(item.issuer, (counts.get(item.issuer) || 0) + 1);
  }
  return [
    { id: "all", label: "Semua", count: galleryItems.value.length },
    ...[...counts.entries()].map(([issuer, count]) => ({
      id: issuer,
      label: issuer,
      count,
    })),
  ];
});

const visibleCertificates = computed(() => {
  if (activeFilter.value === "all") return galleryItems.value;
  return galleryItems.value.filter((item) => item.issuer === activeFilter.value);
});

function itemKey(item: GalleryItem, index: number) {
  return `${item.title}-${item.date}-${item.imageUrl}-${index}`;
}

function formatPreviewDate(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime()) || parsed.getFullYear() > 2100) {
    return "Mendatang";
  }
  return parsed.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const previewIndex = ref(0);

function openPreview(index: number) {
  const item = visibleCertificates.value[index];
  if (!item) return;
  previewIndex.value = index;
  preview.value = item;
}

function closePreview() {
  preview.value = null;
}

function shiftPreview(step: number) {
  const next = previewIndex.value + step;
  const target = visibleCertificates.value[next];
  if (target) {
    previewIndex.value = next;
    preview.value = target;
  }
}

function onKeydown(event: KeyboardEvent) {
  if (!preview.value) return;
  if (event.key === "Escape") closePreview();
  if (event.key === "ArrowRight") shiftPreview(1);
  if (event.key === "ArrowLeft") shiftPreview(-1);
}

watch(activeFilter, () => {
  closePreview();
});

watch(preview, (value) => {
  if (typeof document === "undefined") return;
  document.body.style.overflow = value ? "hidden" : "";
});

onMounted(() => {
  document.addEventListener("keydown", onKeydown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", onKeydown);
  document.body.style.overflow = "";
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap");

.gallery-page {
  font-family: "Outfit", sans-serif;
}

.gallery-card {
  animation: gallery-fade-up 0.45s ease both;
}

@keyframes gallery-fade-up {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .gallery-card {
    animation: none;
  }
}
</style>
