import { create } from "zustand";

interface State {
  arns: string;
  setArns: (arns: string) => void;
  loading: boolean;
  isAvailable: boolean | undefined;
  data: string;
  setdata: (e: string) => void;
}
const useArns = create<State>((set) => ({
  arns: "",
  setArns: (arns) => set({ arns }),
  loading: false,
  isAvailable: undefined,
  data: "",
  setdata(e) {
    set({ data: e })
  },

}));
export default useArns;
