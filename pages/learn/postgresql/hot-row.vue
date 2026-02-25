<script setup lang="ts">
type RowState = {
  id: number;
  queue: number[];
  active: number | null;
  value: number;
  completed: number;
  tps: number;
  loopId: number | null;
  jitterFactor: number;
};

// Simulation State
const isRunning = ref(false);
const concurrency = ref(5);
const processingTime = ref(100); // ms to process one update
const rowValue = ref(0);
const queue = ref<number[]>([]);
const activeTransaction = ref<number | null>(null);
const completedCount = ref(0);
const startTime = ref(0);

// Multi-row (sharded) simulation
const multiRowCount = ref(4);
const multiRowsState = reactive<RowState[]>([]);
const multiCompleted = ref(0);
const multiStartTime = ref(0);
const multiTps = ref(0);
const multiRequestSeq = ref(1);

// Metrics
const tps = ref(0);

const maxRowTps = computed(() =>
  Math.max(1, Math.floor(1000 / processingTime.value))
);
const estWaitMs = computed(() => {
  const writersAhead =
    queue.value.length + (activeTransaction.value !== null ? 1 : 0);
  return writersAhead * processingTime.value;
});

const multiQueueSize = computed(() =>
  multiRowsState.reduce((sum, row) => sum + row.queue.length, 0)
);
const multiActiveWriters = computed(
  () => multiRowsState.filter((row) => row.active !== null).length
);
const multiMaxRowTps = computed(() => multiRowCount.value * maxRowTps.value);
const multiEstWaitMs = computed(() => {
  if (multiRowCount.value === 0) return 0;
  const waiting = multiQueueSize.value + multiActiveWriters.value;
  return Math.round((waiting / multiRowCount.value) * processingTime.value);
});

let simulationLoopId: any = null;
let requestSeq = 1;

// Smooth arrival timer (Poisson-like inter-arrival)
let arrivalTimerId: any = null;

const expDelayMs = (meanMs: number) => {
  const u = Math.max(1e-9, Math.random());
  return -Math.log(u) * meanMs;
};

const scheduleArrivals = () => {
  if (!isRunning.value) return;

  // Keep the overall feel similar to the old "likes/tick" burst generator.
  // Old expected arrivals ~= (concurrency/2) per 200ms => ~2.5 * concurrency per second.
  const targetRps = Math.max(1, Math.round(concurrency.value * 2.5));
  const meanInterArrivalMs = 1000 / targetRps;

  const canEnqueueSingle = queue.value.length < 50;
  const canEnqueueMulti =
    multiQueueSize.value < 50 * Math.max(1, multiRowsState.length);

  if (canEnqueueSingle) {
    queue.value.push(requestSeq++);
  }

  if (canEnqueueMulti && multiRowsState.length > 0) {
    const target =
      multiRowsState[Math.floor(Math.random() * multiRowsState.length)];
    if (target && target.queue.length < 50) {
      target.queue.push(multiRequestSeq.value++);
    }
  }

  const jitteredDelay = Math.max(1, Math.round(expDelayMs(meanInterArrivalMs)));
  arrivalTimerId = setTimeout(scheduleArrivals, jitteredDelay);
};

const stopMultiLoops = () => {
  multiRowsState.forEach((row) => {
    if (row.loopId !== null) {
      cancelAnimationFrame(row.loopId);
      row.loopId = null;
    }
  });
};

const initMultiRows = () => {
  stopMultiLoops();
  multiRowsState.splice(0, multiRowsState.length);
  for (let i = 0; i < multiRowCount.value; i++) {
    multiRowsState.push({
      id: i + 1,
      queue: [],
      active: null,
      value: 0,
      completed: 0,
      tps: 0,
      loopId: null,
      // De-sync row completion so totals don't update in bursts
      // (mimics workers not starting at the exact same millisecond)
      jitterFactor: Math.random(),
    });
  }
};

const processRowQueue = (row: RowState) => {
  if (!isRunning.value) return;

  if (row.active === null && row.queue.length > 0) {
    const req = row.queue.shift();
    if (req !== undefined) {
      row.active = req;

      // Small jitter keeps totals smooth without making rows feel inconsistent.
      // Range: 0.95× .. 1.05× of processingTime.
      const delayMs = Math.max(
        1,
        Math.round(processingTime.value * (0.95 + row.jitterFactor * 0.1))
      );
      setTimeout(() => {
        if (!isRunning.value) {
          row.active = null;
          return;
        }
        row.value++;
        row.completed++;
        multiCompleted.value++;
        row.active = null;

        const elapsed = (Date.now() - multiStartTime.value) / 1000;
        if (elapsed > 0) {
          row.tps = Math.round(row.completed / elapsed);
          multiTps.value = Math.round(multiCompleted.value / elapsed);
        }

        processRowQueue(row);
      }, delayMs);
    }
  } else if (isRunning.value) {
    row.loopId = requestAnimationFrame(() => processRowQueue(row));
  }
};

