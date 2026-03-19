<template>
  <div class="min-h-screen bg-muted-50 dark:bg-muted-950 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-[1600px] mx-auto mb-8">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-4">
          <div
            class="w-12 h-12 rounded-2xl bg-primary-500/10 dark:bg-primary-400/10 flex items-center justify-center"
          >
            <Icon name="mdi:file-compare" class="text-2xl text-primary-500" />
          </div>
          <div>
            <h1
              class="text-2xl sm:text-3xl font-bold text-muted-900 dark:text-muted-50 tracking-tight"
            >
              Diff Checker
            </h1>
            <p class="text-sm text-muted-500 dark:text-muted-400 mt-0.5">
              Compare text and find differences word by word
            </p>
          </div>
        </div>
        <TSwitchDarkMode />
      </div>
    </div>

    <div class="max-w-[1600px] mx-auto mb-6">
      <div class="flex items-center justify-between flex-wrap gap-4">
        <div class="flex items-center gap-3 flex-wrap">
          <div class="inline-flex rounded-2xl bg-muted-200 dark:bg-muted-800 p-1.5 gap-1">
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

        <div v-if="hasDiff" class="flex items-center gap-3">
          <div class="flex items-center gap-2 px-4 py-2 bg-green-500/10 dark:bg-green-500/20 rounded-xl">
            <Icon name="mdi:plus" class="text-green-500 text-base" />
            <span class="text-sm font-medium text-green-600 dark:text-green-400">{{ wordStats.added }} words</span>
          </div>
          <div class="flex items-center gap-2 px-4 py-2 bg-red-500/10 dark:bg-red-500/20 rounded-xl">
            <Icon name="mdi:minus" class="text-red-500 text-base" />
            <span class="text-sm font-medium text-red-600 dark:text-red-400">{{ wordStats.removed }} words</span>
          </div>
          <div class="flex items-center gap-2 px-4 py-2 bg-amber-500/10 dark:bg-amber-500/20 rounded-xl">
            <Icon name="mdi:pencil" class="text-amber-500 text-base" />
            <span class="text-sm font-medium text-amber-600 dark:text-amber-400">{{ wordStats.changed }} changed</span>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-[1600px] mx-auto">
      <div
        v-if="activeView === 'split'"
        class="grid grid-cols-1 xl:grid-cols-2 gap-6"
      >
        <div class="flex flex-col">
          <div
            class="flex items-center justify-between px-5 py-3.5 bg-muted-200 dark:bg-muted-800 rounded-t-2xl border border-b-0 border-muted-300 dark:border-muted-700"
          >
            <div class="flex items-center gap-2">
              <span class="text-xs font-semibold text-muted-600 dark:text-muted-300 uppercase tracking-wider">Original Text</span>
            </div>
            <div class="flex items-center gap-2">
              <button
                @click="swapTexts"
                class="text-xs font-medium text-muted-600 dark:text-muted-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-1.5"
              >
                <Icon name="mdi:swap-horizontal" class="text-base" />
                Swap
              </button>
              <button
                @click="loadSampleOriginal"
                class="text-xs font-medium text-muted-600 dark:text-muted-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-1.5"
              >
                <Icon name="mdi:file-document-plus-outline" class="text-base" />
                Sample
              </button>
            </div>
          </div>
          <textarea
            v-model="originalText"
            ref="originalTextarea"
            placeholder="Paste your original text here..."
            class="flex-1 w-full min-h-[60vh] p-6 bg-white dark:bg-muted-900 border border-t-0 border-muted-300 dark:border-muted-700 rounded-b-2xl resize-none text-base font-mono leading-relaxed text-muted-700 dark:text-muted-300 placeholder:text-muted-400 dark:placeholder:text-muted-600 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all"
          ></textarea>
        </div>

        <div class="flex flex-col">
          <div
            class="flex items-center justify-between px-5 py-3.5 bg-muted-200 dark:bg-muted-800 rounded-t-2xl border border-b-0 border-muted-300 dark:border-muted-700"
          >
            <div class="flex items-center gap-2">
              <span class="text-xs font-semibold text-muted-600 dark:text-muted-300 uppercase tracking-wider">Modified Text</span>
            </div>
            <div class="flex items-center gap-2">
              <button
                @click="loadSampleModified"
                class="text-xs font-medium text-muted-600 dark:text-muted-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-1.5"
              >
                <Icon name="mdi:file-document-plus-outline" class="text-base" />
                Sample
              </button>
            </div>
          </div>
          <textarea
            v-model="modifiedText"
            ref="modifiedTextarea"
            placeholder="Paste your modified text here..."
            class="flex-1 w-full min-h-[60vh] p-6 bg-white dark:bg-muted-900 border border-t-0 border-muted-300 dark:border-muted-700 rounded-b-2xl resize-none text-base font-mono leading-relaxed text-muted-700 dark:text-muted-300 placeholder:text-muted-400 dark:placeholder:text-muted-600 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all"
          ></textarea>
        </div>
      </div>

      <div v-else-if="activeView === 'unified'" class="flex flex-col">
        <div
          class="flex items-center justify-between px-5 py-3.5 bg-muted-200 dark:bg-muted-800 rounded-t-2xl border border-b-0 border-muted-300 dark:border-muted-700"
        >
          <div class="flex items-center gap-2">
            <span class="text-xs font-semibold text-muted-600 dark:text-muted-300 uppercase tracking-wider">Diff Result</span>
          </div>
          <div class="flex items-center gap-2">
            <button
              @click="toggleWordLevel"
              :class="[
                'text-xs font-medium px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5',
                wordLevel 
                  ? 'bg-primary-500/20 text-primary-600 dark:text-primary-400' 
                  : 'text-muted-600 dark:text-muted-300 hover:bg-muted-300 dark:hover:bg-muted-700'
              ]"
            >
              <Icon name="mdi:format-letter-starts-with" class="text-base" />
              Word Level
            </button>
            <button
              @click="copyDiff"
              :disabled="!hasDiff"
              class="text-xs font-medium text-muted-600 dark:text-muted-300 hover:text-primary-600 dark:hover:text-primary-400 disabled:opacity-50 disabled:hover:text-muted-600 dark:disabled:hover:text-muted-300 transition-colors flex items-center gap-1.5"
            >
              <Icon
                :name="copiedDiff ? 'mdi:check' : 'mdi:content-copy'"
                class="text-base"
              />
              {{ copiedDiff ? "Copied!" : "Copy" }}
            </button>
            <button
              @click="downloadDiff"
              :disabled="!hasDiff"
              class="text-xs font-medium text-muted-600 dark:text-muted-300 hover:text-primary-600 dark:hover:text-primary-400 disabled:opacity-50 disabled:hover:text-muted-600 dark:disabled:hover:text-muted-300 transition-colors flex items-center gap-1.5"
            >
              <Icon name="mdi:download" class="text-base" />
              Download
            </button>
          </div>
        </div>
        <div
          class="min-h-[70vh] bg-white dark:bg-muted-900 border border-t-0 border-muted-300 dark:border-muted-700 rounded-b-2xl overflow-auto"
        >
          <div v-if="hasDiff" class="p-6">
            <div
              v-for="(line, index) in unifiedDiffLines"
              :key="index"
              class="mb-1"
            >
              <div
                v-if="line.type === 'unchanged'"
                class="font-mono text-sm py-1.5 px-4 rounded-lg text-muted-600 dark:text-muted-400"
              >
                <span class="inline-block w-6 text-muted-500 dark:text-muted-600"> </span>
                <span v-if="wordLevel" v-html="renderUnchangedWords(line.content)"></span>
                <span v-else>{{ line.content }}</span>
              </div>
              <div
                v-else-if="line.type === 'removed'"
                class="font-mono text-sm py-1.5 px-4 rounded-lg bg-red-500/10 text-red-700 dark:text-red-300"
              >
                <span class="inline-block w-6 text-red-400">-</span>
                <span v-if="wordLevel" v-html="renderRemovedWords(line.originalWords, line.content)"></span>
                <span v-else>{{ line.content }}</span>
              </div>
              <div
                v-else-if="line.type === 'added'"
                class="font-mono text-sm py-1.5 px-4 rounded-lg bg-green-500/10 text-green-700 dark:text-green-300"
              >
                <span class="inline-block w-6 text-green-400">+</span>
                <span v-if="wordLevel" v-html="renderAddedWords(line.originalWords, line.content)"></span>
                <span v-else>{{ line.content }}</span>
              </div>
              <div
                v-else-if="line.type === 'modified'"
                class="font-mono text-sm py-1.5 px-4 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-300"
              >
                <span class="inline-block w-6 text-amber-400">~</span>
                <span v-if="wordLevel" v-html="renderModifiedLine(line.oldContent, line.content)"></span>
                <span v-else>{{ line.content }}</span>
              </div>
            </div>
          </div>
          <div
            v-else
            class="h-[70vh] flex items-center justify-center text-muted-500 dark:text-muted-400"
          >
            <div class="text-center">
              <div class="w-24 h-24 mx-auto mb-5 rounded-2xl bg-muted-100 dark:bg-muted-800 flex items-center justify-center">
                <Icon
                  name="mdi:file-compare-outline"
                  class="text-5xl text-muted-400 dark:text-muted-500"
                />
              </div>
              <p class="text-lg font-medium text-muted-700 dark:text-muted-300">Enter text to compare</p>
              <p class="text-sm mt-2 text-muted-500 dark:text-muted-400">
                Paste text in both panels to see differences
              </p>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="flex flex-col">
        <div
          class="flex items-center justify-between px-5 py-3.5 bg-muted-200 dark:bg-muted-800 rounded-t-2xl border border-b-0 border-muted-300 dark:border-muted-700"
        >
          <div class="flex items-center gap-2">
            <span class="text-xs font-semibold text-muted-600 dark:text-muted-300 uppercase tracking-wider">Side by Side</span>
          </div>
          <div class="flex items-center gap-2">
            <button
              @click="toggleWordLevel"
              :class="[
                'text-xs font-medium px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5',
                wordLevel 
                  ? 'bg-primary-500/20 text-primary-600 dark:text-primary-400' 
                  : 'text-muted-600 dark:text-muted-300 hover:bg-muted-300 dark:hover:bg-muted-700'
              ]"
            >
              <Icon name="mdi:format-letter-starts-with" class="text-base" />
              Word Level
            </button>
            <button
              @click="swapTexts"
              class="text-xs font-medium text-muted-600 dark:text-muted-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-1.5"
            >
              <Icon name="mdi:swap-horizontal" class="text-base" />
              Swap
            </button>
            <button
              @click="loadBothSamples"
              class="text-xs font-medium text-muted-600 dark:text-muted-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-1.5"
            >
              <Icon name="mdi:file-document-plus-outline" class="text-base" />
              Sample
            </button>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-0 bg-white dark:bg-muted-900 border border-muted-300 dark:border-muted-700 rounded-b-2xl overflow-hidden">
          <div class="border-r border-muted-300 dark:border-muted-700">
            <div class="px-4 py-2 bg-muted-100 dark:bg-muted-800 border-b border-muted-300 dark:border-muted-700">
              <span class="text-xs font-semibold text-muted-600 dark:text-muted-300 uppercase tracking-wider">Original</span>
            </div>
            <div class="p-4 max-h-[60vh] overflow-auto">
              <div
                v-for="(line, index) in sideBySideDiff.original"
                :key="index"
                class="font-mono text-sm py-1 px-3 rounded-lg mb-0.5"
              >
                <template v-if="line.type === 'unchanged'">
                  <span class="text-muted-600 dark:text-muted-400">{{ line.content }}</span>
                </template>
                <template v-else-if="line.type === 'removed'">
                  <span class="bg-red-500/20 text-red-700 dark:text-red-300 px-1.5 py-0.5 rounded">
                    <span v-if="wordLevel" v-html="highlightRemovedWords(line.words)"></span>
                    <span v-else>{{ line.content }}</span>
                  </span>
                </template>
                <template v-else-if="line.type === 'modified'">
                  <span class="bg-amber-500/20 text-amber-700 dark:text-amber-300 px-1.5 py-0.5 rounded">
                    <span v-if="wordLevel" v-html="highlightModifiedWords(line.words, 'removed')"></span>
                    <span v-else>{{ line.content }}</span>
                  </span>
                </template>
              </div>
              <div v-if="!originalText" class="text-muted-400 dark:text-muted-600 text-sm font-mono">
                Paste original text here...
              </div>
            </div>
          </div>
          <div>
            <div class="px-4 py-2 bg-muted-100 dark:bg-muted-800 border-b border-muted-300 dark:border-muted-700">
              <span class="text-xs font-semibold text-muted-600 dark:text-muted-300 uppercase tracking-wider">Modified</span>
            </div>
            <div class="p-4 max-h-[60vh] overflow-auto">
              <div
                v-for="(line, index) in sideBySideDiff.modified"
                :key="index"
                class="font-mono text-sm py-1 px-3 rounded-lg mb-0.5"
              >
                <template v-if="line.type === 'unchanged'">
                  <span class="text-muted-600 dark:text-muted-400">{{ line.content }}</span>
                </template>
                <template v-else-if="line.type === 'added'">
                  <span class="bg-green-500/20 text-green-700 dark:text-green-300 px-1.5 py-0.5 rounded">
                    <span v-if="wordLevel" v-html="highlightAddedWords(line.words)"></span>
                    <span v-else>{{ line.content }}</span>
                  </span>
                </template>
                <template v-else-if="line.type === 'modified'">
                  <span class="bg-amber-500/20 text-amber-700 dark:text-amber-300 px-1.5 py-0.5 rounded">
                    <span v-if="wordLevel" v-html="highlightModifiedWords(line.words, 'added')"></span>
                    <span v-else>{{ line.content }}</span>
                  </span>
                </template>
              </div>
              <div v-if="!modifiedText" class="text-muted-400 dark:text-muted-600 text-sm font-mono">
                Paste modified text here...
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="originalText || modifiedText"
        class="flex items-center gap-4 mt-6 flex-wrap"
      >
        <button
          @click="clearAll"
          class="px-5 py-2.5 text-muted-600 dark:text-muted-400 hover:text-red-500 text-sm font-medium transition-colors flex items-center gap-2"
        >
          <Icon name="mdi:delete-outline" class="text-lg" />
          Clear All
        </button>
        <div class="ml-auto flex items-center gap-2 text-sm text-muted-500 dark:text-muted-400">
          <Icon name="mdi:text-box-outline" class="text-base" />
          <span>{{ originalCharCount }} → {{ modifiedCharCount }} chars</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode();
