import { useState, useEffect } from "react";
const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timeoutID);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;