import React from "react";
import { render, screen } from "@testing-library/react";
import App, { players } from "./App";
import * as fc from "fast-check";
import TicTacToe, { createSquares } from "./TicTacToe";
import {
  reducer,
  determineNextPlayer,
  getInitialGameState,
} from "./App";
import userEvent from "@testing-library/user-event";

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
  const inputs = [3, 4, 5, 6];
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
then the value of the cell should not change`, () => {
  const initialGameState = getInitialGameState();
  initialGameState.board[0][0] = players[0].symbol;
  initialGameState.currentPlayerIndex = players.length - 1;

  const finalGameState = reducer(initialGameState, {
    type: "MarkSquare",
    data: { coords: [0, 0], players },
  });

  expect(finalGameState.board[0][0]).toEqual(initialGameState.board[0][0]);
});

test(`given that the game state has some symbols
when the number of squares is changed
then the game state should be reset, and the squares should be empty`, () => {
  const initialGameState = getInitialGameState();

  [3, 4, 5, 6].forEach((size) => {
    const finalGameState = reducer(initialGameState, {
      type: "UpdateGameSize",
      data: { value: size },
    });

    console.log("final game state -> ", finalGameState);

    render(<TicTacToe dispatch={jest.fn()} gameState={finalGameState} />);

    expect(screen.getAllByTestId("square").length).toEqual(size * size);
    expect(finalGameState.numSquares).toEqual(size);
  });
});

test.todo(`given that the game is in progress
when the current player is player x
then the text should show that its player x's turn`);

test.todo(`given that the game is rendered
when the number of squares has been set to x by x
then the number of squares on the screen should be x by x`);

test.todo(`given that the game is in progress
when the game state contains a winning pattern for player x,
then the game should show player x as the winner`);

test.todo(`given that the game is over
when either of the players clicks on a square
then the clicked square should not change`);
