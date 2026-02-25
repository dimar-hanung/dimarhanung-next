<template>
  <div class="min-h-screen bg-muted-50 dark:bg-muted-950 py-10 px-4 sm:px-6">
    <!-- Header -->
    <div class="max-w-5xl mx-auto mb-10">
      <div class="flex items-center gap-3 mb-2">
        <div
          class="w-10 h-10 rounded-xl bg-primary-500/10 dark:bg-primary-400/10 flex items-center justify-center"
        >
          <Icon name="mdi:file-code-outline" class="text-xl text-primary-500" />
        </div>
        <h1
          class="text-2xl sm:text-3xl font-bold text-muted-900 dark:text-muted-50 tracking-tight"
        >
          Base64 File Tool
        </h1>
      </div>
      <p class="text-muted-500 dark:text-muted-400 text-sm ml-[52px]">
        Encode files to Base64 or decode Base64 strings back to files. Supports
        multiple files at once.
      </p>
    </div>

    <!-- Mode Tabs -->
    <div class="max-w-5xl mx-auto mb-6">
      <div
        class="inline-flex rounded-xl bg-muted-100 dark:bg-muted-900 p-1 gap-1"
      >
        <button
          v-for="tab in modes"
          :key="tab.value"
          @click="activeMode = tab.value"
          :class="[
            'px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200',
            activeMode === tab.value
              ? 'bg-white dark:bg-muted-800 text-primary-600 dark:text-primary-400 shadow-sm'
              : 'text-muted-500 hover:text-muted-700 dark:hover:text-muted-300',
          ]"
        >
          <Icon :name="tab.icon" class="mr-1.5" />
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- ENCODE MODE -->
    <div v-if="activeMode === 'encode'" class="max-w-5xl mx-auto space-y-6">
      <!-- Drop Zone -->
      <div
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop.prevent="handleDrop"
        @click="triggerFileInput"
        :class="[
          'relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300',
          isDragging
            ? 'border-primary-400 bg-primary-50/60 dark:bg-primary-900/20 scale-[1.01]'
            : 'border-muted-300 dark:border-muted-700 hover:border-primary-300 dark:hover:border-primary-600 bg-white dark:bg-muted-900',
        ]"
      >
        <input
          ref="fileInput"
          type="file"
          multiple
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
              name="mdi:cloud-upload-outline"
              class="text-3xl text-primary-500"
            />
          </div>
          <div>
            <p
              class="text-muted-700 dark:text-muted-200 font-semibold text-base"
            >
              Drop files here or click to browse
            </p>
            <p class="text-muted-400 dark:text-muted-500 text-xs mt-1">
              Any file type supported • Multiple files allowed
            </p>
          </div>
        </div>
      </div>

      <!-- File List -->
      <TransitionGroup
        name="file-list"
        tag="div"
        class="space-y-3"
        v-if="encodeFiles.length"
      >
        <div
          v-for="(file, i) in encodeFiles"
          :key="file.id"
          class="group bg-white dark:bg-muted-900 border border-muted-200 dark:border-muted-800 rounded-xl p-4 transition-all duration-200 hover:shadow-md"
        >
          <div class="flex items-start gap-4">
            <!-- File Icon -->
            <div
              class="w-10 h-10 shrink-0 rounded-lg flex items-center justify-center text-sm font-bold uppercase"
              :class="getFileIconClass(file.type)"
            >
              {{ getFileExtension(file.name) }}
            </div>

            <!-- File Info -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <p
                  class="text-sm font-medium text-muted-800 dark:text-muted-100 truncate"
                >
                  {{ file.name }}
                </p>
                <span
                  class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted-100 dark:bg-muted-800 text-muted-500 shrink-0"
                >
                  {{ formatFileSize(file.size) }}
                </span>
              </div>

              <!-- Progress -->
              <div v-if="file.status === 'processing'" class="mt-2">
                <div
                  class="h-1 rounded-full bg-muted-100 dark:bg-muted-800 overflow-hidden"
                >
                  <div
                    class="h-full bg-primary-500 rounded-full animate-pulse"
                    style="width: 60%"
                  ></div>
                </div>
              </div>

              <!-- Base64 Output -->
              <div v-if="file.status === 'done' && file.base64" class="mt-2">
                <div class="flex items-center gap-2 mb-1.5">
                  <span
                    class="text-[10px] px-1.5 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-medium"
                  >
                    ✓ Encoded
                  </span>
                  <span
                    class="text-[10px] text-muted-400 font-mono"
                  >
                    {{ formatFileSize(file.base64.length) }} base64
                  </span>
                </div>
                <div class="relative">
                  <textarea
                    readonly
                    :value="file.base64"
                    rows="3"
                    class="w-full text-xs font-mono bg-muted-50 dark:bg-muted-950 border border-muted-200 dark:border-muted-800 rounded-lg p-3 resize-none text-muted-600 dark:text-muted-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                  />
                  <button
                    @click="copyToClipboard(file.base64!, i)"
                    class="absolute top-2 right-2 p-1.5 rounded-md bg-white dark:bg-muted-800 border border-muted-200 dark:border-muted-700 hover:bg-muted-50 dark:hover:bg-muted-700 transition-colors"
                    :title="file.copied ? 'Copied!' : 'Copy'"
                  >
                    <Icon
                      :name="file.copied ? 'mdi:check' : 'mdi:content-copy'"
                      class="text-sm"
                      :class="
                        file.copied
                          ? 'text-green-500'
                          : 'text-muted-400'
                      "
                    />
                  </button>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <button
              @click="removeEncodeFile(i)"
              class="p-1.5 rounded-lg text-muted-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors opacity-0 group-hover:opacity-100"
            >
              <Icon name="mdi:close" class="text-lg" />
            </button>
          </div>
        </div>
      </TransitionGroup>

      <!-- Encode Actions -->
      <div
        v-if="encodeFiles.length"
        class="flex items-center gap-3 flex-wrap"
      >
        <button
          @click="encodeAll"
          :disabled="isEncoding"
          class="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white rounded-xl text-sm font-medium transition-colors shadow-sm shadow-primary-500/20"
        >
          <Icon
            name="mdi:play"
            class="mr-1.5"
            :class="{ 'animate-spin': isEncoding }"
          />
          {{ isEncoding ? "Encoding..." : "Encode All" }}
        </button>
        <button
          @click="copyAllBase64"
          v-if="hasEncodedFiles"
          class="px-5 py-2.5 border border-muted-300 dark:border-muted-700 hover:bg-muted-100 dark:hover:bg-muted-800 text-muted-700 dark:text-muted-300 rounded-xl text-sm font-medium transition-colors"
        >
          <Icon name="mdi:content-copy" class="mr-1.5" />
          Copy All
        </button>
        <button
          @click="downloadAllAsJson"
          v-if="hasEncodedFiles"
          class="px-5 py-2.5 border border-muted-300 dark:border-muted-700 hover:bg-muted-100 dark:hover:bg-muted-800 text-muted-700 dark:text-muted-300 rounded-xl text-sm font-medium transition-colors"
        >
          <Icon name="mdi:download" class="mr-1.5" />
          Download JSON
        </button>
        <button
          @click="downloadAllAsBlob"
          v-if="hasEncodedFiles"
          class="px-5 py-2.5 border border-muted-300 dark:border-muted-700 hover:bg-muted-100 dark:hover:bg-muted-800 text-muted-700 dark:text-muted-300 rounded-xl text-sm font-medium transition-colors"
        >
          <Icon name="mdi:file-download-outline" class="mr-1.5" />
          Download Blob
        </button>
        <button
          @click="clearEncodeFiles"
          class="px-5 py-2.5 text-muted-500 hover:text-red-500 text-sm font-medium transition-colors ml-auto"
        >
          <Icon name="mdi:delete-outline" class="mr-1" />
          Clear All
        </button>
      </div>
    </div>

    <!-- DECODE MODE -->
    <div v-else class="max-w-5xl mx-auto space-y-6">
      <!-- Upload Base64 File -->
      <div
        @dragover.prevent="isDecodeDragging = true"
        @dragleave.prevent="isDecodeDragging = false"
        @drop.prevent="handleDecodeDrop"
        @click="triggerDecodeFileInput"
        :class="[
          'relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300',
          isDecodeDragging
            ? 'border-primary-400 bg-primary-50/60 dark:bg-primary-900/20 scale-[1.01]'
            : 'border-muted-300 dark:border-muted-700 hover:border-primary-300 dark:hover:border-primary-600 bg-white dark:bg-muted-900',
        ]"
      >
        <input
          ref="decodeFileInput"
          type="file"
          multiple
          class="hidden"
          @change="handleDecodeFileSelect"
        />
        <div class="flex flex-col items-center gap-2 pointer-events-none select-none">
          <div
            class="w-12 h-12 rounded-2xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center"
          >
            <Icon name="mdi:file-upload-outline" class="text-2xl text-primary-500" />
          </div>
          <div>
            <p class="text-muted-700 dark:text-muted-200 font-semibold text-sm">
              Upload files containing Base64 strings
            </p>
            <p class="text-muted-400 dark:text-muted-500 text-xs mt-0.5">
              Any file type supported — content will be loaded as a decode entry
            </p>
          </div>
        </div>
      </div>

      <!-- Decode Input Area -->
      <div class="space-y-4">
        <div
          v-for="(item, i) in decodeItems"
          :key="item.id"
          class="group bg-white dark:bg-muted-900 border border-muted-200 dark:border-muted-800 rounded-xl p-5 transition-all duration-200 hover:shadow-md"
        >
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2">
              <span
                class="text-xs font-bold text-muted-400 dark:text-muted-500 bg-muted-100 dark:bg-muted-800 w-6 h-6 rounded-md flex items-center justify-center"
              >
                {{ i + 1 }}
              </span>
              <input
                v-model="item.filename"
                placeholder="filename.ext"
                class="text-sm font-medium bg-transparent border-b border-transparent hover:border-muted-300 dark:hover:border-muted-600 focus:border-primary-500 focus:outline-none text-muted-800 dark:text-muted-100 px-1 py-0.5 transition-colors"
              />
            </div>
            <button
              @click="removeDecodeItem(i)"
              v-if="decodeItems.length > 1"
              class="p-1.5 rounded-lg text-muted-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors opacity-0 group-hover:opacity-100"
            >
              <Icon name="mdi:close" class="text-lg" />
            </button>
          </div>

          <textarea
            v-model="item.base64"
            placeholder="Paste base64 string here... (e.g. data:image/png;base64,iVBOR... or raw base64)"
            rows="4"
            class="w-full text-xs font-mono bg-muted-50 dark:bg-muted-950 border border-muted-200 dark:border-muted-800 rounded-lg p-3 resize-none text-muted-600 dark:text-muted-400 placeholder:text-muted-300 dark:placeholder:text-muted-700 focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all"
          />

          <!-- Preview & Status -->
          <div
            v-if="item.status === 'done'"
            class="mt-3 flex items-center gap-3"
          >
            <span
              class="text-[10px] px-1.5 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-medium"
            >
              ✓ Decoded
            </span>
            <span class="text-[10px] text-muted-400 font-mono">
              {{ item.decodedSize ? formatFileSize(item.decodedSize) : "" }}
            </span>
            <!-- Image preview -->
            <img
              v-if="item.previewUrl && isImageType(item.detectedType)"
              :src="item.previewUrl"
              class="w-10 h-10 rounded-md object-cover border border-muted-200 dark:border-muted-700"
            />
          </div>
          <div
            v-if="item.status === 'error'"
            class="mt-3 space-y-1.5"
          >
            <span
              class="text-[10px] px-1.5 py-0.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 font-medium"
            >
              ✗ {{ item.errorMessage ? 'Not Base64' : 'Invalid Base64' }}
            </span>
            <p
              v-if="item.errorMessage"
              class="text-xs text-red-600 dark:text-red-400"
            >
              {{ item.errorMessage }}
              <button
                @click="activeMode = 'encode'"
                class="underline hover:text-primary-500 transition-colors font-medium"
              >
                Switch to Encode →
              </button>
            </p>
          </div>
        </div>
      </div>

      <!-- Decode Actions -->
      <div class="flex items-center gap-3 flex-wrap">
        <button
          @click="addDecodeItem"
          class="px-4 py-2.5 border-2 border-dashed border-muted-300 dark:border-muted-700 hover:border-primary-400 dark:hover:border-primary-500 text-muted-500 hover:text-primary-600 dark:hover:text-primary-400 rounded-xl text-sm font-medium transition-colors"
        >
          <Icon name="mdi:plus" class="mr-1" />
          Add Another
        </button>
        <button
          @click="decodeAll"
          :disabled="isDecoding"
          class="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white rounded-xl text-sm font-medium transition-colors shadow-sm shadow-primary-500/20"
        >
          <Icon
            name="mdi:play"
            class="mr-1.5"
            :class="{ 'animate-spin': isDecoding }"
          />
          {{ isDecoding ? "Decoding..." : "Decode & Download All" }}
        </button>
        <button
          @click="clearDecodeItems"
          v-if="decodeItems.length > 1"
          class="px-5 py-2.5 text-muted-500 hover:text-red-500 text-sm font-medium transition-colors ml-auto"
        >
          <Icon name="mdi:delete-outline" class="mr-1" />
          Clear All
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface EncodeFile {
  id: string;
  name: string;
  type: string;
  size: number;
  file: File;
  base64: string | null;
  status: "idle" | "processing" | "done" | "error";
  copied: boolean;
}

