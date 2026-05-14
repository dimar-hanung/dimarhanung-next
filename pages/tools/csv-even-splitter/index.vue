<template>
  <div class="min-h-screen bg-muted-50 dark:bg-muted-950 py-10 px-4 sm:px-6">
    <!-- Header -->
    <div class="max-w-5xl mx-auto mb-10">
      <div class="flex items-center gap-3 mb-2">
        <div
          class="w-10 h-10 rounded-xl bg-teal-500/10 dark:bg-teal-400/10 flex items-center justify-center"
        >
          <Icon name="mdi:file-tree-outline" class="text-xl text-teal-500" />
        </div>
        <h1
          class="text-2xl sm:text-3xl font-bold text-muted-900 dark:text-muted-50 tracking-tight"
        >
          CSV Even Splitter
        </h1>
      </div>
      <p class="text-muted-500 dark:text-muted-400 text-sm ml-[52px]">
        Split a CSV into a target number of evenly sized parts.
      </p>
    </div>

    <!-- Configuration -->
    <div class="max-w-5xl mx-auto mb-6">
      <div
        class="bg-white dark:bg-muted-900 border border-muted-200 dark:border-muted-800 rounded-2xl p-6"
      >
        <div class="flex items-center gap-2 mb-4">
          <Icon name="mdi:cog-outline" class="text-lg text-muted-500" />
          <h2 class="text-sm font-semibold text-muted-700 dark:text-muted-300 uppercase tracking-wider">
            Configuration
          </h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <!-- Target Chunks -->
          <div class="space-y-1.5">
            <label
              class="text-xs font-medium text-muted-600 dark:text-muted-400"
            >
              Target Chunks
            </label>
            <input
              v-model.number="targetChunkCount"
              type="number"
              min="1"
              step="1"
              class="w-full px-3 py-2 text-sm bg-muted-50 dark:bg-muted-950 border border-muted-200 dark:border-muted-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all text-muted-700 dark:text-muted-300"
            />
            <p class="text-[11px] text-muted-400 dark:text-muted-500">
              Data rows are balanced by count.
            </p>
          </div>

          <!-- Delimiter -->
          <div class="space-y-1.5">
            <label
              class="text-xs font-medium text-muted-600 dark:text-muted-400"
            >
              Delimiter
            </label>
            <select
              v-model="selectedDelimiter"
              class="w-full px-3 py-2 text-sm bg-muted-50 dark:bg-muted-950 border border-muted-200 dark:border-muted-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all text-muted-700 dark:text-muted-300"
            >
              <option value="auto">Auto-detect</option>
              <option value=",">Comma (,)</option>
              <option value=";">Semicolon (;)</option>
              <option :value="'\t'">Tab</option>
              <option value="|">Pipe (|)</option>
            </select>
          </div>

          <!-- Include Header Toggle -->
          <div class="space-y-1.5">
            <label
              class="text-xs font-medium text-muted-600 dark:text-muted-400"
            >
              Header Row
            </label>
            <div class="flex items-center gap-2 h-[38px]">
              <button
                type="button"
                @click="includeHeader = !includeHeader"
                :class="[
                  'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200',
                  includeHeader
                    ? 'bg-teal-500'
                    : 'bg-muted-300 dark:bg-muted-700'
                ]"
              >
                <span
                  :class="[
                    'inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200',
                    includeHeader ? 'translate-x-6' : 'translate-x-1'
                  ]"
                />
              </button>
              <span class="text-sm text-muted-600 dark:text-muted-400">
                {{ includeHeader ? 'Prepend to each part' : 'Omit from output' }}
              </span>
            </div>
            <p class="text-[11px] text-muted-400 dark:text-muted-500">
              First row is not counted in balancing.
            </p>
          </div>

          <!-- Estimated Chunks -->
          <div class="space-y-1.5">
            <label
              class="text-xs font-medium text-muted-600 dark:text-muted-400"
            >
              Estimated Output
            </label>
            <div class="flex items-center h-[38px]">
              <span
                v-if="parsedData.length > 0 && targetChunkCountIsValid"
                class="px-3 py-1.5 text-sm font-semibold bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-lg"
              >
                {{ effectiveChunkCount }} parts
              </span>
              <span
                v-else-if="parsedData.length > 0"
                class="px-3 py-1.5 text-sm font-semibold bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-lg"
              >
                Invalid target
              </span>
              <span
                v-else
                class="text-sm text-muted-400 dark:text-muted-600"
              >
                Upload a file first
              </span>
            </div>
            <p
              v-if="distributionNote"
              class="text-[11px] text-muted-400 dark:text-muted-500"
            >
              {{ distributionNote }}
            </p>
          </div>

          <!-- Process Button -->
          <div class="space-y-1.5">
            <label class="text-xs font-medium text-muted-600 dark:text-muted-400">
              Actions
            </label>
            <button
              type="button"
              @click="processChunks"
              :disabled="!canProcess"
              class="w-full px-4 py-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Icon
                name="mdi:cog-play"
                :class="{ 'animate-spin': isProcessing }"
              />
              {{ isProcessing ? 'Processing...' : 'Process' }}
            </button>
            <p
              v-if="targetCapped"
              class="text-[11px] text-amber-600 dark:text-amber-400"
            >
              Target is capped to non-empty parts.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Upload Area -->
    <div class="max-w-5xl mx-auto mb-6">
      <div
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop.prevent="handleDrop"
        @click="triggerFileInput"
        :class="[
          'relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300',
          isDragging
            ? 'border-teal-400 bg-teal-50/60 dark:bg-teal-900/20 scale-[1.01]'
            : 'border-muted-300 dark:border-muted-700 hover:border-teal-300 dark:hover:border-teal-600 bg-white dark:bg-muted-900',
        ]"
      >
        <input
          ref="fileInput"
          type="file"
          accept=".csv,text/csv"
          class="hidden"
          @change="handleFileSelect"
        />
        <div
          class="flex flex-col items-center gap-3 pointer-events-none select-none"
        >
          <div
            class="w-16 h-16 rounded-2xl bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center"
          >
            <Icon
              name="mdi:file-upload-outline"
              class="text-3xl text-teal-500"
            />
          </div>
          <div>
            <p
              class="text-muted-700 dark:text-muted-200 font-semibold text-base"
            >
              Drop CSV file here or click to browse
            </p>
            <p class="text-muted-400 dark:text-muted-500 text-xs mt-1">
              Supports .csv files with delimiter detection
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- File Preview -->
    <div v-if="fileName" class="max-w-5xl mx-auto mb-6">
      <div
        class="bg-white dark:bg-muted-900 border border-muted-200 dark:border-muted-800 rounded-2xl overflow-hidden"
      >
        <!-- File Info Header -->
        <div
          class="flex items-center justify-between px-6 py-4 bg-muted-100 dark:bg-muted-800 border-b border-muted-200 dark:border-muted-700"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-lg bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center"
            >
              <Icon name="mdi:file-delimited" class="text-xl text-teal-600 dark:text-teal-400" />
            </div>
            <div>
              <p class="text-sm font-semibold text-muted-800 dark:text-muted-100">
                {{ fileName }}
              </p>
              <p class="text-xs text-muted-500 dark:text-muted-400">
                {{ formatFileSize(fileSize) }} &bull; {{ parsedData.length.toLocaleString() }} data rows &bull; {{ detectedDelimiterName }}
              </p>
            </div>
          </div>
          <button
            type="button"
            @click="clearFile"
            class="p-2 rounded-lg text-muted-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <Icon name="mdi:close" class="text-lg" />
          </button>
        </div>

        <!-- Data Preview -->
        <div class="p-4">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-xs font-semibold text-muted-600 dark:text-muted-400 uppercase tracking-wider">
              Data Preview (First 5 Data Rows)
            </h3>
            <span
              class="text-[10px] px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 font-medium"
            >
              First row used as header
            </span>
          </div>
          <div class="overflow-x-auto rounded-lg border border-muted-200 dark:border-muted-700">
            <table class="w-full text-sm">
              <thead>
                <tr>
                  <th
                    v-for="(header, i) in previewHeaders"
                    :key="i"
                    class="px-4 py-2.5 text-left text-xs font-semibold text-muted-600 dark:text-muted-400 bg-muted-50 dark:bg-muted-800 border-b border-muted-200 dark:border-muted-700"
                  >
                    {{ header || `Column ${i + 1}` }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(row, i) in previewRows"
                  :key="i"
                  class="hover:bg-muted-50 dark:hover:bg-muted-800/50 transition-colors"
                >
                  <td
                    v-for="(cell, j) in row"
                    :key="j"
                    class="px-4 py-2 text-muted-700 dark:text-muted-300 border-b border-muted-100 dark:border-muted-800"
                  >
                    {{ cell || '-' }}
                  </td>
                </tr>
                <tr v-if="previewRows.length === 0">
                  <td
                    :colspan="previewColumnCount"
                    class="px-4 py-8 text-center text-sm text-muted-400 dark:text-muted-500"
                  >
                    No data rows found after the header row.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Chunks List -->
    <div v-if="chunks.length > 0" class="max-w-5xl mx-auto mb-6">
      <div
        class="bg-white dark:bg-muted-900 border border-muted-200 dark:border-muted-800 rounded-2xl overflow-hidden"
      >
        <div
          class="flex items-center justify-between px-6 py-4 bg-muted-100 dark:bg-muted-800 border-b border-muted-200 dark:border-muted-700"
        >
          <div class="flex items-center gap-2">
            <Icon name="mdi:folder-multiple-outline" class="text-lg text-muted-500" />
            <h3 class="text-sm font-semibold text-muted-700 dark:text-muted-300">
              Generated Parts
            </h3>
            <span
              class="px-2 py-0.5 text-xs font-medium bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full"
            >
              {{ chunks.length }}
            </span>
          </div>
          <div class="flex items-center gap-2">
            <button
              type="button"
              @click="downloadAllZip"
              :disabled="isZipping"
              class="px-4 py-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            >
              <Icon
                name="mdi:folder-download-outline"
                :class="{ 'animate-bounce': isZipping }"
              />
              {{ isZipping ? 'Creating ZIP...' : 'Download All as ZIP' }}
            </button>
          </div>
        </div>

        <div class="px-6 py-3 text-xs text-muted-500 dark:text-muted-400 bg-teal-50/50 dark:bg-teal-900/10 border-b border-muted-100 dark:border-muted-800">
          Parts are balanced by data rows. Counts may differ by one when rows do not divide evenly.
        </div>

        <div class="divide-y divide-muted-100 dark:divide-muted-800">
          <div
            v-for="(chunk, i) in chunks"
            :key="i"
            class="flex items-center justify-between px-6 py-3 hover:bg-muted-50 dark:hover:bg-muted-800/50 transition-colors"
          >
            <div class="flex items-center gap-3">
              <span
                class="w-7 h-7 rounded-lg bg-muted-100 dark:bg-muted-800 flex items-center justify-center text-xs font-bold text-muted-500"
              >
                {{ i + 1 }}
              </span>
              <div>
                <p class="text-sm font-medium text-muted-800 dark:text-muted-100">
                  {{ chunk.fileName }}
                </p>
                <p class="text-xs text-muted-500 dark:text-muted-400">
                  {{ chunk.rowCount.toLocaleString() }} data rows
                </p>
              </div>
            </div>
            <button
              type="button"
              @click="downloadChunk(chunk)"
              class="px-3 py-1.5 text-xs font-medium text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Icon name="mdi:download" class="text-base" />
              Download
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-if="!fileName && chunks.length === 0"
      class="max-w-5xl mx-auto"
    >
      <div
        class="rounded-2xl bg-muted-100 dark:bg-muted-900/50 border border-muted-200 dark:border-muted-800 p-12 text-center"
      >
        <div
          class="w-20 h-20 mx-auto mb-4 rounded-2xl bg-muted-200 dark:bg-muted-800 flex items-center justify-center"
        >
          <Icon
            name="mdi:file-tree-outline"
            class="text-4xl text-muted-400 dark:text-muted-600"
          />
        </div>
        <p class="text-lg font-medium text-muted-600 dark:text-muted-400">
          No CSV file loaded
        </p>
        <p class="text-sm mt-2 text-muted-500 dark:text-muted-500">
          Upload a CSV file above to split it into balanced parts
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Papa from 'papaparse';
import JSZip from 'jszip';

interface Chunk {
  fileName: string;
  content: string;
  rowCount: number;
}

type CsvDelimiter = 'auto' | ',' | ';' | '\t' | '|';

const isDragging = ref(false);
const isZipping = ref(false);
const isProcessing = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);

