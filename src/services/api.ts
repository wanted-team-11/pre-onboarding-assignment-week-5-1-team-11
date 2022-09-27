export const getSearchResults = async (searchWord: string) => {
  try {
    if (!searchWord) return [[], null];
    const response = await fetch(`/sick?q=${searchWord}&_page=1&_limit=5`);
    const data = await response.json();
    return [data, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
};
