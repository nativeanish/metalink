import { ethers } from "ethers";
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
      useAddress.getState().setType("arconnect");
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
    useAddress.getState().setType(null);
  } catch (err) {
    console.log(err);
  }
};

export async function connectMetaMask() {
  // Check if MetaMask is installed
  if (!window.ethereum) {
    alert("MetaMask is not installed. Please install it to use this feature.");
    return;
  }

  try {
    // Request account access
    await window.ethereum.request({ method: "eth_requestAccounts" });

    // Create a new provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // Get the signer
    const signer = provider.getSigner();

    // Get the user's address
    const address = await signer.getAddress();
    if (address && address.length) {
      useAddress.getState().setType("metamask");
      useAddress.setState({ address: address });
    }

    return { provider, signer, address };
  } catch (error) {
    console.error("Error connecting to MetaMask:", error);
  }
}
