<template>
  <div class="min-h-screen bg-muted-50 dark:bg-muted-950 py-10 px-4 sm:px-6">
    <div class="max-w-5xl mx-auto mb-10">
      <div class="flex items-center gap-3 mb-2">
        <div
          class="w-10 h-10 rounded-xl bg-primary-500/10 dark:bg-primary-400/10 flex items-center justify-center"
        >
          <Icon name="mdi:qrcode-scan" class="text-xl text-primary-500" />
        </div>
        <h1
          class="text-2xl sm:text-3xl font-bold text-muted-900 dark:text-muted-50 tracking-tight"
        >
          QR to Text
        </h1>
      </div>
      <p class="text-muted-500 dark:text-muted-400 text-sm ml-[52px]">
        Decode QR codes from images. Upload a file, drag and drop, or paste an
        image from your clipboard.
      </p>
    </div>

    <div class="max-w-5xl mx-auto space-y-6">
      <div
        ref="dropZone"
        tabindex="0"
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop.prevent="handleDrop"
        @click="triggerFileInput"
        @paste.prevent="handlePaste"
        :class="[
          'relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 outline-none focus:ring-2 focus:ring-primary-500/30',
          isDragging
            ? 'border-primary-400 bg-primary-50/60 dark:bg-primary-900/20 scale-[1.01]'
            : 'border-muted-300 dark:border-muted-700 hover:border-primary-300 dark:hover:border-primary-600 bg-white dark:bg-muted-900',
        ]"
      >
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          class="hidden"
          @change="handleFileSelect"
        />
        <div
          class="flex flex-col items-center gap-3 pointer-events-none select-none"
        >
          <div
            class="w-16 h-16 rounded-2xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center"
          >
            <Icon
              :name="isDecoding ? 'mdi:loading' : 'mdi:image-search-outline'"
              class="text-3xl text-primary-500"
              :class="{ 'animate-spin': isDecoding }"
            />
          </div>
          <div>
            <p
              class="text-muted-700 dark:text-muted-200 font-semibold text-base"
            >
              Drop an image here, click to browse, or paste
            </p>
            <p class="text-muted-400 dark:text-muted-500 text-xs mt-1">
              PNG, JPG, WEBP, GIF supported • Press Ctrl+V anywhere on this page
            </p>
          </div>
        </div>
      </div>

      <div
        v-if="previewUrl || decodedText || errorMessage"
        class="bg-white dark:bg-muted-900 border border-muted-200 dark:border-muted-800 rounded-2xl p-6 space-y-5"
      >
        <div v-if="previewUrl" class="flex flex-col sm:flex-row gap-5">
          <div class="shrink-0">
            <p
              class="text-xs font-semibold text-muted-500 dark:text-muted-400 uppercase tracking-wider mb-2"
            >
              Preview
            </p>
            <img
              :src="previewUrl"
              alt="Uploaded QR code"
              class="w-48 h-48 object-contain rounded-xl border border-muted-200 dark:border-muted-700 bg-muted-50 dark:bg-muted-950"
            />
          </div>

          <div class="flex-1 min-w-0 space-y-3">
            <div class="flex items-center gap-2 flex-wrap">
              <span
                v-if="fileName"
                class="text-xs font-mono px-2 py-1 rounded-lg bg-muted-100 dark:bg-muted-800 text-muted-600 dark:text-muted-300"
              >
                {{ fileName }}
              </span>
              <span
                v-if="fileSize"
                class="text-xs font-mono px-2 py-1 rounded-lg bg-muted-100 dark:bg-muted-800 text-muted-500"
              >
                {{ fileSize }}
              </span>
            </div>

            <div v-if="isDecoding" class="flex items-center gap-2 text-sm text-muted-500">
              <Icon name="mdi:loading" class="animate-spin" />
              Decoding QR code...
            </div>

            <div v-else-if="errorMessage" class="space-y-2">
              <span
                class="inline-flex text-xs px-2 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 font-medium"
              >
                {{ errorMessage }}
              </span>
              <p class="text-sm text-muted-500 dark:text-muted-400">
                Try a clearer image, crop closer to the QR code, or increase contrast.
              </p>
            </div>

            <div v-else-if="decodedText" class="space-y-2">
              <div class="flex items-center justify-between gap-3">
                <span
                  class="inline-flex text-xs px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-medium"
                >
                  QR decoded
                </span>
                <button
                  @click.stop="copyDecodedText"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-muted-200 dark:border-muted-700 hover:bg-muted-50 dark:hover:bg-muted-800 text-sm text-muted-600 dark:text-muted-300 transition-colors"
                >
                  <Icon
                    :name="copied ? 'mdi:check' : 'mdi:content-copy'"
                    class="text-base"
                    :class="copied ? 'text-green-500' : ''"
                  />
                  {{ copied ? 'Copied' : 'Copy' }}
                </button>
              </div>

              <textarea
                readonly
                :value="decodedText"
                rows="6"
                class="w-full text-sm font-mono bg-muted-50 dark:bg-muted-950 border border-muted-200 dark:border-muted-800 rounded-xl p-4 resize-y text-muted-700 dark:text-muted-300 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="previewUrl || decodedText || errorMessage"
        class="flex items-center gap-3"
      >
        <button
          @click="clearAll"
          class="px-5 py-2.5 text-muted-500 hover:text-red-500 text-sm font-medium transition-colors"
        >
          <Icon name="mdi:delete-outline" class="mr-1" />
          Clear
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { decodeQrFromBlob } from '~/utils/qr-decode';

