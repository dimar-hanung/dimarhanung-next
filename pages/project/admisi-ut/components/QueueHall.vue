<template>
  <section class="qhall" aria-labelledby="qhall-heading">
    <div class="qhall__header">
      <div class="qhall__header-copy">
        <h2 id="qhall-heading" class="qhall-title">The lobby, miniaturized</h2>
        <p class="qhall-intro">
          Admission works like a lobby: take a number, watch the board, and
          move counter to counter until you are a student. Try it — this queue
          moves at your pace.
        </p>
      </div>
      <figure class="qhall__art">
        <img
          :src="art.src"
          :alt="art.alt"
          class="qhall__art-img"
          loading="lazy"
          decoding="async"
        />
      </figure>
    </div>

    <div class="qhall__machine">
      <div class="qboard" aria-hidden="true">
        <div class="qboard__top">
          <span class="qboard__brand">ADMISI UT · LOBBY</span>
          <span class="qboard__lamps">
            <span
              v-for="(counter, i) in counters"
              :key="counter.name"
              class="qlamp"
              :class="lampClass(i)"
            ></span>
          </span>
        </div>
        <div :key="ledKey" class="qboard__screen">
          <p class="qboard__label">Now serving</p>
          <p class="qboard__number" :class="{ 'qboard__number--word': phase === 'done' }">
            {{ ledMain }}
          </p>
          <p class="qboard__counter">{{ ledSub }}</p>
        </div>
        <div class="qticker">
          <div class="qticker__track">
            <span v-for="n in 2" :key="n" class="qticker__text">{{ tickerText }}</span>
          </div>
        </div>
      </div>

      <div class="qhall__floor">
        <div class="qhall__controls">
          <button type="button" class="qbutton" @click="advance">
            <span class="qbutton__dot" aria-hidden="true"></span>
            {{ buttonLabel }}
          </button>
          <p class="qhall__status" aria-live="polite">{{ statusLine }}</p>
        </div>

        <div class="qslot" :class="{ 'qslot--open': phase !== 'idle' }">
          <div class="qslot__inner" :aria-hidden="phase === 'idle'">
            <div class="qslot__lip" aria-hidden="true"></div>
            <div class="qticket" :key="ticketNo">
              <p class="qticket__brand">ADMISI UT</p>
              <p class="qticket__sub">Admission lobby · queue ticket</p>
              <p class="qticket__number">{{ ticketNo }}</p>
              <div class="qticket__tear-line" aria-hidden="true"></div>
              <ol class="qticket__steps">
                <li
                  v-for="(counter, i) in counters"
                  :key="counter.name"
                  class="qticket__step"
                  :class="stepClass(i)"
                >
                  <span class="qticket__mark" aria-hidden="true">
                    <svg
                      v-if="isStepDone(i)"
                      viewBox="0 0 16 16"
                      class="qticket__check"
                    >
                      <path
                        d="M3 8.5 6.5 12 13 4.5"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                  <span class="qticket__step-name">{{ counter.name }}</span>
                  <span class="qticket__step-state">{{ stepState(i) }}</span>
                </li>
              </ol>
              <div class="qticket__barcode" aria-hidden="true"></div>
              <p class="qticket__foot">
                {{ phase === "done" ? "Welcome to Universitas Terbuka" : "Keep this number · admisi-sia.ut.ac.id" }}
              </p>
            </div>
            <div class="qticket__teeth" aria-hidden="true"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { admisiIllustrations } from "../illustrations";

const art = admisiIllustrations.lobby;

const counters = [
  { name: "Register" },
  { name: "Admission bill" },
  { name: "Personal data" },
  { name: "Study program" },
  { name: "Documents" },
  { name: "Student number" },
] as const;

type Phase = "idle" | "queuing" | "done";

const phase = ref<Phase>("idle");
const current = ref(0);
const ticketNo = ref("");

const tickerText =
  "WELCOME TO ADMISI UT · PLEASE TAKE A NUMBER · HAVE YOUR DOCUMENTS READY · SIX COUNTERS OPEN FOR NEW STUDENTS · ";

const buttonLabel = computed(() => {
  if (phase.value === "idle") return "Take a number";
  if (phase.value === "done") return "Start over";
  return "Next counter";
});

const ledMain = computed(() => {
  if (phase.value === "idle") return "––––";
  if (phase.value === "done") return "WELCOME";
  return ticketNo.value;
});

const ledSub = computed(() => {
  if (phase.value === "idle") return "PLEASE TAKE A NUMBER";
  if (phase.value === "done") return "YOU ARE NOW A STUDENT";
  const counter = counters[current.value - 1];
  return `COUNTER ${current.value} OF ${counters.length} · ${counter.name}`;
});

const ledKey = computed(() => `${phase.value}-${current.value}-${ticketNo.value}`);

