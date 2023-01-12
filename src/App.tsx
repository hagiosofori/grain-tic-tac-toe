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

const DEFAULT_NUM_SQUARES = 3;

export const initialGameState: GameState = {
  board: createSquares(DEFAULT_NUM_SQUARES),
  numSquares: DEFAULT_NUM_SQUARES,
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
  Reset: getInitialGameState,

  MarkSquare: (
    state: GameState,
    data: { coords: [number, number]; players: Player[] }
  ) => {
    const [x, y] = data.coords;

    if (state.board[x][y]) return state;
    if (state.status === "foundAWinner") return state;

    const stateCopy = cloneDeep(state);
    const row = stateCopy.board[x];
    console.log("row ->", row);
    row[y] = players[state.currentPlayerIndex].symbol;

    return {
      ...stateCopy,
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
  if (currentPlayerIndex + 1 === players.length) return 0;
  return currentPlayerIndex + 1;
}
