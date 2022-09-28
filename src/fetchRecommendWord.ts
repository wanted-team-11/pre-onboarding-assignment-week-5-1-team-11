export type Sick = {
  sickCd: string;
  sickNm: string;
};

const cache: {
  [key: string]: Sick[];
} = {};

const fetchRecomendWord = async (word: string) => {
  try {
    if (!word) return;
    if (Object.hasOwn(cache, word)) return cache[word];
    const response = await fetch(
      `http://localhost:4000/sick?q=${word}&_limit=20`
    );
    const data = await response.json();
    cache[word] = data;
    console.info("calling api");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchRecomendWord;
