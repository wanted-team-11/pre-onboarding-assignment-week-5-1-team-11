import GetFetchType from "../types/getFetchType";
import cache from "../utils/localCache.util";

const getFetchData = async (query: string) => {
  if (cache[query]) {
    console.log("캐시됨");
    return cache[query] as GetFetchType[];
  }
  const response = await fetch(`http://localhost:4000/sick?q=${query}`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = (await response.json()) as GetFetchType[];
  cache[query] = data;
  setTimeout(() => {
    delete cache[query];
    console.log("캐시 삭제");
  }, 60000);
  return data;
};
export default getFetchData;
