<template>
  <section class="ektm" aria-labelledby="ektm-heading">
    <div class="ektm__intro">
      <div class="ektm__copy">
        <h2 id="ektm-heading" class="ektm__title">Digital student ID</h2>
        <p class="ektm__lead">
          MyUT issues an electronic student ID that lives on the phone. Type a
          display name to mint a demo pass. Nothing is saved or sent.
        </p>
      </div>
      <MyutIllustration
        class="ektm__art"
        variant="flush"
        :src="myutIllustrations.time.src"
        :alt="myutIllustrations.time.alt"
      />
    </div>

    <div class="ektm__workspace">
      <form class="ektm__form" @submit.prevent>
        <div class="ektm__field">
          <label class="ektm__label" for="ektm-name">Display name</label>
          <input
            id="ektm-name"
            v-model="form.name"
            type="text"
            class="ektm__input"
            maxlength="32"
            autocomplete="off"
            placeholder="A name for the demo pass"
          />
        </div>

        <div class="ektm__field">
          <label class="ektm__label" for="ektm-program">Study program</label>
          <select id="ektm-program" v-model="form.program" class="ektm__input">
            <option value="Information Systems">Information Systems</option>
            <option value="Management">Management</option>
            <option value="Law">Law</option>
            <option value="Teacher Education">Teacher Education</option>
          </select>
        </div>

        <p class="ektm__hint">
          Demo number {{ demoNumber }}. Not a real student number.
        </p>

        <button type="button" class="ektm__reset" @click="resetDemo">
          Reset demo
        </button>
      </form>

      <div class="ektm__stage">
        <div
          class="pass"
          :style="passTilt"
          @pointermove="onPointerMove"
          @pointerleave="resetTilt"
        >
          <div class="pass__shine" aria-hidden="true" />
          <div class="pass__top">
            <img
              :src="myutIcons.idCard"
              alt=""
              class="pass__mark"
              aria-hidden="true"
            />
            <p class="pass__org">Universitas Terbuka</p>
          </div>
          <p class="pass__kind">Student identity</p>
          <div class="pass__who">
            <span class="pass__initials" aria-hidden="true">{{ initials }}</span>
            <div>
              <p class="pass__name">{{ displayName }}</p>
              <p class="pass__nim">{{ demoNumber }}</p>
            </div>
          </div>
          <p class="pass__program">{{ form.program }}</p>
          <p class="pass__note">Demo pass · not valid for campus services</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import MyutIllustration from "./MyutIllustration.vue";
import { myutIcons, myutIllustrations } from "../illustrations";

const prefersReducedMotion = ref(false);

const form = reactive({
  name: "Sari Wulandari",
  program: "Information Systems",
});

const tilt = reactive({ x: 0, y: 0 });

const displayName = computed(() => form.name.trim() || "Student name");

const initials = computed(() => {
  const parts = displayName.value.split(/\s+/).filter(Boolean);
  const letters = parts.slice(0, 2).map((part) => part[0]?.toUpperCase() || "");
  return letters.join("") || "ST";
});

const demoNumber = computed(() => {
  const seed = displayName.value.toUpperCase().replace(/[^A-Z0-9]/g, "") || "STUDENT";
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 10000;
  }
  return `DEMO-${String(hash).padStart(4, "0")}`;
});

const passTilt = computed(() => {
  if (prefersReducedMotion.value) return {};
  return {
    transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
  };
});

function onPointerMove(event: PointerEvent) {
  if (prefersReducedMotion.value) return;
  const target = event.currentTarget as HTMLElement;
  const rect = target.getBoundingClientRect();
  const px = (event.clientX - rect.left) / rect.width - 0.5;
  const py = (event.clientY - rect.top) / rect.height - 0.5;
  tilt.y = px * 10;
  tilt.x = py * -8;
}

function resetTilt() {
  tilt.x = 0;
  tilt.y = 0;
}

function resetDemo() {
  form.name = "Sari Wulandari";
  form.program = "Information Systems";
  resetTilt();
}

onMounted(() => {
  prefersReducedMotion.value = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
});
</script>

<style scoped>
.ektm {
  display: grid;
  gap: 1.5rem;
}

.ektm__intro {
  display: grid;
  gap: 1.25rem;
  align-items: center;
}

.ektm__title {
  font-family: var(--myut-font-display);
  font-size: 1.85rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--myut-ink);
}

.ektm__lead {
  font-family: var(--myut-font-body);
  font-size: 1rem;
  line-height: 1.65;
  color: var(--myut-muted);
  margin-top: 0.55rem;
  max-width: 38rem;
}

.ektm__art {
  width: min(100%, 16rem);
  justify-self: center;
}

