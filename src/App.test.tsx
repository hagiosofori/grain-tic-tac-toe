import React from "react";
import { render, screen } from "@testing-library/react";
import * as fc from "fast-check";
import TicTacToe, { createSquares } from "./TicTacToe";
import App, {
  players,
  reducer,
  determineNextPlayer,
  getInitialGameState,
  updateBoard,
} from "./App";
import userEvent from "@testing-library/user-event";
import { ActionTypes, GameState, Player } from "./types";
import { findWinner } from "./App";

const BOARD_SIZE_OPTIONS = [3, 4, 5, 6];

const winningPatterns = [
  {
    name: "6x6 horizontal winner",
    result: true,
    board: [
      ["x", "", "x", "", "", ""],
      ["x", "", "x", "", "", ""],
      ["o", "", "o", "x", "x", ""],
      ["x", "o", "x", "o", "o", "o"],
      ["", "o", "", "x", "", ""],
      ["", "", "o", "x", "o", ""],
    ],
    symbol: "o",
  },
  {
    name: "5x5 horizontal winner",
    result: true,
    board: [
      ["x", "", "x", "", ""],
      ["o", "", "o", "x", "x"],
      ["x", "o", "x", "", ""],
      ["", "o", "", "x", ""],
      ["", "", "o", "o", "o"],
    ],

    symbol: "o",
  },
  {
    name: "4x4 horizontal winner",
    result: true,
    board: [
      ["o", "", "o", ""],
      ["", "x", "x", "x"],
      ["", "o", "", "x"],
      ["", "o", "", ""],
    ],

    symbol: "x",
  },
  {
    name: "3x3 horizontal winner",
    result: true,
    board: [
      ["x", "", "x"],
      ["", "x", ""],
      ["o", "o", "o"],
    ],

    symbol: "o",
  },

  // false
  {
    name: "6x6 horizontal no winner",
    result: false,
    board: [
      ["x", "", "x", "", "", ""],
      ["x", "", "x", "", "", ""],
      ["o", "", "o", "x", "x", ""],
      ["x", "o", "x", "o", "", "o"],
      ["", "o", "", "x", "", ""],
      ["", "", "o", "x", "o", ""],
    ],
    symbol: "o",
  },
  {
    name: "5x5 horizontal no winner",
    result: false,
    board: [
      ["x", "", "x", "", ""],
      ["o", "", "o", "x", "x"],
      ["x", "o", "x", "", ""],
      ["", "o", "", "x", ""],
      ["", "", "o", "", "o"],
    ],

    symbol: "o",
  },
  {
    name: "4x4 horizontal no winner",
    result: false,
    board: [
      ["o", "", "o", ""],
      ["", "x", "", "x"],
      ["", "o", "", "x"],
      ["", "o", "", ""],
    ],

    symbol: "x",
  },
  {
    name: "3x3 horizontal no winner",
    result: false,
    board: [
      ["x", "", "x"],
      ["", "x", ""],
      ["o", "", "o"],
    ],

    symbol: "o",
  },

  //vertical true
  {
    name: "3x3 vertical winner",
    result: true,
    board: [
      ["x", "", "o"],
      ["", "x", "o"],
      ["o", "x", "o"],
    ],

    symbol: "o",
  },
  {
    name: "4x4 vertical winner",
    result: true,
    board: [
      ["x", "", "x", ""],
      ["o", "x", "", ""],
      ["o", "x", "o", ""],
      ["o", "o", "x", ""],
    ],

    symbol: "o",
  },
  {
    name: "5x5 vertical winner",
    result: true,
    board: [
      ["x", "", "x", "", ""],
      ["", "x", "", "", ""],
      ["", "o", "o", "", ""],
      ["x", "x", "o", "", ""],
      ["o", "o", "o", "", ""],
    ],

    symbol: "o",
  },
  {
    name: "6x6 vertical winner",
    result: true,
    board: [
      ["x", "", "x", "", "", ""],
      ["", "x", "", "", "", ""],
      ["o", "o", "o", "", "", ""],
      ["x", "x", "o", "", "o", ""],
      ["o", "x", "o", "", "", ""],
      ["o", "o", "", "", "", ""],
    ],

    symbol: "o",
  },

  // diagonal right down true
  {
    name: "3x3 diag right down winner",
    result: true,
    board: [
      ["x", "", "o"],
      ["", "x", "x"],
      ["o", "o", "x"],
    ],

    symbol: "x",
  },
  {
    name: "4x4 diag right down winner",
    result: true,
    board: [
      ["o", "", "o", ""],
      ["o", "x", "", ""],
      ["x", "", "x", ""],
      ["x", "o", "x", "x"],
    ],

    symbol: "x",
  },
  {
    name: "5x5 diag right down winner",
    result: true,
    board: [
      ["x", "", "x", "", ""],
      ["", "o", "o", "", ""],
      ["", "o", "x", "o", ""],
      ["x", "x", "", "", "o"],
      ["o", "o", "x", "", ""],
    ],

    symbol: "o",
  },
  {
    name: "6x6 diag right down winner",
    result: true,
    board: [
      ["x", "", "x", "", "", ""],
      ["", "x", "", "o", "", ""],
      ["o", "", "o", "", "o", ""],
      ["x", "x", "", "", "o", "o"],
      ["o", "x", "o", "", "", ""],
      ["o", "o", "", "", "", ""],
    ],

    symbol: "o",
  },

  // diagonal left down
  {
    name: "3x3 diag left down winner",
    result: true,
    board: [
      ["", "", "x"],
      ["", "x", "o"],
      ["x", "o", "x"],
    ],

    symbol: "x",
  },
  {
    name: "4x4 diag left down winner",
    result: true,
    board: [
      ["o", "", "o", ""],
      ["o", "x", "o", ""],
      ["x", "o", "", ""],
      ["o", "o", "x", "x"],
    ],

    symbol: "o",
  },
  {
    name: "5x5 diag left down winner",
    result: true,
    board: [
      ["x", "", "x", "", ""],
      ["", "o", "", "", ""],
      ["", "o", "x", "o", ""],
      ["x", "x", "o", "", "o"],
      ["o", "o", "x", "", ""],
    ],

    symbol: "o",
  },
  {
    name: "6x6 diag left down winner",
    result: true,
    board: [
      ["x", "", "x", "", "o", ""],
      ["", "x", "", "o", "", ""],
      ["o", "", "o", "", "x", ""],
      ["x", "x", "", "", "o", "x"],
      ["o", "x", "o", "", "", ""],
      ["o", "o", "", "", "", ""],
    ],

    symbol: "o",
  },
];

