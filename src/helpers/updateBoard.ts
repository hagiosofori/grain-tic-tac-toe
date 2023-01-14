import { GameState } from '../types';

export default function updateBoard(
  board: GameState["board"],
  x: number,
  y: number,
  symbol: string
) {
  return board.map((row, i) =>
    row.map((cell, j) => {
      if (i === x && j === y) return symbol;
      return cell;
    })
  );
}