const currentFile = ref<File | null>(null);
const fileName = ref('');
const fileSize = ref(0);
const targetChunkCount = ref(2);
const selectedDelimiter = ref<CsvDelimiter>('auto');
const includeHeader = ref(true);
const parsedData = ref<string[][]>([]);
const headers = ref<string[]>([]);
const detectedDelimiter = ref(',');
const chunks = ref<Chunk[]>([]);

const detectedDelimiterName = computed(() => {
  const map: Record<string, string> = {
    ',': 'Comma',
    ';': 'Semicolon',
    '\t': 'Tab',
    '|': 'Pipe',
  };
  return map[detectedDelimiter.value] || 'Comma';
});

const normalizedTargetChunkCount = computed(() => {
  const value = Number(targetChunkCount.value);
  if (!Number.isFinite(value) || value < 1) return 0;
  return Math.floor(value);
});

const targetChunkCountIsValid = computed(() => normalizedTargetChunkCount.value > 0);

const effectiveChunkCount = computed(() => {
  if (!targetChunkCountIsValid.value || parsedData.value.length === 0) return 0;
  return Math.min(normalizedTargetChunkCount.value, parsedData.value.length);
});

const rowDistribution = computed(() => {
  const chunkCount = effectiveChunkCount.value;
  const rowCount = parsedData.value.length;
  if (chunkCount === 0 || rowCount === 0) return null;

  return {
    baseRowsPerChunk: Math.floor(rowCount / chunkCount),
    remainderRows: rowCount % chunkCount,
  };
});

