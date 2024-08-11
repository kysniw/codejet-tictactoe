import { assign, createMachine } from "xstate";

export const gameStateMachine = createMachine({
  id: "gameState",
  initial: "playing",
  context: {
    count: 0,
    isPlayerO: true,
    scoreBoard: Array.from(Array(9)).fill(null),
  },
  states: {
    idle: {
      on: { start: "playing" },
    },
    playing: {
      on: {
        won: "won",
        draw: "draw",
        reset: "idle",
        move: {
          actions: assign({
            count: ({ context }) => context.count + 1,
            isPlayerO: ({ context }) => !context.isPlayerO,
            scoreBoard: ({ event }) => event.value,
          }),
        },
      },
    },
    won: {
      on: { reset: "idle" },
    },
    draw: {
      on: { reset: "idle" },
    },
  },
});
