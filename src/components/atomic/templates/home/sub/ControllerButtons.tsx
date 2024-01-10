import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { FaGear, FaPlay, FaPause } from "react-icons/fa6";

import { PrimaryButton } from "@/components/atomic/atoms/buttons/PrimaryButton";
import { SecondaryButton } from "@/components/atomic/atoms/buttons/SecondaryButton";
import { useConfigStore } from "@/store/configStore";
import { usePlayerStore } from "@/store/playerStore";
import { MonitorDisplayInPrimaryButton } from "@/components/atomic/atoms/wrapper/MonitorDisplay";
import clsx from "clsx";

export function ControllerButtons(props: { goToNextPlace: () => void }) {
  return (
    <div className="flex items-center gap-4">
      <PauseAndPlayButton />
      <NextButton goToNextPlace={props.goToNextPlace} />
      <SecondaryButton>
        <FaGear className="w-5 h-5" />
      </SecondaryButton>
    </div>
  );
}

function NextButton(props: { goToNextPlace: () => void }) {
  const secondsUntilNext = usePlayerStore((state) => state.secondsUntilNext);
  // config store
  const autoNextPlace = useConfigStore((state) => state.autoNextPlace);

  /**
   * Effects
   */

  useEffect(() => {
    if (secondsUntilNext <= 0) {
      props.goToNextPlace();
    }
  }, [secondsUntilNext]);

  /**
   * Render
   */

  return (
    <PrimaryButton onClick={props.goToNextPlace}>
      <div className="text-lg font-bold">Next</div>
      {autoNextPlace && (
        // <div className="w-[1.8rem] h-[1.8rem] rounded-full bg-white/20 flex justify-center items-center">
        <MonitorDisplayInPrimaryButton>
          <div
            className={clsx(
              "text-sm font-bold text-backLight w-[1.7rem] h-[1.7rem] flex items-center justify-center text-white/80"
            )}
          >
            {secondsUntilNext}
          </div>
        </MonitorDisplayInPrimaryButton>
        // </div>
      )}
    </PrimaryButton>
  );
}

/**
 * Sub Components
 */

function PauseAndPlayButton() {
  const playerStore = usePlayerStore(
    useShallow((state) => ({
      isAutoNextPaused: state.isAutoNextPaused,
      pauseAutoNext: state.pauseAutoNext,
      resumeAutoNext: state.resumeAutoNext,
      inTransition: state.inTransition,
    }))
  );

  function toggleIsAutoNextPaused() {
    if (playerStore.isAutoNextPaused) {
      playerStore.resumeAutoNext();
    } else {
      playerStore.pauseAutoNext();
    }
  }

  return (
    <SecondaryButton
      disabled={playerStore.inTransition}
      onClick={toggleIsAutoNextPaused}
    >
      {playerStore.isAutoNextPaused ? (
        <FaPlay className="w-5 h-5" />
      ) : (
        <FaPause className="w-5 h-5" />
      )}
    </SecondaryButton>
  );
}
