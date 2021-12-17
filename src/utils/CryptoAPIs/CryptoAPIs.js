import axios from "axios";

// the plan here is to take the apis from differeent locations  and put them in an algorytyjm that sorts throughtr the apis and dedtermines ithe symbbols is represented within. if not it goe s the next api. the trick here is that I want to not waste api calls on it. so i want to build a varaible to hold the represented cryptos for each exchangte/api, but that doesn't mean that they have to make a call each time. one call periaodically should do the trick. be frgual in your data usage. The continula challange is to be how can I get the most out of the data pooints. the more data you store on site the quicker and somether the site will run.

const Axios = axios.create({
  baseURL: "http://localhost:3001/",
  timeout: 50000,
  headers: {
    Accept: "*/*",
  },
});

export const kuCoinAPI = axios.create({
  baseURL: "https://api.kucoin.com/",
  timeout: 50000,
  headers: {
    Accept: "*",
    // /*",
    // "Access-Control-Allow-Origin": "http://iwantfreecrypto.com/",
    // "Access-Control-Allow-Credentials": "true",
    // credentials: "include",
    // "KC-API-Key": process.env.KC_API_KEY,
  },
});
export default Axios;
