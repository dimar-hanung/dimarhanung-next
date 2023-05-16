<template>
  <div
    class="tic-tac-container bg-[#1A2A33] grid place-items-center min-h-screen"
  >
    <Transition name="fade" mode="in-out">
      <div
        v-if="modal"
        class="fade-in z-10 fixed w-screen h-screen bg-[#000000] bg-opacity-50 grid place-items-center left-0"
      >
        <div
          class="bg-[#1F3641] w-full h-1/2 max-h-[280px] flex place-items-center"
        >
          <div
            class="scale-in delay-500 mx-auto text-xs sm:text-base text-center"
          >
            <div class="text-[#A8BFC9]" v-if="playerWinner == 'CPU'">
              OH NO, YOU LOST...
            </div>
            <div class="text-[#A8BFC9]" v-else-if="playerWinner == 'YOU'">
              CONGRATULATIONS, YOU WON!
            </div>
            <div class="text-[#A8BFC9]" v-else-if="playerWinner == 'P1'">
              PLAYER 1 WINS!
            </div>
            <div class="text-[#A8BFC9]" v-else-if="playerWinner == 'P2'">
              PLAYER 2 WINS!
            </div>
            <div
              class="text-[#A8BFC9] text-4xl"
              v-else-if="playerWinner == 'TIE'"
            >
              ROUND TIED!
            </div>
            <div>
              <div
                v-if="winner == 'X'"
                class="flex place-items-center gap-x-4 justify-center mt-2 sm:mt-4 text-base sm:text-4xl text-[#31C3BD]"
              >
                <icon-x class="w-9 sm:w-auto" /> TAKES THE ROUND
              </div>
              <div
                v-else-if="winner == 'O'"
                class="flex place-items-center gap-x-4 justify-center mt-2 sm:mt-4 text-base sm:text-4xl text-[#F2B137]"
              >
                <icon-o class="w-9 sm:w-auto" /> TAKES THE ROUND
              </div>
            </div>
            <div class="flex gap-x-4 mt-7">
              <v-button class="w-full" variant="grey" size="small" @click="quit"
                >QUIT</v-button
              >
              <v-button
                class="w-full whitespace-nowrap px-3"
                variant="yellow"
                size="small"
                @click="nextRound"
                >NEXT ROUND</v-button
              >
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <main v-if="!started" class="p-3 w-full max-w-[375px] sm:max-w-[460px]">
      <div>
        <div class="flex gap-x-4 justify-center">
          <icon-x :width="32" :height="32" />
          <icon-o :width="32" :height="32" />
        </div>
      </div>
      <div class="tic-tac-shadow bg-[#1F3641] p-6 pb-7 w-full mt-10 rounded-xl">
        <h1 class="text-center text-[#A8BFC9] font-bold">
          PICK PLAYER 1'S MARK
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
      <v-button
        class="w-full mt-10"
        :variant="'blue'"
        @click="start({ mode: 'cpu' })"
        >NEW GAME (VS CPU)</v-button
      >
      <v-button
        class="w-full mt-5"
        :variant="'yellow'"
        @click="start({ mode: 'player' })"
        >NEW GAME (VS Player)</v-button
      >
    </main>

    <div v-else class="w-full max-w-[460px]">
      <div class="flex justify-between w-full">
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
      <div class="grid grid-cols-3 gap-2 sm:gap-5 mt-5 aspect-square">
        <button
          v-for="(cell, index) in board"
          :key="index"
          class="tic-tac-shadow bg-[#1F3641] outline-none border-none rounded-2xl relative sm:w-[8.75rem] sm:h-[8.75rem] flex items-center justify-center"
          :class="[
            getCellClass(cell),
            winBoard.includes(index)
              ? cell == 'O'
                ? 'bg-[#F2B137]'
                : 'bg-[#31C3BD]'
              : '',
          ]"
          @click="makeMove(index)"
        >
          <div
            class="absolute left-0 top-0 grid place-items-center w-full h-full"
          >
            <icon-x
              v-if="cell === 'X'"
              class="scale-in w-10 sm:w-auto"
              :fill="winBoard.includes(index) ? '#1F3641' : '#31C3BD'"
            />
            <icon-o
              v-else-if="cell === 'O'"
              class="scale-in w-10 sm:w-auto"
              :fill="winBoard.includes(index) ? '#1F3641' : '#F2B137'"
            />
          </div>
          <div
            v-if="!cell && !isCpuTurn"
            class="opacity-0 hover:opacity-100 absolute left-0 top-0 grid place-items-center w-full h-full transition-all"
          >
            <icon-x-outline v-if="turn == 'X'" />
            <icon-o-outline v-else />
          </div>
        </button>
      </div>
      <div class="flex gap-x-5 mt-5">
        <div class="bg-[#31C3BD] rounded-lg w-1/3 text-center py-2">
          <div class="text-sm font-medium">X ({{ getXPlayer }})</div>
          <div class="text-[#1A2A33] text-2xl">{{ score.X }}</div>
        </div>
        <div class="bg-[#A8BFC9] rounded-lg w-1/3 text-center py-2">
          <div class="text-sm font-medium">TIES</div>
          <div class="text-[#1A2A33] text-2xl">{{ score.T }}</div>
        </div>
        <div class="bg-[#F2B137] rounded-lg w-1/3 text-center py-2">
          <div class="text-sm font-medium">O ({{ getOPlayer }})</div>
          <div class="text-[#1A2A33] text-2xl">{{ score.O }}</div>
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

