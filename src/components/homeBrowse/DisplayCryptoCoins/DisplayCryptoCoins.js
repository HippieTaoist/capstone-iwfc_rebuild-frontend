import React, { useContext } from "react";

import CryptoPrices from "../../../components/crypto/CryptoDetails/CryptoDetails";
import { CryptoContext } from "../../../context/CryptoContext";

export default function DisplayCryptoCoins() {
  const {
    state: {
      crypto: { siteCrypto },
    },
  } = useContext(CryptoContext);
  console.log(crypto);

  return <div>will display site coins</div>;
}
