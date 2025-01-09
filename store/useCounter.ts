import { create } from "zustand";

interface State {
  counter: number;
  setCounter: (value: number) => void;
}
const useCounter = create<State>((set) => ({
  counter: 0,
  setCounter: (value) => set({ counter: value }),
}));
export default useCounter;
