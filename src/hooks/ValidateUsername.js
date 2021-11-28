import { useEffect, useState } from "react";
import { isAlphanumeric } from "validator";

export default function ValidateUsername() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [onBlur, setOnBlur] = useState(false);
  const [onFocus, setOnFocus] = useState(false);

  useEffect(() => {
    if (onFocus) {
      if (username.length > 0) {
        if (!isAlphanumeric(username)) {
          setError("Username must be in valid format");
        }
      }
    }
    if (onBlur) {
      if (username.length === 0) {
        setError("Username cannot be empty");
      }
    }
  }, [username, onFocus, onBlur]);

  const handleOnChange = (e) => {
    if (!isAlphanumeric(e.target.value)) {
      setError("Must be in proper alphanumeric format");
    }
    if (e.target.value.length === 0) {
      setError("Username cannot be blank...");
    }
    if (isAlphanumeric(e.target.value)) {
      setError("");
      setUsername(e.target.value);
    }
  };

  return [username, setOnFocus, setOnBlur, handleOnChange, error];
}
