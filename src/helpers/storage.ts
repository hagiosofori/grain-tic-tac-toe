import { GameState, Storage } from "../types";
import { LOCALSTORAGE_KEY } from "../constants";

function updateLocalStorage(gameState: GameState) {
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(gameState));
}

function readFromLocalStorage(): GameState {
  return JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY) || "");
}

const exports: Storage = {
  updateLocalStorage,
  readFromLocalStorage,
};

export default exports;
