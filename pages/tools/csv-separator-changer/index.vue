<template>
  <div class="min-h-screen bg-muted-50 dark:bg-muted-950 py-10 px-4 sm:px-6">
    <div class="max-w-5xl mx-auto mb-10">
      <div class="flex items-center gap-3 mb-2">
        <div
          class="w-10 h-10 rounded-xl bg-primary-500/10 dark:bg-primary-400/10 flex items-center justify-center"
        >
          <Icon name="mdi:swap-horizontal-circle-outline" class="text-xl text-primary-500" />
        </div>
        <h1
          class="text-2xl sm:text-3xl font-bold text-muted-900 dark:text-muted-50 tracking-tight"
        >
          CSV Separator Changer
        </h1>
      </div>
      <p class="text-muted-500 dark:text-muted-400 text-sm ml-[52px]">
        Convert CSV files from one separator to another without changing the underlying data.
      </p>
    </div>

    <div class="max-w-5xl mx-auto mb-6">
      <div class="inline-flex rounded-xl bg-muted-100 dark:bg-muted-900 p-1 gap-1">
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

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="space-y-1.5">
            <label class="text-xs font-medium text-muted-600 dark:text-muted-400">
              Source Separator
            </label>
            <select
              v-model="sourceDelimiterMode"
              class="w-full px-3 py-2 text-sm bg-muted-50 dark:bg-muted-950 border border-muted-200 dark:border-muted-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all text-muted-700 dark:text-muted-300"
            >
              <option value="auto">Auto-detect</option>
              <option value=",">Comma (,)</option>
              <option value=";">Semicolon (;)</option>
              <option value="\t">Tab</option>
              <option value="|">Pipe (|)</option>
              <option value="custom">Custom</option>
            </select>
            <input
              v-if="sourceDelimiterMode === 'custom'"
              v-model="sourceCustomDelimiter"
              type="text"
              placeholder="Enter custom separator"
              class="w-full px-3 py-2 text-sm bg-muted-50 dark:bg-muted-950 border border-muted-200 dark:border-muted-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all text-muted-700 dark:text-muted-300 placeholder:text-muted-400"
            />
          </div>

          <div class="space-y-1.5">
            <label class="text-xs font-medium text-muted-600 dark:text-muted-400">
              Target Separator
            </label>
            <select
              v-model="targetDelimiterMode"
              class="w-full px-3 py-2 text-sm bg-muted-50 dark:bg-muted-950 border border-muted-200 dark:border-muted-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all text-muted-700 dark:text-muted-300"
            >
              <option value=",">Comma (,)</option>
              <option value=";">Semicolon (;)</option>
              <option value="\t">Tab</option>
              <option value="|">Pipe (|)</option>
              <option value="custom">Custom</option>
            </select>
            <input
              v-if="targetDelimiterMode === 'custom'"
              v-model="targetCustomDelimiter"
              type="text"
              placeholder="Enter output separator"
              class="w-full px-3 py-2 text-sm bg-muted-50 dark:bg-muted-950 border border-muted-200 dark:border-muted-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all text-muted-700 dark:text-muted-300 placeholder:text-muted-400"
            />
          </div>

          <div class="space-y-1.5">
            <label class="text-xs font-medium text-muted-600 dark:text-muted-400">
              Preview Mode
            </label>
            <div class="flex items-center gap-2 h-[38px]">
              <button
                @click="previewUsesFirstRow = !previewUsesFirstRow"
                :class="[
                  'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200',
                  previewUsesFirstRow
                    ? 'bg-primary-500'
                    : 'bg-muted-300 dark:bg-muted-700'
                ]"
              >
                <span
                  :class="[
                    'inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200',
                    previewUsesFirstRow ? 'translate-x-6' : 'translate-x-1'
                  ]"
                />
              </button>
              <span class="text-sm text-muted-600 dark:text-muted-400">
                {{ previewUsesFirstRow ? 'First row is header' : 'Show all rows as data' }}
              </span>
            </div>
          </div>

          <div class="space-y-1.5">
            <label class="text-xs font-medium text-muted-600 dark:text-muted-400">
              Actions
            </label>
            <button
              @click="convertCsv"
              :disabled="!canConvert"
              class="w-full px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Icon name="mdi:transfer-right" :class="{ 'animate-pulse': isConverting }" />
              {{ isConverting ? 'Converting...' : 'Change Separator' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="activeMode === 'paste'" class="max-w-5xl mx-auto mb-6">
      <div class="flex flex-col">
        <div
          class="flex items-center justify-between px-5 py-3.5 bg-muted-200 dark:bg-muted-800 rounded-t-2xl border border-b-0 border-muted-300 dark:border-muted-700"
        >
          <div class="flex items-center gap-2">
            <span class="text-xs font-semibold text-muted-600 dark:text-muted-300 uppercase tracking-wider">CSV Input</span>
          </div>
          <div class="flex items-center gap-2">
            <button
              @click="loadSampleCsv"
              class="text-xs font-medium text-muted-600 dark:text-muted-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-1.5"
            >
              <Icon name="mdi:file-document-plus-outline" class="text-base" />
              Sample
            </button>
            <button
              v-if="csvInput"
              @click="clearInput"
              class="text-xs font-medium text-muted-600 dark:text-muted-300 hover:text-red-500 transition-colors flex items-center gap-1.5"
            >
              <Icon name="mdi:delete-outline" class="text-base" />
              Clear
            </button>
          </div>
        </div>
        <textarea
          v-model="csvInput"
          placeholder="Paste your CSV here..."
          class="flex-1 w-full min-h-[300px] p-6 bg-white dark:bg-muted-900 border border-t-0 border-muted-300 dark:border-muted-700 rounded-b-2xl resize-none text-sm font-mono leading-relaxed text-muted-700 dark:text-muted-300 placeholder:text-muted-400 dark:placeholder:text-muted-600 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all"
        ></textarea>
      </div>
    </div>

    <div v-else class="max-w-5xl mx-auto mb-6">
      <div
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop.prevent="handleFileDrop"
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
          accept=".csv,.txt,text/csv,text/plain"
          class="hidden"
          @change="handleFileSelect"
        />
        <div class="flex flex-col items-center gap-3 pointer-events-none select-none">
          <div
            class="w-16 h-16 rounded-2xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center"
          >
            <Icon name="mdi:file-upload-outline" class="text-3xl text-primary-500" />
          </div>
          <div>
            <p class="text-muted-700 dark:text-muted-200 font-semibold text-base">
              Drop CSV file here or click to browse
            </p>
            <p class="text-muted-400 dark:text-muted-500 text-xs mt-1">
              Supports .csv and .txt files with common delimiters
            </p>
          </div>
        </div>
      </div>

      <div v-if="uploadedFile" class="mt-4">
        <div
          class="bg-white dark:bg-muted-900 border border-muted-200 dark:border-muted-800 rounded-xl p-4 flex items-center justify-between"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center"
            >
              <Icon name="mdi:file-delimited" class="text-xl text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p class="text-sm font-medium text-muted-800 dark:text-muted-100">
                {{ uploadedFile.name }}
              </p>
              <p class="text-xs text-muted-500 dark:text-muted-400">
                {{ formatFileSize(uploadedFile.size) }}
              </p>
            </div>
          </div>
          <button
            @click="clearUploadedFile"
            class="p-2 rounded-lg text-muted-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <Icon name="mdi:close" class="text-lg" />
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="parseError"
      class="max-w-5xl mx-auto mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl"
    >
      <div class="flex items-start gap-3">
        <Icon name="mdi:alert-circle" class="text-xl text-red-500 shrink-0 mt-0.5" />
        <div>
          <p class="text-sm font-medium text-red-700 dark:text-red-300">Unable to parse CSV</p>
          <p class="text-xs text-red-600 dark:text-red-400 mt-1">{{ parseError }}</p>
        </div>
      </div>
    </div>

    <div v-if="parsedRows.length > 0" class="max-w-5xl mx-auto mb-6">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="bg-white dark:bg-muted-900 border border-muted-200 dark:border-muted-800 rounded-2xl p-4">
          <p class="text-xs font-semibold text-muted-500 dark:text-muted-400 uppercase tracking-wider mb-1">
            Rows
          </p>
          <p class="text-2xl font-bold text-muted-900 dark:text-muted-50">
            {{ parsedRows.length.toLocaleString() }}
          </p>
        </div>
        <div class="bg-white dark:bg-muted-900 border border-muted-200 dark:border-muted-800 rounded-2xl p-4">
          <p class="text-xs font-semibold text-muted-500 dark:text-muted-400 uppercase tracking-wider mb-1">
            Columns
          </p>
          <p class="text-2xl font-bold text-muted-900 dark:text-muted-50">
            {{ columnCount.toLocaleString() }}
          </p>
        </div>
        <div class="bg-white dark:bg-muted-900 border border-muted-200 dark:border-muted-800 rounded-2xl p-4">
          <p class="text-xs font-semibold text-muted-500 dark:text-muted-400 uppercase tracking-wider mb-1">
            Source Separator
          </p>
          <p class="text-lg font-bold text-muted-900 dark:text-muted-50">
            {{ detectedDelimiterLabel }}
          </p>
        </div>
      </div>
    </div>

    <div v-if="parsedRows.length > 0" class="max-w-5xl mx-auto mb-6">
      <div class="bg-white dark:bg-muted-900 border border-muted-200 dark:border-muted-800 rounded-2xl overflow-hidden">
        <div
          class="flex items-center justify-between px-6 py-4 bg-muted-100 dark:bg-muted-800 border-b border-muted-200 dark:border-muted-700"
        >
          <div class="flex items-center gap-2">
            <Icon name="mdi:table-eye" class="text-lg text-muted-500" />
            <h3 class="text-sm font-semibold text-muted-700 dark:text-muted-300">
              Data Preview
            </h3>
          </div>
          <span class="text-xs text-muted-500 dark:text-muted-400">
            First {{ previewRows.length }} row{{ previewRows.length !== 1 ? 's' : '' }}
          </span>
        </div>

        <div class="p-4">
          <div class="overflow-x-auto rounded-lg border border-muted-200 dark:border-muted-700">
            <table class="w-full text-sm">
              <thead>
                <tr>
                  <th
                    v-for="(header, index) in previewHeaders"
                    :key="index"
                    class="px-4 py-2.5 text-left text-xs font-semibold text-muted-600 dark:text-muted-400 bg-muted-50 dark:bg-muted-800 border-b border-muted-200 dark:border-muted-700 whitespace-nowrap"
                  >
                    {{ header || `Column ${index + 1}` }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(row, rowIndex) in previewRows"
                  :key="rowIndex"
                  class="hover:bg-muted-50 dark:hover:bg-muted-800/50 transition-colors"
                >
                  <td
                    v-for="(cell, cellIndex) in row"
                    :key="cellIndex"
                    class="px-4 py-2 text-muted-700 dark:text-muted-300 border-b border-muted-100 dark:border-muted-800 whitespace-nowrap"
                  >
                    {{ cell || '-' }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div v-if="csvOutput" class="max-w-5xl mx-auto mb-6">
      <div class="bg-white dark:bg-muted-900 border border-muted-200 dark:border-muted-800 rounded-2xl overflow-hidden">
        <div
          class="flex items-center justify-between px-6 py-4 bg-muted-100 dark:bg-muted-800 border-b border-muted-200 dark:border-muted-700"
        >
          <div class="flex items-center gap-2">
            <Icon name="mdi:file-delimited" class="text-lg text-green-500" />
            <h3 class="text-sm font-semibold text-muted-700 dark:text-muted-300">
              Converted CSV
            </h3>
            <span
              class="px-2 py-0.5 text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full"
            >
              {{ targetDelimiterLabel }}
            </span>
          </div>
          <div class="flex items-center gap-2">
            <button
              @click="copyCsv"
              class="px-3 py-1.5 text-xs font-medium text-muted-600 dark:text-muted-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Icon :name="copied ? 'mdi:check' : 'mdi:content-copy'" class="text-base" />
              {{ copied ? 'Copied!' : 'Copy' }}
            </button>
            <button
              @click="downloadCsv"
              class="px-4 py-1.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
            >
              <Icon name="mdi:download" class="text-base" />
              Download CSV
            </button>
          </div>
        </div>

        <div class="border-t border-muted-200 dark:border-muted-800 p-4">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-xs font-semibold text-muted-600 dark:text-muted-400 uppercase tracking-wider">
              Raw Output
            </h3>
          </div>
          <textarea
            readonly
            :value="csvOutput"
            rows="10"
            class="w-full text-xs font-mono bg-muted-50 dark:bg-muted-950 border border-muted-200 dark:border-muted-700 rounded-lg p-3 resize-none text-muted-600 dark:text-muted-400 focus:outline-none"
          />
        </div>
      </div>
    </div>

    <div
      v-if="!csvInput && !uploadedFile && !csvOutput"
      class="max-w-5xl mx-auto"
    >
      <div
        class="rounded-2xl bg-muted-100 dark:bg-muted-900/50 border border-muted-200 dark:border-muted-800 p-12 text-center"
      >
        <div
          class="w-20 h-20 mx-auto mb-4 rounded-2xl bg-muted-200 dark:bg-muted-800 flex items-center justify-center"
        >
          <Icon
            name="mdi:swap-horizontal-circle-outline"
            class="text-4xl text-muted-400 dark:text-muted-600"
          />
        </div>
        <p class="text-lg font-medium text-muted-600 dark:text-muted-400">
          Ready to change separators
        </p>
        <p class="text-sm mt-2 text-muted-500 dark:text-muted-500">
          Paste CSV content or upload a file to get started
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Papa from 'papaparse';

type SourceDelimiterMode = 'auto' | ',' | ';' | '\t' | '|' | 'custom';
type TargetDelimiterMode = ',' | ';' | '\t' | '|' | 'custom';

const modes = [
  { value: 'paste' as const, label: 'Paste CSV', icon: 'mdi:content-paste' },
  { value: 'upload' as const, label: 'Upload File', icon: 'mdi:file-upload-outline' },
];

const delimiterLabels: Record<string, string> = {
  ',': 'Comma (,)',
  ';': 'Semicolon (;)',
  '\t': 'Tab',
  '|': 'Pipe (|)',
};

const activeMode = ref<'paste' | 'upload'>('paste');
const isDragging = ref(false);
const isConverting = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);

const csvInput = ref('');
const uploadedFile = ref<File | null>(null);
const parsedRows = ref<string[][]>([]);
const parseError = ref('');
const csvOutput = ref('');
const copied = ref(false);

const sourceDelimiterMode = ref<SourceDelimiterMode>('auto');
const sourceCustomDelimiter = ref('');
const targetDelimiterMode = ref<TargetDelimiterMode>(';');
const targetCustomDelimiter = ref('');
const previewUsesFirstRow = ref(true);
const detectedDelimiter = ref(',');

const resolvedSourceDelimiter = computed(() => {
  if (sourceDelimiterMode.value === 'auto') return undefined;
  if (sourceDelimiterMode.value === 'custom') {
    return sourceCustomDelimiter.value || undefined;
  }
  return sourceDelimiterMode.value;
});

const resolvedTargetDelimiter = computed(() => {
  if (targetDelimiterMode.value === 'custom') {
    return targetCustomDelimiter.value;
  }
  return targetDelimiterMode.value;
});

const canConvert = computed(() => {
  return parsedRows.value.length > 0 && Boolean(resolvedTargetDelimiter.value);
});

const columnCount = computed(() => {
  return parsedRows.value.reduce((max, row) => Math.max(max, row.length), 0);
});

const previewHeaders = computed(() => {
  if (parsedRows.value.length === 0) return [];

  if (previewUsesFirstRow.value) {
    return parsedRows.value[0] || [];
  }

  return Array.from({ length: columnCount.value }, (_, index) => `Column ${index + 1}`);
});

const previewRows = computed(() => {
  if (parsedRows.value.length === 0) return [];

  const rows = previewUsesFirstRow.value
    ? parsedRows.value.slice(1, 6)
    : parsedRows.value.slice(0, 5);

  return rows.map(row => Array.from({ length: columnCount.value }, (_, index) => row[index] || ''));
});

const detectedDelimiterLabel = computed(() => {
  if (sourceDelimiterMode.value === 'custom') {
    if (sourceCustomDelimiter.value) {
      return `Custom (${sourceCustomDelimiter.value})`;
    }

    return 'Custom';
  }

  if (sourceDelimiterMode.value !== 'auto') {
    return formatDelimiterLabel(sourceDelimiterMode.value);
  }

  return formatDelimiterLabel(detectedDelimiter.value);
});

const targetDelimiterLabel = computed(() => {
  if (targetDelimiterMode.value === 'custom') {
    return targetCustomDelimiter.value ? `Custom (${targetCustomDelimiter.value})` : 'Custom';
  }

  return formatDelimiterLabel(targetDelimiterMode.value);
});

watch(csvInput, () => {
  if (activeMode.value !== 'paste') return;
  parseCsvInput();
});

watch(activeMode, () => {
  resetOutput();

  if (activeMode.value === 'paste') {
    parseCsvInput();
    return;
  }

  if (uploadedFile.value) {
    void processFile(uploadedFile.value);
  }
});

watch([sourceDelimiterMode, sourceCustomDelimiter], () => {
  resetOutput();

  if (activeMode.value === 'paste') {
    parseCsvInput();
    return;
  }

  if (uploadedFile.value) {
    void processFile(uploadedFile.value);
  }
});

function formatDelimiterLabel(delimiter: string) {
  if (delimiterLabels[delimiter]) {
    return delimiterLabels[delimiter].trim();
  }

  return delimiter ? `Custom (${delimiter})` : 'Unknown';
}

function resetOutput() {
  csvOutput.value = '';
  copied.value = false;
}

function parseCsvInput() {
  parseError.value = '';

  if (!csvInput.value.trim()) {
    parsedRows.value = [];
    return;
  }

  try {
    parseCsvText(csvInput.value);
  } catch (error) {
    parsedRows.value = [];
    parseError.value = error instanceof Error ? error.message : 'Invalid CSV input';
  }
}

function parseCsvText(text: string) {
  const results = Papa.parse<string[]>(text, {
    delimiter: resolvedSourceDelimiter.value,
    skipEmptyLines: 'greedy',
  });

  if (results.errors.length > 0) {
    const firstError = results.errors[0];
    throw new Error(firstError?.message || 'Failed to parse CSV content');
  }

  const rows = (results.data as string[][]).filter(row => row.some(cell => cell.trim() !== ''));

  if (rows.length === 0) {
    throw new Error('No CSV rows found');
  }

  detectedDelimiter.value = results.meta.delimiter || resolvedSourceDelimiter.value || ',';

  parsedRows.value = rows;
}

function isSupportedTextFile(file: File) {
  return (
    file.name.endsWith('.csv') ||
    file.name.endsWith('.txt') ||
    file.type === 'text/csv' ||
    file.type === 'text/plain'
  );
}

function triggerFileInput() {
  fileInput.value?.click();
}

function handleFileSelect(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];

    if (isSupportedTextFile(file)) {
      void processFile(file);
    } else {
      parseError.value = 'Please upload a .csv or .txt file.';
      uploadedFile.value = null;
      parsedRows.value = [];
      resetOutput();
    }
  }
  target.value = '';
}

function handleFileDrop(event: DragEvent) {
  isDragging.value = false;

  if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
    const file = event.dataTransfer.files[0];

    if (isSupportedTextFile(file)) {
      void processFile(file);
    } else {
      parseError.value = 'Please upload a .csv or .txt file.';
      uploadedFile.value = null;
      parsedRows.value = [];
      resetOutput();
    }
  }
}

