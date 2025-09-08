import { create } from "zustand";
import { createSelectors } from "./create-selectors";

interface BearState {
  bears: number;
  increase: (by: number) => void;
  increment: () => void;
}

const useBearStoreBase = create<BearState>()((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
  increment: () => set((state) => ({ bears: state.bears + 1 })),
}));

export const useBearStore = createSelectors(useBearStoreBase);

// // get the property
// const bears = useBearStore.use.bears()

// // get the action
// const increment = useBearStore.use.increment()
