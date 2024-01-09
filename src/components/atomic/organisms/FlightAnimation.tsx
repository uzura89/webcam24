import React, { useRef, useEffect, useMemo } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { LocationType, PlaceType } from "@/types/place.types";
import { useEnvStore } from "@/store/envStore";
import { usePlayerStore } from "@/store/playerStore";

export function FlightAnimation(props: {
  fromLocation: LocationType | null;
  toLocation: LocationType;
}) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  // global state
  const mapboxAccessToken = useEnvStore((state) => state.mapboxAccessToken);
  const finishTransition = usePlayerStore((state) => state.finishTransition);
  const inTransition = usePlayerStore((state) => state.inTransition);

  const onMoveEnd = () => {
    finishTransition();
  };

  const removeMap = (map: any) => {
    try {
      map.remove();
    } catch (e) {}
  };

  useEffect(() => {
    if (mapboxAccessToken && mapContainerRef.current) {
      let map: any;

      if (inTransition) {
        map = initFlyingMapBox({
          fromLocation: props.fromLocation,
          toLocation: props.toLocation,
          mapboxAccessToken,
          targetElm: mapContainerRef.current,
          onMoveEnd,
        });
      } else {
        map = initZoomingMapBox({
          location: props.toLocation,
          mapboxAccessToken,
          targetElm: mapContainerRef.current,
        });

        setTimeout(() => {
          removeMap(map);
        }, 1000);
      }
      return () => removeMap(map);
    }
  }, [props.toLocation, mapboxAccessToken, inTransition]);

  return <div ref={mapContainerRef} style={{ height: "100%" }} />;
}

/**
 * Modules
 */

const initFlyingMapBox = (props: {
  mapboxAccessToken: string;
  targetElm: HTMLDivElement;
  fromLocation: LocationType | null;
  toLocation: LocationType;
  onMoveEnd: () => void;
}) => {
  mapboxgl.accessToken = props.mapboxAccessToken;

  const isFromLocationSpace =
    props.fromLocation &&
    props.fromLocation.lat === 0 &&
    props.fromLocation.lng === 0;
  const isToLocationSpace =
    props.toLocation.lat === 0 && props.toLocation.lng === 0;

  const map = new mapboxgl.Map({
    container: props.targetElm || "",
    style: "mapbox://styles/mapbox/satellite-v9",
    center: [
      props.fromLocation ? props.fromLocation.lng : 0,
      props.fromLocation ? props.fromLocation.lat : 0,
    ],
    zoom: isFromLocationSpace ? 1 : props.fromLocation ? 4 : 2,
  });

  map.on("load", () => {
    // Start the animation
    map.flyTo({
      center: [props.toLocation.lng, props.toLocation.lat],
      essential: true, // This ensures the animation is smooth and uninterrupted
      zoom: isToLocationSpace ? 1 : 8,
      speed: 0.6,
    });
  });

  map.on("moveend", props.onMoveEnd);

  return map;
};

const initZoomingMapBox = (props: {
  mapboxAccessToken: string;
  targetElm: HTMLDivElement;

  location: LocationType;
}) => {
  mapboxgl.accessToken = props.mapboxAccessToken;

  const map = new mapboxgl.Map({
    container: props.targetElm || "",
    style: "mapbox://styles/mapbox/satellite-v9",
    center: [props.location.lng, props.location.lat],
    zoom: 8,
  });

  map.on("load", () => {
    // Start the animation
    map.flyTo({
      center: [props.location.lng, props.location.lat],
      essential: true, // This ensures the animation is smooth and uninterrupted
      zoom: 15,
      speed: 1,
    });
  });

  return map;
};
