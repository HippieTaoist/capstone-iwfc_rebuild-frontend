import React, { useContext } from "react";
import axios from "axios";
// import { kuCoinAPI } from "../../../utils/CryptoAPIs/CryptoAPIs";
import AxiosBackend from "../../../utils/axios/AxiosBackend";
import { CryptoContext } from "../../../context/CryptoContext";

export default function CryptoPrices() {
  const {
    dispatch,
    state: {
      crypto: { cryptoPriceArray },
    },
  } = useContext(CryptoContext);

  async function AxiosKuCoinGetAllPrices_USD() {
    try {
      let crypto = await AxiosBackend.get("/api/cryptos/", {});
      //   dispatch({
      //     type: "PriceSet",
      //     cryptoPriceArray: crypto.data.pricePayload,
      //   });
      console.log(crypto);
      console.log(crypto.data);
      console.log(crypto.data.message);
      console.log(crypto.data.payload);
      //   let siteCryptoArray = crypto.data.payload;
      console.log(crypto.data.pricePayload);
      let incomingCryptoPriceArray = crypto.data.pricePayload;
      console.log(incomingCryptoPriceArray);
      //   dispatch({
      //     type: "PriceSet",
      //     cryptoPriceArray: crypto.data.pricePayload,
      //   });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      I Am a CryptoPrices Div
      <button onClick={AxiosKuCoinGetAllPrices_USD}>
        Got TO Get Them All!
      </button>
      {/* {cryptoPriceArray ? (
        crypto.data.pricePayload.map((crypto) => {
          return <div>{crypto}</div>;
        })
      ) : (
        <h3>Loading ...</h3>
      )} */}
    </div>
  );
}
