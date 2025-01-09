import { create } from "zustand";

interface State {
  arns: string;
  setArns: (arns: string) => void;
  loading: boolean;
  isAvailable: boolean | undefined;
}
const useArns = create<State>((set) => ({
  arns: "",
  setArns: (arns) => set({ arns }),
  loading: false,
  isAvailable: undefined,
}));
export default useArns;
