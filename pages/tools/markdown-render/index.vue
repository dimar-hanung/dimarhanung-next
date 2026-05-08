<template>
  <div class="min-h-screen bg-muted-50 dark:bg-muted-950 py-12 px-4 sm:px-6 lg:px-8 print:p-0 print:bg-white">
    <!-- Header -->
    <div class="max-w-[1600px] mx-auto mb-8 print:hidden">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-4">
          <div
            class="w-12 h-12 rounded-2xl bg-primary-500/10 dark:bg-primary-400/10 flex items-center justify-center"
          >
            <Icon name="mdi:markdown" class="text-2xl text-primary-500" />
          </div>
          <div>
            <h1
              class="text-2xl sm:text-3xl font-bold text-muted-900 dark:text-muted-50 tracking-tight"
            >
              Markdown Render
            </h1>
            <p class="text-sm text-muted-500 dark:text-muted-400 mt-0.5">
              Write or paste Markdown and see it rendered beautifully
            </p>
          </div>
        </div>
        <TSwitchDarkMode />
      </div>
    </div>

    <!-- View Mode Tabs -->
    <div class="max-w-[1600px] mx-auto mb-6 print:hidden">
      <div
        class="inline-flex rounded-2xl bg-muted-200 dark:bg-muted-800 p-1.5 gap-1"
      >
        <button
          v-for="tab in viewModes"
          :key="tab.value"
          @click="activeView = tab.value"
          :class="[
            'px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2',
            activeView === tab.value
              ? 'bg-white dark:bg-muted-800 text-primary-600 dark:text-primary-400 shadow-sm'
              : 'text-muted-600 dark:text-muted-400 hover:text-muted-900 dark:hover:text-muted-100',
          ]"
        >
          <Icon :name="tab.icon" class="text-lg" />
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-[1600px] mx-auto">
      <!-- Split View / Editor Only / Preview Only -->
      <div
        v-if="activeView === 'split'"
        class="grid grid-cols-1 xl:grid-cols-2 gap-6 print:block"
      >
        <!-- Editor Panel -->
        <div class="flex flex-col print:hidden">
          <div
            class="flex items-center justify-between px-5 py-3.5 bg-muted-200 dark:bg-muted-800 rounded-t-2xl border border-b-0 border-muted-300 dark:border-muted-700"
          >
            <div class="flex items-center gap-2">
<span class="text-xs font-semibold text-muted-600 dark:text-muted-300 uppercase tracking-wider">Editor</span>
            </div>
            <div class="flex items-center gap-2">
              <button
                @click="jumpToBottomEditor"
                class="text-xs font-medium text-muted-600 dark:text-muted-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-1.5"
              >
                <Icon name="mdi:arrow-down" class="text-base" />
                Jump to Bottom
              </button>
              <button
                @click="loadSample"
                class="text-xs font-medium text-muted-600 dark:text-muted-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-1.5"
              >
                <Icon name="mdi:file-document-plus-outline" class="text-base" />
                Load Sample
              </button>
            </div>
          </div>
          <textarea
            ref="editorTextarea"
            v-model="markdownInput"
            placeholder="Write your markdown here...

# Hello World

You can use **bold**, *italic*, `code`, and more!

- List item 1
- List item 2

```javascript
const hello = 'world';
```"
            class="flex-1 w-full min-h-[70vh] p-6 bg-white dark:bg-muted-900 border border-t-0 border-muted-300 dark:border-muted-700 rounded-b-2xl resize-none text-base font-mono leading-relaxed text-muted-700 dark:text-muted-300 placeholder:text-muted-400 dark:placeholder:text-muted-600 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all"
          ></textarea>
        </div>

        <!-- Preview Panel -->
        <div class="flex flex-col print:w-full">
          <div
            class="flex items-center justify-between px-5 py-3.5 bg-muted-200 dark:bg-muted-800 rounded-t-2xl border border-b-0 border-muted-300 dark:border-muted-700 print:hidden"
          >
            <div class="flex items-center gap-2">
