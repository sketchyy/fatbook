import { useEffect, useRef, useState } from "react";
import ResizeObserver from "resize-observer-polyfill";

export default function useMeasure() {
  const ref = useRef();
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });
  const [ro] = useState(
    () => new ResizeObserver(([entry]) => setBounds(entry.contentRect))
  );

  useEffect(() => {
    console.log("asd", ro);
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [{ ref }, bounds];
}