const activeView = ref<"split" | "unified" | "side-by-side">("split");
const originalText = ref("");
const modifiedText = ref("");
const copiedDiff = ref(false);
const wordLevel = ref(true);

const originalTextarea = ref<HTMLTextAreaElement | null>(null);
const modifiedTextarea = ref<HTMLTextAreaElement | null>(null);

const viewModes = [
  { value: "split" as const, label: "Input", icon: "mdi:pencil-outline" },
  { value: "side-by-side" as const, label: "Side by Side", icon: "mdi:compare-horizontal" },
  { value: "unified" as const, label: "Unified", icon: "mdi:format-list-bulleted" },
];

const originalCharCount = computed(() => originalText.value.length);
const modifiedCharCount = computed(() => modifiedText.value.length);

const hasDiff = computed(() => originalText.value !== modifiedText.value);

function tokenizeWords(text: string): string[] {
  return text
    .replace(/[.,;:!?()[\]{}'"]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 0);
}

function computeWordDiff(oldWords: string[], newWords: string[]): { type: 'same' | 'removed' | 'added' | 'modified'; value: string; oldValue?: string }[] {
  const m = oldWords.length;
  const n = newWords.length;
  
  if (m === 0) {
    return newWords.map(w => ({ type: 'added' as const, value: w }));
  }
  if (n === 0) {
    return oldWords.map(w => ({ type: 'removed' as const, value: w }));
  }
  
  const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (oldWords[i - 1] === newWords[j - 1]) {
        dp[i]![j] = dp[i - 1]![j - 1]! + 1;
      } else {
        dp[i]![j] = Math.max(dp[i - 1]![j]!, dp[i]![j - 1]!);
      }
    }
  }
  
  let i = m, j = n;
  const path: { i: number; j: number; type: 'same' | 'removed' | 'added' }[] = [];
  
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && oldWords[i - 1] === newWords[j - 1]) {
      path.unshift({ i: i--, j: j--, type: 'same' });
    } else if (i > 0 && j > 0 && dp[i]![j] === dp[i - 1]![j - 1]! + 1 && oldWords[i - 1] === newWords[j - 1]) {
      path.unshift({ i: i--, j: j--, type: 'same' });
    } else if (j > 0 && (i === 0 || dp[i]![j - 1]! >= dp[i - 1]![j]!)) {
      path.unshift({ i: i, j: j--, type: 'added' });
    } else if (i > 0) {
      path.unshift({ i: i--, j: j, type: 'removed' });
    } else {
      path.unshift({ i: i, j: j--, type: 'added' });
    }
  }
  
  let oldIdx = 0;
  let newIdx = 0;
  const result: { type: 'same' | 'removed' | 'added' | 'modified'; value: string }[] = [];
  
  for (const step of path) {
    if (step.type === 'same') {
      result.push({ type: 'same', value: oldWords[oldIdx] ?? '' });
      oldIdx++;
      newIdx++;
    } else if (step.type === 'added') {
      result.push({ type: 'added', value: newWords[newIdx] ?? '' });
      newIdx++;
    } else {
      result.push({ type: 'removed', value: oldWords[oldIdx] ?? '' });
      oldIdx++;
    }
  }
  
  const merged: { type: 'same' | 'removed' | 'added' | 'modified'; value: string; oldValue?: string }[] = [];
  let i2 = 0;
  
  while (i2 < result.length) {
    const curr = result[i2];
    
    if (curr.type === 'removed' && i2 + 1 < result.length && result[i2 + 1].type === 'added') {
      const removedWord = curr.value;
      const addedWord = result[i2 + 1].value;
      const distance = levenshteinDistance(removedWord, addedWord);
      const lengthDiff = Math.abs(removedWord.length - addedWord.length);
      
      if (distance < 3 || (lengthDiff < 3 && distance < Math.max(removedWord.length, addedWord.length) * 0.3)) {
        merged.push({ type: 'modified', value: addedWord, oldValue: removedWord });
        i2 += 2;
        continue;
      }
    }
    
    merged.push(curr);
    i2++;
  }
  
  return merged;
}