interface DecodeItem {
  id: string;
  filename: string;
  base64: string;
  status: "idle" | "done" | "error";
  detectedType: string;
  decodedSize: number | null;
  previewUrl: string | null;
  errorMessage: string | null;
}

const activeMode = ref<"encode" | "decode">("encode");
const isDragging = ref(false);
const isDecodeDragging = ref(false);
const isEncoding = ref(false);
const isDecoding = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);
const decodeFileInput = ref<HTMLInputElement | null>(null);
const jsonImport = ref("");

const modes = [
  { value: "encode" as const, label: "Encode", icon: "mdi:lock-outline" },
  { value: "decode" as const, label: "Decode", icon: "mdi:lock-open-outline" },
];

// ─── ENCODE ──────────────────────────────────────────
const encodeFiles = ref<EncodeFile[]>([]);

const hasEncodedFiles = computed(() =>
  encodeFiles.value.some((f) => f.status === "done" && f.base64)
);

function triggerFileInput() {
  fileInput.value?.click();
}

function handleFileSelect(e: Event) {
  const target = e.target as HTMLInputElement;
  if (target.files) addFiles(Array.from(target.files));
  target.value = "";
}

function handleDrop(e: DragEvent) {
  isDragging.value = false;
  if (e.dataTransfer?.files) addFiles(Array.from(e.dataTransfer.files));
}

