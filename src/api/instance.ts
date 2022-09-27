import axios from "axios";

export const baseInstance = axios.create({
  baseURL: "http://localhost:4000",
});

baseInstance.interceptors.response.use(
  (res) => {
    return { ...res };
  },
  (error) => {
    return Promise.reject(error);
  }
);
