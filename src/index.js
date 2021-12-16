import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import AuthContextComponent from "./context/AuthContext";
import CryptoContextComponent from "./context/CryptoContext";
import UserContextComponent from "./context/UserContext";
import CryptoProgramContextComponent from "./context/CryptoProgramContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextComponent>
      <CryptoProgramContextComponent>
        <CryptoContextComponent>
          <UserContextComponent>
            <App />
          </UserContextComponent>
        </CryptoContextComponent>
      </CryptoProgramContextComponent>
    </AuthContextComponent>
  </React.StrictMode>,
  document.getElementById("root")
);
