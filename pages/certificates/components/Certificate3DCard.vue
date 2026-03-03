<template>
  <div
    ref="cardRef"
    class="relative cursor-pointer"
    style="perspective: 1000px"
    @pointerenter="onPointerEnter"
    @pointerleave="onPointerLeave"
    @pointermove="onPointerMove"
  >
    <!-- SVG Filters for realistic metal -->
    <svg class="absolute w-0 h-0" aria-hidden="true">
      <defs>
        <filter id="brushed-metal-v2" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0 0.4" numOctaves="2" result="noise"/>
          <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise"/>
          <feComponentTransfer in="grayNoise" result="contrasted">
            <feFuncR type="linear" slope="2" intercept="-0.5"/>
            <feFuncG type="linear" slope="2" intercept="-0.5"/>
            <feFuncB type="linear" slope="2" intercept="-0.5"/>
          </feComponentTransfer>
          <feBlend in="SourceGraphic" in2="contrasted" mode="overlay"/>
        </filter>
        
        <filter id="brushed-metal-dark" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0 0.5" numOctaves="2" result="noise"/>
          <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise"/>
          <feComponentTransfer in="grayNoise" result="contrasted">
            <feFuncR type="linear" slope="1.5" intercept="-0.3"/>
            <feFuncG type="linear" slope="1.5" intercept="-0.3"/>
            <feFuncB type="linear" slope="1.5" intercept="-0.3"/>
          </feComponentTransfer>
          <feBlend in="SourceGraphic" in2="contrasted" mode="overlay"/>
        </filter>

        <!-- Chromatic aberration for realistic metal -->
        <filter id="metal-shine">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" result="blur"/>
          <feSpecularLighting in="blur" surfaceScale="2" specularConstant="1.5" specularExponent="35" lighting-color="white" result="spec">
            <fePointLight x="-100" y="-100" z="200"/>
          </feSpecularLighting>
          <feComposite in="spec" in2="SourceAlpha" operator="in" result="specOut"/>
          <feBlend in="SourceGraphic" in2="specOut" mode="screen"/>
        </filter>
      </defs>
    </svg>

    <div
      class="relative overflow-hidden h-full flex flex-col"
      :style="{
        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateZ(${isHovering ? 40 : 0}px)`,
        transformStyle: 'preserve-3d',
        transition: isHovering ? 'transform 0.08s ease-out' : 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
        borderRadius: '12px',
        boxShadow: isHovering 
          ? (isDark ? '0 25px 50px -12px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.1)' : '0 25px 50px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)')
          : (isDark ? '0 10px 30px -10px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)' : '0 10px 30px -10px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05)'),
      }"
    >
      
      <!-- Layer 1: Base metal gradient -->
      <div
        class="absolute inset-0"
        :style="{
          background: baseGradient,
          borderRadius: '12px',
        }"
      />

      <!-- Layer 2: Horizontal brushed texture -->
      <div
        class="absolute inset-0 opacity-60 mix-blend-overlay"
        :style="{
          background: brushedPattern,
          filter: isDark ? 'url(#brushed-metal-dark)' : 'url(#brushed-metal-v2)',
          borderRadius: '12px',
        }"
      />

      <!-- Layer 3: Fresnel effect (edges more reflective) -->
      <div
        class="absolute inset-0 pointer-events-none"
        :style="{
          background: fresnelGradient,
          borderRadius: '12px',
          mixBlendMode: 'soft-light',
          opacity: 0.6,
        }"
      />

      <!-- Layer 4: Primary anisotropic highlight -->
      <div
        class="absolute inset-0 pointer-events-none"
        :style="{
          background: anisotropicHighlight,
          borderRadius: '12px',
          mixBlendMode: isDark ? 'overlay' : 'soft-light',
          opacity: isHovering ? 0.9 : 0.5,
        }"
      />

      <!-- Layer 5: Main specular reflection (sharp highlight) - disabled -->
      <!--
      <div
        class="absolute inset-0 pointer-events-none z-10"
        :style="{
          background: specularHighlight,
          borderRadius: '12px',
          opacity: isHovering ? 1 : 0.35,
          mixBlendMode: isDark ? 'screen' : 'overlay',
        }"
      />
      -->

      <!-- Layer 6: Secondary specular (broader reflection) -->
      <div
        class="absolute inset-0 pointer-events-none z-10"
        :style="{
          background: secondarySpecular,
          borderRadius: '12px',
          opacity: isHovering ? 0.8 : 0.2,
          mixBlendMode: isDark ? 'screen' : 'soft-light',
        }"
      />

      <!-- Layer 7: Environment reflection (room simulation) -->
      <div
        class="absolute inset-0 pointer-events-none z-10"
        :style="{
          background: environmentReflection,
          borderRadius: '12px',
          opacity: 0.6,
          mixBlendMode: isDark ? 'normal' : 'screen',
        }"
      />

      <!-- Layer 8: Edge bevel lighting -->
      <div
        class="absolute inset-0 pointer-events-none z-20 rounded-xl"
        :style="{
          boxShadow: bevelEffect,
        }"
      />

      <!-- Layer 9: Inner rim light -->
      <div
        class="absolute inset-0 pointer-events-none z-20"
        :style="{
          background: rimLight,
          borderRadius: '12px',
        }"
      />

      <!-- Layer 10: Chromatic shine streak -->
      <div
        class="absolute inset-0 pointer-events-none z-10"
        :style="{
          background: chromaticStreak,
          borderRadius: '12px',
          opacity: isHovering ? 0.7 : 0,
          mixBlendMode: 'overlay',
          transition: 'opacity 0.4s ease',
        }"
      />

      <!-- Content container -->
      <div class="relative z-30 flex-1 flex flex-col">
        <!-- Image Container -->
        <div
          class="relative aspect-[4/3] overflow-hidden"
          :style="{ 
            transform: 'translateZ(50px)', 
            transformStyle: 'preserve-3d',
            margin: '3px',
            borderRadius: '10px 10px 0 0',
            boxShadow: isDark 
              ? '0 4px 20px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.1)' 
              : '0 4px 20px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.2)',
          }"
        >
          <nuxt-img
            :src="imageUrl"
            class="w-full h-full object-cover transition-all duration-500"
            :class="{ 'scale-110': isHovering, 'scale-100': !isHovering }"
            format="webp"
            quality="85"
            loading="lazy"
          />

          <!-- Image vignette -->
          <div
            class="absolute inset-0 pointer-events-none"
            :style="{
              boxShadow: isDark ? 'inset 0 0 30px rgba(0,0,0,0.5)' : 'inset 0 0 30px rgba(0,0,0,0.3)',
              borderRadius: '10px 10px 0 0',
            }"
          />

          <!-- Action Button -->
          <a
            v-if="cradential"
            :href="cradential"
            target="_blank"
            rel="noopener noreferrer"
            class="absolute inset-0 flex items-center justify-center transition-all duration-500"
            :class="{
              'opacity-100': isHovering,
              'opacity-0': !isHovering,
            }"
            :style="{ 
              transform: isHovering ? 'translateZ(60px) scale(1)' : 'translateZ(60px) scale(0.9)',
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }"
            @click.stop
          >
            <span
              class="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300"
              :style="{
                background: isDark 
                  ? 'linear-gradient(180deg, #4a4d50 0%, #3a3d40 50%, #2a2d30 100%)'
                  : 'linear-gradient(180deg, #f0f0f0 0%, #d4d4d4 50%, #c0c0c0 100%)',
                color: isDark ? '#f0f0f0' : '#1a1a1a',
                boxShadow: isDark
                  ? '0 4px 15px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.2), 0 0 0 1px rgba(255,255,255,0.1)'
                  : '0 4px 15px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.9), 0 0 0 1px rgba(0,0,0,0.1)',
                textShadow: isDark ? '0 1px 2px rgba(0,0,0,0.5)' : '0 1px 0 rgba(255,255,255,0.8)',
              }"
            >
              Lihat Sertifikat
              <Icon name="mdi:open-in-new" class="w-4 h-4" />
            </span>
          </a>
        </div>

        <!-- Content -->
        <div
          class="p-6 flex-1"
          :style="{ 
            transform: 'translateZ(30px)',
          }"
        >
          <time
            class="text-xs font-bold uppercase tracking-widest"
            :style="{
              color: isDark ? '#808080' : '#808080',
              textShadow: isDark ? '0 1px 2px rgba(0,0,0,0.5)' : '0 1px 0 rgba(255,255,255,0.3)'
            }"
          >
            {{ formattedDate }}
          </time>

          <h3
            class="mt-2 text-lg font-bold line-clamp-2"
            :style="{
              color: isDark ? '#f0f0f0' : '#2a2a2a',
              textShadow: isDark ? '0 2px 4px rgba(0,0,0,0.5)' : '0 1px 0 rgba(255,255,255,0.5)'
            }"
          >
            {{ title }}
          </h3>

          <p
            class="mt-3 text-sm line-clamp-2 leading-relaxed"
            :style="{
              color: isDark ? '#a0a0a0' : '#505050'
            }"
          >
            {{ desc }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted, onMounted } from "vue";

interface Props {
  imageUrl: string;
  title: string;
  desc: string;
  date: string;
  cradential?: string;
}

const props = defineProps<Props>();

const cardRef = ref<HTMLElement | null>(null);
const rotation = ref({ x: 0, y: 0 });
const isHovering = ref(false);
const isDark = ref(false);

onMounted(() => {
  if (process.client) {
    isDark.value = document.documentElement.classList.contains('dark');
    const observer = new MutationObserver(() => {
      isDark.value = document.documentElement.classList.contains('dark');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  }
});

const pointerTarget = ref({ x: 0, y: 0 });
const pointer = ref({ x: 0, y: 0 });

const MAX_TILT_DEG = 10;
let rafId: number | null = null;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

// Calculate view-space reflection vector
const viewSpace = computed(() => {
  // Convert pointer position to view angle
  const viewX = pointer.value.x * 0.5; // -0.5 to 0.5
  const viewY = pointer.value.y * 0.5;
  
  // Calculate reflection intensity based on view angle (Fresnel)
  const viewAngle = Math.sqrt(viewX * viewX + viewY * viewY);
  const fresnel = Math.pow(1 - Math.min(viewAngle * 1.5, 1), 2);
  
  return { viewX, viewY, fresnel };
});

// METAL BASE - Changes based on dark mode
const baseGradient = computed(() => {
  if (isDark.value) {
    return `linear-gradient(170deg, 
      #4a4d50 0%, 
      #3a3d40 10%, 
      #2d3033 20%,
      #35383b 30%,
      #2a2d30 40%,
      #323538 50%, 
      #3d4043 60%, 
      #2d3033 70%,
      #3a3d40 85%, 
      #45484b 100%)`;
  }
  
  return `linear-gradient(170deg, 
    #e8eaed 0%, 
    #d0d4d8 8%, 
    #c5c9cd 15%,
    #e0e4e8 22%,
    #f0f2f4 30%,
    #d8dce0 40%, 
    #c8ccd0 50%, 
    #b8bcc0 58%,
    #d0d4d8 70%, 
    #e0e4e8 85%, 
    #d5d9dd 100%)`;
});

