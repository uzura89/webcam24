import { memo, useRef, useEffect } from "react";

import { useEnvStore } from "@/store/envStore";
import { LocationType } from "@/types/place.types";
import mapboxgl from "mapbox-gl";
import { useShallow } from "zustand/react/shallow";

function areEqual(prevProps: any, nextProps: any) {
  return (
    prevProps.location.lat === nextProps.location.lat &&
    prevProps.location.lng === nextProps.location.lng
  );
}

export default memo(function StaticMap(props: {
  location: LocationType;
  withPin: boolean;
}) {
  // refs
  const mapContainerRef = useRef<HTMLDivElement>(null);
  // global state
  const mapboxAccessToken = useEnvStore(
    useShallow((state) => state.mapboxAccessToken)
  );

  useEffect(() => {
    if (mapboxAccessToken && mapContainerRef.current) {
      const map = initMapBox({
        location: props.location,
        mapboxAccessToken,
        targetElm: mapContainerRef.current,
        withPin: props.withPin,
      });

      return () => map.remove();
    }
  }, [props.location, mapboxAccessToken]);

  return (
    <div ref={mapContainerRef} style={{ height: "100%", width: "100%" }} />
  );
},
areEqual);

/**
 * Modules
 */

const initMapBox = (props: {
  mapboxAccessToken: string;
  location: LocationType;
  targetElm: HTMLDivElement;
  withPin: boolean;
}) => {
  mapboxgl.accessToken = props.mapboxAccessToken;

  const map = new mapboxgl.Map({
    container: props.targetElm || "",
    style: "mapbox://styles/mapbox/dark-v10",
    center: [props.location.lng, props.location.lat],
    zoom: 3,
  });

  const marker = createMarker();

  map.on("load", () => {
    if (props.withPin) {
      new mapboxgl.Marker(marker)
        .setLngLat([props.location.lng, props.location.lat])
        .addTo(map);
    }
  });

  return map;
};

function createMarker() {
  var wrapperDiv = document.createElement("div");
  var el = document.createElement("div");
  el.className = "beacon-dot";
  el.style.animation = "pulse 2s infinite";
  wrapperDiv.appendChild(el);
  return wrapperDiv;
}
