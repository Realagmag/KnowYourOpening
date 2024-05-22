import React, { useReducer, useContext } from 'react';
import "./App.css";
import Board from "./components/Board/Board";
import AppContext from "./contexts/Context";
import BrowseBtn from "./Browser/BrowseBtn";
import { reducer } from "./reducer/reducer";
import { initGameState } from "./constant";
import Browser from "./Browser/Browser";
import Notification from './components/Notification/Notification';
import { NotificationProvider } from './contexts/NotificationContext';
import { NotificationContext } from './contexts/NotificationContext';


function App() {
  const [appState, dispatch] = useReducer(reducer, initGameState);
  const providerState = {
    appState,
    dispatch,
  };

  return (
    <NotificationProvider>
      <AppContext.Provider value={providerState}>
        <div className="App">
          <Board />
          <Notification />
          <BrowseBtn />
          <Browser />
        </div>
      </AppContext.Provider>
    </NotificationProvider>
  );
}

export default App;