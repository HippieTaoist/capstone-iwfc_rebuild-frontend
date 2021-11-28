import React from "react";

import "./SignIn.css";

export default function SignIn() {
  return (
    <div className="SignIn">
      <h1>Sign In...</h1>
      <input
        type="email"
        className="SignIn-email"
        placeholder="Type Email Here"
        required
      />
      <input
        type="password"
        className="SignIn-password"
        placeholder="Passwords"
        required
      />
    </div>
  );
}
