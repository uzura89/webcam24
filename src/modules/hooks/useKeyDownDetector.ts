import { useEffect, useState } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */

interface KeydownCheckerType {
  condition: (e: KeyboardEvent) => boolean;
  action: () => void;
}

export const useKeyDownDetector = (checkers: KeydownCheckerType[]) => {
  const onKeyDown = (e: KeyboardEvent) => {
    const checker = checkers.find((checker) => checker.condition(e));

    if (checker) {
      checker.action();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [null]);

  return null;
};
