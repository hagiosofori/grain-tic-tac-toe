
import "./App.css";
import TicTacToe from "./TicTacToe";
import { GameState } from './types';

function App() {
  const sampleGameState = { board: [["", "", ""], ["", "", ""]] } as GameState;

  return <TicTacToe gameState={sampleGameState} />;
}

export default App;
