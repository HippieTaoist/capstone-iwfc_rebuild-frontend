import React, { useEffect } from "react";
import { toast } from "react-toastify";

import ValidateFirstName from "../../../hooks/ValidateFirstName";
import ValidateLastName from "../../../hooks/ValidateLastName";
import ValidateEmail from "../../../hooks/ValidateEmail";
import ValidateUsername from "../../../hooks/ValidateUsername";
import ValidatePassword from "../../../hooks/ValidatePassword";
import AxiosBackend from "../../../utils/axios/AxiosBackend";

import "./SignUp.css";
import CheckToken from "../../../hooks/CheckToken";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [
    nameFirst,
    firstNameSetOnFocus,
    firstNameSetOnBlur,
    firstNameHandleOnChange,
    firstNameError,
  ] = ValidateFirstName();

  const [
    nameLast,
    lastNameSetOnFocus,
    lastNameSetOnBlur,
    lastNameHandleOnChange,
    lastNameError,
  ] = ValidateLastName();

  const [
    email,
    emailSetOnFocus,
    emailSetOnBlur,
    emailHandleOnChange,
    emailError,
  ] = ValidateEmail();

  const [
    username,
    usernameSetOnFocus,
    usernameSetOnBlur,
    usernameHandleOnChange,
    usernameError,
  ] = ValidateUsername();

  const [
    password,
    passwordSetOnFocus,
    passwordSetOnBlur,
    passwordHandleOnChange,
    passwordError,
  ] = ValidatePassword();

  const navigate = useNavigate();
  const { checkJwtToken } = CheckToken();

  let userLevel;
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      let payload = await AxiosBackend.post("/api/users/user-create", {
        userLevel,
        nameFirst,
        nameLast,
        username,
        email,
        password,
      });

      console.log("payload", payload);

      toast.success("Congrats, you're all signed up! You may go sign in.", {
        position: "top-center",
        autoClose: 10000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        hideProgressBar: false,
      });
    } catch (err) {
      console.log(err);
      toast.error(
        (err.response.data,
        {
          position: "top-center",
          autoClose: 10000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          hideProgressBar: false,
        })
      );
    }
    navigate("/sign-in");
  }

  if (firstNameError) {
    toast.error("First Name Error: " + firstNameError);
  }

  if (lastNameError) {
    toast.error("Last Name Error: " + lastNameError);
  }

  if (emailError) {
    toast.error("Email Error: " + emailError);
  }

  if (usernameError) {
    toast.error("Username Error: " + usernameError);
  }

  if (passwordError) {
    toast.error("Password Error: " + passwordError);
  }

  useEffect(() => {
    if (checkJwtToken()) {
      navigate("/");
    }
  }, [checkJwtToken, navigate]);

  return (
    <div className="SignUp">
      <div className="SignUp-form-container">
        <form className="SignUp-form" onSubmit={handleSubmit}>
          <h1>Sign Up...</h1>
          <input
            type="text"
            className="SignUp-input"
            placeholder="First Name Here"
            onFocus={firstNameSetOnFocus}
            onBlur={firstNameSetOnBlur}
            onChange={firstNameHandleOnChange}
            required
          />
          <input
            type="text"
            className="SignUp-input"
            placeholder="Last Name Here"
            onFocus={lastNameSetOnFocus}
            onBlur={lastNameSetOnBlur}
            onChange={lastNameHandleOnChange}
            required
          />
          <input
            type="email"
            className="SignUp-input"
            placeholder="Email Address Here"
            onFocus={emailSetOnFocus}
            onBlur={emailSetOnBlur}
            onChange={emailHandleOnChange}
            required
          />
          <input
            type="text"
            className="SignUp-input"
            placeholder="Username Here"
            onFocus={usernameSetOnFocus}
            onBlur={usernameSetOnBlur}
            onChange={usernameHandleOnChange}
            required
          />
          <input
            type="password"
            className="SignUp-input"
            placeholder="Password Here"
            onFocus={passwordSetOnFocus}
            onBlur={passwordSetOnBlur}
            onChange={passwordHandleOnChange}
            required
          />
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}
