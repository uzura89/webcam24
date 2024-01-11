import { create } from "zustand";

type ModalState = {
  visibleModal: string;
  setVisibleModal: (visibleModal: string) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  visibleModal: "",
  setVisibleModal: (visibleModal) => set({ visibleModal }),
  closeModal: () => set({ visibleModal: "" }),
}));

/**
 * Modals
 */

export const MODAL_CONFIG = "MODAL_CONFIG";
