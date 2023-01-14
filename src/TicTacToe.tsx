import { GameState, Action } from "./types";
import { players } from "./App";
import styled from "styled-components";

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
    <Wrapper>
      <div>
        <h4 style={{textAlign: 'center',}}>Change board size</h4>
        {sizes.map((value) => (
          <Label key={value}>
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
          </Label>
        ))}
      </div>
      <ResetButton
        onClick={() => {
          dispatch({ type: "Reset" });
        }}
      >
        Reset
      </ResetButton>
      {gameState.status === "draw" ? <h3>Draw!</h3> : null}
      {gameState.status === "foundAWinner" &&
      gameState.winningPlayerIndex !== null ? (
        <h3>{`Winner: ${players[gameState.winningPlayerIndex].name}!`}</h3>
      ) : (
        <h3>{""}</h3>
      )}
      <Table>
        <tbody>
          {board.map((row, rowIndex) => (
            <tr key={`${rowIndex}a`}>
              {row.map((cell, cellIndex) => (
                <td key={`${rowIndex}${cellIndex}`}>
                  <Button
                    isWinningSquare={isWinningSquare(
                      [rowIndex, cellIndex],
                      gameState.winningSquares
                    )}
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
                  </Button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  );
}

export default TicTacToe;

export function createSquares(dimension: number) {
  const dim = Math.abs(dimension);
  const twoDArray = new Array(dim).fill("").map(() => new Array(dim).fill(""));

  return twoDArray;
}

export function isWinningSquare(
  position: [number, number],
  winningSquares: GameState["winningSquares"]
) {
  const [x, y] = position;
  return (
    winningSquares?.some((pair) => pair[0] === x && pair[1] === y) || false
  );
}

const Wrapper = styled.div`
  padding: 10px;
  min-width: 500px;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Table = styled.table`
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
    rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  padding: 10px;
`;

const Button = styled.button<{ isWinningSquare: boolean }>`
  width: 50px;
  height: 50px;
  background: white;
  border: ${({ isWinningSquare }) =>
    `1px solid ${isWinningSquare ? "limegreen" : "black"}`};
  margin: 10px;
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
    rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  font-size: 20px;
`;

const ResetButton = styled.button`
  cursor: pointer;
  margin-top: 30px;
  text-decoration: underline;
  border: none;
  background: white;
  font-size: 16px;
`;

const Label = styled.label`
  margin: 10px;
  font-size: 20px;
`;
