import axios from "axios";

const callApi = axios.create({ baseURL: "http://localhost:4000/sick" });

export const onSearchApi = async (Inputsearch: string) => {
  try {
    const response = await callApi.get(`?q=${Inputsearch}&_page=1%_limit=8`);
    return response.data;
  } catch (e) {
    console.error(e);
  }
};