function addFiles(files: File[]) {
  for (const file of files) {
    encodeFiles.value.push({
      id: crypto.randomUUID(),
      name: file.name,
      type: file.type || "application/octet-stream",
      size: file.size,
      file,
      base64: null,
      status: "idle",
      copied: false,
    });
  }
}

function removeEncodeFile(index: number) {
  encodeFiles.value.splice(index, 1);
}

function clearEncodeFiles() {
  encodeFiles.value = [];
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function encodeAll() {
  isEncoding.value = true;
  for (const file of encodeFiles.value) {
    if (file.status === "done") continue;
    file.status = "processing";
    try {
      file.base64 = await fileToBase64(file.file);
      file.status = "done";
    } catch {
      file.status = "error";
    }
  }
  isEncoding.value = false;
}

async function copyToClipboard(text: string, index: number) {
  await navigator.clipboard.writeText(text);
  const file = encodeFiles.value[index];
  if (!file) return;
  file.copied = true;
  setTimeout(() => {
    if (encodeFiles.value[index]) encodeFiles.value[index]!.copied = false;
  }, 2000);
}

function copyAllBase64() {
  const all = encodeFiles.value
    .filter((f) => f.base64)
    .map((f) => f.base64)
    .join("\n\n");
  navigator.clipboard.writeText(all);
}

function downloadAllAsJson() {
  const data = encodeFiles.value
    .filter((f) => f.base64)
    .map((f) => ({
      name: f.name,
      type: f.type,
      size: f.size,
      base64: f.base64,
    }));
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  downloadBlob(blob, "base64-files.json");
}

function downloadAllAsBlob() {
  for (const file of encodeFiles.value) {
    if (!file.base64) continue;
    const raw = file.base64.replace(/^data:[^;]+;base64,/, "");
    const blobFile = new Blob([raw], { type: "application/octet-stream" });
    const nameWithoutExt = file.name.replace(/\.[^.]+$/, "");
    downloadBlob(blobFile, nameWithoutExt);
  }
}

// ─── DECODE ──────────────────────────────────────────
const decodeItems = ref<DecodeItem[]>([createDecodeItem()]);

function createDecodeItem(): DecodeItem {
  return {
    id: crypto.randomUUID(),
    filename: "",
    base64: "",
    status: "idle",
    detectedType: "",
    decodedSize: null,
    previewUrl: null,
    errorMessage: null,
  };
}

function addDecodeItem() {
  decodeItems.value.push(createDecodeItem());
}

function triggerDecodeFileInput() {
  decodeFileInput.value?.click();
}

function handleDecodeFileSelect(e: Event) {
  const target = e.target as HTMLInputElement;
  if (target.files) loadDecodeFiles(Array.from(target.files));
  target.value = "";
}

function handleDecodeDrop(e: DragEvent) {
  isDecodeDragging.value = false;
  if (e.dataTransfer?.files) loadDecodeFiles(Array.from(e.dataTransfer.files));
}

function looksLikeBase64(str: string): boolean {
  const trimmed = str.trim();
  // Allow data URI prefix
  const raw = trimmed.replace(/^data:[^;]+;base64,/, "");
  // Base64 only contains A-Z, a-z, 0-9, +, /, =, and whitespace
  return /^[A-Za-z0-9+/\s]+=*\s*$/.test(raw) && raw.length > 4;
}

async function loadDecodeFiles(files: File[]) {
  for (const file of files) {
    // Check if this is a binary file (not a text file containing base64)
    // by reading as ArrayBuffer first to detect magic bytes
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    const detectedBinaryType = detectMimeFromBytes(bytes);

    // If magic bytes indicate a known binary format (PDF, ZIP, PNG, etc.),
    // this is NOT a base64 text file — auto-encode it instead
    if (detectedBinaryType) {
      const dataUrl = await fileToBase64(file);
      decodeItems.value.push({
        id: crypto.randomUUID(),
        filename: file.name,
        base64: dataUrl,
        status: "idle",
        detectedType: detectedBinaryType,
        decodedSize: null,
        previewUrl: null,
        errorMessage: null,
      });
      continue;
    }

    const text = new TextDecoder().decode(bytes);

    // Try parsing as JSON array first (exported format)
    try {
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed)) {
        for (const entry of parsed) {
          if (entry.base64) {
            decodeItems.value.push({
              id: crypto.randomUUID(),
              filename: entry.name || file.name.replace(/\.[^.]+$/, ""),
              base64: entry.base64,
              status: "idle",
              detectedType: entry.type || "",
              decodedSize: null,
              previewUrl: null,
              errorMessage: null,
            });
          }
        }
        continue;
      }
    } catch {
      // Not JSON, treat as raw base64
    }

    // Check if the text actually looks like base64
    const trimmed = text.trim();
    if (trimmed) {
      if (looksLikeBase64(trimmed)) {
        decodeItems.value.push({
          id: crypto.randomUUID(),
          filename: file.name.replace(/\.[^.]+$/, ""),
          base64: trimmed,
          status: "idle",
          detectedType: "",
          decodedSize: null,
          previewUrl: null,
          errorMessage: null,
        });
      } else {
        // Not valid base64 — show error with hint
        decodeItems.value.push({
          id: crypto.randomUUID(),
          filename: file.name,
          base64: trimmed.slice(0, 200) + (trimmed.length > 200 ? "..." : ""),
          status: "error",
          detectedType: "",
          decodedSize: null,
          previewUrl: null,
          errorMessage: `"${file.name}" is not a Base64 string — it looks like a raw file. Use the Encode tab to convert it to Base64 first.`,
        });
      }
    }
  }

  // Remove the initial empty placeholder if other items were added
  const first = decodeItems.value[0];
  if (
    decodeItems.value.length > 1 &&
    first &&
    first.base64 === "" &&
    first.status === "idle"
  ) {
    decodeItems.value.splice(0, 1);
  }
}

