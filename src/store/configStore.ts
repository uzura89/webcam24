import { create } from "zustand";

type ConfigState = {
  intervalSecNextPlace: number;

  setIntervalSecNextPlace: (intervalSecNextPlace: number) => void;
};

export const useConfigStore = create<ConfigState>((set) => ({
  intervalSecNextPlace: 10,

  setIntervalSecNextPlace: (intervalSecNextPlace) =>
    set(() => ({ intervalSecNextPlace: intervalSecNextPlace })),
}));

/**
 * Types
 */

export type ConfigObjectType = {
  intervalSecNextPlace: number;
};

/**
 * Selectors
 */

export const selectConfigObject = (state: ConfigState): ConfigObjectType => {
  return {
    intervalSecNextPlace: state.intervalSecNextPlace,
  };
};
