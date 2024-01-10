import { useShallow } from "zustand/react/shallow";

import StaticMap from "@/components/atomic/organisms/StaticMap";
import { APP_DOMAIN } from "@/cons/brand.cons";
import { usePlaceStore } from "@/store/placeStore";
import { getLocationFromPlace, LocationType } from "@/types/place.types";
import { useIntervaManager } from "./useIntervalManager";
import { MonitorDisplay } from "@/components/atomic/atoms/wrapper/MonitorDisplay";
import { PlaceAndTime } from "./PlaceAndTime";
import { ControllerButtons } from "./ControllerButtons";

export function VideoController(props: {}) {
  // place store
  const currentPlace = usePlaceStore(useShallow((state) => state.currentPlace));
  const { goToNextPlace } = useIntervaManager();

  if (!currentPlace) return null;

  return (
    <div className="h-full w-full flex justify-start items-center border-[#444444] border-t bg-gradient-to-b from-zinc-700 to-zinc-800">
      {/* Main Section */}
      <div className="h-full flex-grow">
        <MainSection
          location={getLocationFromPlace(currentPlace)}
          placeId={currentPlace.id}
          addressSpot={currentPlace.addressSpot}
          addressRegion={currentPlace.addressRegion}
          addressCountry={currentPlace.addressCountry}
          goToNextPlace={goToNextPlace}
          gmtOffset={currentPlace.gmtOffset}
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
  placeId: string;
  location: LocationType;
  addressSpot: string;
  addressRegion: string;
  addressCountry: string;
  gmtOffset: number;
  goToNextPlace: () => void;
}) {
  return (
    <div className="h-full p-6 flex items-center gap-6">
      {/* Map */}
      <MonitorDisplay>
        <div className="w-[160px] h-full">
          <StaticMap location={props.location} withPin={true} />
        </div>
      </MonitorDisplay>

      {/* Address */}
      <div className="flex-grow h-full text-blue-200/70 ">
        <MonitorDisplay>
          <PlaceAndTime
            addressSpot={props.addressSpot}
            addressRegion={props.addressRegion}
            addressCountry={props.addressCountry}
            gmtOffset={props.gmtOffset}
          />
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
