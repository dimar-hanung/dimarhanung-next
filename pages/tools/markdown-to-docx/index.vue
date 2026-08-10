<template>
  <div class="min-h-screen bg-muted-50 dark:bg-muted-950 py-10 px-4 sm:px-6">
    <!-- Header -->
    <div class="max-w-5xl mx-auto mb-10">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-xl bg-cyan-500/10 dark:bg-cyan-400/10 flex items-center justify-center"
          >
            <Icon name="mdi:file-word-box" class="text-xl text-cyan-500" />
          </div>
          <div>
            <h1
              class="text-2xl sm:text-3xl font-bold text-muted-900 dark:text-muted-50 tracking-tight"
            >
              Markdown to Docx
            </h1>
            <p class="text-muted-500 dark:text-muted-400 text-sm mt-0.5">
              Convert Markdown into a downloadable Microsoft Word .docx file
            </p>
          </div>
        </div>
        <TSwitchDarkMode />
      </div>
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

    <!-- INPUT: Paste Markdown -->
    <div v-if="activeMode === 'paste'" class="max-w-5xl mx-auto mb-6">
      <div class="flex flex-col">
        <div
          class="flex items-center justify-between px-5 py-3.5 bg-muted-200 dark:bg-muted-800 rounded-t-2xl border border-b-0 border-muted-300 dark:border-muted-700"
        >
          <span class="text-xs font-semibold text-muted-600 dark:text-muted-300 uppercase tracking-wider">
            Markdown Input
          </span>
          <div class="flex items-center gap-2">
            <button
              @click="loadSample"
              class="text-xs font-medium text-muted-600 dark:text-muted-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-1.5"
            >
              <Icon name="mdi:file-document-plus-outline" class="text-base" />
              Sample
            </button>
            <button
              v-if="markdownInput"
              @click="clearInput"
              class="text-xs font-medium text-muted-600 dark:text-muted-300 hover:text-red-500 transition-colors flex items-center gap-1.5"
            >
              <Icon name="mdi:delete-outline" class="text-base" />
              Clear
            </button>
          </div>
        </div>
        <textarea
          v-model="markdownInput"
          placeholder="Paste your Markdown here...

# Hello World

