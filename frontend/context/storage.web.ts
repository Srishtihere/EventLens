export const storage = {
  getItem: async (key: string) => {
    return localStorage.getItem(key);
  },
  setItem: async (key: string, value: string) => {
    return localStorage.setItem(key, value);
  },
  removeItem: async (key: string) => {
    return localStorage.removeItem(key);
  }
};
