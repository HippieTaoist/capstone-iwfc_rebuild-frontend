import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../../../context/AuthContext";

import CryptoFavorites from "../../CryptoFavorites/CryptoFavorites";
import CryptoProgramFavorites from "../../CryptoProgramFavorites/CryptoProgramFavorites";
import ProfileInfo from "../ProfileInfo/ProfileInfo";

import AxiosBackend from "../../../../utils/axios/AxiosBackend";

import "./Profile.css";

export default function Profile() {
  const {
    dispatch,
    state: { user },
  } = useContext(AuthContext);

  async function getUserProfile() {
    try {
      let payload = await AxiosBackend.get("/api/users/user-profile");
      console.log(payload.data);
      dispatch({
        type: "PROFILE",
        email: user.email,
        username: user.username,
        profile: payload.data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserProfile();
  }, []);

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
