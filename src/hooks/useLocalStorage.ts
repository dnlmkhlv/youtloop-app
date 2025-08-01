"use client";

import { useState, useEffect } from "react";

interface UseLocalStorageOptions<T> {
  key: string;
  defaultValue: T;
}

export function useLocalStorage<T>({
  key,
  defaultValue,
}: UseLocalStorageOptions<T>) {
  const [value, setValue] = useState<T>(defaultValue);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount (client-side only)
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setValue(JSON.parse(item));
      }
    } catch (error) {
      console.log(`Error reading localStorage key "${key}":`, error);
    }
    setIsLoaded(true);
  }, [key]);

  const setStoredValue = (newValue: T) => {
    try {
      setValue(newValue);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(newValue));
      }
    } catch (error) {
      console.log(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [value, setStoredValue, isLoaded] as const;
}
