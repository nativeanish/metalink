import { create } from "zustand";

interface State {
  address: string | null;
  setAddress: () => void;
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
}));
export default useAddress;
