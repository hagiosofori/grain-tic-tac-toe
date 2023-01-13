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

    return {
      ...state,
      board,
      currentPlayerIndex: determineNextPlayer(
        state.currentPlayerIndex,
        players
      ),
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
