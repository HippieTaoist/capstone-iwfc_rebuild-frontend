import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../../context/AuthContext";
import { CryptoContext } from "../../../context/CryptoContext";
import { UserContext } from "../../../context/UserContext";

import AxiosBackend from "../../../utils/axios/AxiosBackend";

import "./CryptoFavorites.css";

export default function CryptoFavorites() {
  const {
    state: { user },
  } = useContext(AuthContext);

  const {
    state: { userInfo },
  } = useContext(UserContext);

  const {
    dispatch,
    state: {
      crypto: { siteCrypto },
    },
  } = useContext(CryptoContext);
  // console.log(user.profile.favoringCryptos);

  const [Loading, setLoading] = useState(true);
  const [userFavorites, setUserFavorites] = useState([]);

  async function loader() {
    try {
      // setLoading(true);
      let crypto = await AxiosBackend.get("/api/cryptos/");
      //   console.log(crypto.data.payload);
      let dispatchedPriceArray = crypto.data.payload;
      //   console.log(dispatchedPriceArray);

      dispatch({
        type: "SiteCryptoSet",
        siteCrypto: dispatchedPriceArray,
      });
      console.log(siteCrypto);

      let retrievedUser = await AxiosBackend.get(
        `/api/users/user-get/${user.username}`
      );
      console.log(retrievedUser);

      dispatch({
        type: "SetUserInfo",
        email: retrievedUser.data.payload.email,
        username: retrievedUser.data.payload.username,
        _id: retrievedUser.data.payload._id,
        firstName: retrievedUser.data.payload.firstName,
        lastName: retrievedUser.data.payload.lastName,
        favoringCryptos: retrievedUser.data.payload.favoringCryptos,
        favoringCryptoPrograms:
          retrievedUser.data.payload.favoringCryptoPrograms,
        createdDate: retrievedUser.data.payload.createdDate,
        updatedLast: retrievedUser.data.payload.updatedLast,
      });
      console.log(retrievedUser.data.payload.favoringCryptos);
      await setFavorites(retrievedUser.data.payload.favoringCryptos);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUnfavorOnClick(e) {
    console.log(e.target.id);
    let unLikedId = e.target.id;
    try {
      // console.log(unLikedId);
      let updatedCrypto = await AxiosBackend.put("/api/cryptos/crypto-update", {
        favored: false,
        _id: unLikedId,
      });
      // console.log(updatedCrypto.data.payload.userFound.favoringCryptos);

      setFavorites(updatedCrypto.data.payload.userFound.favoringCryptos);
      console.log(updatedCrypto.data.payload.userFound.favoringCryptos);
      dispatch({
        type: "SetUserInfo",

        email: updatedCrypto.data.payload.userFound.email,
        username: updatedCrypto.data.payload.userFound.username,
        _id: updatedCrypto.data.payload.userFound._id,
        firstName: updatedCrypto.data.payload.userFound.firstName,
        lastName: updatedCrypto.data.payload.userFound.lastName,
        favoringCryptos: updatedCrypto.data.payload.userFound.favoringCryptos,
        favoringCryptoPrograms:
          updatedCrypto.data.payload.userFound.favoringCryptoPrograms,
        createdDate: updatedCrypto.data.payload.userFound.createdDate,
        updatedLast: updatedCrypto.data.payload.userFound.updatedLast,
      });
      console.log(userInfo);
      //   payload:{ profile: { favoringCryptos: updatedCrypto.data.payload }

      //   email: updatedCrypto.data.payload.userFound.email,
      //   username: updatedCrypto.data.payload.userFound.username,
      //   profile: {
      //     email: updatedCrypto.data.payload.userFound.email,
      //     username: updatedCrypto.data.payload.userFound.username,
      //     _id: updatedCrypto.data.payload.userFound._id,
      //     firstName: updatedCrypto.data.payload.userFound.firstName,
      //     lastName: updatedCrypto.data.payload.userFound.lastName,
      //     favoringCryptos: updatedCrypto.data.payload.userFound.favoringCryptos,
      //     favoringCryptoPrograms:
      //       updatedCrypto.data.payload.userFound.favoringCryptoPrograms,
      //     createdDate: updatedCrypto.data.payload.userFound.createdDate,
      //     updatedLast: updatedCrypto.data.payload.userFound.updatedLast,
      //   },
      // });
      console.log(user.profile.favoringCryptos);
    } catch (error) {
      console.log(error);
    }
    // console.log(unLikedId);
    let updatedCrypto = await AxiosBackend.put("/api/cryptos/crypto-update", {
      favored: false,
      _id: unLikedId,
    });
    // console.log(updatedCrypto);
    console.log(updatedCrypto.data.payload.favoredCrypto);
    console.log(updatedCrypto.data.payload.userFound);

    // replaces the old token with new token
    for (const crypto in siteCrypto) {
      // console.log(siteCrypto[crypto]);
      if (siteCrypto[crypto]._id === unLikedId) {
        console.log("Match Found!", siteCrypto[crypto]);
        siteCrypto[crypto].favoredCrypto =
          updatedCrypto.data.payload.favoredCrypto;
      }
    }

    dispatch({ type: "SiteCryptoSet", siteCrypto: siteCrypto });
    console.log(siteCrypto);
    setFavorites(updatedCrypto.data.payload.userFound.favoringCryptos);
    console.log(updatedCrypto.data.payload.userFound.favoringCryptos);
    dispatch({
      type: "SetUserInfo",
      userInfo: updatedCrypto.data.payload.userFound,
    });
    console.log(userInfo);
    //   payload:{ profile: { favoringCryptos: updatedCrypto.data.payload }

    //   email: updatedCrypto.data.payload.userFound.email,
    //   username: updatedCrypto.data.payload.userFound.username,
    //   profile: {
    //     email: updatedCrypto.data.payload.userFound.email,
    //     username: updatedCrypto.data.payload.userFound.username,
    //     _id: updatedCrypto.data.payload.userFound._id,
    //     firstName: updatedCrypto.data.payload.userFound.firstName,
    //     lastName: updatedCrypto.data.payload.userFound.lastName,
    //     favoringCryptos: updatedCrypto.data.payload.userFound.favoringCryptos,
    //     favoringCryptoPrograms:
    //       updatedCrypto.data.payload.userFound.favoringCryptoPrograms,
    //     createdDate: updatedCrypto.data.payload.userFound.createdDate,
    //     updatedLast: updatedCrypto.data.payload.userFound.updatedLast,
    //   },
    // });
    console.log(user.profile.favoringCryptos);
  }

  async function setFavorites(newFavorites) {
    console.log(siteCrypto);
    console.log(newFavorites);
    let promisedFavoringCryptos = newFavorites.map(async (crypto) => {
      console.log(crypto);
      let backEndCrypto = await AxiosBackend.get(
        `/api/cryptos/crypto-get/${crypto}`
      );
      console.log(backEndCrypto);
      return backEndCrypto;
      // localSite Call
      // for (const cryptoKey in siteCrypto) {
      //   console.log(siteCrypto[cryptoKey]._id);
      //   if (siteCrypto[cryptoKey]._id === crypto) {
      //     console.log("it matches", siteCrypto[cryptoKey]);
      //     return siteCrypto[cryptoKey];
      //   }
      // }
    });

    console.log(promisedFavoringCryptos);

    Promise.all(promisedFavoringCryptos).then((result) => {
      console.log(result);
      setUserFavorites(result);
    });

    // setUserFavorites(favoringCryptos);
  }

  useEffect(() => {
    loader();
    // setFavorites(user);
  }, []);

  return (
    <div>
      <h1>My Crypto Favs</h1>
      <div className="CryptoFavorites-favs-container">
        {Loading ? (
          <div>Loading..</div>
        ) : (
          userFavorites.length > 0 &&
          userFavorites.map((crypto) => {
            console.log(crypto);
            let id = crypto.data.payload._id;
            return (
              <>
                {/* {crypto && ( */}
                <div className="CryptoFavorites-crypto-item">
                  <button
                    id={id}
                    className="CryptoFavorites-unlike-button"
                    onClick={handleUnfavorOnClick}
                  >
                    x
                  </button>
                  <div className="CryptoFavorites-symbol">
                    {crypto.data.payload.symbol}
                  </div>
                  <img
                    src={crypto.data.payload.logo}
                    alt={crypto.data.payload.symbol}
                  />
                </div>
                {/* )} */}
              </>
            );
          })
        )}
      </div>
    </div>
  );
}