test(`given that the game has started
then the squares should all be empty`, async () => {
  render(<App />);
  const squares = screen.getAllByTestId("square");

  squares.forEach((each) => {
    expect(each.textContent).toEqual("");
  });
});

// property based test. commented out cos it takes a long time to run
// test(`createSquares - creates the correct dimension of squares`, () =>
//   fc.assert(
//     fc.property(fc.integer({min: 0}), (dimension) => {
//       const squares = createSquares(dimension);
//       const outerArrayHasCorrectLength = squares.length === dimension;
//       const innerArraysHaveCorrectLength = squares.reduce((acc, each) => {
//         return each.length === dimension && acc;
//       }, true);

//       expect(innerArraysHaveCorrectLength).toBe(true);
//       expect(outerArrayHasCorrectLength).toBe(true);
//     })
//   ));

test(`createSquares fn - creates the correct dimension of squares`, () => {
  const inputs = BOARD_SIZE_OPTIONS;
  inputs.forEach((each) => {
    const result = createSquares(each);

    const outerArrayHasCorrectLenght = result.length === each;
    const innerArraysHaveCorrectLength = result.reduce((acc, square) => {
      return square.length === each && acc;
    }, true);

    expect(outerArrayHasCorrectLenght).toBe(true);
    expect(innerArraysHaveCorrectLength).toBe(true);
  });
});

test(`given that the game state contains player symbols
when the reset action is triggered
then the squares should all become empty`, () => {
  const initialGameState = getInitialGameState();
  const gameState = {
    ...initialGameState,
    board: [["x", "x", "o"], ...createSquares(initialGameState.numSquares - 1)],
  };

  const updatedGameState = reducer(gameState, { type: "Reset" });

  expect(updatedGameState.board).toEqual(initialGameState.board);
});

test(`given that the game is rendered
when the reset button is clicked
then the reset action should be dispatched`, () => {
  const initialGameState = getInitialGameState();
  const dispatch = jest.fn();
  render(<TicTacToe dispatch={dispatch} gameState={initialGameState} />);

  const resetButton = screen.getByRole("button", { name: "Reset" });
  userEvent.click(resetButton);
  expect(dispatch).toHaveBeenCalledWith({ type: "Reset" });
});

test(`determineNextPlayer -- correctly determines the next player index based on current player and players list`, () => {
  expect(
    determineNextPlayer(0, [
      { name: "player1", symbol: "*" },
      { name: "player2", symbol: "+" },
    ])
  ).toEqual(1);

  expect(determineNextPlayer(0, [{ name: "player1", symbol: "*" }])).toEqual(0);

  expect(
    determineNextPlayer(1, [
      { name: "player1", symbol: "*" },
      { name: "player2", symbol: "+" },
      { name: "player3", symbol: "t" },
    ])
  ).toEqual(2);
});

