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

function App() {
  const [appState, dispatch] = useReducer(reducer, initGameState);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const providerState = {
    appState,
    dispatch,
  };
  const handleLoginToggle = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  return (
    <OpeningProvider>
      <NotificationProvider>
        <AppContext.Provider value={providerState}>
          <div className="App">
            <LoginModal isOpen={isLoginOpen} onClose={handleLoginToggle} />
            <Board />
            <Notification />
            <BrowseBtn />
            <Browser />
            <button onClick={handleLoginToggle} className="login-button">
              Login
            </button>
            <OpeningBar />
          </div>
        </AppContext.Provider>
      </NotificationProvider>
    </OpeningProvider>
  );
}

export default App;
