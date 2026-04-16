import { useEffect, useState } from "react";

export default function useDebounce(val, delay = 500) {
  const [newVal, setNewVal] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setNewVal(val);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [val, delay]);
  return newVal;
}
