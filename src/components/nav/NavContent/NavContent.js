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
  let link2 = user ? logout : "/sign-in";

  let linkTitle3 = user ? "Cryptos" : "";
  let link3 = user ? "/cryptos" : "";

  let linkTitle4 = user ? "Crypto Programs" : "404";
  let link4 = user ? "/crypto-programs" : "/404";

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
      <span className="NavContent-options">
        <Link to={link1} className="NavContent-navlink" aria-current="page">
          {linkTitle1}
        </Link>
      </span>
      <span className="NavContent-options">
        <Link to={link2} className="NavContent-navlink">
          {linkTitle2}
        </Link>
      </span>
      <span className="NavContent-options">
        <Link to={link3} className="NavContent-navlink">
          {linkTitle3}
        </Link>
      </span>
      <span className="NavContent-options">
        <Link to={link4} className="NavContent-navlink">
          {linkTitle4}
        </Link>
      </span>
    </div>
  );
}
