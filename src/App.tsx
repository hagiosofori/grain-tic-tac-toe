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

export const initialGameState: GameState = {
  board: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  numSquares: 3,
  currentPlayerIndex: 0,
};

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
    state.board[x][y] = players[state.currentPlayerIndex].symbol;
    return {
      ...state,
      board: state.board,
    };
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
