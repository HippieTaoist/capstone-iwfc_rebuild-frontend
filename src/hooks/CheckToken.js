import jwtDecode from "jwt-decode";

export default function CheckToken() {
  function checkJwtToken() {
    let jwtToken = window.localStorage.getItem("jwt-token");

    if (jwtToken) {
      let decodedToken = jwtDecode(jwtToken);

      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        window.localStorage.getItem("jwt-token");
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }
  return { checkJwtToken };
}
