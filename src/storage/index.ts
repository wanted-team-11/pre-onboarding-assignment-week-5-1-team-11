import { ISearchList } from "../types/data.type";

type storageKey = "searchData";

const storage = {
  get: (key: storageKey) => localStorage.getItem(key),
  set: (key: storageKey, value: ISearchList) =>
    localStorage.setItem(
      key,
      JSON.stringify({ ...value, sickCd: value.sickCd, sickNm: value.sickNm })
    ),
};
export default storage;
