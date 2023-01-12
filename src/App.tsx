import { useReducer } from "react";
import "./App.css";
import TicTacToe, { createSquares } from "./TicTacToe";
import { GameState, Action, ActionTypes, Player } from "./types";
import cloneDeep from "lodash.clonedeep";

function App() {
  const [state, dispatch] = useReducer(reducer, initialGameState);

  return <TicTacToe gameState={state} dispatch={dispatch} />;
}

export default App;

export const players: Player[] = [
  { name: "Player 1", symbol: "x" },
  { name: "Player 2", symbol: "o" },
];

export const initialGameState: GameState = {
  board: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  numSquares: 3,
  currentPlayerIndex: 0,
  status: "inProgress",
  errorMsg: "",
};

export function getInitialGameState(): GameState {
  return { ...initialGameState, board: [...initialGameState.board] };
}

const reducerConfig: Record<
  ActionTypes,
  (state: GameState, data?: any) => GameState
> = {
  Reset: (state: GameState) => ({
    ...state,
    board: createSquares(state.numSquares),
  }),
  UpdateNumSquares: (
    state: GameState,
    data: { numSquares: GameState["numSquares"] }
  ) => ({
    ...state,
    numSquares: data.numSquares,
  }),
  MarkSquare: (
    state: GameState,
    data: { coords: [number, number]; players: Player[] }
  ) => {
    const [x, y] = data.coords;
    if (state.board[x][y]) return state;
    if (state.status === "foundAWinner") return state;

    const stateCopy = cloneDeep(state);
    stateCopy.board[x][y] = players[state.currentPlayerIndex].symbol;
    return {
      ...state,
      board: stateCopy.board,
    };
  },
  UpdateGameSize: (state: GameState, data: { value: number }) => {
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
  if (currentPlayerIndex + 1 === players.length) return 0;
  return currentPlayerIndex + 1;
}
