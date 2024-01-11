import { useShallow } from "zustand/react/shallow";

import StaticMap from "@/components/atomic/organisms/StaticMap";
import { APP_DOMAIN } from "@/cons/brand.cons";
import { usePlaceStore } from "@/store/placeStore";
import { getLocationFromPlace, PlaceType } from "@/types/place.types";
import { MonitorDisplay } from "@/components/atomic/atoms/wrapper/MonitorDisplay";
import { PlaceAndTime } from "./PlaceAndTime";
import { ControllerButtons } from "./ControllerButtons";

export function VideoController(props: { goToNextPlace: () => void }) {
  // place store
  const currentPlace = usePlaceStore(useShallow((state) => state.currentPlace));

  return (
    <div className="h-full w-full flex justify-start items-center background">
      {/* Main Section */}
      <div className="h-full flex-grow">
        <MainSection
          currentPlace={currentPlace}
          goToNextPlace={props.goToNextPlace}
        />
      </div>

      <VerticalBorder />

      {/* Footer Section */}
      <div>
        <FooterSection />
      </div>
    </div>
  );
}

/**
 * Sub Components
 */

function VerticalBorder() {
  return (
    <div className="h-full w-[3px] border border-l-[#111111] border-r-[#444444]/50 border-t-transparent border-b-transparent"></div>
  );
}

function MainSection(props: {
  currentPlace: PlaceType | undefined;
  goToNextPlace: () => void;
}) {
  return (
    <div className="h-full p-6 flex items-center gap-6">
      {/* Map */}
      <MonitorDisplay>
        <div className="w-[160px] h-full">
          <StaticMap
            location={
              props.currentPlace
                ? getLocationFromPlace(props.currentPlace)
                : null
            }
            withPin={true}
          />
        </div>
      </MonitorDisplay>

      {/* Address */}
      <div className="flex-grow h-full text-blue-200/70 ">
        <MonitorDisplay>
          {props.currentPlace === undefined ? (
            <InitialDisplay />
          ) : (
            <PlaceAndTime
              addressSpot={props.currentPlace.addressSpot}
              addressRegion={props.currentPlace.addressRegion}
              addressCountry={props.currentPlace.addressCountry}
              gmtOffset={props.currentPlace.gmtOffset}
            />
          )}
        </MonitorDisplay>
      </div>

      {/* Buttons */}
      <div>
        <ControllerButtons goToNextPlace={props.goToNextPlace} />
      </div>
    </div>
  );
}

function FooterSection(props: {}) {
  const placeCnt = usePlaceStore((state) => state.allPlaces.length);

  return (
    <div className="p-6 flex flex-col items-start gap-3">
      <div className="font-bold">{APP_DOMAIN}</div>
      <div className="text-sm bg-neutral-700 inline-block rounded-md px-2">
        <span className="font-bold text-md">{placeCnt}</span> live cams
      </div>
    </div>
  );
}

function InitialDisplay() {
  return (
    <div className="w-full flex-col items-center justify-between px-5 py-3">
      <div>Click {`"Next"`} to start connecting to webcams...</div>
    </div>
  );
}
