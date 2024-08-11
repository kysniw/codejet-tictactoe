import styled from "styled-components";
import Square from "./Square";
import { GameMachineContext } from "../providers";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  width: 400px;
  border: 1px solid black;
  box-shadow: 0 0 20px gray;
`;

const Board = () => {
  const state = GameMachineContext.useSelector((state) => state);
  const actor = GameMachineContext.useActorRef();

  console.log(state.context.count);

  const onMove = (index: number) => {
    // console.log(state.context.isPlayerO);
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
