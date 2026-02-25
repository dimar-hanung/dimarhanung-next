<template>
  <div
    class="relative w-full h-screen bg-slate-900 flex flex-col items-center justify-center overflow-hidden font-sans"
  >
    <!-- HUD -->
    <div
      class="absolute top-6 left-6 text-white z-10 pointer-events-none select-none"
    >
      <h1
        class="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-500"
      >
        Level {{ level }}
      </h1>
      <div class="space-y-1 text-slate-400 text-sm">
        <p>
          Difficulty:
          <span :class="difficultyColor">{{ difficultyLabel }}</span>
        </p>
        <p>
          Controls: <span class="font-mono bg-slate-800 px-1 rounded">W</span>
          <span class="font-mono bg-slate-800 px-1 rounded">A</span>
          <span class="font-mono bg-slate-800 px-1 rounded">S</span>
          <span class="font-mono bg-slate-800 px-1 rounded">D</span>
        </p>
        <p class="text-xs text-slate-500">Arrow keys (slower)</p>
      </div>

      <!-- Debug Mode: Level Changer -->
      <div class="mt-4 pointer-events-auto">
        <label class="text-xs text-slate-500 block mb-1"
          >🐛 Debug: Set Level</label
        >
        <div class="flex gap-2">
          <input
            v-model.number="debugLevelInput"
            type="number"
            min="1"
            max="999"
            class="w-20 px-2 py-1 bg-slate-800 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-blue-500"
            @keyup.enter="setDebugLevel"
          />
          <button
            @click="setDebugLevel"
            class="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-xs rounded transition-colors"
          >
            Go
          </button>
        </div>
        <button
          @click="toggleBot"
          :class="[
            'mt-2 w-full px-3 py-1.5 text-xs rounded transition-all',
            botActive
              ? 'bg-green-600 hover:bg-green-500 text-white'
              : 'bg-purple-600 hover:bg-purple-500 text-white',
          ]"
        >
          {{ botActive ? "🤖 Bot Active" : "🤖 Activate Bot" }}
        </button>
        <button
          @click="toggleMovingObstacles"
          :class="[
            'mt-2 w-full px-3 py-1.5 text-xs rounded transition-all',
            disableMovingObjects
              ? 'bg-slate-700 border border-slate-500 text-slate-100'
              : 'bg-orange-600 hover:bg-orange-500 text-white',
          ]"
        >
          {{
            disableMovingObjects
              ? "🚧 Movers Disabled"
              : "🚧 Disable Moving Obstacles"
          }}
        </button>
      </div>
    </div>

    <!-- Game Canvas -->
    <canvas
      ref="canvasRef"
      class="bg-slate-800 shadow-2xl rounded-xl border border-slate-700 cursor-none"
    ></canvas>

    <!-- Game Over Modal -->
    <div
      v-if="gameOver"
      class="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 transition-all duration-300"
    >
      <div
        class="bg-slate-800 p-8 rounded-2xl border border-slate-700 text-center shadow-2xl max-w-md w-full transform scale-100"
      >
        <div class="mb-6">
          <div
            class="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 w-10 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-white mb-2">Game Over!</h2>
          <p class="text-slate-400">You crashed on Level {{ level }}</p>
        </div>

        <button
          @click="restartGame"
          class="w-full py-3 px-6 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-bold transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/25"
        >
          Try Again
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from "vue";

// --- Game Configuration ---
const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 600;
const START_ZONE_WIDTH = 100;
const FINISH_ZONE_WIDTH = 100;
const PLAYER_BASE_RADIUS = 8;
const PLAYER_SPEED = 5;

// --- State ---
const canvasRef = ref<HTMLCanvasElement | null>(null);
const level = ref(1);
const gameOver = ref(false);
const debugLevelInput = ref(1);
const botActive = ref(false);
const disableMovingObjects = ref(false);
let botPath: Array<{ x: number; y: number }> = [];
let botStuckFrames = 0;
const keys = {
  w: false,
  a: false,
  s: false,
  d: false,
  arrowup: false,
  arrowdown: false,
  arrowleft: false,
  arrowright: false,
};

