import React, { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import CryptoProgramFavorites from "../../CryptoProgramFavorites/CryptoProgramFavorites";
import CryptoFavorites from "../../CryptoFavorites/CryptoFavorites";

import "./ProfileInfo.css";

export default function ProfileInfo() {
  const {
    state: { user },
  } = useContext(AuthContext);
  const {
    email,
    username,
    _id,
    firstName,
    lastName,
    favoringCryptos,
    favoringCryptoPrograms,
    createdDate,
    updatedLast,
  } = user.profile;

  let startDate = new Date(createdDate);
  let updatedDate = new Date(updatedLast);

  return (
    <div className="ProfileInfo">
      <h1>
        Hello, {firstName} {lastName}
      </h1>
      <br />
      {createdDate && (
        <div className="ProfileInfo-time-with-us">
          {startDate.toDateString()}
        </div>
      )}

      {updatedDate && (
        <div className="ProfileInfo-last-update">
          {updatedDate.toDateString()}
        </div>
      )}
      <div>
        <div>Username: {username}</div>
        <br />
        <div>Email: {email}</div>
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
