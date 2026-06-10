import { useState, useEffect } from "react";

const safeParseJSON = (value, fallback) => {
  if (value === null) return fallback;
  try {
    return JSON.parse(value);
  } catch (error) {
    console.warn("useLocalStorage: failed to parse JSON", error);
    return fallback;
  }
};

const safeReadStorage = (key, fallback) => {
  if (typeof window === "undefined") return fallback;
  try {
    return safeParseJSON(window.localStorage.getItem(key), fallback);
  } catch (error) {
    console.warn(`useLocalStorage: unable to read ${key}`, error);
    return fallback;
  }
};

const safeWriteStorage = (key, value) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`useLocalStorage: unable to write ${key}`, error);
  }
};

export function useLocalStorageState(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => safeReadStorage(key, initialValue));

  useEffect(() => {
    setStoredValue(safeReadStorage(key, initialValue));
  }, [key, initialValue]);

  useEffect(() => {
    safeWriteStorage(key, storedValue);
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
