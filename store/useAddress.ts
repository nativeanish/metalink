import { create } from "zustand";

interface State {
  address: string | null;
  setAddress: () => void;
  type: "metamask" | "arconnect" | null;
  setType: (e: "metamask" | "arconnect" | null) => void;
}

const useAddress = create<State>((set) => ({
  address: null,
  setAddress: async () => {
    const _address = await window.arweaveWallet.getActiveAddress();
    if (_address.length) {
      set({ address: _address });
    } else {
      set({ address: null });
    }
  },
  type: null,
  setType: (e) => set({ type: e }),
}));
export default useAddress;