function removeDecodeItem(index: number) {
  decodeItems.value.splice(index, 1);
}

function clearDecodeItems() {
  decodeItems.value = [createDecodeItem()];
  jsonImport.value = "";
}

function base64ToBlob(base64: string): { blob: Blob; type: string } {
  let data = base64;
  let type = "application/octet-stream";

  // Handle data URI format
  const match = data.match(/^data:([^;]+);base64,(.+)$/);
  if (match) {
    type = match[1]!;
    data = match[2]!;
  }

  const byteChars = atob(data);
  const byteNumbers = new Uint8Array(byteChars.length);
  for (let i = 0; i < byteChars.length; i++) {
    byteNumbers[i] = byteChars.charCodeAt(i);
  }

  // If type is still generic, detect from magic bytes
  if (type === "application/octet-stream") {
    type = detectMimeFromBytes(byteNumbers) || type;
  }

  return { blob: new Blob([byteNumbers], { type }), type };
}

async function decodeAll() {
  isDecoding.value = true;
  for (const item of decodeItems.value) {
    if (!item.base64.trim()) continue;
    try {
      const { blob, type } = base64ToBlob(item.base64.trim());
      item.detectedType = type;
      item.decodedSize = blob.size;
      item.status = "done";

      const ext = guessExtension(type);
      let filename = item.filename || `decoded-file-${Date.now()}`;
      // Append extension if the filename doesn't already have one
      if (ext && !filename.includes(".")) {
        filename += ext;
      }

      // Create preview for images
      if (isImageType(type)) {
        item.previewUrl = URL.createObjectURL(blob);
      }

      downloadBlob(blob, filename);
    } catch {
      item.status = "error";
      item.errorMessage = item.errorMessage || "The content could not be decoded. Make sure it's a valid Base64 string.";
    }
  }
  isDecoding.value = false;
}

