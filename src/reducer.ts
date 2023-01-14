import {
  GameState,
  Action,
  ActionTypes,
  UpdateGameSizeData,
} from "./types";
import { players, initialGameState } from "./constants";
import { MarkSquareData, ResetData } from "./types";
import {
  createSquares,
  determineNextPlayer,
  findWinner,
  updateBoard,
} from "./helpers";

export default function reducer(state: GameState, action: Action) {
  const updateFn = reducerConfig[action.type];
  return updateFn(state, action.data);
}

const reducerConfig: Record<
  ActionTypes,
  (state: GameState, data: any) => GameState
> = {
  Reset: (state: GameState, data: ResetData) => {
    const updatedGameState = {
      ...initialGameState,
      numSquares: state.numSquares,
      board: createSquares(state.numSquares),
    };

    data.storage.updateLocalStorage(updatedGameState);

    return updatedGameState;
  },

  MarkSquare: (state: GameState, data: MarkSquareData) => {
    const [x, y] = data.coords;

    if (state.board[x][y]) return state;
    if (state.status !== "inProgress") return state;

    const board = updateBoard(
      state.board,
      x,
      y,
      players[state.currentPlayerIndex].symbol
    );

    const { isFoundWinner: isWinnerFound, winningSquares } = findWinner(
      board,
      players[state.currentPlayerIndex].symbol
    );

    const isDraw =
      state.numMoves + 1 === state.numSquares * state.numSquares &&
      !isWinnerFound;

    const updatedGameState = {
      ...state,
      board,
      currentPlayerIndex: determineNextPlayer(
        state.currentPlayerIndex,
        players
      ),
      winningSquares,
      winningPlayerIndex: isWinnerFound ? state.currentPlayerIndex : null,
      status: (isWinnerFound
        ? "foundAWinner"
        : isDraw
        ? "draw"
        : state.status) as GameState["status"],
      numMoves: state.numMoves + 1,
    };

    data.storage.updateLocalStorage(updatedGameState);

    return updatedGameState;
  },

  UpdateGameSize: (_: GameState, data: UpdateGameSizeData) => {
    return {
      ...initialGameState,
      numSquares: data.value,
      board: createSquares(data.value),
    } as GameState;
  },
};
