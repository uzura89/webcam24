import { PlaceType } from "@/types/place.types";
import { create } from "zustand";

type PlaceState = {
  allPlaces: PlaceType[];
  setAllPlaces: (places: PlaceType[]) => void;

  placeIndex: number;
  currentPlace: PlaceType | undefined;
  prevPlace: PlaceType | undefined;
  setNextPlace: () => void;

  loadedPlaceCnt: number;
  incrementLoadedPlaceCnt: () => void;
};

export const usePlaceStore = create<PlaceState>((set) => ({
  allPlaces: [],
  setAllPlaces: (places) => set(() => ({ allPlaces: places })),

  placeIndex: 0,
  currentPlace: undefined,
  prevPlace: undefined,
  setNextPlace: () =>
    set((state) => {
      // increment placeIndex by 1
      const newPlaceIndex =
        state.placeIndex + 1 >= state.allPlaces.length
          ? 0
          : state.placeIndex + 1;

      const currentPlace = state.currentPlace;
      const nextPlace = state.allPlaces[newPlaceIndex];

      return {
        placeIndex: newPlaceIndex,
        currentPlace: nextPlace,
        prevPlace: currentPlace,
      };
    }),

  loadedPlaceCnt: 0,
  incrementLoadedPlaceCnt: () =>
    set((state) => ({ loadedPlaceCnt: state.loadedPlaceCnt + 1 })),
}));
