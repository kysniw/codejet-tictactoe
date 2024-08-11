import styled from "styled-components";
import Board from "./components/Board";
import Panel from "./components/Panel";

// const SQUARES_NUMBER = 9;

const Container = styled.div`
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

function App() {
  return (
    <Container>
      <Card>
        <Panel />
        <Board />
      </Card>
    </Container>
  );
}

export default App;