test(`given that the current player is player x
when player x triggers the MarkSquare action
then player x's symbol should show in the square`, () => {
  players.forEach((_, i) => {
    const gameState = {
      ...getInitialGameState(),
      currentPlayerIndex: i,
    };

    const updatedGameState = reducer(gameState, {
      type: "MarkSquare",
      data: { coords: [0, 0], players },
    });
    expect(updatedGameState.board[0][0]).toEqual(
      players[gameState.currentPlayerIndex].symbol
    );
  });
});

test(`given that the game is rendered
when a square is clicked on
then the dispatch function should be called with the MarkSquare action`, () => {
  const dispatch = jest.fn();
  const initialGameState = getInitialGameState();

  render(<TicTacToe gameState={initialGameState} dispatch={dispatch} />);
  const gameSquares = screen.getAllByTestId("square");
  userEvent.click(gameSquares[0]);

  expect(dispatch).toHaveBeenCalledWith({
    type: "MarkSquare",
    data: { coords: [0, 0], players },
  });
});

test(`given that the current player is player x
when player x clicks on a square that already has a symbol
then the value of the cell should not change
  and the number of moves should not increase`, () => {
  const initialGameState = {
    ...getInitialGameState(),
    board: updateBoard(getInitialGameState().board, 0, 0, players[0].symbol),
    currentPlayerIndex: players.length - 1,
    numMoves: 1,
  };

  const finalGameState = reducer(initialGameState, {
    type: "MarkSquare",
    data: { coords: [0, 0], players },
  });

  expect(finalGameState.board[0][0]).toEqual(initialGameState.board[0][0]);
  expect(finalGameState.numMoves).toEqual(initialGameState.numMoves);
});

test(`given that the game state has some plays
when the number of squares is changed
then the game state should be reset, and the squares should be empty`, () => {
  const initialGameState = getInitialGameState();
  const { rerender } = render(
    <TicTacToe
      dispatch={jest.fn()}
      gameState={{
        ...initialGameState,
        board: updateBoard(initialGameState.board, 0, 0, players[0].symbol),
      }}
    />
  );

  BOARD_SIZE_OPTIONS.forEach((size) => {
    const finalGameState = reducer(initialGameState, {
      type: "UpdateGameSize",
      data: { value: size },
    });

    rerender(<TicTacToe dispatch={jest.fn()} gameState={finalGameState} />);

    const squares = screen.getAllByTestId("square");
    expect(finalGameState.numSquares).toEqual(size);
    expect(squares.length).toEqual(size * size);

    squares.forEach((square) => {
      expect(square.textContent).toEqual("");
    });
  });
});

test(`given that the game is in progress,
when the size control is clicked
then the dispatch function should be called with {type: UpdateGameSize, data:{value: number}}`, () => {
  const dispatch = jest.fn();
  render(<TicTacToe dispatch={dispatch} gameState={getInitialGameState()} />);

  const sizeControls = screen.getAllByRole("radio");

  sizeControls.forEach((control) => {
    const value = parseInt(control.dataset["testdata"] || "0");
    userEvent.click(control);
    expect(dispatch).toHaveBeenCalledWith({
      type: "UpdateGameSize" as ActionTypes,
      data: { value },
    });
  });
});

test(`given that the no plays have been made yet
when the first play is made
then only the square where the play was made should have a value`, () => {
  const initialGameState = { ...getInitialGameState(), currentPlayerIndex: 0 };

  const updatedGameState = reducer(initialGameState, {
    type: "MarkSquare",
    data: { coords: [0, 0], players },
  });

  expect(updatedGameState.board[0][0]).toEqual(players[0].symbol);

  for (let i = 0; i < updatedGameState.board.length; i++) {
    for (let j = 0; j < updatedGameState.board[i].length; j++) {
      if (i === 0 && j === 0) continue;
      expect(updatedGameState.board[i][j]).toEqual("");
    }
  }
});

test(`given that the game is in progress
when the current player plays
the currentPlayerIndex should shift to the next player`, () => {
  const gameState = {
    ...getInitialGameState(),
    currentPlayerIndex: 0,
  };

  const finalGameState = reducer(gameState, {
    type: "MarkSquare",
    data: { coords: [0, 0], players },
  });

  expect(finalGameState.currentPlayerIndex).toEqual(1);
});

