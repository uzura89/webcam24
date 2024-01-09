import { useConfigStore } from "@/store/configStore";
import { usePlaceStore } from "@/store/placeStore";
import { usePlayerStore } from "@/store/playerStore";
import { useEffect, useRef } from "react";
import { useShallow } from "zustand/react/shallow";

export function useIntervaManager() {
  // refs
  const intervalRef = useRef<any>(0);
  // global state
  const placeStore = usePlaceStore(
    useShallow((state) => ({
      currentPlace: state.currentPlace,
      setNextPlace: state.setNextPlace,
      loadedPlaceCnt: state.loadedPlaceCnt,
      incrementLoadedPlaceCnt: state.incrementLoadedPlaceCnt,
    }))
  );
  const playerStore = usePlayerStore(
    useShallow((state) => ({
      startTransition: state.startTransition,
      setSecondsUntilNext: state.setSecondsUntilNext,
      decrementSecondsUntilNext: state.decrementSecondsUntilNext,
      inTransition: state.inTransition,
      isAutoNextPaused: state.isAutoNextPaused,
    }))
  );
  const configStore = useConfigStore(
    useShallow((state) => ({
      intervalSecNextPlace: state.intervalSecNextPlace,
      autoNextPlace: state.autoNextPlace,
    }))
  );

  /**
   * Functions
   */

  const goToNextPlace = () => {
    placeStore.setNextPlace();
    playerStore.startTransition();
    clearInterval(intervalRef.current);
    playerStore.setSecondsUntilNext(configStore.intervalSecNextPlace);
  };

  const startCountdown = () => {
    intervalRef.current = setInterval(() => {
      playerStore.decrementSecondsUntilNext();
    }, 1000);

    return () => clearInterval(intervalRef.current);
  };

  const pauseCountdown = () => {
    clearInterval(intervalRef.current);
  };

  const resumeCountdown = () => {
    startCountdown();
  };

  /**
   * Effects
   */

  useEffect(() => {
    if (
      configStore.autoNextPlace &&
      !playerStore.inTransition &&
      placeStore.currentPlace &&
      !playerStore.isAutoNextPaused
    ) {
      startCountdown();
      placeStore.incrementLoadedPlaceCnt();
    }
  }, [placeStore.currentPlace?.id, playerStore.inTransition]);

  useEffect(() => {
    if (placeStore.loadedPlaceCnt === 0) return;

    if (playerStore.isAutoNextPaused) {
      pauseCountdown();
    } else {
      resumeCountdown();
    }
  }, [playerStore.isAutoNextPaused]);

  /**
   * Render
   */

  return { goToNextPlace };
}
