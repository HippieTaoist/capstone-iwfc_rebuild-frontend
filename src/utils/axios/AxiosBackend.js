import axios from "axios";

let url =
  process.env.NODE_ENV === "production"
    ? "https://PRODUCTIONLINKHERE"
    : "http://localhost:3001";

const AxiosBackend = axios.create({
  baseURL: url,
  timeout: 100000,
  headers: {
    Accept: "*",
    authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
  },
});

export default AxiosBackend;
