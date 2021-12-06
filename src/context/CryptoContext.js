import React, { useReducer } from "react";

export const CryptoContext = React.createContext({});
const initialState = {
  crypto: { cryptoPriceArray: [{ test: "one" }], siteCrypto: [] },
};

function reducer(state, action) {
  switch (action.type) {
    case "PriceSet":
      return {
        crypto: { cryptoPriceArray: action.cryptoPriceArray },
      };
    case "SiteCryptoSet":
      return {
        crypto: { siteCrypto: action.siteCrypto },
      };

    default:
      return state;
  }
}

function CryptoContextComponent({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CryptoContext.Provider value={{ state, dispatch }}>
      {children}
    </CryptoContext.Provider>
  );
}

export default CryptoContextComponent;
