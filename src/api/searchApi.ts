import { baseInstance } from "./instance";

const fetchSearchList = async (keyword: string) => {
  return baseInstance.get(`/sick?q=${keyword}`);
};

export { fetchSearchList };
