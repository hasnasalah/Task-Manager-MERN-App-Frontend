import { useState } from "react";

export function useLocalStorage<T>(key:string, initialValue:T){
    
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      if (!item || item === "undefined") {
        return initialValue;
      }
      return JSON.parse(item) as T;
    } catch (error) {
      console.error("Error reading localStorage key", key, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((prev: T) => T)) => {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

    try {
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Error setting localStorage key", key, error);
    }
  };

  return [storedValue, setValue] as const;
}