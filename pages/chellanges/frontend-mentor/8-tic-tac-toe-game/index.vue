<template>
  <div
    class="tic-tac-container bg-[#1A2A33] grid place-items-center min-h-screen"
  >
    <!-- <main class="w-full max-w-[460px]">
      <div>
        <div class="flex justify-center">
          <icon-x :width="32" :height="32" />
          <icon-o :width="32" :height="32" />
        </div>
      </div>
      <div class="tic-tac-shadow bg-[#1F3641] p-6 pb-7 w-full mt-10 rounded-xl">
        <h1 class="text-center text-[#A8BFC9] font-bold">
          PICK PLAYER 1'S MARK {{ p1 }}
        </h1>
        <div
          class="p-2 h-[4.5rem] flex place-items-center bg-[#1A2A33] rounded-lg mt-6 relative"
        >
          <div
            class="absolute w-1/2 h-full p-2 transition-all duration-300 ease-in-out"
            :class="[p1 == 'X' ? 'left-0' : 'left-1/2']"
          >
            <div class="bg-[#A8BFC9] w-full h-full rounded-md"></div>
          </div>

          <div
            class="w-1/2 relative cursor-pointer flex h-full place-items-center"
            @click="p1 = 'X'"
          >
            <icon-x
              class="mx-auto"
              :fill="p1 == 'X' ? '#1A2A33' : '#A8BFC9'"
              :width="32"
              :height="32"
            />
          </div>
          <div
            class="w-1/2 relative cursor-pointer flex h-full place-items-center rounded-lg"
            @click="p1 = 'O'"
          >
            <icon-o
              class="mx-auto"
              :fill="p1 == 'O' ? '#1A2A33' : '#A8BFC9'"
              :width="32"
              :height="32"
            />
          </div>
        </div>
        <div
          class="text-[#A8BFC9] text-center mt-4 text-sm opacity-50 font-medium tracking-[0.055rem]"
        >
          REMEMBER: X GOES FIRST
        </div>
      </div>
      <v-button class="w-full mt-10" :variant="'blue'"
        >NEW GAME (VS CPU)</v-button
      >
      <v-button class="w-full mt-5" :variant="'yellow'"
        >NEW GAME (VS Player)</v-button
      >
    </main> -->

    <!-- <v-button :variant="'grey'">NEW GAME (VS CPU)</v-button> -->

    <div class="p-8">
      <div class="flex justify-between">
        <div class="flex gap-x-2">
          <icon-x :width="32" :height="32" />
          <icon-o :width="32" :height="32" />
        </div>
        <div
          class="flex justify-center place-items-center gap-x-2 py-3 bg-[#1F3641] px-2 w-full max-w-[140px] rounded-lg"
          style="box-shadow: inset 0px -4px 0px #10212a"
        >
          <icon-o
            v-if="turn == 'O'"
            :width="20"
            :height="20"
            :fill="'#A8BFC9'"
          />
          <icon-x v-else :width="20" :height="20" :fill="'#A8BFC9'" />
          <div class="text-[#A8BFC9]">TURN</div>
        </div>
        <v-button
          @click="resetGame"
          size="small"
          variant="grey"
          class="w-[52px] grid place-items-center"
          ><icon-restart class="mx-auto block"
        /></v-button>
      </div>
      <div class="grid grid-cols-3 gap-2 mt-5">
        <button
          v-for="(cell, index) in board"
          :key="index"
          class="tic-tac-shadow bg-[#1F3641] outline-none border-none rounded-2xl"
          :class="[getCellClass(cell)]"
          @click="makeMove(index)"
        >
          <template v-if="cell === 'X'">
            <icon-x class="scale-in" />
          </template>
          <template v-else-if="cell === 'O'">
            <icon-o class="scale-in" />
          </template>
        </button>
      </div>
      <div class="flex gap-x-5 mt-5">
        <div class="bg-[#31C3BD] rounded-lg flex-grow text-center py-2">
          <div class="text-sm font-medium">X (P2)</div>
          <div class="text-[#1A2A33] text-2xl">0</div>
        </div>
        <div class="bg-[#A8BFC9] rounded-lg flex-grow text-center py-2">
          <div class="text-sm font-medium">X (P2)</div>
          <div class="text-[#1A2A33] text-2xl">0</div>
        </div>
        <div class="bg-[#F2B137] rounded-lg flex-grow text-center py-2">
          <div class="text-sm font-medium">X (P2)</div>
          <div class="text-[#1A2A33] text-2xl">0</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import iconOOutline from "./components/icon-o-outline.vue";
import iconXOutline from "./components/icon-x-outline.vue";
import iconRestart from "./components/icon-restart.vue";
import iconO from "./components/icon-o.vue";
import iconX from "./components/icon-x.vue";
import logo from "./components/logo.vue";
import vButton from "./components/v-button.vue";

export type Mode = "cpu" | "player";

const board = ref(Array(9).fill(null));
const p1 = ref("O");
const gameOver = ref(false);

const mode = ref<Mode>("player");
const turn = ref("X");

onMounted(() => {
  start();
});

const start = () => {
  if (mode.value === "cpu" && p1.value === "O") {
    setTimeout(() => {
      makeCpuMove();
    }, 500);
  }
};

const getCellClass = (cell: string) => ({
  "w-36 h-36  flex items-center justify-center": true,
  "text-xl font-bold": true,
  "text-red-500": cell === "X",
  "text-blue-500": cell === "O",
});

function makeMove(index: number) {
  if (board.value[index] || gameOver.value) return;

  board.value[index] = turn.value;
  if (checkWin()) {
    alert(`${turn.value} wins!`);
    gameOver.value = true;
    return;
  } else if (board.value.every((cell) => cell)) {
    alert("It's a draw!");
    gameOver.value = true;
    return;
  }
  turn.value = turn.value === "X" ? "O" : "X";
  if (turn.value != p1.value && mode.value === "cpu") {
    setTimeout(() => {
      makeCpuMove();
    }, 500);
  }
}

function minimax(
  board: Array<string | null>,
  depth: number,
  isMaximizing: boolean
) {
  const result = checkWin();

  if (result) {
    if (turn.value === "X") {
      return 1;
    } else if (turn.value === "O") {
      return -1;
    } else if (turn.value === "draw") {
      return 0;
    }
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] == null) {
        board[i] = "X";
        const score = minimax(board, depth + 1, false);
        board[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] == null) {
        board[i] = "O";
        const score = minimax(board, depth + 1, true);
        board[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

function makeCpuMove(difficulty = "easy") {
  console.log("makeCpuMove");

  let index;

  do {
    index = Math.floor(Math.random() * 9);
  } while (board.value[index]);

  board.value[index] = turn.value;
  if (checkWin()) {
    alert(`${turn.value} wins!`);
    gameOver.value = true;
    return;
  }

  turn.value = turn.value === "X" ? "O" : "X";
  console.log("turn.value", turn.value);
}

function resetGame() {
  board.value = Array(9).fill(null);
  turn.value = p1.value === "X" ? "O" : "X";
  gameOver.value = false;
  start();
}

function checkWin() {
  const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winCombinations.some((combination) =>
    combination.every((index) => board.value[index] === turn.value)
  );
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;700&display=swap");

.tic-tac-container {
  @apply font-bold;
  font-family: "Outfit", sans-serif;
}
.tic-tac-shadow {
  box-shadow: inset 0px -8px 0px #10212a;
}

.scale-in {
  /* bounce animation scale 0.5s */
  animation: scale-in 0.5s cubic-bezier(0.39, 2.575, 0.9, 1) both;
}
/* scale in animation */

@keyframes scale-in {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>
