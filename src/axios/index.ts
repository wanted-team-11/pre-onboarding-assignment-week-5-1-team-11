import axios, { AxiosResponse } from "axios";

export const getKeywords = async (searchKeyword: string) => {
  try {
    const response: AxiosResponse<any> = await axios.get(
      `http://localhost:4000/sick?q=${searchKeyword}`
    );
    return response.data;
  } catch (e) {
    console.error(e);
  }
};
