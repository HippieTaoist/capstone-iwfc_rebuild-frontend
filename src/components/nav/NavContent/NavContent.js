import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../../context/AuthContext";
import "./NavContent.css";
import CheckToken from "../../../hooks/CheckToken";

export default function NavContent() {
  const {
    state: { user },
    dispatch,
  } = useContext(AuthContext);

  let linkTitle1 = user ? user.username : "Sign-Up";
  let link1 = user ? "/profile" : "/sign-up";

  let linkTitle2 = user ? "Log Out" : "Sign-In";
  let link2 = user ? logout : () => {};

  function logout() {
    window.localStorage.removeItem("jwtToken");
    dispatch({ type: "LOGOUT", email: user.email });
  }

  const { checkJwtToken } = CheckToken();
  useEffect(() => {
    if (checkJwtToken()) {
      console.log("jwt Token");
    }
  });
  return (
    <div>
      <span className="NavContent-options">Sign Up</span>
      <span className="NavContent-options">Sign In</span>
      <span className="NavContent-options">Cryptos</span>
      <span className="NavContent-options">Crypto-Programs</span>
    </div>
  );
}