- item one
- item two"
          class="flex-1 w-full min-h-[320px] p-6 bg-white dark:bg-muted-900 border border-t-0 border-muted-300 dark:border-muted-700 rounded-b-2xl resize-y text-sm font-mono leading-relaxed text-muted-700 dark:text-muted-300 placeholder:text-muted-400 dark:placeholder:text-muted-600 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all"
        ></textarea>
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
            ? 'border-cyan-400 bg-cyan-50/60 dark:bg-cyan-900/20 scale-[1.01]'
            : 'border-muted-300 dark:border-muted-700 hover:border-cyan-300 dark:hover:border-cyan-600 bg-white dark:bg-muted-900',
        ]"
      >
        <input
          ref="fileInput"
          type="file"
          accept=".md,.markdown,text/markdown,text/plain"
          class="hidden"
          @change="handleFileSelect"
        />
        <div class="flex flex-col items-center gap-3 pointer-events-none select-none">
          <div
            class="w-16 h-16 rounded-2xl bg-cyan-100 dark:bg-cyan-900/40 flex items-center justify-center"
          >
            <Icon name="mdi:file-upload-outline" class="text-3xl text-cyan-500" />
          </div>
          <div>
            <p class="text-muted-700 dark:text-muted-200 font-semibold text-base">
              Drop a Markdown file here or click to browse
            </p>
            <p class="text-muted-400 dark:text-muted-500 text-xs mt-1">
              Supports .md / .markdown files
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
              <Icon name="mdi:language-markdown-outline" class="text-xl text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p class="text-sm font-medium text-muted-800 dark:text-muted-100">
                {{ uploadedFile.name }}
              </p>
              <p class="text-xs text-muted-500 dark:text-muted-400">
                {{ formatFileSize(uploadedFile.size) }} · {{ lineCount.toLocaleString() }} lines
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

      <!-- Error -->
      <div
        v-if="parseError"
        class="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl"
      >
        <div class="flex items-start gap-3">
          <Icon name="mdi:alert-circle" class="text-xl text-red-500 shrink-0 mt-0.5" />
          <div>
            <p class="text-sm font-medium text-red-700 dark:text-red-300">Could not load file</p>
            <p class="text-xs text-red-600 dark:text-red-400 mt-1">{{ parseError }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="max-w-5xl mx-auto mb-6">
      <div class="mb-4">
        <span class="text-xs font-semibold text-muted-600 dark:text-muted-300 uppercase tracking-wider">
          Template Style
        </span>
        <div class="mt-2 inline-flex rounded-xl bg-muted-100 dark:bg-muted-900 p-1 gap-1">
          <button
            v-for="option in templateOptions"
            :key="option.value"
            @click="selectedTemplate = option.value"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
              selectedTemplate === option.value
                ? 'bg-white dark:bg-muted-800 text-primary-600 dark:text-primary-400 shadow-sm'
                : 'text-muted-500 hover:text-muted-700 dark:hover:text-muted-300',
            ]"
          >
            {{ option.label }}
          </button>
        </div>
        <p
          v-if="activeTemplateHelper"
          class="mt-2 text-xs text-muted-500 dark:text-muted-400"
        >
          {{ activeTemplateHelper }}
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <input
          v-model="filename"
          type="text"
          placeholder="document"
          class="px-3 py-2 text-sm bg-white dark:bg-muted-900 border border-muted-200 dark:border-muted-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all text-muted-700 dark:text-muted-300 w-44"
        />
        <span class="text-sm text-muted-400">.docx</span>
        <button
          @click="convertAndDownload"
          :disabled="!canConvert || isConverting"
          class="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
        >
          <Icon :name="isConverting ? 'mdi:loading' : 'mdi:download'" :class="{ 'animate-spin': isConverting }" />
          {{ isConverting ? 'Converting...' : 'Download .docx' }}
        </button>
        <button
          v-if="activeMode === 'paste' && markdownInput"
          @click="clearInput"
          class="px-4 py-2.5 text-muted-600 dark:text-muted-400 hover:text-red-500 text-sm font-medium transition-colors flex items-center gap-2"
        >
          <Icon name="mdi:delete-outline" class="text-lg" />
          Clear
        </button>
      </div>

      <!-- Error -->
      <div
        v-if="convertError"
        class="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl"
      >
        <div class="flex items-start gap-3">
          <Icon name="mdi:alert-circle" class="text-xl text-red-500 shrink-0 mt-0.5" />
          <div>
            <p class="text-sm font-medium text-red-700 dark:text-red-300">Conversion failed</p>
            <p class="text-xs text-red-600 dark:text-red-400 mt-1">{{ convertError }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-if="!markdownInput && !uploadedFile"
      class="max-w-5xl mx-auto"
    >
      <div
        class="rounded-2xl bg-muted-100 dark:bg-muted-900/50 border border-muted-200 dark:border-muted-800 p-12 text-center"
      >
        <div
          class="w-20 h-20 mx-auto mb-4 rounded-2xl bg-muted-200 dark:bg-muted-800 flex items-center justify-center"
        >
          <Icon name="mdi:file-word-box-outline" class="text-4xl text-muted-400 dark:text-muted-600" />
        </div>
        <p class="text-lg font-medium text-muted-600 dark:text-muted-400">
          Ready to convert
        </p>
        <p class="text-sm mt-2 text-muted-500 dark:text-muted-500">
          Paste Markdown or upload a .md file, then download a Word document
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { markdownToDocxBlob } from '~/utils/markdown-to-docx';
import { DOCX_TEMPLATE_OPTIONS, type DocxTemplateId } from '~/utils/markdown-to-docx-templates';

const activeMode = ref<'paste' | 'upload'>('paste');
const isDragging = ref(false);
const isConverting = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);

