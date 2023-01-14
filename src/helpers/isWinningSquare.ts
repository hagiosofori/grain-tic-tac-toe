import { GameState } from "../types";

export default function isWinningSquare(
  position: [number, number],
  winningSquares: GameState["winningSquares"]
) {
  const [x, y] = position;
  return (
    winningSquares?.some((pair) => pair[0] === x && pair[1] === y) || false
  );
}
