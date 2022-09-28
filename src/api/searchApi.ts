import { baseInstance } from "./instance";

const fetchSuggetedList = async (keyword: string) => {
  return baseInstance.get(`/sick?q=${keyword}`);
};

export { fetchSuggetedList };