const distributionNote = computed(() => {
  const distribution = rowDistribution.value;
  if (!distribution) return '';

  const { baseRowsPerChunk, remainderRows } = distribution;
  if (remainderRows === 0) {
    return `${baseRowsPerChunk.toLocaleString()} rows per part`;
  }

  return `${remainderRows.toLocaleString()} part${remainderRows === 1 ? '' : 's'} get ${(baseRowsPerChunk + 1).toLocaleString()} rows, the rest get ${baseRowsPerChunk.toLocaleString()}`;
});

const targetCapped = computed(() => (
  targetChunkCountIsValid.value &&
  parsedData.value.length > 0 &&
  normalizedTargetChunkCount.value > parsedData.value.length
));

const canProcess = computed(() => (
  Boolean(fileName.value) &&
  parsedData.value.length > 0 &&
  targetChunkCountIsValid.value &&
  !isProcessing.value
));

const previewHeaders = computed(() => {
  if (headers.value.length > 0) return headers.value;
  return parsedData.value[0] || [];
});

const previewColumnCount = computed(() => Math.max(previewHeaders.value.length, 1));

const previewRows = computed(() => parsedData.value.slice(0, 5));

watch(selectedDelimiter, () => {
  chunks.value = [];
  if (currentFile.value) {
    processFile(currentFile.value);
  }
});

