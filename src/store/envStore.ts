import { create } from "zustand";

type EnvState = {
  mapboxAccessToken: string;
  fetchMapboxKey: () => void;
};

export const useEnvStore = create<EnvState>((set) => ({
  mapboxAccessToken: "",
  fetchMapboxKey: async () => {
    const res = await fetch("/api/mapbox");
    const { mapboxAccessToken } = await res.json();
    set({ mapboxAccessToken });
  },
}));
