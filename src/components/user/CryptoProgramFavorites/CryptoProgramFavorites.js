import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

export default function CryptoProgramFavorites() {
  const {
    state: { user },
  } = useContext(AuthContext);
  console.log(user);
  return (
    <div>
      <h1>I am Crypto Program Favorites</h1>
    </div>
  );
}
