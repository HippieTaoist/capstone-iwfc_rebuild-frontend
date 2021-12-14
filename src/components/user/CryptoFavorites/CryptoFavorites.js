import React, { useContext, useEffect } from "react";

import { AuthContext } from "../../../context/AuthContext";
import { CryptoContext } from "../../../context/CryptoContext";

import AxiosBackend from "../../../utils/axios/AxiosBackend";

export default function CryptoFavorites() {
  const {
    state: { user },
  } = useContext(AuthContext);

  const {
    dispatch,
    state: {
      crypto: { siteCrypto },
    },
  } = useContext(CryptoContext);

  async function loader() {
    try {
      let crypto = await AxiosBackend.get("/api/cryptos/");
      let dispatchedPriceArray = crypto.data.payload;
      console.log(dispatchedPriceArray);
      dispatch({
        type: "SiteCryptoSet",
        siteCrypto: dispatchedPriceArray,
      });
      console.log(siteCrypto);
    } catch (error) {
      console.log(error);
    }
  }
  console.log(siteCrypto);

  console.log(user.profile);
  console.log(user.profile.favoringCryptos);

  let tempArray = user.profile.favoringCryptos;

  console.log(tempArray);

  let favoringCryptos = tempArray.map((crypto) => {
    for (const cryptoKey in siteCrypto) {
      console.log(siteCrypto[cryptoKey]._id);
      if (siteCrypto[cryptoKey]._id === crypto) {
        console.log("it matches", siteCrypto[cryptoKey]);
        return siteCrypto[cryptoKey];
      }
    }
  });

  console.log(favoringCryptos);
  useEffect(() => {
    loader();
  }, []);
  return (
    <div>
      <h1>My Crypoto Favs</h1>
      <div className="CryptoFavorites-favs-container">
        {favoringCryptos.length > 0 &&
          favoringCryptos.map((crypto) => {
            console.log(crypto);
            return (
              <div className="CryptoFavorites-crypto-item">
                <img src={crypto.logo} alt={crypto.symbol} />
              </div>
            );
          })}
      </div>
    </div>
  );
}