test(`given that the game is rendered
when the number of squares has been set to x by x
then the number of squares on the screen should be x by x`, () => {
  const { rerender } = render(
    <TicTacToe gameState={getInitialGameState()} dispatch={jest.fn()} />
  );

  BOARD_SIZE_OPTIONS.forEach((num) => {
    const gameState = {
      ...getInitialGameState(),
      numSquares: num,
      board: createSquares(num),
    } as GameState;

    rerender(<TicTacToe gameState={gameState} dispatch={jest.fn()} />);
    const squares = screen.getAllByTestId("square");
    expect(squares.length).toEqual(num * num);
  });
});

describe("findWinner fn", () => {
  winningPatterns.forEach((pattern) => {
    test(`${pattern.name} 
    given that the game is in progress
    when the game state contains a winning pattern for player x,
    then the game should show player x as the winner`, () => {
      const { isFoundWinner } = findWinner(pattern.board, pattern.symbol);
      expect(isFoundWinner).toEqual(pattern.result);
    });

    test.todo(`${pattern.name} confirm that the winning squares are correct`);
  });
});

test(`given that the game is in progress
when a player fills the final square
  and there is no winner
then the game status should be draw`, () => {
  const oneSpaceLeft = [
    ["", "x", "o"],
    ["o", "o", "x"],
    ["x", "o", "o"],
  ];

  const initialGameState: GameState = {
    ...getInitialGameState(),
    board: oneSpaceLeft,
    numSquares: 3,
    numMoves: 8,
    currentPlayerIndex: 0,
  };

  const finalGameState = reducer(initialGameState, {
    type: "MarkSquare",
    data: { coords: [0, 0], players },
  });

  expect(finalGameState.status).toBe("draw");
});

test(`given that the game is a draw
then the 'Draw!' result should show on the screen`, () => {
  const gameState = {
    ...getInitialGameState(),
    numSquares: 3,
    board: [
      ["x", "o", "x"],
      ["x", "o", "o"],
      ["o", "x", "x"],
    ],
    numMoves: 9,
    currentPlayerIndex: 0,
    status: "draw",
  } as GameState;

  render(<TicTacToe dispatch={jest.fn()} gameState={gameState} />);

  expect(screen.getByRole("heading", { name: "Draw!" })).toBeInTheDocument();
});

test(`given that the game is over (draw | foundAWinner)
when either of the players clicks on a square
then the clicked square should not change`, () => {
  const board = [
    ["o", "x", "x"],
    ["x", "o", "o"],
    ["o", "o", "x"],
  ];
  const players: Player[] = [
    { name: "Player 1", symbol: "a" },
    { name: "Player 2", symbol: "b" },
  ];

  const gameStates: GameState[] = [
    {
      ...getInitialGameState(),
      status: "draw",
      board,
      currentPlayerIndex: 0,
    },
    {
      ...getInitialGameState(),
      status: "foundAWinner",
      board,
      currentPlayerIndex: 0,
    },
  ];

  gameStates.forEach((gameState) => {
    const finalGameState = reducer(gameState, {
      type: "MarkSquare",
      data: { coords: [0, 0], players },
    });

    expect(finalGameState.board[0][0]).not.toEqual(
      players[gameState.currentPlayerIndex].symbol
    );
    expect(finalGameState.board[0][0]).toEqual(gameState.board[0][0]);
  });
});

test(`given that the game is in progress
when a player makes a move
then the numMoves state value should increase by 1`, () => {
  const gameState = {
    ...getInitialGameState(),
    numMoves: 0,
  };

  const finalGameState = reducer(gameState, {
    type: "MarkSquare",
    data: { coords: [0, 0], players },
  });

  expect(finalGameState.numMoves).toEqual(1);
});

test(`given that a winner has been found
then the winner should be displayed on the screen`, () => {
  const gameState: GameState = {
    ...getInitialGameState(),
    numMoves: 9,
    winningPlayerIndex: 0,
    status: "foundAWinner",
  };

  render(<TicTacToe gameState={gameState} dispatch={jest.fn()} />);
  expect(
    screen.getByRole("heading", {
      name: `Winner: ${players[gameState.winningPlayerIndex!].name}!`,
    })
  ).toBeInTheDocument();
});

test(`given that a winner has been found
then the winning squares should be in winningSquares state`, () => {
  const almostWonGameState: GameState = {
    ...getInitialGameState(),
    winningSquares: null,
    board: [
      ["", "", ""],
      ["", "x", ""],
      ["", "", "x"],
    ],
    currentPlayerIndex: 0,
  };

  const finalGameState = reducer(almostWonGameState, {
    type: "MarkSquare",
    data: { coords: [0, 0], players },
  });

  expect(finalGameState.winningSquares).toEqual([
    [0, 0],
    [1, 1],
    [2, 2],
  ]);
});