<span class="text-xs font-semibold text-muted-600 dark:text-muted-300 uppercase tracking-wider">Preview</span>
            </div>
            <div class="flex items-center gap-2">
              <button
                @click="jumpToBottomPreview"
                class="text-xs font-medium text-muted-600 dark:text-muted-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-1.5"
              >
                <Icon name="mdi:arrow-down" class="text-base" />
                Jump to Bottom
              </button>
              <button
                @click="copyHtml"
                :disabled="!markdownInput"
                class="text-xs font-medium text-muted-500 hover:text-primary-500 disabled:opacity-50 disabled:hover:text-muted-500 transition-colors flex items-center gap-1.5"
              >
              <Icon
                :name="copiedHtml ? 'mdi:check' : 'mdi:content-copy'"
                class="text-base"
              />
              {{ copiedHtml ? "Copied!" : "Copy HTML" }}
            </button>
              <button
                @click="exportPdf"
                :disabled="!markdownInput"
                class="text-xs font-medium text-muted-500 hover:text-primary-500 disabled:opacity-50 disabled:hover:text-muted-500 transition-colors flex items-center gap-1.5"
              >
                <Icon name="mdi:file-pdf-box" class="text-base" />
                Export PDF
              </button>
            </div>
          </div>
          <div
            ref="splitPreview"
            class="flex-1 min-h-[70vh] p-8 bg-white dark:bg-muted-900 border border-t-0 border-muted-200 dark:border-muted-800 rounded-b-2-xl prose-content print:min-h-0 print:p-0 print:border-0 print:rounded-none print:bg-white print:text-black"
            :key="colorMode.value"
          >
            <div v-html="renderedHtml" v-if="markdownInput"></div>
            <div
              v-else
              class="h-full flex items-center justify-center text-muted-500 dark:text-muted-400"
            >
              <div class="text-center">
                <div class="w-20 h-20 mx-auto mb-4 rounded-2xl bg-muted-100 dark:bg-muted-800 flex items-center justify-center">
                  <Icon
                    name="mdi:file-document-outline"
                    class="text-4xl text-muted-400 dark:text-muted-500"
                  />
                </div>
                <p class="text-base font-medium text-muted-700 dark:text-muted-300">Your rendered markdown will appear here</p>
                <p class="text-sm mt-2 text-muted-500 dark:text-muted-400">
                  Start typing in the editor to see the preview
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Editor Only -->
      <div v-else-if="activeView === 'editor'" class="print:hidden">
        <div
          class="flex items-center justify-between px-5 py-3.5 bg-muted-200 dark:bg-muted-800 rounded-t-2xl border border-b-0 border-muted-300 dark:border-muted-700"
        >
          <span class="text-xs font-semibold text-muted-600 dark:text-muted-300 uppercase tracking-wider">Editor</span>
          <button
            @click="loadSample"
            class="text-xs font-medium text-muted-600 dark:text-muted-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-1.5"
          >
            <Icon name="mdi:file-document-plus-outline" class="text-base" />
            Load Sample
          </button>
        </div>
        <textarea
          ref="editorOnlyTextarea"
          v-model="markdownInput"
          placeholder="Write your markdown here..."
          class="w-full min-h-[80vh] p-6 bg-white dark:bg-muted-900 border border-t-0 border-muted-300 dark:border-muted-700 rounded-b-2xl resize-none text-base font-mono leading-relaxed text-muted-700 dark:text-muted-300 placeholder:text-muted-400 dark:placeholder:text-muted-600 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all"
        ></textarea>
      </div>

      <!-- Preview Only -->
      <div v-else class="print:w-full">
        <div
          class="flex items-center justify-between px-5 py-3.5 bg-muted-200 dark:bg-muted-800 rounded-t-2xl border border-b-0 border-muted-300 dark:border-muted-700 print:hidden"
        >
          <span class="text-xs font-semibold text-muted-600 dark:text-muted-300 uppercase tracking-wider">Preview</span>
          <div class="flex items-center gap-4">
            <button
              @click="jumpToBottomPreview"
              class="text-xs font-medium text-muted-600 dark:text-muted-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-1.5"
            >
              <Icon name="mdi:arrow-down" class="text-base" />
              Jump to Bottom
            </button>
            <button
              @click="downloadHtml"
              :disabled="!markdownInput"
              class="text-xs font-medium text-muted-600 dark:text-muted-300 hover:text-primary-600 dark:hover:text-primary-400 disabled:opacity-50 disabled:hover:text-muted-600 dark:disabled:hover:text-muted-300 transition-colors flex items-center gap-1.5"
            >
              <Icon name="mdi:download" class="text-base" />
              Download HTML
            </button>
            <button
              @click="copyHtml"
              :disabled="!markdownInput"
              class="text-xs font-medium text-muted-600 dark:text-muted-300 hover:text-primary-600 dark:hover:text-primary-400 disabled:opacity-50 disabled:hover:text-muted-600 dark:disabled:hover:text-muted-300 transition-colors flex items-center gap-1.5"
            >
              <Icon
                :name="copiedHtml ? 'mdi:check' : 'mdi:content-copy'"
                class="text-base"
              />
              {{ copiedHtml ? "Copied!" : "Copy HTML" }}
            </button>
            <button
              @click="exportPdf"
              :disabled="!markdownInput"
              class="text-xs font-medium text-muted-600 dark:text-muted-300 hover:text-primary-600 dark:hover:text-primary-400 disabled:opacity-50 disabled:hover:text-muted-600 dark:disabled:hover:text-muted-300 transition-colors flex items-center gap-1.5"
            >
              <Icon name="mdi:file-pdf-box" class="text-base" />
              Export PDF
            </button>
          </div>
        </div>
        <div
          ref="previewOnlyContainer"
          class="min-h-[80vh] p-10 bg-white dark:bg-muted-900 border border-t-0 border-muted-300 dark:border-muted-700 rounded-b-2xl prose-content print:min-h-0 print:p-0 print:border-0 print:rounded-none print:bg-white print:text-black"
          :key="colorMode.value"
        >
          <div v-html="renderedHtml" v-if="markdownInput"></div>
          <div
            v-else
            class="h-[80vh] flex items-center justify-center text-muted-500 dark:text-muted-400"
          >
            <div class="text-center">
              <div class="w-24 h-24 mx-auto mb-5 rounded-2xl bg-muted-100 dark:bg-muted-800 flex items-center justify-center">
                <Icon
                  name="mdi:file-document-outline"
                  class="text-5xl text-muted-400 dark:text-muted-500"
                />
              </div>
              <p class="text-lg font-medium text-muted-700 dark:text-muted-300">Your rendered markdown will appear here</p>
              <p class="text-sm mt-2 text-muted-500 dark:text-muted-400">
                Switch to Split or Editor view to write markdown
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Actions -->
      <div
        v-if="markdownInput"
        class="flex items-center gap-4 mt-6 flex-wrap print:hidden"
      >
        <button
          @click="clearEditor"
          class="px-5 py-2.5 text-muted-600 dark:text-muted-400 hover:text-red-500 text-sm font-medium transition-colors flex items-center gap-2"
        >
          <Icon name="mdi:delete-outline" class="text-lg" />
          Clear
        </button>
        <button
          @click="downloadMarkdown"
          class="px-5 py-2.5 border border-muted-300 dark:border-muted-700 hover:bg-muted-100 dark:hover:bg-muted-800 text-muted-700 dark:text-muted-300 rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
        >
          <Icon name="mdi:file-download-outline" class="text-lg" />
          Download .md
        </button>
        <div class="ml-auto flex items-center gap-2 text-sm text-muted-500 dark:text-muted-400">
          <Icon name="mdi:text-box-outline" class="text-base" />
          <span>{{ wordCount }} words · {{ charCount }} characters</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { marked } from 'marked';

