import "./App.css";
import jwtDecode from "jwt-decode";
import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Nav from "./components/nav/Nav/Nav";
import SignIn from "./components/user/signIn/SignIn/SignIn";
import SignUp from "./components/user/signUp/SignUp/SignUp";
import HomeBrowse from "./components/homeBrowse/HomeBrowse/HomeBrowse";

import { AuthContext } from "./context/AuthContext";

require("dotenv").config();

function App() {
  const {
    state: { user },
    dispatch,
  } = useContext(AuthContext);

  useEffect(() => {
    let jwtToken = window.localStorage.getItem("jwt-token");

    if (jwtToken) {
      let decodedToken = jwtDecode(jwtToken);

      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        window.localStorage.removeItem("jwtToken");
        dispatch({ user: null });
      } else {
        dispatch({
          type: "LOGIN",
          email: decodedToken.email,
          username: decodedToken.username,
        });
      }
    }
  }, []);

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        {/* <Route path="/profile" element={<Profile />} />
        <Route path="/cryptos" element={<Cryptos />} />
        <Route path="/crypto-programs" element={<CryptoPrograms />} /> */}
        <Route path="/" element={<HomeBrowse />} />
      </Routes>
    </Router>
  );
}

export default App;
