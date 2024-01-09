import { useEffect, useState } from "react";

export const useScrolllPosition = () => {
  const [scrollPosition, setScrollPosition] = useState({
    scrollY: 0,
    scrollX: 0,
  });

  const onScroll = (e: any) => {
    setScrollPosition({ scrollY: window.scrollY, scrollX: window.scrollX });
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [null]);

  return [scrollPosition];
};
