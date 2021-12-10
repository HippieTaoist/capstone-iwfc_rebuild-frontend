import axios from "axios";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

import ValidateSignInSwitcher from "../../../hooks/ValidateSignInSwitcher";
import ValidatePassword from "../../../hooks/ValidatePassword";

import { AuthContext } from "../../../context/AuthContext";

import "./SignIn.css";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const {
    dispatch,
    state: { user },
  } = useContext(AuthContext);

  const [signIn, signInSetOnBlur, signInHandleOnChange, signInError] =
    ValidateSignInSwitcher();
  const [
    password,
    passwordSetOnFocus,
    passwordSetOnBlur,
    passwordHandleOnChange,
    passwordError,
  ] = ValidatePassword();

  async function handleSignInSubmit(e) {
    e.preventDefault();

    try {
      let payload = await axios.post(
        "http://localhost:3001/api/users/user-login",
        {
          email: signIn,
          username: signIn,
          password,
        }
      );
      window.localStorage.setItem("jwtToken", payload.data.payload);
      let decodedToken = jwtDecode(payload.data.payload);
      console.log(decodedToken);

      dispatch({
        type: "LOGIN",
        email: decodedToken.email,
        username: decodedToken.username,
      });

      toast.success(`You are now logged in ${decodedToken.username}`);
      navigate("/sign-in");
    } catch (error) {
      console.log(error.message);
    }
  }
  if (signInError || passwordError) {
    toast.error("There is an error with SignIn and Password");
  }

  return (
    <div className="SignIn">
      {user && navigate("/")}
      <h1>Sign In...</h1>
      <div>
        <form onSubmit={handleSignInSubmit}>
          <input
            type="text"
            className="SignIn-email-username"
            placeholder="Type Email or Username Here"
            onBlur={signInSetOnBlur}
            onChange={signInHandleOnChange}
            required
          />
          <input
            type="password"
            className="SignIn-password"
            placeholder="Password Here..."
            onBlur={passwordSetOnBlur}
            onFocus={passwordSetOnFocus}
            onChange={passwordHandleOnChange}
            required
          />
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}
