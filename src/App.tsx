import styled from "styled-components";
import Board from "./components/Board";
import Panel from "./components/Panel";

// const SQUARES_NUMBER = 9;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

function App() {
  return (
    <Container>
      <Panel />
      <Board />
    </Container>
  );
}

export default App;
