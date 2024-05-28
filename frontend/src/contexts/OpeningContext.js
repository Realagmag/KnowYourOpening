import React, { createContext, useContext, useState } from "react";

const OpeningContext = createContext();

export const useOpening = () => useContext(OpeningContext);

export const OpeningProvider = ({ children }) => {
  const [currentOpening, setCurrentOpening] = useState(null);

  const playOpening = (opening) => {
    setCurrentOpening(opening);
  };

  return (
    <OpeningContext.Provider value={{ currentOpening, playOpening }}>
      {children}
    </OpeningContext.Provider>
  );
};
