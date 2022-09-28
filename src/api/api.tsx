import axios from "axios";

const callApi = axios.create({ baseURL: "http://localhost:4000/sick" });

export const getData = async () => {
  const data = await callApi.get("");
  return data.data;
};

export const submitData = async (input: string) => {
  const data = await callApi.get(`?q=${input}`);
  return data.data;
};
