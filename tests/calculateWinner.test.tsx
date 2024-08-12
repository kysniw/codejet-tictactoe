import { expect, test } from "vitest";
import { calculateWinner } from "../src/libs/functions";
import { type ScoreBoard } from "../src/libs/types";

test("Check winner X for 0, 1, 2 squares", () => {
  const scoreBoard: Array<ScoreBoard> = [
    "X",
    "X",
    "X",
    null,
    null,
    null,
    null,
    null,
    null,
  ];

  expect(calculateWinner(scoreBoard)).toBe("X");
});

test("Check no winner for 0, 2, 3 squares with O", () => {
  const scoreBoard: Array<ScoreBoard> = [
    "O",
    null,
    "O",
    "O",
    null,
    null,
    null,
    null,
    null,
  ];

  expect(calculateWinner(scoreBoard)).toBe(null);
});

test("Check no winner for fulfilled squares with draw", () => {
  const scoreBoard: Array<ScoreBoard> = [
    "O",
    "X",
    "O",
    "O",
    "X",
    "O",
    "X",
    "O",
    "X",
  ];

  expect(calculateWinner(scoreBoard)).toBe(null);
});