const statusLine = computed(() => {
  if (phase.value === "idle") {
    return "Six counters, one ticket. Press the button to join the queue.";
  }
  if (phase.value === "done") {
    return "Queue complete. The last counter hands over a student number.";
  }
  const counter = counters[current.value - 1];
  return `Serving ${ticketNo.value} at counter ${current.value} of ${counters.length}: ${counter.name}.`;
});

function advance() {
  if (phase.value === "idle") {
    ticketNo.value = `A ${Math.floor(Math.random() * 900) + 100}`;
    current.value = 1;
    phase.value = "queuing";
    return;
  }
  if (phase.value === "done") {
    phase.value = "idle";
    current.value = 0;
    ticketNo.value = "";
    return;
  }
  if (current.value < counters.length) {
    current.value += 1;
    return;
  }
  phase.value = "done";
}

function isStepDone(index: number) {
  if (phase.value === "done") return true;
  if (phase.value !== "queuing") return false;
  return index + 1 < current.value;
}

function stepState(index: number) {
  if (isStepDone(index)) return "done";
  if (phase.value === "queuing" && index + 1 === current.value) return "serving";
  return "waiting";
}

function stepClass(index: number) {
  return {
    "qticket__step--done": isStepDone(index),
    "qticket__step--serving":
      phase.value === "queuing" && index + 1 === current.value,
  };
}

function lampClass(index: number) {
  return {
    "qlamp--done": phase.value === "done" || index + 1 < current.value,
    "qlamp--now": phase.value === "queuing" && index + 1 === current.value,
  };
}
</script>

<style scoped>
.qhall {
  --qh-board: #0e1511;
  --qh-led: #ffb547;
  --qh-led-dim: #2c3a31;
  --qh-paper: #fdfdfb;
}

.qhall__header {
  display: grid;
  gap: 1.25rem;
  align-items: center;
  margin-bottom: 1.5rem;
}

.qhall-title {
  font-family: var(--admisi-font-display);
  font-size: 1.85rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--admisi-ink);
  margin-bottom: 0.75rem;
}

.qhall-intro {
  font-family: var(--admisi-font-body);
  font-size: 1rem;
  line-height: 1.6;
  color: var(--admisi-muted);
  max-width: 38rem;
}

.qhall__art {
  margin: 0;
  width: min(100%, 15rem);
  justify-self: center;
}

.qhall__art-img {
  display: block;
  width: 100%;
  height: auto;
  max-height: 11rem;
  object-fit: contain;
}

.qhall__machine {
  border: 1px solid var(--admisi-line);
  border-radius: 0.75rem;
  background: #ffffff;
  overflow: hidden;
}

.qboard {
  background: var(--qh-board);
  padding: 1.25rem 1.25rem 0;
  color: var(--qh-led);
}

.qboard__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 0.85rem;
}

.qboard__brand {
  font-family: var(--admisi-font-mono);
  font-size: 1rem;
  letter-spacing: 0.14em;
  color: color-mix(in srgb, var(--qh-led) 72%, transparent);
}

.qboard__lamps {
  display: flex;
  gap: 0.45rem;
}

.qlamp {
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 999px;
  background: var(--qh-led-dim);
}

.qlamp--done {
  background: var(--qh-led);
}

.qlamp--now {
  background: var(--qh-led);
  animation: qlamp-blink 1.1s steps(2, jump-none) infinite;
}

@keyframes qlamp-blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.25;
  }
}

.qboard__screen {
  border-top: 1px solid color-mix(in srgb, var(--qh-led) 22%, transparent);
  padding: 1.1rem 0 1.2rem;
  text-align: center;
  animation: qled-in 220ms steps(2, jump-none);
}

@keyframes qled-in {
  0% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
  }
}

.qboard__label {
  font-family: var(--admisi-font-mono);
  font-size: 1rem;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--qh-led) 68%, transparent);
}

.qboard__number {
  font-family: var(--admisi-font-mono);
  font-size: clamp(2.75rem, 8vw, 4.25rem);
  font-weight: 700;
  letter-spacing: 0.08em;
  line-height: 1.1;
  margin-top: 0.35rem;
  text-shadow: 0 0 14px color-mix(in srgb, var(--qh-led) 38%, transparent);
}

.qboard__number--word {
  font-size: clamp(2rem, 6vw, 3.25rem);
}

.qboard__counter {
  font-family: var(--admisi-font-mono);
  font-size: 1rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin-top: 0.5rem;
  color: color-mix(in srgb, var(--qh-led) 85%, transparent);
}

.qticker {
  overflow: hidden;
  border-top: 1px solid color-mix(in srgb, var(--qh-led) 22%, transparent);
  padding: 0.55rem 0;
  margin-inline: -1.25rem;
}

.qticker__track {
  display: flex;
  width: max-content;
  animation: qticker-run 26s linear infinite;
}

.qticker__text {
  font-family: var(--admisi-font-mono);
  font-size: 1rem;
  letter-spacing: 0.14em;
  white-space: nowrap;
  color: color-mix(in srgb, var(--qh-led) 62%, transparent);
}

