import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../../context/AuthContext";
import { CryptoContext } from "../../../context/CryptoContext";

import AxiosBackend from "../../../utils/axios/AxiosBackend";

import "./CryptoFavorites.css";

export default function CryptoFavorites() {
  const {
    dispatch,
    state: { user },
  } = useContext(AuthContext);
}
