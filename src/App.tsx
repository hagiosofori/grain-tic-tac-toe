import { useReducer } from "react";
import styled from "styled-components";
import { initialGameState } from "./constants";
import reducer from "./reducer";
import TicTacToe from "./TicTacToe";
import { determineInitialGameState, storage } from "./helpers";

function App() {
  const [state, dispatch] = useReducer(
    reducer,
    determineInitialGameState(storage, initialGameState)
  );

  return (
    <Wrapper>
      <TicTacToe gameState={state} dispatch={dispatch} />
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background: white;
  align-items: center;
  justify-content: center;
`;
