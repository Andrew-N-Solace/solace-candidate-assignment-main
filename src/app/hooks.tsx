import { useState, useEffect } from "react";

export function useDebounce<T>(v: T, d = 300) {
  const [val, set] = useState(v);
  useEffect(() => {
    const id = setTimeout(() => set(v), d);
    return () => clearTimeout(id);
  }, [v, d]);
  return val;
}