function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = Array(a.length + 1).fill(null).map(() => Array(b.length + 1).fill(0));
  
  for (let i = 0; i <= a.length; i++) {
    if (matrix[i]) matrix[i]![0] = i;
  }
  for (let j = 0; j <= b.length; j++) {
    if (matrix[0]) matrix[0]![j] = j;
  }
  
  for (let i = 1; i <= a.length; i++) {
    if (!matrix[i]) continue;
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        matrix[i]![j] = matrix[i - 1]?.[j - 1] ?? 0;
      } else {
        const del = (matrix[i - 1]?.[j] ?? 0) + 1;
        const ins = (matrix[i]?.[j - 1] ?? 0) + 1;
        const sub = (matrix[i - 1]?.[j - 1] ?? 0) + 1;
        matrix[i]![j] = Math.min(del, ins, sub);
      }
    }
  }
  
  return matrix[a.length]?.[b.length] ?? 0;
}

const unifiedDiffLines = computed(() => {
  if (!originalText.value && !modifiedText.value) return [];
  
  const originalLines = originalText.value.split('\n');
  const modifiedLines = modifiedText.value.split('\n');
  
  const result: { 
    type: 'unchanged' | 'added' | 'removed' | 'modified'; 
    content: string;
    originalWords?: string[];
    oldContent?: string;
  }[] = [];
  
  const maxLen = Math.max(originalLines.length, modifiedLines.length);
  
  for (let i = 0; i < maxLen; i++) {
    const origLine = originalLines[i] ?? '';
    const modLine = modifiedLines[i] ?? '';
    
    if (!originalLines[i] && modifiedLines[i]) {
      result.push({ type: 'added', content: modLine });
    } else if (originalLines[i] && !modifiedLines[i]) {
      result.push({ type: 'removed', content: origLine });
    } else if (origLine === modLine) {
      result.push({ type: 'unchanged', content: origLine });
    } else {
      const oldWords = tokenizeWords(origLine);
      const newWords = tokenizeWords(modLine);
      const diff = computeWordDiff(oldWords, newWords);
      
      const hasModified = diff.some(d => d.type === 'modified');
      
      if (hasModified) {
        result.push({ 
          type: 'modified', 
          content: modLine, 
          oldContent: origLine,
          originalWords: oldWords 
        });
      } else {
        result.push({ type: 'removed', content: origLine, originalWords: oldWords });
        result.push({ type: 'added', content: modLine, originalWords: newWords });
      }
    }
  }
  
  return result;
});

