import styled from "styled-components";
import { FaO, FaX } from "react-icons/fa6";
import { GameMachineSnapshot } from "../libs/types";
import { AnyEventObject } from "xstate";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 30%;
  gap: 1rem;
  width: 100%;
  max-width: 400px;
  min-width: 200px;
  justify-content: space-between;

  @media screen and (max-width: 900px) {
    flex-direction: row;
  }
`;

const Players = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
`;

const Player = styled.div<{
  $color: string;
  $turn?: boolean;
  $looser?: boolean;
}>`
  flex: 1;
  display: flex;
  aspect-ratio: 1/1;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  background-color: rgba(255, 255, 255, 0.353);
  transition: 0.3s;
  transform: ${(props) => (props.$turn ? "translateY(1rem)" : "translateY(0)")};
  opacity: ${(props) => (props.$looser ? 0 : 1)};

  .icon {
    width: 70%;
    height: 70%;
    color: ${(props) => props.$color};
  }
`;

const Title = styled.h2`
  flex: 2;
  flex-basis: 100%;
  font-size: x-large;
  padding: 1rem;
  color: white;
  font-weight: 700;
  text-align: center;
  border-radius: 0.5rem;
  background-color: rgba(255, 255, 255, 0.353);
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const Button = styled.button`
  background-color: rgba(0, 36, 84, 0.5);
  color: rgb(255, 255, 255);
  border: none;
  outline: none;
  transition: 0.3s;
  font-size: x-large;
  padding: 0.8rem 1.2rem;
  cursor: pointer;
  border-radius: 0.5rem;
  font-weight: 700;
  width: 100%;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.7);
    background-color: rgb(0, 36, 84);
  }

  &:disabled {
    opacity: 0.3;
    cursor: default;
    &:hover {
      transform: none;
      box-shadow: none;
      background-color: rgba(0, 36, 84, 0.5);
    }
  }
`;

const Panel = ({
  state,
  send,
}: {
  state: GameMachineSnapshot;
  send: (event: AnyEventObject) => void;
}) => {
  let title = "Players";

  if (state.matches("won")) title = "Winner";
  else if (state.matches("draw")) title = "Draw";

  return (
    <Container>
      <Players>
        <Title>{title}</Title>
        <Player
          $color="white"
          $turn={state.context.isPlayerO && state.matches("playing")}
          $looser={
            (state.context.isPlayerO && state.matches("won")) ||
            state.matches("draw")
          }
        >
          <FaO className="icon" />
        </Player>
        <Player
          $color="rgb(0, 36, 84)"
          $turn={!state.context.isPlayerO && state.matches("playing")}
          $looser={
            (!state.context.isPlayerO && state.matches("won")) ||
            state.matches("draw")
          }
        >
          <FaX className="icon" />
        </Player>
      </Players>
      <Buttons>
        <Button
          onClick={() => send({ type: "start" })}
          disabled={!state.matches("idle")}
        >
          Start
        </Button>
        <Button onClick={() => send({ type: "reset" })}>Reset</Button>
      </Buttons>
    </Container>
  );
};

export default Panel;
