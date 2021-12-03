import React from "react";

import CryptoFavorites from "../../CrytpoFavorites/CryptoFavorites";
import CryptoProgramFavorites from "../../CryptoProgramFavorites/CryptoProgramFavorites";
import ProfileInfo from "../ProfileInfo/ProfileInfo";

import "./Profile.css";

export default function Profile() {
  return (
    <div className="Profile">
      <h1>Profile</h1>
      <div>
        <ProfileInfo />
      </div>
      <div className="Profile-lower-half">
        <div>
          <CryptoFavorites />
        </div>
        <br />
        <div>
          <CryptoProgramFavorites />
        </div>
      </div>
    </div>
  );
}
