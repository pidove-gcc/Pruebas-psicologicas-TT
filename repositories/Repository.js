import Cookies from "js-cookie";
import axios from "axios";

const token = Cookies.get("id_token");
// const baseDomain = 'http://45.76.97.89:3000';
// // const baseDomain = 'http://192.168.100.35:9000' (Token - Api Canastas y Arcones)
// const baseArcDomain = 'http://35.87.217.218/api';
const baseDomain = "http://127.0.0.1:8000/api";

export const customHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

// export const baseUrl = `${baseDomain}`;
// export const apiURL = `${baseArcDomain}`;
export const apiTT = `${baseDomain}`;

export default axios.create({
  // baseUrl,
  // apiURL,
  apiTT,
  headers: customHeaders,
});

export const serializeQuery = (query) => {
  return Object.keys(query)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
    )
    .join("&");
};