const colorMode = useColorMode();
const activeView = ref<"split" | "editor" | "preview">("split");
const markdownInput = ref("");
const copiedHtml = ref(false);

// Refs for jump to bottom
const editorTextarea = ref<HTMLTextAreaElement | null>(null);
const editorOnlyTextarea = ref<HTMLTextAreaElement | null>(null);
const splitPreview = ref<HTMLElement | null>(null);
const previewOnlyContainer = ref<HTMLElement | null>(null);

// Store previous view mode before printing
const previousView = ref<"split" | "editor" | "preview" | null>(null);

const viewModes = [
  { value: "split" as const, label: "Split", icon: "mdi:view-split-vertical" },
  { value: "editor" as const, label: "Editor", icon: "mdi:pencil-outline" },
  { value: "preview" as const, label: "Preview", icon: "mdi:eye-outline" },
];

const wordCount = computed(() => {
  if (!markdownInput.value.trim()) return 0;
  return markdownInput.value.trim().split(/\s+/).length;
});

const charCount = computed(() => markdownInput.value.length);

const renderedHtml = computed(() => {
  if (!markdownInput.value) return "";
  return marked.parse(markdownInput.value, { async: false }) as string;
});

function loadSample() {
  markdownInput.value = `# Welcome to Markdown Render

This is a **beautiful** markdown renderer for Enjoy reading experience.

## Features

- Real-time preview with split view
- Syntax highlighting for code blocks
- Clean, readable typography
- Dark mode support

## Code Example

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet('World');
\`\`\`

## List Items

1. First item with **bold** text
2. Second item with *italic* text
3. Third item with \`inline code\`

- Unordered item
- Another item
- And another

## Blockquote

> "The best way to predict the future is to create it."
> — Peter Drucker

## Table

| Feature | Status |
|---------|--------|
| Split View | ✅ |
| Editor | ✅ |
| Preview | ✅ |
| Download | ✅ |

## Links & Images

Check out [Nuxt](https://nuxt.com) for more information.

---

*Start writing your own markdown on the left panel!*
`;
}