function importFromJson() {
  try {
    const parsed = JSON.parse(jsonImport.value);
    if (!Array.isArray(parsed)) throw new Error("Not an array");

    decodeItems.value = parsed.map(
      (entry: { name?: string; type?: string; base64: string }) => ({
        id: crypto.randomUUID(),
        filename: entry.name || "",
        base64: entry.base64 || "",
        status: "idle" as const,
        detectedType: entry.type || "",
        decodedSize: null,
        previewUrl: null,
        errorMessage: null,
      })
    );

    // Auto-decode
    nextTick(() => decodeAll());
  } catch {
    alert("Invalid JSON format. Expected an array of objects with base64 field.");
  }
}

// ─── UTILS ───────────────────────────────────────────
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileExtension(name: string): string {
  const ext = name.split(".").pop()?.toUpperCase() || "?";
  return ext.length > 4 ? ext.slice(0, 4) : ext;
}

function getFileIconClass(type: string): string {
  if (type.startsWith("image/"))
    return "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400";
  if (type.startsWith("video/"))
    return "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400";
  if (type.startsWith("audio/"))
    return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400";
  if (type.includes("pdf"))
    return "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400";
  if (type.includes("json") || type.includes("javascript") || type.includes("text"))
    return "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400";
  return "bg-muted-100 dark:bg-muted-800 text-muted-600 dark:text-muted-400";
}

