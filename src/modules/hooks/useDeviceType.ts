import { useState, useEffect } from "react";

export const useDeviceType = () => {
  const [isMobile, setIsMobile] = useState<undefined | boolean>(undefined);

  const checkIfMobile = () => {
    try {
      const _isMobile = window.innerWidth <= 768;
      setIsMobile(_isMobile);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    checkIfMobile();
  }, [null]);

  return [isMobile];
};
