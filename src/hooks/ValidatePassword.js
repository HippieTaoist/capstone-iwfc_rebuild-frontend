import { useEffect, useState } from "react";
import { isStrongPassword } from "validator";

export default function ValidateUsername() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [onBlur, setOnBlur] = useState(false);
  const [onFocus, setOnFocus] = useState(false);

  useEffect(() => {
    if (onFocus) {
      if (password.length > 0) {
        if (!isStrongPassword(password)) {
          setError("Password must be stronger.");
        }
      }
    }
    if (onBlur) {
      if (password.length === 0) {
        setError("Password cannot be empty");
      }
    }
  }, [password, onFocus, onBlur]);

  const handleOnChange = (e) => {
    if (!isStrongPassword(e.target.value)) {
      setError("Must b a stronger password");
    }
    if (e.target.value.length === 0) {
      setError("Password cannot be blank...");
    }
    if (isStrongPassword(e.target.value)) {
      setError("");
      setPassword(e.target.value);
    }
  };

  return [password, setOnFocus, setOnBlur, handleOnChange, error];
}