async function processFile(file: File) {
  parseError.value = '';
  uploadedFile.value = file;
  resetOutput();

  try {
    const text = await file.text();
    parseCsvText(text);
  } catch (error) {
    uploadedFile.value = null;
    parsedRows.value = [];
    parseError.value = error instanceof Error ? error.message : 'Failed to parse file';
  }
}

function clearInput() {
  csvInput.value = '';
  parsedRows.value = [];
  parseError.value = '';
  resetOutput();
}

function clearUploadedFile() {
  uploadedFile.value = null;
  parsedRows.value = [];
  parseError.value = '';
  resetOutput();
}

function loadSampleCsv() {
  csvInput.value = [
    'name,email,role',
    'Dimar,dimar@example.com,Admin',
    'Hanung,hanung@example.com,Editor',
    'Salsa,salsa@example.com,Viewer',
  ].join('\n');
}

function convertCsv() {
  if (!canConvert.value) return;

  isConverting.value = true;

  setTimeout(() => {
    try {
      csvOutput.value = Papa.unparse(parsedRows.value, {
        delimiter: resolvedTargetDelimiter.value,
        newline: '\n',
      });
    } catch (error) {
      parseError.value = error instanceof Error ? error.message : 'Conversion failed';
    } finally {
      isConverting.value = false;
    }
  }, 100);
}

async function copyCsv() {
  if (!csvOutput.value) return;

  await navigator.clipboard.writeText(csvOutput.value);
  copied.value = true;

  setTimeout(() => {
    copied.value = false;
  }, 2000);
}

function downloadCsv() {
  if (!csvOutput.value) return;

  const blob = new Blob([csvOutput.value], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  const baseName = uploadedFile.value
    ? uploadedFile.value.name.replace(/\.(csv|txt)$/i, '')
    : 'separator-changed';
  const outputName = sanitizeFileNamePart(targetDelimiterLabel.value.toLowerCase());

  anchor.href = url;
  anchor.download = `${baseName}-${outputName}.csv`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

function sanitizeFileNamePart(value: string) {
  return value.replace(/[^a-z0-9]+/gi, '-').replace(/^-+|-+$/g, '') || 'converted';
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

useHead({
  title: 'CSV Separator Changer | Dimar Hanung',
});
</script>
