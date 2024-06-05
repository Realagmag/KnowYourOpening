import { config } from "@fortawesome/fontawesome-svg-core";
import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useToken } from "./TokenContext";
import { initializeGameState } from "./../constant";
import { getDefaultPosition } from "../components/Pieces/PiecesHelper";
const OpeningContext = createContext();

export const useOpening = () => useContext(OpeningContext);

export const OpeningProvider = ({ children, initializeGameState }) => {
  const [currentOpening, setCurrentOpening] = useState(null);
  const { currentToken } = useToken();
  const defaultPosition = getDefaultPosition();

  const config = {
    headers: {
      Authorization: `Bearer ${currentToken}`,
      "Content-Type": "application/json",
    },
  };

  const playOpening = (opening) => {
    console.log("CLICKING OPENING")
    console.log(opening);
    let openingId = opening.id;
    axios
    .get(`http://localhost:8080/game/new/${openingId}`, config)
    .then(async (response) => {
      setCurrentOpening(opening);
      // await initializeGameState();

    }).catch((error) => {
      console.error("Error:", error);
    });
  };

  return (
    <OpeningContext.Provider value={{ currentOpening, playOpening }}>
      {children}
    </OpeningContext.Provider>
  );
};
