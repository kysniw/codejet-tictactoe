import styled from "styled-components";
import { FaO, FaX } from "react-icons/fa6";

const Button = styled.button`
  aspect-ratio: 1/1;
  background: none;
  outline: none;
  border: 0.1rem solid white;
  box-shadow: 0 0 0.3rem white inset;
  cursor: pointer;
  width: 100%;

  .iconX {
    width: 80%;
    height: 80%;
    color: rgb(0, 36, 84);
  }

  .iconO {
    width: 80%;
    height: 80%;
    color: white;
  }
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
  const value =
    square === "X" ? (
      <FaX className="iconX" />
    ) : square === "O" ? (
      <FaO className="iconO" />
    ) : null;

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
