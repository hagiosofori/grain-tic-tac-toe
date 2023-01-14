import { FoundWinner, GameState } from "../types";

export default function findWinner(
  board: GameState["board"],
  symbol: string
): FoundWinner {
  const horiz = findWinnerInHorizontal(board, symbol);
  const vert = findWinnerInVertical(board, symbol);
  const diagLD = findWinnerInDiagonalLeftDown(board, symbol);
  const diagRD = findWinnerInDiagonalRightDown(board, symbol);

  if (horiz.isFoundWinner) return horiz;
  if (vert.isFoundWinner) return vert;
  if (diagLD.isFoundWinner) return diagLD;
  if (diagRD.isFoundWinner) return diagRD;

  return { isFoundWinner: false, winningSquares: null };
}

function findWinnerInHorizontal(
  board: GameState["board"],
  symbol: string
): FoundWinner {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length - 2; col++) {
      const pos1 = board[row][col];
      const pos2 = board[row][col + 1];
      const pos3 = board[row][col + 2];

      if (pos1 === symbol && pos2 === symbol && pos3 === symbol) {
        return {
          isFoundWinner: true,
          winningSquares: [
            [row, col],
            [row, col + 1],
            [row, col + 2],
          ],
        };
      }
    }
  }

  return { isFoundWinner: false, winningSquares: null };
}

function findWinnerInVertical(
  board: GameState["board"],
  symbol: string
): FoundWinner {
  for (let row = 0; row < board.length - 2; row++) {
    for (let col = 0; col < board[row].length; col++) {
      const pos1 = board[row][col];
      const pos2 = board[row + 1][col];
      const pos3 = board[row + 2][col];
      if (pos1 === symbol && pos2 === symbol && pos3 === symbol) {
        return {
          isFoundWinner: true,
          winningSquares: [
            [row, col],
            [row + 1, col],
            [row + 2, col],
          ],
        };
      }
    }
  }

  return { isFoundWinner: false, winningSquares: null };
}

function findWinnerInDiagonalRightDown(
  board: GameState["board"],
  symbol: string
): FoundWinner {
  for (let row = 0; row < board.length - 2; row++) {
    for (let col = 0; col < board[row].length - 2; col++) {
      const pos1 = board[row][col];
      const pos2 = board[row + 1][col + 1];
      const pos3 = board[row + 2][col + 2];

      if (pos1 === symbol && pos2 === symbol && pos3 === symbol)
        return {
          isFoundWinner: true,
          winningSquares: [
            [row, col],
            [row + 1, col + 1],
            [row + 2, col + 2],
          ],
        };
    }
  }

  return { isFoundWinner: false, winningSquares: null };
}

function findWinnerInDiagonalLeftDown(
  board: GameState["board"],
  symbol: string
): FoundWinner {
  for (let row = 0; row < board.length - 2; row++) {
    for (let col = board[row].length - 1; col > 1; col--) {
      const pos1 = board[row][col];
      const pos2 = board[row + 1][col - 1];
      const pos3 = board[row + 2][col - 2];

      if (pos1 === symbol && pos2 === symbol && pos3 === symbol)
        return {
          isFoundWinner: true,
          winningSquares: [
            [row, col],
            [row + 1, col - 1],
            [row + 2, col - 2],
          ],
        };
    }
  }

  return { isFoundWinner: false, winningSquares: null };
}
