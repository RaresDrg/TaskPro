type WebStorageType = "localStorage" | "sessionStorage";

function hasStorage(type: WebStorageType) {
  if (typeof window === "undefined") return false;
  try {
    const testKey = "__redux_persist_test__";
    window[type].setItem(testKey, testKey);
    window[type].removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

export function createWebStorage(type: WebStorageType) {
  if (!hasStorage(type)) {
    return {
      getItem: () => Promise.resolve(null),
      removeItem: () => Promise.resolve(),
      setItem: () => Promise.resolve(),
    };
  }

  return {
    getItem: (key: string) => Promise.resolve(window[type].getItem(key)),
    removeItem: (key: string) => Promise.resolve(window[type].removeItem(key)),
    setItem: (key: string, item: string) =>
      Promise.resolve(window[type].setItem(key, item)),
  };
}
