import { GameState, ActionTypes, Action } from "./types";

function TicTacToe({
  gameState,
  dispatch,
}: {
  gameState: GameState;
  dispatch: React.Dispatch<Action>;
}) {
  const { board } = gameState;

  return (
    <div>
      <button
        onClick={() => {
          dispatch({ type: "Reset" });
        }}
      >
        Reset
      </button>
      <table>
        <tbody>
          {board.map((row, rIndex) => (
            <tr key={rIndex}>
              {row.map((cell, i) => (
                <td key={`${i}${cell}`}>
                  <button>{cell}</button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
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
