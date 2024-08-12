import styled from "styled-components";
import Square from "./Square";
import { SnapshotFrom, ActorRefFrom } from "xstate";
import { gameStateMachine } from "../gameMachine";
import { useEffect } from "react";

const Grid = styled.div`
  display: grid;
  flex-grow: 1;
  width: 100%;
  max-width: 400px;
  min-width: 200px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  border: 0.1rem solid white;
  box-shadow: 0 0 0.3rem white;
`;

type GameMachineSnapshot = SnapshotFrom<typeof gameStateMachine>;
type ActorGameMachineRef = ActorRefFrom<typeof gameStateMachine>;

const Board = ({
  state,
  actor,
}: {
  state: GameMachineSnapshot;
  actor: ActorGameMachineRef;
}) => {
  // console.log(state.context.count);

  useEffect(() => {
    const winner = calculateWinner(state.context.scoreBoard);
    if (winner) {
      actor.send({ type: "won" });
    } else if (state.context.count === 9) {
      actor.send({ type: "draw" });
    }
  }, [state, actor]);

  const onMove = (index: number) => {
    const newScoreBoard = state.context.scoreBoard.map((squareValue, i) => {
      if (i === index) {
        if (state.context.isPlayerO) return "O";
        else return "X";
      } else return squareValue;
    });

    // console.log(newScoreBoard);

    actor.send({ type: "move", value: newScoreBoard });
  };

  const generateSquares = state.context.scoreBoard.map((square, index) => (
    <Square key={index} index={index} square={square} onClick={onMove} />
  ));

  return <Grid>{generateSquares}</Grid>;
};

export default Board;

function calculateWinner(scoreBoard: Array<null | "X" | "O">) {
  const winLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winLines.length; i++) {
    const [a, b, c] = winLines[i];
    if (
      scoreBoard[a] &&
      scoreBoard[a] === scoreBoard[b] &&
      scoreBoard[a] === scoreBoard[c]
    ) {
      return scoreBoard[a];
    }
  }
  return null;
}
