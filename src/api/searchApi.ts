import { baseInstance } from "./instance";

const fetchSuggestedList = async (keyword: string) => {
  return baseInstance.get(`/sick?q=${keyword}`);
};

export { fetchSuggestedList };
