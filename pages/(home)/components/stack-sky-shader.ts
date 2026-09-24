// WebGL sky behind the tech-stack starfield (SectionStack.vue), in two passes:
//   1. NEBULA_FRAGMENT renders the soft Milky Way at reduced resolution into a
//      texture: rgb = light, a = how densely unresolved stars should sit there.
//   2. COMPOSITE_FRAGMENT runs at device resolution: upsamples that texture,
//      sprinkles fine star dust (the "HD" grain), darkens the edges, dithers.
// Everything is measured in section CSS px. Each layer sits at a depth `d`
// (1 = icon plane, larger = farther) and shifts by the same camera rule the
// canvas stars and icon rows use: camera / d for drift + pointer,
// scroll * (1 - 1/d).

export const SKY_VERTEX = `
attribute vec2 aPosition;

void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const SHARED = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 uResolution;
uniform vec2 uSize;
uniform float uTime;
uniform vec2 uCamera;
uniform float uScroll;

float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

vec2 layerOffset(float depth) {
  return uCamera / depth + vec2(0.0, uScroll * (1.0 - 1.0 / depth));
}

// Section CSS px of this fragment, y down
vec2 sectionPx() {
  return vec2(gl_FragCoord.x, uResolution.y - gl_FragCoord.y) * (uSize / uResolution);
}

// Triangular dither, re-rolled each frame, so dark gradients never band
vec3 dither(vec3 color) {
  vec2 seed = gl_FragCoord.xy + fract(uTime * 7.0) * 97.0;
  return color + (hash12(seed) + hash12(seed + 19.19) - 1.0) / 255.0;
}
`;

export const NEBULA_FRAGMENT = `${SHARED}
uniform vec2 uBandDir;
uniform float uBandWidth;
uniform vec3 uBottom;

const vec3 TOP = vec3(0.0);
const vec3 MID = vec3(0.004, 0.016, 0.059);
const mat2 OCTAVE_TURN = mat2(0.8, -0.6, 0.6, 0.8);

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

// 2D simplex noise (Gustavson / Ashima), returns -1..1
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// Star clouds and dust: low persistence keeps them soft
float fbm(vec2 p) {
  float sum = 0.0;
  float amp = 0.55;
  for (int i = 0; i < 4; i++) {
    sum += amp * snoise(p);
    p = OCTAVE_TURN * p * 2.03 + 17.1;
    amp *= 0.42;
  }
  return sum;
}

// Broad shapes (warps, bends, far haze)
float fbmSoft(vec2 p) {
  float sum = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 3; i++) {
    sum += amp * snoise(p);
    p = OCTAVE_TURN * p * 2.03 + 17.1;
    amp *= 0.5;
  }
  return sum;
}

void main() {
  vec2 px = sectionPx();
  vec2 center = uSize * 0.5;
  vec2 bandNormal = vec2(-uBandDir.y, uBandDir.x);

  float ty = clamp(px.y / uSize.y, 0.0, 1.0);
  vec3 color = ty < 0.5 ? mix(TOP, MID, ty * 2.0) : mix(MID, uBottom, ty * 2.0 - 1.0);

  // Far haze: broad deep-blue glow, almost pinned to the viewport
  vec2 farP = (px - layerOffset(9.0)) * 0.0009;
  color += vec3(0.06, 0.13, 0.4) * exp(1.2 * fbmSoft(farP + vec2(uTime * 0.003, 0.0))) * 0.022;

  // Band geometry from a reference depth, bent by low-frequency noise
  vec2 galaxyRel = px - layerOffset(6.0) - center;
  float bandAlong = dot(galaxyRel, uBandDir);
  float bend = fbmSoft(vec2(bandAlong * 0.0011, 3.7)) * uBandWidth * 0.6;
  float bandAcross = dot(galaxyRel, bandNormal) + bend;
  float halo = exp(-pow(bandAcross / (uBandWidth * 2.6), 2.0));

  vec3 light = vec3(0.07, 0.15, 0.38) * halo * 0.16;
  float starLight = 0.0;
  float clear = 1.0;

  if (halo > 0.003) {
    // Galactic bulge: warm, wide glow toward one end of the band, clear of the icons
    vec2 bulgeRel = vec2(bandAlong - uSize.x * 0.38, bandAcross)
      / vec2(uBandWidth * 2.6, uBandWidth * 1.25);
    float bulge = exp(-dot(bulgeRel, bulgeRel));
    vec3 tint = mix(vec3(0.46, 0.58, 0.88), vec3(1.0, 0.91, 0.8), bulge);
    vec2 bandQ = vec2(bandAlong, bandAcross) * vec2(0.001, 0.0014);
    vec2 warp = vec2(
      fbmSoft(bandQ * 1.7 + uTime * 0.004),
      fbmSoft(bandQ * 1.7 + 5.2 - uTime * 0.004)
    ) * 0.35;

    // Three slices through the disk, far to near. Each adds its own clumpy
    // starlight (log-normal, like real star clouds), then its dust dims
    // everything behind it (Beer-Lambert). Blue dims first, so thin dust
    // reddens on its own and every edge blends instead of cutting.
    for (int i = 0; i < 3; i++) {
      float slice = float(i);
      vec2 rel = px - layerOffset(7.0 - slice * 1.5) - center;
      float along = dot(rel, uBandDir);
      float across = dot(rel, bandNormal) + bend;
      vec2 q = vec2(along, across) * vec2(0.002, 0.0028) + warp + slice * 13.7;

      float glowProfile = exp(-pow(across / (uBandWidth * (1.15 - slice * 0.15)), 2.0));
      float dustProfile = exp(-pow((across + uBandWidth * 0.12 * (slice - 1.0)) / (uBandWidth * 0.48), 2.0));
      float clumps = exp(1.8 * fbm(q) - 0.3);
      float dustiness = exp(2.2 * fbm(q * 1.3 + warp + 31.0) - 1.1);

      float tau = dustProfile * dustiness * 0.95;
      vec3 transmit = exp(-tau * vec3(0.85, 1.0, 1.18));
      light = light * transmit + tint * glowProfile * clumps * (0.085 + bulge * 0.14);
      starLight = starLight * transmit.g + glowProfile * clumps * (0.25 + bulge * 0.3);
      clear *= transmit.g;
    }
  }

  // Dust also darkens the empty sky behind it a little
  color = color * mix(1.0, clear, 0.5) + light;
  // Soft shoulder so bright clumps roll off instead of clipping
  color = 1.0 - exp(-color * 1.05);

  float starDensity = 0.08 * clear + starLight * 0.8;
  gl_FragColor = vec4(dither(color), clamp(starDensity, 0.0, 1.0));
}
`;