const sideBySideDiff = computed(() => {
  if (!originalText.value && !modifiedText.value) return { original: [], modified: [] };
  
  const originalLines = originalText.value.split('\n');
  const modifiedLines = modifiedText.value.split('\n');
  
  const original: { type: 'unchanged' | 'removed' | 'modified'; content: string; words?: ReturnType<typeof computeWordDiff> }[] = [];
  const modified: { type: 'unchanged' | 'added' | 'modified'; content: string; words?: ReturnType<typeof computeWordDiff> }[] = [];
  
  const maxLen = Math.max(originalLines.length, modifiedLines.length);
  
  for (let i = 0; i < maxLen; i++) {
    const origLine = originalLines[i] ?? '';
    const modLine = modifiedLines[i] ?? '';
    
    if (!originalLines[i] && modifiedLines[i]) {
      modified.push({ type: 'added', content: modLine });
    } else if (originalLines[i] && !modifiedLines[i]) {
      original.push({ type: 'removed', content: origLine });
    } else if (origLine === modLine) {
      original.push({ type: 'unchanged', content: origLine });
      modified.push({ type: 'unchanged', content: modLine });
    } else {
      const oldWords = tokenizeWords(origLine);
      const newWords = tokenizeWords(modLine);
      const diff = computeWordDiff(oldWords, newWords);
      
      const hasModified = diff.some(d => d.type === 'modified');
      
      if (hasModified) {
        original.push({ type: 'modified', content: origLine, words: diff });
        modified.push({ type: 'modified', content: modLine, words: diff });
      } else {
        original.push({ type: 'removed', content: origLine, words: diff });
        modified.push({ type: 'added', content: modLine, words: diff });
      }
    }
  }
  
  return { original, modified };
});