const startSimulation = () => {
  if (isRunning.value) return;
  isRunning.value = true;
  rowValue.value = 0;
  queue.value = [];
  activeTransaction.value = null;
  completedCount.value = 0;
  startTime.value = Date.now();
  requestSeq = 1;

  multiCompleted.value = 0;
  multiStartTime.value = Date.now();
  multiTps.value = 0;
  multiRequestSeq.value = 1;
  initMultiRows();

  // Generate traffic (smooth RPS-style arrivals)
  if (arrivalTimerId) clearTimeout(arrivalTimerId);
  scheduleArrivals();

  processQueue();
  multiRowsState.forEach((row) => processRowQueue(row));
};

const processQueue = () => {
  if (!isRunning.value) return;

  if (activeTransaction.value === null && queue.value.length > 0) {
    const req = queue.value.shift();
    if (req !== undefined) {
      activeTransaction.value = req;
      setTimeout(() => {
        rowValue.value++;
        completedCount.value++;
        activeTransaction.value = null;
        const elapsed = (Date.now() - startTime.value) / 1000;
        if (elapsed > 0) {
          tps.value = Math.round(completedCount.value / elapsed);
        }
        processQueue();
      }, processingTime.value);
    }
  } else {
    // Just remove this assignment - it's not helping
    if (isRunning.value) {
      requestAnimationFrame(processQueue);
    }
  }
};

const stopSimulation = () => {
  isRunning.value = false;
  clearTimeout(arrivalTimerId);
  cancelAnimationFrame(simulationLoopId);
  activeTransaction.value = null;
  stopMultiLoops();
};

initMultiRows();

onUnmounted(() => {
  stopSimulation();
});

