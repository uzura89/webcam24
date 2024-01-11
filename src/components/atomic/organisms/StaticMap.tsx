import { memo, useRef, useEffect } from "react";

import { useEnvStore } from "@/store/envStore";
import { LocationType } from "@/types/place.types";
import mapboxgl from "mapbox-gl";
import { useShallow } from "zustand/react/shallow";

interface Props {
  location: LocationType | null;
  withPin: boolean;
}

function areEqual(prevProps: Props, nextProps: Props) {
  if (!prevProps.location || !nextProps.location) return false;

  return (
    prevProps.location.lat === nextProps.location.lat &&
    prevProps.location.lng === nextProps.location.lng
  );
}

export default memo(function StaticMap(props: Props) {
  // refs
  const mapContainerRef = useRef<HTMLDivElement>(null);
  // global state
  const mapboxAccessToken = useEnvStore(
    useShallow((state) => state.mapboxAccessToken)
  );

  useEffect(() => {
    if (mapboxAccessToken && mapContainerRef.current) {
      const map = initMapBox({
        location: props.location || { lat: 0, lng: 0 },
        mapboxAccessToken,
        targetElm: mapContainerRef.current,
        withPin: props.withPin && props.location !== null,
        zoom: props.location ? 3 : 0.1,
      });

      return () => map.remove();
    }
  }, [mapboxAccessToken, props.location]);

  return (
    <div ref={mapContainerRef} style={{ height: "100%", width: "100%" }} />
  );
}, areEqual);

/**
 * Modules
 */

const initMapBox = (props: {
  mapboxAccessToken: string;
  location: LocationType;
  targetElm: HTMLDivElement;
  withPin: boolean;
  zoom: number;
}) => {
  mapboxgl.accessToken = props.mapboxAccessToken;

  const map = new mapboxgl.Map({
    container: props.targetElm || "",
    style: "mapbox://styles/mapbox/dark-v10",
    center: [props.location.lng, props.location.lat],
    zoom: props.zoom,
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
