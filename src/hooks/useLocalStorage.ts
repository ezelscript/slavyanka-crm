import { useState, useEffect } from "react";

function useLocalStorage<T>(key: string, defaultValue: T) {
  const [storageValue, setStorageValue] = useState<T>(() => {
    const possibleValue = localStorage.getItem(key);
    return possibleValue ? JSON.parse(possibleValue) : defaultValue;
  });

  useEffect(
    () => localStorage.setItem(key, JSON.stringify(storageValue)),
    [key, storageValue]
  );

  return [storageValue, setStorageValue] as const;
}

export default useLocalStorage;
