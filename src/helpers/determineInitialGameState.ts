import { Storage, GameState } from "../types";

export default function determineInitialGameState(
  storage: Storage,
  initialGameState: GameState
): GameState {
  const gameStateFromLocalStorage = storage.readFromLocalStorage();

  if (gameStateFromLocalStorage) return gameStateFromLocalStorage;

  return initialGameState;
}