// Horizontal brushed lines
const brushedPattern = computed(() => {
  const color = isDark.value ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)';
  return `repeating-linear-gradient(
    0deg,
    transparent 0px,
    transparent 2px,
    ${color} 2px,
    ${color} 3px,
    transparent 3px,
    transparent 6px
  )`;
});

// FRESNEL EFFECT - Metal is more reflective at grazing angles (edges)
const fresnelGradient = computed(() => {
  // Create radial gradient where edges are brighter
  const centerOpacity = isDark.value ? 0.1 : 0.2;
  const edgeOpacity = isDark.value ? 0.4 : 0.6;
  
  return `radial-gradient(ellipse 80% 80% at 50% 50%, 
    rgba(255,255,255,${centerOpacity}) 0%, 
    rgba(255,255,255,${centerOpacity + 0.1}) 40%,
    rgba(255,255,255,${edgeOpacity}) 70%,
    rgba(255,255,255,${edgeOpacity + 0.1}) 100%)`;
});

// Anisotropic highlight - stretches based on viewing angle
const anisotropicHighlight = computed(() => {
  // Calculate angle based on pointer position + slight tilt
  const baseAngle = 170;
  const angleOffset = pointer.value.x * 25;
  const angle = baseAngle + angleOffset;
  
  // Stretch factor changes with view angle
  const stretchX = 1 + Math.abs(pointer.value.x) * 0.3;
  const stretchY = 1 + Math.abs(pointer.value.y) * 0.3;
  
  if (isDark.value) {
    return `linear-gradient(${angle}deg, 
      transparent 0%,
      rgba(120,130,140,${0.15 * stretchX}) 15%,
      rgba(160,170,180,${0.35 * stretchY}) 40%,
      rgba(190,200,210,${0.5 * Math.max(stretchX, stretchY)}) 50%,
      rgba(160,170,180,${0.35 * stretchY}) 60%,
      rgba(120,130,140,${0.15 * stretchX}) 85%,
      transparent 100%)`;
  }
  
  return `linear-gradient(${angle}deg, 
    transparent 0%,
    rgba(255,255,255,${0.1 * stretchX}) 15%,
    rgba(255,255,255,${0.4 * stretchY}) 40%,
    rgba(255,255,255,${0.7 * Math.max(stretchX, stretchY)}) 50%,
    rgba(255,255,255,${0.4 * stretchY}) 60%,
    rgba(255,255,255,${0.1 * stretchX}) 85%,
    transparent 100%)`;
});

