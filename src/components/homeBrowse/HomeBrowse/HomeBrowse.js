import React from "react";
import DisplayCryptoCoin from "../DisplayCryptoCoins/DisplayCryptoCoins";
import DisplayCryptoPrograms from "../DisplayCryptoPrograms/DisplayCryptoPrograms";

import "./HomeBrowse.css";

export default function HomeBrowse() {
  return (
    <div className="HomeBrowse">
      <h3>I'm a HomeBrowse Function</h3>
      <div className="siteCryptoDisplayContainer">
        <div className="cryptoDisplayContainer">
          <DisplayCryptoCoin />
        </div>
        <div className="cryptoProgramDisplayContainer">
          <DisplayCryptoPrograms />
        </div>
      </div>
    </div>
  );
}