@keyframes qticker-run {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.qhall__floor {
  display: grid;
  gap: 1.5rem;
  padding: 1.5rem 1.25rem 1.75rem;
}

.qhall__controls {
  display: grid;
  gap: 0.9rem;
  align-content: start;
  justify-items: start;
}

.qbutton {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  min-height: 3rem;
  padding: 0.8rem 1.5rem;
  border: 0;
  border-radius: 999px;
  background: var(--admisi-green);
  color: #f4fbf7;
  font-family: var(--admisi-font-body);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 150ms ease-out,
    transform 120ms ease-out;
}

.qbutton__dot {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 999px;
  background: currentColor;
}

.qbutton:hover {
  background: color-mix(in srgb, var(--admisi-green) 86%, black);
}

.qbutton:active {
  transform: scale(0.97);
}

.qbutton:focus-visible {
  outline: 2px solid var(--admisi-ink);
  outline-offset: 3px;
}

.qhall__status {
  font-family: var(--admisi-font-mono);
  font-size: 1rem;
  line-height: 1.55;
  color: var(--admisi-muted);
  max-width: 24rem;
}

.qslot {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 550ms cubic-bezier(0.22, 1, 0.36, 1);
}

.qslot--open {
  grid-template-rows: 1fr;
}

.qslot__inner {
  overflow: hidden;
  min-height: 0;
}

.qslot__lip {
  width: min(100%, 19rem);
  margin-inline: auto;
  height: 0.55rem;
  border-radius: 999px;
  background: var(--admisi-ink);
}

.qticket {
  width: min(100%, 19rem);
  margin: 0.35rem auto 0;
  background: var(--qh-paper);
  border: 1px solid color-mix(in srgb, var(--admisi-ink) 14%, transparent);
  border-bottom: 0;
  border-radius: 0.25rem 0.25rem 0 0;
  padding: 1.1rem 1.15rem 1.15rem;
  font-family: var(--admisi-font-mono);
  color: var(--admisi-ink);
  box-shadow: 0 14px 28px color-mix(in srgb, var(--admisi-ink) 10%, transparent);
}

.qticket__brand {
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-align: center;
}

.qticket__sub {
  font-size: 1rem;
  color: var(--admisi-muted);
  text-align: center;
  margin-top: 0.15rem;
}

.qticket__number {
  font-size: 2.1rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-align: center;
  margin: 0.65rem 0 0.8rem;
}

.qticket__tear-line {
  border-top: 2px dashed color-mix(in srgb, var(--admisi-ink) 26%, transparent);
  margin-bottom: 0.85rem;
}

.qticket__steps {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.5rem;
}

.qticket__step {
  display: grid;
  grid-template-columns: 1.15rem minmax(0, 1fr) auto;
  align-items: center;
  gap: 0.55rem;
  font-size: 1rem;
}

.qticket__mark {
  width: 1.05rem;
  height: 1.05rem;
  border: 1.5px solid color-mix(in srgb, var(--admisi-ink) 34%, transparent);
  border-radius: 0.2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #f4fbf7;
}

.qticket__check {
  width: 0.75rem;
  height: 0.75rem;
}

.qticket__step--done .qticket__mark {
  background: var(--admisi-green);
  border-color: var(--admisi-green);
}

.qticket__step--serving .qticket__step-name {
  font-weight: 700;
}

.qticket__step-state {
  color: var(--admisi-muted);
}

.qticket__step--done .qticket__step-state {
  color: var(--admisi-green);
}

.qticket__step--serving .qticket__step-state {
  color: var(--admisi-ink);
  font-weight: 700;
}

.qticket__barcode {
  height: 2.4rem;
  margin-top: 1rem;
  background:
    repeating-linear-gradient(
      90deg,
      var(--admisi-ink) 0 2px,
      transparent 2px 5px
    ),
    repeating-linear-gradient(
      90deg,
      var(--admisi-ink) 0 1px,
      transparent 1px 9px
    );
  background-blend-mode: multiply;
}

.qticket__foot {
  font-size: 1rem;
  text-align: center;
  color: var(--admisi-muted);
  margin-top: 0.7rem;
}

.qticket__teeth {
  width: min(100%, 19rem);
  margin-inline: auto;
  height: 0.55rem;
  background: conic-gradient(
      from 135deg at 50% 0,
      var(--qh-paper) 90deg,
      transparent 0
    )
    0 0 / 0.9rem 100% repeat-x;
}

@media (min-width: 768px) {
  .qhall__header {
    grid-template-columns: minmax(0, 1fr) minmax(10rem, 15rem);
    gap: 2rem;
  }

  .qhall__art {
    width: 100%;
    justify-self: end;
  }

  .qhall__floor {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    align-items: start;
    padding: 1.75rem 1.75rem 2rem;
  }

  .qhall__status {
    max-width: 20rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .qslot {
    transition: none;
  }

  .qticker__track {
    animation: none;
  }

  .qlamp--now {
    animation: none;
  }

  .qboard__screen {
    animation: none;
  }

  .qbutton:active {
    transform: none;
  }
}
</style>
