import { Player, GameState } from "./types";
import deepFreeze from "deep-freeze";
import { createSquares } from "./helpers";


export const LOCALSTORAGE_KEY = 'tictactoe-gamestate';

export const players: Player[] = [
  { name: "Player 1", symbol: "x" },
  { name: "Player 2", symbol: "o" },
];

export const DEFAULT_NUM_SQUARES = 3;

export const BOARD_SIZE_OPTIONS = [3, 4, 5, 6];

export const initialGameState: GameState = deepFreeze({
  board: createSquares(DEFAULT_NUM_SQUARES),
  numSquares: DEFAULT_NUM_SQUARES,
  currentPlayerIndex: 0,
  status: "inProgress",
  errorMsg: "",
  numMoves: 0,
}) as GameState;

// for testing
export const winningPatterns = [
  {
    name: "6x6 horizontal winner",
    result: true,
    board: [
      ["x", "", "x", "", "", ""],
      ["x", "", "x", "", "", ""],
      ["o", "", "o", "x", "x", ""],
      ["x", "o", "x", "o", "o", "o"],
      ["", "o", "", "x", "", ""],
      ["", "", "o", "x", "o", ""],
    ],
    winningSquares: [
      [3, 3],
      [3, 4],
      [3, 5],
    ],
    symbol: "o",
  },
  {
    name: "5x5 horizontal winner",
    result: true,
    board: [
      ["x", "", "x", "", ""],
      ["o", "", "o", "x", "x"],
      ["x", "o", "x", "", ""],
      ["", "o", "", "x", ""],
      ["", "", "o", "o", "o"],
    ],
    winningSquares: [
      [4, 2],
      [4, 3],
      [4, 4],
    ],
    symbol: "o",
  },
  {
    name: "4x4 horizontal winner",
    result: true,
    board: [
      ["o", "", "o", ""],
      ["", "x", "x", "x"],
      ["", "o", "", "x"],
      ["", "o", "", ""],
    ],
    winningSquares: [
      [1, 1],
      [1, 2],
      [1, 3],
    ],
    symbol: "x",
  },
  {
    name: "3x3 horizontal winner",
    result: true,
    board: [
      ["x", "", "x"],
      ["", "x", ""],
      ["o", "o", "o"],
    ],
    winningSquares: [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    symbol: "o",
  },

  // false
  {
    name: "6x6 horizontal no winner",
    result: false,
    board: [
      ["x", "", "x", "", "", ""],
      ["x", "", "x", "", "", ""],
      ["o", "", "o", "x", "x", ""],
      ["x", "o", "x", "o", "", "o"],
      ["", "o", "", "x", "", ""],
      ["", "", "o", "x", "o", ""],
    ],
    winningSquares: null,
    symbol: "o",
  },
  {
    name: "5x5 horizontal no winner",
    result: false,
    board: [
      ["x", "", "x", "", ""],
      ["o", "", "o", "x", "x"],
      ["x", "o", "x", "", ""],
      ["", "o", "", "x", ""],
      ["", "", "o", "", "o"],
    ],
    winningSquares: null,
    symbol: "o",
  },
  {
    name: "4x4 horizontal no winner",
    result: false,
    board: [
      ["o", "", "o", ""],
      ["", "x", "", "x"],
      ["", "o", "", "x"],
      ["", "o", "", ""],
    ],
    winningSquares: null,
    symbol: "x",
  },
  {
    name: "3x3 horizontal no winner",
    result: false,
    board: [
      ["x", "", "x"],
      ["", "x", ""],
      ["o", "", "o"],
    ],
    winningSquares: null,
    symbol: "o",
  },

  //vertical true
  {
    name: "3x3 vertical winner",
    result: true,
    board: [
      ["x", "", "o"],
      ["", "x", "o"],
      ["o", "x", "o"],
    ],
    winningSquares: [
      [0, 2],
      [1, 2],
      [2, 2],
    ],

    symbol: "o",
  },
  {
    name: "4x4 vertical winner",
    result: true,
    board: [
      ["x", "", "x", ""],
      ["o", "x", "", ""],
      ["o", "x", "o", ""],
      ["o", "o", "x", ""],
    ],
    winningSquares: [
      [1, 0],
      [2, 0],
      [3, 0],
    ],
    symbol: "o",
  },
  {
    name: "5x5 vertical winner",
    result: true,
    board: [
      ["x", "", "x", "", ""],
      ["", "x", "", "", ""],
      ["", "o", "o", "", ""],
      ["x", "x", "o", "", ""],
      ["x", "o", "o", "", ""],
    ],
    winningSquares: [
      [2, 2],
      [3, 2],
      [4, 2],
    ],
    symbol: "o",
  },
  {
    name: "6x6 vertical winner",
    result: true,
    board: [
      ["x", "", "x", "", "", ""],
      ["", "x", "", "", "", ""],
      ["o", "", "o", "", "", ""],
      ["x", "x", "o", "", "o", ""],
      ["o", "x", "o", "", "", ""],
      ["o", "o", "", "", "", ""],
    ],
    winningSquares: [
      [2, 2],
      [3, 2],
      [4, 2],
    ],
    symbol: "o",
  },

  // diagonal right down true
  {
    name: "3x3 diag right down winner",
    result: true,
    board: [
      ["x", "", "o"],
      ["", "x", "x"],
      ["o", "o", "x"],
    ],
    winningSquares: [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    symbol: "x",
  },
  {
    name: "4x4 diag right down winner",
    result: true,
    board: [
      ["o", "", "o", ""],
      ["o", "x", "", ""],
      ["x", "", "x", ""],
      ["x", "o", "x", "x"],
    ],
    winningSquares: [
      [1, 1],
      [2, 2],
      [3, 3],
    ],
    symbol: "x",
  },
  {
    name: "5x5 diag right down winner",
    result: true,
    board: [
      ["x", "", "x", "", ""],
      ["", "o", "o", "", ""],
      ["", "o", "x", "o", ""],
      ["x", "x", "", "", "o"],
      ["o", "o", "x", "", ""],
    ],
    winningSquares: [
      [1, 2],
      [2, 3],
      [3, 4],
    ],
    symbol: "o",
  },
  {
    name: "6x6 diag right down winner",
    result: true,
    board: [
      ["x", "", "x", "", "", ""],
      ["", "x", "", "o", "", ""],
      ["o", "", "o", "", "o", ""],
      ["x", "x", "", "", "o", "o"],
      ["o", "x", "o", "", "", ""],
      ["o", "o", "", "", "", ""],
    ],
    winningSquares: [
      [1, 3],
      [2, 4],
      [3, 5],
    ],
    symbol: "o",
  },

  // diagonal left down
  {
    name: "3x3 diag left down winner",
    result: true,
    board: [
      ["", "", "x"],
      ["", "x", "o"],
      ["x", "o", "x"],
    ],
    winningSquares: [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
    symbol: "x",
  },
  {
    name: "4x4 diag left down winner",
    result: true,
    board: [
      ["o", "", "o", ""],
      ["o", "x", "o", ""],
      ["x", "o", "", ""],
      ["o", "o", "x", "x"],
    ],
    winningSquares: [
      [1, 2],
      [2, 1],
      [3, 0],
    ],
    symbol: "o",
  },
  {
    name: "5x5 diag left down winner",
    result: true,
    board: [
      ["x", "", "x", "", ""],
      ["", "o", "", "", ""],
      ["", "o", "x", "o", ""],
      ["x", "x", "o", "", "o"],
      ["o", "o", "x", "", ""],
    ],
    winningSquares: [
      [2, 3],
      [3, 2],
      [4, 1],
    ],
    symbol: "o",
  },
  {
    name: "6x6 diag left down winner",
    result: true,
    board: [
      ["x", "", "x", "", "o", ""],
      ["", "x", "", "o", "", ""],
      ["o", "", "o", "", "x", ""],
      ["x", "x", "", "", "o", "x"],
      ["o", "x", "o", "", "", ""],
      ["o", "o", "", "", "", ""],
    ],
    winningSquares: [
      [0, 4],
      [1, 3],
      [2, 2],
    ],
    symbol: "o",
  },
];