// Computed Difficulty Label
const difficultyLabel = computed(() => {
  if (level.value < 3) return "Easy";
  if (level.value < 6) return "Medium";
  return "Hard";
});

const difficultyColor = computed(() => {
  if (level.value < 3) return "text-green-400";
  if (level.value < 6) return "text-yellow-400";
  return "text-red-400";
});

// --- Game Objects ---
interface Entity {
  x: number;
  y: number;
  w?: number;
  h?: number;
  radius?: number;
  vx?: number;
  vy?: number;
  color?: string;
  type?: "static" | "moving";
}

let ctx: CanvasRenderingContext2D | null = null;
let animationId: number;
let player: Entity = {
  x: 50,
  y: 300,
  radius: PLAYER_BASE_RADIUS,
  color: "#60a5fa",
};
let obstacles: Entity[] = [];
let particles: Entity[] = []; // For death effect

// --- Core Game Logic ---

const initGame = () => {
  if (!canvasRef.value) return;

  // Set canvas resolution
  canvasRef.value.width = CANVAS_WIDTH;
  canvasRef.value.height = CANVAS_HEIGHT;

  ctx = canvasRef.value.getContext("2d");

  // Add event listeners
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);

  // Start loop
  resetLevel();
  gameLoop();
};

const resetLevel = () => {
  // Reset player position to center of start zone
  player.x = START_ZONE_WIDTH / 2;
  player.y = CANVAS_HEIGHT / 2;
  player.vx = 0;
  player.vy = 0;

  // Reset bot path
  botPath = [];
  botStuckFrames = 0;

  // Generate new level
  generateLevel(level.value);
};

const restartGame = () => {
  level.value = 1;
  debugLevelInput.value = 1;
  gameOver.value = false;
  particles = [];
  resetLevel();
  gameLoop();
};

const setDebugLevel = () => {
  if (debugLevelInput.value > 0) {
    level.value = debugLevelInput.value;
    gameOver.value = false;
    particles = [];
    resetLevel();
    if (!animationId) {
      gameLoop();
    }
  }
};

const toggleBot = () => {
  botActive.value = !botActive.value;
  botPath = [];
  botStuckFrames = 0;
  botRecomputeTimer = 0;
};

const toggleMovingObstacles = () => {
  disableMovingObjects.value = !disableMovingObjects.value;
};

// Smaller cells = more precise pathfinding
const BOT_CELL_SIZE = 12;
const BOT_WAYPOINT_EPS = BOT_CELL_SIZE * 0.6;
// Push bot deeper into the finish zone so it actually triggers the win check
const BOT_GOAL_X = CANVAS_WIDTH - FINISH_ZONE_WIDTH + PLAYER_BASE_RADIUS * 2;
let botRecomputeTimer = 0;

const worldToCell = (x: number, y: number) => {
  const col = Math.max(
    0,
    Math.min(
      Math.floor(x / BOT_CELL_SIZE),
      Math.floor(CANVAS_WIDTH / BOT_CELL_SIZE) - 1
    )
  );
  const row = Math.max(
    0,
    Math.min(
      Math.floor(y / BOT_CELL_SIZE),
      Math.floor(CANVAS_HEIGHT / BOT_CELL_SIZE) - 1
    )
  );
  return { col, row };
};

const cellToWorld = (col: number, row: number) => {
  return {
    x: col * BOT_CELL_SIZE + BOT_CELL_SIZE / 2,
    y: row * BOT_CELL_SIZE + BOT_CELL_SIZE / 2,
  };
};

// Check if a cell is blocked, with extra padding for safety margin
const isCellBlocked = (col: number, row: number) => {
  const p = cellToWorld(col, row);
  const radius = player.radius ?? PLAYER_BASE_RADIUS;
  const margin = radius + 2; // Extra safety margin

  // Check boundaries
  if (p.x < margin || p.x > CANVAS_WIDTH - margin) return true;
  if (p.y < margin || p.y > CANVAS_HEIGHT - margin) return true;

  // Check all obstacles with margin
  for (const obs of obstacles) {
    const closestX = Math.max(obs.x, Math.min(p.x, obs.x + obs.w!));
    const closestY = Math.max(obs.y, Math.min(p.y, obs.y + obs.h!));
    const dx = p.x - closestX;
    const dy = p.y - closestY;
    const distSq = dx * dx + dy * dy;
    if (distSq < margin * margin) return true;
  }

  return false;
};

