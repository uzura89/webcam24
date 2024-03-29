import clsx from "clsx";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { FaGear, FaPlay, FaPause } from "react-icons/fa6";

import { PrimaryButton } from "@/components/atomic/atoms/buttons/PrimaryButton";
import { SecondaryButton } from "@/components/atomic/atoms/buttons/SecondaryButton";
import { usePlayerStore } from "@/store/playerStore";
import { MonitorDisplayInPrimaryButton } from "@/components/atomic/atoms/wrapper/MonitorDisplay";
import { MODAL_CONFIG, useModalStore } from "@/store/modalStore";

export function ControllerButtons(props: { goToNextPlace: () => void }) {
  const setVisibleModal = useModalStore((state) => state.setVisibleModal);

  function onClickConfig() {
    setVisibleModal(MODAL_CONFIG);
  }

  return (
    <div className="flex items-center gap-4">
      <PauseAndPlayButton />
      <NextButton goToNextPlace={props.goToNextPlace} />
      <SecondaryButton onClick={onClickConfig}>
        <FaGear className="w-5 h-5" />
      </SecondaryButton>
    </div>
  );
}

function NextButton(props: { goToNextPlace: () => void }) {
  // store state
  const secondsUntilNext = usePlayerStore((state) => state.secondsUntilNext);

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

      <MonitorDisplayInPrimaryButton>
        <div
          className={clsx(
            "text-sm font-bold text-backLight w-[1.7rem] h-[1.7rem] flex items-center justify-center text-white/80"
          )}
        >
          {secondsUntilNext}
        </div>
      </MonitorDisplayInPrimaryButton>
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
      enableAutoNext: state.enableAutoNext,
      inTransition: state.inTransition,
      hasStartButtonClicked: state.hasStartButtonClicked,
    }))
  );

  function toggleIsAutoNextPaused() {
    if (playerStore.isAutoNextPaused) {
      playerStore.enableAutoNext();
    } else {
      playerStore.pauseAutoNext();
    }
  }

  return (
    <SecondaryButton
      disabled={
        playerStore.inTransition || playerStore.hasStartButtonClicked === false
      }
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