export const COMPOSITE_FRAGMENT = `${SHARED}
uniform sampler2D uNebula;

// At most one star per cell, placed anywhere inside it. A star's glow is
// smaller than half a cell, so only the 2x2 cells nearest this pixel can reach
// it. Brightness is heavy-tailed: mostly faint grain, a few bright points.
vec3 starDust(vec2 p, float cell, float chance, float bufferPx, float seed) {
  vec2 base = floor(p / cell - 0.5);
  vec3 sum = vec3(0.0);

  for (int j = 0; j < 2; j++) {
    for (int i = 0; i < 2; i++) {
      vec2 id = base + vec2(float(i), float(j));
      if (hash12(id + seed) > chance) continue;

      vec2 star = (id + vec2(hash12(id + seed + 3.1), hash12(id + seed + 7.7))) * cell;
      float dist = length(p - star) / bufferPx;
      float brightness = pow(hash12(id + seed + 11.3), 6.0);
      float sigma = 0.6 + brightness * 0.45;
      float core = exp(-dist * dist / (2.0 * sigma * sigma));
      vec3 tint = mix(vec3(0.7, 0.82, 1.0), vec3(1.0, 0.9, 0.78), hash12(id + seed + 5.9));
      sum += tint * core * (0.045 + 0.62 * brightness);
    }
  }
  return sum;
}

void main() {
  vec2 px = sectionPx();
  // CSS px covered by one buffer px (below 1 on high-DPI screens)
  float bufferPx = uSize.x / uResolution.x;
  vec4 nebula = texture2D(uNebula, gl_FragCoord.xy / uResolution);
  float density = nebula.a;
  vec3 color = nebula.rgb;

  // Dense, brighter grain where the galaxy is thick; sparse faint stars elsewhere
  float grain = 0.8 + 0.6 * density;
  color += starDust(px - layerOffset(7.5), 7.0, 0.95 * density, bufferPx, 0.0) * grain;
  color += starDust(px - layerOffset(4.8), 11.0, 0.7 * density, bufferPx, 41.0) * grain * 1.15;

  // Well: darken toward the pane edges
  vec2 edge = (px / uSize - vec2(0.5, 0.48)) / vec2(0.74, 0.64);
  color *= 1.0 - 0.74 * pow(min(length(edge), 1.0), 1.6);

  gl_FragColor = vec4(dither(color), 1.0);
}
`;