function clearEditor() {
  markdownInput.value = "";
}

function copyHtml() {
  const html = extractHtmlFromMdc(markdownInput.value);
  if (html) {
    navigator.clipboard.writeText(html);
    copiedHtml.value = true;
    setTimeout(() => {
      copiedHtml.value = false;
    }, 2000);
  }
}

function extractHtmlFromMdc(markdown: string): string {
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Markdown Render</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      color: #333;
    }
    h1, h2, h3, h4, h5, h6 { margin-top: 1.5em; margin-bottom: 0.5em; font-weight: 600; }
    h1 { font-size: 2em; border-bottom: 1px solid #eee; padding-bottom: 0.3em; }
    h2 { font-size: 1.5em; }
    code { background: #f4f4f4; padding: 0.2em 0.4em; border-radius: 3px; font-size: 0.9em; }
    pre { background: #f4f4f4; padding: 1em; border-radius: 5px; overflow-x: auto; }
    pre code { background: none; padding: 0; }
    blockquote { border-left: 4px solid #ddd; margin: 0; padding-left: 1em; color: #666; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #ddd; padding: 0.5em; text-align: left; }
    th { background: #f4f4f4; }
    img { max-width: 100%; height: auto; }
    a { color: #0066cc; }
    hr { border: none; border-top: 1px solid #eee; margin: 2em 0; }
  </style>
</head>
<body>
${parseMarkdownToHtml(markdown)}
</body>
</html>`;
  return htmlContent;
}

function parseMarkdownToHtml(markdown: string): string {
  return marked.parse(markdown, { async: false }) as string;
}

function downloadHtml() {
  const html = extractHtmlFromMdc(markdownInput.value);
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "markdown-render.html";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function downloadMarkdown() {
  const blob = new Blob([markdownInput.value], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "document.md";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

async function exportPdf() {
  // Store current view and switch to preview-only for clean PDF output
  if (activeView.value !== 'preview') {
    previousView.value = activeView.value;
    activeView.value = 'preview';
    await nextTick();
  }

  // Small delay to allow DOM to settle before opening print dialog
  setTimeout(() => {
    window.print();
  }, 150);
}

// Restore view mode after print dialog closes
if (process.client) {
  window.addEventListener('afterprint', () => {
    if (previousView.value) {
      activeView.value = previousView.value;
      previousView.value = null;
    }
  });
}

async function jumpToBottomEditor() {
  await nextTick();
  // Find the currently visible textarea based on active view
  let textarea: HTMLTextAreaElement | null = null;
  
  if (activeView.value === 'editor' && editorOnlyTextarea.value) {
    textarea = editorOnlyTextarea.value;
  } else if (activeView.value === 'split' && editorTextarea.value) {
    textarea = editorTextarea.value;
  }
  
  if (textarea) {
    textarea.scrollTop = textarea.scrollHeight;
    textarea.setSelectionRange(textarea.value.length, textarea.value.length);
    textarea.focus();
  }
}

async function jumpToBottomPreview() {
  await nextTick();
  
  // Scroll the entire page to the bottom
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'instant'
  });
}

useHead({
  title: "Markdown Render | Dimar Hanung",
});
</script>

<style scoped>
:deep(.prose-content) h1 {
  font-size: 2rem !important;
  font-weight: 700 !important;
  margin-top: 0 !important;
  margin-bottom: 1.25rem !important;
  color: var(--color-muted-900) !important;
  line-height: 1.2 !important;
}
:deep(.dark) :deep(.prose-content) h1 {
  color: var(--color-muted-50) !important;
}
:deep(.prose-content) h2 {
  font-size: 1.5rem !important;
  font-weight: 600 !important;
  margin-top: 2rem !important;
  margin-bottom: 1rem !important;
  color: var(--color-muted-900) !important;
  line-height: 1.3 !important;
}
:deep(.dark) :deep(.prose-content) h2 {
  color: var(--color-muted-50) !important;
}
:deep(.prose-content) h3 {
  font-size: 1.25rem !important;
  font-weight: 600 !important;
  margin-top: 1.75rem !important;
  margin-bottom: 0.75rem !important;
  color: var(--color-muted-900) !important;
  line-height: 1.4 !important;
}
:deep(.dark) :deep(.prose-content) h3 {
  color: var(--color-muted-50) !important;
}
:deep(.prose-content) h4 {
  font-size: 1.125rem !important;
  font-weight: 600 !important;
  margin-top: 1.5rem !important;
  margin-bottom: 0.5rem !important;
  color: var(--color-muted-900) !important;
}
:deep(.dark) :deep(.prose-content) h4 {
  color: var(--color-muted-50) !important;
}
:deep(.prose-content) p {
  margin-bottom: 1.25rem !important;
  color: var(--color-muted-700) !important;
  line-height: 1.75 !important;
  font-size: 1rem !important;
}
:deep(.dark) :deep(.prose-content) p {
  color: var(--color-muted-300) !important;
}
:deep(.prose-content) ul,
:deep(.prose-content) ol {
  margin-bottom: 1.25rem !important;
  padding-left: 1.75rem !important;
  color: var(--color-muted-700) !important;
  line-height: 1.75 !important;
}
:deep(.dark) :deep(.prose-content) ul,
:deep(.dark) :deep(.prose-content) ol {
  color: var(--color-muted-300) !important;
}
:deep(.prose-content) ul {
  list-style-type: disc !important;
}
:deep(.prose-content) ol {
  list-style-type: decimal !important;
}
:deep(.prose-content) li {
  margin-bottom: 0.5rem !important;
}
:deep(.prose-content) blockquote {
  border-left: 4px solid var(--color-primary-500) !important;
  padding: 1rem 1.5rem !important;
  margin: 1.5rem 0 !important;
  font-style: italic !important;
  color: var(--color-muted-600) !important;
  background-color: var(--color-muted-50) !important;
  border-radius: 0 0.5rem 0.5rem 0 !important;
  line-height: 1.7 !important;
}
:deep(.dark) :deep(.prose-content) blockquote {
  color: var(--color-muted-400) !important;
  background-color: var(--color-muted-800) !important;
}
:deep(.prose-content) code {
  background-color: var(--color-muted-100) !important;
  padding: 0.2rem 0.5rem !important;
  border-radius: 0.375rem !important;
  font-size: 0.875em !important;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
}
:deep(.dark) :deep(.prose-content) code {
  background-color: var(--color-muted-800) !important;
}
:deep(.prose-content) pre {
  background-color: var(--color-muted-50) !important;
  padding: 1.25rem !important;
  border-radius: 0.75rem !important;
  overflow-x: auto !important;
  margin: 1.5rem 0 !important;
  line-height: 1.6 !important;
}
:deep(.dark) :deep(.prose-content) pre {
  background-color: var(--color-muted-900) !important;
}
:deep(.prose-content) pre code {
  background-color: transparent !important;
  padding: 0 !important;
  font-size: 0.875rem !important;
}
:deep(.prose-content) table {
  width: 100% !important;
  border-collapse: collapse !important;
  margin: 1.5rem 0 !important;
}
:deep(.prose-content) th,
:deep(.prose-content) td {
  border: 1px solid var(--color-muted-300) !important;
  padding: 0.75rem 1rem !important;
  text-align: left !important;
}
:deep(.prose-content) th {
  background-color: var(--color-muted-100) !important;
  font-weight: 600 !important;
}
:deep(.dark) :deep(.prose-content) th,
:deep(.dark) :deep(.prose-content) td {
  border-color: var(--color-muted-600) !important;
}
:deep(.dark) :deep(.prose-content) th {
  background-color: var(--color-muted-800) !important;
}

/* Print-specific styles for PDF export */
@media print {
  /* Prevent orphaned headings */
  :deep(.prose-content) h1,
  :deep(.prose-content) h2,
  :deep(.prose-content) h3 {
    break-after: avoid !important;
    page-break-after: avoid !important;
  }

  /* Keep code blocks together on one page */
  :deep(.prose-content) pre {
    break-inside: avoid !important;
    page-break-inside: avoid !important;
  }

  /* Keep table rows together */
  :deep(.prose-content) tr {
    break-inside: avoid !important;
    page-break-inside: avoid !important;
  }

  /* Ensure blockquotes stay together */
  :deep(.prose-content) blockquote {
    break-inside: avoid !important;
    page-break-inside: avoid !important;
  }

  /* Print-optimized colors - force light mode for readability */
  :deep(.prose-content) h1,
  :deep(.prose-content) h2,
  :deep(.prose-content) h3,
  :deep(.prose-content) h4,
  :deep(.prose-content) h5,
  :deep(.prose-content) h6 {
    color: #1a1a1a !important;
  }

  :deep(.prose-content) p,
  :deep(.prose-content) ul,
  :deep(.prose-content) ol,
  :deep(.prose-content) li {
    color: #333 !important;
  }

  :deep(.prose-content) code {
    background-color: #f4f4f4 !important;
    color: #1a1a1a !important;
  }

  :deep(.prose-content) pre {
    background-color: #f8f8f8 !important;
    border: 1px solid #e5e5e5 !important;
  }

  :deep(.prose-content) blockquote {
    background-color: #f9f9f9 !important;
    border-left-color: #ccc !important;
    color: #555 !important;
  }

  :deep(.prose-content) th {
    background-color: #f4f4f4 !important;
  }

  :deep(.prose-content) th,
  :deep(.prose-content) td {
    border-color: #ddd !important;
  }

  /* Ensure links show URL for printed documents */
  :deep(.prose-content) a[href]::after {
    content: " (" attr(href) ")";
    font-size: 0.8em;
    color: #666;
  }
}
</style>
