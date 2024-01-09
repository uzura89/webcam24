import { create } from "zustand";

type ConfigState = {
  autoNextPlace: boolean;
  intervalSecNextPlace: number;

  toggleAutoNextPlace: () => void;
  setSecondsUntilNextPlace: (seconds: number) => void;
};

export const useConfigStore = create<ConfigState>((set) => ({
  autoNextPlace: true,
  intervalSecNextPlace: 10,

  toggleAutoNextPlace: () =>
    set((state) => ({ autoNextPlace: !state.autoNextPlace })),
  setSecondsUntilNextPlace: (seconds) =>
    set(() => ({ intervalSecNextPlace: seconds })),
}));
