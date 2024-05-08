import { useReducer } from "react";
import "./App.css";
import Board from "./components/Board/Board";
import AppContext from "./contexts/Context";
import BrowseBtn from "./Browser/BrowseBtn";
import { reducer } from "./reducer/reducer";
import { initGameState } from "./constant";
import Browser from "./Browser/Browser";

function App() {
  const [appState, dispatch] = useReducer(reducer, initGameState);

  const providerState = {
    appState,
    dispatch,
  };

  return (
    <AppContext.Provider value={providerState}>
      <div className="App">
        <Board />
        <BrowseBtn />
        <Browser />
      </div>
    </AppContext.Provider>
  );
}

export default App;