const wordStats = computed(() => {
  let added = 0;
  let removed = 0;
  let changed = 0;
  
  for (const line of unifiedDiffLines.value) {
    if (line.type === 'added') {
      added += line.content.split(/\s+/).filter(w => w).length;
    } else if (line.type === 'removed') {
      removed += line.content.split(/\s+/).filter(w => w).length;
    } else if (line.type === 'modified') {
      changed++;
    }
  }
  
  return { added, removed, changed };
});

function renderUnchangedWords(content: string): string {
  return content
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function renderRemovedWords(words: string[] | undefined, content: string): string {
  if (!words || !wordLevel.value) {
    return content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  
  const diff = computeWordDiff(tokenizeWords(content), tokenizeWords(''));
  
  return words.map(w => {
    const escaped = w.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    if (w.trim() === '') return `<span>${escaped}</span>`;
    return `<span class="bg-red-500/30 text-red-800 dark:text-red-200 px-0.5 rounded mx-0.5">${escaped}</span>`;
  }).join('');
}

function renderAddedWords(words: string[] | undefined, content: string): string {
  if (!words || !wordLevel.value) {
    return content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  
  return content.split('').map(w => {
    const escaped = w.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    if (w.trim() === '') return `<span>${escaped}</span>`;
    return `<span class="bg-green-500/30 text-green-800 dark:text-green-200 px-0.5 rounded mx-0.5">${escaped}</span>`;
  }).join('');
}

function renderModifiedLine(oldContent: string | undefined, newContent: string): string {
  if (!wordLevel.value || !oldContent) {
    return newContent.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  
  const oldWords = tokenizeWords(oldContent);
  const newWords = tokenizeWords(newContent);
  const diff = computeWordDiff(oldWords, newWords);
  
  return diff.map(d => {
    const escaped = d.value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    if (d.value.trim() === '') return `<span>${escaped}</span>`;
    if (d.type === 'same') return `<span>${escaped}</span>`;
    if (d.type === 'removed') {
      return `<span class="bg-red-500/30 text-red-800 dark:text-red-200 px-0.5 rounded mx-0.5 line-through decoration-red-500">${escaped}</span>`;
    }
    if (d.type === 'added') {
      return `<span class="bg-green-500/30 text-green-800 dark:text-green-200 px-0.5 rounded mx-0.5 font-semibold">${escaped}</span>`;
    }
    return `<span class="bg-amber-500/30 text-amber-800 dark:text-amber-200 px-0.5 rounded mx-0.5 font-semibold">${escaped}</span>`;
  }).join('');
}

function highlightRemovedWords(words: ReturnType<typeof computeWordDiff> | undefined): string {
  if (!words) return '';
  
  return words.map(w => {
    const displayValue = (w.type === 'modified' && w.oldValue) ? w.oldValue : w.value;
    const escaped = displayValue.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    if (displayValue.trim() === '') return `<span>${escaped}</span>`;
    if (w.type === 'removed' || w.type === 'modified') {
      return `<span class="bg-red-500/40 text-red-800 dark:text-red-200 px-0.5 rounded">${escaped}</span>`;
    }
    return `<span>${escaped}</span>`;
  }).join('');
}

function highlightAddedWords(words: ReturnType<typeof computeWordDiff> | undefined): string {
  if (!words) return '';
  
  return words.map(w => {
    const escaped = w.value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    if (w.value.trim() === '') return `<span>${escaped}</span>`;
    if (w.type === 'added' || w.type === 'modified') {
      return `<span class="bg-green-500/40 text-green-800 dark:text-green-200 px-0.5 rounded">${escaped}</span>`;
    }
    return `<span>${escaped}</span>`;
  }).join('');
}

function highlightModifiedWords(words: ReturnType<typeof computeWordDiff> | undefined, side: 'removed' | 'added'): string {
  if (!words) return '';
  
  return words.map(w => {
    const displayValue = (side === 'removed' && w.type === 'modified' && w.oldValue) ? w.oldValue : w.value;
    const escaped = displayValue.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    if (displayValue.trim() === '') return `<span>${escaped}</span>`;
    if (w.type === side || w.type === 'modified') {
      return `<span class="bg-amber-500/40 text-amber-800 dark:text-amber-200 px-0.5 rounded">${escaped}</span>`;
    }
    return `<span>${escaped}</span>`;
  }).join('');
}

function toggleWordLevel() {
  wordLevel.value = !wordLevel.value;
}

function swapTexts() {
  const temp = originalText.value;
  originalText.value = modifiedText.value;
  modifiedText.value = temp;
}

function clearAll() {
  originalText.value = "";
  modifiedText.value = "";
}

function loadSampleOriginal() {
  originalText.value = `Welcome to Diff Checker

This is a sample text that demonstrates
how the diff checker works.

Features:
- Compare two texts
- See additions in green
- See deletions in red
- Multiple view modes

The quick brown fox jumps over the lazy dog.

Hello World this is amazing!`;
}

function loadSampleModified() {
  modifiedText.value = `Welcome to Diff Checker Pro

This is an updated sample text that demonstrates
how the diff checker works effectively.

Features:
- Compare two texts easily
- See additions in highlighted green
- See deletions in highlighted red
- Multiple view modes available
- Export diff results

The quick brown fox jumped over the lazy dog.

Hello Worlds this is more amazing!`;
}

function loadBothSamples() {
  loadSampleOriginal();
  setTimeout(() => {
    loadSampleModified();
  }, 50);
}

function copyDiff() {
  const diffText = unifiedDiffLines.value
    .map(line => {
      const prefix = line.type === 'added' ? '+' : line.type === 'removed' ? '-' : line.type === 'modified' ? '~' : ' ';
      return `${prefix} ${line.content}`;
    })
    .join('\n');
  
  navigator.clipboard.writeText(diffText);
  copiedDiff.value = true;
  setTimeout(() => {
    copiedDiff.value = false;
  }, 2000);
}

function downloadDiff() {
  const diffText = unifiedDiffLines.value
    .map(line => {
      const prefix = line.type === 'added' ? '+' : line.type === 'removed' ? '-' : line.type === 'modified' ? '~' : ' ';
      return `${prefix} ${line.content}`;
    })
    .join('\n');
  
  const blob = new Blob([diffText], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "diff-result.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

useHead({
  title: "Diff Checker | Dimar Hanung",
});
</script>
