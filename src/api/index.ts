import axios from "axios";

const callApi = axios.create({ baseURL: "http://localhost:3000/" });

export const getSearchData = async () => {
  const data = await callApi.get("/sick");
  return data.data;
};

export const getSpecificData = async (input: string) => {
  const data = await callApi(`/sick?q=${input}`);
  return data.data;
};
