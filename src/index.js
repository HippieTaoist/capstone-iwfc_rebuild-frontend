import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import AuthContextComponent from "./context/AuthContext";

ReactDOM.render(
  <AuthContextComponent>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthContextComponent>,
  document.getElementById("root")
);