.ektm__workspace {
  display: grid;
  gap: 1.5rem;
  align-items: start;
}

.ektm__form {
  display: grid;
  gap: 1rem;
  padding: 1.2rem;
  border-radius: 0.45rem;
  border: 1px solid color-mix(in srgb, var(--myut-navy) 18%, transparent);
  background: var(--myut-letter);
}

.ektm__field {
  display: grid;
  gap: 0.4rem;
}

.ektm__label {
  font-family: var(--myut-font-body);
  font-size: 1rem;
  font-weight: 600;
  color: var(--myut-ink);
}

.ektm__input {
  width: 100%;
  min-height: 2.75rem;
  padding: 0.6rem 0.75rem;
  border-radius: 0.4rem;
  border: 1px solid color-mix(in srgb, var(--myut-navy) 22%, transparent);
  background: #fffef9;
  color: var(--myut-ink);
  font-family: var(--myut-font-body);
  font-size: 1rem;
}

.ektm__input:focus-visible {
  outline: 2px solid var(--myut-vermillion);
  outline-offset: 2px;
}

.ektm__hint,
.ektm__reset {
  font-family: var(--myut-font-body);
  font-size: 1rem;
}

.ektm__hint {
  color: var(--myut-muted);
}

.ektm__reset {
  justify-self: start;
  min-height: 2.75rem;
  padding: 0.55rem 0.95rem;
  border-radius: 0.4rem;
  border: 1px solid color-mix(in srgb, var(--myut-navy) 28%, transparent);
  background: transparent;
  color: var(--myut-navy);
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 140ms ease-out,
    border-color 140ms ease-out,
    transform 120ms ease-out;
}

.ektm__reset:hover {
  border-color: var(--myut-navy);
  background: color-mix(in srgb, var(--myut-navy) 6%, transparent);
}

.ektm__reset:focus-visible {
  outline: 2px solid var(--myut-vermillion);
  outline-offset: 2px;
}

.ektm__reset:active {
  transform: scale(0.97);
}

.ektm__stage {
  perspective: 900px;
  display: grid;
  place-items: center;
}

.pass {
  position: relative;
  width: min(100%, 22rem);
  min-height: 13.5rem;
  padding: 1.15rem 1.2rem 1rem;
  border-radius: 0.7rem;
  background:
    linear-gradient(
      145deg,
      color-mix(in srgb, var(--myut-navy) 92%, white),
      var(--myut-navy) 55%,
      #12263c
    );
  color: #f7f1e4;
  overflow: hidden;
  transform-style: preserve-3d;
  transition: transform 180ms ease-out;
  box-shadow: 0 16px 32px color-mix(in srgb, var(--myut-ink) 18%, transparent);
}

.pass__shine {
  position: absolute;
  inset: -40% -20%;
  background: linear-gradient(
    115deg,
    transparent 40%,
    color-mix(in srgb, var(--myut-amber) 22%, transparent) 48%,
    transparent 56%
  );
  pointer-events: none;
}

.pass__top {
  display: flex;
  align-items: center;
  gap: 0.55rem;
}

.pass__mark {
  width: 1.5rem;
  height: 1.5rem;
  filter: invert(1) brightness(1.4);
}

.pass__org,
.pass__kind,
.pass__nim,
.pass__program,
.pass__note {
  font-family: var(--myut-font-body);
  font-size: 1rem;
}

.pass__org {
  letter-spacing: 0.04em;
}

.pass__kind {
  margin-top: 0.85rem;
  color: color-mix(in srgb, var(--myut-amber) 80%, white);
}

.pass__who {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.55rem;
}

.pass__initials {
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 0.35rem;
  background: color-mix(in srgb, var(--myut-amber) 88%, white);
  color: var(--myut-navy);
  font-family: var(--myut-font-display);
  font-size: 1.05rem;
  font-weight: 700;
}

.pass__name {
  font-family: var(--myut-font-display);
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.pass__nim {
  color: color-mix(in srgb, #f7f1e4 72%, var(--myut-navy));
}

.pass__program {
  margin-top: 0.7rem;
}

.pass__note {
  margin-top: 0.35rem;
  color: color-mix(in srgb, #f7f1e4 62%, var(--myut-navy));
}

@media (min-width: 768px) {
  .ektm__intro {
    grid-template-columns: minmax(0, 1fr) minmax(10rem, 16rem);
    gap: 2rem;
  }

  .ektm__art {
    width: 100%;
    justify-self: end;
  }

  .ektm__workspace {
    grid-template-columns: minmax(0, 0.9fr) minmax(18rem, 1.1fr);
    gap: 2rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .pass,
  .ektm__reset:active {
    transform: none;
    transition: none;
  }
}
</style>