// Check if diagonal move is valid (both adjacent cells must be free)
const canMoveDiagonal = (
  fromCol: number,
  fromRow: number,
  dc: number,
  dr: number
) => {
  if (dc === 0 || dr === 0) return true; // Not diagonal
  // Check the two cells we'd clip through
  return (
    !isCellBlocked(fromCol + dc, fromRow) &&
    !isCellBlocked(fromCol, fromRow + dr)
  );
};

const computeBotPath = () => {
  const cols = Math.floor(CANVAS_WIDTH / BOT_CELL_SIZE);
  const rows = Math.floor(CANVAS_HEIGHT / BOT_CELL_SIZE);
  const total = cols * rows;

  const startCell = worldToCell(player.x, player.y);
  const startIdx = startCell.row * cols + startCell.col;

  const prev = new Int32Array(total);
  const visited = new Uint8Array(total);
  prev.fill(-1);

  // Pre-compute blocked cells (accounts for current obstacle positions)
  const blocked = new Uint8Array(total);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      blocked[r * cols + c] = isCellBlocked(c, r) ? 1 : 0;
    }
  }

  // If start is blocked, find nearest unblocked cell
  if (blocked[startIdx]) {
    // Try to find escape
    for (let radius = 1; radius < 10; radius++) {
      for (let dr = -radius; dr <= radius; dr++) {
        for (let dc = -radius; dc <= radius; dc++) {
          const nc = startCell.col + dc;
          const nr = startCell.row + dr;
          if (nc < 0 || nr < 0 || nc >= cols || nr >= rows) continue;
          const ni = nr * cols + nc;
          if (!blocked[ni]) {
            // Return path to this escape cell
            return [cellToWorld(nc, nr)];
          }
        }
      }
    }
    return [];
  }

  const q = new Int32Array(total);
  let qh = 0;
  let qt = 0;
  q[qt++] = startIdx;
  visited[startIdx] = 1;

  // 8-direction neighbors with diagonal validation
  const neighbors = [
    { dc: 1, dr: 0 },
    { dc: -1, dr: 0 },
    { dc: 0, dr: 1 },
    { dc: 0, dr: -1 },
    { dc: 1, dr: 1 },
    { dc: 1, dr: -1 },
    { dc: -1, dr: 1 },
    { dc: -1, dr: -1 },
  ];

  const isGoal = (c: number, r: number) => {
    const p = cellToWorld(c, r);
    return p.x >= BOT_GOAL_X;
  };

  let goalIdx = -1;
  while (qh < qt) {
    const cur = q[qh++]!;
    const cr = Math.floor(cur / cols);
    const cc = cur - cr * cols;

    if (isGoal(cc, cr)) {
      goalIdx = cur;
      break;
    }

    for (const n of neighbors) {
      const nc = cc + n.dc;
      const nr = cr + n.dr;
      if (nc < 0 || nr < 0 || nc >= cols || nr >= rows) continue;
      const ni = nr * cols + nc;
      if (visited[ni]) continue;
      if (blocked[ni]) continue;

      // For diagonals, check corner clipping
      if (!canMoveDiagonal(cc, cr, n.dc, n.dr)) continue;

      visited[ni] = 1;
      prev[ni] = cur;
      q[qt++] = ni;
    }
  }

  if (goalIdx === -1) return [];

  const pathCells: number[] = [];
  let curIdx = goalIdx;
  while (curIdx !== -1 && curIdx !== startIdx) {
    pathCells.push(curIdx);
    curIdx = prev[curIdx]!;
  }
  pathCells.reverse();

  return pathCells.map((idx) => {
    const r = Math.floor(idx / cols);
    const c = idx - r * cols;
    return cellToWorld(c, r);
  });
};

