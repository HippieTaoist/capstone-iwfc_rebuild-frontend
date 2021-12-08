import React, { useContext } from "react";
// import axios from "axios";
// import { kuCoinAPI } from "../../../utils/CryptoAPIs/CryptoAPIs";
import AxiosBackend from "../../../utils/axios/AxiosBackend";
import { CryptoContext } from "../../../context/CryptoContext";

export default function CryptoPrices() {
  const {
    dispatch,
    state: {
      crypto: { siteCrypto },
    },
  } = useContext(CryptoContext);

  async function handleOnClick() {
    try {
      console.log(siteCrypto);
      let crypto = await AxiosBackend.get("/api/cryptos/", {});
      // console.log(crypto);
      let dispatchedPriceArray = crypto.data.payload;
      console.log(dispatchedPriceArray);
      dispatch({
        type: "SiteCryptoSet",
        siteCrypto: dispatchedPriceArray,
      });
      // console.log(crypto);
      // console.log(crypto.data);
      // console.log(crypto.data.message);
      // console.log(crypto.data.payload);
      // console.log(cryptoPriceArray);
      //   let siteCryptoArray = crypto.data.payload;
      // console.log(crypto.data.pricePayload);
      // let incomingCryptoPriceArray = crypto.data.pricePayload;
      // console.log(incomingCryptoPriceArray);
      //   dispatch({
      //     type: "PriceSet",
      //     cryptoPriceArray: crypto.data.pricePayload,
      //   });
      console.log(siteCrypto);
    } catch (error) {
      console.log(error);
    }
  }

  // useEffect(() => {}, []);

  return (
    <div>
      I Am a CryptoPrices Div
      <button onClick={handleOnClick}>click to see our coins</button>
      <hr />
      {siteCrypto.length > 0 ? (
        <div>
          {siteCrypto.map((item) => {
            for (const attr in item) {
              console.log(attr);
              if (attr === "priceCurrent") {
                return <div>${item[attr]}</div>;
              }
              return "";
            }
          })}
        </div>
      ) : (
        <h3>Loading ...</h3>
      )}
    </div>
  );
}