watch(multiRowCount, () => {
  initMultiRows();
  if (!isRunning.value) return;

  // Reset multi-row (sharded) state
  multiCompleted.value = 0;
  multiStartTime.value = Date.now();
  multiTps.value = 0;
  multiRequestSeq.value = 1;

  // Reset hot row state as well
  rowValue.value = 0;
  queue.value = [];
  activeTransaction.value = null;
  completedCount.value = 0;
  startTime.value = Date.now();
  requestSeq = 1;
  tps.value = 0;

  multiRowsState.forEach((row) => processRowQueue(row));
});
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-800 p-6 md:p-12 font-sans">
    <div class="max-w-4xl mx-auto space-y-12">
      <!-- Header -->
      <header class="text-center max-w-2xl mx-auto">
        <h1
          class="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight"
        >
          PostgreSQL
          <span
            class="text-transparent bg-clip-text bg-linear-to-r from-emerald-500 to-teal-600"
            >Hot Row</span
          >
          Bottleneck
        </h1>
        <p class="text-slate-600 leading-relaxed text-lg md:text-xl">
          Why adding more servers won't fix your database performance if
          everyone is fighting for the same row.
        </p>
      </header>

      <!-- Explanation Card -->
      <div class="bg-white p-8 rounded-2xl shadow-lg border-2 border-slate-200">
        <div class="flex items-start gap-4 mb-6">
          <div
            class="w-12 h-12 bg-gradient-to-br from-orange-100 to-blue-100 rounded-full flex items-center justify-center shrink-0"
          >
            <Icon name="mdi:alert-octagon" class="text-2xl text-orange-600" />
          </div>
          <div>
            <h3 class="font-bold text-slate-900 text-xl mb-2">
              The Hot Row Problem: A Chain Reaction
            </h3>
            <p class="text-slate-500 text-sm">
              Understanding the relationship between viral traffic and database
              bottlenecks
            </p>
          </div>
        </div>

        <div class="space-y-6">
          <!-- Step 1 -->
          <div class="flex gap-4">
            <div
              class="shrink-0 w-8 h-8 rounded-full bg-orange-100 text-orange-600 font-bold flex items-center justify-center text-sm"
            >
              1
            </div>
            <div>
              <h4
                class="font-semibold text-slate-900 mb-2 flex items-center gap-2"
              >
                The Scenario: Viral Traffic
                <Icon name="mdi:fire" class="text-orange-500" />
              </h4>
              <p class="text-slate-600 leading-relaxed">
                Imagine a viral tweet getting
                <strong>10,000 likes per second</strong>. Every single "Like"
                tries to update the <strong>same row</strong> in the database
                (<code class="text-xs bg-slate-100 px-2 py-1 rounded"
                  >UPDATE posts SET likes = likes + 1 WHERE id = 1</code
                >).
              </p>
            </div>
          </div>

          <!-- Arrow -->
          <div class="flex justify-center">
            <Icon name="mdi:arrow-down-thick" class="text-3xl text-slate-300" />
          </div>

          <!-- Step 2 -->
          <div class="flex gap-4">
            <div
              class="shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-sm"
            >
              2
            </div>
            <div>
              <h4
                class="font-semibold text-slate-900 mb-2 flex items-center gap-2"
              >
                The Database Response: Row-Level Locking
                <Icon name="mdi:shield-lock" class="text-blue-600" />
              </h4>
              <p class="text-slate-600 leading-relaxed">
                PostgreSQL locks the row to prevent data corruption. When User A
                updates the row, User B <strong>must wait</strong> for User A's
                transaction to complete before proceeding.
              </p>
            </div>
          </div>

          <!-- Arrow -->
          <div class="flex justify-center">
            <Icon name="mdi:arrow-down-thick" class="text-3xl text-slate-300" />
          </div>

          <!-- Step 3 -->
          <div class="flex gap-4">
            <div
              class="shrink-0 w-8 h-8 rounded-full bg-rose-100 text-rose-600 font-bold flex items-center justify-center text-sm"
            >
              3
            </div>
            <div>
              <h4
                class="font-semibold text-slate-900 mb-2 flex items-center gap-2"
              >
                The Bottleneck: Sequential Processing
                <Icon name="mdi:traffic-cone" class="text-rose-600" />
              </h4>
              <p class="text-slate-600 leading-relaxed">
                <strong class="text-rose-600"
                  >Because all updates must be applied to the same row and
                  cannot run in parallel</strong
                >, your massive incoming traffic gets forced into a
                <strong>single-file line</strong>. This creates a critical
                bottleneck where throughput is
                <strong>physically limited by sequential processing</strong> —
                no matter how many servers or CPUs you add, only one transaction
                can update the row at a time.
              </p>
            </div>
          </div>
        </div>

        <!-- Bottom highlight -->
        <div class="mt-6 pt-6 border-t border-slate-200">
          <div
            class="flex items-start gap-3 bg-rose-50 p-4 rounded-xl border border-rose-200"
          >
            <Icon
              name="mdi:alert-circle"
              class="text-rose-600 text-xl shrink-0 mt-0.5"
            />
            <p class="text-sm text-rose-900">
              <strong>Key Insight:</strong> The viral traffic (step 1) directly
              causes the locking behavior (step 2), which inevitably leads to
              the bottleneck (step 3). These aren't separate issues — they're a
              connected chain reaction.
            </p>
          </div>
        </div>

        <!-- Solution Section -->
        <div class="mt-6 pt-6 border-t-2 border-emerald-200">
          <div class="flex items-start gap-4 mb-4">
            <div
              class="w-10 h-10 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center shrink-0"
            >
              <Icon name="mdi:lightbulb-on" class="text-xl text-emerald-600" />
            </div>
            <div>
              <h4 class="font-bold text-slate-900 text-lg mb-1">
                The Solution: Sharding (Multi-Row Strategy)
              </h4>
              <p class="text-slate-500 text-sm">
                Breaking the sequential bottleneck with parallel processing
              </p>
            </div>
          </div>

          <div
            class="bg-emerald-50/50 p-5 rounded-xl border border-emerald-200 space-y-3"
          >
            <p class="text-slate-700 leading-relaxed">
              Instead of storing all likes in a
              <strong>single row</strong> (<code
                class="text-xs bg-white px-2 py-1 rounded"
                >likes = 10000</code
              >), split them across <strong>multiple rows</strong> (shards). For
              example:
            </p>

            <div
              class="bg-white p-4 rounded-lg border border-emerald-200 font-mono text-xs space-y-1"
            >
              <div class="text-slate-600">// Instead of one hot row:</div>
              <div class="text-rose-600">❌ Row 1: likes = 10,000</div>
              <div class="text-slate-600 mt-3">
                // Use multiple sharded rows:
              </div>
              <div class="text-emerald-600">✅ Row 1: likes = 2,500</div>
              <div class="text-emerald-600">✅ Row 2: likes = 2,500</div>
              <div class="text-emerald-600">✅ Row 3: likes = 2,500</div>
              <div class="text-emerald-600">✅ Row 4: likes = 2,500</div>
            </div>

            <div class="pt-3 space-y-2">
              <div class="flex items-start gap-3">
                <Icon
                  name="mdi:check-circle"
                  class="text-emerald-600 text-lg shrink-0 mt-0.5"
                />
                <p class="text-slate-700 text-sm">
                  <strong>Parallel Writes:</strong> Now 4 transactions can write
                  simultaneously to different rows — no more waiting in a
                  single-file line!
                </p>
              </div>
              <div class="flex items-start gap-3">
                <Icon
                  name="mdi:check-circle"
                  class="text-emerald-600 text-lg shrink-0 mt-0.5"
                />
                <p class="text-slate-700 text-sm">
                  <strong>Scalable Throughput:</strong> Each row handles its own
                  lock independently, multiplying your total TPS by the number
                  of shards (4× throughput with 4 shards).
                </p>
              </div>
              <div class="flex items-start gap-3">
                <Icon
                  name="mdi:check-circle"
                  class="text-emerald-600 text-lg shrink-0 mt-0.5"
                />
                <p class="text-slate-700 text-sm">
                  <strong>Total Count:</strong> When you need the final count,
                  simply
                  <code class="text-xs bg-white px-2 py-1 rounded">SUM()</code>
                  all shard values:
                  <code class="text-xs bg-white px-2 py-1 rounded"
                    >SELECT SUM(likes) FROM post_likes WHERE post_id = 1</code
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Simulation Card -->
      <div
        class="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl shadow-slate-200/50 overflow-hidden relative"
      >
        <!-- Background decoration -->
        <div
          class="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-emerald-50 to-transparent rounded-bl-full opacity-50 pointer-events-none"
        ></div>

        <div
          class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6 relative z-10"
        >
          <div>
            <h2 class="text-2xl font-bold text-slate-900 tracking-tight">
              Interactive Simulation
            </h2>
            <p class="text-slate-500 mt-1">
              Visualize the lock contention in real-time
            </p>
          </div>
          <button
            @click="isRunning ? stopSimulation() : startSimulation()"
            :class="
              isRunning
                ? 'bg-rose-500 hover:bg-rose-600 text-white'
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            "
            class="px-8 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-2"
          >
            <span v-if="!isRunning" class="flex items-center gap-2">
              <Icon name="mdi:play" />
              Start Simulation
            </span>
            <span v-else class="flex items-center gap-2">
              <Icon name="mdi:stop" />
              Stop
            </span>
          </button>
        </div>

        <!-- Controls -->
        <div
          class="grid grid-cols-1 gap-8 mb-10 bg-slate-50 p-6 rounded-2xl border border-slate-100"
        >
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <label class="font-semibold text-slate-700"
                >Incoming Likes (Traffic)</label
              >
              <div class="flex gap-2">
                <span
                  class="text-xs font-mono bg-emerald-100 text-emerald-700 px-2 py-1 rounded"
                  >{{ concurrency }} likes/tick</span
                >
                <span
                  class="text-xs font-mono bg-orange-100 text-orange-700 px-2 py-1 rounded"
                  >{{ rowValue }} likes</span
                >
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="200"
              v-model.number="concurrency"
              class="w-full accent-emerald-500 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            />
            <div
              class="flex justify-between text-xs text-slate-400 font-medium"
            >
              <span>Low Traffic</span>
              <span>Viral Traffic</span>
            </div>
          </div>
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <label class="font-semibold text-slate-700">Rows Available</label>
              <div class="flex gap-2">
                <span
                  class="text-xs font-mono bg-blue-100 text-blue-700 px-2 py-1 rounded"
                  >{{ multiRowCount }} rows</span
                >
                <span
                  class="text-xs font-mono bg-green-100 text-green-700 px-2 py-1 rounded"
                  >{{ multiCompleted }} likes</span
                >
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="8"
              v-model.number="multiRowCount"
              class="w-full accent-blue-500 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            />
            <div
              class="flex justify-between text-xs text-slate-400 font-medium"
            >
              <span>Single hot row</span>
              <span>Sharded across many</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Hot Row Stats -->
      <div
        class="mt-10 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
      >
        <div
          class="flex flex-col md:flex-row md:items-center md:justify-between gap-3"
        >
          <div>
            <p class="text-sm font-semibold text-slate-900">
              Hot row (single row lock)
            </p>
            <p class="text-xs text-slate-500">
              All incoming likes update the
              <span class="font-semibold">same row</span>, causing
              serialization.
            </p>
          </div>
          <div
            class="text-[11px] font-bold px-2.5 py-1 rounded-full border bg-orange-50 text-orange-700 border-orange-200"
          >
            Single point of contention
          </div>
        </div>

        <!-- Query Example -->
        <div class="mt-5 bg-slate-50 border border-slate-200 rounded-xl p-4">
          <div class="flex items-center gap-2 mb-2">
            <Icon name="mdi:code-tags" class="text-slate-600 text-lg" />
            <span
              class="text-xs font-semibold text-slate-700 uppercase tracking-wide"
              >Query Example</span
            >
          </div>
          <div
            class="bg-slate-900 rounded-lg p-4 font-mono text-xs text-slate-100 overflow-x-auto"
          >
            <pre class="text-slate-100">