// Primary specular - sharp, intense highlight
const specularHighlight = computed(() => {
  const { viewX, viewY, fresnel } = viewSpace.value;
  
  // Position moves with view but stays within bounds
  const x = 50 + viewX * 60;
  const y = 50 + viewY * 50;
  
  // Size varies with fresnel (smaller at center, larger at edges)
  const sizeX = 45 + fresnel * 25;
  const sizeY = 30 + fresnel * 20;
  
  if (isDark.value) {
    return `radial-gradient(ellipse ${sizeX}% ${sizeY}% at ${x}% ${y}%, 
      rgba(220,230,240,${0.7 + fresnel * 0.2}) 0%, 
      rgba(170,180,190,${0.4 + fresnel * 0.1}) 15%,
      rgba(120,130,140,0.15) 35%, 
      transparent 55%)`;
  }
  
  return `radial-gradient(ellipse ${sizeX}% ${sizeY}% at ${x}% ${y}%, 
    rgba(255,255,255,${0.95 - fresnel * 0.1}) 0%, 
    rgba(255,255,255,${0.6 - fresnel * 0.15}) 15%,
    rgba(255,255,255,0.15) 35%, 
    transparent 55%)`;
});

// Secondary specular - broader, softer reflection
const secondarySpecular = computed(() => {
  const { viewX, viewY } = viewSpace.value;
  
  // Offset from primary to simulate multiple light sources
  const x = 50 + viewX * 40 - 15;
  const y = 50 + viewY * 35 - 10;
  
  if (isDark.value) {
    return `radial-gradient(ellipse 70% 50% at ${x}% ${y}%, 
      rgba(180,190,200,0.3) 0%, 
      rgba(140,150,160,0.15) 30%,
      transparent 60%)`;
  }
  
  return `radial-gradient(ellipse 70% 50% at ${x}% ${y}%, 
    rgba(255,255,255,0.4) 0%, 
    rgba(255,255,255,0.2) 30%,
    transparent 60%)`;
});

