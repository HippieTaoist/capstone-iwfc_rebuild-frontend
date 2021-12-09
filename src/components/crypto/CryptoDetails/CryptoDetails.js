import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import SiteTools from "../../../utils/siteTools/loader/SiteTools";

import AxiosBackend from "../../../utils/axios/AxiosBackend";
import { CryptoContext } from "../../../context/CryptoContext";

export default function CryptoDetails() {
  const {
    dispatch,
    state: {
      crypto: { siteCrypto },
    },
  } = useContext(CryptoContext);

  const crypto = useParams();
  const _id = crypto.id;
  console.log(_id);

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

  let foundCrypto = siteCrypto.find((item) => {
    return item._id === _id ? item : null;
  });

  console.log(foundCrypto);

  // siteCrypto.map((item) => {
  //     item._id === _id ? item : null;
  //   });

  // console.log(item.urls);
  // console.log(item._id);
  // console.log(item.name);
  // console.log(item.symbol);
  // console.log(item.priceCurrent);
  // console.log(item.programsAffiliated);
  // console.log(item.cmcId);
  // console.log(item.updatedAt);
  // console.log(item.usersFavored);
  // console.log(item.usersUnfavored);
  // console.log(item.logo);

  //   useEffect(() => {
  //     loader();
  //   }, []);

  return (
    <div className="CryptoDetails-container-main">
      <h1>IT"S WORKING</h1>
      <div className="CryptoDetails-crypto-details-container">
        <div className="CryptoDetails-logo">{/* <img src={} /> */}</div>
      </div>
    </div>
  );
}