-- Every like increments the SAME row
UPDATE posts
SET likes = likes + 1
WHERE id = 1;

-- ⚠️ All transactions compete for Row 1's lock</pre
            >
          </div>
        </div>

        <div
          class="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
        >
          <table class="w-full text-sm text-left">
            <thead
              class="bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100"
            >
              <tr>
                <th class="px-4 py-3">Row ID</th>
                <th class="px-4 py-3">Status</th>
                <th class="px-4 py-3 text-right">Likes</th>
                <th class="px-4 py-3 text-right">Queue</th>
                <th class="px-4 py-3 text-right">TPS</th>
                <th class="px-4 py-3 text-right">Est. Wait</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr class="hover:bg-slate-50/50 transition-colors">
                <td class="px-4 py-2.5 font-medium text-slate-900">Row 1</td>
                <td class="px-4 py-2.5">
                  <span
                    class="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                    :class="
                      activeTransaction
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    "
                  >
                    {{ activeTransaction ? "LOCKED" : "FREE" }}
                  </span>
                </td>
                <td class="px-4 py-2.5 text-right font-mono text-slate-900">
                  {{ rowValue }}
                </td>
                <td class="px-4 py-2.5 text-right">
                  <div class="flex items-center justify-end gap-2">
                    <span class="font-mono font-semibold text-slate-800">{{
                      queue.length
                    }}</span>
                    <div
                      class="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden hidden sm:block"
                    >
                      <div
                        class="h-full bg-amber-400 transition-all duration-300"
                        :style="{
                          width: `${Math.min(100, queue.length * 6)}%`,
                        }"
                      ></div>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-2.5 text-right font-mono text-slate-800">
                  {{ tps }}
                </td>
                <td class="px-4 py-2.5 text-right font-mono text-slate-500">
                  {{ estWaitMs }}ms
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Multi-row comparison -->
      <div
        class="mt-10 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
      >
        <div
          class="flex flex-col md:flex-row md:items-center md:items-center md:justify-between gap-3"
        >
          <div>
            <p class="text-sm font-semibold text-slate-900">
              Multi-row (sharded) simulation
            </p>
            <p class="text-xs text-slate-500">
              Same traffic as above, but likes are spread across
              <span class="font-semibold">{{ multiRowCount }}</span> rows.
            </p>
          </div>
          <div
            class="text-[11px] font-bold px-2.5 py-1 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200"
          >
            Parallel writers reduce lock wait
          </div>
        </div>

        <!-- Query Example -->
        <div class="mt-5 bg-slate-50 border border-slate-200 rounded-xl p-4">
          <div class="flex items-center gap-2 mb-2">
            <Icon name="mdi:code-tags" class="text-slate-600 text-lg" />
            <span
              class="text-xs font-semibold text-slate-700 uppercase tracking-wide"
              >Query Examples</span
            >
          </div>
          <div class="space-y-3">
            <div
              class="bg-slate-900 rounded-lg p-4 font-mono text-xs text-slate-100 overflow-x-auto"
            >
              <pre class="text-slate-100">