watch([targetChunkCount, includeHeader], () => {
  chunks.value = [];
});

function triggerFileInput() {
  fileInput.value?.click();
}

function handleFileSelect(e: Event) {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    processFile(target.files[0]);
  }
  target.value = '';
}

function handleDrop(e: DragEvent) {
  isDragging.value = false;
  if (e.dataTransfer?.files && e.dataTransfer.files[0]) {
    const file = e.dataTransfer.files[0];
    if (file.name.endsWith('.csv') || file.type === 'text/csv') {
      processFile(file);
    }
  }
}

const processFile = (file: File) => {
  currentFile.value = file;
  fileName.value = file.name;
  fileSize.value = file.size;
  chunks.value = [];

  const delimiter = selectedDelimiter.value === 'auto' ? undefined : selectedDelimiter.value;

  Papa.parse(file, {
    delimiter,
    skipEmptyLines: false,
    complete: (results) => {
      const rows = (results.data as unknown[])
        .filter((row): row is unknown[] => Array.isArray(row))
        .map(row => row.map(cell => String(cell ?? '')));

      if (rows.length === 0) {
        headers.value = [];
        parsedData.value = [];
        return;
      }

      if (results.meta.delimiter) {
        detectedDelimiter.value = results.meta.delimiter;
      }

      // The first CSV row is metadata for output headers and is not included in the balance calculation.
      headers.value = rows[0] || [];
      parsedData.value = rows.slice(1).filter(row => row.some(cell => cell.trim() !== ''));
    },
    error: (error) => {
      headers.value = [];
      parsedData.value = [];
      console.error('CSV parsing error:', error);
    },
  });
};

