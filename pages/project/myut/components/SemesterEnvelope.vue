<template>
  <section class="envelope" aria-labelledby="envelope-heading">
    <div class="envelope__intro">
      <div class="envelope__copy">
        <h2 id="envelope-heading" class="envelope__title">
          Semester by postmark
        </h2>
        <p class="envelope__lead">
          Distance students still wait on a parcel of printed modules. Cancel a
          stamp to open that stop in a semester. High level only. No internal
          rules.
        </p>
      </div>
      <MyutIllustration
        class="envelope__art"
        variant="flush"
        :src="myutIllustrations.delivery.src"
        :alt="myutIllustrations.delivery.alt"
      />
    </div>

    <div class="envelope__board">
      <div class="envelope__sheet">
        <p class="envelope__postmark-label" aria-hidden="true">
          MyUT · UT Daerah
        </p>

        <div
          class="envelope__stamps"
          role="tablist"
          aria-label="Semester stops"
        >
          <button
            v-for="(stop, index) in stops"
            :key="stop.id"
            type="button"
            role="tab"
            class="stamp"
            :class="{ 'stamp--active': activeId === stop.id }"
            :aria-selected="activeId === stop.id"
            :aria-controls="`letter-${stop.id}`"
            :style="{ '--stamp-rotate': stop.tilt }"
            @click="selectStop(index)"
            @keydown.left.prevent="move(-1)"
            @keydown.right.prevent="move(1)"
            @keydown.home.prevent="selectStop(0)"
            @keydown.end.prevent="selectStop(stops.length - 1)"
          >
            <span class="stamp__icon-wrap" aria-hidden="true">
              <img :src="stop.icon" alt="" class="stamp__icon" />
            </span>
            <span class="stamp__name">{{ stop.short }}</span>
            <span
              class="stamp__cancel"
              :class="{ 'stamp__cancel--on': activeId === stop.id }"
              aria-hidden="true"
            />
          </button>
        </div>

        <article
          :id="`letter-${activeStop.id}`"
          class="letter"
          aria-live="polite"
        >
          <p class="letter__from">From the semester desk</p>
          <h3 class="envelope__title envelope__title--small">
            {{ activeStop.title }}
          </h3>
          <p class="envelope__body">{{ activeStop.summary }}</p>
          <ul class="letter__points">
            <li v-for="point in activeStop.points" :key="point">
              {{ point }}
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import MyutIllustration from "./MyutIllustration.vue";
import { myutIcons, myutIllustrations } from "../illustrations";

const stops = [
  {
    id: "register",
    short: "Register",
    title: "Register courses",
    tilt: "-3deg",
    icon: myutIcons.calendar,
    summary:
      "At the start of a term, students pick or confirm the courses they will take, then continue to billing.",
    points: [
      "Opens from the student dashboard after login",
      "Shows the current term, not a full academic archive",
      "Address for printed modules is confirmed here",
    ],
  },
  {
    id: "pay",
    short: "Pay",
    title: "Pay the term bill",
    tilt: "2deg",
    icon: myutIcons.wallet,
    summary:
      "Once courses are in, a bill appears. Payment status is the gate to the rest of the term.",
    points: [
      "Shows amount and whether the bill is still open",
      "Payment happens through supported channels outside this demo",
      "Cleared billing is what counts as a registered semester",
    ],
  },
  {
    id: "parcel",
    short: "Modules",
    title: "Track printed modules",
    tilt: "-1deg",
    icon: myutIcons.package,
    summary:
      "Universitas Terbuka still mails printed learning materials. Students can see whether a parcel is on the way.",
    points: [
      "Uses the address saved during registration",
      "Digital copies sit in the library as a parallel path",
      "This demo does not show courier systems or tracking codes",
    ],
  },
  {
    id: "tutorial",
    short: "Tutorial",
    title: "Join tutorials",
    tilt: "3deg",
    icon: myutIcons.book,
    summary:
      "After registration, students activate and enter online tutorials, with optional face-to-face sessions at a regional office.",
    points: [
      "Online tutorials live in the e-learning campus",
      "Schedules for in-person sessions are listed in MyUT",
      "SSO carries the campus login across those tools",
    ],
  },
  {
    id: "exam",
    short: "Exam",
    title: "Sit exams, read grades",
    tilt: "-2deg",
    icon: myutIcons.exam,
    summary:
      "When the term closes, students print or show an exam pass, then come back here for results.",
    points: [
      "Exam location or online slot is chosen during registration",
      "Grade lists and the academic recap live under the exam menu",
      "Exact exam schemes stay out of this page on purpose",
    ],
  },
  {
    id: "ask",
    short: "Ask",
    title: "Ask the campus assistant",
    tilt: "1deg",
    icon: myutIcons.chat,
    summary:
      "MYRA is an in-portal assistant for campus how-tos and, when enabled, for studying a course module.",
    points: [
      "Answers from published campus guidance, not private records",
      "Students can keep a chat history in their own session",
      "This page does not connect to the live assistant",
    ],
  },
];

const activeIndex = ref(0);

const activeId = computed(() => stops[activeIndex.value].id);
const activeStop = computed(() => stops[activeIndex.value]);

