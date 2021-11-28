import { useEffect, useState } from "react";
import { isAlpha } from "validator";

export default function ValidateFirstName() {
  const [firstName, setFirstName] = useState("");
  const [error, setError] = useState("");
  const [onFocus, setOnFocus] = useState(false);
  const [onBlur, setOnBlur] = useState(false);

  useEffect(() => {
    if (onFocus) {
      if (firstName.length > 0) {
        if (!isAlpha(firstName)) {
          setError("First Name muse be letters only");
        }
      }
    }
    if (onBlur) {
      if (firstName.length === 0) {
        setError("First Name cannot be empty");
      }
    }
  }, [firstName, onFocus, onBlur]);

  const handleOnChange = (e) => {
    if (!isAlpha(e.target.value)) {
      setError("Cannot have numbers or special characters in First Name");
    }
    if (e.target.value.length === 0) {
      setError("First Name cannot be blank...");
    }
    if (isAlpha(e.target.value)) {
      setError("");
      setFirstName(e.target.value);
    }
  };

  return [firstName, setOnFocus, setOnBlur, handleOnChange, error];
}
