export const sickListStorage = {
  get: (key: string) => localStorage.getItem(key),
  set: (key: string, value: string) => {
    localStorage.setItem(key, JSON.stringify(value));
    localStorage.setItem(
      key + "_expiresIn",
      JSON.stringify(Date.now() + 60 * 60 * 1000)
    );
  },
  remove: (key: string) => {
    localStorage.removeItem(key);
    localStorage.removeItem(key + "_expiresIn");
  },
};
