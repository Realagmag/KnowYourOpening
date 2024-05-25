import { useReducer, useState } from "react";
import "./App.css";
import Board from "./components/Board/Board";
import AppContext from "./contexts/Context";
import { OpeningProvider } from "./contexts/OpeningContext";
import BrowseBtn from "./Browser/BrowseBtn";
import { reducer } from "./reducer/reducer";
import { initGameState } from "./constant";
import Browser from "./Browser/Browser";
import OpeningBar from "./OpeningBar/OpeningBar";
import Notification from "./components/Notification/Notification";
import { NotificationProvider } from "./contexts/NotificationContext";
import LoginModal from "./Login/LoginModal";
import { TokenProvider } from "./contexts/TokenContext";

function App() {
  const [appState, dispatch] = useReducer(reducer, initGameState);
  const [isLoginOpen, setIsLoginOpen] = useState(true);
  const providerState = {
    appState,
    dispatch,
  };

  const closeLoginModal = () => {
    setIsLoginOpen(false);
  };

  return (
    <TokenProvider>
      <OpeningProvider>
        <NotificationProvider>
          <AppContext.Provider value={providerState}>
            <div className="App">
              <LoginModal isOpen={isLoginOpen} onClose={closeLoginModal} />
              <Board />
              <Notification />
              <BrowseBtn />
              <Browser />
              <OpeningBar />
            </div>
          </AppContext.Provider>
        </NotificationProvider>
      </OpeningProvider>
    </TokenProvider>
  );
}

export default App;
