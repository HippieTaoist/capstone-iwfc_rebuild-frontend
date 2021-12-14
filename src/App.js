import "./App.css";
import jwtDecode from "jwt-decode";
import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Nav from "./components/nav/Nav/Nav";
import SignIn from "./components/user/signIn/SignIn";
import SignUp from "./components/user/signUp/SignUp";
import HomeBrowse from "./components/homeBrowse/HomeBrowse/HomeBrowse";
import Profile from "./components/user/profile/Profile/Profile";

import CryptoFavorites from "./components/user/CryptoFavorites/CryptoFavorites";
import CryptoProgramFavorites from "./components/user/CryptoProgramFavorites/CryptoProgramFavorites";
import PageNotFound from "./components/pageNotFound/PageNotFound";

import SiteCrypto from "./components/crypto/SiteCrypto";
import CryptoDetails from "./components/crypto/CryptoDetails/CryptoDetails";
import SitePrograms from "./components/cryptoPrograms/SitePrograms";

import { AuthContext } from "./context/AuthContext";
import { CryptoContext } from "./context/CryptoContext";

import AxiosBackend from "./utils/axios/AxiosBackend";
import { loader } from "./utils/siteTools/SiteTools";

require("dotenv").config();
function App() {
  // const { loader } = SiteTools();
  async function loader() {
    try {
      let crypto = await AxiosBackend.get("/api/cryptos/");
      console.log(crypto);
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

  const {
    state: { user },
    dispatch,
  } = useContext(AuthContext);
  console.log(user);

  const {
    state: {
      crypto: { siteCrypto },
    },
  } = useContext(CryptoContext);

  // async function getCryptoPrices() {
  //   let crypto = await AxiosBackend.get("/api/cryptos/");

  //   dispatch({ type: "SiteCryptoSet", siteCrypto: crypto.data.payload });
  //   console.log(siteCrypto);
  // }

  useEffect(() => {
    loader();
    let jwtToken = window.localStorage.getItem("jwtToken");

    if (jwtToken) {
      let decodedToken = jwtDecode(jwtToken);

      const {
        email,
        username,
        _id,
        firstName,
        lastName,
        favoringCryptos,
        favoringCryptoPrograms,
        createdDate,
        updatedLast,
      } = decodedToken;

      console.log(decodedToken);

      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        window.localStorage.removeItem("jwtToken");
        dispatch({ user: null });
      } else {
        dispatch({
          type: "LOGIN",
          email,
          username,
          _id,
          firstName,
          lastName,
          favoringCryptos,
          favoringCryptoPrograms,
          createdDate,
          updatedLast,
        });
      }
    }
  }, [dispatch]);

  return (
    <>
      <ToastContainer />
      <Router>
        <Nav />
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/crypto" element={<SiteCrypto />} />
          <Route path="/crypto-details/:id" element={<CryptoDetails />} />
          <Route path="/crypto-programs" element={<SitePrograms />} />
          {/* private Routes below \\ public routes above */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-favorite-cryptos" element={<CryptoFavorites />} />
          <Route
            path="/my-favorite-crypto-programs"
            element={<CryptoProgramFavorites />}
          />
          <Route path="/" element={<HomeBrowse />} />
          {/* <Route path="/suggested-programs" element={<SuggestedCrypto /> } */}
          <Route path="/404" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
