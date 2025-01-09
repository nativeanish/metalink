import useAddress from "../store/useAddress";
// import wallet from "./arweave";
export const async_connect = async () => {
  try {
    await window.arweaveWallet.connect(
      [
        "ACCESS_ADDRESS",
        "ACCESS_ALL_ADDRESSES",
        "ACCESS_ARWEAVE_CONFIG",
        "ACCESS_PUBLIC_KEY",
        "DECRYPT",
        "ENCRYPT",
        "DISPATCH",
        "SIGNATURE",
        "SIGN_TRANSACTION",
      ],
      {
        name: "MetaLink",
      }
    );
    checkConnection();
  } catch (err) {
    alert(err);
  }
};
export const connect = () => {
  async_connect().then().catch(console.log);
};

export const checkConnection = async () => {
  try {
    const data = await window.arweaveWallet.getActiveAddress();
    if (data && data.length) {
      useAddress.getState().setAddress();
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const disconnect = async () => {
  try {
    await window.arweaveWallet.disconnect();
    useAddress.getState().setAddress();
    useAddress.setState({ address: null });
  } catch (err) {
    console.log(err);
  }
};
