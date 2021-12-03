import React, { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import CryptoProgramFavorites from "../../CryptoProgramFavorites/CryptoProgramFavorites";
import CryptoFavorites from "../../CrytpoFavorites/CryptoFavorites";

import "./ProfileInfo.css";

export default function ProfileInfo() {
  const {
    state: { user },
  } = useContext(AuthContext);
  console.log(user);

  return (
    <div className="ProfileInfo">
      <h1>I AM PROFILE INFO!!</h1>
      <div>
        <div>Username: {user.username}</div>
        <br />
        <div>Email: {user.email}</div>
      </div>
      <hr />
      <div>
        <CryptoFavorites />
      </div>

      <div>
        <CryptoProgramFavorites />
      </div>
    </div>
  );
}
