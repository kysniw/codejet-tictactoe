import styled from "styled-components";
import Square from "./Square";
import { useEffect } from "react";
import { calculateWinner } from "../libs/functions";
import { GameMachineSnapshot } from "../libs/types";
import { AnyEventObject } from "xstate";

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
  send,
}: {
  state: GameMachineSnapshot;
  send: (event: AnyEventObject) => void;
}) => {
  // console.log(state.context.count);

  useEffect(() => {
    const winner = calculateWinner(state.context.scoreBoard);
    if (winner) {
      send({ type: "won" });
    } else if (state.context.count === 9) {
      send({ type: "draw" });
    }
  }, [state, send]);

  const onMove = (index: number) => {
    const newScoreBoard = state.context.scoreBoard.map((squareValue, i) => {
      if (i === index) {
        if (state.context.isPlayerO) return "O";
        else return "X";
      } else return squareValue;
    });

    // console.log(newScoreBoard);

    send({ type: "move", value: newScoreBoard });
  };

  const generateSquares = state.context.scoreBoard.map((square, index) => (
    <Square key={index} index={index} square={square} onClick={onMove} />
  ));

  return <Grid>{generateSquares}</Grid>;
};

export default Board;