const getBotMove = () => {
  // Periodically recompute path to handle moving obstacles
  botRecomputeTimer++;
  if (botRecomputeTimer > 8) {
    botRecomputeTimer = 0;
    botPath = computeBotPath();
  }

  // Recompute path if missing
  if (botPath.length === 0) {
    botPath = computeBotPath();
  }

  // If we still don't have a path, do a tiny safe jiggle to escape
  if (botPath.length === 0) {
    const jiggle = [
      { dx: PLAYER_SPEED, dy: 0 },
      { dx: 0, dy: PLAYER_SPEED },
      { dx: 0, dy: -PLAYER_SPEED },
      { dx: -PLAYER_SPEED, dy: 0 },
      { dx: PLAYER_SPEED * 0.7, dy: PLAYER_SPEED * 0.7 },
      { dx: PLAYER_SPEED * 0.7, dy: -PLAYER_SPEED * 0.7 },
      { dx: -PLAYER_SPEED * 0.7, dy: PLAYER_SPEED * 0.7 },
      { dx: -PLAYER_SPEED * 0.7, dy: -PLAYER_SPEED * 0.7 },
    ];
    for (const d of jiggle) {
      const nx = player.x + d.dx;
      const ny = player.y + d.dy;
      if (!checkCollisionAt(nx, ny)) return d;
    }
    return { dx: 0, dy: 0 };
  }

  // Advance waypoints when reached
  const wp = botPath[0];
  if (!wp) return { dx: 0, dy: 0 };
  const vx = wp.x - player.x;
  const vy = wp.y - player.y;
  const dist = Math.sqrt(vx * vx + vy * vy);
  if (dist <= BOT_WAYPOINT_EPS) {
    botPath.shift();
    return getBotMove();
  }

  // Obstacle-aware speed + safe-step clamping:
  // - fast in open space
  // - slow down near obstacles (helps avoid clipping corners)
  const padding = (player.radius ?? 0) + 4;
  const nearest = nearestObstacleDistance(player.x, player.y) - padding;
  const openRadius = BOT_CELL_SIZE * 1.25;
  const dangerRadius = BOT_CELL_SIZE * 0.5;
  const t = Math.max(
    0,
    Math.min(1, (nearest - dangerRadius) / (openRadius - dangerRadius))
  );
  const botMax = PLAYER_SPEED;
  const botMin = Math.max(1, PLAYER_SPEED * 0.25);
  const desiredSpeed = botMin + (botMax - botMin) * t;

  const desiredDx = (vx / dist) * desiredSpeed;
  const desiredDy = (vy / dist) * desiredSpeed;
  const safe = clampSafeStep(desiredDx, desiredDy, desiredSpeed);

  if (safe.dx === 0 && safe.dy === 0) {
    botStuckFrames++;
    if (botStuckFrames > 10) {
      botPath = computeBotPath();
      botStuckFrames = 0;
    }

    // Try a small perpendicular nudge (helps around moving blocks)
    const ux = vx / dist;
    const uy = vy / dist;
    const perp = [
      { dx: -uy * botMin, dy: ux * botMin },
      { dx: uy * botMin, dy: -ux * botMin },
    ];
    for (const p of perp) {
      const n = clampSafeStep(p.dx, p.dy, botMin);
      if (n.dx !== 0 || n.dy !== 0) return n;
    }

    return { dx: 0, dy: 0 };
  }

  botStuckFrames = 0;
  return safe;
};

const checkCollisionAt = (x: number, y: number) => {
  // Check boundaries
  if (x < player.radius! || x > CANVAS_WIDTH - player.radius!) return true;
  if (y < player.radius! || y > CANVAS_HEIGHT - player.radius!) return true;

  // Check obstacles
  for (const obs of obstacles) {
    const closestX = Math.max(obs.x, Math.min(x, obs.x + obs.w!));
    const closestY = Math.max(obs.y, Math.min(y, obs.y + obs.h!));

    const distanceX = x - closestX;
    const distanceY = y - closestY;
    const distanceSquared = distanceX * distanceX + distanceY * distanceY;

    if (distanceSquared < player.radius! * player.radius!) {
      return true;
    }
  }

  return false;
};

