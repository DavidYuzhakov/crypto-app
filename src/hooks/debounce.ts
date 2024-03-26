import { useEffect, useState } from "react";

export default function useDebounce (value: string, time: number = 500) {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value)
    }, time)

    return () => {
      clearTimeout(handler)
    }
  }, [value, time])

  return debounceValue
}