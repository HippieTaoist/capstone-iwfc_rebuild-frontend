import React, { useContext, useEffect } from "react";
// import axios from "axios";
// import { kuCoinAPI } from "../../../utils/CryptoAPIs/CryptoAPIs";
import AxiosBackend from "../../../utils/axios/AxiosBackend";
import { CryptoContext } from "../../../context/CryptoContext";

import "./CryptoPrices.css";
import axios from "axios";

export default function CryptoPrices() {
  const {
    dispatch,
    state: {
      crypto: { siteCrypto },
    },
  } = useContext(CryptoContext);

  async function loader() {
    try {
      // console.log(siteCrypto);
      let crypto = await AxiosBackend.get("/api/cryptos/"); // console.log(crypto);
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

  function handleCryptoOnClick(crypto) {
    console.log("I Handle Onclicks!", crypto._id);
  }

  async function handleLikeItOnClick(cryptoRefID) {
    console.log(cryptoRefID);
    try {
      // console.log(siteCrypto);
      let crypto = await AxiosBackend.put(
        "/api/cryptos/crypto-update/",
        {
          cryptoRefID,
          favored: true,
        }

        // {
        //   headers: {
        //     // Accept: "*/*",
        //     authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
        //   },
        // }
      );
      console.log(crypto);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loader();
  }, []);

  return (
    <div>
      I Am a CryptoPrices Div
      {/* <button onClick={handleOnClick}>click to see our coins</button> */}
      <hr />
      {siteCrypto.length > 0 ? (
        <div className="CryptoPrices-container-main">
          {siteCrypto.map((item) => {
            return (
              <div
                key={item._id}
                className="CryptoPrices-container-crypto"
                // onClick={() => {
                //   handleCryptoOnClick(item);
                // }}
              >
                <div>
                  <img src={item.logo} alt={item.name} />
                </div>
                <div className="CryptoPrices-name">{item.name}</div>
                <div className="CryptoPrices-price">
                  ${" "}
                  {item.priceCurrent > 1
                    ? (Math.round(item.priceCurrent * 100) / 100).toFixed(2)
                    : item.priceCurrent}
                </div>
                <div>
                  <button
                    onClick={() => {
                      handleLikeItOnClick(item._id);
                    }}
                  >
                    Like It
                  </button>
                  <button>Leave It</button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <h3>Loading ...</h3>
      )}
    </div>
  );
}
