import React, { useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { AuthContext } from "../../../../context/AuthContext";
import CryptoProgramFavorites from "../../CryptoProgramFavorites/CryptoProgramFavorites";
import CryptoFavorites from "../../CryptoFavorites/CryptoFavorites";
import CheckToken from "../../../../hooks/CheckToken";

import "./ProfileInfo.css";

export default function ProfileInfo() {
  const [loading, setLoading] = useState(true);
  const {
    dispatch,
    state: { user },
  } = useContext(AuthContext);

  const { checkJwtToken } = CheckToken();
  useEffect(() => {
    if (checkJwtToken()) {
      console.log("jwt Token");
      let jwtToken = window.localStorage.getItem("jwtToken");

      if (jwtToken) {
        let decodedToken = jwtDecode(jwtToken);

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
        } = decodedToken;

        // console.log(decodedToken);

        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          window.localStorage.removeItem("jwtToken");
          dispatch({ user: null });
        } else {
          dispatch({
            type: "LOGIN",
            email,
            username,
            _id,
            firstName,
            lastName,
            favoringCryptos,
            favoringCryptoPrograms,
            createdDate,
            updatedLast,
          });
          setLoading(false);
        }
      }
    }
  }, [dispatch]);

  return (
    <>
      <div>
        {loading ? (
          <div>loadin..</div>
        ) : (
          <div className="ProfileInfo">
            <h1>
              Hello, {user.profile.firstName} {user.profile.lastName}
            </h1>
            <br />
            {user.profile.createdDate && (
              <div className="ProfileInfo-time-with-us">
                {new Date(user.profile.createdDate).toDateString()}
              </div>
            )}

            {user.profile.updatedDate && (
              <div className="ProfileInfo-last-update">
                {new Date(user.profile.updatedDate).toDateString()}
              </div>
            )}
            <div>
              <div>Username: {user.profile.username}</div>
              <br />
              <div>Email: {user.profile.email}</div>
            </div>
            <hr />
            <div>
              <CryptoFavorites />
            </div>

            <div>
              <CryptoProgramFavorites />
            </div>
          </div>
        )}
      </div>{" "}
    </>
  );
}
