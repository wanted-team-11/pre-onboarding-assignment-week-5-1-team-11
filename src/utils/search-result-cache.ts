import type { Sick } from "../types";

interface Query {
  query: (
    uri: string
  ) => Promise<
    | { sickList: Sick[]; isError: boolean }
    | { sickList: null; isError: boolean }
  >;
  setCache: (uri: string, sickList: Sick[]) => void;
  invalidate: (uri: string) => void;
  getSearchResults: (
    searchWord: string
  ) => Promise<
    { sickList: Sick[]; error: null } | { sickList: null; error: unknown }
  >;
}

class QueryImpl implements Query {
  #localCache: { [key: string]: Sick[] | undefined };
  constructor() {
    this.#localCache = { default: [{ sickNm: "-", sickCd: "-" }] };
  }

  async query(uri: string) {
    const localCache = this.#localCache[uri];
    if (localCache !== undefined) {
      return {
        sickList: localCache,
        isError: false,
      };
    }
    const { sickList, error } = await this.getSearchResults(uri);
    if (error || sickList === null) {
      return {
        sickList: null,
        isError: true,
      };
    }
    this.setCache(uri, sickList);
    return {
      sickList: sickList ?? [],
      isError: false,
    };
  }

  async getSearchResults(searchWord: string) {
    console.info("calling api");
    try {
      if (!searchWord) return { sickList: [], error: null };
      const response = await fetch(`/sick?q=${searchWord}&_page=1&_limit=5`);
      const sickList = (await response.json()) as Sick[];
      return { sickList, error: null };
    } catch (error) {
      console.error(error);
      return { sickList: null, error };
    }
  }

  setCache(uri: string, sickList: Sick[]) {
    this.#localCache[uri] = sickList;
    setTimeout(() => {
      this.invalidate(uri);
    }, 60000); // 1 min => 60000
  }

  invalidate(uri: string) {
    delete this.#localCache[uri];
  }
}

const queryInstance = new QueryImpl();
Object.freeze(queryInstance);

export default queryInstance;