function isImageType(type: string): boolean {
  return type.startsWith("image/");
}

function detectMimeFromBytes(bytes: Uint8Array): string | null {
  if (bytes.length < 4) return null;

  const hex = (offset: number, length: number) =>
    Array.from(bytes.slice(offset, offset + length))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

  const head = hex(0, 8);

  // ZIP  (PK\x03\x04)
  if (head.startsWith("504b0304")) return "application/zip";
  // PNG  (\x89PNG)
  if (head.startsWith("89504e47")) return "image/png";
  // JPEG (\xFF\xD8\xFF)
  if (head.startsWith("ffd8ff")) return "image/jpeg";
  // GIF  (GIF87a / GIF89a)
  if (head.startsWith("474946383761") || head.startsWith("474946383961"))
    return "image/gif";
  // PDF  (%PDF)
  if (head.startsWith("25504446")) return "application/pdf";
  // GZIP (\x1F\x8B)
  if (head.startsWith("1f8b")) return "application/gzip";
  // BMP  (BM)
  if (head.startsWith("424d")) return "image/bmp";
  // WEBP (RIFF....WEBP)
  if (head.startsWith("52494646") && bytes.length >= 12 && hex(8, 4) === "57454250")
    return "image/webp";
  // MP4  (ftyp at offset 4)
  if (bytes.length >= 8 && hex(4, 4) === "66747970") return "video/mp4";
  // MP3  (ID3 or \xFF\xFB)
  if (head.startsWith("494433") || head.startsWith("fffb")) return "audio/mpeg";
  // WAV  (RIFF....WAVE)
  if (head.startsWith("52494646") && bytes.length >= 12 && hex(8, 4) === "57415645")
    return "audio/wav";
  // OGG  (OggS)
  if (head.startsWith("4f676753")) return "application/ogg";
  // WASM (\x00asm)
  if (head.startsWith("0061736d")) return "application/wasm";
  // 7Z   (7z\xBC\xAF)
  if (head.startsWith("377abcaf")) return "application/x-7z-compressed";
  // RAR  (Rar!)
  if (head.startsWith("526172")) return "application/x-rar-compressed";
  // TIFF (II or MM)
  if (head.startsWith("49492a00") || head.startsWith("4d4d002a"))
    return "image/tiff";
  // ICO  (\x00\x00\x01\x00)
  if (head.startsWith("00000100")) return "image/x-icon";
  // SVG  (starts with < and contains <svg)
  if (bytes[0] === 0x3c) {
    const text = new TextDecoder().decode(bytes.slice(0, 256));
    if (text.includes("<svg")) return "image/svg+xml";
  }

  return null;
}

function guessExtension(type: string): string {
  const map: Record<string, string> = {
    "image/png": ".png",
    "image/jpeg": ".jpg",
    "image/gif": ".gif",
    "image/webp": ".webp",
    "image/bmp": ".bmp",
    "image/tiff": ".tiff",
    "image/x-icon": ".ico",
    "image/svg+xml": ".svg",
    "application/pdf": ".pdf",
    "application/json": ".json",
    "application/gzip": ".gz",
    "application/x-7z-compressed": ".7z",
    "application/x-rar-compressed": ".rar",
    "application/wasm": ".wasm",
    "application/ogg": ".ogg",
    "text/plain": ".txt",
    "text/html": ".html",
    "text/css": ".css",
    "application/javascript": ".js",
    "video/mp4": ".mp4",
    "audio/mpeg": ".mp3",
    "application/zip": ".zip",
  };
  return map[type] || "";
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

useHead({
  title: "Base64 File Tool | Dimar Hanung",
});
</script>

<style scoped>
.file-list-enter-active,
.file-list-leave-active {
  transition: all 0.3s ease;
}
.file-list-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.file-list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
.file-list-move {
  transition: transform 0.3s ease;
}
</style>
