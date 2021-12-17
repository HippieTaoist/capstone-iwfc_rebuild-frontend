import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
// import SiteTools from "../../../utils/siteTools/SiteTools";

// import axios from "axios";
// import { kuCoinAPI } from "../../../utils/CryptoAPIs/CryptoAPIs";
import AxiosBackend from "../../../utils/axios/AxiosBackend";
import { CryptoContext } from "../../../context/CryptoContext";

import "./CryptoPrices.css";

export default function CryptoPrices() {
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

  function handleCryptoOnClick(crypto) {
    console.log("I Handle Onclicks!", crypto);
  }

  async function handleLikeItOnClick(cryptoRefID, liked) {
    console.log(cryptoRefID);
    try {
      let crypto = await AxiosBackend.put("/api/cryptos/crypto-update/", {
        _id: cryptoRefID,
        favored: liked,
      });
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
      {siteCrypto.length > 0 ? (
        <div className="CryptoPrices-container-main">
          {siteCrypto.map((item) => {
            return (
              <div key={item._id} className="CryptoPrices-container-crypto">
                <Link to={`/crypto-details/${item._id}`}>
                  <div>
                    <div onClick={handleCryptoOnClick}>
                      <img src={item.logo} alt={item.name} />
                    </div>
                    <div className="CryptoPrices-name">{item.name}</div>
                    <div className="CryptoPrices-price">
                      ${" "}
                      {item.priceCurrent > 1
                        ? (Math.round(item.priceCurrent * 100) / 100).toFixed(2)
                        : item.priceCurrent}
                    </div>
                  </div>
                </Link>
                <div>
                  <button
                    onClick={() => {
                      handleLikeItOnClick(item._id, true);
                    }}
                  >
                    Like It
                  </button>
                  <button
                    onClick={() => {
                      handleLikeItOnClick(item._id, false);
                    }}
                  >
                    Leave It
                  </button>
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
