import React, { useReducer } from "react";

export const CryptoProgramContext = React.createContext({});
const initialState = {
  CryptoProgram: { siteCryptoProgram: [] },
};

function reducer(state, action) {
  switch (action.type) {
    case "SiteCryptoProgramSet":
      return {
        siteCryptoProgramsArray: action.siteCryptoProgramsArray,
      };

    default:
      return state;
  }
}

function CryptoProgramContextComponent({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CryptoProgramContext.Provider value={{ state, dispatch }}>
      {children}
    </CryptoProgramContext.Provider>
  );
}

export default CryptoProgramContextComponent;
