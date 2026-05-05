<template>
  <div class="min-h-screen bg-muted-50 dark:bg-muted-950 py-10 px-4 sm:px-6">
    <!-- Header -->
    <div class="max-w-5xl mx-auto mb-10">
      <div class="flex items-center gap-3 mb-2">
        <div
          class="w-10 h-10 rounded-xl bg-primary-500/10 dark:bg-primary-400/10 flex items-center justify-center"
        >
          <Icon name="mdi:code-json" class="text-xl text-primary-500" />
        </div>
        <h1
          class="text-2xl sm:text-3xl font-bold text-muted-900 dark:text-muted-50 tracking-tight"
        >
          JSON to CSV Converter
        </h1>
      </div>
      <p class="text-muted-500 dark:text-muted-400 text-sm ml-[52px]">
        Convert JSON data to CSV format. Supports arrays of objects, nested objects flattening, and various export options.
      </p>
    </div>

    <!-- Mode Tabs -->
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

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Delimiter -->
          <div class="space-y-1.5">
            <label class="text-xs font-medium text-muted-600 dark:text-muted-400">
              Delimiter
            </label>
            <select
              v-model="delimiter"
              class="w-full px-3 py-2 text-sm bg-muted-50 dark:bg-muted-950 border border-muted-200 dark:border-muted-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all text-muted-700 dark:text-muted-300"
            >
              <option value=",">Comma (,)</option>
              <option value=";">Semicolon (;)</option>
              <option value="\t">Tab</option>
              <option value="|">Pipe (|)</option>
            </select>
          </div>

          <!-- Header Row Toggle -->
          <div class="space-y-1.5">
            <label class="text-xs font-medium text-muted-600 dark:text-muted-400">
              Header Row
            </label>
            <div class="flex items-center gap-2 h-[38px]">
              <button
                @click="includeHeader = !includeHeader"
                :class="[
                  'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200',
                  includeHeader
                    ? 'bg-primary-500'
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
                {{ includeHeader ? 'Include headers' : 'No headers' }}
              </span>
            </div>
          </div>

          <!-- Flatten Nested -->
          <div class="space-y-1.5">
            <label class="text-xs font-medium text-muted-600 dark:text-muted-400">
              Nested Objects
            </label>
            <div class="flex items-center gap-2 h-[38px]">
              <button
                @click="flattenNested = !flattenNested"
                :class="[
                  'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200',
                  flattenNested
                    ? 'bg-primary-500'
                    : 'bg-muted-300 dark:bg-muted-700'
                ]"
              >
                <span
                  :class="[
                    'inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200',
                    flattenNested ? 'translate-x-6' : 'translate-x-1'
                  ]"
                />
              </button>
              <span class="text-sm text-muted-600 dark:text-muted-400">
                {{ flattenNested ? 'Flatten nested' : 'Keep as JSON' }}
              </span>
            </div>
          </div>

          <!-- Convert Button -->
          <div class="space-y-1.5">
            <label class="text-xs font-medium text-muted-600 dark:text-muted-400">
              Actions
            </label>
            <button
              @click="convertToCsv"
              :disabled="!canConvert"
              class="w-full px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Icon name="mdi:transfer-right" :class="{ 'animate-pulse': isConverting }" />
              {{ isConverting ? 'Converting...' : 'Convert' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- INPUT: Paste JSON -->
    <div v-if="activeMode === 'paste'" class="max-w-5xl mx-auto mb-6">
      <div class="flex flex-col">
        <div
          class="flex items-center justify-between px-5 py-3.5 bg-muted-200 dark:bg-muted-800 rounded-t-2xl border border-b-0 border-muted-300 dark:border-muted-700"
        >
          <div class="flex items-center gap-2">
            <span class="text-xs font-semibold text-muted-600 dark:text-muted-300 uppercase tracking-wider">JSON Input</span>
          </div>
          <div class="flex items-center gap-2">
            <button
              @click="loadSampleJson"
              class="text-xs font-medium text-muted-600 dark:text-muted-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-1.5"
            >
              <Icon name="mdi:file-document-plus-outline" class="text-base" />
              Sample
            </button>
            <button
              @click="clearInput"
              v-if="jsonInput"
              class="text-xs font-medium text-muted-600 dark:text-muted-300 hover:text-red-500 transition-colors flex items-center gap-1.5"
            >
              <Icon name="mdi:delete-outline" class="text-base" />
              Clear
            </button>
          </div>
        </div>
        <textarea
          v-model="jsonInput"
          placeholder="Paste your JSON array here...

Example:
[
  {&quot;name&quot;: &quot;John&quot;, &quot;age&quot;: 30, &quot;city&quot;: &quot;New York&quot;},
  {&quot;name&quot;: &quot;Jane&quot;, &quot;age&quot;: 25, &quot;city&quot;: &quot;London&quot;}
]"
          class="flex-1 w-full min-h-[300px] p-6 bg-white dark:bg-muted-900 border border-t-0 border-muted-300 dark:border-muted-700 rounded-b-2xl resize-none text-sm font-mono leading-relaxed text-muted-700 dark:text-muted-300 placeholder:text-muted-400 dark:placeholder:text-muted-600 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all"
        ></textarea>
      </div>

      <!-- Error Message -->
      <div
        v-if="parseError"
        class="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl"
      >
        <div class="flex items-start gap-3">
          <Icon name="mdi:alert-circle" class="text-xl text-red-500 shrink-0 mt-0.5" />
          <div>
            <p class="text-sm font-medium text-red-700 dark:text-red-300">Invalid JSON</p>
            <p class="text-xs text-red-600 dark:text-red-400 mt-1">{{ parseError }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- INPUT: Upload File -->
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
          accept=".json,application/json"
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
              Drop JSON file here or click to browse
            </p>
            <p class="text-muted-400 dark:text-muted-500 text-xs mt-1">
              Supports .json files with array of objects
            </p>
          </div>
        </div>
      </div>

      <!-- File Info -->
      <div v-if="uploadedFile" class="mt-4">
        <div
          class="bg-white dark:bg-muted-900 border border-muted-200 dark:border-muted-800 rounded-xl p-4 flex items-center justify-between"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center"
            >
              <Icon name="mdi:file-code-outline" class="text-xl text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p class="text-sm font-medium text-muted-800 dark:text-muted-100">
                {{ uploadedFile.name }}
              </p>
              <p class="text-xs text-muted-500 dark:text-muted-400">
                {{ formatFileSize(uploadedFile.size) }} • {{ parsedData.length.toLocaleString() }} rows
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

      <!-- Error Message -->
      <div
        v-if="parseError"
        class="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl"
      >
        <div class="flex items-start gap-3">
          <Icon name="mdi:alert-circle" class="text-xl text-red-500 shrink-0 mt-0.5" />
          <div>
            <p class="text-sm font-medium text-red-700 dark:text-red-300">Invalid JSON File</p>
            <p class="text-xs text-red-600 dark:text-red-400 mt-1">{{ parseError }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- CSV Output -->
    <div v-if="csvOutput" class="max-w-5xl mx-auto mb-6">
      <div class="bg-white dark:bg-muted-900 border border-muted-200 dark:border-muted-800 rounded-2xl overflow-hidden">
        <!-- Output Header -->
        <div
          class="flex items-center justify-between px-6 py-4 bg-muted-100 dark:bg-muted-800 border-b border-muted-200 dark:border-muted-700"
        >
          <div class="flex items-center gap-2">
            <Icon name="mdi:file-delimited" class="text-lg text-green-500" />
            <h3 class="text-sm font-semibold text-muted-700 dark:text-muted-300">
              CSV Output
            </h3>
            <span
              class="px-2 py-0.5 text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full"
            >
              {{ csvRowCount.toLocaleString() }} rows
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

        <!-- CSV Preview -->
        <div class="p-4">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-xs font-semibold text-muted-600 dark:text-muted-400 uppercase tracking-wider">
              Preview (First 10 rows)
            </h3>
          </div>
          <div class="overflow-x-auto rounded-lg border border-muted-200 dark:border-muted-700">
            <table class="w-full text-sm">
              <thead>
                <tr>
                  <th
                    v-for="(header, i) in previewHeaders"
                    :key="i"
                    class="px-4 py-2.5 text-left text-xs font-semibold text-muted-600 dark:text-muted-400 bg-muted-50 dark:bg-muted-800 border-b border-muted-200 dark:border-muted-700 whitespace-nowrap"
                  >
                    {{ header }}
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
                    class="px-4 py-2 text-muted-700 dark:text-muted-300 border-b border-muted-100 dark:border-muted-800 whitespace-nowrap"
                  >
                    {{ cell || '-' }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Raw CSV Output -->
        <div class="border-t border-muted-200 dark:border-muted-800 p-4">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-xs font-semibold text-muted-600 dark:text-muted-400 uppercase tracking-wider">
              Raw CSV
            </h3>
          </div>
          <textarea
            readonly
            :value="csvOutput"
            rows="6"
            class="w-full text-xs font-mono bg-muted-50 dark:bg-muted-950 border border-muted-200 dark:border-muted-700 rounded-lg p-3 resize-none text-muted-600 dark:text-muted-400 focus:outline-none"
          />
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-if="!jsonInput && !uploadedFile && !csvOutput"
      class="max-w-5xl mx-auto"
    >
      <div
        class="rounded-2xl bg-muted-100 dark:bg-muted-900/50 border border-muted-200 dark:border-muted-800 p-12 text-center"
      >
        <div
          class="w-20 h-20 mx-auto mb-4 rounded-2xl bg-muted-200 dark:bg-muted-800 flex items-center justify-center"
        >
          <Icon name="mdi:code-json" class="text-4xl text-muted-400 dark:text-muted-600" />
        </div>
        <p class="text-lg font-medium text-muted-600 dark:text-muted-400">
          Ready to convert
        </p>
        <p class="text-sm mt-2 text-muted-500 dark:text-muted-500">
          Paste JSON or upload a file to get started
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Papa from 'papaparse';

interface FlattenOptions {
  delimiter?: string;
  maxDepth?: number;
}

const activeMode = ref<'paste' | 'upload'>('paste');
const isDragging = ref(false);
const isConverting = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);

// Input data
const jsonInput = ref('');
const uploadedFile = ref<File | null>(null);
const parsedData = ref<Record<string, unknown>[]>([]);
const parseError = ref('');

// Configuration
const delimiter = ref(',');
const includeHeader = ref(true);
const flattenNested = ref(true);

// Output
const csvOutput = ref('');
const csvRowCount = ref(0);
const copied = ref(false);

const modes = [
  { value: 'paste' as const, label: 'Paste JSON', icon: 'mdi:content-paste' },
  { value: 'upload' as const, label: 'Upload File', icon: 'mdi:file-upload-outline' },
];

const canConvert = computed(() => {
  if (activeMode.value === 'paste') {
    return jsonInput.value.trim().length > 0;
  }
  return uploadedFile.value !== null && parsedData.value.length > 0;
});

const previewHeaders = computed(() => {
  if (parsedData.value.length === 0) return [];
  const firstRow = parsedData.value[0];
  if (!firstRow) return [];
  return Object.keys(firstRow);
});

const previewRows = computed(() => {
  if (!csvOutput.value) return [];
  const rows = csvOutput.value.split('\n');
  const dataRows = includeHeader.value ? rows.slice(1) : rows;
  return dataRows
    .slice(0, 10)
    .map(row => Papa.parse(row, { delimiter: delimiter.value }).data[0] || []);
});

// Watch for JSON input changes to auto-parse
watch(jsonInput, (newValue) => {
  if (newValue.trim()) {
    parseJsonInput();
  } else {
    parsedData.value = [];
    parseError.value = '';
  }
});

function parseJsonInput() {
  parseError.value = '';
  try {
    const trimmed = jsonInput.value.trim();
    if (!trimmed) {
      parsedData.value = [];
      return;
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(trimmed);
    } catch {
      // Try to fix common issues like trailing commas
      const cleaned = trimmed
        .replace(/,\s*([}\]])/g, '$1') // Remove trailing commas
        .replace(/'/g, '"'); // Replace single quotes with double quotes
      parsed = JSON.parse(cleaned);
    }

    if (!Array.isArray(parsed)) {
      // Try to wrap single object in array
      if (typeof parsed === 'object' && parsed !== null) {
        parsed = [parsed];
      } else {
        throw new Error('JSON must be an array of objects or a single object');
      }
    }

    if (parsed.length === 0) {
      throw new Error('JSON array is empty');
    }

    // Validate that all items are objects
    const validData = parsed.filter((item): item is Record<string, unknown> => 
      typeof item === 'object' && item !== null && !Array.isArray(item)
    );

    if (validData.length === 0) {
      throw new Error('JSON array must contain objects');
    }

    parsedData.value = flattenNested.value ? validData.map(item => flattenObject(item)) : validData;
  } catch (err) {
    parsedData.value = [];
    parseError.value = err instanceof Error ? err.message : 'Invalid JSON format';
  }
}

function flattenObject(obj: Record<string, unknown>, options: FlattenOptions = {}): Record<string, unknown> {
  const { delimiter = '.', maxDepth = 3 } = options;
  const result: Record<string, unknown> = {};

  function flatten(current: unknown, propName: string, depth: number): void {
    if (depth > maxDepth) {
      result[propName] = current;
      return;
    }

    if (current === null || current === undefined) {
      result[propName] = '';
      return;
    }

    if (typeof current !== 'object') {
      result[propName] = current;
      return;
    }

    if (Array.isArray(current)) {
      // Convert arrays to JSON string or join simple arrays
      const allPrimitive = current.every(item => 
        typeof item !== 'object' || item === null
      );
      if (allPrimitive) {
        result[propName] = current.join(', ');
      } else {
        result[propName] = JSON.stringify(current);
      }
      return;
    }

    // Object - recurse
    const isEmpty = Object.keys(current).length === 0;
    if (isEmpty) {
      result[propName] = '';
      return;
    }

    for (const key of Object.keys(current)) {
      const newKey = propName ? `${propName}${delimiter}${key}` : key;
      flatten((current as Record<string, unknown>)[key], newKey, depth + 1);
    }
  }

  flatten(obj, '', 0);
  return result;
}

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

function handleFileDrop(e: DragEvent) {
  isDragging.value = false;
  if (e.dataTransfer?.files && e.dataTransfer.files[0]) {
    const file = e.dataTransfer.files[0];
    if (file.name.endsWith('.json') || file.type === 'application/json') {
      processFile(file);
    }
  }
}

async function processFile(file: File) {
  parseError.value = '';
  uploadedFile.value = file;

  try {
    const text = await file.text();
    let parsed: unknown = JSON.parse(text);

    if (!Array.isArray(parsed)) {
      if (typeof parsed === 'object' && parsed !== null) {
        parsed = [parsed];
      } else {
        throw new Error('JSON must be an array of objects or a single object');
      }
    }

    const validData = (parsed as unknown[]).filter((item): item is Record<string, unknown> => 
      typeof item === 'object' && item !== null && !Array.isArray(item)
    );

    if (validData.length === 0) {
      throw new Error('JSON array must contain objects');
    }

    parsedData.value = flattenNested.value ? validData.map(item => flattenObject(item)) : validData;
  } catch (err) {
    uploadedFile.value = null;
    parsedData.value = [];
    parseError.value = err instanceof Error ? err.message : 'Failed to parse JSON file';
  }
}

function clearUploadedFile() {
  uploadedFile.value = null;
  parsedData.value = [];
  parseError.value = '';
  csvOutput.value = '';
  csvRowCount.value = 0;
}

function clearInput() {
  jsonInput.value = '';
  parsedData.value = [];
  parseError.value = '';
  csvOutput.value = '';
  csvRowCount.value = 0;
}

function convertToCsv() {
  if (!canConvert.value) return;

  isConverting.value = true;

  // Small delay for UI feedback
  setTimeout(() => {
    try {
      // Re-parse if needed (for paste mode)
      if (activeMode.value === 'paste') {
        parseJsonInput();
      }

      if (parsedData.value.length === 0) {
        isConverting.value = false;
        return;
      }

      const config: Papa.UnparseConfig = {
        delimiter: delimiter.value,
        header: includeHeader.value,
        newline: '\n',
        quotes: true,
        quoteChar: '"',
        escapeChar: '"',
      };

      csvOutput.value = Papa.unparse(parsedData.value, config);
      csvRowCount.value = parsedData.value.length;
    } catch (err) {
      parseError.value = err instanceof Error ? err.message : 'Conversion failed';
    } finally {
      isConverting.value = false;
    }
  }, 100);
}

function copyCsv() {
  if (!csvOutput.value) return;
  navigator.clipboard.writeText(csvOutput.value);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
}

function downloadCsv() {
  if (!csvOutput.value) return;

  const blob = new Blob([csvOutput.value], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');

  // Generate filename
  let filename = 'converted';
  if (uploadedFile.value) {
    filename = uploadedFile.value.name.replace(/\.json$/i, '');
  }

  a.href = url;
  a.download = `${filename}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function loadSampleJson() {
  jsonInput.value = JSON.stringify([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      age: 30,
      city: "New York",
      department: "Engineering",
      salary: 75000,
      active: true,
      address: {
        street: "123 Main St",
        zipCode: "10001"
      },
      skills: ["JavaScript", "Python", "Go"]
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      age: 28,
      city: "London",
      department: "Design",
      salary: 65000,
      active: true,
      address: {
        street: "456 Design Ave",
        zipCode: "SW1A 1AA"
      },
      skills: ["Figma", "Illustrator", "Photography"]
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob.j@example.com",
      age: 35,
      city: "Sydney",
      department: "Marketing",
      salary: 55000,
      active: false,
      address: {
        street: "789 Market St",
        zipCode: "2000"
      },
      skills: ["SEO", "Content Writing"]
    },
    {
      id: 4,
      name: "Alice Williams",
      email: "alice.w@example.com",
      age: 32,
      city: "Toronto",
      department: "Engineering",
      salary: 80000,
      active: true,
      address: {
        street: "321 Tech Blvd",
        zipCode: "M5H 2N2"
      },
      skills: ["Rust", "C++", "System Design"]
    },
    {
      id: 5,
      name: "Charlie Brown",
      email: "charlie.b@example.com",
      age: 26,
      city: "Berlin",
      department: "Product",
      salary: 70000,
      active: true,
      address: {
        street: "654 Product Str",
        zipCode: "10115"
      },
      skills: ["Agile", "Scrum", "Roadmapping"]
    }
  ], null, 2);
}

useHead({
  title: 'JSON to CSV Converter | Dimar Hanung',
});
</script>