// Environment reflection - simulates room/ceiling lights
const environmentReflection = computed(() => {
  // Multiple gradient stops to simulate light sources from above
  if (isDark.value) {
    return `linear-gradient(180deg, 
      rgba(130,140,150,0.25) 0%,
      rgba(100,110,120,0.15) 8%,
      transparent 20%,
      transparent 80%,
      rgba(40,45,50,0.35) 100%)`;
  }
  
  return `linear-gradient(180deg, 
    rgba(255,255,255,0.35) 0%,
    rgba(255,255,255,0.2) 8%,
    transparent 20%,
    transparent 80%,
    rgba(0,0,0,0.1) 100%)`;
});

// Chromatic streak - adds color variation for realism
const chromaticStreak = computed(() => {
  const angle = 175 + pointer.value.x * 15;
  const position = 50 + pointer.value.y * 20;
  
  if (isDark.value) {
    return `linear-gradient(${angle}deg, 
      transparent 0%,
      transparent ${position - 15}%,
      rgba(200,210,220,0.2) ${position - 5}%,
      rgba(180,190,200,0.35) ${position}%,
      rgba(200,210,220,0.2) ${position + 5}%,
      transparent ${position + 15}%,
      transparent 100%)`;
  }
  
  return `linear-gradient(${angle}deg, 
    transparent 0%,
    transparent ${position - 15}%,
    rgba(255,255,255,0.3) ${position - 5}%,
    rgba(255,255,255,0.5) ${position}%,
    rgba(255,255,255,0.3) ${position + 5}%,
    transparent ${position + 15}%,
    transparent 100%)`;
});

