import { GameState } from "./types";

function TicTacToe({ gameState }: { gameState: GameState }) {
  const { board } = gameState;

  return (
    <div>
      <table>
        {board.map((row, rIndex) => (
          <tr key={rIndex}>
            {row.map((cell, i) => (
              <td key={`${i}${cell}`}><button>{cell}</button></td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  );
}

export default TicTacToe;

export function createSquares(dimension: number) {
  const dim = Math.abs(dimension);
  const twoDArray = new Array(dim).fill(Array(dim).fill(""));

  return twoDArray;
}
