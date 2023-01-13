import { GameState, Action } from "./types";
import { players } from "./App";
import deepFreeze from "deep-freeze";

const sizes = [3, 4, 5, 6];

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
      <div>
        {sizes.map((value) => (
          <label key={value}>
            <input
              data-testdata={value}
              type="radio"
              checked={gameState.numSquares === value}
              onClick={() => {
                dispatch({ type: "UpdateGameSize", data: { value } });
              }}
              onChange={() => {}}
            />
            {value}
          </label>
        ))}
      </div>
      {gameState.status === "draw" ? <h3>Draw!</h3> : null}
      {gameState.status === "foundAWinner" &&
      gameState.winningPlayerIndex !== null ? (
        <h3>{`Winner: ${players[gameState.winningPlayerIndex].name}!`}</h3>
      ) : null}
      <table>
        <tbody>
          {board.map((row, rowIndex) => (
            <tr key={`${rowIndex}a`}>
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
  const twoDArray = new Array(dim).fill("").map(() => new Array(dim).fill(""));

  return twoDArray;
}