// Bevel/edge lighting
const bevelEffect = computed(() => {
  if (isDark.value) {
    return `inset 0 1px 1px rgba(255,255,255,0.15), 
            inset 0 -1px 1px rgba(0,0,0,0.4),
            0 0 0 1px rgba(255,255,255,0.05)`;
  }
  
  return `inset 0 1px 1px rgba(255,255,255,0.6), 
          inset 0 -1px 1px rgba(0,0,0,0.15),
          0 0 0 1px rgba(0,0,0,0.08)`;
});

// Rim light effect
const rimLight = computed(() => {
  if (isDark.value) {
    return `linear-gradient(135deg, rgba(160,170,180,0.15) 0%, transparent 30%, transparent 70%, rgba(110,120,130,0.1) 100%)`;
  }
  
  return `linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.1) 100%)`;
});

const tick = () => {
  const lerp = 0.12;
  pointer.value = {
    x: pointer.value.x + (pointerTarget.value.x - pointer.value.x) * lerp,
    y: pointer.value.y + (pointerTarget.value.y - pointer.value.y) * lerp,
  };

  rotation.value = {
    x: pointer.value.y * MAX_TILT_DEG,
    y: -pointer.value.x * MAX_TILT_DEG,
  };

  const shouldContinue =
    isHovering.value ||
    Math.abs(pointer.value.x) > 0.001 ||
    Math.abs(pointer.value.y) > 0.001;

  if (shouldContinue) {
    rafId = requestAnimationFrame(tick);
  } else {
    rafId = null;
  }
};

const ensureTicking = () => {
  if (rafId != null) return;
  rafId = requestAnimationFrame(tick);
};

const onPointerEnter = () => {
  isHovering.value = true;
  ensureTicking();
};

const onPointerLeave = () => {
  isHovering.value = false;
  pointerTarget.value = { x: 0, y: 0 };
  ensureTicking();
};

const onPointerMove = (event: PointerEvent) => {
  if (!cardRef.value) return;
  const rect = cardRef.value.getBoundingClientRect();
  const px = (event.clientX - rect.left) / rect.width;
  const py = (event.clientY - rect.top) / rect.height;

  const nx = clamp(px * 2 - 1, -1, 1);
  const ny = clamp(py * 2 - 1, -1, 1);

  pointerTarget.value = { x: nx, y: ny };
  ensureTicking();
};

const formattedDate = computed(() => {
  return new Date(props.date).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
});

onUnmounted(() => {
  if (rafId != null) cancelAnimationFrame(rafId);
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>