const fileInput = ref<HTMLInputElement | null>(null);
const dropZone = ref<HTMLElement | null>(null);
const isDragging = ref(false);
const isDecoding = ref(false);
const previewUrl = ref<string | null>(null);
const decodedText = ref('');
const errorMessage = ref('');
const fileName = ref('');
const fileSize = ref('');
const copied = ref(false);

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function revokePreview() {
  if (previewUrl.value?.startsWith('blob:')) {
    URL.revokeObjectURL(previewUrl.value);
  }
}

function clearAll() {
  revokePreview();
  previewUrl.value = null;
  decodedText.value = '';
  errorMessage.value = '';
  fileName.value = '';
  fileSize.value = '';
  copied.value = false;
  if (fileInput.value) {
    fileInput.value.value = '';
  }
}

function triggerFileInput() {
  fileInput.value?.click();
}

async function processImageBlob(blob: Blob, name = 'pasted-image.png') {
  if (!blob.type.startsWith('image/')) {
    errorMessage.value = 'Clipboard does not contain an image';
    return;
  }

  revokePreview();
  previewUrl.value = URL.createObjectURL(blob);
  fileName.value = name;
  fileSize.value = formatFileSize(blob.size);
  decodedText.value = '';
  errorMessage.value = '';
  copied.value = false;
  isDecoding.value = true;

  try {
    const result = await decodeQrFromBlob(blob);
    if (result.success) {
      decodedText.value = result.data;
    } else {
      errorMessage.value = result.error;
    }
  } finally {
    isDecoding.value = false;
  }
}

async function processImageFile(file: File) {
  await processImageBlob(file, file.name);
}

function handleFileSelect(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    processImageFile(file);
  }
  target.value = '';
}

function handleDrop(event: DragEvent) {
  isDragging.value = false;
  const file = event.dataTransfer?.files?.[0];
  if (file) {
    processImageFile(file);
  }
}

function getClipboardImage(event: ClipboardEvent): File | null {
  const items = event.clipboardData?.items;
  if (!items) return null;

  for (const item of items) {
    if (item.type.startsWith('image/')) {
      const blob = item.getAsFile();
      if (blob) return blob;
    }
  }

  return null;
}

function handlePaste(event: ClipboardEvent) {
  const image = getClipboardImage(event);
  if (image) {
    processImageFile(image);
  }
}

function handleWindowPaste(event: ClipboardEvent) {
  const target = event.target as HTMLElement | null;
  if (target?.closest('textarea, input')) return;

  const image = getClipboardImage(event);
  if (image) {
    event.preventDefault();
    processImageFile(image);
  }
}

async function copyDecodedText() {
  if (!decodedText.value) return;
  await navigator.clipboard.writeText(decodedText.value);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
}

onMounted(() => {
  window.addEventListener('paste', handleWindowPaste);
});

onBeforeUnmount(() => {
  window.removeEventListener('paste', handleWindowPaste);
  revokePreview();
});

useHead({
  title: 'QR to Text | Dimar Hanung',
});
</script>