const willCollideAlongStep = (dx: number, dy: number, samples = 6) => {
  const stepLen = Math.sqrt(dx * dx + dy * dy);
  if (stepLen === 0) return false;

  const ux = dx / stepLen;
  const uy = dy / stepLen;
  const radius = player.radius!;

  for (let i = 1; i <= samples; i++) {
    const t = i / samples;
    const px = player.x + ux * stepLen * t;
    const py = player.y + uy * stepLen * t;

    if (px < radius || px > CANVAS_WIDTH - radius) return true;
    if (py < radius || py > CANVAS_HEIGHT - radius) return true;

    for (const obs of obstacles) {
      const ox = obs.x + (obs.vx || 0) * t;
      const oy = obs.y + (obs.vy || 0) * t;
      const closestX = Math.max(ox, Math.min(px, ox + obs.w!));
      const closestY = Math.max(oy, Math.min(py, oy + obs.h!));

      const dxObs = px - closestX;
      const dyObs = py - closestY;
      if (dxObs * dxObs + dyObs * dyObs < radius * radius) return true;
    }
  }

  return false;
};

const distanceToRect = (
  x: number,
  y: number,
  rx: number,
  ry: number,
  rw: number,
  rh: number
) => {
  const closestX = Math.max(rx, Math.min(x, rx + rw));
  const closestY = Math.max(ry, Math.min(y, ry + rh));
  const dx = x - closestX;
  const dy = y - closestY;
  return Math.sqrt(dx * dx + dy * dy);
};

const nearestObstacleDistance = (x: number, y: number) => {
  let best = Number.POSITIVE_INFINITY;
  for (const obs of obstacles) {
    const d = distanceToRect(x, y, obs.x, obs.y, obs.w!, obs.h!);
    if (d < best) best = d;
  }
  return best;
};

const clampSafeStep = (dx: number, dy: number, maxStep: number) => {
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len === 0) return { dx: 0, dy: 0 };

  const ux = dx / len;
  const uy = dy / len;

  // Try full step first, then shrink
  let step = maxStep;
  for (let i = 0; i < 7; i++) {
    const stepDx = ux * step;
    const stepDy = uy * step;
    if (!willCollideAlongStep(stepDx, stepDy))
      return { dx: stepDx, dy: stepDy };
    step *= 0.5;
  }
  return { dx: 0, dy: 0 };
};

const generateLevel = (lvl: number) => {
  obstacles = [];

  // Difficulty scaling
  const isMedium = lvl >= 3;
  const isHard = lvl >= 6;

  const obstacleCount = 10 + lvl * 3;
  const moveSpeed = isMedium ? 1 + lvl * 0.2 : 0;
  const minGap = isHard ? 60 : isMedium ? 80 : 120;

  // Playable area (between start and finish)
  const playAreaX = START_ZONE_WIDTH;
  const playAreaW = CANVAS_WIDTH - START_ZONE_WIDTH - FINISH_ZONE_WIDTH;

  // Grid based generation to ensure some structure
  const cols = 10;
  const rows = 8;
  const cellW = playAreaW / cols;
  const cellH = CANVAS_HEIGHT / rows;

  // Create a "path" using a random walk so it's always solvable
  const pathCells = new Set<string>();
  let currRow = Math.floor(rows / 2);
  let currCol = 0;

  while (currCol < cols) {
    pathCells.add(`${currCol},${currRow}`);
    // Move randomly: right, up, or down
    const move = Math.random();
    if (move < 0.5) {
      currCol++; // Move right
    } else if (move < 0.75 && currRow > 0) {
      currRow--; // Move up
    } else if (move >= 0.75 && currRow < rows - 1) {
      currRow++; // Move down
    }
    // Ensure we eventually move right if we get stuck moving up/down too much
    if (Math.random() < 0.1) currCol++;
  }

  // Fill non-path cells with obstacles
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      if (pathCells.has(`${c},${r}`)) continue;

      // Chance to spawn obstacle in this cell
      if (Math.random() < 0.4 + lvl * 0.02) {
        const type = isMedium && Math.random() > 0.7 ? "moving" : "static";

        // Add some randomness to size and position within cell
        const w = cellW * (0.5 + Math.random() * 0.4);
        const h = cellH * (0.5 + Math.random() * 0.4);
        const x = playAreaX + c * cellW + (cellW - w) / 2;
        const y = r * cellH + (cellH - h) / 2;

        obstacles.push({
          x,
          y,
          w,
          h,
          type,
          vx:
            type === "moving"
              ? Math.random() < 0.5
                ? moveSpeed
                : -moveSpeed
              : 0,
          vy:
            type === "moving"
              ? Math.random() < 0.5
                ? moveSpeed
                : -moveSpeed
              : 0,
          color: type === "moving" ? "#f87171" : "#475569", // Red for moving, Slate for static
        });
      }
    }
  }

  // Add some random moving particles for Hard mode that ignore the grid
  if (isHard) {
    for (let i = 0; i < lvl; i++) {
      obstacles.push({
        x: playAreaX + Math.random() * playAreaW,
        y: Math.random() * CANVAS_HEIGHT,
        w: 15,
        h: 15,
        type: "moving",
        vx: (Math.random() - 0.5) * (moveSpeed * 1.5),
        vy: (Math.random() - 0.5) * (moveSpeed * 1.5),
        color: "#ef4444",
      });
    }
  }
};

