import { useReducer, useState } from "react";
import "./App.css";
import Board from "./components/Board/Board";
import AppContext from "./contexts/Context";
import BrowseBtn from "./Browser/BrowseBtn";
import { reducer } from "./reducer/reducer";
import { initGameState } from "./constant";
import Browser from "./Browser/Browser";
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
        </div>
      </AppContext.Provider>
    </NotificationProvider>
  );
}

export default App;
