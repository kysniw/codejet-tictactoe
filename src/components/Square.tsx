import styled from "styled-components";

const Button = styled.button`
  aspect-ratio: 1/1;
  background: none;
  outline: none;
  border: 1px solid black;
  cursor: pointer;
  border-radius: 0;
  width: 100%;
  box-shadow: 0 0 4px gray inset;
`;

const Square = ({
  index,
  square,
  onClick,
}: {
  index: number;
  square: null | string;
  onClick: (index: number) => void;
}) => {
  const value = square === "X" ? "X" : square === "O" ? "O" : null;

  const onSquareClick = () => {
    onClick(index);
  };

  return (
    <Button onClick={onSquareClick} disabled={value !== null}>
      {value}
    </Button>
  );
};

export default Square;
