import { useReducer } from "react";
import "./App.css";
import Board from "./components/Board/Board";
import AppContext from "./contexts/Context";
import { OpeningProvider } from "./contexts/OpeningContext";
import BrowseBtn from "./Browser/BrowseBtn";
import { reducer } from "./reducer/reducer";
import { initGameState } from "./constant";
import Browser from "./Browser/Browser";
import OpeningBar from "./OpeningBar/OpeningBar";

function App() {
  const [appState, dispatch] = useReducer(reducer, initGameState);

  const providerState = {
    appState,
    dispatch,
  };

  return (
    <OpeningProvider>
      <AppContext.Provider value={providerState}>
        <div className="App">
          <Board />
          <BrowseBtn />
          <Browser />
          <OpeningBar />
        </div>
      </AppContext.Provider>
    </OpeningProvider>
  );
}

export default App;
