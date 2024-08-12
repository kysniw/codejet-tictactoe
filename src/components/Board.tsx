import styled from "styled-components";
import Square from "./Square";
import { useEffect } from "react";
import { calculateWinner } from "../libs/functions";
import { GameMachineSnapshot, ActorGameMachineRef } from "../libs/types";

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
