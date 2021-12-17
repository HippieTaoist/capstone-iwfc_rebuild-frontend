import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../../context/AuthContext";
import { CryptoContext } from "../../../context/CryptoContext";

import AxiosBackend from "../../../utils/axios/AxiosBackend";

import "./CryptoFavorites.css";

export default function CryptoFavorites() {
  const [UserFavorites, setUserFavorites] = useState([]);

  const {
    state: { user },
  } = useContext(AuthContext);

  console.log(user.profile.favoringCryptos);
  const {
    dispatch,
    state: {
      crypto: { siteCrypto },
    },
  } = useContext(CryptoContext);

  const [userData, setUserData] = useState({});

  async function loader() {
    try {
      let crypto = await AxiosBackend.get("/api/cryptos/");
      console.log(crypto.data.payload);
      let dispatchedPriceArray = crypto.data.payload;
      console.log(dispatchedPriceArray);

      dispatch({
        type: "SiteCryptoSet",
        siteCrypto: dispatchedPriceArray,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUnfavorOnClick(unLikedId) {
    // console.log(unLikedId);
    let updatedCrypto = await AxiosBackend.put("/api/cryptos/crypto-update", {
      favored: false,
      _id: unLikedId,
    });
    // console.log(updatedCrypto.data.payload);
    // console.log(updatedCrypto.data.payload.favoredCrypto);
    console.log(updatedCrypto.data.payload.userFound);
    console.log(updatedCrypto.data.payload.userFound.favoringCryptos);

    for (const crypto in siteCrypto) {
      // console.log(siteCrypto[crypto]);
      if (siteCrypto[crypto]._id === unLikedId) {
        console.log("Match Found!", siteCrypto[crypto]);
        siteCrypto[crypto].favoredCrypto =
          updatedCrypto.data.payload.favoredCrypto;

        user.profile.favoredCrypto =
          updatedCrypto.data.payload.userFound.favoringCryptos;
      }
    }
    console.log(siteCrypto);
    dispatch({ type: "SiteCryptoSet", siteCrypto: siteCrypto });

    // dispatch({
    //   type: "LOGIN",
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

    console.log(" user.profile.userFound", user.profile.userFound);
  }
  let favoringCryptos = user.profile.favoringCryptos.map((crypto) => {
    for (const cryptoKey in siteCrypto) {
      // console.log(siteCrypto[cryptoKey]._id);
      if (siteCrypto[cryptoKey]._id === crypto) {
        console.log("it matches", siteCrypto[cryptoKey]);
        return siteCrypto[cryptoKey];
      }
    }
  });
  console.log(favoringCryptos);
  setUserFavorites(favoringCryptos);

  useEffect(() => {
    loader();

    // let favoringCryptos = user.profile.favoringCryptos.map((crypto) => {
    //   console.log(crypto);
    //   for (const cryptoKey in siteCrypto) {
    //     // console.log(siteCrypto[cryptoKey]._id);
    //     if (siteCrypto[cryptoKey]._id === crypto) {
    //       console.log("it matches", siteCrypto[cryptoKey]);
    //       return siteCrypto[cryptoKey];
    //     }
    //   }
    // });
    // setUserFavorites(favoringCryptos);
  }, [dispatch]);

  // useEffect(() => {}, [input]);

  return (
    <div>
      <h1>My Crypto Favs</h1>
      <div className="CryptoFavorites-favs-container">
        {UserFavorites.length > 0 &&
          UserFavorites.map((crypto) => {
            return (
              <>
                {crypto && (
                  <div className="CryptoFavorites-crypto-item">
                    <button
                      className="CryptoFavorites-unlike-button"
                      onClick={() => handleUnfavorOnClick(crypto._id)}
                    >
                      x
                    </button>
                    <div className="CryptoFavorites-symbol">
                      {crypto.symbol}
                    </div>
                    <img src={crypto.logo} alt={crypto.symbol} />
                  </div>
                )}
              </>
            );
          })}
      </div>
    </div>
  );
}
