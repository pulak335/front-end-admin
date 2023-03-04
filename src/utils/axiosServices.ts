import axios from "axios";
import { BASEURL } from "utils/Constants";

const axiosServices = axios.create({
  baseURL: BASEURL,
  // headers: {
  //   Accept: "application/json",
  //   "Content-Type": "application/json",
  // },
});

// interceptor for http
axiosServices.interceptors.request.use((request) => {
  const token = localStorage.getItem("serviceToken");
  if (token) {
    request.headers!.Authorization = `${token}`;
  }
  return request;
});

export default axiosServices;