useSeoMeta({
  title: "Front-End Mentor - Tic Tac Toe Game",
  description: "Front-End Mentor - Tic Tac Toe Game with tailwind css",
});

const board = ref(Array(9).fill(null));
const p1 = ref("O");
const gameOver = ref(false);
const started = ref(false);

const mode = ref<Mode>("cpu");
const turn = ref<"X" | "O">("X");

const modal = ref(false);
const winner = ref<"X" | "O" | "T" | null>(null);
const winBoard = ref<Array<number | null>>([]);
const isCpuTurn = ref(false);
const playerWinner = computed(() => {
  if (mode.value == "cpu") {
    if (p1.value == "X" && winner.value == "X") {
      return "YOU";
    }
    if (p1.value == "O" && winner.value == "O") {
      return "YOU";
    }
    if (winner.value == "T") {
      return "TIE";
    }
    return "CPU";
  }

  if (p1.value == "X" && winner.value == "X") {
    return "P1";
  }
  if (p1.value == "O" && winner.value == "O") {
    return "P1";
  }

  if (winner.value == "T") {
    return "TIE";
  }

  return "P2";
});
const score = reactive({
  X: 0,
  O: 0,
  T: 0,
});

// onMounted(() => {
//   start();
// });

const start = (options: { mode?: Mode }) => {
  turn.value = "X";
  modal.value = false;
  started.value = true;
  winBoard.value = [];
  if (options.mode) {
    mode.value = options.mode;
  }
  if (mode.value === "cpu" && p1.value === "O") {
    makeCpuMove();
  }
};

const nextRound = () => {
  board.value = Array(9).fill(null);
  gameOver.value = false;
  modal.value = false;
  start({});
};

const getOPlayer = computed(() => {
  // check if x p1 or p2 or cpu
  if (mode.value === "cpu") {
    return p1.value === "X" ? "CPU" : "YOU";
  } else {
    return p1.value === "X" ? "P2" : "P1";
  }
});

const getXPlayer = computed(() => {
  // check if x p1 or p2 or cpu
  if (mode.value === "cpu") {
    return p1.value === "O" ? "CPU" : "YOU";
  } else {
    return p1.value === "O" ? "P2" : "P1";
  }
});

const quit = () => {
  modal.value = false;
  started.value = false;
  board.value = Array(9).fill(null);
  gameOver.value = false;
  score.X = 0;
  score.O = 0;
  score.T = 0;
};

const getCellClass = (cell: string) => ({
  "text-red-500": cell === "X",
  "text-blue-500": cell === "O",
});

function makeMove(index: number) {
  if (board.value[index] || gameOver.value || isCpuTurn.value) return;

  board.value[index] = turn.value;
  if (checkWin()) {
    // alert(`${turn.value} wins!`);
    score[turn.value] += 1;
    winner.value = turn.value;
    gameOver.value = true;
    setTimeout(() => {
      modal.value = true;
    }, 500);
    return;
  } else if (board.value.every((cell) => cell)) {
    winner.value = "T";
    score.T += 1;
    gameOver.value = true;
    setTimeout(() => {
      modal.value = true;
    }, 500);
    return;
  }
  turn.value = turn.value === "X" ? "O" : "X";
  if (turn.value != p1.value && mode.value === "cpu") {
    makeCpuMove();
  }
}

function makeCpuMove(difficulty = "easy") {
  console.log("makeCpuMove");

  isCpuTurn.value = true;
  setTimeout(() => {
    let index;

    do {
      index = Math.floor(Math.random() * 9);
    } while (board.value[index]);

    board.value[index] = turn.value;
    isCpuTurn.value = false;
    if (checkWin()) {
      score[turn.value] += 1;
      winner.value = turn.value;
      gameOver.value = true;
      setTimeout(() => {
        modal.value = true;
      }, 500);
      return;
    } else if (board.value.every((cell) => cell)) {
      winner.value = "T";
      score.T += 1;
      gameOver.value = true;
      setTimeout(() => {
        modal.value = true;
      }, 500);
      return;
    }

    turn.value = turn.value === "X" ? "O" : "X";
    console.log("turn.value", turn.value);
  }, 500);
}

function resetGame() {
  board.value = Array(9).fill(null);
  turn.value = "X";
  gameOver.value = false;
  start({});
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

  const win = winCombinations.find((combination) =>
    combination.every((index) => board.value[index] === turn.value)
  );

  if (win) {
    winBoard.value = win;
  }

  return win;
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

.fade-in {
  /* bounce animation scale 0.5s */
  animation: fade-in 0.5s ease;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
