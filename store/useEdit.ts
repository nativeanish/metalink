import { create } from "zustand";

interface State {
  isEdit: boolean;
  setIsEdit: (e: boolean) => void;
  uuid: string;
  setUUid: (e: string) => void;
}
const useEdit = create<State>((set) => ({
  isEdit: false,
  setIsEdit(e) {
    set({ isEdit: e });
  },
  uuid: "",
  setUUid(e) {
    set({ uuid: e });
  },
}));
export default useEdit;
