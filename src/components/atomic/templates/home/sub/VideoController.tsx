import clsx from "clsx";
import { useRef, useState, useEffect } from "react";
import { FaPause, FaPlay, FaGear } from "react-icons/fa6";

import StaticMap from "@/components/atomic/organisms/StaticMap";
import { APP_DOMAIN } from "@/cons/brand.cons";
import { getCurrentTimeWithOffset } from "@/modules/utils/datetime/getCurrentTimeWithOffset";
import { useConfigStore } from "@/store/configStore";
import { usePlaceStore } from "@/store/placeStore";
import { getLocationFromPlace, LocationType } from "@/types/place.types";
import { useShallow } from "zustand/react/shallow";
import { usePlayerStore } from "@/store/playerStore";
import { useIntervaManager } from "./useIntervalManager";

export function VideoController(props: {}) {
  // place store
  const currentPlace = usePlaceStore(useShallow((state) => state.currentPlace));
  const { goToNextPlace } = useIntervaManager();

  if (!currentPlace) return null;

  return (
    <div className="h-full w-full flex justify-start items-center border-border border-t">
      {/* Main */}
      <div className="h-full flex-grow">
        <MainBar
          location={getLocationFromPlace(currentPlace)}
          placeId={currentPlace.id}
          addressSpot={currentPlace.addressSpot}
          addressRegion={currentPlace.addressRegion}
          addressCountry={currentPlace.addressCountry}
          goToNextPlace={goToNextPlace}
        />
      </div>
      <VerticalBorder />
      {/* Time */}
      <div className="">
        <TimeBar gmtOffset={currentPlace.gmtOffset} />
      </div>
      <VerticalBorder />
      {/* Footer */}
      <div>
        <FooterBar />
      </div>
    </div>
  );
}

function VerticalBorder() {
  return <div className="h-full w-px bg-border"></div>;
}

function MainBar(props: {
  placeId: string;
  location: LocationType;
  addressSpot: string;
  addressRegion: string;
  addressCountry: string;
  goToNextPlace: () => void;
}) {
  return (
    <div className="h-full p-6 flex items-center gap-6">
      {/* Map */}
      <div className="w-[160px] h-full rounded-md overflow-hidden">
        <StaticMap location={props.location} withPin={true} />
      </div>

      {/* Address */}
      <div className="flex-grow">
        <div className="text-4xl font-black mb-1">{props.addressSpot}</div>
        <div className="text-sm font-bold opacity-100 ">
          {props.addressRegion}
        </div>
        <div className="text-sm font-bold opacity-100 ">
          {props.addressCountry}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-4">
        <PauseAndPlayButton />
        <NextButton goToNextPlace={props.goToNextPlace} />
        <div className="clickable">
          <FaGear className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

function TimeBar(props: { gmtOffset: number }) {
  const gmtOffsetOfHere = (new Date().getTimezoneOffset() / 60) * -1;

  return (
    <div className="h-full p-6 gap-6">
      <div className="flex gap-5 items-start">
        {/* There */}
        <div>
          <div className="text-sm font-bold tracking-wide text-foreLight">
            TIME
          </div>
          <div className="text-lg font-extrabold">
            <TimeString gmtOffset={props.gmtOffset} />
          </div>
        </div>

        {/* Here */}
        <div>
          <div className="text-sm font-bold tracking-wide text-foreLight">
            HERE
          </div>
          <div className="text-3xl font-extrabold">
            <TimeString gmtOffset={gmtOffsetOfHere} />
          </div>
        </div>
      </div>
    </div>
  );
}

function FooterBar(props: {}) {
  const placeCnt = usePlaceStore((state) => state.allPlaces.length);

  return (
    <div className="p-6 flex flex-col items-start gap-3">
      <div className="font-bold">{APP_DOMAIN}</div>
      <div className="text-sm bg-gray-800 inline-block rounded-md px-2">
        <span className="font-bold text-md">{placeCnt}</span> live cams
      </div>
    </div>
  );
}

function TimeString(props: { gmtOffset: number }) {
  // refs
  const intervalRef = useRef<any>(0);
  // local state
  const [hourString, setHourString] = useState("00");
  const [minString, setMinString] = useState("00");

  function updateTimeString() {
    const { hours, minutes } = getCurrentTimeWithOffset(props.gmtOffset);

    setHourString(hours.toString().padStart(2, "0"));
    setMinString(minutes.toString().padStart(2, "0"));
  }

  useEffect(() => {
    if (props.gmtOffset === undefined) return;

    updateTimeString();
    intervalRef.current = setInterval(() => {
      updateTimeString();
    }, 1000 * 60);

    return () => clearInterval(intervalRef.current);
  }, [props.gmtOffset]);

  return (
    <div className="">
      {hourString}
      <span>:</span>
      {minString}
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
    <div
      className="flex items-center gap-2 bg-white rounded-full px-4 py-2 clickable"
      onClick={props.goToNextPlace}
    >
      <div className="text-lg font-bold text-black">Next</div>
      {autoNextPlace && (
        <div className="w-[1.8rem] h-[1.8rem] rounded-full bg-black flex justify-center items-center">
          <div className="text-sm font-bold text-backLight">
            {secondsUntilNext}
          </div>
        </div>
      )}
    </div>
  );
}

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
    <div
      onClick={toggleIsAutoNextPaused}
      className={clsx("clickable", playerStore.inTransition ? "invisible" : "")}
    >
      {playerStore.isAutoNextPaused ? (
        <FaPlay className="w-7 h-7" />
      ) : (
        <FaPause className="w-7 h-7" />
      )}
    </div>
  );
}
