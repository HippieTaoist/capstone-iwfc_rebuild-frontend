// if (!isEmail(reqAttr)) {
//   userFound = await User.findOne({
//     username: username,
//   });
//   console.log("username userFound", userFound);
// } else {
//   userFound = await User.findOne({
//     email: email,
//   });
//   console.log("email userFound", userFound);
// }

import { useState, useEffect } from "react";
import { isAlphanumeric, isEmail } from "validator";

export default function ValidateSignInSwitcher() {
  const [signIn, setSignIn] = useState("");
  const [error, setError] = useState("");
  const [onBlur, setOnBlur] = useState(false);

  useEffect(() => {
    if (onBlur) {
      if (signIn.length === 0) {
        setError(
          "SignIn must not be empty, please use email or username to sign in"
        );
      }
    }
  }, [signIn, onBlur]);

  const handleOnChange = (e) => {
    if (!isEmail(e.target.value)) {
      if (isAlphanumeric(e.target.value)) {
        setSignIn(e.target.value);
      } else {
        setError(
          "Username is not in alphanumeric format, not special characters allowed in SignIn besides '.' and '@' for email addresses"
        );
      }
    }
    if (isEmail(e.target.value)) {
      setSignIn(e.target.value);
    }
  };

  return [signIn, setOnBlur, handleOnChange, error];
}
