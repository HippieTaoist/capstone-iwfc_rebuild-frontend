import React, { useEffect, useContext, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../../context/AuthContext";

import CheckToken from "../../../hooks/CheckToken";

import "./NavContent.css";

export default function NavContent() {
  const navigate = useNavigate();
  const [click, setClick] = useState(false);

  const [clickLogo, setClickLogo] = useState(false);

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

  let linkTitle6 = "Programs";
  let link6 = "/crypto-programs";

  let linkTitle7 = user ? user.username : "Member?";
  // let link7= user ? "/profile" :

  let logOutButton = user ? logout : () => {};

  const handleClick = () => setClick(!click);
  const handleClickLogo = () => setClickLogo(!click);

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
        <span className="NavContent-options">
          <Link to={link6} className="NavContent-navlink">
            {linkTitle6}
          </Link>
        </span>
      </div>
      <div className="NavContent-mobile-menu">
        <div className="NavContent-mobile-menu-title" onClick={handleClick}>
          <span>{linkTitle7}</span>
          {click &&
            (user ? (
              <div className="NavContent-mobile-menu-hidden-menu">
                <ul>
                  <li className="NavContent-mobile-menu-item">
                    <Link to={link1}>{linkTitle1}</Link>
                  </li>
                  <li className="NavContent-mobile-menu-item">
                    <Link to={link2}>{linkTitle3}</Link>
                  </li>
                  <li className="NavContent-mobile-menu-item">
                    <Link to={link4}>{linkTitle4}</Link>
                  </li>
                  <li className="NavContent-mobile-menu-item">
                    <div onClick={logout}>Log Out</div>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="NavContent-mobile-menu-hidden-menu">
                <ul>
                  <Link to="/sign-in">
                    <li className="NavContent-mobile-menu-item">Sign In</li>
                  </Link>
                  <Link to="/sign-up">
                    <li className="NavContent-mobile-menu-item">Sign Up</li>
                  </Link>
                </ul>
              </div>
            ))}
        </div>
        <div
          className="NavContent-mobile-menu-logo-container"
          onclick={handleClickLogo}
        >
          <img src="/IWFCTEMP_Logo.png" alt="IWantFreeCrypto.com Logo" />

          <div className="NavContent-mobile-logo-menu">
            {clickLogo && (
              <ul>
                <li className="NavContent-mobile-menu-item">
                  <Link to={link5}>{linkTitle5}</Link>
                </li>
                <li className="NavContent-mobile-menu-item">
                  <Link to={link6}>{linkTitle6}</Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