const handleKeyDown = (e: KeyboardEvent) => {
  const key = e.key.toLowerCase();
  if (key in keys) keys[key as keyof typeof keys] = true;
};

const handleKeyUp = (e: KeyboardEvent) => {
  const key = e.key.toLowerCase();
  if (key in keys) keys[key as keyof typeof keys] = false;
};

const update = () => {
  if (gameOver.value) return;

  // 1. Move Player
  let dx = 0;
  let dy = 0;

  if (botActive.value) {
    // Bot is in control
    const botMove = getBotMove();
    dx = botMove.dx;
    dy = botMove.dy;
  } else {
    // Manual control
    const arrowSpeed = PLAYER_SPEED * 0.3; // Arrows are 70% slower

    // WASD keys (normal speed)
    if (keys.w) dy -= PLAYER_SPEED;
    if (keys.s) dy += PLAYER_SPEED;
    if (keys.a) dx -= PLAYER_SPEED;
    if (keys.d) dx += PLAYER_SPEED;

    // Arrow keys (slower speed)
    if (keys.arrowup) dy -= arrowSpeed;
    if (keys.arrowdown) dy += arrowSpeed;
    if (keys.arrowleft) dx -= arrowSpeed;
    if (keys.arrowright) dx += arrowSpeed;
  }

  // Normalize diagonal movement
  if (dx !== 0 && dy !== 0) {
    const length = Math.sqrt(dx * dx + dy * dy);
    dx = (dx / length) * PLAYER_SPEED;
    dy = (dy / length) * PLAYER_SPEED;
  }

  player.x += dx;
  player.y += dy;

  // Boundary checks
  if (player.x < player.radius!) player.x = player.radius!;
  if (player.x > CANVAS_WIDTH - player.radius!)
    player.x = CANVAS_WIDTH - player.radius!;
  if (player.y < player.radius!) player.y = player.radius!;
  if (player.y > CANVAS_HEIGHT - player.radius!)
    player.y = CANVAS_HEIGHT - player.radius!;

  // 2. Move Obstacles
  obstacles.forEach((obs) => {
    if (obs.type === "moving" && !disableMovingObjects.value) {
      obs.x += obs.vx!;
      obs.y += obs.vy!;

      // Bounce off walls (vertical only for simplicity in grid, or bounds)
      if (obs.y <= 0 || obs.y + obs.h! >= CANVAS_HEIGHT) {
        obs.vy = -obs.vy!;
      }
      // Bounce horizontally within play area
      if (
        obs.x <= START_ZONE_WIDTH ||
        obs.x + obs.w! >= CANVAS_WIDTH - FINISH_ZONE_WIDTH
      ) {
        obs.vx = -obs.vx!;
      }
    }
  });

  // 3. Collision Detection
  // Check obstacles
  for (const obs of obstacles) {
    // Circle-Rectangle collision
    // Find the closest point on the rectangle to the center of the circle
    const closestX = Math.max(obs.x, Math.min(player.x, obs.x + obs.w!));
    const closestY = Math.max(obs.y, Math.min(player.y, obs.y + obs.h!));

    const distanceX = player.x - closestX;
    const distanceY = player.y - closestY;

    const distanceSquared = distanceX * distanceX + distanceY * distanceY;

    if (distanceSquared < player.radius! * player.radius!) {
      handleGameOver();
      return;
    }
  }

  // 4. Win Condition
  if (player.x > CANVAS_WIDTH - FINISH_ZONE_WIDTH + player.radius!) {
    level.value++;
    resetLevel();
  }
};

