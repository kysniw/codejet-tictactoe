import { assign, setup } from "xstate";
import { ScoreBoard } from "./libs/types";

export const gameStateMachine = setup({
  types: {
    context: {} as {
      count: number;
      isPlayerO: boolean;
      scoreBoard: Array<ScoreBoard>;
    },
  },
}).createMachine({
  id: "gameState",
  initial: "idle",
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
        move: {
          actions: assign({
            count: ({ context }) => context.count + 1,
            isPlayerO: ({ context }) => !context.isPlayerO,
            scoreBoard: ({ event }) => event.value,
          }),
        },
        reset: {
          target: "idle",
          actions: assign({
            count: 0,
            isPlayerO: true,
            scoreBoard: Array.from(Array(9)).fill(null),
          }),
        },
      },
    },
    won: {
      on: {
        reset: {
          target: "idle",
          actions: assign({
            count: 0,
            isPlayerO: true,
            scoreBoard: Array.from(Array(9)).fill(null),
          }),
        },
      },
    },
    draw: {
      on: {
        reset: {
          target: "idle",
          actions: assign({
            count: 0,
            isPlayerO: true,
            scoreBoard: Array.from(Array(9)).fill(null),
          }),
        },
      },
    },
  },
});