const processChunks = () => {
  if (!canProcess.value) return;

  isProcessing.value = true;
  setTimeout(() => {
    generateChunks();
    isProcessing.value = false;
  }, 100);
};

const generateChunks = () => {
  if (!targetChunkCountIsValid.value || parsedData.value.length === 0) return;

  chunks.value = [];

  const dataRows = parsedData.value;
  const chunkCount = effectiveChunkCount.value;
  const baseRowsPerChunk = Math.floor(dataRows.length / chunkCount);
  const remainderRows = dataRows.length % chunkCount;
  let startIndex = 0;

  for (let chunkIndex = 0; chunkIndex < chunkCount; chunkIndex++) {
    const rowCount = baseRowsPerChunk + (chunkIndex < remainderRows ? 1 : 0);
    const rows = dataRows.slice(startIndex, startIndex + rowCount);
    createChunkFile(chunkIndex, rows, detectedDelimiter.value);
    startIndex += rowCount;
  }
};

const createChunkFile = (index: number, dataRows: string[][], delimiter: string) => {
  const baseName = fileName.value.replace(/\.csv$/i, '');
  const fileNameChunk = `${baseName}_part${index + 1}.csv`;
  const outputRows = includeHeader.value ? [headers.value, ...dataRows] : dataRows;

  chunks.value.push({
    fileName: fileNameChunk,
    content: Papa.unparse(outputRows, { delimiter }),
    rowCount: dataRows.length,
  });
};

const downloadChunk = (chunk: Chunk) => {
  const blob = new Blob([chunk.content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = chunk.fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const downloadAllZip = async () => {
  if (chunks.value.length === 0) return;

  isZipping.value = true;

  try {
    const zip = new JSZip();
    const folder = zip.folder(fileName.value.replace(/\.csv$/i, ''));

    for (const chunk of chunks.value) {
      folder?.file(chunk.fileName, chunk.content);
    }

    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName.value.replace(/\.csv$/i, '')}_even-split.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error creating ZIP:', error);
  } finally {
    isZipping.value = false;
  }
};

const clearFile = () => {
  currentFile.value = null;
  fileName.value = '';
  fileSize.value = 0;
  parsedData.value = [];
  headers.value = [];
  chunks.value = [];
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

useHead({
  title: 'CSV Even Splitter | Dimar Hanung',
});
</script>