const handleGameOver = () => {
  gameOver.value = true;
  // Create explosion particles
  for (let i = 0; i < 20; i++) {
    particles.push({
      x: player.x,
      y: player.y,
      vx: (Math.random() - 0.5) * 10,
      vy: (Math.random() - 0.5) * 10,
      radius: Math.random() * 4 + 2,
      color: player.color,
    });
  }
};

const draw = () => {
  if (!ctx) return;

  // Clear background
  ctx.fillStyle = "#1e293b"; // slate-800
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Draw Zones
  // Start Zone
  ctx.fillStyle = "rgba(34, 197, 94, 0.1)"; // green-500 low opacity
  ctx.fillRect(0, 0, START_ZONE_WIDTH, CANVAS_HEIGHT);
  ctx.strokeStyle = "#22c55e";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(START_ZONE_WIDTH, 0);
  ctx.lineTo(START_ZONE_WIDTH, CANVAS_HEIGHT);
  ctx.stroke();

  // Finish Zone
  ctx.fillStyle = "rgba(239, 68, 68, 0.1)"; // red-500 low opacity
  ctx.fillRect(
    CANVAS_WIDTH - FINISH_ZONE_WIDTH,
    0,
    FINISH_ZONE_WIDTH,
    CANVAS_HEIGHT
  );
  ctx.strokeStyle = "#ef4444";
  ctx.beginPath();
  ctx.moveTo(CANVAS_WIDTH - FINISH_ZONE_WIDTH, 0);
  ctx.lineTo(CANVAS_WIDTH - FINISH_ZONE_WIDTH, CANVAS_HEIGHT);
  ctx.stroke();

  // Draw Labels
  ctx.fillStyle = "#4ade80";
  ctx.font = "bold 16px sans-serif";
  ctx.fillText("START", 20, 30);

  ctx.fillStyle = "#f87171";
  ctx.fillText("FINISH", CANVAS_WIDTH - 80, 30);

  // Draw Obstacles
  obstacles.forEach((obs) => {
    ctx!.fillStyle = obs.color || "#475569";

    // Add a glow effect for moving obstacles
    if (obs.type === "moving") {
      ctx!.shadowColor = obs.color!;
      ctx!.shadowBlur = 10;
    } else {
      ctx!.shadowBlur = 0;
    }

    // Rounded rect for better look
    ctx!.beginPath();
    ctx!.roundRect(obs.x, obs.y, obs.w!, obs.h!, 4);
    ctx!.fill();
    ctx!.shadowBlur = 0; // Reset
  });

  // Draw Player
  if (!gameOver.value) {
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius!, 0, Math.PI * 2);
    ctx.fillStyle = player.color!;
    ctx.shadowColor = player.color!;
    ctx.shadowBlur = 15;
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  // Draw Particles (if game over)
  if (gameOver.value) {
    particles.forEach((p, index) => {
      p.x += p.vx!;
      p.y += p.vy!;
      p.radius! *= 0.95; // shrink

      ctx!.beginPath();
      ctx!.arc(p.x, p.y, p.radius!, 0, Math.PI * 2);
      ctx!.fillStyle = p.color!;
      ctx!.fill();
    });
  }
};

const gameLoop = () => {
  update();
  draw();
  if (!gameOver.value || particles.some((p) => p.radius! > 0.5)) {
    animationId = requestAnimationFrame(gameLoop);
  }
};

onMounted(() => {
  initGame();
});

onUnmounted(() => {
  cancelAnimationFrame(animationId);
  window.removeEventListener("keydown", handleKeyDown);
  window.removeEventListener("keyup", handleKeyUp);
});
</script>