function selectStop(index: number) {
  activeIndex.value = index;
}

function move(delta: number) {
  const next = (activeIndex.value + delta + stops.length) % stops.length;
  selectStop(next);
}
</script>

<style scoped>
.envelope {
  display: grid;
  gap: 1.5rem;
}

.envelope__intro {
  display: grid;
  gap: 1.25rem;
  align-items: center;
}

.envelope__title {
  font-family: var(--myut-font-display);
  font-size: 1.85rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--myut-ink);
}

.envelope__title--small {
  font-size: 1.45rem;
  margin-bottom: 0.55rem;
}

.envelope__lead,
.envelope__body {
  font-family: var(--myut-font-body);
  font-size: 1rem;
  line-height: 1.65;
  color: var(--myut-muted);
}

.envelope__lead {
  margin-top: 0.55rem;
  max-width: 38rem;
}

.envelope__art {
  width: min(100%, 16rem);
  justify-self: center;
}

.envelope__board {
  border-radius: 0.45rem;
  border: 1px solid color-mix(in srgb, var(--myut-navy) 18%, transparent);
  background:
    radial-gradient(
      ellipse 70% 50% at 80% 0%,
      color-mix(in srgb, var(--myut-amber) 18%, transparent),
      transparent 60%
    ),
    var(--myut-kraft);
  padding: 1rem;
}

.envelope__sheet {
  position: relative;
  padding: 1.1rem 1rem 1.25rem;
  border-radius: 0.2rem 0.45rem 0.45rem 0.2rem;
  background: var(--myut-letter);
  border: 1px solid color-mix(in srgb, var(--myut-navy) 14%, transparent);
  box-shadow:
    0 1px 0 color-mix(in srgb, var(--myut-ink) 6%, transparent),
    8px 14px 0 color-mix(in srgb, var(--myut-navy) 8%, transparent);
}

.envelope__postmark-label {
  font-family: var(--myut-font-display);
  font-size: 1rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--myut-navy) 45%, var(--myut-letter));
  margin-bottom: 0.85rem;
}

.envelope__stamps {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-bottom: 1.15rem;
}

.stamp {
  position: relative;
  display: grid;
  justify-items: center;
  gap: 0.35rem;
  min-width: 6.5rem;
  min-height: 5.5rem;
  padding: 0.7rem 0.55rem 0.55rem;
  border: 2px dashed color-mix(in srgb, var(--myut-navy) 28%, transparent);
  border-radius: 0.2rem;
  background: #fffdf6;
  color: var(--myut-ink);
  cursor: pointer;
  transform: rotate(var(--stamp-rotate, 0deg));
  transition:
    background-color 140ms ease-out,
    border-color 140ms ease-out,
    transform 140ms ease-out;
}

.stamp:hover {
  border-color: var(--myut-navy);
  background: #fff;
}

.stamp:focus-visible {
  outline: 2px solid var(--myut-vermillion);
  outline-offset: 3px;
}

.stamp:active {
  transform: rotate(var(--stamp-rotate, 0deg)) scale(0.97);
}

.stamp--active {
  border-style: solid;
  border-color: var(--myut-vermillion);
  background: color-mix(in srgb, var(--myut-amber) 16%, #fffdf6);
}

.stamp__icon-wrap {
  width: 1.75rem;
  height: 1.75rem;
}

.stamp__icon {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.stamp__name {
  font-family: var(--myut-font-body);
  font-size: 1rem;
  font-weight: 600;
}

.stamp__cancel {
  position: absolute;
  top: 0.15rem;
  right: 0.15rem;
  width: 1.15rem;
  height: 1.15rem;
  border-radius: 50%;
  border: 3px solid var(--myut-vermillion);
  box-shadow: inset 0 0 0 2px color-mix(in srgb, var(--myut-vermillion) 40%, transparent);
  transform: rotate(-18deg) scale(0.92);
  opacity: 0;
  pointer-events: none;
}

.stamp__cancel--on {
  opacity: 1;
}

.letter {
  padding-top: 1rem;
  border-top: 1px dashed color-mix(in srgb, var(--myut-navy) 22%, transparent);
}

.letter__from {
  font-family: var(--myut-font-body);
  font-size: 1rem;
  color: var(--myut-vermillion);
  margin-bottom: 0.35rem;
}

.letter__points {
  display: grid;
  gap: 0.45rem;
  margin-top: 0.85rem;
  padding-left: 1.15rem;
  font-family: var(--myut-font-body);
  font-size: 1rem;
  line-height: 1.55;
  color: var(--myut-ink);
}

@media (min-width: 768px) {
  .envelope__intro {
    grid-template-columns: minmax(0, 1fr) minmax(10rem, 16rem);
    gap: 2rem;
  }

  .envelope__art {
    width: 100%;
    justify-self: end;
  }

  .envelope__board {
    padding: 1.35rem;
  }

  .envelope__sheet {
    padding: 1.35rem 1.4rem 1.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .stamp,
  .stamp:active {
    transform: none;
  }

  .stamp__cancel {
    transform: none;
  }
}
</style>
