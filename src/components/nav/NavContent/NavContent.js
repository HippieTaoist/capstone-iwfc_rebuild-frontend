import React, { useEffect, useContext } from "react";

import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../../context/AuthContext";
import "./NavContent.css";
import CheckToken from "../../../hooks/CheckToken";

import "./NavContent.css";

export default function NavContent() {
  const navigate = useNavigate();

  const {
    state: { user },
    dispatch,
  } = useContext(AuthContext);

  // // create a nav link option that will have options be desplayed under the users usernname when clickecked on
  // username(sepearte menu)->| Crytpos | Cryptoprograms
  //   | - Profile
  //   | - Cryptos Liked
  //   | - Crypto Programs Liked
  //   | - Suggested Programs <- user based algorithm
  //   | - Log Out

  let linkTitle1 = user ? user.username : "Sign-Up";
  let link1 = user ? "/profile" : "/sign-up";

  let linkTitle2 = user ? "Log Out" : "Sign-In";
  let link2 = user ? "/" : "/sign-in";

  let linkTitle3 = user ? "Fav Cryptos" : "";
  let link3 = user ? "/my-favorite-cryptos" : "";

  let linkTitle4 = user ? "Fav Programs" : "";
  let link4 = user ? "/my-favorite-crypto-programs" : "";

  let linkTitle5 = "Crypto";
  let link5 = "/crypto";

  let logOutButton = user ? logout : () => {};

  function logout() {
    console.log("                   logout called");
    window.localStorage.removeItem("jwtToken");
    dispatch({ type: "LOGOUT", email: user.email });
    navigate("/");
  }

  const { checkJwtToken } = CheckToken();
  useEffect(() => {
    if (checkJwtToken()) {
      console.log("jwt Token");
    }
  });
  return (
    <div className="NavContent">
      <div className="NavContent-content">
        <span className="NavContent-options">
          <Link to={link1} className="NavContent-navlink" aria-current="page">
            {linkTitle1}
          </Link>
        </span>
        <span className="NavContent-options">
          <Link
            to={link2}
            className="NavContent-navlink"
            onClick={() => logOutButton()}
          >
            {linkTitle2}
          </Link>
        </span>
        <span className="NavContent-options">
          <Link to={link3} className="NavContent-navlink">
            {linkTitle3}
          </Link>
        </span>
        <div className="NavContent-logo">
          <Link to="/">
            <img src="/IWFCTEMP_Logo.png" alt="logo" />
          </Link>
        </div>
        <span className="NavContent-options">
          <Link to={link4} className="NavContent-navlink">
            {linkTitle4}
          </Link>
        </span>
        <span className="NavContent-options">
          <Link to={link5} className="NavContent-navlink">
            {linkTitle5}
          </Link>
        </span>
      </div>
    </div>
  );
}
