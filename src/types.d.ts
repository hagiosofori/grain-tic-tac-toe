export interface GameState {
  board: Array<Array<Player1["symbol"] | Player2["symbol"] | "">>;
  numSquares: 3 | 4 | 5 | 6;
  currentPlayerIndex: number;
  status: "inProgress" | "foundAWinner" | "draw";
  errorMsg: string;
  numMoves: number;
  winningPlayerIndex: number | null;
  winningSquares: [[number, number], [number, number], [number, number]] | null;
}

interface FoundWinner {
  isFoundWinner: boolean;
  winningSquares: GameState["winningSquares"];
}

interface Player {
  name: string;
  symbol: string;
}

export interface Action {
  type: ActionTypes;
  data?: any;
}

export type ActionTypes = "Reset" | "MarkSquare" | "UpdateGameSize";

export interface MarkSquareData {
  coords: [number, number];
  players: Player[];
  storage: Storage;
}

export interface UpdateGameSizeData {
  value: GameState["numSquares"];
}

interface UpdateNumSquaresData {
  numSquares: GameState["numSquares"];
}

export interface Storage {
  readFromLocalStorage: () => GameState;
  updateLocalStorage: (gameState: GameState) => void;
}
