import { GameState, ActionTypes, Action } from "./types";
import { players, initialGameState } from "./App";

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
          {board.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={`${rowIndex}${cellIndex}`}>
                  <button
                    data-testid="square"
                    type="button"
                    onClick={() => {
                      dispatch({
                        type: "MarkSquare",
                        data: { coords: [rowIndex, cellIndex], players },
                      });
                    }}
                  >
                    {cell}
                  </button>
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
