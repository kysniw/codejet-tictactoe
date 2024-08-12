import styled from "styled-components";
import Board from "./components/Board";
import Panel from "./components/Panel";
import { useActorRef, useMachine } from "@xstate/react";
import { gameStateMachine } from "./gameMachine";

// const SQUARES_NUMBER = 9;

const Container = styled.div`
  position: relative;
  background-size: cover;
  background-image: url("./background.svg");
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 3rem 5rem;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex-direction: row-reverse;

  @media screen and (max-width: 900px) {
    flex-direction: column-reverse;
    align-items: center;
    padding: 2rem;
  }
`;

const BGJar = styled.div`
  position: absolute;
  background-color: rgb(0, 36, 84);
  color: white;
  border-radius: 0.5rem 0.5rem 0 0;
  padding: 0.5rem 1rem;
  bottom: 0;
  /* inset: 0; */
`;

function App() {
  const [state] = useMachine(gameStateMachine);
  const actor = useActorRef(gameStateMachine);
  return (
    <Container>
      <Card>
        <Panel state={state} actor={actor} />
        <Board state={state} actor={actor} />
      </Card>
      <BGJar>
        Free SVG Background by{" "}
        <a target="_blank" href="https://bgjar.com">
          BGJar
        </a>
      </BGJar>
    </Container>
  );
}

export default App;
