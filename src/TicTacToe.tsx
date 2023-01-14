import { GameState, Action } from "./types";
import styled from "styled-components";
import { BOARD_SIZE_OPTIONS, players } from "./constants";
import { isWinningSquare, storage } from "./helpers";

function TicTacToe({
  gameState,
  dispatch,
}: {
  gameState: GameState;
  dispatch: React.Dispatch<Action>;
}) {
  const { board, numSquares, status, winningPlayerIndex, winningSquares } =
    gameState;

  return (
    <Wrapper>
      <div>
        <h4 style={{ textAlign: "center" }}>Change board size</h4>
        {BOARD_SIZE_OPTIONS.map((value) => (
          <Label key={value}>
            <input
              data-testdata={value}
              type="radio"
              checked={numSquares === value}
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
      <RenderStatusText
        status={status}
        winningPlayerIndex={winningPlayerIndex}
      />
      <Table>
        <tbody>
          {board.map((row, rowIndex) => (
            <tr key={`${rowIndex}a`}>
              {row.map((cell, cellIndex) => (
                <td key={`${rowIndex}${cellIndex}`}>
                  <Button
                    isWinningSquare={isWinningSquare(
                      [rowIndex, cellIndex],
                      winningSquares
                    )}
                    data-testid="square"
                    type="button"
                    onClick={() => {
                      dispatch({
                        type: "MarkSquare",
                        data: {
                          coords: [rowIndex, cellIndex],
                          players,
                          storage,
                        },
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

const RenderStatusText = ({
  status,
  winningPlayerIndex,
}: {
  status: GameState["status"];
  winningPlayerIndex: GameState["winningPlayerIndex"];
}) => {
  switch (status) {
    case "draw": {
      return <h3>Draw!</h3>;
    }
    case "foundAWinner": {
      if (winningPlayerIndex === null) return <div />;
      return <h3>{`Winner: ${players[winningPlayerIndex].name}!`}</h3>;
    }
    default: {
      return <Space />;
    }
  }
};

const Wrapper = styled.div`
  padding: 10px;
  min-width: 100px;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Space = styled.div`
  height: 60px;
  width: 100%;
`;

const Table = styled.table`
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
    rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  padding: 10px;
`;

const Button = styled.button<{ isWinningSquare: boolean }>`
  width: 40px;
  height: 40px;
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
  color: black;
`;

const Label = styled.label`
  margin: 10px;
  font-size: 20px;
`;
