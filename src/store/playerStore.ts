import { create } from "zustand";

type PlayerState = {
  hasStartButtonClicked: boolean;
  startButtonClicked: () => void;

  inTransition: boolean;
  finishTransition: () => void;
  startTransition: () => void;

  secondsUntilNext: number;
  decrementSecondsUntilNext: () => void;
  setSecondsUntilNext: (seconds: number) => void;

  isAutoNextPaused: boolean;
  pauseAutoNext: () => void;
  enableAutoNext: () => void;
};

export const usePlayerStore = create<PlayerState>((set) => ({
  hasStartButtonClicked: false,
  startButtonClicked: () => set(() => ({ hasStartButtonClicked: true })),

  inTransition: false,
  finishTransition: () => {
    set(() => ({ inTransition: false }));
  },
  startTransition: () => {
    set(() => ({ inTransition: true }));
  },

  secondsUntilNext: 10,
  decrementSecondsUntilNext: () =>
    set((state) => ({ secondsUntilNext: state.secondsUntilNext - 1 })),
  setSecondsUntilNext: (seconds) => set(() => ({ secondsUntilNext: seconds })),

  isAutoNextPaused: false,
  pauseAutoNext: () => set(() => ({ isAutoNextPaused: true })),
  enableAutoNext: () => set(() => ({ isAutoNextPaused: false })),
}));
