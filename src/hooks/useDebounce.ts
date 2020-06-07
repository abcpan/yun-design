

import { useState,useEffect } from "react";
function useDebounce(value: any, delay: number = 300) {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebounceValue(value);
    }, delay)

    return () => {
      clearTimeout(timerId);
    }
  }, [value, delay])
  
  return debounceValue;
}
export default useDebounce;