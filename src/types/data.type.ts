export interface ISearchList {
  sickCd: string;
  sickNm: string;
}

export interface ISearchLists {
  data: ISearchList[];
}

export interface ISearchValue {
  search: { value: string };
}
