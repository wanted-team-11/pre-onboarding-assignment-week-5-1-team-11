const getFetchData = async <T>(query: string): Promise<T> => {
  const response = await fetch(`http://localhost:4000/sick?q=${query}`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = response.json();
  return data;
};
export default getFetchData;
