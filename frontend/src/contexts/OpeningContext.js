import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { config } from "@fortawesome/fontawesome-svg-core";
import { useToken } from "./TokenContext";

const OpeningContext = createContext();

export const useOpening = () => useContext(OpeningContext);

export const OpeningProvider = ({ children }) => {
  const [currentOpening, setCurrentOpening] = useState(null);
  const { currentToken } = useToken();
  const config = {
    headers: {
      Authorization: `Bearer ${currentToken}`,
    },
  };
  const playOpening = (opening) => {
    console.log("Playing opening");
    console.log(opening);
    setCurrentOpening(opening);
    axios.get(`http://localhost:8080/game/new/${opening.id}`, config)
      .then(response => {
        console.log(response.data);
        setCurrentOpening(response.data);
      })
      .catch(error => {
        console.error("Error starting game:", error);
      });
  };
  return (
    <OpeningContext.Provider value={{ currentOpening, playOpening }}>
      {children}
    </OpeningContext.Provider>
  );
};
