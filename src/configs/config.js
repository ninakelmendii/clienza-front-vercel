import axios from "axios";

const AUTH_TOKEN =  `Bearer $(localStorage.getItem('token'))`

axios.defaults.baseURL = "";
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

axios.interceptors.request.use(function (config) {
  config.headers.common = {
    Authorization: `Bearer $(localStorage.getItem('token'))`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  return config;
});