-- Increment a RANDOM shard (parallel writes!)
UPDATE post_likes
SET likes = likes + 1
WHERE post_id = 1
  AND shard_id = {{ Math.floor(Math.random() * multiRowCount) + 1 }};

-- ✅ Each shard has its own lock</pre
              >
            </div>
            <div
              class="bg-slate-900 rounded-lg p-4 font-mono text-xs text-slate-100 overflow-x-auto"
            >
              <pre class="text-slate-100">
-- Get total likes by summing all shards
SELECT SUM(likes) AS total_likes
FROM post_likes
WHERE post_id = 1;</pre
              >
            </div>
          </div>
        </div>

        <div
          class="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
        >
          <table class="w-full text-sm text-left">
            <thead
              class="bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100"
            >
              <tr>
                <th class="px-4 py-3 text-center">Total Queue</th>
                <th class="px-4 py-3 text-center">Active Writers</th>
                <th class="px-4 py-3 text-center">Measured TPS</th>
                <th class="px-4 py-3 text-center">Theoretical Cap</th>
                <th class="px-4 py-3 text-center">Total Likes</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr class="hover:bg-slate-50/50 transition-colors">
                <td
                  class="px-4 py-2.5 text-center font-mono font-bold text-slate-900"
                >
                  {{ multiQueueSize }}
                </td>
                <td
                  class="px-4 py-2.5 text-center font-mono font-bold text-slate-900"
                >
                  {{ multiActiveWriters }}
                </td>
                <td
                  class="px-4 py-2.5 text-center font-mono font-bold text-slate-900"
                >
                  {{ multiTps }}
                </td>
                <td
                  class="px-4 py-2.5 text-center font-mono font-bold text-slate-900"
                >
                  {{ multiMaxRowTps }} TPS
                </td>
                <td
                  class="px-4 py-2.5 text-center font-mono font-bold text-slate-900"
                >
                  {{ multiCompleted }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-4 text-xs text-slate-600 leading-relaxed">
          With more rows to spread the writes, Postgres can run several locks in
          parallel. Queue size per row shrinks and total throughput climbs
          toward roughly <span class="font-mono">rows × per-row-TPS</span>.
        </div>

        <div
          class="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
        >
          <table class="w-full text-sm text-left">
            <thead
              class="bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100"
            >
              <tr>
                <th class="px-4 py-3">Row ID</th>
                <th class="px-4 py-3">Status</th>
                <th class="px-4 py-3 text-right">Likes</th>
                <th class="px-4 py-3 text-right">Queue</th>
                <th class="px-4 py-3 text-right">TPS</th>
                <th class="px-4 py-3 text-right">Est. Wait</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr
                v-for="row in multiRowsState"
                :key="row.id"
                class="hover:bg-slate-50/50 transition-colors"
              >
                <td class="px-4 py-2.5 font-medium text-slate-900">
                  Row {{ row.id }}
                </td>
                <td class="px-4 py-2.5">
                  <span
                    class="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                    :class="
                      row.active
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    "
                  >
                    {{ row.active ? "LOCKED" : "FREE" }}
                  </span>
                </td>
                <td class="px-4 py-2.5 text-right font-mono text-slate-900">
                  {{ row.value }}
                </td>
                <td class="px-4 py-2.5 text-right">
                  <div class="flex items-center justify-end gap-2">
                    <span class="font-mono font-semibold text-slate-800">{{
                      row.queue.length
                    }}</span>
                    <div
                      class="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden hidden sm:block"
                    >
                      <div
                        class="h-full bg-amber-400 transition-all duration-300"
                        :style="{
                          width: `${Math.min(100, row.queue.length * 6)}%`,
                        }"
                      ></div>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-2.5 text-right font-mono text-slate-800">
                  {{ row.tps }}
                </td>
                <td class="px-4 py-2.5 text-right font-mono text-slate-500">
                  {{ multiEstWaitMs }}ms
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div
        class="mt-8 p-5 bg-blue-50/50 border border-blue-100 rounded-2xl text-sm text-slate-600 flex gap-4 items-start"
      >
        <div class="bg-blue-100 p-2 rounded-lg text-blue-600 shrink-0">
          <Icon name="mdi:information" class="text-xl" />
        </div>
        <div class="space-y-1">
          <p class="font-semibold text-slate-900">Observation</p>
          <p>
            Try increasing the <strong>Incoming Likes</strong>. Notice how the
            queue explodes but TPS stays flat? That's the bottleneck: updates to
            the same row are serialized, so throughput is capped at roughly
            <code>1000ms / write-time</code> likes per second for this one post.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
