import clsx from "clsx";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

import { PlaceType, getLocationFromPlace } from "@/types/place.types";
import { FlightAnimation } from "../../organisms/FlightAnimation";
import { useDeviceType } from "@/modules/hooks/useDeviceType";
import { useViewHeight } from "@/modules/hooks/useViewHeight";
import { usePlaceStore } from "@/store/placeStore";
import { VideoPlayer } from "./sub/VideoPlayer";
import { VideoController } from "./sub/VideoController";
import { usePlayerStore } from "@/store/playerStore";
import { LandingSection } from "../../organisms/LandingSection";
import { useIntervaManager } from "./sub/useIntervalManager";

export default function HomeTemplate(props: { places: PlaceType[] }) {
  const setAllPlaces = usePlaceStore((state) => state.setAllPlaces);

  function initializePlaceStore() {
    setAllPlaces(props.places);
  }

  useEffect(() => {
    if (props.places.length > 0) {
      initializePlaceStore();
    }
  }, [props.places]);

  return (
    <div className="h-[100vh]">
      <MainVideoPage />
    </div>
  );
}

/**
 * Sub Components
 */

function MainVideoPage() {
  // hooks
  const [isMobile] = useDeviceType();
  const [viewHeight] = useViewHeight();
  const { goToNextPlace } = useIntervaManager();
  // global state
  const hasStartButtonClicked = usePlayerStore(
    (state) => state.hasStartButtonClicked
  );
  // variables
  const controllerHeight = isMobile ? 100 : 160;
  const videoHeight = viewHeight - controllerHeight;
  const isHeightCalculated = videoHeight > 0;

  if (!isHeightCalculated)
    return <div className="h-full w-full bg-black">Loading...</div>;

  if (!hasStartButtonClicked) {
    return <LandingSection goToNextPlace={goToNextPlace} />;
  }

  return (
    <div className="h-full flex-col justify-stretch">
      {/* Video Section */}
      <div
        className="relative flex-grow"
        style={{
          height: videoHeight,
        }}
      >
        <VideoSection videoHeight={videoHeight} />
      </div>

      {/* Controller Section */}
      <div
        className="relative"
        style={{
          height: controllerHeight,
        }}
      >
        <VideoController goToNextPlace={goToNextPlace} />
      </div>
    </div>
  );
}

/**
 * Sub Sub Components
 */

function VideoSection(props: { videoHeight: number }) {
  // place store
  const currentPlace = usePlaceStore(useShallow((state) => state.currentPlace));
  const prevPlace = usePlaceStore(useShallow((state) => state.prevPlace));
  // player store
  const inTransition = usePlayerStore((state) => state.inTransition);

  if (!currentPlace) {
    return <div>loading...</div>;
  }

  return (
    <div className="">
      {/* while inTransition is true, FlightAnimation comes on top */}
      <div
        className={clsx(
          "absolute top-0 left-0 w-full h-full z-10",
          inTransition
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
          "transition-opacity duration-1000 ease-in-out"
        )}
      >
        <FlightAnimation
          fromLocation={prevPlace ? getLocationFromPlace(prevPlace) : null}
          toLocation={getLocationFromPlace(currentPlace)}
        />
      </div>

      <div className="absolute top-0 left-0 w-full h-full">
        <VideoPlayer
          height={props.videoHeight}
          youtubeVideoId={currentPlace.youtubeVideoId}
        />
      </div>
    </div>
  );
}
