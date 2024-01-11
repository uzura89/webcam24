import { useEffect, useRef } from "react";

import { selectConfigObject, useConfigStore } from "@/store/configStore";
import { usePlaceStore } from "@/store/placeStore";
import { usePlayerStore } from "@/store/playerStore";
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
      hasStartButtonClicked: state.hasStartButtonClicked,
      startButtonClicked: state.startButtonClicked,
    }))
  );
  const configObject = useConfigStore(selectConfigObject);

  /**
   * Functions
   */

  const goToNextPlace = () => {
    placeStore.setNextPlace();
    playerStore.startTransition();
    playerStore.startButtonClicked();
    clearInterval(intervalRef.current);
    playerStore.setSecondsUntilNext(configObject.intervalSecNextPlace);
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
      !playerStore.inTransition &&
      placeStore.currentPlace &&
      !playerStore.isAutoNextPaused &&
      playerStore.hasStartButtonClicked
    ) {
      startCountdown();
      placeStore.incrementLoadedPlaceCnt();
    }
  }, [
    placeStore.currentPlace?.id,
    playerStore.inTransition,
    playerStore.hasStartButtonClicked,
  ]);

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
