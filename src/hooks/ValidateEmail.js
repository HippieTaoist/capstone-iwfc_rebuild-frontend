import { useEffect, useState } from "react";
import { isEmail } from "validator";

export default function ValidateEmail() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [onBlur, setOnBlur] = useState(false);
  const [onFocus, setOnFocus] = useState(false);

  useEffect(() => {
    if (onFocus) {
      if (email.length > 0) {
        if (!isEmail(email)) {
          setError("Email must be in valid format");
        }
      }
    }
    if (onBlur) {
      if (email.length === 0) {
        setError("Email cannot be empty");
      }
    }
  }, [email, onFocus, onBlur]);

  const handleOnChange = (e) => {
    if (!isEmail(e.target.value)) {
      setError("Must be in proper email format");
    }
    if (e.target.value.length === 0) {
      setError("Email cannot be blank...");
    }
    if (isEmail(e.target.value)) {
      setError("");
      setEmail(e.target.value);
    }
  };

  return [email, setOnFocus, setOnBlur, handleOnChange, error];
}
