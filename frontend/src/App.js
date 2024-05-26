import { useState } from "react";
import "./App.css";
import Board from "./components/Board/Board";
import { OpeningProvider } from "./contexts/OpeningContext";
import BrowseBtn from "./Browser/BrowseBtn";
import { initGameState } from "./constant";
import Browser from "./Browser/Browser";
import OpeningBar from "./OpeningBar/OpeningBar";
import Notification from "./components/Notification/Notification";
import { NotificationProvider } from "./contexts/NotificationContext";
import LoginModal from "./Login/LoginModal";
import { TokenProvider } from "./contexts/TokenContext";
import AppContent from "./AppContent";

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(true);

  const closeLoginModal = () => {
    setIsLoginOpen(false);
  };

  return (
    <TokenProvider>
      <OpeningProvider>
        <NotificationProvider>
          <div className="App">
            <LoginModal isOpen={isLoginOpen} onClose={closeLoginModal} />
            <AppContent />
          </div>
        </NotificationProvider>
      </OpeningProvider>
    </TokenProvider>
  );
}

export default App;
