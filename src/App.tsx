import deepFreeze from "deep-freeze";
import { useReducer } from "react";
import "./App.css";
import TicTacToe, { createSquares } from "./TicTacToe";
import { GameState, Action, ActionTypes, Player } from "./types";

function App() {
  const [state, dispatch] = useReducer(reducer, initialGameState);

  return <TicTacToe gameState={state} dispatch={dispatch} />;
}

export default App;

export const players: Player[] = [
  { name: "Player 1", symbol: "x" },
  { name: "Player 2", symbol: "o" },
];

const DEFAULT_NUM_SQUARES = 3;

export const initialGameState: GameState = deepFreeze({
  board: createSquares(DEFAULT_NUM_SQUARES),
  numSquares: DEFAULT_NUM_SQUARES,
  currentPlayerIndex: 0,
  status: "inProgress",
  errorMsg: "",
  numMoves: 0,
}) as GameState;

export function getInitialGameState(): GameState {
  return initialGameState;
}

const reducerConfig: Record<
  ActionTypes,
  (state: GameState, data?: any) => GameState
> = {
  Reset: getInitialGameState,

  MarkSquare: (
    state: GameState,
    data: { coords: [number, number]; players: Player[] }
  ) => {
    const [x, y] = data.coords;

    if (state.board[x][y]) return state;
    if (state.status === "foundAWinner") return state;

    const board = updateBoard(
      state.board,
      x,
      y,
      players[state.currentPlayerIndex].symbol
    );

    const isWinnerFound = findWinner(
      state.board,
      players[state.currentPlayerIndex].symbol
    );

    const isDraw =
      state.numMoves + 1 === state.numSquares * state.numSquares &&
      !isWinnerFound;

    return {
      ...state,
      board,
      currentPlayerIndex: determineNextPlayer(
        state.currentPlayerIndex,
        players
      ),
      winningPlayerIndex: isWinnerFound ? state.currentPlayerIndex : null,
      status: isWinnerFound ? "foundAWinner" : isDraw ? "draw" : state.status,
      numMoves: state.numMoves + 1,
    };
  },

  UpdateGameSize: (
    state: GameState,
    data: { value: GameState["numSquares"] }
  ) => {
    return {
      ...state,
      numSquares: data.value,
      board: createSquares(data.value),
    } as GameState;
  },
};

export function reducer(state: GameState, action: Action) {
  const updateFn = reducerConfig[action.type];
  return updateFn(state, action.data);
}

export function determineNextPlayer(
  currentPlayerIndex: number,
  players: Player[]
) {
  if (currentPlayerIndex + 1 >= players.length) return 0;
  return currentPlayerIndex + 1;
}

export function updateBoard(
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

export function findWinner(board: GameState["board"], symbol: string) {
  const horiz = findWinnerInHorizontal(board, symbol);
  const vert = findWinnerInVertical(board, symbol);
  const diagLD = findWinnerInDiagonalLeftDown(board, symbol);
  const diagRD = findWinnerInDiagonalRightDown(board, symbol);

  // console.table({ horiz, vert, diagLD, diagRD });

  return horiz || vert || diagLD || diagRD;
}

function findWinnerInHorizontal(board: GameState["board"], symbol: string) {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length - 2; col++) {
      const pos1 = board[row][col];
      const pos2 = board[row][col + 1];
      const pos3 = board[row][col + 2];

      if (pos1 === symbol && pos2 === symbol && pos3 === symbol) {
        return true;
      }
    }
  }

  return false;
}

function findWinnerInVertical(board: GameState["board"], symbol: string) {
  for (let row = 0; row < board.length - 2; row++) {
    for (let col = 0; col < board[row].length; col++) {
      const pos1 = board[row][col];
      const pos2 = board[row + 1][col];
      const pos3 = board[row + 2][col];
      if (pos1 === symbol && pos2 === symbol && pos3 === symbol) {
        return true;
      }
    }
  }

  return false;
}

function findWinnerInDiagonalRightDown(
  board: GameState["board"],
  symbol: string
) {
  for (let row = 0; row < board.length - 2; row++) {
    for (let col = 0; col < board[row].length - 2; col++) {
      const pos1 = board[row][col];
      const pos2 = board[row + 1][col + 1];
      const pos3 = board[row + 2][col + 2];

      if (pos1 === symbol && pos2 === symbol && pos3 === symbol) return true;
    }
  }

  return false;
}

function findWinnerInDiagonalLeftDown(
  board: GameState["board"],
  symbol: string
) {
  for (let row = 0; row < board.length - 2; row++) {
    for (let col = board[row].length - 1; col > 1; col--) {
      const pos1 = board[row][col];
      const pos2 = board[row + 1][col - 1];
      const pos3 = board[row + 2][col - 2];

      if (pos1 === symbol && pos2 === symbol && pos3 === symbol) return true;
    }
  }

  return false;
}
