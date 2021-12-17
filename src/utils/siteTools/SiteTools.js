import React, { useContext } from "react";

import AxiosBackend from "../axios/AxiosBackend";

import { CryptoContext } from "../../context/CryptoContext";

export default async function SiteTools() {
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

  // async function getCryptoPrices() {
  //   let crypto = await AxiosBackend.get("/api/cryptos/");

  //   dispatch({
  //     type: "SiteCryptoSet",
  //     siteCrypto: crypto.data.payload,
  //   });
  //   console.log(siteCrypto);
  // }
  return loader;
}
