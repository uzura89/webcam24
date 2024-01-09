import { create } from "zustand";

type PlayerState = {
  inTransition: boolean;
  finishTransition: () => void;
  startTransition: () => void;

  secondsUntilNext: number;
  decrementSecondsUntilNext: () => void;
  setSecondsUntilNext: (seconds: number) => void;

  isAutoNextPaused: boolean;
  pauseAutoNext: () => void;
  resumeAutoNext: () => void;
};

export const usePlayerStore = create<PlayerState>((set) => ({
  inTransition: true,
  finishTransition: () => {
    set(() => ({ inTransition: false }));
  },
  startTransition: () => {
    set(() => ({ inTransition: true }));
  },

  secondsUntilNext: 0,
  decrementSecondsUntilNext: () =>
    set((state) => ({ secondsUntilNext: state.secondsUntilNext - 1 })),
  setSecondsUntilNext: (seconds) => set(() => ({ secondsUntilNext: seconds })),

  isAutoNextPaused: false,
  pauseAutoNext: () => set(() => ({ isAutoNextPaused: true })),
  resumeAutoNext: () => set(() => ({ isAutoNextPaused: false })),
}));