const markdownInput = ref('');
const uploadedFile = ref<File | null>(null);
const parseError = ref('');
const convertError = ref('');
const filename = ref('document');
const selectedTemplate = ref<DocxTemplateId>('default');

const templateOptions = DOCX_TEMPLATE_OPTIONS;

const activeTemplateHelper = computed(() => {
  return templateOptions.find((option) => option.value === selectedTemplate.value)?.helperText ?? '';
});

const modes = [
  { value: 'paste' as const, label: 'Paste Markdown', icon: 'mdi:content-paste' },
  { value: 'upload' as const, label: 'Upload File', icon: 'mdi:file-upload-outline' },
];

const canConvert = computed(() => {
  if (activeMode.value === 'paste') {
    return markdownInput.value.trim().length > 0;
  }
  return uploadedFile.value !== null && markdownInput.value.trim().length > 0;
});

const lineCount = computed(() => {
  if (!markdownInput.value) return 0;
  return markdownInput.value.split('\n').length;
});

function loadSample() {
  markdownInput.value = `# Markdown to Docx Sample

This is a **bold**, *italic*, ~~struck~~ and \`inline code\` paragraph.

## Ordered List

1. First item
2. Second item
3. Third item

## Unordered List

- Bullet one
  - Nested bullet
  - Another nested
- Bullet two

## Code Block

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

## Table

| Feature      | Status |
| ------------ | ------ |
| Headings     | ✅     |
| Lists        | ✅     |
| Tables       | ✅     |
| Code blocks  | ✅     |
| Images       | ✅     |

![Sample diagram](https://picsum.photos/seed/md2docx/640/360)

![SVG logo](https://upload.wikimedia.org/wikipedia/commons/0/02/SVG_logo.svg)

![Garuda Pancasila](https://upload.wikimedia.org/wikipedia/commons/9/90/National_emblem_of_Indonesia_Garuda_Pancasila.svg)

> This is a blockquote — indented and bordered in Word.

---

[Visit Nuxt](https://nuxt.com) for more.
`;
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
    if (
      file.name.endsWith('.md') ||
      file.name.endsWith('.markdown') ||
      file.type === 'text/markdown' ||
      file.type === 'text/plain'
    ) {
      processFile(file);
    } else {
      parseError.value = 'Please drop a .md or .markdown file.';
    }
  }
}

async function processFile(file: File) {
  parseError.value = '';
  uploadedFile.value = file;
  try {
    const text = await file.text();
    markdownInput.value = text;
    filename.value = file.name.replace(/\.(md|markdown)$/i, '');
  } catch (err) {
    uploadedFile.value = null;
    markdownInput.value = '';
    parseError.value = err instanceof Error ? err.message : 'Failed to read file.';
  }
}

function clearUploadedFile() {
  uploadedFile.value = null;
  markdownInput.value = '';
  parseError.value = '';
  filename.value = 'document';
}

function clearInput() {
  markdownInput.value = '';
  parseError.value = '';
  convertError.value = '';
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function sanitizeFilename(name: string): string {
  const cleaned = name.trim().replace(/[\\/:*?"<>|]/g, '-').replace(/\s+/g, '-');
  return cleaned.length > 0 ? cleaned : 'document';
}

async function convertAndDownload() {
  if (!canConvert.value) return;
  convertError.value = '';
  isConverting.value = true;
  try {
    const blob = await markdownToDocxBlob(markdownInput.value, selectedTemplate.value);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${sanitizeFilename(filename.value)}.docx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (err) {
    convertError.value = err instanceof Error ? err.message : 'Conversion failed.';
  } finally {
    isConverting.value = false;
  }
}

useHead({
  title: 'Markdown to Docx | Dimar Hanung',
});
</script>