export function calculateWinner(scoreBoard: Array<null | "X" | "O">) {
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
    const [x, y, z] = winLines[i];
    if (
      scoreBoard[x] &&
      scoreBoard[x] === scoreBoard[y] &&
      scoreBoard[x] === scoreBoard[z]
    ) {
      return scoreBoard[x];
    }
  }
  return null;
}
