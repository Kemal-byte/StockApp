import axios from "axios";
import { useSelector } from "react-redux";

const escapedToken = JSON.parse(localStorage.getItem("persist:root"))?.token;
const token = escapedToken && JSON.parse(escapedToken);

const BASE_URL = "https://14191.fullstack.clarusway.com/";

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
});

// const useAxios = () => {
//! This is the alternative way of using it as opposed to interceptor.
//     const {token} = useSelector(state => state.auth);

//     const axiosWithToken = axios.create({
//         baseURL: BASE_URL,
//         headers: { Authorization: `Token ${token}` },
//       });

//     return {axiosWithToken}
// }
export const axiosWithToken = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Token ${token}` },
});
// Sometimes when we parse the token from local storage it might not find the token there in time.
// So naturally, it would return null . To avoid this we can add an interceptors function which
// can help us to wait for the token to be available

// Alternatively you can recieve the toke from the redux state. not from local storage.
axiosWithToken.interceptors.request.use(
  function (config) {
    console.log("INterceptor runned");
    if (!config.headers["Authorization"]) {
      config.headers["Authorization"] = `Token ${token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
